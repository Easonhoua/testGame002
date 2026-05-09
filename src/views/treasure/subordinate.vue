<script setup>
import { ref,watch,onMounted } from 'vue'
import { t } from '@/i18n'
import { boxModel } from '@/model/treasure'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const TreasureImg = useThemeImages().treasure

const { childListRef,boxListChildFunc,DepositRef,BetRef} = boxModel({list: true})

let check = ref(true)

watch(() => check.value, () => {
    boxListChildFunc(check.value == true ? 1 : 0)
})

onMounted(()=> {
    boxListChildFunc(check.value == true ? 1 : 0)
})

</script>

<template>
    <pu-page title="Meus subordinados diretos" class="z-[999]" v-if="currentTemplate.value =='template_one'||currentTemplate.value =='template_two'||currentTemplate.value =='template_three'">
        <pu-card theme="3" class="pt-4" v-if="currentTemplate.value =='template_one'||currentTemplate.value =='template_two'">
            <h5 class="mb-2 text-sm" :class="currentTemplate.value =='template_one' ? '' : ' text-three'">Condições efectivas do utilizador</h5>
            <dl class="w-full h-11 px-2 mb-1.5 text-xs  rounded-lg flex items-center" :class="currentTemplate.value =='template_one' ? 'bg-rgbawhite10' : 'bg-tablergba20 text-theme'">
                <dt class="w-3/5 px-2">
                    <span>Depósitos acumulados</span>
                </dt>
                <dd class="w-2/5 px-2 text-right">
                    <span>>&nbsp;</span>
                    <span class="text-sm text-yellow-300 font-bold">{{DepositRef}}</span>
                </dd>
            </dl> 
            <dl class="w-full h-11 px-2 mb-1.5 text-xs  rounded-lg flex items-center" :class="currentTemplate.value =='template_one' ? 'bg-rgbawhite10' : 'bg-tablergba20 text-theme'">
                <dt class="w-3/5 px-2">
                    <span>Apostas no jogo</span>
                </dt>
                <dd class="w-2/5 px-2 text-right">
                    <span>>&nbsp;</span>
                    <span class="text-sm text-yellow-300 font-bold">{{BetRef}}</span>
                </dd>
            </dl>
        </pu-card>
        <pu-card theme="3" class="pt-4" v-if="currentTemplate.value =='template_three'">
            <h5 class="mb-2 text-sm text-themetext1">Condições efectivas do utilizador</h5>
            <dl class="w-full h-11 px-2 mb-1.5 text-xs bg-tablergba20 rounded-lg flex items-center">
                <dt class="w-3/5 px-2 text-themetext2">
                    <span>Depósitos acumulados</span>
                </dt>
                <dd class="w-2/5 px-2 text-right">
                    <span>>&nbsp;</span>
                    <span class="text-sm text-themetext0 font-bold">{{DepositRef}}</span>
                </dd>
            </dl> 
            <dl class="w-full h-11 px-2 mb-1.5 text-xs bg-tablergba20 rounded-lg flex items-center" >
                <dt class="w-3/5 px-2 text-themetext2">
                    <span>Apostas no jogo</span>
                </dt>
                <dd class="w-2/5 px-2 text-right">
                    <span>>&nbsp;</span>
                    <span class="text-sm text-yellow-300 font-bold">{{BetRef}}</span>
                </dd>
            </dl>
        </pu-card>

        <pu-card theme="3" class="pt-4" v-if="currentTemplate.value =='template_one'||currentTemplate.value =='template_two'">
            <div class="w-full h-[3.125rem] px-3 mb-1.5  rounded-lg flex items-center bg-tablergba40">
                <svg class="w-6 h-6 shrink-0" stroke="currentColor" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="currentTemplate.value =='template_one' ">
                    <path d="M24 20C27.866 20 31 16.866 31 13C31 9.13401 27.866 6 24 6C20.134 6 17 9.13401 17 13C17 16.866 20.134 20 24 20Z" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 40.8V42H42V40.8C42 36.3196 42 34.0794 41.1281 32.3681C40.3611 30.8628 39.1372 29.6389 37.6319 28.8719C35.9206 28 33.6804 28 29.2 28H18.8C14.3196 28 12.0794 28 10.3681 28.8719C8.86278 29.6389 7.63893 30.8628 6.87195 32.3681C6 34.0794 6 36.3196 6 40.8Z" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <img :src="TreasureImg.icon_user" alt="" class="w-6 h-6 shrink-0 mr-2" v-else>
                <div class="flex-1 overflow-hidden">
                    <p class="text-sm text-themetext1">Subordenada</p>
                </div>
                <div class="flex items-center shrink-0">
                    <span class="text-xs text-themetext1">Eficaz&nbsp;</span>
                    <div @click="check = !check" class="w-8 h-4 bg-gray-300 rounded-full cursor-pointer select-none">
                        <div :class="check?'w-full':'w-1/2'" class="h-full bg-blue-500 rounded-full transition-all duration-300 flex justify-end">
                            <em class="w-4 h-4 bg-themewhite rounded-full"></em>
                        </div>
                    </div>
                </div>
            </div>
            <table class="w-full text-sm text-center rounded-xl overflow-hidden"  v-if="currentTemplate.value =='template_one' ">
                <thead>
                    <tr class="bg-rgbawhite10">
                        <td>Nome</td>
                        <td class="relative">
                            <em class="w-px h-6 -mt-3 bg-rgbawhite10 absolute left-0 top-1/2"></em>
                            <em class="w-px h-6 -mt-3 bg-rgbawhite10 absolute right-0 top-1/2"></em>
                            <span>Depósito</span>
                        </td>
                        <td>Apostas</td>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="item,index in childListRef" :key="index" v-if="childListRef.length > 0 ">
                        <tr class="bg-rgbawhite10">
                            <td class="text-left">
                                <div class="flex items-center">
                                    <span>{{item.nickname}}</span>
                                    <template v-if="item.status === '2'">
                                        <img :src=TreasureImg.icon_coins alt="Treasure Box" class="w-6 h-6 ml-2">
                                    </template>
                                </div>
                            </td>

                            <td>{{item.recharge}}</td>
                            <td>{{item.bet_amount}}</td>
                        </tr>
                    </template>
                    <tr v-else>
                        <td colspan="3">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="w-full text-sm text-center rounded-xl overflow-hidden mt-6" v-else>
                <thead>
                    <tr class="bg-tablergba40" >
                        <td>Nome</td>
                        <td>Depósito</td>
                        <td>Apostas</td>
                    </tr>
                </thead>

                <tbody >
                    <!--  -->
                    <template v-for="item,index in childListRef" :key="index" v-if="childListRef.length > 0 ">
                        <tr class="bg-body-text/5">
                            <td class="text-left">
                                <div class="flex items-center">
                                    <span class="text-theme">{{item.nickname}}</span>
                                    <template v-if="item.status === '2'">
                                        <img :src=TreasureImg.icon_coins alt="Treasure Box" class="w-4 ml-2">
                                    </template>
                                </div>
                            </td>

                            <td class="text-theme">{{item.recharge}}</td>
                            <td class="text-theme">{{item.bet_amount}}</td>
                        </tr>
                    </template>
                    <tr v-else >
                        <td colspan="3" class="bg-tablergba20 min-h-[30rem] h-[30rem]">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>

        <pu-card theme="3" class="pt-4" v-if="currentTemplate.value =='template_three'">
            <div class="w-full h-[3.125rem] px-3 mb-1.5  rounded-lg flex items-center bg-tablergba40">
                <svg class="w-6 h-6 shrink-0" stroke="currentColor" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="currentTemplate.value =='template_one' ">
                    <path d="M24 20C27.866 20 31 16.866 31 13C31 9.13401 27.866 6 24 6C20.134 6 17 9.13401 17 13C17 16.866 20.134 20 24 20Z" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 40.8V42H42V40.8C42 36.3196 42 34.0794 41.1281 32.3681C40.3611 30.8628 39.1372 29.6389 37.6319 28.8719C35.9206 28 33.6804 28 29.2 28H18.8C14.3196 28 12.0794 28 10.3681 28.8719C8.86278 29.6389 7.63893 30.8628 6.87195 32.3681C6 34.0794 6 36.3196 6 40.8Z" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <img :src="TreasureImg.icon_user" alt="" class="w-6 h-6 shrink-0 mr-2" v-else>
                <div class="flex-1 overflow-hidden">
                    <p class="text-sm text-themetext1">Subordenada</p>
                </div>
                <div class="flex items-center shrink-0">
                    <span class="text-xs text-themetext1">Eficaz&nbsp;</span>
                    <div @click="check = !check" class="w-8 h-4 bg-gray-300 rounded-full cursor-pointer select-none">
                        <div :class="check?'w-full':'w-1/2'" class="h-full bg-blue-500 rounded-full transition-all duration-300 flex justify-end">
                            <em class="w-4 h-4 bg-themewhite rounded-full"></em>
                        </div>
                    </div>
                </div>
            </div>
            <table class="w-full text-xs text-center rounded-xl overflow-hidden mt-6">
                <thead>
                    <tr class="bg-tablergba40 " >
                        <td>Nome</td>
                        <td>Depósito</td>
                        <td>Apostas</td>
                    </tr>
                </thead>

                <tbody >
                    <!--  -->
                    <template v-for="item,index in childListRef" :key="index" v-if="childListRef.length > 0 ">
                        <tr class="bg-tablergba20 even:bg-tablergba10">
                            <td class="text-left">
                                <div class="flex items-center">
                                    <span class="text-themetext2">{{item.nickname}}</span>
                                    <template v-if="item.status === '2'">
                                        <img :src=TreasureImg.icon_coins alt="Treasure Box" class="w-4 h-4 ml-2">
                                    </template>
                                </div>
                            </td>

                            <td class="text-themetext2">{{item.recharge}}</td>
                            <td class="text-themetext2">{{item.bet_amount}}</td>
                        </tr>
                    </template>
                    <tr v-else >
                        <td colspan="3" class="bg-tablergba20 min-h-[30rem] h-[30rem]">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>

        <Panddingbottom></Panddingbottom>
    </pu-page>
    <pu-page title="Meus subordinados diretos" class="z-[999]" hideService v-if="currentTemplate.value =='template_four'">
        <pu-card theme="3" >
            <dl class="w-full h-11 px-2 mb-1.5 text-xs bg-tablebg rounded-lg flex items-center">
                <dt class="w-3/5 px-2 text-themefont">
                    <span>Depósitos acumulados</span>
                </dt>
                <dd class="w-2/5 px-2 text-right">
                    <span class="text-themetext0">>&nbsp;</span>
                    <span class="text-sm text-themetext0 font-bold">{{DepositRef}}</span>
                </dd>
            </dl>
            <dl class="w-full h-11 px-2 mb-1.5 text-xs bg-tablebg rounded-lg flex items-center">
                <dt class="w-3/5 px-2">
                    <span class="text-themefont">Apostas no jogo</span>
                </dt>
                <dd class="w-2/5 px-2 text-right">
                    <span class="text-themetext0">>&nbsp;</span>
                    <span class="text-sm text-themetext0 font-bold">{{BetRef}}</span>
                </dd>
            </dl>
        </pu-card>
        <pu-card theme="3" class="pt-4 ">
            <div class="w-full h-[3.125rem] px-3 mb-1.5 bg-tablebg  rounded-lg flex items-center">
                <img :src="TreasureImg.icon_user" alt="" class="w-4 h-4 shrink-0 mr-2">
                <div class="flex-1 overflow-hidden">
                    <p class="text-sm text-themetext0 ">Subordenada</p>
                </div>
                <div class="flex items-center shrink-0">
                    <span class="text-xs text-themetext0 ">Eficaz&nbsp;</span>
                    <div @click="check = !check" class="w-8 h-4 bg-gray-300 rounded-full cursor-pointer select-none">
                        <div :class="check?'w-full':'w-1/2'" class="h-full bg-blue-500 rounded-full transition-all duration-300 flex justify-end">
                            <em class="w-4 h-4 bg-white rounded-full"></em>
                        </div>
                    </div>
                </div>
            </div>
            <table class="w-full text-sm text-center rounded-xl overflow-hidden mt-6 bg-tablebg2">
                <thead>
                    <tr class="bg-tablebg">
                        <td class="m4-text">Nome</td>
                        <td class="m4-text">Depósito</td>
                        <td class="m4-text">Apostas</td>
                    </tr>
                </thead>

                <tbody >
                    <!--  -->
                    <template v-for="item,index in childListRef" :key="index" v-if="childListRef.length > 0">
                        <tr class="bg-body-text/5">
                            <td class="text-left">
                                <div class="flex items-center">
                                    <span class="text-white">{{item.nickname}}</span>
                                    <template v-if="item.status === '2'">
                                        <img :src=TreasureImg.icon_coins alt="Treasure Box" class="w-4 h-4 ml-2">
                                    </template>
                                </div>
                            </td>
                            <td class="text-white">{{item.recharge}}</td>
                            <td class="text-white">{{item.bet_amount}}</td>
                        </tr>
                    </template>
                    <tr v-else >
                        <td colspan="3" class="ctx-box-bg3 min-h-[30rem] h-[30rem]">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>
        
        <Panddingbottom></Panddingbottom>
    </pu-page>
    <pu-page title="Meus subordinados diretos" class="z-[999]" hideService v-if="currentTemplate.value =='template_five'">
        <pu-card theme="3" >
            <dl class="w-full h-11 px-2 mb-1.5 text-xs bg-btn1_bg border border-btn_border rounded-lg flex items-center">
                <dt class="w-3/5 px-2 text-themefont">
                    <span>Depósitos acumulados</span>
                </dt>
                <dd class="w-2/5 px-2 text-right text-themetext0">
                    <span class="">>&nbsp;</span>
                    <span class="text-sm  font-bold">{{DepositRef}}</span>
                </dd>
            </dl>
            <dl class="w-full h-11 px-2 mb-1.5 text-xs bg-btn1_bg border border-btn_border rounded-lg flex items-center">
                <dt class="w-3/5 px-2">
                    <span class="text-themefont">Apostas no jogo</span>
                </dt>
                <dd class="w-2/5 px-2 text-right text-themetext0">
                    <span class="">>&nbsp;</span>
                    <span class="text-sm font-bold">{{BetRef}}</span>
                </dd>
            </dl>
        </pu-card>
        <pu-card theme="3" class="pt-4 ">
            <div class="w-full h-[3.125rem] px-3 mb-1.5 m5-theme-input  rounded-lg flex items-center">
                <img :src="TreasureImg.icon_user" alt="" class="w-4 h-4 shrink-0 mr-2">
                <div class="flex-1 overflow-hidden">
                    <p class="text-sm text-themetext0 ">Subordenada</p>
                </div>
                <div class="flex items-center shrink-0">
                    <span class="text-xs text-themetext0 ">Eficaz&nbsp;</span>
                    <div @click="check = !check" class="w-8 h-4 bg-gray-300 rounded-full cursor-pointer select-none">
                        <div :class="check?'w-full':'w-1/2'" class="h-full bg-blue-500 rounded-full transition-all duration-300 flex justify-end">
                            <em class="w-4 h-4 bg-white rounded-full"></em>
                        </div>
                    </div>
                </div>
            </div>
            <table class="w-full text-sm text-center rounded-xl overflow-hidden mt-6 bg-tablebg2">
                <thead>
                    <tr class="bg-tablebg1">
                        <td class="m4-text">Nome</td>
                        <td class="m4-text">Depósito</td>
                        <td class="m4-text">Apostas</td>
                    </tr>
                </thead>

                <tbody >
                    <!--  -->
                    <template v-for="item,index in childListRef" :key="index" v-if="childListRef.length>0">
                        <tr class="bg-body-text/5">
                            <td class="text-left">
                                <div class="flex items-center">
                                    <span class="text-white">{{item.nickname}}</span>
                                    <template v-if="item.status === '2'">
                                        <img :src=TreasureImg.icon_coins alt="Treasure Box" class="w-4 h-4 ml-2">
                                    </template>
                                </div>
                            </td>
                            <td class="text-white">{{item.recharge}}</td>
                            <td class="text-white">{{item.bet_amount}}</td>
                        </tr>
                    </template>
                    <tr v-else >
                        <td colspan="3" class="ctx-box-bg3 min-h-[30rem] h-[30rem]">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>
        
        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
<style scoped>
table tr td{
    padding: 0.75rem 0.25rem;
}
</style>