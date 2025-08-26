const { stdin, stdout } = process;

export function resetWindow() {
  stdout.write("\u001b[1K" + `\u001b[1G`);
  // \u001b[2K = clear line
  // \u001b[1G = reset cursor to start of line
}

export function write(text: string) {
  stdout.write(text);
}

export function bold(char: string) {
  return `\x1b[1;37m${char}\x1b[0m`;
}

export function dim(char: string) {
  return `\x1b[2;37m${char}\x1b[0m`;
}

export function greenify(char: string) {
  return `\x1b[1;32m${char}\x1b[0m`;
}

export function redify(char: string) {
  return `\x1b[1;31m${char}\x1b[0m`;
}

export function hideCursor() {
  stdout.write("\x1B[?25l");
}

export function showCursor() {
  stdout.write("\x1B[?25h");
}

export type HandlekeypressHandler = (
  storedKeypress: string,
  keypress: string
) => void;
export type HandlekeypressOptions = { storeKeypress: boolean };

function handleKeypress(
  handler: HandlekeypressHandler,
  { storeKeypress = false }: HandlekeypressOptions
) {
  stdin.removeAllListeners("data");
  stdin.setEncoding("utf8");
  stdin.setRawMode(true);

  let storedKeypress = "";

  //   console.log("type >  ", textPrompt);
  stdin.on("data", (keypress: string) => {
    keypressCount += 1;

    if (storeKeypress) {
      if (keypress === "\r") {
        storedKeypress += "";
      } else {
        storedKeypress += keypress;
      }
    } else {
      storedKeypress = keypress;
    }

    resetWindow();

    if (keypress === "\u0003") {
      process.exit();
    }
    handler(storedKeypress, keypress);
  });
}

const textPrompt = "Attacking the Greatest Minds";
const textPromptLength = textPrompt.length;
let keypressCount = 0;
let mistakes = 0;

function matchKeypressToTarget(keypress: string) {
  if (textPrompt[keypressCount - 1] !== keypress) {
    ++mistakes;
    return { match: false, fontPos: keypressCount };
  }
  return { match: true, fontPos: keypressCount };
}

export type UpdateTargetFontColorArg = {
  textPrompt: string;
  fontPos: number;
  match: boolean;
};

export type ApplyTextStyleArg = (char: string) => string;

export function applyTextStyle(text: string, sytleFn: ApplyTextStyleArg) {
  const textArr = text.split("");
  return textArr.reduce((acc, curr) => {
    acc += sytleFn(curr);
    return acc;
  }, "");
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

function game() {
  const styledTextPrompt = applyTextStyle(textPrompt, dim);
  write(styledTextPrompt);

  hideCursor();

  handleKeypress(
    (storedKeypress, keypress) => {
      const { match, fontPos } = matchKeypressToTarget(keypress);
      const updatedTextPrompt = updateTextPrompt({
        textPrompt,
        match,
        fontPos,
      });
      write(updatedTextPrompt);

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
game();

// handleKeypress(keypress => {
//   if (keypress === "attack") {
//     console.log("\nyou win again");
//     process.exit();
//   }
// });
