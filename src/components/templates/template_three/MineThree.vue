<script setup>
import { ref } from 'vue'
import { t,fn } from '@/i18n'
import { playBtnAudioFunc} from '@/utils/core'
import ShareList from '@/components/pages/ShareList.vue'
import LogOut from '@/components/pages/LogOut.vue'
import { blogTagIdsRef } from '@/model/common'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const CommonImg = useThemeImages().common
const MineImg = useThemeImages().mine
const AsideImg = useThemeImages().aside


const nav_list = ref([
    {title: t('userCenter.Message'), path: '/article/message', icon: MineImg.icon_msg},
    {title: t('userCenter.Allpromotions'), path: '/more', icon: MineImg.icon_more},
    {title: t('userCenter.GameRegistration'), path: '/game/record', icon: MineImg.icon_record},
    {title: t('userCenter.Depositextractionrecords'), path: '/moneyRecords', icon: MineImg.icon_moneylist},
    {title: t('userCenter.Configuration'), path: '/profile', icon: MineImg.icon_set},
    {title: t('userCenter.ContactSer'), type: 'service', icon: MineImg.icon_service},
])

import { useMine } from '@/composables/useMine'
const { 
    appIcon,
    amount_rate,
    memberRef,
    next_level,
    onclickNav,
    toRecharge,
    toWithdrawal,
    copyInviteCode
} = useMine()

</script>

