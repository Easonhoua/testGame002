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
        <path d="M43 11L16.875 37L5 25.1818" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>