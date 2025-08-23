import Input from "@/core/input";
import { promptInput } from "@/core/io";
import Screen, { type ScreenUpdateReturnType } from "@/core/screen";

export default class GameScreen extends Screen {
  async init(): Promise<void> {
    console.log("initializing game screen...");
  }

  async update(key: string): ScreenUpdateReturnType {
    if (typeof key === "string" && key === "q") {
      this.engine.stop();
    }

    const timeout = 5000;
    const target = "attack";
    const prompt = "type attack \n>>> ";

    const cb = (input: string) => {
      if (Input.isChar(target, input)) {
        console.log("enemy takes hit");
      }
    };

    await promptInput(cb, { prompt, timeout });

    return { nextScreenName: "next" };
  }
}
