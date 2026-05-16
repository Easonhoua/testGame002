
<script setup>

import { defineAsyncComponent } from 'vue'
import { fn } from '@/i18n'
import PuAside from '@/components/public/PuAside.vue'
import SignIn from '@/components/pages/SignIn.vue'
import GameAllList from '@/components/pages/GameAllList.vue'
import GameSearch from '@/components/pages/GameSearch.vue'
import NoticeRegister from '@/components/pages/NoticeRegister.vue'
import HomeDownload from '@/components/pages/HomeDownload.vue'
import RedPakage from '@/components/pages/RedPakage.vue'
import Notice from '@/components/pages/Notice.vue'
import PwaGuide from '@/components/pages/PwaGuide.vue'
import PddIndexPop from '@/components/pages/PddIndexPop.vue'
import PddIndexPopNew from '@/components/pages/PddIndexPopNew.vue'
import ReceivePop from '@/components/pages/ReceivePop.vue'
import NoticePop from '@/components/pages/NoticePop.vue'
import FirstChargePop from '@/components/pages/FirstChargePop.vue'
import MarqueeNotice from '@/components/public/MarqueeNotice.vue'
// 破产弹窗
import Daypay from '@/components/pages/Daypay.vue'
// 异步加载游戏列表组件
const HomeGameList = defineAsyncComponent(() => 
  import('@/components/pages/HomeGameList.vue')
)

import { useThemeImages } from '@/utils/themeimg'
// 主页图片信息
const CommonImg = useThemeImages().common
const HomeImg = useThemeImages().home
const MineImg = useThemeImages().mine
const RankImg = useThemeImages().jprank

// 获取共用逻辑
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useHome } from '@/composables/useHome'

const { 
    home_mode,
    NoticeShowRef,
    aside_show,
    showSearch,
    isOpenEnterRef,
    showActivityPop,
    game_cover_index,
	indexLoadingShowRef,
	buoyListRef,
	isAuthRef, 
	msgUnReadCountRef,
    gameLogo,
    marqueeRef,
    footerTextRef,
	activityListRef,
    signConfigRef,
    memberRef,
    navListRef,
    bannerListRef,
    gameListRef,
    bubbleTopRef,
    bubbleTopAltRef,
    jpLobbyInfo,
    redPotCountRef,
    gamePrevPage,
    gameNextPage,
    onclickBanner,
    openGameAll,
    openSearch,
	openNotice,
	openRedPakage,
	openService,
    toLogin,
    toRegister,
    openAisde,
	toMessage,
	toMine,
	goToJackpotsRank,
    sortedBuoyList,
    isSignInRef

} = useHome()

// 置顶按钮相关逻辑
const showGoTop = ref(false)
const mainContentRef = ref(null)

const handleScroll = () => {
    if (mainContentRef.value) {
        showGoTop.value = mainContentRef.value.scrollTop > 200
    }
}

