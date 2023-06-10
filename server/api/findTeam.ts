import { getCachedTeamService } from "~/utils/cachedTeamService";

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const teamId =
    (Array.isArray(query.team_id) ? query.team_id[0] : query.team_id) as string;
  console.log(`requested teamId:${teamId} query:${JSON.stringify(query)}`);

  const teamService = await getCachedTeamService()
  console.log(teamService.cachedAt)
  const result = teamService.findTeam(teamId);
  console.log(`findTeam result:${result?.name}`);

  return result;
});
