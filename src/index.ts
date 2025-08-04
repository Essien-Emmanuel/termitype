import Engine from "@/core/engine";
import TitleScreen from "./screens/title";
import Prologue from "./screens/prologue";

const engine = new Engine();
engine.screenManager.register({ name: "title", screen: TitleScreen });
engine.screenManager.register({ name: "prologue", screen: Prologue });
engine.start("title");
