import Entity from "./entity.js";

export default class GameState {
  constructor(data) {
    this.data = Object.assign(
      {
        currentScreen: "GameScreen",
        player: new Entity("player", 20),
        enemy: new Entity("enemy", 20),
        turnCount: 0,
        level: 1,
        isDefault: false,
      },
      data
    );
  }

  toJSON() {
    return this.data;
  }

  static fromJSON(jsonData) {
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
  }
}
