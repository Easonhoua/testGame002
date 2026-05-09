
<script setup>
import {isMobileSafari} from '@/utils/core'
</script>

<template>
     <div v-if="!isMobileSafari()" style="padding-bottom: env(safe-area-inset-bottom);">
        <em class="w-full h-[4rem] block"></em>
    </div>
    <div v-else >
        <em class="w-full h-[8rem] block" ></em>
    </div>
</template>