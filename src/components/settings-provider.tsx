import { createContext, useContext, type JSXElement } from "solid-js";
import { createStore, type SetStoreFunction } from "solid-js/store";
import {
  COLOR_THEMES,
  DEFAULT_COLOR_THEME_OPTION,
  DEFAULT_PIECE_SET_OPTION,
  DEFAULT_RESOLUTION_OPTION,
} from "~/lib/constants";
import type { SettingsState } from "~/lib/types";

const SettingsContext = createContext<{
  state: SettingsState;
  setState: SetStoreFunction<SettingsState>;
}>();

export function SettingsProvider(props: { children: JSXElement }) {
  const [state, setState] = createStore<SettingsState>({
    delay: 1000,
    colors: { ...COLOR_THEMES.DEFAULT },
    resolution: DEFAULT_RESOLUTION_OPTION.value,
    pieceSet: DEFAULT_PIECE_SET_OPTION.value,
    "color-theme": DEFAULT_COLOR_THEME_OPTION.value ,
  });

  return (
    <SettingsContext.Provider value={{ state, setState }}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (value === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return value;
}
