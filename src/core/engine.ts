import { SceneManager } from "./scene-manager";

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

  private update() {
    if (this.key) {
      const currentScene = this.sceneManager.currentScene;
      if (currentScene) {
        const result = this.sceneManager.currentScene?.update(this.key);
        if (result) {
          this.sceneManager.load(result?.nextScene);
        }
      }
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
