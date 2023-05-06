export class Team {
  constructor(
    private _id: string,
    private _name: string,
    private _category: 1 | 2 | 3) {
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get category(): 1 | 2 | 3 {
    return this._category;
  }
}
