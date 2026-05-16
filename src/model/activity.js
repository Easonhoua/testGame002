import { onMounted, ref,computed} from 'vue'
import { $get, $post } from '@/request'
import { t } from '@/i18n'
import { isAuthRef } from '@/model/user'
import { useRouter } from 'vue-router'
import { rechargePayInfoRef } from '@/model/account'
import dayjs from 'dayjs'
// 神秘彩金活动数据

export function mysteriousModel() {
   const mysteriousInfoRef = ref({})
   const daysListRef = ref([])
   const spinSuccessRef = ref(false)
   const bonusArrRef = ref([])
   const accumulateMoneyRef = ref(0)//    const timeDayDisplay=ref([])
    async function  mysteriousListFunc(loading) {
        let res = await $get({url: '/activity/v1/mystery/index'}, {loading: loading})
        if(res.code != 200) return
        mysteriousInfoRef.value = res.data||{}
        bonusArrRef.value = res.data.bonus_arr||[]
        accumulateMoneyRef.value = res.data.accumulate_money||0
        const obj= res.data.config||[]
        daysListRef.value=Object.keys(obj)
        .map(key => Number(key.replace('mystery_config_day', '')))
        .sort((a, b) => a - b)

    }
    async function  mysteriousSuccessFunc(id) {
        let data = {
            id: id,
        }
        let res = await $post({url: '/activity/v1/mystery/receive',data:data}, {loading: true})
        if(res.code != 200) {
            showToast({
                message: res.message,
                type: 'error'
            });
            return false
        }
        spinSuccessRef.value=true
        // 立即刷新数据
        await mysteriousListFunc(false)
        return true
    }
    const timeMothDisplay = computed(() => {
        if (!mysteriousInfoRef.value.reg_time) return ''
        // 假设 mysteriousInfoRef.reg_time 是 '2024-06-01 12:00' 这种字符串
        const date = new Date(mysteriousInfoRef.value.reg_time.replace(/-/g, '/'))
        if (isNaN(date)) return mysteriousInfoRef.value.reg_time
      
        if (!isAuthRef) {
           //未登录，减一个月
           date.setMonth(date.getMonth() - 1)
        } 
        // 格式化为 yyyy-MM-dd HH:mm
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        const h = String(date.getHours()).padStart(2, '0')
        const min = String(date.getMinutes()).padStart(2, '0')
        return  `${y}-${m}-${d} ${h}:${min}`
      })
      const timeDayDisplay = computed(() => {
        if (!timeMothDisplay.value || !daysListRef.value.length) return []
        var arr=daysListRef.value.map(day => {
            return dayjs(timeMothDisplay.value).add(day-1, 'day').format('YYYY-MM-DD HH:mm:ss')
        })
        return arr
        
      })
    onMounted(()=>{
        mysteriousListFunc()
    })
    return { mysteriousInfoRef, mysteriousListFunc,daysListRef,timeMothDisplay,timeDayDisplay,bonusArrRef,accumulateMoneyRef,mysteriousSuccessFunc,spinSuccessRef }
}

export function sevendaybackModel() {
    const sevendaybackInfoRef = ref({})
    async function  sevendaybackListFunc(loading) {
        let res = await $get({url: '/activity/v1/day7back/index'}, {loading: loading})
        if(res.code != 200) return
        sevendaybackInfoRef.value = res.data||{}
    }
    
    onMounted(()=>{
        sevendaybackListFunc()
    })
    async function  getRewardsBtnFunc(day) {
        let data = {
            day: day,
        }
        let res = await $post({url: '/activity/v1/day7back/recv-bonus',data:data}, {loading: true})
        if(res.code != 200) {
            showToast({
                message: res.message,
                type: 'error'
            });
            return false
        }
        await sevendaybackListFunc()
    }
    return{sevendaybackInfoRef,getRewardsBtnFunc}
}
export function washcodeModel() {
    const washcodeInfoRef = ref({})
    const washcodeCofigRef = ref({})
    const sendamountRef = ref(0)
    const lastprizeRef = ref(0)
    const consumeMoneyRef = ref(0)
    async function  washcodeListFunc(loading) {
        let res = await $get({url: '/activity/v1/codewash/index'}, {loading: loading})
        if(res.code != 200) return
        washcodeInfoRef.value = res.data||{}
        washcodeCofigRef.value = res.data.config||{}
        sendamountRef.value = res.data.bouns.send_amount||0
        lastprizeRef.value = res.data.bouns.last_reward_end||0
        consumeMoneyRef.value = res.data.consume_money||0
    }
    
    onMounted(()=>{
        washcodeListFunc()
    })
    async function  getRewardsBtnFunc() {
        let res = await $post({url: '/activity/v1/codewash/recv-bonus'}, {loading: true})
        if(res.code != 200) {
            showToast({
                message: res.message,
                type: 'error'
            });
            return false
        }
        await washcodeListFunc()
    }
    return{washcodeListFunc,washcodeInfoRef,washcodeCofigRef,sendamountRef,lastprizeRef,consumeMoneyRef,getRewardsBtnFunc}
}

