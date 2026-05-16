<script setup>
import { onMounted } from 'vue'
import { t, fn } from '@/i18n'
import { resetTimeFunc } from '@/utils/core'
import { vipModel } from '@/model/vip'

const { hashLoadingRef, finishedRef, bonusLogsRef, bonusLogsFunc } = vipModel()

onMounted(()=> {
    bonusLogsFunc(true)
})
// 升级 0
// 周 1
// 月 2
</script>

<template>
    <pu-page title="Registro de Envio de Bônus" class="z-[999]" v-if="currentTemplate.value=='template_four'">
        <pu-card theme="3" class="py-4">
            <van-list v-model:loading="hashLoadingRef" :finished="finishedRef" @load="bonusLogsFunc(false)" loading-text="loading..." finished-text="">
                <table class="w-full text-sm text-center rounded-xl overflow-hidden">
                    <thead>
                        <tr class=" bg-tablebg">
                            <td colspan="3" class="!px-4 text-left">
                                <svg class="w-5 h-5 mr-2 opacity-45 inline-block align-middle" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 31C44 36.5228 39.5228 41 34 41C32.2091 41 30.5281 40.5292 29.0741 39.7046C26.5143 38.2529 24.6579 35.7046 24.1436 32.6983C24.0492 32.1463 24 31.5789 24 31C24 28.4323 24.9678 26.0906 26.5585 24.3198C28.3892 22.2818 31.0449 21 34 21C39.5228 21 44 25.4772 44 31Z" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M34 12V20V21C31.0449 21 28.3892 22.2818 26.5585 24.3198C24.9678 26.0906 24 28.4323 24 31C24 31.5789 24.0492 32.1463 24.1436 32.6983C24.6579 35.7046 26.5143 38.2529 29.0741 39.7046C26.4116 40.5096 22.8776 41 19 41C10.7157 41 4 38.7614 4 36V28V20V12" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M34 12C34 14.7614 27.2843 17 19 17C10.7157 17 4 14.7614 4 12C4 9.23858 10.7157 7 19 7C27.2843 7 34 9.23858 34 12Z" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 28C4 30.7614 10.7157 33 19 33C20.807 33 22.5393 32.8935 24.1436 32.6983" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 20C4 22.7614 10.7157 25 19 25C21.7563 25 24.339 24.7522 26.5585 24.3198" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M39 31L35 27M39 31L35 35M39 31L29 31" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="opacity-65 align-middle">{{  t('userCenter.CollectionRegistration')  }}</span>
                            </td>
                        </tr>
                        <tr class="bg-tablebg">
                            <td>{{  t('userCenter.Timecollection')  }}</td>
                            <td>{{  t('userCenter.Events')  }}</td>
                            <td>{{  t('userCenter.Money')  }}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="item,index in bonusLogsRef" :key="index">
                            <tr class="bg-tablebg2">
                                <td>{{ resetTimeFunc(item.updated_at) }}</td>
                                <td>
                                    <span v-if="item.bonus_type==0">Upgrade</span>
                                    <span v-if="item.bonus_type==1">Week</span>
                                    <span v-if="item.bonus_type==2">Mês</span>
                                </td>
                                <td>{{ fn(item.bonus) }}</td>
                            </tr>
                        </template>
                        <tr v-if="!bonusLogsRef.length&&!hashLoadingRef">
                            <td colspan="3">
                                <pu-no-data></pu-no-data>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </van-list>
        </pu-card>
    </pu-page>
    <pu-page title="Registro de Envio de Bônus" class="z-[999]" v-else-if="currentTemplate.value=='template_five'">
        <pu-card theme="3" class="py-4">
            <van-list v-model:loading="hashLoadingRef" :finished="finishedRef" @load="bonusLogsFunc(false)" loading-text="loading..." finished-text="">
                <table class="w-full text-sm text-center rounded-xl overflow-hidden">
                    <thead>
                        <tr class=" bg-gradient-to-r from-tablebg1 to-tablebg2">
                            <td colspan="3" class="!px-4 text-left">
                                <svg class="w-5 h-5 mr-2 opacity-45 inline-block align-middle" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 31C44 36.5228 39.5228 41 34 41C32.2091 41 30.5281 40.5292 29.0741 39.7046C26.5143 38.2529 24.6579 35.7046 24.1436 32.6983C24.0492 32.1463 24 31.5789 24 31C24 28.4323 24.9678 26.0906 26.5585 24.3198C28.3892 22.2818 31.0449 21 34 21C39.5228 21 44 25.4772 44 31Z" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M34 12V20V21C31.0449 21 28.3892 22.2818 26.5585 24.3198C24.9678 26.0906 24 28.4323 24 31C24 31.5789 24.0492 32.1463 24.1436 32.6983C24.6579 35.7046 26.5143 38.2529 29.0741 39.7046C26.4116 40.5096 22.8776 41 19 41C10.7157 41 4 38.7614 4 36V28V20V12" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M34 12C34 14.7614 27.2843 17 19 17C10.7157 17 4 14.7614 4 12C4 9.23858 10.7157 7 19 7C27.2843 7 34 9.23858 34 12Z" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 28C4 30.7614 10.7157 33 19 33C20.807 33 22.5393 32.8935 24.1436 32.6983" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 20C4 22.7614 10.7157 25 19 25C21.7563 25 24.339 24.7522 26.5585 24.3198" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M39 31L35 27M39 31L35 35M39 31L29 31" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="text-themewhite align-middle">Registro da Coleção</span>
                            </td>
                        </tr>
                        <tr class="bg-tablebg1">
                            <td>Tempo de recolha</td>
                            <td>Evento</td>
                            <td>Dinheiro</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="item,index in bonusLogsRef" :key="index">
                            <tr class="add:bg-tablebg1 even:bg-tablebg2" >
                                <td>{{ resetTimeFunc(item.updated_at) }}</td>
                                <td>
                                    <span v-if="item.bonus_type==0">Upgrade</span>
                                    <span v-if="item.bonus_type==1">Week</span>
                                    <span v-if="item.bonus_type==2">Mês</span>
                                </td>
                                <td>{{ fn(item.bonus) }}</td>
                            </tr>
                        </template>
                        <tr v-if="!bonusLogsRef.length&&!hashLoadingRef">
                            <td colspan="3">
                                <pu-no-data></pu-no-data>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </van-list>
        </pu-card>
    </pu-page>
    <pu-page :title="t('pageTitle.ShipmentLog')" class="z-[999]" v-else>
        <pu-card theme="3" class="py-4">
            <van-list v-model:loading="hashLoadingRef" :finished="finishedRef" @load="bonusLogsFunc(false)" loading-text="loading..." finished-text="">
                <table class="w-full text-sm text-center rounded-xl overflow-hidden">
                    <thead>
                        <tr class=" bg-gradient-to-r from-rgbawhite30 to-transparent">
                            <td colspan="3" class="!px-4 text-left">
                                <svg class="w-5 h-5 mr-2 opacity-45 inline-block align-middle" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 31C44 36.5228 39.5228 41 34 41C32.2091 41 30.5281 40.5292 29.0741 39.7046C26.5143 38.2529 24.6579 35.7046 24.1436 32.6983C24.0492 32.1463 24 31.5789 24 31C24 28.4323 24.9678 26.0906 26.5585 24.3198C28.3892 22.2818 31.0449 21 34 21C39.5228 21 44 25.4772 44 31Z" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M34 12V20V21C31.0449 21 28.3892 22.2818 26.5585 24.3198C24.9678 26.0906 24 28.4323 24 31C24 31.5789 24.0492 32.1463 24.1436 32.6983C24.6579 35.7046 26.5143 38.2529 29.0741 39.7046C26.4116 40.5096 22.8776 41 19 41C10.7157 41 4 38.7614 4 36V28V20V12" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M34 12C34 14.7614 27.2843 17 19 17C10.7157 17 4 14.7614 4 12C4 9.23858 10.7157 7 19 7C27.2843 7 34 9.23858 34 12Z" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 28C4 30.7614 10.7157 33 19 33C20.807 33 22.5393 32.8935 24.1436 32.6983" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 20C4 22.7614 10.7157 25 19 25C21.7563 25 24.339 24.7522 26.5585 24.3198" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M39 31L35 27M39 31L35 35M39 31L29 31" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="opacity-65 align-middle">{{  t('userCenter.CollectionRegistration')  }}</span>
                            </td>
                        </tr>
                        <tr class="bg-rgbawhite10">
                            <td>{{  t('userCenter.Timecollection')  }}</td>
                            <td>{{  t('userCenter.Events')  }}</td>
                            <td>{{  t('userCenter.Money')  }}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="item,index in bonusLogsRef" :key="index">
                            <tr class="bg-rgbawhite10">
                                <td>{{ resetTimeFunc(item.updated_at) }}</td>
                                <td>
                                    <span v-if="item.bonus_type==0">{{ t("userCenter.Upgrade") }}</span>
                                    <span v-if="item.bonus_type==1">{{ t('userCenter.week') }}</span>
                                    <span v-if="item.bonus_type==2">{{ t('userCenter.Month') }}</span>
                                </td>
                                <td>{{ fn(item.bonus) }}</td>
                            </tr>
                        </template>
                        <tr v-if="!bonusLogsRef.length&&!hashLoadingRef">
                            <td colspan="3">
                                <pu-no-data></pu-no-data>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </van-list>
        </pu-card>
    </pu-page>
    
    
</template>
<style scoped>
table tr td{
    padding: 0.75rem 0.25rem;
}
</style>