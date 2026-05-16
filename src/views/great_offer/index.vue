<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { t } from '@/i18n'
import { rechargeSpecialOfferDataModel } from '@/model/account'
import { modalScrollControlModel } from '@/model/other'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const { rechargeSpecialOfferData, rechargeSpecialOfferInfoFunc, rechargeTimeRef, payKeyRef, rechargeFunc, rechargeWeek, rechargeBtnRef, endTimeRef, grandContentRef } = rechargeSpecialOfferDataModel();
const { lockScroll, unlockScroll } = modalScrollControlModel()
import { useThemeImages } from '@/utils/themeimg'
import { babelParse } from 'vue/compiler-sfc';
const CommonImg = useThemeImages().common
const GreatOfferImg = useThemeImages().greatoffer
//闪灯
let light_type = ref(0)
let light_time = ref(null)

//倒计时
let day = ref('00')
let hours = ref('00')
let minutes = ref('00')
let seconds = ref('00')
let timer = null

// 监听 cpfId，确保只能输入数字
// watch(cpfId, (newValue) => {
//     if (newValue && !/^\d*$/.test(newValue)) {
//         cpfId.value = ''
//     }
// })

// 计算属性判断输入框是否都有值
// const isFormValid = computed(() => {
//     return String(cpfId.value).trim() !== '' && nome.value.trim() !== ''
// })


const updateCountdown = () => {
    let totalSeconds = 0
    if (rechargeTimeRef.value == 0 && endTimeRef.value != 0) {
        totalSeconds = Number(endTimeRef.value)
    } else {
        totalSeconds = Number(rechargeTimeRef.value)
    }
    if (totalSeconds <= 0) {
        clearInterval(timer);
        return;
    }

    const d = Math.floor(totalSeconds / (60 * 60 * 24));
    const h = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const m = Math.floor((totalSeconds % (60 * 60)) / 60);
    const s = totalSeconds % 60;

    // Format with leading zeros
    day.value = String(d).padStart(2, '0');
    hours.value = String(h).padStart(2, '0');
    minutes.value = String(m).padStart(2, '0');
    seconds.value = String(s).padStart(2, '0');
    if (rechargeTimeRef.value == 0 && endTimeRef.value != 0) {
        endTimeRef.value--
    } else {
        rechargeTimeRef.value--;
    }
    // Decrease the remaining time

}
onMounted(() => {
    light_time.value = setInterval(() => {
        light_type.value = light_type.value == 1 ? 0 : 1
    }, 500)
    // 初始化倒计时
    rechargeSpecialOfferInfoFunc().then(() => {
        if (rechargeTimeRef.value > 0 || endTimeRef.value > 0) {
            updateCountdown();
            timer = setInterval(updateCountdown, 1000);
        }
    })
})

onUnmounted(() => {
    clearInterval(timer);
    clearInterval(light_time.value)
})

// 提示弹框
let hintMask = ref(false)
let rechargeMask = ref(false)

const preventDefault = (e) => {
    e.preventDefault();
}

function openRule(item) {
    if (rechargeBtnRef.value == 0 && endTimeRef.value == 0) {
        return
    } else {
        payKeyRef.value = item
        if (endTimeRef.value != 0) {
            rechargeMask.value = true
        } else {
            hintMask.value = true
        }
        lockScroll()
    }

}

function closemask() {
    hintMask.value = false
    rechargeMask.value = false
    unlockScroll()
}

// 组件卸载时清理
onUnmounted(() => {
    document.removeEventListener('touchmove', preventDefault);
})
</script>

