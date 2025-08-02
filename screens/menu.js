import { writeLine, promptInput, exit, initInput } from "../core/io.js";
import {
  checkGameDefaultState,
  clearSavedData,
  loadGameState,
  saveGame,
} from "../core/persistence.js";
import Entity from "../models/entity.js";
import GameState from "../models/game-state.js";
export default class MenuScreen {
  constructor() {
    this.self = this;
  }

  show() {
    writeLine("MAIN MENU:");
  }

  async handleKeyPress(screenMgr) {
    const isDefaultGameState = await checkGameDefaultState();

    const progressOpt = !isDefaultGameState
      ? "\n> r = Resume \n> x = Clear Progress"
      : "";

    const progressKeys = !isDefaultGameState ? ["r", "R", "X", "x"] : [];

    initInput({
      prompt: `\n> ENTER = Play ${progressOpt} \n> q = Quit`,

      onKeyPress: async (key) => {
        if (!["\r", "q", "Q", ...progressKeys].includes(key)) {
          writeLine("Enter An Option From The Main Menu");
          return;
        }

        if (key === "\r") {
          screenMgr.loadGameScreen();
          return;
        }

        if (key.toLowerCase() === "r") {
          const state = await loadGameState();
          screenMgr.loadGameScreen(state);
          return;
        }

        if (key.toLowerCase() === "x") {
          initInput({
            prompt: "Are You Sure About Clearing Your Saved Progress? (Y/N)",

            onKeyPress: async (key) => {
              if (key.toLowerCase() === "n") {
                screenMgr.loadMenuScreen();
                return;
              } else if (key.toLowerCase() === "y") {
                await clearSavedData();

                const player = new Entity("HERO", 20);
                const enemy = new Entity("GOBLIN", 10);

                const defaultState = new GameState({
                  player,
                  enemy,
                  level: 1,
                  turnCount: 5,
                  currentScreen: "GameScreen",
                  isDefault: true,
                });
                await saveGame(defaultState);
                screenMgr.loadMenuScreen();
                return;
              }
            },
          });
          return;
        }

        if (key.toLowerCase() === "q") {
          exit("Game exits...");
        }
      },
    });
  }
}
