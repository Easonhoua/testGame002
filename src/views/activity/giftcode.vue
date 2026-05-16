<script setup>
import { ref } from 'vue'
import { t } from '@/i18n'
import { redeemCodeMOdel } from '@/model/other'
import { isAuthRef } from '@/model/user'
import { openLoginFunc, isEverLoginFunc } from '@/utils/config'
import { playBtnAudioFunc } from '@/utils/core'
import { socialRedeemListRef } from '@/model/common'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const GiftcodeImg = useThemeImages().giftcode
const CommonImg = useThemeImages().common
const { dataRef, submitCodeFunc } = redeemCodeMOdel()
const input = ref(null)

function submit() {
    //判断是否登录
    if (!isAuthRef.value) {
        playBtnAudioFunc()
        if (isEverLoginFunc()) {
            openLoginFunc(0)
        } else {
            openLoginFunc(1)
        }
        return
    }
    if (dataRef.value.code) {
        submitCodeFunc()
    }
}
function onclickPaste() {
    input.value.focus()
    navigator.clipboard.readText().then(text => {
        dataRef.value.code = text
    })
}

const openSocial = (type) => {
    switch (type) {
        case 'facebook':
            window.open('https://www.facebook.com/pages/creation/?profile_switcher_unified_creation=953646734&ref_type=pages_tab_launch_point_unified_creation')
            break
        case 'telegram':
            window.open('https://t.me/+x2-3cT7NyKBjM2U5')
            break
        case 'whatsapp':
            window.open('https://chat.whatsapp.com/KiFWx4WWdPk9IkI8J1hfYv')
            break
    }
}
</script>

