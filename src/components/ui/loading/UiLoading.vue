<script setup>
defineProps({
    params: Object
})
</script>
<template>
    <div v-show="params.show" class="w-full h-full bg-rgbablack30 fixed top-0 left-0 z-[99999998] flex items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            <div class="w-16 h-16 relative flex items-center justify-center">
                <i class="w-full h-full bg-transparent rounded-full border border-themewhite absolute left-0 top-0" style="animation: uicorners 1s ease infinite"></i>
            </div>
            <p class="mt-5 text-lg text-themewhite">{{params.title}}</p>
        </div>
    </div>
</template>
<style>
@keyframes uicorners{
    0%  {
        border-radius: 50%;
        transform: rotate(0deg);
    }
    25% {
        border-radius: 50% 50% 50% 15%;
    }
    50% {
        border-radius: 50% 50% 15% 30%;
    }
    75% {
        border-radius: 50% 15% 30% 30%;
    }
    100%{
        border-radius: 50%;
        transform: rotate(-180deg);
    }
}
</style>