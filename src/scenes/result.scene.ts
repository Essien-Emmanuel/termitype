import { readGameFile } from "@/game/utils.game";
import { showStats } from "@/game/utils.game";
import type { PlayerStat } from "@/game/@types";
import { clearEntireScreen } from "@/core/io";
import type { InputKey, UpdateSceneReponse } from "@/@types";
import { Scene } from "@/core/scene";
import { Input } from "@/core/input";

const { isEnter } = Input;

export class ResultScene extends Scene {
  public result: PlayerStat;
  constructor() {
    super();
    this.result = { accuracy: 0, mistakes: 0, timeout: 0, wpm: 0 };
  }

  async init() {
    clearEntireScreen();

    const dataStr = await readGameFile("saves/result.json");

    if (dataStr) {
      this.result = JSON.parse(dataStr);
    }

    const { accuracy, mistakes, timeout, wpm } = this.result;
    showStats({ accuracy, timeout, mistakes, wpm });
  }

  async update(key: InputKey): UpdateSceneReponse {
    if (isEnter(key)) {
      console.log("GameEnds");
    }
    return { nextScene: "" };
  }

  render() {
    process.exit();
  }
}
