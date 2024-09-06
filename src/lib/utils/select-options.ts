import {
  RESOLUTION_OPTIONS,
  PIECE_SET_OPTIONS,
  DEFAULT_RESOLUTION_OPTION,
  DEFAULT_PIECE_SET_OPTION,
  COLOR_THEME_OPTIONS,
  DEFAULT_COLOR_THEME_OPTION,
} from "~/lib/constants";
import type {
  ResolutionOption,
  PieceSetOption,
  ColorThemeOption,
} from "~/lib/types";

/**
 * Finds the resolution option based on the provided value.
 * @param {number | null} resolutionValue - The resolution value.
 * @returns {ResolutionOption} The matching resolution option or a default option.
 */
export function getResolutionOption(
  resolutionValue: number | null,
): ResolutionOption {
  return (
    RESOLUTION_OPTIONS.flatMap((group) => group.options).find(
      (option) => option.value === resolutionValue,
    ) || DEFAULT_RESOLUTION_OPTION
  );
}

/**
 * Finds the piece set option based on the provided value.
 * @param {string | null} pieceSetValue - The piece set value.
 * @returns {PieceSetOption} The matching piece set option or a default option.
 */
export function getPieceSetOption(
  pieceSetValue: string | null,
): PieceSetOption {
  return (
    PIECE_SET_OPTIONS.find((option) => option.value === pieceSetValue) ||
    DEFAULT_PIECE_SET_OPTION
  );
}

/**
 * Finds the color theme option based on the provided value.
 * @param {string | null} colorThemeValue - The stored color theme value.
 * @returns {ColorThemeOption} The matching color theme option or a default option.
 */
export function getColorThemeOption(
  colorThemeValue: string | null,
): ColorThemeOption {
  return (
    COLOR_THEME_OPTIONS.find((option) => option.value === colorThemeValue) ||
    DEFAULT_COLOR_THEME_OPTION
  );
}
