import { onMounted, ref,nextTick } from 'vue'
import { $get, $post } from '@/request'
import { playBtnAudioFunc } from '@/utils/core'
import { shareMsg } from '@/model/pdd'

export function agentIndexModel() {
    let indexListRef = ref([])
    let agentContentRef = ref('')
    let phoneNumbers = ref([])

    async function indexListFunc() {
        let res = await $get({url: '/activity/v1/agent/index'}, {loading: false})
        if(res.code != 200) return
        indexListRef.value = res.data.config||[]

        if(res.data&&res.data.agent_share_str){
            shareMsg.value = res.data.agent_share_str
        }

        if(res.data&&res.data.agent_content){
            agentContentRef.value = res.data.agent_content
        }


        if(res.data&&res.data.phone_numbers){
            phoneNumbers.value = res.data.phone_numbers
        }
        phoneNumbers.value = [1231,123123,123123,23490234,2342340,234234]
    }

    return { indexListRef, indexListFunc, agentContentRef,phoneNumbers}
}
export function agentLogsModel() {
    let dateRef = ref({
        s_date: '',
    })
    let logsDataRef = ref({})
    
    async function logsDataFunc() {
        let res = await $get({url: '/activity/v1/agent/agent-bonus-list', params: dateRef.value}, {loading: false})
        if(res.code != 200) return
        logsDataRef.value = res.data||{}
    }

    return { dateRef, logsDataRef, logsDataFunc }
}
export function agentCommissionModel() {
    let bonusListRef = ref([])
    
    async function bonusListFunc(loading) {
        let res = await $get({url: '/activity/v1/agent/list'}, {loading: loading})
        if(res.code != 200) return
        bonusListRef.value = res.data||[]
    }
    async function bonusTaskFunc(item, index) {
        if(item.status == 1) return
        playBtnAudioFunc()
        let res = await $post({url: '/activity/v1/agent/receive', data: {id: item.id}}, {loading: false, toast: true})
        if(res.code != 200) return
        bonusListRef.value[index].status = 1
    }

    return { bonusListRef, bonusListFunc, bonusTaskFunc }
}
export function agentMyDataModel() {
    let dateRef = ref({
        s_date: '',
    })
    let myDataRef = ref({})
    
    async function myDataFunc() {
        let res = await $get({url: '/activity/v1/agent/my-data', params: dateRef.value}, {loading: false})
        if(res.code != 200) return
        myDataRef.value = res.data||{}
    }

    return { dateRef, myDataRef, myDataFunc }
}

/////////////////agent v2接口///////////////////
//代理配置
export var agentConfigRef = ref([])
//规则配置
export var agentRuleRef = ref('')
//分享文案
export var agentShareRef = ref('')
//分享号码
export var agentPhoneRef = ref([])
//可领取
export var agentCanReceiveRef = ref(0)
//已领取
export var agentReceivedRef = ref(0)

//代理首页接口
export async function agentV2Index() {
    let res = await $get({url: '/activity/v2/agent/index'}, {loading: false})
    if(res.code != 200) return

    agentConfigRef.value = res.data.config||[]
    agentRuleRef.value = res.data.agent_content||''
    agentShareRef.value = res.data.agent_share_str||''
    agentPhoneRef.value = res.data.share_phone_code||[]
    agentCanReceiveRef.value = res.data.can_receive||0
    agentReceivedRef.value = res.data.is_received||0

}

//代理总数据接口
export var agentSummaryRef = ref({})
//佣金明细
export var agentBonusInfoRef = ref({})
//代理总数据接口
export async function agentV2TotalData(sdate, edate) {
    var params = {
        s_date: sdate,
        e_date: edate,
    }
    let res = await $get({url: '/activity/v2/agent/agent-sumary', params:params}, {loading: false})
    if(res.code != 200) return  

    const summary = res.data.summary || {}
    const regNum = Number(summary.reg_num) || 0
    const teamRegNum = Number(summary.team_reg_num) || 0

    const betAmount = Number(summary.direct_bet_amount) || 0
    const team_bet_amount = Number(summary.team_bet_amount) || 0

    summary.total_reg_num = regNum + teamRegNum
    summary.total_bet_amount = Number(betAmount + team_bet_amount).toFixed(2)

    const bonusInfo = res.data.bonusInfo || {}
    const directBonus = Number(bonusInfo.direct_bonus) || 0
    const indirectBonus = Number(bonusInfo.indirect_bonus) || 0

    bonusInfo.total_bonus = Number(directBonus + indirectBonus).toFixed(2)

    agentSummaryRef.value = summary
    agentBonusInfoRef.value = bonusInfo
}

//领取接口
export async function agentV2Receive() {

    let res = await $get({url: '/activity/v2/agent/receive'},  {loading: false, toast: true})
    if(res.code != 200) return  
    // 领取成功后，更新可领取和已领取状态
    agentV2Index()
}

//代理奖金明细
export var bonusListRef = ref([])

export const loadingRef = ref(false)
export const finishedRef = ref(false)
export const dateRef = ref({
    s_date: '',
    offset: 0,
    search_id: '',
    page: 1,
    page_size: 10,
})
  
/**
 * 重置列表（切换搜索条件时调用）
 */
export function resetBonusList() {
  bonusListRef.value = []
  dateRef.value.offset = 0
  dateRef.value.page = 1
  finishedRef.value = false
}
  
/**
 * 分页加载
 */
export async function agentV2BonusList() {
  if (loadingRef.value || finishedRef.value) return

  loadingRef.value = true

  try {
    const res = await $get(
      {
        url: '/activity/v2/agent/agent-bonus-list',
        params: dateRef.value,
      },
      { loading: false }
    )

    if (res.code !== 200) return

    const rawList = res.data?.list || {}

    // ⭐ 关键转换
    const list = Object.values(rawList)

    // ✅ 追加数据
    if (dateRef.value.page === 1) {
      bonusListRef.value = list
    } else {
      bonusListRef.value.push(...list)
    }

    // ✅ 判断是否加载完成
    if (list.length < dateRef.value.page_size) {
      finishedRef.value = true
    } else {
      dateRef.value.offset++,
      dateRef.value.page++
    }
  } finally {
    loadingRef.value = false

    nextTick(() => {
      if (!finishedRef.value) {
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
  
        if (scrollHeight <= clientHeight) {
          agentV2BonusList()
        }
      }
    })
  }
}
