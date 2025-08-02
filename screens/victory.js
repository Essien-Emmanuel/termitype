import { writeLine, promptInput, initInput } from "../core/io.js";
export default class VictoryScreen {
  show() {
    writeLine("You Win!");
    writeLine();
  }

  handleKeyPress(screenMgr) {
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
          screenMgr.loadGameScreen();
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
