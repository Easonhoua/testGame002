<script setup>
import { computed, onMounted, ref,watch } from 'vue'
import { t, fn } from '@/i18n'
import { useRouter } from 'vue-router'
import { userModel } from '@/model/user'
import { withdrawalAmountRef, withdrawalChannelIndexRef, withdrawalModel } from '@/model/account'
import { showToast } from 'vant'
import { useThemeImages } from '@/utils/themeimg'
import { openServiceFunc } from '@/utils/config'
import { rechargeModel } from '@/model/account'
const CommonImg = useThemeImages().common 
const HomeImg = useThemeImages().home
const MineImg = useThemeImages().mine
const router = useRouter()
const { configRef,amountRef } = rechargeModel(true)
const { memberRef } = userModel()
const { channelListRef } = withdrawalModel({ch: true})

const configPackages = [
    { amount :'10.00'},
    { amount :'20.00'},
    { amount :'30.00'},
    { amount :'50.00'},
    { amount :'100.00'},
    { amount :'200.00'},
    { amount :'500.00'},
    { amount :'1000.00'},
    { amount :'2000.00'},
    { amount :'5000.00'},
    { amount :'10000.00'},
]
let input_focus = ref(false)
let channel_curr = computed(()=> {
    return channelListRef.value[withdrawalChannelIndexRef.value]||{}
})
let not_arrow_cash = computed(()=> {
    return parseFloat(memberRef.value&&memberRef.value.account&&memberRef.value.account.bet_amount||0) > 0
})

let autoclick = computed(()=> {
    let res = true
    if(not_arrow_cash.value) res = false
    if(!withdrawalAmountRef.value) res = false
    if(parseFloat(withdrawalAmountRef.value) > parseFloat(memberRef.value&&memberRef.value.account&&memberRef.value.account.user_money||0)) res = false
    if(!channel_curr.value) res = false
    return res
})


let checkMoney = computed(()=>{
    const user_money = memberRef.value?.account.user_money
    return user_money >= withdrawalAmountRef.value
})



function submit() {
    //如果channel_curr.min_amount存在，则做判断
    if(channel_curr.value.min_amount) {
        if(Number(withdrawalAmountRef.value)<Number(channel_curr.value.min_amount)) {
            showToast(`Valor mínimo de retirada é ${channel_curr.value.min_amount}`)
            return
        }
    }

    //如果channel_curr.max_amount存在，则做判断
    if(channel_curr.value.max_amount) {
        if(Number(withdrawalAmountRef.value)>Number(channel_curr.value.max_amount)) {
            showToast(`Valor máximo de retirada é ${channel_curr.value.max_amount}`)
            return
        }
    }

    //原来逻辑
    if(withdrawalAmountRef.value<10) {
        showToast('Retirada maior que 10')
        return
    }
    if(autoclick.value) {
        router.push(`/withdrawal/cashConfirm`)
    }
    // router.push(`/withdrawal/cashConfirm`)
}

function resetRate(amount, give_amount) {
    let _val = 0
    if (amount && give_amount) {
        _val = (parseFloat(give_amount) / parseFloat(amount) * 100).toFixed(0)
    }
    return _val
}

function choiceMoney(item) {
    if(not_arrow_cash.value) return
    withdrawalAmountRef.value = item.amount
}

function onInputAmount(e) {
    let val = e.target.value // 只保留数字
        // 允许数字和一个小数点
        val = val.replace(/[^\d.]/g, '');
    
    // 确保只有一个小数点
    let dotIndex = val.indexOf('.');
    if (dotIndex !== -1) {
        val = val.substring(0, dotIndex + 1) + val.substring(dotIndex).replace(/\./g, '');
    }
    
    // 限制最多两位小数
    if (dotIndex !== -1 && val.length > dotIndex + 3) {
        val = val.substring(0, dotIndex + 3);
    }

    // 限制最大值
    if (val && parseFloat(val) > 20000) {
        val = '20000';
    }
    
    withdrawalAmountRef.value = val;
    e.target.value = val;
}

