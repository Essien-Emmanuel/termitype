import { writeLine, promptInput } from "../core/io.js";
import type ScreenManager from "../core/screen-manager.js";

export default class GameTieScreen {
  show() {
    writeLine("Battle Tie!");
    writeLine();
  }

  handleKeyPress(screenMgr: ScreenManager) {
    promptInput({
      prompt: "\n> ENTER = Play \n> q = Quit",

      onType: function ($key) {
        const key = $key.trim().toLowerCase();

        if (key.toLowerCase() === "start") {
          screenMgr.loadGameScreen(null);
        }
        if (key.toLowerCase() === "stop") {
          writeLine("Game Ends!");
        }
      },
    });
  }
}
