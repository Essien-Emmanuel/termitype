import type { InputKey, UpdateSceneReponse } from "@/@types";

export class Scene {
  public timeout: number;

  constructor() {
    this.timeout = 0;
  }

  init() {}

  async update(_key: InputKey): UpdateSceneReponse {
    return { nextScene: "" };
  }

  render() {}
}
