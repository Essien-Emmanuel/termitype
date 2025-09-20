import type { InputKey, UpdateSceneReponse } from "@/@types";

export class Scene {
  public timeout: number;
  public cancelSetTimout: boolean;

  constructor() {
    this.timeout = 0;
    this.cancelSetTimout = false;
  }

  init() {}

  async update(_key: InputKey): UpdateSceneReponse {
    return { nextScene: "" };
  }

  render() {}
}
