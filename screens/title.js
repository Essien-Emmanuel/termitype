import { writeLine, initInput } from "../core/io.js";
export default class TitleScreen {
  show() {
    writeLine("Rise of the Reborn");
    writeLine();
  }

  handleKeyPress(screenMgr) {
    initInput({
      onKeyPress: function (key) {
        if (key === "\r") {
          screenMgr.loadPrologueScreen();
        }
      },
    });
  }
}
