import { SceneManager } from "./scene-manager";
import { handleKeypress } from "./io";
import type { InputKey } from "@/@types";

export class Engine<T extends string> {
  private _running: boolean;
  private _key: InputKey;
  public sceneManager: SceneManager<T>;
  public timeout: number;

  constructor() {
    this.sceneManager = new SceneManager<T>();
    this._running = false;
    this._key = "";
    this.timeout = 0;
  }

  private async _processInput() {
    await new Promise((resolve) => {
      handleKeypress((keypress: string) => {
        this._key = keypress;
        if (keypress) return resolve(null);
      });
    });
  }

  private async _update() {
    const currentScene = this.sceneManager.currentScene;
    if (!this._key || !currentScene) return;

    const result = await this.sceneManager.currentScene?.update(this._key);

    return result;
  }

  private async _runUpdateAndRender() {
    let result = await this._update();

    this.sceneManager.currentScene?.render();

    if (result) {
      this.sceneManager.load(result?.nextScene as string);
    }
  }

  async loop() {
    while (this._running) {
      await this._processInput();

      if (this.sceneManager.currentScene?.timeout) {
        setTimeout(async () => {
          this._key = "timeout";
          this._runUpdateAndRender();
        }, this.sceneManager.currentScene?.timeout);
      }

      this._runUpdateAndRender();
    }
  }

  run(initialSceneName: T) {
    this._running = true;
    this.sceneManager.load(initialSceneName);
    this.loop();
  }

  stop() {
    this._running = false;
  }
}
