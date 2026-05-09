<script setup>
import { ref } from 'vue'
import { loginShowRef, loginIndexRef } from '@/utils/config'
import FormLogin from './FormLogin.vue'
import FormRegister from './FormRegister.vue'
import {playBtnAudioFunc } from '@/utils/core'
import { gameLogo} from '@/model/pwa'
let tab_list = ref([ 'ENTRAR', 'REGISTRO' ])
import { useThemeImages } from '@/utils/themeimg'
const loginImg = useThemeImages().login 
const CommonImg = useThemeImages().common 
function changeTab(index) {
    playBtnAudioFunc()
    loginIndexRef.value = index
}

function closeLogin() {
    playBtnAudioFunc('close')
    loginShowRef.value = false
}
</script>

<template>
    <teleport to="body">
        <Transition name="fade">
            <div v-if="currentTemplate.value =='template_one'">
                <section v-if="loginShowRef" class="w-full h-full absolute left-0 top-0 z-[2000] flex items-center justify-center">
                    <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
                    <div class="max-w-full max-h-full overflow-y-auto relative">
                        <div class="w-[18.75rem] max-w-full bg-default-bg text-rgbawhite80 rounded-2xl">
                            <div class="w-full h-24 px-5  rounded-2xl bg-gradient-to-r from-gold-500 to-gold-100 relative">
                                <dl class="w-full h-20 font-bold flex">
                                    <template v-for="item,index in tab_list" :key="index">
                                        <dd @click="changeTab(index)" class="w-1/2 h-full cursor-pointer flex items-center justify-center">
                                            <span :class="index==loginIndexRef?'text-xl':'text-base opacity-65'" class=" transition-all duration-300">
                                                {{ item }}
                                            </span>
                                        </dd>
                                    </template>
                                </dl>
                                <a href="javascript:;" @click="closeLogin()" class="w-10 h-10 absolute right-2 top-0 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                                    </svg>
                                </a>
                            </div>
                            <div class="w-full h-8 px-5 -mt-7 bg-default-bg rounded-t-2xl block relative">
                                <div class="w-full h-full relative">
                                    <em :style="`left: ${loginIndexRef*50}%`" class="w-1/2 h-full absolute bottom-4 transition-all duration-300 flex justify-center">
                                    <i  class="border-b-default-bg w-0 h-0 border-l-[2rem] border-r-[2rem] border-b-[1.2rem] border-transparent block"></i>
                                    </em>
                                </div>
                            </div>
                            <div class="w-full h-[22rem] px-5 relative">
                                <FormLogin v-if="loginIndexRef==0" />
                                <FormRegister v-else />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div v-else-if="currentTemplate.value =='template_two'">
                <section v-if="loginShowRef" class="w-full h-full absolute left-0 top-0 z-[2000] flex items-center justify-center flex-col" >
            <em class="w-full h-full bg-black/25 bg-blur absolute left-0 top-0 block"></em>
            <div class="max-w-full z-10 rounded-2xl overflow-hidden" 
            :style="{background: `url(${loginImg.img_bg}) no-repeat`}"
            style="background-size: 100% auto; background-position: center top;">
                <img :src=gameLogo class="w-[8rem] h-auto block  mt-[11.5rem] ml-[10rem]" >
                <div class="w-full h-24 px-5 text-three rounded-2xl relative mt-[-1rem]">
                        <dl class="w-full h-20 font-[400] flex">
                            <template v-for="item,index in tab_list" :key="index">
                                <dd @click="changeTab(index)" class="w-1/2 h-full cursor-pointer flex items-center justify-center">
                                    <span :class="index==loginIndexRef?'text-[1rem]':'text-base opacity-65'" class=" transition-all duration-300">
                                        {{ item }}
                                    </span>
                                </dd>
                            </template>
                        </dl>
                       
                    </div>
                <div class="w-[20rem] max-w-full  text-default-text rounded-2xl bg-gradient-to-b from-card1 to-card2">
                   
                    <div class="w-full h-4 px-5 -mt-6 rounded-t-2xl block relative">
                        <div class="w-full h-full relative">
                            <em :style="`left: ${loginIndexRef*50}%`" class="w-1/2 h-full absolute bottom-4 transition-all duration-300 flex justify-center">
                                <i  class="border-b-card1 w-0 h-0 border-l-[2rem] border-r-[2rem] border-b-[1.2rem] border-transparent block"></i>
                            </em>
                        </div>
                    </div>
                    <div class="w-full h-auto px-4 pb-[1.5rem] relative ">
                        <FormLogin v-if="loginIndexRef==0" />
                        <FormRegister v-else />
                    </div>
                </div>
            </div>
            <!-- :class="isIphoneSE()?'bottom-[6%]':'bottom-[10%]'" -->
            <!-- absolute right-[50%] translate-x-[50%]  -->
            <a href="javascript:;" @click="closeLogin()" class="w-10 h-10 !z-[0]  mt-[1rem]  flex items-center justify-center">
                <img :src="CommonImg.btn_close" class="w-5 h-5">
            </a>
        </section>
            </div>
            <div v-else-if="currentTemplate.value =='template_three'">
                <section v-if="loginShowRef" class="w-full h-full absolute left-0 top-0 z-[2000] flex items-center justify-center flex-col" >
                    <em class="w-full h-full bg-black/25 bg-blur absolute left-0 top-0 block"></em>
                    <div class="max-w-full z-10 rounded-2xl overflow-hidden" 
                    :style="{background: `url(${loginImg.img_bg}) no-repeat`}"
                    style="background-size: 100% auto; background-position: center top;">
                        <img :src=gameLogo class="w-[8rem] h-auto block  mt-[6rem] ml-[10rem]" >
                        <div class="w-full h-24 px-5 text-three rounded-2xl relative mt-[-1rem]">
                                <dl class="w-full h-20 font-[400] flex">
                                    <template v-for="item,index in tab_list" :key="index">
                                        <dd @click="changeTab(index)" class="w-1/2 h-full cursor-pointer flex items-center justify-center">
                                            <span :class="index==loginIndexRef?'text-[1rem]':'text-base opacity-65'" class=" transition-all duration-300">
                                                {{ item }}
                                            </span>
                                        </dd>
                                    </template>
                                </dl>
                            
                            </div>
                        <div class="w-[20rem] max-w-full  text-default-text rounded-2xl bg-gradient-to-b from-card2 to-card1">
                        
                            <div class="w-full h-8 px-5 -mt-6 rounded-t-2xl block relative">
                                <div class="w-full h-full relative">
                                    <em :style="`left: ${loginIndexRef*50}%`" class="w-1/2 h-full absolute bottom-4 transition-all duration-300 flex justify-center">
                                        <i  class="border-b-card2 w-0 h-0 border-l-[2rem] border-r-[2rem] border-b-[1.2rem] border-transparent block"></i>
                                    </em>
                                </div>
                            </div>
                            <div class="w-full h-[18rem] px-5 relative ">
                                <FormLogin v-if="loginIndexRef==0" />
                                <FormRegister v-else />
                            </div>
                        </div>
                    </div>
                    <!-- :class="isIphoneSE()?'bottom-[6%]':'bottom-[10%]'" -->
                    <!-- absolute right-[50%] translate-x-[50%]  -->
                    <a href="javascript:;" @click="closeLogin()" class="w-10 h-10 !z-[0]  mt-[2rem]  flex items-center justify-center">
                        <img :src="CommonImg.btn_close" class="w-5 h-5">
                    </a>
                </section>
            </div>
            <div v-else-if="currentTemplate.value == 'template_four'">
                <section v-if="loginShowRef"
                    class="w-full h-full absolute left-0 top-0 z-[2000] flex items-center justify-center flex-col">
                    <em class="w-full h-full bg-tablebg2  absolute left-0 top-0 block"></em>
                    <a href="javascript:;" @click="closeLogin()"
                        class="w-10 h-10 z-[2001]  absolute right-0 top-0 flex items-center justify-center">
                        <img :src="loginImg.icon_colse" class="w-5 h-5">
                    </a>
                    <img :src=gameLogo class="w-[12rem] h-auto object-contain object-left z-[0]" />
                    <div class="max-w-full z-10  mt-10">
                        <div class="w-full h-24  m4-text   relative">
                            <dl class="w-full h-20 font-[600] flex">
                                <template v-for="item, index in tab_list" :key="index">
                                    <dd @click="changeTab(index)"
                                        class="w-1/2 h-full cursor-pointer flex items-center flex-col justify-center">
                                        <span :class="index == loginIndexRef ? ' m4-text' : ' text-white'"
                                            class=" transition-all duration-300">
                                            {{ item }}
                                        </span>
                                        <div class=" w-full h-[0.1rem] mt-2"
                                            :class="index == loginIndexRef ? 'm4-ten-btn' : ' bg-rgbawhite10'"></div>
                                    </dd>

                                </template>
                            </dl>


                        </div>
                        <div class="w-[20rem] max-w-full  text-default-text  ">
                            <div class="w-full h-[18rem]  relative ">
                                <FormLogin v-if="loginIndexRef == 0" />
                                <FormRegister v-else />
                            </div>
                        </div>
                    </div>
                    <!-- :class="isIphoneSE()?'bottom-[6%]':'bottom-[10%]'" -->
                    <!-- absolute right-[50%] translate-x-[50%]  -->

                </section>
            </div>
            <div v-else-if="currentTemplate.value =='template_five'">
                <section v-if="loginShowRef" class="w-full h-full absolute left-0 top-0 z-[2000] flex items-center justify-center flex-col" >
                    <em class="w-full h-full bg-black/25 bg-blur absolute left-0 top-0 block"></em>
                    
                    <div class="max-w-full h-auto z-10 rounded-2xl overflow-hidden flex flex-col items-center">
                        <a href="javascript:;" @click="closeLogin()" class="block absolute top-10 right-6  text-3xl text-thenmewhite z-100">
                            ×
                        </a>
                        <img :src=loginImg.img_bg class="w-full h-auto px-5">
                        <div class="w-full  px-5  rounded-2xl relative -mt-14">
                            <dl class="w-full font-[400] flex bg-btn1_bg text-thenmewhite rounded-t-2xl">
                                <template v-for="item,index in tab_list" :key="index">
                                    <dd @click="changeTab(index)" class="w-1/2 h-[2.5rem] cursor-pointer flex items-center justify-center" :class="index==loginIndexRef?'bg-btnlinar3 rounded-t-2xl':'bg-btn1_bg rounded-t-2xl'">
                                        <span :class="index==loginIndexRef?'text-[1rem]':'text-base'" class=" transition-all duration-300">
                                            {{ item }}
                                        </span>
                                    </dd>
                                </template>
                            </dl>
                        </div>
                        <div class="w-full px-5  flex items-center text-default-text">
                            <div class="w-full h-[20rem] pt-8 px-4 pb-[1.5rem]  bg-gradient-to-b from-btnlinar3 to-btnlinar4  rounded-b-2xl">
                                <FormLogin v-if="loginIndexRef==0" />
                                <FormRegister v-else />
                            </div>
                        </div>
                    </div>
                    <!-- :class="isIphoneSE()?'bottom-[6%]':'bottom-[10%]'" -->
                    <!-- absolute right-[50%] translate-x-[50%]  -->
                    
                </section>
            </div>
        </Transition>
    </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>