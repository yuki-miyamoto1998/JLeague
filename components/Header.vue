<template>
  <div>
    <header class="header">
      <nav class="nav-container">
        <ul class="nav-list">
          <li v-for="item in sortedItems" :key="item.text" class="nav-item">
            <a :href="item.link" class="nav-link">{{ item.text }}</a>
          </li>
        </ul>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<script lang="ts" setup>
interface NavItem {
  text: string;
  link: string;
}

const items: NavItem[] = [
  {text: 'FC東京', link: '/'},
  {text: 'コンサドーレ札幌', link: '/sapporo'},
  {text: 'サガン鳥栖', link: '/tosu'},
];
const sortedItems = items.sort((a, b) => a.text.localeCompare(b.text));
//const jsonData = require('../static/JLeague.json')
</script>

<style scoped>
.header {
  background-color: #333;
  padding: 1rem;
}

.nav-container {
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  gap: 1rem;
}

.nav-item {
}

.nav-link {
  text-decoration: none;
  color: white;
}

.nav-link:hover {
  color: #ccc;
}
</style>