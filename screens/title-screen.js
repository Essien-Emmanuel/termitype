import { writeLine, initInput } from "../core/io.js";
export default class TitleScreen {
  show() {
    writeLine("Rise of the Reborn");
    writeLine();
    writeLine("Press ENTER to start");
  }

  handleKeyPress(screenMgr) {
    initInput(function (key) {
      if (key === "\r") {
        screenMgr.loadPrologueScreen();
       
      }
    });
  }
}
