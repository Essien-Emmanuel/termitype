import { applyTextStyle, readGameFile } from "./utils.game";
import { styleFont, styleFontReset } from "@/renderer/font";
import { positionTerminalCursor, write } from "@/core/io";

export async function initializeGame() {
  const rawTextPrompt = await readGameFile("prompts/t.txt");

  if (!rawTextPrompt) {
    process.stdout.write(
      "\x1b[1;34mThere is no practice available for now\x1b[0m\n"
    );
    process.exit();
  }

  const maxTerminalCharLength =
    (process.stdout.rows - 2) * process.stdout.columns;

  const textPrompt = rawTextPrompt
    .replace(/\s\s+/g, " ")
    .slice(0, maxTerminalCharLength - 1);

  const textPromptLength = textPrompt.length;

  let promptCharPos = 0;

  const textPromptRows = Math.ceil(textPromptLength / process.stdout.columns);

  let styledTextPrompt =
    applyTextStyle({
      text: textPrompt,
      styleFn: styleFont,
      styleFnConfig: { mode: "dim" },
    }) + styleFontReset;

  write(styledTextPrompt);
  positionTerminalCursor(promptCharPos + 1);

  return {
    textPromptRows,
    styledTextPrompt,
    textPromptLength,
    textPrompt,
  };
}
