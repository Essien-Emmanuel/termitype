import Engine from "@/core/engine";
import TitleScreen from "./screens/title";

const engine = new Engine();
engine.screenManager.register({ name: "title", screen: TitleScreen });
engine.start("title");
