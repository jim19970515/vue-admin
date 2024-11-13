import { defineConfig } from 'vite' // 动态配置函数
import { createVuePlugin } from 'vite-plugin-vue2'
export default () =>
    defineConfig({
        plugins: [createVuePlugin()],
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: '/src',
                },
            ],
        },
    })
