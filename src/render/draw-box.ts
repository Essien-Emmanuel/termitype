import { getTextMaxLength } from "./utils/helper";

const defaultPaddingLength = 2;

export type BorderStyle = "dotted" | "dashed" | "double";

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

/**
 * Border shorthand "width-style-color"
 * Example: "23-dotted-red"
 */
export interface DrawBoxOptions {
  border?:
    | {
        style?: BorderStyle | { custom: CustomBorderStyle };
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

const defaultBorderStyleEdge = "+";
const defaultBorderStyleHorizontal = "-";
const defaultBorderStyleWall = "|";

export default function drawBox({ contents, options }: DrawBoxConfig) {
  const contentsMaxLen = getTextMaxLength(contents);
  const hBoarderLen = contentsMaxLen + defaultPaddingLength;

  let borderHB = defaultBorderStyleHorizontal;
  let borderEdge = defaultBorderStyleEdge;
  let borderSides = defaultBorderStyleWall;

  if (options) {
    if (options.border) {
      if (typeof options.border === "object") {
        options.border;
        if (options.border.style && options.border.style === "dotted") {
          borderHB = ".";
          borderEdge = ".";
          borderSides = ".";
        } else if (options.border.style && options.border.style === "dashed") {
          // use default style
        } else if (options.border.style && options.border.style === "double") {
          borderHB = "=";
          borderEdge = "=";
          borderSides = "=";
        }
      }
    }
  }

  const hBoarder = borderEdge + borderHB.repeat(hBoarderLen) + borderEdge;
  console.log(hBoarder);
  for (let i = 0; i < contents.length; i++) {
    const yPadComplete = contentsMaxLen - contents[i].length;

    const vBoarder =
      borderSides +
      " " +
      contents[i].trim() +
      " ".repeat(yPadComplete) +
      " " +
      borderSides;
    console.log(vBoarder);
  }

  console.log(hBoarder);
  return;
}
drawBox({
  contents: ["game", "prologue", "car", "settings", "fps"],
  options: { border: { style: "dotted" } },
});

console.log("╓───╖");
