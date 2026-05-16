<script setup>
import { ref } from 'vue'
import { t } from '@/i18n'
import { signInModel } from '@/model/other'
import {playBtnAudioFunc } from '@/utils/core'
import { useThemeImages } from '@/utils/themeimg'
const CommonImg = useThemeImages().common 
const VipImg = useThemeImages().vip
const SignImg = useThemeImages().sign
const TRechargeImg = useThemeImages().totalrecharge
const { signShowRef, signConfigRef, signBonusRef, signSuccessRef, starSignInFunc } = signInModel()

let currentIndex = 1;
function onclickData(item,index) {
    currentIndex = index
    if(item.status == 1) {
        starSignInFunc()
    }
}

function close() {
    playBtnAudioFunc('close')
    signShowRef.value = false
}

</script>

<template>
    <teleport to="body">
        <!-- signShowRef -->
    <section v-if="signShowRef" class="w-full h-full fixed left-0 top-0 z-[99] flex items-center justify-center">
        <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
        <div v-if="currentTemplate.value =='template_one'">
            <section class="w-full max-h-full overflow-y-auto px-ctx">
            <div class="w-[21.25rem] max-w-full mx-auto relative">
                <div class="w-full h-[30rem] bg-fill bg-no-repeat flex flex-col items-center" :style="{backgroundImage: `url(${SignImg.bg_sign})`}">
                    <div class="w-full relative flex justify-end" style="padding: 1.5625rem .3125rem 0 0;">
                        <!-- <img src="/imgs/sign-days.png" class="w-auto h-[3.25rem]"> -->
                        <button @click="close()" class="w-10 h-10 bg-rgbawhite30 rounded-full absolute right-0 top-0 flex items-center justify-center">
                            <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="w-[19.8125rem] h-[16.875rem] pt-20 mt-[3rem] ml-0.5 relative">
                        <ul class="!py-[0.2125rem] !px-[0.65625rem] mt-5 flex flex-wrap justify-between">
                            <template v-for="item,index in signConfigRef.configList||[]" :key="index">
                                <li
                                :style="{
                                    backgroundImage:
                                        index < 7 && item.status != 1 ? `url(${SignImg.bg_daysign1})` :
                                        index == 7 && item.status != 1 ? `url(${SignImg.bg_day7sign1})` :
                                        index < 7 && item.status == 1 ? `url(${SignImg.bg_daysign2})` :
                                        index == 7 && item.status == 1 ? `url(${SignImg.bg_day7sign2})` : ''
                                }"
                                class="bg-no-repeat bg-fill relative block"
                                :class="index == 7 ? 'w-[13.75rem] mt-[0.15rem] mx-[1.875rem]' : 'w-[5.825rem] mb-[0.5125rem] h-[5.9375rem]'"
                                @click="onclickData(item)"
                                >
                                    <em v-if="index != 7&& item.status == 1 " class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                                        <img :src=SignImg.bg_light class="w-[4.9375rem] h-[4.9375rem] sign-day-light">
                                    </em>
                                    <p class="text-[0.8125rem] leading-[1.25rem] mt-[0.1rem] text-center text-themewhite" >
                                            <span>Dia{{ index }}</span>
                                    </p>
                                    <div class="w-full h-[2.825rem] flex flex-col items-center justify-center">
                                        <div v-if="index != 7" class="w-full h-[6rem]  flex justify-center">
                                            <div class="relative flex justify-cente">
                                                <img :src="SignImg[`icon_coin${index}`]" class="w-auto h-[6rem] ">
                                            </div>
                                        </div>
                                        <!-- -->
                                        <em v-if="item.status==4 " class="w-full h-full rounded-[0.5625rem] bg-rgbablack50 text-rgbawhite80 not-italic absolute top-0 left-0 flex items-center justify-center">
                                            <p class="px-2 text-[0.6875rem] text-center">SUBSCRIPTION INTERRUPTED</p>
                                        </em>
                                        <em v-if="item.status == 2" class="w-full h-[5.8rem] mt-1 rounded-[0.5625rem] bg-rgbablack50 absolute flex justify-center items-center">
                                            <i class="w-7 h-7 ctx-theme__linear rounded-full flex flex-col items-center justify-center">
                                                <svg class="w-5 h-5" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 24L20 34L40 14" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </i>
                                        </em>
                                    </div>
                                    <div class="relative h-[1.3rem] text-center">
                                        <div v-if="item.cond == 'today'" class="absolute -top-3 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-body-bg text-themewhite text-[0.625rem] leading-none whitespace-nowrap">Depósito{{ item.cond_num }}</div>
                                        <p class="h-[1.125rem] text-[0.8125rem]  leading-[1.25rem] text-center" :class="index!=7?'pt-[0.3rem]':'pt-[-1rem]'">
                                            <span class="text-nine text-[0.8rem] font-bold">{{ currentUnit.value }} {{ item.cond == 'today'? ((Number(item.money)||0)+(Number(item.cond_num)||0)):item.money }} </span>
                                        </p>
                                    </div>
                                </li>
                            </template>
                        </ul>
                        <div v-if="signSuccessRef" class="w-full h-[22.125rem] bg-rgbablack50 absolute left-0 top-12">
                            <img :src=SignImg.bg_light class="w-full h-full opacity-15 sign-day-light">
                            <div class="w-full h-full absolute left-0 top-0 flex flex-col items-center justify-center">
                                <img :src="SignImg[`icon_coin${currentIndex}`]" class="w-auto h-[6.1875rem]">
                                <p class="text-themewhite">{{ currentUnit.value }}{{ signBonusRef }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full mt-6 flex justify-center">
                    <button @click="starSignInFunc()" 
                    :class="[
                            'w-36 h-12 !px-3 !text-base rounded-xl flex items-center justify-center',
                                signConfigRef.todayStatus
                                ? currentTemplate.value === 'template_one'
                                    ? 'ctx-theme__linear'
                                    : 'm3-theme-btn1'
                                : currentTemplate.value === 'template_one'
                                    ? '!text-rgbawhite50 bg-rgbawhite10 border border-rgbawhite10'
                                    : 'bg-gray-200 text-gray-600'
                            ]">
                        <span>Receber</span>
                    </button>
                </div>
            </div>
        </section>
        </div>
        <div v-if="currentTemplate.value =='template_two'">
            <section class="w-full max-h-full overflow-y-auto ">
            <div class="w-[24rem] max-w-full mx-auto relative">
                <div class="w-full h-[34rem] bg-fill bg-no-repeat flex flex-col items-center" :style="{backgroundImage: `url(${SignImg.bg_sign})`}">
                    <div class="w-full relative flex justify-end" style="padding: 1.5625rem .3125rem 0 0;">
                        <!-- <img src="/imgs/sign-days.png" class="w-auto h-[3.25rem]"> -->
                        <button @click="close()" class="w-10 h-10 absolute right-[1.5rem] top-0 flex items-center justify-center">
                            <img :src="CommonImg.btn_close" class="w-[1.5rem] h-[1.5rem]"/>
                        </button>
                    </div>
                    <div class="w-[21.25rem] h-[16.875rem] pt-[8.7rem] mt-6 ml-[-0.15rem] relative">
                        <ul class="!py-[0.2125rem]  mt-3 flex flex-wrap justify-between ">
                            <template v-for="item,index in signConfigRef.configList||[]" :key="index">
                                <li 
                                :class="{
                                    'sign-day-bg-1 w-[7rem] h-[7rem] mb-[0.1rem]': index < 7 && item.status != 1,
                                    'sign-day-bg-2 w-[17rem] mt-[0.15rem] mx-[2rem]': index == 7 && item.status != 1,
                                    'sign-day-bg-check-1 w-[7rem] h-[7rem] mb-[0.1rem]': index < 7 && item.status == 1,
                                    'sign-day-bg-check-2 w-[17rem] mt-[0.15rem] mx-[2rem]': index == 7 && item.status == 1,
                                }"
                                :style="{
                                    backgroundImage:
                                        index < 7 && item.status != 1 ? `url(${SignImg.bg_daysign1})` :
                                        index == 7 && item.status != 1 ? `url(${SignImg.bg_day7sign1})` :
                                        index < 7 && item.status == 1 ? `url(${SignImg.bg_daysign2})` :
                                        index == 7 && item.status == 1 ? `url(${SignImg.bg_day7sign2})` : ''
                                }"
                                @click="onclickData(item)" class="h-[6.5rem] bg-no-repeat bg-fill relative block">
                                    <em v-if="item.status == 1" class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                                        <img :src=SignImg.bg_light  class="w-[4.9375rem] h-[4.9375rem] sign-day-light">
                                    </em>
                                    <p class="h-[1.525rem] text-[0.8125rem] leading-[1.55rem]  text-themewhite  text-center">
                                            <span>Dia{{ index }}</span>
                                    </p>
                                    <div class="w-full h-[2.825rem] flex flex-col items-center justify-center mt-[0.25rem]">
                                        <div v-if="index != 7" class="w-full h-[7rem]  flex justify-center">
                                            <div class="relative flex justify-cente">
                                                <!-- :class="index==4&&index==5?'mt-2':''" -->
                                                <img :src="SignImg[`icon_coin${index}`]" class="w-auto h-[7rem] mt-2" >
                                            </div>
                                        </div>
                                        <!---->
                                        <!--  -->
                                        <em v-if="item.status==4" class="w-[7rem] h-[6.8rem] rounded-[0.5625rem] bg-black/60 text-[#E4E5FF] not-italic absolute top-0 left-0 flex items-center justify-center">
                                            <!-- <p class="px-2 text-[0.6875rem] text-center">SUBSCRIPTION INTERRUPTED</p> -->
                                             <img :src="SignImg.icon_gou" class="w-[4rem] h-[4rem] ">
                                        </em>
                                        <em v-if="item.status == 2" class=" w-[7rem] h-[6.8rem] rounded-[0.5625rem] bg-black/60 absolute top-[0rem] flex justify-center items-center">
                                            <img :src="SignImg.icon_gou" class="w-[4rem] h-[4rem] ">
                                        </em>
                                    </div>
                                    <div class="relative h-[1.125rem] text-center mt-0.5">
                                        <div v-if="item.cond == 'today'" class="absolute -top-3 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-rgbablack50 text-white text-[0.625rem] leading-none whitespace-nowrap">Depósito{{ item.cond_num }}</div>
                                        <p class="h-[1.125rem] text-[0.8125rem]  leading-[1.25rem] text-center" :class="index==7?'pt-0.5':'pt-2.5'">
                                            <span class="text-[#914d16] text-[0.8rem] font-bold">{{ currentUnit.value }} {{ item.cond == 'today'? ((Number(item.money)||0)+(Number(item.cond_num)||0)):item.money }} </span>
                                        </p>
                                    </div>
                                </li>
                            </template>
                        </ul>
                        <div v-if="signSuccessRef" class="w-full h-[22.125rem] bg-black/55 absolute left-0 top-12">
                            <img :src=SignImg.bg_light class="w-full h-full opacity-15 sign-day-light">
                            <div class="w-full h-full absolute left-0 top-0 flex flex-col items-center justify-center">
                                <img :src="SignImg[`icon_coin${currentIndex}`]" class="w-auto h-[6.1875rem]">
                                <p class=" text-three ">{{ currentUnit.value }}{{ signBonusRef }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full mt-6 flex justify-center">
                    <button @click="starSignInFunc()" :class="signConfigRef.todayStatus?'m2-btn-ten':'m2-btn-nine-false'" class="w-36 h-12 !px-3 !text-base rounded-[2rem]">
                        <span class="text-[1.25rem]">Receber</span>
                    </button>
                </div>
            </div>
            </section>
        </div >
        <div v-if="currentTemplate.value =='template_three'">
            <section class="w-full max-h-full overflow-y-auto ">
                <div class="w-[22rem] max-w-full mx-auto relative">
                    <div class="w-full h-[31rem] bg-fill bg-no-repeat flex flex-col items-center" :style="{backgroundImage: `url(${SignImg.bg_sign})`}">
                        <div class="w-full relative flex justify-end" style="padding: 1.5625rem .3125rem 0 0;">
                            <!-- <img src="/imgs/sign-days.png" class="w-auto h-[3.25rem]"> -->
                            <button @click="close()" class="w-10 h-10absolute right-0 top-0 flex items-center justify-center">
                                <img :src="CommonImg.btn_close" class="w-[1.5rem] h-[1.5rem]"/>
                            </button>
                        </div>
                        <div class="w-[21.25rem] h-[16.875rem] pt-[5.5rem] mt-3 ml-2 relative">
                            <ul class="!py-[0.2125rem] !px-[0.7rem] mt-3 flex flex-wrap justify-between ">
                                <template v-for="item,index in signConfigRef.configList||[]" :key="index">
                                    <li 
                                    :class="{
                                        'sign-day-bg-1 w-[6.5rem] h-[6.5rem] mb-[0.1rem]': index < 7 && item.status != 1,
                                        'sign-day-bg-2 w-[16rem] mt-[0.15rem] mx-[2rem]': index == 7 && item.status != 1,
                                        'sign-day-bg-check-1 w-[6.5rem] h-[6.5rem] mb-[0.1rem]': index < 7 && item.status == 1,
                                        'sign-day-bg-check-2 w-[16rem] mt-[0.15rem] mx-[2rem]': index == 7 && item.status == 1,
                                    }"
                                    :style="{
                                        backgroundImage:
                                            index < 7 && item.status != 1 ? `url(${SignImg.bg_daysign1})` :
                                            index == 7 && item.status != 1 ? `url(${SignImg.bg_day7sign1})` :
                                            index < 7 && item.status == 1 ? `url(${SignImg.bg_daysign2})` :
                                            index == 7 && item.status == 1 ? `url(${SignImg.bg_day7sign2})` : ''
                                    }"
                                    @click="onclickData(item,index)" class="h-[6.5rem] bg-no-repeat bg-fill relative block">
                                        <em v-if="item.status == 1" class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                                            <img :src=SignImg.bg_light  class="w-[4.9375rem] h-[4.9375rem] sign-day-light">
                                        </em>
                                        <p class="h-[1.525rem] text-[0.8125rem] leading-[1.55rem]  text-three  text-center">
                                                <span :class="item.status == 1?'text-themetext4':''">{{ t('Day') }}{{ index }}</span>
                                        </p>
                                        <div class="w-full h-[2.825rem] flex flex-col items-center justify-center mt-[0.25rem]">
                                            <div v-if="index != 7" class="w-full h-[7rem]  flex justify-center">
                                                <div class="relative flex justify-cente">
                                                    <img :src="SignImg[`icon_coin${index}`]" class="w-auto h-[7rem] ">
                                                </div>
                                            </div>
                                            <!---->
                                            <!--  -->
                                            <em v-if="item.status==4" class="w-full h-full rounded-[0.5625rem] bg-black/60 text-[#E4E5FF] not-italic absolute top-0 left-0 flex items-center justify-center">
                                                <!-- <p class="px-2 text-[0.6875rem] text-center">SUBSCRIPTION INTERRUPTED</p> -->
                                                <img :src="SignImg.icon_gou" class="w-[4rem] h-[4rem] ">
                                            </em>
                                            <em v-if="item.status == 2" class="w-full h-[6.1875rem] rounded-[0.5625rem] bg-black/60 absolute flex justify-center items-center">
                                                <img :src="SignImg.icon_gou" class="w-[4rem] h-[4rem] ">
                                            </em>
                                        </div>
                                        <div class="relative h-[1.125rem] text-center mt-0.5">
                                            <div v-if="item.cond == 'today'&&item.status != 2" class="absolute -top-3 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-tablergba text-white text-[0.625rem] leading-none whitespace-nowrap">{{ t('deposit') }} {{ item.cond_num }}</div>
                                            <p class="h-[1.125rem] text-[0.8125rem] pt-0.5 leading-[1.25rem] text-center">
                                                <span class="text-[#914d16] text-[0.8rem] font-bold mr-2">Max </span>
                                                <span class="text-[#914d16] text-[0.8rem] font-bold">{{ currentUnit.value }} {{ item.cond == 'today'? ((Number(item.money)||0)+(Number(item.cond_num)||0)):item.money }} </span>
                                            </p>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                            <!-- signSuccessRef -->
                            <div v-if="signSuccessRef" class="w-full h-[22.125rem] bg-black/55 absolute left-0 top-12">
                                <img :src=SignImg.bg_light class="w-full h-full opacity-15 sign-day-light">
                                <div class="w-full h-full absolute left-0 top-0 flex flex-col items-center justify-center">
                                    <img :src="SignImg[`icon_coin${currentIndex}`]" class="w-auto h-[6.1875rem]">
                                    <p class=" text-three ">{{ currentUnit.value }} {{ signBonusRef }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full mt-6 flex justify-center">
                        <button @click="starSignInFunc()" :class="signConfigRef.todayStatus?'m3-theme-btn1':'m3-theme-btn3'" class="w-36 h-12 !px-3 !text-base rounded-[2rem]">
                            <span class="text-[1.25rem]">{{ t('Receive') }}</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
        <div v-if="currentTemplate.value =='template_four'">
            <section class="w-full max-h-full overflow-y-auto ">
            <div class="w-[22rem]  max-w-full mx-auto relative ">
                <div class="w-full flex flex-col items-center" 
                :style="{
                    backgroundImage: `url(${SignImg.bg_sign})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat'
                    }" >
                    <div class="w-full relative flex justify-end" style="padding: 1.5625rem 0.3125rem 0 0;">
                        <!-- <img src="/imgs/sign-days.png" class="w-auto h-[3.25rem]"> -->
                        <button @click="close()" class="w-10 h-10 absolute right-0 top-3 flex items-center justify-center">
                            <img :src="CommonImg.btn_close" class="w-[1rem] h-[1rem]"/>
                        </button>
                    </div>
                    <div >
                        <ul class="!py-[0.2125rem] !px-[0.7rem] mt-[3rem] flex flex-wrap justify-between !pr-[1rem]">
                            <template v-for="item,index in signConfigRef.configList||[]" :key="index">
                                <li  @click="onclickData(item)" class=" px-2 py-1  relative block mb-2" :class="index==7?'w-full':'w-[30%]'"
                                :style="{
                                    backgroundImage:
                                        index < 7 && item.status != 1 ? `url(${SignImg.bg_daysign1})` :
                                        index == 7 && item.status != 1 ? `url(${SignImg.bg_day7sign1})` :
                                        index < 7 && item.status == 1 ? `url(${SignImg.bg_daysign2})` :
                                        index == 7 && item.status == 1 ? `url(${SignImg.bg_day7sign2})` : '',
                                        backgroundSize: '100% 100%',
                                        backgroundPosition: 'center'
                                }"  >
                                    <div >
                                        <p class="h-[1.525rem] text-[0.8125rem] leading-[1.55rem]   font-bold  text-center" 
                                        :class="signConfigRef.todayStatus&&item.status==1?'text-theme':' text-themewhite'"
                                        >
                                            <span>Dia&nbsp;{{ index }}</span>
                                    </p>
                                    <div class="w-full h-[2.825rem] flex flex-col items-center justify-center mt-[0.25rem]">
                                        <div v-if="index != 7" class="w-full  flex justify-center">
                                            <div class="relative flex justify-cente">
                                                <img :src="TRechargeImg.img_itemcoin" class="w-[3.5rem]">
                                            </div>
                                        </div>
                                        <div v-else class="w-full  flex justify-center">
                                            <div class="relative flex justify-cente">
                                                <img :src="SignImg[`icon_coin${index}`]" class="w-[3.5rem] z-[0]">
                                            </div>
                                        </div>
                                        <!---->
                                          <em v-if="item.status==4" class="w-full h-full rounded-[0.5625rem] bg-black/60 text-[#E4E5FF] not-italic absolute top-0 left-0 flex items-end justify-center">
                                            <!-- <p class="px-2 text-[0.6875rem] text-center">SUBSCRIPTION INTERRUPTED</p> -->
                                             <img :src="SignImg.icon_gou" class="w-[1rem] h-[1rem]  mb-5 ">
                                        </em>
                                        <em v-if="item.status == 2" class="w-full h-full rounded-[0.5625rem] bg-black/60 absolute top-0 left-0 flex justify-center items-end">
                                            <img :src="SignImg.icon_gou" class="w-[1rem] h-[1rem] mb-5">
                                        </em>
                                    </div>
                                    <div class=" h-[1rem] text-center mb-[-0.5rem]" :class="index == 7?'max-w-[4rem] mx-auto absolute  left-1/2 -translate-x-1/2 top-[4.5rem] -translate-y-1/2':''">
                                        <div v-if="item.cond == 'today'" class=" px-1.5 py-0.5 rounded-full bg-black/50 text-white text-[0.625rem] leading-none whitespace-nowrap">Depósito{{ item.cond_num }}</div>
                                        
                                    </div>
                                    <p class="h-[1.125rem] text-[0.7rem] pt-0.5 leading-[1.25rem] text-center " :class="index == 7 ? 'mt-[0.15rem]' : 'mt-[0.25rem]'">
                                        <span class="text-white ">Max </span> 
                                        <span class="m4-text font-bold">{{ currentUnit.value }} <span class="text-themetext0 text-[1rem] ">{{ item.cond == 'today'? ((Number(item.money)||0)+(Number(item.cond_num)||0)):item.money }} </span> </span>
                                    </p>
                                    
                                    <img :src="CommonImg.btn_close" alt="" class="w-[1rem] h-[1rem] m-auto mt-2" v-if="item.status==4"/>
                                    <div class="m-auto mt-3 px-3 py-1 rounded-full max-w-[10rem] text-[0.68rem] text-center font-bold" :class="signConfigRef.todayStatus&&item.status==1?'m4-nine-btn':' text-white/20 bg-black/20 ' " >Receber</div>
                                    </div>
                                   
                                </li>
                            </template>
                        </ul>
                        <!-- signSuccessRef -->
                        <div v-if="signSuccessRef" class="w-full h-[22.125rem] bg-black/55 absolute left-0 top-12">
                            <img :src=SignImg.bg_light class="w-full h-full opacity-15 sign-day-light">
                            <div class="w-full h-full absolute left-0 top-0 flex flex-col items-center justify-center">
                                <img :src="SignImg[`icon_coin${currentIndex}`]" class="w-auto h-[6.1875rem]">
                                <p class=" text-three ">{{ currentUnit.value }}{{ signBonusRef }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
        </div>
        <div v-if="currentTemplate.value == 'template_five'">
        <section class="w-full max-h-full overflow-y-auto px-ctx">
          <div class="w-[21.25rem] max-w-full mx-auto relative">
            <div
              class="w-full h-[30rem] bg-fill bg-no-repeat flex flex-col items-center"
              :style="{ backgroundImage: `url(${SignImg.bg_sign})` }"
            >
              <div
                class="w-full relative flex justify-end"
                style="padding: 1.5625rem 0.3125rem 0 0"
              >
                <!-- <img src="/imgs/sign-days.png" class="w-auto h-[3.25rem]"> -->
                <button
                  @click="close()"
                  class="w-8 h-8 rounded-full absolute right-0 top-0 flex items-center justify-center text-[1.75rem]"
                >
                  ×
                </button>
              </div>
              <div
                class="w-full h-full pt-8 mt-[3rem] relative"
              >
                <ul
                  class="!px-[0.45625rem] mt-5 flex flex-wrap justify-between"
                >
                  <template
                    v-for="(item, index) in signConfigRef.configList || []"
                    :key="index"
                  >
                    <li
                      :style="{
                        backgroundImage:
                          index < 7 && item.status != 1
                            ? `url(${SignImg.bg_daysign1})`
                            : index == 7 && item.status != 1
                            ? `url(${SignImg.bg_day7sign1})`
                            : index < 7 && item.status == 1
                            ? `url(${SignImg.bg_daysign2})`
                            : index == 7 && item.status == 1
                            ? `url(${SignImg.bg_day7sign1})`
                            : '',
                      }"
                      class="bg-no-repeat bg-fill relative block"
                      :class="
                        index == 7
                          ? 'w-full h-[7.2375rem]'
                          : 'w-[6.425rem] mb-[0.4125rem] h-[6.8375rem]'
                      "
                      @click="onclickData(item)"
                    >
                      <!-- <em
                        v-if="item.status == 1"
                        class="w-full h-full absolute left-0 top-0 flex items-center justify-center"
                      > -->
                        <!-- <img
                          :src="SignImg.bg_light"
                          class="w-[4.9375rem] h-[4.9375rem] sign-day-light"
                        /> -->
                      <!-- </em> -->
                      <em v-if="item.status == 2" class="w-full h-full absolute left-0 top-0 flex items-center justify-center bg-black/50 rounded-[0.5625rem] z-[100]">
                        <img :src=SignImg.icon_gou class="w-[2.4375rem] h-[2.4375rem]">
                    </em>
                      <p
                        v-if = "index != 7"
                        class="text-[0.8125rem] leading-[1.25rem] mt-[0.1rem] text-center text-themewhite"
                      >
                        <span>Dia{{ index }}</span>
                      </p>
                      <div
                        class="w-full h-[2.825rem] flex flex-col items-center justify-center"
                      >
                        <em
                          v-if="item.status == 4"
                          class="w-full h-full rounded-[0.5625rem] bg-rgbablack50 text-rgbawhite80 not-italic absolute top-0 left-0 flex items-center justify-center"
                        >
                          <p class="px-2 text-[0.6875rem] text-center">
                            SUBSCRIPTION INTERRUPTED
                          </p>
                        </em>
                      </div>
                      <div v-if="index!=7" class="relative h-[1.3rem] flex flex-col items-center justify-center">
                        <div
                          v-if="item.cond == 'today'"
                          class="w-[4rem] px-1.5 py-0.5 rounded-full bg-rgbablack30 text-themewhite text-[0.625rem] leading-none mt-[0.6rem]"
                        >
                          Depósito{{ item.cond_num }}
                        </div>
                        <p class="h-[1.125rem] text-[0.8125rem] leading-[1.25rem] text-center pt-[0.1rem]">
                        <span class="text-themewhite text-[0.7rem]">MAX </span>
                          <span class="text-themetext0 text-[0.7rem]">{{ currentUnit.value }} </span>
                          <span class="text-themetext0 text-[1rem] font-bold">
                            {{
                              item.cond == "today"
                                ? (Number(item.money) || 0) +
                                  (Number(item.cond_num) || 0)
                                : item.money
                            }}
                          </span>
                        </p>
                      </div>
                      <div class="absolute w-1/2 h-full right-0 top-7 flex flex-col items-center inline-block" v-else>
                        <p class="h-[1.125rem] text-[0.8125rem] leading-[1.25rem] pt-[0.1rem]">
                            <span class="text-themewhite text-[1rem]">MAX &nbsp;</span>
                          <span class="text-themetext0 text-[1rem]">{{ currentUnit.value }} &nbsp;</span>
                          <span class="text-themetext0 text-[1.6rem] font-bold">
                            {{
                              item.cond == "today"
                                ? (Number(item.money) || 0) +
                                  (Number(item.cond_num) || 0)
                                : item.money
                            }}
                          </span>
                        </p>
                        <div class="w-[7rem] h-[2rem] px-1.5 rounded-full  text-themewhite text-[0.825rem] font-bold text-center leading-[2rem] mt-[1.2rem]"
                            :class="index == 7 && item.status == 1?'m5-theme-btn1':'bg-rgbablack30'"
                        >
                          Get
                        </div>
                      </div>
                    </li>
                  </template>
                </ul>
                <div
                  v-if="signSuccessRef"
                  class="w-full h-[22.125rem] bg-rgbablack50 absolute left-0 top-12"
                >
                  <img
                    :src="SignImg.bg_light"
                    class="w-full h-full opacity-15 sign-day-light"
                  />
                  <div
                    class="w-full h-full absolute left-0 top-0 flex flex-col items-center justify-center"
                  >
                    <img
                      :src="SignImg.icon_coin1"
                      class="w-auto h-[6.1875rem]"
                    />
                    <p class="text-themewhite">{{ currentUnit.value }}{{ signBonusRef }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    </teleport>
</template>
<style scoped>
.sign-day-bg-1 {
    background-image: url(/imgs/sign-day-bg-1.png);
}
.sign-day-bg-2 {
    background-image: url(/imgs/sign-day-bg-2.png);
}
.sign-day-bg-check-1 {
    background-image: url(/imgs/sign-day-check-1.png);
}
.sign-day-bg-check-2 {
    background-image: url(/imgs/sign-day-check-2.png);
}
.sign-day-light {
    animation: sign-light 5s linear infinite;
}
@keyframes sign-light {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>