<template>
    <pu-page hideHeader >
        <!-- <template #other>
            <div class="w-full absolute left-0 top-0">
                <img src="/imgs/user/mine-top-bg.png" class="w-full h-auto block" />
            </div>
        </template> -->
        <pu-card v-if="memberRef&&memberRef.id" theme="2" class="pt-5  px-2">
            <dl class="flex w-full bg-gradient-to-r from-loginlinear-4 to-loginlinear-3  m-auto  rounded-xl overflow-hidden">
                <dt class="w-full   flex  justify-between flex-col">
                    <div class='top flex items-center w-full p-2'>
                        <div class=" flex ">
                            <van-image :src="memberRef.head_portrait" width="4.25rem" height="4.25rem" radius="1rem" class="border border-white/25">
                                <template #loading>
                                    <img :src=appIcon class="w-full h-full object-cover">
                                </template>
                                <template #error>
                                    <img :src=appIcon class="w-full h-full object-cover">
                                </template>
                            </van-image>
                        </div>
                        <div class="flex-1 ">
                            <p class="mb-0.5 text-right">
                            <span class="text-xs text-theme-text ">{{ t('userCenter.balance') }}:&nbsp;</span>
                            <b class="text-sm text-themetext0">{{ currentUnit.value }}&nbsp;{{ fn(memberRef.account&&memberRef.account.user_money||0 )}}</b>
                            </p>
                            <!-- 每日奖励 -->
                            <p class="mb-0.5 text-right">
                                <span class="text-xs text-theme-text ">{{ t('userCenter.TotalBR') }}:&nbsp;</span>
                                <b class="text-sm text-themetext0">{{ currentUnit.value }}&nbsp;{{ fn(memberRef.give_amount||0 )}}</b>
                            </p>
                        </div>
                    </div>
                   <div class="w-full flex justify-between bottom bg-black/30 p-2"> 
                    <div class='left'>
                        <h5 class="mt-1 text-sm text-center font-bold text-themetext1">
                        <span>{{ memberRef.username }}</span>
                    </h5>
                    <div @click.stop.prevent="copyInviteCode(memberRef.id)" class="text-xs ctx-general-bg border-none px-1 py-0.5 rounded-lg text-center text-themetext2 " style="min-width: 1rem;max-width: 10rem;display: inline-block;" >
                        <div class="flex items-center">
                        <span class="align-middle  text-three text-[0.64rem]">ID: {{ memberRef.id }}</span>
                        <img :src=AsideImg.icon_copy class="w-3 h-3 ml-5 "/>
                        </div>
                    </div>
                    

                    </div>
                    <div class='right flex-1 ml-2'> 
                         <ol class="w-full !pt-1 text-xs flex">
                        <li class="w-1/2 pr-1">
                            <div @click="toRecharge()" class="w-full h-8 px-1 unified-button ctx-theme2 rounded-[0.5rem] flex items-center justify-center"
                                :style="{ backgroundImage: `url(${AsideImg.bg_deposito})`}"
                                style="background-repeat: no-repeat; background-size: 100% 100%;"
                            >    
                                <img :src=AsideImg.icon_recharge class="w-4 h-4 mr-1 -mt-0.5" />
                                <span class="text-themetext4">{{ t('deposit') }}</span>
                            </div>
                        </li>
                        <li class="w-1/2 pl-1">
                            <div @click="toWithdrawal()" class="w-full h-8 px-1 unified-button ctx-login-btn text-three rounded-[0.5rem] flex items-center justify-center"
                            :style="{ backgroundImage: `url(${AsideImg.bg_deposito2})`}"
                            style="background-repeat: no-repeat; background-size: 100% 100%;">
                                <img :src=AsideImg.icon_withdraw class="w-4 h-4 mr-1 " />
                                <span class="text-themetext1">{{t('Sack') }}</span>
                            </div>
                        </li>
                    </ol>

                    </div>
                       
                   </div>
                 
                </dt>
                
            </dl>
        </pu-card>
        <pu-card theme="3" class="mt-3 "> 
            <div class="w-full px-2 py-4 rounded-lg bg-gradient-to-r from-minelinear1 to-minelinear2 ">
                    <div class="w-full flex justify-between items-center align-center"> 
                        
                        <div class="w-full flex ">
                            <img :src=MineImg.icon_vip class="w-[3rem] mr-1 shrink-0" />
                            <p class=" text-one">
                                <span class="text-xl text-themetext0">VIP&nbsp;</span>
                                <span class="text-3xl text-themetext0">{{ memberRef&&memberRef.current_level }}</span>
                            </p>
                        </div>
                   
                        <!-- <img src="/imgs/user/mine-vip-card-2.png" class="w-[9.375rem] h-8 block"> -->
                         <div class="w-[8rem] h-8">
                            <router-link to="/vip" @click="playBtnAudioFunc()" class="w-full h-full  pl-2 flex  flex_end items-center  ">
                                <span class="text-xs text-themetext1">{{ t('userCenter.seeMore') }}</span>
                                <icon-arrow-right size="2" class="w-6 h-6 "></icon-arrow-right>
                            </router-link>

                         </div>
                       
                 </div>
                <dl class="w-full p-2 block">
                    <dt class="w-full">
                        <span class="text-xs text-white">{{  t('userCenter.Volume1')  }}</span>
                        <span class="text-base float-right">{{ fn(memberRef&&memberRef.account&&memberRef.account.consume_money)}}</span>
                        <i class="clear-both block"></i>
                    </dt>
                    <dd class="w-full h-2 rounded-full overflow-hidden bg-default-bg flex progressbar-bg">
                        <em :style="`width: ${amount_rate}%`" class="h-full m3-progresbar rounded-full flex justify-end overflow-hidden" >
                            <i class="w-2 h-2 bg-white rounded-full"></i>
                        </em>
                    </dd>
                    <dd class="w-full text-xs flex items-center justify-between ">
                        <span class="text-themetext4">0</span>
                        <span class="text-themetext4">{{next_level.bet_amount}}(VIP {{next_level.vip}})</span>
                    </dd>
                </dl>
                <dl class="w-full p-2 rounded-lg block">
                    <dt class="w-full">
                        <span class="text-xs text-white">{{ t('userCenter.Volume2') }}</span>
                        <span class="text-base opacity-85 float-right">{{ fn(memberRef&&memberRef.account&&memberRef.account.consume_money) }}</span>
                        <i class="clear-both block"></i>
                    </dt>
                    <dd class="w-full h-2 bg-default-bg rounded-full overflow-hidden flex progressbar-b">
                        <em style="width: 100%" class="h-full m3-progresbar rounded-full flex justify-end overflow-hidden">
                            <i class="w-2 h-2 bg-white rounded-full"></i>
                        </em>
                    </dd>
                    <dd class="w-full text-xs flex items-center justify-between">
                        <span class="text-themetext4">0</span>
                        <span class="text-themetext4">{{ t('userCenter.KeepTheDivision') }}: 0</span>
                    </dd>
                </dl>
            </div>
        </pu-card>
        <pu-card theme="1" class="mt-3 p-3 bg-text-two">
            <router-link :to="blogTagIdsRef.includes(2) ? '/recharge' : '/agent'" class="w-full mb-2 flex items-center justify-between">
                <b class="text-sm  text-theme-text ">{{ t('userCenter.Agent') }}</b>
                <div class="flex items-center">
                    <span class="text-xs text-themetext1">{{ t('userCenter.seeMore') }}</span>
                    <icon-arrow-right size="2" class="w-6 h-6 text-themetext1"></icon-arrow-right>
                </div>
            </router-link>
            <!-- 从今天起直接佣金 -->
            <div class="w-full py-2 px-3 mb-2  text-themewhite rounded-lg flex items-center bg-black/20" >
                <p class="text-xs text-themetext2 flex-1 overflow-hidden">
                    <span>{{ t('userCenter.TodayCommission') }}</span>
                </p>
                <p class="pl-3 shrink-0">
                    <span class="text-xs opacity-45 text-themetext0">{{ currentUnit.value }}&nbsp;</span>
                    <span class="text-sm text-themetext0">{{ fn(memberRef.agent_bonus, 0) }}</span>
                </p>
            </div>
            <p class="text-xs text-theme-text text-center">{{ t('userCenter.QuickShare') }}</p>
            <div class="w-full px-2 rounded-lg bg-black/20" >
                <share-list :showName="true"></share-list>
            </div>
        </pu-card>
        <pu-card theme="0" class="py-2 mt-2 text-sm bg-text-two">
            <template v-for="item,index in nav_list" :key="index">
                <a href="javascript:;" @click="onclickNav(item)" class="w-full py-3 pl-4 pr-2 unified-button border-b border-four last:border-none flex items-center">
                    <img :src="item.icon" class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0" />
                    <p class="flex-1 overflow-hidden">
                        <span class="text-themetext1">{{ item.title }}</span>
                    </p>
                    <icon-arrow-right size="2" class="w-6 h-6 opacity-45 shrink-0 text-themetext1"></icon-arrow-right>
                </a>
            </template>
        </pu-card>
        <pu-card theme="0" class="mt-2 text-sm bg-text-two">
            <log-out>
                <a href="javascript:;" class="w-full py-3 pl-4 pr-2 unified-button flex items-center">
                    <img :src=MineImg.icon_exit class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0" />
                    <p class="flex-1 overflow-hidden">
                        <span class="text-themetext1">{{ t('userCenter.Logout') }}</span>
                    </p>
                    <icon-arrow-right size="2" class="w-6 h-6 opacity-45 shrink-0 text-themetext1"></icon-arrow-right>
                </a>
            </log-out>
        </pu-card>
            <Panddingbottom></Panddingbottom>
    </pu-page>
    
</template>