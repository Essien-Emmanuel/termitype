import { SceneManager } from "./scene-manager";
import { handleKeypress } from "./io";
import type { InputKey } from "@/@types";

export class Engine<T extends string> {
  private _running: boolean;
  private _key: InputKey;
  public sceneManager: SceneManager;
  public timeout: number;
  public timeoutId: NodeJS.Timeout | undefined;

  constructor() {
    this.sceneManager = new SceneManager();
    this._running = false;
    this._key = "";
    this.timeout = 0;
    this.timeoutId = undefined;
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
      this.sceneManager.load(result?.nextScene);
    }
  }

  private async _loop() {
    while (this._running) {
      if (this.timeoutId && this.sceneManager.currentScene?.cancelSetTimout) {
        clearTimeout(this.timeoutId);
      }

      await this._processInput();

      if (this.sceneManager.currentScene?.timeout) {
        this.timeoutId = setTimeout(() => {
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
    this._loop();
  }

  stop() {
    this._running = false;
  }
}
