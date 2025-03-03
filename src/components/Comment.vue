<template>
    <div class="comment-section">
      <h2>댓글 ({{ comments.length }})</h2>
  
      <!-- 댓글 목록 -->
      <div v-if="comments.length > 0" class="comment-list">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <div class="profile">
            {{ comment.profileEmoji }}
          </div>
          <div class="comment-content">
            <div class="author">{{ comment.author }}</div>
            <div class="content">{{ comment.content }}</div>
            <div class="date">{{ formatDate(comment.createdAt) }}</div>
          </div>
          <!-- 삭제 버튼 -->
          <button class="delete-button" @click="showDeletePrompt(comment.id)">
            <span class="material-symbols-outlined light">delete</span>
          </button>
        </div>
      </div>
      <p v-else class="no-comments">댓글이 없습니다.</p>
      
      <!-- ✅ 이모지 픽커 (댓글 위에 오버레이) -->
    <div v-if="showEmojiPicker" class="emoji-picker-overlay" @click.self="toggleEmojiPicker">
      <emoji-picker class="emoji-picker-box" @emoji-click="selectEmoji"></emoji-picker>
    </div>

      <!-- 댓글 작성 폼 -->
      <div class="comment-form">
        <!-- ✅ 이모지 선택 버튼 -->
        <div style="display: flex; width: 100%;">
            <div class="profile" style="border: 0.5px solid grey; cursor:pointer;" @click="toggleEmojiPicker">
            {{ newComment.profileEmoji || "😀" }}
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <input class="input-idpw" v-model="newComment.author" type="text" placeholder="작성자" required maxlength="15" />
                <input class="input-idpw" v-model="newComment.password" type="password" placeholder="비밀번호" required maxlength="20"/>
            </div>
        </div>

        <div style="display: flex; width: 100%;">
            <textarea class="input-content" v-model="newComment.content" placeholder="댓글을 입력하세요..." maxlength="500" required></textarea>
        </div>
        <div style="width: 100%; display: flex; align-items: flex-end; justify-content: end;">
            <div class="submit-button" @click="submitComment" :disabled="loading">
                Submit
            </div>
        </div>
      </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted, defineProps } from "vue";
  import axios from "axios";
  import "emoji-picker-element"; // emoji-picker-element 사용
  
  // ✅ Post.vue에서 전달받은 postId
  const props = defineProps({
    postId: Number,
  });
  
  // ✅ 상태 변수
  const comments = ref([]);
  const newComment = ref({ author: "", password: "", content: "", profileEmoji: "😀" }); // 기본 이모지 설정
  const loading = ref(false);
  const showEmojiPicker = ref(false);
  
  // ✅ API에서 댓글 불러오기
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/comments?postId=${props.postId}`);
      comments.value = response.data;
    } catch (err) {
      console.error("댓글을 불러오는 중 오류 발생:", err);
    }
  };
  
  // ✅ 이모지 선택
  const selectEmoji = (event) => {
    newComment.value.profileEmoji = event.detail.unicode;
    showEmojiPicker.value = false;
  };

  const toggleEmojiPicker = () => {
    showEmojiPicker.value = !showEmojiPicker.value;
  };
  
  // ✅ 댓글 작성
  const submitComment = async () => {
    if (!newComment.value.author || !newComment.value.password || !newComment.value.content) {
      alert("모든 필드를 입력해야 합니다.");
      return;
    }
  
    loading.value = true;
    try {
      await axios.post("https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/comments", {
        postId: props.postId,
        author: newComment.value.author,
        passwordHash: newComment.value.password,
        content: newComment.value.content,
        profileEmoji: newComment.value.profileEmoji,
      });
  
      newComment.value = { author: "", password: "", content: "", profileEmoji: "😀" }; // 입력 필드 초기화
      fetchComments(); // 댓글 다시 불러오기
    } catch (err) {
      console.error("댓글 등록 중 오류 발생:", err);
    } finally {
      loading.value = false;
    }
  };
  
  // ✅ 댓글 삭제 (비밀번호 확인 후 삭제)
  const deleteComment = async (commentId, password) => {
    try {
      await axios.delete(`https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/comments/${commentId}?passwordHash=${password}`);
      alert("댓글이 삭제되었습니다.");
      fetchComments(); // 댓글 다시 불러오기
    } catch (err) {
      alert("비밀번호가 틀렸거나 삭제 중 오류가 발생했습니다.");
      console.error("댓글 삭제 중 오류 발생:", err);
    }
  };
  
  // ✅ 삭제 확인 프롬프트
  const showDeletePrompt = (commentId) => {
    const password = prompt("비밀번호를 입력하세요:");
    if (password) {
      deleteComment(commentId, password);
    }
  };
  
  // ✅ 날짜 포맷 변환
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // ✅ 컴포넌트가 마운트될 때 댓글 불러오기
  onMounted(fetchComments);
  </script>
  
  <style scoped>
.material-symbols-outlined {
    font-size: 17px;
    color: rgb(100,100,255);
}

  /* ✅ 전체 댓글 섹션 */
  .comment-section {
    margin: auto;
    background: #ffffff;
    transition: all 0.3s ease-in-out;
  }
  
  /* ✅ 제목 스타일 */
  h2 {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    border-bottom: 2px solid #eee;
    padding-bottom: 8px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  
  /* ✅ 댓글 리스트 */
  .comment-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  /* ✅ 각 댓글 */
  .comment {
    display: flex;
    align-items: center;
    background: rgb(249, 249, 255);
    padding: 15px;
    border-radius: 8px;
    position: relative;
    transition: transform 0.2s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .comment:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
  
  /* ✅ 댓글 내용 */
  .comment-content {
    flex-grow: 1;
    margin-right: 30px;
  }
  
  /* ✅ 작성자 스타일 */
  .author {
    font-weight: bold;
    color: #333;
    margin-bottom: 0px;
    font-size: 16px;
  }
  
  /* ✅ 댓글 내용 */
  .content {
    font-size: 14px;
    color: #444;
    margin-bottom: 10px;
    margin-top: 5px;
    word-break: break-word;
  }
  
  /* ✅ 날짜 스타일 */
  .date {
    font-size: 12px;
    color: #888;
    display: block;
  }
  
  /* ✅ 댓글 입력 폼 */
  .comment-form {
    margin-top: 20px;
    padding: 20px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: relative;
    flex-direction: column;
    gap: 15px;
    transition: all 0.3s ease-in-out;
  }
  
  
  .selected-emoji {
    font-size: 32px;
  }
  
  /* ✅ 삭제 버튼 */
  .delete-button {
    position: absolute;
    right: 10px;
    top: 13px;
    background: transparent;
    font-size: 15px;
    padding: 6px 10px;
    border: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .profile {
    display: flex;
    height: 70px;
    min-height: 70px;
    width: 70px;
    min-width: 70px;
    font-size: 35px;
    background-color: white;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin-right: 20px;
  }

  .emoji-picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3); /* 어두운 배경 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
}

.emoji-picker-box {
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  animation: fadeInScale 0.2s ease-in-out;
}

/* ✅ 이모지 픽커 애니메이션 */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}

.input-idpw {
    margin: 5px;
    padding: 2px;
    border: none; /* 기본 테두리 제거 */
    border-radius: 0px;
    border-bottom: 0.5px solid grey; /* 아래쪽 테두리만 표시 */
}

/* 포커스 시 스타일 */
.input-idpw:focus{
  outline: none; /* 기본 테두리 제거 */
  border-bottom: 0.5px solid rgb(156, 26, 171) /* 포커스 시 색 변경 */
}

.input-content{
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 3px;
    height: 100px;
    width: 100%;
    border: 0.5px solid grey; /* 아래쪽 테두리만 표시 */
    resize: none;
}

.input-content:focus{
    outline:none;
    border: 0.5px solid rgb(156, 26, 171);
}

.submit-button{
    border: none;
    background-color: transparent;
    font-size: 13px;
    padding: 5px 15px 5px 15px;
    background-color: rgb(220,220,255);
    border-radius: 10px;
    cursor: pointer;
}

.submit-button:hover{
    background-color: rgb(150,150,255);
}
</style>
  