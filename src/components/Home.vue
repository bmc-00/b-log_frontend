<script setup>
import { ref, onMounted, onUnmounted, defineProps, withDefaults } from 'vue';
import axios from 'axios';
import PostCardMobile from './PostCardMobile.vue';
import PostCardDesktop from './PostCardDesktop.vue';

// 게시글 데이터를 저장할 반응형 변수
const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(0);
const paginationSize = ref(10);
const maxPaginationSize = ref(null);
const isFirstPage = ref(false);
const isLastPage = ref(false);

// API에서 데이터 가져오기
const fetchPosts = async () => {
  try {
    var response = "";
    if(props.category)
      response = await axios.get(`https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/posts/bycategory?page=${currentPage.value}&size=${paginationSize.value}&category=${props.category}`);
    else if(props.tag)
      response = await axios.get(`https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/posts/bytag?page=${currentPage.value}&size=${paginationSize.value}&tag=${props.tag}`);
    else
      response = await axios.get(`https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/posts?page=${currentPage.value}&size=${paginationSize.value}`);
    
    if(!maxPaginationSize.value){ //처음 값 초기화
      maxPaginationSize.value = response.data.totalPages;
    }
    posts.value = response.data.content.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.summary,
      image: post.imageUrl || '/images/placeholder.webp' , // 기본 이미지 제공
      date: post.createdAt.split('T')[0], // 날짜 형식 변환 (YYYY-MM-DD)
      category: post.category,
      tagNames: post.tagNames || '태그 없음',
      tagColors: post.tagColors || '#cecece',
      author: 'BMC'
    }));
  } catch (err) {
    error.value = '데이터를 불러오는 중 문제가 발생했습니다.';
    console.error(err);
  } finally {
    loading.value = false;
  }
  if(currentPage.value === 0) isFirstPage.value = true;
  else isFirstPage.value = false;
  if(currentPage.value >= maxPaginationSize.value - 1) isLastPage.value = true;
  else isLastPage.value = false;

  window.scrollTo(0,0);
};

// 화면 크기 감지
const isWide = ref(window.innerWidth >= 900)
const title = ref("")

// 창 크기 변경 감지
const updateLayout = () => {
  isWide.value = window.innerWidth >= 900
}

onMounted(() => {
  window.addEventListener('resize', updateLayout);
  init();
})
onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
})
// 컴포넌트가 마운트될 때 데이터 불러오기
onMounted(fetchPosts);

const init = () => {
  if(props.category) title.value = "Category | "+props.category;
  else if(props.tag) title.value = "Tag | "+props.tag;
  else title.value = "All Posts";
}

const paging = async (pg) => {
  if(pg-1 < 0 || pg-1 >= maxPaginationSize.value) return;
  currentPage.value = pg-1;
  await fetchPosts();
}

const props = defineProps({
  category: String,
  tag: String
});

</script>
<template>
  <div class="container">
    <div style="width: 100%; height: 200px; display: flex; justify-content: center; align-items: center;"> <div class="title">{{ title }}</div> </div>

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
    <div class="pagination">
      <div class="pgbutton" @click="paging(currentPage)"> < </div>
      <div @click="paging(num + currentPage - currentPage%5)" :class="{ pgactive: num + currentPage - currentPage%5 === currentPage+1, pgdefault: (num + currentPage - currentPage%5 !== currentPage+1)&&(num + currentPage - currentPage%5 <= maxPaginationSize), pgdisable: num + currentPage - currentPage%5 > maxPaginationSize}" v-for="num in 5" :key =num><div>{{ num+currentPage-currentPage%5 <= maxPaginationSize ? num + currentPage - currentPage%5 : '•'}}</div></div>
      <div class="pgbutton" @click="paging(currentPage+2)"> > </div>
    </div>
  </div>
</template>

<style scoped>
.pgbutton {
  width: 23px;
  height: 23px;
  font-size: 19px;
  color: rgb(190,190,255);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; 
}

.pgdisable {
  width: 23px;
  height: 23px;
  border: 0.5px solid white;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  cursor: not-allowed; 
}

.pgactive {
  width: 23px;
  height: 23px;
  border: 0.5px solid rgb(190,190,255);
  background-color: rgb(190,190,255);
  color: white;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  cursor: none; 
}

.pgdefault {
  width: 23px;
  height: 23px;
  border: 0.5px solid white;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  cursor: pointer;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 60px;
}
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
