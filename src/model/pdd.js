import { computed, ref } from 'vue'
import { $get, $post } from '@/request'
import { playBtnAudioFunc, animateNumberFunc } from '@/utils/core'
import { isAuthRef } from '@/model/user'
import { setStorage,getStorage } from '@/utils/config'
import { showToast } from 'vant'
import { useThemeImages } from '@/utils/themeimg'

const CommonImg = useThemeImages().common 
const PddImg = useThemeImages().pdd
/*
* 拼多多活动
* total_bonus 累计金额
* last_time 剩余时间
* spin_count 剩余次数
* report_list  滚动信息
* referral_users 推荐信息
* 
* prize 奖品
* bonus 本次转到的金额
*/
var totalBonusRef = ref(0)
var lastTimeRef = ref(0)
var spinCountRef = ref(0)
var reportListRef = ref([])
var referralUsersRef = ref([])
var prizeRef = ref('')
var sumprizeRef = ref(0)
var claimRef = ref(false)
export var bonusRef = ref(0)
var needBonusRef = ref(0)
var withdrawCashRef = ref(0)
var gameCurrencyRef = ref(0)
var isCash=ref(0)
//分享手机号码
export var phoneNumbers = ref([])
export var shareMsg = ref(`Olá, eu estou jogando no ${window.document.title}, Ganhe R$ 10.000 por dia!`)
export var isHideSpinBtn = ref(false)
export var pddContentRef = ref('')