<template>
    <pu-page :title="t('pageTitle.DepositReturn')" class="z-[999]" hideService>
        <div v-if="currentTemplate.value != 'template_four'&&currentTemplate.value != 'template_five'">
            <div v-if="currentTemplate.value == 'template_one'">
            <div class="banner relative">
                <img :src=GreatOfferImg.img_greatoffer alt="Grande Retorno de Depósito" class="w-full" />

                <!-- 倒计时 -->
                <!-- great_offer_countdowntwo -->

                <div :class="{ 'no-days  countdown-container': day !== '00' }" v-if="rechargeTimeRef != 0" :style="{
                    background: `url(${day !== '00' ? GreatOfferImg.img_timetwobg : GreatOfferImg.img_timebg}) no-repeat center center`,
                    backgroundSize: 'contain'
                }" class="countdown-container ">
                    <div class="countdown-box flex" v-if="day !== '00'" :class="{ 'countdown-boxfrist': day !== '00' }">
                        <h1 class="time-num">{{ day }}</h1>
                        <p class="time-label">Dias</p>
                    </div>
                    <div class="countdown-box"
                        :class="{ 'full-width': day === '00', 'countdown-boxsecond': day !== '00' }">
                        <h1 class="time-num">{{ hours }}</h1>
                        <p class="time-label">h</p>
                        <h1 class="time-num">{{ minutes }}</h1>
                        <p class="time-label">min</p>
                        <h1 class="time-num">{{ seconds }}</h1>
                        <p class="time-label">s'</p>
                    </div>
                </div>
                <div class="countdown-container endtime" v-else :style="{
                    background: `url(${GreatOfferImg.img_timeendbg}) no-repeat center center`,
                    backgroundSize: 'contain'
                }">
                    <div class="countdown-box full-width">
                        <h1 class="time-num">{{ hours }}</h1>
                        <p class="time-label">h</p>
                        <h1 class="time-num">{{ minutes }}</h1>
                        <p class="time-label">min</p>
                        <h1 class="time-num">{{ seconds }}</h1>
                        <p class="time-label">s'</p>
                    </div>
                </div>
            </div>
            <div class="rechargeListBox">
                <div class="rechargeTitle w-full" :style="{
                    background: `url(${GreatOfferImg.img_titlebg}) no-repeat center center`,
                    backgroundSize: 'contain'
                }">
                    {{ rechargeWeek }}
                </div>
                <div class="rechargeList">
                    <div class="rechargeItem" :style="{
                        background: `url(${GreatOfferImg.img_itembg}) no-repeat center center`,
                        backgroundSize: 'contain'
                    }" v-for="item in rechargeSpecialOfferData" :key="item.key">
                        <div class="top">
                            <div class="lefttext">
                                <div class="left">
                                    <div class="name">Depósito <p> {{ currentUnit.value }} {{ item.recharge_amount }}</p>
                                    </div>
                                    <div class="name">Ganhe <p> {{ currentUnit.value }} {{ item.bonus }}</p>
                                    </div>
                                </div>
                                <div class="right">
                                    <h1 class="text-themetext0"> {{ Number(item.recharge_amount) + Number(item.bonus) }}
                                    </h1>
                                    <p>Totalizando({{ currentUnit.value }})</p>
                                </div>

                            </div>
                            <div class="btn" @click="openRule(item)"
                                :style="rechargeBtnRef == 0 && endTimeRef != 0 ? 'opacity:0.5' : 'opacity: 1;'">Depósito</div>
                        </div>
                        <div class="rollover">Exigindo {{ currentUnit.value }} {{ item.bet_amount }} de rollover</div>

                    </div>
                </div>
            </div>
            <pu-card theme="3" class="mb-3 pt-5 text-box">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-rgbawhite50" v-html="grandContentRef" v-if="grandContentRef!=''"></article>
                <article class="ctx-article p-mb text-sm text-rgbawhite50" v-else>
                    <p>1. No dia da promoção, faça um depósito do valor especificado e receba um grande bônus.</p>
                    <p>2. Todos os jogadores podem participar apenas uma vez e não podem participar repetidamente.</p>
                    <p>3. A promoção começa toda Quarta-feira.</p>
                </article>
            </pu-card>
        </div>
        <!-- 顶部banner -->
        <div v-if="currentTemplate.value == 'template_two'||currentTemplate.value == 'template_three'">
            <div class="banner relative">
                <img :src=GreatOfferImg.img_greatoffer alt="Grande Retorno de Depósito" class="w-full relative" />
                <p class="text-center text-themewhite text-m font-bold mt-[-2rem] relative top-[0.8rem] left-0 w-full"> {{ rechargeWeek }}</p>
                <!-- 倒计时 -->
                <!-- great_offer_countdowntwo  -->
                <div class="countdown-container-two" v-if="rechargeTimeRef != 0" :style="{
                    background: `url(${day !== '00' ? GreatOfferImg.img_timebg : GreatOfferImg.img_timebg}) no-repeat`,
                    backgroundSize: '100% 100%',
                    margin: '0 auto',
                    width: '90%',
                    marginTop: '-1.5rem'
                }">
                    <div class="countdown-box" v-if="day !== '00'" :class="{ 'countdown-boxfrist': day !== '00' }">
                        <h1 class="time-num days">{{ day }}</h1>
                        <p class="time-label daytext">{{ t('account.days') }}</p>
                    </div>
                    <div class="countdown-box "
                        :class="{ 'full-width': day === '00', 'countdown-boxsecond': day !== '00' }">
                        <h1 class="time-num">{{ hours }}</h1>
                        <p class="time-label">:</p>
                        <h1 class="time-num">{{ minutes }}</h1>
                        <p class="time-label">:</p>
                        <h1 class="time-num">{{ seconds }}</h1>
                    </div>
                </div>
                <div class="countdown-container-two endtime" v-else :style="{
                    background: `url(${GreatOfferImg.img_timeendbg}) no-repeat`,
                    backgroundSize: '100% 100%',
                    margin: '0 auto',
                    width: '90%',
                    marginTop: '-1.5rem'
                }">
                    <div class="countdown-box" v-if="day !== '00'" :class="{ 'countdown-boxfrist': day !== '00' }">
                        <h1 class="time-num days">{{ day }}</h1>
                        <p class="time-label daytext">Dias</p>
                    </div>
                    <div class="countdown-box ml-2"
                        :class="{ 'full-width': day === '00', 'countdown-boxsecond': day !== '00' }">
                        <h1 class="time-num">{{ hours }}</h1>
                        <p class="time-label">:</p>
                        <h1 class="time-num">{{ minutes }}</h1>
                        <p class="time-label">:</p>
                        <h1 class="time-num">{{ seconds }}</h1>
                    </div>
                </div>
            </div>
            <div class="rechargeListBox-two" v-if="currentTemplate.value == 'template_two'">
                <div class="rechargeList">
                    <div class="rechargeItem" v-for="item in rechargeSpecialOfferData" :key="item.key" :style="{
                        background: `url(${GreatOfferImg.img_itembg}) no-repeat center center`,
                        backgroundSize: 'contain'
                    }">
                        <div class="top">
                            <div class="lefttext">
                                <div class="left text-five">
                                    <div class="name">Depósito <p> {{ currentUnit.value }} {{ item.recharge_amount }}</p>
                                    </div>
                                    <div class="name">Ganhe<p> {{ currentUnit.value }} {{ item.bonus }}</p>
                                    </div>
                                </div>
                                <div class="right">
                                    <h1> {{ Number(item.recharge_amount) + Number(item.bonus) }}</h1>
                                    <p>Totalizando({{ currentUnit.value }})</p>
                                </div>

                            </div>
                            <div class="btn ctx-resg-btn" @click="openRule(item)"
                                :style="rechargeBtnRef == 0 && endTimeRef != 0 ? 'opacity:0.5' : 'opacity: 1;'">Depósito</div>
                        </div>
                        <div class="rollover text-three">Exigindo {{ currentUnit.value }} {{ item.bet_amount }} de rollover</div>

                    </div>
                </div>
            </div>

            <div class="rechargeListBox-two" v-else-if="currentTemplate.value =='template_three'">
                <div class="rechargeList">
                    <div class="rechargeItem" v-for="item in rechargeSpecialOfferData" :key="item.key" :style="{
                        background: `url(${GreatOfferImg.img_itembg}) no-repeat center center`,
                        backgroundSize: 'contain'
                    }">
                        <div class="top">
                            <div class="lefttext">
                                <div class="left text-five">
                                    <div class="flex text-themetext1 text-sm">{{ t('deposit') }} <p class="ml-2 text-white"> {{ currentUnit.value }} {{
                                            item.recharge_amount }}</p>
                                    </div>
                                    <div class="flex text-themetext1 text-sm">{{ t('Earn') }}<p class="ml-[1.35rem] text-white"> {{ currentUnit.value }} {{
                                            item.bonus }}</p>
                                    </div>
                                </div>
                                <div class="right text-themetext0">
                                    <h1> {{ Number(item.recharge_amount) + Number(item.bonus) }}</h1>
                                    <p class="!text-themetext1">{{ t('Totaling') }}({{ currentUnit.value }})</p>
                                </div>

                            </div>
                            <div class="w-16 h-7 mt-3 rounded m3-theme-btn1 text-[0.8rem] flex items-center justify-center"
                                @click="openRule(item)"
                                :style="rechargeBtnRef == 0 && endTimeRef != 0 ? 'opacity:0.5' : 'opacity: 1;'">{{ t('deposit') }}</div>
                        </div>
                        <div class="rollover text-themetext1">{{ t('activityCenter.Demanding') }} {{ currentUnit.value }} {{ item.bet_amount }} {{ t('activityCenter.rollover') }}</div>

                    </div>
                </div>
            </div>

            <pu-card theme="3" class="mb-3 pt-5 text-box" v-if="currentTemplate.value == 'template_two'">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-four"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-four">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-theme" v-html="grandContentRef" v-if="grandContentRef!=''"></article>
                <article class="ctx-article p-mb text-sm text-theme" v-else>
                    <p>1. No dia da promoção, faça um depósito do valor especificado e receba um grande bônus.</p>
                    <p>2. Todos os jogadores podem participar apenas uma vez e não podem participar repetidamente.</p>
                    <p>3. A promoção começa toda Quarta-feira.</p>
                </article>
            </pu-card>

            <pu-card theme="3" class="mb-3 pt-5 text-box" v-else-if="currentTemplate.value =='template_three'">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                        <span>{{ t('ActivityDescription')  }}</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-themetext3" v-html="grandContentRef" v-if="grandContentRef!=''"></article>
                <article class="ctx-article p-mb text-sm text-themetext3" v-else>
                    <p>{{ t('activityCenter.activityDetail15')  }}</p>
                    <p>{{ t('activityCenter.activityDetail16')  }}</p>
                    <p>{{ t('activityCenter.activityDetail17')  }}</p>
                </article>
            </pu-card>
        </div>


        <em class="w-full h-10 block"></em>
        <!-- rechargeMask -->
        <div v-if="rechargeMask" class="hint-mask w-full px-4 pt-5 pb-3  text-rgbawhite80 rounded-t-4xl">
            <div class="mask"></div>
            <!-- bg-gradient-to-b from-btnlinar4 to-btnlinar3 -->
            <div class="hint-content flex flex-col items-center "
                :class="currentTemplate.value == 'template_one' ? 'bg-default-bg' : 'bg-gradient-to-b from-card1 to-card2'">
                <img :src=CommonImg.btn_close class="closeicon" @click="closemask" />
                <div class="flex flex-col items-center"><img :src=CommonImg.img_recharge class="rsicon" /> </div>
                <div class="inputboxitem">
                    <span class="title text-rgbawhite50">{{ t('deposit') }}</span>
                    <div class="paynum" :class="currentTemplate.value == 'template_one' ? 'bg-rgbawhite50' : 'bg-default-bg'">
                        <span>{{ currentUnit.value }}</span>
                        <!-- themewhite -->
                        <h1 :class="currentTemplate.value == 'template_one' ? 'text-themewhite' : 'text-four'">
                            {{ payKeyRef.recharge_amount }}</h1>
                    </div>
                    <div class="hint">{{ t("activityCenter.greatDetail") }} <span>{{ currentUnit.value }}
                            {{ Number(payKeyRef.recharge_amount) + Number(payKeyRef.bonus) }}</span></div>
                </div>

                <div class="inputboxitem" v-if="false">
                    <span class="title"> CPF ID</span>
                    <div class="inputbox" :class="{ 'has-value': cpfId }">
                        <input type="text" v-model="cpfId" placeholder="Por favor, insira o CPF ID"
                            class="input input2">
                        <img :src=CommonImg.icon_card2 alt="" class="iconfont" v-if="!cpfId">
                        <img :src=CommonImg.icon_card1 alt="" class="iconfont" v-if="cpfId">
                    </div>
                </div>
                <div class="inputboxitem" v-if="false">
                    <span class="title">Nome</span>
                    <div class="inputbox" :class="{ 'has-value': nome }">
                        <input type="text" v-model="nome" placeholder="Por favor,insira seu nome" class="input input2">
                        <img :src=CommonImg.icon_user2 alt="" class="iconfont" v-if="!nome">
                        <img :src=CommonImg.icon_user1 alt="" class="iconfont" v-if="nome">
                    </div>
                </div>
                <!-- :class="{'opacity-50': !isFormValid}" -->
                <div class="btn" @click="rechargeFunc"
                    :class="currentTemplate.value == 'template_one' ? 'bg-gradient-to-tr from-gold-100 to-gold-500 rounded-xl' : 'bg-gradient-to-b from-btnlinar4 to-btnlinar3 rounded-full'">
                    {{ t('deposit') }}
                </div>
            </div>
        </div>
        <!-- hintMask -->
        <div v-if="hintMask" class="hint-mask w-full px-4 pt-5 pb-3  text-rgbawhite80 rounded-t-4xl">
            <div class="mask"></div>
            <div class="hint-content  flex flex-col items-center w-[16rem]"
                :class="currentTemplate.value == 'template_one' ? 'bg-default-bg' : 'bg-gradient-to-b from-card1 to-card2'">
                <img :src=CommonImg.btn_close class="closeicon" @click="closemask" />
                <div class="flex flex-col items-center"><img :src=CommonImg.icon_hin class="rsicon" /> </div>
                <div class="hint hint-text text-themewhite">{{ t('activityCenter.greatDetail2') }} <span> {{ rechargeWeek }}</span></div>
                <div class="btn" @click="closemask"
                    :class="currentTemplate.value == 'template_one' ? 'bg-gradient-to-b from-btnlinar4 to-btnlinar3 rounded-xl ' : 'rounded-full !bg-gradient-to-b from-btnlinar4 to-btnlinar3'">
                    OK
                </div>
            </div>
        </div>
        </div>
        <div v-else-if="currentTemplate.value == 'template_four'">
            <div class="banner relative">
            <img :src=GreatOfferImg.img_greatoffer alt="Grande Retorno de Depósito"
                class=" mx-auto absolute" />
                <img :src="CommonImg.m4_null" alt="" >

            <!-- 倒计时 -->
            <!-- great_offer_countdowntwo  -->
            <!-- -->
            <div class="countdown-container mt-5  rounded-xl flex flex-col items-center "  
               >
               <!--  -->
               <div  v-if="rechargeTimeRef !== 0" :style="{
                    background: `url(${day !== '00' ? GreatOfferImg.img_timebg : GreatOfferImg.img_timebg}) no-repeat`,
                    backgroundSize: '100% 100%',
                    margin: '0 auto',
                    width: '100%',
                    marginTop: '-1.8rem'
                }" class="py-3">
                <p class="m4-text font-bold m-auto text-center">Tempo até o início da promoção</p>
                <div class=" flex items-center justify-center mt-1">
                    <div class="m4-ten-btn flex   items-center justify-center  p-1 rounded-[0.5rem] text-[1.2rem] font-bold "
                        v-if="day !='00'"  >
                        <h1 >{{ day }}</h1>
                        <p class=" text-[0.88rem] mx-1">Dias</p>
                    </div>
                    <div class=" m4-ten-btn flex  items-center justify-center ml-2  p-1 rounded-[0.5rem] text-[1.2rem] font-bold ">
                        <h1 class="mx-1">{{ hours }}</h1>
                        <p class="mx-1">:</p>
                        <h1 class="mx-1">{{ minutes }}</h1>
                        <p class="mx-1">:</p>
                        <h1 class="mx-1">{{ seconds }}</h1>
                    </div>

                </div>

               </div>
               <div class="countdown-container rounded-xl flex flex-col items-center"  v-else 
               :style="{
                    background: `url(${GreatOfferImg.img_timeendbg}) no-repeat`,
                    backgroundSize: '100% 100%',
                    margin: '0 auto',
                    width: '100%',
                    marginTop: '-1.5rem'
                }"
               >
               <p class="m4-text font-bold m-auto text-center text-[0.88rem]">Tempo restante até o fim da promoção:</p>
                <div class=" m4-ten-btn flex  items-center justify-center ml-2 mt-1  p-1 rounded-[0.5rem] text-[1.2rem] font-bold">
                    <h1 class="mx-1">{{ hours }}</h1>
                    <p class="mx-1">:</p>
                    <h1 class="mx-1">{{ minutes }}</h1>
                    <p class="mx-1">:</p>
                    <h1 class="mx-1">{{ seconds }}</h1>
                </div>
            </div>
               
            </div>
            <!---->
           
           
        </div>
        <div class="rounded-full m4-boxitem p-2 px-4 w-[94%] m-auto mt-2 flex items-center justify-start ">
            <img :src="GreatOfferImg.img_libao" class="w-[1.5rem] h-[1.5rem] ml-2" />
            <span class="text-themetext0 ml-2">Tempo da promoção: <span class="m4-text font-bold">Quarta-feira</span>
            </span>
        </div>
        <div class="rechargeListBox-four">
            <div class="rechargeList px-4">
                <div class="rechargeItem  mb-2" v-for="item in rechargeSpecialOfferData"
                :style="{
                        background: `url(${GreatOfferImg.img_itembg}) no-repeat`,
                        backgroundSize: '100% 100%'
                    }"
                    :key="item.key">
                    <div class="top p-4">
                        <div class="lefttext">
                            <div class="left">
                                <div class="name text-white">Depósito <p class="!m4-text"> {{ currentUnit.value }} {{
                                        item.recharge_amount }}</p>
                                </div>
                                <div class="name">Ganhe<p class="!text-themetext0"> {{ currentUnit.value }} {{ item.bonus }}</p>
                                </div>
                            </div>
                            <div class="right text-themetext0">
                                <h1 class="font-bold"> {{ Number(item.recharge_amount) + Number(item.bonus) }}</h1>
                                <p class="text-themetext3">Totalizando({{ currentUnit.value }})</p>
                            </div>

                        </div>
                        <div class="btn m4-ten-btn ml-3 font-bold" @click="openRule(item)"
                            :style="rechargeBtnRef == 0 && endTimeRef != 0 ? 'm4-btn-false' : 'opacity: 1;'">Depósito</div>
                    </div>
                    <div
                        class="rollover text-three  p-2 text-white flex items-center justify-start aline-center">
                        <img :src="GreatOfferImg.img_tib" class="w-[1rem] h-[1rem] mr-2" />
                        Exigindo <span class="text-themetext0 mx-1">{{ currentUnit.value }} {{ item.bet_amount }}</span> de rollover
                    </div>

                </div>
            </div>
        </div>
        <pu-card theme="3" class="mb-3 pt-5 text-box">
            <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                <span>Descrição da Atividade:</span>
            </h5>
            <article class="p-mb text-sm text-themetext3" v-html="grandContentRef" v-if="grandContentRef!=''"></article>
            <article class=" p-mb text-sm text-themetext3" v-else>
                <p>1. No dia da promoção, faça um depósito do valor especificado e receba um grande bônus.</p>
                <p>2. Todos os jogadores podem participar apenas uma vez e não podem participar repetidamente.</p>
                <p>3. A promoção começa toda Quarta-feira.</p>
            </article>
        </pu-card>
        <!-- <em class="w-full h-10 block"></em> -->
        <!-- rechargeMask -->
        <div v-if="rechargeMask" class="hint-mask w-full   rounded-t-4xl">
            <div class="mask"></div>

            <div class="hint-content m4-popcard-3  flex flex-col items-center allbg">
                <img :src=CommonImg.btn_close  class="closeicon" @click="closemask" />
                <div class="flex flex-col items-center"><img :src=CommonImg.img_recharge class="rsicon" /> </div>

                <div class="inputboxitem">
                    <span class="title">Depósito</span>
                    <div class="paynum bg-theme !text-themewhite font-bold !text-[1.2rem]">
                        <span>{{ currentUnit.value }}</span>
                        <h1 class="text-themetext0">{{ payKeyRef.recharge_amount }}</h1>
                    </div>
                    <div class="hint !text-themewhite">Depósito de <span class="!text-themetext0">{{ currentUnit.value }} {{Number(payKeyRef.recharge_amount)}}</span> , ganhe <span class="!text-themetext0">{{ currentUnit.value }} {{Number(payKeyRef.bonus)}}</span>, totalizando <span class="!text-themetext0">{{ currentUnit.value }}
                            {{ Number(payKeyRef.recharge_amount) + Number(payKeyRef.bonus) }}</span></div>
                </div>

                <div class="inputboxitem" v-if="false">
                    <span class="title"> CPF ID</span>
                    <div class="inputbox" :class="{ 'has-value': cpfId }">
                        <input type="text" v-model="cpfId" placeholder="Por favor, insira o CPF ID"
                            class="input input2">
                        <img  :src=CommonImg.icon_card2 alt="" class="iconfont" v-if="!cpfId">
                        <img  :src=CommonImg.icon_card1 alt="" class="iconfont" v-if="cpfId">
                    </div>
                </div>
                <div class="inputboxitem" v-if="false">
                    <span class="title">Nome</span>
                    <div class="inputbox" :class="{ 'has-value': nome }">
                        <input type="text" v-model="nome" placeholder="Por favor,insira seu nome" class="input input2">
                        <img :src=CommonImg.icon_user2 alt="" class="iconfont" v-if="!nome">
                        <img :src=CommonImg.icon_user1 alt="" class="iconfont" v-if="nome">
                    </div>
                </div>
                <!-- :class="{'opacity-50': !isFormValid}" -->
                <div class="m4-nine-btn p-2 px-6 mt-6  rounded-xl" @click="rechargeFunc">
                    Depósito
                </div>
            </div>
        </div>
        <!-- hintMask -->
        <div v-if="hintMask" class="hint-mask  w-full  rounded-t-4xl">
            <div class="mask"></div>
            <div class="hint-content m4-popcard-3 flex flex-col items-center w-[16rem] allbg">
                <img :src=CommonImg.btn_close class="closeicon" @click="closemask" />
                <div class="flex flex-col items-center"><img :src=CommonImg.icon_hin class="rsicon" /> </div>
                <div class="hint hint-text ">Ainda näo chegou o horário da promoqao, por favor participe deste evento em
                    <span> {{ rechargeWeek }}</span></div>
                <div class="btn  !m4-nine-btn " @click="closemask">
                    OK
                </div>
            </div>
        </div>
        </div>
       <div v-else-if="currentTemplate.value == 'template_five'">
            <div class="banner relative">
            <img :src=GreatOfferImg.img_greatoffer alt="Grande Retorno de Depósito"
                class=" mx-auto absolute" />
                <img :src="CommonImg.m4_null" class="h-[19rem]"  alt="" >

            <!-- 倒计时 -->
            <!-- great_offer_countdowntwo  -->
            <!-- -->
            <div class="countdown-container  rounded-xl flex flex-col items-center relative z-10"  
               >
               <!--  -->
               <div  v-if="rechargeTimeRef !== 0" :style="{
                    background: `url(${day !== '00' ? GreatOfferImg.img_timebg : GreatOfferImg.img_timebg}) no-repeat`,
                    backgroundSize: '100% 100%',
                    margin: '0 auto',
                    width: '100%',
                }" class="pb-4 pt-8">
                <p class="w-full text-themewhite font-bold m-auto text-center absolute top-4 left-1/2 translate-x-[-50%] text-[0.875rem]">Tempo até início da promoção</p>
                <p class="text-themewhite font-bold m-auto text-center text-[0.875rem]">Time until the start of the promotion</p>
                <div class=" flex items-center justify-center mt-1">
                    <div class=" flex bg-gradient-to-b from-themecardlinear1 to-themecardlinear2 items-center justify-center  px-4 py-2 rounded-[0.5rem] text-[1.2rem] font-bold "
                        v-if="day !='00'"  >
                        <h1 >{{ day }}</h1>
                        <p class=" text-[0.88rem] mx-1">Dias</p>
                    </div>
                    <div class=" flex bg-gradient-to-b from-themecardlinear1 to-themecardlinear2  items-center justify-center ml-2 px-4 py-2 rounded-[0.5rem] text-[1.2rem] font-bold ">
                        <h1 class="mx-1">{{ hours }}</h1>
                        <p class="mx-1">:</p>
                        <h1 class="mx-1">{{ minutes }}</h1>
                        <p class="mx-1">:</p>
                        <h1 class="mx-1">{{ seconds }}</h1>
                    </div>

                </div>

               </div>
               <div class="p-6 rounded-xl flex flex-col items-center relative"  v-else 
               :style="{
                    background: `url(${GreatOfferImg.img_timeendbg}) no-repeat`,
                    backgroundSize: '100% 100%',
                    margin: '0 auto',
                    width: '100%',
                    marginTop: '-1.5rem'
                }"
               >
               <p class="text-themewhite font-bold m-auto text-center text-[0.88rem] absolute top-[0.1rem] left-1/2 translate-x-[-50%]">Tempo fim da promoção:</p>
                <div class="flex bg-gradient-to-b from-themecardlinear1 to-themecardlinear2  items-center justify-center ml-2 mt-4  px-4 py-2 rounded-[0.5rem] text-[1.2rem] font-bold">
                    <h1 class="mx-1">{{ hours }}</h1>
                    <p class="mx-1">:</p>
                    <h1 class="mx-1">{{ minutes }}</h1>
                    <p class="mx-1">:</p>
                    <h1 class="mx-1">{{ seconds }}</h1>
                </div>
            </div>
               
            </div>
            <!---->
           
           
        </div>
        <div class="rounded-full bg-btn1_bg border border-btn_border p-2 px-4 w-[94%] m-auto mt-2 flex items-center justify-start ">
            <img :src="GreatOfferImg.img_libao" class="w-[1.5rem] h-[1.5rem] ml-2" />
            <span class="text-themewhite ml-2">Tempo da promoção: <span class="text-themetext0 font-bold">{{  rechargeWeek  }}</span>
            </span>
        </div>
        <div class="rechargeListBox-four">
            <div class="rechargeList px-4">
                <div class="rechargeItem  mb-2" v-for="item in rechargeSpecialOfferData"
                :style="{
                        background: `url(${GreatOfferImg.img_itembg}) no-repeat`,
                        backgroundSize: '100% 100%'
                    }"
                    :key="item.key">
                    <div class="top p-4">
                        <div class="lefttext">
                            <div class="left">
                                <div class="name text-white">Depósito <p class="!text-themetext0"> {{ currentUnit.value }} {{
                                        item.recharge_amount }}</p>
                                </div>
                                <div class="name">Ganhe<p class="!text-themetext0"> {{ currentUnit.value }} {{ item.bonus }}</p>
                                </div>
                            </div>
                            <div class="right text-themetext0">
                                <h1 class="font-bold"> {{ Number(item.recharge_amount) + Number(item.bonus) }}</h1>
                                <p class="text-themetext3">Totalizando({{ currentUnit.value }})</p>
                            </div>

                        </div>
                        <div class="btn m5-theme-btn1 ml-3 font-bold" @click="openRule(item)"
                            :style="rechargeBtnRef == 0 && endTimeRef != 0 ? 'm4-btn-false' : 'opacity: 1;'">Depósito</div>
                    </div>
                    <div
                        class="rollover text-three  p-2 text-white flex items-center justify-start aline-center">
                        <img :src="GreatOfferImg.img_tib" class="w-[1rem] h-[1rem] mr-2" />
                        Exigindo <span class="text-themetext0 mx-1">{{ currentUnit.value }} {{ item.bet_amount }}</span> de rollover
                    </div>

                </div>
            </div>
        </div>
        <pu-card theme="3" class="mb-3 pt-5 text-box">
            <h5 class=" px-2 text-l font-bold mb-3 text-start text-white">
                <span>Descrição da Atividade:</span>
            </h5>
            <article class="p-mb text-sm text-themetext4" v-html="grandContentRef" v-if="grandContentRef!=''"></article>
            <article class=" p-mb text-sm text-themetext4" v-else>
                <p>1. No dia da promoção, faça um depósito do valor especificado e receba um grande bônus.</p>
                <p>2. Todos os jogadores podem participar apenas uma vez e não podem participar repetidamente.</p>
                <p>3. A promoção começa toda Quarta-feira.</p>
            </article>
        </pu-card>
        <!-- <em class="w-full h-10 block"></em> -->
        <!-- rechargeMask -->
        <div v-if="rechargeMask" class="hint-mask w-full   rounded-t-4xl">
            <div class="mask"></div>

            <div class="hint-content   flex flex-col items-center bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 ">
                <img :src=CommonImg.btn_close  class="closeicon" @click="closemask" />
                <div class="flex flex-col items-center"><img :src=CommonImg.img_recharge class="rsicon" /> </div>

                <div class="inputboxitem">
                    <span class="title">Depósito</span>
                    <div class="paynum bg-theme !text-themewhite font-bold !text-[1.2rem]">
                        <span>{{ currentUnit.value }}</span>
                        <h1 class="text-themetext0">{{ payKeyRef.recharge_amount }}</h1>
                    </div>
                    <div class="hint !text-themewhite">Depósito de <span class="!text-themetext0">{{ currentUnit.value }} {{Number(payKeyRef.recharge_amount)}}</span> , ganhe <span class="!text-themetext0">{{ currentUnit.value }} {{Number(payKeyRef.bonus)}}</span>, totalizando <span class="!text-themetext0">{{ currentUnit.value }}
                            {{ Number(payKeyRef.recharge_amount) + Number(payKeyRef.bonus) }}</span></div>
                </div>

                <div class="inputboxitem" v-if="false">
                    <span class="title"> CPF ID</span>
                    <div class="inputbox" :class="{ 'has-value': cpfId }">
                        <input type="text" v-model="cpfId" placeholder="Por favor, insira o CPF ID"
                            class="input input2">
                        <img  :src=CommonImg.icon_card2 alt="" class="iconfont" v-if="!cpfId">
                        <img  :src=CommonImg.icon_card1 alt="" class="iconfont" v-if="cpfId">
                    </div>
                </div>
                <div class="inputboxitem" v-if="false">
                    <span class="title">Nome</span>
                    <div class="inputbox" :class="{ 'has-value': nome }">
                        <input type="text" v-model="nome" placeholder="Por favor,insira seu nome" class="input input2">
                        <img :src=CommonImg.icon_user2 alt="" class="iconfont" v-if="!nome">
                        <img :src=CommonImg.icon_user1 alt="" class="iconfont" v-if="nome">
                    </div>
                </div>
                <!-- :class="{'opacity-50': !isFormValid}" -->
                <div class="m5-theme-btn1 p-2 px-6 mt-6  rounded-xl" @click="rechargeFunc">
                    Depósito
                </div>
            </div>
        </div>
        <!-- hintMask -->
        <div v-if="hintMask" class="hint-mask  w-full  rounded-t-4xl">
            <div class="mask"></div>
            <div class="hint-content bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 flex flex-col items-center w-[16rem]">
                <img :src=CommonImg.btn_close class="closeicon" @click="closemask" />
                <div class="flex flex-col items-center"><img :src=CommonImg.icon_hin class="rsicon" /> </div>
                <div class="hint hint-text ">Ainda näo chegou o horário da promoqao, por favor participe deste evento em
                    <span> {{ rechargeWeek }}</span></div>
                <div class="btn  bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 " @click="closemask">
                    OK
                </div>
            </div>
        </div>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>


