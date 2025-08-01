import TitleScreen from "../screens/title.js";
import PrologueScreen from "../screens/prologue.js";
import GameScreen from "../screens/game.js";
import GameOverScreen from "../screens/game-over.js";
import GameTieScreen from "../screens/game-tie.js";
import VictoryScreen from "../screens/victory.js";
import MenuScreen from "../screens/menu.js";
import GameMenuScreen from "../screens/game-menu.js";

export default class ScreenManager {
  _setScreen(screen) {
    screen.show();
    this.activeScreen = screen;
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
