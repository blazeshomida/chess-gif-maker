import { COLOR_THEME_OPTIONS_MAP, COLOR_THEMES } from "~/lib/constants";
import type { ColorTheme } from "~/lib/types";
import { ColorPicker } from "./ui/color-picker";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectDescription,
  SelectContent,
} from "./ui/select";
import { useSettings } from "./settings-provider";
import { SettingsSectionLayout } from "./section-layout";

const colorThemes = Object.keys(COLOR_THEME_OPTIONS_MAP) as ColorTheme[];

export function Colors() {
  const { state, setState } = useSettings();

  return (
    <SettingsSectionLayout title="Colors">
      <div class="grid gap-4">
        <Select<ColorTheme>
          value={state["color-theme"]}
          onChange={(option) => {
            if (!option) return;
            setState("color-theme", option);
            if (option !== "CUSTOM") {
              setState("colors", COLOR_THEMES[option]);
            }
          }}
          options={colorThemes}
          optionTextValue={(option) => COLOR_THEME_OPTIONS_MAP[option].label}
          optionDisabled={(option) => COLOR_THEME_OPTIONS_MAP[option].disabled}
          placeholder="Select a color theme..."
          itemComponent={(props) => (
            <SelectItem item={props.item}>
              {COLOR_THEME_OPTIONS_MAP[props.item.rawValue].label}
            </SelectItem>
          )}
        >
          <div class="grid gap-2">
            <SelectTrigger aria-label="Color Theme">
              <SelectValue<ColorTheme>>
                {(state) =>
                  COLOR_THEME_OPTIONS_MAP[state.selectedOption()].label
                }
              </SelectValue>
            </SelectTrigger>
            <SelectDescription>
              Choose a from a preset color theme.
            </SelectDescription>
          </div>
          <SelectContent />
        </Select>
        <div class="grid gap-2">
          <div class="flex w-full gap-2">
            <ColorPicker
              label="Light"
              class={{
                label: "text-neutral-800",
              }}
              value={state.colors.light}
              onInput={(e) => {
                setState("colors", "light", e.target.value);
                setState("color-theme", "CUSTOM");
              }}
            />
            <ColorPicker
              label="Dark"
              value={state.colors.dark}
              onInput={(e) => {
                setState("colors", "dark", e.target.value);
                setState("color-theme", "CUSTOM");
              }}
            />
          </div>
          <p class="text-sm text-neutral-500">
            Choose custom light and dark colors.
          </p>
        </div>
      </div>
    </SettingsSectionLayout>
  );
}
