import type {
  SceneCtor,
  SceneManagerRegistry,
  SceneManagerRegisterArg,
} from "@/@types";
import type { Scene } from "./scene";

export class SceneManager {
  private _registry: SceneManagerRegistry;
  public currentScene: Scene | null;

  constructor() {
    this._registry = new Map<string, SceneCtor>();
    this.currentScene = null;
  }

  register({ name, scene }: SceneManagerRegisterArg) {
    const isKey = this._registry.has(name);
    if (!isKey) {
      this._registry.set(name, scene);
    }
    return this;
  }

  load(sceneName: string) {
    const isKey = this._registry.has(sceneName);
    if (!isKey) return;

    const sceneCtor = this._registry.get(sceneName)!;
    const scene = new sceneCtor();
    scene.init();
    this.currentScene = scene;
  }
}
