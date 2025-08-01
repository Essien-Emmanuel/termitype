import { writeLine, promptInput, exit } from "../core/io.js";
export default class GameMenuScreen {
  constructor() {
    this.self = this;
  }

  show() {
    writeLine("GAME MENU:");
    writeLine();
  }

  handleKeyPress(screenMgr) {
    const prompt = `
      > RESUME 
      > RESTART 
      > EXIT
    `;
    promptInput({
      prompt,

      onType: $key => {
        const key = $key.trim().toLowerCase();
        if (!["resume", "restart", "exit"].includes(key)) {
          screenMgr.loadMenuScreen();
          return;
        }
        if (key === "restart") {
          // start from last saved state
          screenMgr.loadGameScreen();
        }
        if (key === "exit") {
          screenMgr.loadMenuScreen();
        }
      }
    });
  }
}
