import { stdin, stdout, exit as processExit } from "node:process";

export function clearScreen() {
  stdout.write("\x1B[2J\x1B[0;0H");
}

export function write(text = "") {
  stdout.write(text);
}

export function writeLine(text = "") {
  write(text + "\n");
}

export function exit(message = null) {
  if (message) writeLine(message);
  stdin.removeAllListeners();
  processExit();
}

export function initInput({ prompt = "", onKeyPress }) {
  stdin.removeAllListeners("data");

  if (prompt) {
    writeLine(prompt);
    writeLine();
  }

  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  stdin.on("data", (key) => {
    if (key === "\u0003") {
      exit();
    }
    if (onKeyPress) {
      onKeyPress(key);
    }
  });
}

export function promptInput({ onType, prompt = "" }) {
  stdin.removeAllListeners("data");
  stdin.setRawMode(false);

  if (prompt) writeLine(prompt);

  stdin.on("data", ($answer) => {
    const answer = $answer.trim().toLowerCase();
    if (onType) onType(answer);
  });
}
