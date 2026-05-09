import { ref, computed, onMounted, onActivated, onDeactivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { openServiceFunc, indexLoadingShowRef, openLoginFunc,footShowRef,NoticeShowRef,isPwaRef, hasLoadedDataRef,getStorage,gameModeType } from '@/utils/config'
import { playBtnAudioFunc,useBubbleTop} from '@/utils/core'
import { routeToViewFunc } from '@/model/basic'
import { isAuthRef, msgUnReadCountRef, userModel, noRechargeShowRef, pwaLoginFunc,authRef} from '@/model/user'
import { gameAllShowRef, gameAllCateId, gameModel } from '@/model/game'
import { signInModel, redPakageDataRef, redPakageModel,DayPayModel} from '@/model/other'
import { rechargeModel } from '@/model/account'
import { getPwaPageConfigFunc, gameLogo} from '@/model/pwa'
import { socialMenuListRef} from '@/model/common'
// import { useJackpotModel } from '@/model/jackpot'
import { getCommonConfigFunc,getRedPot,redPotCountRef,bannerListRef,activityListRef,buoyListRef,jpLobbyInfo,marqueeRef,footerTextRef,navListRef,isOpenEnterRef,BuoyModel,getNoticeConfig,getBatchReceive} from '@/model/common'
const { getBuoyListFunc } = BuoyModel()
export function useHome() {
	// 共用的状态
	const aside_show = ref(false)
	const showActivityPop = ref(false)
	const showSearch = ref(false)

	const game_cover_index = ref(0)

	const route = useRoute()
	const router = useRouter()

	// 共用的模型实例
	const { memberRef, userInfoFunc, userNoRechargeFunc } = userModel()
	// const { navListRef, getHomeNavFunc,isOpenEnterRef } = configMOdel()
	// const { bannerListRef, getBannerFunc } = bannerModel()
	const { signConfigRef, signConfigFunc,isSignInRef } = signInModel()
	const { redPakageDataFunc } = redPakageModel()
	const { callbackFbRechargeFunc } = rechargeModel()
	const { gameListRef, gameListFunc,gameLogFunc } = gameModel()
	const { bubbleTopRef, bubbleTopAltRef } = useBubbleTop()
	// const { getSocialListFunc } = SocialModel()
	// const { jpLobbyInfo, getJpLobbyInfo} = useJackpotModel()

	const home_mode = computed(()=> {
		let val = 0
		if(!route.query.sdmode) {
			val = route.query.sdmode
		}else {
			let url = window.location.href;
			if (url.indexOf("?") != -1) {
				let urls = url.split('?')
				if (urls.length >= 2) {
					for (let i = 1;i < urls.length;i++) {
						let temp = urls[i];
						temp = temp.replace('#/','');
						if (url.indexOf('sdmode=4') > -1) {
							val = 4
						}
                        if (url.indexOf('sdmode=3') > -1) {
                            val = 3
                        }
                        if (url.indexOf('sdmode=2') > -1) {
                            val = 2
                        }
					}
				}
			}
		}
        gameModeType.value = val
		footShowRef.value = val == 4 ? false : true
		isPwaRef.value = val == 4 ? true : false
		return val
	})
    // 添加计算属性来获取 sort 值最小的项目
const sortedBuoyList = computed(() => {
    if (!buoyListRef.value || !Array.isArray(buoyListRef.value)) {
      return [];
    }
  
    // 按 location 分组
    const groupedByLocation = buoyListRef.value.reduce((groups, item) => {
      if (item.sort !== undefined && item.sort !== null) {
        const location = item.location;
        if (!groups[location]) {
          groups[location] = [];
        }
        groups[location].push(item);
      }
      return groups;
    }, {});
  
    // 对每个位置的数组按 sort 排序并取最小值
    const result = [];
    Object.keys(groupedByLocation).forEach(location => {
      const sortedItems = groupedByLocation[location].sort((a, b) => a.sort - b.sort);
      // 只取 sort 值最小的项目
      if (sortedItems.length > 0) {
        result.push(sortedItems[0]);
      }
    });
  
    return result;
  });
  
  
    // 共用的方法
    //游戏列表上页
    function gamePrevPage(index) {
        playBtnAudioFunc()
        gameListRef.value[index].prev ++
    }

    //游戏列表下页
    function gameNextPage(index) {
        playBtnAudioFunc()
        gameListRef.value[index].next ++
    }

    //banner点击
    function onclickBanner(item) {
        playBtnAudioFunc()
        if(item.link_type == 1) {
            routeToViewFunc(item.link).then(res => {
                if(res&&res.path) {
                    router.push(res.path)
                }
            })
        }else if(item.link_type == 2) {
            window.open(item.link)
        }
    }

    //打开全部游戏
    function openGameAll(id) {
        playBtnAudioFunc()
        gameAllShowRef.value = true
        gameAllCateId.value = id
    }

    // 打开通知
    function openNotice() {
        playBtnAudioFunc()
        NoticeShowRef.value = true
    }

    // 打开红包
    function openRedPakage(item) {
        //判断是否登录 
        // if(!isAuthRef.value) {
        //     playBtnAudioFunc()
        //     openLoginFunc(0)
        //     return
        // }
        playBtnAudioFunc()
        if(item.link.indexOf('/') !== -1) {
        window.open(item.link)
        }else{
            routeToViewFunc(item.link).then(res => {
                if(res&&res.path) {
                    router.push(res.path)
                }
            })
        }
    }

    // 打开侧边栏
    function openAisde() {
        playBtnAudioFunc()
        aside_show.value = true
    }

    // 打开客服
    function openService() {
        playBtnAudioFunc()
        openServiceFunc()
    }

    // 打开登录
    function toLogin() {
        playBtnAudioFunc()
        openLoginFunc(0)
    }

    // 打开注册
    function toRegister() {
        playBtnAudioFunc()
        openLoginFunc(1)
    }

    // 消息中心
    function toMessage(){
        playBtnAudioFunc()
        router.push('/article/message')
    }

    // 个人中心
    function toMine() {
        playBtnAudioFunc()
        if(isAuthRef.value) {
            router.push('/mine')
        }else {
            openLoginFunc(0)
        }
    }

    // 打开搜索游戏 
    const openSearch = () => {
        playBtnAudioFunc()
        showSearch.value = true
    }

    // 跳转大奖排行
    function goToJackpotsRank(){
        playBtnAudioFunc()
        router.push('/activity/jackpotrank')
    }

    // vue生命周期钩子
    var timer = null
    onMounted(()=> {
        // getHomeNavFunc(false),
        // getBannerFunc(),
        gameListFunc()
        gameLogFunc(home_mode.value)
        signConfigFunc(true)
        // 登录且签到完成后显示活动弹窗
        if (isAuthRef.value&&getStorage('isSignshow') ) {
            showActivityPop.value = true
        }
        // getSocialListFunc()
        getBuoyListFunc()
        getPwaPageConfigFunc()
        getCommonConfigFunc()
        if (isAuthRef.value) {
            getNoticeConfig()
        }

        //上报进入游戏
        window.jsBridge?.postMessage("enterGame", JSON.stringify({cid: window.ch,uid:memberLocal.value.id, phone: memberLocal.value.username}))

    })

    onActivated(async ()=> {
        //不是落地页
        if(home_mode.value != 4) {
            if(isAuthRef.value) {
                userInfoFunc()
                userNoRechargeFunc()
                callbackFbRechargeFunc()
                timer = setInterval(()=> {
                    userInfoFunc()
                }, 5000)
                 //红点数据
                getRedPot()
                //待领取
                getBatchReceive()
            }else {
                pwaLoginFunc()
                clearInterval(timer)
            }
            //获取红包数据
            redPakageDataFunc()
            //todo 如果把红点数据抽出来 就可以不用每次都获取
            // getHomeNavFunc(false)
            // getJpLobbyInfo()
            signConfigFunc()
        }
    })

    onDeactivated(()=> {
        //如果timer存在则清除
        if (timer) {
            clearInterval(timer)
            timer = null
        }
    })

  return {
    // 返回需要共享的状态和方法
    home_mode,
    aside_show,
    showSearch,
    isOpenEnterRef,
    showActivityPop,
    game_cover_index,
	indexLoadingShowRef,
	buoyListRef,
	isAuthRef, 
	msgUnReadCountRef,
	gameLogo,
    marqueeRef,
    footerTextRef,
	activityListRef,
    signConfigRef,
    memberRef,
    navListRef,
    bannerListRef,
    gameListRef,
    bubbleTopRef,
    bubbleTopAltRef,
    jpLobbyInfo,
    sortedBuoyList,
    NoticeShowRef,
    gamePrevPage,
    gameNextPage,
    onclickBanner,
    openSearch,
	openNotice,
	openRedPakage,
	openService,
    toLogin,
    toRegister,
    openAisde,
	toMessage,
	toMine,
	goToJackpotsRank,
    socialMenuListRef,
    isSignInRef,
    openGameAll
  }
}