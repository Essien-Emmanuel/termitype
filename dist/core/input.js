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
};
export class Input {
    static isCtrlL(char) {
        return char === unicodeCharacters["ctrlL"];
    }
    static isBackspace(char) {
        return char === unicodeCharacters["backspace"];
    }
    static isSpaceBar(char) {
        return char === unicodeCharacters["spacebar"];
    }
    static isEnter(char) {
        return char === unicodeCharacters["enter"];
    }
    static isCtrlC(char) {
        return char === unicodeCharacters["ctrlC"];
    }
    static isChar(char1, char2) {
        return char1 === char2;
    }
    static isArrowUp(char) {
        return char === unicodeCharacters["arrowUp"];
    }
    static isArrowDown(char) {
        return char === unicodeCharacters["arrowDown"];
    }
    static isArrowLeft(char) {
        return char === unicodeCharacters["arrowLeft"];
    }
    static isArrowRight(char) {
        return char === unicodeCharacters["arrowRight"];
    }
}
