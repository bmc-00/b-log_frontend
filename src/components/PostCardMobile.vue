<template>
    <div class="card">
        <img :src="post.image" alt="Post Image" class="card-img">
        <div class="card-content">
        <div class="category">
          <div class="card-title">{{ post.title }}</div>
          <div class="category-content">| {{ post.category }}</div>
        </div>
        <div class="card-description">{{ post.description }}</div>
        <div class="tag">
          <div v-for="(name, index) in post.tagNames.split(',')" :key="index" class="tag-content"
            :style="{ backgroundColor: post.tagColors.split(',')[index] }">{{ name }}</div>
        </div>
        <div class="card-footer">
          <span class="author">{{ post.author }}, {{ post.date }}</span>
        </div>
      </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  post: Object,
});
</script>

<style scoped>
.card-content {
  margin: 15px;
}
/* 카드 스타일 */
.card {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  margin-bottom: 20px;
}

/* 카드 이미지 */
.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.img-container {
  width: 160px;
  height: 160px;
}

.card:hover {
  transform: scale(1.005);
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #222;
}

.card-description {
  margin-top: 10px;
  font-size: 13px;
  color: #666;
}

/* 카드 하단 */
.card-footer {
  display: flex;
  flex-direction: column;
  font-size: 11px;
  color: #888;
  gap: 2px;
}

.category {
  display: flex;
  align-items: end;
  font-size: 11px;
  color: #666;
  gap: 5px;
}

.category-content {
  margin-bottom: 3px;
}

.tag {
  display: flex;
  gap: 6px;
  font-size: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold;
  color: #666;
}

.tag-content {
  padding: 1px 7px 1px 7px;
  border-radius: 10px;
}
</style>