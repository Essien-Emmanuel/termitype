export default class Entity {
  public name: string;
  public hp: number;

  constructor(name: string = "Player", initialHp: number = 5) {
    this.name = name;
    this.hp = initialHp;
  }

  takeDamage(amount: number) {
    this.hp = Math.max(0, this.hp - amount);
  }

  heal(amount: number) {
    this.hp = this.hp + amount;
  }
}
