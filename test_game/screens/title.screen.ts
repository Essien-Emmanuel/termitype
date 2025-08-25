import Input from "../../src/core/input";
import Screen, { ScreenUpdateReturnType } from "../../src/core/screen";

export class TitleScreen extends Screen {
  async init(): Promise<void> {
    console.log("FIGHT GAME");
  }

  async update(key: string): ScreenUpdateReturnType {
    if (Input.isEnter(key)) {
      return { nextScreenName: "game" };
    }
    return {};
  }
}
