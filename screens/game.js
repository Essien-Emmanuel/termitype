import { writeLine, initInput } from "../core/io.js";
import { saveGame } from "../core/persistence.js";
import Entity from "../models/entity.js";
import GameState from "../models/game-state.js";

export default class GameScreen {
  constructor(state) {
    this.player = null;
    this.enemy = null;
    this.state = state;
    this.isStarted = false;
  }

  _showStats() {
    writeLine(
      `${this.player.name} HP:${this.player.hp} ${this.enemy.name} HP:${this.enemy.hp}`
    );
    return;
  }

  show() {
    if (this.state) {
      writeLine("Loading saved game...");
      this.player = this.state.data.player;
      this.enemy = this.state.data.enemy;
      this._showStats();
      return;
    }

    writeLine("Loading game...");
    writeLine("\n> a = Attack \n> h = Heal");
    writeLine();
    this.player = new Entity("HERO", 20);
    this.enemy = new Entity("GOBLIN", 10);
    this._showStats();
    return;
  }

  handleKeyPress(screenMgr) {
    initInput({
      onKeyPress: async ($key) => {
        const key = $key.toLowerCase();
        if (!["a", "h", "s"].includes(key))
          return screenMgr.loadGameMenuScreen();

        if (key === "s") {
          // save game
          writeLine("Saving Game Progress...");
          const state = new GameState({
            player: this.player,
            enemy: this.enemy,
            level: 1,
            turnCount: 5,
            currentScreen: "GameScreen",
          });
          await saveGame(state);
          writeLine("Progress Saved!");
          return;
        }

        if (key === "a") {
          this.isStarted = true;
          const damageAmt = Math.ceil(Math.random() * 5);
          this.enemy.takeDamage(damageAmt);

          writeLine(`>>> You hit enemy with ${damageAmt} damage 👊`);

          if (this.enemy.hp <= 0) {
            this._showStats();
            writeLine();
            screenMgr.loadVictoryScreen();
            return;
          }
        }

        if (key === "h") {
          const healAmt = Math.ceil(Math.random() * 5);
          writeLine(`[] You healed with ${healAmt} amount ❤️`);
          this.player.heal(healAmt);
        }

        if (this.enemy.hp > 0) {
          // enemy retaliate
          const damageAmt = Math.ceil(Math.random() * 5);
          this.player.takeDamage(damageAmt);
          writeLine(`<<< Enemy hit You with ${damageAmt} Damage 💥`);
          if (this.player.hp === 0) {
            this._showStats();
            writeLine();
            screenMgr.loadGameOverScreen();
            return;
          }
        }

        this._showStats();
        writeLine();

        if (this.player.hp > 0) {
          this.handleKeyPress(screenMgr);
          return;
        }

        // Result
        if (this.player.hp > this.enemy.hp) {
          screenMgr.loadVictoryScreen();
        } else if (this.player.hp < this.enemy.hp) {
          screenMgr.loadGameOverScreen();
        } else {
          screenMgr.loadGameTieScreen();
        }

        return;
      },
    });
  }
}
