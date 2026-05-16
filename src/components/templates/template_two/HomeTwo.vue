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
// import Panddingbottom from '@/components/public/Panddingbottom.vue'
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
import { useHome } from '@/composables/useHome'
const { 
    home_mode,
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
    NoticeShowRef,
	redPotCountRef,
	activityListRef,
    signConfigRef,
    memberRef,
    navListRef,
    bannerListRef,
    gameListRef,
    bubbleTopRef,
    bubbleTopAltRef,
    jpLobbyInfo,

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

</script>

<template>
    <!-- home_mode == 4 -->
    <template v-if="home_mode == 4 ">
        <home-download></home-download>
    </template>
    <template v-else>
        <pu-page down hideBack height="h-[3.25rem]">
            <template #left>
                <div class="pl-2 flex items-center" >
                    <button @click="openAisde()" class="w-[2.3125rem] h-[2.3125rem] mr-1 bg-transparent rounded-2xl relative cursor-pointer shrink-0 flex items-center justify-center">
                        <img :src=HomeImg.icon_menu class="w-full h-full">
                        <div v-if="redPotCountRef>0" class="w-3 h-3 text-[0.5625rem] !leading-none bg-two  text-three  rounded-full absolute -top-0.5 -right-0.5 flex items-center justify-center">
                            <b>{{ redPotCountRef }}</b>
                        </div>
                    </button>
                    <img :src=gameLogo class="w-auto h-7  max-w-[7.5rem] object-contain object-left">
                </div>
            </template>
            <template #right>
                <div class="pr-2 flex items-center">
                    <template v-if="isAuthRef">
                        <div @click="toMine()" class="h-9 p-px rounded-lg  flex" >
                            <div class="h-full px-2  rounded-lg flex items-center  bg-default-bg rounded-lg border border-defaultborder" >
                                <img src="/imgs/icon-wallet-g.svg" class="w-5 h-5 mr-2 -mt-0.5">
                                <p>
                                    <span class="text-four" >{{ currentUnit.value }}&nbsp;{{ fn(memberRef&&memberRef.account&&memberRef.account.user_money||0) }}&nbsp;</span>
                                </p>
                               
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <a href="javascript:;" @click="toLogin()" class="h-9 px-3 ml-2 text-xs text-themewhite rounded-lg rounded-lg bg-gradient-to-b from-loginlinear-3 to-loginlinear-4 relative flex items-center">
                            <span>Entrar</span>
                        </a>
                        <a href="javascript:;" @click="toRegister()" class="h-9  px-2 ml-2 text-xs text-themewhite bg-gradient-to-b from-btnlinar4 to-btnlinar3 rounded-lg  relative flex items-center">
                            <span>Registro</span>
                            <em class=""></em>
                        </a>
                    </template>
                    <a href="javascript:;" @click="openService()" class="w-9 h-9 ml-2  bg-default-bg rounded-lg border border-defaultborder flex items-center justify-center ">
                        <img :src=HomeImg.icon_service class="w-6 h-5">
                    </a>
                </div>
            </template>
            <i class="h-[3.25rem] hidden"></i>
             <!-- notice -->
            <div theme="3" class="!px-0 ">
                <dl class="h-8 flex items-center flex-center " :style="{background: `url(${HomeImg.img_noticeBg}) center` }" style="background-size: 100% 100% ;">
                    <dt class=" h-full text-four  flex-1 overflow-hidden flex items-center" >
                        <template v-if="marqueeRef">
                            <van-notice-bar
                            background="none"
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
                    <dd @click="toMessage()" class="w-10 h-full ml-3  relative cursor-pointer shrink-0 flex items-center justify-center ">
                        <img :src=HomeImg.icon_email class="w-[2rem] h-[2rem]">
                        <div v-if="parseFloat(msgUnReadCountRef)>0" class="h-3 px-1 text-[0.5625rem] !leading-none bg-two  text-three  rounded-full absolute top-[0.5rem] right-[0.25rem] flex items-center justify-center">
                            <b>{{ msgUnReadCountRef }}</b>
                        </div>
                    </dd>
                </dl>
            </div>
            <!-- 添加搜索框 -->
            <!-- <div class="search-container px-4 py-2 ">
                <div 
                    class=" flex items-center px-4 py-2.5 h-7 rounded-full cursor-pointer bg-default-bg  border border-defaultborder transition-all duration-300"
                    @click="openSearch"
                >
                    <span class="text-three flex-1 text-[0.875rem]">Procurar jogos</span>
                    <img :src=CommonImg.icon_search class="w-5 h-4" alt="search">
                </div>
            </div> -->
            <!-- banner -->
            <pu-card v-if="bannerListRef&&bannerListRef[1]" theme="3" class="mt-3" >
                <van-swipe :autoplay="5000" indicator-color="#000" class="overflow-hidden">
                    <van-swipe-item v-for="item,index in bannerListRef&&bannerListRef[1]||[]" :key="index" >
                        <van-image @click="onclickBanner(item)" :src="item.img" fit="contain" radius="0.5rem" class="w-full h-full" />
                    </van-swipe-item>
                </van-swipe>
            </pu-card>
            <!-- 紫色版规则样式 -->
            <!-- <pu-card theme="3">
                <div class="flex justify-between flex-wrap">
                    <template v-for="item,index in bannerListRef&&bannerListRef[2]||[]" :key="index">
                        <van-image @click="onclickBanner(item)" :src="item.img" width="6.75rem" height="4.125rem" radius="0.5rem" fit="cover" class="mt-2"></van-image>
                    </template>
                </div>
            </pu-card> -->
            <!-- 绿色版不规则样式 -->
            <pu-card theme="3">
                <div class="flex justify-between flex-wrap mt-0.5"  v-if="bannerListRef&&bannerListRef[2]&&bannerListRef[2].length>0">
                    <!-- v-for="item,index in bannerListRef&&bannerListRef[2]||[]" :key="index" -->
                    <template class="flex justify-between items-center">
                        <div class="leftimg w-[12.5rem] h-[6.5rem] ">
                            <img :src="bannerListRef[2][0].img" @click="onclickBanner(bannerListRef[2][0])" />
                        </div>
                        <div class="rightimgbox flex flex-col justify-between ">
                            <!-- v-if="bannerListRef[2][1]&&bannerListRef[2][1].length>0" -->
                            <div class="top w-[9rem] h-[3rem] -mt-1.5">
                                <img :src="bannerListRef[2][1].img" class="w-full h-full" @click="onclickBanner(bannerListRef[2][1])"/>
                            </div>
                            <!-- v-if="bannerListRef[2][2]&&bannerListRef[2][2].length>0" -->
                            <div class="bottom w-[9.6rem] h-[3rem] -ml-2.5 mt-1" >    
                                <img :src="bannerListRef[2][2].img" class="w-full h-full" @click="onclickBanner(bannerListRef[2][2])"/>
                            </div>
                        </div>
                    </template>
                </div>
            </pu-card>
            
            <!-- game_cover -->
            <pu-card theme="4" class="pt-0.5">
                <van-tabs v-model:active="game_cover_index" shrink 
                    style="--van-tabs-line-height: 3.625rem;
                        --van-tabs-bottom-bar-height: 0;
                        --van-padding-xs: 0;"
                        class="game-tabs w-full overflow-hidden" >
                    <img :src=HomeImg.img_gameTypeBg alt="" class="w-full h-[3.28rem] z-[-1] mt-[-2.5rem]">
                        <van-tab v-for="item,index in gameListRef" :key="index">
                            <template #title>
                                <a @click="openGameAll(item.id)" href="javascript:;" class="h-[4rem] px-1.5">
                                    <div class="game-icon-container ml-1 mr-3 rounded-md flex flex-col items-center justify-center"
                                    :style="{
                                        backgroundImage: `url(${HomeImg.icon_gameType})`,
                                        backgroundSize: '100% 100%',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }">
                                        <img :src="item.cover_home" class="game-icon w-8 h-8 mt-[0.55rem]">
                                        <p class="text-center !text-three mt-[0.45rem]" style="max-width: 3rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: normal !important; font-size: 0.625rem;">{{ item.title }}</p>
                                    </div>
                                </a>
                            </template>
                        </van-tab>
                </van-tabs>
            </pu-card>
            <!-- game -->
            <pu-card theme="3" class="!px-0">
                <dl v-for="item,index in gameListRef" :key="index" class="mt-10">
                    <!-- 只有当 item.title 不是 'Favorito' 时才渲染 -->
                    <template v-if="item.title !== 'Favorito'&&item.games.length>0"  >
                        <div class="gameTitle -mt-8"   v-show="item?item.games.length>=0:false"  :style="{ backgroundImage: `url(${HomeImg.img_gameTitleBg})`}">
                            <!-- v-show="item?item.length>=0:false" -->
                            <div class="flex justify-center items-center mt-1" >
                                <img :src="item.cover" class="w-auto max-w-[60%] h-6 object-contain">
                                <b class="ml-1 text-three" style="font-size: 1rem;">{{ item.title }}</b>
                            </div>
                        </div>
                        <dd class="pt-1" style="margin-top: -23rem;"   v-show="item?item.games.length>=0:false">
                            <home-game-list :list="item" :index="index"></home-game-list>
                        </dd>
                        <div class="text-rgbawhite50 flex items-center justify-center mb-4"  v-show="item?item.games.length>=0:false">
                            <button @click="gamePrevPage(index)" class="w-6 h-6  rounded-md flex items-center justify-center bg-tablergba20" >
                                <icon-arrow-left size="2" class="w-5 h-5  text-three " />
                            </button>
                            <div class="h-6 px-1.5 mx-1 text-center font-bold rounded-md flex items-center bg-tablergba20" >
                                <span class="text-[0.625rem] text-three">Todos&nbsp;</span>
                                <b class="text-[0.625rem] text-three">{{ item.count }}</b>
                            </div>
                            <button @click="gameNextPage(index)" class="w-6 h-6   rounded-md flex items-center justify-center bg-tablergba20" >
                                <icon-arrow-right size="2" class="w-5 h-5  text-three " />
                            </button>
                        </div>

                        <!-- Jackpot 入口：插在第一项与第二项之间 -->
                        <div v-if="jpLobbyInfo.status=='1'&&index===0" class="px-1 mt-1">
                            <div @click="goToJackpotsRank()" class="w-full h-[5.5rem] rounded-l overflow-hidden flex items-center justify-between px-1" 
                                :style="{background: `url(${RankImg.img_hrankbg}) no-repeat center / 100% 100%`}">
                                <!-- 左侧彩金 -->
                              <div class="jackpot-amount bg-cover bg-center w-[10rem] h-[4.6rem] flex items-center justify-center" 
                              :style="{background: `url(${RankImg.gif_jp}) no-repeat center / 100% 100% `}">
                                <span class="text-[1.5rem] pt-9 font-bold text-homeranktext">{{ jpLobbyInfo.allJackpot }}</span>
                              </div>
                                <!-- 右侧自动滚轮列表 -->
                                <div class="flex-1 h-[4.4rem] ml-6 rounded-lg overflow-hidden pr-1">
                                <div class="w-full h-full overflow-hidden">
                                    <ul class="w-full block jackpot-scroll">
                                    <li v-for="(n,i) in [...jpLobbyInfo.list, ...jpLobbyInfo.list]" :key="i" class="w-full flex items-center justify-between my-[0.5rem]">
                                      <div class="text-left leading-tight w-[6.5rem]">
                                        <div class="text-themewhite text-[0.6rem]">{{ n.username }}</div>
                                        <div class="text-three text-[0.6rem]">{{ n.text }}</div>
                                      </div>
                                      <div class="text-four text-[0.8rem] font-bold">{{ n.bonus }}</div>
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
            <!-- 首充活动弹窗 -->
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
            <div class="w-full h-auto mb-[3rem] -mt-[2rem]">
                <van-image :src=HomeImg.bg_info lazy-load alt="Background Info" class="w-full h-auto"/>
                <img :src=gameLogo class="w-[6rem]  m-auto mt-1 mb-1">
                <template v-if="footerTextRef">
                    <p class="text-rgbawhite50 text-center text-[0.68rem] mt-2">{{footerTextRef}}</p>
                 </template>
                 <template v-else>
                    <p class="text-rgbawhite50 text-center text-[0.68rem] mt-2">Direitos autorais @ 2025 Todos <br/>os direitos reservados</p>
                    <p class="text-rgbawhite50 text-center text-[0.7rem] mt-2">Isenção de responsabilidade: O ganho final não é garantido</p>
                </template>
            </div>
            <Panddingbottom></Panddingbottom>
        </pu-page>
    </template>
</template>

<style scoped>
    :deep(.van-notice-bar){
        background: none !important;
    }
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
    width: 3rem;  /* 固定容器宽度 40px */
    height: 4rem; /* 固定容器高度 40px */
    display: flex;
    align-items: center;
    justify-content: center;
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
.leftimg{
    overflow: hidden;
    border-radius:0.99rem 0.95rem 2.5rem 2rem / 0.78rem 1.5rem 4.5rem 1rem;
    clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%);
}
.rightimgbox{
    .top{
        overflow: hidden;
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 7% 0%);
        border-radius: 3rem 2rem 1rem 1.5rem / 5rem 1rem 1.5rem 4rem;
    }
    .bottom{
        overflow: hidden;
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 6% 0%);
        border-radius: 3rem 2rem 1rem 1.5rem / 5rem 1rem 1.5rem 4rem;
    }
}
:deep(.van-tabs--line .van-tabs__wrap){
    height: 4rem !important;
}
.gameTitle{
    background: url('/imgs/home/home_bg_youxi.png') no-repeat center center;
    background-size: 100% 100%;
    width: 100%;
    min-height: 25rem;
    overflow: hidden;
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