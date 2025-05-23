<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PostCardMobile from './PostCardMobile.vue'
import PostCardDesktop from './PostCardDesktop.vue'

const route = useRoute()
const keyword = ref(route.query.keyword || '')

const posts = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(0)
const paginationSize = ref(10)
const maxPaginationSize = ref(null)
const isFirstPage = ref(false)
const isLastPage = ref(false)
const isWide = ref(window.innerWidth >= 900)
const title = ref(`Search | ${keyword.value}`)

const updateLayout = () => {
  isWide.value = window.innerWidth >= 900
}

onMounted(() => {
  window.addEventListener('resize', updateLayout)
  fetchPosts()
})
onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
})

watch(() => route.query.keyword, (newKeyword) => {
  keyword.value = newKeyword
  title.value = `Search | ${keyword.value}`
  currentPage.value = 0
  maxPaginationSize.value = null
  fetchPosts()
})

const fetchPosts = async () => {
  loading.value = true
  try {
    //ES를 통해 키워드에 해당하는 Post의 ID 얻기
    const res = await axios.get(`https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/search?keyword=${keyword.value}&page=${currentPage.value}&size=${paginationSize.value}`)

    if (!res.totalPages) {
      maxPaginationSize.value = res.data.totalPages
    }

    //ID기반으로 Post 상세 내용 얻기
    const postRes = await Promise.all(
      res.data.content.map(id => axios.get(`https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/posts/summary/${id}`))
    )
    posts.value = postRes.map(r => ({
      id: r.data.id,
      title: r.data.title,
      description: r.data.summary,
      image: r.data.imageUrl || '/images/placeholder.webp',
      date: r.data.createdAt.split('T')[0],
      category: r.data.category,
      tagNames: r.data.tagNames || '태그 없음',
      tagColors: r.data.tagColors || '#cecece',
      author: r.data.author || 'BMC'
    }))
  } catch (err) {
    error.value = '검색 결과를 불러오는 중 문제가 발생했습니다.'
    console.error(err)
  } finally {
    loading.value = false
  }

  isFirstPage.value = currentPage.value === 0
  isLastPage.value = currentPage.value >= maxPaginationSize.value - 1

  window.scrollTo(0, 0)
}

const paging = async (pg) => {
  if (pg - 1 < 0 || pg - 1 >= maxPaginationSize.value) return
  currentPage.value = pg - 1
  await fetchPosts()
}
</script>

<template>
  <div class="container">
    <div style="width: 100%; height: 200px; display: flex; justify-content: center; align-items: center;">
      <div class="title">{{ title }}</div>
    </div>

    <div v-if="loading" class="loading">🔍 검색 중입니다...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && posts.length === 0" class="loading">검색 결과가 없습니다.</div>

    <div v-else class="card-container">
      <div v-for="post in posts" :key="post.id" class="card">
        <RouterLink :to="`/posts/${post.id}`">
          <PostCardDesktop :post="post" v-if="isWide" />
          <PostCardMobile :post="post" v-else />
        </RouterLink>
      </div>
    </div>

    <div class="pagination">
      <div class="pgbutton" @click="paging(currentPage)">
        < </div>
          <div v-for="num in 5" :key="num" @click="paging(num + currentPage - currentPage % 5)" :class="{
            pgactive: num + currentPage - currentPage % 5 === currentPage + 1,
            pgdefault:
              num + currentPage - currentPage % 5 !== currentPage + 1 &&
              num + currentPage - currentPage % 5 <= maxPaginationSize,
            pgdisable: num + currentPage - currentPage % 5 > maxPaginationSize
          }">
            <div>
              {{
                num + currentPage - currentPage % 5 <= maxPaginationSize ? num + currentPage - currentPage % 5 : '•' }}
                </div>
            </div>
            <div class="pgbutton" @click="paging(currentPage + 2)"> > </div>
          </div>
      </div>
</template>

<style scoped>
.pgbutton {
  width: 23px;
  height: 23px;
  font-size: 19px;
  color: rgb(190, 190, 255);
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
  border: 0.5px solid rgb(190, 190, 255);
  background-color: rgb(190, 190, 255);
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
