<script setup>
import { computed, ref } from 'vue'
import { t } from '@/i18n'
import { useScreenSafeArea } from '@vueuse/core'
import { bodyWidthRef } from '@/utils/config'
import { playBtnAudioFunc } from '@/utils/core'
import { userModel } from '@/model/user'
import { useThemeImages } from '@/utils/themeimg'
const CommonBgImg = useThemeImages().commonbg 
const { top, bottom } = useScreenSafeArea()

const { memberRef, userUpdateFunc } = userModel()

let nickname = ref('')
let show = ref(false)
let auto_click = computed(()=> {
    let _val = true
    if(!nickname.value) _val = false
    if(nickname.value == (memberRef.value&&memberRef.value.nickname)) _val = false
    return _val
})

function open() {
    playBtnAudioFunc()
    show.value = true
    nickname.value = memberRef.value&&memberRef.value.nickname||''
}
function submit() {
    if(auto_click.value) {
        playBtnAudioFunc()
        userUpdateFunc('nickname', nickname.value)
        show.value = false
    }
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
                        <span>{{ t('userCenter.BrandName') }}</span>
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
                <ui-input v-model="nickname" placeholder="Por favor, digite um apelido"></ui-input>
                <div class="w-full pt-8 flex justify-center" v-if="currentTemplate.value=='template_one'">
                    <a @click="submit()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="min-w-[8.75rem]  h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center ctx-theme__linear">
                        <span>{{ t('Save') }}</span>
                    </a>
                </div>
                <div class="w-full pt-8 flex justify-center"  v-else-if="currentTemplate.value =='template_two'">
                    <a @click="submit()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="min-w-[8.75rem] bg-btncolor text-themeblack rounded-lg  text-center p-2">
                        <span>{{ t('Save') }}</span>
                    </a>
                </div>
                <div class="w-full pt-8 flex justify-center"  v-else-if="currentTemplate.value =='template_three'">
                    <a @click="submit()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="w-full m3-theme-btn1  rounded-lg  text-center p-2">
                        <span>{{ t('Save') }}</span>
                    </a>
                </div>
                <div class="w-full pt-8 flex justify-center"  v-else-if="currentTemplate.value =='template_five'">
                    <a @click="submit()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="min-w-[8.75rem] h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer ctx-theme__linear">
                        <span>{{ t('Save') }}</span>
                    </a>
                </div>
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
    </div>
</template>