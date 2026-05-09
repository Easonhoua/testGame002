<script setup>
import { computed, onMounted, ref } from 'vue'
import { t, fn } from '@/i18n'
import { useDateFormat } from '@vueuse/core'
import { calendarFormatterFunc } from '@/utils/core'
import { bodyWidthRef } from '@/utils/config'
import { dateRef, bonusListRef,agentV2BonusList,loadingRef,finishedRef,resetBonusList } from '@/model/agent'
import { useThemeImages } from '@/utils/themeimg'
const AgentImg = useThemeImages().agent
const CommonImg = useThemeImages().common 

let calendar_show = ref(false)
// let searchKeyword = ref('')

// 今天的时间
const today = computed(() => {
    var day = new Date();
    day.setTime(day.getTime());
    return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
})

onMounted(() => {
    agentV2BonusList()
})

function onConfirm(value) {
    calendar_show.value = false;
    dateRef.value.s_date = useDateFormat(value, 'YYYY-MM-DD')
    resetBonusList()
    agentV2BonusList()
}

function handleSearch(){
    // dateRef.value.search_id = searchKeyword.value
    resetBonusList()
    agentV2BonusList()
}
</script>

<template>
    <div v-if="currentTemplate.value =='template_four'">
        <pu-card theme="3" class="">

            <div class="w-full h-10 flex rounded-xl bg-tablebg gap-1 px-1 items-center"> 
                <!-- 左边 -->
                <div
                    @click="calendar_show = true"
                    class="flex-1 min-w-0 h-8 bg-tablebg2 rounded-xl flex items-center px-2 py-2"
                    >
                    <span class="text-white/40 truncate text-xs">
                        {{ dateRef.s_date || today }}
                    </span>
                    <img :src="AgentImg.icon_date" class="ml-auto w-5 h-5">
                </div>

                <!-- 右边 -->
                <div class="flex-1 min-w-0 h-8 bg-tablebg2 rounded-xl flex items-center px-4 py-2">
                    <input
                        v-model="dateRef.search_id"
                        type="text"
                        placeholder="ID"
                        class="min-w-0 bg-transparent text-white text-sm outline-none"
                    />
                    <button
                        @click="handleSearch"
                        class="ml-auto w-8 h-8 flex items-center justify-center"
                    >
                        <img :src=CommonImg.icon_search class="w-4 h-4" alt="search">
                    </button>
                </div>
            </div>

            <!-- 表头 -->
            <div class="mt-3 grid grid-cols-6 text-[0.55rem] text-center bg-tablebg table-fixed text-themefont py-2 rounded-t-lg ">
                <div class="m4-text">ID</div>
                <div class="m4-text">Número de<br>Subordinados</div>
                <div class="m4-text">Aposta</div>
                <div class="m4-text">Desempenho</div>
                <div class="m4-text">Depósito</div>
                <div class="m4-text">Comissão</div>
            </div>

            <!-- 列表 -->
            <van-list
                v-model:loading="loadingRef"
                :finished="finishedRef"
                :immediate-check="true"
                finished-text="No more data"
                @load="agentV2BonusList"
                >
            <div
                v-for="(item, index) in bonusListRef"
                :key="index"
                class="grid grid-cols-6 h-9 text-[0.7rem] text-center bg-tablebg2 text-themefont py-2 odd:bg-black/20"
            >
                <div>{{ item.member_id }}</div>
                <div>{{ fn(item.reg_num, 0) }}</div>
                <div>{{ fn(item.bet_amount, 0) }}</div>
                <div>{{ fn(item.team_bet_amount, 0) }}</div>
                <div>{{ fn(item.team_recharge_amount, 0) }}</div>
                <div class="text-themetext0 font-semibold">
                {{ fn(item.bonus, 0) }}
                </div>
            </div>

            <!-- 空数据 -->
            <van-empty
                v-if="!bonusListRef.length && finishedRef"
                description="No Data"
            />
            </van-list>
            
        </pu-card>

        <em class="w-full h-[4.25rem] block"></em>
        <van-calendar v-model:show="calendar_show" @confirm="onConfirm" :min-date="new Date(2023, 0, 1)"
            :formatter="calendarFormatterFunc" :confirm-text="t('确认')" :show-mark="false" teleport="body"
            :safe-area-inset-bottom="true"
            :style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-' + (bodyWidthRef / 2) + 'px' }"
            :overlay-style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-' + (bodyWidthRef / 2) + 'px' }" />
    </div>
    <div v-else-if="currentTemplate.value =='template_three'">
        <pu-card theme="3" class="mt-4">
            <div class="w-full h-10 flex rounded-xl bg-tablergba20 gap-1 px-1 items-center"> 
                <!-- 左边 -->
                <div
                    @click="calendar_show = true"
                    class="flex-1 min-w-0 h-8 bg-tablergba40 rounded-xl flex items-center px-2 py-2"
                    >
                    <span class="text-white/40 truncate text-xs">
                        {{ dateRef.s_date || today }}
                    </span>
                    <img :src="AgentImg.icon_date" class="ml-auto w-5 h-5">
                </div>

                <!-- 右边 -->
                <div class="flex-1 min-w-0 h-8 bg-tablergba40 rounded-xl flex items-center px-4 py-2">
                    <input
                        v-model="dateRef.search_id"
                        type="text"
                        placeholder="ID"
                        class="min-w-0 bg-transparent text-white text-sm outline-none"
                    />
                    <button
                        @click="handleSearch"
                        class="ml-auto w-8 h-8 flex items-center justify-center"
                    >
                        <img :src=CommonImg.icon_search class="w-4 h-4" alt="search">
                    </button>
                </div>
            </div>

            <!-- 表头 -->
            <div class="mt-3 grid grid-cols-6 text-[0.55rem] text-center bg-tablergba20 table-fixed text-themefont py-2 rounded-t-lg ">
                <div class="m4-text">ID</div>
                <div class="m4-text">Número de<br>Subordinados</div>
                <div class="m4-text">Aposta</div>
                <div class="m4-text">Desempenho</div>
                <div class="m4-text">Depósito</div>
                <div class="m4-text">Comissão</div>
            </div>

            <!-- 列表 -->
            <van-list
                v-model:loading="loadingRef"
                :finished="finishedRef"
                :immediate-check="true"
                finished-text="No more data"
                @load="agentV2BonusList"
                >
            <div
                v-for="(item, index) in bonusListRef"
                :key="index"
                class="grid grid-cols-6 h-9 text-[0.7rem] text-center bg-tablergba20 text-themefont py-2 odd:bg-tablergba40"
            >
                <div>{{ item.member_id }}</div>
                <div>{{ fn(item.reg_num, 0) }}</div>
                <div>{{ fn(item.bet_amount, 0) }}</div>
                <div>{{ fn(item.team_bet_amount, 0) }}</div>
                <div>{{ fn(item.team_recharge_amount, 0) }}</div>
                <div class="text-themetext0 font-semibold">
                {{ fn(item.bonus, 0) }}
                </div>
            </div>

            <!-- 空数据 -->
            <van-empty
                v-if="!bonusListRef.length && finishedRef"
                description="No Data"
            />
            </van-list>
            
        </pu-card>

        <em class="w-full h-[4.25rem] block"></em>
        <van-calendar v-model:show="calendar_show" @confirm="onConfirm" :min-date="new Date(2023, 0, 1)"
            :formatter="calendarFormatterFunc" :confirm-text="t('确认')" :show-mark="false" teleport="body"
            :safe-area-inset-bottom="true"
            :style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-' + (bodyWidthRef / 2) + 'px' }"
            :overlay-style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-' + (bodyWidthRef / 2) + 'px' }" />
    </div>
    <div v-else-if="currentTemplate.value =='template_five'">
        <pu-card theme="3" class="">

            <div class="w-full h-10 flex rounded-lg bg-tablebg1 gap-1 px-1 items-center border border-thirsmodelboder"> 
                <!-- 左边 -->
                <div
                    @click="calendar_show = true"
                    class="flex-1 min-w-0 h-8 bg-tablebg2 rounded-lg flex items-center px-2 py-2"
                    >
                    <span class="text-white/40 truncate text-xs">
                        {{ dateRef.s_date || today }}
                    </span>
                    <img :src="AgentImg.icon_date" class="ml-auto w-5 h-5">
                </div>

                <!-- 右边 -->
                <div class="flex-1 min-w-0 h-8 bg-tablebg2 rounded-lg flex items-center pl-4 pr-2 py-2">
                    <input
                        v-model="dateRef.search_id"
                        type="text"
                        placeholder="ID"
                        class="min-w-0 bg-transparent text-white text-sm outline-none"
                    />
                    <button
                        @click="handleSearch"
                        class="ml-auto w-8 h-8 flex items-center justify-center"
                    >
                        <img :src=CommonImg.icon_search class="w-5 h-5" alt="search">
                    </button>
                </div>
            </div>

            <!-- 表头 -->
            <div class="mt-3 grid grid-cols-6 text-[0.65rem] text-center bg-tablebg1 table-fixed text-themewhite font-bold py-2 rounded-t-lg ">
                <div class="">ID</div>
                <div class="">Número de<br>Subordinados</div>
                <div class="">Aposta</div>
                <div class="">Desempenho</div>
                <div class="">Depósito</div>
                <div class="">Comissão</div>
            </div>

            <!-- 列表 -->
            <van-list
                v-model:loading="loadingRef"
                :finished="finishedRef"
                :immediate-check="true"
                finished-text="No more data"
                @load="agentV2BonusList"
                >
            <div
                v-for="(item, index) in bonusListRef"
                :key="index"
                class="grid grid-cols-6 h-9 text-[0.7rem] text-center bg-tablebg2 text-themefont py-2 odd:bg-tablebg1"
            >
                <div>{{ item.member_id }}</div>
                <div>{{ fn(item.reg_num, 0) }}</div>
                <div>{{ fn(item.bet_amount, 0) }}</div>
                <div>{{ fn(item.team_bet_amount, 0) }}</div>
                <div>{{ fn(item.team_recharge_amount, 0) }}</div>
                <div class="text-themetext0 font-semibold">
                {{ fn(item.bonus, 0) }}
                </div>
            </div>

            <!-- 空数据 -->
            <van-empty
                v-if="!bonusListRef.length && finishedRef"
                description="No Data"
            />
            </van-list>
            
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