import { PIECE_SET_OPTIONS_MAP } from "~/lib/constants";
import type { PieceSet } from "~/lib/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectDescription,
  SelectContentVirtualized,
} from "./ui/select";
import { useSettings } from "./settings-provider";
import { SettingsSectionLayout } from "./section-layout";

const pieceSets = Object.keys(PIECE_SET_OPTIONS_MAP) as PieceSet[];

export function PieceSet() {
  const { state, setState } = useSettings();
  return (
    <SettingsSectionLayout title="Piece Set">
      <Select<PieceSet>
        value={state.pieceSet}
        onChange={(option) => {
          if (option) {
            setState("pieceSet", option);
          }
        }}
        options={pieceSets}
        virtualized
        optionTextValue={(option) => PIECE_SET_OPTIONS_MAP[option].label}
        optionDisabled={(option) => PIECE_SET_OPTIONS_MAP[option].disabled}
        placeholder="Select a piece set..."
      >
        <div class="grid gap-2">
          <SelectTrigger aria-label="Piece Set">
            <SelectValue<PieceSet>>
              {(state) => PIECE_SET_OPTIONS_MAP[state.selectedOption()].label}
            </SelectValue>
          </SelectTrigger>
          <SelectDescription>Choose from a piece set.</SelectDescription>
        </div>
        <SelectContentVirtualized
          options={pieceSets}
          label={(option) => PIECE_SET_OPTIONS_MAP[option].label}
        />
      </Select>
    </SettingsSectionLayout>
  );
}
