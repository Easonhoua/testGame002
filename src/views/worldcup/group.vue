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
    <pu-page title="Fase de Grupos" class="z-[999]" :style="{background: `url(${worldCup.img_bg2}) no-repeat`, backgroundSize: '100% 100%' }">
        <img :src=worldCup.group0_banner class="w-full ">
        <!-- <img :src="CommonImg.m4_null" alt="" v-if="currentTemplate.value == 'template_four'">
        <em class="w-full h-44 block" v-else></em> -->
        <div class="w-full mb-4 h-[12rem]  px-4 pb-3 mt-[-3rem]" :style="{
                    background: `url(${worldCup.img_time2}) no-repeat`,
                    backgroundSize: '100% 100%'
                }">
                <p class=" h-5 m-auto relative top-[2.85rem] font-bold italic text-[1.68rem] text-center" :class="currentTemplate.value == 'template_one'||currentTemplate.value == 'template_two'? 'text-four':'text-themetext0'">800000000</p>
               <div class="w-full flex items-center justify-center flex-col mt-[4.7rem]">
                <p class="text-[0.68rem]">Hora de partilhar recompensas</p>
                <p class="text-[0.68rem]">5.1-00:00-6.10-24:00</p>
               </div>
                <div class="w-full flex items-center justify-center mt-2">
                <div class="rounded-lg flex-1 bg-rgbablack30 px-4 py-1 flex items-center justify-center mr-2  flex-col">
                    <div class="flex  w-full  items-center">
                      
                        <p class="text-[0.68rem] ml-1">Número de pessoas que acertaram</p>
                    </div>
                    <p class="text-[0.68rem] mt-1 flex" :class="currentTemplate.value == 'template_one'||currentTemplate.value == 'template_two'? 'text-four':'text-themetext0'">  <img :src="worldCup.img_time" alt="" class="w-[1rem] mr-2" />18:05:08</p>

                </div>
                <div>
                    <img :src="worldCup.btn_receber" alt="" class="w-[7rem]"/>
                </div>
                <!-- <div class="rounded-[1rem] h-[4rem] bg-rgbablack30 px-4 py-1 flex items-center justify-center  flex-col ml-1">
                    <div class="flex w-full  items-center">
                        <img :src="worldCup.img_coin1" alt="" class="w-[1.25rem]"/>
                        <p class="text-[0.8rem] ml-2">Valor da aposta</p>
                    </div>
                    <p class="text-[0.68rem] mt-2" :class="currentTemplate.value == 'template_one'||currentTemplate.value == 'template_two'? 'text-four':'text-themetext0'">1500/2000</p>

                </div> -->
               </div>
        </div>
        <div class="w-[98%] m-auto mb-4 h-[5.75rem]  px-4  mt-[1rem] flex flex-col items-center justify-center " :style="{
                    background: `url(${worldCup.img_ling_di}) no-repeat`,
                    backgroundSize: '100% 100%'
                }">
                <p class="text-[0.8rem]"> Por favor, selecione 32 equipas que irão avançar</p>
                <p class="text-[0.8rem]">(selecionar 27 equipas permitirá que dividam o prémio).</p>
                <div class="flex items-center justify-between w-full mt-1">
                     <div class="bg1 rounded-full px-[3.5rem] py-1 text-[0.88rem] flex items-center justify-center ">Mudar</div>
                    <div class="bg2 rounded-full px-[3.5rem] py-1 text-[0.88rem] text-black flex items-center justify-center" > Enviar</div>
                </div>
        </div>
        <!-- 1f214d-040414 -->
        <div class="w-[98%] pb-6 rounded-t-[1rem] bg-gradient-to-b from-[#1f214d] to-[#040414] flex flex-wrap items-center justify-between mt-4 m-auto border border-rgbawhite50 py-4 px-2">
            <div v-for="(group, idx) in groupList" :key="idx" class="group-card w-[49%] mb-3 rounded-xl overflow-hidden border border-rgbawhite10">
                <div class="group-header py-2 px-3 flex items-center justify-between">
                    <span class="text-sm font-bold">{{ group.name }}</span>
                    <img :src="worldCup.img_jinji" class="w-4 h-4 opacity-50" />
                </div>
                <ul class="px-2 py-1">
                    <li v-for="(team, tidx) in group.teams" :key="tidx" class="flex items-center justify-between py-2 border-b border-rgbawhite10 last:border-0">
                        <div class="flex items-center relative">
                            <div class="relative">
                                <van-image :src="team.flag" class="w-8 h-6 rounded-sm" fit="cover" />
                                <img v-if="team.special" :src="worldCup.img_jinji" class="absolute -top-2 -right-2 w-4 h-4" />
                            </div>
                            <span class="ml-2 text-xs truncate w-16">{{ team.name }}</span>
                        </div>
                        <div class="select-dot" :class="{ 'is-selected': team.selected }"></div>
                    </li>
                </ul>
            </div>
        </div>
        

        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
<style lang="css" scoped>
.bg1{
    background-image: linear-gradient(120deg, #7135f1 0%, #574fbf 100%);
}
.bg2{
    background-image: linear-gradient(120deg, #a4f135 0%, #53d41a 100%);
}
</style>
