import { computed, onMounted, ref } from "vue"
import { t } from '@/i18n'
import { useLocalStorage, useSessionStorage, useStorage } from '@vueuse/core'
import { $get, $post, $put } from '../request'
import { useRoute, useRouter } from "vue-router"
import { uploadBase64ImageFunc } from './basic'
import { clearGameCollectFunc, gameModel } from './game'
import { playBtnAudioFunc, isPwaFunc, isAndroid, isIOS } from '@/utils/core'
import { indexLoadingShowRef, openLoginFunc,isEverLoginFunc,setStorage } from '@/utils/config'
import { refreshPwaTokenFunc } from '@/model/pwa'

export const authRef = useLocalStorage('authInfo', {})
export const isAuthRef = computed(() => !!authRef.value.access_token)
export const memberLocal = useLocalStorage('member', {})
export const msgUnReadCountRef = ref(0)
const accountLocal = computed(()=> {
    return memberLocal.value&&memberLocal.value.account||{}
})

let userInfoPollingTimer = null
const userInfoPollingSources = new Set()
let userInfoRequesting = false

async function syncUserInfoFunc() {
    if(userInfoRequesting) return
    userInfoRequesting = true
    try {
        let res = await $get({url: '/v1/member/member/balance'}, {loading: false})
        if(res.code != 200) return
        memberLocal.value.level = res.data.level
        memberLocal.value.current_level = res.data.level
        if(memberLocal.value.account) {
            memberLocal.value.account.user_money = res.data.user_money
            memberLocal.value.account.bet_amount = res.data.bet_amount
            memberLocal.value.account.consume_money = res.data.consume_money
        }
        msgUnReadCountRef.value = res.data.un_read_count||0
        if(res.data.order&&res.data.order!= null) {
            window.jsBridge?.postMessage("recharge", JSON.stringify({cid: window.ch, uid:memberLocal.value.id, phone: memberLocal.value.username, amount: res.data.order.pay_amount, currency:"BRL"}))
        }
    } finally {
        userInfoRequesting = false
    }
}

export function startUserInfoPolling(source = 'default', interval = 5000, immediate = true) {
    if(!isAuthRef.value) return
    userInfoPollingSources.add(source)
    if(immediate) {
        syncUserInfoFunc()
    }
    if(userInfoPollingTimer) return
    userInfoPollingTimer = setInterval(() => {
        if(!isAuthRef.value) {
            clearInterval(userInfoPollingTimer)
            userInfoPollingTimer = null
            userInfoPollingSources.clear()
            return
        }
        syncUserInfoFunc()
    }, interval)
}

export function stopUserInfoPolling(source = 'default') {
    userInfoPollingSources.delete(source)
    if(userInfoPollingSources.size > 0) return
    if(userInfoPollingTimer) {
        clearInterval(userInfoPollingTimer)
        userInfoPollingTimer = null
    }
}

export var noRechargeDataRef = useStorage('no_recharge', {time: '', count: 0})
export var noRechargeShowRef = ref(false)

export function userModel(init = false) {
    const memberRef = computed(()=> { return memberLocal.value||{} })
    const accountRef = computed(()=> { return accountLocal.value||{} })
    
    async function userInfoFunc() {
        await syncUserInfoFunc()
    }
    async function userUpdateFunc(key, value) {
        let data = {}
        data[key] = value
        const res = await $put({ url: '/v1/member/member/update',params: {id: memberLocal.value.id}, data: data }, { loading: true, toast: true })
        if(res.code != 200) return
        memberLocal.value[key] = value
    }
    async function userAvatarFunc(image) {
        if(!image) return
        uploadBase64ImageFunc(image).then(async (imgUrl) => {
            if(imgUrl) {
                userUpdateFunc('head_portrait', imgUrl)
            }
        })
    }
    function userNoRechargeFunc() {
        if(memberRef.value&&memberRef.value.id&&parseFloat(memberRef.value.first_recharge_amount)==0) {
            let date = new Date()
            let time = date.getTime()
            
            if(!noRechargeDataRef.value.time || noRechargeDataRef.value.time < time) {
                if(noRechargeDataRef.value.count == 0) {
                    noRechargeDataRef.value.count = 1
                }
                // else {
                //     noRechargeDataRef.value.time = time + 23 * 60 * 60 * 1000
                //     noRechargeShowRef.value = true
                // }
            }else {
                noRechargeDataRef.value.count = 0
            }
        }
    }

    //获取代理奖金接口
    async function getAgentBonusFunc() {    
        const res = await $get({ url: '/v1/member/member/agent-bonus' }, { loading: false, toast: false })
        if(res.code != 200) return     
        if(memberLocal.value){
            memberLocal.value.agent_bonus = res.data.agent_bonus 
            memberLocal.value.give_amount = res.data.give_amount
        }
    }

    onMounted(()=> {
        if(init&&isAuthRef.value) userInfoFunc()
    })

    return { memberRef, accountRef, userInfoFunc, userUpdateFunc, userAvatarFunc, userNoRechargeFunc,getAgentBonusFunc}
}

