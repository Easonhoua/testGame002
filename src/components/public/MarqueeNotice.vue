<template>
  <van-notice-bar
    color="inherit"
    style="--van-notice-bar-font-size: 0.85rem;--van-notice-bar-padding: 0 0.75rem;background: var(--color-default-bg);"
    :scrollable="true"
    @click="openNotice()"
    class="w-full custom-notice-bar !text-four"
  >
    <template #left-icon>
      <img :src=CommonImg.icon_laba class="w-[1.375rem] h-[1.375rem] mr-1">
    </template>
    <div v-html="formattedText" class="inline-flex"></div>
  </van-notice-bar>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useThemeImages } from '@/utils/themeimg'

const CommonImg = useThemeImages().common 

// 游戏名称及权重配置
const gameWeightList = [
  { name: 'Fortune Rabbit', weight: 1000 },
  { name: 'Fortune Tiger', weight: 1000 },
  { name: 'Fortune Ox', weight: 1000 },
  { name: 'Fortune Dragon', weight: 1000 },
  { name: 'Fortune Snake', weight: 1000 },
  { name: 'Mr. Treasure\'s Fortune', weight: 1000 },
  { name: 'Fortune Mouse', weight: 1000 },
  { name: 'Pinata Wins', weight: 1000 },
  { name: 'Piggy Gold', weight: 200 },
  { name: 'Midas Fortune', weight: 200 },
  { name: 'Captain\'s Bounty', weight: 200 },
  { name: 'Cash Mania', weight: 200 },
  { name: 'Cocktail Nights', weight: 200 },
  { name: 'Wings of Iguazu', weight: 200 },
  { name: 'Wild Bandito', weight: 200 },
  { name: 'Rio Fantasia', weight: 200 },
  { name: 'Wild Bounty Showdown', weight: 200 },
  { name: 'Double Fortune', weight: 200 },
  { name: 'Lucky Neko', weight: 200 },
  { name: 'Shark Bounty', weight: 200 },
  { name: 'Mahjong Ways', weight: 200 },
  { name: 'Ganesha Gold', weight: 200 },
  { name: 'Ways of The Qilin', weight: 200 },
  { name: 'Dragon Hatch', weight: 200 },
  { name: 'Diner Delight', weight: 100 },
  { name: 'Ganesha Fortune', weight: 100 },
  { name: 'Wild Ape #3258', weight: 100 },
  { name: 'Raider Jane s Crypt of Fortune', weight: 100 },
  { name: 'Fortune Coins', weight: 200 },
  { name: 'Money Pot', weight: 500 },
  { name: 'Fortune Gems 3', weight: 300 },
  { name: 'Fortune Gems 2', weight: 300 },
  { name: 'Fortune Gems', weight: 300 },
  { name: 'Money Coming', weight: 500 },
  { name: 'Lucky Jaguar', weight: 200 },
  { name: 'Devil Fire2', weight: 100 },
  { name: 'Joker\'s Jewels', weight: 100 },
  { name: 'Heist Stakes', weight: 100 },
  { name: 'Treasures of Aztec', weight: 100 },
]

// 生成权重池
const weightPool = []
gameWeightList.forEach(item => {
  for (let i = 0; i < item.weight; i++) {
    weightPool.push(item.name)
  }
})

const props = defineProps({
  interval: {
    type: Number,
    default: 600000 // 10分钟
  },
  count: {
    type: Number,
    default: 100
  }
})

