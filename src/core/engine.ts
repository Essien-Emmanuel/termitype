import { SceneManager } from "./scene-manager";
import { handleKey } from "./io";
import type { InputKey } from "@/@types";

export class Engine {
  public running: boolean;
  public key: InputKey;
  public sceneManager: SceneManager;
  public timeout: number;

  constructor() {
    this.sceneManager = new SceneManager();
    this.running = false;
    this.key = "";
    this.timeout = 0;
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

      const runUpdateAndRender = async () => {
        // update
        let result = await this.update();

        // render scene
        this.sceneManager.currentScene?.render();

        if (result) {
          this.sceneManager.load(result?.nextScene);
        }
      };

      if (this.sceneManager.currentScene?.timeout) {
        setTimeout(async () => {
          this.key = "timeout";
          runUpdateAndRender();
        }, this.sceneManager.currentScene.timeout);
      }
      runUpdateAndRender();
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
