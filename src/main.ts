import type { SceneNames } from "./@types";
import { Engine } from "./core/engine";
import { GameScene, ResultScene, TitleScene } from "@/scenes";
import { GameMenuScene } from "./scenes/game-menu.scene";

export const engine = new Engine<SceneNames>();

engine.sceneManager
  .register("title", TitleScene)
  .register("game", GameScene)
  .register("gameMenu", GameMenuScene)
  .register("result", ResultScene);

engine.run("title");
