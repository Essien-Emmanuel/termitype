import Screen, { type ScreenUpdateReturnType } from "@/core/screen";

export default class Prologue extends Screen {
  async init(): Promise<void> {
    console.log("initializing Prologue screen...");
  }

  async update(key: string): ScreenUpdateReturnType {
    if (typeof key === "string" && key === "q") {
      this.engine.stop();
    }
    return {};
  }
}
