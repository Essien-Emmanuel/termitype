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

const { isChar, isEnter } = Input;

const settingsMenu = ["Game Level", "Back", "Exit"] as const;

type SettingsMenu = (typeof settingsMenu)[number];

export class SettingsScene extends Scene {
  private menu: Menu;
  protected opt: string;
  protected menuStr: string;
  protected selected: boolean;
  protected settingsMenu: readonly SettingsMenu[];

  constructor() {
    super();
    this.opt = "";
    this.menuStr = "";
    this.selected = false;
    this.settingsMenu = settingsMenu;

    this.menu = new Menu(this.settingsMenu);
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

    if (isChar<SettingsMenu>(opt, "Game Level") && this.selected) {
      return { nextScene: "gameLevel" };
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
