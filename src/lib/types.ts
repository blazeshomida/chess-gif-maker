import type { Color } from "chess.js";
import { PIECE_SET_OPTIONS_MAP, type COLOR_THEMES } from "./constants";

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
export type ColorTheme = keyof typeof COLOR_THEMES | "CUSTOM";
export type PieceSet = keyof typeof PIECE_SET_OPTIONS_MAP;

export type SettingsState = {
  side: Color;
  pgn: string;
  delay: number;
  colors: ColorsOptionValue;
  "color-theme": ColorTheme;
  resolution: number;
  pieceSet: PieceSet;
};