//刷新token 刷新用户信息
export async function refreshTokenFunc() {
    let group = 'h5'
    let url = '/v1/site/refresh'
    if(isPwaFunc()) {
        if(isAndroid()) {
            group = 'android_pwa'
        }else if(isIOS()) {
            group = 'ios_pwa'
        }
    }
    let data = {
        refresh_token: authRef.value.refresh_token,
        group: group
    }
    const res = await $post({ url: url, data: data }, { loading: false, toast: false })
    if(res.code != 200) {
        if(res.code == 401) {
            authRef.value = {}
            memberLocal.value = {}
            clearGameCollectFunc()
        }
        if(isEverLoginFunc()) {
            openLoginFunc(0)
        }else{
            openLoginFunc(1)
        }
    }else {
        authRef.value = res.data
        memberLocal.value = res.data&&res.data.member

        let pwa_source = res.data&&res.data.member&&res.data.member.account&&res.data.member.account.pwa_source
        //触发pwa奖励
        if(isPwaFunc()&&(pwa_source == null || pwa_source == '')) {
            console.log('触发refreshPwaTokenFunc')
            refreshPwaTokenFunc()
        }
    }
    return res
}

export async function pwaLoginFunc() {
    const route = useRoute()
    const router = useRouter()

    let group = 'h5'
    // if(isPwaFunc()) {
        if(isAndroid()) {
            group = 'android_pwa'
        }else if(isIOS()) {
            group = 'ios_pwa'
        }
    // }else{
    //     console.log('非PWA环境，不执行pwa登录')
    //     return 
    // }

    //判断window.pa是否存在
    if(!window.pa || window.pa == '') {
        console.log('window.pa is empty, not pwa login')
        return
    }

    let data = {
        pa: window.pa,
        group: group
    }
    const res = await $post({ url: '/v1/site/pwa-login', data: data }, { loading: false, toast: false })
    if(res.code != 200) return

    authRef.value = res.data
    memberLocal.value = res.data&&res.data.member
    indexLoadingShowRef.value = false
    router.go('/')

    let remember_data = {username: '', password: '', check: false}
    remember_data = {username: res.data.member.username, password: '', check: true}
    
    localStorage.setItem('remember', JSON.stringify(remember_data))
    // getGameCollectFunc()
    setTimeout(() => {
        window.location.reload()
    }, 1000);

}


//登录模块
export function loginModel() {
    const route = useRoute()
    const router = useRouter()

    // const { getGameCollectFunc } = gameModel()

    let group = 'h5'
    if(isPwaFunc()) {
        if(isAndroid()) {
            group = 'android_pwa'
        }else if(isIOS()) {
            group = 'ios_pwa'
        }
    }

    let dataRef = ref({username: '', password: '', group: group})
    let rememberRef = ref(true)

    async function loginFunc() {
        playBtnAudioFunc()
        const res = await $post({url: '/v1/site/login', data: dataRef.value}, {loading: true, toast: true})
        if(res.code != 200) return
        
        authRef.value = res.data
        memberLocal.value = res.data&&res.data.member
        indexLoadingShowRef.value = false
        //上报登录
        window.jsBridge?.postMessage("login", JSON.stringify({cid: window.ch,uid: memberLocal.value.id,phone: memberLocal.value.username}))

        router.go('/')

        let remember_data = {username: '', password: '', check: false}
        if(rememberRef.value) {
            remember_data = {username: dataRef.value.username, password: dataRef.value.password, check: true}
        }
        localStorage.setItem('remember', JSON.stringify(remember_data))
        // getGameCollectFunc()
        setTimeout(() => {
            window.location.reload()
        }, 300);
    }

    onMounted(()=> {
        let _redata = JSON.parse(localStorage.getItem('remember'))
        if(_redata && _redata.check) {
            dataRef.value.username = _redata.username
            dataRef.value.password = _redata.password
            rememberRef.value = _redata.check
        }
    })

    return { dataRef, rememberRef, loginFunc }
}

export async function logoutFunc() {
    let group = 'h5'
    if(isPwaFunc()) {
        if(isAndroid()) {
            group = 'android_pwa'
        }else if(isIOS()) {
            group = 'ios_pwa'
        }
    }
    const res = await $post({url: '/v1/site/logout', data: {group:group}}, {loading: false})
    if(res.code != 200) return
    //上报登出
    window.jsBridge?.postMessage("logout", JSON.stringify({cid: window.ch,uid: memberLocal.value.id,phone: memberLocal.value.username}))
    clearGameCollectFunc()
    _logout()
    
}

