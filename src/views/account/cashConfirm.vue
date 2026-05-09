<script setup>
import { computed, onMounted, ref } from 'vue'
import { t, fn } from '@/i18n'
import { useRoute, useRouter } from 'vue-router'
import { withdrawalAmountRef, withdrawalChannelIndexRef, withdrawalModel } from '@/model/account'
import { useThemeImages } from '@/utils/themeimg'

const CommonImg = useThemeImages().common 
const route = useRoute()
const router = useRouter()
let cpfTouched = ref(false)
const { channelListRef, withdrawInfoRef, dataRef, starWithdrawalFunc, getWithdrawInfoFunc } = withdrawalModel({ch: true})

let input_focus = ref(false)
let cash_type_list = ref([
    {label: 'CPF', value: 'CPF'},
    {label: 'Email', value: 'EMAIL'},
    {label: 'PHONE', value: 'PHONE'},
])
let cash_type = ref('CPF')
let channel_index = ref(0)
let channel_curr = computed(()=> {
    return channelListRef.value[channel_index.value]||{}
})
let autoclick = computed(()=> {
    let res = true
    if(!dataRef.value.amount) res = false
    if(!dataRef.value.name) res = false
    if(!dataRef.value.cpf) res = false
    if(cash_type.value=='EMAIL'&&!dataRef.value.email) res = false
    if(cash_type.value=='PHONE'&&!dataRef.value.phone) res = false


    if(cash_type.value=='EMAIL'&&emailError.value) res = false
    if(cash_type.value=='PHONE'&&phoneError.value) res = false
    if(cpfError.value) res = false 
    
    
    return res
})
let is_readonly = ref({
    cpf: false,
    name: false,
    email: false,
    phone: false,
})

// 新增：CPF校验和提示
// let cpfError = ref('')
// function validateCpfId() {
//     if (cash_type.value === 'CPF') {
//         if (!dataRef.value.cpf || dataRef.value.cpf.length !== 11) {
//             cpfError.value = 'Por favor insira 11 dígitos para CPF'
//         } else {
//             cpfError.value = ''
//         }
//     } else {
//         cpfError.value = ''
//     }
// }

const emailError = computed(() => {
  const email = dataRef.value.email?.trim()
  if (!email) return false

  const regex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

  return !regex.test(email)
})

const phoneError = computed(() => {
    let _val = false

     // 添加第三位必须是9的11位手机号 20260116
     const regex = /^[0-9]{2}9[0-9]{8}$/;

    let regres = regex.test(dataRef.value.phone)
    if(!regres&&dataRef.value.phone) {
        _val = true
    }
    return _val
})

const cpfError = computed(() => {
  const cpf = dataRef.value.cpf?.trim()
  if (!cpf) return false

  // 只允许 11 位数字
  const regex = /^\d{11}$/
  return !regex.test(cpf)
})


function choiceChannel(item) {
    cash_type.value = item.value
}
function submit() {
    if(autoclick.value) {
        dataRef.value.payment_channel = channel_curr.value.channle
        dataRef.value.type = cash_type.value
        starWithdrawalFunc()
    }
}
function onCpfInput() {
    // 只保留数字
    const onlyDigits = String(dataRef.value.cpf).replace(/\D/g, '')
    dataRef.value.cpf = onlyDigits
    cpfTouched.value = true
}

function onPhoneInput() {
    // 只保留数字
    const onlyDigits = String(dataRef.value.phone).replace(/\D/g, '')
    dataRef.value.phone = onlyDigits
    // cpfTouched.value = true
}

onMounted(()=> {
    dataRef.value.amount = withdrawalAmountRef.value
    channel_index.value = withdrawalChannelIndexRef.value
    if(!withdrawalAmountRef.value) {
        router.back()
    }else {
        getWithdrawInfoFunc().then(()=> {
            if(withdrawInfoRef.value&&withdrawInfoRef.value.cpf) {
                dataRef.value.cpf = withdrawInfoRef.value.cpf
                is_readonly.value.cpf = true
            }
            if(withdrawInfoRef.value&&withdrawInfoRef.value.name) {
                dataRef.value.name = withdrawInfoRef.value.name
                is_readonly.value.name = true
            }
            if(withdrawInfoRef.value&&withdrawInfoRef.value.email) {
                dataRef.value.email = withdrawInfoRef.value.email
                is_readonly.value.email = true
            }
            if(withdrawInfoRef.value&&withdrawInfoRef.value.phone) {
                dataRef.value.phone = withdrawInfoRef.value.phone
                is_readonly.value.phone = true
            }
        })
    }
})
</script>

