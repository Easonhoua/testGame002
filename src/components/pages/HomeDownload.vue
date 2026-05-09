<script setup>
import { nextTick, ref,onMounted, onUnmounted} from 'vue'
import { useScreenSafeArea } from '@vueuse/core'
import { isIOS,isChrome,isAndroid,isSafari} from '@/utils/core'
import { bodyWidthRef } from '@/utils/config'
import { useRouter } from 'vue-router'
import { getPwaPageConfigFunc, pwaPageConfig} from '@/model/pwa'
import { useThemeImages } from '@/utils/themeimg'
import { $get } from '@/request'

const PwaImg = useThemeImages().pwa

const { top, bottom } = useScreenSafeArea()


const router = useRouter()

const comment_list = ref([
    {
        name: 'Lara Liras', 
        avatar: PwaImg.icon_avatar1, 
        date: '28 de maio de 2025', 
        team: 52, 
        content: `O jogo é bom , mais precisa de um incentivo, no geral eu gostei bastante Dá pra pessoa distrair e jogar é muito saudável ! Amei os porquinhos kkk`
    },
    {
        name: 'Angelita Da Silva', 
        avatar: PwaImg.icon_avatar2, 
        date: '25 de maio de 2025', 
        team: 22, 
        content: `Gosto muito, o jogo é super divertido e o jackpot explode todos os dias`
    },
    {
        name: 'Rubens Vieira dos Santos', 
        avatar: PwaImg.icon_avatar3, 
        date: '20 de maio de 2025', 
        team: 20, 
        content: `muito divertido e não fica trancando e cheio de anúncios muito bom mesmo`
    },
])

let deferredPrompt = ref(null);
let ios_guide_show = ref(false)
let pwa_loading_show = ref(false)
let pwa_success_show = ref(false)
let pwa_error_show = ref(false)
let ios_nosafari_show = ref(false)

//控制安装动画
let btn_install_show = ref(true)
let pwa_installing_show = ref(false)
//安装进度
let installProgress = ref(0)
let installText = ref('Instalar Agora')

const counter = ref(0);
let start = null;
const duration = 1500; // 动画持续时间（毫秒）
const startValue = 0;
const endValue = 80;
const games = [
  { id: 1, title: 'Cash Craze: Casino Slots Games', icon: 'https://play-lh.googleusercontent.com/yZ_nzWpg_cj6GYJv15YdsfWBKS6JzXGt69R8fCCj3AsapCSs5MGdr6haxPCk-Ae91g=s128-rw', rating: '4,5★' },
  { id: 2, title: 'Charge Buffalo Slot-TaDa Jogos', icon: 'https://play-lh.googleusercontent.com/vHA867MF5a-0zJfHgxgKUKs4GJb8mWMLNjGpTpufUpw1IN_EuqWGY9d-qrY4keq4hw8=s128-rw', rating: '4,5★' },
  { id: 3, title: 'Jackpot Magic Slots', icon: 'https://play-lh.googleusercontent.com/Bi-dBVeyh-XZZ8ypCuklaHct8ClSitAAEOy3rCS3KOE50GBVsZ4ucseDKrLZExrAkfY=s128-rw', rating: '2,6★' },
  { id: 4, title: 'Diamond Slot', icon: 'https://play-lh.googleusercontent.com/3C9ipO88Z92NJuohq_u6Ce6sTKHAADCfrpyVaEWz3vDO4XBscTJwAiRM9WhzS__WOybZ=s128-rw', rating: '3,9★' },
  { id: 5, title: 'Slots Era-TaDa', icon: 'https://play-lh.googleusercontent.com/ESO0hEf9irZ4_SDA9KruU4irxTkjSyRCeUhWEPOROs1x2TlMqOrqB4i34M-ZPIE5XQ7W=s128-rw', rating: '4,4★' },
  { id: 6, title: 'Infinity Slots', icon: 'https://play-lh.googleusercontent.com/CSkRZuIZLOJZ8q0krA3qvnciiRTXZBU5Nx6nmTXM31ZUEilUf6Plz_va-IV_-pjWDgE=s128-rw', rating: '4,5★' },
];

const animate = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const value = Math.min(Math.floor((progress / duration) * (endValue - startValue)) + startValue, endValue);
    counter.value = value;
    if (progress < duration) {
        requestAnimationFrame(animate);
    }
};

// 添加调试函数
const checkPWAStatus = () => {
    console.log('=== PWA 状态检查 ===')
    
    // 1. 检查浏览器支持
    console.log('Navigator:', {
        serviceWorker: 'serviceWorker' in navigator,
        standalone: window.matchMedia('(display-mode: standalone)').matches,
        userAgent: navigator.userAgent
    })

    // 2. 检查manifest
    const manifest = document.querySelector('link[rel="manifest"]')
    console.log('Manifest:', manifest ? 'Found' : 'Missing')

    // html注册失败了 重新注册
    if(window.RegisterPwaStatus == undefined || window.RegisterPwaStatus == 2) {
        window.RegisterPwaStatus = 0 
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            window.RegisterPwaStatus = 1
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            window.RegisterPwaStatus = 2
            showToast({
				message: err,
				wordBreak: 'break-word',
			});
        });
    }

    if(window.RegisterPwaStatus == 0 && !isIOS()){
        waitForServiceWorkerRegistration()
    }

    // 3. 检查Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations()
            .then(registrations => {
                console.log('Service Workers:', registrations.length ? registrations : 'No registrations')
            })
    }

    // 4. 检查安装状态
    console.log('已安装?:', window.matchMedia('(display-mode: standalone)').matches)
}

//等待注册sw.js文件
function waitForServiceWorkerRegistration() {
    //继续等待
    const toast = showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: 'Carregando...',
        });

    // 每隔1秒检查一次
    const timer = setInterval(() => {
        if(window.RegisterPwaStatus == 1){

            clearInterval(timer);
            closeToast();
        }else if(window.RegisterPwaStatus == 2){
            showToast({
                message: "please check your browser support PWA",
                wordBreak: 'break-word',
            });
            clearInterval(timer);
            closeToast();
        }
    }, 1000);
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    console.log('PWA 安装提示触发:', {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
    window.deferredPrompt = e;
}, { once: false }); // 允许多次触发

