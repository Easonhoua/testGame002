<script setup>
import { ref } from 'vue'
import { t } from '@/i18n'
import { isRegisterSuccessShowRef } from '@/model/user'
import { useThemeImages } from '@/utils/themeimg'
import { blogTagIdsRef } from '@/model/common'
const CommonBgImg = useThemeImages().commonbg 
</script>

<template>
    <em></em>
    <section v-if="isRegisterSuccessShowRef" class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[999] -translate-x-1/2 flex items-center justify-center">
        <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
        <div class="w-full max-h-full overflow-y-auto relative">
            <div class="w-full relative">
                <img :src=CommonBgImg.bg_registerbg class="w-full h-auto block relative">
                <button @click="isRegisterSuccessShowRef=false" class="w-10 h-10 bg-rgbawhite30 rounded-full absolute right-4 top-0 flex items-center justify-center">
                    <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </button>
                <div class="w-66 max-w-full mx-auto -mt-14 pt-18 px-8 pb-8 bg-default-bg text-rgbawhite80 rounded-b-2xl">
                    <p class="text-xs text-center">
                        <b>{{ t('modelPage.Sharelink') }}</b>
                    </p>
                    <p class="text-base text-one text-center">
                        <b>{{ currentUnit.value }} 1,000</b>
                    </p>
                    <div class="w-full mt-6 flex justify-center">
                        <button @click="blogTagIdsRef.includes(2) ? $router.push('/recharge') : $router.push('/agent')" class="w-36 h-12 !px-3 !text-base ctx-theme__linear rounded-xl">
                            <span>{{ t('Receive') }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>