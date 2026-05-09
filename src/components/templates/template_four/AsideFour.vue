<script setup>
import { watch,ref } from 'vue'
import { fn } from '@/i18n'
import { isAuthRef, memberLocal } from '@/model/user'
import { redPakageStateRef} from '@/model/other'
import { gameLogo, appIcon} from '@/model/pwa'
import { useThemeImages } from '@/utils/themeimg'
import { socialMenuListRef} from '@/model/common'
const AsideImg = useThemeImages().aside
const CommonImg = useThemeImages().common 
const HomeImg = useThemeImages().home 
// 获取共用逻辑
import { useHome } from '@/composables/useHome'
import { useAside } from '@/composables/useAside'
const openFirm = ref(false)
const openActivity = ref(true)
const props = defineProps({
    modelValue: Boolean,
    navList: [Array, Object],
    hashSign: Boolean,
})


// 每次打开侧边栏时，展开“活动”
watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
        openActivity.value = true
        openFirm.value = false
    }
})

const emits = defineEmits(['update:modelValue'])

function close() {
    emits('update:modelValue', false)
}
function openlist() {
    if(openActivity.value){
        openActivity.value=false
        openFirm.value = !openFirm.value
    }else{
        openFirm.value = !openFirm.value
    }
   
    
}
function openlisttwo(){
    if(openFirm.value){
        openFirm.value=false
        openActivity.value = !openActivity.value
    }else{
        openActivity.value = !openActivity.value
    }
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
    gameListRef,
    openGameAll,
} = useAside(close)

</script>

