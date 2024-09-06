import type { ColorTheme } from "./constants";

export type SelectOption<T> = {
  value: T;
  label: string;
  disabled: boolean;
};

export type SelectGroup<T> = {
  label: string;
  options: SelectOption<T>[];
};

type ColorsOptionValue = {
  light: string;
  dark: string;
};

export type ResolutionOption = SelectOption<number>;
export type ResolutionGroup = SelectGroup<number>;
export type ColorThemeOption = SelectOption<ColorTheme | "CUSTOM">;
export type PieceSetOption = SelectOption<string>;

export type SettingsState = {
  delay: number[];
  colors: ColorsOptionValue;
  resolution: ResolutionOption;
  pieceSet: PieceSetOption;
};
