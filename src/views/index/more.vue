<script setup>
import { onMounted,computed,ref,onDeactivated,onActivated,nextTick} from 'vue'
import { gameModel } from '@/model/game'
import { t } from '@/i18n'
import {  routeToViewFunc } from '@/model/basic'
import { useRoute,useRouter } from 'vue-router'
import { isAuthRef } from '@/model/user'
import { signInModel, redPakageStateRef, redPakageModel } from '@/model/other'
import { isIOS } from '@/utils/core'
import { hasLoadedDataRef} from '@/utils/config'
import SignIn from '@/components/pages/SignIn.vue'
import RedPakage from '@/components/pages/RedPakage.vue'
import { playBtnAudioFunc} from '@/utils/core'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
import { navListRef, getCommonConfigFunc} from '@/model/common'
import { useTemplate } from '@/utils/template'
const { currentTemplate,currentUnit } = useTemplate()
const route = useRoute()
const router = useRouter()
// const { navListRef, getHomeNavFunc } = configMOdel(false)
const { signShowRef, signConfigRef, signConfigFunc } = signInModel()
const { redPakageDataFunc, redPakageEndFunc } = redPakageModel()


// 添加滚动容器引用
const scrollContainer = ref(null)
// 添加滚动位置变量
const scrollPosition = ref(0)

// 修改保存滚动位置的方法
function saveScrollPosition() {
    if (scrollContainer.value) {
        scrollPosition.value = scrollContainer.value.scrollTop
    }
}

function onclickNav(type) {
    playBtnAudioFunc()
    routeToViewFunc(type).then(res => {
        if(res&&res.path) {
            router.push(res.path)
        }
    })
}
const heightClass = ref('h-[6.5rem]')

onMounted(() => {
    if(isAuthRef.value) {
        // getHomeNavFunc()
        signConfigFunc(false)
        redPakageDataFunc()
    }else {
        if(!hasLoadedDataRef.value) {
            signConfigFunc(false)
            redPakageDataFunc()
        }
    }
    if (isIOS()) {
        heightClass.value = 'h-[8.5rem]'
    }

    //如果navListRef为空，则加载一次
    if(navListRef.value.length==0) {
        getCommonConfigFunc()
    }
})

function countTime(time) {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
        });

        const parts = formatter.formatToParts(new Date());
        const datetimeStr = `${parts[4].value}-${parts[2].value}-${parts[0].value}T${parts[6].value}:${parts[8].value}:${parts[10].value}`;

        const now = new Date(datetimeStr).getTime(); // 正确的时间戳

    return time - now
}

// 离开页面时保存位置
onDeactivated(() => {
    saveScrollPosition()
})

// 修改恢复滚动位置的方法
onActivated(async () => {   
    if (scrollPosition.value > 0) {
        nextTick(() => {
            if (scrollContainer.value) {
                scrollContainer.value.scrollTop = scrollPosition.value
            }
        })
    }
})

</script>

