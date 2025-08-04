import { exit, initInput } from "./io";
import ScreenManager from "./screen-manager";
import Input from "./input";

const { isEnter } = Input;

export default class Engine {
  public screenManager: ScreenManager;
  public running: boolean;
  public inputKey: string | null;

  constructor() {
    this.screenManager = new ScreenManager(this);
    this.running = false;
    this.inputKey = null;
  }

  async _updateCurrentScreenThenNext() {
    const result = await this.screenManager.currentScreen?.update(
      this.inputKey!
    );
    this.inputKey = null;
    if (result && result.nextScreenName) {
      await this.screenManager.load(result.nextScreenName);
    }
  }

  async loop() {
    while (this.running) {
     // clearScreen();
      await new Promise((resolve) => {
        // handle ctrl c to quit
        initInput((key: string) => {
          if (isEnter(key)) exit();
          this.inputKey = key;
          resolve(null);
        });
      });

      await this._updateCurrentScreenThenNext();
    }
  }

  async start(initialScreenName: string) {
    this.running = true;

    await this.screenManager.load(initialScreenName);
    await this._updateCurrentScreenThenNext();

    await this.loop();
  }

  stop() {
    this.running = false;
    console.log("engine stops");
  }
}
