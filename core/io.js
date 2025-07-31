import readline from "readline";

let globalInterface = null;
let currentOnKeyPress = null;

export function clearScreen() {
  process.stdout.write("\x1B[2J\x1B[0;0H");
}

export function write(text = "") {
  process.stdout.write(text);
}

export function writeLine(text = "") {
  write(text + "\n");
}

export function initInput(onkeyPressFn) {
  process.stdin.removeAllListeners("data");
  currentOnKeyPress = onkeyPressFn;
  process.stdin.setRawMode(true);
  process.stdin.setEncoding("utf8");
  process.stdin.resume();
  process.stdin.on("data", key => {
    if (key === "\u0003") {
      process.exit();
    }
    if (currentOnKeyPress) currentOnKeyPress(key);
  });
}

export function promptInput(onInputFn) {
  if (globalInterface) {
    globalInterface.close();
    globalInterface = nullq;
  }
  process.stdin.setRawMode(false);
  console.log("prompt");
  process.stdin.removeAllListeners("data");
  globalInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  globalInterface.question("", answer => {
    console.log("ans ", answer);
    globalInterface.close();
    globalInterface = null;
    onInputFn(answer);
    setImmediate(() => {
      if (currentOnKeyPress) initInput(currentOnKeyPress);
    }, 10);
  });
}
