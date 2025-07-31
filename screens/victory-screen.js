import { writeLine, promptInput } from "../core/io.js";
export default class VictoryScreen {
  show() {
    writeLine("You Win!");
    writeLine();
    writeLine("Enter START To Play Again Or STOP To End Game!");
  }

  handleKeyPress(screenMgr) {
    promptInput(function ($key) {
      const key = $key.trim().toLowerCase();
      if (!["start", "stop"].includes(key)) return;
      if (key === "start") {
        screenMgr.loadGameScreen();
      }
      if (key === "stop") {
        writeLine("Game Ends!");
      }
    });
  }
}
