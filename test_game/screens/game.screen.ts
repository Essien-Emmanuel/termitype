import { promptInput } from "../../src/core/io";
import Screen, { ScreenUpdateReturnType } from "../../src/core/screen";

export class GameScreen extends Screen {
  async init(): Promise<void> {
    console.log("Initializing game screen...");
  }

  async update(key: string): ScreenUpdateReturnType {
    return {};
  }
}
