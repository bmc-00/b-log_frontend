<template>
    <div class="card">
        <div class="content-container">
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
        <div class="img-container"><img :src="post.image" alt="Post Image" class="card-img"></div>

        
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  post: Object,
});
</script>

<style scoped>
.card {
    display: flex;
    border-top: 0.5px solid rgb(195, 195, 195);
    padding-bottom: 10px;
    padding-top: 10px;
}
.img-container {
    width: 160px;
    height: 160px;
}
/* 카드 이미지 */
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content-container {
    flex-grow: 1;
    display: flex;
    align-items: center;
}
.card:hover {
  transform: scale(1.005);
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
</style>