<script setup>
import { ref,computed } from 'vue'
import {  t } from '@/i18n'
import { useScreenSafeArea,isIOS } from '@vueuse/core'
import { bodyWidthRef } from '@/utils/config'
import { playBtnAudioFunc } from '@/utils/core'
import useClipboard from "vue-clipboard3"
import {  userModel } from '@/model/user'
import { phoneNumbers,shareMsg,pddSendSms} from '@/model/pdd'
import { useThemeImages } from '@/utils/themeimg'
const CommonBgImg = useThemeImages().commonbg
const CommonImg = useThemeImages().common 
const AsideImg = useThemeImages().aside
const PddImg = useThemeImages().pdd
const MineImg = useThemeImages().mine
const { top, bottom } = useScreenSafeArea()

const props = defineProps({
    modelValue: Boolean
})
const emits = defineEmits(['update:modelValue'])
const { toClipboard } = useClipboard()
const { memberRef } = userModel()
const share_detection = ref(`Olá, eu estou jogando no ${window.document.title}, Ganhe R$ 10.000 por dia!`)
const invite_link = computed(()=> {
    let code = memberRef.value&&memberRef.value.promoter_code
    let domain = window.location.protocol + '//' + window.location.host + '/#/'
    var query = {
        promoter: code
    }
    var queryString = new URLSearchParams(query).toString()
    return code ? domain+'pdd?'+queryString : domain+'/pdd'
})
async function copyInviteCode(_val) {
    playBtnAudioFunc()
    await toClipboard(_val)
    showToast({
        message: 'foi copiado',
        type: 'success',
        wordBreak: 'break-word',
    });
}
function close() {
    emits('update:modelValue', false)
}

// 检查设备并生成相应链接
const getSMSLink = () => {
    pddSendSms()
    if (isIOS) {
        return `sms:/open?addresses=${phoneNumbers.value.join(',')}&body=${shareMsg.value} ${encodeURIComponent(invite_link.value)}`;
    } else {
        // Android - 用分号替换逗号
        const androidNumbers = phoneNumbers.value.join(';');
        return `sms:${androidNumbers}?body=${shareMsg.value} ${encodeURIComponent(invite_link.value)}`;
    }
};


let index = 0;
const getWhatsAppLink = () => {
  // 确保 phoneNumbers 有值
  if (!phoneNumbers.value || phoneNumbers.value.length === 0) {
    return `https://api.whatsapp.com/send?text=${shareMsg.value} ${encodeURIComponent(invite_link.value)}&url=${encodeURIComponent(invite_link.value)}`;
  }

  // 获取当前电话号码
  const phone = phoneNumbers.value[index];

  // 更新索引，确保循环到下一个号码
  index = (index + 1) % phoneNumbers.value.length;

  // 返回生成的 WhatsApp 链接
  return `https://api.whatsapp.com/send?phone=${phone}&text=${shareMsg.value} ${encodeURIComponent(invite_link.value)}&url=${encodeURIComponent(invite_link.value)}`;
};

const redirectToWhatsApp = () => {
  const whatsappLink = getWhatsAppLink();
  window.open(whatsappLink, '_blank');
};

const redirectToSms = () => {
    const smsLink = getSMSLink();
    window.location.href = smsLink;
};

