import { computed,ref,onMounted,onUnmounted} from 'vue'
import { useDateFormat } from '@vueuse/core'
import { showToast } from 'vant'
import { t } from '@/i18n'
import { useAudio } from '@/utils/audio'

const { AUDIO_ASSETS, createAudio, playAudio, stopAudio } = useAudio()

export const classListFunc = (element,className,event) => {
    var isClsList = 'classList' in HTMLElement.prototype;
    if(!isClsList) {
        Object.defineProperty(HTMLElement.prototype,'classList',{
            get:function(){
                var _self = this;
                return {
                    add:function(cls){
                        if(!this.contains(cls)){
                            _self.className +=' ' + cls;
                        }
                    },
                    remove(cls){
                        if(this.contains(cls)){ 
                            var reg= new RegExp(cls);   
                            _self.className =  _self.className.replace(reg,'');
                        }
                    },
                    contains(cls){      
                    var index =  _self.className.indexOf(cls);
                        return  index!=-1 ? true : false;
                    },
                    toggle(cls){
                        if(this.contains(cls)){ 
                            this.remove(cls)
                        } else {
                            this.add(cls)
                        }
                    }
                }
            }
        })
    }
    if(event=='add') {
        element.classList.add(className);
    }else if(event=='remove') {
        element.classList.remove(className);
    }else if(event=='contains') {
        return element.classList.contains(className);
    } else {
        element.classList.toggle(className);
    }
}

export function isPwaFunc() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
}

// 检测是否为 iPhone SE 机型（320x568 或 375x667）
export function isIphoneSE() {
    if (!isIOS()) return false;
    const w = window.screen.width;
    const h = window.screen.height;
    // 兼容横竖屏
    return (
        (w === 320 && h === 568) || (w === 568 && h === 320) || // iPhone SE 1st gen
        (w === 375 && h === 667) || (w === 667 && h === 375)    // iPhone SE 2nd/3rd gen, 6/7/8
    );
}

// export function isPwaFunc() {
//     // 获取环境信息
//     const ua = navigator.userAgent.toLowerCase();
//     const isMIUI = /miuibrowser/.test(ua);
    
//     // 检查多种 PWA 状态
//     const pwaStatus = {
//         // 标准 PWA 检测
//         displayStandalone: window.matchMedia('(display-mode: standalone)').matches,
//         // iOS PWA 检测
//         iosStandalone: window.navigator.standalone === true,
//         // 全屏模式检测（针对某些国产浏览器）
//         fullscreen: window.matchMedia('(display-mode: fullscreen)').matches,
//         // Android app 引用检测
//         androidApp: document.referrer.includes('android-app://'),
//         // MIUI 特殊处理
//         miuiPwa: isMIUI && typeof window.MiuiBrowser !== 'undefined'
//     };

//     // 调试信息
//     console.log('PWA 状态检测:', {
//         环境: {
//             是否MIUI: isMIUI,
//             userAgent: ua
//         },
//         检测结果: pwaStatus
//     });

//     // 返回综合检测结果
//     return pwaStatus.displayStandalone || 
//            pwaStatus.iosStandalone || 
//            pwaStatus.fullscreen ||
//            pwaStatus.androidApp ||
//            pwaStatus.miuiPwa;
// }

export function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}
export function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isSafari(){
    return navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('CriOS') && !navigator.userAgent.includes('FxiOS');
}
export function isMobileSafari(){
    const ua = navigator.userAgent.toLowerCase();
    
    // 用户代理检测
    const isMobileUA = /android|iphone|ipad|ipod|blackberry|windows phone|mobile|webos|opera mini|iemobile/i.test(ua);
    
    // 触摸支持检测
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // 屏幕尺寸检测
    const isSmallScreen = window.screen.width < 768;
    
    // 开发者工具检测
    const hasDevTools = '__REACT_DEVTOOLS_GLOBAL_HOOK__' in window || 
                       '__VUE_DEVTOOLS_GLOBAL_HOOK__' in window;
    
    // 屏幕/视口不匹配检测
    const screenViewportMismatch = Math.abs(window.screen.width - window.innerWidth) > 100;
    return isMobileUA && hasTouch && isSmallScreen && !hasDevTools && !screenViewportMismatch;
}
// 添加浏览器检测函数
// export function isChrome() {
//     const userAgent = navigator.userAgent.toLowerCase()
//     return /chrome/.test(userAgent) && !/edge/.test(userAgent) && !/opr/.test(userAgent)
// }

