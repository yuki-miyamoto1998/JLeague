import { Team } from "~/models/team";

export class TeamService {
  constructor(private _teamList: Team[]) {
  }

  public findTeam(id: string): Team | undefined {
    return this._teamList.find(team => team.id === id);
  }

  public getTeamIdSet(): Set<string> {
    return new Set<string>(this._teamList.map(team => team.id))
  }

  get teamList(): Team[] {
    return this._teamList;
  }
}
