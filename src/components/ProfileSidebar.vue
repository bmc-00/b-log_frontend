<template>
  <div class="profile-sidebar">
    <img class="profile-img" src="https://static-00.iconduck.com/assets.00/crying-face-emoji-2048x1974-o6ci2ofm.png" alt="Profile" />
    <h3>BMC</h3>
    안녕하세요. 서버에서 가져오기 구현
    <nav>
      <a href="#">Home</a>
      <a href="#">Categories</a>
      <a href="#">Tags</a>
      <a href="#">About</a>
    </nav>
  </div>
</template>

<style scoped>
.profile-sidebar {
  text-align: center;
}

.profile-img {
  width: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
  margin-top: 50px;
}

nav a {
  display: block;
  text-decoration: none;
  color: #333;
  padding: 0.3rem;
}
</style>
