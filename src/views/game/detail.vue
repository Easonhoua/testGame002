<script setup>
import { onMounted, nextTick, ref } from 'vue'
import { t } from '@/i18n'
import { useWindowSize } from '@vueuse/core'
import { isAuthRef } from '@/model/user'
import { useRoute, useRouter } from 'vue-router'
import { gameUrlRef } from '@/model/game'
import { openLoginFunc,isEverLoginFunc } from '@/utils/config'
import { gameModel } from '@/model/game'
import { DayPayModel } from '@/model/other'


const route = useRoute()
const router = useRouter()
const { gameListFunc } = gameModel()
const { getdayPayInfoFunc} = DayPayModel()
const dom = ref(null)
const { width, height } = useWindowSize()
// function gohome(){
//     router.push({ name: 'home', query: { game: "game"} })
// }

onMounted(()=> {
    nextTick(()=> {
        if(!route.meta.noAuth && !isAuthRef.value) {
            if(isEverLoginFunc()) {
                openLoginFunc(0)
            }else{
                openLoginFunc(1)
            }
        }
    })
})

function toHome(){
    gameListFunc()
    getdayPayInfoFunc('home')
    router.push('/')
}

// 监听消息事件
window.addEventListener('message', function(event) {
    // 验证消息来源（可选但推荐）
    // if (event.origin !== '期望的域名') return;
    // console.log('收到关闭请求:',event);
    const message = event.data;
    
    if (message.type === 'close') {
        // 处理关闭消息
        // console.log('收到关闭请求:', message);
        // 执行关闭操作，如移除iframe
        // document.getElementById('demo-iframe').remove();
        toHome();
    }
});
</script>

<template>
    <div ref="dom" class="w-full h-dvh bg-themeblack overflow-hidden fixed left-0 top-0 z-[999]" >
        <div :style="`height: ${height}px;`" class="w-full overflow-hidden">
            <iframe :src="gameUrlRef" frameborder="0" width="100%" height="100%" scrolling="auto" allow="clipboard-write; clipboard-read; web-share bg-themeblack" ></iframe>
        </div>
        <button @click="toHome()" class="w-12 h-12 bg-rgbablack50 text-themewhite border border-themewhite rounded-full absolute left-3 top-3 z-30 flex flex-col items-center justify-center">
            <svg class="w-6 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM11 13V19H13V13H11Z"></path>
            </svg>
            <p class="text-[0.625rem] !leading-none text-center">
                <span>Lobby</span>
            </p>
        </button>
    </div>
</template>