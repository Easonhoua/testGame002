<script setup>
import { ref,computed } from 'vue'
import { t, fn } from '@/i18n'
import { playBtnAudioFunc} from '@/utils/core'
import ShareList from '@/components/pages/ShareList.vue'
import LogOut from '@/components/pages/LogOut.vue'
import { blogTagIdsRef } from '@/model/common'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const CommonImg = useThemeImages().common
const MineImg = useThemeImages().mine
const invite_link = computed(()=> {
    let code = memberRef.value&&memberRef.value.promoter_code
    let domain = window.location.protocol + '//' + window.location.host + '/#/'
    var query = {
        promoter: code
    }
    var queryString = new URLSearchParams(query).toString()
    return code ? domain+'?'+queryString : domain
})

const nav_list = ref([
    {title: 'Mensagem', path: '/article/message', icon: MineImg.icon_msg},
    {title: 'Todas as Promoções', path: '/more', icon: MineImg.icon_more},
    {title: 'Registro do Jogo', path: '/game/record', icon: MineImg.icon_record},
    {title: 'Registros de depósito e saqueo', path: '/moneyRecords', icon: MineImg.icon_moneylist},
    {title: 'Configuração', path: '/profile', icon: MineImg.icon_set},
    {title: 'Contatar o Serviço', type: 'service', icon: MineImg.icon_service},
])

import { useMine } from '@/composables/useMine'
import { useAside } from '@/composables/useAside'
const { 
    appIcon,
    amount_rate,
    memberRef,
    next_level,
    onclickNav,
    toRecharge,
    toWithdrawal,
} = useMine()
const { 
    copyInviteCode,
} = useAside(close)

</script>

