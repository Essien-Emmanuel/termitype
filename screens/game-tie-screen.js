import { writeLine, promptInput } from "../core/io.js";
export default class GameTieScreen {
  show() {
    writeLine("Battle Tie!");
    writeLine();
    writeLine("Enter START To Play Again Or STOP To End Game!");
  }

  handleKeyPress(screenMgr) {
    promptInput(function ($key) {
      const key = $key.trim().toLowerCase();

      if (key.toLowerCase() === "start") {
        screenMgr.loadGameScreen();
      }
      if (key.toLowerCase() === "stop") {
        writeLine("Game Ends!");
      }
    });
  }
}