const scrollToTop = () => {
    if (mainContentRef.value) {
        mainContentRef.value.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
}

onMounted(() => {
    nextTick(() => {
        const mainContent = document.getElementById('main-content')
        if (mainContent) {
            mainContentRef.value = mainContent
            mainContent.addEventListener('scroll', handleScroll)
        }
    })
})

onUnmounted(() => {
    if (mainContentRef.value) {
        mainContentRef.value.removeEventListener('scroll', handleScroll)
    }
})

</script>

<template>
  <template v-if="home_mode == 4">
        <home-download></home-download>
    </template>
    <template v-else>
        <pu-page down hideBack height="h-[3.25rem]">
            <template #left>
                <div class="pl-2 flex items-center">
                    <button @click="openAisde()" class="w-[2.3125rem] h-[2.3125rem] mr-1 bg-transparent rounded-2xl relative cursor-pointer shrink-0 flex items-center justify-center">
                        <img :src=HomeImg.icon_menu class="w-1/2 h-1/2">
                        <div v-if="redPotCountRef>0" class="w-3 h-3 text-[0.5625rem] !leading-none bg-two text-themewhite rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                            <b>{{ redPotCountRef }}</b>
                        </div>
                    </button>
                    <img :src=gameLogo class="w-[9rem] object-contain object-left">
                </div>
            </template>
            <template #right>
                <div class="pr-2 flex items-center">
                    <template v-if="isAuthRef">
                        <div @click="toMine()" class="h-7 p-px rounded-lg ctx-theme__linear flex">
                            <div class="h-full px-2 bg-body-bg rounded-lg flex items-center">
                                <p>
                                    <span class="text-[0.625rem] text-one">{{ currentUnit.value }}&nbsp;</span>
                                    <span class="text-sm">{{ fn(memberRef&&memberRef.account&&memberRef.account.user_money||0) }}&nbsp;</span>
                                </p>
                                <!-- <svg :class="accountLoadingRef?'animate-spin':''" class="w-3 h-3 mr-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
                                </svg> -->
                                <img src="/imgs/icon-wallet-g.svg" class="w-4 h-4">
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <a href="javascript:;" @click="toLogin()" class="h-7 px-3 ml-2 text-xs rounded-lg  m5-theme-inputwithoutborder relative flex items-center">
                            <span>Entrar</span>
                        </a>
                        <a href="javascript:;" @click="toRegister()" class="h-7 px-2 ml-2 text-xs rounded-lg m5-theme-btn1 relative flex items-center">
                            <span>Registro</span>
                            <em class=""></em>
                        </a>
                    </template>
                    <a href="javascript:;" @click="openService()" class="w-7 h-7 ml-2 bg-black30 rounded-lg  flex items-center justify-center">
                        <img :src=HomeImg.icon_service class="w-full h-full">
                    </a>
                </div>
            </template>
            <i class="h-[3.25rem] hidden"></i>   
            <!-- 添加搜索框 --> 
            <!-- <div class="search-container px-4 py-2">
                <div 
                    class="search-input-container bg-default-bg border border-border1 flex items-center px-4 py-2.5 h-7 rounded-full cursor-pointer"
                    @click="openSearch"
                >
                    <span class="placeholder-text text-themetext flex-1">Procurar jogos</span>
                    <img :src=CommonImg.icon_search class="w-5 h-4" alt="search">
                </div>
            </div> -->
            <!-- banner -->
            <pu-card v-if="bannerListRef&&bannerListRef[1]" theme="0" class="pt-1"  >
                <div class="relative">
                    <img :src=HomeImg.img_bannertips class="absolute top-0 right-0 w-[3rem] h-[3rem] object-cover mb-1 z-10" radius="0.5rem"/>
                    <van-swipe :autoplay="5000" indicator-color="var(--color-theme)" class="h-[9.375rem] overflow-hidden mt-3">
                        <van-swipe-item v-for="item,index in bannerListRef&&bannerListRef[1]||[]" :key="index">
                            <van-image @click="onclickBanner(item)" :src="item.img" fit="cover" radius="0.5rem" class="w-full h-full" />
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </pu-card>
            <pu-card theme="2">
                <div class="grid grid-rows-2 grid-flow-col gap-1.5 mt-1">
                    <template v-for="item,index in bannerListRef&&bannerListRef[2]||[]" :key="index">
                        <van-image @click="onclickBanner(item)" v-if="index == 0" :src="item.img"  height="6rem" radius="0.5rem" fit="fill" class="mt-2 row-span-2 shake-updown" :style="{ animationDelay: (0.2 * index) + 's' }"></van-image>
                        <van-image @click="onclickBanner(item)" v-else-if="index == 1" :src="item.img" height="2.8rem" radius="0.5rem" fit="fill" class="mt-2 col-span-1 shake-updown" :style="{ animationDelay: (0.6 * index) + 's' }"></van-image>
                        <van-image @click="onclickBanner(item)" v-else-if="index == 2" :src="item.img" height="2.8rem" radius="0.5rem" fit="fill" class="col-span-1 shake-updown" :style="{ animationDelay: (0.5 * index) + 's' }"></van-image>
                    </template>
                </div>
            </pu-card>
            <!-- notice -->
            <pu-card theme="2" >
                <dl class="h-10 flex items-center mb-3">
                    <dt class="h-full m5-theme-inputwithoutborder text-one rounded-lg flex-1 overflow-hidden flex items-center">
                        <template v-if="marqueeRef">
                            <van-notice-bar
                            background="transparent"
                            color="inherit"
                            style="--van-notice-bar-font-size: 0.75rem;--van-notice-bar-padding: 0 0.75rem;"
                            :text="marqueeRef"
                            @click="openNotice()"
                            class="w-full">
                                <template #left-icon>
                                    <img :src=CommonImg.icon_laba class="w-[1.375rem] h-[1.375rem] mr-1">
                                </template>
                            </van-notice-bar> 
                        </template>
                        <template v-else>
                            <MarqueeNotice />
                        </template>
                    </dt>
                    <dd @click="openGameAll(13)" class="w-10 h-full ml-3 bg-default-bg border border-rgbawhite30 rounded-lg relative cursor-pointer shrink-0 flex items-center justify-center">
                        <img :src=HomeImg.img_searchBtn class="w-full ">
                        <!-- <div v-if="parseFloat(msgUnReadCountRef)>0" class="h-3 px-1 text-[0.5625rem] !leading-none bg-two text-themewhite rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                            <b>{{ msgUnReadCountRef }}</b>
                        </div> -->
                    </dd>
                </dl>
            </pu-card>
            <!-- game_cover -->
            <pu-card theme="2" class="p-2 sticky top-[0rem] z-10 bg-default-bg" >
                <van-tabs v-model:active="game_cover_index" shrink 
                    style="--van-tabs-line-height: 5.2rem;
                        --van-tabs-bottom-bar-height: 0;
                        --van-padding-xs: 0;"
                        class="game-tabs w-full bg-bodyBg" >
                    <van-tab v-for="item,index in gameListRef" :key="index">
                        <template #title>
                            <a @click="openGameAll(item.id)" href="javascript:;" class="px-1.5 relative flex flex-col items-center">
                                <div class="game-icon-container_m5 rounded-md flex items-center"
                                :style="{
                                    backgroundImage: index === 0 ? `url(${HomeImg.icon_gameTypenew})` : `url(${HomeImg.icon_gameType})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                    }">
                                    <img :src="item.cover_home" class="game-icon mt-1">
                                     <p class="text-xs text-center text-themewhite " style="max-width: 3rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; font-size: 0.625rem;">{{ item.title }}</p>
                                     <p class="text-xs text-center text-themetext4 " style="max-width: 3rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; font-size: 0.5rem;">{{ item.count }}Games</p>
                                </div>
                               
                            </a>
                        </template>
                    </van-tab>
                    <!-- <van-tab v-if="gameListRef.length>0">
                        <template #title>
                            <a @click="openGameAll(0)" href="javascript:;" class="h-[3.625rem] px-1.5 relative flex flex-col items-center">
                                <div class="h-10 p-2 ml-1 mr-1 rounded-md flex items-center"
                                style="background-image: url('/imgs/btn_dt_fenlei2.png'); background-size: cover; background-position: center;">
                                    <img src="/imgs/in-g-collect.png" class="w-6 h-6">
                                </div>
                                <p class="text-xs text-center opacity-65">Favorito</p>
                            </a>
                        </template>
                    </van-tab> -->
                </van-tabs>
            </pu-card>
            <!-- game -->
            <pu-card theme="2">
                <dl v-for="item,index in gameListRef" :key="index" class="py-1">
                    <!-- 只有当 item.title 不是 'Favorito' 时才渲染 -->
                    <template v-if="item.title !== 'Favorito'">
                        <dt class="flex items-center justify-between">
                            <div class="max-w-[50%] flex items-center">
                                <img :src="item.cover" class="w-auto max-w-[60%] h-8 object-contain">
                                <b class="ml-2 text-sm opacity-85">{{ item.title }}</b>
                            </div>
                            <div class="text-rgbawhite50 flex items-center" @click="openGameAll(item.id)">
                                <!-- <button @click="gamePrevPage(index)" class="w-6 h-6 bg-rgbawhite10 !text-rgbawhite50 rounded-md flex items-center justify-center">
                                    <icon-arrow-left size="2" class="w-5 h-5" />
                                </button> -->
                                <div>
                                    <span class="text-xs text-themewhite font-bold">Todos&nbsp;</span>
                                </div>
                                <div class="h-6 px-3 mx-1  relative text-center font-bold rounded-full text-themewhite flex items-center ">
                                    <img :src="HomeImg.icon_fanye" class="w-full h-full absolute inset-0">
                                    <b class="text-xs relative">{{ item.count }}</b>
                                </div>
                                <!-- <button @click="gameNextPage(index)" class="w-6 h-6 bg-rgbawhite10 !text-rgbawhite50 rounded-md flex items-center justify-center">
                                    <icon-arrow-right size="2" class="w-5 h-5" />
                                </button> -->
                                <!-- <button @click="openGameAll(item.id)" class="h-6 px-3 ml-1.5 !text-xs bg-rgbawhite10 rounded-md">
                                    <span>Mais</span>
                                </button> -->
                            </div>
                        </dt>
                        <dd class="pt-1">
                            <home-game-list :list="item" :index="index"></home-game-list>
                        </dd>
                        
                        <!-- Jackpot 入口：插在第一项与第二项之间 -->
                        <div v-if="jpLobbyInfo.status=='1'&&index===0" class="px-1 mt-1">
                            <div @click="goToJackpotsRank()" class="w-full h-[5.5rem] rounded-l overflow-hidden flex items-center justify-between px-1" 
                            :style="{background: `url(${RankImg.img_hrankbg})`}" style="background-repeat: no-repeat;background-size: 100% 100%;">
                                <!-- 左侧彩金 -->
                              <div class="jackpot-amount bg-cover bg-center w-[10rem] h-[4rem] flex items-center justify-center" 
                              :style="{background: `url(${RankImg.gif_jp})`}" style="background-repeat: no-repeat;background-size: 100% 100%;">
                                <span class="text-[1.5rem] pt-9 font-bold text-homeranktext">{{ jpLobbyInfo.allJackpot }}</span>
                              </div>
                                <!-- 右侧自动滚轮列表 -->
                                <div class="flex-1 h-[4.4rem] ml-1 rounded-lg overflow-hidden pr-1">
                                <div class="w-full h-full overflow-hidden">
                                    <ul class="w-full block jackpot-scroll">
                                    <li v-for="(n,i) in [...jpLobbyInfo.list, ...jpLobbyInfo.list]" :key="i" class="w-full flex items-center justify-between my-[0.5rem]">
                                      <div class="text-left leading-tight w-[6.5rem]">
                                        <div class="text-themetext text-[0.6rem]">{{ n.username }}</div>
                                        <div class="text-rgbawhite50 text-[0.6rem]">{{ n.text }}</div>
                                      </div>
                                      <div class="text-themetext0 text-[0.8rem] font-bold">{{ n.bonus }}</div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                          </div>
                        </div>
                    </template>
                </dl>
            </pu-card>
            <!-- 位置1 -->
            <van-floating-bubble 
                v-for="item,index in sortedBuoyList" :key="index"
                :gap="0"
                axis="y"
                class="mt-[-2rem]"
                :offset="item.location==1||item.location==2?{ x: 20, y: 0 }:{ x: 0, y: 0 }"
                :style="item.location==1||item.location==3 ? { 
                    backgroundColor: 'transparent',
                    zIndex: 10,
                    width: '7rem',
                    height: 'auto',
                    right: '0.125rem',
                    left: item.location==3 ? '-4%' : 'auto',
                    top: bubbleTopRef,
                    bottom: 'auto',
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                } : {
                    backgroundColor: 'transparent',
                    zIndex: 10,
                    width: '7rem',
                    height: 'auto',
                    right: '0.125rem',
                    left: item.location==4 ? '-4%' : 'auto',
                    top: bubbleTopAltRef,
                    bottom: 'auto',
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }" 
                @click=openRedPakage(item) 
            >
                <div class="w-[4.25rem] flex">
                    <img :src="item.icon" class="w-full h-full object-contain">
                </div>
                <em class="w-full" style="padding-bottom: env(safe-area-inset-bottom);"></em>
            </van-floating-bubble>
            <pu-aside v-model="aside_show" :navList="navListRef" :hashSign="signConfigRef.todayStatus"></pu-aside>
            <sign-in></sign-in>
            <game-all-list></game-all-list> 
            <game-search v-model:show="showSearch" />
            <notice></notice>
            <notice-register></notice-register>
            <red-pakage></red-pakage>
            <!-- <home-no-recharge v-if="noRechargeShowRef"></home-no-recharge> -->
            <pwa-guide></pwa-guide>
            <template >
                <!-- 首充活动弹窗 -->
                <first-charge-pop></first-charge-pop>
                <!-- 破产活动弹窗 -->
                <Daypay></Daypay>

            </template>
            
            <!-- 首页活动弹窗 -->
             <!-- 签到活动开启时，仅当签到完成才显示弹窗 -->
             <template v-if="isOpenEnterRef && signConfigRef?.todayStatus === false">
                <pdd-index-pop 
                    v-for="(item, idx) in activityListRef" 
                    :key="idx" 
                    :data="item"
                />
            </template>
            <!-- 签到活动关闭时，直接显示弹窗 -->
            <template v-else-if="!isOpenEnterRef">
                <pdd-index-pop 
                    v-for="(item, idx) in activityListRef" 
                    :key="idx" 
                    :data="item" 
                />
            </template>

            <pdd-index-pop-new/>
            <notice-pop />
            <receive-pop />
            <teleport to="body">
                <div v-if="indexLoadingShowRef"  class="w-full h-full bg-three absolute left-0 top-0 z-[999999999999] flex items-center justify-center">
                    <van-loading color="white" size="4rem" />
                </div>
            </teleport>
            <div class="w-full h-auto">
                <div class="w-full h-auto mb-[3rem]  relative">
                <van-image :src=HomeImg.bg_info  lazy-load alt="Background Info" class="w-full h-auto px-4 mb-4"/>
                <div class="w-full h-full relative left-0 top-0 p-4 "
                    :style="{
                        backgroundImage: `url(${HomeImg.img_panda})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }"
                >
                    <img :src=gameLogo class="w-[8rem] mt-1 mb-1">
                    <div class="w-full h-auto flex mt-8 mb-8 gap-6">
                        <van-image :src=HomeImg.treasureChest_1  lazy-load alt=" Info" class=" w-[1.6rem] h-[1.6rem] "/>
                        <van-image :src=HomeImg.treasureChest_2  lazy-load alt=" Info" class="w-[1.6rem] h-[1.6rem]"/>
                        <van-image :src=HomeImg.treasureChest_3  lazy-load alt=" Info" class=" w-[1.6rem] h-[1.6rem] "/>
                        <van-image :src=HomeImg.treasureChest_4  lazy-load alt=" Info" class=" w-[1.6rem] h-[1.6rem] "/>
                    </div>
                    <template v-if="footerTextRef">
                        <p class="text-themetext4 text-center text-[0.68rem] mt-2">{{footerTextRef}}</p>
                    </template>
                    <template v-else>
                        <p class="text-themetext4 text-center text-[0.68rem] mt-2">Direitos autorais @ 2025 Todos <br/>os direitos reservados</p>
                        <p class="text-themetext4 text-center text-[0.7rem] mt-2">Isenção de responsabilidade: O ganho final não é garantido</p>
                    </template>
                    <div class="w-full flex flex-col items-center mt-4">
                        <van-image :src=HomeImg.img_18  lazy-load alt=" Info" class=" w-[1.6rem] h-[1.6rem]  mb-2"/>
                        <p class="text-themetext4 text-center text-[0.7rem] mt-2">Copyright © 2025 MX39.COM Casino online，All rights reserved.</p>
                    </div>
                </div>
                <!-- <div class="w-full h-full relative left-0 top-0 p-4">
                    <div class="w-full h-[2rem] rounded-full m5-theme-btn1 flex items-center justify-center mb-4 border border-inputborder">
                        <van-image :src=HomeImg.img_Android  lazy-load alt="Background Info" class="w-[1.2rem] h-[1.2rem] mr-2"/>
                        <p class="text-white text-[0.7rem] font-bold">Aplicativo Baixar Android</p>
                    </div>
                    <div class="w-full h-[2rem] rounded-full m5-theme-btn1 flex items-center justify-center border border-inputborder">
                        <van-image :src=HomeImg.img_IOS  lazy-load alt="Background Info" class="w-[1.2rem] h-[1.2rem] mr-2"/>
                        <p class="text-white text-[0.7rem] font-bold">Aplicativo Baixar iOS</p>
                    </div>
                </div> -->
            </div>
            </div>
            <div v-if="showGoTop" class="w-12 h-12 sticky bottom-16 left-[20rem] z-50 rounded-full flex items-center justify-center shadow-lg cursor-pointer" @click="scrollToTop">
                <img :src="HomeImg.icon_goTop" class="w-10 h-10 object-contain">
            </div>
            <div style="padding-bottom: env(safe-area-inset-bottom);">
                <em class="w-full h-[3.25rem] block"></em>
            </div>
        </pu-page>
    </template>