export function isChrome() {
    const ua = navigator.userAgent.toLowerCase();
    
    // 检查常见的内置浏览器和第三方浏览器
    if (
        /micromessenger/.test(ua) || // 微信浏览器
        /miuibrowser/.test(ua) ||    // 小米浏览器
        /huaweibrowser/.test(ua) ||  // 华为浏览器
        /samsungbrowser/.test(ua) || // 三星浏览器
        /ucbrowser/.test(ua) ||      // UC浏览器
        /qq/.test(ua) ||            // QQ浏览器
        /opr/.test(ua) ||           // Opera
        /edge/.test(ua) ||          // Edge
        /firefox/.test(ua) ||       // Firefox
        /safari/.test(ua) ||        // Safari
        /line/.test(ua) ||          // Line
        /fb|fbav/.test(ua) ||       // Facebook
        /instagram/.test(ua) ||      // Instagram
        /webview/.test(ua) ||       // 通用 WebView
        /wv/.test(ua)               // Android WebView
    ) {
        return false;
    }

    // 检查是否为真正的 Chrome
    return (
        /chrome/.test(ua) && 
        /google inc/.test(navigator.vendor.toLowerCase()) &&
        !window.chrome?.runtime &&   // 排除一些模拟环境
        typeof chrome !== 'undefined' && 
        chrome.webstore !== undefined
    );
}

export function verifyLengthFunc(str, tips, min) {
    let val;
    if(!min || min == 0) {
        val = 0
    }else {
        val = parseInt(min)
    }
    if(!str || str.length < val) {
        showToast({
            message: tips||'',
            wordBreak: 'break-word',
        });
        return false
    }else {
        return true
    }
}

export function verifySameFunc(str1, str2, tips) {
    if(str1 != str2) {
        showToast({
            message: tips,
            wordBreak: 'break-word',
        });
        return false
    }else {
        return true
    }
}

export function resetHtmlFunc(con) {
    if(!con) return;
    return con.replace(/<img/g, '<img style="max-width:100% !important;height:auto;display:block;margin:0;padding:0;"');
}

export function resetTimeFunc(timestring) {
    if(!timestring) return
    return useDateFormat(new Date(timestring * 1000), 'YYYY-MM-DD HH:mm').value
}

export function scrollToTopFunc() {
    const fromTopDistance = document.documentElement.scrollTop || document.body.scrollTop
    if (fromTopDistance > 0) {
        window.requestAnimationFrame(scrollToTop)
        window.scrollTo(0, fromTopDistance - fromTopDistance/ 8)
    }
}

export function randNumberFunc(min, max) {
    return Math.random() * (max - min) + min
}

export function resetAmountFunc(num, toFixed = 2) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: toFixed, currencyDisplay: 'code' }).format(num).replace('USD', '').trim();
}

export function resetAccountFunc(text) {
    if(!text) return
    if(text.length > 6) {
        return text.substring(0,3)+" *** *** *** "+text.substring(text.length-3)
    } else {
        return text
    }
}

export function calendarFormatterFunc(day) {
    if (day.type === 'start') {
      day.bottomInfo = t('开始')
    } else if (day.type === 'end') {
      day.bottomInfo = t('结束')
    }
    return day;
}

export function calendarFormatDateFunc(date) {
    let y = date.getFullYear()
    let m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    let d = date.getDate() + 1 >= 10 ? date.getDate() : '0' + date.getDate()
    return `${y}-${m}-${d}`
}

// 升序
export function orderAsceFunc(arr, key) {
    arr.sort(function (a, b) {
        return a[key] - b[key];
    })
    return arr
}

