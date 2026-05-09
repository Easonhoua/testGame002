<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {  routeToViewFunc } from '@/model/basic'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const router = useRouter()
const popShowRef = ref(true)
function openurl(item) {
    routeToViewFunc(item.link).then(res => {
        if(res&&res.path) {
            router.push(res.path)
        }
    })
   close()
}

function close() {
    popShowRef.value = false
}
</script>

<template>
    <teleport to="body">
    <section v-if="popShowRef" class="w-full h-full fixed left-0 top-0 z-[99] flex items-center justify-center">
        <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
        <section class="w-full max-h-full overflow-y-auto px-ctx">
            <div class="w-[19rem] max-w-full mx-auto relative flex flex-col items-center" @click="openurl(props.data)">
                <img :src="props.data.img"  class="w-full h-[25rem] " v-if="props.data.img"/>
            </div>
            <div class="w-full relative flex justify-center" style="padding: 5.5rem 0.3125rem 0 0;">
                <button @click="close()" class="w-10 h-10 bg-rgbawhite30 rounded-full absolute right-50 top-6 flex items-center justify-center">
                    <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
                </button>
            </div>
        </section>
    </section>
    </teleport>
</template>
<style scoped>
.sign-day-bg-1 {
    background-image: url(/imgs/sign-day-bg-1.png);
}
.sign-day-bg-2 {
    background-image: url(/imgs/sign-day-bg-2.png);
}
.sign-day-bg-check-1 {
    background-image: url(/imgs/sign-day-check-1.png);
}
.sign-day-bg-check-2 {
    background-image: url(/imgs/sign-day-check-2.png);
}
.sign-day-light {
    animation: sign-light 5s linear infinite;
}
@keyframes sign-light {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>