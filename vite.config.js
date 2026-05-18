import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import path from 'path';
import fs from 'fs';
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

const DEFAULT_THEME_BY_TEMPLATE = {
  template_one: 'purple',
  template_two: 'green',
  template_three: 'gold',
  template_four: 'black',
  template_five: 'deepblue',
}

const copyIfExists = (from, to) => {
  if (!fs.existsSync(from)) return
  fs.mkdirSync(path.dirname(to), { recursive: true })
  fs.cpSync(from, to, { recursive: true })
}

const skinPublicAssetsPlugin = ({ templateName, themeName }) => {
  return {
    name: 'skin-public-assets',
    apply: 'build',
    closeBundle() {
      const publicRoot = resolve('public')
      const distRoot = resolve('dist')
      const imgsRoot = path.join(publicRoot, 'imgs')
      const distImgsRoot = path.join(distRoot, 'imgs')

      fs.rmSync(distImgsRoot, { recursive: true, force: true })

      copyIfExists(path.join(publicRoot, 'manifest.json'), path.join(distRoot, 'manifest.json'))
      copyIfExists(path.join(publicRoot, 'service-worker.js'), path.join(distRoot, 'service-worker.js'))
      copyIfExists(path.join(publicRoot, 'icons'), path.join(distRoot, 'icons'))
      copyIfExists(path.join(publicRoot, 'audio'), path.join(distRoot, 'audio'))
      copyIfExists(path.join(publicRoot, 'fonts'), path.join(distRoot, 'fonts'))
      copyIfExists(path.join(imgsRoot, 'common'), path.join(distImgsRoot, 'common'))

      if (fs.existsSync(imgsRoot)) {
        fs.readdirSync(imgsRoot, { withFileTypes: true })
          .filter((entry) => entry.isFile())
          .forEach((entry) => copyIfExists(path.join(imgsRoot, entry.name), path.join(distImgsRoot, entry.name)))
      }

      copyIfExists(
        path.join(imgsRoot, templateName, themeName),
        path.join(distImgsRoot, templateName, themeName),
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const currentTemplate = env.VITE_TEMPLATE || 'template_one'
  const currentTheme = env.VITE_THEME || DEFAULT_THEME_BY_TEMPLATE[currentTemplate] || 'purple'

  return {
    plugins: [
      vue(),
      skinComponentsPlugin(currentTemplate),
      skinPublicAssetsPlugin({ templateName: currentTemplate, themeName: currentTheme }),
      AutoImport({
        resolvers: [VantResolver()],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    define: {
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
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
