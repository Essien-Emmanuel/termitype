const { stdin, stdout } = process;

function handleKey(handler: any) {
  stdin.removeAllListeners("data");
  stdin.setRawMode(true);
  stdin.setEncoding("utf-8");

  stdin.on("data", (key: string) => {
    handler(key);
  });
}

class Scene {
  init() {}
  async update(key: string): Promise<{ nextScene: string }> {
    return { nextScene: "" };
  }

  render() {}
}
type SceneCtor = new () => Scene;

class SceneManager {
  private registry: Map<string, SceneCtor>;
  public currentScene: Scene | null;
  constructor() {
    this.registry = new Map<string, SceneCtor>();
    this.currentScene = null;
  }

  register({ name, scene }: { name: string; scene: SceneCtor }) {
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

class TitleScene {
  init() {
    console.log("loading title...");
  }

  update(key: string): { nextScene: string } {
    if (key === "n") {
      return { nextScene: "game" };
    }
    return { nextScene: "" };
  }

  render() {
    console.log("Title Scene");
  }
}

class ResultScene {
  init() {
    console.log("loading result...");
  }
  update(key: string): { nextScene: string } {
    if (key === "\u0003") {
      console.log("GameEnds");
      process.exit();
    }
    return { nextScene: "" };
  }

  render() {
    console.log("Result Scene");
  }
}

class GameScene {
  public storedKeypress: string;
  public keypressCount: number;

  constructor() {
    this.storedKeypress = "";
    this.keypressCount = 0;
  }

  init() {
    console.log("initializing game...");
  }

  update(key: string): { nextScene: string } {
    this.storedKeypress += key;
    ++this.keypressCount;

    if (this.storedKeypress === "attack") {
      console.log("hit");
      return { nextScene: "result" };
    }

    return { nextScene: "" };
  }

  render() {
    console.log("stored keypress ", this.storedKeypress);
    console.log("Game Scene");
  }
}

const game = new GameScene();

class Engine {
  public running: boolean;
  public key: string | null;
  public sceneManager: SceneManager;

  constructor() {
    this.sceneManager = new SceneManager();
    this.running = false;
    this.key = null;
  }

  private async processInput() {
    await new Promise((resolve) => {
      handleKey((key: string) => {
        this.key = key;
        if (key) return resolve(null);
      });
    });
  }

  private async update() {
    const currentScene = this.sceneManager.currentScene;
    if (!this.key || !currentScene) return;
    const result = await this.sceneManager.currentScene?.update(this.key);
    if (result) {
      this.sceneManager.load(result?.nextScene);
    }
    return;
  }

  async loop() {
    while (this.running) {
      await this.processInput();
      this.update();

      // render scene
      this.sceneManager.currentScene?.render();
    }
  }

  run(initialSceneName: string) {
    this.running = true;
    this.sceneManager.load(initialSceneName);
    this.loop();
  }

  stop() {
    this.running = false;
  }
}

const engine = new Engine();
engine.sceneManager
  .register({ name: "title", scene: TitleScene })
  .register({ name: "game", scene: GameScene })
  .register({ name: "result", scene: ResultScene });
engine.run("title");
