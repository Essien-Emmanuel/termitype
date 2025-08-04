import Screen, { type ScreenUpdateReturnType } from "@/core/screen";

export default class TitleScreen extends Screen {
  async init() {
    console.log("initializing screen...");
  }

  async update(): ScreenUpdateReturnType {
    console.log("updated title screen");
    return {};
  }
}
