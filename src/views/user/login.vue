<script setup>
import { computed, ref } from 'vue'
import { t } from '@/i18n'
import { loginModel } from '@/model/user'


const { dataRef, rememberRef, loginFunc } = loginModel()

const error_username = computed(()=> {
    let _val = false
    const regex = /^.{3,}$/;
    let regres = regex.test('+55'+dataRef.value.username)
    if(!regres&&dataRef.value.username) {
        _val = true
    }
    return _val
})
const error_password = computed(()=> {
    let _val = false
    const regex = /^.{6,200}$/;
    let regres = regex.test(dataRef.value.password)
    if(!regres&&dataRef.value.password) {
        _val = true
    }
    return _val
})

let auto_click = computed(()=> {
    return !error_username.value&&!error_password.value&&dataRef.value.username&&dataRef.value.password
})

function onclickBtn() {
    if(auto_click.value) {
        loginFunc()
    }
}
</script>

<template>
    <pu-page title="Entrar">
        <section class="px-ctx py-5">
            <div class="w-full pb-5 flex items-center justify-center">
                <img src="/icons/appicon.png" class="w-14 h-14 mr-4 object-contain rounded-lg">
                <h5 class="text-3xl font-medium">
                    <span>{{ window.document.title }}</span>
                </h5>
            </div>
            <div class="w-full text-lg font-black relative flex flex-wrap">
                <button class="w-1/2 py-3 text-one bg-transparent focus:outline-none">
                    <span>Entrar</span>
                </button>
                <button @click="$router.push(`/register`)" class="w-1/2 py-3 bg-transparent focus:outline-none">
                    <span>Registro</span>
                </button>
                <em class="w-full h-0.5 bg-rgbawhite30 absolute left-0 bottom-0 flex">
                    <i class="w-1/2 h-full bg-one"></i>
                </em>
            </div>
            <div class="pt-10">
                <ui-input v-model="dataRef.username" :error="error_username" placeholder="Conta / Número de telefone">
                    <template #icon>
                        <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 21L12 23L10 21H4.99509C3.89323 21 3 20.1074 3 19.0049V4.99509C3 3.89323 3.89262 3 4.99509 3H19.0049C20.1068 3 21 3.89262 21 4.99509V19.0049C21 20.1068 20.1074 21 19.0049 21H14ZM19 19V5H5V19H10.8284L12 20.1716L13.1716 19H19ZM7.97216 18.1808C7.35347 17.9129 6.76719 17.5843 6.22083 17.2024C7.46773 15.2753 9.63602 14 12.1022 14C14.5015 14 16.6189 15.2071 17.8801 17.0472C17.3438 17.4436 16.7664 17.7877 16.1555 18.0718C15.2472 16.8166 13.77 16 12.1022 16C10.3865 16 8.87271 16.8641 7.97216 18.1808ZM12 13C10.067 13 8.5 11.433 8.5 9.5C8.5 7.567 10.067 6 12 6C13.933 6 15.5 7.567 15.5 9.5C15.5 11.433 13.933 13 12 13ZM12 11C12.8284 11 13.5 10.3284 13.5 9.5C13.5 8.67157 12.8284 8 12 8C11.1716 8 10.5 8.67157 10.5 9.5C10.5 10.3284 11.1716 11 12 11Z"></path>
                        </svg>
                    </template>
                    <template #error>a conta deve conter no mínimo 6 letras e números, e o número de celular deve ter 11 dígitos.</template>
                </ui-input>
                <br>
                <ui-input v-model="dataRef.password" type="password" :error="error_password" placeholder="por favor, insira a senha">
                    <template #icon>
                        <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path>
                        </svg>
                    </template>
                    <template #error>defina uma senha de 6 a 20 dígitos</template>
                </ui-input>
                <div class="w-full pt-8 flex justify-center">
                    <a @click="onclickBtn()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="min-w-[8.75rem] h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center ctx-theme__linear">
                        <span>Entrar</span>
                    </a>
                </div>
            </div>
        </section>
    </pu-page>
</template>