<script setup>
import {ref, computed} from 'vue'
import { t } from '@/i18n'
import { boxModel } from '@/model/treasure'
import InviteShareCard from '@/components/pages/InviteShareCard.vue'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
import { isIOS} from '@/utils/core'
import { shareMsg } from '@/model/pdd'
import { userModel } from '@/model/user'
import { pullRefreshProps } from 'vant'
const { memberRef } = userModel()
const CommonImg = useThemeImages().common 
const TreasureImg = useThemeImages().treasure
const TRechargeImg = useThemeImages().totalrecharge
const PddImg = useThemeImages().pdd
const AgentImg = useThemeImages().agent
const { configListRef, boxTaskFunc,childNum,boxRuleRef,boxBannerRef,bannerLoaded,phoneNumbers} = boxModel({list: true})
const showMore = ref(false)

const invite_link = computed(()=> {
    let code = memberRef.value&&memberRef.value.promoter_code
    let domain = window.location.protocol + '//' + window.location.host + '/#/'
    var query = {
        promoter: code
    }
    var queryString = new URLSearchParams(query).toString()
    return code ? domain+'pdd?'+queryString : domain+'/pdd'
})

// 检查设备并生成相应链接
const getSMSLink = () => {
    // pddSendSms()
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

const redirectSms = () => {
  const smsLink = getSMSLink();
  window.location.href = smsLink;
};

</script>

<template>
    <pu-page :title="t('pageTitle.TreasureChest')" class="z-[999]" v-if="currentTemplate.value == 'template_one'|| currentTemplate.value == 'template_two'|| currentTemplate.value == 'template_three'">
        <!-- <img :src="boxBannerRef!=''? boxBannerRef : TreasureImg.img_treasure" class="w-full h-auto block"> -->
        <div class=" w-full h-auto mt-4 mb-4 m-auto">
            <img 
            v-if="boxBannerRef && boxBannerRef !== ''"
            :src="boxBannerRef" 
            class=" w-[21rem] m-auto "
            :class="{ 'opacity-0': !bannerLoaded }"
            />
            <img 
            v-else
            :src="TreasureImg.img_treasure" 
            class="w-[21rem] m-auto  "
            :class="{ 'opacity-0': !bannerLoaded || boxBannerRef !== ''}"
            />
        </div>

        <pu-card theme="3" class="mb-4 text-white">

            <invite-share-card></invite-share-card>

            <div class="rounded-2xl px-3 mt-3" v-if="phoneNumbers.length > 0"
                :class="currentTemplate.value =='template_one' ? 'bg-rgbawhite10' : 'm3-theme-bg1'">   
                <h3 class="pt-2 mb-1 text-sm ">
                    <span class="text-themewhite ">{{ t('commCenter.details1') }}</span>
                </h3>
                
                <div v-if="phoneNumbers.length" class="relative">
                    <div class="bg-black/40 rounded-lg p-2 relative">

                        <div class="pr-6">
                            <!-- 一级显示 -->
                            <div class="grid grid-cols-3 gap-2">
                                <div
                                v-for="(phone, index) in phoneNumbers.slice(0, 3)"
                                :key="index"
                                class="text-xs  rounded text-center truncate"
                                :class="currentTemplate.value =='template_three' ? ' text-themetext1' : 'text-white'"
                                >
                                {{ phone }}
                                </div>
                            </div>

                            <!-- 展开显示 -->
                            <transition name="fade">
                                <div
                                v-if="showMore && phoneNumbers.length > 3"
                                class="mt-2 border-white/10"
                                >
                                <div class="grid grid-cols-3 gap-2">
                                    <div
                                    v-for="(phone, index) in phoneNumbers.slice(3)"
                                    :key="'more-' + index"
                                    class="text-xs rounded text-center truncate"
                                    :class="currentTemplate.value =='template_three' ? ' text-themetext1' : 'text-white'"
                                    >
                                    {{ phone }}
                                    </div>
                                </div>
                                </div>
                            </transition>

                        </div>

                        <!-- 按钮：完全不参与对齐 -->
                        <button
                            v-if="phoneNumbers.length > 3"
                            @click="showMore = !showMore"
                            class="absolute top-0.5 right-1 w-7 h-7 flex items-center justify-center"
                        >
                        <img
                            :src=AgentImg.icon_dowm
                            class="w-5 h-5 transition-transform duration-300"
                            :class="{ 'rotate-180': showMore }"
                        />
                        </button>

                    </div>
                </div>

                <dl class="mt-2 w-full pb-3 text-xs flex gap-2">
                    <dd class="flex-1">
                    <a @click="redirectToWhatsApp()" class="block min-h-11 px-3 py-2 bg-black/40 text-white flex items-center justify-between rounded-xl hover:bg-white/30">
                        <div class="text-[0.68rem]">
                        <span>Enviar Mensagem</span><br>
                        <b>WhatsAPP</b>
                        </div>
                        <img src="/imgs/lo_whatsapp.svg" class="w-8 h-8">
                    </a>
                    </dd>
                    <dd class="flex-1">
                    <a @click="redirectSms()" class="relative min-h-11 px-3 py-2 bg-black/40 text-white flex items-center justify-between rounded-xl hover:bg-white/30">
                        <div class="text-[0.68rem]">
                        <span>Enviar Mensagem</span><br>
                        <b>SMS</b>
                        <img
                            :src="CommonImg.gif_finger"
                            class="absolute left-[60%] top-10  w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            />
                        </div>
                        <img :src=PddImg.icon_sms class="w-9 h-8">
                    </a>
                    </dd>
                </dl>
            </div>
        </pu-card>
        
        <pu-card theme="3" class="mb-4">
            <dl @click="$router.push('/treasure/subordinate')" class="w-full h-11 px-1.5 text-sm  rounded-full cursor-pointer flex items-center"
            :class="currentTemplate.value =='template_one' ? ' bg-rgbawhite10' : 'm3-theme-bg1'"
            >
                <dt class="pl-2 flex-1 overflow-hidden">{{ t('activityCenter.directSubordinates') }}</dt>
                <dd class="px-1.5 shrink-0">
                    <span class="text-base text-yellow-400">{{childNum}}</span>
                    <span class="text-xs">&nbsp;{{ t('activityCenter.People') }}</span>
                </dd>
                <dd class="w-6 h-6 ctx-theme__linear rounded-full flex items-center justify-center shrink-0" v-if="currentTemplate.value =='template_one'">
                    <icon-arrow-right class="w-4 h-4"></icon-arrow-right>
                </dd>
                <img :src="TreasureImg.icon_right" class="h-5 mr-2" v-else>
            </dl>
        </pu-card>
        <pu-card theme="5" v-if="currentTemplate.value =='template_one'">
            <ul v-for="item,index in configListRef" :key="index" :class="index%2?'flex-row-reverse':''" class="px-2 flex">
                <template v-for="child,eq in item" :key="'child_'+eq">
                    <li class="w-1/4 p-2 relative">
                        <div @click="boxTaskFunc(child, index, eq)" class="w-[4.25rem] max-w-fit h-[3.125rem] mx-auto relative cursor-pointer">
                            <img v-if="child.check_status == 0" :src=TreasureImg.img_item2 class="w-full h-full">
                            <img v-else-if="child.check_status == 1" :src=TreasureImg.img_item3 class="w-full h-full">
                            <img v-else :src=TreasureImg.img_item1 class="w-full h-full">
                            <p class="w-full text-[0.625rem] text-rgbawhite80 text-center absolute left-0 bottom-0">
                                <span>{{ child.active_users }} Pessoas</span>
                            </p>
                        </div>
                        <p class="mt-px text-xs text-rgbawhite50 text-center">{{ child.bonus }}</p>
                        
                        <!-- 奇数行(从右到左)的连接箭头 -->
                        <template v-if="index%2">
                            <!-- 左侧箭头(除了第一个元素) -->
                            <em v-if="eq >= 0 && eq < 3" class="w-4 h-[3.125rem] absolute -left-2 top-2 flex items-center">
                                <svg class="w-4 h-4" stroke="currentColor" stroke-width="3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M36 36L24 24L36 12" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M24 36L12 24L24 12" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </em>
                            <!-- 第一个元素下方箭头 -->
                            <i v-if="eq == 3 && index < configListRef.length - 1" class="w-full h-4 absolute left-0 -bottom-2 flex justify-center">
                                <!-- <p>11</p> -->
                                <svg class="w-4 h-4" stroke="currentColor" stroke-width="3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M36 12L24 24L12 12" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M36 24L24 36L12 24" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </i>
                        </template>
                        
                        <!-- 偶数行(从左到右)的连接箭头 -->
                        <template v-else>
                            <!-- 右侧箭头(除了最后一个元素) -->
                            <em v-if="eq < 3" class="w-4 h-[3.125rem] absolute -right-2 top-2 flex items-center">
                                <svg class="w-4 h-4" stroke="currentColor" stroke-width="3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12L24 24L12 36" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M24 12L36 24L24 36" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </em>
                            <!-- 最后一个元素下方箭头 -->
                            <i v-if="eq == 3 && index < configListRef.length - 1" class="w-full h-4 absolute left-0 -bottom-2 flex justify-center">
                                <svg class="w-4 h-4" stroke="currentColor" stroke-width="3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M36 12L24 24L12 12" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M36 24L24 36L12 24" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </i>
                        </template>
                    </li>
                </template>
            </ul>
        </pu-card>
        <pu-card theme="5" v-else>
            <ul v-for="item,index in configListRef" :key="index" :class="index%2?'flex-row-reverse':''" class="px-2 flex">
                <template v-for="child,eq in item" :key="'child_'+eq">
                    <li class="w-1/4 p-4 relative">
                        <!--旋转-->
                        <img :src="TreasureImg.box_item_bg" v-if="child.check_status == 0 " class="absolute inset-0 left-[0.88rem]  animate-spin w-[4rem] h-[4rem]" style="z-index: 0;">
                        <div @click="boxTaskFunc(child, index, eq)" class="w-[3rem] max-w-fit h-[2rem] mx-auto relative cursor-pointer" >
                            <img v-if="child.check_status == 0 " :src=TreasureImg.img_item2 class="w-full h-full">
                            <img v-else-if="child.check_status == 1" :src="TreasureImg.img_item3" class="w-full h-full">
                            <img v-else :src="TreasureImg.img_item1" class="w-full h-full">
                        </div>
                        <p class="w-full text-[0.625rem]  text-three /85 text-center ">
                                <span>{{ child.active_users }} {{ t('activityCenter.People') }}</span>
                            </p>
                        <p class="text-[0.78rem]  text-four text-center" style="font-weight: 600;">{{ child.bonus }}</p>
                        
                        <!-- 奇数行(从右到左)的连接箭头 -->
                        <template v-if="index%2">
                            <!-- 左侧箭头(除了第一个元素) -->
                            <em v-if="eq >= 0 && eq < 3" class="w-7 h-[3.125rem] absolute -left-2 top-2 flex items-center">
                              <img :src="TreasureImg.icon_jiantou1" />
                            </em>
                            <!-- 第一个元素下方箭头 -->
                            <i v-if="eq == 3 && index < configListRef.length - 1" class="w-full h-6 absolute left-0 -bottom-2 flex justify-center">
                                <!-- <p>11</p> -->
                                <img :src="TreasureImg.icon_jiantou3" />
                            </i>
                        </template>
                        
                        <!-- 偶数行(从左到右)的连接箭头 -->
                        <template v-else>
                            <!-- 右侧箭头(除了最后一个元素) -->
                            <em v-if="eq < 3" class="w-7 h-[3.125rem] absolute -right-2 top-2 flex items-center">
                                <img :src="TreasureImg.icon_jiantou2" />
                            </em>
                            <!-- 最后一个元素下方箭头 -->
                            <i v-if="eq == 3 && index < configListRef.length - 1" class="w-full h-6 absolute left-0 -bottom-2 flex justify-center">
                                <img :src="TreasureImg.icon_jiantou3" />
                            </i>
                        </template>
                    </li>
                </template>
            </ul>
        </pu-card>
        <pu-card theme="3" class="py-10" v-if="currentTemplate.value =='template_one'||currentTemplate.value =='template_two'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent " :class="currentTemplate.value =='template_one' ? ' to-themewhite' : ' to-four'"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center" :class="currentTemplate.value =='template_one' ? '' : ' text-four'">
                    <span>Descrição da Atividade</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent " :class="currentTemplate.value =='template_one' ? ' to-themewhite' : ' to-four'"></em>
            </div>
            <!-- <article class="ctx-article p-mb text-sm text-rgbawhite50">
                <p>Convide seus amigos para se cadastrarem no jogo de diversas formas: através do nosso site Facebook / Instagram / TikTok / Telegram / WhatsApp / YouTube etc. Apresse-se e convide todos os membros que se cadastrarem através do seu link exclusivo se tornarão seus agentes diretos, mas observe que os novos membros que você convidar devem ser reais e válidos.</p>
                <p>1. Convide amigos com depósitos acumulados ≥ 30,00. O valor efetivo cumulativo da aposta é ≥300,00. O bônus deste evento só pode ser sacado após apostar o mesmo valor do bônus.</p>
                <p>2. Desenvolver amigos para abrir a caixa do tesouro. Ao completar as tarefas de diferentes números de pessoas, você pode obter a recompensa da caixa do tesouro correspondente, o valor mais alto de 300000, quanto maior o desenvolvimento de amigos, mais generosa será a recompensa; apostas subordinadas apenas em nossas apostas de plataforma de apostas são consideradas válidas.</p>
                <p>3.Esta atividade é limitada à operação manual normal do titular da conta. É estritamente proibido alugar, usar trapaças, robôs, usar contas diferentes para jogar, escovação mútua, arbitragem, interfaces, acordos, golpes, controle de grupo ou outros meios técnicos. Caso contrário, há o risco de cancelamento ou dedução de bônus, congelamento de bônus ou até mesmo inclusão na lista negra.</p>
                <p>4.Se seus convidados apostarem {{ currentUnit.value }}1 ou mais, você já pode desfrutar de alta comissão! Você pode ganhar até 5% de comissão vitalícia, é um convite para toda a vida! O sistema liquidará a comissão do dia anterior às 21h00 do dia seguinte.</p>
                <p>5.Por exemplo: Você tem 100 membros offline e o valor total real das apostas diárias é estimado em 1 milhão de reais. A comissão que você recebe naquele dia é: 1.000.000×2.5%=25.000 reais É simples assim ganhar 1 milhão de comissões todo mês.</p>
            </article> -->
            <div class="ctx-article p-mb text-sm " :class="currentTemplate.value =='template_one' ? 'text-rgbawhite50' : ' text-theme'" v-html="boxRuleRef" style="line-height: 1.5;">
            </div>
        </pu-card>

        <pu-card theme="3" class="py-10" v-else-if="currentTemplate.value =='template_three'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2" ></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
                    <span>{{  t('ActivityDescription')  }}</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
            </div>
            <div class="ctx-article p-mb text-sm text-themetext3" v-html="boxRuleRef" style="line-height: 1.5;">
            </div>
        </pu-card>


<Panddingbottom></Panddingbottom>
    </pu-page>
    <pu-page title="Baú do Tesouro" class="z-[999]" hideService  v-if="currentTemplate.value == 'template_four'">
        <!-- <img :src="boxBannerRef!=''? boxBannerRef : TreasureImg.img_treasure" class="w-full h-auto block"> -->

        <div class=" w-full h-auto mt-4 mb-4 m-auto">
            <img 
            v-if="boxBannerRef && boxBannerRef !== ''"
            :src="boxBannerRef" 
            class=" w-[21rem] m-auto "
            :class="{ 'opacity-0': !bannerLoaded }"
            />
            <img 
            v-else
            :src="TreasureImg.img_treasure" 
            class="w-[21rem] m-auto  "
            :class="{ 'opacity-0': !bannerLoaded || boxBannerRef !== ''}"
            />
            
          
        </div>

        <pu-card theme="0" class="mb-4 mx-4 bg-tablebg2  overflow-hidden">
            <invite-share-card></invite-share-card>
            <div class="px-3" v-if="phoneNumbers.length > 0">   
                <h3 class="pt-2 mb-1 text-sm ">
                    <span class="m4-text">Enviar convite para jogador aleatório ajudar</span>
                </h3>
                
                <div v-if="phoneNumbers.length" class="relative">
                    <div class="bg-rgbawhite10 rounded-lg p-2 relative">

                        <div class="pr-6">
                            <!-- 一级显示 -->
                            <div class="grid grid-cols-3 gap-2">
                                <div
                                v-for="(phone, index) in phoneNumbers.slice(0, 3)"
                                :key="index"
                                class="text-xs text-themewhite  rounded text-center truncate"
                                
                                >
                                {{ phone }}
                                </div>
                            </div>

                            <!-- 展开显示 -->
                            <transition name="fade">
                                <div
                                v-if="showMore && phoneNumbers.length > 3"
                                class="mt-2 border-white/10"
                                >
                                <div class="grid grid-cols-3 gap-2">
                                    <div
                                    v-for="(phone, index) in phoneNumbers.slice(3)"
                                    :key="'more-' + index"
                                    class="text-xs rounded text-center truncate text-themewhite"
                                    >
                                    {{ phone }}
                                    </div>
                                </div>
                                </div>
                            </transition>

                        </div>

                        <!-- 按钮：完全不参与对齐 -->
                        <button
                            v-if="phoneNumbers.length > 3"
                            @click="showMore = !showMore"
                            class="absolute top-0.5 right-1 w-7 h-7 flex items-center justify-center"
                        >
                        <img
                            :src=TreasureImg.icon_more
                            class="w-5 h-5 transition-transform duration-300"
                            :class="{ 'rotate-180': showMore }"
                        />
                        </button>

                    </div>
                </div>

                <dl class="mt-2 w-full pb-3 text-xs flex gap-2">
                    <dd class="flex-1">
                    <a @click="redirectToWhatsApp()" class="block min-h-11 px-3 py-2 bg-rgbawhite10 text-white flex items-center justify-between rounded-xl hover:bg-white/30">
                        <div class="text-[0.68rem]">
                        <span>Enviar Mensagem</span><br>
                        <b>WhatsAPP</b>
                        </div>
                        <img src="/imgs/lo_whatsapp.svg" class="w-8 h-8">
                    </a>
                    </dd>
                    <dd class="flex-1">
                    <a @click="redirectSms()" class="relative min-h-11 px-3 py-2 bg-rgbawhite10 text-white flex items-center justify-between rounded-xl hover:bg-white/30">
                        <div class="text-[0.68rem]">
                        <span>Enviar Mensagem</span><br>
                        <b>SMS</b>
                        <img
                            :src="CommonImg.gif_finger"
                            class="absolute left-[60%] top-10  w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            />
                        </div>
                        <img :src=PddImg.icon_sms class="w-9 h-8">
                    </a>
                    </dd>
                </dl>
            </div>
        </pu-card>
        <pu-card theme="3" class="mb-4">
            <dl @click="$router.push('/treasure/subordinate')" class="bg-tablebg w-full h-10 px-1 text-sm  rounded-full cursor-pointer flex items-center">
                <dt class="pl-2 flex-1 overflow-hidden m4-text">Meus subordinados diretos</dt>
                <dd class="px-1.5 shrink-0">
                    <span class="text-base text-themetext0">{{childNum}}</span>
                    <span class="text-xs">&nbsp;Pessoas</span>
                </dd>
                <img :src="TreasureImg.icon_right" class="h-5 mr-2">
            </dl>
        </pu-card>
        <pu-card theme="5">
            <ul v-for="item,index in configListRef" :key="index" :class="index%2?'flex-row-reverse':''" class=" flex">
                <template v-for="child,eq in item" :key="'child_'+eq">
                    <li class="w-1/4 p-2 relative">
                        
                        <!--旋转-->
                        <img :src="TreasureImg.box_item_bg" v-if="child.check_status == 0 " class="absolute inset-0 left-[0.88rem]  animate-spin w-[4rem] h-[4rem]" style="z-index: 0;">
                        <div v-if="child.check_status == 1" class="absolute w-[4.5rem] h-[5rem] inset-0 top-[0.5rem] rounded-xl left-[0.5rem] bg-black/40  z-[99] flex items-center justify-center">
                            <img :src="TRechargeImg.img_qiandao" class="w-5 h-5"/>
                        </div>
                        <div class="bg-gradient-to-b from-activitybox2 to-activitybox1 rounded-xl overflow-hidden w-[4.5rem] h-[5rem]">
                            <div class="px-1 py-2">
                                <div v-if="child.check_status != 0 && child.check_status != 1" class="absolute w-[4.5rem] h-[5rem] inset-0 top-[0.5rem] rounded-xl left-[0.5rem] bg-black/40  z-[99]"></div>
                            <div @click="boxTaskFunc(child, index, eq)" class="w-[3rem] max-w-fit h-[2rem] mx-auto relative cursor-pointer">
                                <img v-if="child.check_status == 0 " :src=TreasureImg.img_item2 class="w-full h-full">
                                <img v-else-if="child.check_status == 1" :src=TreasureImg.img_item3 class="w-full h-full">
                                <img v-else :src=TreasureImg.img_item2  class="w-full h-full">
                            </div>
                            <p class="w-full text-[0.58rem]  text-white text-center ">
                                    <span>{{ child.active_users }} Pessoas</span>
                                </p>

                            </div>
                          
                                <div class="w-full bg-black/20">
                                    <p class="text-[0.78rem]   m4-text text-center" style="font-weight: 600;">{{ child.bonus }}</p>
                                </div>
                        </div>
                        <!-- 奇数行(从右到左)的连接箭头 -->
                        <template v-if="index%2">
                            <!-- 左侧箭头(除了第一个元素) -->
                             
                            <em v-if="eq >= 0 && eq < 3 " class="w-2 h-[3.125rem] absolute -left-1 top-6 flex items-center">
                              <img :src="TreasureImg.icon_jiantou1" />
                            </em>
                            <!-- 第一个元素下方箭头 -->
                            <i v-if="eq == 3 && index < configListRef.length - 1" class="w-full h-2 absolute left-0 -bottom-1 flex justify-center">
                                <img :src="TreasureImg.icon_jiantou3" />
                            </i>
                        </template>
                        
                        <!-- 偶数行(从左到右)的连接箭头 -->
                        <template v-else>
                            <!-- 右侧箭头(除了最后一个元素) -->
                            <em v-if="eq < 3" class="w-2 h-[3.125rem] absolute -right-1 top-6 flex items-center">
                                <img :src="TreasureImg.icon_jiantou2" />
                            </em>
                            <!-- 最后一个元素下方箭头 -->
                            <i v-if="eq == 3 && index < configListRef.length - 1" class="w-full h-2  absolute left-0 -bottom-1 flex justify-center">
                                <img :src="TreasureImg.icon_jiantou3" />
                            </i>
                        </template>
                    </li>
                </template>
            </ul>
        </pu-card>
        <pu-card theme="3" class="py-10">
            <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                <span>Descrição da Atividade:</span>
            </h5>
            <!-- <article class="p-mb text-sm text-themefont">
                <p>Convide seus amigos para se cadastrarem no jogo de diversas formas: através do nosso site Facebook / Instagram / TikTok / Telegram / WhatsApp / YouTube etc. Apresse-se e convide todos os membros que se cadastrarem através do seu link exclusivo se tornarão seus agentes diretos, mas observe que os novos membros que você convidar devem ser reais e válidos.</p>
                <p>1. Convide amigos com depósitos acumulados ≥ 30,00. O valor efetivo cumulativo da aposta é ≥300,00. O bônus deste evento só pode ser sacado após apostar o mesmo valor do bônus.</p>
                <p>2. Desenvolver amigos para abrir a caixa do tesouro. Ao completar as tarefas de diferentes números de pessoas, você pode obter a recompensa da caixa do tesouro correspondente, o valor mais alto de 300000, quanto maior o desenvolvimento de amigos, mais generosa será a recompensa; apostas subordinadas apenas em nossas apostas de plataforma de apostas são consideradas válidas.</p>
                <p>3.Esta atividade é limitada à operação manual normal do titular da conta. É estritamente proibido alugar, usar trapaças, robôs, usar contas diferentes para jogar, escovação mútua, arbitragem, interfaces, acordos, golpes, controle de grupo ou outros meios técnicos. Caso contrário, há o risco de cancelamento ou dedução de bônus, congelamento de bônus ou até mesmo inclusão na lista negra.</p>
                <p>4.Se seus convidados apostarem {{ currentUnit.value }}1 ou mais, você já pode desfrutar de alta comissão! Você pode ganhar até 5% de comissão vitalícia, é um convite para toda a vida! O sistema liquidará a comissão do dia anterior às 21h00 do dia seguinte.</p>
                <p>5.Por exemplo: Você tem 100 membros offline e o valor total real das apostas diárias é estimado em 1 milhão de reais. A comissão que você recebe naquele dia é: 1.000.000×2.5%=25.000 reais É simples assim ganhar 1 milhão de comissões todo mês.</p>
            </article> -->
            <div class="p-mb text-sm text-themetext3" v-html="boxRuleRef" style="line-height: 1.5;">
            </div>
        </pu-card>
        <Panddingbottom></Panddingbottom>
    </pu-page>
    <pu-page title="Baú do Tesouro" class="z-[999]" hideService  v-if="currentTemplate.value == 'template_five'">
        <!-- <img :src="boxBannerRef!=''? boxBannerRef : TreasureImg.img_treasure" class="w-full h-auto block"> -->

        <div class=" w-full h-auto mt-4 mb-4 m-auto">
            <img 
            v-if="boxBannerRef && boxBannerRef !== ''"
            :src="boxBannerRef" 
            class=" w-[21rem] m-auto "
            :class="{ 'opacity-0': !bannerLoaded }"
            />
            <img 
            v-else
            :src="TreasureImg.img_treasure" 
            class="w-[21rem] m-auto  "
            :class="{ 'opacity-0': !bannerLoaded || boxBannerRef !== ''}"
            />
            
          
        </div>

        <pu-card theme="0" class="mb-4 mx-4  overflow-hidden">
            <div class="border border-inputborder rounded-2xl overflow-hidden">
            <invite-share-card></invite-share-card>
            <div class="px-3 bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 rounded-b-2xl" v-if="phoneNumbers.length > 0">   
                <h3 class="pt-2 mb-1 text-sm ">
                    <span class="text-themewhite">Enviar convite para jogador aleatório ajudar</span>
                </h3>
                
                <div v-if="phoneNumbers.length" class="relative">
                    <div class="bg-rgbablack50 rounded-lg p-2 relative">

                        <div class="pr-6">
                            <!-- 一级显示 -->
                            <div class="grid grid-cols-3 gap-2">
                                <div
                                v-for="(phone, index) in phoneNumbers.slice(0, 3)"
                                :key="index"
                                class="text-xs text-themewhite  rounded text-center truncate"
                                
                                >
                                {{ phone }}
                                </div>
                            </div>

                            <!-- 展开显示 -->
                            <transition name="fade">
                                <div
                                v-if="showMore && phoneNumbers.length > 3"
                                class="mt-2 border-white/10"
                                >
                                <div class="grid grid-cols-3 gap-2">
                                    <div
                                    v-for="(phone, index) in phoneNumbers.slice(3)"
                                    :key="'more-' + index"
                                    class="text-xs rounded text-center truncate text-themewhite"
                                    >
                                    {{ phone }}
                                    </div>
                                </div>
                                </div>
                            </transition>

                        </div>

                        <!-- 按钮：完全不参与对齐 -->
                        <button
                            v-if="phoneNumbers.length > 3"
                            @click="showMore = !showMore"
                            class="absolute top-0.5 right-1 w-7 h-7 flex items-center justify-center"
                        >
                        <img
                            :src=TreasureImg.icon_more
                            class="w-5 h-5 transition-transform duration-300"
                            :class="{ 'rotate-180': showMore }"
                        />
                        </button>

                    </div>
                </div>

                <dl class="mt-2 w-full pb-3 text-xs flex gap-2">
                    <dd class="flex-1">
                    <a @click="redirectToWhatsApp()" class="block min-h-11 px-3 py-2 bg-rgbablack50 text-white flex items-center justify-between rounded-xl hover:bg-white/30">
                        <div class="text-[0.68rem]">
                        <span>Enviar Mensagem</span><br>
                        <b>WhatsAPP</b>
                        </div>
                        <img src="/imgs/lo_whatsapp.svg" class="w-8 h-8">
                    </a>
                    </dd>
                    <dd class="flex-1">
                    <a @click="redirectSms()" class="relative min-h-11 px-3 py-2 bg-rgbablack50 text-white flex items-center justify-between rounded-xl hover:bg-white/30">
                        <div class="text-[0.68rem]">
                        <span>Enviar Mensagem</span><br>
                        <b>SMS</b>
                        <img
                            :src="CommonImg.gif_finger"
                            class="absolute left-[60%] top-10  w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            />
                        </div>
                        <img :src=PddImg.icon_sms class="w-9 h-8">
                    </a>
                    </dd>
                </dl>
            </div>
            </div>
        </pu-card>
        <pu-card theme="3" class="mb-4">
            <dl @click="$router.push('/treasure/subordinate')" class="bg-btn1_bg w-full h-10 px-1 text-sm  rounded-lg cursor-pointer flex items-center">
                <dt class="pl-2 flex-1 overflow-hidden text-themewhite">Meus subordinados diretos</dt>
                <dd class="px-1.5 shrink-0">
                    <span class="text-base text-themetext0">{{childNum}}</span>
                    <span class="text-xs">&nbsp;Pessoas</span>
                </dd>
                <img :src="TreasureImg.icon_right" class="h-5 mr-2">
            </dl>
        </pu-card>
        <pu-card theme="5">
            <ul v-for="item,index in configListRef" :key="index" :class="index%2?'flex-row-reverse':''" class=" flex">
                <template v-for="child,eq in item" :key="'child_'+eq">
                    <li class="w-1/4 p-2 relative">
                        
                        <!--旋转-->
                        <img :src="TreasureImg.box_item_bg" v-if="child.check_status == 0 " class="absolute inset-0 left-[0.88rem]  animate-spin w-[4rem] h-[4rem]" style="z-index: 0;">
                        <div v-if="child.check_status == 1" class="absolute w-[4.5rem] h-[5rem] inset-0 top-[0.5rem] rounded-xl left-[0.5rem] bg-black/40  z-[99] flex items-center justify-center">
                            <img :src="TreasureImg.icon_gou" class="w-4 h-4"/>
                        </div>
                        <div class="rounded-xl overflow-hidden w-[4.5rem] h-[5rem] "
                            :class="{ 
                                'bg-btn1_bg': child.check_status != 0 && child.check_status != 1 ,
                                'bg-black/40': child.check_status == 1,
                                'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2':child.check_status == 0
                            }"
                        >
                            <div class="px-1 py-2">
                                <div v-if="child.check_status != 0 && child.check_status != 1" class="absolute w-[4.5rem] h-[5rem] inset-0 top-[0.5rem] rounded-xl left-[0.5rem]"></div>
                                <div @click="boxTaskFunc(child, index, eq)" class="w-[3rem] max-w-fit h-[2rem] mx-auto ">
                                <img v-if="child.check_status == 0 " :src=TreasureImg.img_item2 class="w-full h-full relative cursor-pointer z-[99]">
                                <img v-else-if="child.check_status == 1" :src=TreasureImg.img_item3 class="w-full h-full relative cursor-pointer ">
                                <img v-else :src=TreasureImg.img_item2  class="w-full h-full relative cursor-pointer z-[99]">
                            </div>
                            <p class="w-full text-[0.58rem]  text-white text-center relative">
                                    <span>{{ child.active_users }} Pessoas</span>
                                </p>

                            </div>
                          
                                <div class="w-full bg-black/20 relative">
                                    <p class="text-[0.78rem]  text-themetext0 text-center" style="font-weight: 600;">{{ child.bonus }}</p>
                                </div>
                        </div>
                        <!-- 奇数行(从右到左)的连接箭头 -->
                        <template v-if="index%2">
                            <!-- 左侧箭头(除了第一个元素) -->
                             
                            <em v-if="eq >= 0 && eq < 3 " class="w-2 h-[3.125rem] absolute -left-1 top-6 flex items-center">
                              <img :src="TreasureImg.icon_jiantou1" />
                            </em>
                            <!-- 第一个元素下方箭头 -->
                            <i v-if="eq == 3 && index < configListRef.length - 1" class="w-full h-2 absolute left-0 -bottom-1 flex justify-center">
                                <img :src="TreasureImg.icon_jiantou3" />
                            </i>
                        </template>
                        
                        <!-- 偶数行(从左到右)的连接箭头 -->
                        <template v-else>
                            <!-- 右侧箭头(除了最后一个元素) -->
                            <em v-if="eq < 3" class="w-2 h-[3.125rem] absolute -right-1 top-6 flex items-center">
                                <img :src="TreasureImg.icon_jiantou2" />
                            </em>
                            <!-- 最后一个元素下方箭头 -->
                            <i v-if="eq == 3 && index < configListRef.length - 1" class="w-full h-2  absolute left-0 -bottom-1 flex justify-center">
                                <img :src="TreasureImg.icon_jiantou3" />
                            </i>
                        </template>
                    </li>
                </template>
            </ul>
        </pu-card>
        <pu-card theme="3" class="py-10">
            <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                <span>Descrição da Atividade:</span>
            </h5>
            <!-- <article class="p-mb text-sm text-themefont">
                <p>Convide seus amigos para se cadastrarem no jogo de diversas formas: através do nosso site Facebook / Instagram / TikTok / Telegram / WhatsApp / YouTube etc. Apresse-se e convide todos os membros que se cadastrarem através do seu link exclusivo se tornarão seus agentes diretos, mas observe que os novos membros que você convidar devem ser reais e válidos.</p>
                <p>1. Convide amigos com depósitos acumulados ≥ 30,00. O valor efetivo cumulativo da aposta é ≥300,00. O bônus deste evento só pode ser sacado após apostar o mesmo valor do bônus.</p>
                <p>2. Desenvolver amigos para abrir a caixa do tesouro. Ao completar as tarefas de diferentes números de pessoas, você pode obter a recompensa da caixa do tesouro correspondente, o valor mais alto de 300000, quanto maior o desenvolvimento de amigos, mais generosa será a recompensa; apostas subordinadas apenas em nossas apostas de plataforma de apostas são consideradas válidas.</p>
                <p>3.Esta atividade é limitada à operação manual normal do titular da conta. É estritamente proibido alugar, usar trapaças, robôs, usar contas diferentes para jogar, escovação mútua, arbitragem, interfaces, acordos, golpes, controle de grupo ou outros meios técnicos. Caso contrário, há o risco de cancelamento ou dedução de bônus, congelamento de bônus ou até mesmo inclusão na lista negra.</p>
                <p>4.Se seus convidados apostarem {{ currentUnit.value }}1 ou mais, você já pode desfrutar de alta comissão! Você pode ganhar até 5% de comissão vitalícia, é um convite para toda a vida! O sistema liquidará a comissão do dia anterior às 21h00 do dia seguinte.</p>
                <p>5.Por exemplo: Você tem 100 membros offline e o valor total real das apostas diárias é estimado em 1 milhão de reais. A comissão que você recebe naquele dia é: 1.000.000×2.5%=25.000 reais É simples assim ganhar 1 milhão de comissões todo mês.</p>
            </article> -->
            <div class="p-mb text-sm text-themetext4" v-html="boxRuleRef" style="line-height: 1.5;">
            </div>
        </pu-card>
        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
<style lang="css" scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 5s linear infinite;
}

.rotate-180 {
  transform: rotate(180deg);
}

</style>