<template>
    <teleport to="body">
        <transition name="aside">
            <section v-if="modelValue" class="w-full h-full absolute left-0 top-0 z-[99]">
                <div class="w-wrap max-w-full h-full mx-auto bg-black/50 relative">
                    <em @click="closeByClick()" class="w-full h-full bg-black/50 block"></em>
                    <aside
                        class="w-[70%] max-w-[400px] h-full text-aside-text absolute left-0 p top-0 flex flex-col bg-default-bg "
                        style=" padding-bottom: env(safe-area-inset-bottom);">
                        <i :style="`height: ${top};`" class="w-full block shrink-0"></i>
                        <div class="w-full h-[5rem] px-4 flex items-center shrink-0 align-center justify-center bg-tablebg" v-if="!isAuthRef">
                            <button @click="closeByClick()" class="w-9 h-9 mt-2 mr-4">
                                <img :src="AsideImg.icon_back" class="w-9 h-9" />
                            </button>
                            <div class="flex-1 overflow-hidden">
                                <img :src=gameLogo class="w-full h-6 object-contain object-left">
                            </div>
                        </div>
                        <div class="w-full h-[5rem] px-4 py-4 flex items-center justify-center bg-tablebg"
                            v-if="isAuthRef">
                            <van-image :src="memberLocal.head_portrait || appIcon" width="2.75rem" height="2.75rem"
                                radius="0.5rem" class="mr-2 shrink-0" />
                            <div class=" overflow-hidden">
                                <h3 class="flex items-center gap-1">
                                    <span class="text-sm align-middle m4-text">{{ memberLocal.nickname }}</span>
                                    <div class="w-[1.5rem]  text-[0.68rem] text-center text-theme"
                                     :style="{backgroundImage: `url(${CommonImg.icon_vipbg})`,}"
                                        style="background-repeat: no-repeat; background-size: 100% 100%;"
                                       >
                                        V{{ memberLocal.current_level }}</div>

                                </h3>

                                <div @click.stop.prevent="copyInviteCode(memberLocal.id)"
                                    class="text-xs  px-1 rounded-lg "
                                    style="min-width: 1rem;max-width: 10rem;display: inline-block;">
                                    <div class="flex items-center">
                                        <span class="align-middle text-white">ID: {{ memberLocal.id }}</span>
                                        <img :src="CommonImg.icon_copy" class="w-3 h-3 ml-1 " />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- overflow-y-auto -->
                        <!-- <section class="w-full px-3 flex-1 " > -->
                        <div class="w-full  pb-1 pt-[0.1rem] text-default-text px-4">
                            <ol v-if="!isAuthRef" class="w-full h-9 flex items-center mt-2 mb-2">
                                <li class="w-1/2 h-full pr-1.5 ">
                                    <a href="javascript:;" @click="toLogin()"
                                        class="w-full h-full text-center text-theme font-bold   rounded-[2rem]  m4-ten-btn flex items-center justify-center">
                                        <span>Entrar</span>
                                    </a>
                                </li>
                                <li class="w-1/2 h-full pl-1.5">
                                    <a href="javascript:;" @click="toRegister()"
                                        class="w-full h-full text-center  text-theme font-bold rounded-[2rem] m4-nine-btn  flex items-center justify-center">
                                        <span>Registro</span>
                                    </a>
                                </li>
                            </ol>
                            <div v-if="isAuthRef">
                                <div class=" w-full rounded-lg text-center  mt-2">
                                    <span class="text-[1.48rem] text-themetext0 ">R$ {{
                                        fn(memberLocal.account && memberLocal.account.user_money || 0) }}</span>
                                </div>
                                <dl class="w-full h-8 text-xs flex mt-1 mb-1">
                                    <dd class="w-1/2 pr-1.5">
                                        <router-link to="/recharge" @click="onclickNoNav()"
                                            class="w-full h-full rounded-[1rem] m4-nine-btn text-center font-bold  flex items-center justify-center">
                                            <span>Depósito</span>
                                        </router-link>
                                    </dd>
                                    <dd class="w-1/2 pl-1.5">
                                        <router-link to="/withdrawal" @click="onclickNoNav()"
                                            class="w-full h-full rounded-[1rem] m4-ten-btn text-center text-theme font-bold flex items-center justify-center">
                                            <span>Saque</span>
                                        </router-link>
                                    </dd>
                                </dl>

                            </div>
                        </div>
                        
                        <!-- <div class="px-4"> -->
                            <!-- 厂商 -->
                            <div class=" rounded-2xl mx-4 px-3 py-2 mt-1 flex flex-between items-center unified-button "
                                :class="openFirm ? 'm4-ten-btn' : 'bg-tablebg'" @click="openlist()">
                                <div class="flex-1 flex items-center ">
                                    <img :src="openFirm ? AsideImg.icon_lobby3 : AsideImg.icon_lobby2"
                                        class="w-4 " />
                                    <span class="text-[0.88rem] font-bold ml-1"
                                        :class="openFirm ? '' : 'm4-text'">Classificação</span>
                                </div>
                                <img :src="openFirm ? AsideImg.icon_down : AsideImg.icon_close" alt=""
                                    :class="openFirm ? 'w-3 h-2' : 'w-2 h-3'" />
                            </div>
                            <!-- 厂商 -->
                            <div class="flex items-center justify-between overflow-y-auto flex-col w-full mt-2 "
                                v-show="openFirm">
                                <div class="flex items-center justify-between  w-full"
                                    v-for="item, index in gameListRef" :key="index">
                                    <a @click="openGameAll(item.id)" href="javascript:;"
                                        class=" px-6 w-full unified-button">
                                        <div
                                            class="game-icon-container px-6 w-full flex items-center  border-b border-rgbawhite10 py-2">
                                            <img :src="item.cover_home" class="game-icon w-8 h-8 mr-2 ">
                                            <p class="text-center  text-[0.88rem]">{{ item.title }}</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <!-- 活动：厂商展开时固定底部，收起时回到标签下方 -->
                            <!-- <div class="activity-container" :class="{ 'fixed-bottom': openFirm }"> -->
                                <!-- 活动 -->
                                <div class="mx-4 m-auto rounded-2xl px-3 py-2 mt-3 flex flex-between items-center unified-button "
                                    :class="openActivity ? 'm4-ten-btn' : 'bg-tablebg'"
                                    @click="openlisttwo()">
                                    <div class="flex-1 flex items-center ">
                                        <img :src="openActivity ? AsideImg.icon_promotion3 :AsideImg.icon_promotion2"
                                            class="w-4 " />
                                        <span class="text-[0.88rem] font-bold ml-1"
                                            :class="openActivity ? '' : 'm4-text'">Promoções</span>
                                    </div>
                                    <img :src="openActivity ?  AsideImg.icon_down : AsideImg.icon_close" alt=""
                                        :class="openActivity ? 'w-3 h-2' : 'w-2 h-3'" />
                                </div>

                                <div class="activityBox mt-4  overflow-y-auto" v-show="openActivity">
                                    <div class="proBox">
                                        <nav class="w-full text-[0.525rem] flex flex-wrap">
                                            <template v-for="item, index in navList" :key="index">
                                                <a @click="onclickNav(item.activity_type)" href="javascript:;"
                                                    class="w-1/3 py-1.5  unified-button">
                                                    <div class="w-[3.1rem] h-[3rem] mx-auto relative">
                                                        <img :src="item.icon" class="w-full h-full object-contain">
                                                        <div v-if="item.activity_type != 'sign_in' && item.count > 0"
                                                            class="w-3 h-3 text-[0.725rem] !leading-none bg-texterror  text-three  border-[0.5px] border-white rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                                                            <b>{{ item.count }}</b>
                                                        </div>
                                                        <div v-if="item.activity_type == 'sign_in' && hashSign"
                                                            class="w-3 h-3 text-[0.725rem] !leading-none bg-texterror  text-three  border-[0.5px] border-white rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                                                            <b>1</b>
                                                        </div>
                                                        <div v-if="item.activity_type == 'red_packet' && redPakageStateRef.status == 1"
                                                            class="w-3 h-3 text-[0.725rem] !leading-none bg-texterror  text-three  border-[0.5px] border-white rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                                                            <b>1</b>
                                                        </div>
                                                    </div>
                                                    <p v-if="item.activity_type == 'red_packet'"
                                                        class="text-center text-[0.725rem] text-themetext1">
                                                        <span v-if="redPakageStateRef.status >= 1">{{ item.title
                                                        }}</span>
                                                        <van-count-down v-else :time="redPakageStateRef.time"
                                                            @finish="redPakageEndFunc()" format="HH:mm:ss"
                                                            class="!text-themetext1 !text-[0.525rem] " />
                                                    </p>
                                                    <p v-else class="text-center text-[0.725rem] text-themetext1">{{
                                                        item.title }}</p>
                                                </a>
                                            </template>
                                        </nav>
                                    </div>
                                </div>
                            <!-- </div> -->

                        <!-- </div> -->

                        <!-- </section> -->

                        <!-- <section class="w-full px-3 flex-1 overflow-y-auto relative">
                           
                        </section> -->
                        <!-- 客服 -->

                        <section class="w-full px-4 mt-1 shrink-0 ">

                            <!-- <div @click="openService()" class="w-full px-2 py-1 bg-default-bg text-default-text border border-theme rounded-lg ">
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
                            <div class="w-full rounded-2xl px-3 py-2 mt-1 flex flex-between items-center unified-button bg-tablebg"
                                @click="openService()">
                                <div class="flex-1 flex items-center ">
                                    <img :src="HomeImg.icon_service" class="w-4 " />
                                    <span class="text-[0.88rem] font-bold ml-1  m4-text">Classificação</span>
                                </div>
                                <img :src="AsideImg.icon_close" alt="" class="w-2 h-3" />
                            </div>
                        </section>
                        <section class="w-full px-4  shrink-0  mt-1">
                            <div class="w-full py-1 relative">
                                <img :src="AsideImg.socialbg" class="w-full object-cover">
                                <div
                                    class="w-full absolute left-0 top-7 bottom-2 inset-0 flex justify-center items-center gap-3">
                                    <a v-for="(item, index) in socialMenuListRef" :key="index" :href="item.link"
                                        target="_blank" rel="noopener noreferrer" class="px-2 flex items-center">
                                        <img :src="item.icon"
                                            class="w-[1.5rem] h-[1.5rem] object-contain cursor-pointer" />
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