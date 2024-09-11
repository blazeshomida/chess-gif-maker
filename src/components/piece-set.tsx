import { For } from "solid-js";
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
import type { Color, PieceSymbol } from "chess.js";
import { Square } from "./square";

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
      {/* <div class="rounded border border-border bg-background p-4">
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
      </div> */}
    </SettingsSectionLayout>
  );
}
