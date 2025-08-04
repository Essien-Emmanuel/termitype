import type { GameStateConfig } from "@/types";
import { topLevelSafeObject } from "@/utils/helper";
import Entity from "./entity";

export default class GameState {
  public config: GameStateConfig;

  constructor(config: GameStateConfig) {
    const safeConfig = topLevelSafeObject(config);

    this.config = Object.assign(
      {
        currentScreen: "GameScreen",
        player: new Entity("player", 20),
        enemy: new Entity("enemy", 20),
        turnCount: 0,
        level: 1,
        isDefault: false,
      },
      safeConfig
    );
  }

  toJSON() {
    return this.config;
  }

  static fromJSON(jsonData: string): GameState | null {
    try {
      const data = JSON.parse(jsonData);
      const { player, enemy } = data;

      const { name: pName, hp: pHp } = player;
      const { name: eName, hp: eHp } = enemy;

      const playerEntity = new Entity(pName, pHp);
      const enemyEntity = new Entity(eName, eHp);

      return new GameState({
        player: playerEntity,
        enemy: enemyEntity,
        currentScreen: data.currentScreen,
        isDefault: data.isDefault,
      });
    } catch (error: Error | any) {
      // reload game state
      console.log(error.name);
      return null;
    }
  }
}
