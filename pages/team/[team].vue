<template>
  <div>
    <h3>{{ teamId }}</h3>
    <h3>{{ teamName }}</h3>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';

const teamParam = useRoute().params.team;
const teamId = (Array.isArray(teamParam) ? teamParam[0] : teamParam) as string;

// teamServiceを読み込み
const {data: teamService} = await useAsyncData(
  'getTeamService',
  async () => makeTeamService()
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
