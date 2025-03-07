<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import PostCardMobile from './PostCardMobile.vue';
import PostCardDesktop from './PostCardDesktop.vue';

// 게시글 데이터를 저장할 반응형 변수
const posts = ref([]);
const loading = ref(true);
const error = ref(null);

// API에서 데이터 가져오기
const fetchPosts = async () => {
  try {
    const response = await axios.get('https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/posts'); 
    console.log(response.data);
    posts.value = response.data.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.summary,
      image: post.imageUrl || '/images/placeholder.webp' , // 기본 이미지 제공
      date: post.createdAt.split('T')[0], // 날짜 형식 변환 (YYYY-MM-DD)
      category: post.category,
      tagNames: post.tagNames,
      tagColors: post.tagColors,
      author: 'BMC'
    }));
  } catch (err) {
    error.value = '데이터를 불러오는 중 문제가 발생했습니다.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// 화면 크기 감지
const isWide = ref(window.innerWidth >= 900)

// 창 크기 변경 감지
const updateLayout = () => {
  isWide.value = window.innerWidth >= 900
}

onMounted(() => {
  window.addEventListener('resize', updateLayout)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
})
// 컴포넌트가 마운트될 때 데이터 불러오기
onMounted(fetchPosts);

</script>
<template>
  <div class="container">
    <div style="width: 100%; height: 200px; display: flex; justify-content: center; align-items: center;"> <div class="title">All Posts</div> </div>

    <div v-if="loading" class="loading">⏳ 게시글을 불러오는 중...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-else class="card-container">
      <div v-for="post in posts" :key="post.id" class="card">
        <RouterLink :to="`/posts/${post.id}`">
          <PostCardDesktop :post=post v-if="isWide"></PostCardDesktop>
          <PostCardMobile :post=post v-else></PostCardMobile>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 기본 스타일 */
.container {
  max-width: 1000px;
  margin: auto;
  padding: 20px 20px 0px 20px;
}

.title {
  font-size: 28px;
  font-weight: lighter;
  text-align: left;
  margin-bottom: 15px;
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
</style>
