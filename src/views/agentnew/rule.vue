<script setup>
import { onMounted } from 'vue'
import { t, fn } from '@/i18n'
import { agentIndexModel } from '@/model/agent'
import InviteShareCard from '@/components/pages/InviteShareCard.vue'
import { useThemeImages } from '@/utils/themeimg'
const AgentImg = useThemeImages().agent
const CommonImg = useThemeImages().common
const { indexListRef, indexListFunc,agentContentRef } = agentIndexModel()

onMounted(()=> {
    indexListFunc()
})
</script>

<template>
    <div v-if="currentTemplate.value == 'template_five'">
        <pu-card theme="4" class="mb-3">
        <div class="w-full py-2  text-themewhite rounded-xl px-2" >
            <img :src=AgentImg.img_agentrule alt="">
        </div>
        </pu-card>

        <pu-card theme="3" class="mb-3 pt-3 ">
            <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                <span>Descrição da Atividade:</span>
            </h5>
            <article class="p-mb text-sm text-themetext4 ctx-article"  v-html="agentContentRef" v-if="agentContentRef!=''"></article>
            <article class="p-mb text-sm text-themetext4" v-else>
                <p>1. O uso do bônus deve seguir as regras da plataforma.</p>
                <p>2. A empresa reserva-se o direito de interpretação final sobre esta atividade.</p>
            </article>
        </pu-card>  
        <em class="w-full h-[4.25rem] block"></em>
    </div>
    <div v-else>
        <pu-card theme="4" class="mb-3">
        <div class="w-full py-2  text-themewhite rounded-xl px-2" >
            <img :src=AgentImg.img_agentrule alt="">
        </div>
        </pu-card>

        <pu-card theme="3" class="mb-3 pt-3 ">
            <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                <span>{{ t('ActivityDescription') }}:</span>
            </h5>
            <article class="p-mb text-sm text-themetext3 ctx-article"  v-html="agentContentRef" v-if="agentContentRef!=''"></article>
            <article class="p-mb text-sm text-themetext3" v-else>
                <p>1. {{ t('commCenter.ruleDetail1')  }}</p>
                <p>2.{{t('commCenter.ruleDetail2')}}</p>
            </article>
        </pu-card>  
        <em class="w-full h-[4.25rem] block"></em>
    </div>
</template>
<style scoped>
table tr td{
    padding: 0.625rem 0.25rem;
}
</style>