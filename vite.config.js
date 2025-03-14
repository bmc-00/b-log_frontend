import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  define: {
    __ADMIN_MODE__: JSON.stringify(process.env.NODE_ENV === 'development')
  }
})
