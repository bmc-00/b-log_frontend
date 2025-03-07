<template>
  <div class="image-picker">
    <div style="font-size: 27px;">Image Picker</div>

    <!-- 이미지 업로드 -->
    <div class="upload-container">
      <input type="file" @change="uploadImage" accept="image/*" />
      <button @click="triggerFileInput">Upload Image</button>
    </div>

    <!-- 이미지 목록 -->
    <div v-if="images.length > 0" class="image-list">
      <img
        v-for="image in images"
        :key="image"
        :src="image"
        class="image-item"
        @click="selectImage(image)"
      />
    </div>
    <p v-else>이미지가 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";

const emit = defineEmits(["imageSelected"]); // 부모 컴포넌트에 데이터 전달

const images = ref([]);
const storageAccount = "bmc00storage"; // Azure Storage 계정 이름
const containerName = "blog"; // 컨테이너 이름
const sasToken =
  "sp=racwdli&st=2025-03-06T12:53:16Z&se=2099-03-06T20:53:16Z&spr=https&sv=2022-11-02&sr=c&sig=nivJERzSsl4gZhxE%2FlvUsWUQwT0mJ3eH8DXiJG9SpLI%3D";

// ✅ 이미지 목록 불러오기
const fetchImages = async () => {
  try {
    const response = await fetch(
      `https://${storageAccount}.blob.core.windows.net/${containerName}?restype=container&comp=list&${sasToken}`
    );
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");

    const blobs = xmlDoc.getElementsByTagName("Name");
    images.value = Array.from(blobs).map(
      (blob) =>
        `https://${storageAccount}.blob.core.windows.net/${containerName}/${blob.textContent}?${sasToken}`
    );
  } catch (error) {
    console.error("이미지를 불러오는 중 오류 발생:", error);
  }
};

// ✅ 이미지 선택 시 부모 컴포넌트로 URL 전달
const selectImage = (imageUrl) => {
  emit("imageSelected", imageUrl, sasToken.value);
};

// ✅ 이미지 업로드 기능
const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const fileName = encodeURIComponent(file.name);
  const uploadUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${fileName}?${sasToken}`;

  try {
    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type,
      },
      body: file,
    });

    alert("이미지 업로드 성공!");
    fetchImages(); // 업로드 후 리스트 갱신
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    alert("업로드 실패!");
  }
};

// ✅ 파일 선택 창 열기
const triggerFileInput = () => {
  document.querySelector("input[type='file']").click();
};

onMounted(fetchImages);
</script>

<style scoped>
/* 이미지 선택기 스타일 */
.image-picker {
  width: 100%;
  height: 100%;
  padding: 20px;
}

/* 이미지 리스트 */
.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  height: 350px;
  overflow-y: auto;
}

/* 개별 이미지 */
.image-item {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.image-item:hover {
  transform: scale(1.1);
}

/* 업로드 버튼 */
.upload-container {
  margin-top: 15px;
}

.upload-container input {
  display: none;
}

.upload-container button {
  background: rgb(210,210,255);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 10px;
}

.upload-container button:hover {
  background: rgb(150,150,255);
}
</style>
