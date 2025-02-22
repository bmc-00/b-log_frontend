<template>
  <div class="profile-sidebar">
    <img class="profile-img" src="/images/prop.jpg" alt="Profile" />
    <div style="font-size: 25px; padding-left:15px; font-weight: 700; padding-top:5px; color: #555;">BMC</div>
    <div style="font-size: 15px; padding-left:15px; font-weight: 300; padding-bottom: 20px;">안녕하세요와 인삿말</div>
    <div class="profile-nav">
        <RouterLink to="/">
            <div class="profile-nav-item">
                <span class="material-symbols-outlined light">home</span>
            <div style="padding-top:1px;">Home</div>
        </div>
        </RouterLink>
        
        <RouterLink to="/category">
            <div class="profile-nav-item">
                <span class="material-symbols-outlined light">category</span>
                <div style="padding-top:1px;">Categories</div>
            </div>
        </RouterLink>


        <RouterLink to="/tag">
            <div class="profile-nav-item">
                <span class="material-symbols-outlined light">sell</span>
                <div style="padding-top:1px;">Tags</div>
            </div>
        </RouterLink>

        <RouterLink to="/about">
            <div class="profile-nav-item">
                <span class="material-symbols-outlined light">info</span>
                <div style="padding-top:1px;">About</div>
            </div>
        </RouterLink>
    </div>

    <!--저작권 명시-->
    <div style="flex-grow: 1; font-size:12px; display: flex; align-items: flex-end; justify-content: center;">
        <p>© 2025 BMC. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
<style scoped>
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
  margin: 10px 0px 0px 0px;
  padding: 5px 0px 5px 15px;
  border-radius: 10px;
  font-weight: 300;
  cursor: pointer;
}

.profile-nav-item:hover {
    background-color: rgb(255, 220, 220);
}

.profile-nav {
    display: flex;
    flex-direction: column;
}
</style>
