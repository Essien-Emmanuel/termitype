import type { SceneNames } from "./@types";
import { Engine } from "./core/engine";
import { GameScene, ResultScene, TitleScene } from "@/scenes";
import { GameMenuScene } from "./scenes/game-menu.scene";
import { MainMenuScene } from "./scenes/main-menu.scene";
import { PracticeCategoryMenuScene } from "./scenes/practice-category-menu.scene";

export const engine = new Engine<SceneNames>();

engine.sceneManager
  .register("title", TitleScene)
  .register("mainMenu", MainMenuScene)
  .register("game", GameScene)
  .register("gameMenu", GameMenuScene)
  .register("practiceCategoryMenu", PracticeCategoryMenuScene)
  .register("result", ResultScene);

engine.run("title");
