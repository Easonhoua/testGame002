<script setup>
import { computed, ref } from 'vue'
import { t } from '@/i18n'
import { isRegisterSuccessShowRef } from '@/model/user'
import { bonusRef, pddModel } from '@/model/pdd'
import { isAuthRef } from '@/model/user'
import PddShare from './pddshare.vue'
import { openLoginFunc } from '@/utils/config'
import { useThemeImages } from '@/utils/themeimg'
import { isIphoneSE } from '@/utils/core'
const CommonImg = useThemeImages().common 
const PddImg = useThemeImages().pdd

const props = defineProps({
    modelValue: Boolean
})
const emits = defineEmits(['update:modelValue'])
let share_show = ref(false)
// 创建模型实例
const { 
    totalBonusRef, reportListRef,needBonusRef
} = pddModel()  // 注意这里需要调用 pddModel

let step_length = computed(()=> {
    let _max = 100
    let _num = parseFloat(totalBonusRef.value||0)
    let _res = _num/_max*100
    if(_res > 100) {
        _res = 100
    }
    return _res
})
function openshare() {
    if (!isAuthRef.value) {
        openLoginFunc(1)
        return
    }
    share_show.value = true
}

function close() {
    emits('update:modelValue', false)
}
</script>

<template>
    <!-- modelValue -->
     <div  v-if="modelValue">
        <section v-if="currentTemplate.value=='template_one'" class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[999] -translate-x-1/2 flex items-center justify-center">
        <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
        <div class="max-w-full relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[500px]" :class="isIphoneSE()? 'mt-10' : ''"  
            :style="{backgroundImage: `url(${PddImg.img_tanchuang})`}">

            <p class="mt-2 text-2xs text-center"><span>Receba {{ currentUnit.value }} {{  needBonusRef }} de graça</span></p>
            <a href="javascript:;" @click="close()" class="w-10 h-10 absolute right-2 top-1 flex items-center justify-center">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                </svg>
            </a>
            <pu-card theme="3" class="pt-5">
                <section class="w-full text-themeblack relative">
                    <p class="mt-2 text-xs text-center"><span>SAQUE RÁPIDO</span></p>
                    <p class="mt-2 text-xs text-center"><span>Parabéns pela sua boa sorte, você ganhou</span></p>
                    <div class="w-full h-10 pt-5 flex items-center justify-center">
                        <div class="flex items-center">
                            <img :src=CommonImg.img_money class="w-9 h-8 mr-2">
                            <b class="text-sm opacity-45">{{ currentUnit.value }}&nbsp;</b>
                        </div>
                       
                        <b class="text-3xl text-themetext"> {{ totalBonusRef}}</b>  
                    </div>
                    <div class="w-full mt-3 relative">
                        <div class="w-full h-2 bg-rgbawhite30 rounded-full">
                            <em :style="`width: ${step_length}%`" class="h-full bg-theme rounded-full overflow-hidden flex justify-end">
                                <i class="w-2 h-2 bg-themewhite rounded-full block"></i>
                            </em>
                        </div>
                        <p class="mt-2 text-xs text-center">
                            <span>Ainda é necessário&nbsp;</span>
                            <b class="text-one">{{ Number(needBonusRef-totalBonusRef).toFixed(2)<0?'0':Number(needBonusRef-totalBonusRef).toFixed(2) }}</b>
                            <span>&nbsp;para realizar do saque</span>
                        </p>
                    </div>
                    <!-- @click="close()" -->
                    <div class="w-full pt-5 flex justify-center relative z-20">
                        <button @click="openshare()" class="relative w-full h-10 px-4 !text-sm rounded-lg ctx-theme__linear capitalize">
                            <!-- <span>Entrar</span> -->
                             <span>Reivindique mais para sacar</span>
                             <img
                                    :src="CommonImg.gif_finger"
                                    class="absolute left-[70%] top-10 w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                    />
                        </button>
                    </div>

                    <div class="px-1 py-2 relative z-10">
                    <div class="scroll-list bg-rgbawhite10 rounded-2xl"> 
                        <ul class="text-xs">
                            <!-- 复制一份列表内容用于无缝滚动 -->
                            <template v-for="item,index in [...reportListRef, ...reportListRef]" :key="index">
                                <li class="w-full h-8 px-4 flex items-center justify-between">
                                    <span class="opacity-65">{{item.mobile}}</span>
                                    <span class="opacity-45">Acabou de sacar</span>
                                    <div class="flex items-center">
                                        <em class="w-4 h-4 bg-body-bg text-themewhite rounded-full not-italic flex items-center justify-center">
                                            <span class="text-[0.625rem]">{{ currentUnit.value }}</span>
                                        </em>
                                        <span class="text-one">&nbsp;{{ item.bonus }}</span>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
                </section>
            </pu-card>
            <pdd-share v-model="share_show"></pdd-share>
        </div>
        </section>
        <section v-if="currentTemplate.value=='template_two'" class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[999] -translate-x-1/2 flex items-center justify-center">
            <em class="w-full h-full bg-black/25 bg-blur absolute left-0 top-0 block"></em>
            <div class="max-w-full relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[300px] overflow-y-auto" :class="isIphoneSE()? 'mt-10' : ''" >
                <div class="flex items-center justify-between bg-gradient-to-r from-themecardlinear2 to-themecardlinear1  h-[5rem]">
                    <p class=" text-2xs text-center flex-1 ml-10 -mt-6"><span>Receba {{ currentUnit.value }} {{ needBonusRef }} de graça</span></p>
                    <a href="javascript:;" @click="close()" class="w-10 h-10 -mt-6  flex items-center justify-center">
                        <img :src=CommonImg.btn_close class="w-4 h-4">
                    </a>
                </div>
            
                <pu-card theme="3" class="bg-gradient-to-b from-card1 to-card2 rounded-3xl -mt-7">
                    <section class="w-full text-black relative p-2 text-pddcardtext">
                        <p class="mt-2 text-xs text-center"><span>SAQUE RÁPIDO</span></p>
                        <p class="mt-2 text-xs text-center"><span>Parabéns pela sua boa sorte, você ganhou</span></p>
                        <div class="w-full h-10 pt-5 flex items-center justify-center">
                            <div class="flex items-center">
                                <img :src="CommonImg.img_money" class="w-9 h-8 mr-2">
                                <b class="text-sm opacity-45">{{ currentUnit.value }}&nbsp;</b>
                            </div>
                        
                            <b class="text-3xl text-four"> {{ totalBonusRef}}</b>  
                        </div>
                        <div class="w-full mt-3 relative">
                            <div class="w-full h-2 bg-white/25 rounded-full">
                                <em :style="`width: ${step_length}%`" class="h-full bg-four rounded-full overflow-hidden flex justify-end">
                                    <i class="w-2 h-2 bg-white rounded-full block"></i>
                                </em>
                            </div>
                            <p class="mt-2 text-xs text-center">
                                <span>Ainda é necessário&nbsp;</span>
                                <b class="text-four">{{ Number(needBonusRef-totalBonusRef).toFixed(2)<0?'0':Number(needBonusRef-totalBonusRef).toFixed(2) }}</b>
                                <span>&nbsp;para realizar do saque</span>
                            </p>
                        </div>
                        <!-- @click="close()" --> 
                        <div class="w-full pt-5 flex justify-center relative z-20">
                            <button @click="openshare()" class="relative w-full h-10 px-4 !text-sm rounded-full m2-btn-ten  capitalize  text-white ">
                                <!-- <span>Entrar</span> -->
                                <span>Reivindique mais para sacar</span>
                                <img
                                    :src="CommonImg.gif_finger"
                                    class="absolute left-[70%] top-10 w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                    />
                            </button>
                        </div>

                        <div class="px-1 py-2 relative z-10">
                        <div class="scroll-list bg-white/10 rounded-2xl"> 
                            <ul class="text-xs">
                                <!-- 复制一份列表内容用于无缝滚动 -->
                                <template v-for="item,index in [...reportListRef, ...reportListRef]" :key="index">
                                    <li class="w-full h-8 px-4 flex items-center justify-between">
                                        <span class="opacity-65">{{item.mobile}}</span>
                                        <span class="opacity-45">Acabou de sacar</span>
                                        <div class="flex items-center">
                                            <em class="w-4 h-4 ctx-box-bg6  text-four  rounded-full not-italic flex items-center justify-center">
                                                <span class="text-[0.625rem]">{{ currentUnit.value }}</span>
                                            </em>
                                            <span class="text-four">&nbsp;{{ item.bonus }}</span>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                    </section>
                </pu-card>
                <pdd-share v-model="share_show"></pdd-share>
            </div>
        </section>
        <section v-if="currentTemplate.value=='template_three'" class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[999] -translate-x-1/2 flex items-center justify-center">
            <em class="w-full h-full bg-black/25 bg-blur absolute left-0 top-0 block"></em>
            <div class="max-w-full relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[300px] overflow-y-auto" :class="isIphoneSE()? 'mt-10' : ''" >
                <div class="flex items-center justify-between m3-theme-bg1  h-[5rem]">
                    <p class=" text-2xs text-center flex-1 ml-10 -mt-6 text-themetext1"><span>{{ t('pageTitle.Receive') + ' '+   currentUnit.value +' ' + needBonusRef + ' '+ t('pageTitle.forfree') }}</span></p>
                    <a href="javascript:;" @click="close()" class="w-10 h-10 -mt-6  flex items-center justify-center">
                        <img :src=CommonImg.btn_close class="w-4 h-4">
                    </a>
                </div>
            
                <pu-card theme="3" class="bg-gradient-to-b from-card1 to-card2 rounded-3xl -mt-7">
                    <section class="w-full relative p-2">
                        <p class="mt-2 text-xs text-center"><span>{{ t("activityCenter.QUICKSERVE") }}</span></p>
                        <p class="mt-2 text-xs text-center"><span>{{ t("activityCenter.wonDetail") }}</span></p>
                        <div class="w-full h-10 pt-5 flex items-center justify-center">
                            <div class="flex items-center">
                                <img :src="CommonImg.img_money" class="w-9 h-8 mr-2">
                                <b class="text-sm opacity-45 text-themetext0">{{ currentUnit.value }}&nbsp;</b>
                            </div>
                        
                            <b class="text-3xl text-themetext0"> {{ totalBonusRef}}</b>  
                        </div>
                        <div class="w-full mt-3 relative">
                            <div class="w-full h-2 bg-default-bg rounded-full">
                                <em :style="`width: ${step_length}%`" class="h-full m2-progresbar rounded-full overflow-hidden flex justify-end">
                                    <i class="w-2 h-2 bg-white rounded-full block"></i>
                                </em>
                            </div>
                            <p class="mt-2 text-xs text-center">
                                <span>{{ t('activityCenter.necessary') }}&nbsp;</span>
                                <b class="text-themetext0">{{ Number(needBonusRef-totalBonusRef).toFixed(2)<0?'0':Number(needBonusRef-totalBonusRef).toFixed(2) }}</b>
                                <span>&nbsp;{{ t('activityCenter.makewithdrawal') }}</span>
                            </p>
                        </div>
                        <!-- @click="close()" -->
                        <div class="w-full pt-5 flex justify-center relative z-20">
                            <button @click="openshare()" class="relative w-full h-10 px-4 !text-sm rounded-full m3-theme-btn1  capitalize ">
                                <!-- <span>Entrar</span> -->
                                <span>{{ t("activityCenter.Claimmore") }}</span>
                                <img
                                    :src="CommonImg.gif_finger"
                                    class="absolute left-[70%] top-10 w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                    />
                            </button>
                        </div>

                        <div class="px-1 py-2 relative z-10">
                        <div class="scroll-list bg-white/10 rounded-2xl"> 
                            <ul class="text-xs">
                                <!-- 复制一份列表内容用于无缝滚动 -->
                                <template v-for="item,index in [...reportListRef, ...reportListRef]" :key="index">
                                    <li class="w-full h-8 px-4 flex items-center justify-between">
                                        <span class="">{{item.mobile}}</span>
                                        <span class="">{{ t('activityCenter.Hejustwithdrew') }}</span>
                                        <div class="flex items-center">
                                            <em class="w-4 h-4 ctx-box-bg6  text-themetext0  rounded-full not-italic flex items-center justify-center">
                                                <span class="text-[0.625rem]">{{ currentUnit.value }}</span>
                                            </em>
                                            <span class="text-themetext0">&nbsp;{{ item.bonus }}</span>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                    </section>
                </pu-card>
                <pdd-share v-model="share_show"></pdd-share>
            </div>
        </section>
        <section v-if="currentTemplate.value=='template_four'" class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[999] -translate-x-1/2 flex items-center justify-center">
        <em class="w-full h-full bg-black/25 bg-blur absolute left-0 top-0 block"></em>
        <div class="max-w-full relative overflow-hidden rounded-2xl bg-cover m4-popcard-3 min-h-[300px] overflow-y-auto" :class="isIphoneSE()? 'mt-10' : ''" >
            <div class="flex items-center justify-between">
                <p class=" text-2xs text-center flex-1 ml-10 mt-4 "><span>Receba {{ currentUnit.value }} {{ needBonusRef }} de graça</span></p>
                <a href="javascript:;" @click="close()" class="w-10 h-10 mt-2  flex items-center justify-center">
                    <img :src=CommonImg.btn_close  class="w-4 h-4">
                </a>
            </div>
           
            <pu-card theme="3" class=" rounded-3xl ">
                <section class="w-full text-white relative p-2">
                    <p class="mt-2 text-xs text-center"><span>SAQUE RÁPIDO</span></p>
                    <p class="mt-2 text-xs text-center"><span>Parabéns pela sua boa sorte, você ganhou</span></p>
                    <div class="w-full h-10 pt-5 flex items-center justify-center">
                        <div class="flex items-center">
                            <img :src="CommonImg.img_money"  class="w-9 h-8 mr-2">
                            <b class="text-sm text-themetext0">{{ currentUnit.value }}&nbsp;</b>
                        </div>
                       
                        <b class="text-3xl text-themetext0"> {{ totalBonusRef}}</b>  
                    </div>
                    <div class="w-full mt-3 relative">
                        <div class="w-full h-2 bg-white/25 rounded-full">
                            <em :style="`width: ${step_length}%`" class="h-full allbtn rounded-full overflow-hidden flex justify-end">
                                <i class="w-2 h-2 bg-theme-btn rounded-full block"></i>
                            </em>
                        </div>
                        <p class="mt-2 text-xs text-center">
                            <span>Ainda é necessário&nbsp;</span>
                            <b class="text-themetext0">{{ Number(needBonusRef-totalBonusRef).toFixed(2)<0?'0':Number(needBonusRef-totalBonusRef).toFixed(2) }}</b>
                            <span>&nbsp;para realizar do saque</span>
                        </p>
                    </div>
                    <!-- @click="close()" -->
                    <div class="w-full pt-5 flex justify-center  relative z-20">
                        <button @click="openshare()" class="relative first-letter:w-full h-10 px-4 !text-sm rounded-full m4-nine-btn capitalize ">
                            <!-- <span>Entrar</span> -->
                             <span>Reivindique mais para sacar</span> 
                             <img
                                :src="CommonImg.gif_finger"
                                class="absolute left-[70%] top-10 w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                />
                        </button>
                    </div>

                    <div class="px-1 py-2 relative z-10">
                    <div class="scroll-list bg-white/10 rounded-2xl"> 
                        <ul class="text-xs">
                            <!-- 复制一份列表内容用于无缝滚动 -->
                            <template v-for="item,index in [...reportListRef, ...reportListRef]" :key="index">
                                <li class="w-full h-8 px-4 flex items-center justify-between">
                                    <span >{{item.mobile}}</span>
                                    <span >Acabou de sacar</span>
                                    <div class="flex items-center">
                                        <em class="w-4 h-4 bg-themetext0  rounded-full not-italic flex items-center justify-center">
                                            <span class="text-[0.625rem]">{{ currentUnit.value }}</span>
                                        </em>
                                        <span class="text-themetext0">&nbsp;{{ item.bonus }}</span>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
                </section>
            </pu-card>
            <pdd-share v-model="share_show"></pdd-share>
        </div>
    </section>
     <section v-if="currentTemplate.value=='template_five'" class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[999] -translate-x-1/2 flex items-center justify-center">
        <em class="w-full h-full bg-black/25 bg-blur absolute left-0 top-0 block"></em>
        <div class="max-w-full relative overflow-hidden rounded-2xl bg-cover bg-gradient-to-l from-thirsmodel1 to-thirsmodel2 min-h-[300px] overflow-y-auto" :class="isIphoneSE()? 'mt-10' : ''" >
            <div class="flex items-center justify-between">
                <p class=" text-2xs text-center flex-1 ml-10 mt-4 "><span>Receba {{ currentUnit.value }} {{ needBonusRef }} de graça</span></p>
                <a href="javascript:;" @click="close()" class="w-10 h-10 mt-2  flex items-center justify-center">
                    <img :src=CommonImg.btn_close  class="w-4 h-4">
                </a>
            </div>
           
            <pu-card theme="3" class=" rounded-3xl ">
                <section class="w-full text-white relative p-2">
                    <p class="mt-2 text-xs text-center"><span>SAQUE RÁPIDO</span></p>
                    <p class="mt-2 text-xs text-center"><span>Parabéns pela sua boa sorte, você ganhou</span></p>
                    <div class="w-full h-10 pt-5 flex items-center justify-center">
                        <div class="flex items-center">
                            <img :src="CommonImg.img_money"  class="w-9 h-8 mr-2">
                            <b class="text-sm text-themetext0">{{ currentUnit.value }}&nbsp;</b>
                        </div>
                       
                        <b class="text-3xl text-themetext0"> {{ totalBonusRef}}</b>  
                    </div>
                    <div class="w-full mt-3 relative">
                        <div class="w-full h-2 bg-white/25 rounded-full">
                            <em :style="`width: ${step_length}%`" class="h-full allbtn rounded-full overflow-hidden flex justify-end">
                                <i class="w-2 h-2 bg-theme-btn rounded-full block"></i>
                            </em>
                        </div>
                        <p class="mt-2 text-xs text-center">
                            <span>Ainda é necessário&nbsp;</span>
                            <b class="text-themetext0">{{ Number(needBonusRef-totalBonusRef).toFixed(2)<0?'0':Number(needBonusRef-totalBonusRef).toFixed(2) }}</b>
                            <span>&nbsp;para realizar do saque</span>
                        </p>
                    </div>
                    <!-- @click="close()" -->
                    <div class="w-full pt-5 flex justify-center  relative z-20">
                        <button @click="openshare()" class="relative first-letter:w-full h-10 px-4 !text-sm rounded-full m5-theme-btn1 capitalize ">
                            <!-- <span>Entrar</span> -->
                             <span>Reivindique mais para sacar</span> 
                             <img
                                :src="CommonImg.gif_finger"
                                class="absolute left-[70%] top-10 w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                />
                        </button>
                    </div>

                    <div class="px-1 py-2 relative z-10">
                    <div class="scroll-list bg-white/10 rounded-2xl"> 
                        <ul class="text-xs">
                            <!-- 复制一份列表内容用于无缝滚动 -->
                            <template v-for="item,index in [...reportListRef, ...reportListRef]" :key="index">
                                <li class="w-full h-8 px-4 flex items-center justify-between">
                                    <span >{{item.mobile}}</span>
                                    <span >Acabou de sacar</span>
                                    <div class="flex items-center">
                                        <em class="w-4 h-4 bg-themetext0  rounded-full not-italic flex items-center justify-center">
                                            <span class="text-[0.625rem]">{{ currentUnit.value }}</span>
                                        </em>
                                        <span class="text-themetext0">&nbsp;{{ item.bonus }}</span>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
                </section>
            </pu-card>
            <pdd-share v-model="share_show"></pdd-share>
        </div>
    </section>
     </div>

    
</template>
<style scoped>
.wheel-pen-bg-light {
    animation: wheel-light 20s linear infinite;
}
@keyframes wheel-light {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.scroll-list {
    height: 12.5rem;  /* 设置固定高度 */
    overflow: hidden;
}

.scroll-list ul {
    animation: scrollUp 20s linear infinite;
}

@keyframes scrollUp {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-50%);  /* 滚动高度为列表高度的一半 */
    }
}

/* 鼠标悬停时暂停动画 */
.scroll-list:hover ul {
    animation-play-state: paused;
}
</style>