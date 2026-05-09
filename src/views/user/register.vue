<script setup>
import { computed, ref } from 'vue'
import { t } from '@/i18n'
import { registerModel } from '@/model/user'
import { useThemeImages } from '@/utils/themeimg'

const CommonImg = useThemeImages().common 

const { dataRef, registerFunc } = registerModel()

const error_phone = computed(()=> {
    let _val = false
    // const regex = new RegExp('^\\+55\\d{2}9\\d{8}$');
    // const regex = /^\d{11}$/;
    const regex = /^\d{6,50}$/;
    let regres = regex.test(dataRef.value.username)
    if(!regres&&dataRef.value.username) {
        _val = true
    }
    return _val
})
const error_password = computed(()=> {
    let _val = false
    const regex = /^.{8,200}$/;
    let regres = regex.test(dataRef.value.password)
    if(!regres&&dataRef.value.password) {
        _val = true
    }
    return _val
})
const error_password_repetition = computed(()=> {
    let _val = false
    const regex = /^.{8,200}$/;
    let regres = regex.test(dataRef.value.password_repetition)
    if(!regres&&dataRef.value.password_repetition) {
        _val = true
    }
    return _val
})

let auto_click = computed(()=> {
    return !error_phone.value&&!error_password.value&&!error_password_repetition.value&&dataRef.value.username&&dataRef.value.password&&dataRef.value.password_repetition
})
let autoplay = true

function onclickBtn() {
    if(auto_click.value&&autoplay) {
        autoplay = false
        registerFunc()
        setTimeout(() => {
            autoplay = true
        }, 2000);
    }
}
</script>

<template>
    <pu-page title="Registro">
        <section class="px-ctx py-5">
            <div class="w-full pb-5 flex items-center justify-center">
                <img src="/icons/appicon.png" class="w-14 h-14 mr-4 object-contain rounded-lg">
                <h5 class="text-3xl font-medium">
                    <span>{{ window.document.title }}</span>
                </h5>
            </div>
            <div class="w-full text-lg font-black relative flex flex-wrap">
                <button @click="$router.push('/login')" class="w-1/2 py-3 bg-transparent focus:outline-none">
                    <span>Entrar</span>
                </button>
                <button class="w-1/2 py-3 text-one bg-transparent focus:outline-none">
                    <span>Registro</span>
                </button>
                <em class="w-full h-0.5 bg-rgbawhite30 absolute left-0 bottom-0 flex justify-end">
                    <i class="w-1/2 h-full bg-one"></i>
                </em>
            </div>
            <div class="pt-10">
                <ui-input v-model="dataRef.username" :error="error_phone" placeholder="Por favor, insira seu nome de usuário">
                    <template #icon>
                        <img :src=CommonImg.icon_flagbr class="w-8 h-6 object-contain block">
                    </template>
                    <template #left>
                        <span class="pr-1 text-sm">+55</span>
                    </template>
                    <template #error>Digite um número de telefone correto com 11 dígitos.</template>
                </ui-input>
                <br>
                <ui-input v-model="dataRef.password" type="password" :error="error_password" placeholder="por favor, insira a senha">
                    <template #icon>
                        <div class="w-8 flex justify-center">
                            <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path>
                            </svg>
                        </div>
                    </template>
                    <template #error>defina uma senha de 8 a 20 dígitos</template>
                </ui-input>
                <br>
                <ui-input v-model="dataRef.password_repetition" type="password" :error="error_password_repetition" placeholder="confirmar a senha digitada">
                    <template #icon>
                        <div class="w-8 flex justify-center">
                            <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path>
                            </svg>
                        </div>
                    </template>
                    <template #error>defina uma senha de 8 a 20 dígitos</template>
                </ui-input>
                <!-- <br>
                <ui-input v-model="dataRef.promoter" placeholder="Por favor, insira o código de referência">
                    <template #icon>
                        <div class="w-8 flex justify-center">
                            <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18.5858 17L16.7574 15.1716L18.1716 13.7574L22.4142 18L18.1716 22.2426L16.7574 20.8284L18.5858 19H15V17H18.5858Z"></path>
                            </svg>
                        </div>
                    </template>
                </ui-input>
                <br>
                <ui-input v-model="dataRef.channle_code" placeholder="Por favor, insira o código do canal">
                    <template #icon>
                        <div class="w-8 flex justify-center">
                            <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z"></path>
                            </svg>
                        </div>
                    </template>
                </ui-input> -->
                <div class="w-full pt-8 flex justify-center">
                    <button @click="onclickBtn()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="min-w-[8.75rem] h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center ctx-theme__linear">
                        <span>Registro</span>
                    </button>
                </div>
            </div>
        </section>
    </pu-page>
</template>