export default class Entity {
  constructor(name, initialHp = 5) {
    this.name = name;
    this.hp = initialHp;
  }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
  }

  heal(amount) {
    this.hp = this.hp + amount;
  }
}
