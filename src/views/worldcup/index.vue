<script setup>
import { computed, ref } from 'vue'
import { t } from '@/i18n'
import { bettingCheckInModel } from '@/model/activity'
import { isAuthRef } from '@/model/user'
import ShareList from '@/components/pages/ShareList.vue'
import { openLoginFunc, isEverLoginFunc } from '@/utils/config'
import { playBtnAudioFunc } from '@/utils/core'
import { socialRedeemListRef } from '@/model/common'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const worldCup = useThemeImages().worldCup
const CommonImg = useThemeImages().common

const { levelsRef, moneyRef, claim_levelRef, contentRef, receiveFunc, streak_daysRef, lastmoneyRef, listRef, current_levelRef,receberChecInFunc } = bettingCheckInModel()
const input = ref(null)

function onclickData(item) {
    if(item.status == 'available') {
        receberChecInFunc()
    }
}
function onclickPaste() {
    input.value.focus()
    navigator.clipboard.readText().then(text => {
        dataRef.value.code = text
    })
}
const progressWidth = computed(() => {
    const levels = Array.isArray(levelsRef.value) ? levelsRef.value : []
    const currentBet = Number(moneyRef.value || 0)

    if (levels.length <= 1) return '8%'

    // 视觉上左侧有一点留白（避免圆角起点看起来“空”）
    const START_PERCENT = 8

    // 按 min_bet 从小到大排序，定义各段起点
    const sortedLevels = [...levels].sort(
        (a, b) => Number(a?.min_bet || 0) - Number(b?.min_bet || 0)
    )

    const firstMin = Number(sortedLevels[0]?.min_bet || 0)
    const lastMin = Number(sortedLevels[sortedLevels.length - 1]?.min_bet || 0)
    const segCount = sortedLevels.length - 1
    const segWidth = 100 / segCount

    const clamp01 = (v) => Math.max(0, Math.min(1, v))
    const mapToBar = (percent0To100) => {
        const p = clamp01(percent0To100 / 100)
        return `${START_PERCENT + p * (100 - START_PERCENT)}%`
    }

    // 当前金额小于第一档：在第 0 段内按比例推进（保持与后续区间同一映射，避免第二/第三档跳动）
    if (currentBet <= firstMin) {
        if (firstMin <= 0) return `${START_PERCENT}%`
        const ratio = clamp01(currentBet / firstMin)
        // percent0To100 表示“无留白”的逻辑进度
        return mapToBar(ratio * segWidth)
    }

    // 当前金额大于等于最后一档：直接满进度
    if (currentBet >= lastMin) {
        return '100%'
    }

    // 找到当前金额所处的区间 [currentMin, nextMin]
    let currentIndex = sortedLevels.length - 2
    for (let i = 0; i < sortedLevels.length - 1; i++) {
        const cur = Number(sortedLevels[i]?.min_bet || 0)
        const next = Number(sortedLevels[i + 1]?.min_bet || 0)
        if (currentBet >= cur && currentBet < next) {
            currentIndex = i
            break
        }
    }

    const currentMin = Number(sortedLevels[currentIndex]?.min_bet || 0)
    const nextMin = Number(sortedLevels[currentIndex + 1]?.min_bet || 0)
    const denom = nextMin - currentMin

    const segRatioRaw = denom <= 0 ? 0 : (currentBet - currentMin) / denom
    const segRatio = clamp01(segRatioRaw)

    // 先算“无留白”的逻辑进度，再统一映射到实际进度条（带起点留白）
    const percent0To100 = currentIndex * segWidth + segRatio * segWidth
    return mapToBar(percent0To100)
})
const getLevelLeft = (index) => {
    if (levelsRef.value.length <= 1) return '0%'
    return `${(index / (levelsRef.value.length - 1)) * 100}%`
}
</script>

