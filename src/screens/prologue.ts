import Screen, { type ScreenUpdateReturnType } from "@/core/screen";

export default class Prologue extends Screen {
  async init(): Promise<void> {
    console.log("initializing Prologue screen...");
  }

  async update(key: string): ScreenUpdateReturnType {
    console.log("updating");
    if (key === "\r") {
      console.log("ENTER");
      this.engine.stop();
    }
    return {};
  }
}
