import { writeLine, promptInput, exit } from "../core/io.js";
import type ScreenManager from "../core/screen-manager.js";

export default class GameOverScreen {
  show() {
    writeLine("You Lose!");
    writeLine("Game Over!");
    writeLine();
  }

  handleKeyPress(screenMgr: ScreenManager) {
    promptInput({
      prompt: "\n> ENTER = Play \n> q To Quit",

      onType: function ($key) {
        const key = $key.trim().toLowerCase();

        if (key.toLowerCase() === "start") {
          screenMgr.loadGameScreen(null);
        }
        if (key.toLowerCase() === "stop") {
          exit("Game Ends!");
        }
      },
    });
  }
}
