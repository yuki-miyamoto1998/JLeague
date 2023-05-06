<template>
  <div>
    <h3>札幌</h3>
    <h3>{{teamName}}</h3>
  </div>
</template>
<script lang="ts" setup>
import { makeTeamService } from "~/composables/getTeamService";

// teamServiceを読み込み
const {data: teamService} = await useAsyncData(
  'getTeamService',
  async () => makeTeamService()
)
const teamName = teamService.value?.findTeam("fctokyo")?.name;
</script>
