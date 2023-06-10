import { Team } from "~/models/team";

export class TeamService {
  private _createdAt: Date;

  constructor(private _teamList: Team[]) {
    this._createdAt = new Date();
  }

  set teamList(value: Team[]) {
    this._teamList = value;
  }

  set cachedAt(value: Date) {
    this._createdAt = value;
  }

  get cachedAt(): Date {
    return this._createdAt;
  }

  get teamList(): Team[] {
    return this._teamList;
  }

  public findTeam(id: string): Team | undefined {
    return this._teamList.find(team => team.id === id);
  }

  public getTeamIdSet(): Set<string> {
    return new Set<string>(this._teamList.map(team => team.id))
  }
}
