import fileSys from "fs";
import path from "path";

import GameState from "../models/game-state.js";

const __dirname = import.meta.dirname;
const fs = fileSys.promises;

export async function saveGame(state) {
  const strData = state.toJSON();

  try {
    const fp = path.join(__dirname, "..", "saves", "game-states.json");
    await fs.writeFile(fp, strData);
  } catch (exc) {
    console.error(exc);
  }
}

export async function loadGame() {
  const filePath = path.join(__dirname, "..", "saves", "game-states.json");

  try {
    const strData = await fs.readFile(filePath);
    const state = GameState.fromJSON(strData);
    console.log(state);
    return;
  } catch (exc) {
    console.log(exc);
  }
}

const state = new GameState({
  player: {
    hp: 20,
    name: "HERO"
  },
  enemy: {
    hp: 10,
    name: "GOBLIN"
  },
  level: 1,
  turnCount: 5,
  currentScreen: "GameScreen"
});
saveGame(state).then();
loadGame().then();
//read();
