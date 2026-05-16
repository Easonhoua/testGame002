<script setup>
import { computed, ref, watch } from 'vue'
import { t } from '@/i18n'
import { rechargeModel } from '@/model/account'
import { useRouter } from 'vue-router'
import { isMobileSafari } from '@/utils/core'
import { memberLocal } from '@/model/user'
import { useThemeImages } from '@/utils/themeimg'
import { rechargeTextRef} from '@/model/common'
import { openServiceFunc } from '@/utils/config'

// 主页图片信息
const CommonImg = useThemeImages().common
const MineImg = useThemeImages().mine
const { configRef, amountRef, channelIndexRef, currentChannelRef, starRechargeFunc, minAmountRef,maxAmountRef,verifyMonyRef } = rechargeModel(true)
const router = useRouter()

let input_focus = ref(false)
let channel_item = ref({})
const selectedMaxAmount = computed(() => Number(currentChannelRef.value?.max || 50000))
const selectedMinAmount = computed(() => Number(minAmountRef.value || currentChannelRef.value?.min || 0))

let autoclick = computed(() => {
    let min = currentChannelRef.value?.min || 0
    return amountRef.value && amountRef.value >= min
})
let multiple = computed(() => {
    let _val = 0
    let packages = configRef.value && configRef.value.packages || []
    let index = packages.findIndex(item => {
        return parseFloat(item.amount || 0) == parseFloat(amountRef.value || 0)
    })
    if (index > -1) {
        _val = packages[index].bet_multiple || 0
    }
    return _val
})
let give_amount = computed(() => {
    let _val = 0
    let packages = configRef.value && configRef.value.packages || []
    let index = packages.findIndex(item => {
        return parseFloat(item.amount || 0) == parseFloat(amountRef.value || 0)
    })
    if (index > -1) {
        _val = packages[index].give_amount || 0
    }
    return _val
})


const channelListRef = [
    {
        "id": "108",
        "channel": [
            {
                "name": "GCash",
                "code": "2090",
                "min": "100",
                "max": "50000"
            }
        ]
    },
    {
        "id": "108",
        "channel": [
            {
                "name": "Maya",
                "code": "2090",
                "min": "100",
                "max": "50000"
            }
        ]
    }
]

function choiceMoney(item) {
    amountRef.value = item.amount
}
function clearMoney() {
    amountRef.value = ''
}
function choiceChannel(index, eq, item) {
    channel_item.value = item
    channelIndexRef.value.index = index
    channelIndexRef.value.eq = eq
}

let ph_channel_index = ref(0)
const choicephChannel = (index, eq, item) => {
    ph_channel_index.value = index
}

function submit() {
       const amount = Number(amountRef.value || 0)
       if (amount < selectedMinAmount.value || amount > selectedMaxAmount.value) {
            showToast({
                message: "Limite:"+selectedMinAmount.value+" - "+selectedMaxAmount.value, 
            }); 
            return
        }
    //上报注册成功
    window.jsBridge?.postMessage("rechargeClick", JSON.stringify({ cid: window.ch, uid: memberLocal.value.id, phone: memberLocal.value.username }))

    if (channel_item.value.validate_cpf == 1) {
        router.push({
            path: '/verify', query: {
                amount: amountRef.value
            }
        })
    } else {
        if (autoclick) {
            starRechargeFunc(0)
        }
    }
}
function resetRate(amount, give_amount) {
    let _val = 0
    if (amount && give_amount) {
        _val = (parseFloat(give_amount) / parseFloat(amount) * 100).toFixed(0)
    }
    return _val
}

function onAmountInput(e) {
    let val = e.target.value.replace(/[+\-*/]/g, '')
    val = val.replace(/[^\d.]/g, '') // 只保留数字和小数点
    val = val.replace(/^(\d*\.?\d{0,2}).*$/, '$1') // 只保留小数点后两位
    val = val.replace(/^\./g, '') // 如果第一个字符是小数点，则删除
    val = val.replace(/\.{2,}/g, '.') // 只保留第一个小数点，删除多余的

    currentChannelRef.min = currentChannelRef.value && currentChannelRef.value.min || 0
    currentChannelRef.max = currentChannelRef.value && currentChannelRef.value.max || 0
    amountRef.value = val
}

