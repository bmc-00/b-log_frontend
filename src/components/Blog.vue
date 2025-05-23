<template>
  <div class="layout">
    <!-- 모바일용 햄버거 메뉴 -->
    <div class="mobile-header" v-if="!isWide">
      <div style="display:flex; gap: 10px; width: 100%; margin-left: 10px;">
        <div class="menu-btn" @click="toggleMobileMenu">
            <span class="material-symbols-outlined">menu</span>
        </div>
        <div class="blog-title">B-log</div>
      </div>
    </div>

    <!-- 모바일 사이드바 (팝업) -->
    <Transition name="slide">
      <div v-if="!isWide && mobileMenuOpen" class="mobile-sidebar-overlay" @click.self="toggleMobileMenu">
        <aside class="sidebar mobile-sidebar">
          <button class="close-btn" @click="toggleMobileMenu">✕</button>
          <ProfileSidebar @close-sidebar="toggleMobileMenu" />
        </aside>
      </div>
    </Transition>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
      <!-- 왼쪽 사이드바 (넓거나 중간일 때 보임) -->
      <aside class="sidebar left-sidebar" v-if="isWide">
        <ProfileSidebar />
      </aside>

      <!-- 메인 컨텐츠 -->
      <main class="content">
        <RouterView :key="$route.fullPath" />
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import ProfileSidebar from './ProfileSidebar.vue'

// 화면 크기 감지
const isWide = ref(window.innerWidth >= 900)
const mobileMenuOpen = ref(false)

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

// 모바일 메뉴 토글
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style scoped>
/* 기본 레이아웃 */
.layout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

/* 모바일 헤더 */
.mobile-header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255,255,255,0.85);
  color: #1E2A38;
  padding: 10px 0 10px 0;
  z-index: 10;
  width: 100%;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 25px;
  color: #1E2A38;
  cursor: pointer;
  padding-left: 5px;
}

.blog-title {
  margin: 0;
  font-size: 1.2rem;
}

/* 메인 컨테이너 */
.main-container {
  display: flex;
  margin: 0 auto;
  height: 100%;
  width: 100%;
}

/* 사이드바 기본 스타일 */
.sidebar {
  background-color: rgb(245, 245, 255);
  width: 300px;
  min-width: 300px;
  overflow: auto;
}

/* 왼쪽 사이드바 */
.left-sidebar {
  grid-column: 1;
}

/* 오른쪽 사이드바 (넓을 때만 보임) */
.right-sidebar {
  grid-column: 3;
  background-color: rgb(255,255,255);
}

/* 메인 컨텐츠 */
.content {
  grid-column: 2;
  background-color: #fff;
  flex-grow: 1;
  overflow: auto;
}

/* 포스트 스타일 */
.post {
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

/* 모바일 사이드바 (오버레이) */
.mobile-sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1000;
}

.mobile-sidebar {
  width: 250px;
  height: 100%;
  background: rgb(245, 245, 255);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.close-btn {
  align-self: flex-end;
  padding-top: 20px;
  border: none;
  background: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #1E2A38;
}

/* 모바일 메뉴 애니메이션 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
