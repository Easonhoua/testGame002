<script setup>
import {} from 'vue'
import { useScreenSafeArea } from '@vueuse/core'
import { bodyWidthRef, serviceShowRef, serviceListRef } from '@/utils/config'
import {playBtnAudioFunc } from '@/utils/core'
import { appIcon} from '@/model/pwa'
import { useThemeImages } from '@/utils/themeimg'
const CommonBgImg = useThemeImages().commonbg 
const HomeImg = useThemeImages().home
const CommonImg = useThemeImages().common 
const MineImg = useThemeImages().mine
const { top, bottom } = useScreenSafeArea()

function choiceService(item) {
    if(item.link_type == 2) {
        window.open('https://api.whatsapp.com/send?phone='+item.link)
    }else if(item.link_type == 3) {
        window.open('https://t.me/'+item.link)
    }else {
        window.open(item.link)
    }
}
function close() {
    playBtnAudioFunc('close')
    serviceShowRef.value = false
}
</script>

<template>
    <div>
        <van-popup
            v-model:show="serviceShowRef"
            position="bottom"
            class="popup-container h-full  !z-[2999]"
            overlay-class="popup-overlay"
            :style="{background: `url(${CommonBgImg.bg_body_1})  center` }"
            style="background-size: cover;"
            teleport="body"
            v-if="currentTemplate.value =='template_one'"
        >
            <section :style="`padding-top: ${top};`" class="w-full">
                <div class="w-full h-[3.25rem] relative flex items-center justify-center">
                    <h3 class="text-base leading-4 font-medium text-center line-clamp-2 capitalize" style="max-width: 60%;">
                        <span>Configuração de Senha</span>
                    </h3>
                    <div class="absolute top-0 right-0 h-full flex items-center">
                        <a @click="close()" href="javascript:;" class="h-full px-3 flex items-center">
                            <em class="w-[1.375rem] h-[1.375rem] bg-rgbawhite10 rounded-full flex items-center justify-center">
                                <icon-close class="w-3 h-3"></icon-close>
                            </em>
                        </a>
                    </div>
                </div>
            </section>
            <pu-card theme="3" class="py-5">
                <ul class="-mx-2 flex flex-wrap">
                    <template v-for="item,index in serviceListRef" :key="index">
                        <li @click="choiceService(item)" class="w-1/2 p-2">
                            <dl class="w-full h-[12rem] p-4 bg-default-bg text-rgbawhite80 rounded-lg flex flex-col">
                                <dt class="flex-1 overflow-hidden">
                                    <em class="w-[3.125rem] h-[3.125rem] mx-auto block">
                                        <van-image v-if="item.link_type==2" src="/imgs/lo_whatsapp.svg" width="100%" height="100%" fit="contain" />
                                        <van-image v-else-if="item.link_type==3" src="/imgs/lo_telegram.svg" width="100%" height="100%" fit="contain" />
                                        <van-image v-else :src=appIcon width="100%" height="100%" round />
                                    </em>
                                    <h5 class="mt-1 text-sm text-center font-bold opacity-80">
                                        <span v-if="item.link_type==2">Whatsapp</span>
                                        <span v-else-if="item.link_type==3">Telegram</span>
                                        <span v-else>On-line</span>
                                    </h5>
                                    <p class="mt-2 text-[0.625rem] text-center opacity-25">
                                        <span v-if="item.link_type==2">Whatsapp {{ item.link }}</span>
                                        <span v-else-if="item.link_type==3">Telegram {{ item.link }}</span>
                                        <span v-else>atendimento online</span>
                                    </p>
                                </dt>
                                <dd class="w-full flex justify-center shrink-0">
                                    <a href="javascript:;" class="min-w-16 h-6 px-3 text-xs ctx-theme rounded-lg flex items-center justify-center">
                                        <span>Chat</span>
                                    </a>
                                </dd>
                            </dl>
                        </li>
                    </template>
                </ul>
                <p class="pt-6 pb-4 text-[0.8125rem] text-rgbawhite50 text-center">
                    <span>Bem-vindo! Clique em "CHAT" para entrar em contato conosco através do portal de atendimento ao cliente.</span>
                </p>
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
        <van-popup
            v-model:show="serviceShowRef"
            position="bottom"
            class="popup-container h-full !bg-rgbablack50  bg-blur !z-[2999]"
            overlay-class="popup-overlay"
            teleport="body"
             v-else-if="currentTemplate.value =='template_two'"
        >
         <!-- 固定顶部栏 -->
         <header class="w-wrap max-w-full fixed left-1/2 top-0 -translate-x-1/2 flex items-center justify-center  z-50 box-content text-three " 
         :style="{background: `url(${HomeImg.img_topBg})  center` }"
         style=" background-size: 100% 100%;">
       
            <div class="w-full h-[3.125rem] relative z-20">
                <div @click="close()" 
                        class="px-3 h-full absolute left-0 top-0 flex justify-center items-center cursor-pointer">
                        <img :src=CommonImg.btn_back class="w-9 h-9 mt-1">
                </div>
                <div class="w-full h-full flex justify-center items-center">
                    <h3 class="text-base text-three">
                        <span>Configuração de Senha</span>
                    </h3>
                </div>
            </div>
        </header>
            
            <pu-card theme="3" class="py-5 pt-[3.125rem]">
                <img :src="CommonImg.icon_server" alt="" class=" w-[6rem] h-auto block mx-auto mt-9">
                <p class="pt-6 pb-4 text-[0.8125rem] text-theme text-center">
                    <span>Bem-vindo! Clique em "CHAT" para entrar em contato conosco através do portal de atendimento ao cliente.</span>
                </p>
                <ul class="-mx-2 flex flex-col">
                    <template v-for="item,index in serviceListRef" :key="index">
                        <li @click="choiceService(item)" class="w-full p-2">
                            <dl class="w-full h-[6rem] p-4 bg-gradient-to-r from-[#fff]/[0.18] to-[#749488]/[0.18]  border border-[#fff]/[0.25]  rounded-[1rem] flex items-center justify-between">
                                <dt class=" overflow-hidden flex items-center justify-between">
                                    <em class="w-[3.125rem] h-[3.125rem] mx-auto block mr-4">
                                        <van-image v-if="item.link_type==2" src="/imgs/lo_whatsapp.svg" width="100%" height="100%" fit="contain" />
                                        <van-image v-else-if="item.link_type==3" src="/imgs/lo_telegram.svg" width="100%" height="100%" fit="contain" />
                                        <van-image v-else :src=appIcon width="100%" height="100%" round />
                                    </em>
                                    <div class="flex flex-col">
                                        <h5 class="mt-1 text-sm  font-bold opacity-80">
                                        <span v-if="item.link_type==2">Whatsapp</span>
                                        <span v-else-if="item.link_type==3">Telegram</span>
                                        <span v-else>On-line</span>
                                    </h5>
                                    <p class="mt-2 text-[0.625rem] text-center text-theme">
                                        <span v-if="item.link_type==2">Whatsapp {{ item.link }}</span>
                                        <span v-else-if="item.link_type==3">Telegram {{ item.link }}</span>
                                        <span v-else>atendimento online</span>
                                    </p>
                                    </div>
                                </dt>
                                <div>
                                    <dd class="w-full flex justify-center shrink-0">
                                        <!--  -->
                                        <a href="javascript:;" class="min-w-16 h-8 px-6 text-xs  rounded-full flex items-center justify-center bg-gradient-to-tr from-btnlinar1 to-btnlinar2">
                                            <span>Chat</span>
                                        </a>
                                    </dd>
                                </div>
                               
                            </dl>
                        </li>
                    </template>
                </ul>
              
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
        <van-popup
            v-model:show="serviceShowRef"
            position="bottom"
            class="popup-container h-full !bg-rgbablack50  bg-blur !z-[2999]"
            overlay-class="popup-overlay"
            teleport="body"
             v-if="currentTemplate.value =='template_three'"
        >
         <!-- 固定顶部栏 -->
         <header class="w-wrap max-w-full fixed left-1/2 top-0 -translate-x-1/2 flex items-center justify-center  z-50 box-content text-three " 
         :style="{background: `url(${HomeImg.img_topBg})  center` }"
         style=" background-size: 100% 100%;">
       
            <div class="w-full h-[3.125rem] relative z-20 bg-body-bg">
                <div @click="close()" 
                        class="px-3 h-full absolute left-0 top-0 flex justify-center items-center cursor-pointer">
                        <img :src=CommonImg.btn_back class="w-9 h-9 mt-1">
                </div>
                <div class="w-full h-full flex justify-center items-center">
                    <h3 class="text-base text-themetext1">
                        <span>Configuração de Senha</span>
                    </h3>
                </div>
            </div>
        </header>
            
            <pu-card theme="3" class="py-5 pt-[3.125rem]">
                <img :src="CommonImg.icon_server" alt="" class=" w-[6rem] h-auto block mx-auto mt-9">
                <p class="pt-6 pb-4 text-[0.8125rem] text-themetext1 text-center">
                    <span>Bem-vindo! Clique em "CHAT" para entrar em contato conosco através do portal de atendimento ao cliente.</span>
                </p>
                <ul class="-mx-2 flex flex-col">
                    <template v-for="item,index in serviceListRef" :key="index">
                        <li @click="choiceService(item)" class="w-full p-2">
                            <dl class="w-full h-[6rem] p-4 bg-gradient-to-r from-[#fff]/[0.18] to-[#749488]/[0.18]  border border-[#fff]/[0.25]  rounded-[1rem] flex items-center justify-between">
                                <dt class=" overflow-hidden flex items-center justify-between">
                                    <em class="w-[3.125rem] h-[3.125rem] mx-auto block mr-4">
                                        <van-image v-if="item.link_type==2" src="/imgs/lo_whatsapp.svg" width="100%" height="100%" fit="contain" />
                                        <van-image v-else-if="item.link_type==3" src="/imgs/lo_telegram.svg" width="100%" height="100%" fit="contain" />
                                        <van-image v-else :src=appIcon width="100%" height="100%" round />
                                    </em>
                                    <div class="flex flex-col">
                                        <h5 class="mt-1 text-sm  font-bold opacity-80">
                                        <span v-if="item.link_type==2">Whatsapp</span>
                                        <span v-else-if="item.link_type==3">Telegram</span>
                                        <span v-else>On-line</span>
                                    </h5>
                                    <p class="mt-2 text-[0.65rem] text-center text-themetext2">
                                        <span v-if="item.link_type==2">Whatsapp {{ item.link }}</span>
                                        <span v-else-if="item.link_type==3">Telegram {{ item.link }}</span>
                                        <span v-else>atendimento online</span>
                                    </p>
                                    </div>
                                </dt>
                                <div>
                                    <dd class="w-full flex justify-center shrink-0">
                                        <!--  -->
                                        <a href="javascript:;" class="min-w-16 h-8 px-6 text-xs  rounded flex items-center justify-center m3-theme-btn1">
                                            <span>Chat</span>
                                        </a>
                                    </dd>
                                </div>
                               
                            </dl>
                        </li>
                    </template>
                </ul>
              
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
        <van-popup
            v-model:show="serviceShowRef"
            position="bottom"
            class="popup-container h-full !bg-theme !z-[2009]"
            overlay-class="popup-overlay"
            teleport="body"
             v-else-if="currentTemplate.value =='template_four'"
        >
         <!-- 固定顶部栏 -->
         <header class="w-wrap max-w-full fixed left-1/2 top-0 -translate-x-1/2 flex items-center justify-center  z-50 box-content " >
       
            <div class="w-full h-[3.125rem] relative z-20 bg-tablebg ">
                <div @click="close()" 
                        class="px-3 h-full absolute left-0 top-0 flex justify-center items-center cursor-pointer">
                    <img :src=CommonImg.btn_back  class="w-9 h-9 mt-1">
                </div>
                <div class="w-full h-full flex justify-center items-center">
                    <h3 class="text-base m4-text">
                        <span>Configuração de Senha</span>
                    </h3>
                </div>
            </div>
        </header>
            
            <pu-card theme="3" >
               
                <ul class=" flex flex-wrap flex justify-between items-center !mt-[4rem]">
                    <template v-for="item,index in serviceListRef" :key="index">
                        <li @click="choiceService(item)" class="w-[48%] mb-3 ">
                            <dl class="w-full h-[13rem]   bg-tablebg  rounded-[1rem] flex items-center justify-between flex-col overflow-hidden">
                                <dt class=" overflow-hidden flex items-center justify-center flex-col mt-3">
                                    <em class="w-[4.5rem] h-[4.5rem] mx-auto block ">
                                        <van-image v-if="item.link_type==2" src="/imgs/lo_whatsapp.svg" width="100%" height="100%" fit="contain" />
                                        <van-image v-else-if="item.link_type==3" src="/imgs/lo_telegram.svg" width="100%" height="100%" fit="contain" />
                                        <van-image v-else :src=appIcon width="100%" height="100%" round />
                                    </em>
                                    <div class="flex flex-col items-center ">
                                        <h5 class="mt-1 text-sm  font-bold opacity-80">
                                        <span v-if="item.link_type==2" class="m4-text">Whatsapp</span>
                                        <span v-else-if="item.link_type==3" class="m4-text">Telegram</span>
                                        <span v-else class="m4-text">On-line</span>
                                    </h5>
                                    <p class="mt-2 text-[0.625rem] text-center text-themetext3 items-center">
                                        <span v-if="item.link_type==2">Whatsapp {{ item.link }}</span>
                                        <span v-else-if="item.link_type==3">Telegram {{ item.link }}</span>
                                        <span v-else>atendimento online</span>
                                    </p>
                                    </div>
                                </dt>
                                <div class="w-full bg-black/[0.2] p-4">
                                    <dd class="w-full flex justify-center shrink-0 ">
                                        <a href="javascript:;" class="min-w-20 h-8 px-6 text-xs m4-ten-btn text-theme rounded-full flex items-center justify-center">
                                            <span>Chat</span>
                                        </a>
                                    </dd>
                                </div>
                               
                            </dl>
                        </li>
                    </template>
                </ul>
                <p class="pt-6 pb-4 text-[0.8125rem] text-themetext3 text-center">
                    <span>Bem-vindo! Clique em "CHAT" para entrar em contato conosco através do portal de atendimento ao cliente.</span>
                </p>
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
        <van-popup
            v-model:show="serviceShowRef"
            position="bottom"
            class="popup-container h-full  !z-[2999]"
            overlay-class="popup-overlay"
            :style="{background: '#10121d' }"
            teleport="body"
            v-else-if="currentTemplate.value =='template_five'"
        >
            <section :style="`padding-top: ${top};`" class="w-full">
                <div class="w-full h-[3.25rem] relative flex items-center justify-center bg-">
                    <h3 class="text-base leading-4 font-medium text-center line-clamp-2 capitalize" style="max-width: 60%;">
                        <span>Configuração de Senha</span>
                    </h3>
                    <div class="absolute top-0 right-0 h-full flex items-center">
                        <a @click="close()" href="javascript:;" class="h-full px-3 flex items-center">
                            <em class="w-[1.375rem] h-[1.375rem] bg-rgbawhite10 rounded-full flex items-center justify-center">
                                <icon-close class="w-3 h-3"></icon-close>
                            </em>
                        </a>
                    </div>
                </div>
                <div class="">
                    <img :src="MineImg.img_serverbg" alt="" class=" w-full h-auto block mx-auto">
                </div>
            </section>
            
            <pu-card theme="1">
                <ul class="-mx-2 flex flex-wrap">
                    <template v-for="item,index in serviceListRef" :key="index">
                        <li @click="choiceService(item)" class="w-full p-2">
                            <dl class="w-full h-[4rem] bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 border border-thirsmodel2 text-themewhite rounded-lg flex items-center justify-between px-4">
                                <dt class="flex items-center">
                                    <em class="w-[3.125rem] h-[3.125rem] mx-auto block mr-4">
                                        <van-image v-if="item.link_type==2" src="/imgs/lo_whatsapp.svg" width="100%" height="100%" fit="contain" />
                                        <van-image v-else-if="item.link_type==3" src="/imgs/lo_telegram.svg" width="100%" height="100%" fit="contain" />
                                        <van-image v-else :src=appIcon width="100%" height="100%" round />
                                    </em>
                                    <div>
                                        <h5 class=" text-sm text-left font-bold mb-1">
                                        <span v-if="item.link_type==2">Whatsapp</span>
                                        <span v-else-if="item.link_type==3">Telegram</span>
                                        <span v-else>On-line</span>
                                    </h5>
                                    <p class="text-[0.625rem] text-left text-themetext3">
                                        <span v-if="item.link_type==2">Whatsapp {{ item.link }}</span>
                                        <span v-else-if="item.link_type==3">Telegram {{ item.link }}</span>
                                        <span v-else>atendimento online</span>
                                    </p>
                                    </div>
                                    
                                </dt>
                                <dd class="flex justify-center shrink-0">
                                    <a href="javascript:;" class="min-w-16 h-6 px-3 text-xs text-themetext3 font-bold bg-rgbablack15 rounded-lg flex items-center justify-center">
                                        <span>Chat</span>
                                    </a>
                                </dd>
                            </dl>
                        </li>
                    </template>
                </ul>
                <!-- <p class="pt-6 pb-4 text-[0.8125rem] text-rgbawhite50 text-center">
                    <span>Bem-vindo! Clique em "CHAT" para entrar em contato conosco através do portal de atendimento ao cliente.</span>
                </p> -->
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
    </div>
</template>