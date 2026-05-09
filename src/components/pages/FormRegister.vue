<script setup>
import { computed, ref } from 'vue'
import { t } from '@/i18n'
import { registerModel } from '@/model/user'
import { playBtnAudioFunc } from '@/utils/core'
import { useThemeImages } from '@/utils/themeimg'
import { isShowTerms } from '@/model/game'
const CommonImg = useThemeImages().common 
const LoginImg = useThemeImages().login


const { dataRef, registerFunc } = registerModel()

const showInfoModal = ref(false) // 控制弹窗显示
// 添加同意协议状态
const agreeTerms = ref(true)
// 添加年龄提示状态
const agreeAge = ref(true)

const error_phone = computed(()=> {
    let _val = false
    // const regex = new RegExp('^\\+55\\d{2}9\\d{8}$');
    // const regex = /^\d{6,50}$/;
    // const regex = /^\d{11}$/;
     // 添加第三位必须是9的11位手机号 20260116
     const regex = /^[0-9]{2}9[0-9]{8}$/;

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

function limitPhoneInput(event) {
    const value = event.target.value.replace(/\D/g, ''); // 移除非数字字符
    dataRef.value.username = value.slice(0, 11); // 限制最多11位
}

function limitPwInput(event) {
    const value = event.target.value;
    dataRef.value.password = value.slice(0, 20); // 限制最多20位
}




let auto_click = computed(()=> {
    return !error_phone.value&&!error_password.value&&!error_password_repetition.value&&dataRef.value.username&&dataRef.value.password&&dataRef.value.password_repetition&& 
    agreeTerms.value&&agreeAge.value
})
let autoplay = true

function onclickBtn() {
    playBtnAudioFunc()
    //上报注册
    window.jsBridge?.postMessage("registerClick", JSON.stringify({cid: window.ch,phone: dataRef.value.username}))

    if(auto_click.value&&autoplay) {
        autoplay = false
        registerFunc()
        setTimeout(() => {
            autoplay = true
        }, 2000);
    }
}

function closeTermsModal() {
    playBtnAudioFunc()
    showInfoModal.value = false
}

const openTermsModal = () => {
    showInfoModal.value = true
    playBtnAudioFunc()
}

</script>

<template>
    <div v-if="currentTemplate.value =='template_one'">
        <ui-input v-model="dataRef.username" :error="error_phone" placeholder="Número de telefone"
            @input="limitPhoneInput" >
            <template #icon>
                <img :src=CommonImg.icon_flagbr class="w-8 h-6 object-contain block">
            </template>
            <template #left>
                <span class="pr-1 text-sm">+55</span>
            </template>
            <template #error>Digite um número de telefone correto com 11 dígitos.</template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.password" type="password" :error="error_password" placeholder="Senha"
            @input="limitPwInput" >
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path>
                    </svg>
                </div>
            </template>
            <template #error>defina uma senha de 8 a 20 dígitos</template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.password_repetition" type="password" :error="error_password_repetition" placeholder="Confirmar senha"
        >
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path>
                    </svg>
                </div>
            </template>
            <template #error>defina uma senha de 8 a 20 dígitos</template>
        </ui-input>
        
        <!-- <p class="mb-3"></p>
        <ui-input v-model="dataRef.promoter" placeholder="Código de referência">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18.5858 17L16.7574 15.1716L18.1716 13.7574L22.4142 18L18.1716 22.2426L16.7574 20.8284L18.5858 19H15V17H18.5858Z"></path>
                    </svg>
                </div>
            </template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.channle_code" placeholder="Código do canal">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-rgbawhite50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z"></path>
                    </svg>
                </div>
            </template>
        </ui-input> -->

        <!-- 添加协议同意选项 -->
        <!-- isShowTerms -->
        <div class="flex items-start mt-4 px-1" v-if="isShowTerms">
            <div class="flex-shrink-0">
                <input
                    type="checkbox"
                    id="terms"
                    v-model="agreeTerms"
                    class="mt-1 w-4 h-4 accent-pwa cursor-pointer"
                />
            </div>
            <!-- 移除 for="terms" 取消自动关联 -->
            <div class="ml-2 text-[0.75rem] text-white/80">
                <span class="cursor-default">Tenho +18 anos, li e concordo com os Termos do Uso</span>
                <span 
                    @click="openTermsModal"
                    class="text-[#ffea00] cursor-pointer hover:underline"
                >
                    &lt;Acordo de Usuario&gt;
                </span>
            </div>
        </div>
         <!-- 添加年龄勾选 -->
         <div class="flex align-center items-center" v-else>
            <div class="flex-shrink-0 mr-2">
                <input
                    type="checkbox"
                    id="terms"
                    v-model="agreeAge"
                    class="mt-1 w-3 h-3 accent-pwa cursor-pointer"
                />
            </div>
            <span class="text-rgbawhite80 text-[0.6rem]">Confirmo que tenho pelo menos 18 anos de idade.</span>

         </div>

        <div class="w-full pt-8 flex justify-center">
            <button @click="onclickBtn()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="w-full h-10 px-4 !text-sm rounded-lg ctx-theme__linear capitalize">
                <span>Registro</span>
            </button>
        </div>

        <!-- 规则弹窗 -->
        <div v-if="showInfoModal" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
            <pu-card theme="1" class="relative w-[19rem] max-h-[80vh] rounded-2xl overflow-hidden  bg-gradient-to-b from-themecardlinear2 to-themecardlinear2">
                <!-- 标题和关闭按钮 -->
                <div class="relative flex items-center justify-between pt-5 mb-4">
                    <h2 class="absolute top-4 left-1/2 -translate-x-1/2 text-l font-bold"> Acordo do Usuário</h2>
                    <button 
                        @click="closeTermsModal()" 
                        class="absolute top-3 right-3 w-5 h-5 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <img :src=CommonImg.btn_close alt="关闭" class="w-3 h-3" />
                    </button>
                </div>
                
                <!-- 内容区域 -->
                <div class="relative z-10 px-3 py-4">
                    <div class="modal-scroll max-h-[50vh] overflow-y-auto pr-2 bg-default-bg rounded-xl p-2">
                        <article class="ctx-article p-mb text-sm">
                            <p>1. Para evitar disputas de apostas, os membros devem ler as regras da empresa antes de entrar no aplicativo. Uma vez que o jogador“ Eu concordo” Ao entrar nesta empresa para apostar, será considerado que você está de acordo com o Acordo do Usuário da empresa.</p>
                            <p>2. É de responsabilidade do membro garantir a confidencialidade de sua conta e informações de login. Quaisquer apostas online feitas com o seu número de conta e senha de membro serão consideradas válidas. Por favor, altere sua senha de tempos em tempos. A empresa não se responsabiliza por qualquer compensação de apostas feitas com conta e senha roubadas.</p>
                            <p>3. A empresa reserva-se o direito de alterar este acordo ou as regras do jogo ou as regras de confidencialidade de tempos em tempos. Os termos modificados entrarão em vigor na data especificada após a ocorrência da alteração, e o direito de tomar decisões finais sobre todas as disputas é reservado à empresa.</p>
                            <p>4. Os usuários devem ser maiores de idade de acordo com as leis do país de residência para usar cassino ou aplicativo online. As apostas online que não tenham sido submetidas com sucesso serão consideradas nulas.</p>
                            <p>5. Quando um jogador é desconectado automaticamente ou forçosamente do jogo antes que o resultado do jogo seja divulgado, isso não afetará o resultado do jogo.</p>
                        </article>
                    </div>
                </div>

                <!-- 底部按钮 -->
                <div class="w-full flex justify-center px-6 pb-6 pt-2">
                    <button @click="closeTermsModal()" :class="[
                            'w-full h-12 rounded-xl text-white font-bold text-lg shadow-lg ctx-theme__linear',]">
                        <span>Eu li e aceito</span>
                    </button>
                </div>
            </pu-card>
        </div>
    </div>
    <div v-if="currentTemplate.value =='template_two'" class="max-h-[18rem] overflow-y-auto">
        <ui-input v-model="dataRef.username" :error="error_phone" placeholder="Número de telefone"  :class="error_phone?'':'bg-default-bg rounded-lg'"
            @input="limitPhoneInput">
            <template #icon>
                <img :src="LoginImg.icon_flag_br" class="w-8 h-6 object-contain block">
            </template>
            <template #left>
                <span class="pr-1 text-sm">+55</span>
            </template>
            <template #error style="color:black !important;">Digite um número de telefone correto com 11 dígitos.</template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.password" type="password" :error="error_password" placeholder="Senha"  :class="error_password?'':'bg-default-bg rounded-lg'"
            @input="limitPwInput">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <img :src="LoginImg.icon_password" class="w-5 h-5 object-contain block" />
                </div>
            </template>
            <template #error style="color:black !important;">defina uma senha de 8 a 20 dígitos</template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.password_repetition" type="password" :error="error_password_repetition" placeholder="Confirmar senha"  :class="error_password_repetition?'':'bg-default-bg rounded-lg'">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <img :src="LoginImg.icon_password" class="w-5 h-5 object-contain block" />
                </div>
            </template>
            <template #error style="color:black !important;">defina uma senha de 8 a 20 dígitos</template>
        </ui-input>
        
        <!-- 添加协议同意选项 -->
        <!-- isShowTerms -->
        <div class="flex items-start mt-2 px-1" v-if="isShowTerms">
            <div class="flex-shrink-0">
                <input
                    type="checkbox"
                    id="terms"
                    v-model="agreeTerms"
                    class="mt-1 w-4 h-4 accent-pwa cursor-pointer"
                />
            </div>
            <!-- 移除 for="terms" 取消自动关联 -->
            <div class="ml-2 text-[0.75rem] text-white/80">
                <span class="cursor-default">Tenho +18 anos, li e concordo com os Termos do Uso</span>
                <span 
                    @click="openTermsModal"
                    class="text-[#ffea00] cursor-pointer hover:underline"
                >
                    &lt;Acordo de Usuario&gt;
                </span>
            </div>
        </div>
         <!-- 添加年龄勾选 -->
         <div class="flex align-center items-center" v-else>
            <div class="flex-shrink-0 mr-2">
                <input
                    type="checkbox"
                    id="terms"
                    v-model="agreeAge"
                    class="mt-1 w-3 h-3 accent-pwa cursor-pointer"
                />
            </div>
            <span class="text-rgbawhite80 text-[0.68rem]">Confirmo que tenho pelo menos 18 anos de idade.</span>

         </div>
        <!-- <p class="mb-3"></p>
        <ui-input v-model="dataRef.promoter" placeholder="Código de referência">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-body-text/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18.5858 17L16.7574 15.1716L18.1716 13.7574L22.4142 18L18.1716 22.2426L16.7574 20.8284L18.5858 19H15V17H18.5858Z"></path>
                    </svg>
                </div>
            </template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.channle_code" placeholder="Código do canal">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-body-text/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z"></path>
                    </svg>
                </div>
            </template>
        </ui-input> -->
        <div class="w-full pt-[3rem] flex justify-center">
            
            <button @click="onclickBtn()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="bg-btncolor w-full h-10 px-4 !text-sm rounded-lg capitalize text-themeblack">
                <span>Registro</span>
            </button>
            <!-- <img src="/imgs/login/img_5.png" class=" h-5 block absolute right-8 top-1/1 -translate-y-1/2" alt=""> -->
        </div>

        <!-- 规则弹窗 -->
        <!-- showInfoModal -->
        <div v-if="showInfoModal" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
            <pu-card theme="1" class="relative w-[19rem] max-h-[80vh] rounded-2xl overflow-hidden bg-gradient-to-b from-card1 to-card2">
                <!-- 标题和关闭按钮 -->
                <div class="relative flex items-center justify-between pt-5 mb-4">
                    <h2 class="absolute top-4 left-1/2 -translate-x-1/2 text-l font-bold"> Acordo do Usuário</h2>
                    <button 
                        @click="closeTermsModal()" 
                        class="absolute top-3 right-3 w-5 h-5 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                    <img :src="CommonImg.btn_close" alt="关闭" class="w-3 h-3">
                    </button>
                </div>
                
                <!-- 内容区域 -->
                <div class="relative z-10 px-3 py-4">
                    <div class="modal-scroll max-h-[50vh] overflow-y-auto pr-2 rounded-xl p-2">
                        <article class="ctx-article p-mb text-sm">
                            <p>1. Para evitar disputas de apostas, os membros devem ler as regras da empresa antes de entrar no aplicativo. Uma vez que o jogador“ Eu concordo” Ao entrar nesta empresa para apostar, será considerado que você está de acordo com o Acordo do Usuário da empresa.</p>
                            <p>2. É de responsabilidade do membro garantir a confidencialidade de sua conta e informações de login. Quaisquer apostas online feitas com o seu número de conta e senha de membro serão consideradas válidas. Por favor, altere sua senha de tempos em tempos. A empresa não se responsabiliza por qualquer compensação de apostas feitas com conta e senha roubadas.</p>
                            <p>3. A empresa reserva-se o direito de alterar este acordo ou as regras do jogo ou as regras de confidencialidade de tempos em tempos. Os termos modificados entrarão em vigor na data especificada após a ocorrência da alteração, e o direito de tomar decisões finais sobre todas as disputas é reservado à empresa.</p>
                            <p>4. Os usuários devem ser maiores de idade de acordo com as leis do país de residência para usar cassino ou aplicativo online. As apostas online que não tenham sido submetidas com sucesso serão consideradas nulas.</p>
                            <p>5. Quando um jogador é desconectado automaticamente ou forçosamente do jogo antes que o resultado do jogo seja divulgado, isso não afetará o resultado do jogo.</p>
                        </article>
                    </div>
                </div>

                <!-- 底部按钮 -->
                <div class="w-full flex justify-center px-6 pb-6 pt-2">
                    <button @click="closeTermsModal()" :class="[
                            'w-full h-12 rounded-xl text-black font-bold text-lg shadow-lg bg-one',]">
                        <span>Eu li e aceito</span>
                    </button>
                </div>
            </pu-card>
        </div>
    </div>
    <div v-if="currentTemplate.value =='template_three'">
        <ui-input v-model="dataRef.username" :error="error_phone" placeholder="Número de telefone"  :class="error_phone?'':'bg-default-bg rounded-lg'"
            @input="limitPhoneInput">
            <template #icon>
                <img :src="LoginImg.icon_flag_br" class="w-8 h-6 object-contain block">
            </template>
            <template #left>
                <span class="pr-1 text-sm">+55</span>
            </template>
            <template #error style="color:black !important;">Digite um número de telefone correto com 11 dígitos.</template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.password" type="password" :error="error_password" placeholder="Senha"  :class="error_password?'':'bg-default-bg rounded-lg'"
            @input="limitPwInput">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <img :src="LoginImg.icon_password" class="w-5 h-5 object-contain block" />
                </div>
            </template>
            <template #error style="color:black !important;">defina uma senha de 8 a 20 dígitos</template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.password_repetition" type="password" :error="error_password_repetition" placeholder="Confirmar senha"  :class="error_password_repetition?'':'bg-default-bg rounded-lg'">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <img :src="LoginImg.icon_password" class="w-5 h-5 object-contain block" />
                </div>
            </template>
            <template #error style="color:black !important;">defina uma senha de 8 a 20 dígitos</template>
        </ui-input>
        <!-- 添加年龄勾选 -->
        

        <!-- 添加协议同意选项 -->
        <!-- isShowTerms -->
        <div class="flex items-start mt-2 px-1" v-if="isShowTerms">
            <div class="flex-shrink-0">
                <input
                    type="checkbox"
                    id="terms"
                    v-model="agreeTerms"
                    class="mt-1 w-4 h-4 accent-pwa cursor-pointer"
                />
            </div>
            <!-- 移除 for="terms" 取消自动关联 -->
            <div class="ml-2 text-[0.75rem] text-white/80">
                <span class="cursor-default">Tenho +18 anos, li e concordo com os Termos do Uso</span>
                <span 
                    @click="openTermsModal"
                    class="text-[#ffea00] cursor-pointer hover:underline"
                >
                    &lt;Acordo de Usuario&gt;
                </span>
            </div>
        </div>
        <div class="flex align-center items-center" v-else>
            <div class="flex-shrink-0 mr-2">
                <input
                    type="checkbox"
                    id="terms"
                    v-model="agreeAge"
                    class="mt-1 w-3 h-3 accent-pwa cursor-pointer"
                />
            </div>
            <span class="text-rgbawhite80 text-[0.68rem]">Confirmo que tenho pelo menos 18 anos de idade.</span>

         </div>
        <!-- <p class="mb-3"></p>
        <ui-input v-model="dataRef.promoter" placeholder="Código de referência">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-body-text/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18.5858 17L16.7574 15.1716L18.1716 13.7574L22.4142 18L18.1716 22.2426L16.7574 20.8284L18.5858 19H15V17H18.5858Z"></path>
                    </svg>
                </div>
            </template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.channle_code" placeholder="Código do canal">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-body-text/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z"></path>
                    </svg>
                </div>
            </template>
        </ui-input> -->
        <div class="w-full pt-5 flex justify-center">
            
            <button @click="onclickBtn()" :class="auto_click?'':'opacity-50 pointer-events-none'" class="m3-theme-btn1 w-full h-10 px-4 !text-sm rounded-lg capitalize text-[#001806]">
                <span>Registro</span>
            </button>
            <!-- <img src="/imgs/login/img_5.png" class=" h-5 block absolute right-8 top-1/1 -translate-y-1/2" alt=""> -->
        </div>

        <!-- 规则弹窗 -->
        <div v-if="showInfoModal" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
            <pu-card theme="1" class="relative w-[19rem] max-h-[80vh] rounded-2xl overflow-hidden m3-theme-bg1">
                <!-- 标题和关闭按钮 -->
                <div class="relative flex items-center justify-between pt-5 mb-4">
                    <h2 class="absolute top-4 left-1/2 -translate-x-1/2 text-l font-bold text-themetext1"> Acordo do Usuário</h2>
                    <button 
                        @click="closeTermsModal()" 
                        class="absolute top-3 right-3 w-5 h-5 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                    <img :src="CommonImg.btn_close" alt="关闭" class="w-3 h-3">
                    </button>
                </div>
                
                <!-- 内容区域 -->
                <div class="relative z-10 px-3 py-4">
                    <div class="modal-scroll max-h-[50vh] overflow-y-auto pr-2 rounded-xl p-2 text-white">
                        <article class="ctx-article p-mb text-sm">
                            <p>1. Para evitar disputas de apostas, os membros devem ler as regras da empresa antes de entrar no aplicativo. Uma vez que o jogador“ Eu concordo” Ao entrar nesta empresa para apostar, será considerado que você está de acordo com o Acordo do Usuário da empresa.</p>
                            <p>2. É de responsabilidade do membro garantir a confidencialidade de sua conta e informações de login. Quaisquer apostas online feitas com o seu número de conta e senha de membro serão consideradas válidas. Por favor, altere sua senha de tempos em tempos. A empresa não se responsabiliza por qualquer compensação de apostas feitas com conta e senha roubadas.</p>
                            <p>3. A empresa reserva-se o direito de alterar este acordo ou as regras do jogo ou as regras de confidencialidade de tempos em tempos. Os termos modificados entrarão em vigor na data especificada após a ocorrência da alteração, e o direito de tomar decisões finais sobre todas as disputas é reservado à empresa.</p>
                            <p>4. Os usuários devem ser maiores de idade de acordo com as leis do país de residência para usar cassino ou aplicativo online. As apostas online que não tenham sido submetidas com sucesso serão consideradas nulas.</p>
                            <p>5. Quando um jogador é desconectado automaticamente ou forçosamente do jogo antes que o resultado do jogo seja divulgado, isso não afetará o resultado do jogo.</p>
                        </article>
                    </div>
                </div>

                <!-- 底部按钮 -->
                <div class="w-full flex justify-center px-6 pb-6 pt-2">
                    <button @click="closeTermsModal()" :class="[
                            'w-full h-12 rounded-xl text-black font-bold text-lg shadow-lg m3-theme-btn1',]">
                        <span>Eu li e aceito</span>
                    </button>
                </div>
            </pu-card>
        </div>
    </div>
    <div v-if="currentTemplate.value =='template_four'">
        <ui-input v-model="dataRef.username" :error="error_phone" placeholder="Número de telefone"  :class="error_phone?'':' bg-default-bg rounded-lg'"
            @input="limitPhoneInput">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <img :src="LoginImg.icon_password_phone" class="w-5 h-5 object-contain block" />
                </div>
                <img :src="LoginImg.icon_flag_br" class=" h-5 object-contain block">
            </template>
            <template #left>
                <span class="pr-1 text-sm text-themetext0">+55</span>
            </template>
            <template #error>Digite um número de telefone correto com 11 dígitos.</template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.password" type="password" :error="error_password" placeholder="Senha"  :class="error_password?'':' bg-default-bg rounded-lg'"
            @input="limitPwInput">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <img :src="LoginImg.icon_password" class="w-5 h-5 object-contain block" />
                </div>
            </template>
            <template #error>defina uma senha de 8 a 20 dígitos</template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.password_repetition" type="password" :error="error_password_repetition" placeholder="Confirmar senha"  :class="error_password_repetition?'':'  bg-default-bg rounded-lg'">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <img :src="LoginImg.icon_password" class="w-5 h-5 object-contain block" />
                </div>
            </template>
            <template #error>defina uma senha de 8 a 20 dígitos</template>
        </ui-input>
        <!-- <p class="mb-3"></p>
        <ui-input v-model="dataRef.promoter" placeholder="Código de referência">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-body-text/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18.5858 17L16.7574 15.1716L18.1716 13.7574L22.4142 18L18.1716 22.2426L16.7574 20.8284L18.5858 19H15V17H18.5858Z"></path>
                    </svg>
                </div>
            </template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.channle_code" placeholder="Código do canal">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-body-text/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z"></path>
                    </svg>
                </div>
            </template>
        </ui-input> -->
        

        <!-- 添加协议同意选项 -->
        <!-- isShowTerms -->
        <div class="flex items-start mt-4 px-1" v-if="isShowTerms">
            <div class="flex-shrink-0">
                <input
                    type="checkbox"
                    id="terms"
                    v-model="agreeTerms"
                    class="mt-1 w-4 h-4 accent-pwa cursor-pointer"
                />
            </div>
            <!-- 移除 for="terms" 取消自动关联 -->
            <div class="ml-2 text-[0.75rem] text-white/80">
                <span class="cursor-default">Tenho +18 anos, li e concordo com os Termos do Uso</span>
                <span 
                    @click="openTermsModal"
                    class="text-[#ffea00] cursor-pointer hover:underline"
                >
                    &lt;Acordo de Usuario&gt;
                </span>
            </div>
        </div>
         <!-- 添加年龄勾选 -->
         <div class="flex align-center items-center" v-else>
            <div class="flex-shrink-0 mr-2">
                <input
                    type="checkbox"
                    id="terms"
                    v-model="agreeAge"
                    class="mt-1 w-3 h-3 accent-pwa cursor-pointer"
                />
            </div>
            <span class="text-rgbawhite80 text-[0.68rem]">Confirmo que tenho pelo menos 18 anos de idade.</span>

         </div>

        <div class="w-full pt-8 flex justify-center">
            
            <button @click="onclickBtn()"  class=" w-full h-9 px-4 !text-sm  rounded-[2rem] m4-nine-btn text-theme font-[600]">
                <span>Registro</span>
            </button>
            <!-- <img src="/imgs/login/img_5.png" class=" h-5 block absolute right-8 top-1/1 -translate-y-1/2" alt=""> -->
        </div>

        <!-- 规则弹窗 showInfoModal-->
        <div v-if="showInfoModal" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
            <pu-card theme="1" class="relative w-[19rem] max-h-[80vh] rounded-2xl overflow-hidden bg-tablebg">
                <!-- 标题和关闭按钮 -->
                <div class="relative flex items-center justify-between pt-5 mb-4">
                    <h2 class="absolute top-4 left-1/2 -translate-x-1/2 text-l font-bold m4-text"> Acordo do Usuário</h2>
                    <button 
                        @click="closeTermsModal()" 
                        class="absolute top-3 right-3 w-5 h-5 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <img :src="LoginImg.icon_colse" alt="关闭" class="w-3 h-3" />
                    </button>
                </div>
                
                <!-- 内容区域 -->
                <div class="relative z-10 px-3 py-4">
                    <div class="modal-scroll max-h-[50vh] overflow-y-auto pr-2 rounded-xl p-2 text-themetext3">
                        <article class="ctx-article p-mb text-sm">
                            <p>1. Para evitar disputas de apostas, os membros devem ler as regras da empresa antes de entrar no aplicativo. Uma vez que o jogador“ Eu concordo” Ao entrar nesta empresa para apostar, será considerado que você está de acordo com o Acordo do Usuário da empresa.</p>
                            <p>2. É de responsabilidade do membro garantir a confidencialidade de sua conta e informações de login. Quaisquer apostas online feitas com o seu número de conta e senha de membro serão consideradas válidas. Por favor, altere sua senha de tempos em tempos. A empresa não se responsabiliza por qualquer compensação de apostas feitas com conta e senha roubadas.</p>
                            <p>3. A empresa reserva-se o direito de alterar este acordo ou as regras do jogo ou as regras de confidencialidade de tempos em tempos. Os termos modificados entrarão em vigor na data especificada após a ocorrência da alteração, e o direito de tomar decisões finais sobre todas as disputas é reservado à empresa.</p>
                            <p>4. Os usuários devem ser maiores de idade de acordo com as leis do país de residência para usar cassino ou aplicativo online. As apostas online que não tenham sido submetidas com sucesso serão consideradas nulas.</p>
                            <p>5. Quando um jogador é desconectado automaticamente ou forçosamente do jogo antes que o resultado do jogo seja divulgado, isso não afetará o resultado do jogo.</p>
                        </article>
                    </div>
                </div>

                <!-- 底部按钮 -->
                <div class="w-full flex justify-center px-6 pb-6 pt-2">
                    <button @click="closeTermsModal()" :class="[
                            'w-full h-12 rounded-xl  font-bold text-lg shadow-lg m4-ten-btn',]">
                        <span>Eu li e aceito</span>
                    </button>
                </div>
            </pu-card>
        </div>
    </div>
    <div v-if="currentTemplate.value =='template_five'" class="max-h-[22rem] overflow-y-auto rounded-lg">
        <ui-input v-model="dataRef.username" :error="error_phone" placeholder="Número de telefone"  :class="error_phone?'':'bg-btn1_bg rounded-lg'"
            @input="limitPhoneInput">
            <template #icon>
                <img :src="LoginImg.icon_flag_br" class="w-8 h-6 object-contain block">
            </template>
            <template #left>
                <span class="pr-1 text-sm">+55</span>
            </template>
            <template #error style="color:black !important;">Digite um número de telefone correto com 11 dígitos.</template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.password" type="password" :error="error_password" placeholder="Senha"  :class="error_password?'':'bg-btn1_bg rounded-lg'"
            @input="limitPwInput">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <img :src="LoginImg.icon_password" class="w-5 h-5 object-contain block" />
                </div>
            </template>
            <template #error style="color:black !important;">defina uma senha de 8 a 20 dígitos</template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.password_repetition" type="password" :error="error_password_repetition" placeholder="Confirmar senha"  :class="error_password_repetition?'':'bg-btn1_bg rounded-lg'">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <img :src="LoginImg.icon_password" class="w-5 h-5 object-contain block" />
                </div>
            </template>
            <template #error style="color:black !important;">defina uma senha de 8 a 20 dígitos</template>
        </ui-input>
        
        <!-- 添加协议同意选项 -->
        <!-- isShowTerms -->
        <div class="flex items-start mt-2 px-1" v-if="isShowTerms">
            <div class="flex-shrink-0">
                <input
                    type="checkbox"
                    id="terms"
                    v-model="agreeTerms"
                    class="mt-1 w-4 h-4 accent-pwa cursor-pointer"
                />
            </div>
            <!-- 移除 for="terms" 取消自动关联 -->
            <div class="ml-2 text-[0.75rem] text-white/80">
                <span class="cursor-default">Tenho +18 anos, li e concordo com os Termos do Uso</span>
                <span 
                    @click="openTermsModal"
                    class="text-[#ffea00] cursor-pointer hover:underline"
                >
                    &lt;Acordo de Usuario&gt;
                </span>
            </div>
        </div>
         <!-- 添加年龄勾选 -->
         <div class="flex align-center items-center" v-else>
            <div class="flex-shrink-0 mr-2">
                <input
                    type="checkbox"
                    id="terms"
                    v-model="agreeAge"
                    class="mt-1 w-3 h-3 accent-pwa cursor-pointer"
                />
            </div>
            <span class="text-rgbawhite80 text-[0.68rem]">Confirmo que tenho pelo menos 18 anos de idade.</span>

         </div>
        <!-- <p class="mb-3"></p>
        <ui-input v-model="dataRef.promoter" placeholder="Código de referência">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-body-text/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18.5858 17L16.7574 15.1716L18.1716 13.7574L22.4142 18L18.1716 22.2426L16.7574 20.8284L18.5858 19H15V17H18.5858Z"></path>
                    </svg>
                </div>
            </template>
        </ui-input>
        <p class="mb-3"></p>
        <ui-input v-model="dataRef.channle_code" placeholder="Código do canal">
            <template #icon>
                <div class="w-8 flex justify-center">
                    <svg class="w-5 h-5 text-body-text/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z"></path>
                    </svg>
                </div>
            </template>
        </ui-input> -->
        <div class="w-full pt-[2.5rem] flex justify-center">
            
            <button @click="onclickBtn()" :class="auto_click?'':' pointer-events-none'" class="rounded-lg bg-gradient-to-r from-gold-500 to-gold-100 w-full h-10 px-4 !text-sm rounded-lg capitalize text-themewhite">
                <span>Registro</span>
            </button>
            <!-- <img src="/imgs/login/img_5.png" class=" h-5 block absolute right-8 top-1/1 -translate-y-1/2" alt=""> -->
        </div>

        <!-- 规则弹窗 -->
        <!-- showInfoModal -->
        <div v-if="showInfoModal" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
            <pu-card theme="1" class="relative w-[19rem] max-h-[80vh] rounded-2xl overflow-hidden bg-gradient-to-b from-card1 to-card2">
                <!-- 标题和关闭按钮 -->
                <div class="relative flex items-center justify-between pt-5 mb-4">
                    <h2 class="absolute top-4 left-1/2 -translate-x-1/2 text-l font-bold"> Acordo do Usuário</h2>
                    <button 
                        @click="closeTermsModal()" 
                        class="absolute top-3 right-3 w-5 h-5 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                    <img :src="CommonImg.btn_close" alt="关闭" class="w-3 h-3">
                    </button>
                </div>
                
                <!-- 内容区域 -->
                <div class="relative z-10 px-3 py-4">
                    <div class="modal-scroll max-h-[50vh] overflow-y-auto pr-2 rounded-xl p-2">
                        <article class="ctx-article p-mb text-sm">
                            <p>1. Para evitar disputas de apostas, os membros devem ler as regras da empresa antes de entrar no aplicativo. Uma vez que o jogador“ Eu concordo” Ao entrar nesta empresa para apostar, será considerado que você está de acordo com o Acordo do Usuário da empresa.</p>
                            <p>2. É de responsabilidade do membro garantir a confidencialidade de sua conta e informações de login. Quaisquer apostas online feitas com o seu número de conta e senha de membro serão consideradas válidas. Por favor, altere sua senha de tempos em tempos. A empresa não se responsabiliza por qualquer compensação de apostas feitas com conta e senha roubadas.</p>
                            <p>3. A empresa reserva-se o direito de alterar este acordo ou as regras do jogo ou as regras de confidencialidade de tempos em tempos. Os termos modificados entrarão em vigor na data especificada após a ocorrência da alteração, e o direito de tomar decisões finais sobre todas as disputas é reservado à empresa.</p>
                            <p>4. Os usuários devem ser maiores de idade de acordo com as leis do país de residência para usar cassino ou aplicativo online. As apostas online que não tenham sido submetidas com sucesso serão consideradas nulas.</p>
                            <p>5. Quando um jogador é desconectado automaticamente ou forçosamente do jogo antes que o resultado do jogo seja divulgado, isso não afetará o resultado do jogo.</p>
                        </article>
                    </div>
                </div>

                <!-- 底部按钮 -->
                <div class="w-full flex justify-center px-6 pb-6 pt-2">
                    <button @click="closeTermsModal()" :class="[
                            'w-full h-12 rounded-xl text-black font-bold text-lg shadow-lg bg-one',]">
                        <span>Eu li e aceito</span>
                    </button>
                </div>
            </pu-card>
        </div>
    </div>
</template>

<style scoped>
.modal-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.modal-scroll::-webkit-scrollbar {
    width: 4px;
}

.modal-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.modal-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
}
</style>