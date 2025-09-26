import fs from "fs";
import type { InputKey, UpdateSceneReponse } from "@/@types";
import {
  clearEntireScreen,
  exitAltTerminal,
  hideCursor,
  setCursorPos,
  write,
} from "@/core/io";
import { Scene } from "@/core/scene";
import { Input } from "@/core/input";
import { Menu } from "@/components";
import { writeToFile } from "@/game/utils.game";
import path from "path";
import {
  capitalizeString,
  checkIsDirectory,
  generateRandomIndex,
} from "@/core/utils";

const __dirname = import.meta.dirname;

const { isChar, isEnter } = Input;

export const fp = path.join(__dirname, "../..", "storage/prompts/beginner");

export class PracticeCategoryMenuScene extends Scene {
  private menu: Menu;
  protected opt: string;
  protected menuStr: string;
  protected selected: boolean;
  protected hasGameState: boolean;
  protected promptCategory: string[];

  constructor() {
    super();
    this.opt = "";
    this.menuStr = "";
    this.selected = false;
    this.promptCategory = [];

    let hasGameState = false;
    const menu = ["Random", "Back", "Exit"];

    const files = fs.readdirSync(fp);

    files.map(async (fileName) => {
      const isDirectory = checkIsDirectory(`${fp}/${fileName}`);
      if (!isDirectory) return;
      menu.splice(1, 0, capitalizeString(fileName));
      this.promptCategory.push(fileName);
    });

    this.hasGameState = Boolean(hasGameState);
    this.menu = new Menu(menu);
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

    const lowerCasedOpt = opt.toLowerCase();

    if (this.promptCategory.includes(lowerCasedOpt) || isChar(opt, "Random")) {
      await writeToFile("game-state", {});
    }

    if (isChar(opt, "Random") && this.selected) {
      const randInd = generateRandomIndex(this.promptCategory.length);
      return { nextScene: "game", data: { opt: this.promptCategory[randInd] } };
    }

    if (this.promptCategory.includes(lowerCasedOpt) && this.selected) {
      return { nextScene: "game", data: { opt: lowerCasedOpt } };
    }

    if (isChar(opt, "Back") && this.selected) {
      return { nextScene: "mainMenu" };
    }

    if (isChar(opt, "Exit") && this.selected) {
      clearEntireScreen();
      exitAltTerminal();
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