function _logout() {
    setStorage('isSignshow', false,9999)
    authRef.value = {}
    memberLocal.value = {}
    router.go('/')
}

export const isRegisterSuccessShowRef = ref(false)
export function registerModel() {
    const route = useRoute()
    const router = useRouter()
    // const { getGameCollectFunc } = gameModel()

    let sess_promoter = useSessionStorage('re_pro')
    let sess_channle = useSessionStorage('re_ch')

    let group = 'h5'
    if(isPwaFunc()) {
        if(isAndroid()) {
            group = 'android_pwa'
        }else if(isIOS()) {
            group = 'ios_pwa'
        }
    }

    let dataRef = ref({
        username: '', 
        password: '', 
        password_repetition: '', 
        promoter: sess_promoter.value, 
        channle_code: sess_channle.value, 
    })

    async function registerFunc() {
        playBtnAudioFunc()
        if(dataRef.value.password != dataRef.value.password_repetition) {
            showToast({
				message: "A senha e a confirmação devem ser iguais.",
				wordBreak: 'break-word',
			});
            return      
        }
        isRegisterSuccessShowRef.value = false
        const data = {...dataRef.value, group: group }
        if(window.allParams && window.allParams!=''){
            data.url_params = window.allParams
        }
        const res = await $post({url: '/v1/site/register', data: data}, {loading: true, toast: true})
        if(res.code != 200) return
        isRegisterSuccessShowRef.value = true
        if(res.data&&res.data.access_token) {
            authRef.value = res.data
            memberLocal.value = res.data&&res.data.member
            indexLoadingShowRef.value = false

            // 为了“100%保证上报先于跳转”，把上报逻辑前置到 router.go / reload 之前
            if(window.fbqKey != '') {
                fbq('track', 'CompleteRegistration', {
                    value: 1.00,
                    currency: 'USD'
                });
            }

            if (window.kwaiqKey && window.kwaiqKey!='') {
                kwaiq.instance(window.kwaiqKey).track('completeRegistration');
            }

            if (window.ttqKey && window.ttqKey!='') {
                ttq.track('CompleteRegistration', {
                    content_type: 'user',
                    description: 'register success'
                  })
            }

            // 上报注册成功（给原生/APP 通道）
            window.jsBridge?.postMessage(
                "register",
                JSON.stringify({cid: window.ch,uid: memberLocal.value.id,phone: memberLocal.value.username})
            )

            router.go('/')
            // getGameCollectFunc()

            let remember_data = {username: dataRef.value.username, password: dataRef.value.password, check: true}
            localStorage.setItem('remember', JSON.stringify(remember_data))

            setTimeout(() => {
                window.location.reload()
            }, 300);
        }else {
            if(route.query.from&&route.query.from=='login') {
                router.back()
            }else {
                if(isEverLoginFunc()) {
                    openLoginFunc(0)
                }else{
                    openLoginFunc(1)
                }
            }
        }
    }

    onMounted(()=> {
        if(route.query.promoter) {
            sess_promoter.value = route.query.promoter
            dataRef.value.promoter = route.query.promoter
        }
        if(route.query.ch) {
            sess_channle.value = route.query.ch
            dataRef.value.channle_code = route.query.ch
        }

        if(window.ch != ''){
            sess_channle.value = window.ch
            dataRef.value.channle_code = window.ch
        }
    })

    return { dataRef, registerFunc }
}

export function changePassModel() {
    const router = useRouter()
    var dataRef = ref({
        old_password: '',
        password: '',
        password_repetition: '',
    })
    async function cheangePasswordFunc(type) {

        if(dataRef.value.password != dataRef.value.password_repetition) {
            showToast({
				message: "Confirme a senha tem de ser igual a 'Senha'.",
				wordBreak: 'break-word',
			});
            return      
        }

        dataRef.value.group = 'h5'
        dataRef.value.type = type
        const res = await $post({ url: '/v1/site/modify-pwd', data: dataRef.value }, { loading: true, toast: true })
        if (res.code != 200) return
        if(type == 'login_pwd') {
            clearGameCollectFunc()
            _logout()
            let _redata = JSON.parse(localStorage.getItem('remember'))
            if(_redata) {
                _redata.password = dataRef.value.password
                localStorage.setItem('remember', JSON.stringify(_redata))
            }
            router.replace('/')
        }else {
            router.back()
        }
    }
    return { dataRef, cheangePasswordFunc }
}
