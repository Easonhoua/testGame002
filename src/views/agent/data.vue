<script setup>
import { computed, onMounted, ref } from 'vue'
import { t, fn } from '@/i18n'
import { useDateFormat } from '@vueuse/core'
import { calendarFormatterFunc } from '@/utils/core'
import { bodyWidthRef } from '@/utils/config'
import { agentMyDataModel } from '@/model/agent'
import { useThemeImages } from '@/utils/themeimg'
const AgentImg = useThemeImages().agent
const { dateRef, myDataRef, myDataFunc } = agentMyDataModel()

let calendar_show = ref(false)

// 今天的时间
const today = computed(()=> {
    var day = new Date();
    day.setTime(day.getTime());
    return day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
})

onMounted(()=> {
    myDataFunc()
})

function onConfirm(value) {
    calendar_show.value = false;
    dateRef.value.s_date = useDateFormat(value, 'YYYY-MM-DD')
    myDataFunc()
}
</script>

<template>
    <div>
        <pu-card theme="3" class="mb-3 mt-3" v-if="currentTemplate.value=='template_one'||currentTemplate.value == 'template_five'">
            <div @click="calendar_show=true" class="w-full h-12 text-sm  rounded-xl flex items-center bg-gradient-to-r from-transparent to-rgbawhite30" >
                <svg class="w-6 h-6 mr-3 text-rgbawhite50 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 13V15H6V13H8ZM13 13V15H11V13H13ZM18 13V15H16V13H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
                </svg>
                <div class="flex-1 overflow-hidden">
                    <span>{{ dateRef.s_date||today }} 00:00 - {{ dateRef.s_date||today }} 23:59</span>
                </div>
            </div>
        </pu-card>
        <pu-card theme="3" class="mb-3 mt-3" v-if="currentTemplate.value=='template_two'">
            <div @click="calendar_show=true" class="w-full h-10 text-sm bg-tablergba40 px-3 rounded-xl flex items-center">

                <img :src="AgentImg.icon_date" class="w-4 h-4 mr-3 text-body-text/65 shrink-0">
                <div class="flex-1 overflow-hidden ml-2 text-three">
                    <span>{{ dateRef.s_date||today }} 00:00 - {{ dateRef.s_date||today }} 23:59</span>
                </div>
            </div>
        </pu-card>
        <pu-card theme="3" class="mb-3 mt-3" v-if="currentTemplate.value=='template_three'">
            <div @click="calendar_show=true" class="w-full h-10 text-sm bg-tablergba40 px-3 rounded-xl flex items-center">
                <img :src="AgentImg.icon_date" class="w-4 h-4 mr-3 text-body-text/65 shrink-0">
                <div class="flex-1 overflow-hidden ml-2 text-themetext1">
                    <span>{{ dateRef.s_date||today }} 00:00 - {{ dateRef.s_date||today }} 23:59</span>
                </div>
            </div>
        </pu-card>
        <pu-card theme="3" class="mb-3" v-if="currentTemplate.value=='template_four'">
            <div @click="calendar_show=true" class="w-full h-10 text-sm bg-tablebg px-3 rounded-xl flex items-center">
                <img :src="AgentImg.icon_date" class="w-4 h-4 mr-3  shrink-0">
                <span class="m4-text">Date</span>
                <div class="flex-1 overflow-hidden ml-2 text-themetext3">
                    <span>{{ dateRef.s_date||today }} 00:00 - {{ dateRef.s_date||today }} 23:59</span>
                </div>
            </div>
        </pu-card>

        <pu-card theme="3" class="mb-3" v-if="currentTemplate.value=='template_one'||currentTemplate.value == 'template_five'">
            <section class="w-full p-px text-sm relative">
                <em class="w-full h-full ctx-theme__linear rounded-xl opacity-40 absolute left-0 top-0 block"></em>
                <div class="w-full bg-body-bg text-themewhite rounded-xl overflow-hidden relative">
                    <ul>
                        <li class="h-[3.125rem] px-4 flex items-center justify-between">
                            <h5 class="text-rgbawhite50">
                                <span>Registro direto</span>
                            </h5>
                            <p>
                                <b class="text-base">{{ myDataRef.reg_num }}</b>
                                <span class="text-xs text-rgbawhite50">&nbsp;Pessoas</span>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4 border-t border-rgbawhite10 flex items-center justify-between">
                            <h5 class="text-rgbawhite50">
                                <span>Registro da equipe</span>
                            </h5>
                            <p>
                                <b class="text-base">{{ myDataRef.team_reg_num }}</b>
                                <span class="text-xs text-rgbawhite50">&nbsp;Pessoas</span>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4 border-t border-rgbawhite10 flex items-center justify-between">
                            <h5 class="font-bold">
                                <span>Total das comissões</span>
                            </h5>
                            <p>
                                <span class="text-xs text-rgbawhite50">{{ currentUnit.value }}&nbsp;</span>
                                <b class="text-base">{{ fn(myDataRef.bonus) }}</b>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4 border-t border-rgbawhite10 flex items-center justify-between">
                            <h5 class="font-bold">
                                <span>Total de apostas</span>
                            </h5>
                            <p>
                                <span class="text-xs text-rgbawhite50">{{ currentUnit.value }}&nbsp;</span>
                                <b class="text-base">{{ fn(myDataRef.team_bet_amount) }}</b>
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </pu-card>
        <pu-card theme="3" class="mb-3" v-if="currentTemplate.value=='template_two'">
            <section class="w-full p-px text-sm relative ">
                <div class="w-full  bg-tablergba40 rounded-xl overflow-hidden relative">
                    <ul>
                        <li class="h-[3.125rem] px-4 flex items-center justify-between">
                            <h5 class="text-three">
                                <span>Registro direto</span>
                            </h5>
                            <p>
                                <b class="text-base">{{ myDataRef.reg_num }}</b>
                                <span class="text-xs text-three">&nbsp;Pessoas</span>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4 flex items-center justify-between">
                            <h5 class="text-three">
                                <span>Registro da equipe</span>
                            </h5>
                            <p>
                                <b class="text-base">{{ myDataRef.team_reg_num }}</b>
                                <span class="text-xs text-three">&nbsp;Pessoas</span>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4  flex items-center justify-between">
                            <h5 class="font-bold">
                                <span>Total das comissões</span>
                            </h5>
                            <p>
                                <span class="text-xs text-three">{{ currentUnit.value }}&nbsp;</span>
                                <b class="text-base text-four">{{ fn(myDataRef.bonus) }}</b>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4 flex items-center justify-between">
                            <h5 class="font-bold">
                                <span>Total de apostas</span>
                            </h5>
                            <p>
                                <span class="text-xs text-three">{{ currentUnit.value }}&nbsp;</span>
                                <b class="text-base text-four">{{ fn(myDataRef.team_bet_amount) }}</b>
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </pu-card>
        <pu-card theme="3" class="mb-3" v-if="currentTemplate.value=='template_three'">
            <section class="w-full p-px text-sm relative ">
                <div class="w-full bg-tablergba40 rounded-xl overflow-hidden relative">
                    <ul>
                        <li class="h-[3.125rem] px-4 flex items-center justify-between">
                            <h5 class="text-themetext1">
                                <span>Registro direto</span>
                            </h5>
                            <p>
                                <b class="text-base">{{ myDataRef.reg_num }}</b>
                                <span class="text-xs text-themetext1">&nbsp;Pessoas</span>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4 flex items-center justify-between">
                            <h5 class="text-themetext1">
                                <span>Registro da equipe</span>
                            </h5>
                            <p>
                                <b class="text-base">{{ myDataRef.team_reg_num }}</b>
                                <span class="text-xs text-themetext1">&nbsp;Pessoas</span>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4  flex items-center justify-between">
                            <h5 class="font-bold">
                                <span>Total das comissões</span>
                            </h5>
                            <p>
                                <span class="text-xs text-themetext1">{{ currentUnit.value }}&nbsp;</span>
                                <b class="text-base">{{ fn(myDataRef.bonus) }}</b>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4 flex items-center justify-between">
                            <h5 class="font-bold">
                                <span>Total de apostas</span>
                            </h5>
                            <p>
                                <span class="text-xs text-themetext1">{{ currentUnit.value }}&nbsp;</span>
                                <b class="text-base">{{ fn(myDataRef.team_bet_amount) }}</b>
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </pu-card>
        <pu-card theme="3" class="mb-3" v-if="currentTemplate.value=='template_four'">
            <section class="w-full p-px text-sm relative">
                <div class="w-full  bg-tablebg rounded-xl overflow-hidden relative">
                    <ul>
                        <li class="h-[3.125rem] px-4 flex items-center justify-center">
                            <h5 class="m4-text min-w-[8rem]">
                                <span>Registro direto:</span>
                            </h5>
                            <p>
                                <b class="text-white">{{ myDataRef.reg_num }}</b>
                                <span class="text-xs text-white/20">&nbsp;Pessoas</span>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4 flex items-center justify-center bg-tablebg2">
                            <h5 class="m4-text  min-w-[8rem]">
                                <span>Registro da equipe:</span>
                            </h5>
                            <p>
                                <b class="text-white">{{ myDataRef.team_reg_num }}</b>
                                <span class="text-xs text-white/20">&nbsp;Pessoas</span>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4  flex items-center justify-center">
                            <h5 class="m4-text font-bold  min-w-[8rem]">
                                <span>Total das comissões:</span>
                            </h5>
                            <p>
                                <span class="text-xs text-themetext0">{{ currentUnit.value }}&nbsp;</span>
                                <b class="text-themetext0">{{ fn(myDataRef.bonus) }}</b>
                            </p>
                        </li>
                        <li class="h-[3.125rem] px-4 flex items-center justify-center bg-tablebg2">
                            <h5 class="m4-text font-bold  min-w-[8rem]">
                                <span>Total de apostas:</span>
                            </h5>
                            <p>
                                <span class="text-xs text-themetext0">{{ currentUnit.value }}&nbsp;</span>
                                <b class="text-themetext0">{{ fn(myDataRef.team_bet_amount) }}</b>
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </pu-card>
        <van-calendar 
            v-model:show="calendar_show" 
            @confirm="onConfirm" 
            :min-date="new Date(2023, 0, 1)" 
            :formatter="calendarFormatterFunc" 
            :confirm-text="t('确认')" 
            :show-mark="false" 
            teleport="body"
            :safe-area-inset-bottom="true"
            :style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-'+(bodyWidthRef/2)+'px' }"
            :overlay-style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-'+(bodyWidthRef/2)+'px' }"
        />
    </div>
</template>