<script setup>
import { useThemeImages } from '@/utils/themeimg'

const CommonImg = useThemeImages().common
</script>

<template>
    <div class="w-full py-4 text-center flex flex-col items-center">
        <img :src=CommonImg.img_nodata class="w-40 h-auto">
        <p class="mt-2 text-sm opacity-60 " v-if="currentTemplate.value=='template_one'|| currentTemplate.value == 'template_five'">Nenhum registro ainda</p>
        <p class="mt-2 text-sm opacity-60 text-theme" v-else-if="currentTemplate.value=='template_two'">Nenhum registro ainda</p>
        <p class="mt-2 text-sm opacity-70 text-themetext1"  v-else-if="currentTemplate.value=='template_three'">Nenhum registro ainda</p>
        <p class="mt-2 text-sm opacity-70 m4-text"  v-else="currentTemplate.value=='template_three'">Nenhum registro ainda</p>
    </div>
</template>