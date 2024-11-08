import { SettingsSectionLayout } from "./section-layout";
import { useSettings } from "./settings-provider";
import { TextField, TextFieldTextArea } from "./ui/text-field";

export function Pgn() {
  const { state, setState } = useSettings();
  return (
    <SettingsSectionLayout title="PGN">
      <TextField
        value={state.pgn}
        onChange={(value) => {
          setState("pgn", value);
        }}
      >
        <TextFieldTextArea
          class="h-32 resize-none overflow-y-auto"
          placeholder="Enter your pgn here."
        />
      </TextField>
    </SettingsSectionLayout>
  );
}
