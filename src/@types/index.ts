import type { Scene } from "@/core/scene";
import type { Color } from "@/renderer/color";

import type { ansiFontModes } from "@/renderer/font";

export type UpdateTargetFontColorArg = {
  textPrompt: string;
  fontPos: number;
  match: boolean;
  isBackspace: boolean;
};

export type ApplyTextStyleConfig = {
  text: string;
  styleFn: (config: StyleFontConfig) => string;
  styleFnConfig: Pick<StyleFontConfig, "color" | "mode">;
};

export type HandlekeypressHandler = (keypress: string) => void;

export type FontMode = keyof typeof ansiFontModes;

export type StyleFontConfig = { font: string; color?: Color; mode?: FontMode };

export type UpdateSceneReponse = Promise<{ nextScene: string }>;

export type SceneCtor = new () => Scene;

export type SceneManagerRegistry = Map<string, SceneCtor>;

export type SceneManagerRegisterArg = { name: string; scene: SceneCtor };

export type LooseAutoComplete<T extends string> = T | Omit<string, T>;

export type InputKey = LooseAutoComplete<"timeout">;
