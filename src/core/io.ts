import { stdin, stdout, exit as processExit } from "node:process";

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

export function initInput(onData: any) {
  stdin.removeAllListeners("data");
  stdin.setRawMode(true);
  stdin.setEncoding("utf-8");
  stdin.resume();
  stdin.on("data", onData);
}

export function promptInput({ onType, prompt = "" }: any) {
  stdin.removeAllListeners("data");
  stdin.setRawMode(false);

  if (prompt) writeLine(prompt);

  stdin.on("data", ($answer: string) => {
    const answer = $answer.trim().toLowerCase();
    if (onType) onType(answer);
  });

  return;
}
