import type { UpdateTargetFontColorArg } from "./@types";
import { handleKeypress, hideCursor, write } from "./core/io";
import { applyTextStyle } from "./core/utils";
import { styleFont, styleFontReset } from "./renderer/font";

function matchKeypressToTextPromt(
  textPrompt: string,
  keypress: string,
  keypressCount: number
) {
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

function $$game() {
  const textPrompt = "Attack";

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
    ({ storedKeypress, keypress, keypressCount }) => {
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
          process.exit();
        } else {
          console.log("\nCompleted");
          console.log("mistakes: ", mistakes);
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
