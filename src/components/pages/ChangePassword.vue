<script setup>
import { computed, ref } from 'vue'
import { useScreenSafeArea } from '@vueuse/core'
import { bodyWidthRef } from '@/utils/config'
import { playBtnAudioFunc } from '@/utils/core'
import { changePassModel } from '@/model/user'
import { useThemeImages } from '@/utils/themeimg'
const CommonBgImg = useThemeImages().commonbg 
const { top, bottom } = useScreenSafeArea()

const { dataRef, cheangePasswordFunc } = changePassModel()

let show = ref(false)
const regex = /^.{6,200}$/;
const error_old_password = computed(()=> {
    let _val = false
    let regres = regex.test(dataRef.value.old_password)
    if(!regres&&dataRef.value.old_password) {
        _val = true
    }
    return _val
})
const error_password = computed(()=> {
    let _val = false
    let regres = regex.test(dataRef.value.password)
    if(!regres&&dataRef.value.password) {
        _val = true
    }
    return _val
})
const error_password_repetition = computed(()=> {
    let _val = false
    let regres = regex.test(dataRef.value.password_repetition)
    if(!regres&&dataRef.value.password_repetition) {
        _val = true
    }
    return _val
})
let auto_click = computed(()=> {
    return !error_old_password.value&&!error_password.value&&!error_password_repetition.value&&dataRef.value.old_password&&dataRef.value.password&&dataRef.value.password_repetition
})
function open() {
    playBtnAudioFunc()
    show.value = true
}
function submit() {
    if(auto_click.value) {
        cheangePasswordFunc('login_pwd')
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
            :style="{ width: '560px', maxWidth: '100%', height: '100%', left: '50%', marginLeft: '-'+(bodyWidthRef/2)+'px',background: `url(${CommonBgImg.bg_body_1})  center` }"
            :overlay-style="{ width: '560px', maxWidth: '100%', left: '50%', marginLeft: '-'+(bodyWidthRef/2)+'px' }"
            style="background-size: cover;"
            teleport="body"
        >
            <section :style="`padding-top: ${top};`" class="w-full">
                <div class="w-full h-[3.25rem] relative flex items-center justify-center">
                    <h3 class="text-base leading-4 font-medium text-center line-clamp-2 capitalize" style="max-width: 60%;">
                        <span>Configuração de Senha</span>
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
                <ui-input v-model="dataRef.old_password" type="password" :error="error_old_password" placeholder="Digite a senha antiga">
                    <template #icon>
                        <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path>
                        </svg>
                    </template>
                    <template #error>defina uma senha de 6 a 20 dígitos</template>
                </ui-input>
                <br>
                <ui-input v-model="dataRef.password" type="password" :error="error_password" placeholder="Digite nova senha">
                    <template #icon>
                        <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path>
                        </svg>
                    </template>
                    <template #error>defina uma senha de 6 a 20 dígitos</template>
                </ui-input>
                <br>
                <ui-input v-model="dataRef.password_repetition" type="password" :error="error_password_repetition" placeholder="Confirmar nova senha">
                    <template #icon>
                        <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path>
                        </svg>
                    </template>
                    <template #error>defina uma senha de 6 a 20 dígitos</template>
                </ui-input>
                <div class="w-full pt-8 flex justify-center" v-if="currentTemplate.value=='template_one'">
                    <a @click="submit()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="min-w-[8.75rem] h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center ctx-theme__linear">
                        <span>Salvar</span>
                    </a>
                </div>
                <div class="w-full pt-8 flex justify-center"  v-else-if="currentTemplate.value =='template_two'">
                    <a @click="submit()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="min-w-[8.75rem] bg-btncolor text-themeblack rounded-lg  text-center p-2">
                        <span>Salvar</span>
                    </a>
                </div>
                <div class="w-full pt-8 flex justify-center"  v-else-if="currentTemplate.value =='template_three'">
                    <a @click="submit()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="w-full m3-theme-btn1 text-themeblack rounded-lg  text-center p-2">
                        <span>Salvar</span>
                    </a>
                </div>
                <div class="w-full pt-8 flex justify-center"  v-else-if="currentTemplate.value =='template_five'">
                    <a @click="submit()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="min-w-[8.75rem] h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer ctx-theme__linear">
                        <span>Salvar</span>
                    </a>
                </div>
                
            </pu-card>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
    </div>
</template>