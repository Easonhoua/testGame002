<script setup>
import { computed, onMounted, ref } from 'vue'
import { t } from '@/i18n'
import { monthlybettingModel } from '@/model/activity'
import { isAuthRef } from '@/model/user'
import ShareList from '@/components/pages/ShareList.vue'
import { openLoginFunc, isEverLoginFunc } from '@/utils/config'
import { playBtnAudioFunc } from '@/utils/core'
import { socialRedeemListRef } from '@/model/common'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const MonthlybettingImg = useThemeImages().monthlybetting
const CommonImg = useThemeImages().common
const { monthlybettingData,slotNumbersRef,  contentRef, needBetRef, needBetdays, needRecharge,rankalllistRef, datelistRef, canDrawRef, ranklistRef, ranktop1Ref, ranktop2Ref, ranktop3Ref, rankdateRef,monthlybettingConfigFunc, drawbtnFunc } = monthlybettingModel()
const showRanklist = ref(false)


const slotSpinningRef = ref(false)

async function onClickDraw() {
    if (slotSpinningRef.value) return
    if (canDrawRef.value == 0) return
    slotSpinningRef.value = true

    try {
        const res = await drawbtnFunc()
        // const res = '250'
        // 模拟网络延迟或让用户感觉正在转动
        await new Promise(resolve => setTimeout(resolve, 2000))
        // res.bonus
        if (res) {
            const numStr = res.bonus.toString().padStart(5, '0')
            slotNumbersRef.value = numStr.split('').map(Number)
        } else {
            slotNumbersRef.value = [0, 0, 0, 0, 0]
        }
    } catch (error) {
        console.error('抽奖失败:', error)
    } finally {
        monthlybettingConfigFunc()
        slotSpinningRef.value = false
    }
}
function openrank (){
    if (rankalllistRef.value.length>0) {
        showRanklist.value = true
    }else{
        return
    }
}

</script>