<template>

    <pu-page :title="t('pageTitle.Promotion')" color="bg-body-bg">
        <div ref="scrollContainer" class="h-full overflow-y-auto" v-if="currentTemplate=='template_one'||currentTemplate=='template_two'||currentTemplate=='template_three'">
            <pu-card theme="3" class="py-4">
                <ul class="text-sm">
                    <template v-for="item,index in navListRef" :key="index">
                        
                        <li @click="onclickNav(item.activity_type)" class="list-item w-full mb-3  text-rgbawhite80 rounded-lg overflow-hidden" :class="currentTemplate=='template_one'?'bg-default-bg':'bg-gradient-to-r from-morelinear1 to-morelinear2'" >
                            <van-image :src="item.banner" lazy-load fit="cover" class="w-full h-[5.75rem]" />
                            <div class="w-full p-2 flex items-center">
                                <div class="relative w-8 h-8 mr-1 shrink-0">
                                    <van-image :src="item.icon" fit="contain" class="w-8 h-8 block"></van-image>
                                    <div v-if="item.activity_type=='sign_in'&&signConfigRef.todayStatus" class="absolute -top-1 -right-1 w-3 h-3 text-[0.5625rem] !leading-none bg-two text-themewhite border-[0.5px] border-themewhite rounded-full flex items-center justify-center">
                                        <b>1</b>
                                    </div>
                                    <div v-if="item.activity_type=='red_packet'&&redPakageStateRef.status==1" class="absolute -top-1 -right-1 w-3 h-3 text-[0.5625rem] !leading-none bg-two text-themewhite border-[0.5px] border-themewhite rounded-full flex items-center justify-center">
                                        <b>1</b>
                                    </div>
                                    <div v-if="item.count>0" class="absolute -top-1 -right-1 w-3 h-3 text-[0.5625rem] !leading-none bg-two text-themewhite border-[0.5px] border-themewhite rounded-full flex items-center justify-center">
                                        <b>{{ item.count }}</b>
                                    </div>
                                </div>
                                <div class="flex-1 overflow-hidden flex items-center">
                                    <template v-if="item.activity_type=='red_packet'">
                                        <b v-if="redPakageStateRef.status>=1">{{ item.title }}</b>
                                        <van-count-down v-else :time="redPakageStateRef.time" @finish="redPakageEndFunc()" format="HH:mm:ss" class="!text-inherit !text-sm" />
                                    </template>
                                    <b v-else>{{ item.title }}</b>
                                </div>
                                <a href="javascript:;" class="h-7 px-2 text-xs cursor-pointer shrink-0 flex items-center" 
                                :class="{
                                        'ctx-theme rounded-md': currentTemplate === 'template_one',
                                        'bg-gradient-to-b from-downloadlinear1 to-downloadlinear2 rounded-full text-themewhite': currentTemplate === 'template_two',
                                        'm3-theme-btn1 rounded-md': currentTemplate === 'template_three'
                                    }">
                                    <span>{{  t('Inprogress')  }}</span>
                                </a>
                            </div>
                        </li>
                    </template>
                </ul>
            </pu-card>
            <Panddingbottom></Panddingbottom>
        </div>

        <div ref="scrollContainer" class="h-full overflow-y-auto" v-else-if="currentTemplate == 'template_five'">
             <pu-card theme="2" class="py-4">
                <ul class="text-sm">
                    <template v-for="item,index in navListRef" :key="index">
                        <li @click="onclickNav(item.activity_type)" class="list-item relative w-full mb-3  text-rgbawhite80  overflow-hidden" :class="currentTemplate=='template_one'?'bg-default-bg':'bg-gradient-to-r from-morelinear1 to-morelinear2'" >
                            <van-image :src="item.banner" lazy-load fit="cover" class="w-full h-[7rem]"/>
                            <div class="w-full p-2 flex items-center  bg-rgbablack80 ">
                                <div class="relative w-8 h-8 mr-1 shrink-0">
                                    <van-image :src="item.icon" fit="contain" class="w-8 h-8 block"></van-image>
                                    <div v-if="item.activity_type=='sign_in'&&signConfigRef.todayStatus" class="absolute -top-1 -right-1 w-3 h-3 text-[0.5625rem] !leading-none bg-two text-themewhite border-[0.5px] border-themewhite rounded-full flex items-center justify-center">
                                        <b>1</b>
                                    </div>
                                    <div v-else-if="item.activity_type=='red_packet'&&redPakageStateRef.status==1" class="absolute -top-1 -right-1 w-3 h-3 text-[0.5625rem] !leading-none bg-two text-themewhite border-[0.5px] border-themewhite rounded-full flex items-center justify-center">
                                        <b>1</b>
                                    </div>
                                    <div v-else-if="item.count>0" class="absolute -top-1 -right-1 w-3 h-3 text-[0.5625rem] !leading-none bg-two text-themewhite border-[0.5px] border-themewhite rounded-full flex items-center justify-center">
                                        <b>{{ item.count }}</b>
                                    </div>
                                </div>
                                <div class="flex-1 overflow-hidden flex items-center text-themewhite">
                                    <template v-if="item.activity_type=='red_packet'">
                                        <b v-if="redPakageStateRef.status>=1">{{ item.title }}</b>
                                        <van-count-down v-else :time="redPakageStateRef.time" @finish="redPakageEndFunc()" format="HH:mm:ss" class="!text-inherit !text-sm" />
                                    </template>
                                    <b v-else>{{ item.title }}</b>
                                </div>
                                <a href="javascript:;" class="h-7 px-2 bg-thirsmodel1 font-bold  text-xs cursor-pointer rounded-lg flex items-center">
                                    <span class="text-themetext2 text-[0.625rem]">Em andamento</span>
                                </a>
                            </div>
                        </li>
                    </template>
                </ul>
            </pu-card>
            <Panddingbottom></Panddingbottom>
        </div>
        <div ref="scrollContainer" class="h-full overflow-y-auto" v-else>
            <pu-card theme="3" class="py-4">
                <ul class="text-sm">
                    <template v-for="item,index in navListRef" :key="index">
                        <li @click="onclickNav(item.activity_type)" class="list-item w-full mb-3 bg-rgbablack15 text-default-text rounded-lg overflow-hidden h-[11rem]">
                            <!-- <van-image :src="item.banner" lazy-load fit="cover" class="w-full h-[5.75rem]" /> -->
                             <!-- 要改的地方 -->
                            <van-image :src="item.banner" lazy-load fit="cover" class="w-full h-auto" /> 
                            <div class="w-full p-2 flex items-center bg-rgbablack80 relative bottom-[3.3rem] left-0  z-10"> 
                                <van-image :src="item.icon" fit="contain" class="w-8 h-8 mr-1 block shrink-0"></van-image>
                                
                                <div class="flex-1 overflow-hidden flex items-center gradient-text">
                                    <template v-if="item.activity_type=='red_packet'">
                                        <b v-if="redPakageStateRef.status>=1">{{ item.title }}</b>
                                        <van-count-down v-else :time="redPakageStateRef.time" @finish="redPakageEndFunc()" format="HH:mm:ss" class="!text-inherit !text-sm" />
                                    </template>
                                    <b v-else class="m4-text">{{ item.title }}</b>
                                    <div v-if="item.activity_type=='sign_in'&&signConfigRef.todayStatus" class="w-3 h-3 ml-2 text-[0.5625rem] !leading-none bg-texterror  text-three  border-[0.5px] border-white rounded-full flex items-center justify-center shrink-0">
                                        <b>1</b>
                                    </div>
                                    <div v-if="item.activity_type=='red_packet'&&redPakageStateRef.status==1" class="w-3 h-3 ml-2 text-[0.5625rem] !leading-none bg-texterror  text-three  border-[0.5px] border-white rounded-full flex items-center justify-center shrink-0">
                                        <b>1</b>
                                    </div>
                                    <template v-else>
                                        <div v-if="item.count>0" class="w-3 h-3 ml-2 text-[0.5625rem] !leading-none bg-texterror  text-three  border-[0.5px] border-white rounded-full flex items-center justify-center shrink-0">
                                            <b>{{ item.count }}</b>
                                        </div>
                                    </template>
                                </div>
                                <a href="javascript:;" class="h-7 px-2 text-xs m4-ten-btn text-theme rounded-[1rem] cursor-pointer shrink-0 flex items-center">
                                    <span>Em andamento</span>
                                </a>
                            </div>
                        </li>
                    </template>
                </ul>
            </pu-card>
            <Panddingbottom></Panddingbottom>
        </div>
        
        <sign-in></sign-in>
        <red-pakage></red-pakage>
    </pu-page>
</template>

<style scoped>
/* 添加过渡效果 */
.list-item {
    transition: transform 0.1s ease;
}

.list-item:active {
    transform: scale(0.88);
}
</style>