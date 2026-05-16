<script setup>
import { t } from '@/i18n'
import useClipboard from "vue-clipboard3"
import { userModel, changePassModel } from '@/model/user'
import { playBtnAudioFunc } from '@/utils/core'
import ChangeNickname from '@/components/pages/ChangeNickname.vue'
import ChangePassword from '@/components/pages/ChangePassword.vue'
import CashInfo from '@/components/pages/CashInfo.vue'
import LogOut from '@/components/pages/LogOut.vue'
import { appIcon } from '@/model/pwa'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
import { useThemeImages } from '@/utils/themeimg'
import { onMounted, ref, computed } from 'vue'
import { withdrawalModel } from '@/model/account'
const MineImg = useThemeImages().mine
const CommonBgImg = useThemeImages().commonbg
const { dataRef, cheangePasswordFunc } = changePassModel()
const { memberRef, userAvatarFunc, userUpdateFunc } = userModel()
const { withdrawInfoRef } = withdrawalModel({info: true})

let nickname = ref('')
const regex = /^.{8,200}$/;
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
let auto_click_password = computed(()=> {
    return !error_old_password.value&&!error_password.value&&!error_password_repetition.value&&dataRef.value.old_password&&dataRef.value.password&&dataRef.value.password_repetition
})
onMounted(() => {
    nickname.value = memberRef.value && memberRef.value.nickname || ''
})
let auto_click = computed(() => {
    let _val = true
    if (!nickname.value) _val = false
    if (nickname.value == (memberRef.value && memberRef.value.nickname)) _val = false
    return _val
})

const { toClipboard } = useClipboard()
async function copyInviteCode(_val) {
    _val = '' + _val
    await toClipboard(_val)
    showToast({
        message: 'foi copiado',
        type: 'success',
        wordBreak: 'break-word',
    });
}

// 添加当前选中的tab状态
const logTypeRef = ref('Conta')

// tab栏数据
const tablist = [
    { label: 'Conta', value: 'Conta' },
    { label: 'Senha', value: 'Senha' },
    { label: 'Informações de Saque', value: 'Informações de Saque' }
]

function callbackFileAvatar(e) {
    userAvatarFunc(e.filePath)
}

// 添加版本号
const version = import.meta.env.VITE_APP_VERSION || '1.0.0'

// tab切换处理函数
function gameLogsFunc(item) {
    logTypeRef.value = item.name
}

function submit() {
    if (auto_click.value) {
        playBtnAudioFunc()
        userUpdateFunc('nickname', nickname.value)
        show.value = false
    }
}
function submitPassword(){
    if(auto_click_password.value) {
        cheangePasswordFunc('login_pwd')
    }
}

</script>

