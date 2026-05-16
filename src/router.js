import { createRouter, createWebHashHistory } from 'vue-router'
// excludeName: ["a", "b"], // 只要不是 a|b 页面 ，都要刷新
// includeName: ["c", "d"], // 只有是 c|d 页面 ，才要刷新。
const routes = [
    {
        path: '/',
        name: 'home',
        component: ()=> import('./views/index/home.vue'),
        meta: { noAuth: true, bgType: 1, tabar: true }
    },
    {
        path: '/more',
        name: 'more',
        component: ()=> import('./views/index/more.vue'),
        meta: { noAuth: true, bgType: 1, tabar: true}
    },
    {
        path: '/great_offer',
        name: 'great_offer_index',
        component: ()=> import('./views/great_offer/index.vue'),
        meta: { noAuth: true }
    },
    {
        path: '/pdd',
        name: 'pdd_index',
        component: ()=> import('./views/pdd/pddindex.vue'),
        meta: { noAuth: true }
    },
    {
        path: '/pdd/rule',
        name: 'pdd_rule',
        component: ()=> import('./views/pdd/pddrule.vue'),
        meta: {}
    },
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: ()=> import('./views/user/login.vue'),
    //     meta: { noAuth: true, bgType: 1 }
    // },
    // {
    //     path: '/register',
    //     name: 'register',
    //     component: ()=> import('./views/user/register.vue'),
    //     meta: { noAuth: true, bgType: 1 }
    // },
    {
        path: '/mine',
        name: 'mine',
        component: ()=> import('./views/user/mine.vue'),
        meta: { bgType: 1, tabar: true }
    },
    {
        path: '/profile',
        name: 'profile',
        component: ()=> import('./views/user/profile.vue'),
        meta: { bgType: 1 }
    },
    {
        path: '/game/record',
        name: 'game_record',
        component: ()=> import('./views/game/record.vue'),
        meta: { bgType: 1 }
    },
    {
        path: '/game/recordgame',
        name: 'game_recordgame',
        component: ()=> import('./views/game/recordgame.vue'),
        meta: { bgType: 1 }
    },
    {
        path: '/game/detail',
        name: 'game_detail',
        component: ()=> import('./views/game/detail.vue'),
        meta: { }
    },
    {
        path: '/agent',
        name: 'agent',
        component: ()=> import('./views/agent/index.vue'),
        meta: { noAuth: true, tabar: true },
    },
    {
        path: '/vip',
        name: 'vip_center',
        component: ()=> import('./views/vip/center.vue'),
        meta: { noAuth: true },
    },
    {
        path: '/vip/bonus',
        name: 'vip_bonus',
        component: ()=> import('./views/vip/bonus.vue'),
        meta: { }
    },
    {
        path: '/treasure/box',
        name: 'treasure_box',
        component: ()=> import('./views/treasure/box.vue'),
        meta: { noAuth: true },
    },
    {
        path: '/treasure/subordinate',
        name: 'treasure_subordinate',
        component: ()=> import('./views/treasure/subordinate.vue'),
        meta: { }
    },
    {
        path: '/rescue/fund',
        name: 'rescue_fund',
        component: ()=> import('./views/rescue/fund.vue'),
        meta: { noAuth: true },
    },
    {
        path: '/rescue/week',
        name: 'rescue_week',
        component: ()=> import('./views/rescue/week.vue'),
        meta: { noAuth: true },
    },
    {
        path: '/lucky/draw',
        name: 'lucky_draw',
        component: ()=> import('./views/lucky/draw.vue'),
        meta: { bgType: 2, noAuth: true, }
    },
    {
        path: '/lucky/voucher',
        name: 'lucky_voucher',
        component: ()=> import('./views/lucky/voucher.vue'),
        meta: { }
    },
    {
        path: '/luckywheel',
        name: 'luckywheel_index',
        component: ()=> import('./views/luckywheel/index.vue'),
        meta: { bgType: 2, noAuth: true, }
    },
    {
        path: '/recharge',
        name: 'account_recharge',
        component: ()=> import('./views/account/recharge.vue'),
        meta: { bgType: 1,tabar: false }
    },
    {
        path: '/verify',
        name: 'account_verify',
        component: ()=> import('./views/account/verify.vue'),
        meta: { tabar: false }
    },
    
    {
        path: '/withdrawal',
        name: 'account_withdrawal',
        component: ()=> import('./views/account/withdrawal.vue'),
        meta: { }
    },
    {
        path: '/recharge/pay',
        name: 'account_pay',
        component: ()=> import('./views/account/pay.vue'),
        meta: { }
    },
    {
        path: '/withdrawal/cashConfirm',
        name: 'account_cashConfirm',
        component: ()=> import('./views/account/cashConfirm.vue'),
        meta: { }
    },
    {
        path: '/moneyRecords',
        name: 'account_moneyRecords',
        component: ()=> import('./views/account/moneyRecords.vue'),
        meta: { }
    },
    {
        path: '/article/message',
        name: 'article_message',
        component: ()=> import('./views/article/message.vue'),
        meta: { bgType: 1, }
    },
    {
        path: '/activity/giftcode',
        name: 'activity_giftcode',
        component: ()=> import('./views/activity/giftcode.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/activity/totalrecharge',
        name: 'activity_totalrecharge',
        component: ()=> import('./views/activity/totalrecharge.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/activity/mysteriousgold',
        name: 'activity_mysteriousgold',
        component: ()=> import('./views/activity/mysteriousgold.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/activity/sevendayback',
        name: 'activity_sevendayback',
        component: ()=> import('./views/activity/sevendayback.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/activity/redpakage',
        name: 'activity_redpakage',
        component: ()=> import('./views/activity/redpakage.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/activity/washcode',
        name: 'activity_washcode',
        component: ()=> import('./views/activity/washcode.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/activity/pass',
        name: 'activity_pass',
        component: ()=> import('./views/activity/pass.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/activity/jackpotrank',
        name: 'activity_jackpotrank',
        component: ()=> import('./views/activity/jackpotrank.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/activity/bettingCheckIn',
        name: 'activity_bettingCheckIn',
        component: ()=> import('./views/activity/bettingCheckIn.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/activity/monthlybetting',
        name: 'activity_monthlybetting',
        component: ()=> import('./views/activity/monthlybetting.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/activity/memberDay',
        name: 'activity_memberDay',
        component: ()=> import('./views/activity/memberDay.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/activity/membersGift',
        name: 'activity_membersGift',
        component: ()=> import('./views/activity/membersGift.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/worldcup/index',
        name: 'worldcup_index',
        component: ()=> import('./views/worldcup/index.vue'),
        meta: {noAuth: true }
    },
    {
        path: '/worldcup/group',
        name: 'worldcup_group',
        component: ()=> import('./views/worldcup/group.vue'),
        meta: {noAuth: true }
    },
    
    
    
    
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router