<template>
    <pu-page :title="t('pageTitle.ExchangeRewards')" class="z-[999]">
        <img :src=GiftcodeImg.img_giftcodebg class="w-full absolute left-0 "
            :class="currentTemplate.value == 'template_one' ? '-top-8' : 'top-0'">
        <img :src="CommonImg.m4_null" alt="" v-if="currentTemplate.value == 'template_four'">
        <em class="w-full h-[17.2rem] block" v-else-if="currentTemplate.value == 'template_five'"></em>
        <em class="w-full h-44 block" v-else></em>
        <div v-if="currentTemplate.value == 'template_one'">
            <pu-card theme="3" class="relative">
                <section class="w-full p-px mb-4 rounded-xl bg-gradient-to-t from-gold-500  to-gold-100">
                    <div class="w-full p-4 bg-default-bg text-rgbawhite80 rounded-xl overflow-hidden">
                        <p class="mb-1 text-xs text-four">
                            <span>Introduza / Colar o código de resgate do cupom:</span>
                        </p>
                        <div class="w-full relative">
                            <input ref="input" type="text" v-model="dataRef.code" placeholder="Introduzir / Colar…"
                                class="w-full h-12 pl-4 pr-24 text-base bg-body-bg text-themewhite placeholder:text-rgbawhite50 rounded-xl border border-border1 focus:border-body-bg transition-all duration-300">
                            <div class="h-full pr-2 absolute right-0 top-0 flex items-center">
                                <button @click="onclickPaste()" class="h-8 px-3 !text-xs ctx-theme rounded-lg">
                                    <span>Colar</span>
                                </button>
                            </div>
                        </div>
                        <p class="text-xs opacity-65">*Pressione e segure para colar.</p>
                        <div class="w-full mt-4 flex justify-center">
                            <button @click="submit()"
                                :class="dataRef.code ? 'ctx-theme__linear' : 'border border-rgbawhite10 bg-rgbawhite10 !text-rgbawhite30'"
                                class="h-[3.125rem] min-w-32 px-3 rounded-xl">
                                <span>Troca</span>
                            </button>
                        </div>
                    </div>
                </section>
                <section class="w-full p-px mb-4 rounded-xl ">
                    <div class="w-full p-4 bg-gradient-to-t from-btnlinar3 to-btnlinar4 rounded-xl overflow-hidden">
                        <div class="flex items-center">
                            <img :src=GiftcodeImg.img_giftlink class="w-10 h-10 mr-3 shrink-0">
                            <div class="text-xs flex-1 overflow-hidden">
                                <p>Acompanhe nossa mídia e obtenha códigos de resgate:</p>
                            </div>
                        </div>
                        <div
                            class="w-full h-[3.125rem] mt-4 bg-rgbablack15 rounded-full flex items-center justify-center gap-8">
                            <a v-for="(item, idx) in socialRedeemListRef" :key="idx" :href="item.link" target="_blank"
                                rel="noopener noreferrer" class="social-btn">
                                <img :src="item.icon" class="w-[2.375rem] h-[2.375rem]">
                            </a>
                        </div>
                    </div>
                </section>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-rgbawhite50">
                    <p>1. Insira o código de resgate para receber o bônus em dinheiro.</p>
                    <p>2. O uso do bônus deve seguir as regras da plataforma.</p>
                    <p>3. A empresa reserva-se o direito de interpretação final sobre esta atividade.</p>
                </article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_two'">
            <pu-card theme="3" class="relative">
                <section class="w-full p-px mb-4 ">
                    <div class="w-full p-4  rounded-xl overflow-hidden"
                        :style="{ background: `url(${GiftcodeImg.bg_card1}) no-repeat` }"
                        style="background-size: 100% 100%;">
                        <p class="mb-1 text-xs text-four">
                            <span>Introduza / Colar o código de resgate do cupom:</span>
                        </p>
                        <div class="w-full relative">
                            <input ref="input" type="text" v-model="dataRef.code" placeholder="Introduzir / Colar…"
                                class="w-full h-12 pl-4 pr-24 text-base bg-default-bg text-body-text placeholder:text-three rounded-xl focus:border-body-bg transition-all duration-300">
                            <div class="h-full pr-2 absolute right-0 top-0 flex items-center">
                                <button @click="onclickPaste()"
                                    class=" m2-btn-nine rounded-[10rem] h-8 px-4 !text-xs  px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center ">
                                    <span class="text-[0.98rem]">Colar</span>
                                </button>
                            </div>
                        </div>
                        <p class="text-xs text-three ">*Pressione e segure para colar.</p>
                        <div class="w-full mt-4 flex justify-center">
                            <!--  -->
                            <button @click="submit()"
                                :class="dataRef.code ? 'm2-btn-nine  text-themewhite ' : 'm2-btn-nine-false   text-three opacity-75'"
                                class="h-[3.125rem] min-w-32 px-3 rounded-[2rem] text-[1.25rem] ">
                                <span>Troca</span>
                            </button>
                        </div>
                    </div>
                </section>
                <section class="w-full p-px mb-4 ">
                    <div class="w-full p-2 rounded-xl overflow-hidden"
                        :style="{ background: `url(${GiftcodeImg.bg_card2}) no-repeat` }"
                        style=" background-size: 100% 100%;">
                        <div class="flex items-center">
                            <img :src="GiftcodeImg.img_giftlink" class="w-[5rem]  mr-1 shrink-0">
                            <div class="text-xs flex-1 overflow-hidden">
                                <p>Acompanhe nossa mídia e obtenha códigos de resgate:</p>
                            </div>
                        </div>
                        <div
                            class="w-full h-[4rem] -mt-2 bg-black/40 rounded-lg flex items-center justify-center gap-8">
                            <a v-for="(item, idx) in socialRedeemListRef" :key="idx" :href="item.link" target="_blank"
                                rel="noopener noreferrer" class="social-btn">
                                <img :src="item.icon" class="w-[2.375rem] h-[2.375rem]">
                            </a>
                        </div>
                    </div>
                </section>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-four"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-four">
                        <span>Descrição da Atividade</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-theme">
                    <p>1. Insira o código de resgate para receber o bônus em dinheiro.</p>
                    <p>2. O uso do bônus deve seguir as regras da plataforma.</p>
                    <p>3. A empresa reserva-se o direito de interpretação final sobre esta atividade.</p>
                </article>
            </pu-card>
        </div>

        <div v-if="currentTemplate.value == 'template_three'">
            <pu-card theme="3" class="relative">
                <section class="w-full p-px mb-4 mt-5">
                    <div class="w-full p-4  rounded-xl overflow-hidden"
                        :style="{ background: `url(${GiftcodeImg.bg_card1}) no-repeat` }"
                        style="background-size: 100% 100%;">
                        <p class="mb-1 text-xs">
                            <span>{{ t('activityCenter.EnterCupom') }}:</span>
                        </p>
                        <div class="w-full relative">
                            <input ref="input" type="text" v-model="dataRef.code" placeholder="Introduzir / Colar…"
                                class="w-full h-12 pl-4 pr-24 text-base text-themetext1 bg-default-bg text-body-text placeholder:text-three rounded-xl focus:border-body-bg transition-all duration-300">
                            <div class="h-full pr-2 absolute right-0 top-0 flex items-center">
                                <button @click="onclickPaste()" class="h-8 px-4 !text-xs m3-theme-btn1 rounded-[2rem]">
                                    <span class="text-[0.98rem]">{{ t('activityCenter.exit') }}</span>
                                </button>
                            </div>
                        </div>
                        <p class="text-xs text-three ">*{{ t('activityCenter.Pressurestoexit') }}.</p>
                        <div class="w-full mt-4 flex justify-center">
                            <!--  -->
                            <button @click="submit()" :class="dataRef.code ? 'm3-theme-btn1' : 'm3-theme-btn3'"
                                class="h-[3.125rem] min-w-32 px-3 rounded-[2rem] text-[1.25rem] ">
                                <span>{{ t('activityCenter.Replace') }}</span>
                            </button>
                        </div>
                    </div>
                </section>
                <section class="w-full p-px mb-4 ">
                    <div class="w-full p-2 rounded-xl overflow-hidden"
                        :style="{ background: `url(${GiftcodeImg.bg_card2}) no-repeat` }"
                        style=" background-size: 100% 100%;">
                        <div class="flex items-center">
                            <img :src="GiftcodeImg.img_giftlink" class="w-[5rem]  mr-1 shrink-0">
                            <div class="text-xs flex-1 overflow-hidden">
                                <p>{{ t('activityCenter.Followmediarescuecodes') }}:</p>
                            </div>
                        </div>
                        <div
                            class="w-full h-[4rem] -mt-2 bg-black/40 rounded-lg flex items-center justify-center gap-8">
                            <a v-for="(item, idx) in socialRedeemListRef" :key="idx" :href="item.link" target="_blank"
                                rel="noopener noreferrer" class="social-btn">
                                <img :src="item.icon" class="w-[2.375rem] h-[2.375rem]">
                            </a>
                        </div>
                    </div>
                </section>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <div class="w-full mb-4 flex items-center">
                    <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
                    <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                        <span>{{ t('ActivityDescription') }}</span>
                    </h5>
                    <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
                </div>
                <article class="ctx-article p-mb text-sm text-themetext3">
                    <p>{{ t('activityCenter.activityDetail1') }}</p>
                    <p>{{ t('activityCenter.activityDetail2') }}</p>
                    <p>{{ t('activityCenter.activityDetail3') }}</p>
                </article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_four'">
            <pu-card theme="3" class="relative ">
                <section class="w-full p-px mb-4 ">
                    <div class="w-full p-4  " :style="{
                        backgroundImage: `url(${GiftcodeImg.bg_card1})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center'
                    }">
                        <p class="mb-1 text-xs m4-text font-[600]">
                            <span>Introduza / Colar o código de resgate do cupom:</span>
                        </p>
                        <div class="w-full relative mt-4">
                            <input ref="input" type="text" v-model="dataRef.code" placeholder="Introduzir / Colar…"
                                class="w-full py-3 pl-4 pr-24 text-xs bg-rgbablack30 text-white placeholder:text-themetext3 rounded-full transition-all duration-300">
                            <div class="h-full pr-2 absolute right-0 top-0 flex items-center">
                                <button @click="onclickPaste()"
                                    class="py-1 px-4 text-[0.68rem] m4-nine-btn rounded-[2rem]  font-[600]">
                                    <span>Colar</span>
                                </button>
                            </div>
                        </div>
                        <p class="text-xs text-white flex mt-2"><img :src="CommonImg.icon_rich_warn"
                                class="w-[1rem] mr-2 " />Pressione e segure para colar.</p>
                        <div class="w-full mt-4 flex justify-center">
                            <!--  -->
                            <button @click="submit()"
                                :class="dataRef.code ? 'm4-nine-btn ' : 'm4-btn-false border border-defaultborder text-themetext3'"
                                class="py-1 px-5 rounded-full text-[0.88rem] font-bold">
                                <span>Troca</span>
                            </button>
                        </div>
                    </div>
                </section>
                <section class="w-full  mb-4 ">
                    <div class="w-full  rounded-xl overflow-hidden bg-tablebg2">
                        <p class="text-[0.68rem] p-2 py-3 m4-text font-bold">Acompanhe nossa mídia e obtenha códigos de
                            resgate:</p>
                        <div class="w-full h-[4rem] bg-black/40 flex items-center justify-center gap-8 mt-1 p-2">
                            <a v-for="(item, idx) in socialRedeemListRef" :key="idx" :href="item.link" target="_blank"
                                rel="noopener noreferrer" class="social-btn">
                                <img :src="item.icon" class="w-[2.375rem] h-[2.375rem]">
                            </a>
                        </div>
                    </div>
                </section>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                    <span>Descrição da Atividade:</span>
                </h5>
                <article class="p-mb text-sm text-themetext3">
                    <p>1. Insira o código de resgate para receber o bônus em dinheiro.</p>
                    <p>2. O uso do bônus deve seguir as regras da plataforma.</p>
                    <p>3. A empresa reserva-se o direito de interpretação final sobre esta atividade.</p>
                </article>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_five'">
            <pu-card theme="3" class="relative ">
                <section class="w-full p-px mb-4 ">
                    <div class="w-full p-4  relative rounded-lg z-10 bg-gradient-to-r from-btnlinar3 to-btnlinar4">
                        <p class="mb-1 text-xs text-themewhite font-[600]">
                            <span>Introduza / Colar o código de resgate do cupom:</span>
                        </p>
                        <div class="w-full relative mt-4">
                            <input ref="input" type="text" v-model="dataRef.code" placeholder="Introduzir / Colar…"
                                class="w-full py-3 pl-4 pr-24 text-xs m5-theme-input text-white placeholder:text-themetext3 rounded-full transition-all duration-300">
                            <div class="h-[80%] pr-2 absolute right-1 top-[10%] flex items-center m5-theme-btn1 rounded-full px-2">
                                <button @click="onclickPaste()"
                                    class="py-1 px-4 text-[0.68rem] rounded-[2rem]  font-[600]">
                                    <span>Colar</span>
                                </button>
                            </div>
                        </div>
                        <p class="text-xs text-white flex mt-2"><img :src="CommonImg.icon_rich_warn"
                                class="w-[1rem] mr-2 " />Pressione e segure para colar.</p>
                        <div class="w-full mt-4 flex justify-center">
                            <!--  -->
                            <button @click="submit()"
                                :class="dataRef.code ? ' m5-theme-btn1 ' : 'bg-body-bg  text-themewhite'"
                                class="py-1 px-5 rounded-full text-[0.88rem] font-bold">
                                <span>Troca</span>
                            </button>
                        </div>
                    </div>
                </section>
                <section class="w-full  mb-4 ">
                    <div class="w-full  rounded-xl overflow-hidden bg-tablebg1">
                        <p class="text-[0.68rem] p-2 py-3 text-themewhite font-bold">Acompanhe nossa mídia e obtenha códigos de
                            resgate:</p>
                        <div class="w-full h-[4rem] bg-tablebg2 flex items-center justify-center gap-8 mt-1 p-2">
                            <a v-for="(item, idx) in socialRedeemListRef" :key="idx" :href="item.link" target="_blank"
                                rel="noopener noreferrer" class="social-btn">
                                <img :src="item.icon" class="w-[2.375rem] h-[2.375rem]">
                            </a>
                        </div>
                    </div>
                </section>
            </pu-card>
            <pu-card theme="3" class="mb-3 pt-3">
                <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                    <span>Descrição da Atividade:</span>
                </h5>
                <article class="p-mb text-sm text-themetext4">
                    <p>1. Insira o código de resgate para receber o bônus em dinheiro.</p>
                    <p>2. O uso do bônus deve seguir as regras da plataforma.</p>
                    <p>3. A empresa reserva-se o direito de interpretação final sobre esta atividade.</p>
                </article>
            </pu-card>
        </div>

        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
