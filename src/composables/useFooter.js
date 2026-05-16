import { computed, onMounted } from 'vue'
import { useScreenSafeArea, useElementSize } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { playBtnAudioFunc } from '@/utils/core'
import { openLoginFunc } from '@/utils/config'
import { isAuthRef } from '@/model/user'
import { signInModel } from '@/model/other'
import { footShowRef,isEverLoginFunc } from '@/utils/config'
import { redPotCountRef,footerListRef} from '@/model/common'

export function useFooter() {
    
    const route = useRoute()
    const router = useRouter()

    // const { navListRef, getHomeNavFunc } = configMOdel()
    const { signConfigRef, signConfigFunc } = signInModel()
    
    const current_path = computed(()=> {
        return route.path
    })

    function onclickMenu(item) {
        playBtnAudioFunc()
        if(item.path==current_path.value) return
        if(item.auth && !isAuthRef.value) {
            if(isEverLoginFunc()) {
                openLoginFunc(0)
            }else{
                openLoginFunc(1)
            }
            return
        }
        router.push(item.path)
    }
    
    onMounted(() => {
        if(route.name != 'home' && route.name != 'more') {
            if(!signConfigRef.value) {
                signConfigFunc(false)
            }
        }
    })

  return {
    // 返回需要共享的状态和方法
    footShowRef,
    redPotCountRef,
    current_path,
    onclickMenu,
    footerListRef
  }
}