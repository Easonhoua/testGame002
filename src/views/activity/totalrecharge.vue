<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { fn } from '@/i18n';
import { totalRechargeModel } from '@/model/account'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const TRechargeImg = useThemeImages().totalrecharge
const CommonImg = useThemeImages().common
const { totalRechargeConfigRef, totalRechargeStartTimeRef, totalRechargeEndTimeRef, totalRechargeAmountRef, totalRechargeTimeRef, totalRechargeInfoFunc, totalRechargeTakeFunc } = totalRechargeModel();

let day = ref('00');
let hours = ref('00');
let minutes = ref('00');
let seconds = ref('00');
let timer;

const updateCountdown = () => {
    const diff = totalRechargeTimeRef.value;

    if (diff > 0) {
        day.value = Math.floor(diff / (60 * 60 * 24));
        hours.value = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
        minutes.value = Math.floor((diff % (60 * 60)) / 60);
        seconds.value = diff % 60;

        day.value = day.value >= 10 ? day.value : `0${day.value}`;
        hours.value = hours.value >= 10 ? hours.value : `0${hours.value}`;
        minutes.value = minutes.value >= 10 ? minutes.value : `0${minutes.value}`;
        seconds.value = seconds.value >= 10 ? seconds.value : `0${seconds.value}`;

        totalRechargeTimeRef.value--
    } else {
        day.value = '00';
        hours.value = '00';
        minutes.value = '00';
        seconds.value = '00';
        clearInterval(timer);
    }
};

function onclickTake(index, item) {
    if (item.status == 1) {
        totalRechargeTakeFunc(index)
    }
}

onMounted(() => {
    totalRechargeInfoFunc().then(() => {
        if (totalRechargeTimeRef.value > 0) {
            updateCountdown();
            timer = setInterval(updateCountdown, 1000);
        }
    })
})
onUnmounted(() => {
    clearInterval(timer);
})
</script>

