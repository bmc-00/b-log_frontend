<template>
  <div class="profile-sidebar">
    <img class="profile-img" src="https://via.placeholder.com/100" alt="Profile" />
    <h3>Username</h3>
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
}

nav a {
  display: block;
  text-decoration: none;
  color: #333;
  padding: 0.3rem;
}
</style>
