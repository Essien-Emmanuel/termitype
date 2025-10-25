import { openSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { Scene } from "../core/scene.js";
import { clearEntireScreen, exitAltTerminal, setCursorPos } from "../core/io.js";
import { Input } from "../core/input.js";
import { Menu } from "../components/index.js";
import { readGameFile } from "../game/utils.game.js";
import { terminalGameNameArt } from "../renderer/text.js";
import { styleFont, styleFontReset } from "../renderer/font.js";
const { isCtrlC, isEnter } = Input;
const __dirname = import.meta.dirname;
export const fp = path.join(__dirname, "../..", "storage/saves/app-state.json");
const titleMenu = ["Username", "Skip"];
export function saveAppInitData(data) {
    return writeFileSync(fp, JSON.stringify(data));
}
export class TitleScene extends Scene {
    menu;
    opt;
    menuStr;
    selected;
    constructor() {
        super();
        this.opt = "";
        this.menuStr = "";
        this.selected = false;
        this.menu = new Menu(titleMenu);
        try {
            readFileSync(fp);
        }
        catch (error) {
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
        console.log(styleFont({ font: terminalGameNameArt, color: "blue", mode: "bold" }) +
            styleFontReset);
    }
    async update(key) {
        this.selected = isEnter(key) ? true : false;
        const { opt, menu } = this.menu.getOpt(key);
        this.opt = opt;
        this.menuStr = menu;
        const appStateStr = await readGameFile("saves/app-state.json");
        const appState = JSON.parse(appStateStr);
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
