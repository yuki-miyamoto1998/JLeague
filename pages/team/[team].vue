<template>
  <div>
    <h3>{{ teamId }}</h3>
    <h3>{{ teamName }}</h3>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { Team } from "~/models/team";

const teamParam = useRoute().params.team;
const teamId = (Array.isArray(teamParam) ? teamParam[0] : teamParam) as string;

// api経由でチーム情報を取得
const {data: team} = await useAsyncData<Team>(
  'findTeam',
  async () => {
    const result = await $fetch<Team>(`/api/findTeam?team_id=${teamId}`)
    return Team.createFromObject(result)
  }
)
console.log(JSON.stringify(team.value))
const teamName = team.value?.name;

if (!teamName) {
  throw createError({
    statusCode: 404,
    message: "チームが見つかりません",
    fatal: true,
  });
}
</script>