</template>

<style scoped>

/* 添加新的图标容器样式 */
.game-icon-container {
    width: 2.5rem;  /* 固定容器宽度 40px */
    height: 2.5rem; /* 固定容器高度 40px */
    display: flex;
    align-items: center;
    justify-content: center;
}
.game-icon-container_m5{
    width: 4.1rem;  /* 固定容器宽度 40px */
    height: 5.2rem; /* 固定容器高度 40px */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.game-icon {
    width: 50%;
    height: 50%;
    object-fit: contain;
}
/* 使用更具体的选择器确保只影响当前组件的 van-tabs */
.game-tabs :deep(.van-tab--active) {
    color: inherit;
}

.game-tabs :deep(.van-tab--active .text-xs) {
    color: inherit !important;
}

/* 如果需要覆盖更多样式 */
.game-tabs :deep(.van-tabs__nav) {
    background: transparent;
}

/* 添加点击缩放效果 */
.game-tabs :deep(.van-tab) a {
    transition: transform 0.1s ease;
}

.game-tabs :deep(.van-tab) a:active {
    transform: scale(0.9);
}

/* 确保图标和文字跟随缩放 */
.game-tabs :deep(.van-tab) a > * {
    transform-origin: center;
}

.search-input-container {
  transition: all 0.3s ease;
}

.placeholder-text {
  font-size: 0.875rem;
}

.jackpot-scroll{
  will-change: transform;
  animation: jackpotScroll 60s linear infinite;
  -webkit-animation: jackpotScroll 60s linear infinite;
}
.shake-updown{
    animation: smoothShake 3s ease-in-out infinite;
}
@keyframes smoothShake {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-4px);
    }
    100% {
        transform: translateY(0px);
    }
}
@keyframes jackpotScroll {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
</style>