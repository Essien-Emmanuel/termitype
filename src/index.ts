import Engine from "@/core/engine";
import TitleScreen from "./screens/title";
import Prologue from "./screens/prologue";
import GameScreen from "./screens/game";

const engine = new Engine();
engine.screenManager
  .register({ name: "title", screen: TitleScreen })
  .register({ name: "prologue", screen: Prologue })
  .register({ name: "game", screen: GameScreen });

engine.start("title");
console.log(engine.getState())
