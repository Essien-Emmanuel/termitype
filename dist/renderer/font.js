import { ansiColorCodes } from "./color.js";
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
};
export const styleFontReset = `\x1b[${ansiFontModes.reset}m`;
export const styleUnderlineReset = `\x1b[24m`;
export function getFontStyle(config = { color: "white", mode: "bold" }) {
    const { color = "white", mode = "bold" } = config;
    return `\x1b[${ansiFontModes[mode]};${ansiColorCodes[color]}m`;
}
export function styleFont(config) {
    const { font, mode = "bold", color = "white" } = config;
    const hexEsc = `\x1b`;
    return `${hexEsc}[${ansiFontModes[mode]};${ansiColorCodes[color]}m${font}`;
}