onMounted(()=> {
    withdrawalAmountRef.value = ''
    withdrawalChannelIndexRef.value = 0
})
watch(withdrawalAmountRef, (newVal) => {
    const max = channel_curr.value?.max_amount||20000
    if (newVal === '') return
    let num = parseFloat(newVal, 10)
    if (isNaN(num)) {
        withdrawalAmountRef.value = ''
        return
    }
    if (num > max) withdrawalAmountRef.value = max
    // const max = 20000
    // const min = 10
    // if (newVal === '') return
    // let num = parseInt(newVal, 10)
    // if (isNaN(num)) {
    //     withdrawalAmountRef.value = ''
    //     return
    // }
    // if (num < min) withdrawalAmountRef.value = min
    // if (num > max) withdrawalAmountRef.value = max
})
</script>

<template>
    <pu-page title="Saque" class="z-[999]">
        <pu-card theme="3" class="py-4" v-if="currentTemplate.value=='template_one'">
            <section class="w-full py-3 px-4 mb-5 rounded-lg bg-rgbawhite10  border border-rgbawhite10">
                <p class="text-sm opacity-85">Se você tiver dúvidas ou problemas, entre em contato com o suporte ao cliente. Obrigado!</p>
                <div class="p-2  rounded-xl mt-2 flex items-center justify-center bg-theme  " @click="openServiceFunc()">
                    <img  :src=HomeImg.icon_service  class="w-5 h-5 mr-2">
                    <span class="text-themewhite">suporte online</span>
                </div>
            </section>
            <section class="w-full py-3 px-4 mb-5 rounded-lg bg-rgbawhite10  border border-rgbawhite10" >
                <p class="text-sm opacity-85 ">Canal de pagamento:</p>
                <ul class="w-full text-xs flex flex-wrap">
                    <template v-for="item,index in channelListRef" :key="index">
                        <li @click="withdrawalChannelIndexRef=index" :class="index==withdrawalChannelIndexRef?'ctx-theme':'bg-rgbawhite10 text-rgbawhite50'" class="h-9 px-5 mr-2.5 mt-2.5 rounded-lg flex items-center">
                            <span>{{ item.name }}</span>
                        </li>
                    </template>
                </ul>
            </section>
            <section class="mb-5 text-center">
                <h5 class="mb-1 text-sm opacity-65" >Conta Saldo:</h5>
                <p>
                    <img :src=CommonImg.img_money class="w-6 h-6 mr-2 inline-block align-middle">
                    <span class="text-4xl opacity-85 align-middle">{{ memberRef&&memberRef.account&&memberRef.account.user_money}}</span>
                </p>
            </section>
            <p class="mb-2 text-sm opacity-85">Valor do saque</p>
            
            <dl :class="not_arrow_cash?'border-rgbawhite10':'border-border1'" class="w-full h-[3.125rem] px-3 border rounded-lg flex items-center  "
             >
                <dt class="mr-3 text-base font-bold shrink-0">
                    <span class="opacity-45">R$</span>
                </dt>
                <!-- @input="onInputAmount" -->
              
                <dd class="flex-1 overflow-hidden">
                    <input type="text"
                    inputmode="decimal"
                    v-model="withdrawalAmountRef" 
                    :placeholder="`valor(${channel_curr?.min_amount || 10} ~ ${channel_curr?.max_amount || 20000})`"
                    @focus="input_focus=true" 
                    :readonly="not_arrow_cash"
                    @input="onInputAmount" 
                    class="w-full h-8 text-base placeholder:text-sm placeholder:text-rgbawhite50 bg-transparent outline-none">
                </dd>
                <dd @click="withdrawalAmountRef=''" class="px-2 -mr-2 cursor-pointer">
                    <svg :class="withdrawalAmountRef&&input_focus?'opacity-65':'opacity-0'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </dd>
            </dl>

         
            <div v-if="not_arrow_cash" class="px-4 py-2 mt-1 rounded-lg border border-rgbawhite10 bg-gradient-to-b from-rgbawhite10 to-transparent">
                <svg class="w-4 h-4 mr-1.5 opacity-45 inline-block align-middle" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke="currentColor" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 37C25.3807 37 26.5 35.8807 26.5 34.5C26.5 33.1193 25.3807 32 24 32C22.6193 32 21.5 33.1193 21.5 34.5C21.5 35.8807 22.6193 37 24 37Z" fill="currentColor"/>
                    <path d="M24 12V28" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-xs opacity-45 align-middle">Você preciso apostar R$ {{ fn(memberRef&&memberRef.account&&memberRef.account.bet_amount) }}</span>
            </div>
            <div class="mt-8 px-8 flex justify-center" >
                <a @click="submit()" :class="autoclick?'':'opacity-50 pointer-events-none'" class="w-full h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center ctx-theme__linear">
                    <span>Saque</span>
                </a>
            </div>
        </pu-card>
        <pu-card theme="3" class="py-4" v-if="currentTemplate.value=='template_two'">
            <section class="w-full py-3 px-4 mb-5 rounded-lg bg-rgbawhite10  border border-rgbawhite10">
                <p class="text-sm opacity-85  text-three">Se você tiver dúvidas ou problemas, entre em contato com o suporte ao cliente. Obrigado!</p>
                <div class="p-2  rounded-full mt-2 flex items-center justify-center bg-rgbawhite10   " @click="openServiceFunc()">
                    <img  :src=HomeImg.icon_service  class="w-6 h-5 mr-2">
                    <span class=" text-three">suporte online</span>
                </div>
            </section>
            <section class="w-full py-3 px-4 mb-5 rounded-lg bg-tablergba20" >
                <p class="text-sm opacity-85 text-three" >Canal de pagamento:</p>
                <ul class="w-full text-xs flex flex-wrap">
                    <template v-for="item,index2 in channelListRef" :key="index2">
                        <li @click="withdrawalChannelIndexRef=index2" :class="index2==withdrawalChannelIndexRef?'bg-gradient-to-br from-richlinar1 to-richlinar2 text-themewhite':'bg-rgbawhite10 text-themewhite'" class="h-9 px-5 mr-2.5 mt-2.5 rounded-lg flex items-center">
                            <span>{{ item.name }}</span>
                        </li>
                    </template>
                </ul>
            </section>
            <section class="mb-5 text-center">
                <h5 class="mb-1 text-sm opacity-65 text-three" >Conta Saldo:</h5>
                <p>
                    <img :src=CommonImg.img_money class="w-6 h-6 mr-2 inline-block align-middle">
                    <span class="text-4xl opacity-85 align-middle">{{ memberRef&&memberRef.account&&memberRef.account.user_money}}</span>
                </p>
            </section>
            <p class="mb-2 text-sm opacity-85 text-three" >Valor do saque</p>
            
            <!--  border border-defaultborder -->
            <dl :class="not_arrow_cash?'border-rgbawhite10':'border-defaultborder'" class="w-full h-[3.125rem] px-3 border bg-default-bg rounded-lg flex items-center  "
             >
                <dt class="mr-3 text-four font-bold shrink-0">
                    <span >R$</span>
                </dt>
                <!-- @input="onInputAmount" -->
              
                <dd class="flex-1 overflow-hidden">
                    <input type="text"
                    inputmode="decimal"
                    v-model="withdrawalAmountRef" 
                    :placeholder="`valor(${channel_curr?.min_amount || 10} ~ ${channel_curr?.max_amount || 20000})`"
                    @focus="input_focus=true" 
                    :readonly="not_arrow_cash"
                    @input="onInputAmount" 
                    class="w-full h-8 text-base placeholder:text-sm placeholder:text-rgbawhite50 bg-transparent outline-none">
                </dd>
                <dd @click="withdrawalAmountRef=''" class="px-2 -mr-2 cursor-pointer">
                    <svg :class="withdrawalAmountRef&&input_focus?'opacity-65':'opacity-0'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </dd>
            </dl>
            <div v-if="not_arrow_cash" class="px-4 py-2 mt-1 rounded-lg border border-rgbawhite10 bg-gradient-to-b from-rgbawhite10 to-transparent">
                <svg class="w-4 h-4 mr-1.5 opacity-45 inline-block align-middle" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke="currentColor" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 37C25.3807 37 26.5 35.8807 26.5 34.5C26.5 33.1193 25.3807 32 24 32C22.6193 32 21.5 33.1193 21.5 34.5C21.5 35.8807 22.6193 37 24 37Z" fill="currentColor"/>
                    <path d="M24 12V28" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-xs opacity-45 align-middle">Você preciso apostar R$ {{ fn(memberRef&&memberRef.account&&memberRef.account.bet_amount) }}</span>
            </div>
            <div class="mt-8 px-8 flex justify-center" >
                <a @click="submit()" :class="autoclick?'':'opacity-50 pointer-events-none'" class="w-full bg-btncolor text-themeblack rounded-lg  text-center p-3">
                    <span>Saque</span>
                </a>
            </div> 
        </pu-card>

        <pu-card theme="3" class="py-4" v-if="currentTemplate.value=='template_three'">
            <section class="w-full py-3 px-4 mb-5 bg-tablergba20 rounded-lg">
                <p class="text-sm opacity-85 text-themetext1">Se você tiver dúvidas ou problemas, entre em contato com o suporte ao cliente. Obrigado!</p>
                <div class="p-2  rounded-full mt-2 flex items-center justify-center bg-theme  " @click="openServiceFunc()">
                    <img  :src=HomeImg.icon_service  class="w-6 h-5 mr-2">
                    <span class="text-themetext1">suporte online</span>
                </div>
            </section>
            <section class="w-full py-3 px-4 mb-5 bg-tablergba20 rounded-lg">
                <p class="text-sm opacity-85 text-themetext1">Canal de pagamento:</p>
                <ul class="w-full text-xs flex flex-wrap">
                    <template v-for="item,index in channelListRef" :key="index">
                        <li @click="withdrawalChannelIndexRef=index" :class="index==withdrawalChannelIndexRef?'m3-theme-btn4':'bg-tablergba40'" class="h-9 px-5 mr-2.5 mt-2.5 rounded-lg flex items-center">
                            <span>{{ item.name }}</span>
                        </li>
                    </template>
                </ul>
            </section>
            <section class="mb-5 text-center">
                <h5 class="mb-1 text-sm text-themetext1">Conta Saldo:</h5>
                <p>
                    <img :src=CommonImg.img_money class="w-8 h-8 mr-2 inline-block align-middle">
                    <span class="text-4xl align-middle">{{ memberRef&&memberRef.account&&memberRef.account.user_money}}</span>
                </p>
            </section>
            <p class="mb-2 text-sm text-themetext2">Valor do saque</p>
            <dl :class="not_arrow_cash?'border-rgbawhite10':'m3-theme-btn2'" class="w-full h-[3.125rem] px-3 border rounded-lg flex items-center">
                <dt class="mr-3 text-base font-bold shrink-0">
                    <span class="text-themetext0">R$</span>
                </dt>
                <!-- @input="onInputAmount" -->
                <dd class="flex-1 overflow-hidden">
                    <input type="text"
                    inputmode="decimal"
                    v-model="withdrawalAmountRef" 
                    :placeholder="`valor(${channel_curr?.min_amount || 10} ~ ${channel_curr?.max_amount || 20000})`"
                    @focus="input_focus=true" 
                    :readonly="not_arrow_cash"
                    @input="onInputAmount" 
                    class="w-full h-8 text-base placeholder:text-sm placeholder:text-themetext2 bg-transparent outline-none">
                </dd>
                <dd @click="withdrawalAmountRef=''" class="px-2 -mr-2 cursor-pointer">
                    <svg :class="withdrawalAmountRef&&input_focus?'opacity-65':'opacity-0'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </dd>
            </dl>
            <div v-if="not_arrow_cash" class="px-4 py-2 mt-1 rounded-lg border border-rgbawhite10 bg-gradient-to-b from-rgbawhite10 to-transparent">
                <svg class="w-4 h-4 mr-1.5 opacity-45 inline-block align-middle" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke="currentColor" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 37C25.3807 37 26.5 35.8807 26.5 34.5C26.5 33.1193 25.3807 32 24 32C22.6193 32 21.5 33.1193 21.5 34.5C21.5 35.8807 22.6193 37 24 37Z" fill="currentColor"/>
                    <path d="M24 12V28" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-xs opacity-45 align-middle">Você preciso apostar R${{ fn(memberRef&&memberRef.account&&memberRef.account.bet_amount) }}</span>
            </div>
            <div class="mt-8 px-8 flex justify-center">
                <a @click="submit()" :class="autoclick?'m3-theme-btn1':'pointer-events-none m3-theme-btn3'" class="w-full rounded-lg  text-center p-3">
                    <span>Saque</span>
                </a>
            </div> 
        </pu-card> 
        <pu-card theme="3" class="py-4" v-if="currentTemplate.value=='template_four'">
            <section class="w-full py-3 px-4 mb-5 bg-tablebg  rounded-lg">
                <p class="text-sm opacity-85">Se você tiver dúvidas ou problemas, entre em contato com o suporte ao cliente. Obrigado!</p>
                <div class="p-1  rounded-full mt-2 flex items-center justify-center m4-default-box" @click="openServiceFunc()">
                    <img  :src="HomeImg.icon_service" class="w-5 h-5 mr-2">
                    <span class="text-themewhite">suporte online</span>
                </div>
            </section>
            <section class="w-full py-3 px-4 mb-5 bg-tablebg  rounded-lg">
                <div class="flex items-center ">
                    <img :src="CommonImg.icon_card2" class="w-[1.2rem] h-[1rem] mr-2"/>
                    <p class="text-sm text-themetext2">Canal de pagamento:</p>
                </div>
                <ul class="w-full text-xs flex flex-wrap">
                    <template v-for="item,index in channelListRef" :key="index">
                        <li @click="withdrawalChannelIndexRef=index" :class="index==withdrawalChannelIndexRef?'m4-ten-btn font-bold':' m4-default-box text-[#fff]'" class="h-9 px-5 mr-2.5 mt-2.5 rounded-lg flex items-center">
                            <span>{{ item.name }}</span>
                        </li>
                    </template>
                </ul>
            </section>
            <section class="mb-5 text-center">
                <h5 class="mb-1 text-sm opacity-65">Conta Saldo:</h5>
                <p>
                    <img :src=CommonImg.img_money  class="w-6 h-6 mr-2 inline-block align-middle">
                    <span class="text-4xl opacity-85 align-middle">{{ memberRef&&memberRef.account&&memberRef.account.user_money}}</span>
                </p>
            </section>
            <div class="bg-tablebg px-3 py-4 rounded-lg">
                <div class="flex  ">
                    <img :src="CommonImg.m4_withdrawal_icon" alt="" class="w-4 h-4 mr-1 inline-block align-middle">
                    <p class="mb-2 text-sm text-themetext2">Valor do saque</p>
                </div>
              
            <dl class="w-full h-[3.125rem] px-3 bg-rgbablack80  rounded-lg flex items-center">
                <dt class="mr-3 text-base font-bold shrink-0">
                    <span class="text-themetext2">R$</span>
                </dt>
                <dd class="flex-1 overflow-hidden">
                    <input type="text"
                    inputmode="decimal"
                    v-model="withdrawalAmountRef" 
                    :placeholder="`valor(${channel_curr?.min_amount || 10} ~ ${channel_curr?.max_amount || 20000})`" 
                    @focus="input_focus=true" 
                    :readonly="not_arrow_cash"
                    @input="onInputAmount" 
                    class="w-full h-8 text-base !text-themetext2 placeholder:text-sm placeholder:text-rgbawhite50 bg-transparent outline-none">
                </dd>
                <dd @click="withdrawalAmountRef=''" class="px-2 -mr-2 cursor-pointer">
                    <svg :class="withdrawalAmountRef&&input_focus?'opacity-65':'opacity-0'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </dd>
            </dl>
            <div v-if="not_arrow_cash" class=" py-2 mt-1 rounded-lg  ">
                <img :src="CommonImg.icon_rich_warn" alt="" class="w-4 h-4 mr-1 inline-block align-middle">
                <span class="text-xs  align-middle">Você preciso apostar <span class="text-themetext0">  R$  {{ fn(memberRef&&memberRef.account&&memberRef.account.bet_amount) }}</span> </span>
            </div>

            </div>
            
            <div class="mt-8  flex justify-center">
                <!-- :class="autoclick?'':'opacity-50 pointer-events-none'" -->
                <a @click="submit()"  class="w-full m4-nine-btn text-center px-4 py-3 rounded-lg"> 
                    <span>Saque</span>
                </a>
            </div>
        </pu-card>
        <pu-card theme="2" class="py-4" v-if="currentTemplate.value=='template_five'">
            <section class="mb-10 ">
                 <div class="flex items-center mb-4">
                    <p class="text-2xl  text-themewhite font-bold mr-2">Depósito</p>
                    <img :src="MineImg.icon_pig" class="w-[1.6rem] h-[1.2rem] mr-2"/>
                 </div>
                 <div class="text-[0.875rem] text-themetext4">
                    <p>Bônus resgatável após 1x faturamento</p>
                    <p>Recarregue sua conta e participe de nossas </p>
                    <img :src="MineImg.img_support" class=" h-[1.2rem] mr-1 inline-block align-middle" />
                 </div>
            </section>
            <section class="w-full  mb-10 " >
                <p class="text-sm font-bold">Canal de pagamento:</p>
                <ul class="w-full text-xs flex flex-wrap">
                    <template v-for="item,index in channelListRef" :key="index">
                        <li @click="withdrawalChannelIndexRef=index" :class="index==withdrawalChannelIndexRef?'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 font-bold':'bg-btn1_bg text-themetext3'" class="h-8 px-5 mr-2.5 mt-2.5 text-xs rounded-lg flex items-center">
                            <span>{{ item.name }}</span>
                        </li>
                    </template>
                </ul>
            </section>

            <section class="mb-5">
                <h5 class="mb-1 text-sm font-bold" >Conta Saldo <span class="text-themetext0">R$ {{ memberRef&&memberRef.account&&memberRef.account.user_money }}</span> </h5>
                <dl :class="not_arrow_cash?'border-rgbawhite10':'border-border1'" class="m5-theme-input w-full h-[3.125rem] px-3 border rounded-lg flex items-center  "
             >
                <dt class="mr-3 text-base font-bold shrink-0">
                    <span class="text-themetext0">R$</span>
                </dt>
                <!-- @input="onInputAmount" -->
              
                <dd class="flex-1 overflow-hidden">
                    <input type="text"
                    inputmode="decimal"
                    v-model="withdrawalAmountRef" 
                    :placeholder="`valor(${channel_curr?.min_amount || 10} ~ ${channel_curr?.max_amount || 20000})`"
                    @focus="input_focus=true" 
                    @input="onInputAmount" 
                    :readonly="not_arrow_cash"
                    class="w-full h-8 text-base placeholder:text-sm placeholder:text-rgbawhite50 bg-transparent outline-none">
                </dd>
                <dd @click="withdrawalAmountRef=''" class="px-2 -mr-2 cursor-pointer">
                    <svg :class="withdrawalAmountRef&&input_focus?'opacity-65':'opacity-0'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </dd>
            </dl>
            <div v-if="not_arrow_cash" class="px-4 py-2 mt-1 rounded-lg border border-rgbawhite10 bg-gradient-to-b from-rgbawhite10 to-transparent">
                <svg class="w-4 h-4 mr-1.5 opacity-45 inline-block align-middle" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke="currentColor" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 37C25.3807 37 26.5 35.8807 26.5 34.5C26.5 33.1193 25.3807 32 24 32C22.6193 32 21.5 33.1193 21.5 34.5C21.5 35.8807 22.6193 37 24 37Z" fill="currentColor"/>
                    <path d="M24 12V28" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-xs opacity-45 align-middle">Você preciso apostar R$ {{ fn(memberRef&&memberRef.account&&memberRef.account.bet_amount) }}</span>
            </div>
            </section>
            
            <ol class="!-mx-1 !mb-8 text-sm flex flex-wrap">
                <template v-for="item, index in configPackages" :key="index">
                    <li class="w-1/3 p-1">
                        <a @click="choiceMoney(item)"
                            :class="item.amount == withdrawalAmountRef ? 'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 font-bold' : 'bg-btn1_bg text-themetext3'"
                            href="javascript:;"
                            class="w-full h-12 text-center rounded-xl relative flex items-center justify-center">
                            <span>{{ item.amount }}</span>
                        </a>
                    </li>
                </template>

            </ol>
            
            <div class="my-8 flex justify-center" >
                <a @click="submit()" :class="autoclick&&checkMoney?'m5-theme-btn1':'pointer-events-none bg-white/30'"  class="w-full h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center ">
                    <span>Saque</span>
                </a>
            </div>
        </pu-card>

    </pu-page>
</template>