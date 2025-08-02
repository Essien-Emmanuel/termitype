import { initInput, writeLine } from "../core/io.js";

export default class PrologueScreen {
  show() {
    writeLine("PROLOGUE");
    writeLine();
  }

  handleKeyPress(screenMgr) {
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
