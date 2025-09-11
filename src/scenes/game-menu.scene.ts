import type { InputKey, UpdateSceneReponse } from "@/@types";
import { clearEntireScreen } from "@/core/io";
import { Scene } from "@/core/scene";

export class GameMenuScene extends Scene {
  init(): void {
    clearEntireScreen();
    console.log("loading game menu...");
  }

  async update(_key: InputKey): UpdateSceneReponse {
    return { nextScene: "" };
  }

  render(): void {
    console.log("pause\nplay");
    process.exit();
  }
}
