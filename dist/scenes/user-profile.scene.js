import fs from "fs";
import { Scene } from "../core/scene.js";
import { clearEntireScreen, exitAltTerminal, setCursorPos, showCursor, write, } from "../core/io.js";
import { Input } from "../core/input.js";
import { saveUser } from "../game/services/user.js";
import { readGameFile } from "../game/utils.game.js";
import path from "path";
const __dirname = import.meta.dirname;
const { isCtrlC, isEnter, isBackspace } = Input;
const fp = path.join(__dirname, "../..", "storage/saves/user.json");
export class UserProfileScene extends Scene {
    username;
    isBackspace;
    constructor() {
        super();
        this.isBackspace = false;
        try {
            const userBuf = fs.readFileSync(fp);
            const userStr = userBuf.toString();
            const user = JSON.parse(userStr);
            this.username = user.name;
        }
        catch (error) {
            this.username = "";
        }
    }
    init() {
        clearEntireScreen();
        setCursorPos();
        showCursor();
        write("Type Username And Press Enter To SAVE\n");
        write("Username: " + this.username);
    }
    async update(key) {
        if (isBackspace(key)) {
            this.isBackspace = true;
            this.username = this.username.slice(0, -1);
        }
        else {
            this.username += key;
        }
        if (isEnter(key)) {
            const userStr = await readGameFile("saves/user.json");
            if (!userStr) {
                await saveUser({ name: this.username });
                return { nextScene: "mainMenu" };
            }
            else {
                const user = JSON.parse(userStr);
                user.name = this.username;
                await saveUser(user);
                return { nextScene: "gameLevel" };
            }
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
        write("Type Username And Press Enter To SAVE\n");
        write("Username: " + this.username);
    }
}
