<script setup>
import { onMounted, ref } from 'vue'
import { t, fn } from '@/i18n'
import { useDateFormat } from '@vueuse/core'
import { resetTimeFunc } from '@/utils/core'
import { MoneyRecordsDataModel } from '@/model/account'
import { useRouter } from 'vue-router'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
import { useThemeImages } from '@/utils/themeimg'
const CommonBgImg = useThemeImages().commonbg
const CommonImg = useThemeImages().common
const { moneyRecordsData, getRecordsDataFunc, logTypeRef, rechargeNumRef, moneyRef } = MoneyRecordsDataModel()
const router = useRouter()

onMounted(() => {
    recordType.value = 0
    time_index.value = 3
    logTypeRef.value = 3
    getRecordsDataFunc(0, 3, true)
})

const time_list = ref([
    { label: '3 ' + t('account.hours'), value: 3 },
    { label: '12 ' + t('account.hours'), value: 12 },
    { label: '24 ' + t('account.hours'), value: 24 },
    { label: '48 ' + t('account.hours'), value: 48 },
    { label: '7 ' + t('account.days'), value: 168 },
])
const recordType = ref(0)
const time_index = ref(3)
function chageType(type) {
    recordType.value = type
    getRecordsDataFunc(recordType.value, logTypeRef.value, true)
}



</script>

