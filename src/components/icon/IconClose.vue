<script setup>
defineProps({
    size: {
        type: [Number, String],
        default: 4
    }
})
</script>
<template>
    <svg stroke="currentColor" :stroke-width="size" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L40 40" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 40L40 8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>