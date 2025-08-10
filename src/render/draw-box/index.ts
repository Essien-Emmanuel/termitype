import { getTextMaxLength, validatePadLength } from "../utils/helper";
import { borderStyles } from "./border-styles";

const defaultPaddingLength = 2;

/**
 * Border custom style
 * Example {
 *      border: {
            topLeft: '[', top: '=', topRight: ']',
            left: '|', right: '|',
            bottomLeft: '[', bottom: '=', bottomRight: ']'
        }
 *    }
 * }
 */
export interface CustomBorderStyle {
  topLeft: string;
  top: string;
  topRight: string;
  left: string;
  right: string;
  bottomLeft: string;
  bottom: string;
  bottomRight: string;
}

export type NamedBorderStyle = keyof typeof borderStyles;

export interface CustomBorderOption {
  custom: CustomBorderStyle;
}

export interface NamedBorderOption {
  preset: NamedBorderStyle;
}

export type BorderOption = CustomBorderOption | NamedBorderOption;

export type PaddingSide = "top" | "right" | "bottom" | "left" | "all";

/**
 * First option, If no side, length is applied to all sides
 * Second option, string reps shorthand: 'length-side'
 */
export type PaddingConfig =
  | {
      side?: PaddingSide;
      length: number;
    }
  | string;

/**
 * Border shorthand "width-style-color"
 * Example: "dotted-red"
 */
export interface DrawBoxOptions {
  border?:
    | {
        style?: BorderOption;
        margin?: number;
        padding?: PaddingConfig;
        color?: string;
      }
    | string;
  borderColor?: string;
}

export interface DrawBoxConfig {
  contents: string[];
  options?: DrawBoxOptions;
}

export default function drawBox({ contents, options }: DrawBoxConfig) {
  const contentsMaxLen = getTextMaxLength(contents);
  const hBoarderLen = contentsMaxLen + defaultPaddingLength;

  let marginLen = 0;
  let padLeft = 0;
  let padRight = 0;

  let borderStyle = borderStyles["bold"];

  if (options) {
    if (options.border) {
      const border = options.border;

      if (typeof border !== "string") {
        if (border.style) {
          const style = border.style;

          if (!("custom" in style)) {
            borderStyle = borderStyles[style.preset];
          } else if (style && "custom" in style) {
            borderStyle = style.custom;
          }
        }

        if (border.margin) {
          marginLen = border.margin;
        }

        if (border.padding) {
          const padding = border.padding;

          if (typeof padding !== "string") {
            const padLen = padding.length;
            validatePadLength(padLen);

            if ("side" in padding) {
              const side = padding.side;
              if (side === "left") {
                padLeft += padLen;
              } else if (side === "right") {
                padRight += padLen;
              } else if (side === "all") {
                padLeft += padLen;
                padRight += padLen;
              }
            } else {
              const quarterLen = Math.round(padLen / 2);
              padLeft += quarterLen;
              padRight += quarterLen;
            }
          } else {
            const [padLen, side] = padding.split("-");
            const $padLen = Number(padLen);

            if (side === "left") {
              padLeft += $padLen;
            } else if (side === "right") {
              padRight += $padLen;
            } else if (side === "all") {
              padLeft += $padLen;
              padRight += $padLen;
            }
            // last work
          }
        }
      } else {
        const [$style] = border.toString().trim().split("-");
        borderStyle = borderStyles[$style as NamedBorderStyle];
      }
    }
  }

  const {
    top,
    topLeft,
    topRight,
    bottom,
    bottomLeft,
    bottomRight,
    right,
    left,
  } = borderStyle;

  const tl = topLeft;
  const t = top;
  const tr = topRight;
  const r = right;
  const br = bottomRight;
  const b = bottom;
  const bl = bottomLeft;
  const l = left;

  const margin = " ".repeat(marginLen);
  const leftPadding = padLeft > 0 ? " ".repeat(padLeft + 1) : " ";
  const rightPadding = padRight > 0 ? " ".repeat(padRight + 1) : " ";

  let pad = 0;
  if (padLeft) {
    pad += padLeft;
  }
  if (padRight) {
    pad += padRight;
  }

  const topBorder = margin + tl + t.repeat(hBoarderLen + pad) + tr;
  const bottomBorder = margin + bl + b.repeat(hBoarderLen + pad) + br;

  console.log(topBorder);
  for (let i = 0; i < contents.length; i++) {
    const yPadComplete = contentsMaxLen - contents[i].length;

    const sideBorderNContent =
      margin +
      l +
      leftPadding +
      contents[i].trim() +
      " ".repeat(yPadComplete) +
      rightPadding +
      r;
    console.log(sideBorderNContent);
  }
  console.log(bottomBorder);

  return;
}

drawBox({
  contents: ["game", "prologue", "car", "settings", "fps"],
  options: {
    border: {
      style: { preset: "bold" },
      margin: 10,
      // padding: { length: 20, side: "left" },
      padding: "5-all",
    },
  },
});
