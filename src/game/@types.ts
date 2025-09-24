import type { StyleFontConfig } from "@/@types";

export type PlayerStat = {
  wpm: number;
  accuracy: number;
  timeout: number;
  mistakes: number;
};

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

export type UserLevel = "beginner" | "intermediate" | "advance" | "master";

export type User = {
  name: string;
  improved: boolean;
  level: UserLevel;
  stat: PlayerStat;
};
