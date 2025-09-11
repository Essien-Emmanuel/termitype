import type { InputKey, UpdateSceneReponse } from "@/@types";
import { Scene } from "@/core/scene";
import { Input } from "@/core/input";

const { isCtrlL, isChar } = Input;

export class TitleScene extends Scene {
  constructor() {
    super();
  }

  init() {
    console.log("loading title...");
  }

  async update(key: InputKey): UpdateSceneReponse {
    if (isChar(key, "n")) {
      return { nextScene: "game" };
    }

    if (isCtrlL(key)) {
      return { nextScene: "gameMenu" };
    }

    return { nextScene: "" };
  }

  render() {
    console.log("Title Scene");
  }
}
