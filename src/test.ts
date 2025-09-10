class SceneMgr<T extends string> {
  public name: T | Omit<string, T>;

  constructor() {
    this.name = "";
  }
  reg(name: T) {
    this.name = name;
    return this;
  }
}
const sm = new SceneMgr();

const scenes = ["title", "game", "result"];

sm.reg("title").reg("game");
