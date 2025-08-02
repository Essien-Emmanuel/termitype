import { writeLine, promptInput } from "../core/io.js";

export default class GameTieScreen {
  show() {
    writeLine("Battle Tie!");
    writeLine();
  }

  handleKeyPress(screenMgr) {
    promptInput({
      prompt: "\n> ENTER = Play \n> q = Quit",

      onType: function ($key) {
        const key = $key.trim().toLowerCase();

        if (key.toLowerCase() === "start") {
          screenMgr.loadGameScreen();
        }
        if (key.toLowerCase() === "stop") {
          writeLine("Game Ends!");
        }
      },
    });
  }
}
