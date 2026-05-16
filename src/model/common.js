import { computed, onMounted, ref } from 'vue'
import { $get, $post } from '@/request'
import { signConfigRef, redPakageStateRef} from '@/model/other'
import { shareMsg } from '@/model/pdd'
import { isAuthRef} from '@/model/user'
 import { t } from '@/i18n'
// 社媒列表
export var socialListRef = ref([])
export var socialMenuListRef = ref([]) // location = 1 左菜单栏底部
export var socialRedeemListRef = ref([]) // location = 2 兑换码
//充值页面文案配置
export var rechargeTextRef = ref('')
// 主页浮标
export const buoyListRef = ref([])
//底部浮标
export const footerListRef = ref([])

// 首充列表
export const payListRef = ref([])

// 横幅列表
export const bannerListRef = ref([])
export const activityListRef  = ref([])
export const leftproListRef = ref([])

//大厅jackpot入口
export const jpLobbyInfo = ref({})

// 内部计时器句柄
let lobbyIncrementTimer = null

//活动配置
export var navListRef = ref([])
//签到是否打开
export var isOpenEnterRef = ref(false)

//跑马灯配置内容
export var marqueeRef = ref('')
//主页底部文案
export var footerTextRef = ref('')
//pdd配置
export var pddBaseConfRef = ref({})
export const blogTagIdsRef = ref([])
//pdd首页弹窗是否打开
export var isPopPdd = computed(() => {
    let isPop = false

    if(pddBaseConfRef.value.pdd_popop_type == "0"){ //关闭
        isPop = false 
    }else if(pddBaseConfRef.value.pdd_popop_type == "3"){ //访问注册都弹
        isPop = true  
    }else if(pddBaseConfRef.value.pdd_popop_type == "1"){ //注册后弹
        //判断是否登录
        isPop = isAuthRef.value ? true : false 
    }else if(pddBaseConfRef.value.pdd_popop_type == "2"){ //访问弹
        isPop = isAuthRef.value ? false : true 
    }
    return isPop
})

//获得配置集合
export async function getCommonConfigFunc() {
    let params = {}
    if(window.allParams && window.allParams!=''){
        params.url_params = window.allParams
    }
    const res = await $get({ url: '/activity/v2/index/index' ,params: params}, { loading: false })
    if (res.code != 200) return     
    const data = res.data || {}

    //社媒配置
    if (data.share_manage) {
        socialListRef.value = Array.isArray(data.share_manage) ? data.share_manage : [];
        // 按照 location 字段拆分
        socialMenuListRef.value = (socialListRef.value || []).filter(item => item && item.location == 1)
        socialRedeemListRef.value = (socialListRef.value || []).filter(item => item && item.location == 2)
    }
    //底部导航栏配置
    if(data.banner[5]){
        footerListRef.value = data.banner[5] || []
    }

    //浮标配置
    if(data.social_index){
        buoyListRef.value = data.social_index || [];
    }

    //首充列表
    if(data.first_pay){
        payListRef.value = data.first_pay || [];
    }

    //横幅列表
    if(data.banner){
        bannerListRef.value = data.banner
        activityListRef.value = data.banner["4"] || []
        leftproListRef.value = data.banner["3"] || []
    }

    //大厅jackpot入口
    if(data.bet_rank_lobby_info){
        jpLobbyInfo.value = data.bet_rank_lobby_info || {}

        //插入文本
        jpLobbyInfo.value.list.forEach(item => {
            if(item.rank_type == 1){
            item.text = 'Ganhe bônus diário na tabela de classificação'
            }else if(item.rank_type == 2){
            item.text = 'Ganhe recompensas semanais na tabela de classificação'
            }else{
            item.text = 'Ganhe recompensas mensais na tabela de classificação'
            }
        })
  
        // 启动大厅 Jackpot 累加计时器：每秒随机 +5~12
        if (lobbyIncrementTimer) {
            clearInterval(lobbyIncrementTimer)
            lobbyIncrementTimer = null
        }
        lobbyIncrementTimer = setInterval(() => {
            if (!jpLobbyInfo.value) return
            // 确保始终为整数，避免浮点数精度问题
            const base = Math.floor(Number(jpLobbyInfo.value.allJackpot)) || 0
            const inc = Math.floor(Math.random() * (12 - 5 + 1)) + 5 // 5-12 随机整数
            jpLobbyInfo.value.allJackpot = Math.floor(base + inc)
        }, 1000)
    }

    //活动导航配置
    if(data.index_config){
        navListRef.value = data.index_config.activity_banner || []
        navListRef.value.forEach(item => {
            let type = item.activity_type
            if(type=='sign_in'){
                isOpenEnterRef.value = true
            }

            switch (type) {
                case 'sign_in':
                    item.title = t('aside.enter')
                    break;
                case 'treasure':
                    item.title = t('aside.Treasure')
                    break;
                case 'rescue':
                    item.title = t('aside.Rescue')
                    break;
                case 'rescue_week':
                    item.title = t('aside.Week')
                    break;
                case 'vip_bonus':
                    item.title = t('aside.VIP')
                    break;
                case 'agent':
                    item.title = t('aside.Agent')
                    break;
                case 'lucky':
                    item.title = t('aside.Prizedraw')
                    break;
                case 'code':
                    item.title = t('aside.Replacement')
                    break;
                case 'red_packet':
                    item.title = t('aside.Collect')
                    break;
                case 'total_recharge':
                    item.title = t('aside.Bonus')
                    break;
                case 'pdd':
                    item.title = t('aside.Tycoon')
                    break;
                case 'discount':
                    item.title = t('aside.Offers')
                    break;
                case 'grand_deposit':
                    item.title = t('aside.Offers')
                    break;
                case 'mystery':
                    item.title = t('aside.Mysterious')
                    break;
                case 'day7_back':
                    item.title = t('aside.7Days')
                    break;
                case 'code_wash':
                    item.title = t('aside.Rebate')
                    break;
                case "turntable":
                    item.title = t('aside.Roulette')
                    break;
                case 'first_pay':
                    item.title = t('aside.Deposit')
                    break;
                case 'pass':
                    item.title = t('aside.Pass')
                    break;
                case 'bet_rank':
                    item.title = t('aside.Classification')
                    break;
                case 'bet_sign':
                    item.title = t('aside.Level')
                    break;
                case 'month_lottery':
                    item.title = t('aside.Super')
                    break;
                case 'member_day':
                    item.title = t('aside.memberDay')
                    break;
                default:
                    break;
            }
        });

        //跑马灯配置内容
        if(data.index_config.marquee) {
            marqueeRef.value = data.index_config.marquee
        }
        //主页底部文案
        if(data.index_config.site_bottom) {
            footerTextRef.value = data.index_config.site_bottom
        }
         // 充值页面文案配置
         if(data.index_config.recharge_desc){
            rechargeTextRef.value = data.index_config.recharge_desc?data.index_config.recharge_desc:''
        }
    }


    if(data&&data.merchant_share_info){
        shareMsg.value = data.merchant_share_info.default_share_str
    }

    //pdd配置
    if(data&&data.pdd_base_config){
        pddBaseConfRef.value = data.pdd_base_config
    }
}


