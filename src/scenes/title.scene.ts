import { openSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import type { InputKey, UpdateSceneReponse } from "@/@types";
import { Scene } from "@/core/scene";
import { clearEntireScreen, exitAltTerminal, setCursorPos } from "@/core/io";
import { Input } from "@/core/input";
import { Menu } from "@/components";
import { readGameFile } from "@/game/utils.game";
import { terminalGameNameArt } from "@/renderer/text";
import { styleFont, styleFontReset } from "@/renderer/font";

const { isCtrlC, isEnter } = Input;

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

export class TitleScene extends Scene {
  private menu!: Menu;
  protected opt: string;
  protected menuStr: string;
  protected selected: boolean;

  constructor() {
    super();
    this.opt = "";
    this.menuStr = "";
    this.selected = false;
    this.menu = new Menu(titleMenu);

    try {
      readFileSync(fp);
    } catch (error) {
      openSync(fp, "w");
      saveAppInitData({
        appInitialized: false,
        initializedAt: new Date(),
        skipUserInput: false,
      });
    }
  }

  init() {
    clearEntireScreen();
    console.log(
      styleFont({ font: terminalGameNameArt, color: "blue", mode: "bold" }) +
        styleFontReset
    );
  }

  async update(key: InputKey): UpdateSceneReponse {
    this.selected = isEnter(key) ? true : false;

    const { opt, menu } = this.menu.getOpt(key);
    this.opt = opt;
    this.menuStr = menu;

    const appStateStr = await readGameFile("saves/app-state.json");
    const appState: AppState = JSON.parse(appStateStr!);

    if (!appState.skipUserInput) {
      return { nextScene: "inputMenu" };
    }

    if (isCtrlC(key)) {
      exitAltTerminal();
      process.exit();
    }

    return { nextScene: "mainMenu" };
  }

  render() {
    clearEntireScreen();
    setCursorPos();
  }
}
