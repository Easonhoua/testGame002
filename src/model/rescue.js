import { onMounted, ref } from 'vue'
import { $get, $post } from '@/request'
import { playBtnAudioFunc } from '@/utils/core'

var listRef = ref([])
var reliefFundsListRef=ref([])
var rescueLastweekRef=ref({})
var rescueThisweekRef=ref({})
var rescueRef = ref({})
var rescueFundDataRef = ref({})
/*
    * 救济金活动
* listRef 列表
*/
export function rescueFundModel(init) {
    let waitBonusRef = ref(0)
    let lossAmount = ref(0)
    let todayLoss = ref(0)
    let todayBonus = ref(0)
    async function getListFunc() {
        let res = await $get({url: '/activity/v1/rescue/index'}, {loading: false})
        if(res.code != 200) return
        rescueFundDataRef.value = res.data||{}
        listRef.value = res.data.config||[]
        waitBonusRef.value = res.data.bonus||0
        lossAmount.value = res.data.loss_amount||0
        todayLoss.value = res.data.today_loss||0
        todayBonus.value = res.data.today_bonus||0
    }
    async function takeAwardFunc() {
        if(waitBonusRef.value>0&&rescueFundDataRef.value.can_be_collected ){
            playBtnAudioFunc()
            let res = await $post({url: '/activity/v1/rescue/receive'}, {loading: true, toast: true})
            if(res.code != 200) return
            getListFunc()
        } else{
            return
        }
        
    }

    onMounted(()=> {
        if(init) getListFunc()
    })

    return { listRef, waitBonusRef,lossAmount,todayLoss,todayBonus,getListFunc, takeAwardFunc,rescueFundDataRef }
}
/*
* 周救济金活动
rescueRef 救济金数据
* reliefFundsListRef 救济金列表
* rescueLastweekRef 上周
* rescueThisweekRef 本周
*/
export function rescueWeekModel(init) {
    async function getWeekInfoFunc() {
        let res = await $get({url: '/activity/v1/rescue-week/index'}, {loading: true})
        if(res.code != 200) return
        rescueRef.value = res.data||{}
        const config = res.data && res.data.config
        reliefFundsListRef.value = Array.isArray(config)
            ? [...config]
            : (config && typeof config === 'object' ? Object.values(config) : [])
        rescueLastweekRef.value = res.data&&res.data.last_week||{}
        rescueThisweekRef.value = res.data&&res.data.this_week||{}    
    }
    async function cashBtnFunc(){
        if(rescueLastweekRef.value.bonus!=0&&rescueRef.value.can_be_collected){
            let res = await $post({url: '/activity/v1/rescue-week/receive'}, {loading: true, toast: true})
            if(res.code != 200) return
            getWeekInfoFunc()
        } else{
            return
        }
    }
    onMounted(()=> {
        if(init) getWeekInfoFunc()
    })
    
    return { 
        getWeekInfoFunc,reliefFundsListRef,rescueLastweekRef,rescueThisweekRef,cashBtnFunc,rescueRef
    }

   

}