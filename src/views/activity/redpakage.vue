<script setup>
import { computed, onMounted, ref } from 'vue'
import { fn } from '@/i18n'
import { randNumberFunc, resetTimeFunc } from '@/utils/core'
import { redPakageShowRef, redPakageDataRef, redPakageAmountRef, redPakageStateRef, redPakageModel } from '@/model/other'
import { playBtnAudioFunc } from '@/utils/core'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const { takeRedPakageFunc, redPakageDataFunc } = redPakageModel()
import { useThemeImages } from '@/utils/themeimg'
const RedpacketImg = useThemeImages().redpacket
const CommonImg = useThemeImages().common
// 替换当前的计算属性部分
let redPakageListPairs = computed(() => {
    const listData = redPakageDataRef.value?.list || {};
    const entries = Object.entries(listData);
    const pairs = [];

    for (let i = 0; i < entries.length; i += 2) {
        const pair = [entries[i]];
        if (entries[i + 1]) {
            pair.push(entries[i + 1]);
        }
        pairs.push(pair);
    }

    return pairs;
});
onMounted(() => {
    // 组件挂载时不需要额外操作，sevendaybackModel 中已有初始化逻辑
    redPakageDataFunc()
})
</script>

<template>
    <pu-page title="Chuva de Dinheiro" class="z-[999]" hideService v-if="currentTemplate.value == 'template_five'">
        <!-- 顶部banner -->
        <img :src="RedpacketImg.img_title" alt="Grande Retorno de Depósito"
            class="absolute inset-0 " />
        <img class="h-[18rem]"  :src="CommonImg.m4_null" alt="">
        <!-- :class="redPakageStateRef.status != 2 &&redPakageStateRef.status != 1 ?'top-16':''" -->
        <section class="w-full max-h-full px-ctx  relative z-10">
            <!-- 可以领取 redPakageStateRef.status == 1 -->
            <template v-if="redPakageStateRef.status == 1">
                <div class="w-full py-6  flex flex-col items-center bg-gradient-to-r from-btnlinar3 to-btnlinar4 rounded-lg">

                    <div class=" text-themewhite text-[1.5rem] font-bold">Chuva de dinheiro</div>
                    <ul class="px-[3rem] !list-disc text-[0.88rem] leading-normal text-white  mt-5">
                        <li>Membros recarregados podem reivindicar gratuitamente.</li>
                        <li>Valor máximo de queda em dinheiro: R${{ 7.777 }}.</li>
                    </ul>
                    <!-- <a href="javascript:;"  class="w-20 h-16 -ml-10 block absolute left-1/2 top-[14.75rem]"></a>
                    <a href="javascript:;" @click="clickClose()" class="p-3 flex">
                        <em class="w-5 h-5 p-0.5 rounded-full ctx-theme flex items-center justify-center">
                            <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                            </svg>
                        </em>
                    </a> -->
                    <div class="mt-5 px-10 py-1  m5-theme-btn1 rounded-[2rem] font-bold" @click="takeRedPakageFunc()">
                        Coletar</div>
                </div>
            </template>
            <!-- 已经领取 redPakageStateRef.status == 2-->
            <template v-else-if="redPakageStateRef.status == 2">
                <div class="w-full h-full py-6 bg-gradient-to-r from-btnlinar3 to-btnlinar4 rounded-lg">
                    <!-- 添加一个透明层处理点击事件 -->
                    <div class=" w-full h-full flex flex-col items-center justify-center">
                        <div class=" text-themewhite text-[1.5rem] font-bold">Chuva de dinheiro</div>
                        <p class=" text-themetext0 text-lg ">
                            <span>R$&nbsp;</span>
                            <span class="font-bold text-3xl text-themetext0">{{ fn(redPakageAmountRef || 0) }}</span>
                        </p>
                        <p class="text-white text-sm mt-5 font-bold">
                            Horário de coleta:
                        </p>
                        <p class="text-white text-sm mt-1 font-bold">
                            {{ resetTimeFunc(redPakageDataRef && redPakageDataRef.receive_time || 0) }}
                        </p>
                    </div>
                </div>
            </template>
            <!-- 不可领取领取 redPakageStateRef.status = 0  v-else-->
            <template v-else>
                <div class="">
                    <div class="p-4 font-bold rounded-xl bg-gradient-to-r from-btnlinar3 to-btnlinar4">
                        <p class="text-sm text-themewhite text-left">
                            <span>Máximo de Queda R$ 5.000.000 por vez</span>
                        </p>
                        <p class="">
                            <span class="text-sm text-themewhite">R$</span>
                            <span class="text-3xl text-themetext0 ml-1">{{ 7.777 }}</span>
                        </p>
                    </div>
                    <div class="max-h-[20rem] overflow-auto mt-2 ">
                        <div class=" bg-tablebg1 rounded-xl pt-2">
                            <div class=" w-[8rem] px-2 py-1 text-center bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 m-auto rounded-full mb-2">
                                <b>{{
                                    Object.keys(redPakageDataRef && redPakageDataRef.list &&redPakageDataRef.list||{}).length
                                    }}X por dia</b>
                            </div>
                            <!-- <ol class="mt-2 text-xs flex flex-wrap">
                            <template v-for="item,index in redPakageDataRef&&redPakageDataRef.list||[]" :key="index" >
                                <li class="w-1/2 py-1 flex items-center justify-center" :class="index%2 ? 'bg-tablebg2' : 'bg-default-bg'">
                                    <svg class="w-3 h-3 mr-1 opacity-65" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                                        <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                                    </svg>
                                    <span>{{ item.start_time }} - {{ item.end_time }}</span>
                                </li>
                            </template>
