import { onMounted, ref } from 'vue'
import { $get, $post } from '@/request'
import { userModel } from './user'
import { playBtnAudioFunc } from '@/utils/core'

var vipInfoRef = ref({})
export function vipModel(init) {
    let page = ref(0)
    let pageSize = ref(20)
    let hashLoadingRef = ref(true)
    let finishedRef = ref(false)

    const { userInfoFunc } = userModel(false)

    let bonusLogsRef = ref([])

    async function vipInfoFunc(loading) {
        const res = await $get({ url: '/activity/v1/vip/index' }, {loading: loading})
        if(res.code != 200) return
        vipInfoRef.value = res.data || {}
    }
    async function taskBonusFunc() {
        if(parseFloat(vipInfoRef.value.bonus||0)!=0&&vipInfoRef.value.can_be_collected){
            playBtnAudioFunc()
            const res = await $post({ url: '/activity/v1/vip/receive' }, {loading: true, toast: true})
            if(res.code != 200) return
            vipInfoFunc(false)
            userInfoFunc()
        }else{
            return
        }
    }
    async function bonusLogsFunc(_init) {
        if(_init) {
            page.value = 0
            finishedRef.value = false
            bonusLogsRef.value = []
        }
        hashLoadingRef.value = true
        let data = {
            offset: page.value*pageSize.value,
            limit: pageSize.value
        }
        const res = await $get({ url: '/activity/v1/vip/list', params: data }, {loading: false})
        hashLoadingRef.value = false
        page.value ++
        if(res.code != 200) {
            finishedRef.value = true
            return
        }
        let list = res.data||[]
        finishedRef.value = list.length && list.length >= pageSize.value ? false : true
        bonusLogsRef.value = [...bonusLogsRef.value, ...list]
    }

    onMounted(()=> {
        if(init) vipInfoFunc(false)
    })

    return { hashLoadingRef, finishedRef, vipInfoRef, vipInfoFunc, taskBonusFunc, bonusLogsRef, bonusLogsFunc }
}