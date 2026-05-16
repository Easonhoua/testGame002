import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { t } from '@/i18n'
import { $get } from '@/request'
import useClipboard from "vue-clipboard3"
import { playBtnAudioFunc, isIOS } from '@/utils/core'
import { openServiceFunc } from '@/utils/config'
import { vipModel } from '@/model/vip'
import { userModel, isAuthRef, startUserInfoPolling, stopUserInfoPolling } from '@/model/user'
import { appIcon } from '@/model/pwa'
import { blogTagIdsRef } from '@/model/common'
export const showBalance = ref(0)
export function useMine() {
    const router = useRouter()

    const { vipInfoRef, taskBonusFunc } = vipModel(true)
    const { memberRef, getAgentBonusFunc } = userModel()

    const { toClipboard } = useClipboard()
    async function copyInviteCode(_val) {
        _val = '' + _val
        await toClipboard(_val)
        showToast({
            message: t('commCenter.copied'),
            type: 'success',
            wordBreak: 'break-word',
        });
    }

    function onclickNav(item) {
        playBtnAudioFunc()
        if (item.path) {
            router.push(item.path)
        } else {
            switch (item.type) {
                case 'service':
                    openServiceFunc()
                    break;
            }
        }
    }
    const current_level = computed(() => {
        let level = 0
        if (memberRef.value && memberRef.value.current_level) {
            level = memberRef.value.current_level
        }
        return level
    })
    const next_level = computed(() => {
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
        if (vipInfoRef.value && vipInfoRef.value.config) {
            item = vipInfoRef.value.config[current_level.value + 1]
        }
        return item
    })
    const current_level_info = computed(() => {
        let item = {}
        for (let i in vipInfoRef.value.config) {
            if (vipInfoRef.value.config[i].vip == current_level.value) {
                let index = parseInt(i)
                item = vipInfoRef.value.config[i]
                break
            }
        }
        return item
    })
    const amount_rate = computed(() => {
        let rate = 0
        if (memberRef.value && memberRef.value.id) {
            if (current_level.value == next_level.value.vip) {
                rate = 100
            } else {
                rate = parseFloat(memberRef.value && memberRef.value.account && memberRef.value.account.consume_money || 0) / parseFloat(next_level.value && next_level.value.bet_amount) * 100
            }
        } else {
            rate = 100
        }
        return rate
    })

    const heightClass = ref('h-[8.5rem]')
    onMounted(() => {
        //
        getAgentBonusFunc()
        if (isAuthRef.value) {
            startUserInfoPolling('useMine')
        }


        if (isIOS()) {
            heightClass.value = 'h-[8.5rem]'
        }
    })
    onUnmounted(() => {
        stopUserInfoPolling('useMine')
    })

    function toRecharge() {
        playBtnAudioFunc()
        router.push('/recharge')
    }

    async function toWithdrawal() {
        if (blogTagIdsRef.value.includes(5)) {
            let res = await $get({ url: '/v1/member/member/clear-bet' })
            if (res.code == 200) {
                showBalance.value = res.data.need_clear
            }
        }
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
