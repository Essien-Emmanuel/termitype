import { applyTextStyle, readGameFile } from "./utils.game.js";
import { styleFont, styleFontReset } from "../renderer/font.js";
import { positionTerminalCursor, write } from "../core/io.js";
export async function initializeGame(filename) {
    const userStr = await readGameFile("saves/user.json");
    let userLevel = "beginner";
    if (userStr) {
        const user = JSON.parse(userStr);
        userLevel = user.level;
    }
    const targetPromptFile = filename
        ? `prompts/${userLevel}/${filename}/1.txt`
        : `prompts/${userLevel}/index.txt`;
    const rawTextPrompt = await readGameFile(targetPromptFile);
    if (!rawTextPrompt) {
        process.stdout.write("\x1b[1;34mThere is no practice available for now\x1b[0m\n");
        process.exit();
    }
    const maxTerminalCharLength = (process.stdout.rows - 2) * process.stdout.columns;
    const textPrompt = rawTextPrompt
        .replace(/\s\s+/g, " ")
        .slice(0, maxTerminalCharLength - 1);
    const textPromptLength = textPrompt.length;
    let promptCharPos = 0;
    const textPromptRows = Math.ceil(textPromptLength / process.stdout.columns);
    let styledTextPrompt = applyTextStyle({
        text: textPrompt,
        styleFn: styleFont,
        styleFnConfig: { mode: "dim" },
    }) + styleFontReset;
    positionTerminalCursor(promptCharPos + 1);
    write(styledTextPrompt);
    return {
        textPromptRows,
        styledTextPrompt,
        textPromptLength,
        textPrompt,
    };
}
