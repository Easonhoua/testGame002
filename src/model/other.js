import { computed, onActivated, onMounted, ref,toRaw,onUnmounted } from 'vue'
import { $get, $post } from '@/request'
import { playBtnAudioFunc } from '@/utils/core'
import { openLoginFunc,setStorage,getStorage} from '@/utils/config'
import { isAuthRef, userModel } from '@/model/user'
import { useRouter } from 'vue-router'
import { rechargePayInfoRef } from '@/model/account'

export function luckyDrawMOdel(init) {
    let penListRef = ref([
        { award: '0.1', type: 'num' },
        { award: 'L', type: 'str' },
        { award: '30', type: 'num' },
        { award: 'U', type: 'str' },
        { award: '2', type: 'num' },
        { award: '10', type: 'num' },
        { award: 'C', type: 'str' },
        { award: '3', type: 'num' },
        { award: 'K', type: 'str' },
        { award: '0.5', type: 'num' },
        { award: 'Y', type: 'str' },
        { award: '100', type: 'num' },
    ])

    let configRef = ref({})
    let spinValRef = ref(null)

    let cardListRef = computed(()=> {
        let arr = [
            { award: 'L', count: 0 },
            { award: 'U', count: 0 },
            { award: 'C', count: 0 },
            { award: 'K', count: 0 },
            { award: 'Y', count: 0 },
        ]
        let list = configRef.value&&configRef.value.cards||[]
        for(let i=0;i<list.length;i++) {
            let index = arr.findIndex(_item=> {
                return _item.award.toLowerCase() == list[i].reward.toLowerCase()
            })
            if(index >= 0) {
                arr[index].count = list[i].count
            }
        }
        return arr
    })

    async function getConfigFunc(loading) {
        const res = await $get({url: '/activity/v1/lucky/index'}, {loading: loading})
        if(res.code != 200) return
        const data = res.data || {}
        configRef.value = data
    }
    async function takeVoucherFunc(index, item) {
        if(item.status != 1) return
        playBtnAudioFunc()
        const res = await $get({url: '/activity/v1/lucky/task',params: {task_id: index}}, {loading: true,toast: true})
        if(res.code != 200) return
        getConfigFunc(false)
    }
    let spinIndexRef = ref(0)
    let spinTimerRef = ref(null)
    let spinLoadingRef = ref(false)
    let spinRotateAngleRef = ref(0)
    let spinResAngleRef = computed(()=> {
        let eachAngle = 30
        return eachAngle*spinIndexRef.value
    })
    let spinResShowRef = ref(false)
    let currentPenRef = computed(()=> {
        return penListRef.value[spinIndexRef.value]
    })
    async function starDrawFunc() {
        if(spinLoadingRef.value) return
        if(parseInt(configRef.value.chances) == 0) return
        clearInterval(spinTimerRef.value)
        playBtnAudioFunc()
        spinLoadingRef.value = true
        spinRotateAngleRef.value = 0
        spinTimerRef.value = setInterval(()=> {
            spinRotateAngleRef.value += 10
            if(spinRotateAngleRef.value >= 360) spinRotateAngleRef.value = 0
        }, 30)
        const res = await $post({url: '/activity/v1/lucky/spin'}, {loading: false,toast: false})
        if(res.code != 200) {
            spinIndexRef.value = 0
            if(spinRotateAngleRef.value >= 350) {
                spinRotateAngleRef.value = 0
            }
            spinLoadingRef.value = false
            clearInterval(spinTimerRef.value)
            moveToLotteryRes()
            return
        }
        setTimeout(() => {
            spinValRef.value = res.data
            let index = penListRef.value.findIndex(item=> {
                return item.award == spinValRef.value
            })
            spinIndexRef.value = index
            if(spinRotateAngleRef.value >= 350) {
                spinRotateAngleRef.value = 0
            }
            spinLoadingRef.value = false
            clearInterval(spinTimerRef.value)
            moveToLotteryRes()
            setTimeout(() => {
                spinResShowRef.value = true
                setTimeout(() => {
                    getConfigFunc(false)
                }, 1000);
            }, 3200);
        }, 2000);
    }
    function moveToLotteryRes() {
        spinRotateAngleRef.value = (720 - spinResAngleRef.value)
    }

    async function exchangeFunc() {
        const res = await $get({url: '/activity/v1/lucky/exchange'}, {loading: true})
        if(res.code != 200) return
        showToast({
            message: res.message,
            type: 'success',
            wordBreak: 'break-word',
        });
        getConfigFunc()
    }
    onMounted(()=> {
        if(init) getConfigFunc(false)
    })

    return { 
        configRef, getConfigFunc, takeVoucherFunc, 
        penListRef, cardListRef, spinRotateAngleRef, spinLoadingRef, spinResShowRef, currentPenRef, starDrawFunc, exchangeFunc
    }
}

