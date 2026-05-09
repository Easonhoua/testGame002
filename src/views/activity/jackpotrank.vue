<script setup>
function formatCompact(n) {
  const num = Number(n || 0)
  if (!isFinite(num)) return '0'
  const abs = Math.abs(num)
  const sign = num < 0 ? '-' : ''
  // 5位数及以上简写为 K；4位数（<10000）不简写
  if (abs >= 10000) {
    const v = (abs / 1000).toFixed(2)
    return sign + v.replace(/\.00$/, '') + 'K'
  }
  const v = abs.toFixed(2)
  return sign + v.replace(/\.00$/, '')
}
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import { fn } from '@/i18n'
import { useRouter } from 'vue-router'
import { playBtnAudioFunc } from '@/utils/core'
import { isAuthRef } from '@/model/user'
import { openLoginFunc } from '@/utils/config'
import { useJackpotModel } from '@/model/jackpot'
import { useThemeImages } from '@/utils/themeimg'

const CommonImg = useThemeImages().common
const RankImg = useThemeImages().jprank

const router = useRouter()

// 使用Jackpot数据模型
const {
  rulesConfig,
  jackpotInfo,
  rankingData,
  memberRankInfo,

  currentJackpot,
  currentRanking,
  currentMember,

  historyJackpot,
  historyRankData,
  currentHistoryJackpot,
  currentHistoryRankData,

  rewardRecord,

  // 倒计时相关
  rankTypes,
  getCountdownText,

  initData,
  getHistory,
  getReward,

} = useJackpotModel()

// 响应式数据
const activeTab = ref('dayRank') // daily: 日榜, weekly: 周榜, monthly: 月榜
const historyActiveTab = ref('dayRank')

const showHistoryModal = ref(false) // 控制历史记录弹窗显示
const showRulerModal = ref(false)  // 控制规则弹窗显示
const showRewardModal = ref(false) // 控制奖励弹窗显示

// 倒计时相关状态
const countdownTimer = ref(null)
const uiTick = ref(0)

// Jackpot 数值动画与定时器
const displayJackpot = ref(0)
const jackpotTimer = ref(null)
let jackpotRafId = 0

function animateJackpot(toValue) {
  const fromValue = Number(displayJackpot.value) || 0
  const targetValue = Number(toValue) || 0
  const durationMs = 900
  const startAt = performance.now()

  if (jackpotRafId) cancelAnimationFrame(jackpotRafId)

  const step = (now) => {
    const elapsed = now - startAt
    const t = Math.min(1, elapsed / durationMs)
    // easeOutCubic
    const eased = 1 - Math.pow(1 - t, 3)
    displayJackpot.value = fromValue + (targetValue - fromValue) * eased
    if (t < 1) {
      jackpotRafId = requestAnimationFrame(step)
    } else {
      displayJackpot.value = targetValue
      jackpotRafId = 0
    }
  }

  jackpotRafId = requestAnimationFrame(step)
}

// 标签切换
async function switchTab(type) {
  playBtnAudioFunc()
  activeTab.value = type.key

  currentJackpot.value = jackpotInfo.value[type.jpkey] || {}
  currentRanking.value = rankingData.value[type.key] || []
  currentMember.value = memberRankInfo.value[type.mkey] || {}

  currentMember.value.state = 0
  if (currentMember.value.rank !== undefined && currentMember.value.rank !== null) {
    currentMember.value.state = 2
  }

  if (currentMember.value.member_id !== undefined && (currentMember.value.rank === undefined || currentMember.value.rank === null)) {
    currentMember.value.state = 1
  }
}

// 切换历史记录标签
function switchHistoryTab(type) {
  playBtnAudioFunc()
  historyActiveTab.value = type.key

  currentHistoryJackpot.value = historyJackpot.value[type.jpkey] || {}
  currentHistoryRankData.value = historyRankData.value[type.key] || { players: [] }
}

// 查看历史
function viewHistory() {
  playBtnAudioFunc()
  showHistoryModal.value = true
  getHistory()
}

// 查看规则
function viewRules() {
  playBtnAudioFunc()
  showRulerModal.value = true
}

//查看奖励
function viewReward() {
  playBtnAudioFunc()
  showRewardModal.value = true
  getReward()
}

// 关闭历史记录弹窗
function closeHistoryModal() {
  showHistoryModal.value = false
}

function closeRuleModal() {
  showRulerModal.value = false
}

function closeRewardModal() {
  showRewardModal.value = false
}

// 提升排名
async function improveRanking() {
  playBtnAudioFunc()
  // 跳转到投注页面或相关页面
  router.push('/')
}

function goToAttend() {
  playBtnAudioFunc()
  if (!isAuthRef.value) {
    openLoginFunc(0)
    return
  }

  // 跳转到投注页面或相关页面
  router.push('/')
}

onMounted(async () => {
  await initData()
  // 初始化显示值
  displayJackpot.value = Number(currentJackpot.value?.jackpot) || 0

  // 启动Jackpot递增定时器（每2秒）
  jackpotTimer.value = setInterval(() => {
    const base = Number(currentJackpot.value?.jackpot) || 0
    const inc = Math.floor(Math.random() * 21) + 10 // 10-30
    const next = base + inc
    // 更新源数据
    if (currentJackpot.value) currentJackpot.value.jackpot = next
    // 平滑动画到目标值
    animateJackpot(next)
  }, 2000)

  // 启动倒计时定时器
  countdownTimer.value = setInterval(() => {
    uiTick.value++
  }, 1000)

  setOptimalSpacing()
  // window.addEventListener('resize', setOptimalSpacing)
})

function setOptimalSpacing() {
  const element = document.querySelector('.jackpot-glow')
  if (!element) return

  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isHighDPI = window.devicePixelRatio > 1
  const width = window.innerWidth

  let spacing = '0.25em' // 默认

  if (isMobile) {
    // if (isHighDPI) {
    //   spacing = width <= 480 ? '0.25em' : '0.25em'
    // } else {
    //   spacing = width <= 480 ? '0.20em' : '0.20em'
    // }
  } else {
    // 桌面浏览器
    spacing = isHighDPI ? '0.3em' : '0.31em'
  }
  element.style.letterSpacing = spacing

}

onUnmounted(() => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
    countdownTimer.value = null
  }
  if (jackpotTimer.value) {
    clearInterval(jackpotTimer.value)
    jackpotTimer.value = null
  }
  if (jackpotRafId) {
    cancelAnimationFrame(jackpotRafId)
    jackpotRafId = 0
  }
})

// 当切换榜单或服务端刷新导致 jackpot 变化时，平滑过渡到新值
watch(
  () => currentJackpot.value?.jackpot,
  (next) => {
    if (next == null) return
    animateJackpot(Number(next) || 0)
  }
)

</script>