// 自动生成10000个巴西手机号
function genPhones() {
  const arr = [];
  // 巴西有效的2位区号（主要城市和州）
  const areaCodes = [
    '11', '12', '13', '14', '15', '16', '17', '18', '19', // São Paulo等
    '21', '22', '24', '27', '28', // Rio de Janeiro等
    '31', '32', '33', '34', '35', '37', '38', // Minas Gerais等
    '41', '42', '43', '44', '45', '46', '47', '48', '49', // Paraná等
    '51', '53', '54', '55', // Rio Grande do Sul等
    '61', '62', '63', '64', '65', '66', '67', '68', '69', // 中部和北部
    '71', '73', '74', '75', '77', '79', // Bahia等
    '81', '82', '83', '84', '85', '87', '88', '89', // Pernambuco等
    '91', '92', '93', '94', '95', '96', '97', '98', '99' // Norte地区
  ];

  for (let i = 0; i < 10000; i++) {
    // 随机选择区号
    const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
    // 手机号码第3位必须是9
    const prefix = areaCode + '9'; // 例如: 119, 219 等
    
    let number = prefix;
    // 生成后8位数字
    for (let j = 0; j < 8; j++) {
      number += Math.floor(Math.random() * 10);
    }
    
    arr.push(number);
  }
  return arr;
}

const phoneList = genPhones()
const notices = ref([])
let refreshTimer = null

function maskPhone(phone) {
  if (!phone || phone.length !== 11) return phone
  return phone.slice(0, 2) + '******' + phone.slice(8)
}

function randomGame() {
  // 按权重随机
  const idx = Math.floor(Math.random() * weightPool.length)
  return weightPool[idx]
}

function randomPhone() {
  const idx = Math.floor(Math.random() * phoneList.length)
  return phoneList[idx]
}

// 修正后的格式化函数
const formattedText = computed(() => {
  return notices.value.map(notice => {
    // 先处理游戏名称部分
    let processedNotice = notice
    gameWeightList.forEach(game => {
      const pattern = new RegExp(`(em ${game.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g')
      processedNotice = processedNotice.replace(pattern, 
        `em <span class="!text-one">${game.name}</span>`
      )
    })
    
    // 然后处理金额部分
    processedNotice = processedNotice.replace(/(\d+\s*R\$)/g, 
      `<span class="text-gold !text-four">$1</span>`
    )
    
    // 最后将剩余部分包裹在普通样式中
    return `<span class="mx-12 text-normal !text-themewhite">${processedNotice}</span>`
  }).join('')
})

// 生成通知消息
function genNotices() {
  const arr = []
  for (let i = 0; i < props.count; i++) {
    const phone = maskPhone(randomPhone())
    const game = randomGame()
    if (Math.random() < 0.6) {
      // 生成提现消息 1000以上是10的整数倍数 以下可以不用
      var amount = Math.floor(Math.random() * (5000 - 50 + 1)) + 50
      if (amount >= 1000) {
        amount = Math.round(amount / 10) * 10 // 确保是10的整数倍
      }
      arr.push(`${phone} acabou de extrair ${amount} R$`)
    } else {
      // 生成中奖消息 必须是10的整数倍
      var amount = Math.floor(Math.random() * ((10000 - 100) / 10 + 1)) * 10 + 100
      arr.push(`${phone} acaba de ganhar ${amount} R$ em ${game}`)
    }
  }
  return arr
}

function startMarquee() {
  notices.value = genNotices()
}

function openNotice() {
  // 点击通知的处理函数
  playBtnAudioFunc()
  NoticeShowRef.value = true
}

onMounted(() => {
  startMarquee()
  if (refreshTimer) clearInterval(refreshTimer)
  refreshTimer = setInterval(() => {
    startMarquee()
  }, props.interval)
})

onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer)
})
</script>

<style scoped>
/* 修正后的样式 */
.custom-notice-bar :deep(.text-gold) {
  font-weight: bold; /* 金额加粗 */
  font-size: 0.95rem; /* 金额字体稍大 */
}

.custom-notice-bar :deep(.text-game) {
  font-weight: bold; /* 游戏名称加粗 */
  font-size: 0.95rem; /* 游戏名称字体稍大 */
}

.custom-notice-bar :deep(.text-normal) {
  font-size: 0.85rem; /* 普通文字大小 */
}

/* 确保基础文本颜色 */
.custom-notice-bar :deep(.van-notice-bar__content) {
  font-size: 0.85rem; /* 基础字体大小 */
}

/* 调整通知栏高度适应更大字体 */
.custom-notice-bar :deep(.van-notice-bar__wrap) {
  height: 2.8rem; /* 调高以适应更大字体 */
  align-items: center;
}
</style>