import type {
  ColorThemeOption,
  PieceSetOption,
  ResolutionGroup,
} from "./types";

export const DEFAULT_RESOLUTION_OPTION = {
  value: 720,
  label: "720p (HD)",
  disabled: false,
};

export const RESOLUTION_OPTIONS: ResolutionGroup[] = [
  {
    label: "Low Quality",
    options: [
      { value: 240, label: "240p (SD)", disabled: false },
      { value: 360, label: "360p (SD)", disabled: false },
      { value: 480, label: "480p (SD)", disabled: false },
    ],
  },
  {
    label: "Medium Quality",
    options: [
      DEFAULT_RESOLUTION_OPTION,
      { value: 1080, label: "1080p (HD)", disabled: false },
    ],
  },
  {
    label: "High Quality",
    options: [
      { value: 1440, label: "1440p (2k)", disabled: false },
      { value: 2160, label: "2160p (4k)", disabled: false },
      { value: 4320, label: "4320p (8k)", disabled: false },
    ],
  },
];

export const CUSTOM_COLOR_THEME_OPTION: ColorThemeOption = {
  label: "Custom",
  value: "CUSTOM",
  disabled: false,
};

export const DEFAULT_COLOR_THEME_OPTION: ColorThemeOption = {
  label: "Default (Chess.com)",
  value: "DEFAULT",
  disabled: false,
};

export const COLOR_THEME_OPTIONS: ColorThemeOption[] = [
  DEFAULT_COLOR_THEME_OPTION,
  {
    label: "Red",
    value: "RED",
    disabled: false,
  },
  CUSTOM_COLOR_THEME_OPTION,
];

export const COLOR_THEMES = {
  DEFAULT: {
    light: "#EBECD0",
    dark: "#739552",
  },
  RED: {
    light: "#F0D8BF",
    dark: "#BA5546",
  },
} as const;

export type ColorTheme = keyof typeof COLOR_THEMES;

export const DEFAULT_PIECE_SET_OPTION = {
  value: "alpha",
  label: "Alpha",
  disabled: false,
};

export const PIECE_SET_OPTIONS: PieceSetOption[] = [
  DEFAULT_PIECE_SET_OPTION,
  { value: "anarcandy", label: "Anarcandy", disabled: false },
  { value: "caliente", label: "Caliente", disabled: false },
  { value: "california", label: "California", disabled: false },
  { value: "cardinal", label: "Cardinal", disabled: false },
  { value: "cburnett", label: "Cburnett", disabled: false },
  { value: "celtic", label: "Celtic", disabled: false },
  { value: "chess7", label: "Chess7", disabled: false },
  { value: "chessnut", label: "Chessnut", disabled: false },
  { value: "companion", label: "Companion", disabled: false },
  { value: "cooke", label: "Cooke", disabled: false },
  { value: "disguised", label: "Disguised", disabled: false },
  { value: "dubrovny", label: "Dubrovny", disabled: false },
  { value: "fantasy", label: "Fantasy", disabled: false },
  { value: "fresca", label: "Fresca", disabled: false },
  { value: "gioco", label: "Gioco", disabled: false },
  { value: "governor", label: "Governor", disabled: false },
  { value: "horsey", label: "Horsey", disabled: false },
  { value: "icpieces", label: "Icpieces", disabled: false },
  { value: "kiwen-suwi", label: "Kiwen Suwi", disabled: false },
  { value: "kosal", label: "Kosal", disabled: false },
  { value: "leipzig", label: "Leipzig", disabled: false },
  { value: "letter", label: "Letter", disabled: false },
  { value: "libra", label: "Libra", disabled: false },
  { value: "maestro", label: "Maestro", disabled: false },
  { value: "merida", label: "Merida", disabled: false },
  { value: "monarchy", label: "Monarchy", disabled: false },
  { value: "mono", label: "Mono", disabled: false },
  { value: "mpchess", label: "Mpchess", disabled: false },
  { value: "pirouetti", label: "Pirouetti", disabled: false },
  { value: "pixel", label: "Pixel", disabled: false },
  { value: "reillycraig", label: "Reillycraig", disabled: false },
  { value: "riohacha", label: "Riohacha", disabled: false },
  { value: "shapes", label: "Shapes", disabled: false },
  { value: "spatial", label: "Spatial", disabled: false },
  { value: "staunty", label: "Staunty", disabled: false },
  { value: "tatiana", label: "Tatiana", disabled: false },
];

export const PIECE_SVGS = [
  "bB",
  "bK",
  "bN",
  "bP",
  "bQ",
  "bR",
  "wB",
  "wK",
  "wN",
  "wP",
  "wQ",
  "wR",
] as const;
