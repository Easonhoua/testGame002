<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWheelModel, WHEEL_TYPES, wheelConfig} from '@/model/wheel'
import { playBtnAudioFunc } from '@/utils/core'
import { showToast } from 'vant'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const LuckyWheelImg = useThemeImages().luckywheel
const CommonImg = useThemeImages().common
const router = useRouter()

// 使用幸运转盘模型
const {
    currentWheelType,
    userPoints,
    signInStatus,   
    signInPoints,
    isSpinning, 
    spinAngle,
    ruleRef,

    rewardRecords,
    showRewardModal,
    currentReward,
    currentWheelConfig,
    currentWheelPrizes,

    getWheelConfig,
    switchWheelType,

    signIn,
    spinWheel,

} = useWheelModel()

// 处理抽奖结果
async function handleSpinWheel() {
    const result = await spinWheel()
    if (result.success) {
        // 显示奖励
        setTimeout(() => {
            currentReward.value = result.prize
            showRewardModal.value = true
        }, 3000)
    }else {
        // 提示错误
        showToast(result.message)
    }
}

function closeReward() {
    showRewardModal.value = false
    currentReward.value = null
}

// 转盘类型配置
const wheelTypes = [
    { key: 'silver', name: 'Roda de Prêmios de Prata' },
    { key: 'gold', name: 'Roda de Prêmios de Ouro' },
    { key: 'diamond', name: 'Roda de Prêmios de Diamante' }
]

onMounted(() => {
    getWheelConfig()

})
</script>