<template>
    <pu-page title="Bônus" class="z-[999]" hideService>
        <div v-if="currentTemplate.value == 'template_one'">
            <div class="w-full absolute left-0 -top-[3.125rem]">
                <img :src=TRechargeImg.img_totalrechargebg class="w-full h-auto">
            </div>
            <section class="w-full relative">
                <em class="w-full h-[7.25rem] block"></em>
                <div class="w-40 h-9 mx-auto flex items-center justify-center">
                    <div class="mr-1 text-3xl text-rgbablack80 font-bold">
                        <span>{{ day }}</span>
                    </div>
                    <div class="p-1 mr-1 text-[0.6875rem] bg-rgbablack80 text-one rounded">
                        <span>Dias</span>
                    </div>
                    <div class="mr-1 text-3xl text-rgbablack80 font-bold">
                        <span>{{ hours }}</span>
                    </div>
                    <div class="p-1 text-[0.6875rem] bg-rgbablack80 text-one rounded">
                        <span>h</span>
                    </div>
                </div>
                <div class="w-40 h-10 mt-0.5 mx-auto flex items-center justify-center">
                    <div class="mr-1 text-3xl text-rgbablack80 font-bold">
                        <span>{{ minutes }}</span>
                    </div>
                    <div class="p-1 mr-1 text-[0.6875rem] bg-rgbablack80 text-one rounded">
                        <span>min</span>
                    </div>
                    <div class="mr-1 text-3xl text-rgbablack80 font-bold">
                        <span>{{ seconds }}</span>
                    </div>
                    <div class="p-1 text-[0.6875rem] bg-rgbablack80 text-one rounded">
                        <span>S’</span>
                    </div>
                </div>
                <em class="w-full h-[10.875rem] block"></em>
                <ul class="!pl-5 min-h-30 flex flex-wrap">
                    <template v-for="item, index in totalRechargeConfigRef" :key="index">
                        <li class="w-[6.75rem] h-[10.5rem] mr-2 mb-2 relative">
                            <img :src=TRechargeImg.img_itembg class="w-[6.5625rem] h-full">
                            <!-- <div class="absolute left-0 top-0 w-[6.55rem] h-[10.5rem] rounded-[0.3rem] flex items-center justify-end flex-col bg-black/50 z-10" v-if="item.status == 2">
                           <img src="/imgs/total/icon_qiandao.png" alt="" class="w-[1.5rem] h-[1.5rem] mb-4">
                        </div> -->
                            <div class="text-xl absolute left-[3.275rem] top-5"
                                style="text-shadow: 0 0 8px rgba(0,0,0,0.50);">
                                <span>{{ item.bonus || 0 }}</span>
                            </div>
                            <div class="w-full text-rgbablack50 text-center absolute left-0 top-24 break-all">
                                <span class="text-[0.625rem]">R$</span>
                                <span class="text-xs">{{ totalRechargeAmountRef || 0 }}</span>
                                <span class="text-xs text-rgbablack50">/{{ item.total_recharge || 0 }}</span>
                            </div>
                            <div class="w-full px-2 absolute left-0 top-[8.125rem] flex justify-center">
                                <a href="javascript:;" @click="onclickTake(index, item)"
                                    :class="item.status == 1 ? 'ctx-theme__linear' : 'border border-black/[0.08] bg-rgbablack30 !text-rgbablack30'"
                                    class="w-full h-6 text-xs rounded flex items-center justify-center">
                                    <span>{{ item.status === 2 ? 'Reclamado' : 'Receber' }}</span>
                                </a>
                            </div>
                        </li>
                    </template>
                </ul>
            </section>
            <pu-card theme="3" class="mb-3 pt-3 relative">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-rgbawhite50">
                    <p>1. Tempo de atividade: De {{ totalRechargeStartTimeRef }} até {{ totalRechargeEndTimeRef }}</p>
                    <p>2. Se o bônus não for recebido, será considerado como uma renúncia do bônus após o término do
                        evento.</p>
                    <p>3. O prêmio recebido precisa completar 1 vezes o fluxo do jogo.</p>
                </article>
            </pu-card>

        </div>
        <div v-if="currentTemplate.value == 'template_two'">
            <div class="w-full absolute left-0 -top-[3.125rem]">
                <img :src=TRechargeImg.img_totalrechargebg class="w-full h-auto">
            </div>
            <section class="w-full relative">
                <em class="w-full h-[10rem] block"></em>
                <div class="w-40 h-9 mx-auto flex items-center justify-between">
                    <div class="mr-16 text-3xl  text-white  font-bold -ml-9 ">
                        <span>{{ day }}</span>
                    </div>
                    <div class="mr-1 text-3xl  text-white  font-bold ml-1">
                        <span>{{ hours }}</span>
                    </div>
                    <div class=" mr-1 text-2xl  text-white  text-one rounded">
                        <span>:</span>
                    </div>
                    <div class="mr-1 text-3xl  text-white  font-bold">
                        <span>{{ minutes }}</span>
                    </div>
                    <div class="mr-1 text-3xl  text-white  text-one rounded">
                        <span>:</span>
                    </div>
                    <div class="mr-1 text-3xl  text-white  font-bold">
                        <span>{{ seconds }}</span>
                    </div>
                </div>
                <em class="w-full h-[6.5rem] block"></em>
                <ul class="!pl-5 min-h-30 flex flex-wrap">
                    <template v-for="item, index in totalRechargeConfigRef" :key="index">
                        <li class="w-[6.75rem] h-[10.5rem] mr-2 mb-2 relative">
                            <img :src="TRechargeImg.img_itembg2" class="w-[6.5625rem] h-full" v-if="item.status === 1">
                            <img :src="TRechargeImg.img_itembg" class="w-[6.5625rem] h-full" v-else>
                            <img :src=TRechargeImg.img_itemcoin alt=""
                                class="absolute left-4 top-1 w-[4.5rem] h-[2.5rem] mt-1">
                            <div class="absolute left-0 top-0 w-[6.55rem] h-[10.5rem] rounded-[0.3rem] flex items-center justify-end flex-col bg-black/50 z-10"
                                v-if="item.status == 2">
                                <img :src=TRechargeImg.img_qiandao alt="" class="w-[1.5rem] h-[1.5rem] mb-4">
                            </div>
                            <div class=" w-full  text-center  text-[0.68rem] absolute left-[50%] text-four top-11 right-0"
                                style="text-shadow: 0 0 8px rgba(0,0,0,0.50);transform: translateX(-50%);">
                                R$<span class="text-xl ml-2">{{ item.bonus || 0 }}</span>
                            </div>
                            <p class="w-full text-three  text-[0.68rem] text-center absolute left-0 top-20 break-all">
                                Depósito:</p>
                            <div class="w-full  text-three  text-center absolute left-0 top-24 break-all">
                                <span class="text-[0.625rem]">R$</span>
                                <span class="text-xs  text-three ">{{ totalRechargeAmountRef || 0 }}</span>
                                <span class="text-xs  text-three ">/{{ item.total_recharge || 0 }}</span>
                            </div>
                            <div class="w-full pl-3 pr-2 absolute left-0 top-[8.125rem] flex justify-center"
                                v-if="item.status != 2">
                                <a href="javascript:;" @click="onclickTake(index, item)"
                                    :class="item.status == 1 ? 'm2-btn-ten  text-themewhite ' : 'm2-btn-nine-false text-three'"
                                    class=" rounded-xl w-full h-6 text-xs rounded flex items-center justify-center">
                                    <span>{{ item.status === 2 ? 'Reclamado' : 'Receber' }}</span>
                                </a>
                            </div>
                        </li>
                    </template>
                </ul>
            </section>
            <pu-card theme="3" class="mb-3 pt-3 relative">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-four"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center to-four">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-theme">
                    <p>1. Tempo de atividade: De {{ totalRechargeStartTimeRef }} até {{ totalRechargeEndTimeRef }}</p>
                    <p>2. Se o bônus não for recebido, será considerado como uma renúncia do bônus após o término do
                        evento.</p>
                    <p>3. O prêmio recebido precisa completar 1 vezes o fluxo do jogo.</p>
                </article>
            </pu-card>

        </div>
        <div v-if="currentTemplate.value == 'template_three'">
            <div class="w-full absolute left-0 -top-[3.125rem]">
                <img :src=TRechargeImg.img_totalrechargebg class="w-full h-auto">
            </div>
            <section class="w-full relative">
                <em class="w-full h-[10rem] block"></em>
                <div class="w-40 h-9 mx-auto flex items-center justify-between">
                    <div class="mr-16 text-3xl  text-white  font-bold -ml-9 ">
                        <span>{{ day }}</span>
                    </div>
                    <div class="mr-1 text-3xl  text-white  font-bold ml-1">
                        <span>{{ hours }}</span>
                    </div>
                    <div class=" mr-1 text-2xl  text-white  text-one rounded">
                        <span>:</span>
                    </div>
                    <div class="mr-1 text-3xl  text-white  font-bold">
                        <span>{{ minutes }}</span>
                    </div>
                    <div class="mr-1 text-3xl  text-white  text-one rounded">
                        <span>:</span>
                    </div>
                    <div class="mr-1 text-3xl  text-white  font-bold">
                        <span>{{ seconds }}</span>
                    </div>
                </div>
                <em class="w-full h-[6.5rem] block"></em>
                <ul class="!pl-5 min-h-30 flex flex-wrap">
                    <template v-for="item, index in totalRechargeConfigRef" :key="index">
                        <li class="w-[6.75rem] h-[10.5rem] mr-2 mb-2 relative">
                            <img :src="TRechargeImg.img_itembg2" class="w-[6.5625rem] h-full" v-if="item.status === 1">
                            <img :src="TRechargeImg.img_itembg" class="w-[6.5625rem] h-full" v-else>
                            <img :src=TRechargeImg.img_itemcoin alt=""
                                class="absolute left-4 top-1 w-[4.5rem] h-[2.5rem] mt-1">
                            <div class="absolute left-0 top-0 w-[6.55rem] h-[10.5rem] rounded-[0.3rem] flex items-center justify-end flex-col bg-black/50 z-10"
                                v-if="item.status == 2">
                                <img :src=TRechargeImg.img_qiandao alt="" class="w-[1.5rem] h-[1.5rem] mb-4">
                            </div>
                            <div class=" w-full  text-center  text-[0.68rem] absolute left-[50%] text-themetext0 top-11 right-0"
                                style="text-shadow: 0 0 8px rgba(0,0,0,0.50);transform: translateX(-50%);">
                                R$<span class="text-xl ml-2 text-themetext0">{{ item.bonus || 0 }}</span>
                            </div>
                            <p
                                class="w-full text-themetext1  text-[0.68rem] text-center absolute left-0 top-20 break-all">
                                Depósito:</p>
                            <div class="w-full  text-themetext1  text-center absolute left-0 top-24 break-all">
                                <span class="text-[0.625rem]">R$</span>
                                <span class="text-xs">{{ totalRechargeAmountRef || 0 }}</span>
                                <span class="text-xs">/{{ item.total_recharge || 0 }}</span>
                            </div>
                            <div class="w-full pl-3 pr-2 absolute left-0 top-[8.125rem] flex justify-center"
                                v-if="item.status != 2">
                                <a href="javascript:;" @click="onclickTake(index, item)"
                                    :class="item.status == 1 ? 'm3-theme-btn1' : 'm3-theme-btn3'"
                                    class=" rounded-xl w-full h-6 text-xs rounded flex items-center justify-center">
                                    <span>{{ item.status === 2 ? 'Reclamado' : 'Receber' }}</span>
                                </a>
                            </div>
                        </li>
                    </template>
                </ul>
            </section>
            <pu-card theme="3" class="mb-3 pt-3 relative">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-themetext3">
                    <p>1. Tempo de atividade: De {{ totalRechargeStartTimeRef }} até {{ totalRechargeEndTimeRef }}</p>
                    <p>2. Se o bônus não for recebido, será considerado como uma renúncia do bônus após o término do
                        evento.</p>
                    <p>3. O prêmio recebido precisa completar 1 vezes o fluxo do jogo.</p>
                </article>
            </pu-card>

        </div>
        <div v-if="currentTemplate.value == 'template_four'">
            <img :src=TRechargeImg.img_totalrechargebg class=" w-full absolute left-0 ">
            <img :src="CommonImg.m4_null" alt="" class=" w-full">
            <section class="w-full px-4">
                <div class=" p-4 mx-auto flex flex-col items-center justify-between "
                :style="{
              background: `url(${CommonImg.m4_bg1})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',}"
                >
                    <span class="m4-text text-[0.88rem] mb-2">Contagem regressiva</span>
                    <div class="flex align-center justify-center">
                        <div class="mr-2 text-[1.2rem] px-4  text-theme  font-bold m4-ten-btn p-1 rounded-xl">
                            <span class="text-3xl">{{ day }}</span>Dias
                        </div>
                        <div class="flex m4-ten-btn p-1 px-4 text-theme  rounded-xl">
                            <div class="mr-1 text-3xl    font-bold ">
                                <span>{{ hours }}</span>
                            </div>
                            <div class=" mr-1 text-3xl rounded">
                                <span>:</span>
                            </div>
                            <div class="mr-1 text-3xl  font-bold">
                                <span>{{ minutes }}</span>
                            </div>
                            <div class="mr-1 text-3xl text-one rounded">
                                <span>:</span>
                            </div>
                            <div class="mr-1 text-3xl font-bold">
                                <span>{{ seconds }}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <ul class="flex flex-wrap mt-4 justify-between">
                    <template v-for="item, index in totalRechargeConfigRef" :key="index"
                        class="flex flex-wrap mt-4 flex-between">
                        <li class=" w-[31%] py-4  px-1 mb-2  rounded-xl bg-gradient-to-b from-activitybox1 to-activitybox2">
                            <div class="flex align-center ">
                                <img :src=TRechargeImg.img_itemcoin class="h-[2.2rem] mt-1">
                                <!-- <div class=" left-0 top-0 w-[6.55rem] h-[10.5rem] rounded-[0.3rem] flex items-center justify-end flex-col bg-black/50 z-10" v-if="item.status == 2">
                           <img src="/imgs/total/icon_qiandao.png" alt="" class="w-[1.5rem] h-[1.5rem] mb-4">
                        </div> -->
                                <div class="flex flex-col ">
                                    <span class="m4-text text-[0.88rem]">R$</span>
                                    <span class="text-xl text-themetext0 mt-[-0.3rem] font-bold">{{ item.bonus || 0
                                        }}</span>
                                </div>
                            </div>
                            <p class="w-full text-white text-[0.68rem] text-center mt-2 ">Depósito:</p>
                            <div class="w-full text-themetext3  text-center  left-0 top-24 ">
                                <span class="text-[0.8rem]">R$</span>
                                <span class="text-xs ml-1">{{ totalRechargeAmountRef || 0 }}</span>
                                <span class="text-xs text-themetext0">/{{ item.total_recharge || 0 }}</span>
                            </div>
                            <div class="w-full mt-2 flex justify-center">
                                <a href="javascript:;" @click="onclickTake(index, item)"
                                v-if="item.status == 0|| item.status == 1"
                                    :class="item.status == 1 ? 'm4-ten-btn  text-theme ' : 'text-themetext3 bg-black/20'"
                                    class=" rounded-xl w-full h-6 text-xs rounded flex items-center justify-center">
                                    <span>Receber</span>
                                   
                                </a>
                                <img :src=TRechargeImg.img_qiandao  alt="" class="w-4 h-4 " v-else>
                            </div>
                        </li>
                    </template>
                </ul>
            </section>
            <pu-card theme="3" class="mb-3 pt-3 relative">
                <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                    <span>Descrição da Atividade:</span>
                </h5>
                <article class=" p-mb text-sm text-themetext3">
                    <p>1. Tempo de atividade: De {{ totalRechargeStartTimeRef }} até {{ totalRechargeEndTimeRef }}</p>
                    <p>2. Se o bônus não for recebido, será considerado como uma renúncia do bônus após o término do
                        evento.</p>
                    <p>3. O prêmio recebido precisa completar 1 vezes o fluxo do jogo.</p>
                </article>
            </pu-card>
        </div>

        <div v-if="currentTemplate.value == 'template_five'">
            <img :src=TRechargeImg.img_totalrechargebg class="w-full left-0 ">
            <section class="w-full px-4 -mt-16 relative">
                <div class=" p-4 mx-auto flex flex-col items-center justify-between "
                :style="{
                    background: `url(${CommonImg.m4_bg1})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',}"
                >
                    <span class="text-themewhite text-[0.88rem] mb-2 font-bold">Contagem regressiva</span>
                    <div class="flex align-center justify-center">
                        <div class="mr-2 text-[1.2rem] px-4  text-theme  font-bold m4-ten-btn p-1 rounded-xl bg-gradient-to-b from-themecardlinear1 to-themecardlinear2">
                            <span class="text-3xl">{{ day }}</span>Dias
                        </div>
                        <div class="flex m4-ten-btn p-1 px-4 text-theme  rounded-xl bg-gradient-to-b from-themecardlinear1 to-themecardlinear2">
                            <div class="mr-1 text-3xl    font-bold ">
                                <span>{{ hours }}</span>
                            </div>
                            <div class=" mr-1 text-3xl rounded">
                                <span>:</span>
                            </div>
                            <div class="mr-1 text-3xl  font-bold">
                                <span>{{ minutes }}</span>
                            </div>
                            <div class="mr-1 text-3xl text-one rounded">
                                <span>:</span>
                            </div>
                            <div class="mr-1 text-3xl font-bold">
                                <span>{{ seconds }}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <ul class="flex flex-wrap mt-4 justify-between">
                    <template v-for="item, index in totalRechargeConfigRef" :key="index"
