
import { computed, ref } from 'vue'
import { t, fn } from '@/i18n'
import { $get } from '@/request'
import { useRoute, useRouter } from 'vue-router'
import { useScreenSafeArea } from '@vueuse/core'
import useClipboard from "vue-clipboard3"
import { openServiceFunc, openLoginFunc } from '@/utils/config'
import { playBtnAudioFunc } from '@/utils/core'
import { isAuthRef, memberLocal } from '@/model/user'
import { routeToViewFunc} from '@/model/basic'
import { redPakageStateRef, redPakageModel} from '@/model/other'
import { gameLogo, appIcon} from '@/model/pwa'
import { socialMenuListRef,leftproListRef,blogTagIdsRef} from '@/model/common'
import { gameAllShowRef, gameAllCateId,gameModel } from '@/model/game'
const { gameListRef } = gameModel()
const showBalance = ref('false')
export function useAside(close) {

    const route = useRoute()
    const router = useRouter()
    const { redPakageEndFunc } = redPakageModel()
    const { top } = useScreenSafeArea()
//打开全部游戏
    function openGameAll(id) {
        playBtnAudioFunc()
        gameAllShowRef.value = true
        gameAllCateId.value = id
    }
    function closeByClick() {
        playBtnAudioFunc('close')
        close()
    }

    function onclickNav(type) {
        playBtnAudioFunc()
        if(type === "agent") {
            close()
        }
        // close()
        routeToViewFunc(type).then(res => {
            if(res&&res.path) {
                router.push(res.path)
            }
        })
    }

    async function onclickNoNav() {
       playBtnAudioFunc()
       close()
       
    }

    function openService() {
        playBtnAudioFunc()
        close()
        openServiceFunc()
    }

    function toLogin() {
        playBtnAudioFunc()
        close()
        openLoginFunc(0)
    }

    function toRegister() {
        playBtnAudioFunc()
        close()
        openLoginFunc(1)
    }

    function onToProfile(){
        playBtnAudioFunc()
        close()
        router.push("/profile")
    }

    const { toClipboard } = useClipboard()
    async function copyInviteCode(_val) {
        _val = ''+_val
        await toClipboard(_val)
        showToast({
            message: 'foi copiado',
            type: 'success',
            wordBreak: 'break-word',
            zIndex: 99999999, // 设置 z-index
        });
    }

    const invite_link = computed(()=> {
        let code = memberLocal.value&&memberLocal.value.promoter_code
        let domain = window.location.protocol + '//' + window.location.host + '/#/'
        var query = {
            promoter: code
        }
        var queryString = new URLSearchParams(query).toString()
        return code ? domain+'?'+queryString : domain
    })
    const share_list = ref([
        {name: 'facebook', type: 'facebook',logo: '/imgs/lo_facebook.svg', url:'https://www.facebook.com/pages/creation/?profile_switcher_unified_creation=953646734&ref_type=pages_tab_launch_point_unified_creation'},
        {name: 'Telegram', type: 'telegram',logo: '/imgs/lo_telegram.svg', url:'https://t.me/MX39COM'},
        {name: 'Whatsapp', type: 'whatsapp',logo: '/imgs/lo_whatsapp.svg', url:'https://chat.whatsapp.com/KiFWx4WWdPk9IkI8J1hfYv'},
    ])
    const share_detection = ref(`Olá, eu estou jogando no ${window.document.title}, Ganhe {{ currentUnit.value }} 10.000 por dia!`)
    function onclickShare(item) {
        switch (item.type) {
            case 'facebook':
                FB.ui({
                    method: 'share',
                    href: invite_link.value
                }, function(response){});
                break;
            case 'telegram':
                window.open(`https://t.me/share/url?text=${share_detection.value}&url=${encodeURIComponent(invite_link.value)}`)
                break;
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${share_detection.value}&url=${encodeURIComponent(invite_link.value)}`)
                break;
        
            default:
                break;
        }
    }


    return {
        // 返回需要共享的状态和方法
        top,
        redPakageEndFunc,
        closeByClick,
        onclickNav,
        onclickNoNav,
        openService,
        toLogin,
        toRegister,
        onToProfile,
        copyInviteCode,
        leftproListRef,
        openGameAll,
        gameListRef,
        showBalance
      }
}
