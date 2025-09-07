import process from "process";
import fs from "fs/promises";
import type { HandlekeypressHandler, HandlekeypressOptions } from "@/@types";

const { stdin, stdout } = process;

export function resetTerminalWindow(lines: number = 2) {
  const rows = process.stdout.rows - lines;
  process.stdout.write(`\x1b[${rows};0H\n`);
}
export function positionTerminalCursor(cursorPos: number = 1) {
  process.stdout.write(`\x1b[1;${cursorPos}f`);
}

export function setCursorPos(row: number = 1, col: number = 1) {
  process.stdout.write(`\x1b[${row};${col}H`);
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

export function moveDownBy(lines: number) {
  process.stdout.write(`\x1b[${lines};1H`);
}

export function clearEntireScreen() {
  process.stdout.write("\x1b[2J\n");
}

export function handleKeypress(
  handler: HandlekeypressHandler,
  {
    storeKeypress = false,
    resetWindow = false,
    timeout,
    textPromptRows,
  }: HandlekeypressOptions
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

    if (resetWindow) {
      resetTerminalWindow(textPromptRows);
    }

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

export function handleKey(handler: any) {
  stdin.removeAllListeners("data");
  stdin.setRawMode(true);
  stdin.setEncoding("utf-8");

  stdin.on("data", (key: string) => {
    handler(key);
  });
}

export async function readFile(filePath: string) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (error) {
    return null;
  }
}

export async function writeFile(filePath: string, data: Record<string, any>) {
  try {
    const stringifiedData = JSON.stringify(data);
    await fs.writeFile(filePath, stringifiedData);
    return true;
  } catch (error) {
    return null;
  }
}

export function selectTxtFileFromLocalSys() {}
