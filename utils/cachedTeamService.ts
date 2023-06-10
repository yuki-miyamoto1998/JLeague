import { readFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { TeamService } from "~/models/teamService";
import { Team } from "~/models/team";
import { fileURLToPath } from "url";

const DEFAULT_CACHE_UPDATE_INTERVAL_HOURS = 120

let cachedTeamService: TeamService = new TeamService([]);
let lastCacheUpdateTime = new Date(2000, 1, 1)

export const getCachedTeamService = async (
  shouldUpdateCache = true,
  cacheIntervalHours = DEFAULT_CACHE_UPDATE_INTERVAL_HOURS
): Promise<TeamService> => {
  // 最後更新からcacheIntervalHours時間以上経っていればキャッシュを更新してから返す
  if (shouldUpdateCache && calculateHourDifference(lastCacheUpdateTime, new Date()) > cacheIntervalHours)
    cachedTeamService = await getUpdatedTeamService()
  return cachedTeamService
}

const getUpdatedTeamService = async (): Promise<TeamService> => {
  const preCacheUpdateTime = lastCacheUpdateTime
  lastCacheUpdateTime = new Date()
  try {
    const teamList = await loadTeamsFromFile()
    console.log(`get teamList successfully. teamList:${teamList.map(team => team.name)}`);
    return new TeamService(teamList)
  } catch (err) {
    lastCacheUpdateTime = preCacheUpdateTime
    console.error('loadTeamsFileToCacheでエラーが発生しました:', err);
    return cachedTeamService
  }
}

const calculateHourDifference = (firstDate: Date, secondDate: Date): number => {
  const diffMillSeconds = secondDate.getTime() - firstDate.getTime()
  return diffMillSeconds / (1000 * 60 * 60)
}

const loadTeamsFromFile = async (): Promise<Team[]> => {
  // api経由とそれ以外でimport.meta.urlが異なるため調整する
  const __dirname = dirname(fileURLToPath(import.meta.url)).replace(/(\\\.nuxt\\dev|\\utils)$/, "");
  const rawData = await readFile(resolve(__dirname, './server/teams.json'), 'utf8');
  const parsedData = JSON.parse(rawData);
  return parsedData['teams'].map((team: any) =>
    new Team(team.id, team.name, team.category)
  )
}
