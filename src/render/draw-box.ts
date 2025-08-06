import { getTextMaxLength } from "./utils/helper";

const defaultPaddingLength = 2;

export default function drawBox(contents: string[], _options?: {}) {
  const contentsMaxLen = getTextMaxLength(contents);
  const hBoarderLen = contentsMaxLen + defaultPaddingLength;

  const hBoarder = "+" + "-".repeat(hBoarderLen) + "+";
  console.log(hBoarder);
  for (let i = 0; i < contents.length; i++) {
    const yPadComplete = contentsMaxLen - contents[i].length;

    const vBoarder =
      "| " + contents[i].trim() + " ".repeat(yPadComplete) + " |";
    console.log(vBoarder);
  }

  console.log(hBoarder);
  return;
}

drawBox(["game", "prologue", "car", "settings"]);
