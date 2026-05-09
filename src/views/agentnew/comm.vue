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
        <!-- <pu-card theme="3" class="pt-4">
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
        </pu-card> -->

        <pu-card theme="3" class="">
            <div @click="calendar_show = true"
                class="w-full h-10 text-sm bg-tablebg px-3 rounded-xl flex items-center">
                <img :src="AgentImg.icon_date" class="w-4 h-4 mr-3 text-body-text/65 shrink-0">
                <span class="m4-text">Date</span>
                <div class="flex-1 overflow-hidden ml-2 text-white">
                    <span>{{ dateRef.s_date || today }} 00:00 - {{ dateRef.s_date || today }} 23:59</span>
                </div>
            </div>

            <div class="bg-tablebg rounded-xl " v-for="item, index in logsDataRef.list" :key="index">
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
            <!-- <div v-if="(logsDataRef.list && logsDataRef.list.length || 0) > 0"> -->
                <pu-no-data></pu-no-data>
            <!-- </div> -->
        </pu-card>

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