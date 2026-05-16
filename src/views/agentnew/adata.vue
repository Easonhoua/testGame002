<script setup>
import { ref,onMounted,computed} from 'vue'
import { userModel } from '@/model/user'
import { isIOS} from '@/utils/core'
import { agentV2Index,agentPhoneRef,agentShareRef, agentCanReceiveRef,agentReceivedRef,agentV2Receive,agentV2TotalData,agentSummaryRef,agentBonusInfoRef} from '@/model/agent'
import InviteShareCard from '@/components/pages/InviteShareCard.vue'
import { useThemeImages } from '@/utils/themeimg'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const AgentImg = useThemeImages().agent
const CommonImg = useThemeImages().common
const PddImg = useThemeImages().pdd
const { memberRef } = userModel()

const showMore = ref(false)
const emit = defineEmits(['change-tab'])

// 下拉选择
const open = ref(false)
const current = ref()
const options = [
  t('commCenter.Today'),
  t('commCenter.Yesterday'),
  t('commCenter.Thisweek'),
  t('commCenter.Lastweek'),
  t('commCenter.Thismonth'),
  t('commCenter.Lastmonth'),
]

onMounted(()=> {
    agentV2Index()
    //默认选中今天
    select(t('commCenter.Today'))
})

// 处理详情按钮点击事件
function goDatail() {
  emit('change-tab', 'kpi')
}

//领取按钮
function handleReceiveClick() {
    if(agentCanReceiveRef.value <= 0) {
        showToast({
            message: 'Sem comissão para receber',
            type: 'info',
        });
        return
    }
    agentV2Receive()
}

// 处理下拉选择
const select = (val) => {
    current.value = val
    open.value = false
    // 这里可以添加根据选择的时间范围更新数据的逻辑
    var startDate, endDate
    const today = new Date()
    switch (val) {
        case t('commCenter.Today'):
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        break
        case t('commCenter.Yesterday'):
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
        endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
        break
        case t('commCenter.Thisweek'):
        const firstDayOfWeek = today.getDate() - today.getDay()
        startDate = new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek)
        endDate = new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek + 6)
        break
        case t('commCenter.Lastweek'):
        const firstDayOfLastWeek = today.getDate() - today.getDay() - 7
        startDate = new Date(today.getFullYear(), today.getMonth(), firstDayOfLastWeek)
        endDate = new Date(today.getFullYear(), today.getMonth(), firstDayOfLastWeek + 6)
        break
        case t('commCenter.Thismonth'):
        startDate = new Date(today.getFullYear(), today.getMonth(), 1)
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        break
        case t('commCenter.Lastmonth'):
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        endDate = new Date(today.getFullYear(), today.getMonth(), 0)
        break
    }

    const startStr = formatDate(startDate)
    const endStr = formatDate(endDate)
    agentV2TotalData(startStr, endStr)
}

