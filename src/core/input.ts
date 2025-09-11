import type { InputKey } from "@/@types";

export class Input {
  static isCtrlL(char: InputKey) {
    return char === "\u000C";
  }

  static isBackspace(char: InputKey) {
    return char === "\u0008";
  }

  static isSpaceBar(char: InputKey) {
    return char === "\u0020";
  }

  static isEnter(char: InputKey) {
    return char === "\r";
  }

  static isCtrlC(char: InputKey) {
    return char === "\u0003";
  }

  static isChar(char1: InputKey, char2: InputKey) {
    return char1 === char2;
  }
}
