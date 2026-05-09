import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import useClipboard from "vue-clipboard3"
import { playBtnAudioFunc,isIOS} from '@/utils/core'
import { openServiceFunc } from '@/utils/config'
import { vipModel } from '@/model/vip'
import { userModel } from '@/model/user'
import { appIcon} from '@/model/pwa'


export function useMine() {
    const router = useRouter()

    const { vipInfoRef, taskBonusFunc } = vipModel(true)
    const { memberRef, userInfoFunc,getAgentBonusFunc} = userModel()

    const { toClipboard } = useClipboard()
    async function copyInviteCode(_val) {
        _val = ''+_val
        await toClipboard(_val)
        showToast({
            message: 'foi copiado',
            type: 'success',
            wordBreak: 'break-word',
        });
    }

    function onclickNav(item) {
        playBtnAudioFunc()
        if(item.path) {
            router.push(item.path)
        } else {
            switch (item.type) {
                case 'service':
                    openServiceFunc()
                    break;
            }
        }
    }
    const current_level = computed(()=> {
        let level = 0
        if(memberRef.value&&memberRef.value.current_level){
            level = memberRef.value.current_level
        }
        return level
    })
    const next_level = computed(()=> {
        let item = {}
        // for(let i in vipInfoRef.value.config){
        //     if(vipInfoRef.value.config[i].vip==current_level.value){
        //         let index = parseInt(i)
        //         if(vipInfoRef.value.config[index+1]){
        //             item = vipInfoRef.value.config[index+1]
        //         }else {
        //             item = vipInfoRef.value.config[i]
        //         }
        //         break
        //     }
        // }
        if(vipInfoRef.value&&vipInfoRef.value.config){
            item = vipInfoRef.value.config[current_level.value+1]
        }
        return item
    })
    const current_level_info = computed(()=> {
        let item = {}
        for(let i in vipInfoRef.value.config){
            if(vipInfoRef.value.config[i].vip==current_level.value){
                let index = parseInt(i)
                item = vipInfoRef.value.config[i]
                break
            }
        }
        return item
    })
    const amount_rate = computed(()=> {
        let rate = 0
        if(memberRef.value&&memberRef.value.id) {
            if(current_level.value==next_level.value.vip){
                rate = 100
            }else {
                rate = parseFloat(memberRef.value&&memberRef.value.account&&memberRef.value.account.consume_money||0)/parseFloat(next_level.value&&next_level.value.bet_amount)*100
            }
        }else {
            rate = 100
        }
        return rate
    })

    var timer = null
    const heightClass = ref('h-[8.5rem]')
    onMounted(()=> {
        //
        getAgentBonusFunc()
        userInfoFunc()
        timer = setInterval(()=> {
            userInfoFunc()
        }, 5000)

        if (isIOS()) {
            heightClass.value = 'h-[8.5rem]'
        }
    })
    onUnmounted(()=> {
        clearInterval(timer)
    })

    function toRecharge() {
        playBtnAudioFunc()
        router.push('/recharge')
    }

    function toWithdrawal() {
        playBtnAudioFunc()
        router.push('/withdrawal')
    }

    return {
        // 返回需要共享的状态和方法
        appIcon,
        amount_rate,
        memberRef,
        next_level,
        onclickNav,
        toRecharge,
        toWithdrawal,
        copyInviteCode,
    }
}
