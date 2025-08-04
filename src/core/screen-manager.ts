import TitleScreen from "../screens/title";
import PrologueScreen from "../screens/prologue";
import GameScreen from "../screens/game";
import GameOverScreen from "../screens/game-over";
import GameTieScreen from "../screens/game-tie";
import VictoryScreen from "../screens/victory";
import MenuScreen from "../screens/menu";
import GameMenuScreen from "../screens/game-menu";
import type GameState from "../models/game-state";
import type { Screen } from "../types";

export default class ScreenManager {
  public currentScreen: Screen | null;

  constructor() {
    this.currentScreen = null;
  }

  _setScreen<T extends Screen>(screen: T) {
    screen.show();
    this.currentScreen = screen;
    screen.handleKeyPress(this);
  }

  loadMenuScreen() {
    const screen = new MenuScreen();
    this._setScreen(screen);
  }

  loadGameMenuScreen() {
    const screen = new GameMenuScreen();
    this._setScreen(screen);
  }

  loadTitleScreen() {
    const screen = new TitleScreen();
    this._setScreen(screen);
  }

  loadPrologueScreen() {
    const screen = new PrologueScreen();
    this._setScreen(screen);
  }

  loadGameScreen(state: GameState | null) {
    // fix null
    const screen = new GameScreen(state);
    this._setScreen(screen);
  }

  loadGameOverScreen() {
    const screen = new GameOverScreen();
    this._setScreen(screen);
  }

  loadGameTieScreen() {
    const screen = new GameTieScreen();
    this._setScreen(screen);
  }

  loadVictoryScreen() {
    const screen = new VictoryScreen();
    this._setScreen(screen);
  }
}
