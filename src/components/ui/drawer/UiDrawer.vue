<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { classListFunc } from '@/utils/core'

const props = defineProps({
    modelValue: Boolean,
    width: String,
    top: Boolean,
    bottom: Boolean,
    left: Boolean,
    right: Boolean,
    center: Boolean,
    maskClose: {
        type: Boolean,
        default: true
    },
    maskClass: String,
    wrap: Boolean
})

const emits = defineEmits(['update:modelValue', 'open', 'close'])

let show_a = ref(false)
let show_b = ref(false)

const position_type = computed(()=> {
    let _val = 'center'
    if(props.left) _val = 'left'
    if(props.right) _val = 'right'
    if(props.top) _val = 'top'
    if(props.bottom) _val = 'bottom'
    return _val
})

watch(()=> props.modelValue,(_nval) => {
    if(_nval) {
        open()
    }else {
        close()
    }
})

onUnmounted(()=> {
    if(props.modelValue) {
        close()
    }
})

function open() {
    classListFunc(document.getElementsByTagName("body")[0],'overflow-hidden','add')
    show_a.value = true
    setTimeout(() => {
        show_b.value = true
        emits('open')
    }, 100);
}
function close() {
    classListFunc(document.getElementsByTagName("body")[0],'overflow-hidden','remove')
    show_b.value = false
    setTimeout(() => {
        show_a.value = false
        emits('update:modelValue', false)
        emits('close')
    }, 300);
}
function onclickMask() {
    if(props.maskClose) {
        close()
    }
}
</script>

<template>
    <teleport to='body'>
        <div v-if="show_a" class="w-full h-full fixed left-0 top-0 z-[99999995]">
            <em :class="maskClass" @click="onclickMask()" class="w-full h-full bg-rgbablack30 block"></em>
            <div :class="[
                {'transform left-0 top-0 h-full': position_type == 'left'},
                {'transform right-0 top-0 h-full': position_type == 'right'},
                {'transform top-0': position_type == 'top'},
                {'transform bottom-0': position_type == 'bottom'},
                {'transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center': position_type == 'center'},
                {'translate-x-0': ['left', 'right'].includes(position_type) && show_b},
                {'-translate-x-full': position_type == 'left' && !show_b},
                {'translate-x-full': position_type == 'right' && !show_b},
                {'translate-y-0': ['top', 'bottom'].includes(position_type) && show_b},
                {'-translate-y-full': position_type == 'top' && !show_b},
                {'translate-y-full': position_type == 'bottom' && !show_b},
                {'scale-100': position_type == 'center' && show_b},
                {'scale-0': position_type == 'center' && !show_b},
                {'max-w-full': !wrap},
                {'ctx-wrap left-1/2 -translate-x-1/2': wrap}
            ]" 
            :style="{width: width||'300px',zIndex: 2}" :data-position="position_type" class="absolute duration-300 ease-in-out">
                <slot></slot>
            </div>
        </div>
    </teleport>
</template>