watch(amountRef, (newVal) => {
    const max = selectedMaxAmount.value
    if (newVal !== '' && parseFloat(newVal) > max) {
        amountRef.value = max
    }
})
const handleBlur = () => {
    const amount = Number(amountRef.value || 0)
    if (amount < selectedMinAmount.value || amount > selectedMaxAmount.value) {
       showToast({
        message: "Limite:"+selectedMinAmount.value+" - "+selectedMaxAmount.value, 
    }); 
    }
}
</script>

<template>
    <pu-page :title="t('pageTitle.Deposit')" class="z-[999]" hideService>
        <pu-card theme="3" class="py-4" v-if="currentTemplate.value == 'template_one'">
            <section class="w-full py-3 px-4 mb-5  rounded-lg bg-rgbawhite10  border border-rgbawhite10">
                <p class="text-sm opacity-85">Canal de pagamento:</p>
                <ul class="w-full text-xs flex flex-wrap">
                    <template v-for="item, index in configRef.channel || []" :key="index">
                        <li v-for="child, eq in item.channel || []" :key="'child_' + eq"
                            @click="choiceChannel(index, eq, item)"
                            :class="index == channelIndexRef.index && eq == channelIndexRef.eq ? 'ctx-theme' : 'bg-rgbawhite10 text-rgbawhite50'"
                            class="h-9 px-5 mr-2.5 mt-2.5 rounded-lg flex items-center">
                            <span>{{ child.name }}</span>
                        </li>
                    </template>
                </ul>
            </section>
            <section
                class="w-full p-2 mb-2 text-sm leading-none text-rgbawhite50 rounded-lg bg-gradient-to-b from-rgbawhite10 to-transparent border border-rgbawhite10">
                <img :src="CommonImg.icon_rich_warn" class="w-4 h-4 mr-1 inline-block align-middle" />
                <span class="align-middle">Bônus resgatável após 1x faturamento</span>
            </section>
            <!-- <section v-if="parseFloat(give_amount)>0" class="w-full p-2 mb-2 text-sm leading-none text-rgbawhite50 border border-rgbawhite10 rounded-lg bg-gradient-to-b from-rgbawhite10 to-transparent">
                <svg class="w-4 h-4 mr-1 inline-block align-middle" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z" fill="#333"/>
                    <path d="M24.5 34V20H23.5H22.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 34H28" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="align-middle">A parte do bônus pode ser resgatada após {{ multiple }}x de faturamento</span>
            </section> -->
            <dl
                class="w-full h-[3.125rem] px-3 mb-2  rounded-lg flex items-center bg-searchbg border border-searchborder">
                <dt class="mr-3 text-base font-bold shrink-0">
                    <span class="opacity-45">{{ currentUnit.value }}</span>
                </dt>
                <dd class="flex-1 overflow-hidden">
                    <input type="text" v-model="amountRef"
                        :placeholder="currentChannelRef ? `valor(${minAmountRef || 0} ~ ${currentChannelRef.max || 1000})` : ``"
                        @focus="input_focus = true" @input="onAmountInput"
                        class="w-full h-8 text-base placeholder:text-sm placeholder:text-rgbawhite50 bg-transparent outline-none">
                </dd>
                <dd v-if="parseFloat(give_amount) > 0" class="px-2 -mr-2 text-sm">
                    <span class="opacity-65">Extra&nbsp;</span>
                    <span>+{{ give_amount }}</span>
                </dd>
                <dd @click="clearMoney()" v-if="amountRef" class="px-2 -mr-2 cursor-pointer">
                    <svg class="w-5 h-5 opacity-65" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z">
                        </path>
                    </svg>
                </dd>
            </dl>
            <div v-if="rechargeTextRef" class="w-full flex p-2 mb-2 text-sm leading-none text-rgbawhite50 rounded-lg bg-gradient-to-b from-rgbawhite10 to-transparent border border-rgbawhite10">
                <img :src="CommonImg.icon_rich_warn" class="w-4 h-4 mr-1 inline-block align-middle" />
                <span class="align-middle " style="line-height: 1.2rem;">{{ rechargeTextRef }}</span>
           </div>
            <ol class="!-mx-1 !mb-8 text-sm flex flex-wrap">
                <template v-for="item, index in configRef.packages" :key="index">
                    <li class="w-1/3 p-1">
                        <a @click="choiceMoney(item)"
                            :class="item.amount == amountRef ? 'ctx-theme' : 'text-rgbawhite80 bg-rgbawhite10'"
                            href="javascript:;"
                            class="w-full h-12 text-center rounded-xl relative flex items-center justify-center">
                            <span>{{ currentUnit.value }} {{ item.amount }}</span>
                            <div v-if="item.give_amount > 0"
                                class="h-4 px-1 bg-green-500 text-themewhite rounded-tl-xl rounded-br-xl absolute left-0 top-0 flex items-center">
                                <span class="text-[0.525rem]">{{ resetRate(item.amount, item.give_amount) }}%</span>
                            </div>
                        </a>
                    </li>
                </template>

            </ol>
            <div class="px-8 flex justify-center">
                <a @click="submit()" :class="autoclick ? '' : 'opacity-50 pointer-events-none'"
                    class="w-full h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center ctx-theme__linear">
                    <span>Depósito</span>
                </a>
            </div>

        </pu-card>
        <pu-card theme="3" class="py-4" v-if="currentTemplate.value == 'template_two'">
            <section class="w-full py-3 px-4 mb-5  rounded-lg bg-tablergba40">
                <p class="text-sm opacity-85 text-three">Canal de pagamento:</p>
                <ul class="w-full text-xs flex flex-wrap">
                    <template v-for="item, index2 in configRef.channel || []" :key="index2">
                        <li v-for="child, eq in item.channel || []" :key="'child_' + eq"
                            @click="choiceChannel(index2, eq, item)"
                            :class="index2 == channelIndexRef.index && eq == channelIndexRef.eq ? 'bg-gradient-to-br from-richlinar1 to-richlinar2 text-themewhite' : 'bg-rgbawhite10 text-themewhite'"
                            class="h-9 px-5 mr-2.5 mt-2.5 rounded-lg flex items-center">
                            <span>{{ child.name }}</span>
                        </li>
                    </template>
                </ul>
            </section>
            <section class="w-full p-2 mb-2 text-sm leading-none text-rgbawhite50 rounded-lg bg-tablergba40">
                <img :src="CommonImg.icon_rich_warn" class="w-4 h-4 mr-1 inline-block align-middle" />
                <span class="align-middle text-theme">Bônus resgatável após 1x faturamento</span>
            </section>
            <dl
                class="w-full h-[3.125rem] px-3 mb-2  rounded-lg flex items-center bg-default-bg border border-defaultborder">
                <dt class="mr-3 text-base font-bold shrink-0">
                    <span class="text-four">{{ currentUnit.value }}</span>
                </dt>
                <dd class="flex-1 overflow-hidden">
                    <input type="text" v-model="amountRef"
                        :placeholder="currentChannelRef ? `valor(${minAmountRef || 0} ~ ${currentChannelRef.max || 1000})` : ``"
                        @focus="input_focus = true" @input="onAmountInput"
                        class="w-full h-8 text-base placeholder:text-sm placeholder:text-rgbawhite50 bg-transparent outline-none">
                </dd>
                <dd v-if="parseFloat(give_amount) > 0" class="px-2 -mr-2 text-sm">
                    <span class="opacity-65">Extra&nbsp;</span>
                    <span>+{{ give_amount }}</span>
                </dd>
                <dd @click="clearMoney()" v-if="amountRef" class="px-2 -mr-2 cursor-pointer">
                    <svg class="w-5 h-5 opacity-65" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z">
                        </path>
                    </svg>
                </dd>
            </dl>
            <div v-if="rechargeTextRef" class="w-full flex p-2 mb-2 text-sm leading-none text-rgbawhite50 rounded-lg bg-tablergba40">
                <img :src="CommonImg.icon_rich_warn" class="w-4 h-4 mr-1 inline-block align-middle" />
                <span class="align-middle text-theme">{{ rechargeTextRef }}</span>
           </div>
            <ol class="!-mx-1 !mb-8 text-sm flex flex-wrap">

                <template v-for="item, index1 in configRef.packages" :key="index1">
                    <li class="w-1/3 p-1">
                        <a @click="choiceMoney(item)"
                            :class="item.amount == amountRef ? 'bg-gradient-to-br from-richlinar1 to-richlinar2 text-themetext' : ' bg-tablergba40'"
                            href="javascript:;"
                            class="w-full h-12 text-center rounded-xl relative flex items-center justify-center">
                            <span>{{ currentUnit.value }} {{ item.amount }}</span>
                            <div v-if="item.give_amount > 0"
                                class="h-4 px-1 bg-green-500 text-themewhite rounded-tl-xl rounded-br-xl absolute left-0 top-0 flex items-center">
                                <span class="text-[0.525rem]">{{ resetRate(item.amount, item.give_amount) }}%</span>
                            </div>
                        </a>
                    </li>
                </template>

            </ol>
            <div class="px-8 flex justify-center">
                <a @click="submit()" :class="autoclick ? '' : 'opacity-50 pointer-events-none'"
                    class="w-full bg-btncolor text-themeblack rounded-lg  text-center p-4">
                    <span>Depósito</span>
                </a>
            </div>
        </pu-card>
        <pu-card theme="3" class="py-4" v-if="currentTemplate.value == 'template_three'">
            <section class="w-full py-3 px-4 mb-5 bg-tablergba20 rounded-lg">
                <p class="text-sm opacity-85 text-themetext1">{{ t('depCenter.PaymentChannel:') }}</p>
                <ul class="w-full text-xs flex flex-wrap" v-if="currentUnit.value == 'R$'">
                    <template v-for="item, index in configRef.channel || []" :key="index">
                        <li v-for="child, eq in item.channel || []" :key="'child_' + eq"
                            @click="choiceChannel(index, eq, item)"
                            :class="index == channelIndexRef.index && eq == channelIndexRef.eq ? 'm3-theme-btn4' : 'bg-tablergba40'"
                            class="h-9 px-5 mr-2.5 mt-2.5 rounded-lg flex items-center">
                            <span>{{ child.name }}</span>
                        </li>
                    </template>
                </ul>
                <ul class="w-full text-xs flex flex-wrap" v-else-if="currentUnit.value == '₱ '">
                    <template v-for="item, index in channelListRef || []" :key="index">
                        <li v-for="child, eq in item.channel || []" :key="'child_' + eq"
                            @click="choicephChannel(index)"
                            :class="index == ph_channel_index ? 'm3-theme-btn4' : 'bg-tablergba40'"
                            class="h-9 px-5 mr-2.5 mt-2.5 rounded-lg flex items-center cursor-pointer">
                            <span>{{ child.name }}</span>
                        </li>
                    </template>
                </ul>
            </section>
            <section class="w-full p-2 mb-2 text-sm leading-none bg-tablergba20 rounded-lg ">
                <img :src="CommonImg.icon_rich_warn" class="w-4 h-4 mr-1 inline-block align-middle" />
                <span class="align-middle text-themetext2">{{ t('depCenter.Depcenter2') }}</span>
            </section>
            <!-- <section v-if="parseFloat(give_amount)>0" class="w-full p-2 mb-2 text-sm leading-none text-rgbawhite50 border border-rgbawhite10 rounded-lg bg-gradient-to-b from-rgbawhite10 to-transparent">
                <svg class="w-4 h-4 mr-1 inline-block align-middle" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z" fill="#333"/>
                    <path d="M24.5 34V20H23.5H22.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 34H28" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="align-middle">A parte do bônus pode ser resgatada após {{ multiple }}x de faturamento</span>
            </section> -->
            <dl class="w-full h-[3.125rem] px-3 mb-2  rounded-lg flex items-center m3-theme-btn2">
                <dt class="mr-3 text-base font-bold shrink-0">
                    <span class="text-themetext0">{{ currentUnit.value }}</span>
                </dt>
                <dd class="flex-1 overflow-hidden">
                    <input type="text" v-model="amountRef"
                        :placeholder="currentChannelRef ? `${ t('account.value') }(${minAmountRef || 0} ~ ${currentChannelRef.max || 1000})` : ``"
                        @focus="input_focus = true" @input="onAmountInput"
                        class="w-full h-8 text-base text-white placeholder:text-sm placeholder:text-themetext2 bg-transparent outline-none">
                </dd>
                <dd v-if="parseFloat(give_amount) > 0" class="px-2 -mr-2 text-sm">
                    <span class="opacity-65">Extra&nbsp;</span>
                    <span>+{{ give_amount }}</span>
                </dd>
                <dd @click="clearMoney()" v-if="amountRef" class="px-2 -mr-2 cursor-pointer">
                    <svg class="w-5 h-5 opacity-65" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z">
                        </path>
                    </svg>
                </dd>
            </dl>
            <div v-if="rechargeTextRef" class="w-full flex p-2 mb-2 text-sm leading-none bg-tablergba20 rounded-lg">
                <img :src="CommonImg.icon_rich_warn" class="w-4 h-4 mr-1 inline-block align-middle" />
                <span class="align-middle text-themetext2">{{ rechargeTextRef }}</span>
           </div>
            <ol class="!-mx-1 !mb-8 text-sm flex flex-wrap">
                <template v-for="item, index1 in configRef.packages" :key="index1">
                    <li class="w-1/3 p-1">
                        <a @click="choiceMoney(item)" :class="item.amount == amountRef ? 'm3-theme-btn4' : ' bg-tablergba40'"
                            href="javascript:;"
                            class="w-full h-12 text-center rounded-xl relative flex items-center justify-center">
                            <span>{{ currentUnit.value }} {{ item.amount }}</span>
                            <div v-if="item.give_amount > 0"
                                class="h-4 px-1 bg-yellow-500 text-themewhite rounded-tl-xl rounded-br-xl absolute left-0 top-0 flex items-center">
                                <span class="text-[0.525rem]">{{ resetRate(item.amount, item.give_amount) }}%</span>
                            </div>
                        </a>
                    </li>
                </template>
            </ol>
            <div class="px-8 flex justify-center">
                <a @click="submit()" :class="autoclick ? '' : 'opacity-50 pointer-events-none'"
                    class="w-full m3-theme-btn1 rounded-lg  text-center p-4">
                    <span>{{ t('deposit') }}</span>
                </a>
            </div>
        </pu-card>
        <pu-card theme="3" class="py-4" v-if="currentTemplate.value == 'template_four'">
            <section class="w-full py-3 px-4 mb-5 bg-tablebg  rounded-lg">
                <div class="w-full h-[2.5rem] flex items-center justify-start">
                    <img :src="CommonImg.icon_card2" class="w-[1.2rem] h-[1rem] mr-2"/>
                    <p class="text-sm m4-text">Canal de pagamento:</p>
                </div>
               
                <ul class="w-full text-xs flex flex-wrap">
                    <template v-for="item,index in configRef.channel||[]" :key="index">
                        <li 
                            v-for="child,eq in item.channel||[]" :key="'child_'+eq" 
                            @click="choiceChannel(index,eq,item)"
                            :class="index==channelIndexRef.index&&eq==channelIndexRef.eq?'m4-ten-btn font-bold':'bg-theme border border-defaultborder '  " 
                            class="h-9 px-5 mr-2.5 mt-2.5 rounded-3xl flex items-center"
                        >
                            <span>{{ child.name }}</span>
                        </li>
                    </template>
                </ul>
            </section>
            <div class="w-full py-4 px-4 mb-5 bg-tablebg  rounded-lg">
                <dl class="w-full h-[3.125rem] px-3 mb-2 bg-default-bg rounded-lg flex items-center">
                <dt class="mr-3 m4-text  font-bold shrink-0">
                    <span>{{ currentUnit.value }}</span>
                </dt>
                <dd class="flex-1 overflow-hidden">
                    <input type="text" v-model="amountRef" :placeholder="currentChannelRef?`valor(${minAmountRef||0} ~ ${currentChannelRef.max||1000})`:``" @focus="input_focus=true" @blur="handleBlur" @input="onAmountInput" class="w-full h-8 text-base placeholder:text-sm placeholder:text-body-gray bg-theme outline-none">
                </dd>
                <dd v-if="parseFloat(give_amount)>0" class="px-2 -mr-2 text-sm">
                    <span class="opacity-65">Extra&nbsp;</span>
                    <span>+{{ give_amount }}</span>
                </dd>
                <dd @click="clearMoney()" v-if="amountRef" class="px-2 -mr-2 cursor-pointer">
                    <svg class="w-5 h-5 opacity-65" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </dd>
            </dl>
                <section class="w-full p-2 mb-2 text-sm leading-none  rounded-lg  from-body-text/15 to-transparent">
                     <img :src="CommonImg.icon_rich_warn" alt="" class="w-4 h-4 mr-1 inline-block align-middle">
                    <span class="align-middle text-themefont">Bônus resgatável após <span class="text-themetext0">1x</span> faturamento</span>
                </section>
            </div>
           
            <!-- <section v-if="parseFloat(give_amount)>0" class="w-full p-2 mb-2 text-sm leading-none text-body-text/65 border border-body-text/15 rounded-lg bg-gradient-to-b from-body-text/15 to-transparent">
                <svg class="w-4 h-4 mr-1 inline-block align-middle" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z" fill="#333"/>
                    <path d="M24.5 34V20H23.5H22.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 34H28" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="align-middle">A parte do bônus pode ser resgatada após {{ multiple }}x de faturamento</span>
            </section> -->
           <div v-if="rechargeTextRef" class="w-full py-3 px-4 mb-5 bg-tablebg  rounded-lg flex">
            <img :src="CommonImg.icon_rich_warn" alt="" class="w-4 h-4 mr-1 inline-block align-middle">
            <span class="text-white/80 text-sm">{{ rechargeTextRef }}</span>
           </div>
            <ol class="!-mx-1 !mb-8 text-sm flex flex-wrap">
                <template v-for="item,index in configRef.packages" :key="index">
                    <li class="w-1/3 p-1">
                        <a @click="choiceMoney(item)" :class="item.amount==amountRef?'m4-ten-btn':'m4-btn-false'" href="javascript:;" class="w-full h-12 text-center rounded-xl relative flex items-center justify-center">
                            <span>{{ currentUnit.value }} {{ item.amount }}</span>
                            <div v-if="item.give_amount>0" class="h-4 px-1 bg-btnlinar3  text-theme rounded-tl-xl rounded-br-xl absolute left-0 top-0 flex items-center">
                                <span class="text-[0.525rem]">{{ resetRate(item.amount, item.give_amount) }}%</span>
                            </div>
                        </a>
                    </li>
                </template>
            </ol>
            <div class="flex justify-center">
                <a @click="submit()"  class="w-full m4-nine-btn text-center rounded-lg h-12 flex items-center justify-center  font-bold">
                    <span>Depósito</span>
                </a>
            </div>
        </pu-card>
        <pu-card theme="2" class="p-4" v-if="currentTemplate.value == 'template_five'">
            <section class=" mb-10 ">
                 <div class="flex items-center mb-4">
                    <p class="text-2xl  text-themewhite font-bold mr-2">Depósito</p>
                    <img :src="MineImg.icon_pig" class="w-[1.6rem] h-[1.6rem] mr-2"/>
                 </div>
                 <div class="text-[0.875rem] text-themetext4">
                    <p>Bônus resgatável após 1x faturamento</p>
                    <p>Recarregue sua conta e participe de nossas </p>
                    <img :src="MineImg.img_support" class=" h-[1.2rem] mr-1 inline-block align-middle" @click="openServiceFunc({ type: 'service' })"/>
                 </div>
            </section>
            <section class="w-full mb-10 rounded-lg  ">
                <p class="text-sm font-bold">Canal de pagamento:</p>
                <ul class="w-full text-xs flex flex-wrap font-bold">
                    <template v-for="item, index in configRef.channel || []" :key="index">
                        <li v-for="child, eq in item.channel || []" :key="'child_' + eq"
                            @click="choiceChannel(index, eq, item)"
                            :class="index == channelIndexRef.index && eq == channelIndexRef.eq ? 'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2' : 'bg-btn1_bg text-themetext3'"
                            class="h-9 px-6 mr-3.5 mt-2.5 rounded-lg flex items-center">
                            <span>{{ child.name }}</span>
                        </li>
                    </template>
                </ul>
            </section>
            
            <!-- <section v-if="parseFloat(give_amount)>0" class="w-full p-2 mb-2 text-sm leading-none text-rgbawhite50 border border-rgbawhite10 rounded-lg bg-gradient-to-b from-rgbawhite10 to-transparent">
                <svg class="w-4 h-4 mr-1 inline-block align-middle" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z" fill="#333"/>
                    <path d="M24.5 34V20H23.5H22.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 34H28" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="align-middle">A parte do bônus pode ser resgatada após {{ multiple }}x de faturamento</span>
            </section> -->
            <section>
                <p class="text-xm font-bold mb-2">Montante</p>
                <dl class="w-full h-[3.125rem] px-3 mb-2  rounded-lg flex items-center m5-theme-input">
                <dt class="mr-3 text-base font-bold shrink-0">
                    <span class="text-themetext0">{{ currentUnit.value }}</span>
                </dt>
                <dd class="flex-1 overflow-hidden">
                    <input type="text" v-model="amountRef"
                        :placeholder="currentChannelRef ? `valor(${minAmountRef || 0} ~ ${currentChannelRef.max || 1000})` : ``"
                        @focus="input_focus = true" @input="onAmountInput"
                        class="w-full h-8 text-base placeholder:text-sm placeholder:text-rgbawhite50 bg-transparent outline-none">
                </dd>
                <dd v-if="parseFloat(give_amount) > 0" class="px-2 -mr-2 text-sm">
                    <span class="opacity-65">Extra&nbsp;</span>
                    <span>+{{ give_amount }}</span>
                </dd>
                <dd @click="clearMoney()" v-if="amountRef" class="px-2 -mr-2 cursor-pointer">
                    <svg class="w-5 h-5 opacity-65" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z">
                        </path>
                    </svg>
                </dd>
            </dl>
            </section>
            
            <section
                class="w-full mb-10 text-[0.875rem] leading-none flex items-center">
                <img :src="MineImg.img_warn" class="w-4 h-4 mr-2 inline-block align-middle" />
                <span class="align-middle">Bônus resgatável após <span class="text-themetext0">1x</span> faturamento</span>
            </section>

            <div v-if="rechargeTextRef" class="w-full flex p-2 mb-2 text-sm leading-none text-themetext1 rounded-lg ">
                <!-- <img :src="CommonImg.icon_rich_warn" class="w-4 h-4 mr-1 inline-block align-middle" /> -->
                <span class="align-middle">{{ rechargeTextRef }}</span>
           </div>
            <ol class="!-mx-1 !mb-8 text-sm flex flex-wrap">
                <template v-for="item, index in configRef.packages" :key="index">
                    <li class="w-1/3 p-1">
                        <a @click="choiceMoney(item)"
                            :class="item.amount == amountRef ? 'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 font-bold' : 'bg-btn1_bg text-themetext3'"
                            href="javascript:;"
                            class="w-full h-12 text-center rounded-xl relative flex items-center justify-center">
                            <span>{{ item.amount }}</span>
                            <div v-if="item.give_amount > 0"
                                class="h-4 px-1 bg-themetext0 text-themeblack rounded-tl-xl rounded-br-xl absolute left-0 top-0 flex items-center">
                                <span class="text-[0.525rem]">{{ resetRate(item.amount, item.give_amount) }}%</span>
                            </div>
                        </a>
                    </li>
                </template>

            </ol>
            <div class=" flex justify-center">
                <a @click="submit()" 
                    class="w-full h-[3.125rem]  text-sm rounded-lg cursor-pointer flex items-center justify-center m5-theme-btn1">
                    <span>Depósito</span>
                </a>
            </div>
        </pu-card>

        <div v-if="!isMobileSafari()" style="padding-bottom: env(safe-area-inset-bottom);">
            <em class="w-full h-[4rem] block"></em>
        </div>
        <div v-else>
            <em class="w-full h-[10rem] block"></em>
        </div>
    </pu-page>
</template>
