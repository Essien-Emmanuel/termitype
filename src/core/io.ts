import { stdin, stdout, exit as processExit } from "node:process";
import readline from "readline/promises";

const ac = new AbortController();
const signal = ac.signal;

const rl = readline.createInterface({ input: stdin, output: stdout });

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

export interface PromptInputOptions {
  prompt: string;
  timeout?: number;
}

export async function promptInput(onLine: any, options: PromptInputOptions) {
  try {
    if (options.timeout) {
      setTimeout(() => ac.abort(), options.timeout);
    }

    const response = await rl.question(options.prompt, { signal });
    onLine(response);
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("timeout");
    } else {
      console.log(error.message);
    }
  }
}
