<script setup>
import { t } from '@/i18n'
import { NoticeShowRef } from '@/utils/config'
import { marqueeRef } from '@/model/common'

// 关闭弹窗方法
const closeNotice = () => {
    NoticeShowRef.value = false 
}
</script>

<template>
    <van-popup
        v-model:show="NoticeShowRef"
            closeable
            position="bottom"
            class="popup-container h-full bg-three"
            overlay-class="popup-overlay"
            style="--van-popup-background: var(--color-default-bg); height: 50%;"
            teleport="body"
        >
        <div class="text-center px-8 py-4">
            <h2 class="text-xl font-bold mb-4" :class="currentTemplate.value =='template_four' ? 'm4-text' : 'text-themewhite'">{{ t("modelPage.LatestNews") }}</h2>
            <div class="text-sm leading-relaxed">
                {{marqueeRef}}
            </div>
        </div>
        <div class="px-8 flex justify-center">
            <a @click="closeNotice()" v-if="currentTemplate.value !='template_four'" class="w-full h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center" :class="currentTemplate.value =='template_one'|| currentTemplate.value == 'template_five' ? ' ctx-theme__linear' : 'm2-btn-nine'">
                <span>Compreendi</span>
            </a>
            <a @click="closeNotice()" v-else class="w-full h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center m4-ten-btn" >
                <span>{{ t('modelPage.understood') }}</span>
            </a>
        </div>
    </van-popup>
</template>