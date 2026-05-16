import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import path from 'path';
import { TEMPLATE_COMPONENTS } from './templates.config.js'

const resolve = (dir) => path.join(__dirname, dir)

const skinComponentsPlugin = (templateName) => {
  const virtualModuleId = 'virtual:skin-components'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`
  const components = TEMPLATE_COMPONENTS[templateName] || TEMPLATE_COMPONENTS.template_one

  return {
    name: 'skin-components',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },
    load(id) {
      if (id !== resolvedVirtualModuleId) return

      return Object.entries(components)
        .map(([name, componentPath]) => `export { default as ${name} } from '${componentPath}'`)
        .join('\n')
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const currentTemplate = env.VITE_TEMPLATE || 'template_one'

  return {
    plugins: [
      vue(),
      skinComponentsPlugin(currentTemplate),
      AutoImport({
        resolvers: [VantResolver()],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    server: {
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'firebase': ['firebase/app', 'firebase/messaging']
          }
        }
      }
    }
  }
})
