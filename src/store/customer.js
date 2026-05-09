import { ref } from 'vue'
import { $get } from '@/request'
import { defineStore } from 'pinia'

export const customerStore = defineStore('customer', () => {
    const fbUrl = ref('')
    const tgUrl = ref('')
    const waUrl = ref('')

    // const doubleCount = computed(() => count.value * 2)

    async function getCustomer() {
        
        //获取Url
        const res = await $get({ url: '/activity/v1/service/index' }, { loading: true })
        return res
    }

    return { fbUrl, tgUrl, waUrl, getCustomer }
  })