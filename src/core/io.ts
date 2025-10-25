import process from "node:process";
import fs from "fs/promises";
import type { HandlekeypressHandler } from "@/@types";

const { stdin, stdout, argv, exit } = process;

export function resetTerminalWindow(lines: number = 2) {
  const rows = process.stdout.rows - lines;
  process.stdout.write(`\x1b[${rows};0H\n`);
}
export function positionTerminalCursor(cursorPos: number = 1) {
  process.stdout.write(`\x1b[2;${cursorPos}f`);
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
  process.stdout.write("\x1b[2J\x1b[3J\x1b[H\n");
}

export function setupTerminal() {
  // alternate screen
  process.stdout.write("\x1b[?1049h");
}
export function exitAltTerminal() {
  // alternate screen
  clearEntireScreen();
  process.stdout.write("\x1b[?1049l");
  showCursor();
}

export function handleKeypress(handler: HandlekeypressHandler) {
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

export const exitProgram = exit;

export const terminalArgs = argv;
