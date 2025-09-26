import { readGameFile, writeToFile } from "../game/utils.game.js";
import { showStats } from "../game/utils.game.js";
import { clearEntireScreen, exitAltTerminal } from "../core/io.js";
import { Scene } from "../core/scene.js";
import { Input } from "../core/input.js";
const { isEnter } = Input;
export class ResultScene extends Scene {
    result;
    improved;
    constructor() {
        super();
        this.result = { accuracy: 0, mistakes: 0, timeout: 0, wpm: 0 };
        this.improved = false;
    }
    async init() {
        clearEntireScreen();
        const dataStr = await readGameFile("saves/result.json");
        const userStr = await readGameFile("saves/user.json");
        if (dataStr) {
            this.result = JSON.parse(dataStr);
        }
        const { accuracy, mistakes, timeout, wpm } = this.result;
        // check and update new high stat
        if (userStr) {
            let user = JSON.parse(userStr);
            const savedStat = user.stat;
            const savedStatValue = savedStat.accuracy +
                savedStat.wpm -
                (savedStat.mistakes + savedStat.timeout / 1000);
            const resultValue = accuracy + wpm - (mistakes + timeout / 1000);
            const newHighStat = resultValue > savedStatValue;
            if (newHighStat) {
                user.stat = this.result;
                user.improved = true;
            }
            else {
                user.improved = false;
            }
            this.improved = user.improved;
            await writeToFile("user", user);
        }
        showStats({ accuracy, timeout, mistakes, wpm, improved: this.improved });
    }
    async update(key) {
        if (isEnter(key)) {
            console.log("GameEnds");
        }
        return { nextScene: "" };
    }
    render() {
        exitAltTerminal();
        process.exit();
    }
}
