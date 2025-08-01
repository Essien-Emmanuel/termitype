import { writeLine, promptInput, exit } from "../core/io.js";
export default class MenuScreen {
  constructor() {
    this.self = this;
  }

  show() {
    writeLine();
  }

  handleKeyPress(screenMgr) {
    promptInput({
      prompt: "Enter START To Play Or EXIT To Exit Game!",

      onType: ($key) => {
        const key = $key.trim().toLowerCase();
        if (!["start", "exit"].includes(key)) {
          screenMgr.loadMenuScreen();
          return;
        }
        if (key === "start") {
          screenMgr.loadGameScreen();
        }
        if (key === "exit") {
          exit("Game exits...");
        }
      },
    });
  }
}
