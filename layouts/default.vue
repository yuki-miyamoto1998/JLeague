<template>
  <div>
    <Header/>
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue'</script>

<style scoped>
.Header {
}
</style>
