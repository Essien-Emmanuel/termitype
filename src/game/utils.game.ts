import path from "path";
import type {
  ApplyTextStyleConfig,
  PlayerStat,
  UpdateTargetFontColorArg,
} from "./@types";
import { readFile, writeFile } from "@/core/io";
import { styleFont, styleFontReset } from "@/renderer/font";
import { checkBackspace } from "@/core/utils";

const __dirname = import.meta.dirname;

export function applyTextStyle(config: ApplyTextStyleConfig) {
  const { styleFn, styleFnConfig, text } = config;
  const textArr = text.split("");

  return textArr.reduce((acc, curr) => {
    acc += styleFn({ font: curr, ...styleFnConfig });
    return acc;
  }, "");
}

export async function readGameFile(filename: string) {
  try {
    const fp = path.join(__dirname, "..", `${filename}`);
    const data = await readFile(fp);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function writeToFile(filename: string, data: Record<string, any>) {
  try {
    const fp = path.join(__dirname, "..", `saves/${filename}.json`);
    const result = await writeFile(fp, data);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function showStats(playerStat: PlayerStat) {
  const { wpm, accuracy, timeout, mistakes } = playerStat;
  const timeoutInmin = timeout / 1000;
  console.log("Result");
  console.log("speed: " + wpm + "wpm");
  console.log("accuracy: " + Math.round(accuracy) + "%");
  console.log("time: " + Math.round(timeoutInmin) + "s");
  console.log("mistakes: " + mistakes);
}

export function matchKeypressToTextPromt(
  textPrompt: string,
  keypress: string,
  promptFontPos: number
) {
  if (checkBackspace(keypress)) {
    return {
      match: false,
      fontPos: promptFontPos,
      mistake: false,
      isBackspace: true,
    };
  }

  if (textPrompt[promptFontPos - 1] !== keypress) {
    return {
      match: false,
      fontPos: promptFontPos,
      mistake: true,
      isBackspace: false,
    };
  }
  return {
    match: true,
    fontPos: promptFontPos,
    mistake: false,
    isBackspace: false,
  };
}

export function updateStyledTextPrompt({
  fontPos,
  match,
  textPrompt,
  isBackspace,
}: UpdateTargetFontColorArg) {
  const styledKeys = textPrompt.split(`\x1b`).slice(0, -1);

  if (isBackspace) {
    const unTypedPromptFonts = styledKeys.slice(fontPos + 1);

    const styledCorrectedPrompt = unTypedPromptFonts.map(
      (styledFont, index) => {
        const tartgetFont = unTypedPromptFonts[index][styledFont.length - 1];
        return styleFont({
          font: tartgetFont,
          mode: "dim",
        });
      }
    );
    const typedStyledPrompts = styledKeys.slice(0, fontPos + 1).join("\x1b");
    const untypedStyledPrompts = styledCorrectedPrompt.join("");

    return typedStyledPrompts + untypedStyledPrompts + styleFontReset;
  }

  const lastStyledFont = styledKeys[fontPos];

  const font = lastStyledFont[lastStyledFont.length - 1];

  const styledFont = match
    ? styleFont({ font, mode: "bold" }).split("\x1b").slice(1).join("\x1b")
    : styleFont({ font, color: "red" }).split("\x1b").slice(1).join("\x1b");

  styledKeys[fontPos] = styledFont;

  return styledKeys.join(`\x1b`) + styleFontReset;
}
