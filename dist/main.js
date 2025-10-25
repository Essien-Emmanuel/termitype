#!/usr/bin/env node
import { Engine } from "./core/engine.js";
import { GameScene, ResultScene, TitleScene } from "./scenes/index.js";
import { GameMenuScene } from "./scenes/game-menu.scene.js";
import { MainMenuScene } from "./scenes/main-menu.scene.js";
import { PracticeCategoryMenuScene } from "./scenes/practice-category-menu.scene.js";
import { SettingsScene } from "./scenes/settings.scene.js";
import { GameLevel } from "./scenes/game-level.scene.js";
import { UserProfileScene } from "./scenes/user-profile.scene.js";
import { InputMenuScene } from "./scenes/input-menu.scene.js";
import { handleTermninalArgs } from "./core/utils.js";
import { terminalArgs } from "./core/io.js";
export const engine = new Engine();
const opts = terminalArgs.slice(2);
if (!opts.length) {
    engine.sceneManager
        .register("title", TitleScene)
        .register("mainMenu", MainMenuScene)
        .register("settings", SettingsScene)
        .register("userProfile", UserProfileScene)
        .register("inputMenu", InputMenuScene)
        .register("gameLevel", GameLevel)
        .register("game", GameScene)
        .register("gameMenu", GameMenuScene)
        .register("practiceCategoryMenu", PracticeCategoryMenuScene)
        .register("result", ResultScene);
    // setupTerminal();
    engine.run("title");
}
else {
    handleTermninalArgs(opts);
}
