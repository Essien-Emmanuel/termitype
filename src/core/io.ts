import { stdin, stdout, exit as processExit } from "node:process";

import type { InputKeyPressConfig, InputLineConfig } from "../types";

export function clearScreen() {
  stdout.write("\x1B[2J\x1B[0;0H");
}

export function write(text: string = "") {
  stdout.write(text);
}

export function writeLine(text: string = "") {
  write(text + "\n");
}

export function exit(message = "") {
  if (message) writeLine(message);
  stdin.removeAllListeners();
  processExit();
}

export function initInput({ prompt = "", onKeyPress }: InputKeyPressConfig) {
  stdin.removeAllListeners("data");

  if (prompt) {
    writeLine(prompt);
    writeLine();
  }

  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  stdin.on("data", (key: string) => {
    if (key === "\u0003") {
      exit();
    }
    if (onKeyPress) {
      onKeyPress(key);
    }
  });
  return;
}

export function promptInput({ onType, prompt = "" }: InputLineConfig) {
  stdin.removeAllListeners("data");
  stdin.setRawMode(false);

  if (prompt) writeLine(prompt);

  stdin.on("data", ($answer: string) => {
    const answer = $answer.trim().toLowerCase();
    if (onType) onType(answer);
  });

  return;
}
