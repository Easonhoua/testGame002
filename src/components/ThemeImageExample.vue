<script setup>
import { getThemeImage } from '@/utils/theme'
import { useTheme } from '@/composables/useTheme'

// 方法 1: 直接使用 getThemeImage
const logo = getThemeImage('logo.png')
const banner = getThemeImage('banner.png', 'home')

// 方法 2: 使用 useTheme composable
const { getImage, themeName, themeColors } = useTheme()
const btnPrimary = getImage('btn-primary.png')
const iconHome = getImage('icon-home.png', 'icons')

// 批量获取图片
const themeImages = {
  // 根目录图片
  logo: getThemeImage('logo.png'),
  banner: getThemeImage('banner.png'),
  
  // 子文件夹图片
  homeBg: getThemeImage('bg.png', 'home'),
  homeCard: getThemeImage('card.png', 'home'),
  
  // 图标
  iconMenu: getThemeImage('icon-menu.png', 'icons'),
  iconService: getThemeImage('icon-service.png', 'icons'),
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">主题图片使用示例</h1>
    
    <!-- 显示当前主题信息 -->
    <div class="mb-6 p-4 bg-gray-100 rounded">
      <p class="text-sm">当前主题: <strong>{{ themeName }}</strong></p>
      <p class="text-sm">主题色: <strong :style="`color: ${themeColors.theme}`">{{ themeColors.theme }}</strong></p>
    </div>

    <!-- 示例 1: Logo -->
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-2">1. Logo（根目录图片）</h2>
      <p class="text-sm text-gray-600 mb-2">
        使用路径: <code class="bg-gray-200 px-1">{{ logo }}</code>
      </p>
      <img :src="logo" alt="Logo" class="max-w-xs border border-gray-300 rounded" />
    </div>

    <!-- 示例 2: Banner（子文件夹图片）-->
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-2">2. Banner（home 子文件夹）</h2>
      <p class="text-sm text-gray-600 mb-2">
        使用路径: <code class="bg-gray-200 px-1">{{ banner }}</code>
      </p>
      <img :src="banner" alt="Banner" class="max-w-md border border-gray-300 rounded" />
    </div>

    <!-- 示例 3: 按钮 -->
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-2">3. 按钮图片</h2>
      <p class="text-sm text-gray-600 mb-2">
        使用路径: <code class="bg-gray-200 px-1">{{ btnPrimary }}</code>
      </p>
      <img :src="btnPrimary" alt="Primary Button" class="max-w-xs border border-gray-300 rounded" />
    </div>

    <!-- 示例 4: 批量图片 -->
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-2">4. 批量使用图片</h2>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(imageSrc, key) in themeImages" :key="key" class="border border-gray-300 rounded p-2">
          <p class="text-xs text-gray-500 mb-1">{{ key }}</p>
          <img :src="imageSrc" :alt="key" class="w-full h-auto" />
          <p class="text-xs text-gray-400 mt-1 break-all">{{ imageSrc }}</p>
        </div>
      </div>
    </div>

    <!-- 示例 5: 作为背景图 -->
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-2">5. 作为背景图使用</h2>
      <div 
        :style="`background-image: url(${themeImages.homeBg}); height: 200px;`"
        class="bg-cover bg-center border border-gray-300 rounded flex items-center justify-center"
      >
        <p class="text-themewhite text-xl font-bold bg-rgbablack50 px-4 py-2 rounded">背景图示例</p>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
      <h3 class="font-bold mb-2">📝 使用说明</h3>
      <ol class="text-sm space-y-1 list-decimal list-inside">
        <li>确保图片存在于主题文件夹中: <code>public/imgs/{{ themeName }}/</code></li>
        <li>使用 <code>getThemeImage('文件名.png')</code> 获取根目录图片</li>
        <li>使用 <code>getThemeImage('文件名.png', '子文件夹')</code> 获取子文件夹图片</li>
        <li>确保所有主题文件夹中的文件名和路径结构一致</li>
      </ol>
    </div>

    <!-- 文件夹结构示例 -->
    <div class="mt-4 p-4 bg-green-50 border border-green-200 rounded">
      <h3 class="font-bold mb-2">📁 文件夹结构示例</h3>
      <pre class="text-xs bg-themewhite p-2 rounded overflow-auto"><code>public/imgs/
├── default/
│   ├── logo.png
│   ├── banner.png
│   ├── btn-primary.png
│   ├── home/
│   │   ├── bg.png
│   │   └── card.png
│   └── icons/
│       ├── icon-menu.png
│       └── icon-service.png
│
└── purple/
    ├── logo.png          ← 文件名相同
    ├── banner.png        ← 文件名相同
    ├── btn-primary.png   ← 文件名相同
    ├── home/
    │   ├── bg.png
    │   └── card.png
    └── icons/
        ├── icon-menu.png
        └── icon-service.png</code></pre>
    </div>
  </div>
</template>

<style scoped>
code {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
}
</style>


