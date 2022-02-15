import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: 'webmypham-dev.vn', //domain chạy dưới local
    https: true,
    port: 2222
  },
  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    }
  },
  host: "webmypham-dev.vn",
  port: 2222,
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/scss/_variables.scss";`
      }
    }
  },

  publicPath: process.env.NODE_ENV === 'production'
    ? '/webmypham/' // Thay tên repository của các bạn vào đây nhé
    : '/'
  
})