</ol> -->
                            <template v-for="(pair, pairIndex) in redPakageListPairs" :key="pairIndex">
                                <tr class="odd:bg-tablebg1 even:bg-tablebg2 py-1 w-full flex  text-center">
                                    <td class=" w-1/2 flex  items-center justify-center" v-if="pair[0]">
                                        <img :src="RedpacketImg.icon_time" alt="" class="w-4 h-4 mr-2">
                                        {{ pair[0][1].start_time }} - {{ pair[0][1].end_time }}
                                    </td>
                                    <td class=" w-1/2 flex  items-center justify-center" v-if="pair[1]">
                                        <img :src="RedpacketImg.icon_time" alt="" class="w-4 h-4 mr-2">
                                        {{ pair[1][1].start_time }} - {{ pair[1][1].end_time }}
                                    </td>
                                    <td class=" w-1/2" v-else-if="!pair[1]">
                                        <!-- 空单元格或默认内容 -->
                                    </td>
                                </tr>
                            </template>

                        </div>

                    </div>
                </div>
            </template>
        </section>
        <div class="px-4 mt-[2rem]">
            <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                <span>Descrição da Atividade:</span>
            </h5>
            <article class=" p-mb text-[0.68rem] text-themetext4">
                <p>1.Cada sessão de chuva de dinheiro é distribuída gratuitamente com R$ 5.000.000.</p>
                <p>2.Valor máximo da chuva de dinheiro: R$ 7.777</p>
                <p>3.Membros recarregados podem reivindicar gratuitamente.</p>
                <p>4.O bônus precisa atingir um volume de negócios 1x para poder ser retirado.</p>
            </article>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>
    <pu-page title="Chuva de Dinheiro" class="z-[999]" hideService v-else>
        <!-- 顶部banner -->
        <img :src="RedpacketImg.img_title" alt="Grande Retorno de Depósito"
            class="absolute inset-0 w-[18rem] mx-auto" />
        <img :src="CommonImg.m4_null" alt="">
        <!-- :class="redPakageStateRef.status != 2 &&redPakageStateRef.status != 1 ?'top-16':''" -->
        <section class="w-full max-h-full px-ctx  relative z-10">
            <!-- 可以领取 redPakageStateRef.status == 1 -->
            <template v-if="redPakageStateRef.status == 1">
                <div class="w-full py-6  flex flex-col items-center " :style="{
                    backgroundImage: `url(${RedpacketImg.img_redpacketbg1})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                }">

                    <div class=" text-themetext0 text-[1.5rem] font-bold">Chuva de dinheiro</div>
                    <ul class="px-[3rem] !list-disc text-[0.88rem] leading-normal text-white  mt-5">
                        <li>Membros recarregados podem reivindicar gratuitamente.</li>
                        <li>Valor máximo de queda em dinheiro: R${{ 7.777 }}.</li>
                    </ul>
                    <!-- <a href="javascript:;"  class="w-20 h-16 -ml-10 block absolute left-1/2 top-[14.75rem]"></a>
                    <a href="javascript:;" @click="clickClose()" class="p-3 flex">
                        <em class="w-5 h-5 p-0.5 rounded-full ctx-theme flex items-center justify-center">
                            <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                            </svg>
                        </em>
                    </a> -->
                    <div class="mt-5 px-10 py-1 m4-nine-btn rounded-[2rem] font-bold" @click="takeRedPakageFunc()">
                        Coletar</div>
                </div>
            </template>
            <!-- 已经领取 redPakageStateRef.status == 2-->
            <template v-else-if="redPakageStateRef.status == 2">
                <div class="w-full h-full py-6 bg-theme-bg " :style="{
                    backgroundImage: `url(${RedpacketImg.img_redpacketbg1})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                }">
                    <!-- 添加一个透明层处理点击事件 -->
                    <div class=" w-full h-full flex flex-col items-center justify-center">
                        <div class=" text-themetext0 text-[1.5rem] font-bold">Chuva de dinheiro</div>
                        <p class=" text-themetext0 text-lg font-bold">
                            <span>R$&nbsp;</span>
                            <span class="text-3xl text-themetext0">{{ fn(redPakageAmountRef || 0) }}</span>
                        </p>
                        <p class="text-white text-sm mt-5">
                            Horário de coleta:
                        </p>
                        <p class="text-white text-sm mt-1">
                            {{ resetTimeFunc(redPakageDataRef && redPakageDataRef.receive_time || 0) }}
                        </p>
                    </div>
                </div>
            </template>
            <!-- 不可领取领取 redPakageStateRef.status = 0  v-else-->
            <template v-else>
                <div class="">
                    <div class="p-4 font-bold rounded-xl m4-boxitem">
                        <p class="text-sm m4-text text-left">
                            <span>Máximo de Queda R$ 5.000.000 por vez</span>
                        </p>
                        <p class="m4-text">
                            <span class="text-sm">R$</span>
                            <span class="text-3xl text-themetext0 ml-1">{{ 7.777 }}</span>
                        </p>
                    </div>
                    <div class="max-h-[20rem] overflow-auto mt-2 ">
                        <div class=" bg-tablebg rounded-xl pt-2">
                            <div class=" w-[8rem] px-2 py-1 text-center m4-ten-btn m-auto rounded-full mb-2">
                                <b>{{
                                    Object.keys(redPakageDataRef && redPakageDataRef.list &&redPakageDataRef.list||{}).length
                                    }}X por dia</b>
                            </div>
                            <!-- <ol class="mt-2 text-xs flex flex-wrap">
                            <template v-for="item,index in redPakageDataRef&&redPakageDataRef.list||[]" :key="index" >
                                <li class="w-1/2 py-1 flex items-center justify-center" :class="index%2 ? 'bg-tablebg2' : 'bg-default-bg'">
                                    <svg class="w-3 h-3 mr-1 opacity-65" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                                        <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                                    </svg>
                                    <span>{{ item.start_time }} - {{ item.end_time }}</span>
                                </li>
                            </template>
