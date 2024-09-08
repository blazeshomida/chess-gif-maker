import { For, Show } from "solid-js";
import { PIECE_SET_OPTIONS, PIECE_SVG_SYMBOLS } from "~/lib/constants";
import type { PieceSetOption } from "~/lib/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectDescription,
  SelectContentVirtualized,
} from "./ui/select";
import { useSettings } from "./settings-provider";
import { SettingsSectionLayout } from "./section-layout";
import { getPieceSetOption } from "~/lib/utils/select-options";
import type { Color, Piece, PieceSymbol } from "chess.js";
import { getPieceSVG, queryPieceSVG } from "~/lib/utils/board";

export function PieceSet() {
  const { state, setState } = useSettings();
  return (
    <SettingsSectionLayout title="Piece Set">
      <Select
        value={getPieceSetOption(state.pieceSet)}
        onChange={(option) => {
          if (option) {
            setState("pieceSet", option.value);
          }
        }}
        options={PIECE_SET_OPTIONS}
        virtualized
        optionValue="value"
        optionTextValue="label"
        optionDisabled="disabled"
        placeholder="Select a piece set..."
      >
        <div class="grid gap-2">
          <SelectTrigger aria-label="Piece Set">
            <SelectValue<PieceSetOption>>
              {(state) => state.selectedOption().label}
            </SelectValue>
          </SelectTrigger>
          <SelectDescription>Choose from a piece set.</SelectDescription>
        </div>
        <SelectContentVirtualized options={PIECE_SET_OPTIONS} />
      </Select>
      <div class="rounded border border-border bg-background p-4">
        <div class="grid grid-cols-3 overflow-clip rounded">
          <For each={PIECE_SVG_SYMBOLS}>
            {(pieceSymbol, index) => {
              return (
                <Square
                  piece={{
                    type: pieceSymbol.at(-1)! as PieceSymbol,
                    color: pieceSymbol.at(0)! as Color,
                  }}
                  currentColor={index() % 2 ? "dark" : "light"}
                />
              );
            }}
          </For>
        </div>
      </div>
    </SettingsSectionLayout>
  );
}

function Square(props: {
  piece: Piece | null;
  currentColor: "light" | "dark";
}) {
  const { state } = useSettings();
  const query = queryPieceSVG({ piece: props.piece });

  return (
    <div
      class="grid aspect-square size-full place-content-center p-1"
      style={{
        "background-color": state.colors[props.currentColor],
      }}
    >
      <Show when={query.isSuccess}>
        <span innerHTML={query.data} />
      </Show>
    </div>
  );
}
