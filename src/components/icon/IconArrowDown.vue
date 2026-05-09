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
        <path d="M36 18L24 30L12 18" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>