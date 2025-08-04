import type Engine from "./core/engine";
import type Screen from "./core/screen";

export type ScreenConstructor = new (engine: Engine) => Screen;

export type ScreenManagerRegistry = Map<string, ScreenConstructor>;

export interface RegisterScreenArgs<K extends string> {
  name: K;
  screen: ScreenConstructor;
}
