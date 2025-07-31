import ScreenManager from "./screen-manager.js";

class Engine {
  constructor() {
    this.screenMgr = new ScreenManager();
  }
  start() {
    this.screenMgr.loadTitleScreen()
  }
}
const engine = new Engine()
engine.start();