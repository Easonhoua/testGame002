import { ref } from 'vue'
import { $get, $post } from '@/request'

// Jackpot排行榜数据模型
export function useJackpotModel() {

  //规则数据
  const rulesConfig = ref({})

  //奖池数据
  const jackpotInfo = ref({})

  //排行榜数据
  const rankingData = ref({})

  //会员数据
  const memberRankInfo = ref({})

  //当前显示jp
  const currentJackpot = ref({})

  //当前排行榜
  const currentRanking = ref({})

  //当前会员
  const currentMember = ref({})

  //历史榜单数据
  const historyRankData = ref({})

  //历史jackpot数据
  const historyJackpot = ref({})

  //当前历史jackpot
  const currentHistoryJackpot = ref({})

  //当前显示历史榜单数据 
  const currentHistoryRankData = ref({})

  //奖励记录
  const rewardRecord = ref({})

  //大厅入口
  // const jpLobbyInfo = ref({})

  // 倒计时结束时间缓存
  const endTimesCache = ref({})

  // 内部计时器句柄
  // let lobbyIncrementTimer = null

  // 转盘类型配置
  const rankTypes = [
    { key: 'dayRank', jpkey: 'dayJackpot', mkey: 'memberDayInfo', name: 'DIA' },
    { key: 'weekRank', jpkey: 'weekJackpot', mkey: 'memberWeekRank', name: 'SEM' },
    { key: 'monthRank', jpkey: 'monthJackpot', mkey: 'memberMonthRank', name: 'Mês' }
  ]

  // 计算并缓存结束时间
  function calculateEndTime(jpkey) {
    const info = jackpotInfo.value && jackpotInfo.value[jpkey] || {}
    
    // 如果有结束时间，直接使用
    if (info.rank_end_date) {
      const endDateStr = info.rank_end_date.toString()
      if (endDateStr.length === 8) {
        // 格式: YYYYMMDD
        const year = parseInt(endDateStr.substring(0, 4))
        const month = parseInt(endDateStr.substring(4, 6)) - 1 // 月份从0开始，需要减1
        const day = parseInt(endDateStr.substring(6, 8))
        return new Date(year, month, day, 23, 59, 59) // 设置为当天结束
      } else {
        return new Date(info.rank_end_date)
      }
    }
    
    // 根据开始时间计算结束时间
    let start = new Date()
    if (info.rank_start_date) {
      const dateStr = info.rank_start_date.toString()
      if (dateStr.length === 8) {
        // 格式: YYYYMMDD
        const year = parseInt(dateStr.substring(0, 4))
        const month = parseInt(dateStr.substring(4, 6)) - 1 // 月份从0开始，需要减1
        const day = parseInt(dateStr.substring(6, 8))
        start = new Date(year, month, day)
      } else {
        start = new Date(info.rank_start_date)
      }
    }
    
    // 根据类型计算结束时间
    const end = new Date(start)
    if (jpkey === 'dayJackpot') {
      end.setDate(end.getDate() + 1)
      end.setHours(0, 0, 0, 0) // 设置为第二天开始
    } else if (jpkey === 'weekJackpot') {
      end.setDate(end.getDate() + 7)
      end.setHours(0, 0, 0, 0) // 设置为下一周开始
    } else if (jpkey === 'monthJackpot') {
      end.setMonth(end.getMonth() + 1)
      end.setHours(0, 0, 0, 0) // 设置为下个月开始
    } else {
      end.setDate(end.getDate() + 1)
      end.setHours(0, 0, 0, 0)
    }
    
    return end
  }

  // 更新结束时间缓存
  function updateEndTimesCache() {
    rankTypes.forEach(type => {
      endTimesCache.value[type.jpkey] = calculateEndTime(type.jpkey)
    })
  }

  // 获取倒计时显示文本（直接用“秒数 - 心跳”）
  function getCountdownText(jpkey, _heartbeat) {
    const countdownSec = Number(jackpotInfo.value?.[jpkey]?.countdown || 0)
    if (!countdownSec || countdownSec <= 0) return '00:00:00'

    const hb = _heartbeat && typeof _heartbeat === 'object' && 'value' in _heartbeat
      ? Number(_heartbeat.value || 0)
      : Number(_heartbeat || 0)
    const remainingSec = Math.max(countdownSec - Math.max(hb, 0), 0)

    if (remainingSec <= 0) return '00:00:00'

    const days = Math.floor(remainingSec / 86400)
    const hours = Math.floor((remainingSec % 86400) / 3600)
    const minutes = Math.floor((remainingSec % 3600) / 60)
    const seconds = Math.floor(remainingSec % 60)

    const pad = (n) => (n < 10 ? '0' + n : '' + n)

    if (days > 0) {
      return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    } else {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }
  }
  
  // 初始化数据
  async function initData(loading){

    let res = await $get({url: '/activity/v1/bet-rank/index'}, {loading: loading})
    if(res.code != 200) return

    rulesConfig.value = res.data.config||{}
    jackpotInfo.value = res.data.jackpot||{}  
    rankingData.value = res.data.rankRecord||{}
    memberRankInfo.value = res.data.memberRankInfo||{}

    currentJackpot.value = jackpotInfo.value['dayJackpot']||{}
    currentRanking.value = rankingData.value["dayRank"]||[]
    currentMember.value = memberRankInfo.value["memberDayInfo"]||{}

    // 计算jackpot不同榜单结束时间
    // updateEndTimesCache()

    //计算是否满足上榜条件 或者 满足条件未上榜currentMember.value.memeber_id存在  或者 满足条件上榜 currentMember.value.rank存在 
    currentMember.value.state = 0
    if(currentMember.value.rank !== undefined && currentMember.value.rank !== null){
        currentMember.value.state = 2
    }
    
    if(currentMember.value.member_id !== undefined && (currentMember.value.rank === undefined || currentMember.value.rank === null)){
       currentMember.value.state = 1
    }

  }

  //历史接口
  async function getHistory(loading) {

    let res = await $get({url: '/activity/v1/bet-rank/history'}, {loading: loading})
    if(res.code != 200) return

    historyJackpot.value = res.data.lastJackpot||{}
    historyRankData.value = res.data.lastRankRecord||{}

    currentHistoryJackpot.value = historyJackpot.value['dayJackpot']||{}
    currentHistoryRankData.value = historyRankData.value["dayRank"]||[]
  }

  //奖励记录
  async function getReward(loading) { 
    
    let res = await $get({url: '/activity/v1/bet-rank/reward'}, {loading: loading})
    if(res.code != 200) return

    rewardRecord.value = res.data.userReward||{}
  }
  
  // //大厅入口
  // async function getJpLobbyInfo(loading) {
  //   let res = await $get({url: '/activity/v1/bet-rank/bet-rank-lobby-info'}, {loading: loading})
  //   if(res.code != 200) return

  //   jpLobbyInfo.value = res.data||{}

  //   //插入文本
  //   jpLobbyInfo.value.list.forEach(item => {
  //     if(item.rank_type == 1){
  //       item.text = 'Ganhe bônus diário na tabela de classificação'
  //     }else if(item.rank_type == 2){
  //       item.text = 'Ganhe recompensas semanais na tabela de classificação'
  //     }else{
  //       item.text = 'Ganhe recompensas mensais na tabela de classificação'
  //     }
  //   })

  //   // 启动大厅 Jackpot 累加计时器：每秒随机 +5~12
  //   if (lobbyIncrementTimer) {
  //     clearInterval(lobbyIncrementTimer)
  //     lobbyIncrementTimer = null
  //   }
  //   lobbyIncrementTimer = setInterval(() => {
  //     if (!jpLobbyInfo.value) return
  //     // 确保始终为整数，避免浮点数精度问题
  //     const base = Math.floor(Number(jpLobbyInfo.value.allJackpot)) || 0
  //     const inc = Math.floor(Math.random() * (12 - 5 + 1)) + 5 // 5-12 随机整数
  //     jpLobbyInfo.value.allJackpot = Math.floor(base + inc)
  //   }, 1000)
  // }
  
  // 停止内部计时器，供页面卸载时清理
  function stop() {
    if (lobbyIncrementTimer) {
      clearInterval(lobbyIncrementTimer)
      lobbyIncrementTimer = null
    }
  }
  
  return {
    // 数据
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
    endTimesCache,
    rankTypes,
    
    // 方法
    initData,
    getHistory,
    getReward,
    getCountdownText,
  }
} 