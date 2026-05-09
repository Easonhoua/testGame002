<script setup>
import { computed, onMounted, ref } from 'vue'
import { agentConfigRef } from '@/model/agent'
import { useThemeImages } from '@/utils/themeimg'
const AgentImg = useThemeImages().agent

onMounted(() => {
})

const activeIndex = ref(0) // 默认选中第一个
const typeList = [
  { img: AgentImg.type_01, label: 'Solt' },
  { img: AgentImg.type_02, label: 'Cartas' },
  { img: AgentImg.type_03, label: 'Pesca' },
  { img: AgentImg.type_04, label: 'Cassino' },
]

</script>

<template>

    <div v-if="currentTemplate.value =='template_four'">
        <pu-card theme="4" class="bg-tablergba20 mt-2">
            <div class="min-h-screen bg-neutral-900 text-white flex">
            <!-- 左侧菜单 -->
            <aside class="w-20 flex flex-col items-center py-2 space-y-2">
                <button
                v-for="(item, index) in typeList"
                :key="index"
                @click="activeIndex = index"
                class="w-14 h-16 rounded-lg flex flex-col items-center justify-center text-xs"
                :class="activeIndex === index
                    ? 'm4-ten-btn text-white'
                    : 'bg-neutral-700 hover:m4-ten-btn hover:text-white'"
                >
                <img :src="item.img" class="w-8 h-auto mb-1" />
                <div>{{ item.label }}</div>
                </button>
            </aside>

            <!-- 右侧内容 -->
            <main class="flex-1 p-2">
                <div class="">
                    <table class="w-full table-fixed text-sm text-center ext-themefont rounded-lg  bg-tablebg">
                        <thead>
                            <tr class="bg-black/20 m4-text text-[0.65rem]">
                            <th class="py-2">Nível</th>
                            <th class="py-2">Desempenho</th>
                            <th class="py-2">Taxa de Bônus do Agente</th>
                            </tr>
                        </thead>

                        <tbody class="text-center">
                            <tr
                            v-for="item in agentConfigRef"
                            :key="item.level"
                            class="odd:bg-black/20 text-white"
                            >
                            <td class="py-2">{{ item.level }}</td>
                            <td class="py-2">{{ item.bet_amount }}</td>
                            <td class="py-2 text-yellow-400">{{ item.commission }}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            </div>
        </pu-card> 

        <em class="w-full h-[4.25rem] block"></em>
    </div>
    <div v-else-if="currentTemplate.value =='template_five'">
        <pu-card theme="4" class=" mt-2">
            <div class="min-h-screen  text-white flex">
            <!-- 左侧菜单 -->
            <aside class="w-20 flex flex-col items-center py-2 space-y-2">
                <button
                v-for="(item, index) in typeList"
                :key="index"
                @click="activeIndex = index"
                class="w-[4.2rem] h-16 rounded-lg flex flex-col items-center justify-center text-xs"
                :class="activeIndex === index
                    ? 'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 text-white'
                    : 'bg-rgbawhite10 hover:bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 hover:text-white'"
                >
                <img :src="item.img" class="w-8 h-auto mb-2" />
                <div class="font-bold">{{ item.label }}</div>
                </button>
            </aside>

            <!-- 右侧内容 -->
            <main class="flex-1 p-2">
                <div class="">
                    <table class="w-full table-fixed text-sm text-center rounded-lg  bg-tablebg1">
                        <thead>
                            <tr class="bg-tablebg1 text-themewhite text-[0.65rem]">
                            <th class="py-2">Nível</th>
                            <th class="py-2">Desempenho</th>
                            <th class="py-2">Taxa de Bônus do Agente</th>
                            </tr>
                        </thead>

                        <tbody class="text-center">
                            <tr
                            v-for="item in agentConfigRef"
                            :key="item.level"
                            class="odd:bg-tablebg2 text-themetext3 text-[0.7rem]"
                            >
                            <td class="py-2">{{ item.level }}</td>
                            <td class="py-2">{{ item.bet_amount }}</td>
                            <td class="py-2 text-yellow-400">{{ item.commission }}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            </div>
        </pu-card> 

        <em class="w-full h-[4.25rem] block"></em>
    </div>
    <div v-else-if="currentTemplate.value =='template_three'">
        <pu-card theme="4" class="mt-2">
            <div class="min-h-screen text-white flex">
            <!-- 左侧菜单 -->
            <aside class="w-20 flex flex-col items-center py-2 space-y-2">
                <button
                v-for="(item, index) in typeList"
                :key="index"
                @click="activeIndex = index"
                class="w-14 h-16 rounded-lg flex flex-col items-center justify-center text-xs"
                :class="activeIndex === index
                    ? 'm3-theme-btn1'
                    : 'm3-theme-btn2 hover:m3-theme-btn1'"
                >
                <img :src="item.img" class="w-8 h-auto mb-1" />
                <div>{{ item.label }}</div>
                </button>
            </aside>

            <!-- 右侧内容 -->
            <main class="flex-1 p-2">
                <div class="">
                    <table class="w-full table-fixed text-sm text-center ext-themefont rounded-lg  bg-tablergba20">
                        <thead>
                            <tr class="bg-black/20 m4-text text-[0.65rem]">
                            <th class="py-2">Nível</th>
                            <th class="py-2">Desempenho</th>
                            <th class="py-2">Taxa de Bônus do Agente</th>
                            </tr>
                        </thead>

                        <tbody class="text-center">
                            <tr
                            v-for="item in agentConfigRef"
                            :key="item.level"
                            class="odd:bg-black/20 text-white"
                            >
                            <td class="py-2">{{ item.level }}</td>
                            <td class="py-2">{{ item.bet_amount }}</td>
                            <td class="py-2 text-yellow-400">{{ item.commission }}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            </div>
        </pu-card> 

        <em class="w-full h-[4.25rem] block"></em>
    </div>
</template>