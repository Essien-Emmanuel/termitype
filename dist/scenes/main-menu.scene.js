import fs from "fs";
import { clearEntireScreen, exitAltTerminal, hideCursor, setCursorPos, write, } from "../core/io.js";
import { Scene } from "../core/scene.js";
import { Input } from "../core/input.js";
import { Menu } from "../components/index.js";
import { writeToFile } from "../game/utils.game.js";
import path from "path";
const __dirname = import.meta.dirname;
const { isChar, isEnter } = Input;
const fp = path.join(__dirname, "../..", "storage/saves/game-state.json");
export class MainMenuScene extends Scene {
    menu;
    opt;
    menuStr;
    selected;
    hasGameState;
    constructor() {
        super();
        this.opt = "";
        this.menuStr = "";
        this.selected = false;
        let hasGameState = false;
        const mainMenu = ["Practice", "Practice Category", "Settings", "Exit"];
        try {
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
        }
        catch (error) {
            fs.openSync(fp, "w");
        }
        this.hasGameState = Boolean(hasGameState);
        this.menu = new Menu(mainMenu);
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
