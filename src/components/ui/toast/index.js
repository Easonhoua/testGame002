import { createApp, reactive, ref } from 'vue'
import toastWidget from './UiToast.vue'
var params = reactive({
    show: false,
    message: '',
    type: null, // success fail
    theme: 0
})
var duration = ref(3000)

const $uitoast = createApp(toastWidget, {params}).mount(document.createElement("div"))
var uitoast = {
    success(message) {
        if(params.show) return
        params.show = true
        if(typeof(message)=='object') {
            params.message = message.message
            params.theme = message.theme||0
            if(params.theme == 1) {
                duration.value = 5000
            }
        }else {
            params.message = message
        }
        params.type = 'success'
        document.body.appendChild($uitoast.$el)
        setTimeout(() => {
            params.show = false
        }, duration.value);
    },
    fail(message) {
        if(params.show) return
        params.show = true
        if(typeof(message)=='object') {
            params.message = message.message
            params.theme = message.theme||0
            if(params.theme == 1) {
                duration.value = 5000
            }
        }else {
            params.message = message
        }
        params.type = 'fail'
        document.body.appendChild($uitoast.$el)
        setTimeout(() => {
            params.show = false
        }, duration.value);
    }
}
export default uitoast