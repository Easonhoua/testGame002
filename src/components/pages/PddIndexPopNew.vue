<script setup>
import { ref } from 'vue'
import { t } from '@/i18n'
import { useRouter } from 'vue-router'
import {  routeToViewFunc } from '@/model/basic'
import { isPopPdd, pddBaseConfRef } from '../../model/common'
import { useThemeImages } from '@/utils/themeimg'
import { getCurrentTheme } from '../../utils/theme'
const PddImg = useThemeImages().pdd
const router = useRouter()
const popShowRef = ref(true)

function openpdd() {
    router.push('/pdd')
    close()
}

function close() {
    popShowRef.value = false
}
</script>

<template>
    <!-- isPopPdd&&popShowRef -->
    <teleport to="body">
    <section v-if="isPopPdd&&popShowRef" class="w-full h-full fixed left-0 top-0 z-[199] flex items-center justify-center" @click="openpdd()">
        <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
        <section class="w-full max-h-full overflow-y-auto px-ctx z-[99]">
            <div class="w-[22rem] max-w-full mx-auto relative flex flex-col items-center" >
                <img :src=PddImg.bg_tc  class="w-full h-auto z-[99]" />
            </div>

            <pu-card theme="1" class="flex justify-center -mt-10" v-if="currentTemplate.value =='template_one'">
                <section class="w-[22rem] h-[16rem] m5-theme-model1 rounded-2xl relative p-2">

                    <p class="mt-14 text-[0.9rem] font-bold text-center"><span>Compartilhe o link para convidar amigos e ganhe imediatamaente</span></p>
                    <p class="mt-4 text-[1.5rem] font-bold text-center text-[#fff000]"><span>{{ currentUnit.value }}{{pddBaseConfRef.max_bonus}}</span></p>

                    <div class="mt-10 flex justify-center">
                        <button @click="openshare()" class="w-[8rem] h-10 px-4 rounded-full m5-theme-btn1">
                            <span>Receber</span>
                        </button>
                    </div>
                </section>
            </pu-card>

            <pu-card theme="1" class="flex justify-center -mt-10" v-else-if="currentTemplate.value =='template_two'">
                <section class="w-[16rem] h-[16rem] bg-gradient-to-b from-card1 to-card2 rounded-2xl relative p-2">

                    <p class="mt-14 text-[0.9rem] font-bold text-center"><span>Compartilhe o link para convidar amigos e ganhe imediatamaente</span></p>
                    <p class="mt-4 text-[1.5rem] font-bold text-center text-[#fff000]"><span>{{ currentUnit.value }}{{pddBaseConfRef.max_bonus}}</span></p>

                    <div class="mt-10 flex justify-center">
                        <button @click="openshare()" class="w-[8rem] h-10 px-4 rounded-full bg-gradient-to-b from-btnlinar4 to-btnlinar3">
                            <span>Receber</span>
                        </button>
                    </div>
                </section>
            </pu-card>

            <pu-card theme="1" class="flex   justify-center -mt-10" v-else-if="currentTemplate.value == 'template_five'">
                <section class="w-[16rem] h-[16rem] m5-theme-model1 rounded-2xl relative p-2 m-auto -mt-6">

                    <p class="mt-14 text-[0.9rem] font-bold text-center"><span>Compartilhe o link para convidar amigos e ganhe imediatamaente</span></p>
                    <p class="mt-4 text-[1.5rem] font-bold text-center text-[#fff000]"><span>{{ currentUnit.value }}{{pddBaseConfRef.max_bonus}}</span></p>

                    <div class="mt-10 flex justify-center">
                        <button @click="openshare()" class="w-[8rem] h-10 px-4 rounded-full m5-theme-btn1">
                            <span>{{ t('Receive') }}</span>
                        </button>
                    </div>
                </section>
            </pu-card>

            <pu-card theme="3" class="flex justify-center -mt-10" v-else>
                <section class="w-[16rem] h-[16rem] m3-theme-bg1 rounded-2xl relative p-2">
                    <p class="mt-14 text-[0.9rem] font-bold text-center text-themetext1"><span>{{ t('modelPage.Sharelink') }}</span></p>
                    <p class="mt-4 text-[1.5rem] font-bold text-center text-themetext0"><span>{{ currentUnit.value }}{{pddBaseConfRef.max_bonus}}</span></p>
                    <div class="mt-10 flex justify-center">
                        <button @click="openshare()" class="w-[8rem] h-10 px-4 rounded-full m3-theme-btn1">
                            <span>{{ t('Receive') }}</span>
                        </button>
                    </div>
                </section>
            </pu-card>

            <div class="w-full relative flex justify-center" style="padding: 5.5rem 0.3125rem 0 0;">
                <button @click.stop="close()" class="w-10 h-10 bg-rgbawhite30 rounded-full absolute right-50 top-6 flex items-center justify-center">
                    <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </button>
            </div>
        </section>
    </section>
    </teleport>
</template>