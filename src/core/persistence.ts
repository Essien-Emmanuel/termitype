import fs from "fs/promises";
import path from "path";

import GameState from "../models/game-state.js";

const __dirname = import.meta.dirname;

export async function saveGame(state: GameState) {
  const data = state.toJSON();
  const strData = JSON.stringify(data, null, 2);

  const fp = path.join(__dirname, "..", "saves", "game-state.json");
  const dirp = path.join(__dirname, "..", "saves");

  try {
    // create saves folder
    await fs.mkdir(dirp, {
      recursive: true,
    });

    await fs.writeFile(fp, strData);
  } catch (exc) {
    console.error(exc);
  }
}

export async function clearSavedData() {
  const fp = path.join(__dirname, "..", "saves", "game-state.json");
  try {
    await fs.writeFile(fp, "");
  } catch (exc) {
    console.error(exc);
  }
}

export async function loadGameState() {
  const filePath = path.join(__dirname, "..", "saves", "game-state.json");

  try {
    const strData = await fs.readFile(filePath, "utf-8");
    const state = GameState.fromJSON(strData);
    return state;
  } catch (exc) {
    console.log(exc);
    return null;
  }
}

export async function checkGameDefaultState() {
  const state = await loadGameState();
  if (!state) throw Error("No Game State");
  return state.config.isDefault;
}
