import { ref } from 'vue'
export const bodyWidthRef = ref(375)
export const bodyHeightRef = ref(0)

export const serviceShowRef = ref(false)
export const serviceListRef = ref([])

export const indexLoadingShowRef = ref(false)
export const originFullUrlsRef = ref([])

export const loginShowRef = ref(false)
export const loginIndexRef = ref(0)
export const everLoginRef = ref(false)

export const footShowRef = ref(false)

// 缓存标志
export const hasLoadedDataRef = ref(false)

//显示notice界面
export const NoticeShowRef = ref(false)

//模式
export const isPwaRef = ref(false)

export const gameModeType = ref(0)

export async function openServiceFunc() {
    const { serviceModel } = await import('@/model/basic')
    const { getserviceListFunc } = serviceModel()
    getserviceListFunc().then(res => {
        if(res.code != 200) {
            showToast({
				message: res.message,
				wordBreak: 'break-word',
			});
        }else {
            serviceShowRef.value = true
            serviceListRef.value = res.data||[]
        }
    })
}
export function openLoginFunc(index) {
    if(!isPwaRef.value&&!loginShowRef.value) {
        loginIndexRef.value = index
        loginShowRef.value = true
    }
}

/**
 * 存储数据到 localStorage
 * @param {string} key - 存储的键名
 * @param {any} value - 存储的值
 * @param {number} expire - 过期时间（单位：小时），可选参数
 */
export const setStorage = (key, value, expire) => {
    const data = {
      value,
      time: Date.now(),
      expire: expire ? expire * 60 * 60 * 1000 : null // 转换为毫秒
    }
    localStorage.setItem(key, JSON.stringify(data))
  }
  
  /**
   * 从 localStorage 获取数据
   * @param {string} key - 存储的键名
   * @returns {any} 存储的值，如果过期或不存在则返回 null
   */
  export const getStorage = (key) => {
    const data = localStorage.getItem(key)
    if (!data) return null
  
    try {
      const parsedData = JSON.parse(data)
      const { value, time, expire } = parsedData
  
      // 如果设置了过期时间，检查是否过期
      if (expire && Date.now() - time > expire) {
        localStorage.removeItem(key)
        return null
      }
  
      return value
    } catch (error) {
      console.error('Error parsing localStorage data:', error)
      return null
    }
  }
  
  /**
   * 从 localStorage 删除数据
   * @param {string} key - 存储的键名
   */
  export const removeStorage = (key) => {
    localStorage.removeItem(key)
  }
  
  /**
   * 清空所有 localStorage 数据
   */
  export const clearStorage = () => {
    localStorage.clear()
  } 

export const isEverLoginFunc = () => {
    let info = JSON.parse(localStorage.getItem('remember'))
    if(info && info.username){
        return everLoginRef.value = true
    }else{
        return everLoginRef.value = false
    }
}

