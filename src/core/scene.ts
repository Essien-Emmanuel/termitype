import type { InputKey } from "@/@types";

export class Scene {
  public timeout: number;

  constructor() {
    this.timeout = 0;
  }

  init() {}

  async update(key: InputKey): Promise<{ nextScene: string }> {
    return { nextScene: "" };
  }

  render() {}
}