>
                        <li class=" w-[33%] py-1  px-1  rounded-xl relative" >
                            <div class="absolute w-full h-full z-10"
                                :class="item.status != 0&&item.status != 1?'bg-rgbablack30':''"
                            >

                            </div>
                            <img :src=TRechargeImg.img_itembg class="w-[6.5625rem] h-auto" v-if="item.status === 1">
                            <img :src=TRechargeImg.img_itembg2 class="w-[6.5625rem] h-auto" v-else >
                            <div class="absolute left-0 top-0 w-full h-full rounded-xl flex items-center justify-center flex-col z-100">
                            <div class="flex align-center ">
                                <img :src=TRechargeImg.img_itemcoin class="h-[2.2rem] mt-1">
                                <!-- <div class=" left-0 top-0 w-[6.55rem] h-[10.5rem] rounded-[0.3rem] flex items-center justify-end flex-col bg-black/50 z-10" v-if="item.status == 2">
                           <img src="/imgs/total/icon_qiandao.png" alt="" class="w-[1.5rem] h-[1.5rem] mb-4">
                        </div> -->
                                <div class="flex flex-col ">
                                    <span class="text-themewhite text-[0.88rem]">R$</span>
                                    <span class="text-xl text-themetext0 mt-[-0.3rem] font-bold">{{ item.bonus || 0
                                        }}</span>
                                </div>
                            </div>
                            <p class="w-full text-white text-[0.68rem] text-center mt-2 font-bold">Depósito:</p>
                            <div class="w-full text-themetext3  text-center  left-0 top-24 font-bold">
                                <span class="text-[0.8rem]">R$</span>
                                <span class="text-xs ml-1">{{ totalRechargeAmountRef || 0 }}</span>
                                <span class="text-xs text-themetext0">/{{ item.total_recharge || 0 }}</span>
                            </div>
                            <div class="w-full mt-2 flex justify-center">
                                <a href="javascript:;" @click="onclickTake(index, item)"
                                v-if="item.status == 0|| item.status == 1"
                                    :class="item.status == 1 ? 'bg-gradient-to-r from-gold-500 to-gold-100 text-themewhite' : 'text-themetext3 bg-rgbablack30'"
                                    class="rounded-xl w-[60%] h-6 text-xs rounded flex items-center justify-center">
                                    <span>Receber</span>
                                </a>
                            </div>
                            <img :src=TRechargeImg.img_qiandao  alt="" class="w-6 h-6 " v-if="item.status != 0&& item.status != 1">
                            </div>
                        </li>
                    </template>
                </ul>
            </section>
            <pu-card theme="3" class="mb-3 pt-3 relative">
                <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                    <span>Descrição da Atividade:</span>
                </h5>
                <article class=" p-mb text-sm text-themetext4">
                    <p>1. Tempo de atividade: De {{ totalRechargeStartTimeRef }} até {{ totalRechargeEndTimeRef }}</p>
                    <p>2. Se o bônus não for recebido, será considerado como uma renúncia do bônus após o término do
                        evento.</p>
                    <p>3. O prêmio recebido precisa completar 1 vezes o fluxo do jogo.</p>
                </article>
            </pu-card>
        </div>





        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>