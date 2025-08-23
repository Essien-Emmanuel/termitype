import { promptInput } from "./io";
import ScreenManager from "./screen-manager";
import Input from "./input";

export default class Engine {
  public screenManager: ScreenManager;
  public running: boolean;
  public inputKey: string | null;
  public inputConfig: {
    fn: (input: "string") => void;
    prompt: string;
    timeout?: number;
  } | null;

  constructor() {
    this.screenManager = new ScreenManager(this);
    this.running = false;
    this.inputKey = null;
    this.inputConfig = null;
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
    let count = 0;
    while (this.running && count < 4) {
      await new Promise((resolve) => {
        promptInput(
          (input: string) => {
            this.inputKey = input;
            console.log("input from prompt", input);
          },
          { prompt: "type attack >>> " }
        );
        resolve(null);
      });
      await this._updateCurrentScreenThenNext();
      ++count;
    }
  }

  async start(initialScreenName: string) {
    this.running = true;

    await this.screenManager.load(initialScreenName);

    await this.loop();
  }

  stop() {
    this.running = false;
    console.log("engine halted!");
  }

  getEngineState() {
    return {
      running: this.running,
      inputKey: this.inputKey,
      currentScreenName: this.screenManager.currentScreenName,
    };
  }

  getGameState() {}
}
