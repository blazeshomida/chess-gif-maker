import type { ResolutionGroup } from "./types";
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

export const COLOR_THEME_OPTIONS_MAP = {
  DEFAULT: { label: "Default (Chess.com)", disabled: false },
  RED: { label: "Red", disabled: false },
  PURPLE: { label: "Purple", disabled: false },
  CUSTOM: { label: "Custom", disabled: false },
};

export const COLOR_THEMES = {
  DEFAULT: {
    light: "#EBECD0",
    dark: "#739552",
  },
  RED: {
    light: "#F0D8BF",
    dark: "#BA5546",
  },
  PURPLE: {
    light: "#E2D0EC",
    dark: "#7D5194",
  },
} as const;

export const PIECE_SET_OPTIONS_MAP = {
  alpha: { label: "Alpha", disabled: false },
  anarcandy: { label: "Anarcandy", disabled: false },
  caliente: { label: "Caliente", disabled: false },
  california: { label: "California", disabled: false },
  cardinal: { label: "Cardinal", disabled: false },
  cburnett: { label: "Cburnett", disabled: false },
  celtic: { label: "Celtic", disabled: false },
  chess7: { label: "Chess7", disabled: false },
  chessnut: { label: "Chessnut", disabled: false },
  companion: { label: "Companion", disabled: false },
  cooke: { label: "Cooke", disabled: false },
  disguised: { label: "Disguised", disabled: false },
  dubrovny: { label: "Dubrovny", disabled: false },
  fantasy: { label: "Fantasy", disabled: false },
  fresca: { label: "Fresca", disabled: false },
  gioco: { label: "Gioco", disabled: false },
  governor: { label: "Governor", disabled: false },
  horsey: { label: "Horsey", disabled: false },
  icpieces: { label: "Icpieces", disabled: false },
  "kiwen-suwi": { label: "Kiwen Suwi", disabled: false },
  kosal: { label: "Kosal", disabled: false },
  leipzig: { label: "Leipzig", disabled: false },
  letter: { label: "Letter", disabled: false },
  libra: { label: "Libra", disabled: false },
  maestro: { label: "Maestro", disabled: false },
  merida: { label: "Merida", disabled: false },
  monarchy: { label: "Monarchy", disabled: false },
  mono: { label: "Mono", disabled: false },
  mpchess: { label: "Mpchess", disabled: false },
  pirouetti: { label: "Pirouetti", disabled: false },
  pixel: { label: "Pixel", disabled: false },
  reillycraig: { label: "Reillycraig", disabled: false },
  riohacha: { label: "Riohacha", disabled: false },
  shapes: { label: "Shapes", disabled: false },
  spatial: { label: "Spatial", disabled: false },
  staunty: { label: "Staunty", disabled: false },
  tatiana: { label: "Tatiana", disabled: false },
} as const;

export const PIECE_SVG_SYMBOLS = [
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

export const MONO_PIECE_SVG_SYMBOLS = ["B", "K", "N", "P", "Q", "R"] as const;

export const PIECE_SET_SVGS = import.meta.glob("/src/assets/pieces/**/*.svg", {
  query: "?raw",
  import: "default",
});

export const PIECE_SET_PNGS = import.meta.glob("/src/assets/pieces/**/*.png", {
  import: "default",
});
