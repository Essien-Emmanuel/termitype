import fs from "fs";
import type { InputKey, UpdateSceneReponse } from "@/@types";
import {
  clearEntireScreen,
  hideCursor,
  setCursorPos,
  showCursor,
  write,
} from "@/core/io";
import { Scene } from "@/core/scene";
import { Input } from "@/core/input";
import { Menu } from "@/components";
import { writeToFile } from "@/game/utils.game";
import path from "path";

const __dirname = import.meta.dirname;

const { isChar, isEnter } = Input;

const fp = path.join(__dirname, "..", "saves/game-state.json");

export class MainMenuScene extends Scene {
  private menu: Menu;
  protected opt: string;
  protected menuStr: string;
  protected selected: boolean;
  protected hasGameState: boolean;

  constructor() {
    super();
    this.opt = "";
    this.menuStr = "";
    this.selected = false;

    let hasGameState = false;
    const mainMenu = ["Practice", "Practice Category", "Settings", "Exit"];

    const fsRead = fs.readFileSync(fp);
    const gameStateStr = fsRead.toString();

    if (gameStateStr) {
      const gameState = JSON.parse(gameStateStr);
      const gameStateLen = Object.keys(gameState).length;
      if (gameStateLen) {
        hasGameState = true;
        mainMenu.unshift("Resume");
      }
    }

    this.hasGameState = Boolean(hasGameState);
    this.menu = new Menu(mainMenu);
  }

  async init(): Promise<void> {
    clearEntireScreen();
    setCursorPos();

    const { opt, menu } = this.menu.getOpt();
    this.opt = opt;
    this.menuStr = menu;

    hideCursor();
    write(menu);
  }

  async update(key: InputKey): UpdateSceneReponse {
    this.selected = isEnter(key) ? true : false;

    const { opt, menu } = this.menu.getOpt(key);
    this.opt = opt;
    this.menuStr = menu;

    if (this.hasGameState) {
      if (isChar(opt, "Resume") && this.selected) {
        return { nextScene: "game" };
      }
    }

    if (isChar(opt, "Practice Category") && this.selected) {
      return { nextScene: "practiceCategoryMenu" };
    }

    if (isChar(opt, "Practice") && this.selected) {
      await writeToFile("game-state", {});
      return { nextScene: "game" };
    }

    if (isChar(opt, "Settings") && this.selected) {
      return { nextScene: "settings" };
    }

    if (isChar(opt, "Exit") && this.selected) {
      clearEntireScreen();
      showCursor();
      process.exit();
    }

    return { nextScene: "" };
  }

  render(): void {
    clearEntireScreen();
    setCursorPos();
    write(this.menuStr);
  }
}
