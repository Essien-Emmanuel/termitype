import type { InputKey, UpdateSceneReponse } from "@/@types";
import { clearEntireScreen } from "@/core/io";
import { Scene } from "@/core/scene";
import { Input } from "@/core/input";

const { isChar, isCtrlC } = Input;

export class GameMenuScene extends Scene {
  init(): void {
    clearEntireScreen();
    console.log("loading game menu...");
  }

  async update(key: InputKey): UpdateSceneReponse {
    // replay
    if (isChar(key, "r")) {
      return { nextScene: "game" };
    }
    // back to title
    if (isChar(key, "n")) {
      return { nextScene: "title" };
    }

    if (isCtrlC(key)) {
      process.exit();
    }

    return { nextScene: "" };
  }

  render(): void {
    console.log("pause\nplay");
  }
}
