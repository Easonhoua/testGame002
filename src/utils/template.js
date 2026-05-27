import { computed, readonly, ref } from 'vue'

export const TEMPLATE_CONFIG = {
  DEFAULT: 'template_one',    // 默认模板1mx39
  TEMPLATE_A: 'template_two',  // 模板A 77jgs
  TEMPLATE_B: 'template_three',   // 模板B
  TEMPLATE_C: 'template_four',   // 模板C
  TEMPLATE_D: 'template_five'   // 模板D
}

const currentTemplate = ref(import.meta.env.VITE_TEMPLATE || TEMPLATE_CONFIG.DEFAULT)
const currentUnit = ref(import.meta.env.VITE_UNIT || 'R$')

const templateState = {
  currentTemplate: readonly(currentTemplate),
  currentUnit: readonly(currentUnit),
  isDefault: computed(() => currentTemplate.value === TEMPLATE_CONFIG.DEFAULT),
  isTemplateA: computed(() => currentTemplate.value === TEMPLATE_CONFIG.TEMPLATE_A),
  isTemplateB: computed(() => currentTemplate.value === TEMPLATE_CONFIG.TEMPLATE_B),
  isTemplateC: computed(() => currentTemplate.value === TEMPLATE_CONFIG.TEMPLATE_C),
  isTemplateD: computed(() => currentTemplate.value === TEMPLATE_CONFIG.TEMPLATE_D),
}

export const useTemplate = () => templateState