// 降序
export function orderDescFunc(arr, key) {
    arr.sort(function (a, b) {
        return b[key] - a[key];
    })
    return arr
}

export const base64Func = {
    encode(str) {
        if(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
                }));
        }else {
            return ''
        }
    },
    decode(str) {
        var exg = new RegExp('^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$')
        if(exg.test(str)) {
            return decodeURIComponent(atob(str).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }else {
            return ''
        }
    }
}

export function loadResourceFunc(){

    // 预加载关键音频
    createAudio('click', AUDIO_ASSETS.BUTTON_CLICK)
    createAudio('close', AUDIO_ASSETS.CLOSE_CLICK)
} 

export function playBtnAudioFunc(key) {
    // console.log(key)
    const VITE_CLICK_MUTE = import.meta.env.VITE_CLICK_MUTE
    if(VITE_CLICK_MUTE != 1) {
        // const audio = document.getElementById('btn-audio')
        // audio.play()
        if(key == "close"){
            playAudio('click')
        }else{
            playAudio('click')
        }
    }
}

export function isSameDayFunc(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

export function animateNumberFunc(refVar, to, duration = 1000) {
    const from = Number(refVar.value)
    const toNumber = Number(to)
    if (isNaN(from) || isNaN(toNumber)) {
        refVar.value = 0
        return
    }
    const start = performance.now()
    function frame(now) {
        const progress = Math.min((now - start) / duration, 1)
        refVar.value = (from + (toNumber - from) * progress).toFixed(2)
        if (progress < 1) {
            requestAnimationFrame(frame)
        } else {
            refVar.value = toNumber.toFixed(2)
        }
    }
    requestAnimationFrame(frame)
}
// 浮窗距离顶部的动态计算（可根据实际需求调整比例或像素）
export const bubbleTopRef = computed(()=> {
    // 监听 window.innerHeight 并动态计算浮窗 top
const windowHeight = ref(window.innerHeight)
function updateWindowHeight() {
  windowHeight.value = window.innerHeight
}
onMounted(() => {
  window.addEventListener('resize', updateWindowHeight)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowHeight)
})
    if(isIphoneSE()){
        return `${windowHeight.value * 0.65}px`
     }else{
         // 例如：距离顶部 70% 位置
         return `${windowHeight.value * 0.71}px`
     }
})
// 距离顶部高度计算
export function useBubbleTop() {
    const windowHeight = ref(window.innerHeight)
    function updateWindowHeight() {
      windowHeight.value = window.innerHeight
    }
    onMounted(() => {
      window.addEventListener('resize', updateWindowHeight)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', updateWindowHeight)
    })
    
    // 获取安全区域高度
    const getSafeAreaTop = () => {
      // 检查是否有刘海屏
      const hasNotch = window.screen.height - window.innerHeight > 0
      if (hasNotch) {
        // 获取安全区域顶部高度
        const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0')
        return safeAreaTop || 44 // 默认刘海屏高度44px
      }
      return 0
    }
    
    const bubbleTopRef = computed(() => {
      const safeAreaTop = getSafeAreaTop()
      let baseTop
      if (isIphoneSE()) {
        baseTop = windowHeight.value * 0.65
      } else {
        baseTop = windowHeight.value * 0.71
      }
      return `${baseTop - safeAreaTop}px`
    })
    
    const bubbleTopAltRef = computed(() => {
      const safeAreaTop = getSafeAreaTop()
      let baseTop
      if (isIphoneSE()) {
        baseTop = windowHeight.value * 0.78
      } else {
        baseTop = windowHeight.value * 0.815
      }
      return `${baseTop - safeAreaTop}px`
    })
    
    return { bubbleTopRef, bubbleTopAltRef }
  }
// 返回数组或者对象长度方法
export function getObjAndArrLength(data) {
    if (Array.isArray(data)) {
        // 如果是数组，返回数组的长度
        return data.length;
    } else if (data && typeof data === 'object') {
        // 如果是对象，返回对象的属性数量
        return Object.keys(data).length;
    } else {
        // 处理其他情况，比如非对象和非数组的值
        return 0; // 或者根据需求返回其他值
    }
}