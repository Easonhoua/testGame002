<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick, computed } from 'vue'
import { t } from '@/i18n'
import { isHideSpinBtn,pddContentRef,pddModel } from '@/model/pdd'
import { playBtnAudioFunc } from '@/utils/core'
import pddResult from '@/views/pdd/pddresult.vue'
import pddRule from '@/views/pdd/pddrule.vue'
import { isAuthRef,  } from '@/model/user'
import PddShare from './pddshare.vue'
import PddSuccess from './pddsuccess.vue'
import { setStorage } from '@/utils/config'
import { openLoginFunc } from '@/utils/config'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const CommonImg = useThemeImages().common 
const PddImg = useThemeImages().pdd
const VipImg = useThemeImages().vip
const AgentImg = useThemeImages().agent
// 创建模型实例
const {
    totalBonusRef, lastTimeRef, spinCountRef, reportListRef, referralUsersRef, getPddInfoFunc, pddSpinFunc,withdrawCashRef,isCash,
    penListRef, spinRotateAngleRef, spinLoadingRef, spinResShowRef, spinIndexRef, pinShowRef, bonusRef,spinSuccessRef,needBonusRef
} = pddModel()  // 注意这里需要调用 pddModel


const VITE_APP_NAME = import.meta.env.VITE_APP_NAME
let share_show = ref(false)
//闪灯
let light_type = ref(0)
let light_time = ref(null)

//倒计时
let day = ref('00')
let hours = ref('00')
let minutes = ref('00')
let seconds = ref('00')
let timer = null

const documentTitle = computed(() => {
  return typeof window !== 'undefined' && window.document ? window.document.title : ''
})

// 控制滚动
const startScroll = () => {
    const scrollList = document.querySelector('.scroll-list ul')
    if (scrollList && reportListRef.value.length > 0) {
        // 复位动画
        scrollList.style.animation = 'none'
        scrollList.offsetHeight // 触发重排
        scrollList.style.animation = null
    }
}

const updateCountdown = () => {
    const diff = lastTimeRef.value

    if (diff > 0) {
        day.value = Math.floor(diff / (60 * 60 * 24))
        hours.value = Math.floor((diff % (60 * 60 * 24)) / (60 * 60))
        minutes.value = Math.floor((diff % (60 * 60)) / 60)
        seconds.value = diff % 60

        day.value = day.value >= 10 ? day.value : `0${day.value}`
        hours.value = hours.value >= 10 ? hours.value : `0${hours.value}`
        minutes.value = minutes.value >= 10 ? minutes.value : `0${minutes.value}`
        seconds.value = seconds.value >= 10 ? seconds.value : `0${seconds.value}`

        lastTimeRef.value--
    } else {
        day.value = '00'
        hours.value = '00'
        minutes.value = '00'
        seconds.value = '00'
        clearInterval(timer)
    }
}

onMounted(() => {
    light_time.value = setInterval(() => {
        light_type.value = light_type.value == 1 ? 0 : 1
    }, 500)

    getPddInfoFunc().then(() => {
        if (lastTimeRef.value > 0) {
            updateCountdown()
            timer = setInterval(updateCountdown, 1000)
        }
    })

})

// 监听数据变化重启动画
watch(() => reportListRef.value, () => {
    nextTick(() => {
        startScroll()
    })
})

onUnmounted(() => {
    clearInterval(timer);
    clearInterval(light_time.value)
})

// 添加转盘状态变量
let ruleShowRef = ref(false)

let step_length = computed(() => {
    let _max = needBonusRef.value
    let _num = parseFloat(totalBonusRef.value || 0)
    let _res = _num / _max * 100
    if (_res > 100) {
        _res = 100
    }
    return _res
})
let scroll_type = ref(0)
let scroll_list = computed(() => {
    if(scroll_type.value == 0){
        let _list =  reportListRef.value 
        return [..._list, ..._list]
    }else{
        let _list = referralUsersRef.value
        return [ ..._list]
    }
})


function openRule() {
    if (!totalBonusRef.value || totalBonusRef.value <= 0) {
        return
    }
    playBtnAudioFunc()
    ruleShowRef.value = true
}
function openShare() {
    playBtnAudioFunc()
    if (!isAuthRef.value) {
        openLoginFunc(1)
        return
    }
    
    share_show.value = true
}
function drawFunc(){
    if(isCash.value!=0){
        ruleShowRef.value = true
    }else{
        if(spinCountRef.value<= 0){
            openShare()
        }else{
            pddSpinFunc()
        }
    }
}
</script>

