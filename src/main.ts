import type { SceneNames } from "./@types";
import { Engine } from "./core/engine";
import { GameScene, ResultScene, TitleScene } from "@/scenes";

export const engine = new Engine<SceneNames>();

engine.sceneManager
  .register("title", TitleScene)
  .register("game", GameScene)
  .register("result", ResultScene);

engine.run("title");
