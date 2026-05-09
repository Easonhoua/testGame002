import { onMounted, ref } from 'vue'
import { $get, $post } from '@/request'


export function messageModel(init) {
    let page = ref(0)
    let pageSize = ref(20)
    let hashLoadingRef = ref(true)
    let finishedRef = ref(false)

    let msgUnReadCountRef = ref(0)
    let msgTypeRef = ref(0)
    let msgListRef = ref([])

    async function msgUnReadFunc() {
        const res = await $get({ url: '/activity/v1/message/un-read' }, { loading: false })
        if(res.code != 200) return
        msgUnReadCountRef.value = res.data || 0
        
    }
    async function getMsgFunc(_init) {
        if(_init) {
            page.value = 0
            finishedRef.value = false
            msgListRef.value = []
        }
        hashLoadingRef.value = true
        let data = {
            offset: page.value,
            limit: pageSize.value
        }
        if(msgTypeRef.value) {
            data.message_type = msgTypeRef.value
        }
        const res = await $get({ url: '/activity/v1/message/list', params: data }, { loading: false })
        hashLoadingRef.value = false
        page.value ++
        if(res.code != 200) {
            finishedRef.value = true
            return
        }
        const list = res.data || []
        finishedRef.value = list.length && list.length >= pageSize.value ? false : true
        msgListRef.value = [...msgListRef.value, ...list]
    }
    async function readMsgFunc(id, index, type) {
        if(!id) return
        const res = await $get({ url: '/activity/v1/message/read', params: { id: id, message_type: type} }, { loading: false })
        if(res.code != 200) return
        msgListRef.value[index].status = 1
    }

    //读取全部消息
    async function readAllMsgFunc() {
        const res = await $post({ url: '/activity/v1/message/read-all'}, { loading: false })
        if(res.code != 200) return  
    }

    onMounted(() => {
        if (init) getMsgFunc(true)
    })
    return { 
        msgUnReadCountRef, msgUnReadFunc, 
        hashLoadingRef, finishedRef, msgTypeRef, msgListRef, getMsgFunc, readMsgFunc,readAllMsgFunc
    }
}