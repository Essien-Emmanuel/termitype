import { applyTextStyle, readGameFile } from "./utils.game";
import { styleFont, styleFontReset } from "@/renderer/font";
import { positionTerminalCursor, setupTerminal, write } from "@/core/io";
import type { User } from "./@types";

export async function initializeGame(filename: string) {
  const userStr = await readGameFile("saves/user.json");

  let userLevel = "beginner";

  if (userStr) {
    const user: User = JSON.parse(userStr);
    userLevel = user.level;
  }

  const targetPromptFile = filename
    ? `prompts/${userLevel}/${filename}/1.txt`
    : `prompts/${userLevel}/index.txt`;

  const rawTextPrompt = await readGameFile(targetPromptFile);

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

  setupTerminal();
  write(styledTextPrompt);
  positionTerminalCursor(promptCharPos + 1);

  return {
    textPromptRows,
    styledTextPrompt,
    textPromptLength,
    textPrompt,
  };
}