window.addEventListener('appinstalled', () => {
    console.log('PWA 已安装');
    window.RegisterPwaStatus = 4
    // window.location.href = window.location.protocol + '//' + window.location.host + '/index.html#/'
});

// 监听显示模式变化
window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
    console.log('显示模式变化:', e.matches)
})

// 定义事件处理函数
// const handleBeforeInstallPrompt = (e) => {
//     e.preventDefault()
//     console.log('PWA 安装提示触发')
//     deferredPrompt.value = e
// }

// 在组件挂载时添加监听器
onMounted(() => {
    checkPWAStatus()  // 执行状态检查
    // getPwaPageConfigFunc()
    // window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    
    // window.addEventListener('appinstalled', () => {
    //     console.log('PWA 已安装');
    //     window.RegisterPwaStatus = 4
    //     pwa_loading_show.value = false
    //     pwa_success_show.value = false

    //     window.location.href = window.location.protocol + '//' + window.location.host + '/index.html#/'

    // });

    // // 监听显示模式变化
    // window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
    //     console.log('显示模式变化:', e.matches)
    // })

    // // 检查是否已经触发过安装提示
    // if (window.deferredPrompt) {
    //     deferredPrompt.value = window.deferredPrompt
    //     window.deferredPrompt = null
    // }
})