<template>
    <pu-page
        v-if="currentTemplate.value == 'template_one' || currentTemplate.value == 'template_two' || currentTemplate.value == 'template_three'"
        :title="t('pageTitle.Settings')" class="z-[999]" style="background-size: cover;"
        :style="{ background: `url(${CommonBgImg.bg_body_1}) center` }">
        <pu-card theme="3" v-if="memberRef && memberRef.id" class="pt-11 pb-6 flex justify-center">
            <div @click="playBtnAudioFunc()" class="relative">
                <van-image :src="memberRef.head_portrait" width="4.25rem" height="4.25rem" radius="1rem"
                    class="border border-themewhite">
                    <template #loading>
                        <img :src=appIcon class="w-full h-full object-cover">
                    </template>
                    <template #error>
                        <img :src=appIcon class="w-full h-full object-cover">
                    </template>
                </van-image>
                <em
                    class="w-6 h-6 bg-rgbablack50 text-themewhite rounded-full absolute bottom-2 right-2 flex items-center justify-center">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M9.82843 5L7.82843 7H4V19H20V7H16.1716L14.1716 5H9.82843ZM9 3H15L17 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7L9 3ZM12 18C8.96243 18 6.5 15.5376 6.5 12.5C6.5 9.46243 8.96243 7 12 7C15.0376 7 17.5 9.46243 17.5 12.5C17.5 15.5376 15.0376 18 12 18ZM12 16C13.933 16 15.5 14.433 15.5 12.5C15.5 10.567 13.933 9 12 9C10.067 9 8.5 10.567 8.5 12.5C8.5 14.433 10.067 16 12 16Z">
                        </path>
                    </svg>
                </em>
                <ui-file-image @confirm="callbackFileAvatar"></ui-file-image>
            </div>
        </pu-card>
        <pu-card theme="3" class="py-5 text-sm">
            <dl class="mb-4 block">
                <dt class="mb-1 pl-3 text-rgbawhite50 block">{{ t('userCenter.RegisteredAccount') }}</dt>
                <dd class="w-full h-[3.125rem] px-4 bg-rgbawhite10 rounded-2xl flex items-center">
                    <div class="text-[0.8125rem] flex-1 overflow-hidden">
                        <p class="truncate">{{ memberRef.username }}</p>
                    </div>
                </dd>
            </dl>
            <change-nickname>
                <dl class="mb-4 block cursor-pointer">
                    <dt class="mb-1 pl-3 text-rgbawhite50 block">{{ t('userCenter.BrandName') }}</dt>
                    <dd class="w-full h-[3.125rem] px-4 bg-rgbawhite10 rounded-2xl flex items-center">
                        <div class="text-[0.8125rem] flex-1 overflow-hidden">
                            <p class="truncate">{{ memberRef.nickname || '- -' }}</p>
                        </div>
                        <svg class="w-5 h-5 ml-2 opacity-45 shrink-0" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960" fill="currentColor">
                            <path
                                d="M180-140v-135l527.77-527.15q9.31-9.31 20.46-13.58 11.16-4.27 22.31-4.27 11.77 0 22.81 4.27 11.03 4.27 19.34 13.58l49.46 49.46q9.31 8.31 13.58 19.34 4.27 11.04 4.27 22.81 0 11.15-4.27 22.31-4.27 11.15-13.58 20.46L315-140H180Zm60-60h49.46l407.62-407-24.54-25.54L647-657.08 240-249.46V-200Zm560-509.92L749.92-760 800-709.92Zm-127.46 77.38L647-657.08 697.08-607l-24.54-25.54ZM565.39-140q70.15 0 130.07-34.31 59.92-34.31 59.92-95.69 0-35.23-21.11-61.62Q713.15-358 675-376.23l-44.77 44.77q30.69 11.54 47.92 27.19 17.24 15.65 17.24 34.27 0 28.38-39 49.19t-91 20.81q-12.77 0-21.39 8.62-8.61 8.61-8.61 21.38t8.61 21.38q8.62 8.62 21.39 8.62ZM203.77-422.54l44.62-45q-23.47-9.92-35.93-20.54Q200-498.69 200-510q0-15.08 20.12-29.77 20.11-14.69 80.03-40.46 83.39-35.69 111.62-64.58Q440-673.69 440-710q0-49.23-41.5-79.61Q357-820 290-820q-41.15 0-75.69 14.85-34.54 14.84-51.62 36.31-8.3 9.92-6.88 21.88 1.42 11.96 11.35 19.65 9.92 7.93 21.69 6.5 11.77-1.42 20.07-9.73 15.16-15.15 34.85-22.31Q263.46-760 290-760q44.08 0 67.04 14.88Q380-730.23 380-710q0 17.46-19.81 31.66-19.8 14.19-83.96 43.19-77.31 33.84-106.77 60.61Q140-547.77 140-510q0 28.15 16.81 49.5t46.96 37.96Z" />
                        </svg>
                    </dd>
                </dl>
            </change-nickname>
            <change-password>
                <dl class="mb-4 block cursor-pointer">
                    <dt class="mb-1 pl-3 text-rgbawhite50 block">{{ t('userCenter.Password') }}</dt>
                    <dd class="w-full h-[3.125rem] px-4 bg-rgbawhite10 rounded-2xl flex items-center">
                        <div class="text-[0.8125rem] flex-1 overflow-hidden">
                            <p class="truncate">
                                *&nbsp;&nbsp;*&nbsp;&nbsp;*&nbsp;&nbsp;*&nbsp;&nbsp;*&nbsp;&nbsp;*&nbsp;&nbsp;*&nbsp;&nbsp;*
                            </p>
                        </div>
                        <svg class="w-5 h-5 ml-2 opacity-45 shrink-0" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960" fill="currentColor">
                            <path
                                d="M180-140v-135l527.77-527.15q9.31-9.31 20.46-13.58 11.16-4.27 22.31-4.27 11.77 0 22.81 4.27 11.03 4.27 19.34 13.58l49.46 49.46q9.31 8.31 13.58 19.34 4.27 11.04 4.27 22.81 0 11.15-4.27 22.31-4.27 11.15-13.58 20.46L315-140H180Zm60-60h49.46l407.62-407-24.54-25.54L647-657.08 240-249.46V-200Zm560-509.92L749.92-760 800-709.92Zm-127.46 77.38L647-657.08 697.08-607l-24.54-25.54ZM565.39-140q70.15 0 130.07-34.31 59.92-34.31 59.92-95.69 0-35.23-21.11-61.62Q713.15-358 675-376.23l-44.77 44.77q30.69 11.54 47.92 27.19 17.24 15.65 17.24 34.27 0 28.38-39 49.19t-91 20.81q-12.77 0-21.39 8.62-8.61 8.61-8.61 21.38t8.61 21.38q8.62 8.62 21.39 8.62ZM203.77-422.54l44.62-45q-23.47-9.92-35.93-20.54Q200-498.69 200-510q0-15.08 20.12-29.77 20.11-14.69 80.03-40.46 83.39-35.69 111.62-64.58Q440-673.69 440-710q0-49.23-41.5-79.61Q357-820 290-820q-41.15 0-75.69 14.85-34.54 14.84-51.62 36.31-8.3 9.92-6.88 21.88 1.42 11.96 11.35 19.65 9.92 7.93 21.69 6.5 11.77-1.42 20.07-9.73 15.16-15.15 34.85-22.31Q263.46-760 290-760q44.08 0 67.04 14.88Q380-730.23 380-710q0 17.46-19.81 31.66-19.8 14.19-83.96 43.19-77.31 33.84-106.77 60.61Q140-547.77 140-510q0 28.15 16.81 49.5t46.96 37.96Z" />
                        </svg>
                    </dd>
                </dl>
            </change-password>
            <cash-info>
                <dl class="mb-4 block cursor-pointer">
                    <dd class="w-full h-[3.125rem] px-4 bg-rgbawhite10 rounded-2xl flex items-center">
                        <div class="text-[0.8125rem] flex-1 overflow-hidden">
                            <p class="truncate">{{ t('userCenter.WithdrawalInformation') }}</p>
                        </div>
                        <svg class="w-5 h-5 ml-2 opacity-45 shrink-0" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960" fill="currentColor">
                            <path
                                d="M160-240v-313.85 16.08V-720v480Zm0-383.84h640v-83.85q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v83.85ZM456.85-180H172.31Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h615.38Q818-780 839-759q21 21 21 51.31v199.92q-32.69-21.92-70.92-34-38.23-12.08-80.39-12.08-45.84 0-87.11 15.35-41.27 15.35-73.89 42.34H160v243.85q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h267.46q2.61 16 6.69 30.81 4.08 14.8 10.39 29.19Zm221.84 76.15-8.15-47.69q-15.46-4.61-29.04-11.65-13.58-7.04-25.73-18.5L570.08-166l-30.77-50.31 36.77-31.54q-4.31-16.84-4.31-33.69 0-16.85 4.31-33.69l-36.77-31.54 30.77-50.31 45.69 15.7q11.77-11.47 25.54-18.5 13.77-7.04 29.23-11.66l8.15-47.69h60l8.15 47.69q15.47 4.62 29.24 11.66 13.77 7.03 25.53 18.5l45.7-15.7 30.76 50.31-36.76 31.54q4.3 16.84 4.3 33.69 0 16.85-4.3 33.69l36.76 31.54L847.31-166l-45.7-15.69q-12.15 11.46-25.73 18.5-13.57 7.04-29.04 11.65l-8.15 47.69h-60Zm30-94.61q34.54 0 58.81-24.27 24.27-24.27 24.27-58.81 0-34.54-24.27-58.81-24.27-24.27-58.81-24.27-34.54 0-58.81 24.27-24.27 24.27-24.27 58.81 0 34.54 24.27 58.81 24.27 24.27 58.81 24.27Z" />
                        </svg>
                    </dd>
                </dl>
            </cash-info>
        </pu-card>
        <pu-card theme="3" class="py-4">
            <log-out>
                <dl class="block cursor-pointer">
                    <dd class="w-full h-[3.125rem] px-4 bg-rgbawhite10 rounded-2xl flex items-center">
                        <div class="text-[0.8125rem] flex-1 overflow-hidden">
                            <p class="truncate">{{ t("userCenter.Logoutaccount") }}</p>
                        </div>
                        <svg class="w-5 h-5 ml-2 opacity-45 shrink-0" stroke="currentColor" stroke-width="4"
                            viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.9917 6H6V42H24" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M33 33L42 24L33 15" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16 23.9917H42" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </dd>
                </dl>
            </log-out>
        </pu-card>
        <!-- 添加版本号显示 - 放在底部 -->
        <div class="w-full h-8 flex items-center justify-center">
            <span class="text-xs opacity-50">{{t("userCenter.Version")}} {{ version }}</span>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>
    <pu-page title="Configuração" class="z-[999]" hideService v-else-if="currentTemplate.value == 'template_four'">
        <van-tabs class="mt-3 " @click-tab="gameLogsFunc" shrink
                style="--van-tabs-line-height: 2rem;--van-tabs-bottom-bar-height: 0px;--van-tabs-bottom-bar-color: #FFAF00;--van-padding-xs: 0.25rem;">
                <template v-for="item, index in tablist" :key="index">
                    <van-tab :name="item.value">
                        <template #title>
                            <div :class="item.value == logTypeRef ? 'm4-ten-btn' : 'bg-tablebg'"
                                class="h-8 px-3 rounded-full flex items-center">
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                    </van-tab>
                </template>
            </van-tabs>
        <div class="px-3">
           
            <div class="bg-tablebg2 rounded-xl overflow-hidden mt-5" v-if="logTypeRef == 'Conta'">
                <pu-card theme="3" v-if="memberRef && memberRef.id" class=" !mt-0 py-4 flex bg-tablebg  justify-center">
                    <div @click="playBtnAudioFunc()" class="relative">

                        <van-image :src="memberRef.head_portrait" width="4.25rem" height="4.25rem" radius="1rem"
                            class="border border-body-text">
                            <template #loading>
                                <img :src=appIcon class="w-full h-full object-cover">
                            </template>
                            <template #error>
                                <img :src=appIcon class="w-full h-full object-cover">
                            </template>
                        </van-image>
                        <em
                            class="w-6 h-6 bg-black/60  text-three  rounded-full absolute bottom-2 right-2 flex items-center justify-center">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M9.82843 5L7.82843 7H4V19H20V7H16.1716L14.1716 5H9.82843ZM9 3H15L17 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7L9 3ZM12 18C8.96243 18 6.5 15.5376 6.5 12.5C6.5 9.46243 8.96243 7 12 7C15.0376 7 17.5 9.46243 17.5 12.5C17.5 15.5376 15.0376 18 12 18ZM12 16C13.933 16 15.5 14.433 15.5 12.5C15.5 10.567 13.933 9 12 9C10.067 9 8.5 10.567 8.5 12.5C8.5 14.433 10.067 16 12 16Z">
                                </path>
                            </svg>
                        </em>
                        <ui-file-image @confirm="callbackFileAvatar"></ui-file-image>
                    </div>
                </pu-card>
                <div class="mt-2 px-2 py-4">
                    <div class=" flex items-center justify-between bg-theme py-2 rounded-xl">
                        <img :src="MineImg.profile_name" alt="" class="w-6 h-6 ml-3">
                        <!-- <span class="m4-text text-[0.68rem] ml-1">Meu Nome de Marca :</span> -->
                        <ui-input v-model="nickname" placeholder="Por favor, digite um apelido"
                            class="flex-1"></ui-input>
                        <img :src="MineImg.profile_edit" alt="" class="w-6 h-6 mx-3">
                    </div>
                    <div class=" flex items-center justify-between bg-theme py-4 rounded-xl mt-2">
                        <img :src="MineImg.profile_id" alt="" class="w-6 h-6 ml-3">
                        <span class="m4-text text-xl text-xs mx-2">ID :</span>
                        <p class="truncate flex-1">{{ memberRef.id }}</p>
                        <img :src="MineImg.profile_copy" alt="" class="w-6 h-6 mx-3"
                            @click.stop.prevent="copyInviteCode(memberRef.id)">
                    </div>
                    <div class="mt-4 m4-ten-btn text-center py-2 rounded-full w-[80%] mx-auto"
                        :class="auto_click ? '' : 'opacity-50 pointer-events-none'" @click="submit()">Salvar</div>
                </div>
            </div>
            <div class="bg-tablebg2 rounded-xl overflow-hidden mt-5" v-if="logTypeRef == 'Senha'">
                <div class="mt-2 px-2 py-4">
                    <div class=" flex items-center justify-between bg-theme py-2 rounded-xl">
                        <img :src="MineImg.profile_password" alt="" class="w-6 h-6 ml-3">
                        <ui-input v-model="dataRef.old_password" class="flex-1 "  type="password" :error="error_old_password"
                            placeholder="Digite a senha antiga">
                            <template #error>defina uma senha de 8 a 20 dígitos</template>
                        </ui-input>
                    </div>
                    <div class=" flex items-center justify-between bg-theme py-2 rounded-xl mt-3">
                        <img :src="MineImg.profile_password" alt="" class="w-6 h-6 ml-3">
                        <ui-input v-model="dataRef.password" class="flex-1" type="password" :error="error_password" placeholder="Digite nova senha">
                            <template #error>defina uma senha de 8 a 20 dígitos</template>
                        </ui-input>
                    </div>
                    <div class=" flex items-center justify-between bg-theme py-2 rounded-xl mt-3">
                        <img :src="MineImg.profile_password" alt="" class="w-6 h-6 ml-3">
                        <ui-input v-model="dataRef.password_repetition" class="flex-1" type="password" ::error="error_password_repetition" placeholder="Confirmar nova senha">
                            <template #error>defina uma senha de 8 a 20 dígitos</template>
                        </ui-input>
                    </div>
                    <div class="mt-4 m4-ten-btn text-center py-2 rounded-full w-[80%] mx-auto"
                        :class="auto_click_password ? '' : 'opacity-50 pointer-events-none'" @click="submitPassword()">Salvar</div>
                </div>

            </div>
            <div class="bg-tablebg2 rounded-xl overflow-hidden mt-5" v-if="logTypeRef == 'Informações de Saque'">
                <div class="mt-2 px-2 py-4">
                    <div class=" flex items-center justify-between bg-theme py-4 rounded-xl">
                        <img :src="MineImg.profile_name" alt="" class="w-6 h-6 ml-3">
                        <span class="m4-text text-xl text-xs mx-2">Nome :</span>
                        <p class="truncate flex-1 text-themetext3">{{ withdrawInfoRef.name||'- -'}}</p>
                    </div>
                    <div class=" flex items-center justify-between bg-theme py-4 rounded-xl mt-3">
                        <img :src="MineImg.profile_phone" alt="" class="w-6 h-6 ml-3">
                        <span class="m4-text text-xl text-xs mx-2">Número de Telefone :</span>
                        <p class="truncate flex-1 text-themetext3">{{ withdrawInfoRef.phone||'- -'}}</p>
                    </div>
                    <div class=" flex items-center justify-between bg-theme py-4 rounded-xl mt-3">
                        <img :src="MineImg.profile_email" alt="" class="w-6 h-6 ml-3">
                        <span class="m4-text text-xl text-xs mx-2">Email :</span>
                        <p class="truncate flex-1 text-themetext3">{{ withdrawInfoRef.email||'- -'}}</p>
                    </div>
                    <div class=" flex items-center justify-between bg-theme py-4 rounded-xl mt-3">
                        <img :src="MineImg.profile_card" alt="" class="w-6 h-6 ml-3">
                        <span class="m4-text text-xl text-xs mx-2">CPF ID :</span>
                        <p class="truncate flex-1 text-themetext3">{{ withdrawInfoRef.cpf||'- -'}}</p>
                    </div>
                </div>
            </div>
            <pu-card theme="3" class="py-4">
                <log-out>
                    <dl class="block cursor-pointer">
                        <dd
                            class="w-full h-[3.125rem] px-4 m4-nine-btn text-center font-bold rounded-full flex items-center">
                            <div class="text-[1rem] flex-1 overflow-hidden">
                                <p class="truncate">Sair da conta</p>
                            </div>
                            <!-- <svg class="w-5 h-5 ml-2 opacity-45 shrink-0" stroke="currentColor" stroke-width="4"
                                viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.9917 6H6V42H24" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M33 33L42 24L33 15" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16 23.9917H42" stroke-linecap="round" stroke-linejoin="round" />
                            </svg> -->
                        </dd>
                    </dl>
                </log-out>
            </pu-card>
        </div>

        <!-- 添加版本号显示 - 放在底部 -->
        <div class="w-full h-8 flex items-center justify-center">
            <span class="text-xs text-themetext3">Versão {{ version }}</span>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>
    <pu-page title="Configuração" class="z-[999]" hideService v-else-if="currentTemplate.value == 'template_five'">
        <div class="tabClass mt-2">
            <van-tabs class="flex items-center" @click-tab="gameLogsFunc" shrink
                    style="--van-tabs-line-height: 2rem;--van-tabs-bottom: 1px;--van-tabs-bottom-bar-height: 0;--van-tabs-bottom-bar-color: #258cff;--van-padding-xs: 0.25rem;">
                    <template v-for="item, index in tablist" :key="index">
                        <van-tab :name="item.value">
                            <template #title>
                                <div :class="item.value == logTypeRef ? 'text-inputborder border-b-2 border-inputborder relative bottom-0 z-[100]' : ''"
                                    class="h-8 px-3 flex items-center ">
                                    <span>{{ item.label }}</span>
                                </div>
                            </template>
                        </van-tab>
                    </template>
            </van-tabs>
            </div>
        <div class="px-3">
           
            <div class="bg-tablebg2 rounded-xl overflow-hidden mt-5" v-if="logTypeRef == 'Conta'">
                <pu-card theme="3" v-if="memberRef && memberRef.id">
                    <div @click="playBtnAudioFunc()" class="relative !mt-0 py-4 flex items-center justify-center">
                        <van-image :src="memberRef.head_portrait" width="4.25rem" height="4.25rem" radius="1rem"
                            class="border border-body-text">
                            <template #loading>
                                <img :src=appIcon class="w-full h-full object-cover">
                            </template>
                            <template #error>
                                <img :src=appIcon class="w-full h-full object-cover">
                            </template>
                        </van-image>
                        <em
                            class="w-6 h-6 bg-black/60  text-three  rounded-full absolute  flex items-center justify-center">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M9.82843 5L7.82843 7H4V19H20V7H16.1716L14.1716 5H9.82843ZM9 3H15L17 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7L9 3ZM12 18C8.96243 18 6.5 15.5376 6.5 12.5C6.5 9.46243 8.96243 7 12 7C15.0376 7 17.5 9.46243 17.5 12.5C17.5 15.5376 15.0376 18 12 18ZM12 16C13.933 16 15.5 14.433 15.5 12.5C15.5 10.567 13.933 9 12 9C10.067 9 8.5 10.567 8.5 12.5C8.5 14.433 10.067 16 12 16Z">
                                </path>
                            </svg>
                        </em>
                        <ui-file-image @confirm="callbackFileAvatar"></ui-file-image>
                    </div>
                </pu-card>
                <div class="mt-2 px-2 py-4">
                    <div class=" flex items-center justify-between bg-rgbablack30 py-2 rounded-xl">
                        <img :src="MineImg.profile_name" alt="" class="w-6 h-6 ml-3">
                        <!-- <span class="m4-text text-[0.68rem] ml-1">Meu Nome de Marca :</span> -->
                        <ui-input v-model="nickname" placeholder="Por favor, digite um apelido"
                            class="flex-1 border-0"></ui-input>
                        <img :src="MineImg.profile_edit" alt="" class="w-6 h-6 mx-3">
                    </div>
                    <div class=" flex items-center justify-between bg-rgbablack30 py-4 rounded-xl mt-2">
                        <img :src="MineImg.profile_id" alt="" class="w-6 h-6 ml-3">
                        <span class="m4-text text-xl text-xs mx-2">ID :</span>
                        <p class="truncate flex-1">{{ memberRef.id }}</p>
                        <img :src="MineImg.profile_copy" alt="" class="w-6 h-6 mx-3"
                            @click.stop.prevent="copyInviteCode(memberRef.id)">
                    </div>
                    <!-- <div class="mt-4 m4-ten-btn text-center py-2 rounded-full w-[80%] mx-auto"
                        :class="auto_click ? '' : 'opacity-50 pointer-events-none'" @click="submit()">Salvar</div> -->
                </div>
            </div>
            <div class="bg-tablebg2 rounded-xl overflow-hidden mt-5" v-if="logTypeRef == 'Senha'">
                <div class="mt-2 px-2 py-4">
                    <div class=" flex items-center justify-between bg-rgbablack30 py-2 rounded-xl">
                        <img :src="MineImg.profile_password" alt="" class="w-6 h-6 ml-3">
                        <ui-input v-model="dataRef.old_password" class="flex-1 "  type="password" :error="error_old_password"
                            placeholder="Digite a senha antiga">
                            <template #error>defina uma senha de 8 a 20 dígitos</template>
                        </ui-input>
                    </div>
                    <div class=" flex items-center justify-between bg-rgbablack30 py-2 rounded-xl mt-3">
                        <img :src="MineImg.profile_password" alt="" class="w-6 h-6 ml-3">
                        <ui-input v-model="dataRef.password" class="flex-1" type="password" :error="error_password" placeholder="Digite nova senha">
                            <template #error>defina uma senha de 8 a 20 dígitos</template>
                        </ui-input>
                    </div>
                    <div class=" flex items-center justify-between bg-rgbablack30 py-2 rounded-xl mt-3">
                        <img :src="MineImg.profile_password" alt="" class="w-6 h-6 ml-3">
                        <ui-input v-model="dataRef.password_repetition" class="flex-1" type="password" ::error="error_password_repetition" placeholder="Confirmar nova senha">
                            <template #error>defina uma senha de 8 a 20 dígitos</template>
                        </ui-input>
                    </div>
                    <!-- <div class="mt-4 m4-ten-btn text-center py-2 rounded-full w-[80%] mx-auto"
                        :class="auto_click_password ? '' : 'opacity-50 pointer-events-none'" @click="submitPassword()">Salvar</div> -->
                </div>

            </div>
            <div class="bg-tablebg2 rounded-xl overflow-hidden mt-5" v-if="logTypeRef == 'Informações de Saque'">
                <div class="mt-2 px-2 py-4">
                    <div class=" flex items-center justify-between bg-rgbablack30 py-4 rounded-xl">
                        <img :src="MineImg.profile_name" alt="" class="w-6 h-6 ml-3">
                        <span class="text-themetext3 text-xl text-xs mx-2">Nome :</span>
                        <p class="truncate flex-1 text-themetext3">{{ withdrawInfoRef.name||'- -'}}</p>
                    </div>
                    <div class=" flex items-center justify-between bg-rgbablack30 py-4 rounded-xl mt-3">
                        <img :src="MineImg.profile_phone" alt="" class="w-6 h-6 ml-3">
                        <span class="text-themetext3 text-xl text-xs mx-2">Número de Telefone :</span>
                        <p class="truncate flex-1 text-themetext3">{{ withdrawInfoRef.phone||'- -'}}</p>
                    </div>
                    <div class=" flex items-center justify-between bg-rgbablack30 py-4 rounded-xl mt-3">
                        <img :src="MineImg.profile_email" alt="" class="w-6 h-6 ml-3">
                        <span class="text-themetext3 text-xl text-xs mx-2">Email :</span>
                        <p class="truncate flex-1 text-themetext3">{{ withdrawInfoRef.email||'- -'}}</p>
                    </div>
                    <div class=" flex items-center justify-between bg-rgbablack30 py-4 rounded-xl mt-3">
                        <img :src="MineImg.profile_card" alt="" class="w-6 h-6 ml-3">
                        <span class="text-themetext3 text-xl text-xs mx-2">CPF ID :</span>
                        <p class="truncate flex-1 text-themetext3">{{ withdrawInfoRef.cpf||'- -'}}</p>
                    </div>
                </div>
            </div>
            <pu-card theme="3" class="py-4">
                <!-- <log-out> -->
                    <dl class="block cursor-pointer" v-if="logTypeRef != 'Informações de Saque'">
                        <dd
                            class="w-full h-[3.125rem] px-4 text-center font-bold rounded-full flex items-center">
                            <div class="text-[1rem] flex-1 overflow-hidden" v-if="logTypeRef == 'Conta'">
                                <div class="mt-4 bg-gradient-to-b from-themecardlinear1 to-themecardlinear2 text-center py-2 rounded-full w-[80%] mx-auto"
                                     :class="auto_click?'':'opacity-50 pointer-events-none'" 
                                @click="submit()">Salvar</div>
                                     
                            </div>
                            <div class="text-[1rem] flex-1 overflow-hidden" v-else-if="logTypeRef == 'Senha'">
                                <div class="mt-4 bg-gradient-to-b from-themecardlinear1 to-themecardlinear2 text-center py-2 rounded-full w-[80%] mx-auto"
                                     :class="auto_click_password ?'':'opacity-50 pointer-events-none'" 
                                @click="submitPassword()">Salvar</div>
                                     
                            </div>
                            <!-- <svg class="w-5 h-5 ml-2 opacity-45 shrink-0" stroke="currentColor" stroke-width="4"
                                viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.9917 6H6V42H24" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M33 33L42 24L33 15" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16 23.9917H42" stroke-linecap="round" stroke-linejoin="round" />
                            </svg> -->
                        </dd>
                    </dl>
                <!-- </log-out> -->
            </pu-card>
        </div>

        <!-- 添加版本号显示 - 放在底部 -->
        <div class="w-full h-8 flex items-center justify-center">
            <span class="text-xs text-themetext3">Versão {{ version }}</span>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
<style scoped>

.tabClass :deep(.van-tabs--line .van-tabs__wrap){ 
    background: #10121d;
    border-bottom: 1px solid rgba(255,255,255,0.3);
   }
</style>