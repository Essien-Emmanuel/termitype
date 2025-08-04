import { writeLine, initInput } from "../core/io";
import type ScreenManager from "../core/screen-manager";
import type { Screen } from "../types";

export default class TitleScreen implements Screen {
  show() {
    writeLine("Rise of the Reborn");
    writeLine();
  }

  handleKeyPress(screenMgr: ScreenManager) {
    initInput({
      onKeyPress: function (key) {
        if (key === "\r") {
          screenMgr.loadPrologueScreen();
        }
      },
    });
  }
}
