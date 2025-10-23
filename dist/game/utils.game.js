import path from "path";
import { readFile, writeFile } from "../core/io.js";
import { styleFont, styleFontReset } from "../renderer/font.js";
import { Input } from "../core/input.js";
import { generateRandomIndex } from "../core/utils.js";
const __dirname = import.meta.dirname;
const { isBackspace } = Input;
export function applyTextStyle(config) {
    const { styleFn, styleFnConfig, text } = config;
    const textArr = text.split("");
    return textArr.reduce((acc, curr) => {
        acc += styleFn({ font: curr, ...styleFnConfig });
        return acc;
    }, "");
}
export async function readGameFile(filename) {
    try {
        const fp = path.join(__dirname, "../..", `storage/${filename}`);
        const data = await readFile(fp);
        return data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
/**
 *
 * filename param is file name with no extension.
 * e.g. 'user'
 */
export async function writeToFile(filename, data) {
    try {
        const fp = path.join(__dirname, "../..", `storage/saves/${filename}.json`);
        const result = await writeFile(fp, data);
        return result;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
export function showStats(playerStat) {
    const { wpm, accuracy, timeout, mistakes } = playerStat;
    const timeoutInmin = timeout / 1000;
    console.log(styleFont({ font: "Result", mode: "bold" }) + styleFontReset);
    console.log("speed: " + wpm + "wpm");
    console.log("accuracy: " + Math.round(accuracy) + "%");
    console.log("time: " + Math.round(timeoutInmin) + "s");
    console.log("mistakes: " + mistakes);
    const suggestions = [
        "Keep your accuracy in check",
        "Practice more, slow progress is still progress",
        "Daily practice improves speed and accuracy",
        "Keep going",
        "Gambare! Gambare!",
    ];
    const randInd = generateRandomIndex(suggestions.length);
    let quote = styleFont({ font: suggestions[randInd], color: "yellow" });
    if (playerStat.improved) {
        quote = styleFont({
            font: "You scored a new typing record",
            color: "green",
        });
    }
    console.log(quote + styleFontReset);
}
export function matchKeypressToTextPromt(textPrompt, keypress, promptFontPos) {
    if (isBackspace(keypress)) {
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
export function updateStyledTextPrompt({ fontPos, match, textPrompt, isBackspace, }) {
    const styledKeys = textPrompt.split(`\x1b`).slice(0, -1);
    if (isBackspace) {
        const unTypedPromptFonts = styledKeys.slice(fontPos + 1);
        const styledCorrectedPrompt = unTypedPromptFonts.map((styledFont, index) => {
            const tartgetFont = unTypedPromptFonts[index][styledFont.length - 1];
            return styleFont({
                font: tartgetFont,
                mode: "dim",
            });
        });
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
/**
 * Map word data to the position just after the word. more like position
 * and not index:
 *  So word 'this' is mapped to {5: {word: 'this'}} instead of {4: {word: 'this}}
 */
export function createAfterWordMap(prompt) {
    const afterWordMap = {};
    let spacePos = 0;
    let charCount = 0;
    let word = "";
    for (const char of prompt) {
        ++charCount;
        ++spacePos;
        word += char;
        if (char === " ") {
            afterWordMap[spacePos] = {
                word,
                len: charCount - 1, // -1 to account for the space
                typed: "",
                visited: false,
                corrected: false,
            };
            charCount = 0;
            word = "";
        }
        if (prompt.length === spacePos) {
            afterWordMap[spacePos] = {
                word,
                len: charCount,
                typed: "",
                visited: false,
                corrected: false,
            };
        }
    }
    return afterWordMap;
}
