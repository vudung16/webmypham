import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv';
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({mode}) => {
  dotenv.config(
      { path: './.env.' + mode }
  );
  return defineConfig({
    plugins: [vue()],
    define: {
      'process.env': {
        homePage: process.env.VUE_APP_HOMEPAGE,
        webmyphamapi: process.env.VUE_APP_WEBMYPHAMAPI,
      }
    },
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

    publicPath: '/webmypham/'
    
  })
}
