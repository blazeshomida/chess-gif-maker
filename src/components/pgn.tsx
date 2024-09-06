import { Button } from "./ui/button";
import { TextField, TextFieldTextArea } from "./ui/text-field";
import { SettingsSectionLayout } from "./section-layout";

export function Pgn() {
  return (
    <SettingsSectionLayout title="PGN">
      <TextField>
        <TextFieldTextArea
          class="h-32 resize-none overflow-y-auto"
          placeholder="Enter your pgn here."
        />
      </TextField>
      <Button variant="secondary" class="w-full">
        Load PGN
      </Button>
    </SettingsSectionLayout>
  );
}
