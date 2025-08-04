import type Engine from "./engine";
import type Screen from "./screen";
import type { ScreenManagerRegistry, RegisterScreenArgs } from "@/types";

export default class ScreenManager {
  public engine: Engine;
  public registry: ScreenManagerRegistry;
  public currentScreen: Screen | null;

  constructor(engine: Engine) {
    this.engine = engine;
    this.registry = {};
    this.currentScreen = null;
  }

  register({ name, screen }: RegisterScreenArgs) {
    this.registry[name] = screen;
  }

  async load(name: string) {
    const screenCtor = this.registry[name];
    console.log("loading screen ", screenCtor);
    if (!screenCtor) throw new Error(`No Screen ${name}`);

    this.currentScreen = new screenCtor(this.engine);
    await this.currentScreen.init();
  }
}
