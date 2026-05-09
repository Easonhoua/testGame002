<script setup>
import { onMounted, ref } from 'vue'
import { t, fn } from '@/i18n'
import { resetTimeFunc } from '@/utils/core'
import { gameModel,gameClickRef} from '@/model/game'
import { useThemeImages } from '@/utils/themeimg'
const CommonBgImg = useThemeImages().commonbg
const CommonImg = useThemeImages().common
const { hashLoadingRef, finishedRef, gameRecordListRef,gameLogsByGameIdFunc} = gameModel()

onMounted(()=> {
    gameLogsByGameIdFunc(true)

})

</script>

<template>
    <pu-page title="Detalhes do Jogo" class="z-[999]"  :style="currentTemplate.value!='template_four'?{background: `url(${CommonBgImg.bg_body_1}) center` }:{background: `var(--color-theme)`}" style="background-size: cover;"> 
        <pu-card theme="3" class="mt-4">
            <section class="w-full px-4 py-3 text-xs !leading-normal text-rgbawhite50 border border-rgbawhite10 rounded-xl bg-gradient-to-b from-rgbawhite10 to-transparent">
                <div class="flex items-center">
                    <div class="shrink-0 w-12 h-12 rounded-full overflow-hidden">
                        <img :src="gameClickRef.cover" alt="Avatar" class="w-full h-full object-cover">
                    </div>

                    <div class="flex-1 overflow-hidden">
                        <p class="ml-3 font-semibold text-sm opacity-45  mb-1">{{ gameClickRef.title }}</p>
                        <p class="ml-3 text-sm opacity-45">
                            <span>Faturamento: {{ fn(Math.abs(Number(gameClickRef.bet_amount))) }}</span>
                        </p>
                    </div>
                    <div class="pl-3 shrink-0 flex items-center justify-between">
                        <div class="mr-1 text-right">
                            <p class="text-base opacity-65">
                                <span>{{ fn(Number(gameClickRef.win_amount)+Number(gameClickRef.bet_amount)) }}</span>
                            </p>
                            <p class="text-sm opacity-45">
                                <span>{{ gameClickRef.times }} Vezes</span>
                            </p>
                        </div>    
                    </div>
                </div>
            </section>
        </pu-card>
        <pu-card theme="3" class="mt-4 pb-8">
            <van-list v-model:loading="hashLoadingRef" :finished="finishedRef" @load="gameLogsByGameIdFunc(false)" loading-text="loading..." finished-text="">
                <ul>
                    <template v-for="item,index in gameRecordListRef" :key="index">
                        <li class="w-full p-3 mb-4 bg-gradient-to-b from-rgbawhite10 to-transparent text-rgbawhite80 rounded-xl border border-rgbawhite10" @click="onClickGameRecord(item)">
                            <div class="flex items-center">

                                <div class="flex-1 overflow-hidden">
                                    <p class="ml-3 font-semibold text-sm opacity-45  mb-1">{{ resetTimeFunc(item.created_at) }}</p>
                                    <p class="ml-3 text-sm opacity-45">
                                        <span>Faturamento: {{ fn(Math.abs(Number(item.bet_amount))) }}</span>
                                    </p>
                                </div>
                                <div class="pl-3 shrink-0 flex items-center justify-between">
                                    <div class="mr-1 text-right">
                                        
                                        <p class="text-base ">
                                            <span v-if="currentTemplate.value!='template_four'">{{ fn(Number(item.win_amount)+Number(item.bet_amount)) }}</span>
                                            <span v-else :class="fn(Number(item.win_amount)+Number(item.bet_amount))>0?'text-themetext0':''">{{ fn(Number(item.win_amount)+Number(item.bet_amount)) }}</span>
                                        </p>
                                    </div>    
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
                <div v-if="!gameRecordListRef.length&&!hashLoadingRef" class="min-h-[50vh] text-center flex flex-col items-center">
                    <!-- <pu-no-data></pu-no-data> -->
                    <img :src=CommonImg.img_nodata class="w-40 h-auto">
                    <div class="w-56 mx-auto mt-5 text-xs  text-center" :class="currentTemplate.value=='template_one'?'text-rgbawhite50':'text-theme'">
                        <p>Por favor, entre em contato com o agente para recarregar as moedas e começar o jogo</p>
                    </div>
                    
                </div>
            </van-list>
        </pu-card>
    </pu-page>
</template>
<style scoped>
table tr td{
    padding: 0.75rem 0.25rem;
}
</style>