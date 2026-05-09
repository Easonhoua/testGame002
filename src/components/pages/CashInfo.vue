<script setup>
import { computed, ref } from 'vue'
import { useScreenSafeArea } from '@vueuse/core'
import { bodyWidthRef } from '@/utils/config'
import { playBtnAudioFunc } from '@/utils/core'
import { withdrawalModel } from '@/model/account'
import { useThemeImages } from '@/utils/themeimg'
const CommonBgImg = useThemeImages().commonbg
const { top, bottom } = useScreenSafeArea()
const { withdrawInfoRef } = withdrawalModel({info: true})

let show = ref(false)
let auto_click = computed(()=> {
    return false
})
function open() {
    playBtnAudioFunc()
    show.value = true
}

defineExpose({ show, open })
</script>

<template>
    <div>
        <div @click="open()">
            <slot></slot>
        </div>
        <van-popup
            v-model:show="show"
            position="bottom"
            :style="{ width: '560px', maxWidth: '100%', height: '100%', left: '50%', marginLeft: '-'+(bodyWidthRef/2)+'px',background: `url(${CommonBgImg.bg_body_1})  center`, }"
            :overlay-style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-'+(bodyWidthRef/2)+'px' }"
            style="background-size: cover;"
            teleport="body"
        >
            <section :style="`padding-top: ${top};`" class="w-full">
                <div class="w-full h-[3.25rem] relative flex items-center justify-center">
                    <h3 class="text-base leading-4 font-medium text-center line-clamp-2 capitalize" style="max-width: 60%;">
                        <span>Informações de Saque</span>
                    </h3>
                    <div class="absolute top-0 right-0 h-full flex items-center">
                        <a @click="show=false" href="javascript:;" class="h-full px-3 flex items-center">
                            <em class="w-[1.375rem] h-[1.375rem] bg-rgbawhite10 rounded-full flex items-center justify-center">
                                <icon-close class="w-3 h-3"></icon-close>
                            </em>
                        </a>
                    </div>
                </div>
            </section>
            <pu-card theme="3" class="py-5">
                <ui-input>
                    <template #icon>
                        <svg class="w-5 h-5 opacity-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                        </svg>
                    </template>
                    <template #left>
                        <span class="text-[0.8125rem] opacity-85">Nome</span>
                    </template>
                    <template #default>
                        <p class="text-sm text-right">{{ withdrawInfoRef.name||'- -'}}</p>
                    </template>
                </ui-input>
                <br>
                <ui-input>
                    <template #icon>
                        <svg class="w-5 h-5 opacity-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
                        </svg>
                    </template>
                    <template #left>
                        <span class="text-[0.8125rem] opacity-85">Número de Telefone</span>
                    </template>
                    <template #default>
                        <p class="text-sm text-right">{{ withdrawInfoRef.phone||'- -'}}</p>
                    </template>
                </ui-input>
                <br>
                <ui-input>
                    <template #icon>
                        <svg class="w-5 h-5 opacity-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
                        </svg>
                    </template>
                    <template #left>
                        <span class="text-[0.8125rem] opacity-85">Email</span>
                    </template>
                    <template #default>
                        <p class="text-sm text-right">{{ withdrawInfoRef.email||'- -'}}</p>
                    </template>
                </ui-input>
                <br>
                <ui-input>
                    <template #icon>
                        <svg class="w-5 h-5 opacity-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z"/>
                        </svg>
                    </template>
                    <template #left>
                        <span class="text-[0.8125rem] opacity-85">CPF ID</span>
                    </template>
                    <template #default>
                        <p class="text-sm text-right">{{ withdrawInfoRef.cpf||'- -'}}</p>
                    </template>
                </ui-input>
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
    </div>
</template>