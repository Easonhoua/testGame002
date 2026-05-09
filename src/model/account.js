import { computed, onMounted, ref } from 'vue'
import { $get, $post } from '@/request'
import { useRouter } from 'vue-router'
import { useSessionStorage } from '@vueuse/core'
import { playBtnAudioFunc } from '@/utils/core'
import { memberLocal } from '@/model/user'
import { setStorage,getStorage} from '@/utils/config'
export var rechargePayInfoRef = useSessionStorage('payinfo', {})
export function rechargeModel(init) {
    const router = useRouter()
    let configRef = ref({})
    let amountRef = ref('')
    let channelIndexRef = ref({
        index: 0,
        eq: 0,
        type:0
    })
    let channelverifyRef = ref({
        index: 1,
        eq: 0,
        type:0
    })
    let createPayData=ref({})
    let currentPayRef = computed(()=> {
        let c_list = configRef.value.channel||[]
        return c_list[channelIndexRef.value.index]||{}
    })
    let currentChannelRef = computed(()=> {
        let c_list = configRef.value.channel||[]
        return c_list[channelIndexRef.value.index]&&c_list[channelIndexRef.value.index].channel&&c_list[channelIndexRef.value.index].channel[channelIndexRef.value.eq]||{}
    })
    let currentverifyPayRef = computed(()=> {
        let c_list = configRef.value.channel||[]
        return c_list[channelverifyRef.value.index]||{}
    })
    let currentverifyChannelRef = computed(()=> {
        let c_list = configRef.value.channel||[]
        return c_list[channelverifyRef.value.index]&&c_list[channelverifyRef.value.index].channel&&c_list[channelverifyRef.value.index].channel[channelverifyRef.value.eq]||{}
    })
    async function getConfigFunc() {
        let res = await $get({url: '/finance/v1/recharge/config'}, {loading: false})
        if(res.code != 200) return
        configRef.value = res.data||{}
        if(configRef.value&&configRef.value.packages&&configRef.value.packages.length>0) {
            for(let i=0;i<configRef.value.packages.length;i++) {
                if(configRef.value.packages[i].is_default==1) {
                    amountRef.value = configRef.value.packages[i].amount
                    break
                }
            }
        }
    }
    async function starRechargeFunc(type, name = '', identify_num = '',money='') {
        let data
        if(type==1){
            let detail = {
                name: name.toString(),
                identify_num: identify_num.toString(),
                identify_type:'CPF'
            }
            data = {
                data: {
                    money: money.value,
                    detail:JSON.stringify(detail)

                },
                pay_type: currentverifyPayRef.value.id,
                trade_type: currentverifyChannelRef.value.code,
                order_group: 'recharge',
            }
        }else{
            data = {
                data: {
                    money: amountRef.value
                },
                pay_type: currentPayRef.value.id,
                trade_type: currentChannelRef.value.code,
                order_group: 'recharge',
            }
        }
        playBtnAudioFunc()
        rechargePayInfoRef.value = {}
        let res = await $post({url: '/v1/common/pay/create', data: data}, {loading: true, toast: true})
        if(res.code != 200) return
        rechargePayInfoRef.value = res.data||{}
        if(rechargePayInfoRef.value&&rechargePayInfoRef.value.config&&rechargePayInfoRef.value.config.link) {
            router.push('/recharge/pay')
        }
    }
    async function callbackFbRechargeFunc() {
        // if(window.fbqKey != ''||window.kwaiqKey != '') {
            let res = await $get({url: '/finance/v1/recharge/user-un-report-recharge'}, {loading: false})
            if(res.code != 200) return
            if(res.data&&res.data.is_first_recharge==1) {
                if(window.fbqKey != '') {
                    fbq('track', 'Purchase', {
                        value: res.data.pay_amount,
                        currency: 'BRL',
                    }, {
                        eventID: res.data.order_no
                    });
                    fbq('track', 'Subscribe', {
                        value: res.data.pay_amount,
                        currency: 'BRL',
                    }, {
                        eventID: res.data.order_no
                    });
                }
                if(window.kwaiqKey!='') {
                    kwaiq.instance(window.kwaiqKey).track('firstDeposit', {
                        content_id: res.data.order_no,
                        price: res.data.pay_amount,
                        value: res.data.pay_amount,
                    });
                    // kwaiq.track('firstDeposit', {
                    //     orderId: res.data.order_no,
                    //     amount: res.data.pay_amount,
                    // });
                }
                if (window.ttqKey && window.ttqKey!='') {
                    ttq.track('CompletePayment', {
                        value: res.data.pay_amount,
                        currency: 'BRL',
                    },{
                        event_id: res.data.order_no
                    })
                }

                //上报首充成功
                window.jsBridge?.postMessage("firstrecharge", JSON.stringify({cid: window.ch,uid:memberLocal.value.id, phone: memberLocal.value.username,amount: res.data.pay_amount, currency:"BRL"}))

                await $post({url: '/finance/v1/recharge/update-last-time', data: {last_time: res.data.updated_at}}, {loading: false})
            }
        // }
    }

    onMounted(()=> {
        if(init) getConfigFunc()
    })

    return { 
        configRef, amountRef, channelIndexRef, currentPayRef, currentChannelRef, getConfigFunc, starRechargeFunc,
        callbackFbRechargeFunc
    }
}

