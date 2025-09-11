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
const scenes = ["title", "game", "result"];
type Scene = (typeof scenes)[number];
const sm = new SceneMgr<Scene>();

sm.reg("");
