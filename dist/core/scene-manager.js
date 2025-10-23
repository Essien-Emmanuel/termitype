export class SceneManager {
    _registry;
    currentScene;
    sceneName;
    constructor() {
        this._registry = new Map();
        this.currentScene = null;
        this.sceneName = "";
    }
    register(name, sceneCtor) {
        const isKey = this._registry.has(name);
        if (!isKey) {
            this.sceneName = name;
            this._registry.set(name, sceneCtor);
        }
        return this;
    }
    load(sceneName, config) {
        const isKey = this._registry.has(sceneName);
        if (!isKey)
            return;
        const sceneCtor = this._registry.get(sceneName);
        const scene = new sceneCtor();
        if (config && config.data) {
            scene.init(config.data?.opt);
        }
        else {
            scene.init();
        }
        this.currentScene = scene;
    }
}
