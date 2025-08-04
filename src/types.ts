import type Engine from "./core/engine";
import type Screen from "./core/screen";

export type ScreenConstructor = new (engine: Engine) => Screen;

export interface ScreenManagerRegistry {
  [key: string]: ScreenConstructor;
}

export interface RegisterScreenArgs {
  name: string;
  screen: ScreenConstructor;
}
