import { Scene } from "../core/scene.js";
import { clearEntireScreen, exitAltTerminal } from "../core/io.js";
import { Input } from "../core/input.js";
const { isCtrlC } = Input;
export class TitleScene extends Scene {
    constructor() {
        super();
    }
    init() {
        clearEntireScreen();
        console.log("loading title...");
    }
    async update(key) {
        if (isCtrlC(key)) {
            exitAltTerminal();
            process.exit();
        }
        return { nextScene: "mainMenu" };
    }
    render() {
        console.log("Title Scene");
    }
}
