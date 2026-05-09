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
        <path d="M19 12L31 24L19 36" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>