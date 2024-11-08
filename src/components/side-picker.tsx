import { Show } from "solid-js";
import { SettingsSectionLayout } from "./section-layout";
import { useSettings } from "./settings-provider";
import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from "./ui/switch";

export function SidePicker() {
  const { state, setState } = useSettings();
  return (
    <SettingsSectionLayout title="Side">
      <Switch
        checked={state.side === "w"}
        onChange={() => setState("side", state.side === "w" ? "b" : "w")}
        class="flex items-center gap-4"
      >
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>
          <Show when={state.side === "w"} fallback="Black">
            White
          </Show>
        </SwitchLabel>
      </Switch>
    </SettingsSectionLayout>
  );
}