//通行证
export function passModel() {

    const router = useRouter()
    //活动开关
    const passStatusRef = ref(0)
    //购买价格
    const passPriceRef = ref(0)
    //是否购买
    const isBuyPassRef = ref(0)
    //登录总次数
    const loginCountRef = ref(0)
    //下注总数
    const betAmountRef = ref(0)
    //充值总数
    const rechargeAmountRef = ref(0)
    //活动配置
    const passListConfigRef = ref({})
    //活动规则内容
    const passRuleContent= ref('')
    //显示购买弹窗
    const showBuyPassRef = ref(false)


    //所有得奖励总和
    const allCountRef = computed(()=>{
        //遍历passListConfigRef 计算奖励总和
        let total = 0   
        if(passListConfigRef.value) {
            Object.keys(passListConfigRef.value).forEach(key => {
                const item = passListConfigRef.value[key]
                if(item && item.bonus) {
                    total += Number(item.bonus)
                }
                if(item && item.bonus_pass) {
                    total += Number(item.bonus_pass)
                }
            })
        }
        return total
    })

    //获取通行证配置
    async function  passConfigFunc(loading) {
        let res = await $get({url: '/activity/v1/pass/index'}, {loading: loading})
        if(res.code != 200) return

        passStatusRef.value = res.data.status||0
        passPriceRef.value = res.data.price||0
        isBuyPassRef.value = res.data.is_buy||0
        loginCountRef.value = res.data.login_times||0
        betAmountRef.value = res.data.bet_amount||0
        rechargeAmountRef.value = res.data.recharge_amount||0
        passListConfigRef.value = res.data.config||{}
        passRuleContent.value = res.data.content||''

    }

    //购买通行证
    async function passBuyFunc() {
        let res = await $post({url: '/activity/v1/pass/create',data:{}}, {loading: true})
        if(res.code != 200) {
            showToast({
                message: res.message,
                type: 'error'
            });
            return false
        }

        //添加是否跳转商城开关
        if(res.data&&res.data.jump == "shop") {
            router.push('/recharge')
            return true
        }

        rechargePayInfoRef.value = res.data||{}
        if(rechargePayInfoRef.value&&rechargePayInfoRef.value.link) {
            router.push('/recharge/pay')
        }

        //余额支付
        if(rechargePayInfoRef.value&&rechargePayInfoRef.value.pay_type) {
            passConfigFunc()
            showToast({
                message: res.data.message,
                type: 'success'
            });
        }
    }

    //领取通行证奖励
    async function passRewardsFunc(data) {
        let res = await $post({url: '/activity/v1/pass/receive',data:{cond:data.cond, cond_num: data.cond_num}}, {loading: true})
        if(res.code != 200) {
            showToast({
                message: res.message,
                type: 'error'
            });
            return false
        }
        showToast({
            message: res.message,
            type: 'success',
            wordBreak: 'break-word',
        });
        //刷新配置
        await passConfigFunc(false)
    }

    
    onMounted(()=>{
        passConfigFunc()
    })

    return{passConfigFunc,passBuyFunc,passRewardsFunc,passStatusRef,passPriceRef,isBuyPassRef,loginCountRef,betAmountRef,rechargeAmountRef,passListConfigRef,passRuleContent,allCountRef,showBuyPassRef}
}

