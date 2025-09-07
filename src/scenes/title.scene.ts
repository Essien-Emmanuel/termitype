export class TitleScene {
  init() {
    console.log("loading title...");
  }

  async update(key: string): Promise<{ nextScene: string }> {
    if (key === "n") {
      return { nextScene: "game" };
    }
    return { nextScene: "" };
  }

  render() {
    console.log("Title Scene");
  }
}
