import type { Color } from "@/renderer/color";

import type { ansiFontModes } from "@/renderer/font";

export type UpdateTargetFontColorArg = {
  textPrompt: string;
  fontPos: number;
  match: boolean;
};

export type ApplyTextStyleConfig = {
  text: string;
  styleFn: (config: StyleFontConfig) => string;
  styleFnConfig: Pick<StyleFontConfig, "color" | "mode">;
};

export type HandlekeypressHandlerArg = {
  storedKeypress: string;
  keypress: string;
  keypressCount: number;
  isTimeout: boolean;
  isBackspaceKeypress: boolean;
};

export type HandlekeypressHandler = (args: HandlekeypressHandlerArg) => void;

export type HandlekeypressOptions = {
  storeKeypress?: boolean;
  resetWindow?: boolean;
  timeout?: number;
};

export type FontMode = keyof typeof ansiFontModes;

export type StyleFontConfig = { font: string; color?: Color; mode?: FontMode };
