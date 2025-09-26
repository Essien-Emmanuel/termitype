import fs from "fs";
import { clearEntireScreen, exitAltTerminal, hideCursor, setCursorPos, write, } from "../core/io.js";
import { Scene } from "../core/scene.js";
import { Input } from "../core/input.js";
import { Menu } from "../components/index.js";
import { readGameFile, writeToFile } from "../game/utils.game.js";
import path from "path";
import { saveUser, statInit } from "../game/services/user.js";
const __dirname = import.meta.dirname;
const { isChar, isEnter } = Input;
export const fp = path.join(__dirname, "../..", "storage/prompts");
export class GameLevel extends Scene {
    menu;
    opt;
    menuStr;
    selected;
    promptCategory;
    constructor() {
        super();
        this.opt = "";
        this.menuStr = "";
        this.selected = false;
        const lvlMenu = ["Beginner", "Intermediate", "Advance", "Master"];
        const menu = [...lvlMenu, "Back", "Exit"];
        this.promptCategory = lvlMenu.map((menu) => menu.toLowerCase());
        const fp = path.join(__dirname, "../..", "storage/saves/user.json");
        try {
            const userStr = fs.readFileSync(fp);
            if (userStr) {
                const user = JSON.parse(userStr.toString());
                this.menu = new Menu(menu, {
                    checkedOpt: user.level,
                    optCheckMarker: "▫️",
                });
            }
            else {
                this.menu = new Menu(menu);
            }
        }
        catch (error) {
            fs.openSync(fp, "w");
            this.menu = new Menu(menu);
        }
    }
    async init() {
        clearEntireScreen();
        setCursorPos();
        // add a check for selected level.
        // get it from saved
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
        const lowerCasedOpt = opt.toLowerCase();
        if (this.promptCategory.includes(lowerCasedOpt)) {
            await writeToFile("game-state", {});
        }
        if (this.promptCategory.includes(lowerCasedOpt) && this.selected) {
            // save game level
            const userStr = await readGameFile("saves/user.json");
            if (!userStr) {
                await saveUser();
            }
            else {
                const user = JSON.parse(userStr);
                user.level = lowerCasedOpt;
                user.stat = statInit;
                user.improved = false;
                await saveUser(user);
            }
            return { nextScene: "gameLevel" };
        }
        if (isChar(opt, "Back") && this.selected) {
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
