import Input from "../../src/core/input";
import { promptInput } from "../../src/core/io";
import Screen, { ScreenUpdateReturnType } from "../../src/core/screen";
import { Entity } from "../entities";

export default class GameScreen extends Screen {
  public player: Entity;
  public npc: Entity;

  async init(): Promise<void> {
    console.log("initializing game screen...");
    this.player = new Entity();
    this.npc = new Entity();
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
      } else {
        console.log("you lose");
      }
    };

    await promptInput(cb, { prompt, timeout });
    const cb2 = (input: string) => {
      if (Input.isChar(target, input)) {
        console.log("enemy takes hit");
      } else {
        console.log("you lose");
      }
    };

    await promptInput(cb2, { prompt, timeout });

    return { nextScreenName: "next" };
  }
}