//活动红点数量
export var redPotActivityRef = ref([])
export const redPotCountRef = computed(()=> {
    let _val = 0
    navListRef.value.forEach(item => {
        if (item.count>0) {
            _val ++
        }
    })
    if(signConfigRef.value&&signConfigRef.value.todayStatus) {
        _val ++
    }
    if(redPakageStateRef.value&&redPakageStateRef.value.status==1) {
        _val ++
    }
    return _val
})

//获得红点
export async function getRedPot() {

    const res = await $get({ url: '/activity/v2/index/red-dot' }, { loading: false })
    if (res.code != 200) return     
    const data = res.data || {}
    blogTagIdsRef.value = res.data.blogTagIds||[]
    if(data.index_config){
        redPotActivityRef.value = data.index_config.activity_banner || []
        //更新navListRef中的count
        navListRef.value.forEach(navItem => {
            const matchedItem = redPotActivityRef.value.find(redItem => redItem.activity_type === navItem.activity_type)
            if (matchedItem) {
                navItem.count = matchedItem.count
            } else {
                navItem.count = 0
            }
        })
    }
}
// 首页icon
export function BuoyModel() {
    async function getBuoyListFunc() {
        const res = await $get({ url: '/activity/v1/social/index' }, { loading: true })
        if(res.code != 200) return
        buoyListRef.value = res.data||[]
    }
    
    return { getBuoyListFunc }
}

// 公告列表
export const noticeListRef = ref([])
// 当前公告
export const currentNoticeRef = ref({})
// 当前公告index
export const currentNoticeIndexRef = ref(0)
//公告弹窗是否打开
export const isPopNotice = computed(() => {

    const notice = currentNoticeRef.value
    if (!notice) return false
  
    const { id, jump_type } = notice
    const count = Number(localStorage.getItem(`notice_pop_count_${id}`) || 0)

    // 0：每次都弹
    if (jump_type === '0') {
      return true
    }
  
    // 1：只弹 1 次
    if (jump_type === '1') {
      if (count < 1) {
        localStorage.setItem(`notice_pop_count_${id}`,count + 1)
      }
      return count < 1
    }

    // 2：最多弹 2 次
    if (jump_type === '2') {
        if (count < 2) {
            localStorage.setItem(`notice_pop_count_${id}`,count + 1)
        }
        return count < 2
    }
  
    // 2：最多弹 3 次
    if (jump_type === '3') {
        if (count < 3) {
            localStorage.setItem(`notice_pop_count_${id}`,count + 1)
        }
        return count < 3
    }
  
    return false
})

//公告弹窗
export async function getNoticeConfig() {

    const res = await $get({ url: '/activity/v1/notice/index' }, { loading: true })
    if(res.code != 200) return
    const list = res.data.notice_list||[]
    
    // 按 jump_type 从大到小排序
    list.sort((a, b) => Number(b.jump_type) - Number(a.jump_type))
    noticeListRef.value = list

    if(noticeListRef.value.length>0){
        currentNoticeRef.value = noticeListRef.value[0]
    }
}

//批量领取
export const receiveListRef = ref([])
//批量领取弹窗是否打开
export const isPopReceive = computed(() => {
    return receiveListRef.value.length > 0
})

//批量领取接口
export async function getBatchReceive() {
    const res = await $post({ url: '/activity/v2/batch-send/list' }, { loading: false })
    if(res.code != 200) return
    receiveListRef.value = res.data?.list || []
}

//批量领取接口
export async function batchReceiveFunc(id) {

    const res = await $post({ url: '/activity/v2/batch-send/claim', data: { plan_id: id } }, { loading: false, toast: true })
    if(res.code != 200) return      
    //刷新批量领取列表  
    await getBatchReceive()
}

//批量领取全部
export async function batchReceiveAllFunc() {
    const res = await $post({ url: '/activity/v2/batch-send/claim-all' }, { loading: false, toast: true })
    if(res.code != 200) return  
    //刷新批量领取列表  
    await getBatchReceive()
}


