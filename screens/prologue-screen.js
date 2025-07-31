import { initInput, writeLine } from "../core/io.js";

export default class PrologueScreen {
  show() {
    writeLine("PROLOGUE");
    writeLine();
  }

  handleKeyPress(screenMgr) {
    initInput(function (key) {
     // const key = $key.trim().toLowerCase();

      if (key === "\r") {
        screenMgr.loadGameScreen();
      }
    });
  }
}
