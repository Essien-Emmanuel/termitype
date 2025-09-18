import type { InputKey, MenuNavs } from "@/@types";
import { unicodeCharacters } from "@/core/input";
import { getFontStyle, styleUnderlineReset } from "@/renderer/font";

const arrowUp = unicodeCharacters["arrowUp"];
const arrowDown = unicodeCharacters["arrowDown"];

export class Menu {
  public menuArr: readonly string[];
  private navs: MenuNavs;
  private len: number;
  private optPos: number;
  private menuStr: string;
  private optIndex: number;
  private key: InputKey;

  constructor(menuArr: readonly string[], navs?: MenuNavs) {
    this.menuArr = menuArr;
    this.navs = navs || { up: [arrowUp], down: [arrowDown] };
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
      } else {
        this.optPos = 1;
      }
    }
    if (this.navs.up.includes(this.key)) {
      if (this.optPos > 1) {
        --this.optPos;
      } else {
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
      if (i === this.optIndex) {
        optId = "> ";
        fontWeight = getFontStyle() + getFontStyle({ mode: "underline" });
      }

      acc +=
        optId + fontWeight + opt + styleUnderlineReset + fontStyleReset + "\n";
      return acc;
    }, "");
  }

  getOpt(key?: InputKey) {
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
