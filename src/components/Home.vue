<script setup>
import { ref } from 'vue';

const posts = ref([
  {
    id: 1,
    title: 'Vue 3의 새로운 기능',
    description: 'Composition API와 Teleport 등을 활용한 Vue 3의 핵심 기능 알아보기',
    image: 'https://media.sproutsocial.com/uploads/2022/05/How-to-post-on-instagram-from-pc.svg',
    date: '2024-02-22',
    author: 'BMC'
  },
  {
    id: 2,
    title: 'CSS Flexbox와 Grid를 활용한 레이아웃',
    description: 'CSS만으로 강력한 반응형 웹사이트를 만드는 방법을 배워보자.',
    image: 'https://media.sproutsocial.com/uploads/2022/05/How-to-post-on-instagram-from-pc.svg',
    date: '2024-02-21',
    author: 'BMC'
  },
  {
    id: 3,
    title: '프론트엔드 개발자가 알아야 할 핵심 개념',
    description: '프론트엔드 개발자라면 꼭 알아야 할 개념과 기술을 정리해보자.',
    image: 'https://media.sproutsocial.com/uploads/2022/05/How-to-post-on-instagram-from-pc.svg',
    date: '2024-02-20',
    author: 'BMC'
  },
  {
    id: 4,
    title: '프론트엔드 개발자가 알아야 할 핵심 개념',
    description: '프론트엔드 개발자라면 꼭 알아야 할 개념과 기술을 정리해보자.',
    image: 'https://media.sproutsocial.com/uploads/2022/05/How-to-post-on-instagram-from-pc.svg',
    date: '2024-02-20',
    author: 'BMC'
  }
]);
</script>

<template>
  <div class="container">
    <h1 class="title">All Posts</h1>

    <div class="card-container">
      <RouterLink to="">
        <div v-for="post in posts" :key="post.id" class="card">
        <img :src="post.image" alt="Post Image" class="card-img">
        
        <div class="card-content">
          <h2 class="card-title">{{ post.title }}</h2>
          <p class="card-description">{{ post.description }}</p>
          <div class="card-footer">
            <span class="author">{{ post.author }}</span>
            <span class="date">{{ post.date }}</span>
          </div>
        </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* 기본 스타일 */
body {
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}

/* 전체 컨테이너 */
.container {
  max-width: 700px;
  margin: auto;
  padding: 0px 20px 0px 20px;
}

/* 제목 */
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px;
  color: #333;
}

/* 카드 flex */
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 카드 스타일 */
.card {
  background-color: #fff;
  border-radius: 10px;
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
  height: 180px;
  object-fit: cover;
}

/* 카드 내용 */
.card-content {
  padding: 0 15px 15px 15px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #222;
}

.card-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

/* 카드 하단 */
.card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
}

.author {
  font-weight: bold;
}

.date {
  font-style: italic;
}
</style>