<template>
    <pu-page :title="t('pageTitle.Depositwithdrawalrecords')" class="z-[999]" hideService
        :style="currentTemplate.value != 'template_four' ? { background: `url(${CommonBgImg.bg_body_1}) center` } : { background: `var(--color-theme)` }"
        style="background-size: cover;">
        <div v-if="currentTemplate.value == 'template_one'">
            <pu-card theme="4" class="text-xs flex items-center justify-center !px-0">
                <van-tabs v-model:active="logTypeRef" shrink background="transparent"
                    style="--van-tabs-line-height: 2rem;--van-tabs-bottom-bar-height: 0px;--van-tabs-bottom-bar-color: transparent;--van-padding-xs: 0;">
                    <template v-for="item, index in time_list" :key="index">
                        <van-tab :name="item.value">
                            <template #title>
                                <div :class="item.value == logTypeRef ? 'text-theme font-bold border-b-[2px] border-theme' : 'text-themewhite border-b-[2px] border-rgbawhite10'"
                                    class="h-[2rem] w-[4.65rem] flex items-center justify-center cursor-pointer text-center relative z-10"
                                    @click.stop="logTypeRef = item.value; getRecordsDataFunc(recordType, item.value, true)">
                                    <span class="text-center">{{ item.label }}</span>
                                </div>
                            </template>
                        </van-tab>
                    </template>
                </van-tabs>
            </pu-card>
            <pu-card theme="4" class="text-xs mt-4 ">
                <div class="flex justify-between w-full px-4 items-center text-center ">
                    <div class="w-[49%] cursor-pointer h-[2.5rem]  text-center rounded-lg mr-2 "
                        style="line-height: 2.5rem;" :class="recordType == 0 ? 'bg-gradient-to-r from-gold-500 to-gold-100 text-themeblack font-bold' : 'font-bold  border border-border1 bg-default-bg text-theme'"
                        @click="chageType(0)">
                        Histórico de recargas
                    </div>
                    <div class="w-[49%] cursor-pointer h-[2.5rem] text-center rounded-lg " style="line-height: 2.5rem;"
                        :class="recordType == 1 ? 'bg-gradient-to-r from-gold-500 to-gold-100 text-themeblack font-bold' : 'font-bold border border-border1 bg-default-bg text-theme'" @click="chageType(1)">
                        Registos de saques
                    </div>
                </div>
            </pu-card>


            <pu-card theme="3" class="mt-4">
                <section
                    class="w-full px-5 py-2 text-xs !leading-normal text-themefont border border-border1 bg-default-bg rounded-xl ">
                    <p>
                             <span class="text-themewhite font-[700] text-[1rem]">Dados {{logTypeRef ===
                            168 ? 'dos' : 'das' }} últimas {{time_list.find(item => item.value ===
                            logTypeRef)?.label||
                            '3horas' }}</span>
                    </p>
                    <p>
                        <span>{{recordType==0?'Número de recargas: ':'Número de levantamentos:  '}}</span>
                        <span class="text-four ml-1">{{ rechargeNumRef }}</span>
                    </p>
                    <p>
                        <span>{{recordType==0?'Valor de recarga:':'Valor do levantamento:'}} </span>
                        <span class="text-four ml-1">{{ moneyRef }}</span>
                    </p>
                </section>
            </pu-card>
            <pu-card theme="3" class="mt-3 ">
                <table
                    class="w-full text-sm text-center bg-gradient-to-br from-themecardlinear2 to-themecardlinear1 table-fixed rounded-[1rem] overflow-hidden table-tempalte-four">
                    <thead class="text-xs py-2">
                        <tr class="bg-rgbablack30 text-themewhite">
                            <td >Data</td>
                            <td>Tempo</td>
                            <td>Quantia</td>
                            <td >Estado</td>
                        </tr>
                    </thead>
                    <!-- v-if="reliefFundsListRef.length > 0" -->
                    <tbody>
                        <template v-for="item, index in moneyRecordsData" :key="index"
                            v-if="moneyRecordsData.length > 0">
                            <tr class="text-xs">
                                <td class="text-themewhite ">
                                    <span>{{ resetTimeFunc(item.created_at).slice(0, 10) }}</span>
                                </td>
                                <td class="text-themewhite">
                                    <span>{{ resetTimeFunc(item.created_at).slice(11, 16) }}</span>
                                </td>
                                <td class="text-themetext0 ">
                                    <span>{{ item.amount }}</span>
                                </td>
                                <td class="flex items-center justify-center ">
                                    <!-- <span>{{item.status}}</span> -->
                                    <img src="/imgs/common/img_close.png" class="w-4 h-4" v-if="item.status == 3" />
                                    <img src="/imgs/common/img_coke.png" class="w-4 h-4" v-if="item.status == 1" />
                                    <img src="/imgs/common/img_gou.png" class="w-4 h-4" v-if="item.status == 2" />
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="4 ">
                                <div class="w-full py-4 text-center flex flex-col items-center">
                                    <img :src=CommonImg.img_nodata class="w-40 h-auto">
                                    <p class="mt-2 text-sm opacity-60 ">Ainda não há reqistos de transações.</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>
        </div>
        <div v-else-if="currentTemplate.value == 'template_two'">
            <pu-card theme="4" class="text-xs mt-2">
                <div class="flex justify-between w-full px-4 items-center text-center">
                    <div class="w-[49%] cursor-pointer h-[2rem]  text-center rounded-lg mr-2 "
                        style="line-height: 2rem;" :class="recordType == 0 ? 'bg-gradient-to-r from-btnlinar1 to-btnlinar2 text-themewhite' : 'bg-tablebg text-theme'"
                        @click="chageType(0)">
                        Histórico de recargas
                    </div>
                    <div class="w-[49%] cursor-pointer h-[2rem] text-center rounded-lg " style="line-height: 2rem;"
                        :class="recordType == 1 ? 'bg-gradient-to-r from-btnlinar1 to-btnlinar2 text-themewhite' : 'bg-tablebg text-theme'" @click="chageType(1)">
                        Registos de saques
                    </div>
                </div>
            </pu-card>
            <pu-card theme="4" class="text-xs mt-4 flex items-center justify-center ">
                <van-tabs v-model:active="logTypeRef" shrink
                    style="--van-tabs-line-height: 2rem;--van-tabs-bottom-bar-height: 0px;--van-tabs-bottom-bar-color: #FFAF00;--van-padding-xs: 0.1rem;">
                    <template v-for="item, index in time_list" :key="index">
                        <van-tab :name="item.value">
                            <template #title>
                                <div :class="item.value == logTypeRef ? 'bg-gradient-to-r from-btnlinar1 to-btnlinar2 text-themewhite' : 'bg-tablebg text-theme'"
                                    class="h-8 w-[4.25rem]  rounded-xl flex items-center justify-center text-center cursor-pointer"
                                    @click.stop="logTypeRef = item.value; getRecordsDataFunc(recordType, item.value, true)">
                                    <span>{{ item.label }}</span>
                                </div>
                            </template>
                        </van-tab>
                    </template>
                </van-tabs>
            </pu-card>

            <pu-card theme="3" class="mt-4">
                <section
                    class="w-full px-4 py-3 text-xs !leading-normal text-themefont border border-rgbawhite10 rounded-[1rem] bg-rgbawhite10 ">
                    <p class="mb-1">
                              <span class="text-one text-[1rem] font-bold">Dados {{logTypeRef ===
                            168 ? 'dos' : 'das' }} últimas {{time_list.find(item => item.value ===
                            logTypeRef)?.label||
                            '3horas' }}</span>
                    </p>
                    <p>
                        <span>{{recordType==0?'Número de recargas: ':'Número de levantamentos:  '}}</span>
                        <span class="text-theme ml-1">{{ rechargeNumRef }}</span>
                    </p>
                    <p>
                        <span>{{recordType==0?'Valor de recarga:':'Valor do levantamento:'}} </span>
                        <span class="text-theme ml-1">{{ moneyRef }}</span>
                    </p>
                </section>
            </pu-card>
            <pu-card theme="3" class="mt-3 ">
                <table
                    class="w-full text-sm text-center bg-tablergba20  table-fixed rounded-[1rem] overflow-hidden table-tempalte-four">
                    <thead class="text-xs py-2">
                        <tr class="bg-tablergba40 text-themewhite">
                            <td >Data</td>
                            <td >Tempo</td>
                            <td>Quantia</td>
                            <td >Estado</td>
                        </tr>
                    </thead>
                    <!-- v-if="reliefFundsListRef.length > 0" -->
                    <tbody>
                        <template v-for="item, index in moneyRecordsData" :key="index"
                            v-if="moneyRecordsData.length > 0">
                            <tr class="text-xs">
                                <td class="text-theme ">
                                    <span>{{ resetTimeFunc(item.created_at).slice(0, 10) }}</span>
                                </td>
                                <td class="text-theme">
                                    <span>{{ resetTimeFunc(item.created_at).slice(11, 16) }}</span>
                                </td>
                                <td class="text-theme ">
                                    <span>{{ item.amount }}</span>
                                </td>
                                <td class="flex items-center justify-center ">
                                    <!-- <span>{{item.status}}</span> -->
                                    <img src="/imgs/common/img_close.png" class="w-4 h-4" v-if="item.status == 3" />
                                    <img src="/imgs/common/img_coke.png" class="w-4 h-4" v-if="item.status == 1" />
                                    <img src="/imgs/common/img_gou.png" class="w-4 h-4" v-if="item.status == 2" />
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="4 ">
                                <div class="w-full py-4 text-center flex flex-col items-center">
                                    <img :src=CommonImg.img_nodata class="w-40 h-auto">
                                    <p class="mt-2 text-sm opacity-60 text-theme">Ainda não há reqistos de transações.</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>
        </div>
         <div v-else-if="currentTemplate.value == 'template_three'">
            <pu-card theme="4" class="text-xs flex items-center justify-center !px-0">
                <van-tabs v-model:active="logTypeRef" shrink background="transparent"
                    style="--van-tabs-line-height: 2rem;--van-tabs-bottom-bar-height: 0px;--van-tabs-bottom-bar-color: transparent;--van-padding-xs: 0;">
                    <template v-for="item, index in time_list" :key="index">
                        <van-tab :name="item.value">
                            <template #title>
                                <div :class="item.value == logTypeRef ? 'text-themetext1 font-bold border-b-[2px] border-themetext1' : 'text-themewhite border-b-[1.5px] border-themetext3'"
                                    class="h-[2rem] w-[4.65rem] flex items-center justify-center cursor-pointer text-center relative z-10"
                                    @click.stop="logTypeRef = item.value; getRecordsDataFunc(recordType, item.value, true)">
                                    <span class="text-center">{{ item.label }}</span>
                                </div>
                            </template>
                        </van-tab>
                    </template>
                </van-tabs>
            </pu-card>
            <pu-card theme="4" class="text-xs mt-4 ">
                <div class="flex justify-between w-full px-4 items-center text-center ">
                    <div class="w-[49%] cursor-pointer h-[2.5rem]  text-center rounded-lg mr-2 "
                        style="line-height: 2.5rem;" :class="recordType == 0 ? 'm3-theme-btn1 font-bold' : 'font-bold  border border-defaultborder bg-default-bg text-theme'"
                        @click="chageType(0)">
                        {{ t('account.ReloadHistory') }}
                    </div>
                    <div class="w-[49%] cursor-pointer h-[2.5rem] text-center rounded-lg " style="line-height: 2.5rem;"
                        :class="recordType == 1 ? 'm3-theme-btn1 font-bold' : 'font-bold border border-defaultborder bg-default-bg text-theme'" @click="chageType(1)">
                        {{ t('account.SaxRecords') }}
                    </div>
                </div>
            </pu-card>


            <pu-card theme="3" class="mt-4">
                <section
                    class="w-full px-5 py-2 text-xs !leading-normal text-themefont border border-defaultborder bg-default-bg rounded-xl ">
                    <p>
                        <span  class="text-themewhite font-[700] text-[1rem]">{{ t('account.Data') }} {{logTypeRef ===
                            168 ? 'dos' : 'das' }} {{ t('account.last') }} {{time_list.find(item => item.value ===
                            logTypeRef)?.label||
                            '3horas' }}</span>
                    </p>
                    <p>
                        <span>{{recordType==0? t('account.NumberReloads')+ ': ':t('account.NumberSurveys')+': '}}</span>
                        <span class="text-themetext0 ml-1">{{ rechargeNumRef }}</span>
                    </p>
                    <p>
                        <span>{{recordType==0? t('account.ReloadValue')+':':t('account.RaiseValue')+':'}} </span>
                        <span class="text-themetext0 ml-1">{{ moneyRef }}</span>
                    </p>
                </section>
            </pu-card>
            <pu-card theme="3" class="mt-3 ">
                <table
                    class="w-full text-sm text-center bg-gradient-to-br from-themecardlinear2 to-themecardlinear1 table-fixed rounded-[1rem] overflow-hidden table-tempalte-four">
                    <thead class="text-xs py-2">
                        <tr class="bg-rgbablack30 text-themewhite">
                            <td >{{ t('account.Date') }}</td>
                            <td>{{ t('account.Time') }}</td>
                            <td>{{ t('account.Amount') }}</td>
                            <td >{{ t('account.Status') }}</td>
                        </tr>
                    </thead>
                    <!-- v-if="reliefFundsListRef.length > 0" -->
                    <tbody>
                        <template v-for="item, index in moneyRecordsData" :key="index"
                            v-if="moneyRecordsData.length > 0">
                            <tr class="text-xs">
                                <td class="text-themewhite ">
                                    <span>{{ resetTimeFunc(item.created_at).slice(0, 10) }}</span>
                                </td>
                                <td class="text-themewhite">
                                    <span>{{ resetTimeFunc(item.created_at).slice(11, 16) }}</span>
                                </td>
                                <td class="text-themewhite ">
                                    <span>{{ item.amount }}</span>
                                </td>
                                <td class="flex items-center justify-center ">
                                    <!-- <span>{{item.status}}</span> -->
                                    <img src="/imgs/common/img_close.png" class="w-4 h-4" v-if="item.status == 3" />
                                    <img src="/imgs/common/img_coke.png" class="w-4 h-4" v-if="item.status == 1" />
                                    <img src="/imgs/common/img_gou.png" class="w-4 h-4" v-if="item.status == 2" />
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="4 ">
                                <div class="w-full py-4 text-center flex flex-col items-center">
                                    <img :src=CommonImg.img_nodata class="w-40 h-auto">
                                    <p class="mt-2 text-sm opacity-70 text-themetext1">{{ t('account.NoData') }}</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>
        </div>
        <div v-else-if="currentTemplate.value == 'template_four'">
            <pu-card theme="4" class="text-xs mt-4 ">
                <div class="flex justify-between w-full px-4 items-center text-center ">
                    <div class="w-[49%] cursor-pointer h-[2rem]  text-center rounded-lg mr-2 "
                        style="line-height: 2rem;" :class="recordType == 0 ? 'm4-ten-btn' : 'm4-default-box'"
                        @click="chageType(0)">
                        Histórico de recargas
                    </div>
                    <div class="w-[49%] cursor-pointer h-[2rem] text-center rounded-lg " style="line-height: 2rem;"
                        :class="recordType == 1 ? 'm4-ten-btn' : 'm4-default-box'" @click="chageType(1)">
                        Registos de saques
                    </div>
                </div>
            </pu-card>
            <pu-card theme="4" class="text-xs mt-4 flex items-center justify-center ">
                <van-tabs v-model:active="logTypeRef" shrink
                    style="--van-tabs-line-height: 2rem;--van-tabs-bottom-bar-height: 0px;--van-tabs-bottom-bar-color: #FFAF00;--van-padding-xs: 0.1rem;">
                    <template v-for="item, index in time_list" :key="index">
                        <van-tab :name="item.value">
                            <template #title>
                                <div :class="item.value == logTypeRef ? 'm4-ten-btn' : 'm4-default-box'"
                                    class="h-8 px-3 rounded-full flex items-center cursor-pointer"
                                    @click.stop="logTypeRef = item.value; getRecordsDataFunc(recordType, item.value, true)">
                                    <span>{{ item.label }}</span>
                                </div>
                            </template>
                        </van-tab>
                    </template>
                </van-tabs>
            </pu-card>

            <pu-card theme="3" class="mt-4">
                <section
                    class="w-full px-4 py-3 text-xs !leading-normal text-themefont border border-rgbawhite10 rounded-xl bg-gradient-to-b from-rgbawhite10 to-transparent">
                    <p>
                        <span class="m4-text">Dados {{logTypeRef ===
                            168 ? 'dos' : 'das' }} últimas {{time_list.find(item => item.value ===
                            logTypeRef)?.label||
                            '3horas' }}</span>
                    </p>
                    <p>
                        <span>{{recordType==0?'Número de recargas: ':'Número de levantamentos:  '}}</span>
                        <span class="text-themetext3">{{ rechargeNumRef }}</span>
                    </p>
                    <p>
                        <span>{{recordType==0?'Valor de recarga:':'Valor do levantamento:'}} </span>
                        <span class="text-themetext3">{{ moneyRef }}</span>
                    </p>
                </section>
            </pu-card>
            <pu-card theme="3" class="mt-3 ">
                <table
                    class="w-full text-sm text-center bg-tablebg2 table-fixed rounded-[1rem] overflow-hidden table-tempalte-four">
                    <thead class="text-xs py-2">
                        <tr class="bg-tablebg ">
                            <td class="m4-text ">Data</td>
                            <td class="m4-text">Tempo</td>
                            <td class="m4-text ">Quantia</td>
                            <td class="m4-text">Estado</td>
                        </tr>
                    </thead>
                    <!-- v-if="reliefFundsListRef.length > 0" -->
                    <tbody>
                        <template v-for="item, index in moneyRecordsData" :key="index"
                            v-if="moneyRecordsData.length > 0">
                            <tr>
                                <td class="text-themewhite ">
                                    <span>{{ resetTimeFunc(item.created_at).slice(0, 10) }}</span>
                                </td>
                                <td class="text-themewhite">
                                    <span>{{ resetTimeFunc(item.created_at).slice(11, 16) }}</span>
                                </td>
                                <td class="text-themetext0 ">
                                    <span>{{ item.amount }}</span>
                                </td>
                                <td class="flex items-center justify-center ">
                                    <img src="/imgs/common/img_close.png" class="w-4 h-4" v-if="item.status == 3" />
                                    <img src="/imgs/common/img_coke.png" class="w-4 h-4" v-if="item.status == 1" />
                                    <img src="/imgs/common/img_gou.png" class="w-4 h-4" v-if="item.status == 2" />
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="4 ">
                                <div class="w-full py-4 text-center flex flex-col items-center">
                                    <img :src=CommonImg.img_nodata class="w-40 h-auto">
                                    <p class="mt-2 text-sm opacity-70 m4-text">Ainda não há reqistos de transações.</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>
        </div>
        <div v-else-if="currentTemplate.value == 'template_five'">
            <pu-card theme="4" class="text-xs mt-4 flex items-center justify-center">
                <van-tabs v-model:active="logTypeRef" shrink
                    style="--van-tabs-line-height: 2rem;--van-tabs-bottom-bar-height: 0px;--van-tabs-bottom-bar-color: #FFAF00;--van-padding-xs: 0;">
                    <template v-for="item, index in time_list" :key="index">
                        <van-tab :name="item.value">
                            <template #title>
                                <div :class="item.value == logTypeRef ? 'text-inputborder border-b-2 border-inputborder relative bottom-0 z-[100]' : 'border-b-2 border-rgbawhite30 '"
                                    class="h-8  px-3  flex flex-1 items-center cursor-pointer"
                                    @click.stop="logTypeRef = item.value; getRecordsDataFunc(recordType, item.value, true)">
                                    <span>{{ item.label }}</span>
                                </div>
                            </template>
                        </van-tab>
                    </template>
                </van-tabs>
            </pu-card>
            <pu-card theme="4" class="text-xs mt-4 ">
                <div class="flex justify-between w-full px-4 items-center text-center ">
                    <div class="w-[49%] cursor-pointer h-[2rem]  text-center rounded-lg mr-2 "
                        style="line-height: 2rem;" :class="recordType == 0 ? 'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 font-bold' : 'bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 border border-thirsmodelboder font-bold text-themetext3'"
                        @click="chageType(0)">
                        Histórico de recargas
                    </div>
                    <div class="w-[49%] cursor-pointer h-[2rem] text-center rounded-lg " style="line-height: 2rem;"
                        :class="recordType == 1 ? 'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 font-bold' : 'bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 border border-thirsmodelboder font-bold text-themetext3'" @click="chageType(1)">
                        Registos de saques
                    </div>
                </div>
            </pu-card>

            <pu-card theme="3" class="mt-4">
                <section
                    class="w-full px-4 py-3 text-xs !leading-normal text-themefont border border-rgbawhite10 rounded-xl bg-gradient-to-l from-thirsmodel1 to-thirsmodel2">
                    <p>
                        <span class="text-themewhite font-bold">Dados {{logTypeRef ===
                            168 ? 'dos' : 'das' }} últimas {{time_list.find(item => item.value ===
                            logTypeRef)?.label||
                            '3horas' }}</span>
                    </p>
                    <p>
                        <span>{{recordType==0?'Número de recargas: ':'Número de levantamentos:  '}}</span>
                        <span class="text-themetext3">{{ rechargeNumRef }}</span>
                    </p>
                    <p>
                        <span>{{recordType==0?'Valor de recarga:':'Valor do levantamento:'}} </span>
                        <span class="text-themetext3">{{ moneyRef }}</span>
                    </p>
                </section>
            </pu-card>
            <pu-card theme="3" class="mt-3 ">
                <table
                    class="w-full text-sm text-center bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 border border-thirsmodelboder table-fixed rounded-[1rem] overflow-hidden table-tempalte-four">
                    <thead class="text-xs py-2">
                        <tr class="bg-tablebg2">
                            <td class="m4-text ">Data</td>
                            <td class="m4-text">Tempo</td>
                            <td class="m4-text ">Quantia</td>
                            <td class="m4-text">Estado</td>
                        </tr>
                    </thead>
                    <!-- v-if="reliefFundsListRef.length > 0" -->
                    <tbody>
                        <template v-for="item, index in moneyRecordsData" :key="index"
                            v-if="moneyRecordsData.length > 0">
                            <tr>
                                <td class="text-themewhite ">
                                    <span>{{ resetTimeFunc(item.created_at).slice(0, 10) }}</span>
                                </td>
                                <td class="text-themewhite">
                                    <span>{{ resetTimeFunc(item.created_at).slice(11, 16) }}</span>
                                </td>
                                <td class="text-themetext0 ">
                                    <span>{{ item.amount }}</span>
                                </td>
                                <td class="flex items-center justify-center ">
                                    <img src="/imgs/common/img_close.png" class="w-4 h-4" v-if="item.status == 3" />
                                    <img src="/imgs/common/img_coke.png" class="w-4 h-4" v-if="item.status == 1" />
                                    <img src="/imgs/common/img_gou.png" class="w-4 h-4" v-if="item.status == 2" />
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="4 ">
                                <div class="w-full py-4 text-center flex flex-col items-center">
                                    <img :src=CommonImg.img_nodata class="w-40 h-auto">
                                    <p class="mt-2 text-sm opacity-70 m4-text">Ainda não há reqistos de transações.</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
<style scoped>
table tr td {
    padding: 0.75rem 0.25rem;
}
.tabClass :deep(.van-tabs--line .van-tabs__wrap){ 
    background: #10121d;
    border-bottom: 1px solid rgba(255,255,255,0.3);
   }
</style>