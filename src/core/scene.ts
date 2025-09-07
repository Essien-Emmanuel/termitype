export class Scene {
  init() {}
  async update(key: string): Promise<{ nextScene: string }> {
    return { nextScene: "" };
  }

  render() {}
}
