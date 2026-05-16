<script setup>
import { ref } from 'vue'
import { t } from '@/i18n'
import { computed, onMounted } from 'vue'
import { rescueWeekModel } from '@/model/rescue'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const RescueImg = useThemeImages().rescue
const CommonImg = useThemeImages().common
const VipImg = useThemeImages().vip
const AgentImg = useThemeImages().agent
// 创建模型实例
const {
    getWeekInfoFunc, reliefFundsListRef, rescueLastweekRef, rescueThisweekRef, cashBtnFunc, rescueRef
} = rescueWeekModel()

onMounted(() => {
    getWeekInfoFunc()
})
</script>

<template>
    <pu-page :title="t('WeeklyCompensation')" class="z-[999]" hideService>
        <img :src=RescueImg.img_rescueweek class="w-full absolute left-0 ">
        <img :src="CommonImg.m4_null" alt="" v-if="currentTemplate.value == 'template_four'">
        <em class="w-full h-[18rem] block" v-else-if="currentTemplate.value == 'template_five'"></em>
        <em class="w-full h-52 block" v-else></em>
        <!--  -->
        <div v-if="currentTemplate.value == 'template_one'">
            <pu-card theme="3" class="relative mt-[2.125rem]">
                <section class="w-full p-0.5 mb-4 rounded-xl bg-gradient-to-t from-gold-500 to-gold-100">
                    <div
                        class="w-full p-3 text-themeblack rounded-xl bg-gradient-to-r from-linear-11 to-linear-12 overflow-hidden">
                        <p class="mb-4 text-xs text-center mt-2">
                            <span class="opacity-40">Das&nbsp;</span>
                            <span>{{ rescueThisweekRef.start }}&nbsp00:00</span>
                            <span class="opacity-40">&nbsp;às&nbsp;</span>
                            <span>{{ rescueThisweekRef.end }}&nbsp23:59</span>
                        </p>
                        <div
                            class="w-full text-themewhite bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 rounded-xl overflow-hidden">
                            <dl class="w-full px-2 py-3 text-sm bg-rgbawhite10 flex items-center">
                                <dt class="w-1/2 px-2 border-r border-gold-100">
                                    <svg class="w-5 h-5 mr-1 opacity-65 inline-block align-middle" stroke="currentColor"
                                        stroke-width="4" viewBox="0 0 48 48" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M34 12V20V21C31.0449 21 28.3892 22.2818 26.5585 24.3198C24.9678 26.0906 24 28.4323 24 31C24 31.5789 24.0492 32.1463 24.1436 32.6983C24.6579 35.7046 26.5143 38.2529 29.0741 39.7046C26.4116 40.5096 22.8776 41 19 41C10.7157 41 4 38.7614 4 36V28V20V12"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M44 31C44 36.5228 39.5228 41 34 41C32.2091 41 30.5281 40.5292 29.0741 39.7046C26.5143 38.2529 24.6579 35.7046 24.1436 32.6983C24.0492 32.1463 24 31.5789 24 31C24 28.4323 24.9678 26.0906 26.5585 24.3198C28.3892 22.2818 31.0449 21 34 21C39.5228 21 44 25.4772 44 31Z"
                                            fill="none" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M34 12C34 14.7614 27.2843 17 19 17C10.7157 17 4 14.7614 4 12C4 9.23858 10.7157 7 19 7C27.2843 7 34 9.23858 34 12Z"
                                            fill="none" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M4 28C4 30.7614 10.7157 33 19 33C20.807 33 22.5393 32.8935 24.1436 32.6983"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M4 20C4 22.7614 10.7157 25 19 25C21.7563 25 24.339 24.7522 26.5585 24.3198"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M37 28L31 34" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span class="opacity-65 align-middle">{{t('activityCenter.CurrentLoss')}}</span>
                                </dt>
                                <dd class="w-1/2 px-2">
                                    <p class="text-right flex justify-end items-center">
                                        <span class="opacity-65">{{ currentUnit.value }}</span>
                                        <span class="text-xl opacity-85">{{ rescueThisweekRef.loss_amount }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <dl class="w-full p-4 text-sm flex items-center">
                                <dt class="flex-1 overflow-hidden">
                                    <p class="opacity-85">{{ t('activityCenter.ProjectedFunds') }}</p>
                                    <p>
                                        <span class="opacity-65">{{ currentUnit.value }}&nbsp;</span>
                                        <span class="text-xl">{{ rescueThisweekRef.bonus }}</span>
                                    </p>
                                </dt>
                            </dl>
                        </div>

                    </div>
                </section>
            </pu-card>
            <pu-card theme="3" class="relative mt-[1rem]">
                <section class="w-full p-0.5 mb-4 rounded-xl bg-gradient-to-t from-gold-500 to-gold-100">
                    <div
                        class="w-full p-3 text-themeblack rounded-xl bg-gradient-to-r from-linear-11 to-linear-12 overflow-hidden">
                        <p class="mb-4 text-xs text-center mt-2">
                            <span class="opacity-40">Das&nbsp;</span>
                            <span>{{ rescueLastweekRef.start }}&nbsp;00:00</span>
                            <span class="opacity-40">&nbsp;às&nbsp;</span>
                            <span>{{ rescueLastweekRef.end }}&nbsp;23:59</span>
                        </p>
                        <div
                            class="w-full text-themewhite bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 rounded-xl overflow-hidden">
                            <dl class="w-full px-2 py-3 text-sm bg-rgbawhite10 flex items-center">
                                <dt class="w-1/2 px-2 border-r border-gold-100">
                                    <svg class="w-5 h-5 mr-1 opacity-65 inline-block align-middle" stroke="currentColor"
                                        stroke-width="4" viewBox="0 0 48 48" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M34 12V20V21C31.0449 21 28.3892 22.2818 26.5585 24.3198C24.9678 26.0906 24 28.4323 24 31C24 31.5789 24.0492 32.1463 24.1436 32.6983C24.6579 35.7046 26.5143 38.2529 29.0741 39.7046C26.4116 40.5096 22.8776 41 19 41C10.7157 41 4 38.7614 4 36V28V20V12"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M44 31C44 36.5228 39.5228 41 34 41C32.2091 41 30.5281 40.5292 29.0741 39.7046C26.5143 38.2529 24.6579 35.7046 24.1436 32.6983C24.0492 32.1463 24 31.5789 24 31C24 28.4323 24.9678 26.0906 26.5585 24.3198C28.3892 22.2818 31.0449 21 34 21C39.5228 21 44 25.4772 44 31Z"
                                            fill="none" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M34 12C34 14.7614 27.2843 17 19 17C10.7157 17 4 14.7614 4 12C4 9.23858 10.7157 7 19 7C27.2843 7 34 9.23858 34 12Z"
                                            fill="none" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M4 28C4 30.7614 10.7157 33 19 33C20.807 33 22.5393 32.8935 24.1436 32.6983"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M4 20C4 22.7614 10.7157 25 19 25C21.7563 25 24.339 24.7522 26.5585 24.3198"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M37 28L31 34" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span class="opacity-65 align-middle">{{ t('activityCenter.PastLoss') }}</span>
                                </dt>
                                <dd class="w-1/2 px-2">
                                    <p class="text-right flex justify-end items-center">
                                        <span class="opacity-65">{{ currentUnit.value }}</span>
                                        <span class="text-xl opacity-85">{{ rescueLastweekRef.loss_amount }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <dl class="w-full text-sm flex items-center" style="padding: 1rem 0.5rem 1rem 1rem;">
                                <dt class="flex-1 overflow-hidden flex items-center justify-between">
                                    <div class="">
                                        <p class="opacity-85">{{ t('activityCenter.ProjectedFunds') }}</p>
                                        <p>
                                            <span class="opacity-65">{{ currentUnit.value }}&nbsp;</span>
                                            <span class="text-xl">{{ rescueLastweekRef.bonus }}</span>
                                        </p>
                                    </div>

                                    <div class="mt-6 flex justify-center">
                                        <button @click="cashBtnFunc()"
                                            :class="rescueLastweekRef.bonus > 0 && rescueRef.can_be_collected ? 'ctx-theme__linear rounded-xl' : 'bg-rgbawhite10 border border-border1'"
                                            class="h-10 px-3 rounded-xl">
                                            <span
                                                :class="rescueLastweekRef.bonus > 0 && rescueRef.can_be_collected ? '' : 'opacity-65'">{{ t('Receive') }}</span>
                                        </button>
                                    </div>
                                </dt>

                            </dl>
                        </div>

                    </div>
                </section>
            </pu-card>
            <pu-card theme="3" class="mt-3 relative">
                <table class="w-full text-sm text-center table-fixed table-template-one">
                    <thead class="text-xs bg-tablergba40">
                        <tr class="bg-rgbawhite10" style="margin: 0.5rem 0;">
                            <td class=" border-body-bg" style="padding: 0.5rem 0.25rem;">Lucro esta semana</td>
                            <td style="padding: 0.5rem 0.25rem;">Compensação</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="item, index in reliefFundsListRef" :key="index"
                            v-if="reliefFundsListRef.length > 0">
                            <tr class="odd:bg-tablergba20 even:bg-tablergba10 ">
                                <td class="text-rgbawhite50 border-body-bg">
                                    <span>{{ item.loss }}</span>
                                </td>
                                <td class="text-rgbawhite80">
                                    <span>{{ item.rate }}%</span>
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="2">
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
                <article class="ctx-article p-mb text-sm text-rgbawhite50" v-html='rescueRef.content'>
                </article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_two'">
            <pu-card theme="3" class="relative mt-[2.125rem]">
                <section class="w-full p-0.5 mb-4 ">
                    <div class="w-full p-3 text-black h-[8rem] "
                        :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
                        style="background-size: 100% 100%;">
                        <p class="mb-4 text-[0.68rem] text-center -mt-2  text-three ">
                            <span>Das&nbsp;</span>
                            <span>{{ rescueThisweekRef.start }}&nbsp00:00</span>
                            <span>&nbsp;às&nbsp;</span>
                            <span>{{ rescueThisweekRef.end }}&nbsp23:59</span>
                        </p>
                        <div class="w-full   text-three  -mt-6 ">
                            <dl class="w-full  py-3 text-sm flex items-center">
                                <dt class="w-1/2 ml-8">
                                    <span class="text-three  align-middle">Perda Atual</span>
                                </dt>
                                <dd class="w-1/2 px-2">
                                    <p class="text-right flex justify-end items-center">
                                        <span>{{ currentUnit.value }}</span>
                                        <span class="text-xl text-four">{{ rescueThisweekRef.loss_amount }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <dl class="w-full  text-sm flex items-center">
                                <dt class="flex-1 overflow-hidden">
                                    <p class="">Fundos de Resgate Previstos</p>
                                    <p>
                                        <span>{{ currentUnit.value }}&nbsp;</span>
                                        <span class="text-xl text-four">{{ rescueThisweekRef.bonus }}</span>
                                    </p>
                                </dt>
                            </dl>
                        </div>

                    </div>
                </section>
            </pu-card>
            <pu-card theme="3" class="relative mt-[1rem]">
                <section class="w-full p-0.5 mb-4 ">
                    <div class="w-full p-3 h-[8rem]" :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
                        style="background-size: 100% 100%;">
                        <p class="mb-4 text-[0.68rem] text-center -mt-2  text-three ">
                            <span>Das&nbsp;</span>
                            <span>{{ rescueLastweekRef.start }}&nbsp;00:00</span>
                            <span>&nbsp;às&nbsp;</span>
                            <span>{{ rescueLastweekRef.end }}&nbsp;23:59</span>
                        </p>
                        <div class="w-full  text-three ">
                            <dl class="w-full  py-3 text-sm  flex items-center -mt-5">
                                <dt class="w-1/2 ml-8">
                                    <span class="text-three  align-middle">Perda Passada</span>
                                </dt>
                                <dd class="w-1/2 px-2">
                                    <p class="text-right flex justify-end items-center">
                                        <span>{{ currentUnit.value }}</span>
                                        <span class="text-xl text-four">{{ rescueLastweekRef.loss_amount }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <dl class="w-full text-sm flex items-center">
                                <dt class="flex-1 overflow-hidden flex items-center justify-between">
                                    <div>
                                        <p>Fundos de Resgate Disponíveiss</p>
                                        <p>
                                            <span>{{ currentUnit.value }}&nbsp;</span>
                                            <span class="text-xl text-four">{{ rescueLastweekRef.bonus }}</span>
                                        </p>
                                    </div>
                                    <!--  -->
                                    <div class=" flex justify-center">
                                        <button @click="cashBtnFunc()"
                                            :class="rescueLastweekRef.bonus > 0 && rescueRef.can_be_collected ? 'm2-btn-ten' : 'm2-btn-false text-rgbawhite50 border border-rgbawhite30'"
                                            class="h-9 px-4 rounded-[2rem] ">
                                            <span
                                                :class="rescueLastweekRef.bonus > 0 && rescueRef.can_be_collected ? '' : 'opacity-65'">Receber</span>
                                        </button>
                                    </div>
                                </dt>

                            </dl>
                        </div>

                    </div>
                </section>
            </pu-card>
            <pu-card theme="3" class="mt-3 relative">
                <div :style="{ backgroundImage: `url(${CommonImg.bg_tableheader})` }"
                    style="background-size: 100% 100%;width: 100%;height: 100%;"
                    class="text-center text-white text-sm font-bold py-2">
                    Tabela de Referência de Rebate
                </div>
                <table class="w-full text-sm text-center table-fixed table-template-two">
                    <thead class="text-xs">
                        <tr class="text-three" style="margin: 0.5rem 0;">
                            <td class="border-border1 bg-tablergba40">Lucro esta semana</td>
                            <td class="bg-tablergba40">Compensação</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="item, index in reliefFundsListRef" :key="index"
                            v-if="reliefFundsListRef.length > 0">
                            <tr class="odd:bg-tablergba20 even:bg-tablergba40 text-theme ">
                                <td class="text-themefont border-border1">
                                    <span>{{ item.loss }}</span>
                                </td>
                                <td class="text-themefont">
                                    <span>{{ item.rate }}%</span>
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="2">
                                <pu-no-data></pu-no-data>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-four"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-four">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-theme" v-html='rescueRef.content'>
                </article>
            </pu-card>
        </div>

        <div v-if="currentTemplate.value == 'template_three'">
            <pu-card theme="3" class="relative mt-[2.125rem]">
                <section class="w-full p-0.5 mb-4 ">
                    <div class="w-full p-3 h-[8rem] " :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
                        style="background-size: 100% 100%;">
                        <p class="mb-4 text-[0.68rem] text-center -mt-2 ">
                            <span class="text-themetext1">{{ t('From') }}&nbsp;</span>
                            <span>{{ rescueThisweekRef.start }}&nbsp00:00</span>
                            <span class="text-themetext1">&nbsp;{{ t('to') }}&nbsp;</span>
                            <span>{{ rescueThisweekRef.end }}&nbsp23:59</span>
                        </p>
                        <div class="w-full -mt-6 ">
                            <dl class="w-full  py-3 text-sm flex items-center">
                                <dt class="w-1/2 ml-8">
                                    <span class="text-themetext1 align-middle">{{ t('activityCenter.PastLoss') }}</span>
                                </dt>
                                <dd class="w-1/2 px-2">
                                    <p class="text-right">
                                        <span>{{ currentUnit.value }}&nbsp</span>
                                        <span class="text-xl">{{ rescueThisweekRef.loss_amount }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <dl class="w-full  text-sm flex items-center">
                                <dt class="flex-1 overflow-hidden">
                                    <p class="">{{ t('activityCenter.ProjectedFunds') }}</p>
                                    <p>
                                        <span>{{ currentUnit.value }}&nbsp;</span>
                                        <span class="text-xl">{{ rescueThisweekRef.bonus }}</span>
                                    </p>
                                </dt>
                            </dl>
                        </div>

                    </div>
                </section>
            </pu-card>
            <pu-card theme="3" class="relative mt-[1rem]">
                <section class="w-full p-0.5 mb-4 ">
                    <div class="w-full p-3 h-[8rem]" :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
                        style="background-size: 100% 100%;">
                        <p class="mb-4 text-[0.68rem] text-center -mt-2">
                            <span class="text-themetext1">{{ t('From') }}&nbsp;</span>
                            <span>{{ rescueLastweekRef.start }}&nbsp;00:00</span>
                            <span class="text-themetext1">&nbsp; {{ t('to') }} &nbsp;</span>
                            <span>{{ rescueLastweekRef.end }}&nbsp;23:59</span>
                        </p>
                        <div class="w-full  text-three ">
                            <dl class="w-full  py-3 text-sm  flex items-center -mt-5">
                                <dt class="w-1/2 ml-8">
                                    <span class="text-themetext1  align-middle">{{ t('activityCenter.PastLoss') }}</span>
                                </dt>
                                <dd class="w-1/2 px-2">
                                    <p class="text-right">
                                        <span>{{ currentUnit.value }}&nbsp</span>
                                        <span class="text-xl ">{{ rescueLastweekRef.loss_amount }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <dl class="w-full text-sm flex items-center">
                                <dt class="flex-1 overflow-hidden flex items-center justify-between">
                                    <div>
                                        <p>{{ t('activityCenter.ProjectedFunds') }}</p>
                                        <p>
                                            <span>{{ currentUnit.value }}&nbsp;</span>
                                            <span class="text-xl">{{ rescueLastweekRef.bonus }}</span>
                                        </p>
                                    </div>
                                    <!--  -->
                                    <div class=" flex justify-center">
                                        <button @click="cashBtnFunc()"
                                            :class="rescueLastweekRef.bonus > 0 && rescueRef.can_be_collected ? 'm3-theme-btn1' : 'm3-theme-btn3'"
                                            class="h-9 px-4 rounded-[2rem] ">
                                            <span
                                                :class="rescueLastweekRef.bonus > 0 && rescueRef.can_be_collected ? '' : 'opacity-65'">{{ t('Receive') }}</span>
                                        </button>
                                    </div>
                                </dt>

                            </dl>
                        </div>

                    </div>
                </section>
            </pu-card>
            <pu-card theme="3" class="mt-3 relative">
                <div :style="{ backgroundImage: `url(${CommonImg.bg_tableheader})` }"
                    style="background-size: 100% 100%;width: 100%;height: 100%;"
                    class="text-center text-white text-[0.72rem] font-bold py-2">
                    Tabela de Referência de Rebate
                </div>
                <table class="w-full text-sm text-center table-fixed table-template-two">
                    <thead class="text-xs">
                        <tr class="text-themetext1" style="margin: 0.5rem 0;">
                            <td class="border-border1 bg-tablergba40">{{ t('activityCenter.Profitweek') }}</td>
                            <td class="bg-tablergba40">{{ t('activityCenter.Compensation') }}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="item, index in reliefFundsListRef" :key="index"
                            v-if="reliefFundsListRef.length > 0">
                            <tr class="odd:bg-tablergba20 even:bg-tablergba40 text-themetext2">
                                <td class="text-themefont border-border1">
                                    <span>{{ item.loss }}</span>
                                </td>
                                <td class="text-themefont">
                                    <span>{{ item.rate }}%</span>
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="2">
                                <pu-no-data></pu-no-data>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                        <span>{{ t('ActivityDescription') }}</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-themetext3" v-html='rescueRef.content'>
                </article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_four'">
            <pu-card theme="3">
                <section class="w-full mb-8 relative" :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
                    style="background-size: 100% 100%;background-repeat: no-repeat;">
                    <div
                        class="w-[80%] text-[0.68rem] text-center rounded-full py-1 text-white flex items-center justify-center bg-tablebg absolute top-[-0.8rem] left-[10%] right-0">
                        <img :src="AgentImg.icon_date" class="w-[0.8rem] h-[0.8rem] mr-2" />
                        <span class="m4-text">Das&nbsp;</span>
                        <span>{{ rescueLastweekRef.start }}&nbsp00:00</span>
                        <span class="m4-text">&nbsp;às&nbsp;</span>
                        <span>{{ rescueLastweekRef.end }}&nbsp23:59</span>
                    </div>
                    <div class="w-full">

                        <div class="w-full">
                            <dl class="w-full px-3  text-sm flex items-center">
                                <dt class="w-1/2 flex items-center align-center py-4">
                                    <img :src="VipImg.icon_vip" alt="" class="w-[1.5rem] h-[1.5rem] mr-1" />
                                    <span class="text-white font-bold ">Perda Atual</span>
                                </dt>
                                <dd class="w-1/2 px-2">
                                    <p class="text-right flex justify-end items-center">
                                        <span class="m4-text">{{ currentUnit.value }}</span>
                                        <span class="text-[2rem] font-bold text-themetext0 ml-1">{{
                                            rescueThisweekRef.loss_amount }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <dl class="w-full  text-sm flex items-center bg-black/20 p-3">
                                <dt class="flex-1 overflow-hidden">
                                    <p class="font-bold">Fundos de Resgate Previstos</p>
                                    <p class="mt-2">
                                        <span class="m4-text font-bold">{{ currentUnit.value }}&nbsp;</span>
                                        <span class="text-[2rem] font-bold text-themetext0 ml-1">{{
                                            rescueThisweekRef.bonus
                                            }}</span>
                                    </p>
                                </dt>
                            </dl>

                        </div>

                    </div>
                </section>
            </pu-card>
            <pu-card theme="3">
                <section class="w-full mb-4  relative" :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
                    style="background-size: 100% 100%;background-repeat: no-repeat;">
                    <div
                        class="w-[80%] text-[0.68rem] text-center rounded-full py-1 text-white flex items-center justify-center bg-tablebg absolute top-[-0.8rem] left-[10%] right-0">
                        <img :src="AgentImg.icon_date" class="w-[0.8rem] h-[0.8rem] mr-2" />
                        <span class="m4-text">Das&nbsp;</span>
                        <span>{{ rescueThisweekRef.start }}&nbsp00:00</span>
                        <span class="m4-text">&nbsp;às&nbsp;</span>
                        <span>{{ rescueThisweekRef.end }}&nbsp23:59</span>
                    </div>
                    <div class="w-full">
                        <div class="w-full">
                            <dl class="w-full px-3  text-sm flex items-center">
                                <dt class="w-1/2 flex items-center align-center py-4">
                                    <img :src="VipImg.icon_vip" alt="" class="w-[1.5rem] h-[1.5rem] mr-1" />
                                    <span class="text-white font-bold ">Perda Passada</span>
                                </dt>
                                <dd class="w-1/2 px-2">
                                    <p class="text-right flex justify-end items-center">
                                        <span class="m4-text ">{{ currentUnit.value }}</span>
                                        <span class="text-[2rem] font-bold text-themetext0 ml-1">{{
                                            rescueLastweekRef.loss_amount }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <dl class="w-full  text-sm flex items-center bg-black/20 p-3">
                                <dt class="flex-1 flex items-center justify-between">
                                    <div>
                                        <p class="font-bold">Fundos de Resgate Disponíveis</p>
                                        <p class="mt-2">
                                            <span class="m4-text font-bold">{{ currentUnit.value }}&nbsp;</span>
                                            <span class="text-[2rem] font-bold text-themetext0 ml-1">{{
                                                rescueLastweekRef.bonus
                                                }}</span>
                                        </p>
                                    </div>
                                    <div class=" flex justify-center">
                                        <button @click="cashBtnFunc()"
                                            :class="rescueLastweekRef.bonus > 0 && rescueRef.can_be_collected ? 'm4-nine-btn font-bold ' : 'bg-theme'"
                                            class="h-9 px-4 rounded-[2rem] ">
                                            <span
                                                :class="rescueLastweekRef.bonus > 0 && rescueRef.can_be_collected ? '' : 'opacity-20'">Receber</span>
                                        </button>
                                    </div>

                                </dt>
                            </dl>
                        </div>

                    </div>
                </section>
            </pu-card>

            <pu-card theme="3" class="mt-3 ">
                <table
                    class="w-full text-sm text-center bg-tablebg table-fixed rounded-lg overflow-hidden table-tempalte-four">
                    <thead class="text-xs py-2">
                        <tr class="bg-tablebg ">
                            <td class="m4-text ">Lucro esta semana</td>
                            <td class="m4-text">Compensação</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="item, index in reliefFundsListRef" :key="index"
                            v-if="reliefFundsListRef.length > 0">
                            <tr class="odd:bg-black/20 ">
                                <td class="text-themewhite ">
                                    <span>{{ item.loss }}</span>
                                </td>
                                <td class="text-themetext0">
                                    <span>{{ item.rate }}%</span>
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="2">
                                <pu-no-data></pu-no-data>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3  w-full ">
                <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                    <span>Descrição da Atividade:</span>
                </h5>
                <article class="p-mb text-sm text-themetext3 w-full ctx-article" v-html='rescueRef.content'>

                </article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_five'">
            <pu-card theme="3">
                <section class="w-full mb-8 relative" :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
                    style="background-size: 100% 100%;background-repeat: no-repeat;">
                    <div
                        class="w-[80%] text-[0.68rem] text-center rounded-full py-1 text-white flex items-center justify-center bg-btn1_bg absolute top-[-0.8rem] left-[10%] right-0">
                        <img :src="AgentImg.icon_date" class="w-[0.8rem] h-[0.8rem] mr-2" />
                        <span class="text-themetext4 font-bold">Das&nbsp;</span>
                        <span class="font-bold">{{ rescueLastweekRef.start }}&nbsp00:00</span>
                        <span class="text-themetext4 font-bold">&nbsp;às&nbsp;</span>
                        <span class="font-bold">{{ rescueLastweekRef.end }}&nbsp23:59</span>
                    </div>
                    <div class="w-full">

                        <div class="w-full">
                            <dl class="w-full px-3  text-sm flex items-center">
                                <dt class="w-1/2 flex items-center align-center py-4">
                                    <img :src="VipImg.icon_vip" alt="" class="w-[1.5rem] h-[1.5rem] mr-1" />
                                    <span class="text-white font-bold mt-1">Perda Atual</span>
                                </dt>
                                <dd class="w-1/2 px-2">
                                    <p class="text-right flex justify-end items-center">
                                        <span class="text-themetext0">{{ currentUnit.value }}</span>
                                        <span class="text-[2rem] font-bold text-themetext0 ml-1">{{
                                            rescueThisweekRef.loss_amount }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <dl class="w-full  text-sm flex items-center p-3">
                                <dt class="flex-1 overflow-hidden">
                                    <p class="font-bold">Fundos de Resgate Previstos</p>
                                    <p class="mt-2">
                                        <span class="text-themetext0 font-bold">{{ currentUnit.value }}&nbsp;</span>
                                        <span class="text-[2rem] font-bold text-themetext0 ml-1">{{
                                            rescueThisweekRef.bonus
                                            }}</span>
                                    </p>
                                </dt>
                            </dl>

                        </div>

                    </div>
                </section>
            </pu-card>
            <pu-card theme="3">
                <section class="w-full mb-4  relative" :style="{ backgroundImage: `url(${RescueImg.img_weekitembg})` }"
                    style="background-size: 100% 100%;background-repeat: no-repeat;">
                    <div
                        class="w-[80%] text-[0.68rem] text-center rounded-full py-1 text-white flex items-center justify-center bg-btn1_bg absolute top-[-0.8rem] left-[10%] right-0">
                        <img :src="AgentImg.icon_date" class="w-[0.8rem] h-[0.8rem] mr-2" />
                        <span class="text-themetext4 font-bold">Das&nbsp;</span>
                        <span>{{ rescueThisweekRef.start }}&nbsp00:00</span>
                        <span class="text-themetext4 font-bold">&nbsp;às&nbsp;</span>
                        <span>{{ rescueThisweekRef.end }}&nbsp23:59</span>
                    </div>
                    <div class="w-full">
                        <div class="w-full">
                            <dl class="w-full px-3  text-sm flex items-center">
                                <dt class="w-1/2 flex items-center align-center py-4">
                                    <img :src="VipImg.icon_vip" alt="" class="w-[1.5rem] h-[1.5rem] mr-1" />
                                    <span class="text-white font-bold mt-1">Perda Passada</span>
                                </dt>
                                <dd class="w-1/2 px-2">
                                    <p class="text-right flex justify-end items-center">
                                        <span class="text-themetext0 ">{{ currentUnit.value }}</span>
                                        <span class="text-[2rem] font-bold text-themetext0 ml-1">{{
                                            rescueLastweekRef.loss_amount }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <dl class="w-full  text-sm flex items-center p-3">
                                <dt class="flex-1 flex items-center justify-between">
                                    <div>
                                        <p class="font-bold">Fundos de Resgate Disponíveis</p>
                                        <p class="mt-2">
                                            <span class="m4-text font-bold text-themetext0">{{ currentUnit.value }}&nbsp;</span>
                                            <span class="text-[2rem] font-bold text-themetext0 ml-1">{{
                                                rescueLastweekRef.bonus
                                                }}</span>
                                        </p>
                                    </div>
                                    <div class=" flex justify-center">
                                        <button @click="cashBtnFunc()"
                                            :class="rescueLastweekRef.bonus > 0 && rescueRef.can_be_collected ? 'm5-theme-btn1 font-bold ' : 'bg-rgbablack50'"
                                            class="h-9 px-4 rounded-[2rem] ">
                                            <span
                                                :class="rescueLastweekRef.bonus > 0 && rescueRef.can_be_collected ? '' : 'opacity-40'">Receber</span>
                                        </button>
                                    </div>

                                </dt>
                            </dl>
                        </div>

                    </div>
                </section>
            </pu-card>

            <pu-card theme="3" class="mt-3 ">
                <table
                    class="w-full text-sm text-center table-fixed rounded-lg overflow-hidden table-tempalte-four">
                    <thead class="text-xs py-2">
                        <tr class="bg-tablebg1 text-themewhite">
                            <td>Lucro esta semana</td>
                            <td>Compensação</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="item, index in reliefFundsListRef" :key="index"
                            v-if="reliefFundsListRef.length > 0">
                            <tr class="odd:bg-tablebg2 even:bg-tablebg1 ">
                                <td class="text-themewhite ">
                                    <span>{{ item.loss }}</span>
                                </td>
                                <td class="text-themetext0">
                                    <span>{{ item.rate }}%</span>
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="2">
                                <pu-no-data></pu-no-data>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3  w-full ">
                <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                    <span>Descrição da Atividade:</span>
                </h5>
                <article class="p-mb text-sm text-themetext4 w-full ctx-article" v-html='rescueRef.content'>

                </article>
            </pu-card>
        </div>


        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
<style scoped>
.table-template-one {
    border-spacing: 0.25rem;
    border-collapse: separate;
}

.table-template-one tr td {
    padding: 0.2rem 0.25rem;
    border-radius: 0.3rem;
}

/* template_two 样式 */
.table-template-two {
    /* 可以覆盖默认样式或添加新样式 */
    border-spacing: 0.1rem;
    border-collapse: separate;
}

.table-template-two tr td {
    padding: 0.35rem;
}

.table-tempalte-four tr td {
    padding: 0.66rem;
    border-radius: none !important;
}
</style>
