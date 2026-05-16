import { createI18n } from 'vue-i18n'
import { useSessionStorage } from '@vueuse/core'
import { resetAmountFunc } from '@/utils/core'
import br from './language/br'
import en from './language/en'
import zhCH from './language/zh-ch'

export const $unit = import.meta.env.VITE_LOCALE || 'pt'
sessionStorage.setItem('language', $unit)

var messages = {
    'pt': br,
    'th': en,
    'zh-CN': zhCH,
}
export var languageList = []
for(let i in messages) {
    languageList.push({label: messages[i].title, value: i})
}

const DEFAULT_LANGUAGE = 'pt'
export const currentLanguageRef = useSessionStorage('language', DEFAULT_LANGUAGE)

let index = languageList.findIndex(item=> {
    return item.value == currentLanguageRef.value
})
if(index == -1) { currentLanguageRef.value = DEFAULT_LANGUAGE }

export const i18n = createI18n({
    legacy: false,
    locale: currentLanguageRef.value,
    fallbackLocale: DEFAULT_LANGUAGE,
    globalInjection: true,
    messages: messages
})


export function fm(num, toFixed) {
    let _val = resetAmountFunc(num, toFixed)
    return `${$unit} ${_val}`
}
export function fn(num, toFixed) {
    let _val = resetAmountFunc(num, toFixed)
    return _val
}

export const t = i18n.global.t