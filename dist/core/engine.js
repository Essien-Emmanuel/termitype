import { SceneManager } from "./scene-manager.js";
import { handleKeypress } from "./io.js";
export class Engine {
    _running;
    _key;
    sceneManager;
    // public timeout: number;
    timeoutId;
    constructor() {
        this.sceneManager = new SceneManager();
        this._running = false;
        this._key = "";
        // this.timeout = 0;
        this.timeoutId = undefined;
    }
    async _processInput() {
        await new Promise((resolve) => {
            handleKeypress((keypress) => {
                this._key = keypress;
                if (keypress)
                    return resolve(null);
            });
        });
    }
    async _update() {
        const currentScene = this.sceneManager.currentScene;
        if (!this._key || !currentScene)
            return;
        const result = await this.sceneManager.currentScene?.update(this._key);
        return result;
    }
    async _runUpdateAndRender() {
        let result = await this._update();
        this.sceneManager.currentScene?.render();
        if (result && this.sceneManager.currentScene) {
            if (result.data) {
                this.sceneManager.load(result?.nextScene, {
                    data: result.data,
                });
            }
            else {
                this.sceneManager.load(result?.nextScene);
            }
        }
    }
    async _loop() {
        while (this._running) {
            if (this.timeoutId && this.sceneManager.currentScene?.cancelSetTimout) {
                clearTimeout(this.timeoutId);
                this.timeoutId = undefined;
            }
            await this._processInput();
            if (this.sceneManager.currentScene?.timeout && !this.timeoutId) {
                this.timeoutId = setTimeout(() => {
                    this._key = "timeout";
                    clearTimeout(this.timeoutId);
                    this._runUpdateAndRender();
                }, this.sceneManager.currentScene?.timeout);
            }
            this._runUpdateAndRender();
        }
    }
    run(initialSceneName) {
        this._running = true;
        this.sceneManager.load(initialSceneName);
        this._loop();
    }
    stop() {
        this._running = false;
    }
}
