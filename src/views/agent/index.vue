<script setup>
import { computed, ref, watch } from 'vue'
import { t } from '@/i18n'
import { useRoute, useRouter } from 'vue-router'
import { isAuthRef } from '@/model/user'
// import { configMOdel } from '@/model/basic'
import invite from './invite.vue'
import mydata from './data.vue'
import commission from './commission.vue'
import logs from './logs.vue'
import faq from './faq.vue'
import adata from '@/views/agentnew/adata.vue'
import rule from '@/views/agentnew/rule.vue'
import kpi from '@/views/agentnew/kpi.vue'
import comm from '@/views/agentnew/comm.vue'
import taxa from '@/views/agentnew/taxa.vue'
import { playBtnAudioFunc, isMobileSafari } from '@/utils/core'
import { navListRef } from '@/model/common'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
import { useTemplate } from '@/utils/template'
const { currentTemplate } = useTemplate()
const HomeImg = useThemeImages().home
const CommonImg = useThemeImages().common
const AgentImg = useThemeImages().agent
const CommonBgImg = useThemeImages().commonbg
const route = useRoute()
const router = useRouter()
const current_path = computed(() => {
    return route.path
})

// const { navListRef } = configMOdel(true)

const activity_count = computed(() => {
    let val = 0
    for (let i = 0; i < navListRef.value.length; i++) {
        if (navListRef.value[i].activity_type == 'agent') {
            val = navListRef.value[i].count
            break
        }
    }
    return val
})

const nav_list = ref([
    { title: 'Convite', type: 'invite', show: true },
    { title: 'Os meus dados', type: 'data', show: isAuthRef.value },
    { title: 'Comissão', type: 'commission', show: isAuthRef.value },
    { title: 'Detalhado', type: 'logs', show: isAuthRef.value },
    { title: 'FAQ', type: 'faq', show: true },
])
const m4_nav_list = ref([
    { title: 'Convite', type: 'invite', show: true,activeimg:AgentImg.icon_invi_active,img:AgentImg.icon_invi},
    { title: 'Os meus dados', type: 'data', show: isAuthRef.value, activeimg:AgentImg.icon_dash_active,img:AgentImg.icon_dash },
    { title: 'Comissão', type: 'commission', show: isAuthRef.value ,activeimg:AgentImg.icon_members_active,img:AgentImg.icon_members },
    { title: 'Detalhado', type: 'logs', show: isAuthRef.value ,activeimg:AgentImg.icon_rewards_active,img:AgentImg.icon_rewards },
    { title: 'FAQ', type: 'faq', show: true,activeimg:AgentImg.icon_faq_active,img:AgentImg.icon_faq  },
])

const new_nav_list = ref([
    { title: 'Link de Convite', type: 'invite', show: true, icon: AgentImg.icon_ag01},
    { title: 'Rede de Agentes', type: 'rule', show: true, icon: AgentImg.icon_ag02},
    { title: 'Desempenho', type: 'kpi', show: isAuthRef.value, icon: AgentImg.icon_ag03 },
    // { title: 'Comissão', type: 'comm', show: isAuthRef.value, icon: AgentImg.icon_ag04 },
    { title: 'Taxa de Bônus do Agente', type: 'taxa', show: isAuthRef.value, icon: AgentImg.icon_ag05}
])

const m5_nav_list = ref([
    { title: 'Link de Convite', type: 'invite', show: true, icon: AgentImg.icon_ag01,activeicon:AgentImg.icon_ag01_active },
    { title: 'Rede de Agentes', type: 'rule', show: true, icon: AgentImg.icon_ag02,activeicon:AgentImg.icon_ag02_active },
    { title: 'Desempenho', type: 'kpi', show: isAuthRef.value, icon: AgentImg.icon_ag03,activeicon:AgentImg.icon_ag03_active },
    // { title: 'Comissão', type: 'comm', show: isAuthRef.value, icon: AgentImg.icon_ag04,activeicon:AgentImg.icon_ag04_active },
    { title: 'Taxa de Bônus do Agente', type: 'taxa', show: isAuthRef.value, icon: AgentImg.icon_ag05,activeicon:AgentImg.icon_ag05_active}
])



