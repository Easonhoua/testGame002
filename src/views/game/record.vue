<script setup>
import { onMounted, ref } from 'vue'
import { t, fn } from '@/i18n'
import { resetTimeFunc } from '@/utils/core'
import { gameModel,gameClickRef,logTypeRef} from '@/model/game'
import { useRouter } from 'vue-router'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
import { useThemeImages } from '@/utils/themeimg'
const CommonBgImg = useThemeImages().commonbg
const CommonImg = useThemeImages().common
const { hashLoadingRef, finishedRef, gameLogsRef,gameLogsFunc, betAllRef, betTotalRef, winTotalRef} = gameModel()
const router = useRouter()

onMounted(()=> {
    gameLogsFunc(true)
})

const time_list = ref([
    {label: '3 '+t('account.hours'), value: 1},
    {label: '12 '+t('account.hours'), value: 2},
    {label: '24 '+t('account.hours'), value: 3},
    {label: '48 '+t('account.hours'), value: 4},
    {label: '7 '+t('account.days'), value: 5},
])
// let time_index = ref(0)

function onClickGameRecord(item) {
    if(item){
        gameClickRef.value = item
        //跳转游戏详情
        router.push('/game/recordgame')
    }
}

</script>

<template>
    <pu-page :title="t('pageTitle.GameRegistration')" class="z-[999]" hideService :style="currentTemplate.value!='template_four'?{background: `url(${CommonBgImg.bg_body_1}) center` }:{background: `var(--color-theme)`}" style="background-size: cover;">
        <pu-card theme="4" class="text-xs mt-4">
            <van-tabs v-model:active="logTypeRef" v-if="currentTemplate.value=='template_one'" @click-tab="gameLogsFunc(true)" shrink style="--van-tabs-line-height: 2rem;--van-tabs-bottom-bar-height: 0px;--van-tabs-bottom-bar-color: var(--color-three);--van-padding-xs: 0.25rem;">
                <template v-for="item,index in time_list" :key="index">
                    <van-tab :name="item.value">
                        <template #title>
                            <div :class="item.value==logTypeRef?'ctx-theme':'bg-rgbawhite10 text-rgbawhite50'" class="h-8 px-3 rounded-lg flex items-center">
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                    </van-tab>
                </template>
            </van-tabs>
            <van-tabs v-model:active="logTypeRef" v-if="currentTemplate.value=='template_two'" @click-tab="gameLogsFunc(true)" shrink style="--van-tabs-line-height: 2rem;--van-tabs-bottom-bar-height: 0px;--van-tabs-bottom-bar-color: var(--color-three);--van-padding-xs: 0.25rem;">
                <template v-for="item,index in time_list" :key="index">
                    <van-tab :name="item.value">
                        <template #title>
                            <div :class="item.value==logTypeRef?'ctx-theme__linear':'bg-tablergba40 text-theme'" class="h-8 px-3 rounded-lg flex items-center">
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                    </van-tab>
                </template>
            </van-tabs>
            <van-tabs v-model:active="logTypeRef" v-if="currentTemplate.value=='template_three'" @click-tab="gameLogsFunc(true)" shrink style="--van-tabs-line-height: 2rem;--van-tabs-bottom-bar-height: 0px;--van-tabs-bottom-bar-color: var(--color-three);--van-padding-xs: 0.25rem;">
                <template v-for="item,index in time_list" :key="index">
                    <van-tab :name="item.value">
                        <template #title>
                            <div :class="item.value==logTypeRef?'m3-theme-btn1':'bg-rgbawhite10 text-themetext1'" class="h-8 px-3 rounded-lg flex items-center">
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                    </van-tab>
                </template>
            </van-tabs>
            <van-tabs v-model:active="logTypeRef" v-if="currentTemplate.value=='template_four'" @click-tab="gameLogsFunc(true)" shrink style="--van-tabs-line-height: 2rem;--van-tabs-bottom-bar-height: 0px;--van-tabs-bottom-bar-color: #FFAF00;--van-padding-xs: 0.25rem;">
                <template v-for="item,index in time_list" :key="index">
                    <van-tab :name="item.value">
                        <template #title>
                            <div :class="item.value==logTypeRef?'m4-ten-btn':'bg-tablebg'" class="h-8 px-3 rounded-lg flex items-center">
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                    </van-tab>
                </template>
            </van-tabs>
            <div class="tabClass" v-if="currentTemplate.value=='template_five'">
            <van-tabs class="mt-4 " v-model:active="logTypeRef"  @click-tab="gameLogsFunc(true)" shrink style="--van-tabs-line-height: 2rem;--van-tabs-bottom-bar-height: 0px;--van-tabs-bottom-bar-color: #FFAF00;--van-padding-xs: 0;">
                <template v-for="item,index in time_list" :key="index">
                    <van-tab :name="item.value">
                        <template #title>
                            <div :class="item.value==logTypeRef?'text-inputborder border-b-2 border-inputborder relative bottom-0 z-[100]' : 'border-b-2 border-rgbawhite30 '" class="h-8 px-3 flex items-center font-bold">
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                    </van-tab>
                </template>
            </van-tabs>
            </div>
        </pu-card>
        <pu-card theme="3" class="mt-4" v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'||currentTemplate.value=='template_three'">
            <section class="w-full px-4 py-3 text-xs !leading-normal text-rgbawhite50 border border-rgbawhite10 rounded-xl bg-gradient-to-b from-rgbawhite10 to-transparent">
                <p class='text-themetext2'>
                    <span>{{ t('activityCenter.Datalatest') }} {{ time_list.find(item => item.value === logTypeRef)?.label || '3 ' +t('account.hours') }}</span>
                </p>
                <p>
                    <span class='text-themetext2'>{{ t('Bet') }} {{ betAllRef}} {{ t('times') }}: </span>
                    <span class="text-themetext0">{{betTotalRef}}</span>
                </p>
                <p>
                    <span class="text-themetext2">{{ t("activityCenter.Winorlose") }}: </span>
                    <span class="text-themetext0">{{fn(winTotalRef-betTotalRef)}}</span>
                </p>
            </section>
        </pu-card>
        <pu-card theme="3" class="mt-4" v-if="currentTemplate.value=='template_four'">
            <section class="w-full px-4 py-3 text-xs !leading-normal text-themefont border border-rgbawhite10 rounded-xl bg-gradient-to-b from-rgbawhite10 to-transparent">
                <p>
                    <span class="m4-text">Dados das últimas {{ time_list.find(item => item.value === logTypeRef)?.label || '3 horas' }}</span>
                </p>
                <p>
                    <span>Apostar {{ betAllRef}} vezes: </span>
                    <span class="text-themetext3">{{betTotalRef}}</span>
                </p>
                <p>
                    <span>Ganhar ou perder: </span>
                    <span class="text-themetext3">{{fn(winTotalRef-betTotalRef)}}</span>
                </p>
            </section>
        </pu-card>
        <pu-card theme="3" class="mt-4" v-if="currentTemplate.value=='template_five'">
            <section class="w-full px-4 py-3 text-xs !leading-normal text-themefont border border-thirsmodelboder rounded-xl bg-gradient-to-r from-thirsmodel1 to-thirsmodel2">
                <p>
                    <span class="text-themewhite font-bold text-sm">Dados das últimas {{ time_list.find(item => item.value === logTypeRef)?.label || '3 horas' }}</span>
                </p>
                <p>
                    <span>Apostar {{ betAllRef}} vezes: </span>
                    <span class="text-themetext3">{{betTotalRef}}</span>
                </p>
                <p>
                    <span>Ganhar ou perder: </span>
                    <span class="text-themetext3">{{fn(winTotalRef-betTotalRef)}}</span>
                </p>
            </section>
        </pu-card>
        <pu-card theme="3" class="mt-4 pb-8">
            <van-list v-model:loading="hashLoadingRef" :finished="finishedRef" @load="gameLogsFunc(false)" loading-text="loading..." finished-text="">
                <ul>
                    <template v-for="item,index in gameLogsRef" :key="index">
                        <li class="w-full p-3 mb-4  text-rgbawhite80 rounded-xl border border-rgbawhite10" @click="onClickGameRecord(item)">
                            <div class="flex items-center">
                                <div class="shrink-0 w-12 h-12 rounded-full overflow-hidden">
                                    <img :src="item.cover" alt="Avatar" class="w-full h-full object-cover">
                                </div>

                                <div class="flex-1 overflow-hidden">
                                    <p class="ml-3 font-semibold text-sm opacity-45  mb-1">{{ item.title }}</p>
                                    <p class="ml-3 text-sm opacity-45">
                                        <span>{{ t('activityCenter.Invoicing') }}: {{ fn(Math.abs(Number(item.bet_amount))) }}</span>
                                    </p>
                                </div>
                                <div class="pl-3 shrink-0 flex items-center justify-between">
                                    <div class="text-right">
                                        <p class="text-themewhite ">
                                            <!-- <span>{{ fn(Number(item.win_amount)+Number(item.bet_amount)) }}</span> -->
                                            <span :class="Number(Number(item.win_amount)+Number(item.bet_amount))>0?'text-themetext0':''">{{ fn(Number(item.win_amount)+Number(item.bet_amount)) }}</span>
                                           
                                        </p>
                                        <p class="text-sm opacity-45">
                                            <span>{{ item.times }} {{ t('times') }}</span>
                                        </p>
                                    </div>    
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
                <div v-if="!gameLogsRef.length&&!hashLoadingRef" class="min-h-[50vh] text-center flex flex-col items-center">
                    <!-- <pu-no-data></pu-no-data> -->
                    <img :src=CommonImg.img_nodata class="w-40 h-auto">
                    <div v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'||currentTemplate.value=='template_three'" class="w-56 mx-auto mt-5 text-xs  text-center" :class="currentTemplate.value=='template_one'?'text-rgbawhite50':'text-theme'">
                        <p>{{ t('activityCenter.activityDetail14') }}</p>
                    </div>
                    <div class="w-56 mx-auto mt-5 text-xs  text-center text-themetext3" v-if="currentTemplate.value=='template_four'" >
                        <p>Por favor, entre em contato com o agente para recarregar as moedas e começar o jogo</p>
                    </div>
                </div>
            </van-list>
                
           
        </pu-card>
        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
<style scoped>
table tr td{
    padding: 0.75rem 0.25rem;
}
.tabClass :deep(.van-tabs--line .van-tabs__wrap){ 
    background: #10121d;
    border-bottom: 1px solid rgba(255,255,255,0.3) !important;
   }
</style>