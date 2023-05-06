<template>
  <div>
    <h3>{{ teamId }}</h3>
    <h3>{{ teamName }}</h3>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { Team } from "~/models/team";
import { TeamService } from "~/models/teamService";

const teamParam = useRoute().params.team;
const teamId = (Array.isArray(teamParam) ? teamParam[0] : teamParam) as string;

// teamServiceを読み込み
const {data: teamService} = await useAsyncData(
  'getTeamService',
  async () => {
    console.log("[team].vueでーす");
    // サーバ側でJSONデータを読み込む
    const jsonData = require('../../server/teams.json');
    const teamList = jsonData['teams'].map((team: any) => {
      return new Team(team.id, team.name, team.category);
    });
    // JSONデータを自作クラスにマッピングする
    return new TeamService(teamList)
  }
)
const teamName = teamService.value?.findTeam(teamId)?.name;

if (!teamName) {
  throw createError({
    statusCode: 404,
    message: "チームが見つかりません",
    fatal: true,
  });
}
</script>
