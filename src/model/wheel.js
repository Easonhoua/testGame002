import { ref, computed, reactive } from 'vue'
import { $get, $post } from '@/request'
import { playBtnAudioFunc } from '@/utils/core'
import { openLoginFunc, isEverLoginFunc } from '@/utils/config'
import { isAuthRef } from '@/model/user'


// 转盘类型枚举
export const WHEEL_TYPES = {
    SILVER: 'silver',
    GOLD: 'gold',
    DIAMOND: 'diamond'
}

// 添加类型映射
const TYPE_MAP = {
    [WHEEL_TYPES.SILVER]: 1,
    [WHEEL_TYPES.GOLD]: 2,
    [WHEEL_TYPES.DIAMOND]: 3
}

// 转盘配置
export const wheelConfig = reactive({
    [WHEEL_TYPES.SILVER]: {
        name: 'Prata',
        cost: 0,
        prizes: [
            { bonus: '0.8', type: 'money' },
            { bonus: '1.2', type: 'money' },
            { bonus: '1.8', type: 'money' },
            { bonus: '2.4', type: 'money' },
            { bonus: '55', type: 'money' },
            { bonus: '77', type: 'money' },
            { bonus: '222', type: 'money' },
            { bonus: '15', type: 'money' }
        ]
    },
    [WHEEL_TYPES.GOLD]: {
        name: 'Ouro',
        cost: 0,
        prizes: [
            { bonus: '6', type: 'money' },
            { bonus: '12', type: 'money' },
            { bonus: '66', type: 'money' },
            { bonus: '77', type: 'money' },
            { bonus: '222', type: 'money' },
            { bonus: '333', type: 'money' },
            { bonus: '555', type: 'money' },
            { bonus: '666', type: 'money' }
        ]
    },
    [WHEEL_TYPES.DIAMOND]: {
        name: 'Diamante',
        cost: 0,
        prizes: [
            { bonus: '18', type: 'money' },
            { bonus: '22', type: 'money' },
            { bonus: '66', type: 'money' },
            { bonus: '288', type: 'money' },
            { bonus: '388', type: 'money' },
            { bonus: '588', type: 'money' },
            { bonus: '881', type: 'money' },
            { bonus: '888', type: 'money' }
        ]
    }
})


