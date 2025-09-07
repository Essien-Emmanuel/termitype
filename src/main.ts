export const engine = new Engine();

engine.sceneManager
  .register({ name: "title", scene: TitleScene })
  .register({ name: "game", scene: GameScene })
  .register({ name: "result", scene: ResultScene });

engine.run("title");
