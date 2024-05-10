import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  server: {
    host: ["127.0.0.1", "localhost"],
    port: 2333,
    open: true,
    proxy: {
      // 注意这里不需要在 target 后面加 *
      '/api': {
        target: 'http://127.0.0.1:8080', // 目标服务器地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径，去掉 /api 前缀
      },
    }
  }

})
