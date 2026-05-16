import { initVConsole } from '@/utils/debug'
// 初始化调试工具
initVConsole()
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initTheme } from '@/utils/theme'
import './style.css'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import { Locale } from 'vant'
import { Lazyload } from 'vant';
import enUS from 'vant/es/locale/lang/en-US'
import 'vant/lib/index.css'
import { useTemplate } from '@/utils/template'

// 初始化主题系统（必须在渲染前执行）
initTheme()
import PuPage from './components/public/PuPage.vue'
import PuCard from './components/public/PuCard.vue'
import PuNoData from './components/public/PuNoData.vue'

import IconArrowLeft from './components/icon/IconArrowLeft.vue'
import IconArrowRight from './components/icon/IconArrowRight.vue'
import IconArrowDown from './components/icon/IconArrowDown.vue'
import IconCheck from './components/icon/IconCheck.vue'
import IconClose from './components/icon/IconClose.vue'
import IconChevronDown from './components/icon/IconChevronDown.vue'
import IconChevronRight from './components/icon/IconChevronRight.vue'

import UiInput from './components/ui/input'
import UiDrawer from './components/ui/drawer'
import UiFileImage from './components/ui/file-image'


// 设置多语言
Locale.use('en-US', enUS)

const pinia = createPinia()
const app = createApp(App)

app.component('PuPage', PuPage)
app.component('PuCard', PuCard)
app.component('PuNoData', PuNoData)

app.component('IconArrowLeft', IconArrowLeft)
app.component('IconArrowRight', IconArrowRight)
app.component('IconArrowDown', IconArrowDown)
app.component('IconCheck', IconCheck)
app.component('IconClose', IconClose)
app.component('IconChevronDown', IconChevronDown)
app.component('IconChevronRight', IconChevronRight)

app.component('UiInput', UiInput)
app.component('UiDrawer', UiDrawer)
app.component('UiFileImage', UiFileImage)

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
})
app.mixin({
    computed: {
      currentTemplate() {
        const { currentTemplate: template } = useTemplate()
        return template
      },
      currentUnit(){
        const { currentUnit: Unit } = useTemplate() || "R$"
        return Unit
      }
    }
  })
app.use(pinia)
app.use(Lazyload);
app.use(router).use(i18n).mount('#app')