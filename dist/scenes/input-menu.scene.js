import path from "path";
import { Scene } from "../core/scene.js";
import { clearEntireScreen, exitAltTerminal, hideCursor, setCursorPos, write, } from "../core/io.js";
import { Input } from "../core/input.js";
import { Menu } from "../components/index.js";
import { writeFileSync } from "fs";
import { writeToFile } from "../game/utils.game.js";
const { isCtrlC, isChar, isEnter } = Input;
const __dirname = import.meta.dirname;
export const fp = path.join(__dirname, "../..", "storage/saves/app-state.json");
const titleMenu = ["Username", "Skip"];
export function saveAppInitData(data) {
    return writeFileSync(fp, JSON.stringify(data));
}
export async function truthifyAppStateSkip() {
    await writeToFile("app-state", {
        skipUserInput: true,
        appInitialized: true,
    });
}
export class InputMenuScene extends Scene {
    menu;
    opt;
    menuStr;
    selected;
    skipUserInput;
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
    async update(key) {
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