<template>
    <pu-page :title="t('pageTitle.MemberDay')" class="z-[999]">
        <img :src=MonthlybettingImg.img_bg class="w-full absolute left-0 top-0 z-[-1]">
        <div v-if="currentTemplate.value == 'template_one'">
            <pu-card theme="3">
                <div class="h-[10rem] px-2 py-4 mt-6"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_topbg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                    <div class="flex align-left justify-left  ml-[5.75rem]">
                        
                        <div v-for="(item,index) in datelistRef"
                            class="text-white flex px-2  py-1 items-center justify-center text-center bg-rgbawhite10 rounded-[0.3rem] text-[0.64rem] mr-2">
                            {{item.slice(5)}}</div>
                       
                    </div>
                    <div class="mt-[2rem] ml-2 mr-6 ">
                        <div class="flex justify-between items-center mb-[0.65rem]">
                            <img :src="MonthlybettingImg.img_down" alt="" class="w-[1.25rem] h-[1.25rem] mr-2" />
                            <span class="text-xs flex-1">Depósito</span>
                            <span class="text-four text-xs font-bold w-[2.5rem]">{{needRecharge }}</span>
                        </div>

                        <div class="flex justify-between items-center mb-[0.65rem]">
                            <img :src="MonthlybettingImg.img_game" alt="" class="w-[1.25rem] h-[1.0rem] mr-2" />
                            <span class="text-xs flex-1">Volume de apostas</span>
                            <span class="text-four text-xs font-bold w-[2.5rem]">{{needBetRef}}</span>
                        </div>
                        <div class="flex justify-between items-center ">
                            <img :src="MonthlybettingImg.img_time" alt="" class="w-[1.25rem] h-[1.25rem] mr-2" />
                            <span class="text-xs flex-1">Dias de apostas</span>
                            <span class="text-four text-xs font-bold w-[2.5rem]">{{needBetdays}}<span
                                    class="text-themewhite  text-[0.6rem] ml-1">Dias</span></span>
                        </div>

                    </div>
                </div>
            </pu-card>
            <pu-card theme="3" class="relative mt-[2.5rem]">
                <div class="h-[22rem] px-2 py-4"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_slots})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">


                    <!-- 老虎机窗口（叠加在背景机台中间） -->
                    <div class="absolute left-[49.8%] -translate-x-1/2 top-[7.25rem] w-[14rem] ">
                        <div class="number-container flex items-center justify-center mt-[-0.1rem]">
                            <div v-for="(d, idx) in slotNumbersRef" :key="idx"
                                class="slot-reel overflow-hidden flex flex-col items-center select-none px-[0.5rem] h-[4.5rem]"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.img_item_bg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                                <div class="slot-column flex flex-col items-center"
                                    :class="slotSpinningRef ? 'slot-column-spinning' : ''"
                                    :style="!slotSpinningRef ? { transform: `translateY(-${d * 4.5}rem)`, transition: 'transform 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95)' } : {}">
                                    <span v-for="n in 10" :key="n"
                                        class="number-item block leading-[4.5rem] h-[4.5rem] font-extrabold">{{ n - 1 }}</span>
                                    <!-- 复制一份实现无缝衔接感 -->
                                    <span v-for="n in 10" :key="'copy-'+n"
                                        class="number-item block leading-[4.5rem] h-[4.5rem] font-extrabold">{{ n - 1 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 底部按钮（Sorteio / Lista de Classificação） -->
                    <div
                        class="absolute left-[49.8%] -translate-x-1/2 bottom-[4rem] w-[16.8rem] flex items-center justify-between">
                        <img :src="canDrawRef == 0 ? MonthlybettingImg.btn2 : MonthlybettingImg.btn1" @click="onClickDraw"
                            :disabled="slotSpinningRef" alt="" class="w-[10rem] h-full object-contain " />

                        <img :src="rankalllistRef.length>0?MonthlybettingImg.btn3:MonthlybettingImg.btn4" @click="openrank" alt=""
                            class="w-[6.5rem] h-full object-contain" />

                    </div>
                </div>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-rgbawhite50" v-html="contentRef"></article>
            </pu-card>
            <div v-if="showRanklist"
                class=" bg-rgbablack50   w-full h-full fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[2009] px-4">

                <div class="h-[35rem] relative max-w-[22rem] w-full"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_tcbg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                     <button @click="showRanklist=false"
                    class="w-10 h-10 absolute right-0 top-[-1rem] flex items-center justify-center">
                    <img :src="CommonImg.btn_close" class="w-[1.5rem] h-[1.5rem]" />
                </button>
                    <div class="flex items-center justify-center w-full mt-[5.9rem] font-bold text-white ">
                        <p class="mr-4">Data de Desenho</p>
                        <p>{{rankdateRef}}</p>
                    </div>

                    <!-- 排行榜 Top 3 -->
                    <div class="flex justify-center items-end mt-[3rem] px-2 ">
                        <!-- 2nd Place -->
                        <div class="relative flex flex-col items-center w-[6.5rem]">
                            <div class="relative w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_2})` }">
                                <p class="text-white text-[0.7rem] mt-[4rem]">{{ ranktop2Ref.username }}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-white text-[0.7rem]">Bônus</span>
                                    <span class="text-four text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop2Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>

                        <!-- 1st Place -->
                        <div class="relative flex flex-col items-center w-[7rem] -mx-2 z-10">
                            <div class="relative top-[-2rem] w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4 "
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_1})` }">
                                <p class="text-white text-[0.7rem] mt-[4rem]">{{ranktop1Ref.username}}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-white text-[0.7rem]">Bônus</span>
                                    <span class="text-four text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop1Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 3rd Place -->
                        <div class="relative flex flex-col items-center w-[6.5rem]">
                            <div class="relative w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_3})` }">
                                <p class="text-themewhite text-[0.7rem] mt-[4rem]">{{ranktop3Ref.username}}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-themewhite text-[0.7rem]">Bônus</span>
                                    <span class="text-four text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop3Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 mt-4">
                        <!-- 列表 -->
                        <div class=" h-[14rem] overflow-y-auto rank-list-scrollbar bg-tablebg  rounded-xl">
                            <div v-for="(item, index) in ranklistRef" :key="index"
                                class="flex items-center justify-between py-1 px-3 " :class="index%2 ? '' : 'bg-tablebg2'">
                                <div class="flex items-center">
                                    <span class="text-themewhite text-[0.64rem] w-6">{{ index+4 }}</span>
                                   
                                    <span class="text-themewhite text-[0.7rem]">{{item.username}}</span>
                                </div>
                                <span class="text-four text-[0.8rem] font-bold">{{ currentUnit.value }}{{ item.bonus }}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <div v-if="currentTemplate.value == 'template_two'">
            <pu-card theme="3">
                <div class="h-[10rem] px-2 py-4 mt-6"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_topbg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                    <div class="flex align-left justify-left  ml-[5.75rem]">
                        
                        <div v-for="(item,index) in datelistRef"
                            class="text-white flex px-2  py-1 items-center justify-center text-center bg-rgbawhite10 rounded-[0.3rem] text-[0.64rem] mr-2">
                            {{item.slice(5)}}</div>
                       
                    </div>
                    <div class="mt-[2rem] ml-2 mr-6 ">
                        <div class="flex justify-between items-center mb-[0.65rem]">
                            <img :src="MonthlybettingImg.img_down" alt="" class="w-[1.25rem] h-[1.25rem] mr-2" />
                            <span class="text-xs flex-1">Depósito</span>
                            <span class="text-four text-xs font-bold w-[2.5rem]">{{needRecharge }}</span>
                        </div>

                        <div class="flex justify-between items-center mb-[0.65rem]">
                            <img :src="MonthlybettingImg.img_game" alt="" class="w-[1.25rem] h-[1.0rem] mr-2" />
                            <span class="text-xs flex-1">Volume de apostas</span>
                            <span class="text-four text-xs font-bold w-[2.5rem]">{{needBetRef}}</span>
                        </div>
                        <div class="flex justify-between items-center ">
                            <img :src="MonthlybettingImg.img_time" alt="" class="w-[1.25rem] h-[1.25rem] mr-2" />
                            <span class="text-xs flex-1">Dias de apostas</span>
                            <span class="text-four text-xs font-bold w-[2.5rem]">{{needBetdays}}<span
                                    class="text-themewhite  text-[0.6rem] ml-1">Dias</span></span>
                        </div>

                    </div>
                </div>
            </pu-card>
            <pu-card theme="3" class="relative mt-[2.5rem]">
                <div class="h-[22rem] px-2 py-4"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_slots})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">


                    <!-- 老虎机窗口（叠加在背景机台中间） -->
                    <div class="absolute left-[49.8%] -translate-x-1/2 top-[7.25rem] w-[14rem] ">
                        <div class="number-container flex items-center justify-center mt-[-0.1rem]">
                            <div v-for="(d, idx) in slotNumbersRef" :key="idx"
                                class="slot-reel overflow-hidden flex flex-col items-center select-none px-[0.5rem] h-[4.5rem]"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.img_item_bg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                                <div class="slot-column flex flex-col items-center"
                                    :class="slotSpinningRef ? 'slot-column-spinning' : ''"
                                    :style="!slotSpinningRef ? { transform: `translateY(-${d * 4.5}rem)`, transition: 'transform 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95)' } : {}">
                                    <span v-for="n in 10" :key="n"
                                        class="number-item block leading-[4.5rem] h-[4.5rem] font-extrabold">{{ n - 1 }}</span>
                                    <!-- 复制一份实现无缝衔接感 -->
                                    <span v-for="n in 10" :key="'copy-'+n"
                                        class="number-item block leading-[4.5rem] h-[4.5rem] font-extrabold">{{ n - 1 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 底部按钮（Sorteio / Lista de Classificação） -->
                    <div
                        class="absolute left-[49.8%] -translate-x-1/2 bottom-[4rem] w-[16.8rem] flex items-center justify-between">
                        <img :src="canDrawRef == 0 ? MonthlybettingImg.btn2 : MonthlybettingImg.btn1" @click="onClickDraw"
                            :disabled="slotSpinningRef" alt="" class="w-[10rem] h-full object-contain " />

                        <img :src="rankalllistRef.length>0?MonthlybettingImg.btn3:MonthlybettingImg.btn4" @click="openrank" alt=""
                            class="w-[6.5rem] h-full object-contain" />

                    </div>
                </div>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1  bg-gradient-to-r from-transparent to-four"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-four">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-theme" v-html="contentRef"></article>
            </pu-card>
            <div v-if="showRanklist"
                class=" bg-rgbablack50  w-full h-full fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[2009] px-4">

                <div class="h-[35rem] relative max-w-[22rem]  w-full"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_tcbg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                     <button @click="showRanklist=false"
                    class="w-10 h-10 absolute right-0 top-[-1rem] flex items-center justify-center">
                    <img :src="CommonImg.btn_close" class="w-[1.5rem] h-[1.5rem]" />
                </button>
                    <div class="flex items-center justify-center w-full mt-[5.9rem] font-bold text-white ">
                        <p class="mr-4">Data de Desenho</p>
                        <p>{{rankdateRef}}</p>
                    </div>

                    <!-- 排行榜 Top 3 -->
                    <div class="flex justify-center items-end mt-[3rem] px-2 ">
                        <!-- 2nd Place -->
                        <div class="relative flex flex-col items-center w-[6.5rem]">
                            <div class="relative w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_2})` }">
                                <p class="text-white text-[0.7rem] mt-[4rem]">{{ ranktop2Ref.username }}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-white text-[0.7rem]">Bônus</span>
                                    <span class="text-four text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop2Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>

                        <!-- 1st Place -->
                        <div class="relative flex flex-col items-center w-[7rem] -mx-2 z-10">
                            <div class="relative top-[-2rem] w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4 "
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_1})` }">
                                <p class="text-white text-[0.7rem] mt-[4rem]">{{ranktop1Ref.username}}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-white text-[0.7rem]">Bônus</span>
                                    <span class="text-four text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop1Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 3rd Place -->
                        <div class="relative flex flex-col items-center w-[6.5rem]">
                            <div class="relative w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_3})` }">
                                <p class="text-themewhite text-[0.7rem] mt-[4rem]">{{ranktop3Ref.username}}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-themewhite text-[0.7rem]">Bônus</span>
                                    <span class="text-four text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop3Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 mt-4">
                        <!-- 列表 -->
                        <div class=" h-[14rem] overflow-y-auto rank-list-scrollbar bg-tablebg  rounded-xl">
                            <div v-for="(item, index) in ranklistRef" :key="index"
                                class="flex items-center justify-between py-1 px-3 " :class="index%2 ? '' : 'bg-tablebg2'">
                                <div class="flex items-center">
                                    <span class="text-themewhite text-[0.64rem] w-6">{{ index+4 }}</span>
                                    <span class="text-themewhite text-[0.7rem]">{{item.username}}</span>
                                </div>
                                <span class="text-four text-[0.8rem] font-bold">{{ currentUnit.value }}{{ item.bonus }}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <div v-if="currentTemplate.value == 'template_three'">
            <pu-card theme="3">
                <div class="h-[10rem] px-2 py-4 mt-6"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_topbg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                    <div class="flex align-left justify-left  ml-[5.75rem]">
                        <div v-for="(item,index) in datelistRef"
                            class="text-white flex px-2  py-1 items-center justify-center text-center bg-rgbawhite10 rounded-[0.3rem] text-[0.64rem] mr-2">
                            {{item.slice(5)}}</div>
                       
                    </div>
                    <div class="mt-[2rem] ml-2 mr-6 ">
                        <div class="flex justify-between items-center mb-[0.65rem]">
                            <img :src="MonthlybettingImg.img_down" alt="" class="w-[1.25rem] h-[1.25rem] mr-2" />
                            <span class="text-xs flex-1">{{ t('deposit') }}</span>
                            <span class="text-themetext0 text-xs font-bold w-[2.5rem]">{{needRecharge }}</span>
                        </div>

                        <div class="flex justify-between items-center mb-[0.65rem]">
                            <img :src="MonthlybettingImg.img_game" alt="" class="w-[1.25rem] h-[1.0rem] mr-2" />
                            <span class="text-xs flex-1">{{ t('activityCenter.Bettingvolume') }}</span>
                            <span class="text-themetext0 text-xs font-bold w-[2.5rem]">{{needBetRef}}</span>
                        </div>
                        <div class="flex justify-between items-center ">
                            <img :src="MonthlybettingImg.img_time" alt="" class="w-[1.25rem] h-[1.25rem] mr-2" />
                            <span class="text-xs flex-1">{{ t("activityCenter.Bettingdays") }}</span>
                            <span class="text-themetext0 text-xs font-bold w-[2.5rem]">{{needBetdays}}<span
                                    class="text-themewhite  text-[0.6rem] ml-1">{{ t('account.days') }}</span></span>
                        </div>

                    </div>
                </div>
            </pu-card>
            <pu-card theme="3" class="relative mt-[2.5rem]">
                <div class="h-[22rem] px-2 py-4"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_slots})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">


                    <!-- 老虎机窗口（叠加在背景机台中间） -->
                    <div class="absolute left-[49.8%] -translate-x-1/2 top-[7.25rem] w-[14rem] ">
                        <div class="number-container flex items-center justify-center mt-[-0.1rem]">
                            <div v-for="(d, idx) in slotNumbersRef" :key="idx"
                                class="slot-reel overflow-hidden flex flex-col items-center select-none px-[0.5rem] h-[4.5rem]"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.img_item_bg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                                <div class="slot-column flex flex-col items-center"
                                    :class="slotSpinningRef ? 'slot-column-spinning' : ''"
                                    :style="!slotSpinningRef ? { transform: `translateY(-${d * 4.5}rem)`, transition: 'transform 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95)' } : {}">
                                    <span v-for="n in 10" :key="n"
                                        class="number-item block leading-[4.5rem] h-[4.5rem] font-extrabold">{{ n - 1 }}</span>
                                    <!-- 复制一份实现无缝衔接感 -->
                                    <span v-for="n in 10" :key="'copy-'+n"
                                        class="number-item block leading-[4.5rem] h-[4.5rem] font-extrabold">{{ n - 1 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 底部按钮（Sorteio / Lista de Classificação） -->
                    <div
                        class="absolute left-[49.8%] -translate-x-1/2 bottom-[4rem] w-[16.8rem] flex items-center justify-between">
                        <img :src="canDrawRef == 0 ? MonthlybettingImg.btn2 : MonthlybettingImg.btn1" @click="onClickDraw"
                            :disabled="slotSpinningRef" alt="" class="w-[10rem] h-full object-contain " />

                        <img :src="rankalllistRef.length>0?MonthlybettingImg.btn3:MonthlybettingImg.btn4" @click="openrank" alt=""
                            class="w-[6.5rem] h-full object-contain" />

                    </div>
                </div>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                        <span>{{ t('ActivityDescription') }}</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-themetext3" v-html="contentRef"></article>
            </pu-card>
            <div v-if="showRanklist"
                class=" bg-rgbablack50  w-full h-full fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[2009] px-4">

                <div class="h-[35rem] relative max-w-[22rem]  w-full"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_tcbg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                    <button @click="showRanklist=false"
                    class="w-10 h-10 absolute right-0 top-[-1rem] flex items-center justify-center">
                    <img :src="CommonImg.btn_close" class="w-[1.5rem] h-[1.5rem]" />
                </button>
                    <div class="flex items-center justify-center w-full mt-[5.9rem] font-bold text-white ">
                        <p class="mr-4">{{ t(' activityCenter.DrawingDate') }}</p>
                        <p>{{rankdateRef}}</p>
                    </div>

                    <!-- 排行榜 Top 3 -->
                    <div class="flex justify-center items-end mt-[3rem] px-2 ">
                        <!-- 2nd Place -->
                        <div class="relative flex flex-col items-center w-[6.5rem]">
                            <div class="relative w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_2})` }">
                                <p class="text-white text-[0.7rem] mt-[4rem]">{{ ranktop2Ref.username }}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-white text-[0.7rem]">{{ t('Bonus') }}</span>
                                    <span class="text-themetext0 text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop2Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>

                        <!-- 1st Place -->
                        <div class="relative flex flex-col items-center w-[7rem] -mx-2 z-10">
                            <div class="relative top-[-2rem] w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4 "
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_1})` }">
                                <p class="text-white text-[0.7rem] mt-[4rem]">{{ranktop1Ref.username}}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-white text-[0.7rem]">{{ t('Bonus') }}</span>
                                    <span class="text-themetext0 text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop1Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 3rd Place -->
                        <div class="relative flex flex-col items-center w-[6.5rem]">
                            <div class="relative w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_3})` }">
                                <p class="text-themewhite text-[0.7rem] mt-[4rem]">{{ranktop3Ref.username}}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-themewhite text-[0.7rem]">{{ t('Bonus') }}</span>
                                    <span class="text-themetext0 text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop3Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 mt-4">
                        <!-- 列表 -->
                        <div class=" h-[14rem] overflow-y-auto rank-list-scrollbar bg-tablebg  rounded-xl">
                            <div v-for="(item, index) in ranklistRef" :key="index"
                                class="flex items-center justify-between py-1 px-3 " :class="index%2 ? '' : 'bg-tablebg2'">
                                <div class="flex items-center">
                                    <span class="text-themewhite text-[0.64rem] w-6">{{ index+4 }}</span>
                                    
                                    <span class="text-themewhite text-[0.7rem]">{{item.username}}</span>
                                </div>
                                <span class="text-themetext0 text-[0.8rem] font-bold">{{ currentUnit.value }}{{ item.bonus }}</span>
                            </div>
                        </div>

                    </div>

                    <!-- <div class="mt-4 px-4 h-[12rem] overflow-y-auto rank-list-scrollbar">
                        <div v-for="(item, index) in rankListRef" :key="index"
                            class="flex items-center justify-between h-[2.5rem] mb-1 px-3 rounded-lg bg-black/40">
                            <div class="flex items-center">
                                <span class="text-white text-[0.8rem] w-6">{{ item.rank }}</span>
                                <img :src="item.avatar" class="w-[1.8rem] h-[1.8rem] rounded-full mr-2" />
                                <span class="text-white text-[0.7rem]">{{ item.name }}</span>
                            </div>
                            <span class="text-[#FFDE00] text-[0.8rem] font-bold">{{ item.amount }}</span>
                        </div>
                    </div> -->
                </div>
            </div>

        </div>
        <div v-if="currentTemplate.value == 'template_four'">
            <pu-card theme="3">
                <div class="h-[10rem] px-2 py-4"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_topbg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                    <div class="flex align-left justify-left  ml-[5.75rem] ">
                        
                        <div v-for="(item,index) in datelistRef"
                            class=" text-white flex px-2  py-1 items-center justify-between text-center bg-rgbawhite10 rounded-[0.3rem] text-[0.64rem] mr-2 ">
                            {{item.slice(5)}}</div>
                       
                    </div>
                    <div class="mt-[2rem] ml-2 mr-6 ">
                        <div class="flex justify-between items-center mb-[0.65rem]">
                            <img :src="MonthlybettingImg.img_down" alt="" class="w-[1.25rem] h-[1.25rem] mr-2" />
                            <span class="text-xs flex-1">Depósito</span>
                            <span class="text-themetext0 text-xs font-bold w-[2.5rem]">{{needRecharge }}</span>
                        </div>

                        <div class="flex justify-between items-center mb-[0.65rem]">
                            <img :src="MonthlybettingImg.img_game" alt="" class="w-[1.25rem] h-[1.0rem] mr-2" />
                            <span class="text-xs flex-1">Volume de apostas</span>
                            <span class="text-themetext0 text-xs font-bold w-[2.5rem]">{{needBetRef}}</span>
                        </div>
                        <div class="flex justify-between items-center ">
                            <img :src="MonthlybettingImg.img_time" alt="" class="w-[1.25rem] h-[1.25rem] mr-2" />
                            <span class="text-xs flex-1">Dias de apostas</span>
                            <span class="text-themetext0 text-xs font-bold w-[2.5rem]">{{needBetdays}}<span
                                    class="text-themewhite  text-[0.6rem] ml-1">Dias</span></span>
                        </div>

                    </div>
                </div>
            </pu-card>
            <pu-card theme="3" class="relative mt-[2.5rem]">
                <div class="h-[22rem] px-2 py-4"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_slots})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">


                    <!-- 老虎机窗口（叠加在背景机台中间） -->
                    <div class="absolute left-[49.8%] -translate-x-1/2 top-[7.25rem] w-[14rem] ">
                        <div class="number-container flex items-center justify-center mt-[-0.1rem]">
                            <div v-for="(d, idx) in slotNumbersRef" :key="idx"
                                class="slot-reel overflow-hidden flex flex-col items-center select-none px-[0.5rem] h-[4.5rem]"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.img_item_bg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                                <div class="slot-column flex flex-col items-center"
                                    :class="slotSpinningRef ? 'slot-column-spinning' : ''"
                                    :style="!slotSpinningRef ? { transform: `translateY(-${d * 4.5}rem)`, transition: 'transform 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95)' } : {}">
                                    <span v-for="n in 10" :key="n"
                                        class="number-item block leading-[4.5rem] h-[4.5rem] font-extrabold">{{ n - 1 }}</span>
                                    <!-- 复制一份实现无缝衔接感 -->
                                    <span v-for="n in 10" :key="'copy-'+n"
                                        class="number-item block leading-[4.5rem] h-[4.5rem] font-extrabold">{{ n - 1 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 底部按钮（Sorteio / Lista de Classificação） -->
                    <div
                        class="absolute left-[49.8%] -translate-x-1/2 bottom-[4rem] w-[16.8rem] flex items-center justify-between">
                        <img :src="canDrawRef == 0 ? MonthlybettingImg.btn2 : MonthlybettingImg.btn1" @click="onClickDraw"
                            :disabled="slotSpinningRef" alt="" class="w-[10rem] h-full object-contain " />

                        <img :src="rankalllistRef.length>0?MonthlybettingImg.btn3:MonthlybettingImg.btn4" @click="openrank" alt=""
                            class="w-[6.5rem] h-full object-contain" />

                    </div>
                </div>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                    <span>Descrição da Atividade:</span>
                </h5>
                <article class="ctx-article p-mb text-sm text-themetext3" v-html="contentRef"></article>
            </pu-card>
            <!-- showRanklist -->
            <div v-if="showRanklist"
                class=" bg-rgbablack50 w-full h-full fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[2009] px-4">

              
                <div class="h-[35rem]  max-w-[22rem] relative w-full"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_tcbg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                    
                      <button @click="showRanklist=false"
                    class="w-10 h-10 absolute right-0 top-[-2rem] flex items-center justify-center">
                    <img :src="CommonImg.btn_close" class="w-[1.5rem] h-[1.5rem]" />
                </button>
                    <div class="flex items-center justify-center w-full mt-[5.9rem] font-bold text-white ">
                        <p class="mr-4">Data de Desenho</p>
                        <p>{{rankdateRef}}</p>
                    </div>

                    <!-- 排行榜 Top 3 -->
                    <div class="flex justify-center items-end mt-[3rem] px-2 ">
                        <!-- 2nd Place -->
                        <div class="relative flex flex-col items-center w-[6.5rem]">
                            <div class="relative w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_2})` }">
                                <p class="text-white text-[0.7rem] mt-[4rem]">{{ ranktop2Ref.username }}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-white text-[0.7rem]">Bônus</span>
                                    <span class="text-themetext0 text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop2Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>

                        <!-- 1st Place -->
                        <div class="relative flex flex-col items-center w-[7rem] -mx-2 z-10">
                            <div class="relative top-[-2rem] w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4 "
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_1})` }">
                                <p class="text-white text-[0.7rem] mt-[4rem]">{{ranktop1Ref.username}}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-white text-[0.7rem]">Bônus</span>
                                    <span class="text-themetext0 text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop1Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 3rd Place -->
                        <div class="relative flex flex-col items-center w-[6.5rem]">
                            <div class="relative w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_3})` }">
                                <p class="text-themewhite text-[0.7rem] mt-[4rem]">{{ranktop3Ref.username}}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-themewhite text-[0.7rem]">Bônus</span>
                                    <span class="text-themetext0 text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop3Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 mt-4">
                        <!-- 列表 -->
                        <div class=" h-[14rem] overflow-y-auto rank-list-scrollbar bg-tablebg  rounded-xl">
                            <div v-for="(item, index) in ranklistRef" :key="index"
                                class="flex items-center justify-between py-1 px-3 " :class="index%2 ? '' : 'bg-tablebg2'">
                                <div class="flex items-center">
                                    <span class="text-themewhite text-[0.64rem] w-6">{{ index+4 }}</span>
                                    
                                    <span class="text-themewhite text-[0.7rem]">{{item.username}}</span>
                                </div>
                                <span class="text-themetext0 text-[0.8rem] font-bold">{{ currentUnit.value }}{{ item.bonus }}</span>
                            </div>
                        </div>

                    </div>

                    <!-- <div class="mt-4 px-4 h-[12rem] overflow-y-auto rank-list-scrollbar">
                        <div v-for="(item, index) in rankListRef" :key="index"
                            class="flex items-center justify-between h-[2.5rem] mb-1 px-3 rounded-lg bg-black/40">
                            <div class="flex items-center">
                                <span class="text-white text-[0.8rem] w-6">{{ item.rank }}</span>
                                <img :src="item.avatar" class="w-[1.8rem] h-[1.8rem] rounded-full mr-2" />
                                <span class="text-white text-[0.7rem]">{{ item.name }}</span>
                            </div>
                            <span class="text-[#FFDE00] text-[0.8rem] font-bold">{{ item.amount }}</span>
                        </div>
                    </div> -->
                </div>
            </div>

        </div>
        <div v-if="currentTemplate.value == 'template_five'">
            <pu-card theme="3">
                <div class="h-[10rem] px-2 py-4"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_topbg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                    <div class="flex align-left justify-left  ml-[5.75rem]">
                        
                        <div v-for="(item,index) in datelistRef"
                            class="text-white flex  py-1 px-0.5 items-center justify-center text-center bg-rgbawhite10 rounded-[0.3rem] text-[0.64rem] mr-0.5">
                            {{item}}</div>
                       
                    </div>
                    <div class="mt-[2rem] ml-2 mr-6 ">
                        <div class="flex justify-between items-center mb-[0.65rem]">
                            <img :src="MonthlybettingImg.img_down" alt="" class="w-[1.25rem] h-[1.25rem] mr-2" />
                            <span class="text-xs flex-1">Depósito</span>
                            <span class="text-themetext0 text-xs font-bold w-[2.5rem]">{{needRecharge }}</span>
                        </div>

                        <div class="flex justify-between items-center mb-[0.65rem]">
                            <img :src="MonthlybettingImg.img_game" alt="" class="w-[1.25rem] h-[1.0rem] mr-2" />
                            <span class="text-xs flex-1">Volume de apostas</span>
                            <span class="text-themetext0 text-xs font-bold w-[2.5rem]">{{needBetRef}}</span>
                        </div>
                        <div class="flex justify-between items-center ">
                            <img :src="MonthlybettingImg.img_time" alt="" class="w-[1.25rem] h-[1.25rem] mr-2" />
                            <span class="text-xs flex-1">Dias de apostas</span>
                            <span class="text-themetext0 text-xs font-bold w-[2.5rem]">{{needBetdays}}<span
                                    class="text-themewhite  text-[0.6rem] ml-1">Dias</span></span>
                        </div>
                    </div>
                </div>
            </pu-card>
            <pu-card theme="3" class="relative mt-[2.5rem]">
                <div class="h-[22rem] px-2 py-4 relative"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_slots})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                    <!-- 老虎机窗口（叠加在背景机台中间） -->
                    <div class="absolute left-[49.8%] -translate-x-1/2 top-[7.25rem] w-[14rem] ">
                        <div class="number-container flex items-center justify-center mt-[-0.1rem]">
                            <div v-for="(d, idx) in slotNumbersRef" :key="idx"
                                class="slot-reel overflow-hidden flex flex-col items-center select-none px-[0.5rem] h-[4rem]">
                                <div class="slot-column flex flex-col items-center"
                                    :class="slotSpinningRef ? 'slot-column-spinning' : ''"
                                    :style="!slotSpinningRef ? { transform: `translateY(-${d * 4.5}rem)`, transition: 'transform 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95)' } : {}">
                                    <span v-for="n in 10" :key="n"
                                        class="number-item block !leading-[4rem] h-[4rem] font-extrabold">{{ n - 1 }}</span>
                                    <!-- 复制一份实现无缝衔接感 -->
                                    <span v-for="n in 10" :key="'copy-'+n"
                                        class="number-item block !leading-[4rem] h-[4rem] font-extrabold">{{ n - 1 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 底部按钮（Sorteio / Lista de Classificação） -->
                    <div
                        class="absolute left-[49.8%] -translate-x-1/2 bottom-[4rem] w-[16.8rem] flex items-center justify-between">
                        <img :src="canDrawRef == 0 ? MonthlybettingImg.btn2 : MonthlybettingImg.btn1" @click="onClickDraw"
                            :disabled="slotSpinningRef" alt="" class="w-[10rem] h-full object-contain " />

                        <img :src="rankalllistRef.length>0?MonthlybettingImg.btn3:MonthlybettingImg.btn4" @click="openrank" alt=""
                            class="w-[6.5rem] h-full object-contain" />

                    </div>
                </div>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                    <span>Descrição da Atividade:</span>
                </h5>
                <article class="ctx-article p-mb text-sm text-themetext4" v-html="contentRef"></article>
            </pu-card>
            <div v-if="showRanklist"
                class=" bg-rgbablack50  w-full h-full fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[2009] px-4">

                <button @click="showRanklist=false"
                    class="w-10 h-10 absolute right-[1rem] top-[4rem] flex items-center justify-center">
                    <img :src="CommonImg.btn_close" class="w-[1.5rem] h-[1.5rem]" />
                </button>
                <div class="h-[35rem]  w-full"
                    :style="{ backgroundImage: `url(${MonthlybettingImg.img_tcbg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
                    <div class="flex items-center justify-center w-full mt-[5.9rem] font-bold text-white ">
                        <p class="mr-4">Data de Desenho</p>
                        <p>{{rankdateRef}}</p>
                    </div>

                    <!-- 排行榜 Top 3 -->
                    <div class="flex justify-center items-end mt-[3rem] px-2 ">
                        <!-- 2nd Place -->
                        <div class="relative flex flex-col items-center w-[6.5rem]">
                            <div class="relative w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_2})` }">
                                <p class="text-white text-[0.7rem] mt-[4rem]">{{ ranktop3Ref.username }}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-white text-[0.7rem]">Bônus</span>
                                    <span class="text-themetext0 text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop3Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>

                        <!-- 1st Place -->
                        <div class="relative flex flex-col items-center w-[7rem] -mx-2 z-10">
                            <div class="relative top-[-2rem] w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4 "
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_1})` }">
                                <p class="text-white text-[0.7rem] mt-[4rem]">{{ranktop1Ref.username}}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-white text-[0.7rem]">Bônus</span>
                                    <span class="text-themetext0 text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop1Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 3rd Place -->
                        <div class="relative flex flex-col items-center w-[6.5rem]">
                            <div class="relative w-full h-[9rem] bg-no-repeat bg-contain bg-center flex flex-col items-center pt-4"
                                :style="{ backgroundImage: `url(${MonthlybettingImg.phb_3})` }">
                                <p class="text-themewhite text-[0.7rem] mt-[4rem]">{{ranktop2Ref.username}}</p>
                                <div class="bg-rgbablack30 rounded px-1 -mt-[0.05rem] flex flex-col items-center">
                                    <span class="text-themewhite text-[0.7rem]">Bônus</span>
                                    <span class="text-themetext0 text-[0.6rem] font-bold -mt-1">{{ currentUnit.value }}{{ranktop2Ref.bonus}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 mt-4">
                        <!-- 列表 -->
                        <div class=" h-[14rem] overflow-y-auto rank-list-scrollbar bg-tablebg  rounded-xl">
                            <div v-for="(item, index) in ranklistRef" :key="index"
                                class="flex items-center justify-between py-1 px-3 " :class="index%2 ? '' : 'bg-tablebg2'">
                                <div class="flex items-center">
                                    <span class="text-themewhite text-[0.64rem] w-6">{{ index+4 }}</span>
                                    <img src="/imgs/common/m2.png" class="w-[1.2rem] h-[1.2rem] rounded-full mr-2" />
                                    <span class="text-themewhite text-[0.7rem]">{{item.username}}</span>
                                </div>
                                <span class="text-themetext0 text-[0.8rem] font-bold">{{ currentUnit.value }}{{ item.bonus }}</span>
                            </div>
                        </div>

                    </div>

                    <!-- <div class="mt-4 px-4 h-[12rem] overflow-y-auto rank-list-scrollbar">
                        <div v-for="(item, index) in rankListRef" :key="index"
                            class="flex items-center justify-between h-[2.5rem] mb-1 px-3 rounded-lg bg-black/40">
                            <div class="flex items-center">
                                <span class="text-white text-[0.8rem] w-6">{{ item.rank }}</span>
                                <img :src="item.avatar" class="w-[1.8rem] h-[1.8rem] rounded-full mr-2" />
                                <span class="text-white text-[0.7rem]">{{ item.name }}</span>
                            </div>
                            <span class="text-[#FFDE00] text-[0.8rem] font-bold">{{ item.amount }}</span>
                        </div>
                    </div> -->
                </div>
            </div>

        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>

<style scoped>
.slot-digit {
    font-size: 2.2rem;
    text-shadow:
        0 0 6px rgba(255, 238, 0, 0.6),
        /* 0 0 14px rgba(255, 196, 0, 0.5),
    0 0 22px rgba(255, 166, 0, 0.35), */
        2px 2px 4px rgba(0, 0, 0, 0.8);
    /* letter-spacing: 0.3em; */
    /* 默认 */
    font-variant-numeric: tabular-nums;
    /* 数字等宽，减少偏移 */
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

}

.slot-column-spinning {
    animation: slotColumnSpin 0.3s linear infinite;
}

@keyframes slotColumnSpin {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-45rem); /* 10个数字 * 4.5rem */
    }
}

.slot-digit::after {
    content: attr(data-digit);
    position: absolute;
    inset: 0;
    /* 上移一点做高光 */
    transform: translateY(-2px);
    color: transparent;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 60%);
    -webkit-background-clip: text;
    background-clip: text;
    opacity: 0.7;
    pointer-events: none;
}

.number-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* gap: 0.5rem; */
    padding: 0.2rem;
    border-radius: 0.5rem;
    /* background-color: #fcff00; */
}

.number-item {
    line-height: 4.5rem;
    height: 4.5rem;
    font-size: 2.5rem;
    /* 调整字体大小 */
    -webkit-text-fill-color: transparent;
    background: linear-gradient(to bottom, #fffcd1 30%, #ffde00 50%, #ffa800 100%);
    -webkit-background-clip: text;
    /* Safari支持 */
    background-clip: text;
    /* 渐变背景裁剪用于文字 */
    color: transparent;
    /* 文字颜色设为透明 */
    /* ff9e14-972400 */
    -webkit-text-stroke: 1px #ff9e14;
    /* 阴影写“具体颜色”，不依赖 currentColor，否则容易把渐变盖掉/失效 */
    text-shadow:
        0px 1px 0 #ffde00,
        0px 1px 0 #972400,
        0 0 6px rgba(0, 0, 0, 0.6);
}
</style>
