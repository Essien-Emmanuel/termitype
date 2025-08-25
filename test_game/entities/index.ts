export type EntityData = {
  hp?: number;
  mp?: number;
  xp?: number;
  health?: number;
};

export class Entity {
  public data: EntityData;
  constructor(data: EntityData = {}) {
    this.data = Object.assign<EntityData, EntityData>(
      { hp: 20, mp: 10, xp: 0, health: 100 },
      { ...data }
    );
  }
}
