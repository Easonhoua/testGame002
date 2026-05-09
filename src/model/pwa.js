import { ref } from 'vue'
import { $get, $post } from '@/request'
import { isAuthRef } from '@/model/user'
import { openLoginFunc,gameModeType} from '@/utils/config'


export var pwaGuideShow = ref(false) // 是否显示PWA提示
export var pwaReceiveShow = ref(false) // 是否显示PWA奖励提示
export var popStatue = ref(0) // 0: 不显示, 1: 显示
export var popModel = ref(0)   //是否能关闭按钮,1是0否
export var popContent = ref('') // 弹窗内容
export var popReceiveAward = ref(0)   // 奖励金额
export var popInterval = ref(1) //间隔(小时)：1小时/3小时/6小时
export var pwaReceiveAmount = ref(0) // PWA奖励金额

// pwa界面数据模型
export var pwaPageConfig = ref({})
// logo
export var gameLogo = ref('')
// ionc
export var appIcon = ref('')

export function pwaIndexModel() {

    async function getPwaConfigFunc() {
        
        if(!isAuthRef.value) {
            openLoginFunc(0)
            return
        }

        let res = await $get({url: '/activity/v1/pwa/index'}, {loading: false})
        if(res.code != 200) return
        popStatue.value = res.data.config.pop_status||0
        popModel.value = res.data.config.pop_model||0
        popContent.value = res.data.config.h5_show_content||''
        popReceiveAward.value = res.data.config.send_amount||0
        popInterval.value = res.data.config.interval||0

        const lastPopTime = localStorage.getItem('lastPopTime') || 0;
        const currentTime = Date.now();
        const intervalInMilliseconds = popInterval.value * 60 * 60 * 1000;

        if (popStatue.value == 1 && currentTime > (parseInt(lastPopTime) + intervalInMilliseconds)) {
            localStorage.setItem('lastPopTime', currentTime);
            pwaGuideShow.value = true;
        } else {
            pwaGuideShow.value = false;
        }

        //添加逻辑 pwa 安装大于2 不提示引导框
        const failcount = localStorage.getItem('pwainstallfail') || 0;
        if(failcount >= 2) {
            pwaGuideShow.value = false
        }

        //gameModeType 3 强制不弹框
        if(gameModeType.value == 3){
            pwaGuideShow.value = false
        }

        return pwaGuideShow.value
    }

    return { pwaGuideShow, pwaReceiveShow, popStatue, popModel, popContent, popReceiveAward, pwaReceiveAmount, popInterval, getPwaConfigFunc }
}

export async function getPwaTokenFunc() {
    const res = await $post({ url: '/activity/v1/pwa/get-pwa-token', data: {} }, { loading: false, toast: false })
    if(res.code != 200) return
    window.location.href = window.downurl
}

export async function refreshPwaTokenFunc() {
    const res = await $post({ url: '/activity/v1/pwa/refresh-pwa', data: {} }, { loading: false, toast: false })
    if(res.code != 200) return
    pwaReceiveAmount.value = (res.data && res.data.send_amount) || 0
    if(pwaReceiveAmount.value > 0){
        pwaReceiveShow.value = true
        pwaGuideShow.value = false
    }
}

//获取pwa界面配置
export async function getPwaPageConfigFunc() {
    let res = await $get({url: '/activity/v1/pwa/land'}, {loading: false})
    if(res.code != 200) return
    pwaPageConfig.value = res.data.pwa_config || {}
    appIcon.value = res.data.pwa_config.base_pwa_logo || ''
    gameLogo.value = res.data.logo || ''
    return res.data || {}
}
