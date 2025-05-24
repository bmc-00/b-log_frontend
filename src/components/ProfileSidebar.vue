<template>
  <div class="profile-sidebar">
    <img class="profile-img" src="/images/prop.jpg" alt="Profile" />
    <div style="font-size: 25px; padding-left:15px; font-weight: 700; padding-top:5px; color: #555;">BMC</div>
    <div style="font-size: 15px; padding-left:15px; font-weight: 300; padding-bottom: 20px;">BMC의 기술 블로그 </div>

    <div style="padding: 0 30px 15px 0;">
      <input
      v-model="searchKeyword"
      @input="onSearchInput"
      type="text"
      placeholder="🔍 Search"
      class="search-bar"
      />
    </div>

    <div class="profile-nav">
      <RouterLink to="/" class="profile-nav-item" :class="{ active: $route.path === '/' }" @click="closeSidebar">
        <span class="material-symbols-outlined light">home</span>
        <div style="padding-top:1px;">Home</div>
      </RouterLink>
      <div @mouseenter="isCategoryOpen = true" @mouseleave="isCategoryOpen = false">
        <div class="profile-nav-item category-container">
          <span class="material-symbols-outlined light">category</span>
          <div>Categories</div>
        </div>
        <transition name="slide">
          <div v-if="isCategoryOpen" class="category-dropdown">
            <RouterLink v-for="category in categories" :key="category" :to="`/category/${category}`"
              class="dropdown-item" @click="closeSidebar">－ {{ category }}</RouterLink>
          </div>
        </transition>
      </div>
      <div @mouseenter="isTagOpen = true" @mouseleave="isTagOpen = false">
        <div class="profile-nav-item category-container">
          <span class="material-symbols-outlined light">sell</span>
          <div>Tags</div>
        </div>
        <transition name="slide">
          <div v-if="isTagOpen" class="tag-dropdown">
            <RouterLink v-for="tag in tags" :key="tag" :to="`/tag/${tag.name}`" class="dropdown-item-tag"
              :style="{ backgroundColor: tag.color }" @click="closeSidebar">{{ tag.name }}</RouterLink>
          </div>
        </transition>
      </div>

      <RouterLink to="/about" class="profile-nav-item" :class="{ active: $route.path === '/about' }" @click="closeSidebar">
        <span class="material-symbols-outlined light">info</span>
        <div style="padding-top:1px;">About</div>
      </RouterLink>
    </div>
    <div
      style="flex-grow: 1; font-size: 12px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 8px;">
      <div style="display: flex; gap: 20px;">
        <a href="https://github.com/bmchun00" target="_blank" class="icon-link">
          <i class="fa-brands fa-github" style="font-size: 15px;"></i>  
        </a>
        <a href="https://facebook.com/bmchun00" target="_blank" class="icon-link">
          <i class="fa-brands fa-facebook" style="font-size: 15px;"></i>
        </a>
        <a href="mailto:bmchun00@gmail.com" target="_blank" class="icon-link">
          <i class="fa-solid fa-envelope" style="font-size: 15px;"></i>
        </a>
        <a href="https://feedly.com/i/subscription/feed/https://your-website.com/rss" target="_blank" class="icon-link">
          <i class="fa-solid fa-rss" style="font-size: 15px;"></i>
        </a>
      </div>
      <!-- 저작권 문구 -->
      <p>© 2025 BMC. All rights reserved.</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, watch } from "vue";
import axios from 'axios';
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
import debounce from 'lodash.debounce';

const emit = defineEmits();

const fetchDatas = async () => {
  try {
    const cat = await axios.get(`https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/posts/getcategories`);
    categories.value = cat.data;

    const tg = await axios.get(`https://bmc-00-d8f2avhzcfa9a2e9.koreacentral-01.azurewebsites.net/api/tags`);
    tags.value = tg.data.map((t) => ({
      id: t.id,
      name: t.name,
      color: t.color
    }));
  } catch (err) {
    error.value = '데이터를 불러오는 중 문제가 발생했습니다.';
    console.error(err);
  }
};
const tags = ref([]);
const categories = ref([]);
const isCategoryOpen = ref(false);
const isTagOpen = ref(false);
const $route = useRoute();
const router = useRouter()
const searchKeyword = ref('')

//모바일 메뉴 닫기 신호 보냄
const closeSidebar = () => {
  emit('close-sidebar')
}

const debouncedPush = debounce((kw) => {
  if (kw.trim()) {
    router.push({
      path: '/search',
      query: { keyword: kw.trim() }
    })
  } else {
    router.push({
      path: '/',
    })
  }
}, 300)

watch(searchKeyword, (newVal) => {
  debouncedPush(newVal)
})

onMounted(fetchDatas);
</script>

<style scoped>
.category-container {
  position: relative;
}

.category-dropdown {
  display: flex;
  background: transparent;
  padding: 10px 0 0 20px;
  width: 200px;
  flex-direction: column;
}

.tag-dropdown {
  display: flex;
  background: transparent;
  padding: 10px 0 0 20px;
  max-width: 200px;
  flex-wrap: wrap;
  gap: 7px;
}

.dropdown-item-tag {
  padding: 5px 7px 5px 7px;
  font-size: 12px;
  font-weight: bold;
  color: #333;
  border-radius: 12px;
}

.dropdown-item-tag:hover {
  transform: scale(1.08);
}

.dropdown-item {
  padding: 8px 0 8px 15px;
  font-size: 13px;
  text-decoration: none;
  color: #1E2A38;
  transition: background 0.3s ease;
  border-radius: 10px;
}


.dropdown-item:hover {
  background: rgb(230, 230, 255);
}

/* 드롭다운 애니메이션 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  overflow: hidden;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 1000px;
  /* 내용에 따라 적절한 값으로 변경 */
}

.material-symbols-outlined {
  font-size: 17px;
  color: #1E2A38;
}

.profile-sidebar {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 30px;
  margin-right: 30px;
  height: 100%;
}

.profile-img {
  width: 80px;
  border-radius: 50%;
  margin: 50px 0 10px 15px;
}

.profile-nav-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #1E2A38;
  margin: 3px 0px 0px 0px;
  padding: 10px 0px 10px 15px;
  border-radius: 15px;
  font-weight: 300;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
}

.profile-nav-item:hover,
.profile-nav-item.active {
  background-color: rgb(220, 220, 255);
}

.icon-link {
  display: inline-block;
  padding: 7px;
  background-color: rgb(230, 230, 255);
  border-radius: 50%;
  text-align: center;
  color: rgb(130, 130, 130);
}

.icon-link:hover {
  background-color: rgb(200, 200, 255);
}

.search-bar {
  width: 100%;
  padding: 8px 15px;
  font-size: 13px;
  color: #222;
  border: none;
  border-radius: 25px;
  background-color: rgb(250,250,255);
  border: 0.5px solid rgb(200,200,255);
  outline: none;
}

.search-bar:focus {
  border-color: rgb(150,150,255);
  box-shadow: 0 0 0 2px rgba(123, 102, 255, 0.15);
}
</style>