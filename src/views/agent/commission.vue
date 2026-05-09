<script setup>
import { onMounted } from 'vue'
import { t, fn } from '@/i18n'
import { resetTimeFunc } from '@/utils/core'
import { agentCommissionModel } from '@/model/agent'

const { bonusListRef, bonusListFunc, bonusTaskFunc } = agentCommissionModel()

onMounted(()=> {
    bonusListFunc(true)
})
</script>

<template>
    <div>
        <pu-card theme="3" class="py-5" v-if="currentTemplate.value=='template_one'||currentTemplate.value == 'template_five'">
            <ul>
                <template v-for="item,index in bonusListRef" :key="index">
                    <li class="w-full mb-4 p-0.5 ctx-theme__linear rounded-xl">
                        <div class="w-full text-sm bg-body-bg text-themewhite rounded-xl overflow-hidden">
                            <div class="px-4 py-3 bg-gradient-to-r from-rgbawhite10 to-transparent">
                                <svg class="w-6 h-6 mr-1 opacity-45 inline-block align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                                    <path d="m582-298 56-57-118-118v-167h-80v200l142 142ZM440-720h80v-80h-80v80Zm280 280h80v-80h-80v80ZM440-160h80v-80h-80v80ZM160-440h80v-80h-80v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                                </svg>
                                <span class="text-xs opacity-85 align-middle">{{ resetTimeFunc(item.date) }}</span>
                            </div>
                            <div class="px-2 py-3 flex items-center">
                                <div class="px-2 flex-1 overflow-hidden">
                                    <p class="opacity-85">Comissão direta</p>
                                </div>
                                <p class="text-nowrap">
                                    <span class="opacity-45">R$&nbsp;</span>
                                    <span>{{ fn(item.bonus) }}</span>
                                </p>
                                <button @click="bonusTaskFunc(item,index)" :class="item.status==0?'ctx-theme__linear':'bg-rgbawhite10 !text-rgbawhite50'" class="px-2 py-1 ml-2 rounded-lg">
                                    <span class="text-xs">Reclamado</span>
                                </button>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
            <pu-no-data v-if="!bonusListRef.length"></pu-no-data>
        </pu-card>

        <pu-card theme="3" class="py-5" v-if="currentTemplate.value=='template_two'">
            <ul>
                <template v-for="item,index in bonusListRef" :key="index">
                    <li class="w-full mb-4 p-0.5 ctx-theme__linear rounded-xl">
                        <div class="w-full text-sm bg-body-bg text-themewhite rounded-xl overflow-hidden">
                            <div class="px-4 py-3 bg-gradient-to-r from-rgbawhite10 to-transparent">
                                <svg class="w-6 h-6 mr-1 opacity-45 inline-block align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                                    <path d="m582-298 56-57-118-118v-167h-80v200l142 142ZM440-720h80v-80h-80v80Zm280 280h80v-80h-80v80ZM440-160h80v-80h-80v80ZM160-440h80v-80h-80v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                                </svg>
                                <span class="text-xs opacity-85 align-middle">{{ resetTimeFunc(item.date) }}</span>
                            </div>
                            <div class="px-2 py-3 flex items-center">
                                <div class="px-2 flex-1 overflow-hidden">
                                    <p class="opacity-85">Comissão direta</p>
                                </div>
                                <p class="text-nowrap">
                                    <span class="opacity-45">R$&nbsp;</span>
                                    <span>{{ fn(item.bonus) }}</span>
                                </p>
                                <button @click="bonusTaskFunc(item,index)" :class="item.status==0?'ctx-theme__linear':'bg-rgbawhite10 !text-rgbawhite50'" class="px-2 py-1 ml-2 rounded-lg">
                                    <span class="text-xs">Reclamado</span>
                                </button>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
            <pu-no-data v-if="!bonusListRef.length"></pu-no-data>
        </pu-card>

        <pu-card theme="3" class="py-5" v-if="currentTemplate.value=='template_three'">
            <ul>
                <template v-for="item,index in bonusListRef" :key="index">
                    <li class="w-full mb-4 p-0.5 rounded-xl">
                        <div class="w-full text-sm bg-body-bg text-themetext1 rounded-xl overflow-hidden">
                            <div class="px-4 py-3 bg-gradient-to-r from-rgbawhite10 to-transparent">
                                <svg class="w-6 h-6 mr-1 opacity-45 inline-block align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                                    <path d="m582-298 56-57-118-118v-167h-80v200l142 142ZM440-720h80v-80h-80v80Zm280 280h80v-80h-80v80ZM440-160h80v-80h-80v80ZM160-440h80v-80h-80v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                                </svg>
                                <span class="text-xs opacity-85 align-middle">{{ resetTimeFunc(item.date) }}</span>
                            </div>
                            <div class="px-2 py-3 flex items-center">
                                <div class="px-2 flex-1 overflow-hidden">
                                    <p class="opacity-85">Comissão direta</p>
                                </div>
                                <p class="text-nowrap">
                                    <span class="opacity-45">R$&nbsp;</span>
                                    <span>{{ fn(item.bonus) }}</span>
                                </p>
                                <button @click="bonusTaskFunc(item,index)" :class="item.status==0?'m3-theme-btn1':'bg-rgbawhite10 !text-rgbawhite50'" class="px-2 py-1 ml-2 rounded-lg">
                                    <span class="text-xs">Reclamado</span>
                                </button>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
            <pu-no-data v-if="!bonusListRef.length"></pu-no-data>
        </pu-card>
        <pu-card theme="3" class="py-2 !px-2" v-if="currentTemplate.value=='template_four'">
            <ul>
                <!-- bonusListRef -->
                <template v-for="item,index in bonusListRef" :key="index">
                    <li class="w-full mb-2  rounded-xl bg-tablebg">
                        <div class="w-full text-sm bg-tablebg text-white rounded-xl overflow-hidden">
                            <div class="px-4 py-3 ">
                                <svg class="w-6 h-6 mr-1 opacity-45 inline-block align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                                    <path d="m582-298 56-57-118-118v-167h-80v200l142 142ZM440-720h80v-80h-80v80Zm280 280h80v-80h-80v80ZM440-160h80v-80h-80v80ZM160-440h80v-80h-80v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                                </svg>
                                <span class="text-xs opacity-85 align-middle">{{ resetTimeFunc(item.date) }}</span>
                            </div>
                            <div class="px-2 py-3 flex items-center bg-tablebg2">
                                <div class="px-2 flex-1 overflow-hidden">
                                    <p class="m4-text">Comissão direta</p>
                                </div>
                                <p class="text-themetext0">
                                    <span >R$&nbsp;</span>
                                    <span>{{ fn(item.bonus) }}</span>
                                </p>
                                <button @click="bonusTaskFunc(item,index)" :class="item.status==0?'m4-ten-btn text-theme':'!bg-white/20 !text-theme'" class="px-2 py-1 ml-2 rounded-full">
                                    <span class="text-xs">Reclamado</span>
                                </button>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
            <pu-no-data v-if="!bonusListRef.length"></pu-no-data>
        </pu-card>

        <!-- 添加底部空白区域 -->
        <em class="w-full h-[4.25rem] block"></em>
    </div>
</template>