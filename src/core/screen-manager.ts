import type Engine from "./engine";
import type Screen from "./screen";
import type {
  ScreenManagerRegistry,
  RegisterScreenArgs,
  ScreenConstructor,
} from "@/types";

export default class ScreenManager {
  public engine: Engine;
  public registry: ScreenManagerRegistry;
  public currentScreen: Screen | null;
  public currentScreenName: string | null

  constructor(engine: Engine) {
    this.engine = engine;
    this.registry = new Map<string, ScreenConstructor>();
    this.currentScreen = null;
    this.currentScreenName = null;
  }

  register<K extends string>({ name, screen }: RegisterScreenArgs<K>) {
    this.registry.set(name, screen);
    return this;
  }

  async load(name: string) {
    const screenCtor = this.registry.get(name);
    if (!screenCtor) throw new Error(`No Screen ${String(name)}`);

    this.currentScreen = new screenCtor(this.engine as Engine);
    await this.currentScreen.init();
    this.currentScreenName = name;
  }
}
