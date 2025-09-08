import type { InputKey } from "@/@types";
import { Scene } from "@/core/scene";

export class TitleScene extends Scene {
  constructor() {
    super();
  }

  init() {
    console.log("loading title...");
  }

  async update(key: InputKey): Promise<{ nextScene: string }> {
    if (key === "n") {
      return { nextScene: "game" };
    }
    return { nextScene: "" };
  }

  render() {
    console.log("Title Scene");
  }
}
