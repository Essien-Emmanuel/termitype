import { writeLine, initInput } from "../core/io.js";
import Entity from "../models/entity.js";

export default class GameScreen {
  _showStats() {
    writeLine(
      `${this.player.name} HP:${this.player.hp} ${this.enemy.name} HP:${this.enemy.hp}`
    );
  }
  show() {
    writeLine("Loading game...");
    this.player = new Entity("HERO", 20);
    this.enemy = new Entity("GOBLIN", 10);
    this._showStats();
  }

  handleKeyPress(screenMgr) {
    initInput($key => {
      const key = $key.toLowerCase();
      if (!["a", "h"].includes(key)) return;

      if (key === "a") {
        const damageAmt = Math.ceil(Math.random() * 5);
        this.enemy.takeDamage(damageAmt);
        writeLine(`You hit enemy with ${damageAmt} damage`);
        this._showStats();
        if (this.enemy.hp === 0) {
          screenMgr.loadVictoryScreen();
        }
      }

      if (key === "h") {
        const healAmt = Math.ceil(Math.random() * 5);
        this.player.heal(healAmt);
        this._showStats();
      }

      if (this.enemy.hp > 0) {
        // enemy retaliate
        const damageAmt = Math.ceil(Math.random() * 5);
        this.player.takeDamage(damageAmt);
        writeLine(`Enemy hit You with ${damageAmt} Damage`);
        this._showStats();
        if (this.player.hp === 0) {
          screenMgr.loadGameOverScreen();
        }
      }

      if (this.player.hp > this.enemy.hp) {
        screenMgr.loadVictoryScreen();
      } else if (this.player.hp < this.enemy.hp) {
        screenMgr.loadGameOverScreen();
      } else {
        screenMgr.loadGameTieScreen();
      }
    });
  }
}
