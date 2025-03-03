<template>
    <div class="card">
        <img :src="post.image" alt="Post Image" class="card-img">
        <div class="card-content">
        <div class="category">
            <div class="category-content"> {{ post.category }}</div>
        </div>
        <div class="card-title">{{ post.title }}</div>
        <div class="card-description">{{ post.description }}</div>
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
/* 카드 스타일 */
.card {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  margin-bottom: 20px;
}

.card:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* 카드 이미지 */
.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* 카드 내용 */
.card-content {
  padding: 0px 15px 15px 15px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin-top: 10px;
  margin-bottom: 10px;
}

.card-description {
  font-size: 13px;
  color: #666;
  margin-bottom: 15px;
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
  margin-top: 10px;
  font-size: 10px;
  color: #555;
  font-weight: bold;
}

.category-content{
    background-color: rgb(235, 235, 255);
    padding: 3px 7px 3px 7px;
    border-radius: 12px;
}

.author {
  font-weight: lighter;
}
</style>