import type { UpdateTargetFontColorArg } from "./@types";
import { handleKeypress, hideCursor, write } from "./core/io";
import { applyTextStyle } from "./core/utils";
import { bold, dim, redify } from "./renderer/color";

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

export function updateTextPrompt({
  fontPos,
  match,
  textPrompt,
}: UpdateTargetFontColorArg) {
  const targetfirstHalf = textPrompt.slice(0, fontPos - 1);
  const targetSecondHalf = textPrompt.slice(fontPos);
  const font = textPrompt[fontPos - 1];

  const colorizedFont = match ? bold(textPrompt[fontPos - 1]) : redify(font);

  return targetfirstHalf + colorizedFont + targetSecondHalf;
}

function $$game() {
  const textPrompt = "Attacking the Greatest Minds";
  const textPromptLength = textPrompt.length;

  let mistakes = 0;

  const styledTextPrompt = applyTextStyle(textPrompt, dim);
  write(styledTextPrompt);

  hideCursor();

  handleKeypress(
    ({ storedKeypress, keypress, keypressCount }) => {
      const { match, fontPos, mistake } = matchKeypressToTextPromt(
        textPrompt,
        keypress,
        keypressCount
      );

      const updatedTextPrompt = updateTextPrompt({
        textPrompt,
        match,
        fontPos,
      });

      write(updatedTextPrompt);

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
    { storeKeypress: true }
  );
}

$$game();

// handleKeypress(keypress => {
//   if (keypress === "attack") {
//     console.log("\nyou win again");
//     process.exit();
//   }
// });
