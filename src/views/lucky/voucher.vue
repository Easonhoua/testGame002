<script setup>
import { t } from '@/i18n'
import { luckyDrawMOdel } from '@/model/other'
const { configRef, takeVoucherFunc } = luckyDrawMOdel(true)
</script>

<template>
    <pu-page title="Coletar Bônus" class="z-[999]" hideService>
        <pu-card theme="3" class="py-5" v-if="currentTemplate.value=='template_one'">
            <ul>
                <template v-for="item,index in configRef.task_list" :key="index">
                    <li class="w-full mb-4 rounded-xl relative" >
                        <em class="w-full h-full ctx-theme__linear rounded-xl opacity-15 absolute left-0 top-0 block" ></em>
                        <dl class="w-full px-3 py-2 rounded-xl relative flex items-center bg-gradient-to-r from-card2 to-card1"  ">
                            <dt class="shrink-0">
                                <p class="text-[0.5625rem] opacity-45 text-center">
                                    <span>Bônus</span>
                                </p>
                                <p class="text-[1.375rem] text-four text-center">
                                    <span>x1</span>
                                </p>
                            </dt>
                            <dd class="h-10 mx-3 border-r-2 border-rgbawhite10 border-dashed shrink-0"></dd>
                            <dd class="flex-1 overflow-hidden">
                                <p class="text-sm">
                                    <span>{{ item.name }}</span>
                                </p>
                                <p class="text-[0.8125rem]">
                                    <b class="text-four">{{ item.num }}</b>
                                    <span class="opacity-45">&nbsp;/&nbsp;{{ item.max }}</span>
                                </p>
                            </dd>
                            <dd @click="takeVoucherFunc(index,item)" 
                            :class="item.status==1?'ctx-theme':'opacity-45'"
                             class="min-w-[5.5rem] ctx-theme  h-9 px-3 text-xs rounded-lg cursor-pointer flex items-center shrink-0 justify-center"
                             >
                                <span >{{ item.status == 2 ? 'Reclamado' : 'Receber' }}</span>
                            </dd>
                        </dl>
                    </li>
                </template>
            </ul>
        </pu-card>
        <pu-card theme="3" class="py-5" v-if="currentTemplate.value=='template_two'">
            <ul>
                <template v-for="item,index in configRef.task_list" :key="index">
                    <li class="w-full mb-4 rounded-xl relative" >
                        <dl class="w-full px-3 py-2 rounded-xl relative flex items-center bg-gradient-to-r from-card2 to-card1" >
                            <dt class="shrink-0">
                                <p class="text-[0.5625rem] opacity-45 text-center">
                                    <span>Bônus</span>
                                </p>
                                <p class="text-[1.375rem] text-four text-center">
                                    <span>x1</span>
                                </p>
                            </dt>
                            <dd class="h-10 mx-3 border-r-2 border-rgbawhite10 border-dashed shrink-0"></dd>
                            <dd class="flex-1 overflow-hidden">
                                <p class="text-sm">
                                    <span>{{ item.name }}</span>
                                </p>
                                <p class="text-[0.8125rem]">
                                    <b class="text-four">{{ item.num }}</b>
                                    <span class="opacity-45">&nbsp;/&nbsp;{{ item.max }}</span>
                                </p>
                            </dd>
                            <dd @click="takeVoucherFunc(index,item)" :class="item.status==1?'m2-btn-ten':'text-rgbawhite30 bg-rgbablack15'"
                             class="min-w-[5.5rem]  h-9 px-3 text-xs rounded-lg cursor-pointer flex items-center shrink-0 justify-center"
                             >
                                <span >{{ item.status == 2 ? 'Reclamado' : 'Receber' }}</span>
                            </dd>
                        </dl>
                    </li>
                </template>
            </ul>
        </pu-card>
        <pu-card theme="3" class="py-5" v-if="currentTemplate.value=='template_three'">
            <ul>
                <template v-for="item,index in configRef.task_list" :key="index">
                    <li class="w-full mb-4 rounded-xl relative" >
                        <!-- <em class="w-full h-full ctx-theme__linear rounded-xl opacity-15 absolute left-0 top-0 block" v-if="currentTemplate.value=='template_one'"></em> -->
                        <dl class="w-full px-3 py-2 rounded-xl relative flex items-center bg-gradient-to-r from-card1 to-card2">
                            <dt class="shrink-0">
                                <p class="text-[0.5625rem] opacity-45 text-center">
                                    <span>Bônus</span>
                                </p>
                                <p class="text-[1.375rem] text-four text-center">
                                    <span>x1</span>
                                </p>
                            </dt>
                            <dd class="h-10 mx-3 border-r-2 border-rgbawhite10 border-dashed shrink-0"></dd>
                            <dd class="flex-1 overflow-hidden">
                                <p class="text-sm">
                                    <span>{{ item.name }}</span>
                                </p>
                                <p class="text-[0.8125rem]">
                                    <b class="text-four">{{ item.num }}</b>
                                    <span class="opacity-45">&nbsp;/&nbsp;{{ item.max }}</span>
                                </p>
                            </dd>
                            <dd @click="takeVoucherFunc(index,item)" :class="item.status==1?'m3-theme-btn1':'text-rgbawhite30 bg-rgbablack15'" class="w-24 h-9 px-3 rounded-lg cursor-pointer flex justify-center items-center shrink-0">
                                <span>{{ item.status == 2 ? 'Reclamado' : 'Receber' }}</span>
                            </dd>
                        </dl>
                    </li>
                </template>
            </ul>
        </pu-card>
        <pu-card theme="3" class="py-5" v-if="currentTemplate.value=='template_four'">
            <ul>
                <template v-for="item,index in configRef.task_list" :key="index">
                    <li class="w-full mb-4 rounded-xl relative" >
                        <!-- <em class="w-full h-full ctx-theme__linear rounded-xl opacity-15 absolute left-0 top-0 block" v-if="currentTemplate.value=='template_one'"></em> -->
                        <dl class="w-full px-3 py-2 rounded-xl relative flex items-center bg-tablebg">
                            <dt class="shrink-0">
                                <p class="text-[0.68rem] opacity-45 text-center">
                                    <span>Bônus</span>
                                </p>
                                <p class="text-[1.375rem] text-themetext0 text-center">
                                    <span>x1</span>
                                </p>
                            </dt>
                            <dd class="h-10 mx-3 border-r-2 border-rgbawhite10 border-dashed shrink-0"></dd>
                            <dd class="flex-1 overflow-hidden">
                                <p class="text-sm">
                                    <span>{{ item.name }}</span>
                                </p>
                                <p class="text-[0.8125rem]">
                                    <b class="text-themetext0">{{ item.num }}</b>
                                    <span class="opacity-45">&nbsp;/&nbsp;{{ item.max }}</span>
                                </p>
                            </dd>
                            <dd @click="takeVoucherFunc(index,item)" :class="item.status==1?'m4-ten-btn':'text-rgbawhite30 bg-rgbablack15'" class="w-24 h-8 px-3 rounded-full cursor-pointer flex justify-center items-center shrink-0">
                                <span>{{ item.status == 2 ? 'Reclamado' : 'Receber' }}</span>
                            </dd>
                        </dl>
                    </li>
                </template>
            </ul>
        </pu-card>
        <pu-card theme="3" class="py-5" v-if="currentTemplate.value=='template_five'">
            <ul>
                <template v-for="item,index in configRef.task_list" :key="index">
                    <li class="w-full mb-4 rounded-xl relative" >
                        <!-- <em class="w-full h-full ctx-theme__linear rounded-xl opacity-15 absolute left-0 top-0 block" v-if="currentTemplate.value=='template_one'"></em> -->
                        <dl class="w-full px-3 py-2 rounded-xl relative flex items-center bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 border border-thirsmodelboder">
                            <dt class="shrink-0">
                                <p class="text-[0.68rem] text-themewhite text-center">
                                    <span>Bônus</span>
                                </p>
                                <p class="text-[1.375rem] text-themetext0 text-center">
                                    <span>x1</span>
                                </p>
                            </dt>
                            <dd class="h-10 mx-3 border-r-2 border-rgbawhite10 border-dashed shrink-0"></dd>
                            <dd class="flex-1 overflow-hidden">
                                <p class="text-sm">
                                    <span>{{ item.name }}</span>
                                </p>
                                <p class="text-[0.8125rem]">
                                    <b class="text-themetext0">{{ item.num }}</b>
                                    <span class="opacity-45">&nbsp;/&nbsp;{{ item.max }}</span>
                                </p>
                            </dd>
                            <dd @click="takeVoucherFunc(index,item)" :class="item.status==1?'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2':' bg-rgbablack15'" class="w-24 h-8 px-3 rounded-full cursor-pointer flex justify-center items-center shrink-0 font-bold">
                                <span>{{ item.status == 2 ? 'Reclamado' : 'Receber' }}</span>
                            </dd>
                        </dl>
                    </li>
                </template>
            </ul>
        </pu-card>
    </pu-page>
</template>