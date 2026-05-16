<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useTitle, useWindowSize, useSessionStorage } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { bodyWidthRef, bodyHeightRef, originFullUrlsRef,footShowRef} from '@/utils/config'
import { refreshTokenFunc } from '@/model/user'
import { loadResourceFunc,isPwaFunc,isIOS} from '@/utils/core'
import vhCheck from 'vh-check'
import UiDialog from './components/ui/dialog/UiDialog.vue'
import ContactService from './components/pages/ContactService.vue'
import LoginRegister from './components/pages/LoginRegister.vue'
import PuFooter from './components/public/PuFooter.vue'  // 添加导入
import { $post } from './request'
import { initializePushNotifications, onForegroundMessage, showNotification} from '@/model/firebase'
import {getStorage } from '@/utils/config'

const route = useRoute()
const router = useRouter()
const body_app = ref(null)
// const dayjs = require('dayjs')

// 基础配置
// const VITE_APP_NAME = import.meta.env.VITE_APP_NAME
// useTitle(VITE_APP_NAME)

// URL 处理
var fullUrl = window.location.href;
originFullUrlsRef.value = fullUrl.split('?');

// 视口检查配置
vhCheck({
    cssVarName: 'vh-offset',
    force: false,
    bind: true,
    redefineVh: false,
    updateOnTouch: false,
    onUpdate: function noop() {},
})

// 移动设备检测
function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 视口尺寸
const { width, height } = useWindowSize()

// 缓存当前尺寸
const sizeCache = ref('')

// 基础尺寸重置函数
const resetBaseSize = () => {
    let size = ((width.value * 16) / 375).toFixed(1)
    if(!isMobile() && width.value / height.value >= 0.5625) {
        size = (height.value / 41.6668).toFixed(1)
    }
    size = Math.min(size, 23.8079)
    if (sizeCache.value !== size) {
        sizeCache.value = size
        document.documentElement.style.fontSize = `${size}px`
        if (body_app.value) {
            const rect = body_app.value.getBoundingClientRect()
            document.documentElement.style.setProperty('--app-width', `${rect.width}px`)
            document.documentElement.style.setProperty('--app-height', `${rect.height}px`)
            bodyWidthRef.value = rect.width
            bodyHeightRef.value = rect.height
        }
    }
}
// 监听视口变化
watch([width, height], resetBaseSize, { immediate: false })

onMounted(()=> {

    // if(isPwaFunc()){
    //     refreshTokenFunc()
    // }

    loadResourceFunc()
    resetBaseSize()

    setTimeout(() => {
          //初始化Firebase
        if(isIOS()&&isPwaFunc()){
            //提示是否要去授权框
            let info = JSON.parse(localStorage.getItem('authInfo'))
            let isSaveFcmToken = localStorage.getItem('isSaveFcmToken') || false
            if(info && info.access_token && !isSaveFcmToken){
                showConfirmDialog({
                    title: '',
                    confirmButtonText:'sim',
                    cancelButtonText:'não',
                    message:
                        'Por favor, conceda permissão de notificação ao aplicativo',
                    })
                    .then(() => {
                        // on confirm
                        initFirebase()
                    })
                    .catch(() => {
                        // on cancel
                    });
            }else{
                initFirebase()
            }
        }else{
            initFirebase()
        }
    }, 3000); 

})

const fcmToken = ref(null)
//初始化firebase
async function initFirebase() {
    try {
        // 初始化推送
        const token = await initializePushNotifications()
        fcmToken.value = token
        
        // 发送 token 到服务器
        let data = {
            token: fcmToken.value,
        }

        //是否有登录信息
        let info = JSON.parse(localStorage.getItem('authInfo'))
        // let isSaveFcmToken = localStorage.getItem('isSaveFcmToken') || false
        // if(info && info.access_token && !isSaveFcmToken){
        if(info && info.access_token){
            const res = await $post({ url: '/activity/v1/pwa/save-user-token', data: data }, { loading: false, toast: false })
            if (res.code == 200) {
                localStorage.setItem('isSaveFcmToken', true);
            }
            console.log('FCM Token saved:', res)
        }else{
            console.log('No user token to save, user may not be logged in.')
        }

        // 处理前台消息
        onForegroundMessage((payload) => {
          console.log('Received foreground message:', payload)
            // 显示通知
            // showNotification(payload.notification.title, {
            //     body: payload.notification.body,
            //     icon: '/imgs/in-top-service.png',
            //     badge: '/imgs/in-top-service.png',
            //     data:{  url: payload.data.url || '' },
            //     // onClick: () => {
            //     //     console.log('Notification clicked')
            //     //     // router.push('/messages')
            //     // }
            // })
        })
    } catch (error) {
        console.error('Push notification setup failed:', error)
    }
}

// 路由守卫
router.beforeEach((to, from, next) => {
    // 在路由元信息中存储来源路由
    to.meta.from = from.path
    footShowRef.value = to.meta?.tabar || false
    next()
})

