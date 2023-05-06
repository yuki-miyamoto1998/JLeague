import { Team } from "~/models/team";
import { TeamService } from "~/models/teamService";

export const makeTeamService = () => {
  try {
    const jsonData = require('../server/teams.json');
    const teamList = jsonData['teams'].map((team: any) => {
      return new Team(team.id, team.name, team.category);
    });
    return new TeamService(teamList);
  } catch (error) {
    console.error('makeTeamServiceでエラーが発生しました:', error);
  }
}
