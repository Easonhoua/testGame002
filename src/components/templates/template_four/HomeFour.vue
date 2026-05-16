
<script setup>

import { defineAsyncComponent,computed } from 'vue'
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
import { socialMenuListRef} from '@/model/common'
import { useThemeImages } from '@/utils/themeimg'
// 主页图片信息
const CommonImg = useThemeImages().common
const HomeImg = useThemeImages().home
const RankImg = useThemeImages().jprank
const documentTitle = computed(() => {
  return typeof window !== 'undefined' && window.document ? window.document.title : ''
})
// 获取共用逻辑
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

</script>

<template>
    <!-- home_mode == 4 -->
    <template v-if="home_mode == 4 ">
        <home-download></home-download>
    </template>
    <template v-else>
        <pu-page down hideBack height="h-[3.25rem] bg-tablebg">
            <template #left>
                <div class="pl-2 flex items-center " >
                    <button @click="openAisde()" class="w-[2.4rem] h-[2.3125rem] px-2 py-2 mr-1 bg-rgbawhite10 rounded-[0.5rem] relative cursor-pointer shrink-0 flex items-center justify-center">
                        <img :src=HomeImg.icon_menu class="w-full h-full">
                        <div v-if="redPotCountRef>0" class="w-3 h-3 text-[0.5625rem] !leading-none bg-four  text-white  rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                            <b>{{ redPotCountRef }}</b>
                        </div>
                    </button>
                    <img :src=gameLogo class="w-[9rem] object-contain object-left max-w-[6.5rem]">
                </div>
            </template>
            <template #right>
                <div class="pr-2 flex items-center ">
                    <template v-if="isAuthRef">
                        <div @click="toMine()" class="h-9 p-px rounded-lg  flex" >
                            <div class="h-full px-2  rounded-lg flex items-center bg-theme" >
                                <img src="/imgs/icon-wallet-g.svg" class="w-5 h-5 mr-2 -mt-0.5">
                                <p>
                                    <span class="text-m m4-text" >{{ currentUnit.value }}&nbsp; <span class="text-theme-three">{{ fn(memberRef&&memberRef.account&&memberRef.account.user_money||0) }}</span>&nbsp;</span>
                                </p>
                               
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <a href="javascript:;" @click="toLogin()" class="h-8 px-4 py-1 ml-2 text-theme text-[0.78rem] rounded-2xl m4-ten-btn  flex items-center">
                            <span>Entrar</span>
                        </a>
                        <a href="javascript:;" @click="toRegister()" class="h-8 px-4 py-1 ml-2 text-theme text-[0.78rem] rounded-2xl m4-nine-btn   flex items-center">
                            <span>Registro</span>
                        </a>
                    </template>
                    <a href="javascript:;" @click="openService()" class="w-9 h-9 ml-2 rounded-lg  flex items-center justify-center bg-rgbawhite10">
                        <img :src=HomeImg.icon_service class="w-5 h-5">
                    </a>
                </div>
            </template>
            <i class="h-[3.25rem] hidden"></i>
          
            <!-- banner -->
            <pu-card v-if="bannerListRef&&bannerListRef[1]" theme="3" class="mt-5">
                <van-swipe :autoplay="5000" indicator-color="var(--color-rgbawhite80)" class="overflow-hidden">
                    <van-swipe-item v-for="item,index in bannerListRef&&bannerListRef[1]||[]" :key="index" >
                        <van-image @click="onclickBanner(item)" :src="item.img" fit="contain" radius="0.5rem" class="w-full h-full">
                            <template #loading>
                                <van-loading type="spinner" color="#25bfac" />
                            </template>
                        </van-image>
                    </van-swipe-item>
                </van-swipe>
            </pu-card>
               <!-- notice -->
               <div theme="3" class="px-4 mt-1">
                <dl class="h-8 flex items-center flex-center bg-rgbawhite10 rounded-2xl" >
                    <dt class=" h-full   text-white  flex-1 overflow-hidden flex items-center" >
                        <template v-if="marqueeRef">
                            <van-notice-bar
                            background="transparent"
                            color="inherit"
                            style="--van-notice-bar-font-size: 0.75rem;--van-notice-bar-padding: 0 0.75rem;"
                            :text="marqueeRef"
                            @click="openNotice()"
                            class="w-full !text-white">
                                <template #left-icon>
                                    <img :src=CommonImg.icon_laba class="w-[0.88rem] h-[0.88rem] mr-1">
                                </template>
                            </van-notice-bar> 
                        </template>
                        <template v-else>
                            <MarqueeNotice />
                        </template>
                    </dt>
                    <dd @click="toMessage()" class="w-10 h-full ml-3  relative cursor-pointer shrink-0 flex items-center justify-center ">
                        <img :src=HomeImg.icon_email class="w-[1.25rem] h-[1rem] mr-1">
                        <div v-if="parseFloat(msgUnReadCountRef)>0" class="h-3 px-1 text-[0.5625rem] !leading-none bg-texterror  text-three  rounded-full absolute top-[0.5rem] right-[0.25rem] flex items-center justify-center">
                            <b>{{ msgUnReadCountRef }}</b>
                        </div>
                    </dd>
                </dl>
            </div>
            <pu-card theme="3" class="mt-3">
                <div class="flex justify-between flex-wrap mt-0.5"  v-if="bannerListRef&&bannerListRef[2]">
                    <template class="flex justify-between items-center">
                        <div class="item rounded-[0.625rem] overflow-hidden aspect-[110/144]  w-[31.5%]  flex items-center flex-col" v-for="(item,index) in bannerListRef[2]" :key="index"  @click="onclickBanner(item)">
                            <!-- <img :src="item.img" class="flex-1 w-full h-full  " /> -->
                            <van-image :src="item.img" lazy-load fit="contain" class="flex-1 w-full h-full  ">
                                <template #loading>
                                    <van-loading type="spinner" color="#25bfac" />
                                </template>
                            </van-image>
                            <!-- <div class="btn w-[5rem] ctx-box-btn2 text-theme rounded-[0.625rem] font-bold  text-[0.68rem] text-center py-[0.1rem] mt-[0.5rem]">
                                Adquira agora
                            </div> -->
                        </div>
                    </template>
                </div>
            </pu-card>
             <!-- 添加搜索框 -->
             <div class="search-container px-4 py-2 ">
                <div 
                    class=" flex items-center px-4 py-2.5 h-7 rounded-full cursor-pointer border border-defaultborder transition-all duration-300  "
                    @click="openGameAll(gameListRef[0].id)"
                >
                <img :src=CommonImg.icon_search class="w-4 h-4 mr-2" alt="search">
                    <span class="text-[#aaaaaa] flex-1 text-[0.875rem]">Procurar jogos</span>
                </div>
            </div>
            
            <!-- game_cover -->
            <pu-card theme="4">
                <div class="game-tabs-wrapper">
                <van-tabs v-model:active="game_cover_index" shrink 
                swipeable
                animated
                :ellipsis="false"
                    style="--van-tabs-line-height: 3.625rem;
                        --van-tabs-bottom-bar-height: 0;
                        --van-padding-xs: 0rem;"
                        class="game-tabs w-full overflow-x-auto">
                        <van-tab v-for="item,index in gameListRef" :key="index">
                            <template #title>
                                <a @click="openGameAll(item.id)" href="javascript:;" class="h-[4rem] px-1.5 w-full !py-2">
                                    <div class="game-icon-container !py-[0.15rem] border border-defaultborder ">
                                        <img :src="item.cover_home" class="game-icon w-6 h-6 ">
                                        <p class="text-center opacity-65 text-[0.625rem]" >{{ item.title }}</p>
                                    </div>
                                </a>
                            </template>
                        </van-tab>
                </van-tabs>
            </div>
            </pu-card>
            <!-- game -->
            <pu-card theme="3" class="!px-0">
                <dl v-for="item,index in gameListRef" :key="index" >
                    <!-- 只有当 item.title 不是 'Favorito' 时才渲染 -->
                    <template v-if="item.title !== 'Favorito'&&item.games.length>0"  >
                        <div class="flex justify-between items-center min-h-[2rem] px-2">
                            <div class="flex justify-center items-center " >
                                <img :src="item.cover" class="w-auto max-w-[60%] h-6 object-contain">
                                <!-- <van-image :src="item.cover" lazy-load fit="contain" class="w-auto max-w-[60%] h-6 object-contain"/> -->
                                <b class="ml-1 m4-text" style="font-size: 1rem;">{{ item.title }}</b>
                            </div>
                             <div class="m4-text flex items-center justify-center "  v-show="item?item.games.length>=0:false">
                                <div class="h-6 px-1.5 mx-1 text-center font-bold rounded-md flex items-center m4-ten-btn" >
                                    <span class="text-[0.625rem] ">Todos&nbsp;</span>
                                    <b class="text-[0.625rem] ">{{ item.count }}</b>
                                </div>
                                <button @click="gamePrevPage(index)" class="w-6 h-6  mx-1 rounded-md flex items-center justify-center m4-ten-btn" >
                                    <icon-arrow-left size="3" class="w-5 h-5   " />
                                </button>
                                <button @click="gameNextPage(index)" class="w-6 h-6   rounded-md flex items-center justify-center m4-ten-btn" >
                                    <icon-arrow-right size="3" class="w-5 h-5 " />
                                </button>
                            
                            </div>
                        </div>
                 
                    <dd class="pt-1"   v-show="item?item.games.length>=0:false">
                        <home-game-list :list="item" :index="index"></home-game-list>
                    </dd>
                        
                        <!-- Jackpot 入口：插在第一项与第二项之间 -->
                        <div v-if="jpLobbyInfo.status=='1'&&index===0" class="px-1 mt-1">
                            <div @click="goToJackpotsRank()" class="w-full h-[5.5rem] rounded-l overflow-hidden flex items-center justify-between px-1" 
                            :style="{background: `url(${RankImg.img_hrankbg})`}" style="background-repeat: no-repeat;background-size: 100% 100%;">
                                <!-- 左侧彩金 -->
                              <div class="jackpot-amount bg-cover bg-center w-[10rem] h-[4.6rem] flex items-center justify-center"
                              :style="{background: `url(${RankImg.gif_jp})`}" style="background-repeat: no-repeat;background-size: 100% 100%;">
                                <span class="text-[1.5rem] pt-9 font-bold text-[#1c0308]">{{ jpLobbyInfo.allJackpot }}</span>
                              </div>
                                <!-- 右侧自动滚轮列表 -->
                                <div class="flex-1 h-[4.4rem] ml-6 rounded-lg overflow-hidden pr-1">
                                <div class="w-full h-full overflow-hidden">
                                    <ul class="w-full block jackpot-scroll">
                                    <li v-for="(n,i) in [...jpLobbyInfo.list, ...jpLobbyInfo.list]" :key="i" class="w-full flex items-center justify-between my-[0.5rem]">
                                      <div class="text-left leading-tight w-[6.5rem]">
                                        <div class="text-themewhite text-[0.6rem]">{{ n.username }}</div>
                                        <div class="text-themetext3 text-[0.6rem]">{{ n.text }}</div>
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
                <!-- <em class="w-full" style="padding-bottom: env(safe-area-inset-bottom);"></em> -->
            </van-floating-bubble>
            <pu-aside v-model="aside_show"  :navList="navListRef" :hashSign="signConfigRef.todayStatus"></pu-aside>
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
             <!-- 签到活动开启时，仅当签到完成才显示弹窗  -->
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
                <div v-if="indexLoadingShowRef" style="background-color: #2e2458;" class="w-full h-full absolute left-0 top-0 z-[999999999999] flex items-center justify-center">
                    <van-loading color="white" size="4rem" />
                </div>
            </teleport>
            <div class="w-full h-auto ">
                <!-- <van-image src="/imgs/home/bg_db_info.png" lazy-load alt="Background Info" class="w-full h-auto"/> -->
                 <!-- <img src="/imgs/home/logo.png" alt="" class=" w-[6rem]  m-auto mt-1 mb-1"> -->
                 <img :src=gameLogo class="w-[6rem]  m-auto mt-1 mb-1">
                 <template v-if="footerTextRef">
                    <p class="text-white/60 text-center text-[0.68rem] mt-2">{{footerTextRef}}</p>
                 </template>
                 <template v-else>
                    <p class="text-white/60 text-center text-[0.68rem] mt-2">Direitos autorais @ 2025 Todos <br/>os direitos reservados</p>
                    <p class="text-white/60 text-center text-[0.7rem] mt-2">Isenção de responsabilidade: O ganho final não é garantido</p>
                </template>

                 <div class="join mt-4 px-4">
                    <div class=" flex items-center">
                        <em class="h-[0.1rem] flex-1 bg-tablebg"></em>
                        <h5 class="ma-w-[60%] px-2 text-[0.68rem] text-center m4-text font-bold">
                            <span >JUNTE-SE À NOSSA COMUNIDADE</span>
                        </h5>
                        <em class="h-[0.1rem] flex-1 bg-tablebg"></em>
                    </div>
                    <div class="w-full  inset-0 flex justify-center items-center gap-3 mt-3">
                        <a v-for="(item, index) in socialMenuListRef"
                            :key="index"
                            :href="item.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="px-2 flex items-center"
                            >
                            <img :src="item.icon" class="w-[2.5rem] h-[2.5rem] object-contain cursor-pointer" />
                        </a>
                    </div>
                 </div> 
            </div>
            <div class="border-t border-tablebg mb-[1rem] mt-3 text-[#aaa] text-center text-[0.58rem] py-4">
                Copyright ©2026 {{ documentTitle }} Todos os direitos reservados. 18+
            </div>
        <Panddingbottom></Panddingbottom>
        </pu-page>
    </template>