</script>
<template>
    <van-popup
            :show="modelValue"
            @update:show="(val) => emits('update:modelValue', val)"
            position="bottom"
            :style="{ width: '560px', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px',background: `url(${CommonBgImg.bg_body_1}) center` }"
            :overlay-style="{ width: '560px', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px' }"
            style="background-size: cover;"
            teleport="body"
           v-if="currentTemplate.value=='template_one'"
        >
            <section :style="`padding-top: ${top};width: '560px'`" class="w-full">
                <div class="absolute top-0 right-0 flex items-center">
                    <a @click="close" href="javascript:;" class="h-full p-3 flex items-center">
                        <em class="w-[1.375rem] h-[1.375rem] bg-rgbawhite30 rounded-full flex items-center justify-center">
                            <icon-close class="w-3 h-3"></icon-close>
                        </em>
                    </a>
                </div>
            </section>
            <pu-card theme="5" class="py-5 px-2.5">
                <h3 class="mb-3 text-xs">
                    <span>1. Convide amigos para ajudar com saques</span>
                </h3>
                <share-list :showName="true"></share-list>
                <div class="pb-5">
                    <dl class="w-full h-7 bg-rgbawhite30 rounded-md flex items-center">
                        <dt class="px-3 flex-1 overflow-hidden">
                            <input type="text" :value="invite_link" readonly class="w-full h-6 text-[0.625rem] bg-transparent outline-none">
                        </dt>
                        <dd @click="copyInviteCode(invite_link)" class="h-full px-3 text-[0.625rem] text-one cursor-pointer select-none flex items-center shrink-0">
                            <span>Cópia</span>
                        </dd>
                    </dl>
                </div>
                <h3 class="mb-3 text-xs">
                    <span>2. Enviar convite para jogador aleatório ajudar</span>
                </h3>
                <!-- 电话号码列表 -->
                <div v-if="phoneNumbers.length > 0" class="phone-list bg-rgbablack30 rounded-lg p-2">
                    <div class="flex flex-wrap gap-y-1">
                        <div 
                        v-for="(phone, index) in phoneNumbers" 
                        :key="index" 
                        class="text-xs text-white bg-transparent px-2 py-1 rounded-md text-center flex-1"
                        >
                        {{ phone }}
                        </div>
                    </div>
                </div>
                <dl class="w-full px-2.5 pb-3 pt-6 text-xs bg-themeblack flex">
                    <dd class="w-1/2 pr-2">
                        <a href="javascript:void(0);"
                            @click="redirectToWhatsApp()"
                            class="w-full h-full min-h-11 pl-2.5 pr-12 py-1 bg-themewhite text-themeblack relative block">
                            <span>Enviar Mensagem</span>
                            <br>
                            <b>WhatsAPP</b>
                            <span  target="_blank" class="pr-2.5 py-1 absolute right-0 top-0 flex">
                                <img src="/imgs/lo_whatsapp.svg" class="w-8 h-8">
                            </span>
                        </a>
                    </dd>
                    <dd class="w-1/2 pr-l">
                        <a href="javascript:void(0);" 
                            @click="redirectToSms()"
                            class="w-full h-full min-h-11 pr-2.5 pl-12 py-1 bg-themewhite text-themeblack relative block">
                            <span>Enviar Mensagem</span>
                            <br>
                            <b>SMS</b>
                            <img
                                :src="CommonImg.gif_finger"
                                class="absolute left-[60%] top-10  w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                />
                            <span  class="pl-2.5 py-1 absolute left-0 top-0 flex">
                                <img :src=PddImg.icon_sms class="w-8 h-8">
                            </span>
                        </a>
                    </dd>
                </dl>
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
    </van-popup>
    <van-popup
            :show="modelValue"
            @update:show="(val) => emits('update:modelValue', val)"
            position="bottom"
            :style="{ width: '560px', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px',borderRadius:'1.25rem 1.25rem 0 0' }"
            :overlay-style="{ width: '560px', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px',borderRadius:'1.25rem 1.25rem 0 0' }"
            style="background: linear-gradient(to bottom, var(--color-themecardlinear2), var(--color-themecardlinear1))"
            teleport="body"
            v-if="currentTemplate.value=='template_two'"
        >
        <section :style="`padding-top: ${top};width: '560px'`" class="w-full">
                <div class="absolute top-0 right-0 flex items-center">
                    <a @click="close" href="javascript:;" class="h-full p-3 flex items-center">
                       <img :src=CommonImg.btn_close class="w-4 h-4">
                    </a>
                </div>
            </section>
            <pu-card theme="5" class="py-5 px-2.5">
                <h3 class="text-xs">
                    <span class="text-three">1. Convide amigos para ajudar com saques</span>
                </h3>
                <share-list :showName="true"></share-list>
                <div class="pb-5">
                    <dl class="w-full h-7 bg-default-bg rounded-md flex items-center">
                        <dt class="px-3 flex-1 overflow-hidden ">
                            <input type="text" :value="invite_link" readonly class="w-full h-6 text-[0.78rem] bg-transparent outline-none text-three">
                        </dt>
                        <dd @click="copyInviteCode(invite_link)" class="h-full px-3 text-[0.78rem] text-four cursor-pointer select-none flex items-center shrink-0">
                           <img :src=AsideImg.icon_copy alt="" class="w-3 h-3 mr-1"/>
                            <span>Cópia</span>
                        </dd>
                    </dl>
                </div>
                <h3 class="mb-3 text-xs">
                    <span class="text-three">2. Enviar convite para jogador aleatório ajudar</span>
                </h3>
                <!-- 电话号码列表 -->
                <div v-if="phoneNumbers.length > 0" class="phone-list bg-default-bg rounded-lg p-2 mb-4">
                    <div class="flex flex-wrap gap-y-1">
                        <div 
                        v-for="(phone, index) in phoneNumbers" 
                        :key="index" 
                        class="text-xs text-white bg-transparent px-2 py-1 rounded-md text-center flex-1"
                        >
                        {{ phone }}
                        </div>
                    </div>
                </div>
                <dl class="w-full  pb-3 text-xs flex">
                    <dd class="w-1/2 pr-2">
                         <a href="javascript:void(0);"
                            @click="redirectToWhatsApp()"
                            class="w-full h-full min-h-11 px-3  py-2 bg-default-bg  text-wihte  flex items-center justify-between rounded-xl ">
                            <div class="text-[0.68rem] ">
                                <span>Enviar Mensagem</span>
                                <br>
                                <b>WhatsAPP</b>
                            </div>
                           
                            <span target="_blank">
                                <img src="/imgs/lo_whatsapp.svg" class="w-8 h-8">
                            </span>
                        </a>
                    </dd>
                    <dd class="w-1/2 ">
                        <a href="javascript:void(0);" 
                        @click="redirectToSms()"
                        class="relative w-full h-full min-h-11 px-3 py-2 bg-default-bg  text-wihte   flex items-center justify-between rounded-xl ">
                            <div class="text-[0.68rem]">
                                <span>Enviar Mensagem</span>
                                <br>
                                <b>SMS</b>
                            </div>
                            <img
                                :src="CommonImg.gif_finger"
                                class="absolute left-[60%] top-10  w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                />
                            <span >
                                <img :src=PddImg.icon_sms  class="w-9 h-8">
                            </span>
                        </a>
                    </dd>
                </dl>
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
    </van-popup>
    <van-popup
            :show="modelValue"
            @update:show="(val) => emits('update:modelValue', val)"
            position="bottom"
            :style="{ width: '560px', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px',borderRadius:'1.25rem 1.25rem 0 0' }"
            :overlay-style="{ width: '560px', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px',borderRadius:'1.25rem 1.25rem 0 0' }"
            style="background: linear-gradient(to bottom, var(--color-card1), var(--color-card2))"
            teleport="body"
            v-if="currentTemplate.value=='template_three'"
        >
        <section :style="`padding-top: ${top};width: '560px'`" class="w-full">
                <div class="absolute top-0 right-0 flex items-center">
                    <a @click="close" href="javascript:;" class="h-full p-3 flex items-center">
                       <img :src=CommonImg.btn_close class="w-4 h-4">
                    </a>
                </div>
            </section>
            <pu-card theme="5" class="py-5 px-2.5">
                <h3 class="text-xs">
                    <span class="text-themetext1">1. {{ t('activityCenter.invitedetail') }}</span>
                </h3>
                <share-list :showName="true"></share-list>
                <div class="pb-5">
                    <dl class="w-full h-7 bg-black/20 rounded-md flex items-center">
                        <dt class="px-3 flex-1 overflow-hidden ">
                            <input type="text" :value="invite_link" readonly class="w-full h-6 text-[0.78rem] bg-transparent outline-none text-themetext1">
                        </dt>
                        <dd @click="copyInviteCode(invite_link)" class="h-full px-3 text-[0.78rem] text-themetext0 cursor-pointer select-none flex items-center shrink-0">
                           <img :src=AsideImg.icon_copy alt="" class="w-3 h-3 mr-1"/>
                            <span>{{ t("activityCenter.Copy") }}</span>
                        </dd>
                    </dl>
                </div>
                <h3 class="mb-3 text-xs">
                    <span class="text-themetext1">2. {{ t('commCenter.details1') }}</span>
                </h3>
                <!-- 电话号码列表 -->
                <div v-if="phoneNumbers.length > 0" class="phone-list bg-black/20 rounded-lg p-2 mb-4">
                    <div class="flex flex-wrap gap-y-1">
                        <div 
                        v-for="(phone, index) in phoneNumbers" 
                        :key="index" 
                        class="text-xs text-white bg-transparent px-2 py-1 rounded-md text-center flex-1"
                        >
                        {{ phone }}
                        </div>
                    </div>
                </div>
                <dl class="w-full  pb-3 text-xs flex">
                    <dd class="w-1/2 pr-2">
                         <a href="javascript:void(0);"
                            @click="redirectToWhatsApp()"
                            class="w-full h-full min-h-11 px-3  py-2 bg-black/20  text-wihte  flex items-center justify-between rounded-xl ">
                            <div class="text-[0.68rem] ">
                                <span>Enviar Mensagem</span>
                                <br>
                                <b>WhatsAPP</b>
                            </div>
                           
                            <span target="_blank">
                                <img src="/imgs/lo_whatsapp.svg" class="w-8 h-8">
                            </span>
                        </a>
                    </dd>
                    <dd class="w-1/2 ">
                        <a href="javascript:void(0);"
                        @click="redirectToSms()"
                        class="relative w-full h-full min-h-11 px-3 py-2 bg-black/20  text-wihte   flex items-center justify-between rounded-xl ">
                            <div class="text-[0.68rem]">
                                <span>Enviar Mensagem</span>
                                <br>
                                <b>SMS</b>
                            </div>
                            <img
                                :src="CommonImg.gif_finger"
                                class="absolute left-[60%] top-10  w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                />
                            <span >
                                <img :src=PddImg.icon_sms  class="w-9 h-8">
                            </span>
                        </a>
                    </dd>
                </dl>
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
    </van-popup>
    <!-- modelValue -->
    <van-popup
            :show="modelValue"
            @update:show="(val) => emits('update:modelValue', val)"
            position="bottom"
            :style="{ width: '560px', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px',borderRadius:'1.25rem 1.25rem 0 0' }"
            :overlay-style="{ width: '560px', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px',borderRadius:'1.25rem 1.25rem 0 0' }"
            class="m5-theme-model3"
            teleport="body"
            v-if="currentTemplate.value=='template_four'"
        >
            <section :style="`padding-top: ${top};width: '560px'`" class="w-full">
                <div class="absolute top-0 right-0 flex items-center">
                    <a @click="close" href="javascript:;" class="h-full p-3 flex items-center">
                       <img :src=CommonImg.btn_close class="w-4 h-4">
                    </a>
                </div>
            </section>
            <pu-card theme="5" class="py-5 px-2.5">
                <h3 class="text-xs">
                    <span class="m4-text">1. Convide amigos para ajudar com saques</span>
                </h3>
                <share-list :showName="true"></share-list>
                <div class="pb-5">
                    <dl class="w-full h-7 bg-white/20 rounded-md flex items-center">
                        <dt class="px-3 flex-1 overflow-hidden ">
                            <input type="text" :value="invite_link" readonly class="w-full h-6 text-[0.78rem] bg-transparent outline-none m4-text">
                        </dt>
                        <dd @click="copyInviteCode(invite_link)" class="h-full px-3 text-[0.78rem] text-white cursor-pointer select-none flex items-center shrink-0">
                           <img :src=MineImg.btncopy alt="" class="w-3 h-3 mr-1"/>
                            <span>Cópia</span>
                        </dd>
                    </dl>
                </div>
                <h3 class="mb-3 text-xs">
                    <span class="m4-text">2. Enviar convite para jogador aleatório ajudar</span>
                </h3>
                <!-- 电话号码列表 -->
                <div v-if="phoneNumbers.length > 0" class="phone-list bg-white/20  rounded-lg p-2">
                    <div class="flex flex-wrap gap-y-1">
                        <div 
                        v-for="(phone, index) in phoneNumbers" 
                        :key="index" 
                        class="text-xs text-white bg-transparent px-2 py-1 rounded-md text-center flex-1"
                        >
                        {{ phone }}
                        </div>
                    </div>
                </div>
                <dl class="mt-2 w-full pb-3 text-xs flex">
                    <dd class="w-1/2 pr-2">
                        <a href="javascript:void(0);"
                        @click="redirectToWhatsApp()"
                        class="w-full h-full min-h-11 px-3  py-2 bg-white/20 text-wihte  flex items-center justify-between rounded-xl ">
                            <div class="text-[0.68rem] ">
                                <span>Enviar Mensagem</span>
                                <br>
                                <b>WhatsAPP</b>
                            </div>
                           
                            <span target="_blank">
                                <img src="/imgs/lo_whatsapp_2.svg" class="w-8 h-8">
                            </span>
                        </a>
                    </dd>
                    <dd class="w-1/2 ">
                        <a href="javascript:void(0);"
                        @click="redirectSms()"
                        class="relative w-full h-full min-h-11 px-3 py-2  bg-white/20  text-wihte   flex items-center justify-between rounded-xl ">
                            <div class="text-[0.68rem]">
                                <span>Enviar Mensagem</span>
                                <br>
                                <b>SMS</b>
                            </div>
                            <img
                               :src="CommonImg.gif_finger"
                                class="absolute left-[70%] top-10 w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                />
                            <span>
                                <img :src=PddImg.icon_sms  class="w-9 h-8">
                            </span>
                        </a>
                    </dd>
                </dl>
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
            <van-popup
            :show="modelValue"
            @update:show="(val) => emits('update:modelValue', val)"
            position="bottom"
            :style="{ backgroundColor: '#1e2a4c', width: '560px', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px',borderRadius:'1.25rem 1.25rem 0 0' }"
            :overlay-style="{ width: '560px', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px',borderRadius:'1.25rem 1.25rem 0 0' }"
            teleport="body"
            v-if="currentTemplate.value=='template_five'"
        >
            <section :style="`padding-top: ${top};width: '560px'`" class="w-full">
                <div class="absolute top-0 right-0 flex items-center">
                    <a @click="close" href="javascript:;" class="h-full p-3 flex items-center">
                       <img :src=CommonImg.btn_close class="w-4 h-4">
                    </a>
                </div>
            </section>
            <pu-card theme="3" class="py-5 px-2.5">
                <h3 class="text-xs">
                    <span class="m4-text">1. Convide amigos para ajudar com saques</span>
                </h3>
                <share-list :showName="true"></share-list>
                <div class="pb-2">
                    <dl class="w-full h-7 bg-white/10 rounded-md flex items-center">
                        <dt class="px-3 flex-1 overflow-hidden ">
                            <input type="text" :value="invite_link" readonly class="w-full h-6 text-[0.78rem] bg-transparent outline-none text-textehite">
                        </dt>
                        <dd @click="copyInviteCode(invite_link)" class="h-full px-3 text-[0.78rem] text-white cursor-pointer select-none flex items-center shrink-0">
                           <img :src=MineImg.btncopy alt="" class="w-4 h-4 mr-1"/>
                            <span>Cópia</span>
                        </dd>
                    </dl>
                </div>
                <h3 class="mb-3 text-xs">
                    <span class="m4-text">2. Enviar convite para jogador aleatório ajudar</span>
                </h3>
                <!-- 电话号码列表 -->
                <div v-if="phoneNumbers.length > 0" class="phone-list bg-white/10  rounded-lg p-2">
                    <div class="flex flex-wrap gap-y-1">
                        <div 
                        v-for="(phone, index) in phoneNumbers" 
                        :key="index" 
                        class="text-xs text-white bg-transparent px-2 py-1 rounded-md text-center flex-1"
                        >
                        {{ phone }}
                        </div>
                    </div>
                </div>
                <dl class="mt-2 w-full pb-3 text-xs flex">
                    <dd class="w-1/2 pr-2">
                        <a href="javascript:void(0);"
                        @click="redirectToWhatsApp()"
                        class="w-full h-full min-h-11 px-3  py-2 bg-white/10 text-wihte  flex items-center justify-between rounded-xl ">
                            <div class="text-[0.68rem] ">
                                <span>Enviar Mensagem</span>
                                <br>
                                <b>WhatsAPP</b>
                            </div>
                           
                            <span target="_blank">
                                <img src="/imgs/lo_whatsapp_2.svg" class="w-8 h-8">
                            </span>
                        </a>
                    </dd>
                    <dd class="w-1/2 ">
                        <a href="javascript:void(0);"
                        @click="redirectSms()"
                        class="relative w-full h-full min-h-11 px-3 py-2  bg-white/10  text-wihte   flex items-center justify-between rounded-xl ">
                            <div class="text-[0.68rem]">
                                <span>Enviar Mensagem</span>
                                <br>
                                <b>SMS</b>
                            </div>
                            <img
                               :src="CommonImg.gif_finger"
                                class="absolute left-[70%] top-10 w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                />
                            <span>
                                <img :src=PddImg.icon_sms  class="w-9 h-8">
                            </span>
                        </a>
                    </dd>
                </dl>
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
</template>
