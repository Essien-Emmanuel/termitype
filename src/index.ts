import Engine from "@/core/engine";
import TitleScreen from "./screens/title";
import Prologue from "./screens/prologue";
import GameScreen from "@/screens/game";
import NextScreen from "./screens/next";

const engine = new Engine();
engine.screenManager
  .register({ name: "title", screen: TitleScreen })
  .register({ name: "prologue", screen: Prologue })
  .register({ name: "game", screen: GameScreen })
  .register({ name: "next", screen: NextScreen });

engine.start("title");
// console.log(engine.getEngineState());
