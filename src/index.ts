import type { UpdateTargetFontColorArg } from "./@types";
import { handleKeypress, hideCursor, showCursor, write } from "./core/io";
import { applyTextStyle } from "./core/utils";
import { styleFont, styleFontReset } from "./renderer/font";

export function checkSpace(keypress: string) {
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

export function calculateWpm(
  keypressCount: number,
  uncorrectedErrorsCount: number,
  elapsedTime: number
) {
  const grossWpm = keypressCount / 5;
  const oneMin = 1000; //* 60;
  const elapsedTimeInMin = elapsedTime / oneMin;

  const wpm = grossWpm - uncorrectedErrorsCount / elapsedTimeInMin;
  return Math.round(wpm);
}

export function calculateAccuracy(
  noOfCorrectChar: number,
  totalPromptLength: number
) {
  return (noOfCorrectChar / totalPromptLength) * 100;
}
export type PlayerStat = {
  wpm: number;
  accuracy: number;
  timeout: number;
  mistakes: number;
};

export function showStats(playerStat: PlayerStat) {
  const { wpm, accuracy, timeout, mistakes } = playerStat;
  const timeoutInmin = timeout / 1000;
  console.log("Result");
  console.log("speed: " + wpm + "wpm");
  console.log("accuracy: " + Math.round(accuracy) + "%");
  console.log("time: " + Math.round(timeoutInmin) + "s");
  console.log("mistakes: " + mistakes);
}

function $$game() {
  // const textPrompt = "Attack the king";
  const textPrompt =
    "To keep the width at 300px, no matter the amount of padding, you can use the box-sizing property This causes the element to maintain its actual width; if you increase the padding, the available content space will decrease.";

  const textPromptLength = textPrompt.length;
  const timeout = 1000 * 30;

  let mistakes = 0;
  let noOfcorrectChar = 0;

  let styledTextPrompt = applyTextStyle({
    text: textPrompt,
    styleFn: styleFont,
    styleFnConfig: { mode: "dim" },
  });
  write(styledTextPrompt + styleFontReset);

  const prevTime = Date.now();

  hideCursor();

  handleKeypress(
    ({ storedKeypress, keypress, keypressCount, isTimeout }) => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - prevTime;

      if (isTimeout) {
        const accuracy = calculateAccuracy(noOfcorrectChar, textPromptLength);
        const wpm = calculateWpm(keypressCount, mistakes, elapsedTime);

        showStats({ accuracy, timeout: elapsedTime, mistakes, wpm });
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

      if (mistake) {
        ++mistakes;
      } else {
        ++noOfcorrectChar;
      }

      if (keypressCount === textPromptLength) {
        if (storedKeypress === textPrompt) {
          console.log("\nyou win");
        } else {
          console.log("\nCompleted");
        }
        const accuracy = calculateAccuracy(noOfcorrectChar, textPromptLength);
        const wpm = calculateWpm(keypressCount, mistakes, elapsedTime);

        showStats({ accuracy, timeout: elapsedTime, mistakes, wpm });
        showCursor();
        process.exit();
      }
    },
    { storeKeypress: true, resetWindow: true, timeout }
  );
}

$$game();

// handleKeypress(keypress => {
//   if (keypress === "attack") {
//     console.log("\nyou win again");
//     process.exit();
//   }
// });
