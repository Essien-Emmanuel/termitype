import { clearScreen, exit, initInput } from "./io";
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

  async loop() {
    let c = 0;
    console.log(this.running);
    while (this.running && c < 30) {
      console.log("looping");
      clearScreen();
      const result = await this.screenManager.currentScreen?.update(
        this.inputKey!
      );
      if (result && result.nextScreenName) {
        await this.screenManager.load(result.nextScreenName);
      } else {
        console.log("no next");
      }
      c++;
    }
  }

  async start(initialScreenName: string) {
    this.running = true;

    await this.screenManager.load(initialScreenName);

    // handle ctrl c to quit
    initInput((key: string) => {
      console.log("in input handler", key);
      if (key === "\u0003") exit();
      this.inputKey = key;

      this.loop();
    });
  }

  stop() {
    this.running = false;
  }
}
