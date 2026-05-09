import { createApp, reactive } from 'vue'
import loadingWidget from './UiLoading.vue'
var params = reactive({
    show: false,
    title: ''
})


const $loading = createApp(loadingWidget, {params}).mount(document.createElement("div"))
var load = {
    show(title) {
        params.show = true
        params.title = title||'Loading...'
        document.body.appendChild($loading.$el)
    },
    hide() {
        params.show = false
    }
}
export default load