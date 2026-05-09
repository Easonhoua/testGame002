<script setup>
const props = defineProps({
    params: Object
})
</script>

<template>
    <transition name="uitoast_top">
        <div v-show="params.show" :class="params.theme == 1 ? 'bottom-0 pb-8' : 'top-0 pt-8'" class="w-full px-4 flex justify-center fixed left-0 z-[99999999]">
            <div class="p-3 min-w-[100px] max-w-full bg-rgbablack80 text-themewhite rounded">
                <p class="text-sm md:text-base font-medium">
                    <em class="w-[17px] h-[17px] mr-1 inline-block align-middle">
                        <svg v-if="params.type == 'success'" class="w-full h-full text-emerald- 400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z" fill="currentColor"></path>
                        </svg>
                        <svg v-else-if="params.type == 'fail'" class="w-full h-full text-red- 400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z" fill="currentColor"></path>
                        </svg>
                    </em>
                    <span class="align-middle">{{params.message}}</span>
                </p>
            </div>
        </div>
    </transition>
</template>
<style scoped>
.uitoast_top-enter-active, .uitoast_top-leave-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 300ms ease-in;
}
.uitoast_top-enter-from, .uitoast_top-leave-to {
    opacity: 0;
    transform: translateY(-100%);
    transition: all 300ms ease-in;
}
</style>