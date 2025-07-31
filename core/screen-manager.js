import TitleScreen from "../screens/title-screen.js";
import PrologueScreen from "../screens/prologue-screen.js";
import GameScreen from "../screens/game-screen.js";
import GameOverScreen from "../screens/game-over-screen.js";
import GameTieScreen from "../screens/game-over-screen.js";
import VictoryScreen from "../screens/victory-screen.js";
import { initInput, writeLine } from "./io.js";

export default class ScreenManager {
  _setScreen(screen) {
    screen.show();
    this.activeScreen = screen;
    screen.handleKeyPress(this);
  }
  loadTitleScreen() {
    const screen = new TitleScreen();
    this._setScreen(screen);
  }
  loadPrologueScreen() {
    const screen = new PrologueScreen();
    this._setScreen(screen);
  }

  loadGameScreen() {
    const screen = new GameScreen();
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