export function useWheelModel() {

    // 0: 未开启, 1: 签到未开启, 2: 已签到, 3: 未签到
    const signInStatus = ref(0)
    // 转盘类型
    const currentWheelType = ref(WHEEL_TYPES.SILVER)
    // 用户积分
    const userPoints = ref(0)
    // 签到送的积分
    const signInPoints = ref(0)

    const isSpinning = ref(false)
    const spinAngle = ref(0)

    const rewardRecords = ref([])
    const showRewardModal = ref(false)
    const currentReward = ref(null)

    //  规则
    const ruleRef = ref('')

    // 计算属性
    const currentWheelConfig = computed(() => {
        // console.log('currentWheelConfig update:', wheelConfig[currentWheelType.value])
        return wheelConfig[currentWheelType.value]
    })

    const currentWheelPrizes = computed(() => {
        // console.log('currentWheelPrizes update:', currentWheelConfig.value?.prizes)
        return currentWheelConfig.value?.prizes || []
    })


    // 切换转盘类型
    function switchWheelType(type) {
        if (isSpinning.value) return
        currentWheelType.value = type
        playBtnAudioFunc()
    }

    // 获取转盘配置
    async function getWheelConfig() {
        try {

            const res = await $get({ url: '/activity/v1/turntable/sign-in-check' }, { loading: false })
            if (res.code === 200) {
                // 更新用户积分
                userPoints.value = res.data.points || 0
                //0活动未开启 1签到未开启 2已签到 3未签到
                signInStatus.value = res.data.status || 0
                // 签到分数
                signInPoints.value = Number(res.data.sign_in_points) || 0
                // 转盘配置
                wheelConfig[WHEEL_TYPES.SILVER].cost = res.data.t_1_points || 0
                wheelConfig[WHEEL_TYPES.GOLD].cost = res.data.t_2_points || 0
                wheelConfig[WHEEL_TYPES.DIAMOND].cost = res.data.t_3_points || 0

                wheelConfig[WHEEL_TYPES.SILVER].prizes = res.data.t_1_config || []
                wheelConfig[WHEEL_TYPES.GOLD].prizes = res.data.t_2_config || []
                wheelConfig[WHEEL_TYPES.DIAMOND].prizes = res.data.t_3_config || []

                ruleRef.value = res.data.content || ''
                //生成奖励数据
                generateInitialRecords()
            }
        } catch (error) {
            console.error('获取转盘配置失败:', error)
        } finally {

        }
    }

    // 签到功能
    async function signIn() {

        if (signInStatus.value!==3) return
        
        if (!isAuthRef.value) {
            if (isEverLoginFunc()) {
                openLoginFunc(0)
            } else {
                openLoginFunc(1)
            }
            return
        }
        
        playBtnAudioFunc()
        
        try {
            const res = await $post({ url: '/activity/v1/turntable/sign-in' }, { loading: true, toast: true })
            if (res.code === 200) {
                // 更新签到积分
                userPoints.value += signInPoints.value
                // 更新签到状态为已签到
                signInStatus.value = 2 
                return { success: true, points: signInPoints.value }
            }
            return { success: false, message: res.message }
        } catch (error) {
            console.error('签到失败:', error)
            return { success: false, message: '签到失败，请重试' }
        } finally {

        }
    }

    // 转盘抽奖
    async function spinWheel() {
        if (isSpinning.value) return
        
        // 检查登录和积分
        if (!isAuthRef.value) {
            if (isEverLoginFunc()) {
                openLoginFunc(0)
            } else {
                openLoginFunc(1)
            }
            return { success: false, message: 'Please login' }
        }
    
        if (userPoints.value < currentWheelConfig.value.cost) {
            return { success: false, message: 'Not enough points' }
        }
    
        isSpinning.value = true
        playBtnAudioFunc()
    
        try {
            // 开始匀速转动
            let startSpeed = 25  // 初始转速
            const spinInterval = setInterval(() => {
                spinAngle.value = (spinAngle.value + startSpeed) % 360
            }, 30)
    
            // 获取抽奖结果
            const res = await $post({ 
                url: '/activity/v1/turntable/spin',  
                data: { type: TYPE_MAP[currentWheelType.value] }
            }, { loading: false, toast: false })
    
            if (res.code === 200) {
                // 继续转动一段时间再开始减速
                await new Promise(resolve => setTimeout(resolve, 2000))
    
                // 找到目标索引
                const targetIndex = currentWheelPrizes.value.findIndex(item => 
                    item.bonus === res.data.bonus
                )
    
                if (targetIndex === -1) {
                    throw new Error('Invalid prize bonus')
                }
    
                // 清除匀速转动
                clearInterval(spinInterval)
    
                // 计算目标角度（多转5圈后停在目标位置）
                spinAngle.value = 360 + (360 - (targetIndex * 45))
    
                // 等待动画完成
                // await new Promise(resolve => setTimeout(resolve, 4000))
                
                isSpinning.value = false
                userPoints.value -= currentWheelConfig.value.cost
    
                return {
                    success: true,
                    prize: res.data.bonus,
                    prizeIndex: targetIndex
                }
            }
    
            clearInterval(spinInterval)
            isSpinning.value = false
            return { success: false, message: res.message }
    
        } catch (error) {
            console.error('抽奖失败:', error)
            isSpinning.value = false
            return { success: false, message: '抽奖失败，请重试' }
        }
    }

    // 生成奖励记录
    function generateRewardRecord(prizeData) {
        const now = new Date()
        const record = {
            id: Date.now(),
            timestamp: now.toISOString(),
            username: 'User***' + Math.floor(Math.random() * 1000),
            wheelType: currentWheelType.value,
            wheelName: currentWheelConfig.value.name,
            prize: prizeData.prize,
            amount: prizeData.amount || `R$ ${prizeData.prize}`
        }
        
        rewardRecords.value.unshift(record)
        
        // 保持最多100条记录
        if (rewardRecords.value.length > 100) {
            rewardRecords.value = rewardRecords.value.slice(0, 100)
        }
    }

    // 生成初始奖励记录
    function generateInitialRecords() {
        const now = new Date()
        const records = []
    
        // 权重配置
        const prizeWeights = {
            silver: [100, 200, 200, 300, 300, 500, 500, 500],
            gold:   [50, 100, 100, 200, 200, 200, 200, 200],
            diamond:[20, 50, 100, 100, 200, 200, 200, 200]
        }
    
        // 构建权重池
        function buildPool(prizes, weights) {
            const pool = []
            prizes.forEach((prize, idx) => {
                for (let i = 0; i < weights[idx]; i++) {
                    pool.push(prize)
                }
            })
            return pool
        }
    
        const pools = {
            silver: buildPool(wheelConfig.silver.prizes, prizeWeights.silver),
            gold: buildPool(wheelConfig.gold.prizes, prizeWeights.gold),
            diamond: buildPool(wheelConfig.diamond.prizes, prizeWeights.diamond)
        }
    
        for (let i = 0; i < 100; i++) {
            const time = new Date(now.getTime() - (i * 30 * 1000))
            const wheelTypes = Object.values(WHEEL_TYPES)
            const randomWheelType = wheelTypes[Math.floor(Math.random() * wheelTypes.length)]
            const pool = pools[randomWheelType]
            const randomPrize = pool[Math.floor(Math.random() * pool.length)]
            const randomWheelConfig = wheelConfig[randomWheelType]
            var title = window.document.title;
            records.push({
                id: Date.now() - i * 30000,
                timestamp: formatTime(time.toISOString()),
                username: title.replace(".com", "") + '***' + Math.floor(Math.random() * 1000),
                wheelType: randomWheelType,
                wheelName: randomWheelConfig.name,
                prize: randomPrize.bonus,
                amount: `R$ ${randomPrize.bonus}`
            })
        }
    
        rewardRecords.value = records
    }

    // 格式化时间
    function formatTime(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return {
        // 数据
        currentWheelType,
        userPoints,
        signInStatus,
        signInPoints,
        isSpinning,
        spinAngle,

        rewardRecords,
        showRewardModal,
        currentReward,
        ruleRef,

        // 计算属性
        currentWheelConfig,
        currentWheelPrizes,
        
        // 方法
        getWheelConfig,
        switchWheelType,
        signIn,
        spinWheel,
    
    }
} 