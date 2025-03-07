<template>
  <Teleport to="body">
    <div v-if="isImageModalOpen" class="modal-overlay" @click="toggleImageModal">
      <div class="modal-content" @click.stop><AddPostImageModal @imageSelected="handleImageSelected"></AddPostImageModal></div>
    </div>
    <div v-if="isUploadModalOpen" class="modal-overlay" @click="toggleUploadModal">
      <div class="modal-content" style="width:400px; height: 600px;" @click.stop><AddPostUploadModal :contentMarkdown=markdownText @uploadComplete="handleUploadCompleted" @closeModal="toggleUploadModal"></AddPostUploadModal></div>
    </div>
  </Teleport>
  <div class="container">
    <div class="header">
      <div class="title">Post Uploader</div>
      <div class="editor-icons">
        <div class="editor-icons-items" @click="insertText('****',2)"><span class="material-symbols-outlined">format_bold</span></div>
        <div class="editor-icons-items" @click="insertText('**',1)"><span class="material-symbols-outlined">format_italic</span></div>
        <div class="editor-icons-items" @click="insertText('---\n',0)"><span class="material-symbols-outlined">horizontal_rule</span></div>
        <div class="editor-icons-items" @click="insertText('<ins></ins>',6)"><span class="material-symbols-outlined">format_underlined</span></div>
        <div class="editor-icons-items" @click="insertText('~~~~',2)"><span class="material-symbols-outlined">strikethrough_s</span></div>
        <div class="editor-icons-items" @click="insertText('# ',0)"><span class="material-symbols-outlined">format_h1</span></div>
        <div class="editor-icons-items" @click="insertText('## ',0)"><span class="material-symbols-outlined">format_h2</span></div>
        <div class="editor-icons-items" @click="insertText('### ',0)"><span class="material-symbols-outlined">format_h3</span></div>
        <div class="editor-icons-items" @click="toggleImageModal"><span class="material-symbols-outlined">gallery_thumbnail</span></div>
        <div class="editor-icons-items" @click="toggleUploadModal" style="flex-grow: 1; text-align: end;"><span class="material-symbols-outlined">publish</span></div>
      </div>
      <div class="editor-header">
        <div class="editor-header-item">Markdown</div>
        <div class="editor-header-item">Preview</div>
      </div>
    </div>
    <div class="body">
      <div ref="editorContainer" class="editor-container">
        <!-- ✅ 줄번호 -->
        <div ref="numberRef" class="line-numbers">
          <div v-for="n in lineCount" :key="n" class="line-number">{{ n }}</div>
        </div>

        <!-- ✅ Markdown 입력창 -->
        <textarea ref="editorRef" class="editor" v-model="markdownText" placeholder="Markdown을 입력하세요..."
          @scroll="syncScroll('editor')" @input="updateEditor"></textarea>
      </div>
      <div class="preview-container">

        <!-- ✅ Markdown 미리보기 -->
        <div class="preview" ref="previewRef" v-html="renderedMarkdown" @scroll="syncScroll('preview')"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from "vue";
import { marked } from "marked";
import AddPostImageModal from "./AddPostImageModal.vue"
import AddPostUploadModal from "./AddPostUploadModal.vue"

// 상태 변수
const markdownText = ref(""); // 입력된 Markdown 내용
const lineCount = ref(1); // 줄번호 개수
const editorRef = ref(null); // textarea 요소 참조
const previewRef = ref(null);
const numberRef = ref(null); // 줄번호 영역 참조
const isUploadModalOpen = ref(false);
const isImageModalOpen = ref(false);

const toggleImageModal = () => {
  isImageModalOpen.value = !isImageModalOpen.value;
}

const toggleUploadModal = () => {
  isUploadModalOpen.value = !isUploadModalOpen.value;
}

const renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
  return `<img src="${href.href}" alt="${text}" style="max-width:100%; height:auto; margin: 10px 0;">`;
};
// ✅ Markdown 렌더링
const renderedMarkdown = computed(() => {
  const html = marked(markdownText.value || "", { renderer });
  nextTick(() => highlightCode()); // 
  return html;
});

const fixImageUrl = (url) => {
  return url.replace(/ /g, "%20");
};

const updateEditor = () => {
  lineCount.value = markdownText.value.split("\n").length;
}

const handleImageSelected = (imageUrl) => {
  toggleImageModal();
  insertText('![]('+fixImageUrl(imageUrl)+')\n',0);
};

const handleUploadCompleted = () => {
  toggleUploadModal();
}

const insertText = (value, moveCursor) => {
  const textarea = editorRef.value;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  // 현재 커서 위치에 값 삽입
  markdownText.value = markdownText.value.substring(0, start) + value + markdownText.value.substring(end);

  // 커서 위치 업데이트
  setTimeout(() => {
    textarea.selectionStart = textarea.selectionEnd = start + value.length - moveCursor;
    textarea.focus();
  }, 0);

  updateEditor();
};

// 스크롤 동기화 함수
const syncScroll = (source) => {
  if (!editorRef.value || !previewRef.value) return;

  let editor = editorRef.value;
  let preview = previewRef.value;
  let number = numberRef.value;

  if (source === "editor") {
    number.scrollTop = editor.scrollTop;
    // 입력창을 기준으로 스크롤 비율 계산
    let scrollRatio = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
    preview.scrollTop = scrollRatio * (preview.scrollHeight - preview.clientHeight);
  } else {
    // 미리보기를 기준으로 스크롤 비율 계산
    let scrollRatio = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
    editor.scrollTop = scrollRatio * (editor.scrollHeight - editor.clientHeight);
  }
};

// ✅ 코드 블록 하이라이팅 적용
const highlightCode = () => {
  nextTick(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  });
};
// ✅ 초기 마운트 시 높이 조절
onMounted(() => {
});
</script>

<style scoped>
.title{
  width: 100%;
  height: 40px;
  font-size: 27px;
  padding-top: 10px;
}
.editor-icons-items {
  width: 20px;
  height: 20px;
  padding: 5px;
  cursor: pointer;
}

.editor-icons {
  width: 100%;
  height: 35px;
  display: flex;
  background-color: rgb(235, 235, 235);
}

.editor-header-item {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px 0 15px;
  background-color: rgb(245, 245, 245);
  color: #666;
  font-size: 17px;
}

.editor-header {
  width: 100%;
  height: 50px;
  display: flex;
}

.header {

  width: 95%;
  margin-left: auto;
  margin-right: auto;
}

.body {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  flex-grow: 1;
  padding-bottom: 20px;
}

/* ✅ 전체 컨테이너 */
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-content: center;
}

/* ✅ Markdown 입력창 및 줄번호 컨테이너 */
.editor-container {
  display: flex;
  width: 50%;
  height: 100%;
  overflow: hidden;
  background: #333;
}

/* ✅ 줄번호 영역 */
.line-numbers {
  width: 40px;
  text-align: right;
  padding: 15px 10px;
  background: #222;
  font-family: "Courier New", monospace;
  color: #f1f1f1;
  user-select: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 16px;
}

/* ✅ Markdown 입력 창 (빈 공간 문제 해결) */
.editor {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: none;
  outline: none;
  resize: none;
  background: #333;
  color: #f1f1f1;
  font-family: "Courier New", monospace;
  line-height: normal;
  /* ✅ 기본 line-height 사용 */
  overflow: auto;
  white-space: nowrap;
  box-sizing: border-box;
}

/* ✅ Markdown 미리보기 */
.preview {
  width: 97%;
  height: 100%;
  overflow-y: auto;
  background: #fff;
  line-height: 1.6;
  padding: 0 15px 0 15px;
}

.preview-container {
  width: 50%;
  height: 100%;
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