import { initInput, writeLine } from "../core/io";
import type ScreenManager from "../core/screen-manager";
import type { Screen } from "../types";

export default class PrologueScreen implements Screen {
  show() {
    writeLine("PROLOGUE");
    writeLine();
  }

  handleKeyPress(screenMgr: ScreenManager) {
    initInput({
      prompt: "\n> ENTER = continue",

      onKeyPress: function (key) {
        if (key === "\r") {
          screenMgr.loadMenuScreen();
        }
      },
    });
  }
}
