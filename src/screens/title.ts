import Screen, { type ScreenUpdateReturnType } from "@/core/screen";

export default class TitleScreen extends Screen {
  async init() {
    console.log("initializing Title Screen...");
  }

  async update(_key: string): ScreenUpdateReturnType {
    return { nextScreenName: "prologue" };
  }
}
