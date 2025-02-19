<template>
  <div class="layout">
    <!-- 모바일용 햄버거 메뉴 -->
    <header class="mobile-header" v-if="isMobile">
      <button class="menu-btn" @click="toggleMobileMenu">
        ☰
      </button>
      <h1 class="blog-title">B-log</h1>
    </header>

    <!-- 모바일 사이드바 (팝업) -->
    <Transition name="slide">
      <div v-if="isMobile && mobileMenuOpen" class="mobile-sidebar-overlay" @click.self="toggleMobileMenu">
        <aside class="sidebar mobile-sidebar">
          <button class="close-btn" @click="toggleMobileMenu">✕</button>
          <ProfileSidebar />
        </aside>
      </div>
    </Transition>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
      <!-- 왼쪽 사이드바 (넓거나 중간일 때 보임) -->
      <aside class="sidebar left-sidebar" v-if="!isMobile">
        <ProfileSidebar />
      </aside>

      <!-- 메인 컨텐츠 -->
      <main class="content">
        콘텐츠가 이쪽에 표시됨😀
      </main>

      <!-- 오른쪽 사이드바 (넓을 때만 보임) -->
      <aside class="sidebar right-sidebar" v-if="isWide">
        <TrendingSidebar />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ProfileSidebar from './ProfileSidebar.vue'
import TrendingSidebar from './TrendingSidebar.vue'

// 화면 크기 감지
const isWide = ref(window.innerWidth >= 1200)
const isMobile = ref(window.innerWidth < 768)
const mobileMenuOpen = ref(false)

// 창 크기 변경 감지
const updateLayout = () => {
  isWide.value = window.innerWidth >= 1200
  isMobile.value = window.innerWidth < 768
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  color: #fff;
  padding-right: 20px;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
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
  background-color: #f8f9fa;
  border-radius: 5px;
  width: 300px;
}

/* 왼쪽 사이드바 */
.left-sidebar {
  grid-column: 1;
}

/* 오른쪽 사이드바 (넓을 때만 보임) */
.right-sidebar {
  grid-column: 3;
}

/* 메인 컨텐츠 */
.content {
  grid-column: 2;
  background-color: #fff;
  border-radius: 5px;
  flex-grow: 1;
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1000;
}

.mobile-sidebar {
  width: 250px;
  height: 100vh;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.close-btn {
  align-self: flex-end;
  border: none;
  background: none;
  font-size: 1.2rem;
  cursor: pointer;
}

/* 반응형 스타일 */
@media (max-width: 1199px) {
  .main-container {
    grid-template-columns: 1fr 1fr;
  }
  .right-sidebar {
    display: none;
  }
}

@media (max-width: 767px) {
  .main-container {
    grid-template-columns: 1fr;
  }
  .left-sidebar {
    display: none;
  }
  .menu-btn {
    display: inline-block;
  }
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
