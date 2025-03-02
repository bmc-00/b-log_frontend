<template>
    <div class="container">
      <h1 class="post-title">{{ post.title }}</h1>
      <p class="post-meta">
        <span class="category">{{ post.category }}</span> |
        <span class="date">{{ formattedDate }}</span>
      </p>
  
      <div v-html="renderedMarkdown" class="post-content"></div>

    <Comment :postId="id" />
    </div>
  </template>
  
  <script setup>
import { ref, computed, onMounted, defineProps, nextTick } from "vue";
import axios from "axios";
import { marked } from "marked";
import Comment from './Comment.vue'

  // ✅ props로 id 받기
  const props = defineProps({
    id: Number
  });
  
  const post = ref({});
  const loading = ref(true);
  const error = ref(null);
  
// ✅ Markdown 렌더러 설정 (이미지 크기 조정)
const renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
  return `<img src="${href.href}" alt="${text}" style="max-width:100%; height:auto; border-radius:10px; margin: 10px 0;">`;
};

  // ✅ API에서 데이터 불러오기
  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/posts/${props.id}`);
      post.value = response.data;
    } catch (err) {
      error.value = "데이터를 불러오는 중 문제가 발생했습니다.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  
  // ✅ Markdown 변환 + 코드 하이라이팅 실행
const renderedMarkdown = computed(() => {
  const html = marked(post.value.content || "", { renderer });
  nextTick(() => highlightCode()); // ✅ 렌더링 후 코드 하이라이팅 적용
  return html;
});

// ✅ 코드 블록 하이라이팅 적용
const highlightCode = () => {
  nextTick(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  });
};
  
  // ✅ 날짜 포맷 변환
  const formattedDate = computed(() => {
    if (!post.value.createdAt) return "";
    return new Date(post.value.createdAt).toISOString().split("T")[0];
  });
  
  onMounted(fetchPost);
  </script>
  
  <style scoped>
  /* 기본 스타일 */
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    font-family: "42dot Sans", sans-serif;
  }
  
  /* 제목 스타일 */
  .post-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .post-meta {
    font-size: 14px;
    color: #888;
  }
  
  /* 카테고리 스타일 */
  .category {
    font-weight: bold;
    color: #d9534f;
  }
  
  /* 본문 스타일 */
  .post-content {
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    background-color: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 10px;
  }
  
  /* 이미지 스타일 */
  .post-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  /* Markdown 내부 스타일링 */
  .post-content h2 {
    font-size: 22px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 5px;
  }
  
  .post-content pre {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
  }
  
  .post-content blockquote {
    border-left: 5px solid #d9534f;
    padding-left: 10px;
    color: #666;
    font-style: italic;
  }
  
  /* 반응형 스타일 */
  @media (max-width: 768px) {
    .container {
      padding: 15px;
    }
    .post-title {
      font-size: 24px;
    }
    .post-content {
      font-size: 14px;
    }
  }
  </style>
  