</ol> -->
                            <template v-for="(pair, pairIndex) in redPakageListPairs" :key="pairIndex">
                                <tr class="odd:bg-tablebg even:bg-tablebg2 py-1 w-full flex  text-center">
                                    <td class=" w-1/2 flex  items-center justify-center" v-if="pair[0]">
                                        <img :src="RedpacketImg.icon_time" alt="" class="w-3 h-3 mr-2">
                                        {{ pair[0][1].start_time }} - {{ pair[0][1].end_time }}
                                    </td>
                                    <td class=" w-1/2 flex  items-center justify-center" v-if="pair[1]">
                                        <img :src="RedpacketImg.icon_time" alt="" class="w-3 h-3 mr-2">
                                        {{ pair[1][1].start_time }} - {{ pair[1][1].end_time }}
                                    </td>
                                    <td class=" w-1/2" v-else-if="!pair[1]">
                                        <!-- 空单元格或默认内容 -->
                                    </td>
                                </tr>
                            </template>

                        </div>

                    </div>
                </div>
            </template>
        </section>
        <div class="px-4 mt-[2rem]">
            <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                <span>Descrição da Atividade:</span>
            </h5>
            <article class=" p-mb text-[0.68rem] text-themetext3">
                <p>1.Cada sessão de chuva de dinheiro é distribuída gratuitamente com R$ 5.000.000.</p>
                <p>2.Valor máximo da chuva de dinheiro: R$ 7.777</p>
                <p>3.Membros recarregados podem reivindicar gratuitamente.</p>
                <p>4.O bônus precisa atingir um volume de negócios 1x para poder ser retirado.</p>
            </article>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>


</template>
<style scoped>
.content {
    width: 100%;

    .left {
        width: 65%;
        font-size: 0.68rem;
    }

}

.list {
    width: 100%;
    height: auto;

    .item {
        box-sizing: border-box;

        .lvImg {
            width: 3rem;
            height: 2.75rem;
        }

        .center {
            flex: 1;
        }

        .right {
            font-size: 0.68rem;

            .yes {
                width: 1rem;
                height: 1rem;
                margin-right: 0.25rem;
            }
        }
    }

}
</style>