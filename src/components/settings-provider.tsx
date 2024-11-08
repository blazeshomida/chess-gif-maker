import { createContext, useContext, type JSXElement } from "solid-js";
import { createStore, type SetStoreFunction } from "solid-js/store";
import { COLOR_THEMES, DEFAULT_RESOLUTION_OPTION } from "~/lib/constants";
import type { SettingsState } from "~/lib/types";
import { raise } from "~/lib/utils/raise";

const SettingsContext = createContext<{
  state: SettingsState;
  setState: SetStoreFunction<SettingsState>;
}>();

export function SettingsProvider(props: { children: JSXElement }) {
  const [state, setState] = createStore<SettingsState>({
    side: "w",
    pgn: "",
    delay: 1000,
    colors: { ...COLOR_THEMES.DEFAULT },
    resolution: DEFAULT_RESOLUTION_OPTION.value,
    pieceSet: "alpha",
    "color-theme": "DEFAULT",
  });

  return (
    <SettingsContext.Provider value={{ state, setState }}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return (
    useContext(SettingsContext) ??
    raise("useConfig must be used within a ConfigProvider")
  );
}
