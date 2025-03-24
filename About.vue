<template>
  <div class="biography-container">
    <header class="bio-header">
      <div class="header-image">
        <img src="https://capsule-render.vercel.app/api?type=waving&color=db4455&height=200&section=header&text=BMC&fontSize=50&fontColor=ffffff" 
             alt="Header" 
             class="wave-header" />
      </div>
      
      <div class="profile-section">
        <div class="profile-content">
          <img src="@/assets/profile.jpg" alt="Profile" class="profile-image" />
          <h1 class="name">BMC</h1>
          <p class="tagline">Security-Focused Full Stack Developer</p>
          <div class="quick-stats">
            <div class="stat-item">
              <i class="fas fa-code"></i>
              <span>Full Stack Development</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-shield-alt"></i>
              <span>Security Engineering</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-graduation-cap"></i>
              <span>고려대학교 스마트보안학부</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 나머지 섹션들은 그대로 유지 -->
  </div>
</template>

<style scoped>
/* 기존 스타일은 모두 유지하고, 헤더 관련 스타일만 수정/추가 */

.bio-header {
  width: 100%;
  margin-bottom: 4rem;
  text-align: center;
}

.header-image {
  width: 100%;
  margin-bottom: 2rem;
}

.wave-header {
  width: 100%;
  height: auto;
}

.profile-section {
  display: flex;
  justify-content: center;
  padding: 0 1rem;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
}

.profile-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  margin-bottom: 1.5rem;
}

.name {
  font-size: 2.5rem;
  color: var(--text-title);
  margin: 0 0 0.5rem 0;
}

.tagline {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin: 0 0 1.5rem 0;
}

.quick-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.stat-item i {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .bio-header {
    margin-bottom: 3rem;
  }

  .profile-image {
    width: 150px;
    height: 150px;
  }

  .name {
    font-size: 2rem;
  }

  .tagline {
    font-size: 1.1rem;
  }

  .quick-stats {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
</style> 