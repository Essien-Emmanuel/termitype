import type { InputKey, UpdateSceneReponse } from "@/@types";
import { Scene } from "@/core/scene";
import { clearEntireScreen } from "@/core/io";
import { Input } from "@/core/input";

const { isCtrlC } = Input;

export class TitleScene extends Scene {
  constructor() {
    super();
  }

  init() {
    clearEntireScreen();
    console.log("loading title...");
  }

  async update(key: InputKey): UpdateSceneReponse {
    if (isCtrlC(key)) {
      process.exit();
    }
    return { nextScene: "mainMenu" };
  }

  render() {
    console.log("Title Scene");
  }
}
