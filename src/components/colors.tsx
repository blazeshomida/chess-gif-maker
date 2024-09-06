import { createSignal } from "solid-js";
import {
  DEFAULT_COLOR_THEME_OPTION,
  COLOR_THEMES,
  COLOR_THEME_OPTIONS,
  CUSTOM_COLOR_THEME_OPTION,
} from "~/lib/constants";
import type { ColorThemeOption } from "~/lib/types";
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

export function Colors() {
  const { state, setState } = useSettings();
  const [selectedColorTheme, setSelectedColorTheme] =
    createSignal<ColorThemeOption>(DEFAULT_COLOR_THEME_OPTION);

  return (
    <SettingsSectionLayout title="Colors">
      <div class="grid gap-4">
        <Select
          value={selectedColorTheme()}
          onChange={(value) => {
            if (!value) return;
            setSelectedColorTheme(value);
            if (value.value !== "CUSTOM") {
              setState("colors", COLOR_THEMES[value.value]);
            }
          }}
          options={COLOR_THEME_OPTIONS}
          optionValue="value"
          optionTextValue="label"
          optionDisabled="disabled"
          placeholder="Select a color theme..."
          itemComponent={(props) => (
            <SelectItem item={props.item}>
              {props.item.rawValue.label}
            </SelectItem>
          )}
        >
          <div class="grid gap-2">
            <SelectTrigger aria-label="Color Theme">
              <SelectValue<ColorThemeOption>>
                {(state) => state.selectedOption().label}
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
                setSelectedColorTheme(CUSTOM_COLOR_THEME_OPTION);
              }}
            />
            <ColorPicker
              label="Dark"
              value={state.colors.dark}
              onInput={(e) => {
                setState("colors", "dark", e.target.value);
                setSelectedColorTheme(CUSTOM_COLOR_THEME_OPTION);
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
