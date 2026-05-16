<script setup>
import { t, fn } from '@/i18n'
import { rescueFundModel } from '@/model/rescue'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const { listRef, waitBonusRef, lossAmount, todayLoss,todayBonus,takeAwardFunc,rescueFundDataRef } = rescueFundModel(true)
import { useThemeImages } from '@/utils/themeimg'
const CommonImg = useThemeImages().common 
const RescueImg = useThemeImages().rescue
const VipImg = useThemeImages().vip
</script>

<template>
    <pu-page :title="t('pageTitle.RescueFunds')" class="z-[999]" hideService>
        <div class="w-full absolute left-0 top-0 flex justify-center">
            <div class="w-full overflow-x-hidden" :class="currentTemplate.value=='template_one'?' max-w-[480px]':''">
                <img :src=RescueImg.img_rescuefund class="w-full h-auto">
            </div>
        </div>
        <img :src="CommonImg.m4_null" alt="" v-if="currentTemplate.value=='template_four'">
        <em class="w-full h-[17.4rem] block" v-else-if="currentTemplate.value=='template_five'"></em>
        <em class="w-full h-[13.75rem] block" v-else></em>
        <div v-if="currentTemplate.value=='template_one'">
            <pu-card theme="3" class="relative">
            <section class="w-full p-px mb-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-100">
                <div class="w-full text-themewhite bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 rounded-xl overflow-hidden">
                    <dl class="w-full px-2 py-3 text-sm bg-rgbawhite10 flex items-center">
                        <dt class="w-1/2 px-2 border-r border-gold-100">
                            <svg class="w-5 h-5 mr-1 opacity-65 inline-block align-middle" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M34 12V20V21C31.0449 21 28.3892 22.2818 26.5585 24.3198C24.9678 26.0906 24 28.4323 24 31C24 31.5789 24.0492 32.1463 24.1436 32.6983C24.6579 35.7046 26.5143 38.2529 29.0741 39.7046C26.4116 40.5096 22.8776 41 19 41C10.7157 41 4 38.7614 4 36V28V20V12" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M44 31C44 36.5228 39.5228 41 34 41C32.2091 41 30.5281 40.5292 29.0741 39.7046C26.5143 38.2529 24.6579 35.7046 24.1436 32.6983C24.0492 32.1463 24 31.5789 24 31C24 28.4323 24.9678 26.0906 26.5585 24.3198C28.3892 22.2818 31.0449 21 34 21C39.5228 21 44 25.4772 44 31Z" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M34 12C34 14.7614 27.2843 17 19 17C10.7157 17 4 14.7614 4 12C4 9.23858 10.7157 7 19 7C27.2843 7 34 9.23858 34 12Z" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 28C4 30.7614 10.7157 33 19 33C20.807 33 22.5393 32.8935 24.1436 32.6983" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 20C4 22.7614 10.7157 25 19 25C21.7563 25 24.339 24.7522 26.5585 24.3198" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M37 28L31 34" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span class="opacity-65 align-middle">Perda Atual</span>
                        </dt>
                        <dd class="w-1/2 px-2">
                            <p class="text-right flex justify-end items-center">
                                <span class="text-one ">{{ currentUnit.value }}</span>
                                <span class="text-xl opacity-85">{{fn(todayLoss)}}</span>
                            </p>
                        </dd>
                    </dl>
                    <dl class="w-full p-4 text-sm flex items-center">
                        <dt class="flex-1 overflow-hidden">
                            <p class="opacity-85">Fundos de Resgate Previstos</p>
                            <p>
                                <span class="opacity-65">{{ currentUnit.value }}&nbsp;</span>
                                <span class="text-xl">{{ fn(todayBonus) }}</span>
                            </p>
                        </dt>
                    </dl>
                </div>
            </section>
        </pu-card>
        <pu-card theme="3" class="relative">
            <section class="w-full p-px mb-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-100">
                <div class="w-full text-themewhite bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 rounded-xl overflow-hidden">
                    <dl class="w-full px-2 py-3 text-sm bg-rgbawhite10 flex items-center">
                        <dt class="w-1/2 px-2 border-r border-gold-100">
                            <svg class="w-5 h-5 mr-1 opacity-65 inline-block align-middle" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M34 12V20V21C31.0449 21 28.3892 22.2818 26.5585 24.3198C24.9678 26.0906 24 28.4323 24 31C24 31.5789 24.0492 32.1463 24.1436 32.6983C24.6579 35.7046 26.5143 38.2529 29.0741 39.7046C26.4116 40.5096 22.8776 41 19 41C10.7157 41 4 38.7614 4 36V28V20V12" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M44 31C44 36.5228 39.5228 41 34 41C32.2091 41 30.5281 40.5292 29.0741 39.7046C26.5143 38.2529 24.6579 35.7046 24.1436 32.6983C24.0492 32.1463 24 31.5789 24 31C24 28.4323 24.9678 26.0906 26.5585 24.3198C28.3892 22.2818 31.0449 21 34 21C39.5228 21 44 25.4772 44 31Z" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M34 12C34 14.7614 27.2843 17 19 17C10.7157 17 4 14.7614 4 12C4 9.23858 10.7157 7 19 7C27.2843 7 34 9.23858 34 12Z" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 28C4 30.7614 10.7157 33 19 33C20.807 33 22.5393 32.8935 24.1436 32.6983" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 20C4 22.7614 10.7157 25 19 25C21.7563 25 24.339 24.7522 26.5585 24.3198" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M37 28L31 34" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span class="opacity-65 align-middle">Perda Passada</span>
                        </dt>
                        <dd class="w-1/2 px-2">
                            <p class="text-right flex justify-end items-center">
                                <span class="text-one">{{ currentUnit.value }}</span>
                                <span class="text-xl opacity-85">{{fn(lossAmount)}}</span>
                            </p>
                        </dd>
                    </dl>
                    <dl class="w-full p-4 text-sm flex items-center">
                        <dt class="flex-1 overflow-hidden">
                            <p class="opacity-85">Fundos de Resgate Disponíveis</p>
                            <p>
                                <span class="opacity-65">{{ currentUnit.value }}&nbsp;</span>
                                <span class="text-xl">{{ fn(waitBonusRef) }}</span>
                            </p>
                        </dt>
                        <dd class="pl-2">
                            <button @click="takeAwardFunc()" :class="waitBonusRef>0?'ctx-theme__linear rounded-xl':'bg-rgbawhite10 border border-border1'" class="h-10 px-3 rounded-xl">
                                <span :class="waitBonusRef>0?'':'opacity-65'">Receber</span>
                            </button>
                        </dd>
                    </dl>
                </div>
            </section>
            <div class="w-full h-[3.125rem] px-2 py-1 ctx-theme__linear rounded-2xl flex items-center">
                <img :src=RescueImg.img_hand class="w-auto h-full shrink-0">
                <div class="px-2 flex-1 overflow-hidden">
                    <p class="text-sm opacity-65">Tabela de Fundos de Resgate</p>
                </div>
            </div>
        </pu-card>
        <pu-card theme="3" class="mt-3 relative">
            <table class="w-full text-sm text-center">
                <thead class="text-xs">
                    <tr class="text-rgbawhite50 bg-rgbawhite10">
                        <td class="border-r-[0.125rem] border-body-bg">Nível</td>
                        <td class="border-r-[0.125rem] border-body-bg">
                            <span>Perda no Jogo</span>
                        </td>
                        <td>Taxa de Resgate</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item,index in listRef" :key="index">
                        <tr class="odd:bg-white/2 even:bg-white/10">
                            <td class="text-rgbawhite30 border-r-[0.125rem] border-body-bg">
                                <span>{{ item.level }}</span>
                            </td>
                            <td class="text-rgbawhite50 border-r-[0.125rem] border-body-bg">
                                <span>{{ currentUnit.value }}</span>
                                <span>≥{{ item.loss }}</span>
                            </td>
                            <td class="text-four">
                                <span>{{ item.rate }}%</span>
                            </td>
                        </tr>
                    </template>
                    <tr v-if="!listRef.length">
                        <td colspan="3">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>
        <pu-card theme="3" class="mb-3 pt-3">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center">
                    <span>Descrição da Atividade</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
            </div>
            <article class="ctx-article p-mb text-sm text-rgbawhite50"  v-html='rescueFundDataRef.content'>
            </article>
        </pu-card>
        </div>
        <div v-if="currentTemplate.value=='template_two'">
            <pu-card theme="3" class="relative">
            <section class="w-full p-px mb-4 ">
                <div class="w-full  text-white   h-[8rem] "  :style="{backgroundImage: `url(${RescueImg.img_funditembg})`}"  style="background-size: 100% 100%;">
                    <dl class="w-full px-2 py-3 flex items-center">
                        <dt class="w-1/2 ml-8">
                            <span class="text-white  align-middle">Perda Atual</span>
                        </dt>
                        <dd class="w-1/2 px-2">
                            <p class="text-right  text-white  flex justify-end items-center">
                                <span>{{ currentUnit.value }}</span>
                                <span class="text-xl text-four">{{fn(todayLoss)}}</span>
                            </p>
                        </dd>
                    </dl>
                    <dl class="w-full p-4 text-sm flex items-center">
                        <dt class="flex-1 overflow-hidden">
                            <p >Fundos de Resgate Previstos</p>
                            <p>
                                <span >{{ currentUnit.value }}&nbsp;</span>
                                <span class="text-xl text-four">{{ fn(todayBonus) }}</span>
                            </p>
                        </dt>
                    </dl>
                </div>
            </section>
        </pu-card>
        <pu-card theme="3" class="relative">
            <section class="w-full p-px mb-4  ">
                <div class="w-full  text-white  h-[8rem]" :style="{backgroundImage: `url(${RescueImg.img_funditembg})`}"  style="background-size: 100% 100%;">
                    <dl class="w-full px-2 py-3 text-sm flex items-center">
                        <dt class="w-1/2  ml-8">
                            <span class="text-white  align-middle">Perda Passada</span>
                        </dt>
                        <dd class="w-1/2 px-2">
                            <p class="text-right flex justify-end items-center">
                                <span >{{ currentUnit.value }}</span>
                                <span class="text-xl text-four">{{fn(lossAmount)}}</span>
                            </p>
                        </dd>
                    </dl>
                    <dl class="w-full p-4 text-sm flex items-center">
                        <dt class="flex-1 overflow-hidden">
                            <p >Fundos de Resgate Disponíveis</p>
                            <p>
                                <span >{{ currentUnit.value }}&nbsp;</span>
                                <span class="text-xl text-four">{{ fn(waitBonusRef) }}</span>
                            </p>
                        </dt>
                        <dd class="pl-2">
                            <button @click="takeAwardFunc()" :class="waitBonusRef>0&& rescueFundDataRef.can_be_collected?'m2-btn-ten':'m2-btn-false border border-rgbawhite30'" class="h-9 px-4 rounded-[2rem]">
                                <span :class="waitBonusRef>0&& rescueFundDataRef.can_be_collected?'':'opacity-65'">Receber</span>
                            </button>
                        </dd>
                    </dl>
                </div>
            </section>
        </pu-card>
        <pu-card theme="3" class="mt-3 relative">
            <div :style="{backgroundImage: `url(${CommonImg.bg_tableheader})`}" style="background-size: 100% 100%;width: 100%;height: 100%;" class="text-center text-white text-sm font-bold py-2">
                Tabela de Fundos de Resgate
            </div>
            <table class="w-full text-sm text-center">
                <thead class="text-xs">
                    <tr class="text-theme">
                        <td class="border-r-[0.125rem] border-default-bg bg-tablergba40">Nível</td>
                        <td class="border-r-[0.125rem] border-default-bg bg-tablergba40">
                            <span>Perda no Jogo</span>
                        </td>
                        <td class="bg-tablergba40">Taxa de Resgate</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item,index in listRef" :key="index">
                        <tr class="odd:bg-tablergba20 even:bg-tablergba40">
                            <td class="text-theme border-r-[0.1rem] border-default-bg">
                                <span>{{ item.level }}</span>
                            </td>
                            <td class="text-theme border-r-[0.1rem] border-default-bg">
                                <span>{{ currentUnit.value }}</span>
                                <span>≥{{ item.loss }}</span>
                            </td>
                            <td class="text-theme">
                                <span>{{ item.rate }}%</span>
                            </td>
                        </tr>
                    </template>
                    <tr v-if="!listRef.length">
                        <td colspan="3">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>

        <pu-card theme="3" class="mb-3 pt-3" v-if="currentTemplate.value =='template_one'||currentTemplate.value =='template_two'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-four"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center text-four">
                    <span>Descrição da Atividade</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"></em>
            </div>
            <article class="ctx-article p-mb text-sm text-theme" v-html='rescueFundDataRef.content'>
            </article>
        </pu-card>

        <pu-card theme="3" class="mb-3 pt-5 text-box" v-else>
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                    <span>Descrição da Atividade</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
            </div>
            <article class="ctx-article p-mb text-sm text-themetext3"  v-html="rescueFundDataRef.content">
            </article>
        </pu-card>

        </div>
        <div v-if="currentTemplate.value=='template_three'">
            <pu-card theme="3" class="relative">
            <section class="w-full p-px mb-4 ">
                <div class="w-full  h-[8rem] "  :style="{backgroundImage: `url(${RescueImg.img_funditembg})`}"  style="background-size: 100% 100%;">
                    <dl class="w-full px-2 py-3 flex items-center">
                        <dt class="w-1/2 ml-8">
                            <span class="text-themetext1 align-middle">{{ t('activityCenter.CurrentLoss') }}</span>
                        </dt>
                        <dd class="w-1/2 px-2">
                            <p class="text-right text-sm text-white flex justify-end items-center">
                                <span>{{ currentUnit.value }}&nbsp;</span>
                                <span class="text-xl">{{fn(todayLoss)}}</span>
                            </p>
                        </dd>
                    </dl>
                    <dl class="w-full p-4 text-sm flex items-center">
                        <dt class="flex-1 overflow-hidden">
                            <p >{{ t("activityCenter.ProjectedFunds") }}</p>
                            <p>
                                <span >{{ currentUnit.value }}&nbsp;</span>
                                <span class="text-xl">{{ fn(todayBonus) }}</span>
                            </p>
                        </dt>
                    </dl>
                </div>
            </section>
        </pu-card>
        <pu-card theme="3" class="relative">
            <section class="w-full p-px mb-4  ">
                <div class="w-full  text-white  h-[8rem]" :style="{backgroundImage: `url(${RescueImg.img_funditembg})`}"  style="background-size: 100% 100%;">
                    <dl class="w-full px-2 py-3 text-sm flex items-center">
                        <dt class="w-1/2  ml-8">
                            <span class="text-themetext1 align-middle">{{ t("activityCenter.PastLoss") }}</span>
                        </dt>
                        <dd class="w-1/2 px-2">
                            <p class="text-right text-sm flex justify-end items-center">
                                <span >{{ currentUnit.value }}&nbsp;</span>
                                <span class="text-xl ">{{fn(lossAmount)}}</span>
                            </p>
                        </dd>
                    </dl>
                    <dl class="w-full p-4 text-sm flex items-center">
                        <dt class="flex-1 overflow-hidden">
                            <p >{{ t('activityCenter.AvailableFunds') }}</p>
                            <p>
                                <span >{{ currentUnit.value }}&nbsp;</span>
                                <span class="text-xl">{{ fn(waitBonusRef) }}</span>
                            </p>
                        </dt>
                        <dd class="pl-2">
                            <button @click="takeAwardFunc()" :class="waitBonusRef>0&& rescueFundDataRef.can_be_collected?'m3-theme-btn1':'m3-theme-btn3'" class="h-9 px-4 rounded-[2rem]">
                                <span :class="waitBonusRef>0&& rescueFundDataRef.can_be_collected?'':'opacity-65'">{{ t("Receive") }}</span>
                            </button>
                        </dd>
                    </dl>
                </div>
            </section>
        </pu-card>
        <pu-card theme="3" class="mt-3 relative">
            <div :style="{backgroundImage: `url(${CommonImg.bg_tableheader})`}" style="background-size: 100% 100%;width: 100%;height: 100%;" class="text-center text-white text-[0.72rem] font-bold py-2">
                {{ t('activityCenter.RedemptionTable') }}
            </div>
            <table class="w-full text-sm text-center">
                <thead class="text-xs">
                    <tr class="text-themetext1">
                        <td class="border-r-[0.1rem] border-default-bg bg-tablergba40">Nível</td>
                        <td class="border-r-[0.1rem] border-default-bg bg-tablergba40">
                            <span>{{ t("activityCenter.GameLoss") }}</span>
                        </td>
                        <td class="bg-tablergba40">{{ t('activityCenter.RedemptionFee') }}</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item,index in listRef" :key="index">
                        <tr class="odd:bg-tablergba20 even:bg-tablergba40">
                            <td class="text-themetext2 border-r-[0.1rem] border-default-bg">
                                <span>{{ item.level }}</span>
                            </td>
                            <td class="text-themetext2 border-r-[0.1rem] border-default-bg">
                                <span>{{ currentUnit.value }}</span>
                                <span>≥{{ item.loss }}</span>
                            </td>
                            <td class="text-themetext2">
                                <span>{{ item.rate }}%</span>
                            </td>
                        </tr>
                    </template>
                    <tr v-if="!listRef.length">
                        <td colspan="3">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>

        <pu-card theme="3" class="mb-3 pt-3" v-if="currentTemplate.value =='template_one'||currentTemplate.value =='template_two'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-four"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center text-four">
                    <span>Descrição da Atividade</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"></em>
            </div>
            <article class="ctx-article p-mb text-sm text-theme" v-html='rescueFundDataRef.content'>
            </article>
        </pu-card>

        <pu-card theme="3" class="mb-3 pt-5 text-box" v-else>
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                    <span>{{ t("ActivityDescription")  }}</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
            </div>
            <article class="ctx-article p-mb text-sm text-themetext3"  v-html="rescueFundDataRef.content">
            </article>
        </pu-card>

        </div>
        <div v-if="currentTemplate.value=='template_four'">
            <pu-card theme="3" >
            <section class="w-full mb-4 " :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
            style="background-size: 100% 100%;background-repeat: no-repeat;">
                <div class="w-full">
                    <div class="w-full">
                        <dl class="w-full px-3 py-2  text-sm flex items-center">
                            <dt class="w-1/2 flex items-center align-center py-4">
                                <img :src="VipImg.icon_vip" alt="" class="w-[1.5rem] h-[1.5rem] mr-1" />
                                <span class="text-white font-bold ">Perda Atual</span>
                            </dt>
                            <dd class="w-1/2 px-2">
                                <p class="text-right flex justify-end items-center">
                                    <span class="m4-text">{{ currentUnit.value }}</span>
                                    <span class="text-[2rem] font-bold text-themetext0 ml-1">{{fn(todayLoss)}}</span>
                                </p>
                            </dd>
                        </dl>
                        <dl class="w-full  text-sm flex items-center bg-black/20 p-3">
                            <dt class="flex-1 overflow-hidden">
                                <p class="font-bold">Fundos de Resgate Previstos</p>
                                <p class="mt-2">
                                    <span class="m4-text">{{ currentUnit.value }}&nbsp;</span>
                                    <span class="text-[2rem] font-bold text-themetext0 ml-1">{{ fn(todayBonus) }}</span>
                                </p>
                            </dt>
                        </dl>
                    </div>

                </div>
            </section>
        </pu-card>
        <pu-card theme="3" >
            <section class="w-full mb-4 " :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
            style="background-size: 100% 100%;background-repeat: no-repeat;">
                <div class="w-full">
                    <div class="w-full">
                        <dl class="w-full px-3 py-2  text-sm flex items-center">
                            <dt class="w-1/2 flex items-center align-center py-4">
                                <img :src="VipImg.icon_vip" alt="" class="w-[1.5rem] h-[1.5rem] mr-1" />
                                <span class="text-white font-bold ">Perda Passada</span>
                            </dt>
                            <dd class="w-1/2 px-2">
                                <p class="text-right flex justify-end items-center">
                                    <span class="m4-text">{{ currentUnit.value }}</span>
                                    <span class="text-[2rem] font-bold text-themetext0 ml-1">{{fn(lossAmount)}}</span>
                                </p>
                            </dd>
                        </dl>
                        <dl class="w-full  text-sm flex items-center bg-black/20 p-3">
                            <dt class="flex-1 overflow-hidden">
                                <p class="font-bold">Fundos de Resgate Disponíveiss</p>
                                <p class="mt-2">
                                    <span class="m4-text">{{ currentUnit.value }}&nbsp;</span>
                                    <span class="text-[2rem] font-bold text-themetext0 ml-1">{{ fn(waitBonusRef) }}</span>
                                </p>
                            </dt>
                            <dd class="pl-2">
                            <button @click="takeAwardFunc()" :class="waitBonusRef>0 && rescueFundDataRef.can_be_collected?'m4-nine-btn font-bold' : 'bg-theme'" class="h-9 px-4 rounded-[2rem]">
                                <span :class="waitBonusRef>0&& rescueFundDataRef.can_be_collected?'text-theme':'opacity-65'">Receber</span>
                            </button>
                        </dd>
                        </dl>
                    </div>

                </div>
            </section>
        </pu-card>
       
        <pu-card theme="3" class="mt-3 ">
            <div class="bg-tablebg rounded-lg flex items-center justify-start px-2 py-1 mb-3">
                <img :src="RescueImg.img_bounds" alt="" class="w-13 h-10"/>
                <span class="m4-text font-bold text-[0.88rem]">Tabela de Fundos de Resgate</span>
            </div>
            <table class="w-full text-sm text-center bg-tablebg rounded-lg overflow-hidden">
                <thead class="text-xs ">
                    <tr class="m4-text ">
                        <td>Nível</td>
                        <td >Perda no Jogo</td>
                        <td >Taxa de Resgate</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item,index in listRef" :key="index">
                        <tr class="odd:bg-tablebg2 ">
                            <td class="text-body-text/25 ">
                                <span>{{ item.level }}</span>
                            </td>
                            <td>
                                <span class="text-themetext0">{{ currentUnit.value }}</span>
                                <span>≥{{ item.loss }}</span>
                            </td>
                            <td class="text-themetext0">
                                <span>{{ item.rate }}%</span>
                            </td>
                        </tr>
                    </template>
                    <tr v-if="!listRef.length">
                        <td colspan="3">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>
        <pu-card theme="3" class="mb-3 pt-3">
            <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                <span>Descrição da Atividade:</span>
            </h5>
            <article class="p-mb text-sm text-themetext3 ctx-article" v-html='rescueFundDataRef.content'>
            </article>
        </pu-card>
        </div>
       <div v-if="currentTemplate.value=='template_five'">
            <pu-card theme="3" >
            <section class="w-full mb-4 relative z-10" :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
            style="background-size: 100% 100%;background-repeat: no-repeat;">
                <div class="w-full">
                    <div class="w-full">
                        <dl class="w-full px-3 py-2  text-sm flex items-center">
                            <dt class="w-1/2 flex items-center align-center py-4">
                                <img :src="VipImg.icon_vip" alt="" class="w-[1.5rem] h-[1.5rem] mr-1" />
                                <span class="text-white font-bold ">Perda Atual</span>
                            </dt>
                            <dd class="w-1/2 px-2">
                                <p class="text-right flex justify-end items-center">
                                    <span class="text-themetext0">{{ currentUnit.value }}</span>
                                    <span class="text-[2rem] font-bold text-themetext0 ml-1">{{fn(todayLoss)}}</span>
                                </p>
                            </dd>
                        </dl>
                        <dl class="w-full  text-sm flex items-center p-3">
                            <dt class="flex-1 overflow-hidden">
                                <p class="font-bold">Fundos de Resgate Previstos</p>
                                <p class="mt-2">
                                    <span class="text-themetext0">{{ currentUnit.value }}&nbsp;</span>
                                    <span class="text-[2rem] font-bold text-themetext0 ml-1">{{ fn(todayBonus) }}</span>
                                </p>
                            </dt>
                        </dl>
                    </div>

                </div>
            </section>
        </pu-card>
        <pu-card theme="3" >
            <section class="w-full mb-4 " :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
            style="background-size: 100% 100%;background-repeat: no-repeat;">
                <div class="w-full">
                    <div class="w-full">
                        <dl class="w-full px-3 py-2  text-sm flex items-center">
                            <dt class="w-1/2 flex items-center align-center py-4">
                                <img :src="VipImg.icon_vip" alt="" class="w-[1.5rem] h-[1.5rem] mr-1" />
                                <span class="text-white font-bold ">Perda Passada</span>
                            </dt>
                            <dd class="w-1/2 px-2">
                                <p class="text-right flex justify-end items-center">
                                    <span class="text-themetext0">{{ currentUnit.value }}</span>
                                    <span class="text-[2rem] font-bold text-themetext0 ml-1">{{fn(lossAmount)}}</span>
                                </p>
                            </dd>
                        </dl>
                        <dl class="w-full  text-sm flex items-center p-3">
                            <dt class="flex-1 overflow-hidden">
                                <p class="font-bold">Fundos de Resgate Disponíveiss</p>
                                <p class="mt-2">
                                    <span class="text-themetext0">{{ currentUnit.value }}&nbsp;</span>
                                    <span class="text-[2rem] font-bold text-themetext0 ml-1">{{ fn(waitBonusRef) }}</span>
                                </p>
                            </dt>
                            <dd class="pl-2">
                            <button @click="takeAwardFunc()" :class="waitBonusRef>0 && rescueFundDataRef.can_be_collected?'m5-theme-btn1 font-bold' : 'bg-rgbablack30'" class="h-9 px-4 rounded-[2rem]">
                                <span :class="waitBonusRef>0&& rescueFundDataRef.can_be_collected?'text-themewhite':'opacity-65'">Receber</span>
                            </button>
                        </dd>
                        </dl>
                    </div>

                </div>
            </section>
        </pu-card>
       
        <pu-card theme="3" class="mt-3 ">
            <div class="bg-btn1_bg border border-btn_border rounded-lg flex items-center justify-start px-2 py-1 mb-3">
                <img :src="RescueImg.img_bounds" alt="" class="w-13 h-10"/>
                <span class="text-themetext0 font-bold text-[0.88rem]">Tabela de Fundos de Resgate</span>
            </div>
            <table class="w-full text-sm text-center bg-tablebg1 rounded-lg overflow-hidden">
                <thead class="text-xs ">
                    <tr class="text-themethemewhite">
                        <td>Nível</td>
                        <td >Perda no Jogo</td>
                        <td >Taxa de Resgate</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item,index in listRef" :key="index">
                        <tr class="odd:bg-tablebg2 ">
                            <td class="text-themetext3 ">
                                <span>{{ item.level }}</span>
                            </td>
                            <td class="text-themetext3 ">
                                <span>{{ currentUnit.value }}</span>
                                <span>≥{{ item.loss }}</span>
                            </td>
                            <td class="text-themetext0">
                                <span>{{ item.rate }}%</span>
                            </td>
                        </tr>
                    </template>
                    <tr v-if="!listRef.length">
                        <td colspan="3">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>
        <pu-card theme="3" class="mb-3 pt-3">
            <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                <span>Descrição da Atividade:</span>
            </h5>
            <article class="p-mb text-sm text-themetext4 ctx-article" v-html='rescueFundDataRef.content'>
            </article>
        </pu-card>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
<style scoped>
table tr td{
    padding: 0.75rem 0.25rem;
}
</style>