# MX39 Red - 多主题游戏平台

## 🎨 新功能：多主题系统

**一套代码，不同域名自动展示不同颜色和图片！**

- ✅ 根据域名自动切换主题颜色
- ✅ 动态加载不同的图片资源
- ✅ CSS 变量 + Tailwind 完美集成
- ✅ 无缝迁移，现有代码零改动

📖 [快速开始](./THEME_SYSTEM.md) | [详细文档](./docs/THEME_GUIDE.md) | [示例代码](./docs/THEME_EXAMPLES.md)

### 快速使用

```vue
<template>
  <!-- 自动使用当前域名的主题色 -->
  <div class="bg-theme text-theme-text p-4 rounded-lg">
    <h1>欢迎</h1>
    <img :src="getImage('logo.png')" alt="Logo" />
  </div>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'
const { getImage } = useTheme()
</script>
```

---

## Main framework

### Vue 3 + Vite
[vite Website](https://cn.vitejs.dev/guide/)

### Tailwind CSS
[Website](https://www.tailwindcss.cn/docs/installation)

### VANT UI
[Website](https://vant-ui.github.io/vant/#/zh-CN)

### Pinia
[Website](https://pinia.vuejs.org/zh/introduction.html)
`npm install pinia`

### qrcode.vue
`npm i qrcode.vue`

### vue-clipboard3
`npm i vue-clipboard3`

### vue-i18n
`npm i vue-i18n`

# web-push
## guide
[web-push实现原理及细节介绍](https://segmentfault.com/a/1190000013061924)

# 文字渐变
## 预设样式
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="w-0 h-0">
    <defs>
        <linearGradient id="svgTextLInear" x1="0%" y1="0%" x2="0" y2="100%">
            <stop offset="0%" style="stop-color:#FFAF00;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFEE00;stop-opacity:1" />
        </linearGradient>
    </defs>
</svg>

## 文字
<svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <text class="text-4xl text-theme font-serif font-black" stroke="currentColor" stroke-width="2" fill="url(#svgTextLInear)" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">
        文字
    </text>
</svg>