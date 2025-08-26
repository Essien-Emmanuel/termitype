import type { UpdateTargetFontColorArg } from "./@types";
import { handleKeypress, hideCursor, showCursor, write } from "./core/io";
import { applyTextStyle } from "./core/utils";
import { styleFont, styleFontReset } from "./renderer/font";

export function checkSpace(keypress: string) {
  console.log(keypress);
  if (keypress === "\u0020") {
    console.log("is space bar");
  }
}

// check textPrompt[keypressCount - 1] is space
// if space go back one step and count the chars, that is the word
// user this word for the number of chars in a timeout to calculate speed and accuracy and consistency

function matchKeypressToTextPromt(
  textPrompt: string,
  keypress: string,
  keypressCount: number
) {
  checkSpace(keypress);
  if (textPrompt[keypressCount - 1] !== keypress) {
    return { match: false, fontPos: keypressCount, mistake: true };
  }
  return { match: true, fontPos: keypressCount, mistake: false };
}

export function updateStyledTextPrompt({
  fontPos,
  match,
  textPrompt,
}: UpdateTargetFontColorArg) {
  const styledKeys = textPrompt.split(`\x1b`);
  const lastStyledFont = styledKeys[fontPos];

  const font = lastStyledFont[lastStyledFont.length - 1];

  const styledFont = match
    ? styleFont({ font, mode: "bold" }).split("\x1b").slice(1).join("\x1b")
    : styleFont({ font, color: "red" }).split("\x1b").slice(1).join("\x1b");

  styledKeys[fontPos] = styledFont;

  return styledKeys.join(`\x1b`) + styleFontReset;
}

const progressStats = {
  speed: 0,
  accuracy: 0,
  time: 0,
  alignedSpeed: 0,
};

function $$game() {
  const textPrompt = "Attack the king";

  const textPromptLength = textPrompt.length;

  let mistakes = 0;

  let styledTextPrompt = applyTextStyle({
    text: textPrompt,
    styleFn: styleFont,
    styleFnConfig: { mode: "dim" },
  });
  write(styledTextPrompt + styleFontReset);

  hideCursor();

  handleKeypress(
    ({ storedKeypress, keypress, keypressCount, isTimeout }) => {
      if (isTimeout) {
        console.log("timeout");
        console.log("Typing Result");
        console.log("mistakes: ", mistakes);
        showCursor();
        process.exit();
      }

      const { match, fontPos, mistake } = matchKeypressToTextPromt(
        textPrompt,
        keypress,
        keypressCount
      );

      const updatedTextPrompt = updateStyledTextPrompt({
        textPrompt: styledTextPrompt,
        match,
        fontPos,
      });

      write(updatedTextPrompt);

      styledTextPrompt = updatedTextPrompt;

      if (mistake) ++mistakes;

      if (keypressCount === textPromptLength) {
        if (storedKeypress === textPrompt) {
          console.log("\nyou win");
          console.log("mistakes: ", mistakes);
          showCursor();
          process.exit();
        } else {
          console.log("\nCompleted");
          console.log("mistakes: ", mistakes);
          showCursor();
          process.exit();
        }
      }
    },
    { storeKeypress: true, resetWindow: true }
  );
}

$$game();

// handleKeypress(keypress => {
//   if (keypress === "attack") {
//     console.log("\nyou win again");
//     process.exit();
//   }
// });
