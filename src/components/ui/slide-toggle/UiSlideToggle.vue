<script setup>
import { ref } from 'vue'
import { useElementSize } from '@vueuse/core'

const props = defineProps({
    modelValue: [Boolean],
    duration: String,
    boxStyle: [Object, String]
})

const box = ref(null)
const { height } = useElementSize(box)
</script>

<template>
    <div :style="`height: ${modelValue?height+'px':'0px'};transition: all ${duration?duration:'300ms'} ease;`" class="overflow-hidden">
        <section ref="box" :style="boxStyle">
            <slot></slot>
        </section>
    </div>
</template>