export var withdrawalAmountRef = useSessionStorage('w_amount', '')
export var withdrawalChannelIndexRef = useSessionStorage('w_channel', 0)
export function withdrawalModel(init = {ch: false, info: false}) {
    const router = useRouter()
    let channelListRef = ref([])
    let dataRef = ref({
        amount: '',
        type: '', // CPF EMAIL PHONE
        payment_channel: '',
        cpf: '',
        name: '',
        email: '',
        phone: '',
    })
    let withdrawInfoRef = ref({})

    async function getChannelFunc() {
        let res = await $get({url: '/finance/v1/withdraw-pix/channle'}, {loading: true})
        if(res.code != 200) return
        channelListRef.value = res.data||[]
    }
    async function getWithdrawInfoFunc() {
        let res = await $get({url: '/finance/v1/pix/index'}, {loading: true})
        if(res.code != 200) return
        withdrawInfoRef.value = res.data||{}
    }
    async function starWithdrawalFunc() {
        playBtnAudioFunc()
        let res = await $post({url: '/finance/v1/withdraw-pix/create', data: dataRef.value}, {loading: true, toast: true})
        if(res.code != 200) return
        router.replace('/')
    }

    onMounted(()=> {
        if(init.ch) getChannelFunc()
        if(init.info) getWithdrawInfoFunc()
    })

    return { channelListRef, dataRef, withdrawInfoRef, getChannelFunc, starWithdrawalFunc, getWithdrawInfoFunc }
}

/*
* 累充活动
* status 充值状态（0: 不可用, 1: 可领取, 2: 已领取）
* total_recharge 总充值金额，当前已充值金额
*/
var totalRechargeConfigRef = ref([])
export function totalRechargeModel() {
    let totalRechargeAmountRef = ref(0)
    let totalRechargeTimeRef = ref(null)
    let totalRechargeStartTimeRef = ref('')
    let totalRechargeEndTimeRef = ref('')   
    async function totalRechargeInfoFunc(loading = false) {
        let res = await $get({url: '/activity/v1/total-recharge/index'}, {loading: loading})
        if(res.code != 200) return
        totalRechargeConfigRef.value = res.data&&res.data.config||[]
        totalRechargeAmountRef.value = res.data&&res.data.total_recharge||0
        totalRechargeTimeRef.value = res.data&&res.data.last_time||0
        totalRechargeStartTimeRef.value = res.data&&res.data.start_time||0
        totalRechargeEndTimeRef.value = res.data&&res.data.end_time||0
    }

    async function totalRechargeTakeFunc(key) {
        let res = await $post({url: '/activity/v1/total-recharge/receive', data: {key: key}}, {loading: false, toast: true})
        if(res.code != 200) return
        totalRechargeConfigRef.value[key].status = 2
        totalRechargeInfoFunc(false)
    }

    return { totalRechargeConfigRef, totalRechargeStartTimeRef, totalRechargeEndTimeRef,totalRechargeAmountRef, totalRechargeTimeRef, totalRechargeInfoFunc, totalRechargeTakeFunc }
}
// 开业大酬宾活动

var rechargeSpecialOfferData = ref([])
export function rechargeSpecialOfferDataModel() {
    const router = useRouter()
    let rechargeTimeRef = ref(null)
    let endTimeRef = ref(null)
    let rechargeWeek = ref('')
    let payKeyRef = ref({})
    let PayInfoRef = ref({})
    let rechargeBtnRef = ref(0)
    let grandContentRef = ref('')
    // let cpfId = ref('')
    // let nome = ref('')
    // 获取开业酬宾数据
    async function rechargeSpecialOfferInfoFunc(loading = false) {
        let res = await $get({url: '/activity/v1/grand-deposit-bonus/index'}, {loading: loading})
        if(res.code != 200) return
        rechargeSpecialOfferData.value = res.data&&res.data.list||[]
        rechargeWeek.value = res.data&&res.data.week||''
        rechargeTimeRef.value = res.data.last_time||0
        rechargeBtnRef.value = res.data.status||0
        endTimeRef.value = res.data.end_time_s||0
        if(res.data&&res.data.grand_deposite_content){
            grandContentRef.value = res.data&&res.data.grand_deposite_content
        }
        
    }
    // 开业大酬宾充值接口
    // cpfId,nome
    async function rechargeFunc() {
        let res = await $post({url: '/activity/v1/grand-deposit-bonus/create', data: {key: payKeyRef.value.key}}, {loading: true, toast: true})
        if(res.code != 200) return
        rechargePayInfoRef.value = res.data||{}
        if(rechargePayInfoRef.value&&rechargePayInfoRef.value.link) {
            router.push('/recharge/pay')
        }
    }
    return { rechargeSpecialOfferData,rechargeTimeRef,rechargeSpecialOfferInfoFunc,payKeyRef,rechargeFunc,rechargePayInfoRef,rechargeWeek,rechargeBtnRef,endTimeRef,grandContentRef }
}

// 获取充值提现列表
export var logTypeRef = ref(0)
export var rechargeNumRef = ref(0)
export var moneyRef = ref(0)
export function MoneyRecordsDataModel() {
    let moneyRecordsData = ref([])
    let lastTime = 0
    let lastParams = ''
    async function getRecordsDataFunc(odertype,hour,loading) {
        let now = Date.now()
        let currentParams = `${odertype}_${hour}`
        if (moneyRecordsData.value.length > 0 && now - lastTime < 5000 && lastParams === currentParams) {
            return false
        }
        lastTime = now
        lastParams = currentParams
       
        let res = await $post({url: '/v1/member/user-order/list', data: { order_type:odertype?.toString()||'',hour_num: hour?.toString()||''}}, {loading: loading})
        if(res.code != 200) {
            showToast({
                message: res.message,
                type: 'error'
            });
            return false
        }
        moneyRecordsData.value = res.data&&res.data.order_list||[]
        rechargeNumRef.value = res.data&&res.data.total_data.num||0
        moneyRef.value = res.data&&res.data.total_data.amount||0
    }
    
    return { moneyRecordsData,getRecordsDataFunc,logTypeRef,rechargeNumRef ,moneyRef}
}
