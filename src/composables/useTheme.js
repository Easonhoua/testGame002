/**
 * Vue 3 Composable - 主题系统
 * 在组件中方便地使用主题功能
 */

import { ref, computed, onMounted } from 'vue'
import { 
  getCurrentTheme, 
  getThemeImage, 
  switchTheme,
  getAvailableThemes 
} from '@/utils/theme'

/**
 * 使用主题系统的组合式函数
 */
export function useTheme() {
  // 当前主题
  const currentTheme = ref(getCurrentTheme())
  
  // 主题名称
  const themeName = computed(() => currentTheme.value.name)
  
  // 主题颜色
  const themeColors = computed(() => currentTheme.value.colors)
  
  // 所有可用主题
  const availableThemes = ref(getAvailableThemes())
  
  // 当前域名
  const hostname = ref(window.location.hostname)
  
  /**
   * 获取主题图片
   * @param {string} imageName - 图片名称
   * @param {string} folder - 可选的子文件夹
   */
  const getImage = (imageName, folder = '') => {
    return getThemeImage(imageName, folder)
  }
  
  /**
   * 切换主题
   * @param {string} name - 主题名称
   */
  const changeTheme = (name) => {
    switchTheme(name)
    currentTheme.value = getCurrentTheme()
  }
  
  /**
   * 刷新主题（当主题配置可能改变时调用）
   */
  const refreshTheme = () => {
    currentTheme.value = getCurrentTheme()
  }
  
  return {
    // 状态
    currentTheme,
    themeName,
    themeColors,
    availableThemes,
    hostname,
    
    // 方法
    getImage,
    changeTheme,
    refreshTheme,
  }
}

/**
 * 使用主题图片的组合式函数
 * @param {string} imageName - 图片名称
 * @param {string} folder - 可选的子文件夹
 */
export function useThemeImage(imageName, folder = '') {
  const imageUrl = ref('')
  
  onMounted(() => {
    imageUrl.value = getThemeImage(imageName, folder)
  })
  
  return imageUrl
}

/**
 * 使用主题颜色的组合式函数
 * @param {string} colorKey - 颜色键名（如 'theme', 'minor' 等）
 */
export function useThemeColor(colorKey) {
  const theme = getCurrentTheme()
  const colorValue = computed(() => theme.colors[colorKey] || '#000000')
  
  return colorValue
}

/**
 * 监听主题变化的组合式函数
 * @param {Function} callback - 主题变化时的回调函数
 */
export function useThemeChange(callback) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        const newTheme = getCurrentTheme()
        callback(newTheme)
      }
    })
  })
  
  onMounted(() => {
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })
  })
  
  return {
    disconnect: () => observer.disconnect()
  }
}

export default useTheme

