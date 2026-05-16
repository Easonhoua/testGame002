<script setup>
import {  ref } from 'vue'
import {  fn,t } from '@/i18n'
import { useScreenSafeArea } from '@vueuse/core'
import { playBtnAudioFunc } from '@/utils/core'
import { isAuthRef,  } from '@/model/user'
import { pddModel } from '@/model/pdd'
import { openLoginFunc } from '@/utils/config'
import PddShare from './pddshare.vue'
import { useThemeImages } from '@/utils/themeimg'

const CommonImg = useThemeImages().common 

const { top, bottom } = useScreenSafeArea()



const props = defineProps({
    modelValue: Boolean
})
const emits = defineEmits(['update:modelValue'])

function close() {
    emits('update:modelValue', false)
}

const { totalBonusRef,needBonusRef,withdrawCashRef,withdrawCashFunc,isCash,getPddInfoFunc } = pddModel()


let share_show = ref(false)
function openShare() {
    playBtnAudioFunc()
    if (!isAuthRef.value) {
        openLoginFunc(1)
        return
    }
    share_show.value = true
}

async function withdrawCashAndClose() {
    await withdrawCashFunc()
    close()
}

</script>

<template>
    <div>
        <!-- modelValue -->
        <section v-if="modelValue" class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[88] -translate-x-1/2 flex items-center justify-center">
            <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
            <div class="w-full max-h-full px-ctx overflow-y-auto relative" v-if="currentTemplate.value=='template_one'">
                <div class="w-[18.75rem] max-w-full mx-auto rounded-3xl relative ctx-theme__linear" >
                    <div class="w-full h-12 relative flex items-center justify-center">
                        <h5 class="text-sm text-center">
                            <span>Em breve poderá sacar</span>
                        </h5>
                        <div class="h-full px-3 absolute right-0 top-0 flex items-center">
                            <a href="javascript:;" @click="close()" class="w-6 h-6 bg-rgbablack30 rounded-full flex items-center justify-center" >
                                <icon-close class="w-3 h-3"></icon-close>
                            </a>
                          
                        </div>
                    </div>
                    <div class="w-full p-4  text-themeblack rounded-3xl  bg-gradient-to-tl from-redbglinear2 to-redbglinear1">
                        <p class="text-xs text-center opacity-65">
                            <span>Total de dinheiro a ser pago em breve</span>
                        </p>
                        <p class="text-center">
                            <img :src=CommonImg.img_money class="w-6 h-5 mr-2 inline-block">
                            <b class="text-themetext text-[2.125rem]">{{ fn(totalBonusRef) }}</b>
                            <b class="ml-2 text-base opacity-45">{{ currentUnit.value }}</b>
                        </p>
                        <h6 class="mb-2 text-[0.625rem] opacity-65">Formas de Pagamentos</h6>
                        <ul class="w-full px-4 py-3 text-[0.5rem] text-rgbablack80 border border-rgbablack30 rounded-2xl" >
                            <li class="mb-2 block">
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-pwa text-themewhite text-center rounded-full inline-block align-middle">
                                    <icon-check class="w-2 h-2 inline-block "></icon-check>
                                </i>
                                <span class="align-middle">O pedido de pagamento foi submetido</span>
                            </li>
                            <li class="mb-2 block">
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-pwa text-themewhite text-center rounded-full inline-block align-middle">
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle">Ainda é necessário{{ Math.max(0, Number(needBonusRef - totalBonusRef)).toFixed(2) }} para realizar</span>
                            </li>
                            <li class="mb-2 block">
                                <i class="w-1.5 h-1.5 mr-2.5 ml-0.5 bg-rgbablack30 rounded-full inline-block align-middle" v-if="totalBonusRef<needBonusRef">
                                </i>
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-pwa text-themewhite text-center rounded-full inline-block align-middle" v-else>
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle">{{needBonusRef}} {{ currentUnit.value }} serão pagos na sua conta Pix</span>
                            </li>
                        </ul>
                       
                        <div class="w-full pt-3 px-6">
                            <button @click="openShare()" class="w-full h-[3.125rem] px-2 !text-xs ctx-theme__linear rounded-xl " v-if="isCash==0" >
                                <span>Convide amigos para ajudar com</span>
                            </button>
                            <button @click="withdrawCashAndClose()" class="w-full h-[3.125rem] px-2 !text-xs rounded-xl  ctx-theme__linear" v-else >
                                <span>Vários locais</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full max-h-full px-ctx overflow-y-auto relative" v-if="currentTemplate.value=='template_two'">
                <div class="w-[18.75rem] max-w-full mx-auto rounded-3xl relative bg-gradient-to-r from-themecardlinear2 to-themecardlinear1" >
                    <div class="w-full h-12 relative flex items-center justify-center">
                        <h5 class="text-sm text-center">
                            <span>Em breve poderá sacar</span>
                        </h5>
                        <div class="h-full px-3 absolute right-0 top-0 flex items-center">
                            <a href="javascript:;" @click="close()" class="w-6 h-6 flex items-center justify-center" >
                               <img :src=CommonImg.btn_close  class="w-4 h-4">
                            </a>
                        </div>
                    </div>
                    <div class="w-full p-4  text-pddcardtext rounded-3xl bg-gradient-to-b from-card2 to-card1"  >
                        <p class="text-xs text-center ">
                            <span>Total de dinheiro a ser pago em breve</span>
                        </p>
                        <p class="text-center">
                            <img :src=CommonImg.img_money class="w-6 h-5 mr-2 inline-block">
                            <b class="text-four text-[2.125rem]">{{ fn(totalBonusRef) }}</b>
                            <b class="ml-2 text-base ">{{ currentUnit.value }}</b>
                        </p>
                        <h6 class="mb-2 text-[0.625rem] ">Formas de Pagamentos</h6>
                   
                        <ul class="w-full px-4 py-3 text-[0.5rem] text-rgbablack80 border border-rgbawhite30 rounded-2xl" >
                            <li class="mb-2 block text-pddcardtext">
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-four text-themeblack text-center rounded-full inline-block align-middle">
                                    <icon-check class="w-2 h-2 inline-block "></icon-check>
                                </i>
                                <span class="align-middle text-[0.64rem]">O pedido de pagamento foi submetido</span>
                            </li>
                            <li class="mb-2 block text-pddcardtext">
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-four text-themeblack  text-center rounded-full inline-block align-middle">
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle text-[0.64rem]">Ainda é necessário{{ Math.max(0, Number(needBonusRef - totalBonusRef)).toFixed(2) }} para realizar</span>
                            </li>
                            <li class="mb-2 block text-pddcardtext">
                                <i class="w-1.5 h-1.5 mr-2.5 ml-0.5 bg-rgbablack30 rounded-full inline-block align-middle" v-if="totalBonusRef<needBonusRef">
                                </i>
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-four text-themeblack text-center rounded-full inline-block align-middle" v-else>
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle text-[0.64rem]">{{needBonusRef}} {{ currentUnit.value }} serão pagos na sua conta Pix</span>
                            </li>
                        </ul>
                        <div class="w-full pt-3 px-6">
                            <button @click="openShare()" class="w-full h-[3.125rem] px-2 !text-xs rounded-full m2-btn-ten" v-if="isCash==0" >
                                <span>Convide amigos para ajudar com</span>
                            </button>
                            <button @click="withdrawCashAndClose()" class="w-full h-[3.125rem] px-2 !text-xs rounded-full m2-btn-ten" v-else >
                                <span>Vários locais</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full max-h-full px-ctx overflow-y-auto relative" v-if="currentTemplate.value=='template_three'">
                <div class="w-[18.75rem] max-w-full mx-auto rounded-3xl relative m3-theme-bg1">
                    <div class="w-full h-12 relative flex items-center justify-center">
                        <h5 class="text-sm text-center text-themetext1">
                            <span>{{ t('activityCenter.withdrawsoon')  }}</span>
                        </h5>
                        <div class="h-full px-3 absolute right-0 top-0 flex items-center">
                            <a href="javascript:;" @click="close()" class="w-6 h-6 flex items-center justify-center">
                               <img :src=CommonImg.btn_close  class="w-4 h-4">
                            </a>
                        </div>
                    </div>
                    <div class="w-full p-4 rounded-3xl bg-gradient-to-b from-card1 to-card2 ">
                        <p class="text-xs text-center">
                            <span>{{ t("activityCenter.paidsoon") }}</span>
                        </p>
                        <p class="text-center">
                            <img :src=CommonImg.img_money class="w-6 h-5 mr-2 inline-block">
                            <b class="text-themetext0 text-[2.125rem]">{{ fn(totalBonusRef) }}</b>
                            <b class="ml-2 text-base">{{ currentUnit.value }}</b>
                        </p>
                        <h6 class="mb-2 text-[0.625rem]">{{ t('activityCenter.PaymentMethods') }}</h6>
                        <ul class="w-full px-4 py-3 text-[0.6rem] border border-rgbablack30 rounded-2xl">
                            <li class="mb-2 block">
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-default-bg text-themewhite text-center rounded-full inline-block align-middle">
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle">{{ t("activityCenter.paymentsubmitted") }}</span>
                            </li>
                            <li class="mb-2 block">
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-default-bg text-themewhite text-center rounded-full inline-block align-middle">
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle">{{ t("activityCenter.necessary") }}{{ Math.max(0, Number(needBonusRef - totalBonusRef)).toFixed(2) }} {{t("activityCenter.perform")}}</span>
                            </li>
                            <li class="mb-2 block">
                                <i class="w-1.5 h-1.5 mr-2.5 ml-0.5 bg-rgbablack30 rounded-full inline-block align-middle" v-if="totalBonusRef<needBonusRef">
                                </i>
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-four text-themewhite text-center rounded-full inline-block align-middle" v-else>
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle">{{needBonusRef}} {{ currentUnit.value }} {{ t("activityCenter.Pixaccount") }}</span>
                            </li>
                        </ul>
                        <div class="w-full pt-3 px-6">
                            <button @click="openShare()" class="w-full h-[3.125rem] px-2 !text-[0.8rem] m3-theme-btn1 rounded-full" v-if="isCash==0">
                                <span>{{ t('activityCenter.inviteshort') }}</span>
                            </button>
                            <button @click="withdrawCashAndClose()" class="w-full h-[3.125rem] px-2 !text-[0.8rem] m3-theme-btn1 rounded-full" v-else>
                                <span>{{ t("activityCenter.Multiplelocations") }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div  v-if="currentTemplate.value=='template_four'"> 

                <section  class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[88] -translate-x-1/2 flex items-center justify-center">
            <em class="w-full h-full bg-black/30 bg-blur absolute left-0 top-0 block"></em>
            <div class="w-full max-h-full px-ctx overflow-y-auto relative  overflow-hidden">
                <div class="w-[18.75rem] max-w-full mx-auto m4-popcard-3 rounded-3xl relative">
                    <div class="w-full h-12 relative flex items-center justify-center">
                        <h5 class="text-sm text-center">
                            <span>Em breve poderá sacar</span>
                        </h5>
                        <div class="h-full px-3 absolute right-0 top-0 flex items-center">
                            <a href="javascript:;" @click="close()" class="w-6 h-6 flex items-center justify-center">
                               <img :src=CommonImg.btn_close class="w-4 h-4">
                            </a>
                        </div>
                    </div>
                    <div class="w-full p-4 text-white rounded-3xl ">
                        <p class="text-xs text-center ">
                            <span>Total de dinheiro a ser pago em breve</span>
                        </p>
                        <p class="text-center">
                            <img :src=CommonImg.img_money class="w-6 h-5 mr-2 inline-block">
                            <b class="text-themetext0 text-[2.125rem]">{{ fn(totalBonusRef) }}</b>
                            <b class="ml-2 text-base ">{{ currentUnit.value }}</b>
                        </p>
                        <h6 class="mb-2 text-[0.625rem] ">Formas de Pagamentos</h6>
                        <ul class="w-full px-4 py-3 text-[0.5rem] text-white border-2 border-black/25 rounded-2xl">
                            <li class="mb-2 block">
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-pwa  text-theme  text-center rounded-full inline-block align-middle">
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle">O pedido de pagamento foi submetido</span>
                            </li>
                            <li class="mb-2 block">
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-pwa text-theme  text-center rounded-full inline-block align-middle">
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle">Ainda é necessário <span class="text-themetext0">{{ Number(needBonusRef-totalBonusRef).toFixed(2)}}</span> para realizar</span>
                            </li>
                            <li class="mb-2 block">
                                <i class="w-1.5 h-1.5 mr-2.5 ml-0.5 bg-pwa rounded-full inline-block align-middle" v-if="totalBonusRef<needBonusRef">
                                </i>
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-pwa  text-theme text-center rounded-full inline-block align-middle" v-else>
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle">{{needBonusRef}} {{ currentUnit.value }} serão pagos na sua conta Pix</span>
                            </li>
                        </ul>
                        <div class="w-full pt-3 px-6">
                            <button @click="openShare()" class="w-full h-[3.125rem] px-2 !text-xs rounded-full m4-nine-btn  text-theme font-bold " v-if="isCash==0">
                                <span>Convide amigos para ajudar com</span>
                            </button>
                            <button @click="withdrawCashAndClose()" class="w-full h-[3.125rem] px-2 !text-xs rounded-full m4-nine-btn  text-theme font-bold " v-else>
                                <span>Vários locais</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            </div>
            <div  v-if="currentTemplate.value=='template_five'"> 

                <section  class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[88] -translate-x-1/2 flex items-center justify-center">
            <em class="w-full h-full bg-black/30 bg-blur absolute left-0 top-0 block"></em>
            <div class="w-full max-h-full px-ctx overflow-y-auto relative  overflow-hidden">
                <div class="w-[18.75rem] max-w-full mx-auto bg-gradient-to-l from-thirsmodel1 to-thirsmodel2 rounded-3xl relative">
                    <div class="w-full h-12 relative flex items-center justify-center">
                        <h5 class="text-sm text-center">
                            <span>Em breve poderá sacar</span>
                        </h5>
                        <div class="h-full px-3 absolute right-0 top-0 flex items-center">
                            <a href="javascript:;" @click="close()" class="w-6 h-6 flex items-center justify-center">
                               <img :src=CommonImg.btn_close class="w-4 h-4">
                            </a>
                        </div>
                    </div>
                    <div class="w-full p-4 text-white rounded-3xl ">
                        <p class="text-xs text-center ">
                            <span>Total de dinheiro a ser pago em breve</span>
                        </p>
                        <p class="text-center">
                            <img :src=CommonImg.img_money class="w-6 h-5 mr-2 inline-block">
                            <b class="text-themetext0 text-[2.125rem]">{{ fn(totalBonusRef) }}</b>
                            <b class="ml-2 text-base ">{{ currentUnit.value }}</b>
                        </p>
                        <h6 class="mb-2 text-[0.625rem] ">Formas de Pagamentos</h6>
                        <ul class="w-full px-4 py-3 text-[0.5rem] text-white border-2 border-black/25 rounded-2xl">
                            <li class="mb-2 block">
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-pwa  text-theme  text-center rounded-full inline-block align-middle">
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle">O pedido de pagamento foi submetido</span>
                            </li>
                            <li class="mb-2 block">
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-pwa text-theme  text-center rounded-full inline-block align-middle">
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle">Ainda é necessário <span class="text-themetext0">{{ Number(needBonusRef-totalBonusRef).toFixed(2)}}</span> para realizar</span>
                            </li>
                            <li class="mb-2 block">
                                <i class="w-1.5 h-1.5 mr-2.5 ml-0.5 bg-rgbawhite50 rounded-full inline-block align-middle" v-if="totalBonusRef<needBonusRef">
                                </i>
                                <i class="w-3 h-3 leading-3 mr-1.5 bg-pwa  text-theme text-center rounded-full inline-block align-middle" v-else>
                                    <icon-check class="w-2 h-2 inline-block"></icon-check>
                                </i>
                                <span class="align-middle">{{needBonusRef}} {{ currentUnit.value }} serão pagos na sua conta Pix</span>
                            </li>
                        </ul>
                        <div class="w-full pt-3 px-6">
                            <button @click="openShare()" class="w-full h-[3.125rem] px-2 !text-xs rounded-full m5-theme-btn1  text-themewhite font-bold " v-if="isCash==0">
                                <span>Convide amigos para ajudar com</span>
                            </button>
                            <button @click="withdrawCashAndClose()" class="w-full h-[3.125rem] px-2 !text-xs rounded-full m5-theme-btn1  text-themewhite font-bold " v-else>
                                <span>Vários locais</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            </div>
        </section>
        <pdd-share v-model="share_show"></pdd-share>
    </div>
</template>