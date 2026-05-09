import { computed, onMounted, ref } from 'vue'
import { $get, $post } from '@/request'
import { openLoginFunc,isEverLoginFunc } from '@/utils/config'
import { isAuthRef } from '@/model/user'
import { signShowRef, signConfigRef, redPakageShowRef, redPakageStateRef, showFirstChargeRef} from '@/model/other'
const currentTemplate = ref(import.meta.env.VITE_TEMPLATE || TEMPLATE_CONFIG.DEFAULT)
export async function uploadBase64ImageFunc(image) {
    let res = await $post({url: '/v1/common/file/base64', data: { image: image }}, {loading: true })
    if(res.code == 200) {
        return res.data.url
    }else {
        return ''
    }
}

export function routeToViewFunc(type) {
    return new Promise((resolve, reject)=> {
        switch (type) {
            case 'sign_in':
                signShowRef.value = true
                resolve(null)
                break;
            case 'treasure':
                resolve({path: '/treasure/box'})
                break;
            case 'rescue':
                resolve({path: '/rescue/fund'})
                break;
            case 'vip_bonus':
                resolve({path: '/vip'})
                break;
            case 'agent':
                resolve({path: '/agent'})
                break;
            case 'lucky':
                resolve({path: '/lucky/draw'})
                break;
            case 'code':
                resolve({path: '/activity/giftcode'})
                break;
            case 'red_packet':
                if(currentTemplate.value=="template_four"||currentTemplate.value=="template_five"){
                    resolve({path: '/activity/redpakage'})
                }else{
                    redPakageShowRef.value = true
                }
                // if(isAuthRef.value) {
                   
                // }else {
                //     if(isEverLoginFunc()) {
                //         openLoginFunc(0)
                //     }else{
                //         openLoginFunc(1)
                //     }
                // }
                break;
            case 'total_recharge':
                resolve({path: '/activity/totalrecharge'})
                break;
            case 'pdd':
                resolve({path: '/pdd'})
                break;
            case 'grand_deposit':
                resolve({path: '/great_offer'})
                break;
            case 'rescue_week':
                resolve({path: '/rescue/week'})
                break;
            case 'mystery':
                resolve({path: '/activity/mysteriousgold'})
                break;
            case 'first_pay':
                showFirstChargeRef.value = true
                resolve(null)
                break;
            case 'day7_back':
                resolve({path: '/activity/sevendayback'})
                break;
            case 'code_wash':
                resolve({path: '/activity/washcode'})
                break;
            case "turntable":
                resolve({path: '/luckywheel'})
                break;
            case "pass":
                resolve({path: '/activity/pass'})
                break;
            case 'bet_rank':
                resolve({path: '/activity/jackpotrank'})
                break;
            case 'bet_sign':
                resolve({path: '/activity/bettingCheckIn'})
                break;
            case 'month_lottery':
                resolve({path: '/activity/monthlybetting'})
                break;
            default:
                reject()
                break;
        }
    })
}

// export var navListRef = ref([])
// //跑马灯配置内容
// export var marqueeRef = ref('')
// //主页底部文案
// export var footerTextRef = ref('')
// export const navActivityCountRef = computed(()=> {
//     let _val = 0
//     navListRef.value.forEach(item => {
//         if (item.count>0) {
//             _val ++
//         }
//     })
//     if(signConfigRef.value&&signConfigRef.value.todayStatus) {
//         _val ++
//     }
//     if(redPakageStateRef.value&&redPakageStateRef.value.status==1) {
//         _val ++
//     }
//     return _val
// })
// export function configMOdel(init) {
//      var isOpenEnterRef = ref(false)
//     const getHomeNavFunc = async (loading) => {
//         const res = await $get({ url: '/activity/v1/index/config' }, { loading: loading })
//         const data = res.data || {}
//         navListRef.value = data.activity_banner || []
//         navListRef.value.forEach(item => {
//             let type = item.activity_type
//             if(type=='sign_in'){
//                     isOpenEnterRef.value = true
//             }
//                 switch (type) {
//                     case 'sign_in':
//                     item.title = 'Entrar'
//                     break;
//                 case 'treasure':
//                     item.title = 'Tesouro'
//                     break;
//                 case 'rescue':
//                     item.title = 'Resgatar'
//                     break;
//                     case 'rescue_week':
//                     item.title = 'Semana'
//                     break;
                    
//                 case 'vip_bonus':
//                     item.title = 'VIP'
//                     break;
//                 case 'agent':
//                     item.title = 'Agente'
//                     break;
//                 case 'lucky':
//                     item.title = 'Sorteio'
//                     break;
//                 case 'code':
//                     item.title = 'Troca'
//                     break;
//                 case 'red_packet':
//                     item.title = 'Coleta'
//                     break;
//                 case 'total_recharge':
//                     item.title = 'Bônus'
//                     break;
//                 case 'pdd':
//                     item.title = 'Magnata'
//                     break;
//                 case 'discount':
//                     item.title = 'Ofertas'
//                     break;
//                 case 'grand_deposit':
//                     item.title = 'Ofertas'
//                     break;
//                 case 'mystery':
//                     item.title = 'Misterioso'
//                     break;
//                 case 'day7_back':
//                     item.title = '7 dias'
//                     break;
//                 case 'code_wash':
//                     item.title = 'Rebate'
//                     break;
//                 case "turntable":
//                     item.title = 'Roleta'
//                     break;
//                 case 'first_pay':
//                     item.title = 'Depósito'
//                     break;
//                 case 'pass':
//                     item.title = 'Passe'
//                     break;
//                 case 'bet_rank':
//                     item.title = 'Classificação'
//                     break;
//                 default:
//                     break;
//             }
//         });

//         //新增赋值
//         if(data.marquee) {
//             marqueeRef.value = data.marquee
//         }
//         if(data.site_bottom) {
//             footerTextRef.value = data.site_bottom
//         }
        
//         // 拼多多活动
//     //     navListRef.value.push({
//     //         icon: '/icons/appicon.png',
//     //         activity_type: 'washcode',
//     //         title: 'codewash',
//     //         count: 0
//     //     })
//     }

//     onMounted(()=> {
//         if(init) getHomeNavFunc(false)
//     })

//     return { navListRef, getHomeNavFunc,isOpenEnterRef }
// }
// let bannerListRef = ref([])
// let activityListRef  = ref([])
// let leftproListRef = ref([])

// async function getBannerFunc() {
//     const res = await $get({ url: '/activity/v1/banner/index' }, { loading: false })
//     if(res.code!=200) return
//     const data = res.data || []
//     bannerListRef.value = data
//     activityListRef.value = data["4"] || []
//     leftproListRef.value = data["3"] || []
// }
//  function bannerModel() {
   
//     onMounted(()=> {
//         getBannerFunc()
//     })
//     return { bannerListRef, getBannerFunc,activityListRef }
// }
// export{bannerModel, bannerListRef, activityListRef, getBannerFunc,leftproListRef}
export function serviceModel() {
    async function getserviceListFunc() {
        const res = await $get({ url: '/activity/v1/service/index' }, { loading: true })
        return res
    }
    return { getserviceListFunc }
}
