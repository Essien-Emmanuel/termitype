import Screen, { type ScreenUpdateReturnType } from "@/core/screen";

export default class TitleScreen extends Screen {
  async init() {
    console.log("initializing Title Screen...");
  }

  async update(key: string): ScreenUpdateReturnType {
    if (key === "\r") {
      console.log("ENTER");
      this.engine.stop();
    }
    return {};
  }
}
