import { defineConfig } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', { dayjs: [['default', 'dayjs']] }],
      dirs: ['src/components/**', 'src/utils/**'],
      eslintrc: {
        enabled: true, // 生成 ESLint 全局变量配置
        filepath: 'types/.eslintrc-auto-import.json'
      },
      vueTemplate: true, // 是否在 vue 模板中自动导入
      dts: 'types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components/**', 'src/views/**'],
      dts: 'types/auto-components.d.ts'
    })
  ]
})