<template>
    <pu-page title="Saque" class="z-[999]">
        <pu-card theme="3" class="py-4">
            <section class="mb-5 text-center">
                <h5 class="mb-1 text-sm opacity-65">Saldo de demo:</h5>
                <p>
                    <img :src=CommonImg.img_money class="w-6 h-6 mr-2 inline-block align-middle">
                    <span class="text-4xl align-middle" :class="currentTemplate.value=='template_one'?'':'text-four'">{{ fn(withdrawalAmountRef) }}</span>
                </p>
            </section>
            <p class="mb-2 text-sm opacity-85">Tipo de ID Fiscal</p>
            <section class="h-8 mb-5 overflow-hidden">
                <div class="w-full h-10 pb-2 overflow-x-auto">
                    <ul class="h-8 text-sm whitespace-nowrap flex">
                        <template v-for="item,index in cash_type_list" :key="index">
                            <li @click="choiceChannel(item)" :class="item.value==cash_type?'border-one':'border-rgbawhite30'" class="min-w-[33.33%] h-full px-1.5 border-b-2 flex items-center justify-center shrink-0">
                                <span :class="item.value==cash_type?'text-one':'text-rgbawhite80'">{{ item.label }}</span>
                            </li>
                        </template>
                    </ul>
                </div>
            </section>
            <template v-if="cash_type=='EMAIL'">
                <ui-input v-model="dataRef.email" label="Email ID" :readonly="is_readonly.email" placeholder="Por favor, digite o Email ID..."  :error="emailError">
                    <template #error>Formato de e-mail inválido</template>
                </ui-input>
                <br> 
            </template>
            <template v-if="cash_type=='PHONE'">
                <ui-input v-model="dataRef.phone" label="PHONE ID" :readonly="is_readonly.phone" placeholder="Por favor, digite o PHONE ID..." :error="phoneError" @input="onPhoneInput()">
                    <template #error>Digite um número de telefone correto com 11 dígitos.</template>
                </ui-input>
                <br>
            </template>
            <ui-input v-model="dataRef.name" label="Nome do beneficiário" :readonly="is_readonly.name" placeholder="Por favor, informe o nome do beneficiário"></ui-input>
            <br>
            <ui-input type="text" v-model="dataRef.cpf" label="CPF" :readonly="is_readonly.cpf" placeholder="Por favor, digite o CPF..."  :error="cpfError" @input="onCpfInput()" >
                <template #error v-if="cpfError">Por favor insira 11 dígitos para CPF</template>
            </ui-input>
            <!-- <div v-if="cpfError" class="text-red-500 text-xs mt-1">{{ cpfError }}</div> -->
            <br>
            <div class="flex justify-center">
                <a @click="submit()" :class="autoclick?'':'opacity-50 pointer-events-none'"
                v-if="currentTemplate.value=='template_one' || currentTemplate.value=='template_five'"
                 class="w-full h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center ctx-theme__linear">
                    <span>Saque</span>
                </a>
                <a @click="submit()" :class="autoclick?'':'opacity-50 pointer-events-none'"
                v-if="currentTemplate.value=='template_two'"
                 class="w-full h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center bg-btncolor  text-themeblack">
                    <span>Saque</span>
                </a>
                <a @click="submit()" :class="autoclick?'':'opacity-50 pointer-events-none'"
                v-if="currentTemplate.value=='template_three'"
                 class="w-full h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center m3-theme-btn1">
                    <span>Saque</span>
                </a>
                <a @click="submit()" :class="autoclick?'':'opacity-50 pointer-events-none'"
                v-if="currentTemplate.value=='template_four'"
                 class="w-full h-[3.125rem] px-3 text-sm rounded-lg cursor-pointer flex items-center justify-center m4-nine-btn">
                    <span>Saque</span>
                </a>
            </div>
            <article class="mt-12 px-4 text-xs text-rgbawhite50 text-center">
                <p>Fornecer informações precisas de e-mail e telefone ajuda a acelerar o processo de pagamento do banco.</p>
            </article>
        </pu-card>
    </pu-page>
</template>