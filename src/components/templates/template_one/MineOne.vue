<script setup>
import { ref } from 'vue'
import { t, fn } from '@/i18n'
import { playBtnAudioFunc} from '@/utils/core'
import ShareList from '@/components/pages/ShareList.vue'
import LogOut from '@/components/pages/LogOut.vue'
import useClipboard from "vue-clipboard3"
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const CommonImg = useThemeImages().common
const MineImg = useThemeImages().mine
const { toClipboard } = useClipboard()
async function copyInviteCode(_val) {
    _val = ''+_val
    await toClipboard(_val)
    showToast({
        message: 'foi copiado',
        type: 'success',
        wordBreak: 'break-word',
    });
}

const nav_list = ref([
    {title: 'Mensagem', path: '/article/message', icon: MineImg.icon_msg},
    {title: 'Todas as Promoções', path: '/more', icon: MineImg.icon_more},
    {title: 'Registro do Jogo', path: '/game/record', icon: MineImg.icon_record},
    {title: 'Registros de depósito e saqueo', path: '/moneyRecords', icon: MineImg.icon_moneylist},
    {title: 'Configuração', path: '/profile', icon: MineImg.icon_set},
    {title: 'Contatar o Serviço', type: 'service', icon: MineImg.icon_service},
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
} = useMine()

</script>

<template>
  <pu-page hideHeader>
        <template #other>
            <div class="w-full absolute left-0 top-0">
                <img :src=MineImg.img_minebg class="w-full h-auto block" />
            </div>
        </template>
        <pu-card v-if="memberRef&&memberRef.id" theme="3" class="pt-5">
            <dl class="flex">
                <dt class="w-[6.75rem]">
                    <div class="w-full flex justify-center">
                        <van-image :src="memberRef.head_portrait" width="4.25rem" height="4.25rem" radius="1rem" class="border border-rgbawhite30">
                            <template #loading>
                                <img :src=appIcon class="w-full h-full object-cover">
                            </template>
                            <template #error>
                                <img :src=appIcon class="w-full h-full object-cover">
                            </template>
                        </van-image>
                    </div>
                    <h5 class="mt-1 text-sm text-center font-bold">
                        <span>{{ memberRef.username }}</span>
                    </h5>
                    <p class="mt-0.5 text-[0.5rem] text-center" @click.stop.prevent="copyInviteCode(memberRef.id)" >
                        <span class="align-middle opacity-65">ID: {{ memberRef.id }}</span>
                        <svg class="w-3 h-3 ml-1 opacity-85 inline-block align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path>
                        </svg>
                    </p>
                </dt>
                <dd class="pl-5 flex-1 overflow-hidden">
                    <!-- 余额 -->
                    <p class="mb-0.5 text-right">
                        <span class="text-xs opacity-85">Saldo:&nbsp;</span>
                        <b class="text-sm text-one">R$&nbsp;{{ fn(memberRef.account&&memberRef.account.user_money||0 )}}</b>
                    </p>
                    <!-- 每日奖励 -->
                    <p class="mb-0.5 text-right">
                        <span class="text-xs opacity-85">Total de bônus recebidos:&nbsp;</span>
                        <b class="text-sm text-one">R$&nbsp;{{ fn(memberRef.give_amount||0 )}}</b>
                    </p>
                    <ol class="w-full !pt-1 text-xs flex">
                        <li class="w-1/2 pr-1">
                            <div @click="toRecharge()" class="w-full h-10 px-1 unified-button  bg-gradient-to-r from-btnlinar1 to-btnlinar2 rounded-lg flex items-center justify-center">
                                <img :src=CommonImg.img_recharge class="w-5 h-5 mr-1 shrink-0" />
                                <span>Depósito</span>
                            </div>
                        </li>
                        <li class="w-1/2 pl-1">
                            <div @click="toWithdrawal()" class="w-full h-10 px-1 unified-button ctx-theme rounded-lg flex items-center justify-center">
                                <img :src=CommonImg.img_withdraw class="w-5 h-5 mr-1 shrink-0" />
                                <span>Saque</span>
                            </div>
                        </li>
                    </ol>
                </dd>
            </dl>
        </pu-card>
        <pu-card theme="3" class="mt-3">
            <div class="w-full relative">
                <img :src=MineImg.img_vipcard1 class="w-full h-auto block">
                <div class="absolute right-0 top-0 unified-button">
                    <img :src=MineImg.img_vipcard2 class="w-[9.375rem] h-8 block">
                    <router-link to="/vip" @click="playBtnAudioFunc()" class="w-full h-full  pl-5 absolute left-0 top-0 flex items-center justify-center">
                        <span class="text-xs opacity-65">Ver Mais</span>
                        <icon-arrow-right size="2" class="w-6 h-6 opacity-45"></icon-arrow-right>
                    </router-link>
                </div>
            </div>
            <div class="w-[11.25rem] h-0 relative z-10">
                <div class="w-full absolute left-4 bottom-0 flex items-center">
                    <img :src=MineImg.icon_vip class="w-[3.125rem] h-[3.125rem] mr-1 shrink-0" />
                    <p class="pb-2.5 text-one">
                        <span class="text-xl">VIP&nbsp;</span>
                        <span class="text-3xl">{{ memberRef&&memberRef.current_level }}</span>
                    </p>
                </div>
            </div>
            <div class="w-full px-2 py-4 -mt-4 ctx-theme__linear rounded-lg relative">
                <dl class="w-full block">
                    <dt class="w-full">
                        <span class="text-xs opacity-65">Volume acumulado de apostas:</span>
                        <span class="text-base opacity-85 float-right">{{ fn(memberRef&&memberRef.account&&memberRef.account.consume_money)}}</span>
                        <i class="clear-both block"></i>
                    </dt>
                    <dd class="w-full h-2 bg-rgbawhite30 rounded-full overflow-hidden flex">
                        <em :style="`width: ${amount_rate}%`" class="h-full bg-one rounded-full flex justify-end overflow-hidden">
                            <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                        </em>
                    </dd>
                    <dd class="w-full text-xs flex items-center justify-between">
                        <span class="opacity-45">0</span>
                        <span class="text-four">{{next_level.bet_amount}}(VIP {{next_level.vip}})</span>
                    </dd>
                </dl>
                <dl class="w-full p-2 mt-2 bg-rgbablack15 rounded-lg block">
                    <dt class="w-full">
                        <span class="text-xs opacity-65">Volume de apostas deste mês:</span>
                        <span class="text-base opacity-85 float-right">{{ fn(memberRef&&memberRef.account&&memberRef.account.consume_money) }}</span>
                        <i class="clear-both block"></i>
                    </dt>
                    <dd class="w-full h-2 bg-rgbawhite30 rounded-full overflow-hidden flex">
                        <em style="width: 100%" class="h-full bg-one rounded-full flex justify-end overflow-hidden">
                            <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                        </em>
                    </dd>
                    <dd class="w-full text-xs flex items-center justify-between">
                        <span class="opacity-45">0</span>
                        <span class="text-one font-bold">Manter a divisão: 0</span>
                    </dd>
                </dl>
            </div>
        </pu-card>
        <pu-card theme="0" class="mt-3 p-3">
            <router-link to="/agent" class="w-full mb-2 flex items-center justify-between">
                <b class="text-sm">Agente</b>
                <div class="flex items-center">
                    <span class="text-xs opacity-45">Ver Mais</span>
                    <icon-arrow-right size="2" class="w-6 h-6 opacity-45"></icon-arrow-right>
                </div>
            </router-link>
            <!-- 从今天起直接佣金 -->
            <div class="w-full py-2 px-3 mb-2 bg-body-bg text-themewhite rounded-lg flex items-center">
                <p class="text-xs opacity-65 flex-1 overflow-hidden">
                    <span>Comissão direto de hoje</span>
                </p>
                <p class="pl-3 shrink-0">
                    <span class="text-xs opacity-45">R$</span>
                    <span class="text-sm text-four ml-2">{{ fn(memberRef.agent_bonus, 0) }}</span>
                </p>
            </div>
            <p class="text-xs opacity-85 text-center">Compartilhamento Rápido</p>
            <div class="w-full px-2 bg-rgbablack15 rounded-lg">
                <share-list :showName="true"></share-list>
            </div>
        </pu-card>
        <pu-card theme="0" class="py-2 mt-2 text-sm">
            <template v-for="item,index in nav_list" :key="index">
                <a href="javascript:;" @click="onclickNav(item)" class="w-full py-3 pl-4 pr-2 unified-button border-b border-rgbawhite10 last:border-none flex items-center">
                    <img :src="item.icon" class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0" />
                    <p class="flex-1 overflow-hidden">
                        <span class="opacity-65">{{ item.title }}</span>
                    </p>
                    <icon-arrow-right size="2" class="w-6 h-6 opacity-45 shrink-0"></icon-arrow-right>
                </a>
            </template>
        </pu-card>
        <pu-card theme="0" class="mt-2 text-sm">
            <log-out>
                <a href="javascript:;" class="w-full py-3 pl-4 pr-2 unified-button flex items-center">
                    <img :src=MineImg.icon_exit class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0" />
                    <p class="flex-1 overflow-hidden">
                        <span class="opacity-65">Sair</span>
                    </p>
                    <icon-arrow-right size="2" class="w-6 h-6 opacity-45 shrink-0"></icon-arrow-right>
                </a>
            </log-out>
        </pu-card>
<Panddingbottom></Panddingbottom>
    </pu-page>

</template>