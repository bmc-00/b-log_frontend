<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 게시글 데이터를 저장할 반응형 변수
const posts = ref([]);
const loading = ref(true);
const error = ref(null);

// API에서 데이터 가져오기
const fetchPosts = async () => {
  try {
    const response = await axios.get('http://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/posts'); // API URL 수정
    console.log(response.data);
    posts.value = response.data.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.content.substring(0, 100) + '...', // 설명을 100자까지만 표시
      image: '/images/placeholder.webp' || 'https://via.placeholder.com/600/92c952', // 기본 이미지 제공
      date: post.createdAt.split('T')[0], // 날짜 형식 변환 (YYYY-MM-DD)
      category: post.category,
      author: 'BMC'
    }));
  } catch (err) {
    error.value = '데이터를 불러오는 중 문제가 발생했습니다.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// 컴포넌트가 마운트될 때 데이터 불러오기
onMounted(fetchPosts);
</script>
📚
<template>
  <div class="container">
    <h1 class="title">All Posts</h1>

    <div v-if="loading" class="loading">⏳ 게시글을 불러오는 중...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-else class="card-container">
      <div v-for="post in posts" :key="post.id" class="card">
        <RouterLink :to="`/posts/${post.id}`">
          <img :src="post.image" alt="Post Image" class="card-img">
          <div class="card-content">
            <h2 class="card-title">{{ post.title }}</h2>
            <p class="card-description">{{ post.description }}</p>
            <div class="card-footer">
              <span class="category">📚 {{ post.category }}</span>
              <span class="author">{{ post.author }}</span>
              <span class="date">📅 {{ post.date }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 기본 스타일 */
.container {
  max-width: 700px;
  margin: auto;
  padding: 0px 20px 0px 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px;
  color: #333;
}

/* 로딩 및 에러 스타일 */
.loading {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.error {
  color: red;
  font-weight: bold;
  text-align: center;
}

/* 카드 컨테이너 */
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
  padding: 0px 15px 15px 15px;
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
  flex-direction: column;
  font-size: 12px;
  color: #888;
  gap: 5px;
}

.category {
  font-size: 12px;
  color: #555;
  font-weight: bold;
}
.author {
  font-weight: bold;
}

.date {
  font-style: italic;
}
</style>
