import { exit, initInput } from "./io";
import ScreenManager from "./screen-manager";

export default class Engine {
  public screenManager: ScreenManager;
  public running: boolean;
  public inputKey: string | null;

  constructor() {
    this.screenManager = new ScreenManager(this);
    this.running = false;
    this.inputKey = null;
  }

  async start(initialScreenName: string) {
    this.running = true;

    // handle ctrl c to quit
    initInput((key: string) => {
      console.log("in input handler", key);
      if (key === "\u0003") exit();
      this.inputKey = key;
    });

    // load initial screen
    await this.screenManager.load(initialScreenName);

    // loop
    while (this.running) {
      await this.screenManager.currentScreen?.update(this.inputKey);
    }

    console.log("key ", this.inputKey);
  }

  stop() {
    this.running = false;
  }
}
