import type { InputKey } from "@/@types";

export const unicodeCharacters = {
  ctrlC: "\u0003",
  ctrlL: "\u000C",
  arrowUp: "\x1B[A",
  arrowDown: "\x1B[B",
  arrowRight: "\x1B[C",
  arrowLeft: "\x1B[D",
  backspace: "\u0008",
  spacebar: "\u0020",
  enter: "\r",
} as const;

export class Input {
  static isCtrlL(char: InputKey) {
    return char === unicodeCharacters["ctrlL"];
  }

  static isBackspace(char: InputKey) {
    return char === unicodeCharacters["backspace"];
  }

  static isSpaceBar(char: InputKey) {
    return char === unicodeCharacters["spacebar"];
  }

  static isEnter(char: InputKey) {
    return char === unicodeCharacters["enter"];
  }

  static isCtrlC(char: InputKey) {
    return char === unicodeCharacters["ctrlC"];
  }

  static isChar<T extends InputKey>(char1: InputKey, char2: T) {
    return char1 === char2;
  }

  static isArrowUp(char: InputKey) {
    return char === unicodeCharacters["arrowUp"];
  }
  static isArrowDown(char: InputKey) {
    return char === unicodeCharacters["arrowDown"];
  }

  static isArrowLeft(char: InputKey) {
    return char === unicodeCharacters["arrowLeft"];
  }
  static isArrowRight(char: InputKey) {
    return char === unicodeCharacters["arrowRight"];
  }
}
