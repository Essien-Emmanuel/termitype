import { writeLine, promptInput, exit, initInput } from "../core/io.js";
import { loadGameState } from "../core/persistence.js";
export default class GameMenuScreen {
  constructor() {
    this.self = this;
  }

  show() {
    writeLine();
    writeLine("GAME MENU:");
  }

  handleKeyPress(screenMgr) {
    const prompt =
      "\n> r = RESUME \n> p = Pause \n> n = NEW GAME \n> q = Quit \n> m = Main Menu";

    initInput({
      prompt,

      onKeyPress: async ($key) => {
        const key = $key.trim().toLowerCase();
        if (!["n", "r", "q", "m", "p"].includes(key)) {
          writeLine("Enter An Option froom the Game Menu");
          return;
        }

        // resume from last saved state
        if (key === "r") {
          const state = await loadGameState();
          if (state.currentScreen === "GameScreen") {
            screenMgr.loadGameScreen(state);
            return;
          } else if (state.currentScreen === "MenuScreen") {
            screenMgr.loadGameMenuScreen();
          }
        }

        // pause
        if (key === "p") {
          return;
        }

        // new game
        if (key === "n") {
          screenMgr.loadGameScreen();
          return;
        }

        if (key === "m") {
          screenMgr.loadMenuScreen();
          return;
        }

        if (key === "q") {
          exit("Game Exit!");
        }
      },
    });
  }
}
