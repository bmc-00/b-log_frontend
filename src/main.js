import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Post from './components/Post.vue'
import About from './components/About.vue'
import AddPost from './components/AddPost.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/addpost', component: AddPost },
  { path: '/posts/:id', component: Post, props: true },
  { path: '/category/:category', component: Home, props: true }, //category 전달
  { path: '/tag/:tag', component: Home, props: true } //tag 전달
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router) // Vue Router 등록
app.mount('#app')
