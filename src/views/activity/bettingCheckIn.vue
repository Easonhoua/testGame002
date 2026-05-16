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
const BettingCheckIn = useThemeImages().bettingCheckIn
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
    <pu-page :title="t('pageTitle.LevelCheck')" class="z-[999]">
        <img :src=BettingCheckIn.img_bg class="w-full absolute left-0 top-0">
        <!-- <img :src="CommonImg.m4_null" alt="" v-if="currentTemplate.value == 'template_four'">
        <em class="w-full h-44 block" v-else></em> -->
        <div v-if="currentTemplate.value == 'template_one'">
            <pu-card theme="3" class="relative">
                <div class="sharebox w-full mx-auto bg-rgbawhite10 rounded-[1rem] mt-2 px-4">
                    <p class="text-[0.68rem] text-themetext pt-2">Convide amigos para se divertir</p>
                    <share-list :showName="false"></share-list>
                </div>
            </pu-card>
            <em class="w-full h-[12rem] block"> </em>
            <pu-card theme="3" class="mb-3 pt-3 relative ">
                <div class="w-full mb-4 h-auto  px-2 pb-3" :style="{
                    background: `url(${BettingCheckIn.img_djbg}) no-repeat`,
                    backgroundSize: '100% 100%'
                }">
                    <div class="h-[2.5rem] w-[10rem] absolute top-[-0.5rem] left-[30%] flex items-center justify-center font-bold "
                        :style="{
                            background: `url(${BettingCheckIn.img_dj}) no-repeat`,
                            backgroundSize: '100% 100%',
                        }">
                        <span class="text-[1.5rem] mt-1" style="transform: skewX(-15deg);">V{{ current_levelRef
                        }}  </span>
                    </div>
                    
                    <div class="flex flex-col items-center justify-center  ">
                      
                        <dd
                            class="w-[96%] h-[0.4rem] bg-rgbablack50 rounded-full overflow-hidden flex relative top-[2.5rem]">
                            <em :style="{ width: progressWidth }"
                                class="h-full bg-four rounded-full flex justify-end overflow-hidden">
                                <!-- <i class="w-2 h-2 bg-themewhite rounded-full"></i> -->
                            </em>
                        </dd>
                        <div class="absolute top-[1.8rem] left-[15.5%] w-[75%] h-[2.5rem]">
                            <div v-for="(item, index) in levelsRef" :key="item.level"
                                class="itme absolute flex flex-col items-center justify-center -translate-x-1/2"
                                :style="{ left: getLevelLeft(index) }">
                                <span class="text-[0.8rem] text-themeblack">{{ item.min_bet }}</span>
                                <!-- 1黑2亮 -->
                                <img :src="index === 0 || Number(moneyRef || 0) >= Number(item.min_bet || 0) ? BettingCheckIn.icon_pontos2 : BettingCheckIn.icon_pontos1"
                                    alt="" class="w-[1rem] h-[1rem] mb-[0.1rem]" />
                                <img :src="BettingCheckIn[`icon_lv${Math.min(item.level, 6)}`] || BettingCheckIn.icon_lv1"
                                    alt="" class="w-[1.75rem] h-[1.75rem]" />
                            </div>
                        </div>

                    </div>
                    <div class="bg-rgbablack30 text-xs text-themeblack px-3 py-1 rounded-lg mt-[5rem] ">
                        <p>Apostar durante <span class="text-four">{{ streak_daysRef }}</span> dias consecutivos</p>
                        <p class="mt-1">Você pode resgatar sua recompensa em até <span class="text-themetext0">{{ 7 -
                                streak_daysRef }}</span> dias.
                        </p>
                        <p class="flex justify-left text-left mt-1 ">
                            <img :src="BettingCheckIn.icon_tibi" alt="" class="w-[0.88rem] h-[0.88rem] mr-1" />
                            <span>(É necessário apostar durante <span class="text-four">7</span> dias consecutivos.)</span>
                        </p>
                    </div>
                </div>
                <div class=" mt-2 px-3 py-2" :style="{
                    backgroundImage: `url(${BettingCheckIn.img_checkinbg})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                }">
                    <div class="flex items-center justify-between mt-7">
                        <div class="flex flex-col">
                            <p class="font-bold text-four ">{{ currentUnit.value }} {{ Number(lastmoneyRef).toFixed(2) }}</p>
                            <p class="text-[0.58rem] text-themetext3">Por favor, resgate a sua recompensa.</p>
                        </div>
                        <img :src="BettingCheckIn[`icon_lv${claim_levelRef == 1 ? 2 : claim_levelRef}`]"
                            class="mr-2 w-[2rem] h-[2rem]" />

                    </div>

                    <ul class=" flex flex-wrap justify-between mt-2">
                        <!-- item,index in signConfigRef.configList||[] -->
                        <template v-for="(item, index) in listRef" :key="index">
                            <!-- @click="onclickData(item)" -->
                            
                            <li :style="{
                                backgroundImage:
                                    index < 6 && item.status == 'locked'|| index < 6 && item.status == 'expired' ? `url(${BettingCheckIn.item_bg1})` :
                                        index == 6 && item.status == 'locked' || index == 6 && item.status == 'expired'? `url(${BettingCheckIn.item_bg3})` :
                                            index < 6 && item.status == 'available' ? `url(${BettingCheckIn.item_bg2})` :
                                                index == 6 && item.status == 'available' ? `url(${BettingCheckIn.item_bg4})` : ''
                            }" class="bg-no-repeat bg-fill relative block mb-2"
                            @click="onclickData(item)"
                                :class="index == 6 ? 'w-[9.8rem]' : 'w-[4.7rem]  h-[5.8rem]'">
                                <!-- <em v-if="item.status == 1" class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                                        <img :src=SignImg.bg_light class="w-[4.9375rem] h-[4.9375rem] sign-day-light">
                                    </em> -->
                                <p class="text-[0.64rem] leading-[1.25rem]  text-center"
                                :class="item.status == 'available' ? 'text-themewhite' : 'text-themetext1'"
                                >
                                    <span>Dia {{ index + 1 }}</span>
                                </p>
                                <div class="w-full h-[2.825rem] flex flex-col items-center justify-center relative">
                                    <div v-if="index != 6" class=" flex justify-center">
                                        <div class="relative flex justify-cente">
                                            <img :src="BettingCheckIn[`coin${index + 1}`]" class="w-auto h-[2.3rem] ">
                                        </div>
                                    </div>
                                    <!-- <em v-if="item.status==4 " class="w-full h-full rounded-[0.5625rem] bg-rgbablack50 text-rgbawhite80 not-italic absolute top-0 left-0 flex items-center justify-center">
                                            <p class="px-2 text-[0.6875rem] text-center">SUBSCRIPTION INTERRUPTED</p>
                                        </em> -->
                                    <!-- v-if="item.status == 2" -->
                                    <!-- item.status == 'claimed' -->
                                    <em v-if="item.status == 'claimed'"
                                        class="w-full h-[5.8rem] mt-2 rounded-[0.3rem] bg-rgbablack50 absolute flex justify-center items-center z-10">
                                        <img :src="BettingCheckIn.icon_gou" alt="" class="w-[1.2rem] h-[1.2rem]">
                                    </em>
                                    <em v-if="item.status == 'expired'"
                                        class="w-full h-[5.8rem] mt-2 rounded-[0.3rem] bg-rgbablack50 absolute flex justify-center items-center z-10">
                                        <img :src="BettingCheckIn.icon_expirado" alt="" class="w-[2rem] h-[2rem]">
                                    </em>
                                </div>
                                <div class="relative h-[1.3rem] text-center ">
                                    <p class="h-[1.125rem] text-[0.8125rem]  leading-[2rem] text-center">
                                        <span class=" text-[0.8rem] font-bold"
                                            :class="item.status == 'available' ? 'text-themewhite' : 'text-four'">{{ currentUnit.value }}
                                            {{ Number(item.bonus) }} </span>
                                    </p>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-rgbawhite50" v-html="contentRef"></article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_two'">
            <pu-card theme="3" class="relative">
                <div class="sharebox w-full mx-auto bg-rgbablack50 rounded-[1rem] mt-2">
                    <p class="text-sm text-textcolorsix px-4 pt-2">Convide amigos para se divertir</p>
                    <share-list class=" !py-1" :showName="false"></share-list>
                </div>
            </pu-card>
            <em class="w-full h-[13rem] block"> </em>
            <pu-card theme="3" class="mb-3 pt-3 relative !px-2">
                <div class="w-full mb-4 h-auto pb-3 px-4" :style="{
                    background: `url(${BettingCheckIn.img_djbg}) no-repeat`,
                    backgroundSize: '100% 100%'
                }">
                    <div class="h-[2.5rem] w-[10rem] absolute top-[-0.5rem] left-[30%] flex items-center justify-center font-bold "
                        :style="{
                            background: `url(${BettingCheckIn.img_dj}) no-repeat`,
                            backgroundSize: '100% 100%',
                        }">
                        <span class="text-[1.5rem] mt-1" style="transform: skewX(-15deg);">V{{ current_levelRef
                        }}</span>
                    </div>
                    <div class="flex flex-col items-center justify-center  ">
                        <dd
                            class="w-[96%] h-[0.4rem] bg-rgbablack50 rounded-full overflow-hidden flex relative top-[2.5rem]">
                            <em :style="{ width: progressWidth }"
                                class="h-full bg-four rounded-full flex justify-end overflow-hidden">
                                <!-- <i class="w-2 h-2 bg-themewhite rounded-full"></i> -->
                            </em>
                        </dd>
                        <div class="absolute top-[1.8rem] left-[15.5%] w-[75%] h-[2.5rem]">
                            <div v-for="(item, index) in levelsRef" :key="item.level"
                                class="itme absolute flex flex-col items-center justify-center -translate-x-1/2"
                                :style="{ left: getLevelLeft(index) }">
                                <span class="text-[0.8rem] text-themewhite">{{ item.min_bet }}</span>
                                <!-- 1黑2亮 -->
                                <img :src="index === 0 || Number(moneyRef || 0) >= Number(item.min_bet || 0) ? BettingCheckIn.icon_pontos2 : BettingCheckIn.icon_pontos1"
                                    alt="" class="w-[1rem] h-[1rem] mb-[0.1rem]" />
                                <img :src="BettingCheckIn[`icon_lv${Math.min(item.level, 6)}`] || BettingCheckIn.icon_lv1"
                                    alt="" class="w-[1.75rem] h-[1.75rem]" />
                            </div>
                        </div>

                    </div>
                    <div class="bg-rgbablack30 text-xs text-themewhite px-3 py-1 rounded-lg mt-[5rem] ">
                        <p>Apostar durante <span class="text-four">{{ streak_daysRef }}</span> dias consecutivos</p>
                        <p class="mt-1">Você pode resgatar sua recompensa em até <span class="text-themetext0">{{ 7 -
                                streak_daysRef }}</span> dias.
                        </p>
                        <p class="flex justify-left text-left mt-1 ">
                            <img :src="BettingCheckIn.icon_tibi" alt="" class="w-[0.88rem] h-[0.88rem] mr-1" />
                            <span>(É necessário apostar durante <span class="text-four">7</span> dias consecutivos.)</span>
                        </p>
                    </div>
                </div>
                <div class=" px-2 py-2 h-[18rem] m-1" :style="{
                    backgroundImage: `url(${BettingCheckIn.img_checkinbg})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                }">
                    <div class="flex items-center justify-between mt-7 px-2">
                        <div class="flex flex-col">
                            <p class="font-bold text-four ">{{ currentUnit.value }} {{ Number(lastmoneyRef).toFixed(2) }}</p>
                            <p class="text-[0.58rem] text-textcolorsix">Por favor, resgate a sua recompensa.</p>
                        </div>
                        <img :src="BettingCheckIn[`icon_lv${claim_levelRef == 1 ? 2 : claim_levelRef}`]"
                            class="mr-2 w-[2rem] h-[2rem]" />

                    </div>
                    <ul class=" flex flex-wrap justify-between mt-2 w-full">
                        <!-- item,index in signConfigRef.configList||[] -->
                        <template v-for="(item, index) in listRef" :key="index">
                            <!-- @click="onclickData(item)" -->
                            <li :style="{
                                backgroundImage:
                                index < 6 && item.status == 'locked'|| index < 6 && item.status == 'expired' ? `url(${BettingCheckIn.item_bg1})` :
                                index == 6 && item.status == 'locked' || index == 6 && item.status == 'expired'? `url(${BettingCheckIn.item_bg3})` :
                                            index < 6 && item.status == 'available' ? `url(${BettingCheckIn.item_bg2})` :
                                                index == 6 && item.status == 'available' ? `url(${BettingCheckIn.item_bg4})` : ''
                            }" class="bg-no-repeat bg-fill relative block mb-2"
                             @click="onclickData(item)"
                                :class="index == 6 ? 'w-[10.1rem]' : 'w-[4.9rem]  h-[5.8rem]'">
                                <!-- <em v-if="item.status == 1" class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                                        <img :src=SignImg.bg_light class="w-[4.9375rem] h-[4.9375rem] sign-day-light">
                                    </em> -->
                                <p class="text-[0.64rem] leading-[1.25rem]  text-center "
                                :class="item.status == 'available' ? 'text-themewhite' : 'text-themetext1'">
                                    <span>Dia {{ index + 1 }}</span>
                                </p>
                                <div class="w-full h-[2.825rem] flex flex-col items-center justify-center relative">
                                    <div v-if="index != 6" class=" flex justify-center">
                                        <div class="relative flex justify-cente">
                                            <img :src="BettingCheckIn[`coin${index + 1}`]" class="w-auto h-[2.3rem] ">
                                        </div>
                                    </div>
                                    <!-- <em v-if="item.status==4 " class="w-full h-full rounded-[0.5625rem] bg-rgbablack50 text-rgbawhite80 not-italic absolute top-0 left-0 flex items-center justify-center">
                                            <p class="px-2 text-[0.6875rem] text-center">SUBSCRIPTION INTERRUPTED</p>
                                        </em> -->
                                    <!-- v-if="item.status == 2" -->
                                    <em v-if="item.status == 'claimed'"
                                        class="w-full h-[5.8rem] mt-2 rounded-[0.3rem] bg-rgbablack50 absolute flex justify-center items-center z-10">
                                        <img :src="BettingCheckIn.icon_gou" alt="" class="w-[2rem] h-[2rem]">
                                    </em>
                                    <em v-if="item.status == 'expired'"
                                        class="w-full h-[5.8rem] mt-2 rounded-[0.3rem] bg-rgbablack50 absolute flex justify-center items-center z-10">
                                        <img :src="BettingCheckIn.icon_expirado" alt="" class="w-[2rem] h-[2rem]">
                                    </em>
                                </div>
                                <div class="relative h-[1.3rem] text-center ">
                                    <p class="h-[1.125rem] text-[0.8125rem]  leading-[2rem] text-center">
                                        <span class="text-[0.8rem] font-bold"
                                            :class="item.status == 'available' ? 'text-themewhite' : 'text-four'">{{ currentUnit.value }} {{
                                            Number(item.bonus) }}
                                        </span>
                                    </p>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1  bg-gradient-to-r from-transparent to-four"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-four">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-theme" v-html="contentRef"></article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_three'">
            <pu-card theme="3" class="relative">
                <div class="sharebox w-full mx-auto bg-rgbablack50 rounded-[1rem] mt-2">
                    <p class="text-sm text-themetext1 px-4 pt-2">{{ t('activityCenter.Invitesfriends') }}</p>
                    <share-list class=" !py-1" :showName="false"></share-list>
                </div>
            </pu-card>
            <em class="w-full h-[12rem] block"> </em>
            <pu-card theme="3" class="mb-3 pt-3 relative ">
                <div class="w-full mb-4 h-auto pb-3 px-2" :style="{
                    background: `url(${BettingCheckIn.img_djbg}) no-repeat`,
                    backgroundSize: '100% 100%'
                }">
                    <div class="h-[2.5rem] w-[10rem] absolute top-[-0.5rem] left-[30%] flex items-center justify-center font-bold "
                        :style="{
                            background: `url(${BettingCheckIn.img_dj}) no-repeat`,
                            backgroundSize: '100% 100%',
                        }">
                        <span class="text-[1.5rem] mt-1" style="transform: skewX(-15deg);">V{{ current_levelRef
                        }}</span>
                    </div>
                    <div class="flex flex-col items-center justify-center  ">
                        <dd
                            class="w-[96%] h-[0.4rem] bg-rgbablack50 rounded-full overflow-hidden flex relative top-[2.5rem]">
                            <em :style="{ width: progressWidth }"
                                class="h-full bg-themetext0 rounded-full flex justify-end overflow-hidden">
                                <!-- <i class="w-2 h-2 bg-themewhite rounded-full"></i> -->
                            </em>
                        </dd>
                        <div class="absolute top-[1.8rem] left-[15.5%] w-[75%] h-[2.5rem]">
                            <div v-for="(item, index) in levelsRef" :key="item.level"
                                class="itme absolute flex flex-col items-center justify-center -translate-x-1/2"
                                :style="{ left: getLevelLeft(index) }">
                                <span class="text-[0.8rem] text-themeblack">{{ item.min_bet }}</span>
                                <!-- 1黑2亮 -->
                                <img :src="index === 0 || Number(moneyRef || 0) >= Number(item.min_bet || 0) ? BettingCheckIn.icon_pontos2 : BettingCheckIn.icon_pontos1"
                                    alt="" class="w-[1rem] h-[1rem] mb-[0.1rem]" />
                                <img :src="BettingCheckIn[`icon_lv${Math.min(item.level, 6)}`] || BettingCheckIn.icon_lv1"
                                    alt="" class="w-[1.75rem] h-[1.75rem]" />
                            </div>
                        </div>

                    </div>
                    <div class="bg-rgbablack30 text-xs text-themeblack px-3 py-1 rounded-lg mt-[5rem] ">
                        <p>{{ t('activityCenter.SetDuring') }} <span class="text-themetext0">{{ streak_daysRef }}</span> {{ t('activityCenter.consecutiveDays') }}
                        </p>
                        <p class="mt-1">{{ t('activityCenter.Youcanby') }} <span class="text-themetext0">{{ 7 -
                                streak_daysRef }}</span> {{ t('account.days') }}.
                        </p>
                        <p class="flex justify-left text-left mt-1 ">
                            <img :src="BettingCheckIn.icon_tibi" alt="" class="w-[0.88rem] h-[0.88rem] mr-1" />
                            <span>({{ t('activityCenter.Youhaveduring') }} <span class="text-themetext0">7</span>{{ t('activityCenter.consecutiveDays') }}.)</span>
                        </p>
                    </div>
                </div>
                <div class=" mt-2 px-3 py-2" :style="{
                    backgroundImage: `url(${BettingCheckIn.img_checkinbg})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                }">
                    <div class="flex items-center justify-between mt-7">
                        <div class="flex flex-col">
                            <p class="font-bold text-themetext0 ">{{ currentUnit.value }} {{ Number(lastmoneyRef).toFixed(2) }}</p>
                            <p class="text-[0.58rem] text-themetext3">{{ t('activityCenter.saveReward') }}</p>
                        </div>
                        <img :src="BettingCheckIn[`icon_lv${claim_levelRef == 1 ? 2 : claim_levelRef}`]"
                            class="mr-2 w-[2rem] h-[2rem]" />

                    </div>

                    <ul class=" flex flex-wrap justify-between mt-2">
                        <!-- item,index in signConfigRef.configList||[] -->
                        <template v-for="(item, index) in listRef" :key="index">
                            <!-- @click="onclickData(item)" -->
                            <li :style="{
                                backgroundImage:
                                index < 6 && item.status == 'locked'|| index < 6 && item.status == 'expired' ? `url(${BettingCheckIn.item_bg1})` :
                                index == 6 && item.status == 'locked' || index == 6 && item.status == 'expired'? `url(${BettingCheckIn.item_bg3})` :
                                            index < 6 && item.status == 'available' ? `url(${BettingCheckIn.item_bg2})` :
                                                index == 6 && item.status == 'available' ? `url(${BettingCheckIn.item_bg4})` : ''
                            }" class="bg-no-repeat bg-fill relative block mb-2"
                            @click="onclickData(item)"
                                :class="index == 6 ? 'w-[9.8rem]' : 'w-[4.7rem]  h-[5.8rem]'">
                                <!-- <em v-if="item.status == 1" class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                                        <img :src=SignImg.bg_light class="w-[4.9375rem] h-[4.9375rem] sign-day-light">
                                    </em> -->
                                <p class="text-[0.64rem] leading-[1.25rem]  text-center "
                                :class="item.status == 'available' ? 'text-themewhite' : 'text-themetext1'">
                                    <span>{{ t('Day') }} {{ index + 1 }}</span>
                                </p>
                                <div class="w-full h-[2.825rem] flex flex-col items-center justify-center relative">
                                    <div v-if="index != 6" class=" flex justify-center">
                                        <div class="relative flex justify-cente">
                                            <img :src="BettingCheckIn[`coin${index + 1}`]" class="w-auto h-[2.3rem] ">
                                        </div>
                                    </div>
                                    <!-- <em v-if="item.status==4 " class="w-full h-full rounded-[0.5625rem] bg-rgbablack50 text-rgbawhite80 not-italic absolute top-0 left-0 flex items-center justify-center">
                                            <p class="px-2 text-[0.6875rem] text-center">SUBSCRIPTION INTERRUPTED</p>
                                        </em> -->
                                    <!-- v-if="item.status == 2" -->
                                    <em v-if="item.status == 'claimed'"
                                        class="w-full h-[5.8rem] mt-2 rounded-[0.3rem] bg-rgbablack50 absolute flex justify-center items-center z-10">
                                        <img :src="BettingCheckIn.icon_gou" alt="" class="w-[2rem] h-[2rem]">
                                    </em>
                                    <em v-if="item.status == 'expired'"
                                        class="w-full h-[5.8rem] mt-2 rounded-[0.3rem] bg-rgbablack50 absolute flex justify-center items-center z-10">
                                        <img :src="BettingCheckIn.icon_expirado" alt="" class="w-[2rem] h-[2rem]">
                                    </em>
                                </div>
                                <div class="relative h-[1.3rem] text-center ">
                                    <p class="h-[1.125rem] text-[0.8125rem]  leading-[2rem] text-center">
                                        <span class="text-[0.8rem] font-bold "
                                            :class="item.status == 'available' ? 'text-themewhite' : 'text-themetext0'">{{ currentUnit.value }}
                                            {{ Number(item.bonus) }}
                                        </span>
                                    </p>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                        <span>{{ t('ActivityDescription') }}</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-themetext3" v-html="contentRef"></article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_four'">
            <pu-card theme="3" class="relative">
                <div class="sharebox w-full mx-auto bg-rgbawhite10 rounded-[1rem] mt-2 px-2">
                    <p class="text-sm text-themetext1 px-4 pt-2">Convide amigos para se divertir</p>
                    <share-list class=" !py-1" :showName="false"></share-list>
                </div>
            </pu-card>
            <em class="w-full h-[11rem] block"> </em>
            <pu-card theme="3" class="mb-3 pt-3 relative ">
                <div class="w-full mb-4 h-auto  px-2 pb-3" :style="{
                    background: `url(${BettingCheckIn.img_djbg}) no-repeat`,
                    backgroundSize: '100% 100%'
                }">
                    <div class="h-[2.5rem] w-[10rem] absolute top-[-0.5rem] left-[30%] flex items-center justify-center font-bold "
                        :style="{
                            background: `url(${BettingCheckIn.img_dj}) no-repeat`,
                            backgroundSize: '100% 100%',
                        }">
                        <span class="text-[1.5rem] mt-1" style="transform: skewX(-15deg);">V{{ current_levelRef
                        }}</span>
                    </div>
                    <div class="flex flex-col items-center justify-center  ">
                        <dd
                            class="w-[96%] h-[0.4rem] bg-rgbablack50 rounded-full overflow-hidden flex relative top-[2.5rem]">
                            <em :style="{ width: progressWidth }"
                                class="h-full bg-[#ffe400] rounded-full flex justify-end overflow-hidden">
                                <!-- <i class="w-2 h-2 bg-themewhite rounded-full"></i> -->
                            </em>
                        </dd>
                        <div class="absolute top-[1.8rem] left-[15.5%] w-[75%] h-[2.5rem]">
                            <div v-for="(item, index) in levelsRef" :key="item.level"
                                class="itme absolute flex flex-col items-center justify-center -translate-x-1/2"
                                :style="{ left: getLevelLeft(index) }">
                                <span class="text-[0.8rem] text-themeblack">{{ item.min_bet }}</span>
                                <!-- 1黑2亮 -->
                                <img :src="index === 0 || Number(moneyRef || 0) >= Number(item.min_bet || 0) ? BettingCheckIn.icon_pontos2 : BettingCheckIn.icon_pontos1"
                                    alt="" class="w-[1rem] h-[1rem] mb-[0.1rem]" />
                                <img :src="BettingCheckIn[`icon_lv${Math.min(item.level, 6)}`] || BettingCheckIn.icon_lv1"
                                    alt="" class="w-[1.75rem] h-[1.75rem]" />
                            </div>
                        </div>

                    </div>
                    <div class="bg-rgbablack30 text-xs text-themeblack px-3 py-1 rounded-lg mt-[5rem] ">
                        <p>Apostar durante <span class="text-themetext0">{{ streak_daysRef }}</span> dias consecutivos
                        </p>
                        <p class="mt-1">Você pode resgatar sua recompensa em até <span class="text-themetext0">{{ 7 -
                                streak_daysRef }}</span> dias.
                        </p>
                        <p class="flex justify-left text-left mt-1 ">
                            <img :src="BettingCheckIn.icon_tibi" alt="" class="w-[0.88rem] h-[0.88rem] mr-1" />
                            <span>(É necessário apostar durante <span class="text-themetext0">7</span> dias consecutivos.)</span>
                        </p>
                    </div>
                </div>
                <div class=" mt-2 px-3 py-2" :style="{
                    backgroundImage: `url(${BettingCheckIn.img_checkinbg})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                }">
                    <div class="flex items-center justify-between mt-8">
                        <div class="flex flex-col">
                            <p class="font-bold text-themetext0 ">{{ currentUnit.value }} {{ Number(lastmoneyRef).toFixed(2) }}</p>
                            <p class="text-[0.58rem] text-themetext3">Por favor, resgate a sua recompensa.</p>
                        </div>
                        <img :src="BettingCheckIn[`icon_lv${claim_levelRef == 1 ? 2 : claim_levelRef}`]"
                            class="mr-2 w-[2.5rem] h-[2.5rem]" />

                    </div>

                    <ul class=" flex flex-wrap justify-between mt-5">
                        <!-- item,index in signConfigRef.configList||[] -->
                        <template v-for="(item, index) in listRef" :key="index">
                            <!--  -->
                            <li :style="{
                                backgroundImage:
                                index < 6 && item.status == 'locked'|| index < 6 && item.status == 'expired' ? `url(${BettingCheckIn.item_bg1})` :
                                index == 6 && item.status == 'locked' || index == 6 && item.status == 'expired'? `url(${BettingCheckIn.item_bg3})` :
                                            index < 6 && item.status == 'available' ? `url(${BettingCheckIn.item_bg2})` :
                                                index == 6 && item.status == 'available' ? `url(${BettingCheckIn.item_bg4})` : ''
                            }" class="bg-no-repeat bg-fill relative block mb-2"
                            @click="onclickData(item)"
                                :class="index == 6 ? 'w-[9.8rem]' : 'w-[4.7rem]  h-[5.8rem]'">
                                <!-- <em v-if="item.status == 1" class="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                                        <img :src=SignImg.bg_light class="w-[4.9375rem] h-[4.9375rem] sign-day-light">
                                    </em> -->
                                <p class="text-[0.64rem] leading-[1.25rem]  text-center text-themewhite">
                                    <span>Dia {{ index + 1 }}</span>
                                </p>
                                <div class="w-full h-[2.825rem] flex flex-col items-center justify-center relative">
                                    <div v-if="index != 6" class=" flex justify-center">
                                        <div class="relative flex justify-cente">
                                            <img :src="BettingCheckIn[`coin${index + 1}`]" class="w-auto h-[2.3rem] ">
                                        </div>
                                    </div>
                                    <!-- <em v-if="item.status==4 " class="w-full h-full rounded-[0.5625rem] bg-rgbablack50 text-rgbawhite80 not-italic absolute top-0 left-0 flex items-center justify-center">
                                            <p class="px-2 text-[0.6875rem] text-center">SUBSCRIPTION INTERRUPTED</p>
                                        </em> -->
                                    <!-- v-if="item.status == 2" -->
                                    <em v-if="item.status == 'claimed'"
                                        class="w-full h-[5.8rem] mt-2 rounded-[0.3rem] bg-rgbablack50 absolute flex justify-center items-center z-10">
                                        <img :src="BettingCheckIn.icon_gou" alt="" class="w-[1.25rem] h-[1.25rem]">
                                    </em>
                                    <em v-if="item.status == 'expired'"
                                        class="w-full h-[5.9rem] mt-2 rounded-[0.3rem] bg-rgbablack50 absolute flex justify-center items-center z-10">
                                        <img :src="BettingCheckIn.icon_expirado" alt="" class="w-[2rem] h-[2rem]">
                                    </em>
                                </div>
                                <div class="relative h-[1.3rem] text-center ">
                                    <p class="h-[1.125rem] text-[0.8125rem]  leading-[2rem] text-center">
                                        <span class=" text-[0.8rem] font-bold"
                                            :class="item.status == 'available' ? 'text-themewhite' : 'text-themetext0'">{{ currentUnit.value }}
                                            {{ Number(item.bonus) }}
                                        </span>
                                    </p>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                    <span>Descrição da Atividade:</span>
                </h5>
                <article class="ctx-article p-mb text-sm text-themetext3" v-html="contentRef"></article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_five'">
            <pu-card theme="3" class="relative">
                <div class="sharebox w-full mx-auto bg-rgbablack50 rounded-[1rem] mt-2 px-2 relative z-100">
                    <p class="text-sm text-themetext4 px-4 pt-2">Convide amigos para se divertir</p>
                    <share-list class=" !py-1" :showName="false"></share-list>
                </div>
            </pu-card>
            <em class="w-full h-[11rem] block"> </em>
            <pu-card theme="3" class="mb-3 pt-3 relative ">
                <div class="w-full mb-4 h-auto  px-2 pb-3 " :style="{
                    background: `url(${BettingCheckIn.img_djbg}) no-repeat`,
                    backgroundSize: '100% 100%'
                }">
                    <div class="h-[2.5rem] w-[10rem] absolute top-[-0.5rem] left-[30%] flex items-center justify-center font-bold "
                        :style="{
                            background: `url(${BettingCheckIn.img_dj}) no-repeat`,
                            backgroundSize: '100% 100%',
                        }">
                        <span class="text-[1.5rem] mt-1" style="transform: skewX(-15deg);">V{{ current_levelRef
                        }}</span>
                    </div>
                    <div class="flex flex-col items-center justify-center  ">
                        <dd
                            class="w-[96%] h-[0.4rem] bg-rgbablack50 rounded-full overflow-hidden flex relative top-[2.5rem]">
                            <em :style="{ width: progressWidth }"
                                class="h-full bg-[#ffe400] rounded-full flex justify-end overflow-hidden">
                                <!-- <i class="w-2 h-2 bg-themewhite rounded-full"></i> -->
                            </em>
                        </dd>
                        <div class="absolute top-[2.2rem] left-[15.5%] w-[75%] h-[2.5rem]">
                            <div v-for="(item, index) in levelsRef" :key="item.level"
                                class="itme absolute flex flex-col items-center justify-center -translate-x-1/2"
                                :style="{ left: getLevelLeft(index) }">
                                <span class="text-[0.8rem] text-themeblack leading-3">{{ item.min_bet }}</span>
                                <!-- 1黑2亮 -->
                                <img :src="index === 0 || Number(moneyRef || 0) >= Number(item.min_bet || 0) ? BettingCheckIn.icon_pontos2 : BettingCheckIn.icon_pontos1"
                                    alt="" class="w-[1rem] h-[1rem] mb-[0.1rem]" />
                                <img :src="BettingCheckIn[`icon_lv${Math.min(item.level, 6)}`] || BettingCheckIn.icon_lv1"
                                    alt="" class="w-[1.75rem] h-[1.75rem]" />
                            </div>
                        </div>

                    </div>
                    <div class="bg-rgbablack30 text-xs text-themeblack px-3 py-1 rounded-lg mt-[5rem] ">
                        <p>Apostar durante <span class="text-themetext0">{{ streak_daysRef }}</span> dias consecutivos
                        </p>
                        <p class="mt-1">Você pode resgatar sua recompensa em até <span class="text-themetext0">{{ 7 -
                                streak_daysRef }}</span> dias.
                        </p>
                        <p class="flex justify-left text-left mt-1 ">
                            <img :src="BettingCheckIn.icon_tibi" alt="" class="w-[0.88rem] h-[0.88rem] mr-1" />
                            <span>(É necessário apostar durante <span class="text-themetext0">7</span> dias consecutivos.)</span>
                        </p>
                    </div>
                </div>
                <div class=" mt-2 px-3 py-2" :style="{
                    backgroundImage: `url(${BettingCheckIn.img_checkinbg})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                }">
                    <div class="flex items-center justify-between mt-8 relative z-10">
                        <div class="flex flex-col">
                            <p class="font-bold text-themetext0 ">{{ currentUnit.value }} {{ Number(lastmoneyRef).toFixed(2) }}</p>
                            <p class="text-[0.58rem] text-themetext3">Por favor, resgate a sua recompensa.</p>
                        </div>
                        <img :src="BettingCheckIn[`icon_lv${claim_levelRef == 1 ? 2 : claim_levelRef}`]"
                            class="mr-2 w-[2.5rem] h-[2.5rem] absolute top-[-3.2rem] right-[-0.5rem]" />

                    </div>

                    <ul class=" flex flex-wrap justify-between mt-5">
                        <!-- item,index in signConfigRef.configList||[] -->
                        <template v-for="(item, index) in listRef" :key="index">
                            <!--  -->
                            <li :style="{
                                backgroundImage:
                                index < 6 && item.status == 'locked'|| index < 6 && item.status == 'expired' ? `url(${BettingCheckIn.item_bg1})` :
                                index == 6 && item.status == 'locked' || index == 6 && item.status == 'expired'? `url(${BettingCheckIn.item_bg3})` :
                                            index < 6 && item.status == 'available' ? `url(${BettingCheckIn.item_bg2})` :
                                                index == 6 && item.status == 'available' ? `url(${BettingCheckIn.item_bg4})` : ''
                            }" class="bg-no-repeat bg-fill relative block mb-2"
                            @click="onclickData(item)"
                                :class="index == 6 ? 'w-[9.8rem]' : 'w-[4.7rem]  h-[5.8rem]'">
                                <div class="w-full h-[1rem] flex items-center mt-[0.2rem] justify-center relative">
                                     <img v-if="index != 6 " :src="BettingCheckIn[`icon_dia${index + 1}`]" class="w-[1.6rem] h-[0.7rem]"  alt="">
                                </div>
                                <div class="w-full h-[2.825rem] flex flex-col items-center justify-center relative">
                                    <div v-if="index != 6" class=" flex justify-center">
                                        <div class="relative flex justify-cente">
                                            <img :src="BettingCheckIn[`coin${index + 1}`]" class="w-auto h-[2.3rem] ">
                                        </div>
                                    </div>
                                    <em v-if="item.status == 'claimed'"
                                        class="w-full h-[5.8rem] mt-2 rounded-[0.3rem] bg-rgbablack50 absolute flex justify-center items-center z-10">
                                        <img :src="BettingCheckIn.icon_gou" alt="" class="w-[1.25rem] h-[1.25rem]">
                                    </em>
                                    <em v-if="item.status == 'expired'"
                                        class="w-full h-[5.9rem] mt-2 rounded-[0.3rem] bg-rgbablack50 absolute flex justify-center items-center z-10">
                                        <img :src="BettingCheckIn.icon_expirado" alt="" class="w-[2rem] h-[2rem]">
                                    </em>
                                </div>
                                <div class="relative h-[1.3rem] text-center ">
                                    <p class="h-[1.125rem] text-[0.8125rem]  leading-[1.5rem] text-center">
                                        <span class=" text-[0.8rem] font-bold"
                                            :class="item.status == 'available' ? 'text-themewhite' : 'text-themetext0'">{{ currentUnit.value }}
                                            {{ Number(item.bonus) }}
                                        </span>
                                    </p>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                    <span>Descrição da Atividade:</span>
                </h5>
                <article class="ctx-article p-mb text-sm text-themetext4" v-html="contentRef"></article>
            </pu-card>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
