import type { SceneCtor, SceneManagerRegistry, SceneName } from "@/@types";
import type { Scene } from "./scene";

export class SceneManager {
  readonly _registry: SceneManagerRegistry;
  public currentScene: Scene | null;
  public sceneName: SceneName;

  constructor() {
    this._registry = new Map<string, SceneCtor>();
    this.currentScene = null;
    this.sceneName = "";
  }

  register(name: SceneName, sceneCtor: SceneCtor) {
    const isKey = this._registry.has(name);
    if (!isKey) {
      this.sceneName = name;
      this._registry.set(name, sceneCtor);
    }
    return this;
  }

  load(sceneName: SceneName) {
    const isKey = this._registry.has(sceneName);
    if (!isKey) return;

    const sceneCtor = this._registry.get(sceneName)!;
    const scene = new sceneCtor();
    scene.init();
    this.currentScene = scene;
  }
}
