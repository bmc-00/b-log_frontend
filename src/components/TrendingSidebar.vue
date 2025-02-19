<template>
  <div class="trending-sidebar">
    <h4>Trending Topics</h4>
    <ul>
      <li v-for="i in 5" :key="i">🔥 Topic {{ i }}</li>
    </ul>
  </div>
</template>

<style scoped>
.trending-sidebar {
  padding: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}
</style>
