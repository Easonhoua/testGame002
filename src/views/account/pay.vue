<script setup>
import { t } from '@/i18n'
import { rechargePayInfoRef } from '@/model/account'
</script>

<template>
    <pu-page title="Depósito" hideBox class="z-[999]">
        <section class="w-full h-screen overflow-hidden relative">
            <div class="w-full h-full overflow-hidden">
                <iframe :src="rechargePayInfoRef&&rechargePayInfoRef.config&&rechargePayInfoRef.config.link||rechargePayInfoRef&&rechargePayInfoRef.link" frameborder="0" width="100%" height="100%" scrolling="auto" allow="clipboard-write; clipboard-read; web-share" style="background: transparent;" class="hide-scrollbar"></iframe>
            </div>
        </section>
    </pu-page>
</template>

<style scoped>
/* 隐藏所有滚动条 */
.hide-scrollbar,
.hide-scrollbar iframe,
:deep(.hide-scrollbar),
:deep(iframe) {
    -ms-overflow-style: none !important;  /* IE and Edge */
    scrollbar-width: none !important;     /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar,
.hide-scrollbar iframe::-webkit-scrollbar,
:deep(.hide-scrollbar::-webkit-scrollbar),
:deep(iframe::-webkit-scrollbar) {
    display: none !important;            /* Chrome, Safari and Opera */
    width: 0 !important;
    height: 0 !important;
}

/* 确保 iframe 容器也不显示滚动条 */
section,
div {
    background-color: var(--color-themewhite);
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}

section::-webkit-scrollbar,
div::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
}
</style>