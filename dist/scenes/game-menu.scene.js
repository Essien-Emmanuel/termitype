import { clearEntireScreen, exitAltTerminal, hideCursor, setCursorPos, write, } from "../core/io.js";
import { Scene } from "../core/scene.js";
import { Input } from "../core/input.js";
import { Menu } from "../components/index.js";
import { writeToFile } from "../game/utils.game.js";
const { isChar, isEnter } = Input;
const gameMenu = ["Resume", "Practice", "Main Menu", "Exit"];
export class GameMenuScene extends Scene {
    menu;
    opt;
    menuStr;
    selected;
    constructor() {
        super();
        this.menu = new Menu(gameMenu);
        this.opt = "";
        this.menuStr = "";
        this.selected = false;
    }
    init() {
        clearEntireScreen();
        setCursorPos();
        const { opt, menu } = this.menu.getOpt();
        this.opt = opt;
        this.menuStr = menu;
        hideCursor();
        write(menu);
    }
    async update(key) {
        this.selected = isEnter(key) ? true : false;
        const { opt, menu } = this.menu.getOpt(key);
        this.opt = opt;
        this.menuStr = menu;
        if (isChar(opt, "Resume") && this.selected) {
            return { nextScene: "game" };
        }
        if (isChar(opt, "Practice") && this.selected) {
            await writeToFile("game-state", {});
            return { nextScene: "game" };
        }
        if (isChar(opt, "Main Menu") && this.selected) {
            return { nextScene: "mainMenu" };
        }
        if (isChar(opt, "Exit") && this.selected) {
            clearEntireScreen();
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
