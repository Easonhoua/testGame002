/**
 * 主题图片配置文件
 * 集中管理所有需要使用主题的图片
 */
import { getThemeImage as resolveThemeImage } from '@/utils/theme'

const isLazyImage = (value) => typeof value === 'function' && value.__lazyThemeImage === true

const lazyGroupCache = new WeakMap()

const getThemeImage = (...args) => {
  const getter = () => resolveThemeImage(...args)
  getter.__lazyThemeImage = true
  return getter
}

const createLazyGroup = (group) => {
  if (!group || typeof group !== 'object') return group
  if (lazyGroupCache.has(group)) return lazyGroupCache.get(group)

  const valueCache = new Map()
  const proxy = new Proxy(group, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      if (!isLazyImage(value)) return value
      const cacheKey = `${window.themecolor?.name || ''}:${String(key)}`
      if (!valueCache.has(cacheKey)) valueCache.set(cacheKey, value())
      return valueCache.get(cacheKey)
    },
  })
  lazyGroupCache.set(group, proxy)
  return proxy
}

const createLazyThemeImages = (groups) => {
  const groupCache = new Map()
  return new Proxy(groups, {
    get(target, key, receiver) {
      const group = Reflect.get(target, key, receiver)
      if (!group || typeof group !== 'object') return group
      if (!groupCache.has(key)) groupCache.set(key, createLazyGroup(group))
      return groupCache.get(key)
    },
  })
}

let themeImagesCache

