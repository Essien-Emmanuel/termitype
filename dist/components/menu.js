import { unicodeCharacters } from "../core/input.js";
import { getFontStyle, styleUnderlineReset } from "../renderer/font.js";
const arrowUp = unicodeCharacters["arrowUp"];
const arrowDown = unicodeCharacters["arrowDown"];
export class Menu {
    menuArr;
    navs;
    len;
    optPos;
    menuStr;
    optIndex;
    key;
    checkedOpt;
    optCheckMarker;
    constructor(menuArr, config) {
        this.menuArr = menuArr;
        this.navs =
            config && config.navs
                ? config.navs
                : { up: [arrowUp], down: [arrowDown] };
        this.checkedOpt = config && config.checkedOpt ? config.checkedOpt : "";
        this.optCheckMarker =
            config && config.optCheckMarker ? config.optCheckMarker : "";
        this.len = menuArr.length;
        this.optPos = 1;
        this.menuStr = "";
        this.optIndex = 0;
        this.key = "";
    }
    _setOptPos() {
        if (this.navs.down.includes(this.key)) {
            if (this.optPos < this.len) {
                ++this.optPos;
            }
            else {
                this.optPos = 1;
            }
        }
        if (this.navs.up.includes(this.key)) {
            if (this.optPos > 1) {
                --this.optPos;
            }
            else {
                this.optPos = this.len;
            }
        }
        this.optIndex = this.optPos - 1;
    }
    _createMenuStr() {
        const fontStyleReset = "\x1b[0m";
        this.menuStr = this.menuArr.reduce((acc, opt, i) => {
            let fontWeight = getFontStyle({ mode: "dim" });
            let optId = "  ";
            let optCheckMarker = "";
            if (i === this.optIndex) {
                optId = "> ";
                fontWeight = getFontStyle() + getFontStyle({ mode: "underline" });
            }
            if (opt.toLowerCase() === this.checkedOpt.toLowerCase()) {
                fontWeight += getFontStyle({ mode: "underline" });
            }
            acc +=
                optId +
                    fontWeight +
                    opt +
                    styleUnderlineReset +
                    fontStyleReset +
                    optCheckMarker +
                    "\n";
            return acc;
        }, "");
    }
    getOpt(key) {
        if (key) {
            this.key = key;
            this._setOptPos();
        }
        this._createMenuStr();
        return {
            opt: this.menuArr[this.optIndex],
            optIndex: this.optIndex,
            menu: this.menuStr,
        };
    }
}
