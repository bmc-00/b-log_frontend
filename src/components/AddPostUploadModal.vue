<template>
  <div class="upload-modal-body">
      <h2>Upload</h2>

      <!-- 대표 이미지 선택 -->
      <div class="upload-image-picker" @click="openImageModal">
        <img v-if="selectedImage" :src="selectedImage" alt="대표 이미지" class="preview-image" />
        <span v-else>Select Image</span>
      </div>

      <!-- 제목 입력 -->
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="title" type="text" required />
      </div>

      <!-- 카테고리 입력 -->
      <div class="form-group">
        <label for="category">Category</label>
        <input id="category" v-model="category" type="text" required />
      </div>

      <!-- 태그 입력 -->
      <div class="form-group">
        <label for="tags">Tags</label>
        <input id="tags" v-model="tags" type="text" required />
      </div>

      <!-- 설명 입력 -->
      <div class="form-group">
        <label for="description">Summary</label>
        <input id="description" v-model="description" required/>
      </div>

      <!-- 버튼 영역 -->
      <div class="button-group">
        <button @click="submitPost" :disabled="!isValid">Upload</button>
        <button @click="closeModal" class="cancel">Cancel</button>
      </div>
  </div>
  <Teleport to="body">
    <div v-if="isImageModalOpen" class="modal-overlay" @click="closeImageModal">
      <div class="modal-content" @click.stop><AddPostImageModal @imageSelected="handleImageSelected"></AddPostImageModal></div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import AddPostImageModal from "./AddPostImageModal.vue";
import axios from "axios";

const emit = defineEmits(["uploadComplete", "close"]);

const props = defineProps({
  contentMarkdown: String,
});

// 상태 변수
const title = ref("");
const category = ref("");
const tags = ref("");
const description = ref("");
const selectedImage = ref(null);
const isImageModalOpen = ref(false);

// 유효성 검사
const isValid = computed(() => {
  return title.value && category.value && tags.value && description.value;
});

// 이미지 모달 열기/닫기
const openImageModal = () => (isImageModalOpen.value = true);
const closeImageModal = () => (isImageModalOpen.value = false);

// 이미지 선택 핸들러
const handleImageSelected = (imageUrl) => {
  selectedImage.value = imageUrl;
  closeImageModal();
};
const closeModal = () => {
  emit("closeModal");
}

const getFormattedTimestamp = () => {
  const now = new Date();
  const pad = (num, size) => String(num).padStart(size, '0');

  return `${now.getFullYear()}-${pad(now.getMonth() + 1, 2)}-${pad(now.getDate(), 2)}T` +
         `${pad(now.getHours(), 2)}:${pad(now.getMinutes(), 2)}:${pad(now.getSeconds(), 2)}.` +
         `${pad(now.getMilliseconds(), 3)}${Math.floor(Math.random() * 1000)}`;  // 추가 자리 채움
};

// 게시글 업로드 처리
const submitPost = async () => {
  const postData = {
    title: title.value,
    category: category.value,
    summary: description.value,
    content: props.contentMarkdown,
    authorId: 1,
    imageUrl: selectedImage.value,
    views: 0,
    createdAt: getFormattedTimestamp(),
    updatedAt: getFormattedTimestamp()
  };

  try{
    await axios.post(`https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/posts/upload?tags=`+tags.value, postData);
  }catch(e){
    console.error("블로그 포스팅중 오류 발생",e);
  }
  emit("uploadComplete");
};
</script>

<style scoped>
.upload-modal-body{
  margin:15px;
}

/* ✅ 제목 */
h2 {
  font-size: 22px;
  margin-bottom: 15px;
}

/* ✅ 입력 필드 스타일 */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

/* ✅ 대표 이미지 선택 */
.upload-image-picker {
  width: 99%;
  height: 150px;
  background: #f3f3f3;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  margin-bottom: 15px;
}

.upload-image-picker:hover {
  border-color: #666;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* ✅ 버튼 그룹 */
.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

button.cancel {
  background: #dc3545;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 모달 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 모달 본문 */
.modal-content {
  background: white;
  border-radius: 10px;
  width: 700px;
  height: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
}

/* 애니메이션 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
