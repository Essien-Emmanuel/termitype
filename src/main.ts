import type { SceneNames } from "./@types";
import { Engine } from "./core/engine";
import { GameScene, ResultScene, TitleScene } from "@/scenes";
import { GameMenuScene } from "./scenes/game-menu.scene";
import { MainMenuScene } from "./scenes/main-menu.scene";
import { PracticeCategoryMenuScene } from "./scenes/practice-category-menu.scene";
import { SettingsScene } from "./scenes/settings.scene";
import { GameLevel } from "./scenes/game-level.scene";

export const engine = new Engine<SceneNames>();

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