<template>
    <pu-page title="Roleta da Sorte" class="z-[999] bg-theme" hideService>
        <img v-if="currentTemplate.value === 'template_five'" :src="LuckyWheelImg.m5_page_bg" class="absolute left-0 top-0 w-full h-auto  -z-10" />
        <!-- 顶部按钮 -->
        <pu-card theme="3" class="mt-3">
            <div class="flex justify-between items-center" >
                <button
                    v-for="(wheelType, idx) in wheelTypes"
                    :key="wheelType.key"
                    @click="switchWheelType(wheelType.key)"
                    class="focus:outline-none flex-1 mx-1"
                    style="min-width:0;">
                    <img
                        :src="currentWheelType === wheelType.key
                            ? LuckyWheelImg[`btn_type${idx+1}_s`]
                            : LuckyWheelImg[`btn_type${idx+1}`]"
                        :alt="wheelType.name"
                        class="w-full object-contain"
                        style="max-width:unset;"
                    />
                </button>
            </div>
        </pu-card>

        <!-- 转盘区域 -->
        <pu-card theme="4" class="mt-1 flex justify-center" v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'">
            <img :src="LuckyWheelImg[`bg_wheel${currentWheelType === 'silver' ? '1' : currentWheelType === 'gold' ? '2' : '3'}`]" class="w-full h-auto">
                    
            <section class="w-full h-full absolute flex items-center justify-center">
                <section class="w-[12.5rem] h-[12.5rem] absolute top-[5.5rem] ">
                    <img :style="`transform: rotate(${spinAngle+22}deg)`"
                        :class="isSpinning ? '' : 'transition-all duration-[3000ms] ease-out'"
                        :src="LuckyWheelImg[`img_wheel${
                            currentWheelType === 'silver' ? '1' : 
                            currentWheelType === 'gold' ? '2' : '3'
                            }`]" class="w-full h-full">
                            
                    <ul :style="`transform: rotate(${spinAngle}deg)`"
                        :class="isSpinning ? '' : 'transition-all duration-[3000ms] ease-out'"
                        class="w-full h-full text-four absolute left-0 top-0 z-1 block">
                        <template v-for="(prize, index) in currentWheelPrizes" :key="index">
                            <li :style="`transform: rotate(${45 * index}deg);`"
                                class="w-full h-full absolute left-0 top-0 block">
                                <div class="w-full h-1/6 text-center relative flex flex-col items-center justify-center"
                                    style="transform-origin: 50% 9.375rem;">
                                    <p class="text-[0.85rem] relative">{{
                                        prize.bonus }}</p>
                                </div>
                            </li>
                        </template>
                    </ul>

                    <div  @click="handleSpinWheel()"
                        class="w-full h-full relative -mt-[13.3rem] z-10 flex items-center justify-center "
                        style="cursor: pointer;">
                        <img :src=LuckyWheelImg.pointer class="w-[6.5rem] h-auto block">
                        <p class="absolute mt-6 text-[1.7rem] font-bold text-four">
                            <span>{{ currentWheelConfig.cost }}</span>
                        </p>
                    </div>
                </section>
            </section>
        </pu-card>
        <pu-card theme="4" class="mt-1 flex justify-center" v-else-if="currentTemplate.value=='template_five'">
            <img :src="LuckyWheelImg[`bg_wheel${currentWheelType === 'silver' ? '1' : currentWheelType === 'gold' ? '2' : '3'}`]" class="w-full h-auto">
                    
            <section class="w-full h-full absolute top-[5rem] flex items-center justify-center">
                <section class="w-[12.5rem] h-[12.5rem] absolute top-[5rem] ">
                    <img :style="`transform: rotate(${spinAngle+22}deg)`"
                        :class="isSpinning ? '' : 'transition-all duration-[3000ms] ease-out'"
                        :src="LuckyWheelImg[`img_wheel${
                            currentWheelType === 'silver' ? '1' : 
                            currentWheelType === 'gold' ? '2' : '3'
                            }`]" class="w-full h-full">
                            
                    <ul :style="`transform: rotate(${spinAngle}deg)`"
                        :class="isSpinning ? '' : 'transition-all duration-[3000ms] ease-out'"
                        class="w-full h-full text-themetext0 absolute left-0 top-0 z-1 block">
                        <template v-for="(prize, index) in currentWheelPrizes" :key="index">
                            <li :style="`transform: rotate(${45 * index}deg);`"
                                class="w-full h-full absolute left-0 top-0 block">
                                <div class="w-full h-1/6 text-center relative flex flex-col items-center justify-center"
                                    style="transform-origin: 50% 9.375rem;">
                                    <p class="text-[0.85rem] relative">{{
                                        prize.bonus }}</p>
                                </div>
                            </li>
                        </template>
                    </ul>

                    <div  @click="handleSpinWheel()"
                        class="w-full h-full relative -mt-[13.3rem] z-10 flex items-center justify-center "
                        style="cursor: pointer;">
                        <img :src=LuckyWheelImg.pointer class="w-[6.5rem] h-auto block">
                        <p class="absolute mt-6 text-[1.7rem] font-bold text-themetext0">
                            <span>{{ currentWheelConfig.cost }}</span>
                        </p>
                    </div>
                </section>
            </section>
        </pu-card>
        <pu-card theme="4" class="mt-1 flex justify-center" v-else>
            <img :src="LuckyWheelImg[`bg_wheel${currentWheelType === 'silver' ? '1' : currentWheelType === 'gold' ? '2' : '3'}`]" class="w-full h-auto">
                    
            <section class="w-full h-full absolute flex items-center justify-center">
                <section class="w-[12.5rem] h-[12.5rem] absolute top-[5.5rem] ">
                    <img :style="`transform: rotate(${spinAngle+22}deg)`"
                        :class="isSpinning ? '' : 'transition-all duration-[3000ms] ease-out'"
                        :src="LuckyWheelImg[`img_wheel${
                            currentWheelType === 'silver' ? '1' : 
                            currentWheelType === 'gold' ? '2' : '3'
                            }`]" class="w-full h-full">
                            
                    <ul :style="`transform: rotate(${spinAngle}deg)`"
                        :class="isSpinning ? '' : 'transition-all duration-[3000ms] ease-out'"
                        class="w-full h-full text-themetext0 absolute left-0 top-0 z-1 block">
                        <template v-for="(prize, index) in currentWheelPrizes" :key="index">
                            <li :style="`transform: rotate(${45 * index}deg);`"
                                class="w-full h-full absolute left-0 top-0 block">
                                <div class="w-full h-1/6 text-center relative flex flex-col items-center justify-center"
                                    style="transform-origin: 50% 9.375rem;">
                                    <p class="text-[0.85rem] relative">{{
                                        prize.bonus }}</p>
                                </div>
                            </li>
                        </template>
                    </ul>

                    <div  @click="handleSpinWheel()"
                        class="w-full h-full relative -mt-[13.3rem] z-10 flex items-center justify-center "
                        style="cursor: pointer;">
                        <img :src=LuckyWheelImg.pointer class="w-[6.5rem] h-auto block">
                        <p class="absolute mt-6 text-[1.7rem] font-bold text-themetext0">
                            <span>{{ currentWheelConfig.cost }}</span>
                        </p>
                    </div>
                </section>
            </section>
        </pu-card>


        <!-- 下方积分区域美术化 -->
        <pu-card theme="3" class="mt-1" v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'">
            <div class="relative mx-auto w-full rounded-2xl bg-gradient-to-b from-themecardlinear1 to-themecardlinear2 p-3 mb-2 shadow-lg">
                <img :src=LuckyWheelImg.text_roda class="absolute left-1/2 -translate-x-1/2 -top-9 w-64 h-auto"/>
                <div class="flex items-center mb-2 pt-3">
                    <img :src=LuckyWheelImg.icon_jifen class="w-5 h-5 mr-2" />
                    <span class= "font-bold">Meus Pontos:</span>
                    <span class="ml-2 text-four text-xl font-bold">{{ userPoints }}</span>
                    <div class="relative flex-1 flex justify-end">
                        <button
                            @click="signIn"
                            :disabled="signInStatus !== 3"
                            :class="[
                                'ml-auto flex items-center justify-center px-4 h-7 w-23 rounded font-bold text-sm shadow transition-all',
                                signInStatus === 3 && currentTemplate.value =='template_one'
                                    ? 'bg-gradient-to-r from-linear-18 to-gold-100 text-themewhite'
                                    : signInStatus === 3&& currentTemplate.value=='template_two'
                                    ? 'm2-btn-ten  text-themewhite' 
                                    : 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
                            ]"
                        >
                            <img :src=LuckyWheelImg.icon_sign class="w-5 h-5 mr-2" alt="sign icon"
                            :style="signInStatus === 3 ? '' : 'filter: grayscale(1) brightness(0.7)'" />
                            <span>
                                {{ signInStatus === 3 ? 'Meus' : '+' + signInPoints }}
                            </span>
                        </button>
                        <span
                            v-if="signInStatus === 3"
                            class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-themewhite"
                        ></span>
                    </div>
                </div>
                <div class="text-xs text-rgbawhite80 mt-1 rounded-xl bg-rgbablack15 p-2">
                    <div class="grid grid-cols-[minmax(0,_1fr)_130px] gap-y-2">
                        <div class="whitespace-nowrap"  :class="[currentTemplate.value=='template_one'?'':'text-three']">Roda de Prêmios de Prata:</div>
                        <div class="text-four text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.SILVER].cost}} por vez</div>
                        
                        <div class="whitespace-nowrap" :class="[currentTemplate.value=='template_one'?'':'text-three']">Roda de Prêmios de Ouro:</div>
                        <div class="text-four text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.GOLD].cost}} por vez</div>
                        
                        <div class="whitespace-nowrap" :class="[currentTemplate.value=='template_one'?'':'text-three']">Roda de Prêmios de Diamante:</div>
                        <div class="text-four text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.DIAMOND].cost}} por vez</div>
                    </div>
                </div>
            </div>
        </pu-card>
        <pu-card theme="3" class="mt-1" v-else-if="currentTemplate.value=='template_three'">
            <div class="relative mx-auto w-full rounded-2xl bg-gradient-to-b from-themecardlinear1 to-themecardlinear2 p-3 mb-2 shadow-lg">
                <img :src=LuckyWheelImg.text_roda class="absolute left-1/2 -translate-x-1/2 -top-9 w-64 h-auto"/>
                <div class="flex items-center mb-2 pt-3">
                    <img :src=LuckyWheelImg.icon_jifen class="w-5 h-5 mr-2" />
                    <span class= "font-bold ">Meus Pontos:</span>
                    <span class="ml-2 text-themetext0 text-xl font-bold">{{ userPoints }}</span>
                    <div class="relative flex-1 flex justify-end">
                        <button
                            @click="signIn"
                            :disabled="signInStatus !== 3"
                            :class="[
                                'ml-auto flex items-center justify-center px-4 h-7 w-23 rounded font-bold text-sm shadow transition-all',
                                signInStatus === 3? 'm3-theme-btn1': ''
                            ]"
                        >
                            <img :src=LuckyWheelImg.icon_sign class="w-5 h-5 mr-2" alt="sign icon"
                            :style="signInStatus === 3 ? '' : 'filter: grayscale(1) brightness(0.7)'" />
                            <span>
                                {{ signInStatus === 3 ? 'Meus' : '+' + signInPoints }}
                            </span>
                        </button>
                        <span
                            v-if="signInStatus === 3"
                            class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-themewhite"
                        ></span>
                    </div>
                </div>
                <div class="text-xs text-rgbawhite80 mt-1 rounded-xl bg-rgbablack15 p-2">
                    <div class="grid grid-cols-[minmax(0,_1fr)_130px] gap-y-2">
                        <div class="whitespace-nowrap text-themetext2">Roda de Prêmios de Prata:</div>
                        <div class="text-themetext0 text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.SILVER].cost}} por vez</div>
                        
                        <div class="whitespace-nowrap text-themetext2" >Roda de Prêmios de Ouro:</div>
                        <div class="text-themetext0 text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.GOLD].cost}} por vez</div>
                        
                        <div class="whitespace-nowrap text-themetext2" >Roda de Prêmios de Diamante:</div>
                        <div class="text-themetext0 text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.DIAMOND].cost}} por vez</div>
                    </div>
                </div>
            </div>
        </pu-card>
        <pu-card theme="3" class="!mt-[-1rem]" v-else-if="currentTemplate.value=='template_four'">
            <div class="relative mx-auto w-full rounded-[0.5rem] bg-theme-bg mb-2 shadow-lg overflow-hidden"
            :style="{
                    backgroundImage: `url(${LuckyWheelImg.cardbg})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                    }"
            >
                <div class="flex items-center p-3"
               
                >
                    <img :src=LuckyWheelImg.icon_jifen class="w-5 h-5 mr-2" />
                    <span class= "m4-text font-[200] text-[0.88rem]">Meus Pontos:</span>
                    <span class="ml-2 text-themetext0 text-[0.88rem] font-bold">{{ userPoints }}</span>
                    <div class="relative flex-1 flex justify-end">
                        <button
                            @click="signIn"
                            :disabled="signInStatus !== 3"
                            :class="[
                                'ml-auto flex items-center justify-center px-4 h-7 w-23 rounded font-bold text-sm shadow transition-all',
                                signInStatus === 3
                                    ? 'm4-nine-btn'
                                    : 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
                            ]"
                        >
                            <img :src=LuckyWheelImg.icon_sign class="w-5 h-5 mr-2" alt="sign icon"
                            :style="true? '' : 'filter: grayscale(1) brightness(0.7)'" />
                            <span>
                                {{ signInStatus === 3 ? 'Meus' : '+' + signInPoints }}
                            </span>
                        </button>
                        <span
                            v-if="signInStatus === 3"
                            class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"
                        ></span>
                    </div>
                </div>
                <div class="text-xs text-three px-4 py-2 bg-black/20">
                    <div class="grid grid-cols-[minmax(0,_1fr)_130px] gap-y-2">
                        <div class="text-white">Roda de Prêmios de Prata:</div>
                        <div class="text-themetext0 text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.SILVER].cost}} por vez</div>
                        
                        <div class="text-white">Roda de Prêmios de Ouro:</div>
                        <div class="text-themetext0 text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.GOLD].cost}} por vez</div>
                        
                        <div class="text-white">Roda de Prêmios de Diamante:</div>
                        <div class="text-themetext0 text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.DIAMOND].cost}} por vez</div>
                    </div>
                </div>
            </div>
        </pu-card>
        <pu-card theme="2" class="!mt-[-1rem]" v-else-if="currentTemplate.value=='template_five'">
            <div class="relative mx-auto w-full rounded-[0.5rem]  mb-2 -mt-5 shadow-lg overflow-hidden"
            :style="{
                    backgroundImage: `url(${LuckyWheelImg.cardbg})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                    }"
            >
                <div class="flex items-center py-2 px-3"
               
                >
                    <img :src=LuckyWheelImg.icon_jifen class="w-5 h-5 mr-2" />
                    <span class= "text-themetext0 font-[200] text-[0.88rem]">Meus Pontos:</span>
                    <span class="ml-2 text-themetext0 text-[0.88rem] font-bold">{{ userPoints }}</span>
                    <div class="relative flex-1 flex justify-end">
                        <button
                            @click="signIn"
                            :disabled="signInStatus !== 3"
                            :class="[
                                'ml-auto flex items-center justify-center px-4 h-7 w-23 rounded-full font-bold text-sm shadow transition-all',
                                signInStatus === 3
                                    ? 'm5-theme-btn1'
                                    : 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
                            ]"
                        >
                            <img :src=LuckyWheelImg.icon_sign class="w-5 h-5 mr-2" alt="sign icon"
                            :style="true? '' : 'filter: grayscale(1) brightness(0.7)'" />
                            <span>
                                {{ signInStatus === 3 ? 'Meus' : '+' + signInPoints }}
                            </span>
                        </button>
                        <span
                            v-if="signInStatus === 3"
                            class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"
                        ></span>
                    </div>
                </div>
                <div class="text-xs text-three px-4 py-3 ">
                    <div class="grid grid-cols-[minmax(0,_1fr)_130px] gap-y-2">
                        <div class="text-white">Roda de Prêmios de Prata:</div>
                        <div class="text-themetext0 text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.SILVER].cost}} por vez</div>
                        
                        <div class="text-white">Roda de Prêmios de Ouro:</div>
                        <div class="text-themetext0 text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.GOLD].cost}} por vez</div>
                        
                        <div class="text-white">Roda de Prêmios de Diamante:</div>
                        <div class="text-themetext0 text-right whitespace-nowrap">{{wheelConfig[WHEEL_TYPES.DIAMOND].cost}} por vez</div>
                    </div>
                </div>
            </div>
        </pu-card>

        <!-- 奖励记录区域 -->
        <pu-card theme="3" class="mt-4" v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'"> 
            <img :src=LuckyWheelImg.img_title v-if="currentTemplate.value=='template_one'"/>
            <!-- no-repeat center -->
            <!-- bg_tableheader -->
            <div  :style="{background: `url(${CommonImg.bg_tableheader}) no-repeat center`}" style="background-repeat: no-repeat; background-size: 100% 100%;width: 100%;height: 100%;" class="text-center text-white text-1xl font-bold py-2" v-else>
                Registro de Prêmios
            </div>
            <div class="scroll-list">
                <ul>
                    <template v-for="record in [...rewardRecords, ...rewardRecords]" :key="record.id">
                    <li class="flex items-center justify-between py-2 px-2 rounded text-sm mb-1 " :class="currentTemplate.value=='template_one'?'bg-rgbawhite10':'bg-tablergba20'">
                        <div class="flex-1 min-w-0">
                            <span :class="currentTemplate.value=='template_one'?'text-rgbawhite80':'text-theme'">{{ record.timestamp }}</span>
                            <span class="text-rgbawhite80 ml-1" v-if="currentTemplate.value=='template_one'">{{ record.username }} ganhou um bônus na {{ record.wheelName }}:</span>
                            <span class="text-theme ml-1" v-else><span class="text-themewhite">{{ record.username }}</span> ganhou um bônus na {{ record.wheelName }}:</span>
                        </div>
                        <span class="text-four ml-2">{{ record.amount }}</span>
                    </li>
                    </template>
                </ul>
            </div>
        </pu-card>

        <pu-card theme="3" class="mt-4" v-if="currentTemplate.value=='template_three'"> 
            <img :src=LuckyWheelImg.img_title v-if="currentTemplate.value=='template_one'"/>
            <!-- no-repeat center -->
            <!-- bg_tableheader -->
            <div  :style="{background: `url(${CommonImg.bg_tableheader}) no-repeat center`}" style="background-repeat: no-repeat; background-size: 100% 100%;width: 100%;height: 100%;" class="text-center text-white text-1xl font-bold py-2" v-else>
                Registro de Prêmios
            </div>
            <div class="scroll-list">
                <ul>
                    <template v-for="record in [...rewardRecords, ...rewardRecords]" :key="record.id">
                    <li class="flex items-center justify-between py-2 px-2 rounded text-sm mb-1 bg-tablergba20">
                        <div class="flex-1 min-w-0">
                            <span class="text-xs text-themetext2">{{ record.timestamp }}</span>
                            <span class="text-xs text-themetext2 ml-1"><span class="text-themewhite">{{ record.username }}</span> ganhou um bônus na {{ record.wheelName }}:</span>
                        </div>
                        <span class="text-themetext0 ml-2">{{ record.amount }}</span>
                    </li>
                    </template>
                </ul>
            </div>
        </pu-card>
        <pu-card theme="3" class="mt-4 " v-if="currentTemplate.value=='template_four'"> 
            <div class="bg-tablebg rounded-[0.5rem]  overflow-hidden">
                <div class="text-center m4-text text-1xl py-3">
                Registro de Prêmios
            </div>
            <div class="scroll-list">
                <ul>
                    <template v-for="record in [...rewardRecords, ...rewardRecords]" :key="record.id">
                    <li class="flex items-center justify-between py-2 px-2 rounded text-sm mb-1 odd:bg-black/20 even:bg-theme-bg">
                        <div class="flex-1 min-w-0 text-themefont">
                            <span >{{ record.timestamp }}</span>
                            <span class=" text-themetext0  ml-1">{{ record.username }} </span><span> ganhou um bônus na {{ record.wheelName }}:</span>
                        </div>
                        <span class="text-themetext0 ml-2">{{ record.amount }}</span>
                    </li>
                    </template>
                </ul>
            </div>
            </div>
           
        </pu-card>
        <pu-card theme="3" class="mt-4 " v-if="currentTemplate.value=='template_five'"> 
            <div class="bg-tablebg1 rounded-[0.5rem]  overflow-hidden">
                <div class="text-center m4-text text-1xl py-3">
                Registro de Prêmios
            </div>
            <div class="scroll-list">
                <ul>
                    <template v-for="record in [...rewardRecords, ...rewardRecords]" :key="record.id">
                    <li class="flex items-center justify-between py-2 px-2 rounded text-sm mb-1 odd:bg-tablebg2 even:bg-tablebg1">
                        <div class="flex-1 min-w-0 text-themefont">
                            <span >{{ record.timestamp }}</span>
                            <span class=" text-themetext0  ml-1">{{ record.username }} </span><span> ganhou um bônus na {{ record.wheelName }}:</span>
                        </div>
                        <span class="text-themetext0 ml-2">{{ record.amount }}</span>
                    </li>
                    </template>
                </ul>
            </div>
            </div>
           
        </pu-card>


        <!-- 规则区域 -->
        <pu-card theme="3" class="mb-3 pt-5" v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1" :class="[currentTemplate.value=='template_one'?' bg-gradient-to-r from-transparent to-themewhite':'bg-gradient-to-r from-transparent to-four']"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center" :class="[currentTemplate.value=='template_one'?' ':'text-four']">
                    <span>Descrição da Atividade</span>                                          
                </h5>
                <em class="h-0.5 flex-1 ":class="[currentTemplate.value=='template_one'?' bg-gradient-to-l from-transparent to-themewhite':'bg-gradient-to-l from-transparent to-four']"></em>
            </div>
            <div class="ctx-article p-mb text-sm " v-html="ruleRef" style="line-height: 1.5;" :class="[currentTemplate.value=='template_one'?'text-rgbawhite50':'text-theme']">
            </div>
        </pu-card>

        <pu-card theme="3" class="mb-3 pt-5" v-if="currentTemplate.value=='template_three'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1  bg-gradient-to-r from-transparent to-themetext2"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-themetext2">
                    <span>Descrição da Atividade</span>                                          
                </h5>
                <em class="h-0.5 flex-1  bg-gradient-to-r from-themetext2 to-transparent"></em>
            </div>
            <div class="ctx-article p-mb text-sm text-themetext3" v-html="ruleRef" style="line-height: 1.5;">
            </div>
        </pu-card>
        <pu-card theme="3" class="mb-3 pt-5" v-if="currentTemplate.value=='template_four'">
            <h5 class=" px-2 text-l font-bold text-start m4-text">
                <span>Descrição da Atividade:</span>
            </h5>
            <div class="mt-2 p-mb text-sm text-themetext3" v-html="ruleRef" style="line-height: 1.5;">
            </div>
        </pu-card>
        <pu-card theme="3" class="mb-3 pt-5" v-if="currentTemplate.value=='template_five'">
            <h5 class=" px-2 text-l font-bold text-start text-themewhite">
                <span>Descrição da Atividade:</span>
            </h5>
            <div class="mt-2 p-mb text-sm text-themetext4" v-html="ruleRef" style="line-height: 1.5;">
            </div>
        </pu-card>

        <!-- 奖励弹窗 --> 
        <!-- showRewardModal -->
        <div v-if="showRewardModal" class="fixed inset-0 bg-rgbablack50 flex items-center justify-center z-50">
            <section class="w-full h-full flex flex-col items-center justify-center">
                <div class="absolute  right-4 flex items-center" style="top: 10rem;">
                    <button @click="closeReward()" class="w-10 h-10 bg-rgbawhite30 rounded-full absolute right-0 top-0 flex items-center justify-center">
                            <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                            </svg>
                    </button>
                </div>
                <pu-card theme="5" class="flex items-center justify-center flex-col">
                     <img :src=CommonImg.img_success >
                     <div v-if="currentTemplate.value!='template_five'" class="flex items-center justify-center -mt-2 text-center"  :style="{background: `url(${CommonImg.img_successbg})`,backgroundSize: '100% 100%',width:'17rem',height:'5rem'}">
                       <img :src=CommonImg.img_gold  class="w-[3rem] h-auto mr-2 "/>
                       <h1 style="font-size: 1.9rem;font-weight: 500;">R${{currentReward}}</h1>
                    </div>
                    <div v-else class="w-[90%] flex items-center justify-center -mt-2 text-center"  :style="{background: `url(${CommonImg.img_successbg})`,backgroundSize: '100% 100%',height:'5rem'}">
                       <img :src=CommonImg.img_money  class="w-[3rem] h-auto mr-2 "/>
                       <h1 style="font-size: 1.9rem;font-weight: 500;" class="text-themetext0">R${{currentReward}}</h1>
                    </div>
                </pu-card>
            </section>
        </div>
<Panddingbottom></Panddingbottom>
    </pu-page>
</template>

<style scoped>
/* 隐藏滚动条但保留滚动功能 */
.overflow-y-auto {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.overflow-y-auto::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
.overflow-y-auto {
  overflow-y: scroll; /* 保留滚动功能 */
}

.scroll-list {
  height: 22.5rem;
  overflow: hidden;
}

.scroll-list ul {
  animation: scrollUp 100s linear infinite;
}

@keyframes scrollUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

/* 鼠标悬停暂停 */
.scroll-list:hover ul {
  animation-play-state: paused;
}

</style> 