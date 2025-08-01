export default class GameState {
  constructor(data) {
    const { currentScreen, player, enemy, turnCount, level } = data;

    this.data = data;
    this.currentScreen = currentScreen;
    this.player = player;
    this.enemy = enemy;
    this.turnCount = turnCount;
    this.level = level;
  }

  toJSON() {
    return JSON.stringify(this.data);
   
  }

  static fromJSON(jsonData) {
    const dataObj = JSON.parse(jsonData);
    return new GameState(dataObj);
  }
}
