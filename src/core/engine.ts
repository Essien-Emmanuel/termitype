import { SceneManager } from "./scene-manager";
import { handleKey } from "./io";

export class Engine {
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

    return result;
  }

  async loop() {
    while (this.running) {
      // handle input
      await this.processInput();

      // update
      const result = await this.update();

      // render scene
      this.sceneManager.currentScene?.render();

      if (result) {
        this.sceneManager.load(result?.nextScene);
      }
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
