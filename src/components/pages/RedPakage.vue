<script setup>
import { computed, onMounted, ref } from 'vue'
import { t,fn } from '@/i18n'
import { randNumberFunc, resetTimeFunc, isIphoneSE, playBtnAudioFunc } from '@/utils/core'
import { redPakageShowRef, redPakageDataRef, redPakageAmountRef, redPakageStateRef, redPakageModel } from '@/model/other'
import { useThemeImages } from '@/utils/themeimg'
const CommonImg = useThemeImages().common
const RedpacketImg = useThemeImages().redpacket
const { takeRedPakageFunc } = redPakageModel()

let red_pakage_list = computed(() => {
    let list = [];
    for (var i = 0; i < 60; i++) {
        let top = Math.floor(Math.random() * 7);
        let left = Math.floor(Math.random() * 96);
        let delayTime = Math.floor(Math.random() * 40 + 2);
        let type = randNumberFunc(1, 4);
        let params = {
            type: parseInt(type),
            css: {
                'top': `${top}%`,
                'left': `${left}%`,
                'animation-delay': `${delayTime / 10}s`
            }
        }
        list.push(params);
    }
    return list;
})

function clickClose() {
    playBtnAudioFunc()
    redPakageShowRef.value = false
}

</script>

<template>
    <teleport to="body">

        <!-- redPakageShowRef -->
        <section v-if="redPakageShowRef"
            class="w-wrap max-w-full h-full pb-20 fixed top-0 z-[99] left-0 right-0  mx-auto flex items-center justify-center">
            <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
            <section class="w-full h-full absolute left-0 top-0 overflow-hidden">
                <ul class="red-pakage-list">
                    <template v-for="item, index in red_pakage_list" :key="index">
                        <li :style="item.css">
                            <img v-if="item.type == 4" :src=RedpacketImg.icon_money4
                                class="w-full h-full object-contain block ">
                            <img v-else-if="item.type == 3" :src=RedpacketImg.icon_money3
                                class="w-full h-full object-contain block ">
                            <img v-else-if="item.type == 2" :src=RedpacketImg.icon_money2
                                class="w-full h-full object-contain block ">
                            <img v-else :src=RedpacketImg.icon_money1 class="w-full h-full object-contain block ">
                        </li>
                    </template>
                </ul>
            </section>

            <!-- 添加状态显示方便调试 -->
            <!-- <div class="absolute top-2 left-2 text-themewhite z-50">Status: {{ redPakageStateRef.status }}</div> -->

            <section class="w-full max-h-full px-ctx overflow-y-auto relative z-10"
                v-if="currentTemplate.value == 'template_one'">
                <!-- 可以领取 redPakageStateRef.status == 1-->
                <template v-if="redPakageStateRef.status == 1">
                    <div>
                        <div class="w-[15.625rem] mx-auto relative flex flex-col items-center">
                            <img :src=RedpacketImg.img_redpacketbg1 class="w-full h-auto block">
                            <ul
                                class="!pl-3 !list-disc text-xs leading-normal text-themewhite absolute left-4 right-4 top-[9.375rem]">
                                <li>Membros recarregados podem reivindicar gratuitamente.</li>
                                <li>Valor máximo de queda em dinheiro: {{ currentUnit.value }}{{ 7.777 }}.</li>
                            </ul>
                            <a href="javascript:;" @click="takeRedPakageFunc()"
                                class="w-20 h-16 -ml-10 block absolute left-1/2 top-[14.75rem]"></a>
                            <a href="javascript:;" @click="clickClose()" class="p-3 flex">
                                <em class="w-5 h-5 p-0.5 rounded-full ctx-theme flex items-center justify-center">
                                    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor">
                                        <path
                                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z">
                                        </path>
                                    </svg>
                                </em>
                            </a>
                        </div>
                    </div>
                </template>
                <!-- 已经领取 redPakageStateRef.status == 2-->
                <template v-else-if="redPakageStateRef.status == 2">
                    <div class="w-full h-full relative">
                        <!-- 添加一个透明层处理点击事件 -->
                        <div class="absolute inset-0 z-10" @click="clickClose()"></div>
                        <img :src=RedpacketImg.img_redpacketbg2 class="w-full h-full object-cover block">
                        <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                            <p class="text-themewhite text-lg font-bold">
                                <span>{{ currentUnit.value }}&nbsp;</span>
                                <span class="text-3xl text-four">{{ fn(redPakageAmountRef || 0) }}</span>
                            </p>
                            <p class="text-themeblack text-sm mt-8">
                                Horário de coleta:
                            </p>
                            <p class="text-themeblack text-sm mt-1">
                                {{ resetTimeFunc(redPakageDataRef && redPakageDataRef.receive_time || 0) }}
                            </p>
                        </div>
                        <button @click="clickClose()" class="absolute top-4 right-4 w-10 h-10">
                            <img :src=RedpacketImg.icon_close class="w-full h-full object-contain">
                        </button>
                    </div>
                </template>
                <!-- 不可领取领取 redPakageStateRef.status = 0 -->
                <template v-else>
                    <div
                        class="w-full text-themeblack bg-gradient-to-br from-redbglinear1 to-redbglinear2 rounded-3xl relative overflow-hidden">
                        <img :src=RedpacketImg.img_title class="w-full h-auto block">
                        <button @click="clickClose()"
                            class="w-10 h-10 bg-rgbawhite30 rounded-full absolute right-4 top-4 flex items-center justify-center">
                            <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z">
                                </path>
                            </svg>
                        </button>
                        <div class="p-4 -mt-5 ctx-theme__linear">
                            <p class="text-sm text-center">
                                <b>Máximo de Queda {{ currentUnit.value }} 5.000.000 por vez</b>
                            </p>
                            <p class="text-center font-bold">
                                <span class="text-sm">{{ currentUnit.value }}</span>
                                <!-- <span class="text-2xl text-four">{{ fn(redPakageDataRef&&redPakageDataRef.bonus||0) }}</span> -->
                                <span class="text-2xl text-four">{{ 7.777 }}</span>
                            </p>
                        </div>
                        <div class="w-66 max-w-full mx-auto p-4 bg-drawer-text rounded-b-2xl">
                            <p class="text-base text-center">
                                <b>{{
                                    Object.keys(redPakageDataRef && redPakageDataRef.list
                                        && redPakageDataRef.list || {}).length
                                }}X por dia</b>
                            </p>
                            <ol class="mt-2 text-xs flex flex-wrap">
                                <template v-for="item, index in redPakageDataRef && redPakageDataRef.list || []"
                                    :key="index">
                                    <li class="w-1/2 py-1 flex items-center justify-center">
                                        <svg class="w-3 h-3 mr-1 opacity-65" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 -960 960 960" fill="currentColor">
                                            <path
                                                d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                                        </svg>
                                        <span>{{ item.start_time }} - {{ item.end_time }}</span>
                                    </li>
                                </template>
                            </ol>
                        </div>
                        <div class="p-4">
                            <div class="w-full mb-4 flex items-center">
                                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themeblack"></em>
                                <h5 class="ma-w-[60%] px-2 text-sm text-center">
                                    <span>Descrição da Atividade</span>
                                </h5>
                                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themeblack"></em>
                            </div>
                            <article class="ctx-article p-mb text-xs">
                                <p>1.Cada sessão de chuva de dinheiro é distribuída gratuitamente com {{ currentUnit.value }} 5.000.000.</p>
                                <p>2.Valor máximo da chuva de dinheiro: {{ currentUnit.value }} 7.777</p>
                                <p>3.Membros recarregados podem reivindicar gratuitamente.</p>
                                <p>4.O bônus precisa atingir um volume de negócios 1x para poder ser retirado.</p>
                            </article>
                        </div>
                    </div>
                </template>
            </section>
            <section class="w-full h-full absolute left-0 top-0 overflow-hidden"
                v-else-if="currentTemplate.value == 'template_two'">
                <!-- 可以领取 redPakageStateRef.status == 1-->
                <template v-if=" redPakageStateRef.status == 1">
                    <div class="w-full h-full flex items-center justify-center relative">

                        <!-- 图片容器 - 垂直居中 -->
                        <div class="relative flex flex-col items-center justify-center">
                            <!-- 关闭按钮 -->
                            <div class="absolute top-0 right-[2rem] z-20" @click="clickClose()">
                                <img :src=CommonImg.btn_close class="w-[1.5rem] h-[1.5rem]" />
                            </div>
                            <img :src=RedpacketImg.img_redpacketbg1 class="w-full h-auto block  mx-auto">

                            <ul
                                class="!pl-9 !list-disc text-xs leading-normal text-redpacktext absolute left-9 right-8 top-[33%]">
                                <li>Membros recarregados podem reivindicar gratuitamente.</li>
                                <li>Valor máximo de queda em dinheiro: {{ currentUnit.value }}{{ 7.777 }}.</li>
                            </ul>

                            <!-- Coletar 按钮 - 居中定位 -->
                            <div class="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 px-8 py-2 rounded-[2rem] m2-btn-ten"
                                @click="takeRedPakageFunc()">Coletar</div>
                        </div>
                    </div>
                </template>
                <!-- 已经领取-->
                <!--  -->
                <template v-else-if="redPakageStateRef.status == 2 ">
                    <div class="w-full h-full flex items-center justify-center relative">

                        <!-- 添加一个透明层处理点击事件 -->
                        <div class="relative flex flex-col items-center justify-center">
                            <!-- 关闭按钮 -->
                            <div class="absolute top-[5rem] right-[2rem] z-20" @click="clickClose()">
                                <img :src=CommonImg.btn_close class="w-[1.5rem] h-[1.5rem]" />
                            </div>
                            <img :src=RedpacketImg.img_redpacketbg2 class="w-full h-auto block  mx-auto">

                            <div class="absolute top-[-11%] left-0 w-full h-full flex flex-col items-center justify-center">
                               
                                <p class=" text-redpacktext  text-lg font-bold">
                                    <span>{{ currentUnit.value }}&nbsp;</span>
                                    <span class="text-3xl text-redpacktext">{{ fn(redPakageAmountRef || 0) }}</span>
                                </p>
                                <p class="text-black text-sm mt-4">
                                    Horário de coleta:
                                </p>
                                <p class="text-black text-sm mt-1">
                                    {{ resetTimeFunc(redPakageDataRef && redPakageDataRef.receive_time || 0) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </template>
                <!-- 不可领取领取 redPakageStateRef.status = 0 -->
                <template v-else>
                    <div class="w-[90%] redbox  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                        <div
                            class="relactive pb-4 
                      w-full h-full transform bg-gradient-to-b from-card1 to-card2 overflow-visible rounded-3xl ">
                            <img :src=RedpacketImg.img_title alt=""
                                class="w-full h-auto block overflow-visible relative -top-[4.8rem]" />
                            <div class="absolute top-2 right-2 z-20" @click="clickClose()">
                                <img :src=CommonImg.btn_close class="w-[1.5rem] h-[1.5rem] animate-pulse" />
                            </div>
                            <div class="p-2 font-bold mt-[-5rem]  bg-gradient-to-r from-btnlinar1 to-btnlinar2">
                                <p class="text-sm text-center">
                                    <span>Máximo de Queda {{ currentUnit.value }} 5.000.000 por vez</span>
                                </p>
                                <p class="text-center ">
                                    <span class="text-sm">{{ currentUnit.value }}</span>
                                    <span class="text-2xl text-four">{{ 7.777 }}</span>
                                </p>
                            </div>
                            <div class=" overflow-auto mt-2" :class="isIphoneSE() ? 'max-h-[14rem]' : 'max-h-[20rem]'">
                                <div class="w-66 max-w-full mx-auto text-white ">
                                    <p class="text-base text-center">
                                        <b>{{
                                            Object.keys(redPakageDataRef &&
                                                redPakageDataRef.list && redPakageDataRef.list || {}).length
                                        }}X por dia</b>
                                    </p>
                                    <ol class="mt-2 text-xs flex flex-wrap">
                                        <template v-for="item, index in redPakageDataRef && redPakageDataRef.list || []"
                                            :key="index">
                                            <li class="w-1/2 py-1 flex items-center justify-center">
                                                <svg class="w-3 h-3 mr-1 opacity-65" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 -960 960 960" fill="currentColor">
                                                    <path
                                                        d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                                                </svg>
                                                <span>{{ item.start_time }} - {{ item.end_time }}</span>
                                            </li>
                                        </template>
                                    </ol>
                                </div>
                                <div class="px-4 text-white mt-[0.5rem]">
                                    <div class="w-full mb-2 flex items-center">
                                        <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-white"></em>
                                        <h5 class="ma-w-[60%] px-2 text-sm text-center">
                                            <span>Descrição da Atividade</span>
                                        </h5>
                                        <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-white"></em>
                                    </div>
                                    <article class=" p-mb text-[0.68rem]">
                                        <p>1.Cada sessão de chuva de dinheiro é distribuída gratuitamente com {{ currentUnit.value }}
                                            5.000.000.</p>
                                        <p>2.Valor máximo da chuva de dinheiro: {{ currentUnit.value }} 7.777</p>
                                        <p>3.Membros recarregados podem reivindicar gratuitamente.</p>
                                        <p>4.O bônus precisa atingir um volume de negócios 1x para poder ser retirado.
                                        </p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </section>
            <section class="w-full max-h-full  overflow-y-auto relative z-10 top-10" v-else>
                <!-- 可以领取 redPakageStateRef.status == 1-->
                <template v-if="redPakageStateRef.status == 1">
                    <div>
                        <div class="w-[20rem]  mx-auto relative flex flex-col items-center">
                            <img :src=RedpacketImg.img_redpacketbg1 class="w-full h-auto block relative">
                            <div class="min-w-[14rem] absolute top-[34%] text-text-one text-[1.88rem]  font-bold">
                                <div class=" text-textwhite text-[1.88rem] text-center font-bold">{{ t('activityCenter.rainofmoney') }}</div>
                                <ul class="!pl-10 !list-disc text-[0.88rem] leading-normal text-textwhite absolute ">
                                    <li>{{ t('activityCenter.activityDetail5') }}</li>
                                    <li>{{ t('activityCenter.activityDetail6')  }} {{ currentUnit.value }}{{ 7.777 }}.</li>
                                </ul>
                            </div>

                            <div class="px-8 py-8 text-textwhite text-[1.28rem] rounded-[2rem] absolute top-[67%]"
                                @click="takeRedPakageFunc()">{{ t('Grab') }}</div>
                        </div>
                        <div class="w-full h-[3rem] mt-10 flex justify-center items-center "
                            @click="clickClose()">
                            <img :src=CommonImg.btn_close class="w-[1.5rem] h-[1.5rem]" />
                        </div>
                    </div>

                </template>
                <!-- 已经领取 redPakageStateRef.status == 2-->
                <template v-else-if="redPakageStateRef.status == 2">
                    <div class="w-full h-full relative">
                        <!-- 添加一个透明层处理点击事件 -->
                        <div class="w-full h-[3rem] flex justify-end items-end relative top-[-1rem] right-[1rem] z-10"
                            @click="clickClose()">
                            <img :src=CommonImg.btn_close class="w-[1.5rem] h-[1.5rem]" />
                        </div>
                        <img :src=RedpacketImg.img_redpacketbg2 class="w-full h-full object-cover block">
                        <div class="absolute top-10 left-0 w-full h-full flex flex-col items-center justify-center">
                            <div class="absolute top-[12rem] text-themetext2 text-[1.5rem] font-bold">{{ t('activityCenter.rainofmoney') }}
                            </div>
                            <!-- <img :src=RedpacketImg.img_red class="w-[5rem] h-auto" /> -->
                            <p class=" text-themewhite mt-[7rem] text-lg font-bold">
                                <span>{{ currentUnit.value }}&nbsp;</span>
                                <span class="text-3xl text-redpacktext">{{ fn(redPakageAmountRef || 0) }}</span>
                            </p>
                            <p class="text-themetext3 text-sm mt-5">
                               {{ t('activityCenter.CollectionTimes') }}
                            </p>
                            <p class="text-themetext3 text-sm mt-1">
                                {{ resetTimeFunc(redPakageDataRef && redPakageDataRef.receive_time || 0) }}
                            </p>
                        </div>
                    </div>
                </template>
                <!-- 不可领取领取 redPakageStateRef.status = 0 -->
                <template v-else>
                    <div class="relactive w-full h-full transform m3-theme-bg1 overflow-visible rounded-3xl mt-[5rem]">
                        <img :src=RedpacketImg.img_title alt=""
                            class="w-full h-auto block overflow-visible relative -top-[5.3rem]" />
                        <div class="absolute top-2 right-2 z-20" @click="clickClose()">
                            <img :src=CommonImg.btn_close class="w-[1.5rem] h-[1.5rem] animate-pulse" />
                        </div>
                        <div class="p-2 font-bold mt-[-5.3rem]  bg-gradient-to-r from-btnlinar2 to-btnlinar1">
                            <p class="text-sm text-center text-white">
                                <span>{{ t('activityCenter.Maximumamount') }}</span>
                            </p>
                            <p class="text-center ">
                                <span class="text-sm text-white">{{ currentUnit.value }}</span>
                                <span class="text-2xl text-themetext0">{{ 7.777 }}</span>
                            </p>
                        </div>
                        <div class=" overflow-auto " :class="isIphoneSE() ? 'max-h-[14rem]' : 'max-h-[20rem]'">
                            <div class="w-66 max-w-full mx-auto text-white bg-card2 rounded-xl">
                                <p class="text-base text-center ">
                                    <b>{{
                                        Object.keys(redPakageDataRef && redPakageDataRef.list
                                            && redPakageDataRef.list || {}).length
                                    }}X {{ t('activityCenter.perday') }}</b>
                                </p>
                                <ol class="mt-2 text-xs flex flex-wrap">
                                    <template v-for="item, index in redPakageDataRef && redPakageDataRef.list || []"
                                        :key="index">
                                        <li class="w-1/2 py-1 flex items-center justify-center">
                                            <svg class="w-3 h-3 mr-1 opacity-65" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 -960 960 960" fill="currentColor">
                                                <path
                                                    d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                                            </svg>
                                            <span>{{ item.start_time }} - {{ item.end_time }}</span>
                                        </li>
                                    </template>
                                </ol>
                            </div>
                            <div class="px-4 text-white mt-[0.5rem]">
                                <div class="w-full mb-2 flex items-center">
                                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-white"></em>
                                    <h5 class="ma-w-[60%] px-2 text-sm text-center">
                                        <span>{{ t('ActivityDescription') }}</span>
                                    </h5>
                                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-white"></em>
                                </div>
                                <article class=" p-mb text-[0.68rem]">
                                    <p>{{ t('activityCenter.activityDetail7') }}
                                    </p>
                                    <p>{{ t('activityCenter.activityDetail8') }}</p>
                                    <p>{{ t('activityCenter.activityDetail9') }}</p>
                                    <p>{{ t('activityCenter.activityDetail10') }}</p>
                                </article>
                            </div>
                        </div>
                    </div>
                </template>
            </section>
        </section>
    </teleport>
</template>
<style scoped>
.red-pakage-list li {
    position: absolute;
    width: 60px;
    height: 60px;
    animation: run 3s ease-in infinite;
    opacity: 0;
}

@keyframes run {
    0% {
        opacity: 1;
        transform: translate3d(0px, -100px, 0px) rotate(0deg);
    }

    /* 1%{
        opacity: 1;
        transform: translate3d(0px,0px,0px) rotate(10deg);
    } */

    100% {
        opacity: 1;
        transform: translate3d(10px, 120vh, -10px) rotate(360deg);
    }
}
@media (min-width: 819px) and (max-width: 1024px) {
    .redbox{
        top: 55% !important;
    }
}
@media (min-width: 1025px) {
    .redbox{
        top: 55% !important;
    }
}
@media (min-width: 1400px) {
    .redbox{
        top: 55% !important;
    }
} 
</style>