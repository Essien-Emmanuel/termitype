import Input from "../../src/core/input";
import Screen, { ScreenUpdateReturnType } from "../../src/core/screen";

export default class Prologue extends Screen {
  async init(): Promise<void> {
    console.log("initializing Prologue screen...");
  }

  async update(key: string): ScreenUpdateReturnType {
    if (typeof key === "string" && Input.isChar(key, "q")) {
      this.engine.stop();
    }
    return { nextScreenName: "game" };
  }
}
