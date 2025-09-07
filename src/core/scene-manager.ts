import type {
  SceneCtor,
  SceneManagerRegistry,
  SceneManagerRegisterArg,
} from "@/@types";

export class SceneManager {
  private registry: SceneManagerRegistry;
  public currentScene: Scene | null;
  constructor() {
    this.registry = new Map<string, SceneCtor>();
    this.currentScene = null;
  }

  register({ name, scene }: SceneManagerRegisterArg) {
    const isKey = this.registry.has(name);
    if (!isKey) {
      this.registry.set(name, scene);
    }
    return this;
  }

  load(sceneName: string) {
    const isKey = this.registry.has(sceneName);
    if (!isKey) return;

    const sceneCtor = this.registry.get(sceneName)!;
    const scene = new sceneCtor();
    scene.init();
    this.currentScene = scene;
  }
}
