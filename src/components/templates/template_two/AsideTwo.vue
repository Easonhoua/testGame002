<script setup>

import { fn } from '@/i18n'
import { isAuthRef, memberLocal } from '@/model/user'
import { redPakageStateRef} from '@/model/other'
import { gameLogo, appIcon} from '@/model/pwa'
import { useThemeImages } from '@/utils/themeimg'
import { socialMenuListRef,leftproListRef} from '@/model/common'
const CommonImg = useThemeImages().common
const AsideImg = useThemeImages().aside
import { useMine } from '@/composables/useMine'
import { useAside } from '@/composables/useAside'

const props = defineProps({
    modelValue: Boolean,
    navList: [Array, Object],
    hashSign: Boolean,
})

const emits = defineEmits(['update:modelValue'])

function close() {
    emits('update:modelValue', false)
}

const { 
    top,
    redPakageEndFunc,
    closeByClick,
    onclickNav,
    onclickNoNav,
    openService,
    toLogin,
    toRegister,
    onToProfile,
    copyInviteCode
} = useAside(close)
const { 
    toWithdrawal,
} = useMine()
</script>

<template>
    <teleport to="body">
        <transition name="aside">
            <section v-if="modelValue" class="w-full h-full absolute left-0 top-0 z-[99]">
                <div class="w-wrap max-w-full h-full mx-auto bg-blur relative">
                    <em @click="closeByClick()" class="w-full h-full bg-black/50 block"></em>
                    <aside class="w-[70%] max-w-[400px] h-full  text-themewhite absolute left-0 top-0 flex flex-col bg-center bg-cover "
                    :style="{
                                    backgroundImage: `url(${AsideImg.bg_aside})`,
                                    paddingBottom:`env(safe-area-inset-bottom)`
                                    }">
                        <i :style="`height: ${top};`" class="w-full block shrink-0"></i>
                        <div class="w-full h-[3.75rem] px-4 flex items-center shrink-0 align-center justify-center">
                            <button @click="closeByClick()" class="w-9 h-9  mr-4">
                                <img :src=CommonImg.btn_back class="w-9 h-9"/>
                            </button>
                            <div class="flex-1 overflow-hidden">
                                <img :src=gameLogo class="w-full h-5 object-contain object-left">
                            </div>
                        </div>
                        <section class="w-full px-2 flex-1 overflow-y-auto">
                            <div class="w-full px-3 pb-1 pt-[0.1rem] text-rgbawhite80 h-[8.2rem]" :style="{
                                background: `url(${AsideImg.img_infocard}) no-repeat center`,
                                backgroundSize: '100% 100%',
                                overflow: 'hidden'
                            }">
                                <div v-if="isAuthRef" @click="onToProfile()" class="w-full pt-1 flex -mt-1">
                                    <van-image :src="memberLocal.head_portrait||appIcon" width="2.75rem" height="2.75rem" radius="0.5rem" class="mr-2 border border-white/25 shrink-0" />
                                    <div class="flex-1 overflow-hidden">
                                        <h3>
                                            <span class="text-sm text-default-bg align-middle">{{ memberLocal.nickname }}</span>
                                            <em class="h-3 px-1 ml-1 leading-3 text-[0.5rem] bg-two  text-three  rounded-sm not-italic inline-block align-middle">
                                                V{{ memberLocal.current_level }}
                                            </em>
                                        </h3>
                                        
                                        <div @click.stop.prevent="copyInviteCode(memberLocal.id)" class="text-xs bg-default-bg px-1 rounded-lg " style="min-width: 1rem;max-width: 10rem;display: inline-block;" >
                                           <div class="flex items-center">
                                            <span class="align-middle text-one">ID: {{ memberLocal.id }}</span>
                                            <img :src=AsideImg.icon_copy class="w-3 h-3 ml-6 "/>
                                           </div>
                                           
                                        </div>
                                    </div>
                                </div>
                                <ol v-if="!isAuthRef" class="w-full h-9 flex items-center mt-2 mb-2">
                                    <li class="w-1/2 h-full pr-1.5 text-themewhite">
                                        <a href="javascript:;" @click="toLogin()" class="w-full h-full text-center  rounded-[0.88rem] capitalize bg-gradient-to-b from-loginlinear-3 to-loginlinear-4 flex items-center justify-center">
                                            <span>Entrar</span>
                                        </a>
                                    </li>
                                    <li class="w-1/2 h-full pl-1.5 text-themewhite" >
                                        <a href="javascript:;" @click="toRegister()" class="w-full h-full text-center rounded-[0.88rem] capitalize  bg-gradient-to-b from-btnlinar4 to-btnlinar3  flex items-center justify-center">
                                            <span>Registro</span>
                                        </a>
                                    </li>
                                </ol>
                                <div class="bg-default-bg rounded-lg text-center " style="max-width: 10rem; margin: 0 auto; margin-top: 0.25rem;">
                                    <span class="text-[1.48rem] text-[#ffef00] ">{{ fn(memberLocal.account&&memberLocal.account.user_money||0) }}</span>
                                    <span class="text-xs text-[#ffef00]">&nbsp;{{ currentUnit.value }}</span>
                                </div>
                                <dl class="w-full h-8 text-xs flex mt-1 mb-1">
                                    <dd class="w-1/2 pr-1.5">
                                        <router-link to="/recharge" @click="onclickNoNav()"
                                        :style="{ backgroundImage: `url(${AsideImg.bg_deposito})`}"
                                        style="background-repeat: no-repeat; background-size: 100% 100%;"
                                        class="w-full h-full rounded-[1rem]   text-center  flex items-center justify-center">
                                            <img :src=AsideImg.icon_recharge class="w-5 h-5 mr-1">
                                            <span>Depósito</span>
                                        </router-link>
                                    </dd>
                                    <dd class="w-1/2 pl-1.5">
                                        <router-link to="/withdrawal" @click="toWithdrawal()" 
                                        :style="{ backgroundImage: `url(${AsideImg.bg_deposito2})`}"
                                        style="background-repeat: no-repeat; background-size: 100% 100%;"
                                        class="w-full h-full rounded-[1rem]  text-center  flex items-center justify-center">
                                            <img :src=AsideImg.icon_withdraw class="w-5 h-5 mr-1">
                                            <span>Saque</span>
                                        </router-link>
                                    </dd>
                                </dl>
                            </div>
                            <div class="activityBox">
                                <div class="proBox">
                                    <span class="title text-theme text-sm">Promoções</span>
                                    <div class="proBox-item-box flex items-center flex-wrap flex-between ">
                                        <a class="proBox-item w-1/2 h-[4.2rem] rounded-lg relative" v-for="item,index in leftproListRef" :key="index" @click="onclickNav(item.link)">
                                            <!--  -->
                                            <div v-if="item.count>0" class="w-3 h-3 text-[0.725rem] !leading-none bg-two  text-three  border-[0.5px] border-white rounded-full absolute -top-0 -right-[-0.38rem] flex items-center justify-center">
                                                <b>{{ item.count }}</b>
                                            </div>
                                          <img :src="item.img" alt="" class="w-[7.5rem] h-full object-contain "/>
                                        </a>
                                    </div>

                                </div>
                            </div>
                            <div class="activityBox">
                                <div class="proBox">
                                    <span class="title text-theme text-sm">Benefícios e bônus</span>
                                    <nav class="w-full text-[0.525rem] flex flex-wrap">
                                <template v-for="item,index in navList" :key="index">
                                    <a @click="onclickNav(item.activity_type)" href="javascript:;" class="w-1/3 py-1.5  unified-button" v-if="item.title!=='Ofertas'&&item.title!=='Bônus'&&item.title!='VIP'&&item.title!='Tesouro'">
                                        <div class="w-[3.1rem] h-[3rem] mx-auto relative">
                                            <img :src="item.icon" class="w-full h-full object-contain">
                                            <div v-if="item.activity_type!='sign_in'&&item.count>0" class="w-3 h-3 text-[0.725rem] !leading-none bg-two  text-three  border-[0.5px] border-white rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                                                <b>{{ item.count }}</b>
                                            </div>
                                            <div v-if="item.activity_type=='sign_in'&&hashSign" class="w-3 h-3 text-[0.725rem] !leading-none bg-two  text-three  border-[0.5px] border-white rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                                                <b>1</b>
                                            </div>
                                            <div v-if="item.activity_type=='red_packet'&&redPakageStateRef.status==1" class="w-3 h-3 text-[0.725rem] !leading-none bg-two  text-three  border-[0.5px] border-white rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                                                <b>1</b>
                                            </div>
                                        </div>
                                        <p v-if="item.activity_type=='red_packet'" class="text-center text-[0.725rem] text-three">
                                            <span v-if="redPakageStateRef.status>=1" >{{ item.title }}</span>
                                            <van-count-down v-else :time="redPakageStateRef.time" @finish="redPakageEndFunc()" format="HH:mm:ss" class="!text-three !text-[0.525rem] " />
                                        </p>
                                        <p v-else class="text-center text-[0.725rem] text-three">{{ item.title }}</p>
                                    </a>
                                </template>
                            </nav>
                                </div>
                            </div>
                           
                        </section>
                        <section class="w-full px-4 mt-1 shrink-0 ">
                            <!-- <div @click="openService()" class="w-full px-2 py-1 bg-default-bg text-rgbawhite80 border border-theme rounded-lg ">
                                <div class="text-one flex items-center">
                                    <img src="/imgs/icon-service.png" class="w-6 h-6 mr-1 bg-theme-light rounded-full shrink-0">
                                    <p class="text-[0.625rem] flex-1 overflow-hidden">
                                        <span>Apoio online 24/7</span>
                                    </p>
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                                    </svg>
                                </div>
                                <p class="text-[0.5rem] opacity-65">
                                    <span>Atendimento profissional para resolver seus problemas.</span>
                                </p>
                            </div> -->
                            <button @click="openService()" class="w-full  unified-button bg-transparent">
                                <img :src=AsideImg.bg_kefu1 class="w-full h-auto object-cover">
                            </button>
                        </section>
                        <section class="w-full px-4  shrink-0 ">
                            <div class="w-full py-1 relative">
                                <img 
                                    :src=AsideImg.bg_kefu2 
                                    class="w-full object-cover"
                                    >
                                <div class="w-full absolute left-0 top-2 bottom-2 inset-0 flex justify-center items-center gap-3">
                                    <a v-for="(item, index) in socialMenuListRef"
                                        :key="index"
                                        :href="item.link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="px-2 flex items-center"
                                        >
                                        <img :src="item.icon" class="w-[2rem] h-[2rem] object-contain cursor-pointer" />
                                    </a>
                                </div>
                            </div>
                        </section>
                        <div style="padding-bottom: env(safe-area-inset-bottom);">
                            <em class="w-full h-4 block"></em>
                        </div>
                    </aside>
                </div>
            </section>
        </transition>
    </teleport>
</template>
<style scoped>
.aside-enter-active, .aside-leave-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 200ms ease-in;
    overflow: hidden;
    
}
.aside-enter-from, .aside-leave-to {
    opacity: 0;
    transform: translateX(-150px);
    transition: all 200ms ease-in;
    overflow: hidden;
}

</style>