</template>

<style scoped>
    .gradient-border {
      position: relative;
    }
    
    .gradient-border::before,
    .gradient-border::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 1.5px;
      background: linear-gradient(to right, transparent, #60d63b, transparent);
    }
    
    .gradient-border::before {
      top: 0;
    }
    
    .gradient-border::after {
      bottom: 0;
    }
    /* 添加新的图标容器样式 */
    .game-icon-container {
        width: auto;  /* 固定容器宽度 40px */
        height: auto; /* 固定容器高度 40px */
        display: flex;
        align-items: center;
        justify-content: center;
        padding:0 0.5rem;
        box-sizing: border-box;
        border-radius: 1rem;
        margin: 0 0.3rem;
    }
    .game-icon {
        max-width: 150%;
        max-height: 150%;
        object-fit: contain;
    }
    /* 使用更具体的选择器确保只影响当前组件的 van-tabs */
    .game-tabs :deep(.van-tab--active) {
        color: inherit;
    }
    
    .game-tabs :deep(.van-tab--active .text-xs) {
        opacity: 0.65;
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
    
    :deep(.van-tabs--line .van-tabs__wrap){
        height: 4rem !important;
    }
    :deep(.van-swipe__indicator){
        width: 0.5rem;
        height: 0.5rem;
        margin-bottom: 0.5rem;
    }
    
    
    .jackpot-scroll{
      will-change: transform;
      animation: jackpotScroll 60s linear infinite;
      -webkit-animation: jackpotScroll 60s linear infinite;
    }
    @keyframes jackpotScroll {
      0% { transform: translateY(0); }
      100% { transform: translateY(-50%); }
    }
    
    
    </style>
