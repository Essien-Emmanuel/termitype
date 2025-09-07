export class TitleScene {
  init() {
    console.log("loading title...");
  }

  update(key: string): { nextScene: string } {
    if (key === "n") {
      return { nextScene: "game" };
    }
    return { nextScene: "" };
  }

  render() {
    console.log("Title Scene");
  }
}
