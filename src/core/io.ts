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
  { storeKeypress = false, resetWindow = false, timeout }: HandlekeypressOptions
) {
  stdin.removeAllListeners("data");
  stdin.setEncoding("utf8");
  stdin.setRawMode(true);

  let keypressCount = 0;
  let storedKeypress = "";
  let $keypress = "";

  if (timeout) {
    // set timeout
    const timer = setTimeout(() => {
      clearTimeout(timer);
      handler({
        storedKeypress,
        keypress: $keypress,
        keypressCount,
        isTimeout: true,
        isBackspaceKeypress: false,
      });
      process.removeAllListeners("data");
    }, timeout);
  }

  stdin.on("data", (keypress: string) => {
    let isBackspaceKeypress = false;
    ++keypressCount;
    $keypress = keypress;

    if (storeKeypress) {
      if (keypress === "\r") {
        storedKeypress += "";
      } else {
        storedKeypress += keypress;
      }
    } else {
      storedKeypress = keypress;
    }

    if (keypress === "\u0008") {
      isBackspaceKeypress = true;
    }

    if (resetWindow) resetTerminalWindow();

    if (keypress === "\u0003") {
      showCursor();
      process.exit();
    }

    handler({
      storedKeypress,
      keypress,
      keypressCount,
      isTimeout: false,
      isBackspaceKeypress,
    });
  });
}
