const { stdin, stdout } = process;

export function resetWindow() {
  stdout.write("\u001b[1K" + `\u001b[1G`);
  // \u001b[2K = clear line
  // \u001b[1G = reset cursor to start of line
}

export function write(text: string) {
  stdout.write(text);
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

  hideCursor();

  let storedKeypress = "";

  console.log("type >  ", targetText);
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

    write(storedKeypress);

    if (keypress === "\u0003") {
      process.exit();
    }
    handler(storedKeypress, keypress);
  });
}

const targetText = "Attacking the Greatest Minds";
const targetTextLength = targetText.length;
let keypressCount = 0;
let mistakes = 0;

function matchKeypressToTarget(keypress: string) {
  if (targetText[keypressCount - 1] !== keypress) {
    ++mistakes;
  }
}

handleKeypress(
  (storedKeypress, keypress) => {
    matchKeypressToTarget(keypress);

    if (keypressCount === targetTextLength) {
      if (storedKeypress === targetText) {
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

// handleKeypress(keypress => {
//   if (keypress === "attack") {
//     console.log("\nyou win again");
//     process.exit();
//   }
// });
