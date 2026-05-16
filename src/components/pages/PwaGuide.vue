<script setup>
import { ref, watch} from 'vue'
import { t } from '@/i18n'
import { openServiceFunc } from '@/utils/config'
import { playBtnAudioFunc } from '@/utils/core'
import { pwaIndexModel,getPwaTokenFunc} from '@/model/pwa'
import { useThemeImages } from '@/utils/themeimg'

const CommonImg = useThemeImages().common
const PwaImg = useThemeImages().pwa

const{ pwaGuideShow, pwaReceiveShow, popStatue, popModel, popContent, popReceiveAward, pwaReceiveAmount,popInterval } = pwaIndexModel()

function onClickPwa(){
    playBtnAudioFunc()
    getPwaTokenFunc()
    
}

function onClickService(){
    playBtnAudioFunc()
    openServiceFunc()
}

function onClickClose(){
    playBtnAudioFunc()
    pwaGuideShow.value = false
}

function onClickReceiveClose(){
    playBtnAudioFunc()
    pwaReceiveShow.value = false
}
</script>

<template>
    <teleport to="body">
    <em></em>
    <!-- pwaGuideShow -->
    <section v-if="pwaGuideShow" class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[2008] -translate-x-1/2 flex items-center justify-center">
        <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
        <div class="w-[21.25rem] max-h-full overflow-y-auto relative">
            <div class="w-full relative">
                <img :src=PwaImg.img_guidebg class="w-full h-auto block relative">
                <button v-if="popModel==1" @click="onClickClose()" class="w-10 h-10 bg-rgbawhite30 rounded-full absolute right-1 top-1 flex items-center justify-center">
                    <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </button>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[18rem] rounded-lg p-4 text-center">
                    
                    <div class="text-left text-sm mt-4" :class="currentTemplate.value=='template_two'?'text-nine':' text-themewhite'" v-if="currentTemplate.value =='template_one'||currentTemplate.value =='template_two'">
                        <span v-html="popContent"></span>
                    </div>

                    <div class="text-left text-sm mt-4 text-themetext3" v-if="currentTemplate.value =='template_three'" >
                        <span v-html="popContent"></span>
                    </div>
                    <div class="text-left text-sm mt-4 text-themewhite" v-if="currentTemplate.value =='template_four'" >
                        <span v-html="popContent"></span>
                    </div>
                </div>
                <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10"> 
                    <!-- <div class="w-full flex justify-center mt-6">
                        <a v-if="popReceiveAward > 0" class="w-72 h-12 flex items-center justify-center bg-rgbablack15 bg-blur rounded-3xl">
                            <img :src=CommonImg.img_gold class="w-6 h-">
                            <span class="text-themewhite">Bónus de {{ currentUnit.value }} {{popReceiveAward}}</span>
                        </a>
                    </div> -->
                    <div class="w-full flex justify-center mt-[-6rem]">
                        <button @click="onClickPwa()" class="w-56 h-12 rounded-3xl mx-2"                     
                        :style="{
                            backgroundImage: `url(${PwaImg.btn_agora})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                            }">
                        </button>
                        <button @click="onClickService()" class="w-12 h-12  rounded-3xl mx-2" 
                        :style="{
                            backgroundImage: `url(${PwaImg.btn_service})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                            }">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section v-if="pwaReceiveShow" class="w-wrap max-w-full h-full fixed left-1/2 top-0 z-[999] -translate-x-1/2 flex items-center justify-center">
        <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
        <div class="w-[21.25rem] max-h-full overflow-y-auto relative">
            <div class="w-full relative">
                <img :src=PwaImg.img_receivebg class="w-full h-auto block relative">
                <button @click="onClickReceiveClose()" class="w-10 h-10 bg-rgbawhite30 rounded-full absolute right-1 top-1 flex items-center justify-center">
                    <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </button>
                <div class="w-full h-full text-themewhite relative overflow-y-auto">
                    <div class="text-center text-lg text-themewhite">
                        <span class="text-themewhite text-3xl">{{ currentUnit.value }} {{pwaReceiveAmount}}</span>
                    </div>
                </div>
            </div>  
        </div>
    </section>
    </teleport>
</template>
