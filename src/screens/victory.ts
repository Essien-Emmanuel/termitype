import { writeLine, initInput } from "../core/io.js";
import type ScreenManager from "../core/screen-manager";

export default class VictoryScreen {
  show() {
    writeLine("You Win!");
    writeLine();
  }

  handleKeyPress(screenMgr: ScreenManager) {
    const prompt = "\n> n To NEW GAME  \n> m To Main Menu";

    initInput({
      prompt,

      onKeyPress: ($key) => {
        const key = $key.trim().toLowerCase();
        if (!["n", "m"].includes(key)) {
          writeLine("Enter An Option");
          return;
        }
        if (key === "n") {
          screenMgr.loadGameScreen(null);
          return;
        }
        if (key === "m") {
          screenMgr.loadMenuScreen();
          return;
        }
      },
    });
  }
}
