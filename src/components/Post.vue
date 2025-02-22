<template>
    <div>
      <h1>게시글 상세 페이지</h1>
      <p>게시글 번호: {{ id }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    id: Number // ✅ 숫자로 받기
  })
  </script>