// 在组件卸载时移除监听器
onUnmounted(() => {
    // window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})


async function getPaFromManifestResponse() {

    let info = JSON.parse(localStorage.getItem('authInfo'));
    let params =  { 
        ch: window.ch,
        tk: info && info.access_token ? info.access_token : '',
        domain: window.location.protocol + '//' + window.location.host,
        start_url: window.pwaurl,
        pa: window.pa,
    }

    let res = await $get({url: '/index/manifest', params: params}, {loading: false})

    const startUrl = res.start_url;
    if (!startUrl) return '';

    const url = new URL(startUrl);

    // 解析 hash 里的 pa
    if (url.hash) {
    const hash = url.hash.startsWith('#/')
        ? url.hash.slice(2)
        : url.hash.slice(1);

    return new URLSearchParams(hash).get('pa') || '';
    }

    return url.searchParams.get('pa') || '';
}

function checkIsInstall() {
    
    if(isIOS()) {
        //是否原生safari浏览器
        console.log('当前浏览器是否是Safari:', isSafari())
        if(isSafari()){
            ios_guide_show.value = true
        }else{
            //显示引导页面 到 safari浏览器打开
            ios_nosafari_show.value = true
        }
        
    }else {

        if(window.RegisterPwaStatus == 3 || window.RegisterPwaStatus == 4) {
            // 如果已经安装了
            showToast({
                message: "PWA has been installed",
                wordBreak: 'break-word',
            });
            return
        }
        checkPWAStatus()
        pwa_loading_show.value = true
        start = null
        counter.value = 0
        requestAnimationFrame(animate)
        setTimeout(async () => {
            if(window.deferredPrompt && window.RegisterPwaStatus == 1) {
                pwa_success_show.value = true
                pwa_error_show.value = false
            }else {
                // 如果没有安装提示
                if(window.RegisterPwaStatus == 0){
                    pwa_success_show.value = true
                    pwa_error_show.value = false
                    //继续等待
                    const toast = showLoadingToast({
                        duration: 0,
                        forbidClick: true,
                        message: 'waiting for install prompt...',
                    });
                    // 每隔1秒检查一次
                    const timer = setInterval(() => {
                        if(window.RegisterPwaStatus == 1){
                            pwa_success_show.value = true
                            pwa_error_show.value = false
                            clearInterval(timer);
                            closeToast();
                        }else if(window.RegisterPwaStatus == 2){
                            showToast({
                                message: "please check your browser support PWA",
                                wordBreak: 'break-word',
                            });
                            pwa_success_show.value = false
                            pwa_error_show.value = true
                            clearInterval(timer);
                            closeToast();
                        }
                    }, 1000);
                }else{
                    // 如果没有安装提示
                    // showToast({
                    //     message: "has been installed or not support PWA",
                    //     wordBreak: 'break-word',
                    // });
                    console.log("没有触发安装事件",window.deferredPrompt)
                    console.log("当前浏览器是否是谷歌",isChrome())
                    
                    const failcount = localStorage.getItem('pwainstallfail') || 0;
                    localStorage.setItem('pwainstallfail', parseInt(failcount) + 1);

                    // 在检查安装条件的地方使用
                    if (window.deferredPrompt == null && !isChrome()) {
                        
                        // showToast({
                        //     message: "Please open in Chrome browser",
                        //     wordBreak: 'break-word',
                        // })

                        if(isAndroid()){
                            // Android 设备使用 Intent URL
                            // window.location.href = `intent://${window.location.host}${window.location.pathname}${window.location.search}?sdmode=4#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.android.chrome;end`
                            // 移除开头的 https:// 或 http://

                            // const cleanUrl = window.location.href.replace(/^https?:\/\//, '');

                            // 当前页面去掉协议
                            let cleanUrl = window.location.href.replace(/^https?:\/\//, '');

                            const pa = await getPaFromManifestResponse();
                            console.log("pa=",pa)
                            
                            // 如果 pa 存在，拼到 URL 里
                            if (pa) {
                                const separator = cleanUrl.includes('?') ? '&' : '?';
                                cleanUrl += `${separator}pa=${pa}`;
                                console.log("cleanUrl=",cleanUrl)
                            }

                            window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.android.chrome;end`
                        }else{
                            // 其他设备直接跳转应用商店
                            window.location.href = 'https://play.google.com/store/apps/details?id=com.android.chrome'
                        }
                    }

                    pwa_success_show.value = true
                    pwa_error_show.value = false
                    // window.location.replace(window.location.protocol + '//' + window.location.host + '/#/')

                }
            }
        }, duration);
    }

    if(window.fbqKey != '') {
        fbq('track', 'CustomizeProduct');
    }
    if(window.kwaiqKey && window.kwaiqKey!='') {
        kwaiq.instance(window.kwaiqKey).track('download');
    }
    if (window.ttqKey && window.ttqKey!='') {
        ttq.track('Download');
    }
}

async function confirmSuccess() {
    // if (!window.deferredPrompt) {
    //     console.log('没有安装提示')
    //     return
    // }
    try{
        pwa_loading_show.value = true
        requestAnimationFrame(animate)
        window.deferredPrompt.prompt();
        const { outcome } = await window.deferredPrompt.userChoice;
        // dismissed==>取消 accepted==>确认
        // deferredPrompt.value = null;
        if(outcome == 'accepted') {
            window.RegisterPwaStatus = 3
            // 出现进度条
            btn_install_show.value = false
            pwa_installing_show.value = true
            //定时器增加progress
            const timer = setInterval(() => {
                installProgress.value += 10
                if (installProgress.value >= 100) {
                    clearInterval(timer)
                    pwa_installing_show.value = false
                    btn_install_show.value = true
                    pwa_success_show.value = true
                    installText.value = 'Jogar Agora'
                    setTimeout(() => {
                        window.location.replace(window.pwaurl);
                    }, 1000)
                }
            }, 1000);

            // // 用户接受安装
            // setTimeout(() => {
            //     console.log(window.location.protocol + '//' + window.location.host + '/#/');
            //     // window.location.href = window.location.protocol + '//' + window.location.host + '/index.html#/';
            //     window.location.replace(window.location.protocol + '//' + window.location.host + '/#/')
            // }, 1000)
        }

    } catch (error) {
        console.error('安装提示失败:', error)
        // pwa_success_show.value = false
        // pwa_error_show.value = true
        const failcount = localStorage.getItem('pwainstallfail') || 0;
        if(failcount > 3){
            window.location.replace(window.pwaurl);
        }else{
            window.location.reload()
        }
        
    }finally {
        // 清理提示对象
        // deferredPrompt.value = null

    }
    
}

function reload() {
    window.location.reload()
}
</script>

<template>
    <!-- var(--color-minor-text) -->
    <!-- style="--color-theme: #458462;--color-rgbawhite50: #5F6367;" -->
    <div class="w-full h-full bg-themewhite text-themeblack relative flex flex-col" >
        <header :style="`padding-top: ${top};`" class="w-full shrink-0">
            <!-- <div class="w-full h-[3.25rem] pl-5 pr-3 flex items-center justify-between">
                <img src="https://pwa-install-20240320.s3.sa-east-1.amazonaws.com/assets/icons/GooglePlaybestapp.png" class="w-auto h-9">
                <img src="https://pwa-install-20240320.s3.sa-east-1.amazonaws.com/assets/icons/GooglePlaybestapp-right.png" class="w-auto h-9">
            </div> -->
        </header>
        <section class="w-full flex-1 overflow-y-auto">
            <pu-card theme="3" class="pt-10 pb-3">
                <dl class="flex items-center">
                    <dt class="mr-6 shrink-0">
                        <van-image :src=pwaPageConfig.base_pwa_logo width="4.5rem" height="4.5rem" radius="1rem" fit="cover" style="box-shadow: 0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15);" />
                    </dt>
                    <dd class="flex-1 overflow-hidden">
                        <h5 class="text-[1.5625rem] font-bold">
                            <span>{{ pwaPageConfig.base_pwa_title }}</span>
                        </h5>
                        <p class="text-[0.9rem] text-pwa font-medium">
                            <span>🎁 {{pwaPageConfig.base_pwa_subtitle}}</span>
                        </p>
                        <p class="text-xs text-rgbablack50">
                            <span>Verificado pelo aplicativo</span>
                        </p>
                    </dd>
                </dl>
            </pu-card>
            <pu-card theme="4" class="py-3">
                <dl class="w-full text-center flex">
                    <dd class="w-1/3 px-2 relative flex flex-col items-center">
                        <h6 class="text-sm text-rgbablack80 !leading-6 font-medium">
                            <span class="align-middle">4,9</span>
                            <svg class="w-2.5 h-2.5 ml-px inline-block align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                            </svg>
                        </h6>
                        <p class="text-xs text-rgbablack50">
                            <span>46K avaliações</span>
                        </p>
                        <em class="h-full absolute right-0 top-0 flex items-center">
                            <i class="w-px h-6 bg-rgbablack15"></i>
                        </em>
                    </dd>
                    <dd class="w-1/3 px-2 relative flex flex-col items-center">
                        <h6 class="text-sm text-rgbablack80 !leading-6 font-medium">
                            <span>50 mil+</span>
                        </h6>
                        <p class="text-xs text-rgbablack50">
                            <span>Downloads</span>
                        </p>
                        <em class="h-full absolute right-0 top-0 flex items-center">
                            <i class="w-px h-6 bg-rgbablack15"></i>
                        </em>
                    </dd>
                    <dd class="w-1/3 px-2 relative flex flex-col items-center">
                        <div class="py-1 flex">
                            <img :src=PwaImg.icon_time class="w-4 h-4">
                        </div>
                        <p class="text-xs text-rgbablack50">
                            <span>Rated for 18+</span>
                        </p>
                    </dd>
                </dl>
            </pu-card>
            <pu-card theme="3" class="pt-1 pb-2">
                <a @click="checkIsInstall()" href="javascript:;" class="w-full h-14 bg-pwa text-themewhite rounded-lg relative block overflow-hidden">
                    <em class="animation-btn w-8 h-full bg-themewhite absolute left-0 -top-[11.25rem] block"></em>
                    <div class="w-full h-full text-center relative flex flex-col items-center justify-center">
                        <p class="text-four">
                            <svg class="w-[1.125rem] h-[1.125rem] mr-1 inline-block align-middle" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <polygon id="路径" fill="currentColor" points="355.285691 128 732.009857 128 588.596024 418.149831 832 418.474625 321.955643 1024 468.628881 638.144031 192 638.144031"></polygon>
                                </g>
                            </svg>
                            <span class="text-[0.8125rem] align-middle">Rapid Instalar</span>
                        </p>
                        <p class="text-[0.6875rem] leading-none">Baixe dentro de 15 segundos</p>
                    </div>
                </a>
            </pu-card>
            <pu-card theme="3" class="py-3">
                <dl class="w-full text-[0.9375rem] !leading-none text-pwa flex">
                    <dd class="w-1/2 flex items-center justify-center">
                        <svg class="w-6 h-6 mr-[0.46875rem] shrink-0" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path>
                        </svg>
                        <span>Compartilhar</span>
                    </dd>
                    <dd class="w-1/2 flex items-center justify-center">
                        <svg class="w-6 h-6 mr-[0.46875rem] shrink-0" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 3H17C18.1045 3 19 3.8955 19 5V21L12 18L5 21L5.01075 5C5.01075 3.8955 5.8965 3 7 3ZM12 15.824L17 18V5H7V18L12 15.824ZM13 7V9H15V11H13V13H11V11H9V9H11V7H13Z"></path>
                        </svg>
                        <span>Adicionar à lista de desejos</span>
                    </dd>
                </dl>
            </pu-card>
            <pu-card theme="3" class="py-5">
                <div class="w-full h-[14rem] overflow-hidden">
                    <div class="w-full h-[14.5rem] overflow-x-auto">
                        <ul class="flex flex-nowrap">
                            <li v-for="item,index in pwaPageConfig.base_pwa_banner" :key="index" class="mr-3 flex shrink-0">
                                <img :src="item" class="w-auto h-[14rem] rounded-lg">
                            </li>
                        </ul>
                    </div>
                </div>
            </pu-card>
            <pu-card theme="3" class="py-3">
                <div class="w-full mb-5 flex items-center">
                    <div class="flex-1 overflow-hidden">
                        <p class="text-lg font-bold">Sobre este jogo</p>
                    </div>
                    <svg class="w-5 h-5 text-rgbablack50 shrink-0" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M41.9999 24H5.99994" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M30 12L42 24L30 36" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <article class="text-sm text-rgbablack50">
                    <!-- <p>Sobre este jogo * The Hottest Casino Slots Game of 2025 * The ring of the reels, lights on the screen, and the thrill of the win! Casino Slots bring the spectacle of Las Vegas and Macau casino slots to your fingertips! It also brings the sights and sounds of the casino experience home and stack your winnings to the sky! The more you spin, the more you win!</p> -->
                    <div v-html="pwaPageConfig.base_pwa_desc"></div>
                </article>
                <div class="mt-6">
                    <h6 class="text-sm font-medium">Atualizado em</h6>
                    <p class="text-sm text-rgbablack50">10 de fev. de 2025</p>
                </div>
                <!-- <ul class="w-full !mt-7 !mb-1 text-sm text-rgbawhite50 flex flex-wrap">
                    <li class="h-8 px-4 my-1.5 mr-3 border border-[#DADCE0] rounded-full flex items-center shrink-0">
                        <span>Cassino</span>
                    </li>
                    <li class="h-8 px-4 my-1.5 mr-3 border border-[#DADCE0] rounded-full flex items-center shrink-0">
                        <span>Caça-níqueis</span>
                    </li>
                </ul> -->
            </pu-card>
            <pu-card theme="3" class="py-3">
                <div class="w-full mb-5 flex items-center">
                    <div class="flex-1 overflow-hidden">
                        <p class="text-lg font-bold">Segurança dos dados</p>
                    </div>
                    <svg class="w-5 h-5 text-rgbablack50 shrink-0" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M41.9999 24H5.99994" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M30 12L42 24L30 36" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <article class="text-sm text-rgbablack50">
                    <p>Sua segurança começa com o entendimento de como os desenvolvedores coletam e compartilham seus dados. As práticas de segurança e privacidade de dados podem variar de acordo com o uso, a região e a idade. O desenvolvedor forneceu as informações a seguir, que podem ser atualizadas ao longo do tempo.</p>
                    <div class="w-full p-5 mt-8 border border-rgbablack15">
                        <dl class="w-full mt-5 first:mt-0 flex">
                            <dt class="mr-5 shrink-0">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.15255 8 8.19125 8.48746 8.92118 9.26746L13.1202 6.97713C13.0417 6.66441 13 6.33707 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6C21 8.20914 19.2091 10 17 10C15.8474 10 14.8087 9.51251 14.0787 8.73246L9.87977 11.0228C9.9583 11.3355 10 11.6629 10 12C10 12.3371 9.95831 12.6644 9.87981 12.9771L14.0788 15.2675C14.8087 14.4875 15.8474 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 17.6629 13.0417 17.3355 13.1202 17.0228ZM6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"></path>
                                </svg>
                            </dt>
                            <dd class="flex-1 overflow-hidden">
                                <p>Os dados não são compartilhados com terceiros</p>
                                <p>Saiba mais sobre como os desenvolvedores declaram o compartilhamento</p>
                            </dd>
                        </dl>
                        <dl class="w-full mt-5 first:mt-0 flex">
                            <dt class="mr-5 shrink-0">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811L7 21C3.64378 20.7257 1 17.9216 1 14.5ZM16.8483 18.9868C19.1817 18.8093 21 16.8561 21 14.5C21 12.927 20.1884 11.4962 18.8771 10.6781L18.0714 10.1754L17.9517 9.23338C17.5735 6.25803 15.0288 4 12 4C8.97116 4 6.42647 6.25803 6.0483 9.23338L5.92856 10.1754L5.12288 10.6781C3.81156 11.4962 3 12.927 3 14.5C3 16.8561 4.81833 18.8093 7.1517 18.9868L7.325 19H16.675L16.8483 18.9868ZM13 13V17H11V13H8L12 8L16 13H13Z"></path>
                                </svg>
                            </dt>
                            <dd class="flex-1 overflow-hidden">
                                <p>Este app pode coletar estes tipos de dados</p>
                                <p>Local, Atividade no app e Identificadores do dispositivo e outros</p>
                            </dd>
                        </dl>
                        <dl class="w-full mt-5 first:mt-0 flex">
                            <dt class="mr-5 shrink-0">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>
                                </svg>
                            </dt>
                            <dd class="flex-1 overflow-hidden">
                                <p>Os dados são criptografados em trânsito</p>
                            </dd>
                        </dl>
                        <dl class="w-full mt-5 first:mt-0 flex">
                            <dt class="mr-5 shrink-0">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                                </svg>
                            </dt>
                            <dd class="flex-1 overflow-hidden">
                                <p>Você pode solicitar a exclusão dos dados</p>
                            </dd>
                        </dl>
                        <div class="pl-2.5 mt-5">
                            <p class="text-sm text-pwa">Mais detalhes</p>
                        </div>
                    </div>
                </article>
            </pu-card>
            <pu-card theme="3" class="py-3">
                <div class="w-full mb-3 flex items-center">
                    <div class="flex-1 overflow-hidden">
                        <p class="text-lg font-bold">Classificações e resenhas</p>
                    </div>
                    <svg class="w-5 h-5 text-rgbablack50 shrink-0" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M41.9999 24H5.99994" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M30 12L42 24L30 36" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <p class="text-xs text-rgbablack50">
                    <span class="align-middle">As notas e avaliações são verificadas</span>
                    <svg class="w-4 h-4 ml-2 inline-block align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path>
                    </svg>
                </p>
                <ul class="w-full !mt-5 !mb-1 text-sm text-rgbablack50 flex flex-wrap">
                    <li class="h-8 px-4 my-1.5 mr-3 text-pwa bg-rgbawhite80 rounded-full flex items-center shrink-0">
                        <svg class="w-4 h-4 mr-2" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="11" y="4" width="26" height="40" rx="3" fill="none"/>
                            <path d="M22 10L26 10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 38H28" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Telefone</span>
                    </li>
                    <li class="h-8 px-4 my-1.5 mr-3 border border-rgbablack15 rounded-full flex items-center shrink-0">
                        <svg class="w-4 h-4 mr-2" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 30H40V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V30Z" fill="none" stroke-linejoin="round"/>
                            <path d="M40 30V6C40 4.89543 39.1046 4 38 4H10C8.89543 4 8 4.89543 8 6V30" stroke-linejoin="round"/>
                            <path d="M22 37H26" stroke-linecap="round"/>
                        </svg>
                        <span>Tablet</span>
                    </li>
                </ul>
                <dl class="pt-3 mb-4 flex">
                    <dt class="w-2/5 pr-2">
                        <h3 class="text-[3.625rem] !leading-normal">4,9</h3>
                        <div class="flex">
                            <svg v-for="item,index in 5" :key="index" class="w-3.5 h-3.5 mr-1.5 text-pwa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                            </svg>
                        </div>
                        <p class="mt-1 text-sm text-rgbablack50 font-light">1,91 mil avaliações</p>
                    </dt>
                    <dd class="w-3/5 pl-2">
                        <ol class="!pt-1 text-xs text-rgbablack50">
                            <li class="w-full h-4 mb-1 flex items-center">
                                <div class="w-6 shrink-0">5</div>
                                <div class="flex-1 overflow-hidden">
                                    <em class="w-full h-2.5 bg-rgbablack15 rounded-full flex">
                                        <i style="width: 92.644%;" class="h-full bg-pwa rounded-full flex"></i>
                                    </em>
                                </div>
                            </li>
                            <li class="w-full h-4 mb-1 flex items-center">
                                <div class="w-6 shrink-0">4</div>
                                <div class="flex-1 overflow-hidden">
                                    <em class="w-full h-2.5 bg-rgbablack15 rounded-full flex">
                                        <i style="width: 6.5445%;" class="h-full bg-pwa rounded-full flex"></i>
                                    </em>
                                </div>
                            </li>
                            <li class="w-full h-4 mb-1 flex items-center">
                                <div class="w-6 shrink-0">3</div>
                                <div class="flex-1 overflow-hidden">
                                    <em class="w-full h-2.5 bg-rgbablack15 rounded-full flex">
                                        <i style="width: 6.5445%;" class="h-full bg-pwa rounded-full flex"></i>
                                    </em>
                                </div>
                            </li>
                            <li class="w-full h-4 mb-1 flex items-center">
                                <div class="w-6 shrink-0">2</div>
                                <div class="flex-1 overflow-hidden">
                                    <em class="w-full h-2.5 bg-rgbablack15 rounded-full flex">
                                        <i style="width: 2.46073%;" class="h-full bg-pwa rounded-full flex"></i>
                                    </em>
                                </div>
                            </li>
                            <li class="w-full h-4 mb-1 flex items-center">
                                <div class="w-6 shrink-0">1</div>
                                <div class="flex-1 overflow-hidden">
                                    <em class="w-full h-2.5 bg-rgbablack15 rounded-full flex">
                                        <i style="width: 6.5445%;" class="h-full bg-pwa rounded-full flex"></i>
                                    </em>
                                </div>
                            </li>
                        </ol>
                    </dd>
                </dl>
                <ul>
                    <template v-for="item,index in comment_list" :key="index">
                        <li class="w-full py-4 block">
                            <div class="flex items-center">
                                <van-image :src="item.avatar" fit="cover" round class="w-8 h-8 mr-4 shrink-0" />
                                <div class="flex-1 overflow-hidden">
                                    <h6 class="text-sm text-rgbablack50 font-light">
                                        <span>{{ item.name }}</span>
                                    </h6>
                                </div>
                                <a href="javascript:;" class="h-8 pl-3 flex items-center shrink-0">
                                    <svg class="w-6 h-6 text-rgbablack50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                                    </svg>
                                </a>
                            </div>
                            <div class="mt-4 flex items-center">
                                <svg v-for="item,index in 5" :key="index" class="w-2.5 h-2.5 mr-1 text-pwa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                </svg>
                                <span class="ml-2 text-xs text-rgbablack50">{{ item.date }}</span>
                            </div>
                            <article class="mt-2 text-sm text-rgbablack50">
                                <p>{{ item.content }}</p>
                            </article>
                            <p class="mt-4 text-xs text-rgbablack50">
                                <span>Essa avaliação foi marcada como útil por 20 pessoas</span>
                            </p>
                            <div class="mt-3 flex items-center flex-wrap">
                                <p class="mr-5 text-xs text-rgbablack50">
                                    <span>Você achou isso útil?</span>
                                </p>
                                <a href="javascript:;" class="h-[1.375rem] px-4 my-1.5 mr-3 border border-rgbablack15 rounded-full flex items-center shrink-0">
                                    <span class="text-sm text-rgbablack50 opacity-70">Sim</span>
                                </a>
                                <a href="javascript:;" class="h-[1.375rem] px-4 my-1.5 mr-3 border border-rgbablack15 rounded-full flex items-center shrink-0">
                                    <span class="text-sm text-rgbablack50 opacity-70">Não</span>
                                </a>
                            </div>
                        </li>
                    </template>
                </ul>
                <button class="h-12 px-2 !text-sm !text-pwa !font-medium bg-transparent">
                    <span>Ver todas as avaliações</span>
                </button>
            </pu-card>
            <pu-card theme="3" class="py-3">
                <div class="w-full mb-5 flex items-center">
                    <div class="flex-1 overflow-hidden">
                        <p class="text-lg font-bold">O que há de novo</p>
                    </div>
                </div>
                <article class="text-sm text-rgbablack50">
                    <p>Olá, fãs de Fortune Tiger Slot!</p>
                    <p>Aqui está uma nova atualização:</p>
                    <br>
                    <p>-Melhorias de desempenho</p>
                    <br>
                    <p>Aproveite e divirta-se!</p>
                </article>
            
            </pu-card>
            <pu-card theme="3" class="py-3">
                <div class="w-full mb-5 flex items-center">
                    <div class="flex-1 overflow-hidden">
                        <p class="text-lg font-bold">Jogos semelhantes</p>
                    </div>
                    <div class="shrink-0">
                        <svg data-v-ebba04d0="" class="w-5 h-5 text-rgbablack50 shrink-0" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-ebba04d0="" d="M41.9999 24H5.99994" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-ebba04d0="" d="M30 12L42 24L30 36" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </div>
                </div>
                <ul class="w-full flex flex-wrap">
                    <li v-for="game in games" :key="game.id" class="w-1/2 mb-4 flex items-center">
                    <img :src="game.icon" class="w-12 h-12 mr-4 rounded-lg" />
                    <div class="flex-1 overflow-hidden">
                        <p class="text-sm font-medium truncate">{{ game.title }}</p>
                        <p class="text-xs text-rgbablack50">{{ game.rating }}</p>
                    </div>
                    </li>
                </ul>
                <div class="w-full mb-5">
                    <p class="text-sm text-medium">Sinizar como impróprio</p>
                </div>
                <div class="w-full h-px bg-rgbablack15 my-4"></div>
            </pu-card>
            <pu-card theme="3" class="py-3">
                <!-- 顶部链接 -->
                

                <!-- 中间链接 -->
                <ul class="w-full text-base text-rgbablack50 flex flex-col space-y-2">
                    <li>Vales-presente</li>

                    <li>Resgatar</li>
                    
                    <li>Política de reembolso</li>
                </ul>

                <!-- 底部链接 -->
                <div class="mt-6 text-xs text-rgbablack50 flex flex-wrap justify-between">
                    <span>Termos de Serviço</span>
                    <span>Privacidade</span>
                </div>
                <div class="mt-6 text-xs text-rgbablack50 flex flex-wrap justify-between">
                    <span>Desenvolvedores</span>
                    <span>Todos os preços incluem Tributo.</span>
                </div>

                <!-- 底部国家信息 -->
                <div class="mt-6 flex items-center">
                    <img src="https://ssl.gstatic.com/store/images/regionflags/brazil.png" alt="Brazil Flag" class="w-5 h-5 mr-2">
                    <span class="text-xs text-rgbablack50">Brasil (Português)</span>
                </div>
            </pu-card>
            <!-- <pu-card theme="3" class="py-3"> -->
                <!-- <img :src=PwaImg.img_info  @click="checkIsInstall()" class="w-full h-auto"> -->
            <!-- </pu-card> -->

            <em class="w-full h-7 block"></em>
        </section>
        
        <footer :style="`padding-bottom: ${bottom};`" class="w-full bg-themewhite text-rgbablack50 border-t border-rgbablack15 block shrink-0">
            <nav class="w-full h-[56px] flex justify-between">
                <a @click="checkIsInstall()" href="javascript:;" class="w-1/5 h-full flex flex-col items-center justify-center">
                    <div class="h-[24px]">
                        <svg fill="currentColor" width="24" height="24" viewBox="0 0 21 16" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3 8.4C19.2169 7.65213 19.0648 6.90427 18.9009 6.09902C18.8676 5.93522 18.8338 5.76904 18.8 5.6L18.8 5.59986C18.7 5.1 18.7 5.09996 18.6 4.7L18.5 4.4C18.2 1.8 16 0 13.3 0H6.7C4.1 0 1.8 1.8 1.4 4.4C1.4 4.43174 1.4 4.4534 1.3968 4.47458C1.38993 4.52014 1.36826 4.56347 1.3 4.7C1.3 5.1 1.3 5.1 1.2 5.6C1.1 6.05 1.025 6.525 0.95 7C0.875 7.475 0.8 7.95 0.7 8.4C0.1 11.9 0 12.5 0 12.7C0 14.2 1.2 15.5 2.8 15.5C3.6 15.5 4.3 15.2 4.8 14.7L7.7 11.9H12.4L15.3 14.8C15.8 15.3 16.5 15.6 17.3 15.6C18.8 15.6 20.1 14.4 20.1 12.8C20.0055 12.5165 19.911 11.9651 19.3946 8.95177L19.3 8.4ZM13 5C13.4971 5 13.9 4.59706 13.9 4.1C13.9 3.60294 13.4971 3.2 13 3.2C12.5029 3.2 12.1 3.60294 12.1 4.1C12.1 4.59706 12.5029 5 13 5ZM15.8 6C15.8 6.49706 15.3971 6.9 14.9 6.9C14.4029 6.9 14 6.49706 14 6C14 5.50294 14.4029 5.1 14.9 5.1C15.3971 5.1 15.8 5.50294 15.8 6ZM10.5 5.4C10.2 5.7 10.2 6.3 10.5 6.6C10.8 6.9 11.4 6.9 11.7 6.6C12 6.3 12 5.7 11.7 5.4C11.4 5.1 10.9 5.1 10.5 5.4ZM13 8.8C13.4971 8.8 13.9 8.39706 13.9 7.9C13.9 7.40294 13.4971 7 13 7C12.5029 7 12.1 7.40294 12.1 7.9C12.1 8.39706 12.5029 8.8 13 8.8ZM6.4 3.5H7.6V5.4H9.5V6.6H7.6V8.5H6.4V6.6H4.5V5.4H6.4V3.5ZM16.5 13.3C16.7 13.5 16.9 13.6 17.2 13.6C17.8 13.6 18.2 13.2 18.2 12.6C18.2 12.7 16.8 4.8 16.8 4.7C16.5 3 15 1.8 13.3 1.8H6.7C4.9 1.8 3.5 3 3.2 4.7C3.2 4.8 1.8 12.7 1.8 12.7C1.8 13.3 2.3 13.7 2.8 13.7C3.1 13.7 3.3 13.6 3.5 13.4L6.9 10H13.1L13.4 10.2L16.5 13.3Z"></path>
                        </svg>
                    </div>
                    <p class="text-sm text-center font-medium">
                        <span>Jogos</span>
                    </p>
                </a>
                <a @click="checkIsInstall()" href="javascript:;" class="w-1/5 h-full text-pwa flex flex-col items-center justify-center">
                    <div class="h-[24px]">
                        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 4H18C19.1 4 20 4.9 20 6V9C20 10.1 19.1 11 18 11H15C13.9 11 13 10.1 13 9V6C13 4.9 13.9 4 15 4ZM9 13H6C4.9 13 4 13.9 4 15V18C4 19.1 4.9 20 6 20H9C10.1 20 11 19.1 11 18V15C11 13.9 10.1 13 9 13ZM18 13H15C13.9 13 13 13.9 13 15V18C13 19.1 13.9 20 15 20H18C19.1 20 20 19.1 20 18V15C20 13.9 19.1 13 18 13ZM9 4H6C4.9 4 4 4.9 4 6V9C4 10.1 4.9 11 6 11H9C10.1 11 11 10.1 11 9V6C11 4.9 10.1 4 9 4Z"></path>
                        </svg>
                    </div>
                    <p class="text-sm text-center font-medium">
                        <span>Apps</span>
                    </p>
                </a>
                <a @click="checkIsInstall()" href="javascript:;" class="w-1/5 h-full flex flex-col items-center justify-center">
                    <div class="h-[24px]">
                        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 2V22H21V2H3ZM5 20H19V4H5V20ZM9 7H6V5H9V7ZM18 7H15V5H18V7ZM6 19H9V17H6V19ZM18 19H15V17H18V19ZM15 15H18V13H15V15ZM9 15H6V13H9V15ZM15 11H18V9H15V11ZM9 11H6V9H9V11Z"></path>
                        </svg>
                    </div>
                    <p class="text-sm text-center font-medium">
                        <span>Filmes</span>
                    </p>
                </a>
                <a @click="checkIsInstall()" href="javascript:;" class="w-1/5 h-full flex flex-col items-center justify-center">
                    <div class="h-[24px]">
                        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4996 6.36584L14.001 7.65237V4H11.001V7.65075L12.4996 6.36584ZM10 2H11.001H14.001H15H16.998C18.6461 2 20.001 3.35397 20.001 5.002V18.998C20.001 20.646 18.6461 22 16.998 22H4V2H10ZM18.001 5.002C18.001 4.459 17.542 4 16.998 4H16.001V12L12.5 9L9.001 12V4H6V20H16.998C17.542 20 18.001 19.541 18.001 18.998V5.002Z"></path>
                        </svg>
                    </div>
                    <p class="text-sm text-center font-medium">
                        <span>Livros</span>
                    </p>
                </a>
                <a @click="checkIsInstall()" href="javascript:;" class="w-1/5 h-full flex flex-col items-center justify-center">
                    <div class="h-[24px]">
                        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9995 20.439C13.1543 20.787 17.2264 22 17.6293 22C18.4311 22 18.928 21.578 19.154 21.325C19.7049 20.7081 19.7029 20.0604 19.6999 19.0794L19.6999 19.074C19.6989 18.647 19.6299 16.111 19.6009 15.125C20.2258 14.252 21.8914 11.907 22.1604 11.5C22.7292 10.643 23.2201 9.901 22.8972 8.908C22.5724 7.90856 21.7594 7.61034 20.8112 7.26259L20.8096 7.262C20.3747 7.103 17.7853 6.254 16.8195 5.942C16.2026 5.107 14.518 2.848 14.221 2.476L14.2198 2.47445C13.5875 1.68311 13.0416 1 11.9995 1C10.9577 1 10.4108 1.684 9.77797 2.477C9.48103 2.848 7.79639 5.107 7.18052 5.942C6.21372 6.255 3.62427 7.103 3.18436 7.265C2.24156 7.61 1.42773 7.908 1.1028 8.908C0.779871 9.901 1.27077 10.643 1.83965 11.501C2.10059 11.894 3.77424 14.252 4.39911 15.125C4.37011 16.111 4.30113 18.646 4.29913 19.074V19.0741C4.29613 20.058 4.29415 20.708 4.84501 21.324C5.06996 21.576 5.56686 22 6.37069 22C6.7726 22 10.8447 20.787 11.9995 20.439ZM17.6018 15.1838C17.6437 16.6103 17.6991 18.7493 17.6999 19.0787C17.7021 19.8051 17.6963 19.9322 17.6736 19.9767C17.5616 19.9504 17.418 19.9144 17.2472 19.8699C16.8391 19.7634 16.2949 19.6126 15.6462 19.4271C14.6587 19.1447 13.4965 18.8013 12.5766 18.5241L11.9995 18.3502L11.4224 18.5241C10.5029 18.8012 9.34041 19.1447 8.35292 19.4271C7.7042 19.6126 7.16005 19.7634 6.75206 19.8699C6.58148 19.9145 6.43802 19.9504 6.32604 19.9766C6.30304 19.9326 6.2969 19.8071 6.29912 19.0801C6.30067 18.7488 6.35718 16.5803 6.39824 15.1838L6.41807 14.5095L6.02543 13.9609C5.19866 12.8058 3.70925 10.7011 3.50581 10.3947C3.01485 9.65422 2.98744 9.57977 3.00475 9.52653C3.02422 9.46662 3.06796 9.4373 3.87165 9.1432C4.20463 9.02058 6.39401 8.29883 7.79654 7.84477L8.40835 7.64669L8.79007 7.12916C9.57143 6.06978 11.1071 4.01707 11.3394 3.72674C11.8852 3.04281 11.9401 3 11.9995 3C12.049 3 12.0824 3.02198 12.403 3.40831C12.4693 3.48831 12.5251 3.55748 12.6586 3.72451C12.8889 4.01303 14.4014 6.03473 15.2108 7.1304L15.5929 7.64752L16.2047 7.84516C17.4867 8.25931 19.7877 9.01784 20.1229 9.1404L20.1237 9.1407C20.2142 9.17389 20.2145 9.17398 20.3015 9.20614C20.9377 9.44213 20.977 9.47051 20.9951 9.52605C21.0125 9.57968 20.9851 9.65415 20.4941 10.3939C20.2859 10.7088 18.8457 12.7438 17.9746 13.9609L17.5819 14.5095L17.6018 15.1838Z"></path>
                        </svg>
                    </div>
                    <p class="text-sm text-center font-medium">
                        <span>Crianças</span>
                    </p>
                </a>
            </nav>
        </footer>

        <van-popup
            v-model:show="ios_guide_show"
            position="bottom"
            :style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-'+(bodyWidthRef/2)+'px' }"
            :overlay-style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-'+(bodyWidthRef/2)+'px' }"
            style="--van-popup-background: transparent;"
            teleport="body"
        >
            <section v-if="ios_guide_show" class="w-full h-full px-ctx py-6">
                <div class="w-full relative">
                    <img :src=PwaImg.img_guideios class="w-full h-auto block">
                    <a @click="ios_guide_show=false" href="javascript:;" class="w-14 h-14 absolute top-0 right-0 flex"></a>
                </div>
            </section>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
        <!--  -->
        <section v-if="pwa_loading_show" class="w-full h-full bg-rgbablack50 absolute left-0 top-0 z-30 flex items-center justify-center">
            <div class="w-[19.375rem] px-[24px] py-[32px] bg-themewhite text-themeblack rounded-xl">
                <div class="w-full mb-[10px] flex items-center justify-center">
                    <img :src=PwaImg.icon_down class="w-[28px] h-auto mr-[8px]">
                    <h5 class="text-[27px] text-rgbablack50 !leading-[33px]">Rapid Instalar</h5>
                </div>
                <div v-if="pwa_success_show" class="w-full py-[8px] flex flex-col items-center">
                    <div class="px-[20px] py-[4px] mb-[24px] bg-rgbawhite80 text-pwa rounded-full flex items-center">
                        <svg class="w-[16px] h-[16px] mr-[4px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM16.4524 8.22183L11.5019 13.1709L8.67421 10.3431L7.25999 11.7574L11.5026 16L17.8666 9.63604L16.4524 8.22183Z"></path>
                        </svg>
                        <span class="text-[16px] font-bold">Effective</span>
                    </div>
                    <a v-if="btn_install_show" @click="confirmSuccess()" href="javascript:;" class="w-full h-[44px] bg-pwa text-themewhite rounded-full flex items-center justify-center">
                        <span class="text-[16px] font-medium">{{ installText }}</span>
                    </a>
                    <div v-if="pwa_installing_show" class="w-full items-center justify-center">
                        <van-progress 
                            color="var(--color-pwa)"
                            stroke-width="8"
                            show-pivot = 'false'
                            :percentage="installProgress"  />
                    </div>
                </div>
                <div v-else-if="pwa_error_show" class="w-full py-[8px] flex flex-col items-center">
                    <div class="px-[20px] py-[4px] mb-[24px] bg-red-100 text-red-500 rounded-full flex items-center">
                        <svg class="w-[16px] h-[16px] mr-[4px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.8659 3.00017L22.3922 19.5002C22.6684 19.9785 22.5045 20.5901 22.0262 20.8662C21.8742 20.954 21.7017 21.0002 21.5262 21.0002H2.47363C1.92135 21.0002 1.47363 20.5525 1.47363 20.0002C1.47363 19.8246 1.51984 19.6522 1.60761 19.5002L11.1339 3.00017C11.41 2.52187 12.0216 2.358 12.4999 2.63414C12.6519 2.72191 12.7782 2.84815 12.8659 3.00017ZM10.9999 16.0002V18.0002H12.9999V16.0002H10.9999ZM10.9999 9.00017V14.0002H12.9999V9.00017H10.9999Z"></path>
                        </svg>
                        <span class="text-[16px] font-bold">Inválido</span>
                    </div>
                    <a @click="reload()" href="javascript:;" class="w-full h-[44px] bg-red-500 text-themewhite rounded-full flex items-center justify-center">
                        <span class="text-[16px] font-medium">Reiniciar</span>
                    </a>
                </div>
                <div v-else class="w-full py-[8px] flex items-center justify-center">
                    <div class="w-[100px] h-[100px] relative">
                        <em class="loading-circle w-full h-full rounded-full block"></em>
                        <div class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                            <span class="text-[16px] text-theme font-semibold">{{ counter }}%</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>

    <section v-if="ios_nosafari_show" class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[99] -translate-x-1/2 flex items-center justify-center"
        @click="ios_nosafari_show=false">
        <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
        <div class="w-full max-h-full absolute left-0 top-10">  
            <img :src=PwaImg.img_guideapp class="w-full h-auto block">
        </div>
    </section>
  
</template>
<style scoped>
.animation-btn {
    animation: shiny-btn-anim-data 4s ease-in-out infinite;
}
@keyframes shiny-btn-anim-data {
    0% {
        opacity: 0;
        transform: scale(0) rotate(45deg);
    }
    80% {
        opacity: 0.5;
        transform: scale(0) rotate(45deg);
    }
    81% {
        opacity: 1;
        transform: scale(4) rotate(45deg);
    }
    100% {
        opacity: 0;
        transform: scale(50) rotate(45deg);
    }
}
.loading-circle {
    border: 2px solid transparent;
    border-left-color: var(--color-pwa);
    border-right-color: var(--color-pwa);
    animation: turnbbb .65s linear infinite;
}
@keyframes turnbbb {
    to {
        transform: rotate(360deg);
    }
}
</style>