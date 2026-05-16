<script setup>
import { onMounted } from 'vue'
import { isAuthRef } from '@/model/user'
import { sevendaybackModel } from '@/model/activity'
import { t,fn } from '@/i18n'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const CommonImg = useThemeImages().common
const SevenBackImg = useThemeImages().sevendayback

const { sevendaybackInfoRef, getRewardsBtnFunc } = sevendaybackModel();


onMounted(() => {

})
</script>

<template>
    <pu-page :title="t('pageTitle.Cashback')" class="z-[999]" hideService>
        <div v-if="currentTemplate.value == 'template_one'">
            <div class="banner relative">
                <img :src="SevenBackImg.img_sevendayback" alt="Grande Retorno de Depósito" class="w-full" />

                <div class="content flex justify-around items-center align-center -mt-28 relative z-10" :style="{
                    backgroundImage: `url(${SevenBackImg.img_infobg})`,
                    backgroundSize: '94% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }">
                    <div class="text-themewhite w-[56%] text-[0.68rem]">
                        Depósito único <span class="text-four">≥ {{ currentUnit.value }}{{ sevendaybackInfoRef.start_min }}</span> ativa a
                        atividade de cashback. Quanto maior o depósito, maior o prêmio.
                    </div>
                    <div class="right text-four">
                        {{ currentUnit.value }} {{ sevendaybackInfoRef.day1_pay_num > 0 ? fn(sevendaybackInfoRef.day1_pay_num, 2) : 0 }}
                    </div>
                </div>
            </div>
            <div class="list flex flex-col items-center">
                <div v-for="(item, index) in sevendaybackInfoRef.config" :key="index"
                    class=" item w-full h-full flex items-center justify-between align-center" :style="{
                        background: `url(${SevenBackImg.img_itembg}) no-repeat`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center'
                    }">
                    <img :src="SevenBackImg[`icon_day${index + 1}`]" class="lvImg" />
                    <div class="center text-themewhite flex flex-col ">
                        <span>Proporção：{{ item.back_rate }}%</span>
                        <span>Rollover：{{ item.bet_num }}x</span>
                    </div>
                    <div class="right text-themewhite ">
                        <div class="flex  items-center justify-center" v-if="item.status == 1">
                            <img :src=CommonImg.icon_gou class="w-4 h-4 yes" />Recebido
                        </div>
                        <div v-if="!isAuthRef || item.status == 2 || !item.status">
                            <img :src=SevenBackImg.icon_gold1 alt="" class="w-13 h-10">
                        </div>
                        <!-- -->
                        <div v-if="item.status == 0" @click="getRewardsBtnFunc(index + 1)"
                            class=" text-homeranktext px-3  py-[0.4rem] flex items-center justify-center bg-gradient-to-r from-linear-22 to-linear-23  rounded-l text-[0.58rem] rounded text-center">
                            Receber
                        </div>
                        <div v-if="item.status == 3">
                            <img :src=SevenBackImg.icon_gold2 alt="" class="w-13 h-10">
                        </div>


                    </div>
                </div>
            </div>
            <pu-card theme="3" class="mb-3 pt-5 text-box">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent  to-themewhite "></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-rgbawhite50"
                    v-html="sevendaybackInfoRef.day7_back_content">
                </article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_two'">
            <div class="banner relative">
                <img :src=SevenBackImg.img_sevendayback alt="Grande Retorno de Depósito" class="w-full" />

                <div class="content flex justify-around items-center align-center absolute top-[15rem] left-0" :style="{
                    backgroundImage: `url(${SevenBackImg.img_infobg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }">
                    <div class="left text-themewhite ">
                        Depósito único <span class="text-four">≥ {{ currentUnit.value }}{{ sevendaybackInfoRef.start_min }}</span> ativa a
                        atividade de cashback. Quanto maior o depósito, maior o prêmio.
                    </div>
                    <div class="right text-four">
                        {{ currentUnit.value }} {{ sevendaybackInfoRef.day1_pay_num > 0 ? fn(sevendaybackInfoRef.day1_pay_num, 2) : 0 }}
                    </div>
                </div>
            </div>
            <div class="list flex flex-col items-center mt-[5rem]">
                <div v-for="(item, index) in sevendaybackInfoRef.config" :key="index"
                    class=" item w-full h-full flex items-center justify-between align-center" :style="{
                        background: `url(${SevenBackImg.img_itembg}) no-repeat`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center'
                    }">
                    <img :src="SevenBackImg[`icon_day${index + 1}`]" class="lvImg" />
                    <div class="center text-themewhite flex flex-col ">
                        <span>Proporção：{{ item.back_rate }}%</span>
                        <span>Rollover：{{ item.bet_num }}x</span>
                    </div>
                    <div class="right text-themewhite ">
                        <div class="flex  items-center justify-center" v-if="item.status == 1">
                            <img :src=CommonImg.icon_gou class="w-4 h-4 yes" />Recebido
                        </div>
                        <div v-if="!isAuthRef || item.status == 2 || !item.status">
                            <img :src=SevenBackImg.icon_gold1 alt="" class="w-13 h-10">
                        </div>
                        <!-- -->
                        <div v-if="item.status == 0" @click="getRewardsBtnFunc(index + 1)"
                            class=" text-themewhite w-[4rem] h-6 flex items-center justify-center m2-btn-nine rounded-l text-xs rounded text-center">
                            Receber
                        </div>
                        <div v-if="item.status == 3">
                            <img :src=SevenBackImg.icon_gold2 alt="" class="w-13 h-10">
                        </div>


                    </div>
                </div>
            </div>
            <pu-card theme="3" class="mb-3 pt-5 text-box">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-four"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center  text-four">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent  to-four"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-theme" v-html="sevendaybackInfoRef.day7_back_content">
                </article>
            </pu-card>
        </div>
        <!-- 顶部banner -->


        <div class="banner relative" v-if="currentTemplate.value == 'template_three'">
            <img :src=SevenBackImg.img_sevendayback alt="Grande Retorno de Depósito" class="w-full" />

            <div class="content flex justify-around items-center align-center" :style="{
                backgroundImage: `url(${SevenBackImg.img_infobg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }">
                <div class="left text-themewhite ">
                    {{t('activityCenter.Singledeposit')}} <span class="text-themetext0">≥ {{ currentUnit.value }}{{ sevendaybackInfoRef.start_min }}</span> {{t('activityCenter.SingledepositDetail')}}
                </div>
                <div class="right text-themetext0">
                    {{ currentUnit.value }} {{ sevendaybackInfoRef.day1_pay_num > 0 ? fn(sevendaybackInfoRef.day1_pay_num, 2) : 0 }}
                </div>
            </div>
            <div class="list flex flex-col items-center">
                <div v-for="(item, index) in sevendaybackInfoRef.config" :key="index"
                    class=" item w-full h-full flex items-center justify-between align-center !px-4" :style="{
                        background: `url(${SevenBackImg.img_itembg}) no-repeat`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center'
                    }">
                    <img :src="SevenBackImg[`icon_day${index + 1}`]" class="lvImg" />
                    <div class="center text-themewhite flex flex-col ">
                        <span>Proporção：{{ item.back_rate }}%</span>
                        <span>Rollover：{{ item.bet_num }}x</span>
                    </div>
                    <div class="right text-themewhite ">
                        <div class="flex  items-center justify-center" v-if="item.status == 1">
                            <img :src=CommonImg.icon_gou class="w-4 h-4 yes" />Recebido
                        </div>
                        <div v-if="!isAuthRef || item.status == 2 || !item.status">
                            <img :src=SevenBackImg.icon_gold1 alt="" class="w-13 h-10">
                        </div>
                        <!-- -->
                        <div v-if="item.status == 0" @click="getRewardsBtnFunc(index + 1)"
                            class=" w-[4rem] h-6 flex items-center justify-center m3-theme-btn1 rounded-l text-xs rounded text-center">
                            Receber
                        </div>
                        <div v-if="item.status == 3">
                            <img :src=SevenBackImg.icon_gold2 alt="" class="w-13 h-10">
                        </div>


                    </div>
                </div>
            </div>
            <pu-card theme="3" class="mb-3 pt-5 text-box">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                        <span>{{ t('ActivityDescription')  }}</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-themetext3"
                    v-html="sevendaybackInfoRef.day7_back_content">
                </article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_four'">
            <div class="absolute ">
                <img :src=SevenBackImg.img_sevendayback class=" m-auto  z-[-1]" />
            </div>
            <img :src="CommonImg.m4_null" alt="">
            <div class="banner relative px-3">

                <!-- <img :src=SevenBackImg.img_sevendayback  alt="Grande Retorno de Depósito" class="w-[16rem] m-auto mt-6 mb-6" /> -->

                <div class="content p-4 flex justify-between items-center bg-theme-bg align-center" :style="{
                    backgroundImage: `url(${SevenBackImg.img_infobg})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                }">
                    <div class="left text-white  ">
                        Depósito único <span class="text-themetext0">≥ {{ currentUnit.value }}{{ sevendaybackInfoRef.start_min }}</span> ativa
                        a atividade de cashback. Quanto maior o depósito, maior o prêmio.
                    </div>
                    <div class="m4-text border-l text-[0.8rem] px-2 border-white/10 flex items-center justify-center flex-col">
                        <p class=" font-bold ">Deposito atual</p>
                        <span class="flex items-center justify-center">{{ currentUnit.value }} <span
                            class="text-themetext0 text-[1.6rem]">{{ sevendaybackInfoRef.day1_pay_num > 0 ? (Number(sevendaybackInfoRef.day1_pay_num)).toFixed(2) : 0 }}</span></span> 
                    </div>
                </div>
            </div>
            <div class="list flex flex-col items-center  mt-2">
                <div v-for="(item, index) in sevendaybackInfoRef.config" :key="index"
                    class="mt-3 p-3  w-[94%] h-full flex items-center justify-between align-center" :style="{
                        background: `url(${SevenBackImg.img_itembg}) no-repeat`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center'
                    }">
                    <img :src="SevenBackImg[`icon_day${index + 1}`]" class="w-[3rem] " />
                    <div class="center flex  flex-1 flex-col text-[0.68rem]  border-l px-4 border-white/10 ml-3">
                        <span>Proporção：<span class="m4-text">{{ item.back_rate }}%</span></span>
                        <span>Rollover：<span class="text-themetext0">{{ item.bet_num }}x</span></span>
                    </div>
                    <div class="right ">
                        <div class="flex  items-center justify-center text-[0.68rem]" v-if="item.status == 1">
                            <img :src=CommonImg.icon_gou class="w-4 h-4 yes mr-2" />Recebido
                        </div>
                        <div v-if="!isAuthRef || item.status == 2 || !item.status">
                            <img :src=SevenBackImg.icon_gold1 alt="" class="w-13 h-10">
                        </div>
                        <div v-if="item.status == 0" class="w-[5rem] h-8 flex items-center justify-center m4-nine-btn rounded-l text-xs rounded text-center" @click="getRewardsBtnFunc(index + 1)">
                            Receber
                        </div>
                        <div v-if="item.status == 3">
                            <img :src=SevenBackImg.icon_gold2 alt="" class="w-13 h-10">
                        </div>
                    </div>
                </div>
            </div>
            <pu-card theme="3" class="mb-3 pt-5 text-box">
                <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                    <span>Descrição da Atividade:</span>
                </h5>
                <article class=" p-mb text-sm text-themetext3" v-html="sevendaybackInfoRef.day7_back_content">
                </article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_five'">
            <div class="banner relative">
                <img :src="SevenBackImg.img_sevendayback" alt="Grande Retorno de Depósito" class="w-full" />

                <div class="h-[8rem] flex items-center align-center -mt-28 relative z-10 pl-6 pr-4" :style="{
                    backgroundImage: `url(${SevenBackImg.img_infobg})`,
                    backgroundSize: '94% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }">
                    <div class="text-themewhite w-[56%] text-[0.68rem] mr-8 mt-2">
                        Depósito único <span class="text-four">≥ {{ currentUnit.value }}{{ sevendaybackInfoRef.start_min }}</span> ativa a
                        atividade de cashback. Quanto maior o depósito, maior o prêmio.
                    </div>
                    <div class="text-center">
                        <p class="text-[0.8rem] font-bold my-1">Current Deposit</p>
                        <p class="text-[0.8rem]">{{ currentUnit.value }} <span class="text-themetext0 text-[1.6rem] font-bold">{{ sevendaybackInfoRef.day1_pay_num > 0 ? fn(sevendaybackInfoRef.day1_pay_num, 2) : 0 }}</span> </p>
                    </div>
                </div>
            </div> 
            <div class="list flex flex-col items-center px-4">
                <div v-for="(item, index) in sevendaybackInfoRef.config" :key="index"
                    class="w-full h-full flex items-center justify-between align-center mt-0.5 p-2" :style="{
                        background: `url(${SevenBackImg.img_itembg}) no-repeat`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center'
                    }">
                    <div class="flex items-center">
                        <img :src="SevenBackImg[`icon_day${index + 1}`]" class="w-[3rem] h-[2.75rem] mr-4" />
                        <div class="center text-themewhite flex flex-col text-[0.625rem] mt-1">
                            <span>Proporção：<span class="font-bold">{{ item.back_rate }}%</span> </span>
                            <span>Rollover：<span class="text-themetext0 font-bold">{{ item.bet_num }}x</span> </span>
                        </div>
                    </div>
                    
                    <div class="right text-themewhite flex w-[30%] items-center justify-center">
                        <div class="flex  items-center justify-center" v-if="item.status == 1">
                            <img :src=CommonImg.icon_gou class="w-4 h-4 yes" />Recebido
                        </div>
                        <div v-else-if="!isAuthRef || item.status == 2 || !item.status">
                            <img :src=SevenBackImg.icon_gold1 alt="" class="w-12 h-8">
                        </div>
                        <!-- -->
                        <div v-else-if="item.status == 0" @click="getRewardsBtnFunc(index + 1)"
                            class=" text-themewhite px-4  py-[0.4rem] flex items-center justify-center m5-theme-btn1  rounded-full text-sm  text-center font-bold">
                            Receber
                        </div>
                        <div v-else-if="item.status == 3">
                            <img :src=SevenBackImg.icon_gold2 alt="" class="w-13 h-10">
                        </div>

                    </div>
                </div>
            </div>
            <pu-card theme="3" class="mb-3 pt-5 text-box">
                <div class="w-full mb-4 flex items-center">
                    <h5 class="ma-w-[60%] px-2 text-sm text-center font-bold">
                        <span>Descrição da Atividade</span>
                    </h5>
                </div>
                <article class="ctx-article p-mb text-sm text-themetext4"
                    v-html="sevendaybackInfoRef.day7_back_content">
                </article>
            </pu-card>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>


</template>
<style scoped>
.content {
    width: 100%;
    height: 6rem;
    box-sizing: border-box;

    .left {
        width: 65%;
        font-size: 0.68rem;
        margin-top: 0.75rem;
        margin-left: -0.5rem;

    }

    .right {
        margin-top: 1.2rem;
        margin-left: 0rem;
    }
}

.list {
    width: 100%;
    height: auto;

    .item {
        width: 90%;
        height: 3.6rem;
        background-size: 100% 100%;
        margin-top: 0.2rem;
        padding: 0.1rem 1rem 0 0rem;
        box-sizing: border-box;

        .lvImg {
            width: 3rem;
            height: 2.75rem;
        }

        .center {
            flex: 1;
            font-size: 0.68rem;
            margin-left: 1.75rem;
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