export var signShowRef = ref(false)
export var signConfigRef = ref({})
export var signBonusRef = ref(0)
export var signSuccessRef = ref(false)

export function signInModel(init) {
    const { userInfoFunc } = userModel(false)
    const isSignInRef = ref(false)
    const router = useRouter()
    // status 1:可领取 2:已领取 3:未到时间 4:已过期
    async function signConfigFunc(__init) {
        let res = await $get({url: '/activity/v1/sign-in/index'}, {loading: false, toast: false})
        if(res.code!=200) return
        signConfigRef.value = res.data||{}
        if(signConfigRef.value.todayStatus&&__init) {

            // let isShow = getStorage('signIn_show')
            // //24小时没显示过
            // if(isShow != true){
            //     setStorage('signIn_show', true, 24)
            //     signShowRef.value = true
            // }else{
            //     signShowRef.value = false
            // }
            signShowRef.value = true
          
        }
        if(!signConfigRef.value.todayStatus){
            setStorage('isSignshow', true,9999)
        }
    }
    async function starSignInFunc() {
        if(!signConfigRef.value.todayStatus) return 
        playBtnAudioFunc()
        let res = await $post({url: '/activity/v1/sign-in/receive'}, {loading: true, toast: true})
        if(res.code == 401) {
            signShowRef.value = false
            //openLoginFunc(0)
            return
        }
        //跳转支付
        if(res.data.code == 41003||res.data.code == 41004||res.data.code == 41002){
            rechargePayInfoRef.value = res.data.pay_info||{}
            if(rechargePayInfoRef.value&&rechargePayInfoRef.value.link) {
                router.push('/recharge/pay')
            }
            signShowRef.value = false
            return
        }

        if(res.code!=200) return
        signSuccessRef.value = true
        signBonusRef.value = res.data.bonus
        signConfigRef.value.todayStatus = false
        isSignInRef.value = true
        setStorage('isSignshow', true,9999)
        signConfigFunc()
        setTimeout(() => {
            signSuccessRef.value = false
        }, 5000);
        userInfoFunc()
    }   

    onMounted(()=> {
        if(init) signConfigFunc(true)
    })

    return { signShowRef, signConfigRef, signBonusRef, signSuccessRef, signConfigFunc, starSignInFunc,isSignInRef}
}

export function redeemCodeMOdel() {
    let dataRef = ref({
        code: ''
    })
    async function submitCodeFunc() {
        const res = await $get({url: '/activity/v1/redeem-code/receive',params: dataRef.value}, {loading: true,toast: true})
        if(res.code != 200) return
        dataRef.value.code = ''
        showToast({
            message: res.message,
            type: 'success',
            wordBreak: 'break-word',
            zIndex: 9999, // 设置 z-index
        });
    }
    return { dataRef, submitCodeFunc }
}

export var redPakageShowRef = ref(false)
export var showFirstChargeRef = ref(false)
export var showDayPayRef = ref(false)
export var redPakageDataRef = ref({})
export var redPakageAmountRef = ref(0)
export var redPakageIconRef = ref('')
export const redPakageStateRef = computed(()=> {
    let _val = {
        status: redPakageDataRef.value&&redPakageDataRef.value.status||0,
        time: (redPakageDataRef.value&&redPakageDataRef.value.last_time||0)*1000,
        // status: 2,
        // time: 2000,
    }
    return _val
})
export function redPakageModel() {
    const router = useRouter()
    async function redPakageDataFunc() {
        const res = await $get({url: '/activity/v1/red-packet-rain/index'}, {loading: false,toast: false})
        if(res.code != 200) return
        redPakageDataRef.value = res.data||{}
        redPakageIconRef.value = res.data&&res.data.red_packet_icon||''
        redPakageAmountRef.value = res.data&&res.data.bonus||0
    }
    async function takeRedPakageFunc() {
        if(!isAuthRef.value) {
            openLoginFunc(0)
            return
        }
        const res = await $post({url: '/activity/v1/red-packet-rain/receive'}, {loading: true,toast: true})
        if(res.code == 401) {
            redPakageShowRef.value = false
            return
        }
        if(res.code != 200) return
        redPakageAmountRef.value = res.data&&res.data.bonus||0
        redPakageDataRef.value.receive_time = res.data&&res.data.receive_time||0
        redPakageDataRef.value.status = 2
    }
    function redPakageEndFunc() {
        redPakageDataRef.value.status = 1
    }
    
    return { redPakageDataFunc, takeRedPakageFunc, redPakageEndFunc }
}

