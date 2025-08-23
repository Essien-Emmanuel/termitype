import Screen, { type ScreenUpdateReturnType } from "@/core/screen";

export default class GameScreen extends Screen {
  async init(): Promise<void> {
    console.log("initializing game screen...");
  }

  async update(key: string): ScreenUpdateReturnType {
    console.log("past");
    if (typeof key === "string" && key === "q") {
      this.engine.stop();
    }

    return {};
  }
}
