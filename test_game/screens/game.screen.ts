import { promptInput } from "../../src/core/io";
import Screen, { ScreenUpdateReturnType } from "../../src/core/screen";

export class GameScreen extends Screen {
  async init(): Promise<void> {
    console.log("Initializing game screen...");
  }

  async update(key: string): ScreenUpdateReturnType {
    this.engine.inputType = "line";
    this.engine.inputConfig = {
      fn: (input: string) => {
        console.log("input ", input);
      },
      prompt: "Type attack: ",
    };
    return {};
  }
}