const formatDate = (date) => {
    if(!date){
        return;
    }
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const invite_link = computed(()=> {
    let code = memberRef.value&&memberRef.value.promoter_code
    let domain = window.location.protocol + '//' + window.location.host + '/#/'
    var query = {
        promoter: code
    }
    var queryString = new URLSearchParams(query).toString()
    return code ? domain+'?'+queryString : domain
})

// 检查设备并生成相应链接
const getSMSLink = () => {
    // pddSendSms()
    if (isIOS) {
        return `sms:/open?addresses=${agentPhoneRef.value.join(',')}&body=${agentShareRef.value} ${encodeURIComponent(invite_link.value)}`;
    } else {
        // Android - 用分号替换逗号
        const androidNumbers = agentPhoneRef.value.join(';');
        return `sms:${androidNumbers}?body=${agentShareRef.value} ${encodeURIComponent(invite_link.value)}`;
    }
};

let index = 0;
const getWhatsAppLink = () => {
  // 确保 phoneNumbers 有值
  if (!agentPhoneRef.value || agentPhoneRef.value.length === 0) {
    return `https://api.whatsapp.com/send?text=${agentShareRef.value} ${encodeURIComponent(invite_link.value)}&url=${encodeURIComponent(invite_link.value)}`;
  }

  // 获取当前电话号码
  const phone = agentPhoneRef.value[index];

  // 更新索引，确保循环到下一个号码
  index = (index + 1) % agentPhoneRef.value.length;

  // 返回生成的 WhatsApp 链接
  return `https://api.whatsapp.com/send?phone=${phone}&text=${agentShareRef.value} ${encodeURIComponent(invite_link.value)}&url=${encodeURIComponent(invite_link.value)}`;
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
    <div v-if="currentTemplate.value =='template_four'">
        <pu-card theme="0" class="mb-4 mx-4 bg-tablebg2 mt-5 overflow-hidden">
            <invite-share-card></invite-share-card>
            <div class="px-3 bg-tablebg2 -mt-2" v-if="agentPhoneRef.length > 0">   
                <h3 class="pt-2 mb-1 text-sm ">
                    <span class="m4-text">Enviar convite para jogador aleatório ajudar</span>
                </h3>
                
                <div v-if="agentPhoneRef.length" class="relative">
                    <div class="bg-rgbawhite10 rounded-lg p-2 relative">

                        <div class="pr-6">
                            <!-- 一级显示 -->
                            <div class="grid grid-cols-3 gap-2">
                                <div
                                v-for="(phone, index) in agentPhoneRef.slice(0, 3)"
                                :key="index"
                                class="text-xs text-themewhite  rounded text-center truncate"
                                
                                >
                                {{ phone }}
                                </div>
                            </div>

                            <!-- 展开显示 -->
                            <transition name="fade">
                                <div
                                v-if="showMore && agentPhoneRef.length > 3"
                                class="mt-2 border-white/10"
                                >
                                <div class="grid grid-cols-3 gap-2">
                                    <div
                                    v-for="(phone, index) in agentPhoneRef.slice(3)"
                                    :key="'more-' + index"
                                    class="text-xs rounded text-center truncate text-themewhite"
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
                            v-if="agentPhoneRef.length > 3"
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
                        <!-- <img :src="CommonImg.gif_finger" class="absolute left-[60%] top-10  w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"/> -->
                        </div>
                        <img :src=PddImg.icon_sms class="w-9 h-8">
                    </a>
                    </dd>
                </dl>
            </div>
        </pu-card>

        <!-- 分割线 -->
        <pu-card theme="3" class="mb-3">
            <img :src=CommonImg.icon_line alt="">
        </pu-card>

        <!-- 团队 -->
        <pu-card theme="3" class="mb-3 ">
            <div class="w-full py-4  text-themewhite rounded-xl bg-tablebg px-2" >
                <div class="px-1 flex justify-between items-center">
                    <h5 class="text-sm font-bold m4-text">Comissão</h5>
                    <button class="w-20 h-6 m4-ten-btn text-theme-text rounded-full flex items-center"
                        @click="goDatail"
                        >
                        <img :src="AgentImg.icon_ag04" alt="" class="h-4 ml-2 mr-1 ">
                        <span class="text-[0.8rem]">Detalhes</span>
                    </button>
                </div>

                <p class="px-1 text-[0.6rem] text-rgbawhite50">O tempo de resolução da comissão é de 4:00-8:00 todos os dias.</p>

                <div class="mt-3 px-8 w-full flex bg-tablebg2 justify-between items-center">
                    <div class=" flex flex-col items-center">
                        <h5 class="text-sm m4-text font-bold">Comissão Recebida</h5>
                        <span class="text-2xl text-themetext0 font-bold">{{ currentUnit.value }}{{ agentReceivedRef }}</span>
                    </div>
                    <img :src=AgentImg.img_agentwin class=" w-[7.5rem] h-auto">
                </div>

                <div class="mt-3 px-1 flex justify-between items-center">
                    <div class=" flex items-center">
                        <h5 class="text-[0.6rem] text-rgbawhite50">Comissão não recebida</h5>
                        <span class="text-base text-themetext0 font-bold">&nbsp;{{ currentUnit.value }}{{ agentCanReceiveRef }}</span>
                    </div>

                    <button class="w-24 h-8 rounded-full transition"
                        :class="agentCanReceiveRef <= 0
                            ? 'bg-gray-400 cursor-not-allowed opacity-60'
                            : 'm4-nine-btn'"
                        :disabled="agentCanReceiveRef <= 0"
                        @click="handleReceiveClick">
                        <span class="text-[0.9rem] align-middle">Receber</span>
                    </button>
                </div>

            </div>

        </pu-card>

        <pu-card theme="0" class="mb-4 bg-tablebg mt-5 overflow-hidden">
            <div class="px-3 flex h-12 bg-tablebg2 justify-between items-center">
                <h5 class="text-sm font-bold m4-text">Meus dados</h5>

                <div class="relative inline-block text-sm">
                    <!-- 触发按钮 -->
                    <div
                    class="flex items-center justify-between w-40 px-3 py-2 bg-theme rounded-lg text-white cursor-pointer"
                    @click="open = !open"
                    >
                    <span>{{ current }}</span>
                    <svg
                        class="w-4 h-4 transition-transform"
                        :class="{ 'rotate-180': open }"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    </div>

                    <!-- 下拉内容 -->
                    <div v-if="open" class="absolute right-0 mt-2 w-40 bg-theme rounded-lg shadow-lg overflow-hidden z-50">
                        <div
                            v-for="item in options"
                            :key="item"
                            class="px-3 py-2 text-white hover:bg-[#44309a] cursor-pointer"
                            @click="select(item)"
                        >
                            {{ item }}
                        </div>
                    </div>
                </div>

            </div>

            <!-- 表格容器 -->
            <div class=" text-white overflow-hidden">
                
                <!-- 我的数据 -->
                <div class="mt-3 px-3 flex items-center text-themewhite">
                    <h5 class="text-xs m4-text font-bold">Novos subordinados</h5>
                    <span class="text-xs text-themetext0 font-bold">&nbsp; {{agentSummaryRef.total_reg_num ?? 0}}</span>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Novos subordinados diretos</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.reg_num ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Outros subordinados novos</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_reg_num ?? 0}}</div>
                    </div>
                </div>
                
                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Valor de depósito</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Número de depósitos</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_recharge_num ?? 0}}</div>
                    </div>
                </div>
                
                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Valor do primeiro depósito</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_first_recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Usuários 1º depósito</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_first_recharge_user_num ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Valor novo + 1º depósito</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_new_user_first_recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Usuários novo + 1º depósito</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_new_user_first_recharge_user_num ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Valor de saque</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_withdraw_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Número de saques</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_withdraw_num ?? 0}}</div>
                    </div>
                </div>

                <!-- 总业绩 -->
                <div class="mt-3 px-3 flex items-center text-themewhite">
                    <h5 class="text-xs m4-text font-bold">Desempenho total</h5>
                    <span class="text-xs text-themetext0 font-bold">&nbsp;&nbsp;{{ currentUnit.value }}{{agentSummaryRef.total_bet_amount ?? 0}}</span>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Desemprenhe direto</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.direct_bet_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Outros desemprenhos</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_bet_amount ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Apostas válidas diretas</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.direct_bet_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Ganhos/perdas diretos</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.real_win_amount ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Depósito direto</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Saque direto</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.withdraw_amount ?? 0}}</div>
                    </div>
                </div>

                <!-- 总佣金 -->
                <div class="mt-3 px-3 flex items-center text-themewhite">
                    <h5 class="text-xs m4-text font-bold">Comissão total</h5>
                    <span class="text-xs text-themetext0 font-bold">&nbsp;&nbsp;{{ currentUnit.value }}{{agentBonusInfoRef.total_bonus ?? 0}}</span>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Comissão recebida</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.is_received ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Comissão não recebida</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.can_receive ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Comissão direta</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.direct_bonus ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">Outras comissões</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.indirect_bonus ?? 0}}</div>
                    </div>
                </div>

            </div>

        </pu-card>

        <em class="w-full h-[4.25rem] block"></em>
    </div>
    <div v-else-if="currentTemplate.value =='template_five'">
        <pu-card theme="0" class="mb-4 mx-4 bg-tablebg2 mt-5 overflow-hidden">
            <invite-share-card></invite-share-card>
            <div class="px-3 bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 -mt-2  rounded-b-lg" v-if="agentPhoneRef.length > 0">   
                <h3 class="pt-2 mb-1 text-sm ">
                    <span class="text-themewhite">Enviar convite para jogador aleatório ajudar</span>
                </h3>
                
                <div v-if="agentPhoneRef.length" class="relative">
                    <div class="bg-rgbablack30 rounded-lg p-2 relative">

                        <div class="pr-6">
                            <!-- 一级显示 -->
                            <div class="grid grid-cols-3 gap-2">
                                <div
                                v-for="(phone, index) in agentPhoneRef.slice(0, 3)"
                                :key="index"
                                class="text-xs text-themetext3 rounded text-center truncate"
                                
                                >
                                {{ phone }}
                                </div>
                            </div>

                            <!-- 展开显示 -->
                            <transition name="fade">
                                <div
                                v-if="showMore && agentPhoneRef.length > 3"
                                class="mt-2 border-white/10"
                                >
                                <div class="grid grid-cols-3 gap-2">
                                    <div
                                    v-for="(phone, index) in agentPhoneRef.slice(3)"
                                    :key="'more-' + index"
                                    class="text-xs rounded text-center truncate text-themetext3"
                                    >
                                    {{ phone }}
                                    </div>
                                </div>
                                </div>
                            </transition>

                        </div>

                        <!-- 按钮：完全不参与对齐 -->
                        <button
                            v-if="agentPhoneRef.length > 3"
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
                    <a @click="redirectToWhatsApp()" class="block min-h-11 px-3 py-2 bg-rgbablack30 text-white flex items-center justify-between rounded-xl hover:bg-white/30">
                        <div class="text-[0.68rem]">
                        <span>Enviar Mensagem</span><br>
                        <b>WhatsAPP</b>
                        </div>
                        <img src="/imgs/lo_whatsapp.svg" class="w-8 h-8">
                    </a>
                    </dd>
                    <dd class="flex-1">
                    <a @click="redirectSms()" class="relative min-h-11 px-3 py-2 bg-rgbablack30 text-white flex items-center justify-between rounded-xl hover:bg-white/30">
                        <div class="text-[0.68rem]">
                        <span>Enviar Mensagem</span><br>
                        <b>SMS</b>
                        <!-- <img :src="CommonImg.gif_finger" class="absolute left-[60%] top-10  w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"/> -->
                        </div>
                        <img :src=PddImg.icon_sms class="w-9 h-8">
                    </a>
                    </dd>
                </dl>
            </div>
        </pu-card>

        <!-- 分割线 -->
        <pu-card theme="3" class="mb-3">
            <img :src=CommonImg.icon_line class="w-full" alt="">
        </pu-card>

        <!-- 团队 -->
        <pu-card theme="3" class="mb-3 ">
            <div class="w-full py-4  text-themewhite rounded-xl bg-tablebg1 px-2 mb-4" >
                <div class="px-1 flex justify-between items-center">
                    <h5 class="text-sm font-bold text-themewhite">Comissão</h5>
                    <button class="w-20 h-6 bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 text-theme-text rounded-full flex items-center"
                        @click="goDatail"
                        >
                        <img :src="AgentImg.img_m5dash" alt="" class="h-4 ml-2 mr-1 ">
                        <span class="text-[0.8rem]">Detalhes</span>
                    </button>
                </div>

                <p class="px-1 text-[0.6rem] text-themetext3">O tempo de resolução da comissão é de 4:00-8:00 todos os dias.</p>

                <div class="mt-3 px-8 w-full flex bg-tablebg2 justify-between items-center">
                    <div class=" flex flex-col items-center">
                        <h5 class="text-sm text-themewhite font-bold">Comissão Recebida</h5>
                        <span class="text-2xl text-themetext0 font-bold">{{ currentUnit.value }}{{ agentReceivedRef }}</span>
                    </div>
                    <img :src=AgentImg.img_agentwin class=" w-[7.5rem] h-auto">
                </div>

                <div class="mt-3 px-1 flex justify-between items-center">
                    <div class=" flex items-center">
                        <h5 class="text-[0.6rem] text-themetext3">Comissão não recebida</h5>
                        <span class="text-base text-themetext0 font-bold">&nbsp;{{ currentUnit.value }}{{ agentCanReceiveRef }}</span>
                    </div>

                    <button class="w-24 h-8 rounded-full transition"
                        :class="agentCanReceiveRef <= 0
                            ? 'bg-gray-400 cursor-not-allowed opacity-60'
                            : 'bg-gradient-to-r from-gold-100 to-gold-500'"
                        :disabled="agentCanReceiveRef <= 0"
                        @click="handleReceiveClick">
                        <span class="text-[0.9rem] align-middle">Receber</span>
                    </button>
                </div>
            </div>
        </pu-card>

        <pu-card theme="0" class="mb-4 bg-tablebg1 mt-5 overflow-hidden">
            <div class="px-3 flex h-12 bg-tablebg1 justify-between items-center rounded-t-xl" >
                <h5 class="text-sm font-bold text-themewhite">Meus dados</h5>
                <div class="relative inline-block text-sm">
                    <!-- 触发按钮 -->
                    <div
                    class="flex items-center justify-between w-32 px-2 py-1 m5-theme-input rounded-lg text-white cursor-pointer"
                    @click="open = !open"
                    >
                    <span>{{ current }}</span>
                    <svg
                        class="w-4 h-4 transition-transform"
                        :class="{ 'rotate-180': open }"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2"/>
                    </svg>

                    </div>

                    <!-- 下拉内容 -->
                    <div v-if="open" class="absolute right-0 mt-2 w-40 bg-body-bg rounded-lg shadow-lg overflow-hidden z-50">
                        <div
                            v-for="item in options"
                            :key="item"
                            class="px-3 py-2 text-white hover:bg-[#258cff] cursor-pointer"
                            @click="select(item)"
                        >
                            {{ item }}
                        </div>
                    </div>
                </div>

            </div>

            <!-- 表格容器 -->
            <div class=" text-white overflow-hidden bg-tablebg1 pb-6 rounded-b-xl">
                
                <!-- 我的数据 -->
                <div class="mt-3 px-3 flex items-center text-themewhite">
                    <h5 class="text-xs text-themewhite font-bold">Novos subordinados</h5>
                    <span class="text-xs text-themetext0 font-bold">&nbsp; {{agentSummaryRef.total_reg_num ?? 0}}</span>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Novos subordinados diretos</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.reg_num ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Outros subordinados novos</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_reg_num ?? 0}}</div>
                    </div>
                </div>
                
                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Valor de depósito</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Número de depósitos</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_recharge_num ?? 0}}</div>
                    </div>
                </div>
                
                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Valor do primeiro depósito</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_first_recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Usuários 1º depósito</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_first_recharge_user_num ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Valor novo + 1º depósito</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_new_user_first_recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Usuários novo + 1º depósito</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_new_user_first_recharge_user_num ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Valor de saque</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_withdraw_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Número de saques</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_withdraw_num ?? 0}}</div>
                    </div>
                </div>

                <!-- 总业绩 -->
                <div class="mt-3 px-3 flex items-center text-themewhite">
                    <h5 class="text-xs text-themewhite font-bold">Desempenho total</h5>
                    <span class="text-xs text-themetext0 font-bold">&nbsp;&nbsp;{{ currentUnit.value }}{{agentSummaryRef.total_bet_amount ?? 0}}</span>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Desemprenhe direto</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.direct_bet_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Outros desemprenhos</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_bet_amount ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Apostas válidas diretas</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.direct_bet_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Ganhos/perdas diretos</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.real_win_amount ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Depósito direto</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Saque direto</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.withdraw_amount ?? 0}}</div>
                    </div>
                </div>

                <!-- 总佣金 -->
                <div class="mt-3 px-3 flex items-center text-themewhite">
                    <h5 class="text-xs text-themewhite font-bold">Comissão total</h5>
                    <span class="text-xs text-themetext0 font-bold">&nbsp;&nbsp;{{ currentUnit.value }}{{agentBonusInfoRef.total_bonus ?? 0}}</span>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Comissão recebida</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.is_received ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Comissão não recebida</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.can_receive ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Comissão direta</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.direct_bonus ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablebg2 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1 text-themetext3">Outras comissões</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.indirect_bonus ?? 0}}</div>
                    </div>
                </div>

            </div>

        </pu-card>

        <em class="w-full h-[4.25rem] block"></em>
    </div>
    <div v-else-if="currentTemplate.value =='template_three'">
        <pu-card theme="0" class="mb-4 mx-4 bg-tablergba40 text-white mt-5 overflow-hidden">
            <invite-share-card></invite-share-card>
            <div class="px-3 -mt-2" v-if="agentPhoneRef.length > 0">   
                <h3 class="pt-2 mb-1 text-sm ">
                    <span class="m4-text">{{  t('commCenter.details1')  }}</span>
                </h3>
                
                <div v-if="agentPhoneRef.length" class="relative">
                    <div class="bg-rgbawhite10 rounded-lg p-2 relative">

                        <div class="pr-6">
                            <div class="grid grid-cols-3 gap-2">
                                <div
                                v-for="(phone, index) in agentPhoneRef.slice(0, 3)"
                                :key="index"
                                class="text-xs text-themewhite  rounded text-center truncate"
                                
                                >
                                {{ phone }}
                                </div>
                            </div>

                            <transition name="fade">
                                <div
                                v-if="showMore && agentPhoneRef.length > 3"
                                class="mt-2 border-white/10"
                                >
                                <div class="grid grid-cols-3 gap-2">
                                    <div
                                    v-for="(phone, index) in agentPhoneRef.slice(3)"
                                    :key="'more-' + index"
                                    class="text-xs rounded text-center truncate text-themewhite"
                                    :class="currentTemplate.value =='template_three' ? ' text-themetext1' : 'text-white'"
                                    >
                                    {{ phone }}
                                    </div>
                                </div>
                                </div>
                            </transition>

                        </div>
                        <button
                            v-if="agentPhoneRef.length > 3"
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
                    <a @click="redirectToWhatsApp()" class="block min-h-11 px-3 py-2 bg-rgbawhite10 text-white flex items-center justify-between rounded-xl hover:bg-white/30">
                        <div class="text-[0.68rem]">
                        <span>{{ t('commCenter.SendMessage') }}</span><br>
                        <b>WhatsAPP</b>
                        </div>
                        <img src="/imgs/lo_whatsapp.svg" class="w-8 h-8">
                    </a>
                    </dd>
                    <dd class="flex-1">
                    <a @click="redirectSms()" class="relative min-h-11 px-3 py-2 bg-rgbawhite10 text-white flex items-center justify-between rounded-xl hover:bg-white/30">
                        <div class="text-[0.68rem]">
                        <span>{{ t('commCenter.SendMessage') }}</span><br>
                        <b>SMS</b>
                        <!-- <img :src="CommonImg.gif_finger" class="absolute left-[60%] top-10  w-[6rem] h-[6rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"/> -->
                        </div>
                        <img :src=PddImg.icon_sms class="w-9 h-8">
                    </a>
                    </dd>
                </dl>
            </div>
        </pu-card>

        <pu-card theme="3" class="mb-3">
            <img :src=CommonImg.icon_line alt="">
        </pu-card>

        <pu-card theme="3" class="mb-3 ">
            <div class="w-full py-4  text-themewhite rounded-xl bg-tablergba20 px-2" >
                <div class="px-1 flex justify-between items-center">
                    <h5 class="text-sm font-bold m4-text">{{ t('commission') }}</h5>
                    <button class="w-20 h-6 m3-theme-btn1 text-theme-text rounded-full flex items-center"
                        @click="goDatail"
                        >
                        <img :src="AgentImg.icon_ag04" alt="" class="h-4 ml-2 mr-1 ">
                        <span class="text-[0.8rem]">{{ t('commCenter.Details') }}</span>
                    </button>
                </div>

                <p class="px-1 text-[0.6rem] text-rgbawhite50">{{ t('commCenter.details2') }}</p>

                <div class="mt-3 px-6 w-full flex bg-tablergba40 justify-between items-center">
                    <div class=" flex flex-col items-center">
                        <h5 class="text-sm m4-text font-bold">{{ t('commCenter.CommissionReceived') }}</h5>
                        <span class="text-2xl text-themetext0 font-bold">{{ currentUnit.value  }} &nbsp;{{ agentReceivedRef }}</span>
                    </div>
                    <img :src=AgentImg.img_agentwin class=" w-[7.5rem] h-auto">
                </div>

                <div class="mt-3 px-1 flex justify-between items-center">
                    <div class=" flex items-center">
                        <h5 class="text-[0.6rem] text-rgbawhite50">{{ t('commCenter.Commissionnotreceived') }}</h5>
                        <span class="text-base text-themetext0 font-bold">{{ currentUnit.value  }} &nbsp;{{ agentCanReceiveRef }}</span>
                    </div>

                    <button class="w-24 h-8 rounded-full transition"
                        :class="agentCanReceiveRef <= 0
                            ? 'bg-gray-400 cursor-not-allowed opacity-60'
                            : 'm4-nine-btn'"
                        :disabled="agentCanReceiveRef <= 0"
                        @click="handleReceiveClick">
                        <span class="text-[0.9rem] align-middle">{{ t('Receive') }}</span>
                    </button>
                </div>

            </div>

        </pu-card>

        <pu-card theme="0" class="mb-4 bg-tablergba20 mt-5 overflow-hidden">
            <div class="px-3 flex h-12 bg-tablergba40 justify-between items-center">
                <h5 class="text-sm font-bold m4-text">{{ t('commCenter.Mydata') }}</h5>

                <div class="relative inline-block text-sm">
                    <!-- 触发按钮 -->
                    <div
                    class="flex items-center justify-between w-40 px-3 py-2 bg-theme rounded-lg text-white cursor-pointer"
                    @click="open = !open"
                    >
                    <span>{{ current }}</span>
                    <svg
                        class="w-4 h-4 transition-transform"
                        :class="{ 'rotate-180': open }"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    </div>

                    <!-- 下拉内容 -->
                    <div v-if="open" class="absolute right-0 mt-2 w-40 bg-theme rounded-lg shadow-lg overflow-hidden z-50">
                        <div
                            v-for="item in options"
                            :key="item"
                            class="px-3 py-2 text-white hover:bg-[#44309a] cursor-pointer"
                            @click="select(item)"
                        >
                            {{ item }}
                        </div>
                    </div>
                </div>

            </div>

            <!-- 表格容器 -->
            <div class=" text-white overflow-hidden">
                
                <!-- 我的数据 -->
                <div class="mt-3 px-3 flex items-center text-themewhite">
                    <h5 class="text-xs m4-text font-bold">{{ t('commCenter.Newsubordinates') }}</h5>
                    <span class="text-xs text-themetext0 font-bold">&nbsp; {{agentSummaryRef.total_reg_num ?? 0}}</span>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Newdirectsubordinates') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.reg_num ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Othernewsubordinates') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_reg_num ?? 0}}</div>
                    </div>
                </div>
                
                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Depositvalue') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Numberofdeposits') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_recharge_num ?? 0}}</div>
                    </div>
                </div>
                
                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Valuefirstdeposit') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_first_recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Users1stdeposit') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_first_recharge_user_num ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Newvalue1stdeposit') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_new_user_first_recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Newusers1stdeposit') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_new_user_first_recharge_user_num ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Withdrawalvalue') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_withdraw_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Numberofdraws') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_withdraw_num ?? 0}}</div>
                    </div>
                </div>

                <!-- 总业绩 -->
                <div class="mt-3 px-3 flex items-center text-themewhite">
                    <h5 class="text-xs m4-text font-bold">{{ t('commCenter.Totalperformance') }}</h5>
                    <span class="text-xs text-themetext0 font-bold">&nbsp;&nbsp;{{ currentUnit.value }} &nbsp;{{agentSummaryRef.total_bet_amount ?? 0}}</span>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Directunloading') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.direct_bet_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Otherunemployment') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.team_bet_amount ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.DirectValidBets') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.direct_bet_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Directgains/losses') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.real_win_amount ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Directdeposit') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.recharge_amount ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Directwithdrawal') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentSummaryRef.withdraw_amount ?? 0}}</div>
                    </div>
                </div>

                <!-- 总佣金 -->
                <div class="mt-3 px-3 flex items-center text-themewhite">
                    <h5 class="text-xs m4-text font-bold">{{  t('commCenter.TotalCommission')  }}</h5>
                    <span class="text-xs text-themetext0 font-bold">&nbsp;&nbsp;{{ currentUnit.value }} &nbsp;{{agentBonusInfoRef.total_bonus ?? 0}}</span>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Commissionreceived') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.is_received ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Commissionnotreceived') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.can_receive ?? 0}}</div>
                    </div>
                </div>

                <div class="flex px-2 py-1 gap-3">
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{  t('commCenter.DirectCommission')  }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.direct_bonus ?? 0}}</div>
                    </div>
                    <div class="w-1/2 p-2 bg-tablergba40 text-center rounded-lg">
                        <div class="text-[0.6rem] mb-1">{{ t('commCenter.Othercommissions') }}</div>
                        <div class="text-[1.2rem] font-bold">{{agentBonusInfoRef.indirect_bonus ?? 0}}</div>
                    </div>
                </div>

            </div>

        </pu-card>

        <em class="w-full h-[4.25rem] block"></em>
    </div>
</template>
<style scoped>
table tr td{
    padding: 0.625rem 0.25rem;
}
</style>