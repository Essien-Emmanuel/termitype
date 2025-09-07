export class GameScene {
  public storedKeypress: string;
  public keypressCount: number;

  constructor() {
    this.storedKeypress = "";
    this.keypressCount = 0;
  }

  init() {
    console.log("initializing game...");
  }

  update(key: string): { nextScene: string } {
    this.storedKeypress += key;
    ++this.keypressCount;

    if (this.storedKeypress === "attack") {
      console.log("hit");
      return { nextScene: "result" };
    }

    return { nextScene: "" };
  }

  render() {
    console.log("stored keypress ", this.storedKeypress);
    console.log("Game Scene");
  }
}
