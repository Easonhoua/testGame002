<script setup>
import { computed, ref, onUnmounted } from 'vue'
import { t } from '@/i18n'
import { useRoute, useRouter } from 'vue-router'
import { rechargeModel ,rechargePayInfoRef} from '@/model/account'
import { useThemeImages } from '@/utils/themeimg'

const CommonImg = useThemeImages().common 
const { starRechargeFunc  } = rechargeModel(true)
let cpfId = ref('')
let nome = ref('')
let input_focus = ref(false)
let valid = ref(false)
let cpfTouched = ref(false)

const route = useRoute()
const router = useRouter()
let amountRef = ref(route.query.amount || '')
let cpfError = ref('')

function validateCpfId() {
    const cpf = String(cpfId.value).trim()
    // CPF: 11位数字，简单校验
    if (!/^\d{11}$/.test(cpf)) {
        cpfError.value = t('Por favor insira 11 dígitos para CPF')
        return false
    }
    cpfError.value = ''
    return true
}

const autoclick = computed(() => {
    // 只有输入过CPF才校验，否则只判断nome
    if (!cpfTouched.value) {
        return nome.value.trim() !== ''
    }
    return validateCpfId() && nome.value.trim() !== ''
})

function submit() {
    if (!autoclick.value) return;
    valid.value = true;
    // 校验CPF
    if (!validateCpfId()) {
        valid.value = false;
        showToast({
				message: 'CPF ID digitado incorretamente',
				type: 'error',
				wordBreak: 'break-word',
			});
    }
    // 校验Nome
    if (!nome.value.trim()) {
        valid.value = false;
        showToast({
				message: 'Nome digitado incorretamente',
				type: 'error',
				wordBreak: 'break-word',
			});
    }
    if (valid.value) {
        starRechargeFunc(1, nome.value, cpfId.value, amountRef)
    }
}
function resetRate(amount, give_amount) {
    let _val = 0
    if(amount&&give_amount) {
        _val = (parseFloat(give_amount)/parseFloat(amount)*100).toFixed(0)
    }
    return _val
}

function handleBack() {
  if (route.query.amount) {
    const newQuery = { ...route.query }
    delete newQuery.amount
    router.replace({ path: route.path, query: newQuery }).then(() => {
      router.back()
    })
  } else {
    router.back()
  }
}
function clearId() {
    cpfId.value = ''
}
function clearName() {
    nome.value = ''
}

function onCpfInput(e) {
    // 只保留数字
    const onlyDigits = String(e.target.value).replace(/\D/g, '')
    cpfId.value = onlyDigits
    e.target.value = onlyDigits // 强制同步输入框内容，防止粘贴格式残留
    cpfTouched.value = true
}

onUnmounted(() => {
  // 删除amount参数
  if (route.query.amount) {
    const newQuery = { ...route.query }
    delete newQuery.amount
    router.replace({ path: route.path, query: newQuery })
  }
})

</script>

