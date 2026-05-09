<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '@/i18n'
import { luckyDrawMOdel } from '@/model/other'
import { useRouter } from 'vue-router'
import { isAuthRef } from '@/model/user'
import { openLoginFunc,isEverLoginFunc} from '@/utils/config'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const CommonImg = useThemeImages().common 
const LuckyImg = useThemeImages().lucky 

const router = useRouter()

const { 
    configRef,
    penListRef, cardListRef, spinRotateAngleRef, spinLoadingRef, spinResShowRef, currentPenRef, starDrawFunc,exchangeFunc
} = luckyDrawMOdel(true)


let light_type = ref(0)
let light_time = ref(null)

const is_reclamar = computed(()=> {
    return cardListRef.value.filter(item=> item.count>0).length >= 5
})
const boxbgLinght = computed(() => ({
  backgroundImage: `url(${LuckyImg.bg_boxLight})`,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
}))
const boxbg = computed(() => ({
  backgroundImage: `url(${LuckyImg.bg_box})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100% ',
  backgroundPosition: 'center'
}))


function toPage(path) {
    if (!isAuthRef.value) {
        if(isEverLoginFunc()) {
            openLoginFunc(0)
        }else{
            openLoginFunc(1)
        }
        return
    }
    router.push(path)
}
function starReclamar() {
    if(is_reclamar.value) {
        // TODO: Reclamar
        exchangeFunc()
    }
}

onMounted(()=> {
    light_time.value = setInterval(()=> {
        light_type.value = light_type.value == 1 ? 0 : 1
    }, 1000)
})
onUnmounted(()=> {
    clearInterval(light_time.value)
})
</script>

<template>
    
    <pu-page title="Sorteio" class="z-[999]" v-if="currentTemplate.value=='template_one'">
        <i class="bg-theme hidden"></i>
        <pu-card theme="4" class="relative overflow-hidden flex justify-center">
            <img :src=LuckyImg.img_luckybg class="w-full h-auto">
            <section class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                <section class="w-[18.75rem] h-[18.75rem] relative">
                    <img :style="`transform: rotate(${spinRotateAngleRef}deg)`" :class="spinLoadingRef?'':'transition-transform duration-[3000ms] ease-out'" :src=LuckyImg.img_luckywheel class="w-full h-full">
                    <img v-show="light_type == 0" :src=LuckyImg.img_light1 class="w-full h-full absolute left-0 top-0">
                    <img v-show="light_type == 1" :src=LuckyImg.img_light2 class="w-full h-full absolute left-0 top-0">
                    <img :src=LuckyImg.img_shipin class="w-[4.75rem] h-auto absolute left-1/2 top-0 -translate-x-1/2 z-20">
                    <ul :style="`transform: rotate(${spinRotateAngleRef}deg)`" :class="spinLoadingRef?'':'transition-transform duration-[3000ms] ease-out'" class="w-full h-full text-four absolute left-0 top-0 z-10 block">
                        <template v-for="item,index in penListRef" :key="index">
                            <li :style="`transform: rotate(${30*index}deg);`" class="w-full h-full absolute left-0 top-0 block">
                                <div class="pt-[4.0625rem] mx-auto text-center relative flex flex-col items-center" style="transform-origin: 50% 9.375rem;">
                                    <em v-if="item.type != 'str'" class="w-full absolute left-0 top-6 flex items-center justify-center">
                                        <img :src=LuckyImg.icon_money class="w-10 h-10 object-contain">
                                    </em>
                                    <!-- <img v-if="item.type == 'str'" :src="`/imgs/draw-${item.award.toLowerCase()}-a.png`" class="w-4 h-4"> -->
                                    <svg v-if="item.type == 'str'" xmlns="http://www.w3.org/2000/svg" version="1.1" class="w-10 h-10">
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                                                    <stop offset="50%" style="stop-color:#FFEE00;stop-opacity:1" />
                                                    <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
                                                </linearGradient>
                                                <filter id="textEffect">
                                                    <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                                                    <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                                                    <feFlood flood-color="#000000" flood-opacity="0.4" result="offsetColor"/>
                                                    <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>
                                                    <feMerge>
                                                        <feMergeNode in="offsetBlur"/>
                                                        <feMergeNode in="SourceGraphic"/>
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                            <text 
                                                class="text-4xl font-['Franklin_Gothic']" 
                                                x="50%" 
                                                y="50%" 
                                                text-anchor="middle" 
                                                dominant-baseline="middle"
                                                stroke="#8B4513"
                                                stroke-width="3"
                                                stroke-linejoin="round"
                                                paint-order="stroke"
                                                fill="url(#goldGradient)"
                                                filter="url(#textEffect)">
                                                {{ item.award }}
                                            </text>
                                        </svg>
                                        <p v-else class="text-base font-bold text-[#299129]" style="text-shadow: 0px 0px 3px var(--color-theme);">
                                            <span>{{ item.award }}</span>
                                        </p>
                                </div>
                            </li>
                        </template>
                    </ul>
                    <div class="w-full h-full absolute left-0 top-0 z-20 flex items-center justify-center">
                        <div class="w-[4.6875rem] h-[5.6875rem] bg-fill flex flex-col items-center justify-center"
                                :style="{
                                    backgroundImage: `url(${LuckyImg.img_pointer})`,
                                }">
                            <!-- <p class="w-full mt-[1.5625rem] text-[0.6875rem] leading-[0.9375rem] text-yellow-200 text-center font-bold">
                                <span>Sorteio</span>
                            </p>
                            <p class="w-full text-[1.25rem] leading-[1.4375rem] text-yellow-200 text-center font-bold">
                                <span>{{ configRef.chances }}</span>
                            </p> -->
                        </div>
                    </div>
                </section>
            </section>
        </pu-card>
        <pu-card theme="3" class="mt-8">
            <div class="w-full mt-8 flex justify-between">
                <a href="javascript:;" @click="starDrawFunc()" :class="configRef.chances>0?'ctx-theme__linear':'text-rgbawhite30 border border-rgbawhite10'" class="w-[46%] h-11 rounded-lg text-center relative flex items-center justify-center">
                    <em v-if="configRef.chances>0" class="w-[1.375rem] h-[1.375rem] bg-red-500 text-themewhite border border-themewhite rounded-full not-italic absolute -top-[0.6875rem] -right-[0.6875rem] flex items-center justify-center">
                        <span class="text-[0.8125rem]">{{ configRef.chances }}</span>
                    </em>
                    <span>Sorteio</span>
                </a>
                <a href="javascript:;" @click="toPage('/lucky/voucher')" class="w-[46%] h-11 ctx-theme rounded-lg text-center relative flex items-center justify-center">
                    <em v-if="configRef.count>0" class="w-[1.375rem] h-[1.375rem] bg-red-500 text-themewhite border border-themewhite rounded-full not-italic absolute -top-[0.6875rem] -right-[0.6875rem] flex items-center justify-center">
                        <span class="text-[0.8125rem]">{{ configRef.count }}</span>

                    </em>
                    <span>Bônus</span>
                </a>
            </div>
        </pu-card>
        <pu-card theme="3" class="mt-4">
            <div class="w-full p-px rounded-xl bg-gradient-to-r from-gold-500 to-gold-100">
                <div class="w-full p-4 text-themewhite bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 rounded-xl">
                    <ul class="w-full flex justify-between">
                        <template v-for="item,index in cardListRef" :key="index">
                            <li :class="item.count>0?'bg-rgbawhite30 text-one':'bg-rgbablack15 text-rgbawhite50'" class="w-[3.625rem] py-2 rounded-sm relative flex flex-col items-center">
                                <!-- <em v-if="item.count>0" class="w-[1.375rem] h-[1.375rem] bg-red-500 text-themewhite border-2 border-white rounded-full not-italic absolute -top-[0.6875rem] -right-[0.6875rem] flex items-center justify-center">
                                    <span class="text-[0.8125rem]">{{ item.count }}</span>
                                </em> -->
                                <!-- <img v-if="item.count>0" :src="`/imgs/draw-${item.award.toLowerCase()}-a.png`" class="w-full h-8 object-contain">
                                <img v-else :src="`/imgs/draw-${item.award.toLowerCase()}.png`" class="w-full h-8 object-contain"> -->
                                <svg :class="item.count>0?'':'filter-gray opacity-60'" xmlns="http://www.w3.org/2000/svg" version="1.1" class="w-10 h-10">
                                    <defs>
                                        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                                            <stop offset="50%" style="stop-color:#FFEE00;stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
                                        </linearGradient>
                                        <filter id="cardTextEffect">
                                            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                                            <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                                            <feFlood flood-color="#000000" flood-opacity="0.4" result="offsetColor"/>
                                            <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>
                                            <feMerge>
                                                <feMergeNode in="offsetBlur"/>
                                                <feMergeNode in="SourceGraphic"/>
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <text 
                                        class="text-4xl font-['Franklin_Gothic']" 
                                        x="50%" 
                                        y="50%" 
                                        text-anchor="middle" 
                                        dominant-baseline="middle"
                                        stroke="#8B4513"
                                        stroke-width="3"
                                        stroke-linejoin="round"
                                        paint-order="stroke"
                                        fill="url(#cardGradient)"
                                        filter="url(#cardTextEffect)">
                                        {{ item.award }}
                                    </text>
                                </svg>
                                <p class="text-sm text-center">
                                    <span>x{{ item.count }}</span>
                                </p>
                            </li>
                        </template>
                    </ul>
                    <p class="mt-2 text-sm text-center text-four font-bold">Coletar 5 cartas para resgatar R$100</p>
                    <div class="w-full mt-8 flex justify-center">
                        <a href="javascript:;" @click="starReclamar()" :class="is_reclamar?'ctx-theme__linear':'text-rgbawhite30 border border-rgbawhite10'" class="w-[46%] h-11 rounded-lg text-center relative flex items-center justify-center">
                            <span>Reclamar</span>
                        </a>
                    </div>
                </div>
            </div>
        </pu-card>
        <!-- spinResShowRef -->
        <section v-if="spinResShowRef" class="w-full h-full overflow-y-auto fixed left-0 top-0 z-[99] flex items-center justify-center">
            <em class="w-full h-full bg-themeblack opacity-70 block absolute left-0 top-0"></em>
            <div class="w-wrap max-w-full relative">
                <div class="w-full h-[26.75rem] bg-fill" 
                        :style="{backgroundImage: `url(${LuckyImg.img_restbg})` }">
                    <div class="pt-20 text-lg text-center font-bold">
                        <span>Parabéns pela conquista</span>
                    </div>
                    <div class="pt-[7.1875rem] flex justify-center">
                        <div class="w-14 h-[3.6875rem] p-1.5 text-themewhite bg-fill" :style="{backgroundImage: `url(${LuckyImg.img_resitem})` }" >
                            <div class="w-full h-full relative">
                                <template v-if="currentPenRef.type=='num'">
                                    <img :src=LuckyImg.icon_money class="w-full h-full object-contain">
                                    <p class="w-full text-[0.625rem] text-center absolute left-0 bottom-0">
                                        <span>R$&nbsp;{{ currentPenRef.award }}</span>
                                    </p>
                                </template>
                                <template v-else>
                                    <img :src="LuckyImg[`text_${currentPenRef.award.toLowerCase()}_a`]" class="w-full h-full object-contain">
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <button @click="spinResShowRef=false" class="w-[6.9375rem] h-10 text-base text-body-bg bg-fill " 
                            :style="{backgroundImage: `url(${LuckyImg.img_resbtn})`}">
                        <b>Claro</b>
                    </button>
                </div>
            </div>
        </section>
<Panddingbottom></Panddingbottom>
    </pu-page>
    <pu-page title="Sorteio" class="z-[999]" v-if="currentTemplate.value=='template_two'">
        <i class="bg-theme hidden"></i>
        <pu-card theme="4" class="relative overflow-hidden flex justify-center">
            <img :src=LuckyImg.img_luckybg class="w-full h-auto">
            <section class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                <section class="w-[18.75rem] h-[18rem] relative top-[-2.5rem]">
                    <img :style="`transform: rotate(${spinRotateAngleRef}deg)`" :class="spinLoadingRef?'':'transition-transform duration-[3000ms] ease-out'" :src=LuckyImg.img_luckywheel class="w-full h-full">
              
                    <img :src=LuckyImg.img_shipin class="w-[2rem] h-auto absolute left-1/2 top-[-1.5rem] -translate-x-1/2 z-20">
                    <ul :style="`transform: rotate(${spinRotateAngleRef}deg)`" :class="spinLoadingRef?'':'transition-transform duration-[3000ms] ease-out'" class="w-full h-full text-one absolute left-0 top-0 z-10 block">
                        <template v-for="item,index in penListRef" :key="index">
                            <li :style="`transform: rotate(${30*index}deg);`" class="w-full h-full absolute left-0 top-0 block">
                                <div class=" mx-auto text-center relative flex flex-col items-center" style="transform-origin: 50% 9.375rem;">
                                    <p v-if="item.type != 'str'" class="text-[1em] font-[800] text-[#fff] mt-12" style="-webkit-text-stroke: 0.01rem #00b250; text-stroke:0.05rem #013912;">
                                            <span>{{ item.award }}</span>
                                        </p>
                                    <em v-if="item.type != 'str'" class="w-full absolute left-0 top-4 flex items-center justify-center">
                                        <img :src=LuckyImg.icon_money class="w-14 h-10 object-contain">
                                    </em>
                                    <svg v-if="item.type == 'str'" xmlns="http://www.w3.org/2000/svg" version="1.1" class="w-15 h-[8rem]">
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style="stop-color :#fff000;stop-opacity:1 ;font-size:2rem" />
                                                    <stop offset="50%" style="stop-color:#fff000;stop-opacity:1  ;font-size:2rem" />
                                                    <stop offset="100%" style="stop-color:#fff000;stop-opacity:1  ;font-size:2rem" />
                                                </linearGradient>
                                                <filter id="textEffect">
                                                    <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                                                    <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                                                    <feFlood flood-color="#000000" flood-opacity="0.4" result="offsetColor"/>
                                                    <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>
                                                    <feMerge>
                                                        <feMergeNode in="offsetBlur"/>
                                                        <feMergeNode in="SourceGraphic"/>
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                            <text 
                                                class="text-5xl font-['Franklin_Gothic']" 
                                                x="50%" 
                                                y="50%" 
                                                text-anchor="middle" 
                                                dominant-baseline="middle"
                                                stroke="#960dff"
                                                stroke-width="3"
                                                stroke-linejoin="round"
                                                paint-order="stroke"
                                                fill="url(#goldGradient)"
                                                filter="url(#textEffect)">
                                                {{ item.award }}
                                            </text>
                                        </svg>
                                       
                                </div>
                            </li>
                        </template>
                    </ul>
                    <div class="w-full h-full absolute left-0 top-0 z-20 flex items-center justify-center">
                        <div class="w-[4.6875rem] h-[5.6875rem] bg-fill flex flex-col items-center justify-center" :style="{backgroundImage: `url(${LuckyImg.img_pointer})` }">
                            <!-- <p class="w-full mt-[1.5625rem] text-[0.6875rem] leading-[0.9375rem] text-yellow-200 text-center font-bold">
                                <span>Sorteio</span>
                            </p>
                            <p class="w-full text-[1.25rem] leading-[1.4375rem] text-yellow-200 text-center font-bold">
                                <span>{{ configRef.chances }}</span>
                            </p> -->
                        </div>
                    </div>
                </section>
            </section>
        </pu-card>
        <pu-card theme="3" >
            <div class="w-full  flex justify-between"> 
                <!--  -->
                <a href="javascript:;" @click="starDrawFunc()" :class="configRef.chances>0?'m2-btn-ten':'text-rgbawhite50 border border-border1 bg-loginlinear-3'" class="w-[46%] h-11 rounded-full text-center relative flex items-center justify-center">
                    <!--  -->
                    <em v-if="configRef.chances>0"  class="w-[1.375rem] h-[1.375rem] bg-red-500 text-themewhite border border-themewhite rounded-full not-italic absolute -top-[0.6875rem] -right-0 flex items-center justify-center">
                        <span class="text-[0.8125rem]">{{ configRef.chances }}</span>
                    </em>
                    <span>Sorteio</span>
                </a>
                <a href="javascript:;" @click="toPage('/lucky/voucher')" class="w-[46%] h-11 m2-btn-ten   rounded-full text-center relative flex items-center justify-center">
                    <!-- -->
                    <em  v-if="configRef.count>0" class="w-[1.375rem] h-[1.375rem] bg-red-500 text-themewhite border border-themewhite rounded-full not-italic absolute -top-[0.6875rem] -right-0 flex items-center justify-center">
                        <span class="text-[0.8125rem]">{{ configRef.count }}</span>

                    </em>
                    <span>Bônus</span>
                </a>
            </div>
        </pu-card>
        <!--     -->
        <pu-card theme="3" class="mt-4">
            <!-- style="background: url(/imgs/lucky/draw-card.png) no-repeat center center; background-size: 100% 100%;" -->
            <div class="w-full rounded-xl bg-fill flex flex-col items-center justify-center" :style="{backgroundImage: `url(${LuckyImg.bg_lucky})` }" >
                <div class="w-full p-2  text-three  ">
                    <ul class="w-full flex justify-between">
                        <template v-for="item,index in cardListRef" :key="index">
                            
                            <li :style="item.count>0?boxbgLinght:boxbg"  class="w-[3.8rem] py-2 rounded-lg relative flex flex-col items-center">
                                <!-- <em v-if="item.count>0" class="w-[1.375rem] h-[1.375rem] bg-red-500  text-three  border-2 border-white rounded-full not-italic absolute -top-[0.6875rem] -right-[0.6875rem] flex items-center justify-center">
                                    <span class="text-[0.8125rem]">{{ item.count }}</span>
                                </em> -->
                                <!-- <img v-if="item.count>0" :src="`/imgs/draw-${item.award.toLowerCase()}-a.png`" class="w-full h-8 object-contain">
                                <img v-else :src="`/imgs/draw-${item.award.toLowerCase()}.png`" class="w-full h-8 object-contain"> -->
                                <svg :class="item.count>0?'':'filter-gray opacity-60'" xmlns="http://www.w3.org/2000/svg" version="1.1" class="w-14 h-12">
                                    <defs>
                                        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                                            <stop offset="50%" style="stop-color:#FFEE00;stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
                                        </linearGradient>
                                        <filter id="cardTextEffect">
                                            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                                            <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                                            <feFlood flood-color="#000000" flood-opacity="0.4" result="offsetColor"/>
                                            <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>
                                            <feMerge>
                                                <feMergeNode in="offsetBlur"/>
                                                <feMergeNode in="SourceGraphic"/>
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <text 
                                        class="text-5xl font-['Franklin_Gothic']" 
                                        x="50%" 
                                        y="50%" 
                                        text-anchor="middle" 
                                        dominant-baseline="middle"
                                        stroke="#960dff"
                                        stroke-width="3"
                                        stroke-linejoin="round"
                                        paint-order="stroke"
                                        fill="url(#cardGradient)"
                                        filter="url(#cardTextEffect)">
                                        {{ item.award }}
                                    </text>
                                </svg>
                                <p class="text-sm text-center text-four">
                                    <span>x{{ item.count }}</span>
                                </p>
                            </li>
                        </template>
                    </ul>
                    <p class="mt-2 text-sm text-center text-four font-bold">Coletar 5 cartas para resgatar R$100</p>
                    <div class="w-full mt-4 flex justify-center">
                        <a href="javascript:;" @click="starReclamar()" :class="is_reclamar?'ctx-theme__linear':'bg-loginlinear-3 border border-border1 text-[#b7b7b7] '" class="px-6 h-11 rounded-full text-center relative flex items-center justify-center">
                            <span class=" ">Coletar</span>
                        </a>
                    </div>
                </div>
            </div>
        </pu-card>
        <!-- spinResShowRef -->
        <section v-if="spinResShowRef" class="w-full h-full overflow-y-auto fixed left-0 top-0 z-[99] flex items-center justify-center">
            <em class="w-full h-full bg-black opacity-70 block absolute left-0 top-0"></em>
            <div class="w-wrap max-w-full relative">
                <div class="w-full h-[26.75rem] bg-fill" :style="{backgroundImage: `url(${LuckyImg.img_restbg})` }">
                    <div class="pt-20 text-lg text-center font-bold">
                        <span>Parabéns pela conquista</span>
                    </div>
                    <div class="pt-[7.1875rem] flex justify-center">
                        <div class="w-14 h-[3.6875rem] p-1.5  text-three  bg-fill" :style="{backgroundImage: `url(${LuckyImg.img_resitem})` }" >
                            <div class="w-full h-full relative">
                                <template v-if="currentPenRef.type=='num'">
                                    <img :src=LuckyImg.icon_money class="w-full h-full object-contain">
                                    <p class="w-full text-[0.625rem] text-center absolute left-0 bottom-0">
                                        <span>R$&nbsp;{{ currentPenRef.award }}</span>
                                    </p>
                                </template>
                                <template v-else>
                                    <img :src="LuckyImg[`text_${currentPenRef.award.toLowerCase()}_a`]" class="w-full h-full object-contain">
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <button @click="spinResShowRef=false" class="w-[6.9375rem] h-10 text-base text-[#895b18] bg-fill" :style="{backgroundImage: `url(${LuckyImg.img_resbtn})`}">
                        <b>Claro</b>
                    </button>
                </div>
            </div>
        </section>
        <!-- <div class="w-full h-20"></div> -->
        <Panddingbottom></Panddingbottom>
    </pu-page>

    <pu-page title="Sorteio" class="z-[999]" v-if="currentTemplate.value=='template_three'">
        <i class="bg-theme hidden"></i>
        <pu-card theme="4" class="relative overflow-hidden flex justify-center">
            <img :src=LuckyImg.img_luckybg class="w-full h-auto">
            <section class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                <section class="w-[18.75rem] h-[18rem] relative top-[-2.5rem]">
                    <img :style="`transform: rotate(${spinRotateAngleRef}deg)`" :class="spinLoadingRef?'':'transition-transform duration-[3000ms] ease-out'" :src=LuckyImg.img_luckywheel class="w-full h-full">
              
                    <img :src=LuckyImg.img_shipin class="w-[2rem] h-auto absolute left-1/2 top-[-1.5rem] -translate-x-1/2 z-20">
                    <ul :style="`transform: rotate(${spinRotateAngleRef}deg)`" :class="spinLoadingRef?'':'transition-transform duration-[3000ms] ease-out'" class="w-full h-full text-one absolute left-0 top-0 z-10 block">
                        <template v-for="item,index in penListRef" :key="index">
                            <li :style="`transform: rotate(${30*index}deg);`" class="w-full h-full absolute left-0 top-0 block">
                                <div class=" mx-auto text-center relative flex flex-col items-center" style="transform-origin: 50% 9.375rem;">
                                    <p v-if="item.type != 'str'" class="text-[1em] font-[800] text-[#fff] mt-12" style="-webkit-text-stroke: 0.01rem #00b250; text-stroke:0.05rem #013912;">
                                            <span>{{ item.award }}</span>
                                        </p>
                                    <em v-if="item.type != 'str'" class="w-full absolute left-0 top-4 flex items-center justify-center">
                                        <img :src=LuckyImg.icon_money class="w-14 h-10 object-contain">
                                    </em>
                                    <svg v-if="item.type == 'str'" xmlns="http://www.w3.org/2000/svg" version="1.1" class="w-15 h-[8rem]">
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style="stop-color :#fff000;stop-opacity:1 ;font-size:2rem" />
                                                    <stop offset="50%" style="stop-color:#fff000;stop-opacity:1  ;font-size:2rem" />
                                                    <stop offset="100%" style="stop-color:#fff000;stop-opacity:1  ;font-size:2rem" />
                                                </linearGradient>
                                                <filter id="textEffect">
                                                    <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                                                    <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                                                    <feFlood flood-color="#000000" flood-opacity="0.4" result="offsetColor"/>
                                                    <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>
                                                    <feMerge>
                                                        <feMergeNode in="offsetBlur"/>
                                                        <feMergeNode in="SourceGraphic"/>
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                            <text 
                                                class="text-5xl font-['Franklin_Gothic']" 
                                                x="50%" 
                                                y="50%" 
                                                text-anchor="middle" 
                                                dominant-baseline="middle"
                                                stroke="#960dff"
                                                stroke-width="3"
                                                stroke-linejoin="round"
                                                paint-order="stroke"
                                                fill="url(#goldGradient)"
                                                filter="url(#textEffect)">
                                                {{ item.award }}
                                            </text>
                                        </svg>
                                       
                                </div>
                            </li>
                        </template>
                    </ul>
                    <div class="w-full h-full absolute left-0 top-0 z-20 flex items-center justify-center">
                        <div class="w-[4.6875rem] h-[5.6875rem] bg-fill flex flex-col items-center justify-center" :style="{backgroundImage: `url(${LuckyImg.img_pointer})` }">
                            <!-- <p class="w-full mt-[1.5625rem] text-[0.6875rem] leading-[0.9375rem] text-yellow-200 text-center font-bold">
                                <span>Sorteio</span>
                            </p>
                            <p class="w-full text-[1.25rem] leading-[1.4375rem] text-yellow-200 text-center font-bold">
                                <span>{{ configRef.chances }}</span>
                            </p> -->
                        </div>
                    </div>
                </section>
            </section>
        </pu-card>
        <pu-card theme="3" >
            <div class="w-full  flex justify-between"> 
                <!--  -->
                <a href="javascript:;" @click="starDrawFunc()" :class="configRef.chances>0?'m3-theme-btn1':'m3-theme-btn3'" class="w-[46%] h-11 rounded-full text-center relative flex items-center justify-center">
                    <em v-if="configRef.chances>0" class="w-[1.375rem] h-[1.375rem] bg-red-500 text-themewhite border border-themewhite rounded-full not-italic absolute -top-[0.4rem] -right-[0.2rem] flex items-center justify-center">
                        <span class="text-[0.8125rem]">{{ configRef.chances }}</span>
                    </em>
                    <span>Sorteio</span>
                </a>
                <a href="javascript:;" @click="toPage('/lucky/voucher')" class="w-[46%] h-11 m3-theme-btn1 rounded-full text-center relative flex items-center justify-center">
                    <!-- configRef.count>0 -->
                    <em v-if="configRef.count>0" class="w-[1.375rem] h-[1.375rem] bg-red-500 text-themewhite border border-themewhite rounded-full not-italic absolute -top-[0.4rem] -right-[0.2rem] flex items-center justify-center">
                        <span class="text-[0.8125rem]">{{ configRef.count }}</span>
                    </em>
                    <span>Bônus</span>
                </a>
            </div>
        </pu-card>
        <!--     -->
        <pu-card theme="3" class="mt-4">
            <!-- style="background: url(/imgs/lucky/draw-card.png) no-repeat center center; background-size: 100% 100%;" -->
            <div class="w-full rounded-xl bg-fill flex flex-col items-center justify-center" :style="{backgroundImage: `url(${LuckyImg.bg_lucky})` }" >
                <div class="w-full p-2  text-three  ">
                    <ul class="w-full flex justify-between">
                        <template v-for="item,index in cardListRef" :key="index">
                            
                            <li p :style="item.count>0?boxbgLinght:boxbg"  class="w-[3.8rem] py-2 rounded-lg relative flex flex-col items-center">
                                <!-- <em v-if="item.count>0" class="w-[1.375rem] h-[1.375rem] bg-red-500  text-three  border-2 border-white rounded-full not-italic absolute -top-[0.6875rem] -right-[0.6875rem] flex items-center justify-center">
                                    <span class="text-[0.8125rem]">{{ item.count }}</span>
                                </em> -->
                                <!-- <img v-if="item.count>0" :src="`/imgs/draw-${item.award.toLowerCase()}-a.png`" class="w-full h-8 object-contain">
                                <img v-else :src="`/imgs/draw-${item.award.toLowerCase()}.png`" class="w-full h-8 object-contain"> -->
                                <svg :class="item.count>0?'':'filter-gray opacity-60'" xmlns="http://www.w3.org/2000/svg" version="1.1" class="w-14 h-12">
                                    <defs>
                                        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                                            <stop offset="50%" style="stop-color:#FFEE00;stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
                                        </linearGradient>
                                        <filter id="cardTextEffect">
                                            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                                            <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                                            <feFlood flood-color="#000000" flood-opacity="0.4" result="offsetColor"/>
                                            <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>
                                            <feMerge>
                                                <feMergeNode in="offsetBlur"/>
                                                <feMergeNode in="SourceGraphic"/>
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <text 
                                        class="text-5xl font-['Franklin_Gothic']" 
                                        x="50%" 
                                        y="50%" 
                                        text-anchor="middle" 
                                        dominant-baseline="middle"
                                        stroke="#960dff"
                                        stroke-width="3"
                                        stroke-linejoin="round"
                                        paint-order="stroke"
                                        fill="url(#cardGradient)"
                                        filter="url(#cardTextEffect)">
                                        {{ item.award }}
                                    </text>
                                </svg>
                                <p class="text-sm text-center text-themetext1">
                                    <span :class="item.count>0?'text-themetext0':''">x{{ item.count }}</span>
                                </p>
                            </li>
                        </template>
                    </ul>
                    <p class="mt-2 text-sm text-center text-themetext0 font-bold">Coletar 5 cartas para resgatar R$100</p>
                    <div class="w-full mt-4 flex justify-center">
                        <a href="javascript:;" @click="starReclamar()" :class="is_reclamar?'m3-theme-btn1':'m3-theme-btn3'" class="px-6 h-11 rounded-full text-center relative flex items-center justify-center">
                            <span>Coletar</span>
                        </a>
                    </div>
                </div>
            </div>
        </pu-card>
        <!-- spinResShowRef -->
        <section v-if="spinResShowRef" class="w-full h-full overflow-y-auto fixed left-0 top-0 z-[99] flex items-center justify-center">
            <em class="w-full h-full bg-black opacity-70 block absolute left-0 top-0"></em>
            <div class="w-wrap max-w-full relative">
                <div class="w-full h-[26.75rem] bg-fill" :style="{backgroundImage: `url(${LuckyImg.img_restbg})` }">
                    <div class="pt-20 text-lg text-center font-bold">
                        <span>Parabéns pela conquista</span>
                    </div>
                    <div class="pt-[7.1875rem] flex justify-center">
                        <div class="w-14 h-[3.6875rem] p-1.5  text-three  bg-fill" :style="{backgroundImage: `url(${LuckyImg.img_resitem})` }" >
                            <div class="w-full h-full relative">
                                <template v-if="currentPenRef.type=='num'">
                                    <img :src=LuckyImg.icon_money class="w-full h-full object-contain">
                                    <p class="w-full text-[0.625rem] text-center absolute left-0 bottom-0">
                                        <span>R$&nbsp;{{ currentPenRef.award }}</span>
                                    </p>
                                </template>
                                <template v-else>
                                    <img :src="LuckyImg[`text_${currentPenRef.award.toLowerCase()}_a`]" class="w-full h-full object-contain">
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <button @click="spinResShowRef=false" class="w-[6.9375rem] h-10 text-base text-[#895b18] bg-fill" :style="{backgroundImage: `url(${LuckyImg.img_resbtn})`}">
                        <b>Claro</b>
                    </button>
                </div>
            </div>
        </section>
        <!-- <div class="w-full h-20"></div> -->
        <Panddingbottom></Panddingbottom>
    </pu-page>
    <pu-page title="Sorteio" class="z-[999]" hideService v-if="currentTemplate.value=='template_four'">
        <pu-card theme="4" class="relative overflow-hidden flex justify-center">
            <img :src=LuckyImg.img_luckybg class="w-full h-auto">
            <section class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                <section class="w-[18.75rem] h-[18rem] relative top-[-2.2rem]">
                    <img :style="`transform: rotate(${spinRotateAngleRef}deg)`" :class="spinLoadingRef?'':'transition-transform duration-[3000ms] ease-out'" :src=LuckyImg.img_luckywheel class="w-full h-full">
                    <img :src=LuckyImg.img_shipin class="w-[2rem] h-auto absolute left-1/2 top-[-1.8rem] -translate-x-1/2 z-20">
                    <ul :style="`transform: rotate(${spinRotateAngleRef}deg)`" :class="spinLoadingRef?'':'transition-transform duration-[3000ms] ease-out'" class="w-full h-full text-one absolute left-0 top-0 z-10 block">
                        <template v-for="item,index in penListRef" :key="index">
                            <li :style="`transform: rotate(${30*index}deg);`" class="w-full h-full absolute left-0 top-0 block">
                                <div class=" mx-auto text-center relative flex flex-col items-center" style="transform-origin: 50% 9.375rem;">
                                    <p v-if="item.type != 'str'" class="text-[1em] font-[800] text-[#fff] mt-12" style="-webkit-text-stroke: 0.01rem #00b250; text-stroke:0.05rem #013912;">
                                        <span>{{ item.award }}</span>
                                    </p>
                                    <em v-if="item.type != 'str'" class="w-full absolute left-0 top-4 flex items-center justify-center">
                                        <img :src=LuckyImg.icon_money class="w-14 h-10 object-contain">
                                    </em>
                                    <svg v-if="item.type == 'str'" xmlns="http://www.w3.org/2000/svg" version="1.1" class="w-15 h-[8rem]">
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style="stop-color :#fff000;stop-opacity:1 ;font-size:2rem" />
                                                    <stop offset="50%" style="stop-color:#fff000;stop-opacity:1  ;font-size:2rem" />
                                                    <stop offset="100%" style="stop-color:#fff000;stop-opacity:1  ;font-size:2rem" />
                                                </linearGradient>
                                                <filter id="textEffect">
                                                    <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                                                    <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                                                    <feFlood flood-color="#000000" flood-opacity="0.4" result="offsetColor"/>
                                                    <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>
                                                    <feMerge>
                                                        <feMergeNode in="offsetBlur"/>
                                                        <feMergeNode in="SourceGraphic"/>
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                            <text 
                                                class="text-5xl font-['Franklin_Gothic']" 
                                                x="50%" 
                                                y="50%" 
                                                text-anchor="middle" 
                                                dominant-baseline="middle"
                                                stroke="#960dff"
                                                stroke-width="3"
                                                stroke-linejoin="round"
                                                paint-order="stroke"
                                                fill="url(#goldGradient)"
                                                filter="url(#textEffect)">
                                                {{ item.award }}
                                            </text>
                                        </svg>
                                       
                                </div>
                            </li>
                        </template>
                    </ul>
                    <div class="w-full h-full absolute left-0 top-[-0.5rem] z-20 flex items-center justify-center">
                        <div class="w-[5.6rem] h-[6.6875rem] bg-fill flex flex-col items-center justify-center" :style="{
                                    backgroundImage: `url(${LuckyImg.img_pointer})`,
                                }">
                            <!-- <p class="w-full mt-[1.5625rem] text-[0.6875rem] leading-[0.9375rem] text-yellow-200 text-center font-bold">
                                <span>Sorteio</span>
                            </p>
                            <p class="w-full text-[1.25rem] leading-[1.4375rem] text-yellow-200 text-center font-bold">
                                <span>{{ configRef.chances }}</span>
                            </p> -->
                        </div>
                    </div>
                </section>
            </section>
        </pu-card>
        <pu-card theme="3" class="!-mt-[4rem]">
            <div class="w-full flex justify-between">
                <a href="javascript:;" @click="starDrawFunc()" :class="configRef.chances>0?'m4-ten-btn ':'text-white/20 bg-black/40' " class="w-[46%] h-9 rounded-full text-center relative flex items-center justify-center">
                    <em v-if="configRef.chances>0" class="w-[1.375rem] h-[1.375rem]  text-themewhite  border border-white rounded-full bg-texterror  not-italic absolute -top-[0.6875rem] -right-[0.6875rem] flex items-center justify-center">
                        <span class="text-[1rem]">{{ configRef.chances }}</span>
                    </em>
                    <span class="text-[1.2rem]">Sorteio</span>
                </a>
                <a href="javascript:;" @click="toPage('/lucky/voucher')" class="w-[46%]  h-9 m4-nine-btn  rounded-full text-center relative flex items-center justify-center">
                    <em v-if="configRef.count>0" class="w-[1.375rem] h-[1.375rem]  text-themewhite  border border-white bg-texterror rounded-full not-italic absolute -top-[0.60rem] -right-[0.55rem] flex items-center justify-center">
                        <span class="text-[1rem]">{{ configRef.count }}</span>
                    </em>
                    <span class="text-[1.2rem]">Bônus</span>
                </a>
            </div>
        </pu-card>
        <!--     -->
        <pu-card theme="3" class="mt-4">
            <div class="w-full rounded-xl bg-tablebg p-2" >
                <div class="w-full p-2  text-themetext0  ">
                    <ul class="w-full flex justify-between">
                        <template v-for="item,index in cardListRef" :key="index">
                            <li >
                                <div :style="item.count>0?'background: linear-gradient(to bottom, var(--color-downloadlinear3), var(--color-downloadlinear4));color:var(--color-m4tentext);':'background-color: var(--color-theme);'" class="w-[3.5rem] py-2 rounded-lg relative flex flex-col items-center">
                                <div  class="text-[3.5rem] font-[700]">{{ item.award }}</div>
                                  
                            </div>
                                <p class="text-s text-center font-bold" :class="item.count>0?'':'text-white'">
                                    <span>x{{ item.count }}</span>
                                </p>
                            </li>
                        </template>
                    </ul>
                    <p class="mt-2 text-sm text-center text-white  flex align-center items-center" >
                        <img :src="CommonImg.icon_rich_warn" alt="" class="w-4 h-4 mr-1 inline-block align-middle">
                        Coletar <span class="mx-1 text-themetext0"> 5</span> cartas para resgatar <span class="mx-1 text-themetext0 font-bold"> R$100</span> </p>
                    <div class="w-full mt-4 flex justify-center">
                        <a href="javascript:;" @click="starReclamar()" :class="is_reclamar?'m4-nine-btn text-white':'bg-theme text-white/40'" class="w-full font-bold px-6 h-11 rounded-full text-center relative flex items-center justify-center">
                            <span>Coletar</span>
                        </a>
                    </div>
                </div>
            </div>
        </pu-card>
        <!-- spinResShowRef -->
        <section v-if="spinResShowRef" class="w-full h-full overflow-y-auto fixed left-0 top-0 z-[99] flex items-center justify-center">
            <em class="w-full h-full bg-black opacity-70 block absolute left-0 top-0"></em>
            <div class="w-wrap max-w-full relative">
                <div class="w-full h-[26.75rem] bg-fill" :style="{backgroundImage: `url(${LuckyImg.img_restbg})` }">
                    <div class="pt-20 text-lg text-center font-bold">
                        <span>Parabéns pela conquista</span>
                    </div>
                    <div class="pt-[7.1875rem] flex justify-center">
                        <div class="w-14 h-[3.6875rem] p-1.5  text-three  bg-fill" :style="{backgroundImage: `url(${LuckyImg.img_resitem})` }">
                            <div class="w-full h-full relative">
                                <!-- currentPenRef.type=='num' -->
                                <template v-if="currentPenRef.type=='num'">
                                    <img :src=LuckyImg.icon_money  class="w-full h-full object-contain">
                                    <p class="w-full text-[0.625rem] text-center absolute left-0 bottom-0">
                                        <span>R$&nbsp;{{ currentPenRef.award }}</span>
                                    </p>
                                </template>
                                <template v-else>
                                    <img :src="LuckyImg[`text_${currentPenRef.award.toLowerCase()}_a`]" class="w-full h-full object-contain">
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <button @click="spinResShowRef=false" class="w-[6.9375rem] h-10 text-base  bg-fill m4-ten-btn rounded-full " >
                        <b>Claro</b>
                    </button>
                </div>
            </div>
        </section>
        <Panddingbottom></Panddingbottom>
    </pu-page>
    <pu-page title="Sorteio" class="z-[999]" hideService v-if="currentTemplate.value=='template_five'">
        <pu-card theme="4" class="relative overflow-hidden flex justify-center">
            <img :src=LuckyImg.m5_bg_img class="w-full h-auto">
            <img :src=LuckyImg.img_luckybg class="w-[90%] h-auto absolute left-1/2 top-4 -translate-x-1/2">
            <section class="w-full absolute left-0 top-[4.5rem] flex  justify-center">
                <section class="w-[18.75rem] h-[18rem] relative top-[-2.2rem]">
                    <img :style="`transform: rotate(${spinRotateAngleRef}deg)`" :class="spinLoadingRef?'':'transition-transform duration-[3000ms] ease-out'" :src=LuckyImg.img_luckywheel class="w-full h-full">
                    <img :src=LuckyImg.img_shipin class="w-[2rem] h-auto absolute left-1/2 top-[-1.8rem] -translate-x-1/2 z-20">
                    <ul :style="`transform: rotate(${spinRotateAngleRef}deg)`" :class="spinLoadingRef?'':'transition-transform duration-[3000ms] ease-out'" class="w-full h-full text-one absolute left-0 top-0 z-10 block">
                        <template v-for="item,index in penListRef" :key="index">
                            <li :style="`transform: rotate(${30*index}deg);`" class="w-full h-full absolute left-0 top-0 block">
                                <div class=" mx-auto text-center relative flex flex-col items-center" style="transform-origin: 50% 9.375rem;">
                                    <p v-if="item.type != 'str'" class="text-[1em] font-[800] text-[#fff] mt-12" style="-webkit-text-stroke: 0.01rem #00b250; text-stroke:0.05rem #013912;">
                                        <span>{{ item.award }}</span>
                                    </p>
                                    <em v-if="item.type != 'str'" class="w-full absolute left-0 top-4 flex items-center justify-center">
                                        <img :src=LuckyImg.icon_money class="w-14 h-10 object-contain">
                                    </em>
                                    <svg v-if="item.type == 'str'" xmlns="http://www.w3.org/2000/svg" version="1.1" class="w-15 h-[8rem]">
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style="stop-color :#fff000;stop-opacity:1 ;font-size:2rem" />
                                                    <stop offset="50%" style="stop-color:#fff000;stop-opacity:1  ;font-size:2rem" />
                                                    <stop offset="100%" style="stop-color:#fff000;stop-opacity:1  ;font-size:2rem" />
                                                </linearGradient>
                                                <filter id="textEffect">
                                                    <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                                                    <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                                                    <feFlood flood-color="#000000" flood-opacity="0.4" result="offsetColor"/>
                                                    <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>
                                                    <feMerge>
                                                        <feMergeNode in="offsetBlur"/>
                                                        <feMergeNode in="SourceGraphic"/>
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                            <text 
                                                class="text-5xl font-['Franklin_Gothic']" 
                                                x="50%" 
                                                y="50%" 
                                                text-anchor="middle" 
                                                dominant-baseline="middle"
                                                stroke="#960dff"
                                                stroke-width="3"
                                                stroke-linejoin="round"
                                                paint-order="stroke"
                                                fill="url(#goldGradient)"
                                                filter="url(#textEffect)">
                                                {{ item.award }}
                                            </text>
                                        </svg>
                                       
                                </div>
                            </li>
                        </template>
                    </ul>
                    <div class="w-full h-full absolute left-0 top-[-0.5rem] z-20 flex items-center justify-center">
                        <div class="w-[5.6rem] h-[6.6875rem] bg-fill flex flex-col items-center justify-center" :style="{
                                    backgroundImage: `url(${LuckyImg.img_pointer})`,
                                }">
                            <!-- <p class="w-full mt-[1.5625rem] text-[0.6875rem] leading-[0.9375rem] text-yellow-200 text-center font-bold">
                                <span>Sorteio</span>
                            </p>
                            <p class="w-full text-[1.25rem] leading-[1.4375rem] text-yellow-200 text-center font-bold">
                                <span>{{ configRef.chances }}</span>
                            </p> -->
                        </div>
                    </div>
                </section>
            </section>
        </pu-card>
        <pu-card theme="3" class="!-mt-[4rem]">
            <div class="w-full flex justify-between mt-[-23rem]">
                <a href="javascript:;" @click="starDrawFunc()" :class="configRef.chances>0?'bg-btn1_bg ':'bg-btn1_bg' " class="w-[46%] h-9 rounded-full text-center relative flex items-center justify-center">
                    <em v-if="configRef.chances>0" class="w-[1.375rem] h-[1.375rem]  text-themewhite bg-two  rounded-full bg-texterror  not-italic absolute -top-[0.6875rem] -right-[0.6875rem] flex items-center justify-center">
                        <span class="text-[1rem]">{{ configRef.chances }}</span>
                    </em>
                    <span class="text-[1.2rem]">Sorteio</span>
                </a>
                <a href="javascript:;" @click="toPage('/lucky/voucher')" class="w-[46%]  h-9 m5-theme-btn1 rounded-full text-center relative flex items-center justify-center">
                    <em v-if="configRef.count>0" class="w-[1.375rem] h-[1.375rem]  text-themewhite  bg-two rounded-full not-italic absolute -top-[0.60rem] -right-[0.55rem] flex items-center justify-center">
                        <span class="text-[1rem]">{{ configRef.count }}</span>
                    </em>
                    <span class="text-[1.2rem]">Bônus</span>
                </a>
            </div>
        </pu-card>
        <!--     -->
        <pu-card theme="3" class="mt-4">
            <div class="w-full rounded-xl p-2 relative z-10" 
                :style="{
                    'background-image': `url(${LuckyImg.m5_luckymodelbg})`,
                    'background-size': 'cover',
                    'background-position': 'center',
                    'background-repeat': 'no-repeat'
                }"
            >
                <div class="w-full p-2 ">
                    <ul class="w-full flex justify-between">
                        <template v-for="item,index in cardListRef" :key="index">
                            <li >
                                <div :style="item.count>0?'background: linear-gradient(to bottom, var(--color-themecardlinear1), var(--color-themecardlinear2));color:var(--color-m4tentext);':'background-color: var(--color-rgbablack50);opacity: 0.8'" class="w-[3.5rem]  rounded-lg relative flex flex-col items-center">
                                <div  class="text-[3.5rem] font-[600] leading-[4.6rem]">{{ item.award }}</div>
                                  
                            </div>
                                <p class="text-s text-center font-bold" :class="item.count>0?'text-themetext0':'text-white'">
                                    <span>x{{ item.count }}</span>
                                </p>
                            </li>
                        </template>
                    </ul>
                    <p class="mt-2 text-sm text-center text-white  flex align-center items-center" >
                        <img :src="CommonImg.icon_rich_warn" alt="" class="w-4 h-4 mr-1 inline-block align-middle">
                        Coletar <span class="mx-1 text-themetext0"> 5</span> cartas para resgatar <span class="mx-1 text-themetext0 font-bold"> R$100</span> </p>
                    <div class="w-full mt-4 flex justify-center">
                        <a href="javascript:;" @click="starReclamar()" :class="is_reclamar?'m5-theme-btn1  text-white':'bg-rgbablack50 text-themewhite'" class="w-full font-bold px-6 h-11 rounded-full text-center relative flex items-center justify-center">
                            <span>Coletar</span>
                        </a>
                    </div>
                </div>
            </div>
        </pu-card>
        <!-- spinResShowRef -->
        <section v-if="spinResShowRef" class="w-full h-full overflow-y-auto fixed left-0 top-0 z-[99] flex items-center justify-center">
            <em class="w-full h-full bg-black opacity-70 block absolute left-0 top-0"></em>
            <div class="w-wrap max-w-full relative">
                <div class="w-full h-[26.75rem] bg-fill" :style="{backgroundImage: `url(${LuckyImg.img_restbg})` }">
                    <div class="pt-20 text-lg text-center font-bold">
                        <span>Parabéns pela conquista</span>
                    </div>
                    <div class="pt-[7.1875rem] flex justify-center">
                        <div class="w-14 h-[3.6875rem] p-1.5  text-three  bg-fill" :style="{backgroundImage: `url(${LuckyImg.img_resitem})` }">
                            <div class="w-full h-full relative">
                                <!-- currentPenRef.type=='num' -->
                                <template v-if="currentPenRef.type=='num'">
                                    <img :src=LuckyImg.icon_money  class="w-full h-full object-contain">
                                    <p class="w-full text-[0.625rem] text-center absolute left-0 bottom-0">
                                        <span>R$&nbsp;{{ currentPenRef.award }}</span>
                                    </p>
                                </template>
                                <template v-else>
                                    <img :src="LuckyImg[`text_${currentPenRef.award.toLowerCase()}_a`]" class="w-full h-full object-contain">
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <button @click="spinResShowRef=false" class="w-[6.9375rem] h-10 text-base m5-theme-btn1 bg-fill  rounded-full " >
                        <b>Claro</b>
                    </button>
                </div>
            </div>
        </section>
        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>