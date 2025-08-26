import type { HandlekeypressHandler, HandlekeypressOptions } from "@/@types";
import process from "process";

const { stdin, stdout } = process;

export function resetTerminalWindow() {
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

export function handleKeypress(
  handler: HandlekeypressHandler,
  { storeKeypress = false, resetWindow = false }: HandlekeypressOptions
) {
  stdin.removeAllListeners("data");
  stdin.setEncoding("utf8");
  stdin.setRawMode(true);

  let keypressCount = 0;
  let storedKeypress = "";

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

    if (resetWindow) resetTerminalWindow();

    if (keypress === "\u0003") {
      process.exit();
    }
    handler({ storedKeypress, keypress, keypressCount });
  });
}
