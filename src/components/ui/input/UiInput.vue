<script setup>
import { computed, ref, useSlots } from 'vue'

const slot_default = !!useSlots().default
const slot_icon = !!useSlots().icon

const props = defineProps({
    label: [String, Number],
    placeholder: [String, Number],
    clear: Boolean,
    readonly: Boolean,
    type: {
        type: String,
        default: 'text'
    },
    theme: {
        type: String,
        default: 'default' // default body theme transparent
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    error: Boolean
})

const emits = defineEmits(['update:modelValue'])

let input_value = computed({
    get: () => props.modelValue,
    set: (e) => {
        emits('update:modelValue', e)
    }
})
let autoplay = ref(true)
let is_focus = ref(false)
let password_view = ref(false)

function togglePasswordView() {
    if(autoplay.value) {
        autoplay.value = false
        password_view.value = !password_view.value
        setTimeout(() => {
            autoplay.value = true
        }, 300);
    }
}
</script>
<template>
    <div>
        <p v-if="label" @click.stop.prevent class="mb-1 text-sm">{{label}}</p>
        <div :class="[
            {'border border-theme bg-body-bg': is_focus&&!error},
            {'border border-theme': !is_focus&&!error},
            {'border border-red-500 bg-body-bg': error},
        ]" class="w-full h-11 px-2 rounded-lg transition-all duration-300 relative flex items-center">
            <div v-if="slot_icon" class="px-1 h-full flex items-center flex-shrink-0">
                <slot name="icon"></slot>
            </div>
            <div class="h-full flex items-center flex-shrink-0">
                <slot name="left"></slot>
            </div>
            <div class="px-1 flex-1 overflow-hidden">
                <slot v-if="slot_default"></slot>
                <input 
                v-else 
                :type="password_view ? 'text' : type" 
                v-model="input_value" 
                :readonly="readonly" 
                :placeholder="placeholder" 
                @focus="is_focus = readonly ? false : true" 
                @blur="is_focus = false" 
                
                :class="{
                    'placeholder:text-default/50': theme == 'default',
                    'placeholder:text-rgbawhite50': theme == 'body',
                    'placeholder:text-rgbawhite80': theme == 'theme',
                }" 
                class="w-full h-8 bg-transparent text-base placeholder:text-sm outline-none">
            </div>
            <button v-if="clear&&input_value" @click="input_value = ''" class="px-1 h-full bg-transparent flex items-center flex-shrink-0">
                <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                </svg>
            </button>
            <button v-if="type == 'password'" @click="togglePasswordView()" class="px-1 h-full opacity-50 bg-transparent flex items-center flex-shrink-0">
                <svg  v-if="password_view" class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                </svg>
                <svg v-else class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.34268 18.7819L7.41083 18.2642L8.1983 15.3254C7.00919 14.8874 5.91661 14.2498 4.96116 13.4534L2.80783 15.6067L1.39362 14.1925L3.54695 12.0392C2.35581 10.6103 1.52014 8.87466 1.17578 6.96818L3.14386 6.61035C3.90289 10.8126 7.57931 14.0001 12.0002 14.0001C16.4211 14.0001 20.0976 10.8126 20.8566 6.61035L22.8247 6.96818C22.4803 8.87466 21.6446 10.6103 20.4535 12.0392L22.6068 14.1925L21.1926 15.6067L19.0393 13.4534C18.0838 14.2498 16.9912 14.8874 15.8021 15.3254L16.5896 18.2642L14.6578 18.7819L13.87 15.8418C13.2623 15.9459 12.6376 16.0001 12.0002 16.0001C11.3629 16.0001 10.7381 15.9459 10.1305 15.8418L9.34268 18.7819Z"></path>
                </svg>
            </button>
            <div class="h-full flex items-center flex-shrink-0">
                <slot name="right"></slot>
            </div>
        </div>
        <div v-if="error&&currentTemplate.value =='template_one'" class="w-full pb-3 text-red-500">
            <p class="text-[0.64rem] ">
                <slot name="error"></slot>
            </p>
        </div>
        <div v-if="error&&currentTemplate.value =='template_two'" class="w-full !text-texterror">
            <p class="text-[0.68rem] ">
                <slot name="error"></slot>
            </p>
        </div>
        <div v-if="error&&currentTemplate.value =='template_three'" class="w-full text-red-500">
            <p class="text-[0.68rem] ">
                <slot name="error"></slot>
            </p>
        </div>
        <div v-if="error&&currentTemplate.value =='template_four'" class="w-full !text-texterror">
            <p class="text-[0.68rem] ">
                <slot name="error"></slot>
            </p>
        </div>
        <div v-if="error&&currentTemplate.value =='template_five'" class="w-full !text-texterror">
            <p class="text-[0.68rem] ">
                <slot name="error"></slot>
            </p>
        </div>
    </div>
</template>