<template>
  <pu-page title="Jackpot" class="z-[999]"
    v-if="currentTemplate.value == 'template_one' || currentTemplate.value == 'template_two'">
    <img :src=RankImg.img_rankbg class="w-full h-auto object-cover absolute top-0 left-0" alt="bg" />

    <!-- 顶部按钮 -->
    <pu-card theme="4" class="relative">

      <img :src=RankImg.gif_coin class="w-[15rem] h-auto absolute top-8 left-0" />
      <img :src=RankImg.gif_coin class="w-[15rem] h-auto absolute top-8 -right-1" />

      <img :src=RankImg.img_jpbg class="w-full h-auto absolute -top-10 left-0" alt="jpbg" />

      <!-- 排行榜类型 -->
      <div class="flex justify-between items-center pt-2">
        <button v-for="(rankType, idx) in rankTypes" :key="rankType.key" @click="switchTab(rankType)"
          class="focus:outline-none flex-1 mx-1 relative overflow-hidden" style="min-width:0;">
          <img :src="activeTab === rankType.key
            ? RankImg.img_timebg1
            : RankImg.img_timebg2" :alt="rankType.name" class="w-full object-contain"
            style="max-width:unset;" />
          <!-- 文字内容覆盖在图片上 -->
          <div class="absolute inset-0 flex flex-col justify-center items-center text-center">
            <div
              :class="[activeTab === rankType.key ? 'text-four' : 'text-themewhite', 'text-[0.8rem] leading-tight px-1 pt-1']"
              v-if="currentTemplate.value == 'template_one'">
              {{ rankType.name }}
            </div>
            <div
              :class="[activeTab === rankType.key ? 'text-four' : 'text-textcolorsix', 'text-[0.8rem] leading-tight px-1 pt-1']"
              v-else>
              {{ rankType.name }}
            </div>
            <div class="flex items-center justify-center space-x-1">
              <img :src=RankImg.icon_time class="w-3 h-3" style="transform: translateY(-2px);" alt="时间" />
              <span class="text-themewhite text-xs">
                {{ getCountdownText(rankType.jpkey, uiTick) }}
              </span>
            </div>
          </div>
        </button>
      </div>

      <!-- Jackpot金额 -->
      <div class="flex justify-end items-center pt-[5.8rem] pl-1 pr-[4.8rem] relative z-20">
        <div class="relative flex items-center justify-end w-full">
          <div
            class="jackpot-glow relative text-right text-4xl font-themeblack text-yellow-300 font-mono drop-shadow-lg tracking-widest select-none">
            {{ String(Math.floor(Number(displayJackpot) || 0)).padStart(7, '0') }}
            <span class="jackpot-sheen" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <!-- 规则提示文字 -->
      <div class="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 pt-3 z-30">
        <div
          class="text-themewhite text-xs px-3 py-1 bg-rgbablack50 rounded-full font-bold leading-tight whitespace-nowrap">
          <span class="text-four text-[0.5rem]">
            {{ activeTab === 'dayRank' ? rulesConfig.bet_rank_day_pump : activeTab === 'weekRank' ?
              rulesConfig.bet_rank_week_pump : rulesConfig.bet_rank_month_pump }}%
          </span><span class="text-themewhite text-[0.5rem]">da aposta total dos jogos selecionados</span>
        </div>
      </div>

      <!-- 礼物按钮 -->
      <button @click="viewReward" class="w-8 h-8 flex items-center justify-center absolute top-12 right-1 z-30">
        <img :src=RankImg.btn_gift class="w-8 h-8" alt="礼物" />
      </button>

      <button @click="viewHistory" class="flex items-center justify-center absolute pt-3 z-30">
        <img :src=RankImg.btn_history class="w-auto h-8" alt="历史" />
      </button>

      <button @click="viewRules" class="flex items-center justify-center absolute pt-3 right-0 z-30">
        <img :src=RankImg.btn_rule class="w-auto h-8" alt="礼物" />
      </button>
    </pu-card>

    <!-- 排行榜内容（包含前三名和列表） -->
    <pu-card theme="3" class="pt-10"
      v-if="currentTemplate.value == 'template_one' || currentTemplate.value == 'template_two'||currentTemplate.value == 'template_five'">
      <div class="z-20 overflow-y-auto"
        style="height: calc(100vh - 20rem); padding-bottom: calc(3rem + env(safe-area-inset-bottom)); overscroll-behavior-x: contain; touch-action: pan-y;">
        <!-- 前三名玩家 -->
        <div class="mx-ctx mt-5 flex items-end justify-center relative z-20 mb-6">
          <!-- 第二名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no2 class="w-full h-full" alt="第二名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[2.8rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-5 py-1 rounded-full font-bold leading-tight" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[1]?.username || 'player2' }}
              </div>
              <div class="flex items-center justify-center text-themewhite mt-0.5">
                <img :src=RankImg.icon_money class="w-3 h-3 mr-1" alt="金币" />
                <span class="text-xs">{{ formatCompact(currentRanking[1]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.7rem] font-themeblack leading-none mt-0.5 text-four font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                R${{ formatCompact(currentRanking[1]?.bonus) }}
              </div>
              <div class="text-[0.7rem] font-themeblack leading-none text-four font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                ({{ currentRanking[1]?.rate || 0 }}%)
              </div>
            </div>
          </div>

          <!-- 第一名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no1 class="w-full h-full" alt="第一名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[4.6rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-5 py-1 rounded-full font-bold" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[0]?.username || 'player1' }}
              </div>
              <div class="flex items-center justify-center text-themewhite mt-0.5">
                <img :src=RankImg.icon_money class="w-4 h-4 mr-1" alt="金币" />
                <span class="text-sm">{{ formatCompact(currentRanking[0]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.8rem] font-themeblack leading-none mt-0.5 text-four font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                R${{ formatCompact(currentRanking[0]?.bonus) }}
              </div>
              <div class="text-[0.8rem] font-themeblack leading-none text-four font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                ({{ currentRanking[0]?.rate || 0 }}%)
              </div>
            </div>
          </div>

          <!-- 第三名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no3 class="w-full h-full" alt="第三名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[2.9rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-5 py-1 rounded-full font-bold" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[2]?.username || 'player3' }}
              </div>
              <div class="flex items-center justify-center text-themewhite">
                <img :src=RankImg.icon_money class="w-4 h-4 mr-1" alt="金币" />
                <span class="text-xs">{{ formatCompact(currentRanking[2]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.65rem] font-themeblack leading-none mt-0.5 text-four font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                R${{ formatCompact(currentRanking[2]?.bonus) }}
              </div>
              <div class="text-[0.65rem] font-themeblack leading-none text-four font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                ({{ currentRanking[2]?.rate || 0 }}%)
              </div>
            </div>
          </div>
        </div>

        <!-- 排行榜列表（第4名及以后） -->
        <div class="space-y-1 ">
          <div v-for="(player, index) in (Array.isArray(currentRanking) ? currentRanking.slice(3) : [])" :key="index"
            class="relative pt-1">
            <!-- 背景图片 -->
            <img :src=RankImg.img_itembg loading="lazy" class="w-full h-full absolute inset-0" alt="排名背景" />

            <!-- 当前用户高亮光圈 -->
            <img v-if="player.rank === currentMember.rank" :src=RankImg.img_flight
              class="w-full h-full absolute inset-0 z-5 pointer-events-none"
              style="transform: scaleX(1.03) scaleY(1.2); transform-origin: center;" alt="highlight" />

            <!-- 内容覆盖在背景上 -->
            <div class="relative z-10 flex items-center justify-between h-full px-4">
              <!-- 前项：排名 -->
              <div class="flex items-center w-12 flex-shrink-0">
                <div class="w-8 h-8 flex items-center justify-center text-four font-bold text-2xl italic">
                  {{ player.rank }}
                </div>
              </div>

              <!-- 中项：用户名称和金额 -->
              <div class="flex flex-col flex-shrink-0 items-start mb-1 justify-start text-left">
                <div class="text-themewhite text-sm">
                  {{ player.username }}
                </div>
                <div class="flex items-start justify-start space-x-1 bg-rgbablack15 rounded-full px-2 py-1 w-auto h-6">
                  <img :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
                  <span class="text-sm font-normal text-four">{{ formatCompact(player.bet_amount) }}</span>
                </div>
              </div>

              <!-- 后项：奖金和排名变化 -->
              <div class="flex flex-col items-end justify-center flex-1 min-w-0">
                <div class="text-four text-[0.9rem]">
                  R${{ formatCompact(player.bonus) }}({{ player.rate }}%)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="height: calc(3rem + env(safe-area-inset-bottom));"></div>
      </div>
    </pu-card>

    <pu-card theme="3" class="pt-10" v-else="currentTemplate.value == 'template_three'">
      <div class="z-20 overflow-y-auto"
        style="height: calc(100vh - 20rem); padding-bottom: calc(3rem + env(safe-area-inset-bottom)); overscroll-behavior-x: contain; touch-action: pan-y;">
        <!-- 前三名玩家 -->
        <div class="mx-ctx mt-5 flex items-end justify-center relative z-20 mb-6">
          <!-- 第二名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no2 class="w-full h-full" alt="第二名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[2.8rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-5 py-1 rounded-full font-bold leading-tight" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[1]?.username || 'player2' }}
              </div>
              <div class="flex items-center justify-center text-themewhite mt-0.5">
                <img :src=RankImg.icon_money class="w-3 h-3 mr-1" alt="金币" />
                <span class="text-xs">{{ formatCompact(currentRanking[1]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.7rem] font-themeblack leading-none mt-0.5 text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                R${{ formatCompact(currentRanking[1]?.bonus) }}
              </div>
              <div class="text-[0.7rem] font-themeblack leading-none text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                ({{ currentRanking[1]?.rate || 0 }}%)
              </div>
            </div>
          </div>

          <!-- 第一名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no1 class="w-full h-full" alt="第一名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[4.6rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-5 py-1 rounded-full font-bold" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[0]?.username || 'player1' }}
              </div>
              <div class="flex items-center justify-center text-themewhite mt-0.5">
                <img :src=RankImg.icon_money class="w-4 h-4 mr-1" alt="金币" />
                <span class="text-sm">{{ formatCompact(currentRanking[0]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.8rem] font-themeblack leading-none mt-0.5 text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                R${{ formatCompact(currentRanking[0]?.bonus) }}
              </div>
              <div class="text-[0.8rem] font-themeblack leading-none text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                ({{ currentRanking[0]?.rate || 0 }}%)
              </div>
            </div>
          </div>

          <!-- 第三名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no3 class="w-full h-full" alt="第三名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[2.9rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-5 py-1 rounded-full font-bold" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[2]?.username || 'player3' }}
              </div>
              <div class="flex items-center justify-center text-themewhite">
                <img :src=RankImg.icon_money class="w-4 h-4 mr-1" alt="金币" />
                <span class="text-xs">{{ formatCompact(currentRanking[2]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.65rem] font-themeblack leading-none mt-0.5 text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                R${{ formatCompact(currentRanking[2]?.bonus) }}
              </div>
              <div class="text-[0.65rem] font-themeblack leading-none text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                ({{ currentRanking[2]?.rate || 0 }}%)
              </div>
            </div>
          </div>
        </div>

        <!-- 排行榜列表（第4名及以后） -->
        <div class="space-y-1 ">
          <div v-for="(player, index) in (Array.isArray(currentRanking) ? currentRanking.slice(3) : [])" :key="index"
            class="relative pt-1">
            <!-- 背景图片 -->
            <img :src=RankImg.img_itembg loading="lazy" class="w-full h-full absolute inset-0" alt="排名背景" />

            <!-- 当前用户高亮光圈 -->
            <img v-if="player.rank === currentMember.rank" :src=RankImg.img_flight
              class="w-full h-full absolute inset-0 z-5 pointer-events-none"
              style="transform: scaleX(1.03) scaleY(1.2); transform-origin: center;" alt="highlight" />

            <!-- 内容覆盖在背景上 -->
            <div class="relative z-10 flex items-center justify-between h-full px-4">
              <!-- 前项：排名 -->
              <div class="flex items-center w-12 flex-shrink-0">
                <div class="w-8 h-8 flex items-center justify-center text-themetext0 font-bold text-2xl italic">
                  {{ player.rank }}
                </div>
              </div>

              <!-- 中项：用户名称和金额 -->
              <div class="flex flex-col flex-shrink-0 items-start mb-1 justify-start text-left">
                <div class="text-themewhite text-sm">
                  {{ player.username }}
                </div>
                <div class="flex items-start justify-start space-x-1 bg-rgbablack15 rounded-full px-2 py-1 w-auto h-6">
                  <img :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
                  <span class="text-sm font-normal text-four">{{ formatCompact(player.bet_amount) }}</span>
                </div>
              </div>

              <!-- 后项：奖金和排名变化 -->
              <div class="flex flex-col items-end justify-center flex-1 min-w-0">
                <div class="text-themetext0 text-[0.9rem]">
                  R${{ formatCompact(player.bonus) }}({{ player.rate }}%)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="height: calc(3rem + env(safe-area-inset-bottom));"></div>
      </div>
    </pu-card>

    <!-- 底部信息栏 -->
    <div class="fixed left-1/2 -translate-x-1/2 bottom-0 w-wrap h-20 flex justify-center items-center z-50 ">

      <img :src=RankImg.img_infobg class="w-full h-auto pt-3 object-cover absolute inset-0" alt="底部背景" />

      <div class="relative z-10 flex items-center justify-between h-18 px-4 pt-3">

        <!-- 玩家不满足上榜条件时显示 -->
        <!-- currentMember.state==0 -->
        <template v-if="currentMember.state == 0">
          <div class="flex flex-col items-center justify-center text-themewhite">
            <div class="text-xs mb-1 text-center">
              Você precisa de <span class="text-four">{{ isAuthRef ? currentMember.ranksLeft : rulesConfig.bet_rank_limit
                }}</span> apostas extras para participar do ranking
            </div>
          </div>

          <div class="flex items-center justify-center">
            <button @click="goToAttend"
              class="w-32 h-10  text-themewhite px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-lg"
              :class="currentTemplate.value == 'template_one' ? 'bg-gradient-to-r from-linear-18 to-linear-19 hover:from-linear-18 hover:to-linear-19' : 'm2-btn-ten hover:from-downloadlinear3 hover:to-downloadlinear4'">
              Vá participar
            </button>
          </div>
        </template>

        <!-- 玩家满足上榜条件时显示原有三项 -->
        <template v-else>
          <div class="flex flex-col items-center justify-center text-themewhite mr-1">
            <div
              class="text-[0.75rem] text-themewhite h-4 mb-1 flex items-center justify-center w-full whitespace-nowrap">
              {{ currentMember.state == 2 ? 'Sua classificação' : 'Fileiras restantes' }}
            </div>
            <div class="flex items-center justify-center space-x-1">
              <img v-if="currentMember.state !== 2" :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
              <span class="text-four font-bold  " :class="currentMember.state == 1 ? 'text-sm' : 'h-6 text-[1.25rem]'">{{
                currentMember.state == 1 ? currentMember.ranksLeft : currentMember.rank }}</span>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center text-themewhite mx-3">
            <div class="flex items-center mb-1">
              <img :src=RankImg.icon_user class="w-4 h-4 " alt="用户" />
              <span class="text-[0.75rem] text-themewhite">{{ currentMember.username }}</span>
            </div>
            <div class="flex items-center justify-center space-x-1">
              <img :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
              <span class=" font-bold text-sm text-four">{{ currentMember.bet_amount }}</span>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center ml-2">
            <button @click="improveRanking"
              class="w-30 h-8 text-themewhite px-2 py-2 rounded-full font-bold text-[0.75rem] transition-all duration-300 shadow-lg whitespace-nowrap"
              :class="currentTemplate.value == 'template_one' ? 'bg-gradient-to-r from-linear-18 to-linear-19 hover:from-linear-18 hover:to-linear-19' : 'm2-btn-ten hover:from-downloadlinear3 hover:to-downloadlinear4'"
             
              >
              Melhorar a classificação
            </button>
            <span class="font-bold text-[0.60rem] text-var(--color-themewhite) mt-1">Recompensa:{{
              currentMember.state == 2 ? ('R$' + (currentMember?.bonus ?? '--')) : '--' }}</span>
          </div>
        </template>
      </div>
    </div>

    <!-- 历史弹窗 -->
    <div v-if="showHistoryModal" class="fixed inset-0 bg-rgbablack50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]">
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0" alt="弹窗背景" />

        <!-- 内容覆盖在背景上 -->
        <div class="relative z-10 p-2 ">
          <!-- 标题和关闭按钮 -->
          <div class="relative flex items-center justify-between pt-3 mb-4">
            <h2 class="absolute top-0 left-1/2 -translate-x-1/2 text-yellow-400 text-xl font-bold">História</h2>
            <button @click="closeHistoryModal" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
              <img :src=CommonImg.btn_close alt="关闭" class="w-5 h-5" />
            </button>
          </div>

          <!-- 排行榜类型 -->
          <div class="flex justify-between items-center pt-5">
            <button v-for="(rankType, idx) in rankTypes" :key="rankType.key" @click="switchHistoryTab(rankType)"
              class="focus:outline-none flex-1 mx-1 relative overflow-hidden" style="min-width:0;">
              <img :src="historyActiveTab === rankType.key
                ? RankImg.img_timebg1
                : RankImg.img_timebg2" :alt="rankType.name" class="w-full object-contain"
                style="max-width:unset;" />
              <!-- 文字内容覆盖在图片上 -->
              <div class="absolute inset-0 flex flex-col justify-center items-center text-center"
                v-if="currentTemplate.value == 'template_one'">
                <div
                  :class="[historyActiveTab === rankType.key ? 'text-four' : 'text-themewhite', 'text-[0.8rem] leading-tight px-1 pt-1']">
                  {{ rankType.name }}</div>
              </div>
              <div class="absolute inset-0 flex flex-col justify-center items-center text-center" v-else>
                <div
                  :class="[historyActiveTab === rankType.key ? 'text-four' : 'text-three', 'text-[0.8rem] leading-tight px-1 pt-1']">
                  {{ rankType.name }}</div>
              </div>
            </button>
          </div>

          <!-- Jackpot金额显示 -->
          <div class="relative text-center pt-3 mb-4">
            <img :src=RankImg.img_itembg class="w-full h-18 object-cover" />
            <div
              class="text-yellow-400 text-2xl font-bold mb-1 absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              JACKPOT: {{ Math.ceil(currentHistoryJackpot.jackpot) }}
            </div>
            <div class="text-themewhite text-[0.55rem] absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
              O Jackpot anterior {{ Math.ceil(currentHistoryJackpot.clearing_bouns) }} foi adicionado ao próximo Jackpot
            </div>
          </div>

          <!-- 历史记录列表 -->
          <div class="rounded-lg">
            <!-- 表头 - 调整列宽比例 -->
            <div class="grid grid-cols-4 text-xs mb-0 whitespace-nowrap bg-rgbablack30 p-3"
              :class="currentTemplate.value == 'template_one' ? ' text-themewhite' : 'text-three '"
              style="grid-template-columns: 0.8fr 1.2fr 1fr 1.5fr;">
              <div class="text-center  ">Classificação</div>
              <div class="text-center  ">Nome</div>
              <div class="text-center ">Apostas totais</div>
              <div class="text-center ">Recompensa</div>
            </div>

            <!-- 列表内容 -->
            <!--  -->
            <div class="h-56 overflow-y-auto overflow-x-hidden">
              <div v-for="(record, index) in currentHistoryRankData" :key="index" class="grid grid-cols-4 py-2"
                :style="{ backgroundColor: index % 2 === 0 ? 'var(--color-tablergba40)' : 'var(--color-tablergba20)' }"
                style="grid-template-columns: 0.8fr 1.2fr 1fr 1.5fr;">
                <div class="text-center text-four truncate px-1 text-xs">{{ record.rank }}</div>
                <div class="text-center  truncate px-1 text-xs"
                  :class="currentTemplate.value == 'template_one' ? 'text-themewhite' : 'text-three'">{{ record.username }}
                </div>
                <div class="text-center text-themewhite truncate px-1 text-xs"
                  :class="currentTemplate.value == 'template_one' ? 'text-themewhite' : 'text-three'">{{
                    formatCompact(record.bet_amount)}}</div>
                <!-- 最后一列使用更小的字体 -->
                <div class="text-center text-four truncate px-1 text-xs leading-tight">
                  R${{ formatCompact(record.bonus) }}({{ record.rate }}%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </pu-card>
    </div>

    <!-- 规则弹窗 -->
    <div v-if="showRulerModal" class="fixed inset-0 bg-rgbablack50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]"
        v-if="currentTemplate.value == 'template_one' || currentTemplate.value == 'template_two'">
        <!-- 背景 img 已在卡片内绝对定位，无需改动 -->
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0 z-0" alt="弹窗背景" />
        <!-- 标题和关闭按钮 -->
        <div class="relative flex items-center justify-between pt-3 mb-4">
          <h2 class="absolute top-2 left-1/2 -translate-x-1/2 text-yellow-400 text-xl font-bold">Regras</h2>
          <button @click="closeRuleModal" class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center">
            <img :src=CommonImg.btn_close alt="关闭" class="w-5 h-5" />
          </button>
        </div>

        <div class="relative z-10 p-5">
          <!-- 同一滚动容器，包含三块内容 -->
          <div class="modal-scroll ">
            <!-- 标题分割线 -->
            <div class="w-full mb-4 pt-5 flex items-center">
              <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent"
                :class="[currentTemplate.value == 'template_one' ? ' to-one' : ' to-four']"></em>
              <h5 class="ma-w-[60%] px-2 text-sm text-center "
                :class="[currentTemplate.value == 'template_one' ? ' text-one' : ' text-four']">
                <span>Recompensa da atividade</span>
              </h5>
              <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent"
                :class="[currentTemplate.value == 'template_one' ? 'to-one' : ' to-four']"></em>
            </div>
            <!-- 规则内容 -->
            <article class="ctx-article p-mb text-sm text-rgbawhite50" v-html="rulesConfig.bet_rank_content"></article>
            <!-- 奖励配置表（表头+列表） -->
            <div class="rounded-lg">
              <div class="grid grid-cols-4  text-xs mb-0 whitespace-nowrap bg-rgbablack30 p-3"
                :class="[currentTemplate.value == 'template_one' ? ' text-themewhite' : ' text-three']"
                style="grid-template-columns: 1.2fr 1.2fr 1.2fr 1.5fr;">
                <div class="text-center">Classificaçäo</div>
                <div class="text-center">Lista DIA</div>
                <div class="text-center">Lista SEM</div>
                <div class="text-center">Lista Mês</div>
              </div>

              <!-- 注意：这里不再设置 h-[14rem] 和 overflow -->
              <div>
                <div v-for="(record, index) in rulesConfig.bet_rank_config" :key="index"
                  class="grid grid-cols-4  text-xs py-2"
                  :class="[currentTemplate.value == 'template_one' ? ' text-themewhite' : ' text-three']"
                  :style="{ backgroundColor: index % 2 === 0 ? 'var(--color-tablergba20)' : 'var(--color-tablergba40)' }"
                  style="grid-template-columns: 1.2fr 1.2fr 1.2fr 1.5fr;">
                  <div class="text-center ">{{ record.rank }}</div>
                  <div class="text-center ">{{ record.day }}%</div>
                  <div class="text-center ">{{ record.week }}%</div>
                  <div class="text-center flex items-center justify-center space-x-1">
                    <span class="">{{ record.month }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </pu-card>

      <pu-card theme="4" class="relative w-[23rem]" v-else>
        <!-- 背景 img 已在卡片内绝对定位，无需改动 -->
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0 z-0" alt="弹窗背景" />
        <!-- 标题和关闭按钮 -->
        <div class="relative flex items-center justify-between pt-3 mb-4">
          <h2 class="absolute top-2 left-1/2 -translate-x-1/2 text-themetext0 text-xl font-bold">Regras</h2>
          <button @click="closeRuleModal" class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center">
            <img :src=CommonImg.btn_close alt="关闭" class="w-5 h-5" />
          </button>
        </div>

        <div class="relative z-10 p-5">
          <!-- 同一滚动容器，包含三块内容 -->
          <div class="modal-scroll ">
            <!-- 标题分割线 -->
            <div class="w-full mb-4 pt-5 flex items-center">
              <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
              <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                <span>Recompensa da atividade</span>
              </h5>
              <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
            </div>
            <!-- 规则内容 -->
            <article class="ctx-article p-mb text-sm text-themetext3" v-html="rulesConfig.bet_rank_content"></article>
            <!-- 奖励配置表（表头+列表） -->
            <div class="rounded-lg">
              <div class="grid grid-cols-4  text-xs mb-0 whitespace-nowrap bg-rgbablack30 p-3 text-themetext2"
                style="grid-template-columns: 1.2fr 1.2fr 1.2fr 1.5fr;">
                <div class="text-center">Classificaçäo</div>
                <div class="text-center">Lista DIA</div>
                <div class="text-center">Lista SEM</div>
                <div class="text-center">Lista Mês</div>
              </div>

              <!-- 注意：这里不再设置 h-[14rem] 和 overflow -->
              <div>
                <div v-for="(record, index) in rulesConfig.bet_rank_config" :key="index"
                  class="grid grid-cols-4  text-xs py-2 text-themetext2"
                  :style="{ backgroundColor: index % 2 === 0 ? 'var(--color-tablergba20)' : 'var(--color-tablergba40)' }"
                  style="grid-template-columns: 1.2fr 1.2fr 1.2fr 1.5fr;">
                  <div class="text-center ">{{ record.rank }}</div>
                  <div class="text-center ">{{ record.day }}%</div>
                  <div class="text-center ">{{ record.week }}%</div>
                  <div class="text-center flex items-center justify-center space-x-1">
                    <span class="">{{ record.month }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </pu-card>
    </div>

    <!-- 奖励弹窗 -->
    <div v-if="showRewardModal" class="fixed inset-0 bg-rgbablack50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]">
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0" alt="弹窗背景" />

        <!-- 内容覆盖在背景上 -->
        <div class="relative z-10 p-3">
          <!-- 标题和关闭按钮 -->
          <div class="relative flex items-center justify-between pt-3 mb-4">
            <h2 class="absolute top-0 left-1/2 -translate-x-1/2 text-yellow-400 text-xl font-bold">My Rewards</h2>
            <button @click="closeRewardModal" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
              <img :src=CommonImg.btn_close alt="关闭" class="w-5 h-5" />
            </button>
          </div>

          <!-- 历史记录列表 -->
          <div class="rounded-lg pt-5">
            <!-- 表头 -->
            <div class="grid grid-cols-4 text-xs mb-0 whitespace-nowrap bg-rgbablack30 p-3"
              :class="[currentTemplate.value == 'template_one' ? ' text-themewhite' : ' text-three']"
              style="grid-template-columns: 1.2fr 1fr 0.8fr 1.5fr;">
              <div class="text-center ">Tempo</div>
              <div class="text-center">Tipo</div>
              <div class="text-center">Classificaçäo</div>
              <div class="text-center">Recompensa</div>
            </div>

            <!-- 列表内容 - 可滚动 -->
            <div class="h-[19rem] overflow-y-auto overflow-x-hidden">
              <template v-if="Array.isArray(rewardRecord) && rewardRecord.length > 0">
                <div v-for="(record, index) in rewardRecord" :key="index"
                  class="grid grid-cols-4 text-themewhite text-xs py-2 "
                  :style="{ backgroundColor: index % 2 === 0 ? 'var(--color-tablergba40)' : 'var(--color-tablergba20)' }"
                  style="grid-template-columns: 1.4fr 0.8fr 0.8fr 1.5fr;">
                  <div class="text-center text-themewhite">{{ record.rank_start_date }}</div>
                  <div class="text-center text-themewhite">{{ record.rank_type === '1' ? 'DIA' : record.rank_type ===
                    '2' ? 'SEM' : record.rank_type === '3' ? 'Mês' : record.rank_type }}</div>
                  <div class="text-center text-themewhite">{{ record.rank }}</div>
                  <div class="text-center flex items-center justify-center space-x-1">
                    <span class="text-four">R${{ record.bonus }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="w-full h-full flex items-center justify-center">
                  <img :src=RankImg.img_nodata class="w-2/3 h-auto opacity-80" alt="no data" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </pu-card>
    </div>

  </pu-page>

  <pu-page title="Jackpot" class="z-[999]" v-if="currentTemplate.value == 'template_three'">
    <img :src=RankImg.img_rankbg class="w-full h-auto object-cover absolute top-0 left-0" alt="bg" />

    <!-- 顶部按钮 -->
    <pu-card theme="4" class="relative">

      <img :src=RankImg.gif_coin class="w-[15rem] h-auto absolute top-8 left-0" />
      <img :src=RankImg.gif_coin class="w-[15rem] h-auto absolute top-8 -right-1" />

      <img :src=RankImg.img_jpbg class="w-full h-auto absolute -top-10 left-0" alt="jpbg" />

      <!-- 排行榜类型 -->
      <div class="flex justify-between items-center pt-2">
        <button v-for="(rankType, idx) in rankTypes" :key="rankType.key" @click="switchTab(rankType)"
          class="focus:outline-none flex-1 mx-1 relative overflow-hidden" style="min-width:0;">
          <img :src="activeTab === rankType.key
            ? RankImg.img_timebg1
            : RankImg.img_timebg2" :alt="rankType.name" class="w-full object-contain"
            style="max-width:unset;" />
          <!-- 文字内容覆盖在图片上 -->
          <div class="absolute inset-0 flex flex-col justify-center items-center text-center">
            <div
              :class="[activeTab === rankType.key ? 'text-themetext0' : 'text-themetext1', 'text-[0.8rem] leading-tight px-1 pt-1']">
              {{ rankType.name }}
            </div>
            <div class="flex items-center justify-center space-x-1">
              <img :src=RankImg.icon_time class="w-3 h-3" style="transform: translateY(-2px);" alt="时间" />
              <span class="text-themewhite text-xs">
                {{ getCountdownText(rankType.jpkey, uiTick) }}
              </span>
            </div>
          </div>
        </button>
      </div>

      <!-- Jackpot金额 -->
      <div class="flex justify-end items-center pt-[5.8rem] pl-1 pr-[4.8rem] relative z-20">
        <div class="relative flex items-center justify-end w-full">
          <div
            class="jackpot-glow relative text-right text-4xl font-themeblack text-yellow-300 font-mono drop-shadow-lg tracking-widest select-none">
            {{ String(Math.floor(Number(displayJackpot) || 0)).padStart(7, '0') }}
            <span class="jackpot-sheen" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <!-- 规则提示文字 -->
      <div class="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 pt-3 z-30">
        <div
          class="text-themewhite text-xs px-3 py-1 bg-rgbablack50 rounded-full font-bold leading-tight whitespace-nowrap">
          <span class="text-four text-[0.5rem]">
            {{ activeTab === 'dayRank' ? rulesConfig.bet_rank_day_pump : activeTab === 'weekRank' ?
              rulesConfig.bet_rank_week_pump : rulesConfig.bet_rank_month_pump }}%
          </span><span class="text-themewhite text-[0.5rem]">da aposta total dos jogos selecionados</span>
        </div>
      </div>

      <!-- 礼物按钮 -->
      <button @click="viewReward" class="w-8 h-8 flex items-center justify-center absolute top-12 right-1 z-30">
        <img :src=RankImg.btn_gift class="w-8 h-8" alt="礼物" />
      </button>

      <button @click="viewHistory" class="flex items-center justify-center absolute pt-3 z-30">
        <img :src=RankImg.btn_history class="w-auto h-8" alt="历史" />
      </button>

      <button @click="viewRules" class="flex items-center justify-center absolute pt-3 right-0 z-30">
        <img :src=RankImg.btn_rule class="w-auto h-8" alt="礼物" />
      </button>
    </pu-card>

    <!-- 排行榜内容（包含前三名和列表） -->
    <pu-card theme="3" class="pt-10">
      <div class="z-20 overflow-y-auto"
        style="height: calc(100vh - 20rem); padding-bottom: calc(3rem + env(safe-area-inset-bottom)); overscroll-behavior-x: contain; touch-action: pan-y;">
        <!-- 前三名玩家 -->
        <div class="mx-ctx mt-5 flex items-end justify-center relative z-20 mb-6">
          <!-- 第二名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no2 class="w-full h-full" alt="第二名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[2.8rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-5 py-1 rounded-full font-bold leading-tight" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[1]?.username || 'player2' }}
              </div>
              <div class="flex items-center justify-center text-themewhite mt-0.5">
                <img :src=RankImg.icon_money class="w-3 h-3 mr-1" alt="金币" />
                <span class="text-xs">{{ formatCompact(currentRanking[1]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.7rem] font-themeblack leading-none mt-0.5 text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                R${{ formatCompact(currentRanking[1]?.bonus) }}
              </div>
              <div class="text-[0.7rem] font-themeblack leading-none text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                ({{ currentRanking[1]?.rate || 0 }}%)
              </div>
            </div>
          </div>

          <!-- 第一名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no1 class="w-full h-full" alt="第一名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[4.6rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-5 py-1 rounded-full font-bold" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[0]?.username || 'player1' }}
              </div>
              <div class="flex items-center justify-center text-themewhite mt-0.5">
                <img :src=RankImg.icon_money class="w-4 h-4 mr-1" alt="金币" />
                <span class="text-sm">{{ formatCompact(currentRanking[0]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.8rem] font-themeblack leading-none mt-0.5 text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                R${{ formatCompact(currentRanking[0]?.bonus) }}
              </div>
              <div class="text-[0.8rem] font-themeblack leading-none text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                ({{ currentRanking[0]?.rate || 0 }}%)
              </div>
            </div>
          </div>

          <!-- 第三名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no3 class="w-full h-full" alt="第三名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[2.9rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-5 py-1 rounded-full font-bold" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[2]?.username || 'player3' }}
              </div>
              <div class="flex items-center justify-center text-themewhite">
                <img :src=RankImg.icon_money class="w-4 h-4 mr-1" alt="金币" />
                <span class="text-xs">{{ formatCompact(currentRanking[2]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.65rem] font-themeblack leading-none mt-0.5 text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                R${{ formatCompact(currentRanking[2]?.bonus) }}
              </div>
              <div class="text-[0.65rem] font-themeblack leading-none text-themetext0 font-bold"
                style="-webkit-text-stroke:1px var(--color-themeblack);text-stroke:0.3px var(--color-themeblack);">
                ({{ currentRanking[2]?.rate || 0 }}%)
              </div>
            </div>
          </div>
        </div>

        <!-- 排行榜列表（第4名及以后） -->
        <div class="space-y-1 ">
          <div v-for="(player, index) in (Array.isArray(currentRanking) ? currentRanking.slice(3) : [])" :key="index"
            class="relative pt-1">
            <!-- 背景图片 -->
            <img :src=RankImg.img_itembg loading="lazy" class="w-full h-full absolute inset-0" alt="排名背景" />

            <!-- 当前用户高亮光圈 -->
            <img v-if="player.rank === currentMember.rank" :src=RankImg.img_flight
              class="w-full h-full absolute inset-0 z-5 pointer-events-none"
              style="transform: scaleX(1.03) scaleY(1.2); transform-origin: center;" alt="highlight" />

            <!-- 内容覆盖在背景上 -->
            <div class="relative z-10 flex items-center justify-between h-full px-4">
              <!-- 前项：排名 -->
              <div class="flex items-center w-12 flex-shrink-0">
                <div class="w-8 h-8 flex items-center justify-center text-themetext0 font-bold text-2xl italic">
                  {{ player.rank }}
                </div>
              </div>

              <!-- 中项：用户名称和金额 -->
              <div class="flex flex-col flex-shrink-0 items-start mb-1 justify-start text-left">
                <div class="text-themewhite text-sm">
                  {{ player.username }}
                </div>
                <div class="flex items-start justify-start space-x-1 bg-rgbablack15 rounded-full px-2 py-1 w-auto h-6">
                  <img :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
                  <span class="text-sm font-normal text-four">{{ formatCompact(player.bet_amount) }}</span>
                </div>
              </div>

              <!-- 后项：奖金和排名变化 -->
              <div class="flex flex-col items-end justify-center flex-1 min-w-0">
                <div class="text-themetext0 text-[0.9rem]">
                  R${{ formatCompact(player.bonus) }}({{ player.rate }}%)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="height: calc(3rem + env(safe-area-inset-bottom));"></div>
      </div>
    </pu-card>

    <!-- 底部信息栏 -->
    <div class="fixed left-1/2 -translate-x-1/2 bottom-0 w-wrap h-20 flex justify-center items-center z-50 ">

      <img :src=RankImg.img_infobg class="w-full h-auto pt-3 object-cover absolute inset-0" alt="底部背景" />

      <div class="relative z-10 flex items-center justify-between h-18 px-4 pt-3">

        <!-- 玩家不满足上榜条件时显示 -->
        <!-- currentMember.state==0 -->
        <template v-if="currentMember.state == 0">
          <div class="flex flex-col items-center justify-center text-themewhite">
            <div class="text-xs mb-1 text-center">
              Você precisa de <span class="text-themetext0">{{ isAuthRef ? currentMember.ranksLeft :
                rulesConfig.bet_rank_limit }}</span> apostas extras para participar do ranking
            </div>
          </div>

          <div class="flex items-center justify-center">
            <button @click="goToAttend"
              class="w-32 h-10  px-4 py-2 rounded-full m3-theme-btn1 font-bold text-sm transition-all duration-300 shadow-lg">
              Vá participar
            </button>
          </div>
        </template>

        <!-- 玩家满足上榜条件时显示原有三项 -->
        <template v-else>
          <div class="flex flex-col items-center justify-center text-themewhite mr-1">
            <div
              class="text-[0.75rem] text-themetext1 h-4 mb-1 flex items-center justify-center w-full whitespace-nowrap">
              {{ currentMember.state == 2 ? 'Sua classificação' : 'Fileiras restantes' }}
            </div>
            <div class="flex items-center justify-center space-x-1">
              <img v-if="currentMember.state !== 2" :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
              <span class="text-themetext0 font-bold  "
                :class="currentMember.state == 1 ? 'text-sm' : 'h-6 text-[1.25rem]'">{{ currentMember.state == 1 ?
                  currentMember.ranksLeft : currentMember.rank }}</span>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center text-themewhite mx-3">
            <div class="flex items-center mb-1">
              <img :src=RankImg.icon_user class="w-4 h-4 " alt="用户" />
              <span class="ml-1 text-[0.75rem] text-themetext1">{{ currentMember.username }}</span>
            </div>
            <div class="flex items-center justify-center space-x-1">
              <img :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
              <span class=" font-bold text-sm">{{ currentMember.bet_amount }}</span>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center ml-2">
            <button @click="improveRanking"
              class="w-30 h-8 m3-theme-btn1 px-2 py-2 rounded-full font-bold text-[0.75rem] transition-all duration-300 shadow-lg whitespace-nowrap">
              Melhorar a classificação
            </button>
            <p class="font-bold text-[0.60rem] mt-1">Recompensa:<span class="text-themetext0">{{ currentMember.state == 2
              ? ('R$' + (currentMember?.bonus ?? '--')) : '--' }}</span></p>
          </div>
        </template>
      </div>
    </div>

    <!-- 历史弹窗 -->
    <div v-if="showHistoryModal" class="fixed inset-0 bg-rgbablack50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]">
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0" alt="弹窗背景" />

        <!-- 内容覆盖在背景上 -->
        <div class="relative z-10 p-2 ">
          <!-- 标题和关闭按钮 -->
          <div class="relative flex items-center justify-between pt-3 mb-4">
            <h2 class="absolute top-0 left-1/2 -translate-x-1/2 text-themetext1 text-xl font-bold">História</h2>
            <button @click="closeHistoryModal" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
              <img :src=CommonImg.btn_close alt="关闭" class="w-5 h-5" />
            </button>
          </div>

          <!-- 排行榜类型 -->
          <div class="flex justify-between items-center pt-5">
            <button v-for="(rankType, idx) in rankTypes" :key="rankType.key" @click="switchHistoryTab(rankType)"
              class="focus:outline-none flex-1 mx-1 relative overflow-hidden" style="min-width:0;">
              <img :src="historyActiveTab === rankType.key
                ? RankImg.img_timebg1
                : RankImg.img_timebg2" :alt="rankType.name" class="w-full object-contain"
                style="max-width:unset;" />
              <!-- 文字内容覆盖在图片上 -->
              <div class="absolute inset-0 flex flex-col justify-center items-center text-center">
                <div
                  :class="[historyActiveTab === rankType.key ? 'text-themetext0' : 'text-themetext1', 'text-[0.8rem] leading-tight px-1 pt-1']">
                  {{ rankType.name }}</div>
              </div>
            </button>
          </div>

          <!-- Jackpot金额显示 -->
          <div class="relative text-center pt-3 mb-4">
            <img :src=RankImg.img_itembg class="w-full h-18 object-cover" />
            <div
              class="text-yellow-400 text-2xl font-bold mb-1 absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              JACKPOT: {{ Math.ceil(currentHistoryJackpot.jackpot) }}
            </div>
            <div class="text-themewhite text-[0.55rem] absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
              O Jackpot anterior {{ Math.ceil(currentHistoryJackpot.clearing_bouns) }} foi adicionado ao próximo Jackpot
            </div>
          </div>

          <!-- 历史记录列表 -->
          <div class="rounded-lg">
            <!-- 表头 - 调整列宽比例 -->
            <div class="grid grid-cols-4 text-xs mb-0 whitespace-nowrap bg-tablergba40 p-3 text-themetext1"
              style="grid-template-columns: 0.8fr 1.2fr 1fr 1.5fr;">
              <div class="text-center  ">Classificação</div>
              <div class="text-center  ">Nome</div>
              <div class="text-center ">Apostas totais</div>
              <div class="text-center ">Recompensa</div>
            </div>

            <!-- 列表内容 -->
            <!--  -->
            <div class="h-56 overflow-y-auto overflow-x-hidden">
              <div v-for="(record, index) in currentHistoryRankData" :key="index" class="grid grid-cols-4 py-2"
                :style="{ backgroundColor: index % 2 === 0 ? 'var(--color-tablergba10)' : 'var(--color-tablergba20)' }"
                style="grid-template-columns: 0.8fr 1.2fr 1fr 1.5fr;">
                <div class="text-center text-themetext0 truncate px-1 text-xs ">{{ record.rank }}</div>
                <div class="text-center  truncate px-1 text-xs text-themetext1">{{ record.username }}</div>
                <div class="text-center text-themetext1 truncate px-1 text-xs">{{ formatCompact(record.bet_amount)}}</div>
                <!-- 最后一列使用更小的字体 -->
                <div
                  class="text-center text-themetext0 truncate px-1 text-xs leading-tight flex items-center justify-center">
                  <img :src=CommonImg.img_money class="w-3 h-3 mr-1" alt="R$">
                  {{ formatCompact(record.bonus) }}<span class="text-themetext1">({{ record.rate }}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </pu-card>
    </div>

    <!-- 规则弹窗 -->
    <div v-if="showRulerModal" class="fixed inset-0 bg-rgbablack50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]">
        <!-- 背景 img 已在卡片内绝对定位，无需改动 -->
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0 z-0" alt="弹窗背景" />
        <!-- 标题和关闭按钮 -->
        <div class="relative flex items-center justify-between pt-3 mb-4">
          <h2 class="absolute top-2 left-1/2 -translate-x-1/2 text-themetext1 text-xl font-bold">Regras</h2>
          <button @click="closeRuleModal" class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center">
            <img :src=CommonImg.btn_close alt="关闭" class="w-5 h-5" />
          </button>
        </div>

        <div class="relative z-10 p-5">
          <!-- 同一滚动容器，包含三块内容 -->
          <div class="modal-scroll ">
            <!-- 标题分割线 -->
            <div class="w-full mb-4 pt-5 flex items-center">
              <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext1"></em>
              <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext1">
                <span>Recompensa da atividade</span>
              </h5>
              <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext1"></em>
            </div>
            <!-- 规则内容 -->
            <article class="ctx-article p-mb text-sm text-themetext2" v-html="rulesConfig.bet_rank_content"></article>
            <!-- 奖励配置表（表头+列表） -->
            <div class="rounded-lg">
              <div class="grid grid-cols-4  text-xs mb-0 whitespace-nowrap bg-rgbablack30 p-3 text-themetext2"
                style="grid-template-columns: 1.2fr 1.2fr 1.2fr 1.5fr;">
                <div class="text-center">Classificaçäo</div>
                <div class="text-center">Lista DIA</div>
                <div class="text-center">Lista SEM</div>
                <div class="text-center">Lista Mês</div>
              </div>

              <!-- 注意：这里不再设置 h-[14rem] 和 overflow -->
              <div>
                <div v-for="(record, index) in rulesConfig.bet_rank_config" :key="index"
                  class="grid grid-cols-4  text-xs py-2 text-themetext2"
                  :style="{ backgroundColor: index % 2 === 0 ? 'var(--color-tablergba20)' : 'var(--color-tablergba40)' }"
                  style="grid-template-columns: 1.2fr 1.2fr 1.2fr 1.5fr;">
                  <div class="text-center ">{{ record.rank }}</div>
                  <div class="text-center ">{{ record.day }}%</div>
                  <div class="text-center ">{{ record.week }}%</div>
                  <div class="text-center flex items-center justify-center space-x-1">
                    <span class="">{{ record.month }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </pu-card>
    </div>

    <!-- 奖励弹窗 -->
    <div v-if="showRewardModal" class="fixed inset-0 bg-rgbablack50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]">
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0" alt="弹窗背景" />

        <!-- 内容覆盖在背景上 -->
        <div class="relative z-10 p-3">
          <!-- 标题和关闭按钮 -->
          <div class="relative flex items-center justify-between pt-3 mb-4">
            <h2 class="absolute top-0 left-1/2 -translate-x-1/2 text-themetext1 text-xl font-bold">My Rewards</h2>
            <button @click="closeRewardModal" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
              <img :src=CommonImg.btn_close alt="关闭" class="w-5 h-5" />
            </button>
          </div>

          <!-- 历史记录列表 -->
          <div class="rounded-lg pt-5">

            <!-- 列表内容 - 可滚动 -->
            <div class="h-[19rem] overflow-y-auto overflow-x-hidden">
              <template v-if="Array.isArray(rewardRecord) && rewardRecord.length > 0">

                <!-- 表头 -->
                <div class="grid grid-cols-4 text-xs mb-0 whitespace-nowrap bg-rgbablack30 p-3 text-themetext2"
                  style="grid-template-columns: 1.2fr 1fr 0.8fr 1.5fr;">
                  <div class="text-center ">Tempo</div>
                  <div class="text-center">Tipo</div>
                  <div class="text-center">Classificaçäo</div>
                  <div class="text-center">Recompensa</div>
                </div>

                <div v-for="(record, index) in rewardRecord" :key="index"
                  class="grid grid-cols-4 text-themetext2 text-xs py-2 "
                  :style="{ backgroundColor: index % 2 === 0 ? 'var(--color-tablergba40)' : 'var(--color-tablergba20)' }"
                  style="grid-template-columns: 1.4fr 0.8fr 0.8fr 1.5fr;">
                  <div class="text-center ">{{ record.rank_start_date }}</div>
                  <div class="text-center ">{{ record.rank_type === '1' ? 'DIA' : record.rank_type === '2' ? 'SEM' :
                    record.rank_type === '3' ? 'Mês' : record.rank_type }}</div>
                  <div class="text-center ">{{ record.rank }}</div>
                  <div class="text-center flex items-center justify-center space-x-1">
                    <span class="text-themetext0">R${{ record.bonus }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="w-full h-full flex items-center flex-col justify-center">
                  <img :src=RankImg.img_nodata class="w-[12rem] h-auto opacity-80" alt="no data" />
                  <!-- <div class="text-center mt-3 text-themetext3">Ainda nao recebi a recompensa</div> -->
                </div>
              </template>
            </div>
          </div>
        </div>
      </pu-card>
    </div>

  </pu-page>
  <pu-page title="Jackpot" class="z-[999]" hideService v-if="currentTemplate.value == 'template_four'">
    <img :src=RankImg.img_rankbg class="w-full h-auto object-cover absolute top-0 left-0" alt="bg" />

    <!-- 顶部按钮 -->
    <pu-card theme="4" class="relative">
      <img :src=RankImg.gif_coin class="w-[15rem] h-auto absolute top-8 left-0" />
      <img :src=RankImg.gif_coin class="w-[15rem] h-auto absolute top-8 -right-1" />
      <img :src=RankImg.img_jpbg class="w-full h-auto absolute -top-10 left-0" alt="jpbg" />

      <!-- 排行榜类型 -->
      <div class="flex justify-between items-center pt-2">
        <button v-for="(rankType, idx) in rankTypes" :key="rankType.key" @click="switchTab(rankType)"
          class="focus:outline-none flex-1 mx-1 relative overflow-hidden" style="min-width:0;">
          <!-- 文字内容覆盖在图片上 -->
          <div class="flex flex-col justify-center items-center text-center rounded-xl h-full w-full"
            :class="activeTab === rankType.key ? 'm4-ten-btn' : 'bg-tablebg '">
            <div
              :class="[activeTab === rankType.key ? 'text-theme ' : 'text-themewhite', 'text-[0.8rem] leading-tight px-1 pt-1']">
              {{ rankType.name }}
            </div>
            <div class="flex items-center justify-center space-x-1">
              <img :src=RankImg.icon_time class="w-3 h-3" style="transform: translateY(-2px);" alt="时间" />
              <span class=" text-xs" :class="activeTab === rankType.key ? ' ' : 'text-themewhite'">
                {{ getCountdownText(rankType.jpkey, uiTick) }}
              </span>
            </div>
          </div>
        </button>
      </div>

      <!-- Jackpot金额 -->
      <div class="flex justify-end items-center pt-[5.8rem] pl-1 pr-[4.6rem] relative z-20">
        <div class="relative flex items-center justify-end w-full ">
          <div
            class="jackpot-glow relative text-right text-4xl font-black text-themetext0   font-mono drop-shadow-lg tracking-widest select-none">
            {{ String(Math.floor(Number(displayJackpot) || 0)).padStart(7, '0') }}
            <span class="jackpot-sheen " aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <!-- 规则提示文字 -->
      <div class="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 pt-3 z-30">
        <div
          class="text-themewhite text-xs px-3 py-1  rounded-full font-bold leading-tight whitespace-nowrap bg-tablebg">
          <span class="text-themetext0 text-[0.5rem]">
            {{ activeTab === 'dayRank' ? rulesConfig.bet_rank_day_pump : activeTab === 'weekRank' ?
              rulesConfig.bet_rank_week_pump : rulesConfig.bet_rank_month_pump }}%
          </span><span class="text-themewhite text-[0.5rem]">da aposta total dos jogos selecionados</span>
        </div>
      </div>

      <!-- 礼物按钮 -->
      <button @click="viewReward" class="w-8 h-8 flex items-center justify-center absolute top-12 right-1 z-30">
        <img :src=RankImg.btn_gift class="w-8 h-8" alt="礼物" />
      </button>

      <button @click="viewHistory" class="flex items-center justify-center absolute pt-3 z-30">
        <img :src=RankImg.btn_history class="w-auto h-7" alt="历史" />
      </button>

      <button @click="viewRules" class="flex items-center justify-center absolute pt-3 right-0 z-30">
        <img :src=RankImg.btn_rule class="w-auto h-7" alt="礼物" />
      </button>
    </pu-card>

    <!-- 排行榜内容（包含前三名和列表） -->
    <pu-card theme="3">
      <div class="z-20 overflow-y-auto mt-10"
        style="height: calc(100vh - 20rem); padding-bottom: calc(3rem + env(safe-area-inset-bottom)); overscroll-behavior-x: contain; touch-action: pan-y;">
        <!-- 前三名玩家 -->
        <div class="mx-ctx mt-5 flex items-end justify-center relative z-20 mb-6">
          <!-- 第二名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no2 class="w-full h-full" alt="第二名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[2.8rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-3 py-1 rounded-full font-bold leading-tight" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[1]?.username || 'player2' }}
              </div>
              <div class="flex items-center justify-center text-themewhite mt-0.5">
                <img :src=RankImg.icon_money class="w-3 h-3 mr-1" alt="金币" />
                <span class="text-xs">{{ formatCompact(currentRanking[1]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.7rem] font-black leading-none mt-0.5"
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                R${{ formatCompact(currentRanking[1]?.bonus) }}
              </div>
              <div class="text-[0.7rem] font-black leading-none"
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                ({{ currentRanking[1]?.rate || 0 }}%)
              </div>
            </div>
          </div>

          <!-- 第一名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no1 class="w-full h-full" alt="第一名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[4.6rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-3 py-1 rounded-full font-bold" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[0]?.username || 'player1' }}
              </div>
              <div class="flex items-center justify-center text-themewhite mt-0.5">
                <img :src=RankImg.icon_money class="w-4 h-4 mr-1" alt="金币" />
                <span class="text-sm">{{ formatCompact(currentRanking[0]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.8rem] font-black leading-none mt-0.5 "
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                R${{ formatCompact(currentRanking[0]?.bonus) }}
              </div>
              <div class="text-[0.8rem] font-black leading-none "
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                ({{ currentRanking[0]?.rate || 0 }}%)
              </div>
            </div>
          </div>

          <!-- 第三名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no3 class="w-full h-full" alt="第三名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[2.9rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-3 py-1 rounded-full font-bold" :style="{
                background: `url(${RankImg.img_timebg3})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }">
                {{ currentRanking[2]?.username || 'player3' }}
              </div>
              <div class="flex items-center justify-center text-themewhite">
                <img :src=RankImg.icon_money class="w-4 h-4 mr-1" alt="金币" />
                <span class="text-xs">{{ formatCompact(currentRanking[2]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.65rem] font-black leading-none mt-0.5"
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                R${{ formatCompact(currentRanking[2]?.bonus) }}
              </div>
              <div class="text-[0.65rem] font-black leading-none"
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                ({{ currentRanking[2]?.rate || 0 }}%)
              </div>
            </div>
          </div>
        </div>

        <!-- 排行榜列表（第4名及以后） -->
        <div>
          <div v-for="(player, index) in (Array.isArray(currentRanking) ? currentRanking.slice(3) : [])" :key="index"
            class="relative py-2 mt-2" :style="{
              background: `url(${CommonImg.bg_item})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }">
            <!-- 背景图片 -->
            <!-- <img
              src="/imgs/jprank/img_paiming.png"
              loading="lazy"
              class="w-full h-full absolute inset-0"
              alt="排名背景"
            /> -->

            <!-- 当前用户高亮光圈 -->
            <img v-if="player.rank === currentMember.rank" :src=RankImg.img_flight
              class="w-full h-full absolute inset-0 z-5 pointer-events-none"
              style="transform: scaleX(1.03) scaleY(1.2); transform-origin: center;" alt="highlight" />

            <!-- 内容覆盖在背景上 -->
            <div class="relative z-10 flex items-center justify-between h-full px-4">
              <!-- 前项：排名 -->
              <div class="flex items-center w-12 flex-shrink-0">
                <div class="w-8 h-8 flex items-center justify-center text-themetext0 font-bold text-2xl italic">
                  {{ player.rank }}
                </div>
              </div>

              <!-- 中项：用户名称和金额 -->
              <div class="flex flex-col flex-shrink-0 items-start mb-1 justify-start text-left">
                <div class="text-themewhite text-sm">
                  {{ player.username }}
                </div>
                <div class="flex items-start justify-start space-x-1 bg-rgbablack15 rounded-full px-2 py-1 w-auto h-6">
                  <img :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
                  <span class="text-sm font-normal  text-themetext0">{{ formatCompact(player.bet_amount) }}</span>
                </div>
              </div>

              <!-- 后项：奖金和排名变化 -->
              <div class="flex flex-col items-end justify-center flex-1 min-w-0">
                <div class="text-themetext0 text-[0.9rem]">
                  R${{ formatCompact(player.bonus) }}({{ player.rate }}%)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="height: calc(3rem + env(safe-area-inset-bottom));"></div>
      </div>
    </pu-card>

    <!-- 底部信息栏 -->
    <div class="fixed left-1/2 -translate-x-1/2 bottom-0 w-wrap h-20 flex justify-center items-center z-50 "
      style="padding-bottom: env(safe-area-inset-bottom);" :style="{
        background: `url(${RankImg.bg_bottom})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }">

      <!-- <img src="/imgs/jprank/bg1.png" class="w-full h-auto pt-3 object-cover absolute inset-0" alt="底部背景" /> -->

      <div class="relative z-10 flex items-center justify-between h-18 px-4 pt-3 ">

        <!-- 玩家不满足上榜条件时显示 -->
        <!-- currentMember.state==0 -->
        <template v-if="currentMember.state==0">
          <div class="flex flex-col items-center justify-center text-themewhite">
            <div class="text-xs mb-1 text-center">
              Você precisa de <span class="text-themetext0"> {{ isAuthRef ? currentMember.ranksLeft :
                rulesConfig.bet_rank_limit }}</span> apostas extras para participar do ranking
            </div>
          </div>

          <div class="flex items-center justify-center">
            <button @click="goToAttend"
              class="w-32 h-10 m4-nine-btn text-theme px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-lg">
              Vá participar
            </button>
          </div>
        </template>

        <!-- 玩家满足上榜条件时显示原有三项 -->
        <template v-else>
          <div class="flex flex-col items-start justify-center text-themewhite mr-1">
            <div class="text-[0.8rem] Fmb-1 whitespace-nowrap">
              {{ currentMember.state == 2 ? 'Sua classificação' : 'Fileiras restantes' }}
            </div>
            <div class="flex items-center space-x-1">
              <img v-if="currentMember.state !== 2" :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
              <span class="font-bold text-sm  text-themetext0 ">{{ currentMember.state == 1 ? currentMember.ranksLeft :
                currentMember.rank }}</span>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center text-themewhite mx-3">
            <div class="flex items-center mb-1">
              <img :src=RankImg.icon_user class="w-5 h-5" alt="用户" />
              <span class="text-sm">{{ currentMember.username }}</span>
            </div>
            <div class="flex items-center justify-center space-x-1">
              <img :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
              <span class=" font-bold text-themetext0 text-sm">{{ currentMember.bet_amount }}</span>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center ml-2">
            <button @click="improveRanking"
              class=" m4-nine-btn rounded-xl  text-sm py-2 px-4 line-height-[0.88rem] ml-2">
              melhorar </br> a classificação
            </button>
            <span class="font-bold text-[0.65rem]">Recompensa:<span class="text-themetext0">{{ currentMember.state == 2 ? ('R$' + (currentMember?.bonus
              ?? '--')) : '--' }}</span></span>
          </div>
        </template>
      </div>
    </div>

    <!-- 历史弹窗 showHistoryModal -->
    <div v-if="showHistoryModal" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]">
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0" alt="弹窗背景" />

        <!-- 内容覆盖在背景上 -->
        <div class="relative z-10 p-2">
          <!-- 标题和关闭按钮 -->
          <div class="relative flex items-center justify-between pt-3 mb-4">
            <h2 class="absolute top-0 left-1/2 -translate-x-1/2 m4-text text-xl font-bold">História</h2>
            <button @click="closeHistoryModal" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
              <img :src=CommonImg.btn_close alt="关闭" class="w-5 h-5" />
            </button>
          </div>

          <!-- 排行榜类型 -->
          <div class="flex justify-between items-center pt-5">
            <button v-for="(rankType, idx) in rankTypes" :key="rankType.key" @click="switchHistoryTab(rankType)"
              class="focus:outline-none flex-1 mx-1 relative overflow-hidden" style="min-width:0;">
              <!-- <img
                    :src="historyActiveTab === rankType.key
                        ? `/imgs/jprank/img_time1.png`
                        : `/imgs/jprank/img_time2.png`"
                    :alt="rankType.name"
                    class="w-full object-contain"
                    style="max-width:unset;"
                /> -->
              <!-- 文字内容覆盖在图片上 -->
              <div class="py-2 rounded-xl flex flex-col justify-center items-center text-center"
              :class="[historyActiveTab === rankType.key ? 'm4-ten-btn ' : 'bg-tablebg']"
              >
                <div
                  :class="[historyActiveTab === rankType.key ? '' : 'text-themewhite', 'text-[0.8rem] leading-tight px-1 pt-1']">
                  {{ rankType.name }}
                </div>
              </div>
            </button>
          </div>

          <!-- Jackpot金额显示 -->
          <div class="relative text-center p-2 mb-4  mt-2 " 
          :style="{
                background: `url(${CommonImg.bg_item})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }"
          >
            <!-- <img src="/imgs/jprank/img_paiming.png" class="w-full h-18 object-cover"  /> -->
            <div class="text-yellow-400 text-2xl font-bold mb-1  whitespace-nowrap">
              JACKPOT: {{ Math.ceil(currentHistoryJackpot.jackpot) }}
            </div>
            <div class="text-themewhite text-[0.55rem] whitespace-nowrap">
              O Jackpot anterior {{ Math.ceil(currentHistoryJackpot.clearing_bouns) }} foi adicionado ao próximo Jackpot
            </div>
          </div>

          <!-- 历史记录列表 -->
          <div class="rounded-lg bg-tablebg">
            <!-- 表头 - 调整列宽比例 -->
            <div class="grid grid-cols-4 text-themewhite text-xs mb-0 whitespace-nowrap bg-rgbablack30 p-3"
              style="grid-template-columns: 0.8fr 1.2fr 1fr 1.5fr;">
              <div class="text-center text-themewhite ">Classificação</div>
              <div class="text-center text-themewhite ">Nome</div>
              <div class="text-center text-themewhite ">Apostas totais</div>
              <div class="text-center text-themewhite ">Recompensa</div>
            </div>

            <!-- 列表内容 -->
            <div class="h-56 overflow-y-auto overflow-x-hidden ">
              <div v-for="(record, index) in currentHistoryRankData" :key="index"
                class="grid grid-cols-4 text-themewhite py-2"
                :class=" index % 2 === 0 ? 'bg-tablebg' : 'bg-tablebg2'"
                style="grid-template-columns: 0.8fr 1.2fr 1fr 1.5fr;">
                <div class="text-center text-themetext0 truncate px-1 text-xs">{{ record.rank }}</div>
                <div class="text-center text-themewhite truncate px-1 text-xs">{{ record.username }}</div>
                <div class="text-center text-themewhite truncate px-1 text-xs">{{ formatCompact(record.bet_amount) }}
                </div>
                <!-- 最后一列使用更小的字体 -->
                <div class="text-center text-themetext0 flex   truncate px-1 text-xs leading-tight">
                  <img :src="CommonImg.img_money" alt="" class="w-4 h-4 mr-1">
                  R${{ formatCompact(record.bonus) }}<span class="text-themewhite">({{ record.rate }}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </pu-card>
    </div>

    <!-- 规则弹窗 -->
    <div v-if="showRulerModal" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]">
        <!-- 背景 img 已在卡片内绝对定位，无需改动 -->
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0 z-0" alt="弹窗背景" />
        <!-- 标题和关闭按钮 -->
        <div class="relative flex items-center justify-between pt-3 mb-4">
          <h2 class="absolute top-2 left-1/2 -translate-x-1/2 text-xl m4-text font-bold">Regras</h2>
          <button @click="closeRuleModal" class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center">
            <img :src=CommonImg.btn_close alt="关闭" class="w-5 h-5" />
          </button>
        </div>

        <div class="relative z-10 p-5">
          <!-- 同一滚动容器，包含三块内容 -->
          <div class="modal-scroll ">
            <!-- 标题分割线 -->
            <div class="w-full mb-4 pt-5 flex items-center">
              <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext0"></em>
              <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext0 font-bold">
                <span>Recompensa da atividade</span>
              </h5>
              <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext0"></em>
            </div>
            <!-- 规则内容 -->
            <article class="pt-3 ctx-article p-mb text-sm text-themetext3" v-html="rulesConfig.bet_rank_content">
            </article>

            <!-- 奖励配置表（表头+列表） -->
            <div class="rounded-lg">
              <div class="grid grid-cols-4 text-themewhite text-xs mb-0 whitespace-nowrap bg-tablebg p-3"
                style="grid-template-columns: 1.2fr 1.2fr 1.2fr 1.5fr;">
                <div class="text-center text-themewhite">Classificaçäo</div>
                <div class="text-center text-themewhite">Lista DIA</div>
                <div class="text-center text-themewhite">Lista SEM</div>
                <div class="text-center text-themewhite">Lista Mês</div>
              </div>

              <!-- 注意：这里不再设置 h-[14rem] 和 overflow -->
              <div>
                <div v-for="(record, index) in rulesConfig.bet_rank_config" :key="index"
                  class="grid grid-cols-4 text-themewhite text-xs py-2"
                  :style="{ backgroundColor: index % 2 === 0 ? 'var(--color-default-bg)' : 'rgba(0,0,0,0.2)' }"
                  style="grid-template-columns: 1.2fr 1.2fr 1.2fr 1.5fr;">
                  <div class="text-center text-themewhite">{{ record.rank }}</div>
                  <div class="text-center text-themewhite">{{ record.day }}%</div>
                  <div class="text-center text-themewhite">{{ record.week }}%</div>
                  <div class="text-center flex items-center justify-center space-x-1">
                    <span class="text-themewhite">{{ record.month }}%</span>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </pu-card>

    </div>

    <!-- 奖励弹窗 -->
    <div v-if="showRewardModal" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]">
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0" alt="弹窗背景" />

        <!-- 内容覆盖在背景上 -->
        <div class="relative z-10 p-3">
          <!-- 标题和关闭按钮 -->
          <div class="relative flex items-center justify-between pt-3 mb-4">
            <h2 class="absolute top-0 left-1/2 -translate-x-1/2 m4-text text-xl font-bold">My Rewards</h2>
            <button @click="closeRewardModal" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
              <img :src=CommonImg.btn_close alt="关闭" class="w-5 h-5" />
            </button>
          </div>

          <!-- 历史记录列表 -->
          <div class="rounded-lg pt-5 ">
            <!-- 表头 -->
            
            <div class="grid grid-cols-4 text-themewhite text-xs mb-0 whitespace-nowrap bg-tablebg p-3"
              style="grid-template-columns: 1.2fr 1fr 0.8fr 1.5fr;">
              <div class="text-center text-themewhite">Tempo</div>
              <div class="text-center text-themewhite">Tipo</div>
              <div class="text-center text-themewhite">Classificaçäo</div>
              <div class="text-center text-themewhite">Recompensa</div>
            </div>

            <!-- 列表内容 - 可滚动 -->
            <div class="h-[19rem] overflow-y-auto overflow-x-hidden">
              <template v-if="Array.isArray(rewardRecord) && rewardRecord.length > 0">
                <div v-for="(record, index) in rewardRecord" :key="index"
                  class="grid grid-cols-4 text-themewhite text-xs py-2 "
                  :class=" index % 2 === 0 ? 'bg-tablebg2' : 'bg-tablebg'"
                  style="grid-template-columns: 1.4fr 0.8fr 0.8fr 1.5fr;">
                  <div class="text-center text-themewhite">{{ record.rank_start_date }}</div>
                  <div class="text-center text-themewhite">{{ record.rank_type === '1' ? 'DIA' : record.rank_type ===
                    '2' ? 'SEM' : record.rank_type === '3' ? 'Mês' : record.rank_type }}</div>
                  <div class="text-center text-themewhite">{{ record.rank }}</div>
                  <div class="text-center flex items-center justify-left ml-3 space-x-1 text-themetext0">
                    <img :src="CommonImg.img_money" alt="" class="w-4 h-4 mr-1">
                    R${{ record.bonus }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="w-full h-full flex items-center justify-center">
                  <img :src=RankImg.img_nodata class="w-2/3 h-auto opacity-80" alt="no data" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </pu-card>
    </div>

  </pu-page>
    <pu-page title="Jackpot" class="z-[999]" hideService v-if="currentTemplate.value == 'template_five'">
    <img :src=RankImg.img_rankbg class="w-full h-auto object-cover absolute top-0 left-0" alt="bg" />

    
    <!-- 顶部按钮 -->
    <pu-card theme="4" class="relative">
      <img :src=RankImg.gif_coin class="w-[15rem] h-auto absolute top-8 left-0" />
      <img :src=RankImg.gif_coin class="w-[15rem] h-auto absolute top-8 -right-1" />
      <img :src=RankImg.img_jpbg class="w-full h-auto absolute -top-10 left-0" alt="jpbg" />

      <!-- 排行榜类型 -->
      <div class="flex justify-between items-center pt-2">
        <button v-for="(rankType, idx) in rankTypes" :key="rankType.key" @click="switchTab(rankType)"
          class="focus:outline-none flex-1 mx-1 relative overflow-hidden" style="min-width:0;">
          <!-- 文字内容覆盖在图片上 -->
          <div class="flex flex-col justify-center items-center text-center rounded-lg h-full w-full"
            :class="activeTab === rankType.key ? 'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2' : 'bg-btn1_bg '">
            <div
              :class="[activeTab === rankType.key ? 'text-themewhite' : 'text-themewhite', 'text-[0.8rem] leading-tight px-1 pt-1']">
              {{ rankType.name }}
            </div>
            <div class="flex items-center justify-center space-x-1">
              <img :src=RankImg.icon_time class="w-3 h-3" style="transform: translateY(-2px);" alt="时间" />
              <span class=" text-xs" :class="activeTab === rankType.key ? ' ' : 'text-themewhite'">
                {{ getCountdownText(rankType.jpkey, uiTick) }}
              </span>
            </div>
          </div>
        </button>
      </div>

      <!-- Jackpot金额 -->
      <div class="flex justify-end items-center pt-[5.8rem] pl-1 pr-[4.6rem] relative z-20">
        <div class="relative flex items-center justify-end w-full ">
          <div
            class="jackpot-glow relative text-right text-4xl font-black text-themetext0  font-mono drop-shadow-lg tracking-widest select-none">
            {{ String(Math.floor(Number(displayJackpot) || 0)).padStart(7, '0') }}
            <span class="jackpot-sheen " aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <!-- 规则提示文字 -->
      <div class="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 pt-3 z-30">
        <div
          class="text-themewhite text-xs px-3 py-1  rounded-full font-bold leading-tight whitespace-nowrap bg-body-bg">
          <span class="text-themetext0 text-[0.5rem]">
            {{ activeTab === 'dayRank' ? rulesConfig.bet_rank_day_pump : activeTab === 'weekRank' ?
              rulesConfig.bet_rank_week_pump : rulesConfig.bet_rank_month_pump }}%
          </span><span class="text-themewhite text-[0.5rem]">da aposta total dos jogos selecionados</span>
        </div>
      </div>

      <!-- 礼物按钮 -->
      <button @click="viewReward" class="w-8 h-8 flex items-center justify-center absolute top-12 right-1 z-30">
        <img :src=RankImg.btn_gift class="w-8 h-8" alt="礼物" />
      </button>

      <button @click="viewHistory" class="flex items-center justify-center absolute pt-3 z-30">
        <img :src=RankImg.btn_history class="w-auto h-7" alt="历史" />
      </button>

      <button @click="viewRules" class="flex items-center justify-center absolute pt-3 right-0 z-30">
        <img :src=RankImg.btn_rule class="w-auto h-7" alt="礼物" />
      </button>
    </pu-card>

    <!-- 排行榜内容（包含前三名和列表） -->
    <pu-card theme="3">
      <div class="z-20 overflow-y-auto mt-10"
        style="height: calc(100vh - 20rem); padding-bottom: calc(3rem + env(safe-area-inset-bottom)); overscroll-behavior-x: contain; touch-action: pan-y;">
        <!-- 前三名玩家 -->
        <div class="mx-ctx mt-5 flex items-end justify-center relative z-20 mb-6">
          <!-- 第二名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no2 class="w-full h-full" alt="第二名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[3.2rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-3 rounded-full font-bold leading-tight m5-theme-inputwithoutborder">
                {{ currentRanking[1]?.username || 'player2' }}
              </div>
              <div class="flex items-center justify-center text-themewhite mt-0.5">
                <img :src=RankImg.icon_money class="w-3 h-3 mr-1" alt="金币" />
                <span class="text-xs">{{ formatCompact(currentRanking[1]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.7rem] font-black leading-none mt-0.5"
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                R${{ formatCompact(currentRanking[1]?.bonus) }}
              </div>
              <div class="text-[0.7rem] font-black leading-none"
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                ({{ currentRanking[1]?.rate || 0 }}%)
              </div>
            </div>
          </div>

          <!-- 第一名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no1 class="w-full h-full" alt="第一名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[4.9rem] left-1/2 transform -translate-x-1/2 text-center ">
              <div class="text-themewhite text-xs px-3 rounded-full font-bold m5-theme-inputwithoutborder" >
                {{ currentRanking[0]?.username || 'player1' }}
              </div>
              <div class="flex items-center justify-center text-themewhite mt-0.5">
                <img :src=RankImg.icon_money class="w-4 h-4 mr-1" alt="金币" />
                <span class="text-sm">{{ formatCompact(currentRanking[0]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.8rem] font-black leading-none mt-0.5 "
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                R${{ formatCompact(currentRanking[0]?.bonus) }}
              </div>
              <div class="text-[0.8rem] font-black leading-none "
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                ({{ currentRanking[0]?.rate || 0 }}%)
              </div>
            </div>
          </div>

          <!-- 第三名 -->
          <div class="flex flex-col items-center relative">
            <img :src=RankImg.gif_no3 class="w-full h-full" alt="第三名"
              style="transform: scale(1.3); transform-origin: center;" />

            <div class="absolute top-[3.2rem] left-1/2 transform -translate-x-1/2 text-center">
              <div class="text-themewhite text-xs px-3 rounded-full font-bold m5-theme-inputwithoutborder">
                {{ currentRanking[2]?.username || 'player3' }}
              </div>
              <div class="flex items-center justify-center text-themewhite">
                <img :src=RankImg.icon_money class="w-4 h-4 mr-1" alt="金币" />
                <span class="text-xs">{{ formatCompact(currentRanking[2]?.bet_amount) || 0 }}</span>
              </div>
              <div class="text-[0.65rem] font-black leading-none mt-0.5"
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                R${{ formatCompact(currentRanking[2]?.bonus) }}
              </div>
              <div class="text-[0.65rem] font-black leading-none"
                style="color:#fff000;-webkit-text-stroke:1px #240305;text-stroke:0.3px #240305;">
                ({{ currentRanking[2]?.rate || 0 }}%)
              </div>
            </div>
          </div>
        </div>

        <!-- 排行榜列表（第4名及以后） -->
        <div>
          <div v-for="(player, index) in (Array.isArray(currentRanking) ? currentRanking.slice(3) : [])" :key="index"
            class="relative py-2 mt-2" :style="{
              background: `url(${CommonImg.bg_item})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }">
            <!-- 背景图片 -->
            <!-- <img
              src="/imgs/jprank/img_paiming.png"
              loading="lazy"
              class="w-full h-full absolute inset-0"
              alt="排名背景"
            /> -->

            <!-- 当前用户高亮光圈 -->
            <img v-if="player.rank === currentMember.rank" :src=RankImg.img_flight
              class="w-full h-full absolute inset-0 z-5 pointer-events-none"
              style="transform: scaleX(1.03) scaleY(1.2); transform-origin: center;" alt="highlight" />

            <!-- 内容覆盖在背景上 -->
            <div class="relative z-10 flex items-center justify-between h-full px-4">
              <!-- 前项：排名 -->
              <div class="flex items-center w-12 flex-shrink-0">
                <div class="w-8 h-8 flex items-center justify-center text-themetext0 font-bold text-2xl italic">
                  {{ player.rank }}
                </div>
              </div>

              <!-- 中项：用户名称和金额 -->
              <div class="flex flex-col flex-shrink-0 items-start mb-1 justify-start text-left">
                <div class="text-themewhite text-sm">
                  {{ player.username }}
                </div>
                <div class="flex items-start justify-start space-x-1 bg-rgbablack15 rounded-full px-2 py-1 w-auto h-6">
                  <img :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
                  <span class="text-sm font-normal  text-themetext0">{{ formatCompact(player.bet_amount) }}</span>
                </div>
              </div>

              <!-- 后项：奖金和排名变化 -->
              <div class="flex flex-col items-end justify-center flex-1 min-w-0">
                <div class="text-themetext0 text-[0.9rem]">
                  R${{ formatCompact(player.bonus) }}({{ player.rate }}%)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="height: calc(3rem + env(safe-area-inset-bottom));"></div>
      </div>
    </pu-card>

    <!-- 底部信息栏 -->
    <div class="fixed left-1/2 -translate-x-1/2 bottom-0 w-wrap h-20 flex justify-center items-center z-50 "
      style="padding-bottom: env(safe-area-inset-bottom);" :style="{
        background: `url(${RankImg.bg_bottom})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }">

      <!-- <img src="/imgs/jprank/bg1.png" class="w-full h-auto pt-3 object-cover absolute inset-0" alt="底部背景" /> -->

      <div class="w-full relative z-10 flex items-center justify-between h-18 px-2 pt-8">

        <!-- 玩家不满足上榜条件时显示 -->
        <!-- currentMember.state==0 -->
        <template v-if="currentMember.state==0">
          <div class="flex flex-col items-center justify-center text-themewhite ">
            <div class="text-xs mb-1 text-center">
              Você precisa de <span class="text-themetext0"> {{ isAuthRef ? currentMember.ranksLeft :
                rulesConfig.bet_rank_limit }}</span> apostas extras para participar do ranking
            </div>
          </div>

          <div class="flex items-center justify-center">
            <button @click="goToAttend"
              class="min-w-28 h-8 m5-theme-btn1 text-themewhite px-2 rounded-lg font-bold text-sm transition-all  shadow-lg">
              Vá participar
            </button>
          </div>
        </template>

        <!-- 玩家满足上榜条件时显示原有三项 -->
        <template v-else>
          <div class="flex flex-col items-center justify-center text-themewhite">
            <div class="text-[0.8rem] Fmb-1 whitespace-nowrap">
              {{ currentMember.state == 2 ? 'Sua classificação' : 'Fileiras restantes' }}
            </div>
            <div class="flex items-center space-x-1 ">
              <img v-if="currentMember.state !== 2" :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
              <span class="font-bold text-sm  text-themetext0 ">{{ currentMember.state == 1 ? currentMember.ranksLeft :
                currentMember.rank }}</span>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center text-themewhite mx-1">
            <div class="flex items-center mb-1">
              <img :src=RankImg.icon_user class="w-5 h-5" alt="用户" />
              <span class="text-sm">{{ currentMember.username }}</span>
            </div>
            <div class="flex items-center justify-center space-x-1">
              <img :src=RankImg.icon_money class="w-4 h-4" alt="金币" />
              <span class=" font-bold text-themetext0 text-sm">{{ currentMember.bet_amount }}</span>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center">
            <button @click="improveRanking"
              class=" m5-theme-btn1 rounded-full  text-[0.625rem] p-2">
              melhorar a classificação
            </button>
            <span class="font-bold text-[0.65rem]">Recompensa:<span class="text-themetext0">{{ currentMember.state == 2 ? ('R$' + (currentMember?.bonus
              ?? '--')) : '--' }}</span></span>
          </div>
        </template>
      </div>
    </div>

    <!-- 历史弹窗 showHistoryModal -->
    <div v-if="showHistoryModal" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]">
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0 " alt="弹窗背景" />

        <!-- 内容覆盖在背景上 -->
        <div class="relative z-10 p-2">
          <!-- 标题和关闭按钮 -->
          <div class="relative flex items-center justify-between pt-3 mb-4">
            <h2 class="absolute top-0 left-1/2 -translate-x-1/2 text-themewhite text-xl font-bold">História</h2>
            <button @click="closeHistoryModal" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center text-[2.4rem]">
              <!-- <img :src=CommonImg.btn_close alt="关闭" class="w-5 h-5" /> -->
              ×
            </button>
          </div>

          <!-- 排行榜类型 -->
          <div class="flex justify-between items-center pt-5">
            <button v-for="(rankType, idx) in rankTypes" :key="rankType.key" @click="switchHistoryTab(rankType)"
              class="focus:outline-none flex-1 mx-1 relative overflow-hidden" style="min-width:0;">
              <!-- <img
                    :src="historyActiveTab === rankType.key
                        ? `/imgs/jprank/img_time1.png`
                        : `/imgs/jprank/img_time2.png`"
                    :alt="rankType.name"
                    class="w-full object-contain"
                    style="max-width:unset;"
                /> -->
              <!-- 文字内容覆盖在图片上 -->
              <div class="py-2 rounded-xl flex flex-col justify-center items-center text-center"
              :class="[historyActiveTab === rankType.key ? 'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2' : 'bg-btn1_bg text-themewhite']"
              >
                <div
                  :class="[historyActiveTab === rankType.key ? '' : 'text-themewhite', 'text-[0.8rem] leading-tight px-1 pt-1']">
                  {{ rankType.name }}
                </div>
              </div>
            </button>
          </div>

          <!-- Jackpot金额显示 -->
          <div class="relative text-center p-2 mb-4  mt-2 " 
          :style="{
                background: `url(${CommonImg.bg_item})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }"
          >
            <!-- <img src="/imgs/jprank/img_paiming.png" class="w-full h-18 object-cover"  /> -->
            <div class="text-yellow-400 text-2xl font-bold mb-1  whitespace-nowrap">
              JACKPOT: {{ Math.ceil(currentHistoryJackpot.jackpot) }}
            </div>
            <div class="text-themewhite text-[0.55rem] whitespace-nowrap">
              O Jackpot anterior {{ Math.ceil(currentHistoryJackpot.clearing_bouns) }} foi adicionado ao próximo Jackpot
            </div>
          </div>

          <!-- 历史记录列表 -->
          <div class="rounded-lg bg-tablebg">
            <!-- 表头 - 调整列宽比例 -->
            <div class="grid grid-cols-4 text-themewhite text-xs mb-0 whitespace-nowrap bg-rgbablack30 p-3"
              style="grid-template-columns: 0.8fr 1.2fr 1fr 1.5fr;">
              <div class="text-center text-themewhite ">Classificação</div>
              <div class="text-center text-themewhite ">Nome</div>
              <div class="text-center text-themewhite ">Apostas totais</div>
              <div class="text-center text-themewhite ">Recompensa</div>
            </div>

            <!-- 列表内容 -->
            <div class="h-56 overflow-y-auto overflow-x-hidden ">
              <div v-for="(record, index) in currentHistoryRankData" :key="index"
                class="grid grid-cols-4 text-themewhite py-2"
                :class=" index % 2 === 0 ? 'bg-tablebg' : 'bg-tablebg2'"
                style="grid-template-columns: 0.8fr 1.2fr 1fr 1.5fr;">
                <div class="text-center text-themetext0 truncate px-1 text-xs">{{ record.rank }}</div>
                <div class="text-center text-themewhite truncate px-1 text-xs">{{ record.username }}</div>
                <div class="text-center text-themewhite truncate px-1 text-xs">{{ formatCompact(record.bet_amount) }}
                </div>
                <!-- 最后一列使用更小的字体 -->
                <div class="text-center text-themetext0 flex   truncate px-1 text-xs leading-tight">
                  <img :src="CommonImg.img_money" alt="" class="w-4 h-4 mr-1">
                  R${{ formatCompact(record.bonus) }}<span class="text-themewhite">({{ record.rate }}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </pu-card>
    </div>

    <!-- 规则弹窗 -->
    <div v-if="showRulerModal" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]">
        <!-- 背景 img 已在卡片内绝对定位，无需改动 -->
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0 z-0" alt="弹窗背景" />
        <!-- 标题和关闭按钮 -->
        <div class="relative flex items-center justify-between pt-3 mb-4">
          <h2 class="absolute top-2 left-1/2 -translate-x-1/2 text-xl text-themewhite font-bold">Regras</h2>
          <button @click="closeRuleModal" class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-[2.4rem] z-10">
            ×
          </button>
        </div>

        <div class="relative z-10 p-5">
          <!-- 同一滚动容器，包含三块内容 -->
          <div class="modal-scroll ">
            <!-- 标题分割线 -->
            <div class="w-full mb-4 pt-5 flex items-center justify-center">
              <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2 font-bold">
                <span>Recompensa da atividade</span>
              </h5>
            </div>
            <!-- 规则内容 -->
            <article class="pt-3 ctx-article p-mb text-sm text-themetext3" v-html="rulesConfig.bet_rank_content">
            </article>

            <!-- 奖励配置表（表头+列表） -->
            <div class="rounded-lg">
              <div class="grid grid-cols-4 text-themewhite text-xs mb-0 whitespace-nowrap bg-tablebg1 p-3"
                style="grid-template-columns: 1.2fr 1.2fr 1.2fr 1.5fr;">
                <div class="text-center text-themewhite">Classificaçäo</div>
                <div class="text-center text-themewhite">Lista DIA</div>
                <div class="text-center text-themewhite">Lista SEM</div>
                <div class="text-center text-themewhite">Lista Mês</div>
              </div>

              <!-- 注意：这里不再设置 h-[14rem] 和 overflow -->
              <div>
                <div v-for="(record, index) in rulesConfig.bet_rank_config" :key="index"
                  class="grid grid-cols-4 text-themewhite text-xs py-2"
                  :class="{ 'bg-tablebg2': index % 2 === 0, 'bg-tablebg1': index % 2 !== 0 }"
                  style="grid-template-columns: 1.2fr 1.2fr 1.2fr 1.5fr;">
                  <div class="text-center text-themewhite">{{ record.rank }}</div>
                  <div class="text-center text-themewhite">{{ record.day }}%</div>
                  <div class="text-center text-themewhite">{{ record.week }}%</div>
                  <div class="text-center flex items-center justify-center space-x-1">
                    <span class="text-themewhite">{{ record.month }}%</span>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </pu-card>

    </div>

    <!-- 奖励弹窗 -->
    <div v-if="showRewardModal" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      <pu-card theme="4" class="relative w-[23rem]">
        <!-- 背景图片 -->
        <img :src=RankImg.img_tanchuang class="w-full h-auto object-cover absolute inset-0 " alt="弹窗背景" />

        <!-- 内容覆盖在背景上 -->
        <div class="relative z-10 p-3">
          <!-- 标题和关闭按钮 -->
          <div class="relative flex items-center justify-between pt-3 mb-4">
            <h2 class="absolute top-0 left-1/2 -translate-x-1/2 text-themewhite text-xl font-bold">My Rewards</h2>
            <button @click="closeRewardModal" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center text-[2.4rem] z-10">
              ×
            </button>
          </div>

          <!-- 历史记录列表 -->
          <div class="rounded-lg pt-5 ">
            <!-- 表头 -->
            
            <div class="grid grid-cols-4 text-themewhite text-xs mb-0 whitespace-nowrap bg-tablebg1 p-3"
              style="grid-template-columns: 1.2fr 1fr 0.8fr 1.5fr;">
              <div class="text-center text-themewhite">Tempo</div>
              <div class="text-center text-themewhite">Tipo</div>
              <div class="text-center text-themewhite">Classificaçäo</div>
              <div class="text-center text-themewhite">Recompensa</div>
            </div>

            <!-- 列表内容 - 可滚动 -->
            <div class="h-[22rem] overflow-y-auto overflow-x-hidden">
              <template v-if="Array.isArray(rewardRecord) && rewardRecord.length > 0">
                <div v-for="(record, index) in rewardRecord" :key="index"
                  class="grid grid-cols-4 text-themewhite text-xs py-2 "
                  :class=" index % 2 === 0 ? 'bg-tablebg2' : 'bg-tablebg1'"
                  style="grid-template-columns: 1.4fr 0.8fr 0.8fr 1.5fr;">
                  <div class="text-center text-themewhite">{{ record.rank_start_date }}</div>
                  <div class="text-center text-themewhite">{{ record.rank_type === '1' ? 'DIA' : record.rank_type ===
                    '2' ? 'SEM' : record.rank_type === '3' ? 'Mês' : record.rank_type }}</div>
                  <div class="text-center text-themewhite">{{ record.rank }}</div>
                  <div class="text-center flex items-center justify-left ml-3 space-x-1 text-themetext0">
                    <img :src="CommonImg.img_money" alt="" class="w-4 h-4 mr-1">
                    R${{ record.bonus }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="w-full h-full flex flex-col items-center justify-center">
                  <img :src=RankImg.img_nodata class="w-1/3 h-auto opacity-80 mb-4" alt="no data" />
                  <p class="text-[0.825rem] text-themetext3">Ainda não recebi a recompensa</p>
                </div>
              </template>
            </div>
          </div>
        </div>
      </pu-card>
    </div>

  </pu-page>
</template>

<style scoped>
/* 确保页面内容不会滚动 */
:deep(.pu-page) {
  height: 100vh;
  overflow: hidden;
}

:deep(#main-content) {
  height: 100vh;
  overflow: hidden;
}

/* 排行榜列表滚动样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* 历史记录列表样式 */
.max-h-32.overflow-y-auto::-webkit-scrollbar,
.max-h-56.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.max-h-32.overflow-y-auto::-webkit-scrollbar-track,
.max-h-56.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.max-h-32.overflow-y-auto::-webkit-scrollbar-thumb,
.max-h-56overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.max-h-32.overflow-y-auto::-webkit-scrollbar-thumb:hover,
.max-h-56.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* 隐藏历史记录列表的滚动条 */
.max-h-56.overflow-y-auto {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.max-h-56.overflow-y-auto::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

/* 确保列表与表头完美对齐 */
.grid.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Jackpot数字样式：字间距与发光 */
.jackpot-glow {
  /* text-shadow:
    0 0 6px rgba(255, 238, 0, 0.6),
    0 0 14px rgba(255, 196, 0, 0.5),
    0 0 22px rgba(255, 166, 0, 0.35),
    2px 2px 4px rgba(0, 0, 0, 0.8); */
  letter-spacing: 0.3em;
  /* 默认 */
  /* font-variant-numeric: tabular-nums; */
  /* 数字等宽，减少偏移 */
  /* -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility; */
}


/* iOS Safari 优化 - 提高优先级 */
@supports (-webkit-touch-callout: none) {
  .jackpot-glow {
    letter-spacing: 0.23em !important;
  }
}


@keyframes jackpotSheen {
  0% {
    left: -35%;
  }

  100% {
    left: 110%;
  }
}

/* 统一隐藏本页所有纵向滚动条 */
.overflow-y-auto,
.overflow-y-scroll {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.overflow-y-auto::-webkit-scrollbar,
.overflow-y-scroll::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}


/* 整块内容滚动区域：把可见高度限制在背景框内 */
.modal-scroll {
  max-height: 25rem;
  /* 按你的弹窗背景可视高度调整 */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-right: 0.25rem;
  /* 预留滚动条空间，避免抖动 */
}

/* 可选：隐藏滚动条 */
.modal-scroll::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>