export function modalScrollControlModel() {
    const scrollTop = ref(0)
    const pageLocation = ref('')
    const bodyStyle = ref(null)

    const preventDefault = (e) => {
        e.preventDefault()
    }

    function lockScroll() {
        // 保存当前滚动位置
        scrollTop.value = window.scrollY
        pageLocation.value = scrollTop.value
        
        // 保存body原始样式
        bodyStyle.value = {
            position: document.body.style.position,
            top: document.body.style.top,
            width: document.body.style.width,
            overflow: document.body.style.overflow
        }
        
        // 固定body
        // document.body.style.position = 'fixed'
        // document.body.style.top = `-${scrollTop.value}px`
        // document.body.style.width = '100%'
        document.body.style.overflow = 'hidden'
        
        // 添加触摸事件监听
        document.addEventListener('touchmove', preventDefault, { passive: false })
    }

    function unlockScroll() {
        // 移除触摸事件监听
        document.removeEventListener('touchmove', preventDefault)
        
        // 恢复body原始样式
        if (bodyStyle.value) {
            document.body.style.position = bodyStyle.value.position
            document.body.style.top = bodyStyle.value.top
            document.body.style.width = bodyStyle.value.width
            document.body.style.overflow = bodyStyle.value.overflow
        } else {
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
            document.body.style.overflow = ''
        }
        
        // 恢复滚动位置
        window.scrollTo(0, pageLocation.value)
    }

    onUnmounted(() => {
        document.removeEventListener('touchmove', preventDefault)
    })

    return {
        lockScroll,
        unlockScroll
    }
}
// export const buoyListRef = ref([])
// export function BuoyModel() {
//     async function getBuoyListFunc() {
//         const res = await $get({ url: '/activity/v1/social/index' }, { loading: true })
//         if(res.code != 200) return
//         buoyListRef.value = res.data||[]
//     }
//     onMounted(()=> {
//         getBuoyListFunc()
//     })
//     return { getBuoyListFunc }
// }
// export function FristChangeModel() {
//     let payListRef = ref([])
//     async function getPayListFunc() {
//         const res = await $get({ url: '/activity/v1/first-pay/index' }, { loading: false })
//         if(res.code != 200) return
//         payListRef.value = res.data||[]
//     }
//     onMounted(()=> {
//         getPayListFunc()
//     })
//     return { getPayListFunc,payListRef }
// }
// 每日破产活动
// export var showFirstChargeRef = ref(false)
// export var showDayPayRef = ref(false)
export var dayPayInfoRef = ref([])
export var dayPayTiemRef = ref(0)
export var dayPayContent = ref('')
export function DayPayModel() {
    
    async function getdayPayInfoFunc(routetype) {
       
        if(routetype=='home') {
            const res = await $get({ url: '/activity/v1/daily-bankruptcy/index' }, { loading: false })
            if(res.code != 200) return
            // if(res.data.link==null) return
            dayPayInfoRef.value = res.data.config||[]
            if(res.data.link=='daily_bankruptcy'){
                showDayPayRef.value = true
            }else if(res.data.link=='first_pay'){
                showFirstChargeRef.value = true
            }
            dayPayTiemRef.value = res.data.end_time_s
            dayPayContent.value = res.data.content
        }
    }

    onMounted(()=> {
        getdayPayInfoFunc()
    })
    return { getdayPayInfoFunc }
}

// export var socialListRef = ref([])
// export var socialMenuListRef = ref([]) // location = 1 左菜单栏底部
// export var socialRedeemListRef = ref([]) // location = 2 兑换码

//获得社媒列表
// export function SocialModel() {

//     async function getSocialListFunc() {
//         const res = await $get({ url: '/activity/v1/social/share-manage' }, { loading: false })
//         if(res.code != 200) return
//         socialListRef.value = res.data||[]
//         // 按照 location 字段拆分
//         socialMenuListRef.value = (socialListRef.value || []).filter(item => item && item.location == 1)
//         socialRedeemListRef.value = (socialListRef.value || []).filter(item => item && item.location == 2)
//     }
//     // onMounted(()=> {
//     //     getSocialListFunc()
//     // })
//     return { getSocialListFunc }
// }