<template>
    <pu-page title="Copa do Mundo" class="z-[999]" :style="{background: `url(${worldCup.img_bg1}) no-repeat`, backgroundSize: '100% 100%' }">
        <img :src=worldCup.img_mainbg class="w-full ">
        <!-- <img :src="CommonImg.m4_null" alt="" v-if="currentTemplate.value == 'template_four'">
        <em class="w-full h-44 block" v-else></em> -->
        <div class="w-full mb-4 h-[10rem]  px-4 pb-3 mt-[-3rem]" :style="{
                    background: `url(${worldCup.img_time1}) no-repeat`,
                    backgroundSize: '100% 100%'
                }">
               <img :src="worldCup.group0text" class=" h-5 m-auto relative top-[2.85rem]"/>
               <div class="w-full flex items-center justify-center mt-5">
                <div class="rounded-[1rem] flex-1 h-[4rem] bg-rgbablack30 px-4 py-1 flex items-center justify-center relative top-[2.85rem] flex-col">
                    <div class="flex w-full  items-center">
                        <img :src="worldCup.img_time" alt="" class="w-[1.25rem]"/>
                        <p class="text-[0.8rem] ml-1">Tempo de participação</p>
                    </div>
                    <p class="text-[0.68rem] mt-2">5.1-00:00——6.10-24:00</p>

                </div>
                <div class="rounded-[1rem] h-[4rem] bg-rgbablack30 px-4 py-1 flex items-center justify-center relative top-[2.85rem] flex-col ml-1">
                    <div class="flex w-full  items-center">
                        <img :src="worldCup.img_coin1" alt="" class="w-[1.25rem]"/>
                        <p class="text-[0.8rem] ml-2">Valor da aposta</p>
                    </div>
                    <p class="text-[0.68rem] mt-2" :class="currentTemplate.value == 'template_one'||currentTemplate.value == 'template_two'? 'text-four':'text-themetext0'">1500/2000</p>

                </div>
               </div>
        </div>
        <div class="w-[98%] pb-6 rounded-[1rem] bg-rgbablack30 flex flex-wrap items-center justify-between mt-4 m-auto border border-rgbawhite50 py-2">
           <div class="w-[48%] relative flex items-center justify-center">
                <img v-if="true" :src="worldCup.img_light" class="absolute  w-full h-full object-contain z-[0] animate-pulse" />
                <img :src="worldCup.img_group0_1" class="relative z-[1] w-full" />
                <img v-if="true" :src="worldCup.img_terminou" class="w-[7rem] absolute top-[4.75rem] left-[2rem] z-[2]"/>
            </div>
            <div class="w-[48%] relative flex items-center justify-center">
                <img v-if="true" :src="worldCup.img_light" class="absolute w-full h-full object-contain z-[0] animate-pulse" />
                <img :src="worldCup.img_group32_1" class="relative z-[1] w-full" />
                <img v-if="true" :src="worldCup.img_terminou" class="w-[7rem] absolute top-[4.75rem] left-[2rem] z-[2]"/>
            </div>
            <div class="w-[48%] relative flex items-center justify-center">
                <img v-if="true" :src="worldCup.img_light" class="absolute w-full h-full object-contain z-[0] animate-pulse" />
                <img :src="worldCup.img_group16_1" class="relative z-[1] w-full" />
                <img v-if="true" :src="worldCup.img_terminou" class="w-[7rem] absolute top-[4.75rem] left-[2rem] z-[2]"/>
            </div>
            <div class="w-[48%] relative flex items-center justify-center">
                <img v-if="true" :src="worldCup.img_light" class="absolute w-full h-full object-contain z-[0] animate-pulse" />
                <img :src="worldCup.img_group8_1" class="relative z-[1] w-full" />
                <img v-if="true" :src="worldCup.img_terminou" class="w-[7rem] absolute top-[4.75rem] left-[2rem] z-[2]"/>
            </div>
           
        </div>
         <pu-card theme="3" class="mb-3 pt-3 bg-rgbawhite10 w-[98%] m-auto rounded-[1rem]">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent "  :class="currentTemplate.value == 'template_one'||currentTemplate.value == 'template_two'? 'to-four':'to-themetext0'"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center "  :class="currentTemplate.value == 'template_one'||currentTemplate.value == 'template_two'? 'text-four':'text-themetext0'">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent"  :class="currentTemplate.value == 'template_one'||currentTemplate.value == 'template_two'? 'to-four':'to-themetext0'"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-rgbawhite80" v-html="contentRef"></article>
        </pu-card>
      

        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
