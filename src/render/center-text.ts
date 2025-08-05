import {
  textCenterAlign,
  textCenterLeftPadding,
  textCenterRightPadding,
} from "./utils/helper";
import type { CenterTextOptions } from "@/types";

export default function centerText(
  $texts: string[],
  options?: CenterTextOptions | string
) {
  const texts = $texts.map((t) => (typeof t !== "string" ? String(t) : t));

  if (!Array.isArray(texts)) {
    throw new TypeError(
      `Expected first  argument to be an array but received ${typeof texts}.`
    );
  }

  if (options && typeof options === "object" && "padding" in options) {
    const padLen = options["padLength"];
    switch (options["padding"]) {
      case "right":
        textCenterRightPadding(texts, padLen);
        break;
      case "left":
        textCenterLeftPadding(texts, padLen);
        break;
      default:
        textCenterAlign(texts);
        break;
    }
  } else {
    console;
    textCenterAlign(texts);
  }
}
centerText(["over", "gamestate", "car", "game", "title", "prologue"]);
console.log(process.stdout.columns, " ", process.stdout.rows);