<template>
    <pu-page :title="t('pageTitle.AccountCenter')" hideBack hideService>
            <pu-card v-if="memberRef&&memberRef.id" theme="3">
            <div class="w-full  text-white rounded-lg overflow-hidden">
                <div class="w-full flex py-3 px-4 items-center bg-tablebg justify-between">
                    <div class="left flex items-center border-r border-rgbawhite10 pr-2">
                        <van-image :src="memberRef.head_portrait" width="3rem" height="3rem" radius="1rem" class="border mr-2 border-rgbawhite20">
                            <template #loading>
                                <img :src=appIcon class="w-full h-full object-cover">
                            </template>
                            <template #error>
                                <img :src=appIcon class="w-full h-full object-cover">
                            </template>
                        </van-image>
                        <div >
                            <h5 class="mt-1 text-sm text-center font-bold flex items-center ">
                                <span class="m4-text">{{ memberRef.username }}</span>
                                <div
                                :style="{backgroundImage: `url(${CommonImg.icon_vipbg})`,}" 
                                style="background-repeat: no-repeat;background-size: 100% 100%;line-height: 0.85rem;" class="w-[1.5rem] h-[0.75rem] text-[0.68rem] text-center text-theme">V{{ memberRef&&memberRef.current_level }}</div>
                            </h5>
                            <div @click.stop.prevent="copyInviteCode(memberRef.id)" class="text-xs text-white  px-1 py-0.5 " style="min-width: 1rem;max-width: 10rem;display: inline-block;" >
                                <div class="flex items-center">
                                    <span class="align-middle text-[0.64rem]">ID: {{ memberRef.id }}</span>
                                    <img :src="CommonImg.icon_copy" class="w-3 h-3 ml-1 "/>
                                </div>
                             </div>
                    </div>
                    </div>
                    <div class="right">
                            <!-- 余额 -->
                        <p class="text-center">
                            <span class="text-xs text-themetext3  ">Saldo:&nbsp;</span>
                            <b class="text-sm m4-text">{{ currentUnit.value }}&nbsp;{{ fn(memberRef.account&&memberRef.account.user_money||0 )}}</b>
                        </p>
                        <!-- 每日奖励 -->
                        <p class="text-left">
                            <span class="text-[0.68rem] text-themetext3 ">Total de bônus&nbsp; </span>
                            <p class="text-[0.68rem] text-themetext3 ml-6 -mt-2">recebidos:&nbsp;<b class="text-sm text-themetext0 ">{{ currentUnit.value }}&nbsp;{{ fn(memberRef.give_amount||0 )}}</b></p>
                        </p>
                    </div>
                </div>
                <dl class="flex px-4 py-4"> 
                <dd class="flex-1 overflow-hidden">
                    <ol class="w-full !pt-1 text-xs flex">
                        <li class="w-1/2 pr-1" @click="toRecharge()">
                            <div  class="w-full h-10 px-1 unified-button !font-normal m4-ten-btn text-theme font-bold rounded-[2rem] flex items-center justify-center text-[0.88rem]">
                                <span>Depósito</span>
                            </div>
                        </li>
                        <li class="w-1/2 pl-1" @click="toWithdrawal()" >
                            <div  class="w-full h-10 px-1 unified-button !font-normal m4-nine-btn text-theme font-bold  rounded-[2rem] flex items-center justify-center text-[0.88rem]">
                                <span>Saque</span>
                            </div>
                        </li>
                    </ol>
                </dd>
            </dl>
            </div>
        </pu-card>
        <pu-card theme="3" class="mt-3">
            <div 
            :style="{backgroundImage: `url(${MineImg.img_minebg})`,}"
            style="background-repeat: no-repeat;background-size: 100% 100%;"  class=" rounded-lg overflow-hidden">
                <div class="w-full flex items-center justify-between px-4 py-2">
                   <div class="flex items-center justify-center">
                    <img :src="MineImg.icon_vip"  class="w-[3rem] h-[3rem] "/>
                    <div class="flex flex-col items-center justify-center">
                        <p class=" text-one">
                        <span class="text-xl m4-text font-bold">VIP.{{ memberRef&&memberRef.current_level }}</span>
                        </p>
                        <div 
                         :style="{backgroundImage: `url(${MineImg.bg_vip1})`,}"
                        style="background-repeat:  no-repeat;background-size: 100% 100%;line-height: 1rem;" class="w-[3.8rem] h-[1rem] text-[0.68rem] text-center text-theme" >
                            Meu Nível
                        </div>
                    </div>
                   </div>
                   <div >
                        <router-link to="/vip" @click="playBtnAudioFunc()" class="w-full h-full flex items-center justify-center px-2 py-1  m4-nine-btn  font-bold rounded-[2rem] ">
                            <img :src="MineImg.vip0"  class="w-[0.88rem] h-[0.75rem] mr-1" />
                            <span class="text-xs">Ver Mais</span>
                        </router-link>
                   </div>
                </div>
                <div class="w-full mt-2 bg-rgbablack15 p-2 ">
                <dl class="w-full block p-2">
                    <div class="flex w-full items-center ">
                        <img :src="MineImg.vip1" class="w-[1.5rem] h-[1.5rem] mr-1"/>
                        <div class="w-full" >
                            <dt class="w-full flex items-center justify-between">
                                <span class="text-xs m4-text !font-normal">Volume acumulado de apostas:</span>
                                <span class="text-xs m4-text float-right">{{ currentUnit.value }} {{next_level.bet_amount}} to VIP.{{next_level.vip}} </span>
                            </dt>
                            <dd class="w-full h-2 rounded-full overflow-hidden flex bg-rgbawhite30">
                                <em :style="`width: ${amount_rate}%`" class="h-full m4-ten-btn rounded-full flex justify-end overflow-hidden" >
                                    <i class="w-2 h-2 bg-white rounded-full"></i>
                                </em>
                            </dd>
                        </div>
                    </div>
                    
                </dl>
                <dl class="w-full p-2 mt-2">
                    <div class="flex w-full items-center ">
                        <img :src="MineImg.vip2" class="w-[1.5rem] h-[1.5rem] mr-1"/>
                        <div class="w-full" >
                            <dt class="w-full flex items-center justify-between">
                                <span class="text-xs m4-text">Volume de apostas deste mês:</span>
                                <span class="text-xs text-themetext0 float-right">{{ currentUnit.value }} {{ fn(memberRef&&memberRef.account&&memberRef.account.consume_money) }} </span>
                            </dt>
                            <dd class="w-full h-2 rounded-full overflow-hidden flex bg-rgbawhite30">
                                <em :style="`width: ${amount_rate}%`" class="h-full bg-themetext0 rounded-full flex justify-end overflow-hidden" >
                                    <i class="w-2 h-2 bg-white rounded-full"></i>
                                </em>
                            </dd>
                            <dd class="w-full text-xs flex items-center justify-between">
                                <span class="text-themetext3">0</span>
                                <span class="text-themetext3">Manter a divisão: 0</span>
                            </dd>
                        </div>
                    </div>
                </dl>
            </div>
            </div>
        </pu-card>
        <pu-card theme="0" class="mt-3 ">
            <router-link :to="blogTagIdsRef.includes(2) ? '/recharge' : '/agent'" class="w-full mb-2 flex items-center justify-between p-3">
                <div class="flex items-center">
                    <img :src="MineImg.vip3" class="w-6 h-6 mr-2"/>
                    <b class="text-sm  m4-text ">Agente</b>
                </div>
              
                <div class="flex items-center bg-themetext0 rounded-[2rem] px-2 py-1 text-theme font-bold">
                    <img :src="MineImg.vip4" alt="" class="w-4 h-4 mr-1" />
                    <span class="text-xs ">Ver Mais</span>
                </div>
            </router-link>
            <!-- 从今天起直接佣金 -->
            <div class="w-full py-2 px-3 mb-2  text-body-text  flex justify-center items-center bg-black/20" >
                <img :src="MineImg.vip5" class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0 "/>
                <p class="text-xs text-themetext3 overflow-hidden">
                    <span>Comissão direto de hoje:</span>
                </p>
                <p class="pl-1 shrink-0">
                    <span class="text-xs text-themetext0">{{ currentUnit.value }}</span>
                    <span class="text-s text-themetext0 font-bold">{{ fn(memberRef.agent_bonus, 2) }}</span>
                    <!-- <span class="text-s text-themetext0 font-bold">{{ memberRef.agent_bonus%1 === 0 ?fn(memberRef.agent_bonus, 2):fn(memberRef.agent_bonus, 0) }}</span> -->
                </p>
            </div>
            <!-- 我的链接 -->
            <div class="w-full py-2 px-3 mb-2   flex justify-center items-center " >
                <img :src="MineImg.img_link" class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0 "/>
                <p class="text-[0.88rem] m4-text overflow-hidden min-w-[4rem] font-[600] ">
                    <span>Meu link:</span>
                </p>
                <dl class="w-full h-12  flex items-center">
                <dt class="flex-1 overflow-hidden bg-theme rounded-[2rem] h-[2rem] text-center  mr-2" style="line-height: 2rem;">
                    <input type="text" :value="invite_link" readonly class="w-full px-4 !text-themetext0 bg-transparent outline-none">
                </dt>
                <img :src="MineImg.btncopy" class="w-[1.5rem] h-[1.5rem]" @click="copyInviteCode(invite_link)"/>

            </dl>
            </div>
            <div class="w-full p-2  bg-black/20" >
                <p class="text-x m4-text  !font-normal text-center">Compartilhamento Rápido</p>
                <share-list :showName="true"></share-list>
            </div>
        </pu-card>
        <pu-card theme="3" class=" mt-2 text-sm ">
            <template v-for="item,index in nav_list" :key="index">
                <a href="javascript:;" @click="onclickNav(item)" class="w-full h-12 py-3 pl-4 pr-2 mb-2 m4-ten-btn   rounded-lg flex items-center">
                    <img :src="item.icon" class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0" />
                    <p class="flex-1 overflow-hidden">
                        <span >{{ item.title }}</span>
                    </p>
                    <img :src="MineImg.icon_right2" class="w-2 mr-2 shrink-0" />
                </a>
            </template>
        </pu-card>
        <pu-card theme="0" class="mt-2 text-sm ">
            <log-out>
                <a href="javascript:;" class="w-full py-3 pl-4 pr-2 unified-button flex items-center">
                    <img :src="MineImg.icon_exit" class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0" />
                    <p class="flex-1 overflow-hidden">
                        <span class="m4-text !font-normal">Sair</span>
                    </p>
                    <img :src="MineImg.icon_right1" class="w-2  mr-2 shrink-0" />
                </a>
            </log-out>
        </pu-card>
        
        <!-- <div style="padding-bottom: env(safe-area-inset-bottom);">
            <em class="w-full h-[5rem] block"></em>
        </div> -->
        <Panddingbottom></Panddingbottom>
    </pu-page>

</template>