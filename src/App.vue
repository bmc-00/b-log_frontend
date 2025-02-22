<script setup>
import Blog from './components/Blog.vue'
</script>

<template>
  <Blog/>
</template>

<style>
html, body, #app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: '42dot Sans', sans-serif;
  font-weight: 300;
  color: #1E2A38;
}
/* 모든 RouterLink 요소에서 밑줄 제거 */
a {
  text-decoration: none;
}

</style>
