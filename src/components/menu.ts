import type { InputKey, MenuNavs } from "@/@types";
import { unicodeCharacters } from "@/core/input";
import { getFontStyle, styleUnderlineReset } from "@/renderer/font";

const arrowUp = unicodeCharacters["arrowUp"];
const arrowDown = unicodeCharacters["arrowDown"];

export type MenuConfig = {
  navs?: MenuNavs;
  checkedOpt: string;
  optCheckMarker: string;
};

export class Menu {
  public menuArr: readonly string[];
  private navs: MenuNavs;
  private len: number;
  private optPos: number;
  private menuStr: string;
  private optIndex: number;
  private key: InputKey;
  public checkedOpt: string;
  public optCheckMarker: string;

  constructor(menuArr: readonly string[], config?: MenuConfig) {
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
