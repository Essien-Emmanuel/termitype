import { readGameFile } from "@/game/utils.game";
import { showStats } from "@/game/utils.game";
import type { PlayerStat } from "@/game/@types";
import { clearEntireScreen, setCursorPos } from "@/core/io";
// import { delay } from "@/core/utils";

export class ResultScene {
  public result: PlayerStat;
  constructor() {
    this.result = { accuracy: 0, mistakes: 0, timeout: 0, wpm: 0 };
  }

  init() {
    clearEntireScreen();

    let dataStr;
    readGameFile("saves/result.json").then((data) => (dataStr = data));

    if (dataStr) {
      this.result = JSON.parse(dataStr);
    }

    const { accuracy, mistakes, timeout, wpm } = this.result;
    showStats({ accuracy, timeout, mistakes, wpm });
  }

  async update(key: string): Promise<{ nextScene: string }> {
    if (key === "\u0003") {
      console.log("GameEnds");
    }
    return { nextScene: "" };
  }

  render() {
    process.exit();
  }
}
