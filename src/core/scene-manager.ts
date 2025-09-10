import type {
  SceneCtor,
  SceneManagerRegistry,
  SceneName,
  SceneNames,
} from "@/@types";
import type { Scene } from "./scene";

export class SceneManager<T extends string> {
  readonly _registry: SceneManagerRegistry<T>;
  public currentScene: Scene | null;
  public sceneName: SceneName<T>;

  constructor() {
    this._registry = new Map<string, SceneCtor>();
    this.currentScene = null;
    this.sceneName = "";
  }

  register(name: SceneName<T>, sceneCtor: SceneCtor) {
    const isKey = this._registry.has(name);
    if (!isKey) {
      this.sceneName = name;
      this._registry.set(name, sceneCtor);
    }
    return this;
  }

  load(sceneName: SceneName<T>) {
    const isKey = this._registry.has(sceneName);
    if (!isKey) return;

    const sceneCtor = this._registry.get(sceneName)!;
    const scene = new sceneCtor();
    scene.init();
    this.currentScene = scene;
  }
}