<template>
    <pu-page :title="t('pageTitle.LinkCPF')" class="z-[999]" v-if="currentTemplate.value=='template_five'">
        <template #header>
          <div class="flex items-center h-12 px-2">
            <img :src=CommonImg.btn_back class="w-7 h-7 cursor-pointer" @click="handleBack" />
            <span class="ml-2 text-lg font-bold">Vincular CPF</span>
          </div>
        </template>
        <pu-card theme="3" class="py-4">
            <section class="w-full p-3 mb-2 text-sm leading-none text-rgbawhite50  rounded-lg flex items-center">
                <img :src=CommonImg.icon_verify class="w-8 h-8 mr-2"/>
                <div class="text-sm text-themewhite font-bold">
                    Depósito de <span class="align-middle text-yellow-300">{{ currentUnit.value }} {{amountRef}}</span>, exigência de rotação 1x.
                </div>
            </section>
            <section class="leading-[1.5] text-xs w-full p-3 mb-2 text-sm leading-none text-rgbawhite50 border border-thirsmodelboder rounded-lg bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 flex items-center">
              Para garantir um depósito bem-sucedido, preencha as seguintes informações de pagamento.
            </section>
            <p class="mt-4 mb-1 text-themewhite font-bold" >CPF ID</p>
            <div class="M5-inputbox" :class="{'has-value': cpfId, 'input-error': cpfError}">
                <input type="text" inputmode="numeric" pattern="\\d*" v-model="cpfId" placeholder="Por favor, insira o CPF ID para pagamento" class="input input2" @input="onCpfInput" @blur="validateCpfId">
                <dd @click="clearId()" v-if="cpfId" class="px-2 mr-1 cursor-pointer">
                    <svg class="w-5 h-5 opacity-65" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </dd>
                <img :src=CommonImg.icon_card2 alt="" class="iconfont" v-if="!cpfId">
                <img :src=CommonImg.icon_card1 alt="" class="iconfont" v-if="cpfId">
            </div>
            <p v-if="cpfError" class="text-red-600 text-xs mt-1">{{ cpfError }}</p>
            <p class="mt-4 mb-1  text-themewhite font-bold">Nome</p>
            <div class="M5-inputbox" :class="{'has-value': nome}">
                <input type="text" v-model="nome" placeholder="Por favor,insira seu nome" class="input input2"  >
                <dd @click="clearName()" v-if="nome" class="px-2 mr-1 cursor-pointer">
                    <svg class="w-5 h-5 opacity-65" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </dd>
                <img :src=CommonImg.icon_user2 alt="" class="iconfont" v-if="!nome">
                <img :src=CommonImg.icon_user1 alt="" class="iconfont" v-if="nome">
            </div>
            <div class=" flex justify-center mt-8 w-full">
                <a @click="submit()" :class="autoclick ? '' : 'opacity-50 pointer-events-none'" class="w-full h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center ctx-theme__linear">
                    <span>Enviar</span>
                </a>
            </div>
        </pu-card>
    </pu-page>
    <pu-page :title="t('pageTitle.LinkCPF')" class="z-[999]" v-else>
        <template #header>
          <div class="flex items-center h-12 px-2">
            <img :src=CommonImg.btn_back class="w-7 h-7 cursor-pointer" @click="handleBack" />
            <span class="ml-2 text-lg font-bold">{{ t('account.Bind') }} CPF</span>
          </div>
        </template>
        <pu-card theme="3" class="py-4">
            <section class="w-full p-3 mb-2 text-sm leading-none text-rgbawhite50 border border-rgbawhite10 rounded-lg bg-gradient-to-b from-rgbawhite10 to-transparent flex items-center">
                <img :src=CommonImg.icon_verify class="w-10 h-10 mr-2"/>
                <div class="text-sm text-themewhite">
                    {{ t('account.DepositOf') }} <span class="align-middle text-yellow-300">{{ currentUnit.value }} {{amountRef}}</span>, {{ t('account.rotation1x') }}.
                </div>
            </section>
            <section class="leading-[1.5] text-xs w-full p-3 mb-2 text-sm leading-none text-rgbawhite50 border border-rgbawhite10 rounded-lg bg-gradient-to-b from-rgbawhite10 to-transparent flex items-center">
              {{ t('account.accountDetail2') }}
            </section>
            <p class="mt-4 mb-1 text-rgbablack80" >CPF ID</p>
            <div class="inputbox" :class="{'has-value': cpfId, 'input-error': cpfError}">
                <input type="text" inputmode="numeric" pattern="\\d*" v-model="cpfId" placeholder="Por favor, insira o CPF ID para pagamento" class="input input2" @input="onCpfInput" @blur="validateCpfId">
                <dd @click="clearId()" v-if="cpfId" class="px-2 mr-1 cursor-pointer">
                    <svg class="w-5 h-5 opacity-65" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </dd>
                <img :src=CommonImg.icon_card2 alt="" class="iconfont" v-if="!cpfId">
                <img :src=CommonImg.icon_card1 alt="" class="iconfont" v-if="cpfId">
            </div>
            <p v-if="cpfError" class="text-red-600 text-xs mt-1">{{ cpfError }}</p>
            <p class="mt-4 mb-1 text-rgbablack80">{{ t('account.name') }}</p>
            <div class="inputbox" :class="{'has-value': nome}">
                <input type="text" v-model="nome" :placeholder="t('account.entername')" class="input input2"  >
                <dd @click="clearName()" v-if="nome" class="px-2 mr-1 cursor-pointer">
                    <svg class="w-5 h-5 opacity-65" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </dd>
                <img :src=CommonImg.icon_user2 alt="" class="iconfont" v-if="!nome">
                <img :src=CommonImg.icon_user1 alt="" class="iconfont" v-if="nome">
            </div>
            <div class=" flex justify-center mt-8 w-full">
                <a @click="submit()" :class="autoclick ? '' : 'opacity-50 pointer-events-none'" class="w-full h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center ctx-theme__linear">
                    <span>{{ t('Send') }}</span>
                </a>
            </div>
        </pu-card>
    </pu-page>
</template>
<style  scoped>
.inputbox{
    border: 1px solid var(--color-rgbawhite10);
    background: var(--color-rgbawhite30);
    padding: 0.25rem;
    box-sizing: border-box;
    width: 100%;
    height: 3.5rem;
    line-height:2.5rem;
    margin-top: 0.25rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &.has-value {
        background:var(--color-theme);
        border:0.01rem solid var(--color-theme-light);
    }
    /* rgba(112,65,243,1) */
    
    &.input-error {
        border: 1px solid var(--color-two) !important; /* 红色边框 */
    }
    input{
        border: none;
        background: transparent;
        color: var(--color-rgbawhite50);
        font-size: 0.88rem;
        flex: 1;
    }
    .iconfont{
        width: 1.5rem;
        height: 1.5rem;
    }
}
    
.M5-inputbox{
    border: 1px solid var(--color-inputborder);
    background: linear-gradient(to right, var(--color-inputcolor1), var(--color-inputcolor2));
    padding: 0.25rem;
    box-sizing: border-box;
    width: 100%;
    height: 3.5rem;
    line-height:2.5rem;
    margin-top: 0.25rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &.has-value {
        background:var(--color-theme);
        border:0.01rem solid var(--color-theme-light);
    }
    /* rgba(112,65,243,1) */
    
    &.input-error {
        border: 1px solid var(--color-two) !important; /* 红色边框 */
    }
    input{
        border: none;
        background: transparent;
        color: var(--color-rgbawhite50);
        font-size: 0.88rem;
        flex: 1;
    }
    .iconfont{
        width: 1.5rem;
        height: 1.5rem;
    }
}
</style>