// 路由切换动画名称
const getTransitionName = (route) => {
       // 获取当前路由和前一个路由的路径
    const toPath = route.path
    // const fromPath = route.path
    const fromPath = route.meta.from || '/'
    
    // 定义底部导航相关的路由
    const tabRoutes = ['/more', '/agent', '/mine', '/']
    
    // 如果是在底部导航之间切换
    if (tabRoutes.includes(toPath) && tabRoutes.includes(fromPath)) {
        // 判断是向前还是向后切换来决定动画方向
        const toIndex = tabRoutes.indexOf(toPath)
        const fromIndex = tabRoutes.indexOf(fromPath)
        // return toIndex > fromIndex ? 'slide-vertical-down' : 'slide-vertical-up'
        if(toIndex === 3){
            return 'slide-down-only'
        }else if(fromIndex === 3){
            return 'slide-up-overlay'
        }else{
            return 'slide-vertical-up'
        }
        
    }
    
    // 如果目标是底部导航，不使用过渡效果
    if (tabRoutes.includes(toPath)) return 'slide-right-only'

    // 其他所有二级页面使用水平切换
    return 'slide-horizontal'
}

</script>

<template>
    <div ref="body_app" class="w-full h-screen relative overflow-hidden">
        <router-view v-slot="{ Component, route }">
            <transition :name="getTransitionName(route)">
                <!-- <keep-alive :include="['home','more','mine','agent']"> -->
                <keep-alive :include="['home','more']"> 
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
            </transition>
        </router-view>
        <UiDialog />
        <ContactService />
        <LoginRegister />
        <pu-footer/>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="w-0 h-0">
            <defs>
                <linearGradient id="svgTextLInear" x1="0%" y1="0%" x2="0" y2="100%">
                    <stop offset="0%" style="stop-color:var(--color-three);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:var(--color-four);stop-opacity:1" />
                </linearGradient>
            </defs>
        </svg>
    </div>
</template>

<style>
.h-screen {
    height: calc(100vh - var(--vh-offset, 0px));
}
.min-h-screen {
    min-height: calc(100vh - var(--vh-offset, 0px));
}

/* 过渡动画基础样式 */
.slide-horizontal-enter-active,
.slide-horizontal-leave-active,
.slide-right-only-leave-active{
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
    left: 0 !important;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
    will-change: transform;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    z-index: 999;
}

.slide-vertical-up-enter-active,
.slide-vertical-up-leave-active{
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
    left: 0 !important;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
    will-change: transform;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    z-index: 99;
}

/* 水平切换动画 */
.slide-horizontal-enter-from {
    transform: translate3d(100%, 0, 0);
}

.slide-horizontal-enter-to {
    transform: translate3d(0, 0, 0);
}

.slide-horizontal-leave-from {
    transform: translate3d(0, 0, 0);
}

.slide-horizontal-leave-to {
    transform: translate3d(-100%, 0, 0);
}

/* 垂直向上切换动画 */
.slide-vertical-up-enter-from {
    transform: translate3d(0, 100%, 0);
}

.slide-vertical-up-leave-to {
    transform: translate3d(0, 100%, 0);
}

/* 无动画过渡 */
.none-enter-active,
.none-leave-active {
    transition: none;
}

/* 只有离开时的右侧滑出动画 */
.slide-right-only-enter-active {
    transition: none;
}

/* 进入时无动画 */
.slide-right-only-enter-from,
.slide-right-only-enter-to {
    transform: translate3d(0, 0, 0);
} 

/* 离开时向右滑出 */
.slide-right-only-leave-to {
    transform: translate3d(100%,0,0);
}

/* 只有离开时的向下滑出动画 */
.slide-down-only-leave-active {
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
    left: 0 !important;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
    will-change: transform;
    transition: transform 0.3s linear !important;
    z-index: 99;
}

/* 进入时无动画 */
.slide-down-only-enter-active {
    transition: none;
}

.slide-down-only-enter-from,
.slide-down-only-enter-to {
    transform: translate3d(0, 0, 0);
} 

/* 离开时向下滑出 */
.slide-down-only-leave-to {
    transform: translate3d(0, 100%, 0);
}

/* 最终正确的覆盖式向上滑入动画 */
.slide-up-overlay-enter-active,
.slide-up-overlay-leave-active {
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
  left: 0 !important;
}

/* 新界面动画 */
.slide-up-overlay-enter-active {
  z-index: 99;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-up-overlay-enter-from {
  transform: translateY(100%);
}

/* 旧界面设置 - 关键修正 */
.slide-up-overlay-leave-active {
  transition: none !important;  /* 完全禁用过渡 */
  pointer-events: none;        /* 避免旧界面拦截点击事件 */
}
.slide-up-overlay-leave-to {
  opacity: 1 !important;       /* 确保不会淡出 */
}
</style>