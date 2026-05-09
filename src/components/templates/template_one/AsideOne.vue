<script setup>

import { fn } from '@/i18n'
import { isAuthRef, memberLocal } from '@/model/user'
import { redPakageStateRef} from '@/model/other'
import { gameLogo, appIcon} from '@/model/pwa'
import { useThemeImages } from '@/utils/themeimg'
import { socialMenuListRef} from '@/model/common'
const AsideImg = useThemeImages().aside
const CommonImg = useThemeImages().common 
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
    copyInviteCode,
} = useAside(close)

</script>

<template>
    <teleport to="body">
        <transition name="aside">
            <section v-if="modelValue" class="w-full h-full absolute left-0 top-0 z-[99]">
                <div class="w-wrap max-w-full h-full mx-auto bg-blur relative">
                    <em @click="closeByClick()" class="w-full h-full bg-rgbablack50 block"></em>
                    <aside class="w-[70%] max-w-[400px] h-full  text-themewhite absolute left-0 top-0 flex flex-col bg-center bg-cover" 
                            :style="{
                                    backgroundImage: `url(${AsideImg.bg_aside})`,
                                    paddingBottom:`env(safe-area-inset-bottom)`
                                    }">
                        <i :style="`height: ${top};`" class="w-full block shrink-0"></i>
                        <div class="w-full h-[3.75rem] px-4 flex items-center shrink-0 align-center justify-center">
                            <button @click="closeByClick()" class="w-8 h-8   !text-themewhite rounded cursor-pointer flex items-center justify-center shrink-0">
                              <img :src=CommonImg.btn_back class="w-full h-full mr-1">
                            </button>
                            <div class="flex-1 overflow-hidden">
                                <img :src=gameLogo class="w-full h-6 object-contain object-left">
                            </div>
                        </div>
                        <section class="w-full px-4 flex-1 overflow-y-auto">
                            <ol v-if="!isAuthRef" class="w-full h-11 flex items-center">
                                <li class="w-1/2 h-full pr-1.5">
                                    <a href="javascript:;" @click="toLogin()" class="w-full h-full text-center rounded-lg capitalize bg-gradient-to-b from-loginlinear-3 to-loginlinear-4 flex items-center justify-center">
                                        <span>Entrar</span>
                                    </a>
                                </li>
                                <li class="w-1/2 h-full pl-1.5">
                                    <a href="javascript:;" @click="toRegister()" class="w-full h-full text-center rounded-lg capitalize bg-gradient-to-b from-gold-100 to-gold-500 flex items-center justify-center">
                                        <span>Registro</span>
                                    </a>
                                </li>
                            </ol>
                            <div class="w-full px-3 pb-3 pt-1 mt-3 bg-default-bg text-rgbawhite80 rounded-lg">
                                <div v-if="isAuthRef" @click="onToProfile()" class="w-full pt-1 flex">
                                    <van-image :src="memberLocal.head_portrait||appIcon" width="2.75rem" height="2.75rem" radius="0.5rem" class="mr-2 border border-rgbawhite30 shrink-0" />
                                    <div class="flex-1 overflow-hidden">
                                        <h3>
                                            <span class="text-sm align-middle">{{ memberLocal.nickname }}</span>
                                            <em class="h-3 px-1 ml-1 leading-3 text-[0.5rem] bg-two text-themewhite rounded-sm not-italic inline-block align-middle">
                                                V{{ memberLocal.current_level }}
                                            </em>
                                        </h3>
                                        <h5 @click.stop.prevent="copyInviteCode(memberLocal.id)" class="text-xs">
                                            <span class="align-middle opacity-65">ID: {{ memberLocal.id }}</span>
                                            <svg class="w-3 h-3 ml-1 opacity-85 inline-block align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path>
                                            </svg>
                                        </h5>
                                    </div>
                                </div>
                                <div class="text-one leading-none">
                                    <span class="text-lg">{{ fn(memberLocal.account&&memberLocal.account.user_money||0) }}</span>
                                    <span class="text-xs opacity-65">&nbsp;R$</span>
                                </div>
                                <dl class="w-full h-8 text-xs flex">
                                    <dd class="w-1/2 pr-1.5">
                                        <router-link to="/recharge" @click="onclickNoNav()" class="w-full h-full rounded-lg bg-gradient-to-r from-btnlinar1 to-btnlinar2 text-center capitalize flex items-center justify-center">
                                            <img :src=AsideImg.icon_recharge class="w-5 h-5 mr-1">
                                            <span>Depósito</span>
                                        </router-link>
                                    </dd>
                                    <dd class="w-1/2 pl-1.5">
                                        <router-link to="/withdrawal" @click="onclickNoNav()" class="w-full h-full rounded-lg ctx-theme text-center capitalize flex items-center justify-center">
                                            <img :src=AsideImg.icon_withdraw class="w-5 h-5 mr-1">
                                            <span>Saque</span>
                                        </router-link>
                                    </dd>
                                </dl>
                            </div>
                            <nav class="w-full mt-1.5 text-[0.525rem] flex flex-wrap">
                                <template v-for="item,index in navList" :key="index">
                                    <a @click="onclickNav(item.activity_type)" href="javascript:;" class="w-1/3 py-1.5 px-1 unified-button">
                                        <div class="w-[2.625rem] h-[2.625rem] mx-auto relative">
                                            <img :src="item.icon" class="w-full h-full object-contain">
                                            <div v-if="item.activity_type!='sign_in'&&item.count>0" class="w-3 h-3 text-[0.725rem] !leading-none bg-two text-themewhite border-[0.5px] border-themewhite rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                                                <b>{{ item.count }}</b>
                                            </div>
                                            <div v-if="item.activity_type=='sign_in'&&hashSign" class="w-3 h-3 text-[0.725rem] !leading-none bg-two text-themewhite border-[0.5px] border-themewhite rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                                                <b>1</b>
                                            </div>
                                            <div v-if="item.activity_type=='red_packet'&&redPakageStateRef.status==1" class="w-3 h-3 text-[0.725rem] !leading-none bg-two text-themewhite border-[0.5px] border-themewhite rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                                                <b>1</b>
                                            </div>
                                        </div>
                                        <p v-if="item.activity_type=='red_packet'" class="text-center text-[0.725rem]">
                                            <span v-if="redPakageStateRef.status>=1">{{ item.title }}</span>
                                            <van-count-down v-else :time="redPakageStateRef.time" @finish="redPakageEndFunc()" format="HH:mm:ss" class="!text-inherit !text-[0.525rem]" />
                                        </p>
                                        <p v-else class="text-center text-[0.725rem]">{{ item.title }}</p>
                                    </a>
                                </template>
                            </nav>
                        </section>
                        <section class="w-full px-4 mt-3 shrink-0">
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
                            <button @click="openService()" class="w-full unified-button bg-transparent">
                                <img :src=AsideImg.bg_kefu1
                                class="w-full h-auto object-cover">
                            </button>
                        </section>
                        <section class="w-full px-4 mt-1 shrink-0">
                            <div class="w-full py-1 relative">
                                <img 
                                    :src=AsideImg.bg_kefu2
                                    class="w-full object-cover"
                                    >
                                <div class="w-full absolute left-0 inset-0 flex justify-center items-center gap-1">
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