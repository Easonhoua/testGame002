<script setup>
import { ref } from 'vue'
import { t } from '@/i18n'
import { useRouter } from 'vue-router'
import { useScreenSafeArea } from '@vueuse/core'
import { bodyWidthRef } from '@/utils/config'
import { logoutFunc } from '@/model/user'

const router = useRouter()

const { top, bottom } = useScreenSafeArea()

let show = ref(false)

defineExpose({ show })

function logout() {
    // setTimeout(() => {
        logoutFunc()
        // router.replace('/')
    // }, 100);
}
</script>

<template>
    <div>
        <div @click="show = true">
            <slot></slot>
        </div>
        <van-popup
            v-model:show="show"
            position="bottom"
            :style="{
                height: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                margin: '0 auto'
            }"
            :overlay-style="{
                width: '100%',
                left: '0',
                maxWidth: 'none'
            }"
            class="!w-wrap !max-w-full"
            style="--van-popup-background: transparent;"
            overlay-class="bg-blur"
            teleport="body"
        >
            <div class="w-full h-full flex flex-col justify-end" v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'||currentTemplate.value=='template_three'|| currentTemplate.value == 'template_five'">
                <section class="w-full px-4 pt-5 pb-3   text-rgbawhite80 rounded-t-4xl" :class="currentTemplate.value=='template_one'?'bg-default-bg':'bg-body-bg'" >
                    <p class="text-base text-center">
                        <span>Sair da conta atual?</span>
                    </p>
                    <p class="mt-7 text-xs text-center text-rgbawhite50">
                        <span>Por favor, lembre-se de sua conta de login e senha para fazer login novamente.</span>
                    </p>
                    <a href="javascript:;" @click="logout()" class="w-full h-12 mt-5 text-base text-red-500 flex items-center justify-center">
                        <span>Sair</span>
                    </a>
                </section>
                <section class="mt-2  text-rgbawhite80" :class="currentTemplate.value=='template_one'|| currentTemplate.value == 'template_five'?'bg-default-bg':'bg-body-bg'" >
                    <a href="javascript:;" @click="show=false" class="w-full pt-4 pb-8 text-base flex items-center justify-center">
                        <span>Cancelar</span>
                    </a>
                    <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
                </section>
            </div>
            <div class="w-full h-full flex flex-col justify-end" v-if="currentTemplate.value=='template_four'">
                <section class="w-full px-4 pt-5 pb-3   text-rgbawhite80 rounded-t-4xl bg-tablebg"  >
                    <p class="text-base text-center">
                        <span>Sair da conta atual?</span>
                    </p>
                    <p class="mt-7 text-xs text-center text-rgbawhite50">
                        <span>Por favor, lembre-se de sua conta de login e senha para fazer login novamente.</span>
                    </p>
                    <a href="javascript:;" @click="logout()" class="w-full h-12 mt-5 text-base text-themetext0 flex items-center justify-center">
                        <span>Sair</span>
                    </a>
                </section>
                <section class=" text-rgbawhite80 bg-tablebg"  >
                    <a href="javascript:;" @click="show=false" class="w-full pt-4 pb-8 text-base flex items-center justify-center">
                        <span>Cancelar</span>
                    </a>
                    <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
                </section>
            </div>
            
        </van-popup>
    </div>
</template>