#!/usr/bin/env node
import { Engine } from "./core/engine.js";
import { GameScene, ResultScene, TitleScene } from "./scenes/index.js";
import { GameMenuScene } from "./scenes/game-menu.scene.js";
import { MainMenuScene } from "./scenes/main-menu.scene.js";
import { PracticeCategoryMenuScene } from "./scenes/practice-category-menu.scene.js";
import { SettingsScene } from "./scenes/settings.scene.js";
import { GameLevel } from "./scenes/game-level.scene.js";
export const engine = new Engine();
engine.sceneManager
    .register("title", TitleScene)
    .register("mainMenu", MainMenuScene)
    .register("settings", SettingsScene)
    .register("gameLevel", GameLevel)
    .register("game", GameScene)
    .register("gameMenu", GameMenuScene)
    .register("practiceCategoryMenu", PracticeCategoryMenuScene)
    .register("result", ResultScene);
engine.run("title");
