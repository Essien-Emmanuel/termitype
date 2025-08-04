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
    while (this.running) {
      clearScreen();
      const result = await this.screenManager.currentScreen?.update(
        this.inputKey!
      );
      this.inputKey = null;
      if (result && result.nextScreenName) {
        await this.screenManager.load(result.nextScreenName);
      } else {
        this.stop();
      }
    }
  }

  async start(initialScreenName: string) {
    this.running = true;

    await this.screenManager.load(initialScreenName);
    // handle ctrl c to quit
    initInput((key: string) => {
      if (key === "\u0003") exit();
      this.inputKey = key;

      this.loop();
    });
  }

  stop() {
    this.running = false;
  }
}
