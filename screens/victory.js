import { writeLine, promptInput } from "../core/io.js";
export default class VictoryScreen {
  show() {
    writeLine("You Win!");
    writeLine();
  }

  handleKeyPress(screenMgr) {
    promptInput({
      prompt: "Enter START To Replay Again Or MENU To Go To Game Menu!",

      onType: ($key) => {
        const key = $key.trim().toLowerCase();
        if (!["start", "menu"].includes(key)) {
          return;
        }
        if (key === "start") {
          screenMgr.loadGameScreen();
        }
        if (key === "menu") {
          screenMgr.loadMenuScreen();
        }
      },
    });
  }
}
