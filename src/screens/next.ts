import Input from "@/core/input";
import Screen, { type ScreenUpdateReturnType } from "@/core/screen";

export default class NextScreen extends Screen {
  async init(): Promise<void> {
    console.log("initializing Next screen...");
  }

  async update(key: string): ScreenUpdateReturnType {
    if (typeof key === "string" && Input.isChar(key, "q")) {
      this.engine.stop();
    }
    return {};
  }
}
