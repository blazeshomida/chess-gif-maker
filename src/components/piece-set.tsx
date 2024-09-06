import { For } from "solid-js";
import { PIECE_SET_OPTIONS, PIECE_SVGS } from "~/lib/constants";
import type { PieceSetOption } from "~/lib/types";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectDescription,
  SelectContentVirtualized,
} from "./ui/select";
import { useSettings } from "./settings-provider";
import { SettingsSectionLayout } from "./section-layout";
import { getPieceSetOption } from "~/lib/utils/select-options";

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
          <For each={PIECE_SVGS}>
            {(pieceSvg, index) => {
              const color = () => (index() % 2 === 0 ? "light" : "dark");
              const piece = () =>
                state.pieceSet === "mono" ? pieceSvg[1] : pieceSvg;

              return (
                <div
                  class="p-1"
                  style={{
                    background: state.colors[color()],
                  }}
                >
                  <img
                    class="size-full"
                    src={`/pieces/${state.pieceSet}/${piece()}.svg`}
                    alt=""
                  />
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </SettingsSectionLayout>
  );
}