<template>
    <pu-page :title="t('pageTitle.Receive') + ' '+   currentUnit.value +' ' + needBonusRef + ' '+ t('pageTitle.forfree')" class="z-[999]" hideService>
        <div v-if="currentTemplate.value=='template_one'">
        <pu-card theme="3" class="pt-4">
            <div @click="openRule">
            <section class="w-full pt-5  relative">
                <i class="w-full h-[8.875rem] ctx-theme__linear rounded-xl opacity-30 absolute left-0 top-0 block"></i>
                <div class="w-full px-4 relative z-10 flex items-center justify-between">
                    <div class="flex items-center">
                        <img :src=CommonImg.img_money class="w-9 h-8 mr-2">
                        <b class="text-sm opacity-45">{{ currentUnit.value }}</b>
                    </div>
                    <b class="text-3xl text-four">{{ totalBonusRef }}</b>
                    <button @click="openRule()" :class="totalBonusRef >=needBonusRef ? '' : 'opacity-30'"
                        class="h-10 p-px rounded-xl ctx-theme">
                        <div class="h-full px-2 rounded-xl flex items-center">
                            <em
                                class="w-4 h-4 mr-1 bg-themewhite text-themetext rounded-full not-italic flex items-center justify-center">
                                <span class="text-[0.625rem]">{{ currentUnit.value }}</span>
                            </em>
                            <span class="text-xs">SACAR</span>
                        </div>
                    </button>
                </div>
                <div class="w-full px-4 mt-3 relative">
                    <div class="w-full h-2 bg-rgbawhite30 rounded-full">
                        <em :style="`width: ${step_length}%`"
                            class="h-full bg-theme rounded-full overflow-hidden flex justify-end">
                            <i class="w-2 h-2 bg-themewhite rounded-full block"></i>
                        </em>
                    </div>
                    <p class="mt-2 text-xs text-center">
                        <span>Ainda é necessário&nbsp;</span>
                        <b class="text-one">{{totalBonusRef<=needBonusRef? Number(needBonusRef - totalBonusRef).toFixed(2):0.00 }}</b>
                        <span>&nbsp;para realizar do saque</span>
                    </p>
                </div>
            </section>
            </div>
        </pu-card>

        <pu-card theme="4" class="mt-10 flex justify-center">
            <img :src=PddImg.img_pddbg class="w-full h-auto">
            <section class="w-full h-full absolute flex items-center justify-center">
                <section class="w-[13rem] h-[13rem] absolute top-[6.5rem] ">
                    <img :style="`transform: rotate(${spinRotateAngleRef}deg)`"
                        :class="spinLoadingRef ? '' : 'transition-transform duration-[3000ms] ease-out'"
                        :src=PddImg.img_spinbg class="w-full h-full ml-[-0.1rem]">
                    <img v-show="light_type == 0" :src=PddImg.img_light1
                        class="w-[14rem] h-[13rem] absolute left-[-0.18rem] top-[-0.18rem]">
                    <img v-show="light_type == 1" :src=PddImg.img_light2
                        class="w-[14rem] h-[13rem] absolute left-[-0.18rem] top-[-0.18rem]">
                    <img :src=PddImg.img_spinrow
                        class="w-[4.75rem] h-auto absolute left-1/2 -top-5 -translate-x-1/2 z-1">
                    <ul :style="`transform: rotate(${spinRotateAngleRef}deg)`"
                        :class="spinLoadingRef ? '' : 'transition-transform duration-[3000ms] ease-out'"
                        class="w-full h-full text-four absolute left-0 top-0 z-1 block">
                        <template v-for="item, index in penListRef" :key="index">
                            <li :style="`transform: rotate(${45 * index}deg);`"
                                class="w-full h-full absolute left-0 top-0 block">
                                <div class="w-full h-1/3 text-center relative flex flex-col items-center justify-center"
                                    style="transform-origin: 50% 9.375rem;">
                                    <div v-show="index == spinIndexRef && pinShowRef"
                                        class="w-full h-full absolute left-0 top-[0.625rem]">
                                        <em class="w-[4.375rem] h-[6.125rem] mx-auto wheel-pen-check flex">
                                            <svg class="w-full h-full" stroke="white" stroke-width="3" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 98">
                                                <path d="M 35 95 L 0 11 A 50 30 0 0 1 70 11 Z" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg>
                                        </em>
                                    </div>
                                    <img v-if="item.type == 'pic'" :src="item.icon"
                                        class="w-[2.5rem] h-auto block relative">
                                    <p v-if="item.type == 'num'" class="text-[1.275rem] font-bold relative">{{
                                        item.award }}</p>
                                </div>
                            </li>
                        </template>
                    </ul>
                    <div @click="drawFunc()"
                        class="w-full h-full relative -mt-[13rem] z-10 flex items-center justify-center "
                        :class="isHideSpinBtn ?  'opacity-30':'' "
                        style="cursor: pointer;">
                        <img :src=PddImg.img_pointer class="w-[4.375rem] h-auto block">
                        <p v-if="pinShowRef" class="absolute mt-5 text-xl font-bold ">
                            <span>{{ bonusRef }}</span>
                        </p>
                        <p v-else class="absolute mt-5 text-2xl font-bold ">
                            <span>{{ spinCountRef }}</span>
                        </p>
                    </div>
                </section>
            </section>
        </pu-card>
        <pu-card theme="3" class="-mt-5 relative">
            <section class="w-full flex justify-center">
                <div class="px-2.5 py-1.5 text-xs bg-rgbablack30 rounded-full">
                    <span class="opacity-65">Expira em&nbsp;</span>
                    <span><span v-if="day > 0">{{ day }}d </span>{{ hours }}:{{ minutes }}:{{ seconds }}</span>
                </div>
            </section>
            <section class="relative mt-2 px-2.5 w-full h-[3rem]" @click="openShare">
                <!-- 背景 -->
                <i class="absolute inset-0 ctx-theme__linear rounded-xl opacity-30"></i>
                <!-- 文字和图标 -->
                <div class="absolute inset-0 flex items-center justify-center text-white text-sm ">
                    <span class="flex items-center">
                        Convide amigos para ajudar com saques
                    <img :src="PddImg.img_sharebg" alt="icon" class="w-5 h-5 ml-2">
                    </span>
                </div>
            </section>

            <section class="w-full mt-3 ctx-theme rounded-3xl">
                <div class="w-full h-11 p-px text-sm overflow-hidden flex">
                    <button @click="scroll_type = 0" :class="scroll_type == 0 ? 'bg-transparent' : ' bg-theme-light  text-themetext'"
                        class="w-1/2 h-full rounded-br-[1.75rem] rounded-tl-3xl relative">
                        <svg :class="scroll_type == 0 ? 'text-theme-light' : 'opacity-0'"
                            class="w-6 h-auto absolute top-0  -right-[0.1rem]" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="currentColor">
                            <path d="M 0 0 H 24 V 24 Q 12 0, 0 0"></path>
                        </svg>
                        <span class="relative">Relatório</span>
                    </button>
                    <button @click="scroll_type = 1" :class="scroll_type == 1 ? 'bg-transparent' : 'bg-theme-light  text-themetext'"
                        class="w-1/2 h-full rounded-bl-[1.75rem] rounded-tr-3xl relative">
                        <svg :class="scroll_type == 1 ? 'text-theme-light' : 'opacity-0'"
                            class="w-6 h-auto absolute top-0 -left-[0.1rem] -rotate-90"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M 0 0 H 24 V 24 Q 12 0, 0 0"></path>
                        </svg>
                      
                        <span class="relative">Minha Referência</span>
                    </button>
                </div>
                <div class="px-1 py-2">
                    <div class="scroll-list bg-rgbawhite10 rounded-2xl" v-if="scroll_type == 0">
                        <ul class="text-xs">
                            <!-- 复制一份列表内容用于无缝滚动 -->
                            <template v-for="item, index in scroll_list" :key="index">
                                <li class="w-full h-8 px-4 flex items-center justify-between">
                                    <span class="opacity-65">{{ item.mobile }}</span>
                                    <span class="opacity-45">Acabou de sacar</span>
                                    <div class="flex items-center">
                                        <em
                                            class="w-4 h-4 bg-three text-themewhite rounded-full not-italic flex items-center justify-center">
                                            <span class="text-[0.625rem]">{{ currentUnit.value }}</span>
                                        </em>
                                        <span class="text-one">&nbsp;{{ item.bonus }}</span>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div class="scroll-list-auto bg-rgbawhite10 rounded-2xl" v-else>
                        <ul class="text-xs">
                            <!-- 复制一份列表内容用于无缝滚动 -->
                            <template v-for="item, index in scroll_list" :key="index">
                                <li class="w-full h-8 px-4 flex items-center justify-between">
                                    <span class="opacity-65">{{ item.mobile }}</span>
                                    <span class="opacity-45">Acabou de sacar</span>
                                    <div class="flex items-center">
                                        <em
                                            class="w-4 h-4 bg-three text-themewhite rounded-full not-italic flex items-center justify-center">
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
        <pu-card theme="3" class="mb-3 pt-5">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center">
                    <span>Descrição da Atividade</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
            </div>
            <article class="ctx-article p-mb text-sm text-rgbawhite50" v-html="pddContentRef" v-if="pddContentRef!=''"></article>
            <article class="ctx-article p-mb text-sm text-rgbawhite50 " v-else> 
                <p>1.Você pode iniciar um saque quando o valor acumulado atingir 100 BRL.</p>
                <p>2.Convidar amigos para se registrarem no {{ documentTitle }} irá ajudá- lo a sacar dinheiro
                    rapidamente.</p>
                <p>3. Cada usuário receberá uma única rodada grátis por dia.</p>
                <p>4.Cada usuário tem um período de validade de 3 dias para cada atividade e pode participar da
                    atividade várias
                    vezes.</p>
                <p>5.Se você receber um bônus de dinheiro extra, pode jogar jogos de graça e ganhar ainda mais dinheiro
                    real.
                </p>
                <p>6.Se você não retirar o dinheiro dentro de 3 dias,ele será perdido.</p>
            </article>
        </pu-card>

        </div>
        <div v-if="currentTemplate.value=='template_two'">
            <pu-card theme="4" class=" flex justify-center overflow-visible">
            <img :src=PddImg.img_pddbg  class="w-full h-auto">
            <section class="w-full h-full absolute flex items-center justify-center overflow-visible">
                <section class="w-[17rem] h-[17rem] absolute top-[6.75rem] overflow-visible">
                    <!-- 转盘背景 -->
                    <img :style="`transform: rotate(${spinRotateAngleRef}deg)`"
                        :class="spinLoadingRef ? '' : 'transition-transform duration-[3000ms] ease-out'"
                        :src=PddImg.img_spinbg class="w-full h-full mt-[1.25rem]">
                    
                    <!-- 指针 - 固定不旋转 -->
                    <img :src=PddImg.img_spinrow
                        class="w-[1.25rem] h-auto absolute left-1/2 -top-[0.25rem] -translate-x-1/2 z-20">
                    
                    <!-- 转盘内容 - 跟随转盘旋转，修复定位 -->
                    <ul :style="`transform: rotate(${spinRotateAngleRef}deg)`"
                        :class="spinLoadingRef ? '' : 'transition-transform duration-[3000ms] ease-out'"
                        class="w-full h-full text-one absolute left-0 top-[1.25rem] z-1 block">
                        <template v-for="item, index in penListRef" :key="index">
                            <li :style="`transform: rotate(${45 * index}deg);`" class=" w-vw h-full absolute left-[41.25%] top-0 block max-w-vw max-h-[17rem] ">
                                <div class="w-full h-1/3 text-center relative flex flex-col items-center justify-center"
                                    style="transform-origin: 50% 9.375rem;">
                                    <!--  -->
                                    <div v-show="index == spinIndexRef && pinShowRef"
                                        class="w-full h-full absolute left-[-100%] top-[0rem] z-5 translate-x-1/2">
                                        <em class="w-[6.5rem] h-[9rem] mx-auto wheel-pen-check flex ml-[-0.28rem]">
                                            <img :src=PddImg.img_light3  />
                                        </em>
                                    </div>
                                    <img :src="item.icon"
                                        class="h-[3rem] block relative" />
                                    <img :src="item.text" class="block relative" :class="item.prize=='claim'?'w-[2.7rem]':'h-[1.25rem] '"/>
                                 </div>
                            </li>
                        </template>
                    </ul>
                    
                    <!-- 中心按钮 - 固定不旋转 -->
                    <div @click="drawFunc()"
                        class="w-full h-full relative -mt-[17rem] z-30 flex items-center justify-center"
                        :class="isHideSpinBtn ? '' : ''"
                        style="cursor: pointer;">
                        <img :src=PddImg.img_pointer class="w-[4.5rem] h-auto block">
                        <p v-if="pinShowRef" class="absolute mt-5 text-xl font-bold text-themewhite">
                            <span>{{ bonusRef }}</span>
                        </p>
                        <p v-else class="absolute mt-5 text-2xl font-bold text-themewhite">
                            <span>{{ spinCountRef }}</span>
                        </p>
                    </div>
                    
                    <!-- 倒计时 - 固定不旋转 -->
                    <section class="w-full flex justify-center mt-[3rem] z-10 relative">
                        <div class="px-2.5 py-1.5 text-xs bg-black/25 rounded-full flex items-center justify-center">
                            <img :src="PddImg.icon_clock" class="w-4 h-4 mr-1.5"/>
                            <span class="text-three ">Expira em&nbsp;</span>
                            <span><span v-if="day > 0">{{ day }}d </span>{{ hours }}:{{ minutes }}:{{ seconds }}</span>
                        </div>
                    </section>
                </section>
                <div class="items-center justify-center absolute top-[9.18rem] left-0 right-0" >
                    <img  :src=PddImg.img_light1
                        class="w-auto h-[16.7rem] absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
                        :class="light_type == 0 ? 'opacity-100' : 'opacity-0'"  v-if="light_type == 0">
                    <img  :src=PddImg.img_light2
                        class="w-auto h-[16.7rem] absolute left-1/2 top-1 transform -translate-x-1/2 transition-opacity duration-500"
                        :class="light_type == 1 ? 'opacity-100' : 'opacity-0'"  v-if="light_type == 1">
                </div>
            </section>
            
        </pu-card>
        <pu-card theme="3" class="pt-4 -mt-10">
            <!-- style="background: url('/imgs/pdd/wheel-card.png') no-repeat; background-size: 100% 100%;" -->
            <section class="w-full h-[7.5rem] pt-5 text-one relative" :style="{background: `url(${PddImg.bg_card})  no-repeat` }" style="background-size: 100% 100%;">
                <!-- <i class="w-full h-[8.875rem] ctx-theme__linear rounded-xl opacity-30 absolute left-0 top-0 block"></i> -->
                <div class="w-full px-4 relative z-10 flex items-center justify-between">
                    <div class="flex items-center">
                        <img :src=CommonImg.img_money class="w-9 h-8 mr-2">
                        <span class="text-sm " style="font-weight: none ;" >{{ currentUnit.value }}</span>
                    </div>
                    <b class="text-3xl text-four">{{ totalBonusRef }}</b>
                    <button @click="openRule()" :class="totalBonusRef >=needBonusRef ? 'm2-btn-nine' : 'm2-btn-nine-false'"
                        class="h-8 px-[0.5rem] rounded-[1rem]  ">
                        <div class="h-full px-2 rounded-xl flex items-center">
                            <span class="text-xs " :class="totalBonusRef >=needBonusRef ? ' text-three ' : 'text-rgbawhite50'">SACAR</span>
                        </div>
                    </button>
                </div>
                <div class="w-full px-4 mt-3 relative">
                    <div class="w-full h-2 bg-[#1e0000] rounded-full">
                        <em :style="`width: ${step_length}%`"
                            class="h-full m2-progresbar rounded-full overflow-hidden flex justify-end">
                            <i class="w-2 h-2 bg-white rounded-full block"></i>
                        </em>
                    </div>
                    <p class="mt-2 text-xs text-center">
                        <span class="text-one ">Ainda é necessário&nbsp;</span>
                        <b class="text-four">{{totalBonusRef<=needBonusRef? Number(needBonusRef - totalBonusRef).toFixed(2):0.00 }}</b>
                        <span class="text-one ">&nbsp;para realizar do saque</span>
                    </p>
                </div>
                
            </section>
        </pu-card>

        <pu-card theme="3" class="relative">
           
            <section class="relative mt-2 px-2.5 w-full h-[3rem]" @click="openShare">
                <!-- 背景 -->
                <i class="absolute inset-0 bg-tablergba40 rounded-xl opacity-30"></i>
                <!-- 文字和图标 -->
                <div class="absolute inset-0 flex items-center justify-center text-three text-sm ">
                    <span class="flex items-center">
                        Convide amigos para ajudar com saques
                    <img :src="PddImg.img_sharebg" alt="icon" class="w-5 h-5 ml-2">
                    </span>
                </div>
            </section>
            <section class="w-full mt-3 ctx-theme rounded-3xl" :style="{background: `url(${PddImg.bg_card2})  no-repeat` }" style="background-size: 100% 100%;">
                <div class="w-full h-[2.1rem]  text-sm overflow-hidden flex" >
                    <button @click="scroll_type = 0" :class="scroll_type == 0 ? 'bg-allbtn' : ' text-three'"
                        class="w-1/2 h-full  rounded-tr-[1.2rem] rounded-tl-3xl relative">
                        <span class="relative " :class="scroll_type == 0 ? ' text-white  ': 'text-black'" >Relatório</span>
                    </button>
                    <button @click="scroll_type = 1" :class="scroll_type == 1?'bg-allbtn' : '  text-three '"
                        class="w-1/2 h-full rounded-tl-[1rem] rounded-tr-3xl relative">
                        <span class="relative " :class="scroll_type == 1 ? 'text-white': 'text-black'" >Minha Referência</span>
                    </button>
                </div>
                <div class="px-1 py-2">
                    <div class="scroll-list ctx-box-bg6 rounded-2xl" v-if="scroll_type == 0">
                        <ul class="text-xs">
                            <!-- 复制一份列表内容用于无缝滚动 -->
                            <template v-for="item, index in scroll_list" :key="index">
                                <li class="w-full h-8 px-4 flex items-center justify-between">
                                    <span >{{ item.mobile }}</span>
                                    <span >Acabou de sacar</span>
                                    <div class="flex items-center">
                                        <em
                                            class="w-4 h-4 bg-[#ff9b00] text-white  rounded-full not-italic flex items-center justify-center">
                                            <span class="text-[0.625rem]">{{ currentUnit.value }}</span>
                                        </em>
                                        <span class="text-four">&nbsp;{{ item.bonus }}</span>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div class="scroll-list-auto ctx-box-bg6 rounded-2xl" v-else>
                        <ul class="text-xs">
                            <!-- 复制一份列表内容用于无缝滚动 -->
                            <template v-for="item, index in scroll_list" :key="index">
                                <li class="w-full h-8 px-4 flex items-center justify-between">
                                    <span class="opacity-65">{{ item.mobile }}</span>
                                    <span class="opacity-45">Acabou de sacar</span>
                                    <div class="flex items-center">
                                        <em
                                            class="w-4 h-4 ctx-box-bg6  text-three  rounded-full not-italic flex items-center justify-center">
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
        <pu-card theme="3" class="mb-3 pt-5">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-four"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center text-four">
                    <span>Descrição da Atividade</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"></em>
            </div>
            
            <article class="ctx-article p-mb text-sm text-theme" v-html="pddContentRef" v-if="pddContentRef!=''"></article>
            <article class="ctx-article p-mb text-sm text-theme " v-else> 
                <p>1.Você pode iniciar um saque quando o valor acumulado atingir 100 BRL.</p>
                <p>2.Convidar amigos para se registrarem no {{documentTitle}} irá ajudá- lo a sacar dinheiro
                    rapidamente.</p>
                <p>3. Cada usuário receberá uma única rodada grátis por dia.</p>
                <p>4.Cada usuário tem um período de validade de 3 dias para cada atividade e pode participar da
                    atividade várias
                    vezes.</p>
                <p>5.Se você receber um bônus de dinheiro extra, pode jogar jogos de graça e ganhar ainda mais dinheiro
                    real.
                </p>
                <p>6.Se você não retirar o dinheiro dentro de 3 dias,ele será perdido.</p>
            </article>
        </pu-card>
        </div>
        <div v-if="currentTemplate.value=='template_three'">
            <pu-card theme="4" class="flex justify-center overflow-visible">
            <img :src=PddImg.img_pddbg  class="w-full h-auto">
            <section class="w-full h-full absolute flex items-center justify-center overflow-visible">
                <section class="w-[17rem] h-[17rem] absolute top-[6.75rem] overflow-visible">
                    <!-- 转盘背景 -->
                    <img :style="`transform: rotate(${spinRotateAngleRef}deg)`"
                        :class="spinLoadingRef ? '' : 'transition-transform duration-[3000ms] ease-out'"
                        :src=PddImg.img_spinbg class="w-full h-full mt-[1.25rem]">
                    
                    <!-- 指针 - 固定不旋转 -->
                    <img :src=PddImg.img_spinrow
                        class="w-[1.25rem] h-auto absolute left-1/2 -top-[0.25rem] -translate-x-1/2 z-20">
                    
                    <!-- 转盘内容 - 跟随转盘旋转，修复定位 -->
                    <ul :style="`transform: rotate(${spinRotateAngleRef}deg)`"
                        :class="spinLoadingRef ? '' : 'transition-transform duration-[3000ms] ease-out'"
                        class="w-full h-full text-one absolute left-0 top-[1.25rem] z-1 block">
                        <template v-for="item, index in penListRef" :key="index">
                            <li :style="`transform: rotate(${45 * index}deg);`" class=" w-vw h-full absolute left-[41.25%] top-0 block max-w-vw max-h-[17rem] ">
                                <div class="w-full h-1/3 text-center relative flex flex-col items-center justify-center"
                                    style="transform-origin: 50% 9.375rem;">
                                    <div v-show="index == spinIndexRef && pinShowRef"
                                        class="w-full h-full absolute left-[-100%] top-[0rem] z-5 translate-x-1/2">
                                        <em class="w-[6rem] h-[9rem] mx-auto wheel-pen-check flex">
                                            <svg class="w-full h-full" stroke="white" stroke-width="3" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 98">
                                                <path d="M 35 95 L 0 11 A 50 30 0 0 1 70 11 Z" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg>
                                        </em>
                                    </div>
                                    <img :src="item.icon"
                                        class="h-[3rem] block relative" />
                                    <img :src="item.text" class="block relative" :class="item.prize=='claim'?'w-[2.7rem]':'h-[1.25rem] '"/>
                                 </div>
                            </li>
                        </template>
                    </ul>
                    
                    <!-- 中心按钮 - 固定不旋转 -->
                    <div @click="drawFunc()"
                        class="w-full h-full relative -mt-[17rem] z-30 flex items-center justify-center"
                        :class="isHideSpinBtn ? 'opacity-30' : ''"
                        style="cursor: pointer;">
                        <img :src=PddImg.img_pointer class="w-[4.5rem] h-auto block">
                        <p v-if="pinShowRef" class="absolute mt-5 text-xl font-bold text-three">
                            <span>{{ bonusRef }}</span>
                        </p>
                        <p v-else class="absolute mt-5 text-2xl font-bold text-three">
                            <span>{{ spinCountRef }}</span>
                        </p>
                    </div>
                    
                    <!-- 倒计时 - 固定不旋转 -->
                    <section class="w-full flex justify-center mt-[3rem] z-10 relative">
                        <div class="px-2.5 py-1.5 text-xs bg-black/25 rounded-full flex items-center justify-center">
                            <img :src="PddImg.icon_clock" class="w-4 h-4 mr-1.5"/>
                            <span class="text-themetext1 ">{{ t('activityCenter.Expiresin') }}&nbsp;</span>
                            <span><span v-if="day > 0">{{ day }}d </span>{{ hours }}:{{ minutes }}:{{ seconds }}</span>
                        </div>
                    </section>
                </section>
                <div class="items-center justify-center absolute top-[9.18rem] left-0 right-0" >
                    <img  :src=PddImg.img_light1
                        class="w-auto h-[16.7rem] absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
                        :class="light_type == 0 ? 'opacity-100' : 'opacity-0'"  v-if="light_type == 0">
                    <img  :src=PddImg.img_light2
                        class="w-auto h-[16.7rem] absolute left-1/2 top-1 transform -translate-x-1/2 transition-opacity duration-500"
                        :class="light_type == 1 ? 'opacity-100' : 'opacity-0'"  v-if="light_type == 1">
                </div>
            </section>
            </pu-card>
            <pu-card theme="2" class="pt-4 -mt-10">
                <!-- style="background: url('/imgs/pdd/wheel-card.png') no-repeat; background-size: 100% 100%;" -->
                <section class="w-full h-[7.5rem] pt-5 text-three relative" :style="{background: `url(${PddImg.bg_card})  no-repeat` }" style="background-size: 100% 100%;">
                    <!-- <i class="w-full h-[8.875rem] ctx-theme__linear rounded-xl opacity-30 absolute left-0 top-0 block"></i> -->
                    <div class="w-full px-4 relative z-10 flex items-center justify-between">
                        <div class="flex items-center">
                            <img :src=CommonImg.img_money class="w-9 h-8 mr-2">
                            <b class="text-sm text-themetext0">{{ currentUnit.value }}</b>
                        </div>
                        <b class="text-3xl text-themetext0">{{ totalBonusRef }}</b>
                        <button @click="openRule()" :class="totalBonusRef >=needBonusRef ? 'm3-theme-btn1' : 'm3-theme-btn3'"
                            class="h-8 px-[0.5rem] rounded-[1rem]  ">
                            <div class="h-full px-2 rounded-xl flex items-center">
                                <span class="text-xs">SACAR</span>
                            </div>
                        </button>
                    </div>
                    <div class="w-full px-4 mt-3 relative">
                        <div class="w-full h-2 bg-default-bg rounded-full">
                            <em :style="`width: ${step_length}%`"
                                class="h-full bg-theme m2-progresbar rounded-full overflow-hidden flex justify-end">
                                <i class="w-2 h-2 bg-white rounded-full block"></i>
                            </em>
                        </div>
                        <p class="mt-2 text-xs text-center">
                            <span class="text-themetext1">{{ t('activityCenter.necessary') }}&nbsp;</span>
                            <b class="text-themetext0">{{totalBonusRef<=needBonusRef? Number(needBonusRef - totalBonusRef).toFixed(2):0.00 }}</b>
                            <span class="text-themetext1 ">&nbsp;{{ t('activityCenter.makewithdrawal') }}</span>
                        </p>
                    </div>
                    
                </section>
            </pu-card>

            <pu-card theme="3" class="relative">
            
                <section class="relative mt-2 px-2.5 w-full h-[3rem]" @click="openShare">
                    <!-- 背景 -->
                    <i class="absolute inset-0 m3-theme-bg1 rounded-xl opacity-30"></i>
                    <!-- 文字和图标 -->
                    <div class="absolute inset-0 flex items-center justify-center text-themetext2 text-sm ">
                        <span class="flex items-center">
                            {{ t('activityCenter.invitedetail') }}
                        <img :src="PddImg.img_sharebg" alt="icon" class="w-5 h-5 ml-2">
                        </span>
                    </div>
                </section>

                <section class="w-full mt-3 ctx-theme rounded-3xl" :style="{background: `url(${PddImg.bg_card2})  no-repeat` }" style="background-size: 100% 100%;">
                    <div class="w-full h-[2rem]  text-sm overflow-hidden flex">
                        <button @click="scroll_type = 0"
                            class="w-1/2 h-full rounded-tr-[1.2rem] rounded-tl-3xl relative bg-transparent border-0"
                            :style="scroll_type == 0 ? { backgroundImage: `url(${PddImg.bg_card1})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' } : {}">
                            <span class="relative z-[1]" :class="scroll_type == 0 ? ' text-themewhtie  ': 'text-themetext2'" >{{ t('activityCenter.Report') }}</span>
                        </button>
                        <button @click="scroll_type = 1"
                            class="w-1/2 h-full rounded-tl-[1rem] rounded-tr-3xl relative bg-transparent border-0"
                            :style="scroll_type == 1 ? { backgroundImage: `url(${PddImg.bg_card1})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' } : {}">
                            <span class="relative z-[1]" :class="scroll_type == 1 ? 'text-themewhtie': 'text-themetext2'" >{{  t('activityCenter.MyReference')  }}</span>
                        </button>
                    </div>
                    <div class="px-1 py-2">
                        <div class="scroll-list ctx-box-bg6 rounded-2xl" v-if="scroll_type == 0">
                            <ul class="text-xs">
                                <!-- 复制一份列表内容用于无缝滚动 -->
                                <template v-for="item, index in scroll_list" :key="index">
                                    <li class="w-full h-8 px-4 flex items-center justify-between">
                                        <span >{{ item.mobile }}</span>
                                        <span >{{ t("activityCenter.Hejustwithdrew") }}</span>
                                        <div class="flex items-center">
                                            <em
                                                class="w-4 h-4 bg-[#ff9b00] text-white  rounded-full not-italic flex items-center justify-center">
                                                <span class="text-[0.625rem]">{{ currentUnit.value }}</span>
                                            </em>
                                            <span class="text-themetext0">&nbsp;{{ item.bonus }}</span>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                        </div>
                        <div class="scroll-list-auto ctx-box-bg6 rounded-2xl" v-else>
                            <ul class="text-xs">
                                <!-- 复制一份列表内容用于无缝滚动 -->
                                <template v-for="item, index in scroll_list" :key="index">
                                    <li class="w-full h-8 px-4 flex items-center justify-between">
                                        <span class="opacity-65">{{ item.mobile }}</span>
                                        <span class="opacity-45"> {{ t("activityCenter.Hejustwithdrew") }}</span>
                                        <div class="flex items-center">
                                            <em
                                                class="w-4 h-4 ctx-box-bg6  text-three  rounded-full not-italic flex items-center justify-center">
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
            <pu-card theme="3" class="mb-3 pt-5">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                        <span>{{ t('ActivityDescription') }}</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-themetext3" v-html="pddContentRef" v-if="pddContentRef"></article>
                <article class="ctx-article p-mb text-sm text-themetext3 " v-else> 
                    <p>1.Você pode iniciar um saque quando o valor acumulado atingir 100 BRL.</p>
                    <p>2.Convidar amigos para se registrarem no {{documentTitle}} irá ajudá- lo a sacar dinheiro
                        rapidamente.</p>
                    <p>3. Cada usuário receberá uma única rodada grátis por dia.</p>
                    <p>4.Cada usuário tem um período de validade de 3 dias para cada atividade e pode participar da
                        atividade várias
                        vezes.</p>
                    <p>5.Se você receber um bônus de dinheiro extra, pode jogar jogos de graça e ganhar ainda mais dinheiro
                        real.
                    </p>
                    <p>6.Se você não retirar o dinheiro dentro de 3 dias,ele será perdido.</p>
                </article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value=='template_four'">
            <pu-card theme="4" class=" flex justify-center overflow-visible mt-[-5rem]">
            <img :src=PddImg.img_pddbg class="w-full h-auto">
            <section class="w-full h-full absolute flex items-center justify-center overflow-visible">
                <section class="w-[17rem] h-[17rem] absolute  top-[6.75rem] overflow-visible">
                    <!-- 转盘背景 -->
                    <img :style="`transform: rotate(${spinRotateAngleRef}deg)`"
                        :class="spinLoadingRef ? '' : 'transition-transform duration-[3000ms] ease-out'"
                        :src=PddImg.img_spinbg class="w-full h-full mt-[1.25rem]">
                    
                    <!-- 指针 - 固定不旋转 -->
                    <img :src=PddImg.img_spinrow
                        class="w-[1.25rem] h-auto absolute left-1/2 -top-[0.25rem] -translate-x-1/2 z-20">
                    
                    <!-- 转盘内容 - 跟随转盘旋转，修复定位 -->
                    <ul :style="`transform: rotate(${spinRotateAngleRef}deg)`"
                        :class="spinLoadingRef ? '' : 'transition-transform duration-[3000ms] ease-out'"
                        class="w-full h-full text-one absolute left-0 top-[1.25rem] z-1 block">
                        <template v-for="item, index in penListRef" :key="index">
                            <li :style="`transform: rotate(${45 * index}deg);`" class=" w-vw h-full absolute left-[41.25%] top-0 block max-w-vw max-h-[17rem] ">
                                <div class="w-full h-1/3 text-center relative flex flex-col items-center justify-center"
                                    style="transform-origin: 50% 9.375rem;">
                                    <div v-show="index == spinIndexRef && pinShowRef"
                                        class="w-full h-full absolute left-[-100%] top-[0rem] z-5 translate-x-1/2">
                                        <em class="w-[6rem] h-[9rem] mx-auto wheel-pen-check flex">
                                            <svg class="w-full h-full" stroke="white" stroke-width="3" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 98">
                                                <path d="M 35 95 L 0 11 A 50 30 0 0 1 70 11 Z" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg>
                                        </em>
                                    </div>
                                    <img :src="item.icon"
                                        class="h-[3rem] block relative" />
                                    <img :src="item.text" class="block relative" :class="item.prize=='claim'?'w-[2.7rem]':'h-[1.25rem] '"/>
                                 </div>
                            </li>
                        </template>
                    </ul>
                    
                    <!-- 中心按钮 - 固定不旋转 -->
                    <div @click="drawFunc()"
                        class="w-full h-full relative -mt-[17rem] z-30 flex items-center justify-center"
                        :class="isHideSpinBtn ? 'opacity-30' : ''"
                        style="cursor: pointer;">
                        <img :src=PddImg.img_pointer  class="w-[4.5rem] h-auto block">
                        <p v-if="pinShowRef" class="absolute mt-5 text-xl font-bold text-three">
                            <span>{{ bonusRef }}</span>
                        </p>
                        <p v-else class="absolute mt-5 text-2xl font-bold text-three">
                            <span>{{ spinCountRef }}</span>
                        </p>
                    </div>
                    
                   
                </section>
                <div class="items-center justify-center absolute top-[9.18rem] left-0 right-0" >
                    <img :src=PddImg.img_light1
                        class="w-auto h-[16.7rem] absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
                        :class="light_type == 0 ? 'opacity-100' : 'opacity-0'"  v-if="light_type == 0">
                    <img :src=PddImg.img_light2
                        class="w-auto h-[16.7rem] absolute left-1/2 top-1 transform -translate-x-1/2 transition-opacity duration-500"
                        :class="light_type == 1 ? 'opacity-100' : 'opacity-0'"  v-if="light_type == 1">
                </div>
            </section>
            
        </pu-card>

        <pu-card theme="3" class="pt-4 !-mt-20">
            <div @click="openRule">
            <section class="w-full  pt-5 text-three relative  overflow-hidden" 
            :style="{background: `url(${PddImg.bg_card})  no-repeat` }" style="background-size: 100% 100%;" >
                <!-- <i class="w-full h-[8.875rem] ctx-theme__linear rounded-xl opacity-30 absolute left-0 top-0 block"></i> -->
                <div class="w-full px-4 relative z-10 flex items-center justify-between">
                    <div class="flex items-center">
                        <img :src="VipImg.icon_vip" alt="" class="w-[1.5rem] h-[1.5rem] mr-1" />
                        <b class="text-sm m4-text mr-1">{{ currentUnit.value }}</b>
                        <b class="text-3xl text-themetext0 mr-1">{{ totalBonusRef }}</b>
                    </div>
                    <button @click="openRule()" :class="totalBonusRef >=needBonusRef ? 'm4-nine-btn font-bold' : 'bg-theme'"
                        class="h-8 px-[0.5rem] rounded-[1rem]  ">
                        <div class="h-full px-2 rounded-xl flex items-center">
                            <span class="text-xs " :class="totalBonusRef >=needBonusRef ? ' text-theme ' : ' text-white/20'">SACAR</span>
                        </div>
                    </button>
                </div>
                <div class="bg-black/20 px-2 py-3">
                      <!-- 倒计时 - 固定不旋转 -->
                 <section class="w-full flex justify-start px-2">
                        <div class=" text-xs flex items-start justify-start">
                            <img :src="AgentImg.icon_date" class="w-[1rem] h-[1rem] mr-1"/>
                            <span class="m4-text">Expira em&nbsp;:</span>
                            <span class="text-white"><span v-if="day > 0">{{ day }}d </span>{{ hours }}:{{ minutes }}:{{ seconds }}</span>
                        </div>
                    </section>
                <div class="w-full px-2 mt-3 flex align-center items-center  ">
                    <img :src="CommonImg.icon_rich_warn" alt="" class="w-[1rem] h-[1rem] mr-1"/>
                    <p class=" text-xs text-center">
                        <span class="text-white ">Ainda é necessário&nbsp;</span>
                        <b class="text-themetext0">{{ currentUnit.value }}{{totalBonusRef<=needBonusRef? Number(needBonusRef - totalBonusRef).toFixed(2):0.00 }}</b>
                        <span class="text-white ">&nbsp;para realizar do saque</span>
                    </p>
                </div>

                </div>
               
                
            </section>
            </div>
        </pu-card>

        <pu-card theme="3" class="relative">
           
            <!-- <section class="w-full flex justify-center mt-3" @click="openShare()">
                    <img src="/imgs/pdd/pdd_share.png" style=" width: 100%;"/>
            </section> -->

            <section class="relative mt-2  w-full h-[3rem]" @click="openShare()">
                <!-- 背景 -->
                <!-- 文字和图标 -->
                <div class="w-full py-2 inset-0 flex items-center justify-center text-white text-sm m4-boxitem rounded-full">
                    <span class="flex items-center m4-text">
                        <img :src="PddImg.img_sharebg" alt="icon" class="w-5 h-5 mr-2">
                        Convide amigos para ajudar com saques
                    
                    </span>
                </div>
            </section>
            <section class="w-full mt-3 bg-tablebg rounded-lg" >
                <div class="w-full py-2  text-sm overflow-hidden flex items-center justify-between align-center px-3">
                    <button @click="scroll_type = 0" :class="scroll_type == 0 ? 'allbtn' : 'border border-white/20 bg-black/30 '"
                        class=" px-6 py-2 h-full   rounded-3xl relative">
                        <!-- <svg :class="scroll_type == 0 ? 'text-theme-light' : 'opacity-0'"
                            class="w-6 h-auto absolute top-0 -right-[1.4375rem] -rotate-90"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M 0 0 H 24 V 24 Q 12 0, 0 0"></path>
                        </svg> -->
                        <span class="relative font-bold " :class="scroll_type == 0 ? ' text-theme  ': 'text-white'" >Relatório</span>
                    </button>
                    <button @click="scroll_type = 1" :class="scroll_type == 1?'allbtn' : ' border border-white/20 bg-black/30'"
                        class="px-6 py-2  h-full rounded-3xl relative">
                        <!-- <svg :class="scroll_type == 1 ? 'text-theme-light' : 'opacity-0'"
                            class="w-6 h-auto absolute top-0 -left-[1.375rem]" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="currentColor">
                            <path d="M 0 0 H 24 V 24 Q 12 0, 0 0"></path>
                        </svg> -->
                        <span class="relative " :class="scroll_type == 1 ? 'text-theme  ': 'text-white'" >Minha Referência</span>
                    </button>
                </div>
                <div class="">
                    <div class="scroll-list " v-if="scroll_type == 0">
                        <ul class="text-xs">
                            <!-- 复制一份列表内容用于无缝滚动 -->
                            <template v-for="item, index in scroll_list" :key="index">
                                <li class="w-full h-8 px-4 flex items-center justify-between odd:bg-black/20" >
                                    <span >{{ item.mobile }}</span>
                                   
                                    <div class="flex items-center ">
                                        <span >Acabou de sacar &nbsp;</span>
                                        <span class="text-themetext0">{{ currentUnit.value }} &nbsp;{{ item.bonus }}</span>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div class="scroll-list-auto bg-themefont rounded-2xl" v-else>
                        <ul class="text-xs">
                            <!-- 复制一份列表内容用于无缝滚动 -->
                            <template v-for="item, index in scroll_list" :key="index">
                                <li class="w-full h-8 px-4 flex items-center justify-between">
                                    <span class="opacity-65">{{ item.mobile }}</span>
                                    <span class="opacity-45">Acabou de sacar</span>
                                    <div class="flex items-center">
                                        <em
                                            class="w-4 h-4 ctx-box-bg6  text-three  rounded-full not-italic flex items-center justify-center">
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
        <pu-card theme="3" class="mb-3 pt-5">
            <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                <span>Descrição da Atividade:</span>
            </h5>
            
            <article class="p-mb text-sm text-themetext3" v-html="pddContentRef" v-if="pddContentRef!=''"></article>
            <article class="p-mb text-sm text-themetext3" v-else>
                <p>1.Você pode iniciar um saque quando o valor acumulado atingir 100 BRL.</p>
                <p>2.Convidar amigos para se registrarem no {{ documentTitle }} irá ajudá- lo a sacar dinheiro
                    rapidamente.</p>
                <p>3. Cada usuário receberá uma única rodada grátis por dia.</p>
                <p>4.Cada usuário tem um período de validade de 3 dias para cada atividade e pode participar da
                    atividade várias
                    vezes.</p>
                <p>5.Se você receber um bônus de dinheiro extra, pode jogar jogos de graça e ganhar ainda mais dinheiro
                    real.
                </p>
                <p>6.Se você não retirar o dinheiro dentro de 3 dias,ele será perdido.</p>
            </article>
        </pu-card>
        </div>
        <div v-if="currentTemplate.value=='template_five'">
            <pu-card theme="4">
            <img :src=PddImg.m5_bg class="w-full h-auto">
            <img :src=PddImg.img_pddbg class="w-[84%] h-auto absolute left-1/2 top-10 -translate-x-1/2">
            <section class="w-full  absolute top-0 flex justify-center overflow-visible">
                <section class="w-[17rem] h-[17rem] absolute  top-[2.75rem] overflow-visible">
                    <!-- 转盘背景 -->
                    <img :style="`transform: rotate(${spinRotateAngleRef}deg)`"
                        :class="spinLoadingRef ? '' : 'transition-transform duration-[3000ms] ease-out'"
                        :src=PddImg.img_spinbg class="w-full h-full mt-[1.25rem]">
                    
                    <!-- 指针 - 固定不旋转 -->
                    <img :src=PddImg.img_spinrow
                        class="w-[1.25rem] h-auto absolute left-1/2 -top-[0.25rem] -translate-x-1/2 z-20">
                    
                    <!-- 转盘内容 - 跟随转盘旋转，修复定位 -->
                    <ul :style="`transform: rotate(${spinRotateAngleRef}deg)`"
                        :class="spinLoadingRef ? '' : 'transition-transform duration-[3000ms] ease-out'"
                        class="w-full h-full text-one absolute left-0 top-[1.25rem] z-1 block">
                        <template v-for="item, index in penListRef" :key="index">
                            <li :style="`transform: rotate(${45 * index}deg);`" class=" w-vw h-full absolute left-[41.25%] top-0 block max-w-vw max-h-[17rem] ">
                                <div class="w-full h-1/3 text-center relative flex flex-col items-center justify-center"
                                    style="transform-origin: 50% 9.375rem;">
                                    <div v-show="index == spinIndexRef && pinShowRef"
                                        class="w-full h-full absolute left-[-100%] top-[0rem] z-5 translate-x-1/2">
                                        <em class="w-[6rem] h-[9rem] mx-auto wheel-pen-check flex">
                                            <svg class="w-full h-full" stroke="white" stroke-width="3" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 98">
                                                <path d="M 35 95 L 0 11 A 50 30 0 0 1 70 11 Z" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg>
                                        </em>
                                    </div>
                                    <img :src="item.icon"
                                        class="h-[3rem] block relative" />
                                    <img :src="item.text" class="block relative" :class="item.prize=='claim'?'w-[2.7rem]':'h-[1.25rem] '"/>
                                 </div>
                            </li>
                        </template>
                    </ul>
                    
                    <!-- 中心按钮 - 固定不旋转 -->
                    <div @click="drawFunc()"
                        class="w-full h-full relative -mt-[17.8rem] z-30 flex items-center justify-center"
                        :class="isHideSpinBtn ? 'opacity-30' : ''"
                        style="cursor: pointer;">
                        <img :src=PddImg.img_pointer  class="w-[4.5rem] h-auto block">
                        <p v-if="pinShowRef" class="absolute mt-5 text-xl font-bold text-three">
                            <span>{{ bonusRef }}</span>
                        </p>
                        <p v-else class="absolute mt-5 text-2xl font-bold text-three">
                            <span>{{ spinCountRef }}</span>
                        </p>
                    </div>
                    
                   
                </section>
                <div class="items-center justify-center absolute top-[5.18rem] left-0 right-0" >
                    <img :src=PddImg.img_light1
                        class="w-auto h-[16.7rem] absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
                        :class="light_type == 0 ? 'opacity-100' : 'opacity-0'"  v-if="light_type == 0">
                    <img :src=PddImg.img_light2
                        class="w-auto h-[16.7rem] absolute left-1/2 top-1 transform -translate-x-1/2 transition-opacity duration-500"
                        :class="light_type == 1 ? 'opacity-100' : 'opacity-0'"  v-if="light_type == 1">
                </div>
            </section>
            
        </pu-card>

        <pu-card theme="2" class="-mt-20">
            <div @click="openRule">
        <section class="w-full  pt-5 text-three relative  overflow-hidden  -mt-14" 
            :style="{background: `url(${PddImg.bg_card})  no-repeat` }" style="background-size: 100% 100%;" >
                <!-- <i class="w-full h-[8.875rem] ctx-theme__linear rounded-xl opacity-30 absolute left-0 top-0 block"></i> -->
                <div class="w-full px-4 relative z-10 flex items-center justify-between">
                    <div class="flex items-center">
                        <img :src="VipImg.icon_vip" alt="" class="w-[1.5rem] h-[1.5rem] mr-2" />
                        <b class="text-sm text-themetext0 mr-2">{{ currentUnit.value }} </b>
                        <b class="text-4xl text-themetext0 mr-1">{{ totalBonusRef }}</b>
                    </div>
                    <button @click="openRule()" :class="totalBonusRef >=needBonusRef ? 'm5-theme-btn1 font-bold' : 'bg-rgbablack50'"
                        class="h-8 px-[0.5rem] rounded-[1rem]  ">
                        <div class="h-full px-2 rounded-xl flex items-center">
                            <span class="text-xs " :class="totalBonusRef >=needBonusRef ? ' text-themewhite ' : ' text-white/20'">SACAR</span>
                        </div>
                    </button>
                </div>
                <div class="px-2 py-3">
                      <!-- 倒计时 - 固定不旋转 -->
                 <section class="w-full flex justify-start px-2 pt-4 pb-2">
                        <div class=" text-xs flex items-start justify-start">
                            <img :src="AgentImg.icon_date" class="w-[1rem] h-[1rem] mr-1"/>
                            <span class="text-t">Expira em&nbsp;:</span>
                            <span class="text-white"><span v-if="day > 0">{{ day }}d </span>{{ hours }}:{{ minutes }}:{{ seconds }}</span>
                        </div>
                    </section>
                <div class="w-full px-2  flex align-center items-center  ">
                    <img :src="CommonImg.icon_rich_warn" alt="" class="w-[1rem] h-[1rem] mr-1"/>
                    <p class=" text-xs text-center">
                        <span class="text-white ">Ainda é necessário&nbsp;</span>
                        <b class="text-themetext0">{{ currentUnit.value }}{{totalBonusRef<=needBonusRef? Number(needBonusRef - totalBonusRef).toFixed(2):0.00 }}</b>
                        <span class="text-white ">&nbsp;para realizar do saque</span>
                    </p>
                </div>

                </div>
               
                
            </section>
            </div>
        </pu-card>

        <pu-card theme="3" class="relative">
           
            <!-- <section class="w-full flex justify-center mt-3" @click="openShare()">
                    <img src="/imgs/pdd/pdd_share.png" style=" width: 100%;"/>
            </section> -->

            <section class="relative mt-2  w-full h-[3rem]" @click="openShare()">
                <!-- 背景 -->
                <!-- 文字和图标 -->
                <div class="w-full py-2 inset-0 flex items-center justify-center text-white text-sm m5-theme-input  rounded-lg">
                    <span class="flex items-center text-themewhite">
                        <img :src="PddImg.img_sharebg" alt="icon" class="w-5 h-5 mr-2">
                        Convide amigos para ajudar com saques
                    
                    </span>
                </div>
            </section>
            <section class="w-full mt-3 bg-tablebg rounded-lg" >
                <div class="w-full pt-2  text-sm overflow-hidden flex items-center justify-between align-center">
                    <button @click="scroll_type = 0" :class="scroll_type == 0 ? 'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2' : ' bg-tablebg1 '"
                        class=" w-1/2 px-6 py-3 h-full   rounded-tl-xl relative">
                        <!-- <svg :class="scroll_type == 0 ? 'text-theme-light' : 'opacity-0'"
                            class="w-6 h-auto absolute top-0 -right-[1.4375rem] -rotate-90"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M 0 0 H 24 V 24 Q 12 0, 0 0"></path>
                        </svg> -->
                        <span class="relative font-bold " :class="scroll_type == 0 ? ' text-themewhite  ': 'text-white'" >Relatório</span>
                    </button>
                    <button @click="scroll_type = 1" :class="scroll_type == 1?'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2' : '  bg-tablebg1'"
                        class=" w-1/2 px-4 py-3  h-full rounded-tr-xl relative">
                        <!-- <svg :class="scroll_type == 1 ? 'text-theme-light' : 'opacity-0'"
                            class="w-6 h-auto absolute top-0 -left-[1.375rem]" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="currentColor">
                            <path d="M 0 0 H 24 V 24 Q 12 0, 0 0"></path>
                        </svg> -->
                        <span class="relative " :class="scroll_type == 1 ? 'text-themewhite  ': 'text-white'" >Minha Referência</span>
                    </button>
                </div>
                <div class="">
                    <div class="scroll-list " v-if="scroll_type == 0">
                        <ul class="text-xs">
                            <!-- 复制一份列表内容用于无缝滚动 -->
                            <template v-for="item, index in scroll_list" :key="index">
                                <li class="w-full h-10 px-4 flex items-center justify-between odd:bg-tablebg1" >
                                    <span >{{ item.mobile }}</span>
                                   
                                    <div class="flex items-center ">
                                        <span >Acabou de sacar &nbsp;</span>
                                        <span class="text-themetext0">{{ currentUnit.value }} &nbsp;{{ item.bonus }}</span>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div class="scroll-list-auto bg-themefont rounded-2xl" v-else>
                        <ul class="text-xs">
                            <!-- 复制一份列表内容用于无缝滚动 -->
                            <template v-for="item, index in scroll_list" :key="index">
                                <li class="w-full h-8 px-4 flex items-center justify-between">
                                    <span class="opacity-65">{{ item.mobile }}</span>
                                    <span class="opacity-45">Acabou de sacar</span>
                                    <div class="flex items-center">
                                        <em
                                            class="w-4 h-4 ctx-box-bg6  text-three  rounded-full not-italic flex items-center justify-center">
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
        <pu-card theme="3" class="mb-3 pt-5">
            <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                <span>Descrição da Atividade:</span>
            </h5>
            
            <article class="p-mb text-sm text-themetext4" v-html="pddContentRef" v-if="pddContentRef!=''"></article>
            <article class="p-mb text-sm text-themetext4" v-else>
                <p>1.Você pode iniciar um saque quando o valor acumulado atingir 100 BRL.</p>
                <p>2.Convidar amigos para se registrarem no {{ documentTitle }} irá ajudá- lo a sacar dinheiro
                    rapidamente.</p>
                <p>3. Cada usuário receberá uma única rodada grátis por dia.</p>
                <p>4.Cada usuário tem um período de validade de 3 dias para cada atividade e pode participar da
                    atividade várias
                    vezes.</p>
                <p>5.Se você receber um bônus de dinheiro extra, pode jogar jogos de graça e ganhar ainda mais dinheiro
                    real.
                </p>
                <p>6.Se você não retirar o dinheiro dentro de 3 dias,ele será perdido.</p>
            </article>
        </pu-card>
        </div>

            <pdd-result v-model="spinResShowRef"></pdd-result>
            <pdd-rule v-model="ruleShowRef"></pdd-rule>
            <pdd-share v-model="share_show"></pdd-share>
            <pdd-success v-model="spinSuccessRef"></pdd-success>
            <Panddingbottom></Panddingbottom>
    </pu-page>
   

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

.wheel-pen-check {
    animation: wheel-check 0.3s linear infinite;
}

@keyframes wheel-check {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.scroll-list {
    height: 12.5rem;
    /* 设置固定高度 */
    overflow: hidden;
}
.scroll-list-auto {
    height: 12.5rem;
    /* 设置固定高度 */
    overflow: auto;
}
::-webkit-scrollbar {
  display: none;
}

.scroll-list ul {
    animation: scrollUp 20s linear infinite;
}

@keyframes scrollUp {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-50%);
        /* 滚动高度为列表高度的一半 */
    }
}

/* 鼠标悬停时暂停动画 */
.scroll-list:hover ul {
    animation-play-state: paused;
}
</style>