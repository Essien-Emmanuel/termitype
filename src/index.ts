import type { UpdateTargetFontColorArg } from "./@types";
import {
  handleKeypress,
  hideCursor,
  positionTerminalCursor,
  resetTerminalWindow,
  showCursor,
  write,
} from "./core/io";
import { applyTextStyle } from "./core/utils";
import { styleFont, styleFontReset } from "./renderer/font";

export function checkSpacebar(keypress: string) {
  if (keypress !== "\u0020") {
    return false;
  }
  return true;
}
export function checkBackspace(keypress: string) {
  if (keypress !== "\u0008") {
    return false;
  }
  return true;
}

// check textPrompt[keypressCount - 1] is space
// if space go back one step and count the chars, that is the word
// user this word for the number of chars in a timeout to calculate speed and accuracy and consistency

function matchKeypressToTextPromt(
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
  correctCharCount: number,
  totalPromptLength: number
) {
  return (correctCharCount / totalPromptLength) * 100;
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
  process.stdout.write("\x1b[2J\n");
  process.stdout.write("\x1b[1;1H");

  // const textPrompt = "Attack";
  const textPrompt =
    "To keep the width at 300px, no matter the amount of padding, you can use the box-sizing property This causes the element to maintain its actual width; if you increase the padding, the available content space will decrease.To keep the width at 300px, no matter the amount of padding, you can use the box-sizing property This causes the element to maintain its actual width; if you increase the padding, the available content space will decrease";

  const textPromptLength = textPrompt.length;
  const timeout = 1000 * 30;

  let mistakes = 0;
  let correctCharCount = 0;

  let styledTextPrompt =
    applyTextStyle({
      text: textPrompt,
      styleFn: styleFont,
      styleFnConfig: { mode: "dim" },
    }) + styleFontReset;
  write(styledTextPrompt);

  const prevTime = Date.now();

  // hideCursor();
  let promptCharPos = 0;
  const textPromptRows = Math.ceil(textPrompt.length / process.stdout.columns);
  handleKeypress(
    ({ storedKeypress, keypress, isTimeout, isBackspaceKeypress }) => {
      process.stdout.write("\x1b[1;1H");
      const currentTime = Date.now();
      const elapsedTime = currentTime - prevTime;

      if (isBackspaceKeypress) {
        if (promptCharPos > 0) {
          --promptCharPos;
        }

        if (mistakes > 0) {
          --mistakes;
        }

        if (correctCharCount > 0) {
          --correctCharCount;
        }
      } else {
        ++promptCharPos;
      }

      const { match, fontPos, mistake, isBackspace } = matchKeypressToTextPromt(
        textPrompt,
        keypress,
        promptCharPos
      );

      const updatedTextPrompt = updateStyledTextPrompt({
        textPrompt: styledTextPrompt,
        match,
        fontPos,
        isBackspace,
      });

      // log to screen
      write(updatedTextPrompt);

      // positionTerminalCursor(promptCharPos);

      // update prompt before next print
      styledTextPrompt = updatedTextPrompt;

      if (mistake) {
        ++mistakes;
      } else {
        if (!isBackspace) {
          ++correctCharCount;
        }
      }

      if (promptCharPos === textPromptLength) {
        if (storedKeypress === textPrompt) {
          console.log("\nyou win");
        } else {
          console.log("\nCompleted");
        }
        const accuracy = calculateAccuracy(correctCharCount, textPromptLength);
        const wpm = calculateWpm(promptCharPos, mistakes, elapsedTime);

        showStats({ accuracy, timeout: elapsedTime, mistakes, wpm });
        showCursor();
        process.exit();
      }

      if (isTimeout) {
        const accuracy = calculateAccuracy(correctCharCount, textPromptLength);
        const wpm = calculateWpm(promptCharPos, mistakes, elapsedTime);

        showStats({ accuracy, timeout: elapsedTime, mistakes, wpm });
        showCursor();
        process.exit();
      }
    },
    { storeKeypress: true, resetWindow: true, timeout, textPromptRows }
  );
}

$$game();

// handleKeypress(keypress => {
//   if (keypress === "attack") {
//     console.log("\nyou win again");
//     process.exit();
//   }
// });
