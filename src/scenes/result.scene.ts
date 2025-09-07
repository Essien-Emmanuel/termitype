// import { showStats } from "@/game/utils.game";

export class ResultScene {
  init() {
    console.log("loading result...");
  }
  async update(key: string): Promise<{ nextScene: string }> {
    if (key === "\u0003") {
      console.log("GameEnds");
      process.exit();
    }
    return { nextScene: "" };
  }

  render() {
    // showStats({ accuracy, timeout: elapsedTime, mistakes, wpm });
    console.log("Result Scene");
  }
}
