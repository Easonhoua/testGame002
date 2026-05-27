import { ref } from 'vue'

const vConsoleInstance = ref(null)
const isReady = ref(false)
const enableVconsole = typeof __ENABLE_VCONSOLE__ !== 'undefined' ? __ENABLE_VCONSOLE__ : false

export async function initVConsole() {
    if (!enableVconsole) return false

    //检查 URL 参数
    const fullUrl = window.location.href
    const debugParam = fullUrl.includes('debug=true')

    // 检查并设置主题颜色参数
    let colorParam = null
    const hash = window.location.hash
    
    if (hash && hash.includes('?')) {
        // 从 #/?color=gold 中提取参数
        const queryString = hash.split('?')[1]
        const params = new URLSearchParams(queryString)
        colorParam = params.get('color')
    }

    // 只在开发环境或特定条件下启用
    if (debugParam) {
        try {
            const { default: VConsole } = await import('vconsole')
            vConsoleInstance.value = new VConsole()
            isReady.value = true
            console.log('[Debug] VConsole is ready')
            // 设置全局标志
            window.VCONSOLE_READY = true

            if (colorParam) {
                // 设置到环境变量中
                localStorage.setItem('current-theme', colorParam)
                console.log(`[Debug] Theme color set to: ${colorParam}`)
            }

            return true
        } catch (error) {
            console.error('[Debug] VConsole init failed:', error)
            return false
        }
    }
    return false
}

// 检查 VConsole 是否准备就绪
export function isVConsoleReady() {
    return isReady.value
}

// 获取 VConsole 实例
export function getVConsole() {
    return vConsoleInstance.value
}

// 销毁 VConsole
export function destroyVConsole() {
    if (vConsoleInstance.value) {
        vConsoleInstance.value.destroy()
        vConsoleInstance.value = null
        isReady.value = false
    }
}