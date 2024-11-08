import { DEFAULT_RESOLUTION_OPTION, RESOLUTION_OPTIONS } from "~/lib/constants";
import type { ResolutionOption } from "~/lib/types";
import {
  Select,
  SelectItem,
  SelectSection,
  SelectTrigger,
  SelectValue,
  SelectDescription,
  SelectContent,
} from "./ui/select";
import { useSettings } from "./settings-provider";
import { SettingsSectionLayout } from "./section-layout";

function getResolutionOption(resolutionValue: number | null): ResolutionOption {
  return (
    RESOLUTION_OPTIONS.flatMap((group) => group.options).find(
      (option) => option.value === resolutionValue,
    ) || DEFAULT_RESOLUTION_OPTION
  );
}

export function Resolution() {
  const { state, setState } = useSettings();
  return (
    <SettingsSectionLayout title="Resolution">
      <Select
        value={getResolutionOption(state.resolution)}
        onChange={(option: ResolutionOption | null) => {
          if (!option) return;
          setState("resolution", option.value);
        }}
        options={RESOLUTION_OPTIONS}
        optionValue="value"
        optionTextValue="label"
        optionDisabled="disabled"
        optionGroupChildren="options"
        placeholder="Select a resolution..."
        itemComponent={(props) => (
          <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
        )}
        sectionComponent={(props) => (
          <SelectSection>{props.section.rawValue.label}</SelectSection>
        )}
      >
        <div class="grid gap-2">
          <SelectTrigger aria-label="Resolution">
            <SelectValue<ResolutionOption>>
              {(state) => state.selectedOption().label}
            </SelectValue>
          </SelectTrigger>
          <SelectDescription>
            Choose a resolution for the gif.
          </SelectDescription>
        </div>
        <SelectContent />
      </Select>
    </SettingsSectionLayout>
  );
}