</template>
<style scoped>
.countdown-container {
    background-size: contain;
    min-height: 4.44rem;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.endtime {
        /* background: url('/imgs/great_offer_endtime.png') no-repeat center center; */
        background-size: contain;
    }

    &.no-days {
        /* background: url('/imgs/great_offer_countdowntwo.png') no-repeat center center; */
        background-size: contain;
    }

    .countdown-box {
        display: flex;
        margin-top: 1rem;
        text-align: center;
        align-items: center;
        justify-content: space-between;

        &.full-width {
            width: 100%;
            justify-content: center;
        }

        .time-num {
            color: rgba(0, 0, 0, 0.85);
            font-size: 1.8rem;
            width: 1rem;
            font-weight: 700;
            text-align: center;
            margin: 0 0.25rem;
        }

        .time-label {
            background: rgba(0, 0, 0, 0.85);
            border-radius: 0.1rem 4px;
            min-width: 1.5rem;
            min-height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            color: var(--color-four);
            font-size: 0.8rem;
            margin-left: 1.3rem;
            padding: 0 0.1rem;
        }
    }

    .countdown-boxfrist {
        margin-left: 1.5rem;
    }

    .countdown-boxsecond {
        margin-right: 1.7rem;
    }
}

.countdown-container-two {
    width: 90%;
    height: 7.5rem;
    background-size: 100% 100%;
    min-height: 4.44rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: -1.5rem;

    &.endtime {
        background-size: 100% 100%;
    }

    .countdown-box {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        margin-top: 3.85rem;

        &.full-width {
            width: 100%;
            justify-content: center;
        }

        .time-num {
            color: #fff;
            font-size: 1.8rem;
            width: 1rem;
            font-weight: 700;
            text-align: center;
            margin: 0 0.25rem;
        }

        .time-label {
            border-radius: 0.1rem 4px;
            line-height: 1.5rem;
            text-align: center;
            color: #fff;
            font-weight: 700;
            font-size: 1.8rem;
            margin-left: 1.3rem;
            padding: 0 0.1rem;
        }

        .daytext {
            font-size: 1.2rem;
            margin-left: 0rem;
        }

        .days {
            width: 2.5rem;
            height: 2rem;
            line-height: 2rem;
            border-radius: 0.2rem;
            background: linear-gradient(180deg, #7b1120 0%, #B00021 100%);
            box-shadow: inset 0 -2px 0 0 rgba(41, 4, 9, 1);
        }
    }

    .countdown-boxfrist {
        margin-left: 1.5rem;
        margin-top: 3.85rem;
    }

    .countdown-boxsecond {
        margin-right: 1.7rem;
    }
}

.rechargeListBox {
    .rechargeTitle {
        /* background: url('/imgs/great_offer_recharge_title.png') no-repeat center center; */
        background-size: contain;
        min-height: 12.22rem;
        padding: 0.75rem;
        display: flex;
        justify-content: center;
        font-size: 1.44rem;
        font-weight: 700;
        color: var(--color-textcolorsix);
        padding-top: 2rem;
        text-shadow: 1px 1px 1px var(--color-themecardlinear2);
        height: auto;
    }

    .rechargeList {
        width: 87%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: -7.25rem;

        .rechargeItem {
            /* background: url('/imgs/great_offer_recharge_item.png') no-repeat center center; */
            background-size: contain;
            width: 100%;
            padding: 0.85rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            flex-direction: column;

            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 0.55rem;

                .lefttext {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 0.55rem;
                    box-sizing: border-box;

                    .left {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                        margin-left: 1rem;

                        .name {
                            font-weight: 700;
                            color: var(--color-textcolorsix);
                            font-size: 0.75rem;
                            display: flex;

                            p {
                                margin-left: 0.5rem;
                                color: var(--color-themewhite);
                            }
                        }
                    }

                    .right {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        text-align: end;

                        h1 {
                            font-size: 1.32rem;
                            color: var(--color-four);
                        }

                        p {
                            font-size: 0.68rem;
                            color: var(--color-textcolorsix);
                            margin-top: -0.4rem;
                        }
                    }

                }

                .btn {
                    width: 4rem;
                    height: 1.88rem;
                    line-height: 1.88rem;
                    border-radius: 0.35rem;
                    background-image: linear-gradient(113deg, var(--color-gold-500) 0%, var(--color-gold-100) 85%);
                    box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.15);
                    color: var(--color-themewhite);
                    font-size: 0.68rem;
                    text-align: center;
                    transition: transform 0.1s ease-in-out;
                }
            }

            .rollover {
                width: 100%;
                color: rgba(255, 255, 255, 0.65);
                font-size: .68rem;
                margin-top: 0.25rem;
            }


        }
    }
}

