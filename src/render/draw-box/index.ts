import { getTextMaxLength } from "../utils/helper";
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

/**
 * Border shorthand "width-style-color"
 * Example: "23-dotted-red"
 */
export interface DrawBoxOptions {
  border?:
    | {
        style?: BorderOption;
        width?: number;
        margin?: number;
        padding?: number;
        color?: string;
      }
    | string;
  borderColor?: string;
  borderWith?: number;
}

export interface DrawBoxConfig {
  contents: string[];
  options?: DrawBoxOptions;
}

export default function drawBox({ contents, options }: DrawBoxConfig) {
  const contentsMaxLen = getTextMaxLength(contents);
  const hBoarderLen = contentsMaxLen + defaultPaddingLength;

  let borderStyle = borderStyles["bold"];

  if (options) {
    if (options.border) {
      if (typeof options.border !== "string") {
        if (options.border.style && !("custom" in options.border.style)) {
          borderStyle = borderStyles[options.border.style.preset];
        } else if (options.border.style && "custom" in options.border.style) {
          borderStyle = options.border.style.custom;
        }
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

  const topBorder = tl + t.repeat(hBoarderLen) + tr;
  const bottomBorder = bl + b.repeat(hBoarderLen) + br;

  console.log(topBorder);
  for (let i = 0; i < contents.length; i++) {
    const yPadComplete = contentsMaxLen - contents[i].length;

    const sideBorderNContent =
      l + " " + contents[i].trim() + " ".repeat(yPadComplete) + " " + r;
    console.log(sideBorderNContent);
  }
  console.log(bottomBorder);

  return;
}
drawBox({
  contents: ["game", "prologue", "car", "settings", "fps"],
  options: { border: { style: { preset: "double" } } },
});