export function pddModel(init) {
    let penListRef  =ref([])
    const currentTemplate = ref(import.meta.env.VITE_TEMPLATE || TEMPLATE_CONFIG.DEFAULT)
    if(currentTemplate.value=='template_one'){
        penListRef.value  =[
            { award: '0', type: 'pic', prize:'fission_gold_1', icon:CommonImg.img_money },
            { award: '0', type: 'pic', prize:'no_prize', icon:PddImg.icon_star  },
            { award: '0', type: 'pic', prize:'cash_random', icon:CommonImg.img_gold },
            { award: '1', type: 'num', prize:'cash_1' },
            { award: '0', type: 'pic', prize:'fission_gold_2', icon:CommonImg.img_money },
            { award: '100', type: 'num', prize:'cash_1000' },
            { award: '50', type: 'num', prize:'cash_50' },
            { award: '0', type: 'pic', prize:'claim', icon:PddImg.icon_sacar},
        ]
    }else{
         penListRef.value =[
            { award: '0', type: 'pic', prize:'fission_gold_1', icon:CommonImg.img_money,text:PddImg.icon_turntable1 },
            { award: '0', type: 'pic', prize:'no_prize', icon:PddImg.icon_turntable2 },
            { award: '0', type: 'pic', prize:'cash_random', icon:PddImg.icon_turntable3,text:PddImg.icon_turntable1 },
            { award: '1', type: 'num', prize:'cash_1',icon:PddImg.icon_turntable4,text:PddImg.icon_turntable5 },
            { award: '0', type: 'pic', prize:'fission_gold_2', icon:CommonImg.img_money,text:PddImg.icon_turntable1 },
            { award: '100', type: 'num', prize:'cash_1000',icon:PddImg.icon_turntable6,text:PddImg.icon_turntable7 },
            { award: '50', type: 'num', prize:'cash_50',icon:PddImg.icon_turntable8,text:PddImg.icon_turntable9 },
            { award: '0', type: 'pic', prize:'claim', icon:PddImg.icon_sacar,text:PddImg.icon_turntable10},
        ]
    }
   

    let spinValRef = ref(null)

    async function getPddInfoFunc() {
        let res = await $get({url: '/activity/v1/pdd/index'}, {loading: true})
        if(res.code != 200) return
        totalBonusRef.value = res.data&&Number(res.data.total_bonus)||0
        animateNumberFunc(totalBonusRef, res.data&&Number(res.data.total_bonus)||0, 1500)
        lastTimeRef.value = res.data&&res.data.last_time||0
        reportListRef.value = res.data&&res.data.report_list||[]
        referralUsersRef.value = res.data&&res.data.referral_users||[]
        needBonusRef.value = res.data && Number(res.data.need_bonus) || 0
        isCash.value = res.data&&res.data.status!==0?res.data.status:0
        phoneNumbers.value = res.data&&res.data.share_phone_code||[]
        //如果pdd_share_msg 存在
        if(res.data&&res.data.pdd_share_msg){
            shareMsg.value = res.data.pdd_share_msg
        }

        if(res.data&&res.data.pdd_content){
            pddContentRef.value = res.data.pdd_content
        }

        if (!isAuthRef.value) {
            const nologinpdd = getStorage('nologinpdd')
            if (!nologinpdd) {
                // If no record exists, give them one spin and set expiration
                setStorage('nologinpdd', 1, 72) // 72 hours = 3 days
                spinCountRef.value = 1
            } else {
                // If record exists, they've already used their spin
                spinCountRef.value = 0
            }
        } else {
            spinCountRef.value = res.data&&res.data.spin_count||0
        }

        //最后判断是否隐藏抽奖按钮
        if(totalBonusRef.value >= needBonusRef.value){
            isHideSpinBtn.value=true
        }else{
            isHideSpinBtn.value=false
        }
    }
    async function withdrawCashFunc() {
        let res = await $get({url: '/activity/v1/pdd/take-bonus'})
        if(res.code == 200) {
            showToast({
                message: res.message,
                wordBreak: 'break-word',
                duration: 3000,
            });
            setTimeout(()=>{
                getPddInfoFunc()
            },2000)
        }else{
            showToast({
                message: res.message,
                wordBreak: 'break-word',
                duration: 3000,
            });
            return
        }
    }
    let spinIndexRef = ref(0)
    let spinTimerRef = ref(null)
    let spinLoadingRef = ref(false)
    let spinRotateAngleRef = ref(0)
    let spinResAngleRef = computed(()=> {
        let eachAngle = 45
        return eachAngle*spinIndexRef.value
    })
    let spinResShowRef = ref(false)
    let currentPenRef = computed(()=> {
        return penListRef.value[spinIndexRef.value]
    })
    let pinShowRef = ref(false)
    let spinSuccessRef = ref(false)
    async function pddSpinFunc() {
        bonusRef.value = 0
        if(!isAuthRef.value){
            // 只有在实际抽奖时才设置nologinpdd
            if (spinCountRef.value > 0) {
                setStorage('nologinpdd', 1, 72)
            }
        }
        
        if(spinLoadingRef.value) return
        if(spinCountRef.value <= 0) return
        clearInterval(spinTimerRef.value)
        playBtnAudioFunc()
       
        spinLoadingRef.value = true
        spinRotateAngleRef.value = 0
        spinTimerRef.value = setInterval(()=> {
            spinRotateAngleRef.value += 10
            if(spinRotateAngleRef.value >= 360) spinRotateAngleRef.value = 0
        }, 15)
        const res = await $post({url: '/activity/v1/pdd/spin'}, {loading: false,toast: false})
        
        if(res.code != 200) {
            spinCountRef.value = spinCountRef.value - 1
            spinIndexRef.value = 0
            if(spinRotateAngleRef.value >= 350) {
                spinRotateAngleRef.value = 0
            }
            spinLoadingRef.value = false
            clearInterval(spinTimerRef.value)
            moveToLotteryRes()
            return
        }
        withdrawCashRef.value = res.data&&res.data.status!==0?res.data.status:0
        needBonusRef.value = res.data&&Number(res.data.need_bonus)||0
        sumprizeRef.value = res.data&&res.data.total_bonus+res.data.bonus||0
        spinCountRef.value = spinCountRef.value - 1
        prizeRef.value = res.data&&res.data.prize||''
        gameCurrencyRef.value = res.data&&res.data.bonus||0
        // bonusRef.value = res.data&&res.data.bonus||0
        // totalBonusRef.value = res.data&&res.data.total_bonus||0
        setTimeout(() => {
            
            spinValRef.value = prizeRef.value
            let index = penListRef.value.findIndex(item=> {
                return item.prize == spinValRef.value
            })
            spinIndexRef.value = index
            if(spinRotateAngleRef.value >= 350) {
                spinRotateAngleRef.value = 0
            }
            spinLoadingRef.value = false
            clearInterval(spinTimerRef.value)
            moveToLotteryRes()
            setTimeout(() => {
                pinShowRef.value = true
                animateNumberFunc(bonusRef, res.data&&res.data.bonus||0, 1500)
                animateNumberFunc(totalBonusRef, res.data&&Number(res.data.total_bonus)||0, 1500)
                animateNumberFunc(sumprizeRef, sumprizeRef.value, 1500)
                setTimeout(() => {
                    // 如果未中奖，不弹框 中奖弹裂变金弹框 中机会弹出机会弹框
                    if(res.data.prize == 'no_prize'){
                        setTimeout(() => {
                            pinShowRef.value = false
                        }, 3000)
                        return
                    }else if(res.data.prize == 'claim'){
                        claimRef.value=true
                       spinSuccessRef.value = true
                    }else if(res.data.prize == 'cash_1'||res.data.prize == 'cash_50'||res.data.prize == 'cash_100'||res.data.prize == 'cash_random'){
                        spinSuccessRef.value = true
                     }else {
                         // 裂变金弹框
                        spinResShowRef.value = true
                    }
                    // }else{
                    //     spinSuccessRef.value = true
                    // }
                    
                    setTimeout(() => {
                        pinShowRef.value = false

                        //最后判断是否隐藏抽奖按钮
                        if(totalBonusRef.value >= needBonusRef.value){
                            isHideSpinBtn.value=true
                            isCash.value = 1
                        }
                    }, 300);
                }, 3200);
            }, 3000);
        }, 2000);
    }
    function moveToLotteryRes() {
        spinRotateAngleRef.value = (720 - spinResAngleRef.value)
    }
    
    return { 
        totalBonusRef, bonusRef, lastTimeRef,spinCountRef, reportListRef, referralUsersRef, getPddInfoFunc, pddSpinFunc,sumprizeRef,claimRef,withdrawCashRef,withdrawCashFunc,isCash,
        penListRef, spinRotateAngleRef, spinLoadingRef, spinResShowRef, currentPenRef, pinShowRef, spinValRef, spinIndexRef, spinResAngleRef,spinSuccessRef,needBonusRef,gameCurrencyRef
    }
}

export async function pddSendSms(){
    let res = await $get({url: '/activity/v1/pdd/add-send-sms'}, {loading: true})
    if(res.code != 200) return
}