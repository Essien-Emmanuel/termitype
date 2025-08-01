import { writeLine, promptInput, exit } from "../core/io.js";

export default class GameOverScreen {
  show() {
    writeLine("You Lose!");
    writeLine("Game Over!");
    writeLine();
  }

  handleKeyPress(screenMgr) {
    promptInput({
      prompt: "Enter START To Play Again Or STOP To End Game!",

      onType: function ($key) {
        const key = $key.trim().toLowerCase();

        if (key.toLowerCase() === "start") {
          screenMgr.loadGameScreen();
        }
        if (key.toLowerCase() === "stop") {
          exit("Game Ends!");
        }
      },
    });
  }
}
