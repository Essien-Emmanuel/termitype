import path from "path";
import type { InputKey, UpdateSceneReponse } from "@/@types";
import { Scene } from "@/core/scene";
import {
  clearEntireScreen,
  exitAltTerminal,
  hideCursor,
  setCursorPos,
  write,
} from "@/core/io";
import { Input } from "@/core/input";
import { Menu } from "@/components";
import { writeFileSync } from "fs";
import { writeToFile } from "@/game/utils.game";

const { isCtrlC, isChar, isEnter } = Input;

const __dirname = import.meta.dirname;

export const fp = path.join(__dirname, "../..", "storage/saves/app-state.json");

const titleMenu = ["Username", "Skip"];

export type AppState = Partial<{
  appInitialized: boolean;
  initializedAt: Date;
  skipUserInput: boolean;
}>;

export function saveAppInitData(data: AppState) {
  return writeFileSync(fp, JSON.stringify(data));
}

export async function truthifyAppStateSkip() {
  await writeToFile<AppState>("app-state", {
    skipUserInput: true,
    appInitialized: true,
  });
}

export class InputMenuScene extends Scene {
  private menu!: Menu;
  protected opt: string;
  protected menuStr: string;
  protected selected: boolean;
  protected skipUserInput: boolean;

  constructor() {
    super();
    this.opt = "";
    this.menuStr = "";
    this.selected = false;
    this.menu = new Menu(titleMenu);
    this.skipUserInput = false;
  }

  init() {
    clearEntireScreen();
    setCursorPos();

    const { opt, menu } = this.menu.getOpt();
    this.opt = opt;
    this.menuStr = menu;

    write(this.menuStr);
    hideCursor();
  }

  async update(key: InputKey): UpdateSceneReponse {
    this.selected = isEnter(key) ? true : false;

    const { opt, menu } = this.menu.getOpt(key);
    this.opt = opt;
    this.menuStr = menu;

    if (isChar(this.opt, "Username") && this.selected) {
      return { nextScene: "userProfile" };
    }
    if (isChar(this.opt, "Skip") && this.selected) {
      truthifyAppStateSkip();
      return { nextScene: "gameMenu" };
    }

    if (isCtrlC(key)) {
      exitAltTerminal();
      process.exit();
    }

    return { nextScene: "" };
  }

  render() {
    clearEntireScreen();
    setCursorPos();
    write(this.menuStr);
  }
}
