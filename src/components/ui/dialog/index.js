import { ref } from 'vue'

export var optionRef = ref({
    show: false,
    title: '',
    content: '',
    hideCancel: false,
    hideConfirm: false,
    cancelText: '',
    confirmText: ''
})

export const promist = ref(null)
export const resolve = ref(null)
export const reject = ref(null)

export function dialog(options) {
    if(optionRef.value.show) return
    if(typeof(options) == 'string') {
        optionRef.value.content = options
    }else {
        optionRef.value.title = options.title||''
        optionRef.value.content = options.content||''
        optionRef.value.hideCancel = options.hideCancel||false
        optionRef.value.hideConfirm = options.hideConfirm||false
        optionRef.value.cancelText = options.cancelText||''
        optionRef.value.confirmText = options.confirmText||''
    }
    optionRef.value.show = true
    promist.value = new Promise((_res, _rej) => {
        resolve.value = _res
        reject.value = _rej
    })
    return promist.value
}
export function confirmFunc() {
    optionRef.value.show = false
    resolve.value()
}
export function cancelFunc() {
    optionRef.value.show = false
    reject.value()
}