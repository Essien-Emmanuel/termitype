import type ScreenManager from "./core/screen-manager";
import type Entity from "./models/entity";

export interface InputKeyPressConfig {
  prompt?: string;
  onKeyPress: (arg: string) => void;
}

export interface InputLineConfig {
  prompt?: string;
  onType: (arg: string) => void;
}

export interface Screen {
  show: () => void;
  handleKeyPress: (arg: ScreenManager) => void;
}

export interface GameStateConfig {
  currentScreen: string;
  player: Entity;
  enemy: Entity;
  turnCount?: number;
  level?: number;
  isDefault?: boolean;
}
