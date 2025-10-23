import { clearEntireScreen, exitAltTerminal, hideCursor, setCursorPos, write, } from "../core/io.js";
import { Scene } from "../core/scene.js";
import { Input } from "../core/input.js";
import { Menu } from "../components/index.js";
const { isChar, isEnter } = Input;
const settingsMenu = ["Username", "Game Level", "Back", "Exit"];
export class SettingsScene extends Scene {
    menu;
    opt;
    menuStr;
    selected;
    settingsMenu;
    constructor() {
        super();
        this.opt = "";
        this.menuStr = "";
        this.selected = false;
        this.settingsMenu = settingsMenu;
        this.menu = new Menu(this.settingsMenu);
    }
    async init() {
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
        if (isChar(opt, "Game Level") && this.selected) {
            return { nextScene: "gameLevel" };
        }
        if (isChar(opt, "Username") && this.selected) {
            return { nextScene: "userProfile" };
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
    render() {
        clearEntireScreen();
        setCursorPos();
        write(this.menuStr);
    }
}
