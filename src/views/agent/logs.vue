<script setup>
import { computed, onMounted, ref } from 'vue'
import { t, fn } from '@/i18n'
import { useDateFormat } from '@vueuse/core'
import { calendarFormatterFunc } from '@/utils/core'
import { bodyWidthRef } from '@/utils/config'
import { agentLogsModel } from '@/model/agent'
import { useThemeImages } from '@/utils/themeimg'
const AgentImg = useThemeImages().agent

const { dateRef, logsDataRef, logsDataFunc } = agentLogsModel()

let calendar_show = ref(false)

// 今天的时间
const today = computed(() => {
    var day = new Date();
    day.setTime(day.getTime());
    return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
})

onMounted(() => {
    logsDataFunc()
})

function onConfirm(value) {
    calendar_show.value = false;
    dateRef.value.s_date = useDateFormat(value, 'YYYY-MM-DD')
    logsDataFunc()
}
</script>

<template>
    <div>
        <div v-if="currentTemplate.value == 'template_one'||currentTemplate.value == 'template_five'">
            <pu-card theme="3" class="pt-4">
                <div @click="calendar_show = true"
                    class="w-full h-9 px-2 mb-2 text-sm font-bold bg-default-bg border border-border1 rounded-full flex items-center">
                    <div class="px-2 flex-1 overflow-hidden">
                        <span>{{ dateRef.s_date || today }} 00:00 - {{ dateRef.s_date || today }} 23:59</span>
                    </div>
                    <em class="w-6 h-6 rounded-full flex items-center justify-center bg-rgbawhite10"
                        @click="calendar_show = true">
                        <icon-chevron-down class="w-5 h-5"></icon-chevron-down>
                    </em>
                </div>
            </pu-card>
            <pu-card theme="3" class="pt-4" v-if="currentTemplate.value == 'template_one'||currentTemplate.value == 'template_five'">
                <dl class="-mx-1 text-center flex">
                    <dd class="px-1 flex-1">
                        <div
                            class="h-full px-1 py-2 text-themewhite rounded-xl bg-gradient-to-br from-themecardlinear1 to-themecardlinear2">
                            <h5 class="text-xl">
                                <span class="text-sm opacity-60">R$&nbsp;</span>
                                <b>{{ logsDataRef.team_bet_amount }}</b>
                            </h5>
                            <p class="mt-1 text-[0.625rem] opacity-70">Diretamente responsável pela codificação global
                            </p>
                        </div>
                    </dd>
                    <dd class="px-1 w-[4.5rem]">
                        <div
                            class="h-full px-1 py-2 text-themewhite rounded-xl bg-gradient-to-br  from-themecardlinear1 to-themecardlinear2">
                            <h5 class="text-xl">
                                <b>{{ logsDataRef.commission_config && logsDataRef.commission_config.commission }}%</b>
                            </h5>
                            <p class="mt-1 text-[0.625rem] opacity-70">Proporção</p>
                        </div>
                    </dd>
                    <dd class="w-1/3 px-1">
                        <div class="h-full px-1 py-2  rounded-xl ctx-theme__linear">
                            <h5 class="text-xl">
                                <span class="text-sm text-four">R$&nbsp;</span>
                                <b>{{ logsDataRef.bonus }}</b>
                            </h5>
                            <p class="mt-1 text-[0.625rem] ">A comissão de hoje</p>
                        </div>
                    </dd>
                </dl>
            </pu-card>
            <pu-card theme="3" class="py-4">
                <table class="w-full text-sm text-center rounded-lg overflow-hidden">
                    <thead>
                        <tr class="bg-rgbawhite10 text-rgbawhite80">
                            <td class="relative">
                                <span>Jogador direto</span>
                            </td>
                            <td class="relative">
                                <em class="w-px h-6 -mt-3 bg-rgbawhite10 absolute left-0 top-1/2"></em>
                                <span>Rollover</span>
                            </td>
                            <td class="relative">
                                <em class="w-px h-6 -mt-3 bg-rgbawhite10 absolute left-0 top-1/2"></em>
                                <span>Nivel</span>
                            </td>
                            <td class="relative">
                                <em class="w-px h-6 -mt-3 bg-rgbawhite10 absolute left-0 top-1/2"></em>
                                <span>Comissão</span>
                            </td>
                        </tr>
                    </thead>
                    <tbody class="text-[0.625rem] text-rgbawhite50">
                        <template v-for="item, index in logsDataRef.list" :key="index">
                            <tr class="border-t border-rgbawhite10 odd:bg-rgbawhite10 even:bg-rgbawhite10">
                                <td>
                                    <span>ID:{{ item.member_id }}</span>
                                </td>
                                <td>
                                    <p>Pessoal: {{ fn(item.bet_amount) }}</p>
                                    <p>Equipe: {{ fn(item.team_bet_amount) }}</p>
                                </td>
                                <td>{{ item.level }}</td>
                                <td>{{ fn(item.bonus) }}</td>
                            </tr>
                        </template>
                        <tr v-if="(logsDataRef.list && logsDataRef.list.length || 0) > 0">
                            <td colspan="4">
                                <pu-no-data></pu-no-data>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_two'">
            <pu-card theme="3" class="pt-4">
                <div @click="calendar_show = true"
                    class="w-full h-9 px-2 mb-2 text-sm font-bold bg-default-bg border border-border1 rounded-full flex items-center">
                    <div class="px-2 flex-1 overflow-hidden">
                        <span>{{ dateRef.s_date || today }} 00:00 - {{ dateRef.s_date || today }} 23:59</span>
                    </div>
                    <em class="w-6 h-6 rounded-full flex items-center justify-center" @click="calendar_show = true">
                        <img :src="AgentImg.icon_dowm" class="w-5 h-5" />
                    </em>
                </div>
            </pu-card>
            <pu-card theme="3" class="pt-4">
                <dl class="-mx-1 text-center flex">
                    <dd class="px-1 flex-1">
                        <div
                            class="h-full px-1 py-2 text-themewhite rounded-xl bg-gradient-to-br from-themecardlinear1 to-themecardlinear2">
                            <h5 class="text-xl">
                                <span class="text-sm opacity-60">R$&nbsp;</span>
                                <b>{{ logsDataRef.team_bet_amount }}</b>
                            </h5>
                            <p class="mt-1 text-[0.625rem] opacity-70">Diretamente responsável pela codificação global
                            </p>
                        </div>
                    </dd>
                    <dd class="px-1 w-[4.5rem]">
                        <div
                            class="h-full px-1 py-2 text-themewhite rounded-xl bg-gradient-to-br  from-themecardlinear1 to-themecardlinear2">
                            <h5 class="text-xl">
                                <b>{{ logsDataRef.commission_config && logsDataRef.commission_config.commission }}%</b>
                            </h5>
                            <p class="mt-1 text-[0.625rem] opacity-70">Proporção</p>
                        </div>
                    </dd>
                    <dd class="w-1/3 px-1">
                        <div class="h-full px-1 py-2  rounded-xl bg-gradient-to-r from-richlinar1 to-richlinar2">
                            <h5 class="text-xl">
                                <span class="text-sm ">R$&nbsp;</span>
                                <b class="text-four">{{ logsDataRef.bonus }}</b>
                            </h5>
                            <p class="mt-1 text-[0.625rem] ">A comissão de hoje</p>
                        </div>
                    </dd>
                </dl>
            </pu-card>
            <pu-card theme="3" class="py-4">
                <table class="w-full text-sm text-center  overflow-hidden">
                    <thead>
                        <tr class="bg-tablergba40 text-three">
                            <td class="relative">
                                <span>Jogador direto</span>
                            </td>
                            <td class="relative">
                                <em class="w-px h-6 -mt-3 absolute left-0 top-1/2"></em>
                                <span>Rollover</span>
                            </td>
                            <td class="relative">
                                <em class="w-px h-6 -mt-3 absolute left-0 top-1/2"></em>
                                <span>Nivel</span>
                            </td>
                            <td class="relative">
                                <em class="w-px h-6 -mt-3 5 absolute left-0 top-1/2"></em>
                                <span>Comissão</span>
                            </td>
                        </tr>
                    </thead>
                    <tbody class="text-[0.625rem] text-theme">
                        <template v-for="item, index in logsDataRef.list" :key="index">
                            <tr class="border-t border-rgbawhite10 odd:bg-tablergba10 even:bg-tablergba20">
                                <td>
                                    <span>ID:{{ item.member_id }}</span>
                                </td>
                                <td>
                                    <p>Pessoal: {{ fn(item.bet_amount) }}</p>
                                    <p>Equipe: {{ fn(item.team_bet_amount) }}</p>
                                </td>
                                <td>{{ item.level }}</td>
                                <td>{{ fn(item.bonus) }}</td>
                            </tr>
                        </template>
                        <tr v-if="(logsDataRef.list && logsDataRef.list.length || 0) > 0">
                            <td colspan="4">
                                <pu-no-data></pu-no-data>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>
        </div>
        <div v-if="currentTemplate.value == 'template_three'">
            <pu-card theme="3" class="pt-4">
                <div @click="calendar_show = true"
                    class="w-full h-9 px-2 mb-2 text-sm font-bold bg-default-bg border border-border1 rounded-full flex items-center">
                    <div class="px-2 flex-1 overflow-hidden">
                        <span>{{ dateRef.s_date || today }} 00:00 - {{ dateRef.s_date || today }} 23:59</span>
                    </div>
                    <em class="w-6 h-6 rounded-full flex items-center justify-center" @click="calendar_show = true">
                        <img :src="AgentImg.icon_dowm" class="w-5 h-5" />
                    </em>
                </div>
            </pu-card>
            <pu-card theme="3" class="pt-4">
                <dl class="-mx-1 text-center flex">
                    <dd class="px-1 flex-1">
                        <div
                            class="h-full px-1 py-2 text-themewhite rounded-xl bg-gradient-to-br from-themecardlinear1 to-themecardlinear2">
                            <h5 class="text-xl">
                                <span class="text-sm opacity-60 text-themetext1">R$&nbsp;</span>
                                <b>{{ logsDataRef.team_bet_amount }}</b>
                            </h5>
                            <p class="mt-1 text-[0.625rem] opacity-70 text-themetext1">Diretamente responsável pela
                                codificação
                                global</p>
                        </div>
                    </dd>
                    <dd class="px-1 w-[4.5rem]">
                        <div
                            class="h-full px-1 py-2 text-themewhite rounded-xl bg-gradient-to-br  from-themecardlinear1 to-themecardlinear2">
                            <h5 class="text-xl">
                                <b>{{ logsDataRef.commission_config && logsDataRef.commission_config.commission }}%</b>
                            </h5>
                            <p class="mt-1 text-[0.625rem] opacity-70 text-themetext1">Proporção</p>
                        </div>
                    </dd>
                    <dd class="w-1/3 px-1">
                        <div class="h-full px-1 py-2  rounded-xl m3-theme-btn1">
                            <h5 class="text-xl">
                                <span class="text-sm ">R$&nbsp;</span>
                                <b class="text-four">{{ logsDataRef.bonus }}</b>
                            </h5>
                            <p class="mt-1 text-[0.625rem] ">A comissão de hoje</p>
                        </div>
                    </dd>
                </dl>
            </pu-card>
            <pu-card theme="3" class="py-4">
                <table class="w-full text-sm text-center  overflow-hidden">
                    <thead>
                        <tr class="bg-tablergba40 text-themetext1">
                            <td class="relative">
                                <span>Jogador direto</span>
                            </td>
                            <td class="relative">
                                <em class="w-px h-6 -mt-3 absolute left-0 top-1/2"></em>
                                <span>Rollover</span>
                            </td>
                            <td class="relative">
                                <em class="w-px h-6 -mt-3 absolute left-0 top-1/2"></em>
                                <span>Nivel</span>
                            </td>
                            <td class="relative">
                                <em class="w-px h-6 -mt-3 5 absolute left-0 top-1/2"></em>
                                <span>Comissão</span>
                            </td>
                        </tr>
                    </thead>
                    <tbody class="text-[0.625rem] text-theme">
                        <template v-for="item, index in logsDataRef.list" :key="index">
                            <tr
                                class="border-t border-rgbawhite10 odd:bg-tablergba10 even:bg-tablergba20 text-themetext2">
                                <td>
                                    <span class="text-themetext0">ID:{{ item.member_id }}</span>
                                </td>
                                <td>
                                    <p>Pessoal: {{ fn(item.bet_amount) }}</p>
                                    <p>Equipe: {{ fn(item.team_bet_amount) }}</p>
                                </td>
                                <td>{{ item.level }}</td>
                                <td>{{ fn(item.bonus) }}</td>
                            </tr>
                        </template>
                        <tr v-if="(logsDataRef.list && logsDataRef.list.length || 0) > 0">
                            <td colspan="4">
                                <pu-no-data></pu-no-data>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </pu-card>

        </div>
        <div v-if="currentTemplate.value=='template_four'">
            <pu-card theme="3" class="pt-4">
            <dl class="-mx-1 text-center flex bg-tablebg rounded-xl">
                <dd class="px-1 flex-1">
                    <div class="h-full px-1 py-2  m4-text   flex items-center flex-col justify-between ">
                        <p class="mt-1 text-[0.625rem] m4-text">Diretamente responsável pela codificação global
                        </p>
                        <h5 class="text-xl text-themetext0">
                            <span class="text-sm ">R$&nbsp;</span>
                            <b>{{ logsDataRef.team_bet_amount }}</b>
                        </h5>

                    </div>
                </dd>
                <dd class="px-1 w-[4.5rem]">
                    <div class="h-full px-1 py-2  m4-text  flex items-center flex-col justify-between">
                        <p class="mt-1 text-[0.625rem] m4-text">Proporção</p>
                        <h5 class="text-xl text-themetext0">
                            <b>{{ logsDataRef.commission_config && logsDataRef.commission_config.commission }}%</b>
                        </h5>

                    </div>
                </dd>
                <dd class="w-1/3 px-1">
                    <div class="h-full px-1 py-2  flex items-center flex-col justify-between">
                        <p class="mt-1 text-[0.625rem] m4-text ">A comissão de hoje</p>
                        <h5 class="text-xl text-themetext0">
                            <span class="text-sm ">R$&nbsp;</span>
                            <b>{{ logsDataRef.bonus }}</b>
                        </h5>

                    </div>
                </dd>
            </dl>
        </pu-card>
        <pu-card theme="3" class="py-4">
            <div @click="calendar_show = true"
                class="w-full h-10 text-sm bg-tablebg px-3 rounded-xl flex  mt-2 items-center">
                <img :src="AgentImg.icon_date" class="w-4 h-4 mr-3 text-body-text/65 shrink-0">
                <span class="m4-text">Date</span>
                <div class="flex-1 overflow-hidden ml-2 text-white">
                    <span>{{ dateRef.s_date || today }} 00:00 - {{ dateRef.s_date || today }} 23:59</span>
                </div>
            </div>
            <div class="mt-4 bg-tablebg rounded-xl " v-for="item, index in logsDataRef.list" :key="index">
                <div class="flex items-center p-2 boxitem">
                    <div class="min-w-[6rem] text-right m4-text">ID:</div>
                    <span class="text-white/60 ml-2">{{ item.member_id }}</span>
                </div>

                <div class="flex items-center p-2 boxitem">
                    <div class="min-w-[6rem] text-right m4-text">Pessoal:</div>
                    <span class="text-white ml-2"> {{ fn(item.bet_amount) }}</span>
                    <div class="ml-6 text-right m4-text">Equipe: </div>
                    <span class="text-white/60 ml-2"> {{ fn(item.team_bet_amount) }}</span>
                </div>
                <div class="flex items-center p-2 boxitem">
                    <div class="min-w-[6rem] text-right m4-text">Nivel:</div>
                    <span class="text-themetext0 ml-2">{{ item.level }}</span>
                </div>
                <div class="flex items-center p-2 boxitem">
                    <div class="min-w-[6rem] text-right m4-text">Comissão:</div>
                    <span class="text-themetext0 ml-2">{{ fn(item.bonus) }}</span>
                </div>
            </div>
            <div v-if="(logsDataRef.list && logsDataRef.list.length || 0) > 0">
                <pu-no-data></pu-no-data>
            </div>
        </pu-card>
        </div>

        <em class="w-full h-[4.25rem] block"></em>
        <van-calendar v-model:show="calendar_show" @confirm="onConfirm" :min-date="new Date(2023, 0, 1)"
            :formatter="calendarFormatterFunc" :confirm-text="t('确认')" :show-mark="false" teleport="body"
            :safe-area-inset-bottom="true"
            :style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-' + (bodyWidthRef / 2) + 'px' }"
            :overlay-style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-' + (bodyWidthRef / 2) + 'px' }" />
    </div>
</template>
<style scoped>
table tr td {
    padding: 0.75rem 0.25rem;
}
</style>