import { onMounted, ref } from 'vue'
import { $get, $post } from '@/request'
import { playBtnAudioFunc } from '@/utils/core'
import { shareMsg } from '@/model/pdd'

var configListRef = ref([])
export function boxModel(init = { list: true }) {
    let boxListRef = ref([])
    let page = ref(0)
    let pageSize = ref(20)
    let childNum = ref(0)
    let childListRef = ref([])
    let DepositRef = ref(0)//存款
    let BetRef = ref(0)//投注
    //宝箱规则
    let boxRuleRef = ref("")
    //宝箱banner 如果服务器有配置走配置
    let boxBannerRef = ref("")
    let bannerLoaded = ref(false)
    //分享号码
    let phoneNumbers = ref([])

    async function boxListFunc() {
        const res = await $get({ url: '/activity/v1/treasure/index' }, {loading: false})
        childNum.value=res.data.people||0
        DepositRef.value=res.data.treasure_total_recharge||0
        BetRef.value=res.data.treasure_total_bet||0
        boxRuleRef.value=res.data.treasure_content||""
        let list = res.data.config || []
        boxListRef.value = res.data.list || []
        let arr = []
        let length
        if(list.length%4) {
            length = parseInt(list.length/4) + 1
        }else {
            length = parseInt(list.length/4)
        }
        for(let i=0;i<length;i++) {
            let item = []
            for(let j=0;j<list.length;j++) {
                if(j >= i*4 && j < (i+1)*4 ) {
                    let child = list[j]
                    child.check_id = null
                    child.check_status = -99
                    let index = boxListRef.value.findIndex(box => {
                        return box.active_users == child.active_users
                    })
                    if(index >= 0) {
                        child.check_id = boxListRef.value[index].id
                        child.check_status = boxListRef.value[index].status
                    }
                    item.push(child)
                }
          }  
            arr.push(item)
        }
        configListRef.value = arr

        if(res.data&&res.data.treasure_share_str){
            shareMsg.value = res.data.treasure_share_str
        }

        if(res.data&&res.data.treasure_banner_image){
            // boxBannerRef.value = 'https://s02.gamebrkci128.com/images/2026/02/28/image_1772280105_L1Tpe9MM.png'
            boxBannerRef.value = res.data.treasure_banner_image
        }
        bannerLoaded.value = true

        if(res.data&&res.data.share_phone_code){
            phoneNumbers.value = res.data.share_phone_code
        }
    }
    async function boxTaskFunc(item, index, eq) {
        if(!item.check_id) return
        if(item.check_status == 1) return
        playBtnAudioFunc()
        const res = await $post({ url: '/activity/v1/treasure/receive', data: {id: item.check_id} }, {loading: false, toast: true})
        if(res.code != 200) return
        configListRef.value[index][eq].check_status = 1
       
    }
    //获取下级列表
    async function boxListChildFunc(sta) {

        playBtnAudioFunc()
        let data = {
            offset: page.value*pageSize.value,
            limit: pageSize.value,
            status: sta
        }
        const res = await $get({ url: '/activity/v1/treasure/eligibility', params: data }, {loading: false, toast: false})
        if(res.code != 200) return
        childListRef.value = res.data || []
    }
    onMounted(()=> {
        if(init.list) boxListFunc()
    })

    return { configListRef, boxListRef, childListRef, childNum, boxListFunc, boxTaskFunc,boxListChildFunc,DepositRef,BetRef,boxRuleRef,boxBannerRef,bannerLoaded,phoneNumbers}
}