<template>
    <div class="profile-sidebar">
      <img class="profile-img" src="/images/prop.jpg" alt="Profile" />
      <div style="font-size: 25px; padding-left:15px; font-weight: 700; padding-top:5px; color: #555;">BMC</div>
      <div style="font-size: 15px; padding-left:15px; font-weight: 300; padding-bottom: 20px;">안녕하세요와 인삿말</div>
  
      <div class="profile-nav">
        <RouterLink to="/" class="profile-nav-item" :class="{ active: $route.path === '/' }">
          <span class="material-symbols-outlined light">home</span>
          <div style="padding-top:1px;">Home</div>
        </RouterLink>
      <div @mouseenter="isCategoryOpen = true"
      @mouseleave="isCategoryOpen = false" >
      <div 
        class="profile-nav-item category-container">
        <span class="material-symbols-outlined light">category</span>
        <div>Categories</div>
      </div>
      <transition name="slide">
          <div v-if="isCategoryOpen" class="category-dropdown">
            <RouterLink v-for="category in categories" :key="category" :to="`/category/${category}`" class="dropdown-item">－ {{ category }}</RouterLink>
          </div>
        </transition>
      </div>
      <div @mouseenter="isTagOpen = true"
      @mouseleave="isTagOpen = false" >
      <div 
        class="profile-nav-item category-container">
        <span class="material-symbols-outlined light">sell</span>
        <div>Tags</div>
      </div>
      <transition name="slide">
          <div v-if="isTagOpen" class="tag-dropdown">
            <RouterLink v-for="tag in tags" :key="tag" :to="`/tag/${tag.name}`" class="dropdown-item-tag" :style="{ backgroundColor:tag.color }">{{ tag.name }}</RouterLink>
          </div>
        </transition>
      </div>
  
        <RouterLink to="/about" class="profile-nav-item" :class="{ active: $route.path === '/about' }">
          <span class="material-symbols-outlined light">info</span>
          <div style="padding-top:1px;">About</div>
        </RouterLink>
      </div>
  
      <div style="flex-grow: 1; font-size:12px; display: flex; align-items: flex-end; justify-content: center;">
        <p>© 2025 BMC. All rights reserved.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from 'axios';
  import { useRoute } from "vue-router";

  const fetchDatas = async () => {
  try {
    const cat = await axios.get(`http://localhost:8080/api/posts/getcategories`);
    categories.value = cat.data;

    const tg = await axios.get(`http://localhost:8080/api/tags`);
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

  onMounted(fetchDatas);
  </script>
  
  <style scoped>

  .category-container {
     position: relative;
  }

  .category-dropdown {
    display:flex;
    background: transparent;
    padding: 10px 0 0 20px;
    width: 200px;
    flex-direction: column;
  }

  .tag-dropdown {
    display:flex;
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
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s ease-in-out;
}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  overflow: hidden;
}

.slide-enter-to, .slide-leave-from {
  opacity: 1;
  max-height: 1000px; /* 내용에 따라 적절한 값으로 변경 */
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
  </style>
  