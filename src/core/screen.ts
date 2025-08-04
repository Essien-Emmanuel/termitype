import type Engine from "./engine";
export type ScreenUpdateReturnType = Promise<{ nextScreenName?: string }>;

export default class Screen {
  public engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  async init() {}

  async update(key: string): ScreenUpdateReturnType {
    console.log("key ", key);
    return {};
  }
}
