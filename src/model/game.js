import { onMounted, ref, watch, getCurrentInstance } from 'vue'
import { $get, $post } from '@/request'
import router from '@/router'
import { useSessionStorage } from '@vueuse/core'
import { isAuthRef, memberLocal} from '@/model/user'
import { playBtnAudioFunc,isPwaFunc, isAndroid, isIOS} from '@/utils/core'
import { openLoginFunc,isEverLoginFunc } from '@/utils/config'

export var gameAllShowRef = ref(false)
export var gameAllCateId = ref('')
export var gameListRef = ref([])
export var gameCollectListRef = ref([])
export var gameUrlRef = useSessionStorage('gaurl', {})

export const $unit = import.meta.env.VITE_LOCALE || 'pt'

//选中游戏数据
export var logTypeRef = ref(0)
export var gameClickRef = ref({});

export function clearGameCollectFunc() {
    gameCollectListRef.value = []
    gameListRef.value.forEach(item => {
        item.games.forEach(eq => {
            eq.is_collect = false
        })
    })
}

export var isShowTerms = ref(false);
export function gameModel(init = { list: false, record: false, collect: false }) {
    // const router = useRouter()

    let page = ref(0)
    let pageSize = ref(20)
    let hashLoadingRef = ref(true)
    let finishedRef = ref(false)

    let gameDataRef = ref({})
    let gameLogsRef = ref([])
    let gameRecordListRef = ref([])

    //总下注次数 总下注额 总输赢
    const betAllRef = ref(0);
    const betTotalRef = ref(0);
    const winTotalRef = ref(0);


    watch(gameLogsRef, (newValue) => {
        let betAll = 0, betTotal = 0, winTotal = 0;
        if (newValue) {
            Object.values(newValue).forEach(item => {
                if (item?.times) betAll += Number(item.times);
                if (item?.bet_amount) betTotal += Math.abs(Number(item.bet_amount));
                if (item?.win_amount) winTotal += Number(item.win_amount);
            });
        }
        betAllRef.value = betAll;
        betTotalRef.value = betTotal;
        winTotalRef.value = winTotal;
    }, { deep: true }); // 深度监听对象变化

    // 时间映射表
    let hourMap = {
        1: 3,    // 3小时
        2: 12,   // 12小时
        3: 24,   // 24小时
        4: 48,   // 48小时
        5: 24*7  // 7天
    }
    async function gameLogFunc(model) {
        let group = 'h5'
        if(isPwaFunc()) {
            if(isAndroid()) {
                group = 'android_pwa'
            }else if(isIOS()) {
                group = 'ios_pwa'
            }
        }
        let params = { ch: window.ch, group: group, model: model || 1 }
        const res = await $get({ url: '/game/v1/game/log',params: params  }, {loading: false})
        if(res.code != 200) return
        if(res.data&&res.data.is_adult==1) {
            isShowTerms.value = true
        }
    }

    async function gameListFunc() {
        let params = { ch: window.ch}
        const res = await $get({ url: '/game/v1/game/index',params: params  }, {loading: true})
        if(res.code != 200) return
        let list = res.data || []
        list.forEach(item => {
            item.prev = 0
            item.next = 0
        });
        gameListRef.value = list
        getGameCollectFunc()
    }
    async function gameDetailFunc(id) {
        playBtnAudioFunc()
        if(!isAuthRef.value) {
            if(isEverLoginFunc()) {
                openLoginFunc(0)
            }else{
                openLoginFunc(1)
            }
            return
        }
        if(!id) return
        gameUrlRef.value = ''
        let params = { game_id: id, language : $unit == 'th'?'en':'pt' }
        const res = await $get({ url: '/game/v1/game/get-pop-game-url',params: params }, {loading: true,toast: false})
        if(res.code == 401) {
            //openLoginFunc(0)
            return
        }
        if(res.code != 200) return

        gameDataRef.value = res.data || {}
        gameUrlRef.value = res.data&&res.data.url
        if(gameUrlRef.value) {
            router.push('/game/detail')
        }
    }
    async function gameLogsFunc(_init) {
        if(_init) {
            page.value = 0
            finishedRef.value = false
            gameLogsRef.value = []
        }
        hashLoadingRef.value = true
        let data = {
            offset: page.value*pageSize.value,
            limit: pageSize.value
        }
        if(logTypeRef.value) {
            let hours = hourMap[logTypeRef.value] || 3
            let { start_time, end_time } = getTimeRange(hours)
            data.start_time = start_time
            data.end_time = end_time
        }

        const res = await $get({ url: '/game/v1/bet-record/index', params: data }, {loading: false})
        hashLoadingRef.value = false
        page.value ++
        if(res.code != 200) {
            finishedRef.value = true
            return
        }
        let list = res.data||[]
        finishedRef.value = list.length && list.length >= pageSize.value ? false : true
        gameLogsRef.value = [...gameLogsRef.value, ...list]
    }
    async function gameLogsByGameIdFunc(_init) {
        if(_init) {
            page.value = 0
            finishedRef.value = false
            gameLogsRef.value = []
        }
        hashLoadingRef.value = true
        let data = {
            offset: page.value*pageSize.value,
            limit: pageSize.value
        }
        if(logTypeRef.value) {
            let hours = hourMap[logTypeRef.value] || 3
            let { start_time, end_time } = getTimeRange(hours)
            data.start_time = start_time
            data.end_time = end_time
        }
        if(gameClickRef.value && gameClickRef.value.game_id) {
            data.game_id = gameClickRef.value.game_id
        }
        const res = await $get({ url: '/game/v1/bet-record/list', params: data }, {loading: false})
        hashLoadingRef.value = false
        page.value ++
        if(res.code != 200) {
            finishedRef.value = true
            return
        }
        let list = res.data.list||[]
        finishedRef.value = list.length && list.length >= pageSize.value ? false : true
        gameRecordListRef.value = [...gameRecordListRef.value, ...list]
    }

    async function getGameCollectFunc() {
        const res = await $get({ url: '/game/v1/game/favorite-list' }, {loading: false})
        if(res.code != 200) return
        gameCollectListRef.value = res.data || []
        gameListRef.value.forEach(item => {
            item.games.forEach(eq => {
                eq.is_collect = gameCollectListRef.value.some(e => e.game_id == eq.id)
            })
        })
    }
    async function takeGameCollectFunc(id, index, eq) {
        playBtnAudioFunc()
        const res = await $post({ url: '/game/v1/game/favorite', data: { game_id: id } }, {loading: true, toast: true})
        if(res.code == 401) {
            //openLoginFunc(0)
            return
        }
        if(res.code != 200) return
        const targetGame = gameListRef.value[index].games.find(g => g.id === id)
        if (targetGame) targetGame.is_collect = !targetGame.is_collect
        // gameListRef.value[index].games[eq].is_collect = !gameListRef.value[index].games[eq].is_collect
    }
    async function gameTransferOutFunc() {
        const res = await $get({ url: '/game/v1/game/transfer-out' }, {loading: false, toast: false})
        if(res.code != 200) return
    }

    // onMounted(()=> {
    //     if(init.list) gameListFunc()
    //     if(init.record) gameLogsFunc(true)
    //     if(init.collect) gameListFunc()
    // })
       if (getCurrentInstance()) {
        onMounted(() => {
            if (init.list) gameListFunc()
            if (init.record) gameLogsFunc(true)
            if (init.collect) gameListFunc()
        })
    }

    return { 
        hashLoadingRef, finishedRef, gameListRef, gameDataRef, gameListFunc, gameDetailFunc, gameLogFunc,
        gameLogsRef, gameRecordListRef,gameLogsFunc,gameLogsByGameIdFunc,
        getGameCollectFunc, takeGameCollectFunc,
        gameTransferOutFunc,
        betAllRef, betTotalRef, winTotalRef
    }
}

export const getTimeRange = (hours = 3) => {
    const now = new Date();
    const end = new Date(now);
    const start = new Date(now.getTime() - hours * 60 * 60 * 1000);

    const formatBrazilTime = (date) => {
        return date.toLocaleString('en-US', {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+:\d+)/, '$3-$1-$2 $4');
    };

    return {
        start_time: formatBrazilTime(start),
        end_time: formatBrazilTime(end)
    };
};