.rechargeListBox-two {
    margin-top: 1rem;

    .rechargeList {
        width: 87%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .rechargeItem {
            background-size: contain;
            width: 100%;
            padding: 0.45rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            flex-direction: column;

            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .lefttext {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 0.55rem;
                    box-sizing: border-box;

                    .left {
                        display: flex;
                        flex-direction: column;
                        flex: 1;

                        .name {

                            font-size: 0.85rem;
                            display: flex;
                            color: var(--color-one);
                            ;

                            p {

                                margin-left: 0.5rem;
                                color: #FFFFFF;
                            }
                        }
                    }

                    .right {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        text-align: end;
                        margin-top: 1rem;

                        h1 {
                            font-size: 1.32rem;
                            color: var(--color-four);
                        }

                        p {
                            font-size: 0.68rem;
                            color: var(--color-textcolorsix);
                            margin-top: -0.4rem;
                        }
                    }

                }

                .btn {
                    width: 4.5rem;
                    height: 1.88rem;
                    line-height: 1.88rem;
                    border-radius: 0.35rem;
                    margin-top: 1rem;
                    color: #FFFFFF;
                    font-size: 0.68rem;
                    text-align: center;
                    border-radius: 2rem;
                    transition: transform 0.1s ease-in-out;
                    background-image: linear-gradient(to bottom, var(--color-btnlinar4) 0%, var(--color-btnlinar3) 85%);
                    box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.15);
                    color: var(--color-themewhite);
                }
            }

            .rollover {
                width: 100%;
                font-size: .68rem;
                margin-left: 0.6rem;
            }


        }
    }
}
.rechargeListBox-four {
    margin-top: 1rem;

    .rechargeList {
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .rechargeItem {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-direction: column;

            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .lefttext {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .left {
                        display: flex;
                        flex-direction: column;
                        flex: 1;

                        .name {
                            font-weight: 800;
                            font-size: 0.85rem;
                            display: flex;

                            p {
                                margin-left: 0.5rem;
                                color: #FFFFFF;
                            }
                        }
                    }

                    .right {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        text-align: end;

                        h1 {
                            font-size: 1.32rem;
                        }

                        p {
                            font-size: 0.68rem;
                            margin-top: -0.4rem;
                        }
                    }

                }

                .btn {
                    width: 4.5rem;
                    height: 1.88rem;
                    line-height: 1.88rem;
                    margin-top: 1rem;
                    font-size: 0.68rem;
                    text-align: center;
                    border-radius: 2rem;
                    transition: transform 0.1s ease-in-out;
                }
            }

            .rollover {
                width: 100%;
                font-size: .68rem;
            }


        }
    }
}