// 七日投注签到活动
export function bettingCheckInModel() {
// 活动配置
const levelsRef = ref([])
const moneyRef = ref(0)
const claim_levelRef = ref(0)
const contentRef = ref([])
const streak_daysRef = ref(0)
const lastmoneyRef = ref(0)
const current_levelRef = ref(0)
const listRef = ref([])

    //七日投注签到配置
    async function  bettingCheckInConfigFunc(loading) {
        let res = await $get({url: '/activity/v1/bet-sign/index'}, {loading})
        if (res.code == 422) {
            showToast({ message: res.message || '活动未开启', type: 'error' })
            return
        }
        if(res.code != 200) return
        levelsRef.value = res.data.levels||[]
        moneyRef.value = res.data.current_bet_total||0
        current_levelRef.value = res.data.current_level||0
        claim_levelRef.value = res.data.claim_level||0
        contentRef.value = res.data.content||[]
        streak_daysRef.value = res.data.phase_day||0
        lastmoneyRef.value = res.data.claim_bet_amount_7d||0
        listRef.value = res.data.claim_status||[]
    }
    async function  receberChecInFunc(loading) {
        let res = await $post({url: '/activity/v1/bet-sign/receive'}, {loading: true})
        if(res.code != 200) {
            showToast({
                message: res.message,
                type: 'error'
            });
            return false
        }
        await bettingCheckInConfigFunc()
    }
    

  
    
    onMounted(()=>{
        bettingCheckInConfigFunc()
    })

    return{levelsRef,moneyRef,claim_levelRef,contentRef,streak_daysRef,lastmoneyRef,current_levelRef,listRef,receberChecInFunc}
}
// 月投注活动
export function monthlybettingModel() {
    // 活动配置
    const monthlybettingData = ref({})
    const needBetRef = ref(0)
    const needBetdays = ref(0)
    const needRecharge = ref(0)
    const contentRef = ref('')
    const datelistRef = ref([])
    const canDrawRef = ref(0)
    const ranklistRef = ref([])
    const ranktop1Ref = ref({})
    const ranktop2Ref = ref({})
    const ranktop3Ref = ref({})
    const rankdateRef = ref('')
    const rankalllistRef= ref([])
    const lastrewardRef = ref(0)
    const lastrewardArryRef = ref([])
    const slotNumbersRef = ref([8, 8, 8, 8, 8])
    // const streak_daysRef = ref(0)
    // const lastmoneyRef = ref(0)
    // const current_levelRef = ref(0)
    // const listRef = ref([])
    
        //七日投注签到配置
        async function  monthlybettingConfigFunc(loading) {
            let res = await $post({url: '/activity/v1/month-lottery/index'}, {loading})
            if (res.code == 422) {
                showToast({ message: res.message || '活动未开启', type: 'error' })
                return
            }
            if(res.code != 200) return
            monthlybettingData.value = res.data.config||{}
            contentRef.value = res.data.config.month_lottery_content||''
            needBetRef.value = res.data.eligibility.need_bet||0
            needBetdays.value = res.data.eligibility.need_bet_days||0
            needRecharge.value = res.data.eligibility.need_recharge||0
            datelistRef.value = res.data.config.month_lottery_config||[]
            canDrawRef.value = res.data.can_draw||0
           lastrewardRef.value = res.data.last_reward || 0;
            const lastRewardInt = Math.floor(Number(lastrewardRef.value) || 0);
            const arr = lastRewardInt.toString().padStart(5, '0');
            lastrewardArryRef.value = arr.split('').map(Number);
            if (lastrewardRef.value == 0) {
                slotNumbersRef.value = [8, 8, 8, 8, 8]
            }else{
                slotNumbersRef.value = lastrewardArryRef.value
            }
        }
        async function  monthlybettingRankFunc(loading) {
            let res = await $post({url: '/activity/v1/month-lottery/rank'}, {loading})
            
            if(res.code != 200) {
                showToast({ message: res.message , type: 'error' })
                return
            }
            rankalllistRef.value = res.data.list||[]
            ranklistRef.value = res.data.list?res.data.list.slice(3):[]
            ranktop1Ref.value = res.data.list[0]||[]
            ranktop2Ref.value = res.data.list[1]||[]
            ranktop3Ref.value = res.data.list[2]||[]
            rankdateRef.value =res.data.date
        }
        async function drawbtnFunc(loading) {
            let res = await $post({url: '/activity/v1/month-lottery/draw'}, {loading})
            
            if(res.code != 200) {
                showToast({ message: res.message , type: 'error' })
                return false
            }
            return res.data
        }
        onMounted(()=>{
            monthlybettingConfigFunc()
            monthlybettingRankFunc()
        })
        return{monthlybettingData,slotNumbersRef,contentRef,needBetRef,needBetdays,ranktop1Ref,ranktop2Ref,ranktop3Ref,
            rankalllistRef,rankdateRef,needRecharge,datelistRef,canDrawRef,ranklistRef,monthlybettingConfigFunc,monthlybettingRankFunc,drawbtnFunc}
    }


    // 会员答谢日
export function memberGiftModel() {
// 活动配置
const endTime = ref('')
const CollectionTime = ref(0)
const reward = ref(0)
const contentRef = ref('')
const receive_statusRef = ref(0)

    //七日投注签到配置
    async function  memberGiftConfigFunc(loading) {
        let res = await $get({url: '/activity/v1/member-day/index'}, {loading})
        if (res.code == 422) {
            showToast({ message: res.message || '活动未开启', type: 'error' })
            return
        }
        if(res.code != 200) return
        receive_statusRef.value = res.data.receive_status||0
        endTime.value = res.data.end_time|| t('activityCenter.Permanent')
        CollectionTime.value = res.data.reward_day||0
        reward.value = res.data.max_reward_amount||0
        contentRef.value = res.data.content||''
    }
    async function  recebermemberGiftFunc(loading) {
        if(receive_statusRef.value != 1){
            return;
        }
        let res = await $post({url: '/activity/v1/member-day/receive'}, {loading: true})
        if(res.code != 200) {
            showToast({
                message: res.message,
                type: 'error'
            });
            return false
        }
        await memberGiftConfigFunc()
    }
    

  
    
    onMounted(()=>{
        memberGiftConfigFunc()
    })

    return{endTime,CollectionTime,reward,contentRef,recebermemberGiftFunc,receive_statusRef}
}