// 方式 1: 使用函数返回（推荐 - 支持热更新和主题切换）
export const useThemeImages = () => {
  if (themeImagesCache) return themeImagesCache

  themeImagesCache = createLazyThemeImages({
    // 公共图片模板通用
    public: {
      receive_bg1: "imgs/common/m1.png",
      receive_bg2: "imgs/common/m2.png",
      receive_bg3: "imgs/common/m3.png",
      receive_bg4: "imgs/common/m4.png",
    },

    // 通用图标
    common: {
      btn_close: getThemeImage('mask-colse.png','common'),
      btn_back: getThemeImage('navv2_icon_back.png','common'),
      btn_service:getThemeImage('btn_service.png','common'),

      img_recharge: getThemeImage('mine-recharge.png','common'),
      img_withdraw: getThemeImage('mine-withdrawal.png','common'),

      icon_gou:getThemeImage('mysterious-yes.png', 'common'),
      icon_hin:getThemeImage('hinticon.png','common'),

      icon_verify: getThemeImage('verify_my.png','common'),
      icon_user1: getThemeImage('verify_havegr.png','common'),
      icon_user2: getThemeImage('verify_gr.png','common'),
      icon_card1: getThemeImage('verify_havecardicon.png','common'),
      icon_card2: getThemeImage('verify_cardicon.png','common'),

      img_success: getThemeImage('pdd_sucess_bg.png','common'),
      img_successbg: getThemeImage('pdd_money_sucess.png','common'),

      img_gold: getThemeImage('wheel-gold.png','common'),
      img_money: getThemeImage('wheel-money.png','common'),

      img_nodata: getThemeImage('no-data.png','common'),

      icon_gift: getThemeImage('down_gift.png','common'),
      icon_search: getThemeImage('icon_search.png','common'),
      icon_laba: getThemeImage('icon-horn.png','common'),
      icon_share: getThemeImage('icon-share.png','common'),
      icon_flagbr: getThemeImage('flag-br.png','common'),

      //
      icon_wallet: getThemeImage('icon-wallet-g.png','common'),
      icon_rich_warn: getThemeImage('img_tib.png','common'),
      bg_tableheader: getThemeImage('bg_01.png','common'),
      icon_copy: getThemeImage('home_left_copy.png','common'),
      bg_sucess: getThemeImage('wheel-nomoney.png','common'),
      icon_server: getThemeImage('service-icon.png','common'),
      icon_emailopen: getThemeImage('email-open.png','common'),
      icon_emailclose: getThemeImage('email-noopen.png','common'),
      //m4
      icon_vipbg: getThemeImage('bg_vip.png','common'),
 		icon_line: getThemeImage('line.png','common'),
      gif_finger: getThemeImage("finger.gif",'common'),
      bg_item: getThemeImage('bg_item.png','common'),
      m4_bg1: getThemeImage('m4_bg1.png','common'),
      m4_null:getThemeImage('nullimg.png','common'),
      m4_collect: getThemeImage('collect.png','common'),
      m4_collect_a: getThemeImage('collect-a.png','common'),
      m4_withdrawal_icon: getThemeImage('withdrawal_icon.png','common'),
    },
    
    //通用背景
    commonbg:{
      bg_gamesearch: getThemeImage('bg_gamesearch.png','commonbg'),
      bg_fristchange: getThemeImage('fristchange.png','commonbg'),
      bg_registerbg: getThemeImage('in-register-bg.png','commonbg'),
      bg_body_1: getThemeImage('bg-body-1.png','commonbg'),
      bg_body_2: getThemeImage('bg-body-2.png','commonbg'),
      // 模板二
      bg_share: getThemeImage('box-bg2.png','commonbg'),
      bg_down_top: getThemeImage('down_top.png','commonbg'),
    },
    
    // 首页图片
    home: {
      icon_menu: getThemeImage('icon-menu.png','home'),
      icon_service: getThemeImage('icon-service.png','home'),
      icon_gameType: getThemeImage('btn_dt_fenlei2.png','home'),

      bg_info: getThemeImage('bg_db_info.png','home'),
      // 模板二
      img_topBg: getThemeImage('home-top-bg.png','home'),
      img_topDown: getThemeImage('down_home.png','home'),
      img_topClose: getThemeImage('btn_close.png','home'),
      img_homeDown: getThemeImage('btn_top_down.png','home'),
      //
      img_gameTypeBg: getThemeImage('home_tab_bg.png','home'),
      img_noticebg: getThemeImage('noticebg.png','home'),
      img_gameTitleBg: getThemeImage('home_bg_youxi.png','home'),
      icon_email: getThemeImage('home_email_icon.png', 'home'),
      img_noticeBg: getThemeImage('img_top.png','home'),

      //模板五
      img_searchBtn: getThemeImage('img_sousuo.png','home'),
      icon_gameTypenew: getThemeImage('btn_fenlei_di2.png','home'),
      img_panda: getThemeImage('bg_changshang1.png','home'),
      treasureChest_1: getThemeImage('treasureChest_1.png','home'),
      treasureChest_2: getThemeImage('treasureChest_2.png','home'),
      treasureChest_3: getThemeImage('treasureChest_3.png','home'),
      treasureChest_4: getThemeImage('treasureChest_4.png','home'),
      img_18: getThemeImage('img_18.png','home'),
      img_IOS: getThemeImage('img_IOS.png','home'),
      img_Android: getThemeImage('img_Android.png','home'),
      img_bannertips: getThemeImage('banner_jiaobiao.png','home'),
      icon_fanye: getThemeImage('img_id_fanye.png','home'),
      icon_goTop: getThemeImage('btn_top.png','home'),
      
    },

    // 侧边栏图片
    aside:{
      bg_aside: getThemeImage('aside-bg.png','aside'),
      bg_kefu1: getThemeImage('homev2_menu_service_bg.png','aside'),
      bg_kefu2: getThemeImage('homev2_menu_share_bg.png','aside'),
      icon_recharge: getThemeImage('aside-recharge.png','aside'),
      icon_withdraw: getThemeImage('aside-withdrawal.png','aside'),

      //a default
      img_infocard: getThemeImage('home_card_bg.png','aside'),
      icon_copy: getThemeImage('home_left_copy.png','aside'),
      bg_deposito: getThemeImage('btn_deposito1.png','aside'),
      bg_deposito2: getThemeImage('btn_deposito2.png','aside'),
      icon_back: getThemeImage('home_btn_back.png','aside'),
      icon_lobby2: getThemeImage('Lobby2.png','aside'),
      icon_lobby3: getThemeImage('Lobby3.png','aside'),
      icon_down: getThemeImage('down.png','aside'),
      icon_close  : getThemeImage('colse.png','aside'),
      icon_promotion2: getThemeImage('Promotion2.png','aside'),
      icon_promotion3: getThemeImage('Promotion3.png','aside'),
      socialbg: getThemeImage('socialbg.png','aside'),

      img_changfenlei: getThemeImage('img_celan_k.png','aside'),
      img_hotgame_bg: getThemeImage('img_hotGame_bg.png','aside'),
      icon_hotfire: getThemeImage('img_hotfire.png','aside'),
    },
    
    //底部导航栏
    footer:{
      bg_footer: getThemeImage('tab-bg.png','footer'),
      icon_home1: getThemeImage('tab-home.png','footer'),
      icon_home2: getThemeImage('tab-home-a.png','footer'),
      icon_more1: getThemeImage('tab-more.png','footer'),
      icon_more2: getThemeImage('tab-more-a.png','footer'),
      icon_wallet1: getThemeImage('tab-wallet.png','footer'),
      icon_wallet2: getThemeImage('tab-wallet-a.png','footer'),
      icon_user1: getThemeImage('tab-user.png','footer'),
      icon_user2: getThemeImage('tab-user-a.png','footer'),
      icon_agent1: getThemeImage('tab-agent.png','footer'),
      icon_agent2: getThemeImage('tab-agent-a.png','footer'),
      icon_animation: getThemeImage('tab_animation.png','footer'),
      //a default
      icon_choose: getThemeImage('tab-bg-a.png','footer'),
      img_tabcenter1: getThemeImage('tabcenter1.png','footer'),
      img_tabcenter2: getThemeImage('tabcenter2.png','footer'),
      img_tabcenter3: getThemeImage('tabcenter3.png','footer'),
      img_tabcenter4: getThemeImage('tabcenter4.png','footer'),
      icon_acyivity: getThemeImage('aside-withdrawal.png','footer')
    },

    //签到功能
    sign: {
      bg_sign: getThemeImage('sign-bg.png','sign'),
      bg_light: getThemeImage('sign-day-light.png','sign'),
      //正常签到背景
      bg_daysign1: getThemeImage('sign-day-bg-1.png','sign'),
      bg_daysign2: getThemeImage('sign-day-check-1.png','sign'),
      bg_daysign3: getThemeImage('sign-day-done-1.png','sign'),
      //第七天签到背景
      bg_day7sign1: getThemeImage('sign-day-bg-2.png','sign'),
      bg_day7sign2: getThemeImage('sign-day-check-2.png','sign'),
      bg_day7sign3: getThemeImage('sign-day-done-2.png','sign'),
      //签到奖励图标
      icon_coin1: getThemeImage('sign-day-1.png','sign'),
      icon_coin2: getThemeImage('sign-day-2.png','sign'),
      icon_coin3: getThemeImage('sign-day-3.png','sign'),
      icon_coin4: getThemeImage('sign-day-4.png','sign'),
      icon_coin5: getThemeImage('sign-day-5.png','sign'),
      icon_coin6: getThemeImage('sign-day-6.png','sign'),
      icon_coin7: getThemeImage('sign-day-7.png','sign'),

      icon_gou: getThemeImage('sign-gou.png','sign'),
    },

    //通行证
    pass: {
      bg_pass: getThemeImage('bg_01.png','pass'),
      bg_info: getThemeImage('bg_02.png','pass'),
      bg_wind: getThemeImage('bg_tanchuang.png','pass'),

      btn_shop: getThemeImage('btn_shop.png','pass'),
      img_choose: getThemeImage('img_guang.png','pass'),
      img_gray: getThemeImage('img_guang1.png','pass'),
      img_pay: getThemeImage('img_yigou.png','pass'),
      img_cardbg: getThemeImage('pass_card_bg.png','pass'),
      img_passbg: getThemeImage('img_passe.png','pass'),
      img_itembgdef: getThemeImage('img_guang6.png','pass'),
      img_itembg1: getThemeImage('text01.png','pass'),
      img_itembg2: getThemeImage('text02.png','pass'),
      img_lihua: getThemeImage('img_guang2.png','pass'),

      icon_gold: getThemeImage('coin1.png','pass'),
      icon_gou: getThemeImage('img_hou.png','pass'),
      icon_suo: getThemeImage('img_suo.png','pass'),

      text_aposta: getThemeImage('text_1.png','pass'),
      text_deposito: getThemeImage('text_2.png','pass'),
      text_entrar: getThemeImage('text_3.png','pass'),

    },

    //幸运转盘
    luckywheel:{

      bg_wheel1: getThemeImage('turntable_middle_pg_1.png','luckywheel'),
      bg_wheel2: getThemeImage('turntable_middle_pg_2.png','luckywheel'),
      bg_wheel3: getThemeImage('turntable_middle_pg_3.png','luckywheel'),

      img_wheel1: getThemeImage('turntable_middle_yin.png','luckywheel'),
      img_wheel2: getThemeImage('turntable_middle_jin.png','luckywheel'),
      img_wheel3: getThemeImage('turntable_middle_zuan.png','luckywheel'),

      pointer: getThemeImage('turntable_middle_zhizhen_disable.png','luckywheel'),

      img_title: getThemeImage('img_tib.png','luckywheel'),
      text_roda: getThemeImage('text.png','luckywheel'),
      icon_sign: getThemeImage('sign_icon.png','luckywheel'),
      icon_jifen: getThemeImage('img_jifen.png','luckywheel'),

      btn_type1: getThemeImage('turntable_button_original_1.png','luckywheel'),
      btn_type1_s: getThemeImage('turntable_button_select_1.png','luckywheel'),
      btn_type2: getThemeImage('turntable_button_original_2.png','luckywheel'),
      btn_type2_s: getThemeImage('turntable_button_select_2.png','luckywheel'),
      btn_type3: getThemeImage('turntable_button_original_3.png','luckywheel'),
      btn_type3_s: getThemeImage('turntable_button_select_3.png','luckywheel'),
      cardbg:getThemeImage('cardbg.png','luckywheel'),

      m5_page_bg:getThemeImage('bg.png','luckywheel'),

    },

    //Daypay
    daypay: {
      img_daypay: getThemeImage('bg.png','daypay'),
      img_time: getThemeImage('img_time.png','daypay'),
    },

    //Sevendayback
    sevendayback: {
      img_sevendayback: getThemeImage('sevendayback_bg.png','sevendayback'),
      img_infobg: getThemeImage('sevendayback_content.png','sevendayback'),
      img_itembg: getThemeImage('sevendayback_item.png','sevendayback'),

      icon_day1: getThemeImage('sevendayback_lv1.png','sevendayback'),
      icon_day2: getThemeImage('sevendayback_lv2.png','sevendayback'),
      icon_day3: getThemeImage('sevendayback_lv3.png','sevendayback'),
      icon_day4: getThemeImage('sevendayback_lv4.png','sevendayback'),
      icon_day5: getThemeImage('sevendayback_lv5.png','sevendayback'),
      icon_day6: getThemeImage('sevendayback_lv6.png','sevendayback'),
      icon_day7: getThemeImage('sevendayback_lv7.png','sevendayback'),
      icon_gold1: getThemeImage('sevendayback_baoxiang.png','sevendayback'),
      icon_gold2: getThemeImage('sevendayback_expired.png','sevendayback'),
      btn_get: getThemeImage('sevendayback_btn.png','sevendayback'),
    },

    //mysteriousgold
    mysteriousgold:{
      img_mystd: getThemeImage('mysterious-bg.png','mysteriousgold'),
      img_laba: getThemeImage('mysterious-laba.png','mysteriousgold'),
      img_gold: getThemeImage('mysterious-baoxiang.png','mysteriousgold'),

      icon_day1: getThemeImage('mysterious-day1.png','mysteriousgold'),
      icon_day2: getThemeImage('mysterious-day2.png','mysteriousgold'),
      icon_day3: getThemeImage('mysterious-day3.png','mysteriousgold'),
      icon_day4: getThemeImage('mysterious-day4.png','mysteriousgold'),
      icon_day5: getThemeImage('mysterious-day5.png','mysteriousgold'),

      icon_arrow: getThemeImage('mysterious-arrow.png','mysteriousgold'),
      icon_card: getThemeImage('mysterious-card.png','mysteriousgold'),
      icon_user: getThemeImage('mysterious-user.png','mysteriousgold'),
      icon_time: getThemeImage('mysterious-time.png','mysteriousgold'),
      icon_gold: getThemeImage('mysterious-gold.png','mysteriousgold'),

      icon_yes:getThemeImage('mysterious-yes.png','mysteriousgold'),
      icon_no:getThemeImage('mysterious-no.png','mysteriousgold'),
      card_bg:getThemeImage('bg_minsterioso.png','mysteriousgold'),
      
    },

    //greatoffer
    greatoffer:{
      img_greatoffer: getThemeImage('great_offer_banner.png','greatoffer'),
      img_timetwobg: getThemeImage('great_offer_countdowntwo.png','greatoffer'), 
      img_timeendbg: getThemeImage('great_offer_endtime.png','greatoffer'), 
      img_timebg: getThemeImage('great_offer_countdown.png','greatoffer'), 
      img_titlebg: getThemeImage('great_offer_recharge_title.png','greatoffer'), 
      img_itembg: getThemeImage('great_offer_recharge_item.png','greatoffer'), 
      img_libao: getThemeImage('img_libao.png','greatoffer'),
      img_tib: getThemeImage('img_tib.png','greatoffer'),
    },

    //老转盘lucky
    lucky:{
      img_luckybg: getThemeImage('draw-bg.png','lucky'),
      img_luckywheel: getThemeImage('draw-pen.png','lucky'),
      img_shipin: getThemeImage('draw-shipin.png','lucky'),
      img_pointer: getThemeImage('draw-pointer.png','lucky'),

      img_restbg: getThemeImage('draw-resbg.png','lucky'),
      img_resitem: getThemeImage('draw-resimg.png','lucky'),
      img_resbtn: getThemeImage('draw-resbtn.png','lucky'),
      img_light1: getThemeImage('draw-light-1.png','lucky'),
      img_light2: getThemeImage('draw-light-2.png','lucky'),

      text_l: getThemeImage('draw-l.png','lucky'),
      text_l_a: getThemeImage('draw-l-a.png','lucky'),
      text_u: getThemeImage('draw-u.png','lucky'),
      text_u_a: getThemeImage('draw-u-a.png','lucky'),
      text_c: getThemeImage('draw-c.png','lucky'),
      text_c_a: getThemeImage('draw-c-a.png','lucky'),
      text_k: getThemeImage('draw-k.png','lucky'),
      text_k_a: getThemeImage('draw-k-a.png','lucky'),
      text_y: getThemeImage('draw-y.png','lucky'),
      text_y_a: getThemeImage('draw-y-a.png','lucky'),

      icon_money:getThemeImage('draw-money.png','lucky'),
      // 模板二新增
      bg_lucky: getThemeImage('draw-card.png','lucky'),
      bg_box: getThemeImage('boxbg.png','lucky'),
      bg_boxLight: getThemeImage('boxbgLinght.png','lucky'),

      m5_bg_img:getThemeImage('draw-bigbg.png','lucky'),
      m5_luckymodelbg:getThemeImage('draw-luckybg.png','lucky'),
    },

    //代理agetn
    agent:{
      img_agentbg: getThemeImage('agent_banner.png','agent'),
      img_invite: getThemeImage('agent-invite.png','agent'),

      icon_fq1: getThemeImage('faq-5-h1.png','agent'),
      icon_fq2: getThemeImage('faq-5-h2.png','agent'),
      icon_fq3: getThemeImage('faq-5-h3.png','agent'),
      icon_fq4: getThemeImage('faq-5-h4.png','agent'),
      icon_fq5: getThemeImage('faq-5-h5.png','agent'),
      icon_fq6: getThemeImage('faq-5-h6.png','agent'),
      icon_fq7: getThemeImage('faq-5-h7.png','agent'),

      icon_fqt: getThemeImage('faq-5-t.png','agent'),
      icon_fqtl: getThemeImage('faq-5-tl.png','agent'),
      icon_fqtr: getThemeImage('faq-5-tr.png','agent'),
      // 模板二新增
      icon_date: getThemeImage('agent-data-riqi.png','agent'),
      icon_dowm: getThemeImage('agent-down-icon.png','agent'),
      // m4新增
      icon_dash: getThemeImage('img_dash.png','agent'),
      icon_dash_active: getThemeImage('img_dash1.png','agent'),
      icon_faq: getThemeImage('img_faq.png','agent'),
      icon_faq_active: getThemeImage('img_faq1.png','agent'),
      icon_invi: getThemeImage('img_invi.png','agent'),
      icon_invi_active: getThemeImage('img_invi1.png','agent'),
      icon_members: getThemeImage('img_members.png','agent'),
      icon_members_active: getThemeImage('img_members1.png','agent'),
      icon_rewards: getThemeImage('img_rewards.png','agent'),
      icon_rewards_active: getThemeImage('img_rewards1.png','agent'),

      icon_ag01: getThemeImage('icon_ag01.png','agent'),
      icon_ag02: getThemeImage('icon_ag02.png','agent'),
      icon_ag03: getThemeImage('icon_ag03.png','agent'),
      icon_ag04: getThemeImage('icon_ag04.png','agent'),
      icon_ag05: getThemeImage('icon_ag05.png','agent'),

      icon_ag01_active: getThemeImage('icon_ag01_1.png','agent'),
      icon_ag02_active: getThemeImage('icon_ag02_1.png','agent'),
      icon_ag03_active: getThemeImage('icon_ag03_1.png','agent'),
      icon_ag04_active: getThemeImage('icon_ag04_1.png','agent'),
      icon_ag05_active: getThemeImage('icon_ag05_1.png','agent'),


      type_01: getThemeImage('agent_type1.png','agent'),
      type_02: getThemeImage('agent_type2.png','agent'),
      type_03: getThemeImage('agent_type3.png','agent'),
      type_04: getThemeImage('agent_type4.png','agent'),

      img_agentrule: getThemeImage('agent_rule.png','agent'),
      img_agentwin: getThemeImage('agent_win.png','agent'),

      img_m5dash:getThemeImage('img_dash.png','agent'),
    },

    //giftcode
    giftcode:{
      img_giftcodebg: getThemeImage('giftcode-bg.png','giftcode'),
      img_giftlink: getThemeImage('giftcode-link.png','giftcode'),
      bg_card1: getThemeImage('giftcode-cardbg1.png','giftcode'),
      bg_card2: getThemeImage('giftcode-cardbg2.png','giftcode'),

      img_membergiftbg: getThemeImage('membergift-bg.png','giftcode'),
      img_membergiftvip: getThemeImage('icon.png','giftcode'),
      img_membergiftdate: getThemeImage('img_date.png','giftcode'),
      img_membergiftmoney: getThemeImage('img_money.png','giftcode'),
      img_membergifttime: getThemeImage('img_time.png','giftcode'),
    },

    //totalrecharge
    totalrecharge:{
      img_totalrechargebg: getThemeImage('totalrecharge-bg.png','totalrecharge'),
      img_itembg: getThemeImage('totalrecharge-item-bg.png','totalrecharge'),
      img_itembg2: getThemeImage('totalrecharge-item-bg-2.png','totalrecharge'),
      img_itemcoin: getThemeImage('totalrecharge-coin.png','totalrecharge'),
      img_qiandao: getThemeImage('icon_qiandao.png','totalrecharge'),
      
      
    },

    //vip
    vip:{
      img_vipbg: getThemeImage('vip-bg.png','vip'),
      icon_vip: getThemeImage('vip_icon.png','vip'),
      img_itembg: getThemeImage('vip-content.png','vip'),
      img_itembg2: getThemeImage('vip-content2.png','vip'),
      m4_icon1: getThemeImage('mine-vip-gold.png','vip'),
      m4_bg2:getThemeImage('bg_vip1.png','vip'),
      m4_icon2:getThemeImage('vip.png','vip'),
      m4_icon3:getThemeImage('img_vip1.png','vip'),
      m4_icon4:getThemeImage('img_vip2.png','vip'),
      m4_icon5:getThemeImage('right.png','vip'),

      
      
    },

    //washcode
    washcode:{
      img_washcodebg: getThemeImage('washcode_bg.png','washcode'),
      icon_wcmoney: getThemeImage('washcode_money.png','washcode'),
      img_title:getThemeImage('washcode_tableheader.png','washcode'),
      img_bg:getThemeImage('bg_1.png','washcode'),
    },

    //rescue
    rescue:{
      img_rescuefund: getThemeImage('rescue-fund-bg.png','rescue'),
      img_rescueweek: getThemeImage('rescue-week-bg.png','rescue'),
      img_weekitembg: getThemeImage('rescue-week-itembg.png','rescue'),
      img_funditembg: getThemeImage('rescue-fund-itembg.png','rescue'),
      img_hand: getThemeImage('rescue-fund-hand.png','rescue'),
      img_bounds: getThemeImage('rescue-fund-bouns.png','rescue'),
      
    },

    //treasure 宝箱
    treasure:{
      img_treasure: getThemeImage('box-bg.png','treasure'),
      img_item1: getThemeImage('box-item-1.png','treasure'),
      img_item2: getThemeImage('box-item-2.png','treasure'),
      img_item3: getThemeImage('box-item-3.png','treasure'),

      icon_coins: getThemeImage('discount-coins.png','treasure'),
      icon_right: getThemeImage('box_jiantou.png','treasure'),
      icon_jiantou1: getThemeImage('box_jiantou4.png','treasure'),
      icon_jiantou2: getThemeImage('box_jiantou2.png','treasure'),
      icon_jiantou3: getThemeImage('box_jiantou3.png','treasure'),
      box_item_bg: getThemeImage('box_item_bg.png','treasure'),
      icon_user: getThemeImage('box_user.png','treasure'),

      icon_more: getThemeImage('btn_xiala.png','treasure'),
      icon_gou: getThemeImage('img_gou.png', 'treasure')
    },

    //pwa 
    pwa:{
      img_info: getThemeImage('bg_pwa1.png','pwa'),
      img_top: getThemeImage('down-devel.png','pwa'),
      img_gg: getThemeImage('down-google.png','pwa'),

      icon_down: getThemeImage('down-paw-install.png','pwa'),
      icon_time: getThemeImage('down-time.webp','pwa'),
      icon_avatar1: getThemeImage('down-avatar-1.webp','pwa'),
      icon_avatar2: getThemeImage('down-avatar-2.webp','pwa'),
      icon_avatar3: getThemeImage('down-avatar-3.webp','pwa'),

      img_guideapp: getThemeImage('guide_app.png','pwa'),
      img_guideios: getThemeImage('down-ios-guide.png','pwa'),

      //guide
      img_guidebg:getThemeImage('bg_pwa.png','pwa'),
      img_receivebg:getThemeImage('bg_pwa_receive.png','pwa'),
      btn_agora:getThemeImage('btn_agora.png','pwa'),
      btn_service:getThemeImage('btn_service.png','pwa'),
    },

    //pdd
    pdd:{
      img_pddbg: getThemeImage('wheel-pen-bg.png','pdd'),
      img_spinbg: getThemeImage('spinBg.png','pdd'),
      
      img_light1: getThemeImage('wheel-pen-light1.png','pdd'),
      img_light2: getThemeImage('wheel-pen-light2.png','pdd'),
      img_light3: getThemeImage('bg_zp5.png','pdd'),
     
      img_spinrow: getThemeImage('wheel-pen-down.png','pdd'),
      img_pointer: getThemeImage('wheel-pen-pointer.png','pdd'),

      icon_sacar:getThemeImage('wheel-sacar.png','pdd'),
      icon_star:getThemeImage('wheel-star.png','pdd'),

      img_sharebg: getThemeImage('pdd_share.png','pdd'),
      img_tanchuang: getThemeImage('bg_tanchuang01.png','pdd'),
      
      icon_sms:getThemeImage('io_sms.png','pdd'),
      // 模板二新加
      icon_turntable1:getThemeImage('wheel-money-1.png','pdd'),
      icon_turntable2:getThemeImage('wheel-star.png','pdd'),
      icon_turntable3:getThemeImage('wheel-cash-6.png','pdd'),
      icon_turntable4:getThemeImage('wheel-gold.png','pdd'),
      icon_turntable5:getThemeImage('wheel-gold-1.png','pdd'),
      icon_turntable6:getThemeImage('wheel-cash-100.png','pdd'),
      icon_turntable7:getThemeImage('wheel-cash-100-1.png','pdd'),
      icon_turntable8:getThemeImage('wheel-cash-50.png','pdd'),
      icon_turntable9:getThemeImage('wheel-cash-50-1.png','pdd'),
      icon_turntable10:getThemeImage('wheel-cash-sacar.png','pdd'),
      icon_clock:getThemeImage('wheel-time.png','pdd'),
      bg_card:getThemeImage('wheel-card.png','pdd'),
      bg_card1:getThemeImage('wheel-card1.png','pdd'),
      bg_card2:getThemeImage('wheel-card2.png','pdd'),

      //pdd弹窗
      bg_tc:getThemeImage('pdd_tc_bg.png','pdd'),

      m5_bg:getThemeImage('bg.png','pdd')
     
    },

    //redpacket
    redpacket:{
      img_title:getThemeImage('red-pakage-title.png','redpacket'),
      img_redpacketbg1:getThemeImage('red-pakage-bg.png','redpacket'),
      img_redpacketbg2:getThemeImage('rainv2_bg2.png','redpacket'),
      img_red:getThemeImage('red.png','redpacket'),
      icon_close:getThemeImage('rainv2_close.png','redpacket'),
      icon_money1:getThemeImage('red-pakage-1.png','redpacket'),
      icon_money2:getThemeImage('red-pakage-2.png','redpacket'),
      icon_money3:getThemeImage('red-pakage-3.png','redpacket'),
      icon_money4:getThemeImage('red-pakage-4.png','redpacket'),
      icon_time:getThemeImage('redbag_time.png','redpacket')
    },


    //个人信息mine
    mine:{
      img_minebg: getThemeImage('mine-top-bg.png','mine'), 
      img_vipcard1: getThemeImage('mine-vip-card-1.png','mine'), 
      img_vipcard2: getThemeImage('mine-vip-card-2.png','mine'), 

      icon_vip: getThemeImage('mine-vip-gold.png','mine'), 
      icon_set: getThemeImage('nav-set.png','mine'), 
      icon_record: getThemeImage('nav-gamelogs.png','mine'), 
      icon_more: getThemeImage('nav-more.png','mine'), 
      icon_service: getThemeImage('nav-service.png','mine'), 
      icon_exit: getThemeImage('nav-exit.png','mine'), 
      icon_msg: getThemeImage('nav-email.png','mine'), 
      icon_moneylist: getThemeImage('btn_saque.png','mine'),
      bg_vip1: getThemeImage('bg_vip1.png','mine'),
      vip0: getThemeImage('img_vip0.png','mine'),
      vip1: getThemeImage('img_vip1.png','mine'),
      vip2: getThemeImage('img_vip2.png','mine'),
      vip3: getThemeImage('img_aff.png','mine'),
      vip4: getThemeImage('img_more.png','mine'),
      vip5: getThemeImage('img_coin.png','mine'),
      img_link: getThemeImage('img_link.png','mine'),
      btncopy: getThemeImage('btncopy.png','mine'),
      // m4新增
      profile_name: getThemeImage('set06.png','mine'),
      profile_id: getThemeImage('set01.png','mine'),
      profile_card: getThemeImage('set02.png','mine'),
      profile_phone: getThemeImage('set03.png','mine'),
      profile_email: getThemeImage('set04.png','mine'),
      profile_password: getThemeImage('set05.png','mine'),
      profile_edit: getThemeImage('set07.png','mine'),
      profile_copy: getThemeImage('set08.png','mine'),
      icon_right1: getThemeImage('img_fanye4.png','mine'),
      icon_right2: getThemeImage('right.png','mine'),
      //m5
      icon_copy: getThemeImage('btn_copy.png','mine'),
      icon_pig: getThemeImage('pig_img.png','mine'),
      icon_saque: getThemeImage('img_saque.png','mine'),
      top_bg: getThemeImage('bg1.png','mine'),
      img_vipcard3: getThemeImage('mine-vip-card-3.png','mine'),
      bg_vipcard: getThemeImage('vip-bg1.png','mine'),
      icon_vip1: getThemeImage('vip1.png','mine'),
      icon_vip2: getThemeImage('vip2.png','mine'),
      icon_vip3: getThemeImage('vip3.png','mine'),
      icon_vip4: getThemeImage('vip4.png','mine'),
      icon_vip5: getThemeImage('vip5.png','mine'),
      icon_vip6: getThemeImage('vip6.png','mine'),
      icon_vipkuang1: getThemeImage('vip-kuang1.png','mine'),
      icon_vipkuang2: getThemeImage('vip-kuang2.png','mine'),
      icon_vipkuang3: getThemeImage('vip-kuang3.png','mine'),
      icon_vipkuang4: getThemeImage('vip-kuang4.png','mine'),
      icon_vipkuang5: getThemeImage('vip-kuang5.png','mine'),
      icon_vipkuang6: getThemeImage('vip-kuang6.png','mine'),
      img_money: getThemeImage('img_money.png','mine'),
      img_support: getThemeImage('img_gr2.png','mine'),
      img_warn: getThemeImage('img_tib.png','mine'),
      img_serverbg: getThemeImage('img_kefupao.png','mine'),
    },

    //norecharge
    norecharge:{
      img_bg: getThemeImage('nor-bg.jpg','norecharge'),
      img_title: getThemeImage('nor-title.png','norecharge'),
      img_dot: getThemeImage('nor-dot.png','norecharge'),
    },

    //排行榜
    jprank:{
      img_rankbg: getThemeImage('bgtop.png','jprank'),
      img_hrankbg:getThemeImage('bg1_red.png','jprank'),

      img_jpbg: getThemeImage('img_jiangjin.png','jprank'),
      img_infobg: getThemeImage('bg1.png','jprank'),

      img_itembg: getThemeImage('img_paiming.png','jprank'),
      img_flight: getThemeImage('rank_light.png','jprank'),

      img_tanchuang: getThemeImage('tanchuang.png','jprank'),
      img_nodata:getThemeImage('nodata.png','jprank'),

      img_timebg1: getThemeImage('img_time1.png','jprank'),
      img_timebg2: getThemeImage('img_time2.png','jprank'),
      img_timebg3: getThemeImage('img_time3.png','jprank'),

      //gif
      gif_coin: getThemeImage('coin.gif','jprank'),
      gif_jp: getThemeImage('icon_jackpot.gif','jprank'),
      gif_no1: getThemeImage('sp_no1.gif','jprank'),
      gif_no2: getThemeImage('sp_no2.gif','jprank'),
      gif_no3: getThemeImage('sp_no3.gif','jprank'),

      //icon
      icon_user: getThemeImage('icon.png','jprank'),
      icon_money: getThemeImage('img_coin.png','jprank'),
      icon_time: getThemeImage('img_time.png','jprank'),

      //btn
      btn_gift: getThemeImage('btn_gift.png','jprank'),
      btn_history: getThemeImage('btn_hostory.png','jprank'),
      btn_rule: getThemeImage('btn_rule.png','jprank'),
      bg_bottom: getThemeImage('bg_passe.png','jprank'),
      

    },
     //登录注册
     login:{
      img_bg: getThemeImage('login-bg.png','login'),
      icon_password: getThemeImage('login-password.png','login'),
      icon_tag: getThemeImage('img_5.png','login'),
      icon_password_off: getThemeImage('login-password-off.png','login'),
      icon_password_on: getThemeImage('login-password-on.png','login'),
      icon_password_phone: getThemeImage('login-password-phone.png','login'),
      icon_flag_br: getThemeImage('flag-br.png','login'),
      icon_colse:getThemeImage('btn_close.png','login'),
      icon_flagsmall_br: getThemeImage('img_flagsmall.png','login'),
      
    },
    // 投注七天签到活动
    bettingCheckIn:{
      img_bg: getThemeImage('bg.png','bettingCheckIn'),
      coin1: getThemeImage('coin01.png','bettingCheckIn'),
      coin2: getThemeImage('coin02.png','bettingCheckIn'),
      coin3: getThemeImage('coin03.png','bettingCheckIn'),
      coin4: getThemeImage('coin04.png','bettingCheckIn'),
      coin5: getThemeImage('coin05.png','bettingCheckIn'),
      coin6: getThemeImage('coin06.png','bettingCheckIn'),
      img_dj: getThemeImage('img_dengji.png','bettingCheckIn'),
      img_djbg: getThemeImage('img_dengji_bg.png','bettingCheckIn'),
      icon_pontos1: getThemeImage('img_dengji_bg3.png','bettingCheckIn'),
      icon_pontos2: getThemeImage('img_dengji_bg4.png','bettingCheckIn'),
      item_bg1: getThemeImage('img_jiangli01.png','bettingCheckIn'), 
      item_bg2: getThemeImage('img_jiangli02.png','bettingCheckIn'), 
      item_bg3: getThemeImage('img_jiangli03.png','bettingCheckIn'), 
      item_bg4: getThemeImage('img_jiangli04.png','bettingCheckIn'), 
      icon_lv1: getThemeImage('lv1.png','bettingCheckIn'),
      icon_lv2: getThemeImage('lv2.png','bettingCheckIn'),
      icon_lv3: getThemeImage('lv3.png','bettingCheckIn'),
      icon_lv4: getThemeImage('lv4.png','bettingCheckIn'),
      icon_lv5: getThemeImage('lv5.png','bettingCheckIn'),
      icon_lv6: getThemeImage('lv6.png','bettingCheckIn'),
      icon_gou: getThemeImage('gou.png','bettingCheckIn'),
      img_checkinbg: getThemeImage('bg1.png','bettingCheckIn'),
      icon_tibi: getThemeImage('img_tib.png','bettingCheckIn'),
      icon_expirado: getThemeImage('img_expirado.png','bettingCheckIn'),

      icon_dia1: getThemeImage('Dia1.png','bettingCheckIn'),
      icon_dia2: getThemeImage('Dia2.png','bettingCheckIn'),
      icon_dia3: getThemeImage('Dia3.png','bettingCheckIn'),
      icon_dia4: getThemeImage('Dia4.png','bettingCheckIn'),
      icon_dia5: getThemeImage('Dia5.png','bettingCheckIn'),
      icon_dia6: getThemeImage('Dia6.png','bettingCheckIn'),
    },
    // 会员答谢日
    monthlybetting:{
      img_bg: getThemeImage('bg.png','monthlybetting'),
      btn1: getThemeImage('btn_green1.png','monthlybetting'),
      btn2: getThemeImage('btn_green2.png','monthlybetting'),
      btn3: getThemeImage('btn_pink.png','monthlybetting'),
      btn4: getThemeImage('btn_pink2.png','monthlybetting'),
      img_down: getThemeImage('img_down.png','monthlybetting'),
      img_game: getThemeImage('img_game.png','monthlybetting'),
      img_slots: getThemeImage('img_slots.png','monthlybetting'),
      img_time: getThemeImage('img_time.png','monthlybetting'),
      phb_1: getThemeImage('phb_01.png','monthlybetting'),
      phb_2: getThemeImage('phb_02.png','monthlybetting'),
      phb_3: getThemeImage('phb_03.png','monthlybetting'),
      img_tcbg: getThemeImage('tc_lie.png','monthlybetting'),
      img_topbg: getThemeImage('top_lie.png','monthlybetting'),
      img_item_bg: getThemeImage('img_slots1.png','monthlybetting'),
    },
    memberDay:{
      img_bg: getThemeImage('bg.png','memberday'),
      img_date: getThemeImage('img_date.png','memberday'),
      img_money: getThemeImage('img_money.png','memberday'),
      img_time: getThemeImage('img_time.png','memberday'),
    },
    worldCup:{
      img_mainbg: getThemeImage('bg_top.png','worldcup'),
      img_bg1: getThemeImage('bg1.png','worldcup'),
      img_bg2: getThemeImage('bg2.png','worldcup'),
      img_bggroup: getThemeImage('bg_group.png','worldcup'),
      btn_close: getThemeImage('btn_close.png','worldcup'),
      btn_enviar: getThemeImage('btn_enviar.png','worldcup'),
      btn_mudar: getThemeImage('btn_mudar.png','worldcup'),
      btn_receber: getThemeImage('btn_receber.png','worldcup'),
      btn_receber1: getThemeImage('btn_receber1.png','worldcup'),
      img_coin1: getThemeImage('img_coin1.png','worldcup'),
      img_jinji: getThemeImage('img_jinji.png','worldcup'),
      img_ling_di: getThemeImage('img_ling_di.png','worldcup'),
      img_terminou: getThemeImage('img_terminou.png','worldcup'),
      img_time: getThemeImage('img_time.png','worldcup'),
      img_time1: getThemeImage('img_time1.png','worldcup'),
      img_time2: getThemeImage('img_time2.png','worldcup'),
      img_vs0: getThemeImage('img_vs0.png','worldcup'),
      img_vs1: getThemeImage('img_vs1.png','worldcup'),
      img_vs2: getThemeImage('img_vs2.png','worldcup'),
      img_yuan1: getThemeImage('img_yuan1.png','worldcup'),
      img_yuan2: getThemeImage('img_yuan2.png','worldcup'),
      img_light: getThemeImage('img_light.png','worldcup'),
      group8_banner:getThemeImage('group8_banner.png','worldcup'),
      group8text: getThemeImage('group8text.png','worldcup'),
      img_group8_1:getThemeImage('group_8_1.png','worldcup'),
      img_group8_2:getThemeImage('group_8_2.png','worldcup'),
      group16_banner:getThemeImage('group16_banner.png','worldcup'),
      group16text: getThemeImage('group16text.png','worldcup'),
      img_group16_1:getThemeImage('group_16_1.png','worldcup'),
      img_group16_2:getThemeImage('group_16_2.png','worldcup'),
      group32_banner:getThemeImage('group32_banner.png','worldcup'),
      group32text: getThemeImage('group32text.png','worldcup'),
      img_group32_1:getThemeImage('group_32_1.png','worldcup'),
      img_group32_2:getThemeImage('group_32_2.png','worldcup'),
      group0_banner:getThemeImage('group0_banner.png','worldcup'),
      group0text: getThemeImage('group0text.png','worldcup'),
      img_group0_1:getThemeImage('group_fase1.png','worldcup'),
      img_group0_2:getThemeImage('group_fase2.png','worldcup'),
    }

  })

  return themeImagesCache
}
