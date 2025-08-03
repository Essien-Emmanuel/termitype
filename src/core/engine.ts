import ScreenManager from "./screen-manager";

export default class Engine {
  public screenMgr: ScreenManager;

  constructor() {
    this.screenMgr = new ScreenManager();
  }

  start() {
    this.screenMgr.loadTitleScreen();
  }
}
