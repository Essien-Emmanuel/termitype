import type { sceneNames } from "@/config/scene-names";
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

export type StyleConfig = { color?: Color; mode?: FontMode };

export type StyleFontConfig = { font: string } & StyleConfig;

export type SceneNames = (typeof sceneNames)[number];

export type SceneName = SceneNames | (string & {});

export type UpdateSceneReponseData = {
  opt: string;
};

export type UpdateSceneReponse = Promise<{
  nextScene: SceneName;
  data?: UpdateSceneReponseData;
  [key: string]: any;
}>;

export type SceneCtor = new () => Scene;

export type SceneManagerRegistry = Map<SceneName, SceneCtor>;

export type LooseAutoComplete<T extends string> = T | Omit<string, T>;

export type InputKey = LooseAutoComplete<"timeout">;

export type MenuNavs = { up: InputKey[]; down: InputKey[] };

export type WordMapValue = {
  word: string;
  len: number;
  typed: string;
  visited: boolean;
  corrected: boolean;
};

export type WordMapReturnType = Record<string, WordMapValue>;
