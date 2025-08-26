import type { StyleFontConfig } from "@/@types";
import { ansiColorCodes } from "./color";

export const ansiFontModes = {
  bold: 1,
  dim: 2,
  italic: 3,
  underline: 4,
  blinking: 5,
  reverse: 7,
  hidden: 8,
  strikethrough: 9,
  reset: 0,
} as const;

export const styleFontReset = `\x1b[${ansiFontModes.reset}m`;

export function styleFont(config: StyleFontConfig) {
  const { font, mode = "bold", color = "white" } = config;
  const hexEsc = `\x1b`;

  return `${hexEsc}[${ansiFontModes[mode]};${ansiColorCodes[color]}m${font}`;
}