const topbackgroundStyle = computed(() => ({
    backgroundImage: `url(${HomeImg.img_topBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
}))
let nav_itype = ref('invite')
function handleChangeTab(type) {
  nav_itype.value = type
}
watch(() => activity_count.value, (val) => {
    if (val > 0 && isAuthRef.value) {
        nav_itype.value = 'commission'
    }
}, { immediate: true })

function back() {
    playBtnAudioFunc('close')
    router.back()
}

const getTabClass = (itemType) => {
    if (itemType === nav_itype.value) {
        // 选中样式
        if (currentTemplate.value === 'template_one') {
            return 'ctx-theme__linear';
        } else if (currentTemplate.value === 'template_two') {
            return 'bg-gradient-to-b from-gold-500 to-gold-100 text-themewhite';
        } else if (currentTemplate.value === 'template_three') {
            return 'm3-theme-btn1';
        } else if (currentTemplate.value === 'template_four') {
            return 'm4-ten-btn !text-rgbablack80';
        }else if(currentTemplate.value == 'template_five'){
            return 'text-inputborder border-b-2 border-inputborder';
        }
    } else {
        // 未选中样式
        if (currentTemplate.value === 'template_one') {
            return 'text-themewhite';
        } else if (currentTemplate.value === 'template_two') {
            return 'text-three';
        } else if (currentTemplate.value === 'template_three') {
            return 'text-themetext1';
        } else if (currentTemplate.value === 'template_four') {
            return '';
        }else if(currentTemplate.value == 'template_five'){
            return 'border-b-2 border-rgbawhite30';
        }
    }
};

</script>

<template>
    <template v-if="currentTemplate == 'template_one'||currentTemplate == 'template_two'">
        <div class="w-wrap max-w-full h-screen overflow-y-auto  relative"
            :style="{ background: `url(${CommonBgImg.bg_body_1})center no-repeat`, backgroundSize: 'cover' }">
            <!-- 固定顶部栏 -->
            <header
                class="w-wrap max-w-full fixed left-1/2 top-0 -translate-x-1/2 flex items-center justify-center  z-50 box-content bg-body-bg"
                :class="currentTemplate == 'template_two' ? 'text-three' : ''"
                :style="currentTemplate == 'template_two' ? topbackgroundStyle : ''">

                <div class="w-full h-[3.125rem] relative z-20">
                    <div @click="back()"
                        class="px-3 h-full absolute left-0 top-0 flex justify-center items-center cursor-pointer">
                        <img :src=CommonImg.btn_back class="w-9 h-9 mt-1">
                    </div>
                    <div class="w-full h-full flex justify-center items-center">
                        <h3 class="text-base text-themetext2 leading-4 opacity-85 text-center capitalize max-w-[60%]">
                            <span>Agente</span>
                        </h3>
                    </div>
                </div>
            </header>

            <!-- 主内容区域 -->
            <div class="w-full pt-[3.125rem]">
                <!-- Banner Section -->
                <van-image :src=AgentImg.img_agentbg class="w-full min-h-20" />

                <!-- Tabs Section -->
                <div class="relative">
                    <van-tabs v-model:active="nav_itype" shrink sticky offset-top="3.125rem"
                        class="-mt-10 relative z-40" :style="{
                            '--van-tabs-line-height': '2rem',
                            '--van-tabs-bottom-bar-height': '0',
                            '--van-padding-xs': '0'
                        }">

                        <template v-for="item, index in nav_list" :key="index">
                            <van-tab v-if="item.show" :name="item.type" class="h-9">
                                <template #title>
                                    <!-- && currentTemplate=='template_one' 
                                 :item.type==nav_itype && currentTemplate=='template_two'?'' -->
                                    <a :to="item.path" href="javascript:;" v-if="currentTemplate == 'template_one'"
                                        @click="playBtnAudioFunc()"
                                        class="px-3 h-9 text-xs rounded-t-lg font-normal relative flex items-center"
                                        :class="getTabClass(item.type)">
                                        <span>{{ item.title }}</span>
                                        <i v-if="item.type == 'commission' && activity_count > 0"
                                            class="w-2 h-2 bg-two rounded-full absolute right-1.5 top-[0.375rem] border-[0.5px] border-rgbawhite80"></i>
                                    </a>
                                    <a :to="item.path" href="javascript:;" v-else-if="currentTemplate == 'template_two'"
                                        @click="playBtnAudioFunc()" :class="[
                                            'px-3  h-9 text-xs rounded-t-[0.75rem] font-normal relative flex items-center',
                                            item.type == nav_itype ? ' bg-gradient-to-b from-morelinear2 to-morelinear1  text-themewhite' : 'text-three'
                                        ]">
                                        <span>{{ item.title }}</span>
                                        <i v-if="item.type == 'commission' && activity_count > 0"
                                            class="w-2 h-2 bg-two rounded-full absolute right-1.5 top-[0.375rem] border-[0.5px] border-rgbawhite80"></i>
                                    </a>
                                    <a :to="item.path" href="javascript:;" v-else-if="currentTemplate == 'template_three'"
                                        @click="playBtnAudioFunc()" :class="[
                                            'px-3  h-9 text-sm rounded-t-[0.75rem] font-normal relative flex items-center',
                                            item.type == nav_itype ? 'm3-theme-btn1' : 'text-themetext1'
                                        ]">
                                        <span>{{ item.title }}</span>
                                        <i v-if="item.type == 'commission' && activity_count > 0"
                                            class="w-2 h-2 bg-two rounded-full absolute right-1.5 top-[0.375rem] border-[0.5px] border-rgbawhite80"></i>
                                    </a>

                                </template>
                                <!-- Tab Content -->
                                <div class="tab-content">
                                    <invite v-if="item.type == 'invite'"></invite>
                                    <mydata v-if="item.type == 'data'"></mydata>
                                    <commission v-if="item.type == 'commission'"></commission>
                                    <logs v-if="item.type == 'logs'"></logs>
                                    <faq v-if="item.type == 'faq'"></faq>
                                    <div v-if="!isMobileSafari()" style="padding-bottom: env(safe-area-inset-bottom);">
                                        <em class="w-full h-[4rem] block"></em>
                                    </div>
                                    <div v-else>
                                        <em class="w-full h-[10rem] block"></em>
                                    </div>
                                </div>
                            </van-tab>
                        </template>
                    </van-tabs>
                </div>
            </div>
        </div>

        <Panddingbottom></Panddingbottom>
    </template>
    <template v-else-if="currentTemplate == 'template_three'">
        <pu-page title="Agente" class="z-[1]" hideService>
            <div class="w-wrap max-w-full h-screen overflow-y-auto relative m4Class">
                <!-- 主内容区域 -->
                <div class="w-full">
                    <img :src=AgentImg.img_agentbg class="w-[94%] m-auto mt-4">
                    <!-- Tabs Section -->
                    <div>
                        <van-tabs v-model:active="nav_itype" shrink sticky offset-top="3.125rem" class="mt-2 z-1"
                            :style="{
                                '--van-tabs-line-height': '2.25rem',
                                '--van-tabs-bottom-bar-height': '0',
                                '--van-padding-xs': '0',
                                '--van-tabs-line-background': 'none',
                                '--van-tabs-line-warp-background': 'none',
                            }">
                            <template v-for="item, index in new_nav_list" :key="index">
                                <van-tab v-if="item.show" :name="item.type" class='rounded-t-lg '>
                                    <template #title>
                                        <a :to="item.path" href="javascript:;" @click="playBtnAudioFunc()"
                                            class="px-3 py-2 text-xs rounded-full mx-1  font-bold relative flex items-center !border-white/20 border"
                                            :class="getTabClass(item.type)">
                                            <img :src="item.icon" alt="" class=" h-4 mr-1">
                                            <span>{{ item.title }}</span>
                                            <i v-if="item.type == 'commission' && activity_count > 0"
                                                class="w-2 h-2 bg-texterror rounded-full absolute right-1.5 top-[0.375rem] border-[0.5px]"></i>
                                        </a>
                                    </template>
                                    <!-- Tab Content -->
                                    <div class="tab-content">
                                        <adata v-if="item.type == 'invite'" @change-tab="handleChangeTab"></adata>
                                        <rule v-if="item.type == 'rule'"></rule>
                                        <kpi v-if="item.type == 'kpi'"></kpi>
                                        <comm v-if="item.type == 'comm'"></comm>
                                        <taxa v-if="item.type == 'taxa'"></taxa>
                                    </div>
                                </van-tab>
                            </template>
                        </van-tabs>
                    </div>
                </div>
            </div>

            <!-- <Panddingbottom></Panddingbottom> -->
        </pu-page>
    </template>
    <template v-else-if="currentTemplate =='template_four'">
        <pu-page title="Agente" class="z-[1]" hideService>
            <div class="w-wrap max-w-full h-screen overflow-y-auto bg-theme relative m4Class">
                <!-- 主内容区域 -->
                <div class="w-full">
                    <img :src=AgentImg.img_agentbg class="w-[94%] m-auto mt-4">
                    <!-- Tabs Section -->
                    <div>
                        <van-tabs v-model:active="nav_itype" shrink sticky offset-top="3.125rem" class="mt-2 z-1"
                            :style="{
                                '--van-tabs-line-height': '2.25rem',
                                '--van-tabs-bottom-bar-height': '0',
                                '--van-padding-xs': '0',
                                '--van-tabs-line-background': 'none',
                                '--van-tabs-line-warp-background': 'none',
                            }">
                            <template v-for="item, index in new_nav_list" :key="index">
                                <van-tab v-if="item.show" :name="item.type" class='rounded-t-lg '>
                                    <template #title>
                                        <a :to="item.path" href="javascript:;" @click="playBtnAudioFunc()"
                                            class="px-3 py-2 text-xs rounded-full mx-1  font-bold relative flex items-center text-white bg-theme !border-white/20 border"
                                            :class="getTabClass(item.type)">
                                            <img :src="item.icon" alt="" class=" h-4 mr-1">
                                            <span>{{ item.title }}</span>
                                            <i v-if="item.type == 'commission' && activity_count > 0"
                                                class="w-2 h-2 bg-texterror rounded-full absolute right-1.5 top-[0.375rem] border-[0.5px]"></i>
                                        </a>
                                    </template>
                                    <!-- Tab Content -->
                                    <div class="tab-content">
                                        <adata v-if="item.type == 'invite'" @change-tab="handleChangeTab"></adata>
                                        <rule v-if="item.type == 'rule'"></rule>
                                        <kpi v-if="item.type == 'kpi'"></kpi>
                                        <comm v-if="item.type == 'comm'"></comm>
                                        <taxa v-if="item.type == 'taxa'"></taxa>
                                        
                                        <!-- <div style="padding-bottom: env(safe-area-inset-bottom);">
                                        <em class="w-full h-[4rem] block"></em>
                                    </div> -->
                                        <!-- <Panddingbottom></Panddingbottom> -->
                                    </div>
                                </van-tab>
                            </template>
                        </van-tabs>
                    </div>
                </div>
            </div>

            <!-- <Panddingbottom></Panddingbottom> -->
        </pu-page>
    </template>
    <template v-else-if="currentTemplate =='template_five'">
        <pu-page title="Agente" class="z-[1]" hideService>
            <div class="w-wrap max-w-full h-screen overflow-y-auto relative m5Class">
                <!-- 主内容区域 -->
                <div class="w-full">
                    <img :src=AgentImg.img_agentbg class="w-[94%] m-auto mt-4">
                    <!-- Tabs Section -->
                    <div>
                        <van-tabs v-model:active="nav_itype" shrink sticky offset-top="2.8rem" class="mt-2 z-1"
                            :style="{
                                '--van-tabs-line-height': '2.25rem',
                                '--van-tabs-bottom-bar-height': '0',
                                '--van-padding-xs': '0',
                                '--van-tabs-line-background': 'none',
                                '--van-tabs-line-warp-background': 'none',
                            }">
                            <template v-for="item, index in m5_nav_list" :key="index">
                                <van-tab v-if="item.show" :name="item.type">
                                    <template #title>
                                        <a :to="item.path" href="javascript:;" @click="playBtnAudioFunc()"
                                            class="px-3 py-2 text-xs   font-bold flex items-center text-white relative bottom-[-2px]"
                                            :class="getTabClass(item.type)">
                                            <img :src="nav_itype==item.type? item.activeicon : item.icon" alt="" class=" h-4 mr-1">
                                            <span :class="nav_itype==item.type? 'text-themetext2' : ''">{{ item.title }}</span>
                                            <i v-if="item.type == 'commission' && activity_count > 0"
                                                class="w-2 h-2 bg-texterror rounded-full absolute right-1.5 top-[0.375rem] border-[0.5px]"></i>
                                        </a>
                                    </template>
                                    <!-- Tab Content -->
                                    <div class="tab-content">
                                        <adata v-if="item.type == 'invite'" @change-tab="handleChangeTab"></adata>
                                        <rule v-if="item.type == 'rule'"></rule>
                                        <kpi v-if="item.type == 'kpi'"></kpi>
                                        <comm v-if="item.type == 'comm'"></comm>
                                        <taxa v-if="item.type == 'taxa'"></taxa>
                                        
                                        <!-- <div style="padding-bottom: env(safe-area-inset-bottom);">
                                        <em class="w-full h-[4rem] block"></em>
                                    </div> -->
                                        <!-- <Panddingbottom></Panddingbottom> -->
                                    </div>
                                </van-tab>
                            </template>
                        </van-tabs>
                    </div>
                </div>
            </div>

            <!-- <Panddingbottom></Panddingbottom> -->
        </pu-page>
    </template>

</template>
<style lang='css' scoped>
:deep(.van-tabs--line .van-tabs__wrap) {
    background: rgba(0, 0, 0, 0.6);
    margin-top: 0.1rem;
}
.m4Class{
   :deep(.van-tabs--line .van-tabs__wrap){ 
    background: none;
   }
}
.m5Class{
   :deep(.van-tabs--line .van-tabs__wrap){ 
    background: #10121d;
    border-bottom: 1px solid rgba(255,255,255,0.3) !important;
    margin-bottom: 1rem;
   }
}
</style>
