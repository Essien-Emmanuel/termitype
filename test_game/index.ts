import Engine from "../src/core/engine";
import { GameScreen } from "./screens/game.screen";
import { TitleScreen } from "./screens/title.screen";

const engine = new Engine();
engine.screenManager.register({ name: "title", screen: TitleScreen });
engine.screenManager.register({ name: "game", screen: GameScreen });

engine.start("title");
