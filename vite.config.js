import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import path from 'path';

const resolve = (dir) => path.join(__dirname, dir)

const TEMPLATE_COMPONENTS = {
  template_one: {
    Home: '/src/components/templates/template_one/HomeOne.vue',
    Footer: '/src/components/templates/template_one/FooterOne.vue',
    Aside: '/src/components/templates/template_one/AsideOne.vue',
    Mine: '/src/components/templates/template_one/MineOne.vue',
  },
  template_two: {
    Home: '/src/components/templates/template_two/HomeTwo.vue',
    Footer: '/src/components/templates/template_two/FooterTwo.vue',
    Aside: '/src/components/templates/template_two/AsideTwo.vue',
    Mine: '/src/components/templates/template_two/MineTwo.vue',
  },
  template_three: {
    Home: '/src/components/templates/template_three/HomeThree.vue',
    Footer: '/src/components/templates/template_three/FooterThree.vue',
    Aside: '/src/components/templates/template_three/AsideThree.vue',
    Mine: '/src/components/templates/template_three/MineThree.vue',
  },
  template_four: {
    Home: '/src/components/templates/template_four/HomeFour.vue',
    Footer: '/src/components/templates/template_four/FooterFour.vue',
    Aside: '/src/components/templates/template_four/AsideFour.vue',
    Mine: '/src/components/templates/template_four/MineFour.vue',
  },
  template_five: {
    Home: '/src/components/templates/template_five/HomeFive.vue',
    Footer: '/src/components/templates/template_five/FooterFive.vue',
    Aside: '/src/components/templates/template_five/AsideFive.vue',
    Mine: '/src/components/templates/template_five/MineFive.vue',
  },
}

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