.wheel-pen-bg-light {
    animation: wheel-light 20s linear infinite;
}

@keyframes wheel-light {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.wheel-pen-check {
    animation: wheel-check 0.3s linear infinite;
}

@keyframes wheel-check {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.scroll-list {
    height: 12.5rem;
    /* 设置固定高度 */
    overflow: hidden;
}

.scroll-list ul {
    animation: scrollUp 20s linear infinite;
}

@keyframes scrollUp {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-50%);
        /* 滚动高度为列表高度的一半 */
    }
}

/* 鼠标悬停时暂停动画 */
.scroll-list:hover ul {
    animation-play-state: paused;
}

.hint-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;

    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 2001;
    }

    .hint-content {
        position: relative;
        padding: 1.13rem;
        box-sizing: border-box;
        min-height: fit-content;
        max-height: 85vh;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        box-shadow: inset 0px 0.5px 0px 0px rgba(255, 255, 255, 0.25), 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
        border-radius: 0.44rem;
        z-index: 2002;
        display: flex;
        flex-direction: column;
        margin: auto;

        &::-webkit-scrollbar {
            display: none;
        }

        .closeicon {
            position: absolute;
            right: 0.5rem;
            top: 0.5rem;
            width: 1.5rem;
            height: 1.5rem;
            z-index: 2003;
            cursor: pointer;
        }

        .rsicon {
            width: 3rem;
            height: 3rem;
            /* margin-top: 1rem; */
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        .inputboxitem {
            display: flex;
            flex-direction: column;
            margin-top: 1rem;
            width: 100%;

            .title {
                font-size: 0.75rem;
                font-weight: 700;
            }

            .paynum {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 0.5rem;
                border: 1px solid transparent;
                padding: 0.25rem;
                box-sizing: border-box;
                width: 100%;
                height: 2.5rem;
                line-height: 2.5rem;
                margin-top: 0.25rem;
                padding: 0 1rem;
                color: rgba(255, 255, 255, 0.65);
                font-size: 0.75rem;

                h1 {
                    flex: 1;
                    text-align: center;
                    text-indent: -1rem;
                    font-size: 1.88rem;
                    font-weight: 700;
                }
            }

            .inputbox {
                border: 1px solid rgba(255, 255, 255, 0.15);
                background: rgba(255, 255, 255, 0.04);
                padding: 0.25rem;
                box-sizing: border-box;
                width: 100%;
                height: 2.5rem;
                line-height: 2.5rem;
                margin-top: 0.25rem;
                padding: 0 1rem;
                border-radius: 0.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                &.has-value {
                    background: var(--color-theme);
                    border: 0.01rem solid var(--color-theme);
                }

                input {
                    border: none;
                    background: transparent;
                    color: rgba(255, 255, 255, 0.65);
                    font-size: 0.75rem;
                    flex: 1;
                }

                .iconfont {
                    width: 1.2rem;
                    height: 1.2rem;
                }
            }
        }

        .btn {
            margin: 0 auto;
            margin-top: 1.5rem;
            width: 8.8rem;
            height: 2.66rem;
            box-shadow: inset 0px -2px 0px 0px rgba(0, 0, 0, 0.15);
            color: var(--color-themewhite);
            font-size: 0.88rem;
            text-align: center;
            line-height: 2.66rem;
            margin-bottom: 2rem;
        }
    }

    .hint {
        /* width: 100%; */
        font-size: .68rem;
        color: rgba(255, 255, 255, 0.65);
        margin-top: 0.1rem;

        span {
            color: var(--color-four);
        }
    }

    .hint-text {
        width: 80%;
        font-size: .88rem;
        margin-top: 1rem;

        text-align: center;

    }

}

/* 添加响应式样式 */
/* @media (min-width: 768px) {
    .hint-content {
        width: 53%;
        margin: auto;
    }
}
@media (min-width: 819px) and (max-width: 1024px) {
    .hint-content {
        width: 45%;
        margin: auto;
    }
}
@media (min-width: 1025px) {
    .hint-content {
        width: 35%;
        margin: auto;
    }
}
@media (min-width: 1400px) {
    .hint-content {
        width: 25%;
        margin: auto;
    }
} */
</style>