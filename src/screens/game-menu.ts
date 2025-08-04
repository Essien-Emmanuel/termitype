import { writeLine, exit, initInput } from "../core/io.js";
import { loadGameState } from "../core/persistence.js";
import type ScreenManager from "../core/screen-manager.js";
export default class GameMenuScreen {
  show() {
    writeLine();
    writeLine("GAME MENU:");
  }

  handleKeyPress(screenMgr: ScreenManager) {
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
          if (state?.config.currentScreen === "GameScreen") {
            screenMgr.loadGameScreen(state);
            return;
          } else if (state?.config.currentScreen === "MenuScreen") {
            screenMgr.loadGameMenuScreen();
          }
        }

        // pause
        if (key === "p") {
          return;
        }

        // new game
        if (key === "n") {
          screenMgr.loadGameScreen(null);
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
