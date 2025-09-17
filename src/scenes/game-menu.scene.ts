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

const { isChar, isEnter } = Input;

const gameMenu = ["Resume", "New Game", "Main Menu", "Exit"] as const;

type GameMenu = (typeof gameMenu)[number] | (string & {});

export class GameMenuScene extends Scene {
  private menu: Menu;
  protected opt: GameMenu;
  protected menuStr: string;
  protected selected: boolean;

  constructor() {
    super();
    this.menu = new Menu(gameMenu);
    this.opt = "";
    this.menuStr = "";
    this.selected = false;
  }

  init(): void {
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

    if (isChar<GameMenu>(opt, "Resume") && this.selected) {
      return { nextScene: "game" };
    }

    if (isChar<GameMenu>(opt, "Main Menu") && this.selected) {
      return { nextScene: "title" };
    }

    if (isChar<GameMenu>(opt, "Exit") && this.selected) {
      showCursor();
      process.exit();
    }

    return { nextScene: "" };
  }

  render(): void {
    // clearEntireScreen();
    process.stdout.write("\x1b[3J");
    setCursorPos();
    write(this.menuStr);
  }
}
