<script setup>
import { optionRef, confirmFunc, cancelFunc } from './index'
</script>
<template>
    <em v-if="optionRef.show" class="w-full h-full bg-rgbablack50 fixed top-0 left-0 z-[99999996] block"></em>
    <transition name="uidialog">
        <div v-if="optionRef.show" class="w-full h-full p-4 fixed top-0 left-0 z-[99999997] flex items-center justify-center">
            <div class="w-full md:w-[600px] bg-default text-default rounded-md">
                <div class="w-full flex">
                    <div class="p-4 flex-1 overflow-hidden">
                        <p class="text-lg font-bold">{{optionRef.title}}</p>
                    </div>
                    <button v-if="!optionRef.hideCancel" @click="cancelFunc()" class="p-4 bg-transparent flex flex-shrink-0">
                        <icon-close class="w-5 h-5" />
                    </button>
                </div>
                <div class="p-4 text-sm">
                    <article v-html="optionRef.content"></article>
                </div>
                <ul class="p-2 text-sm md:text-base flex justify-end">
                    <li v-if="!optionRef.hideCancel" :class="!optionRef.hideCancel&&!optionRef.hideConfirm?'w-1/2':'w-full'" class="md:w-auto p-2">
                        <button @click="cancelFunc()" class="w-full md:w-auto px-3 h-9 bg-theme/20 text-themetext border border-theme rounded-full md:rounded">
                            <span>{{optionRef.cancelText||'取消'}}</span>
                        </button>
                    </li>
                    <li v-if="!optionRef.hideConfirm" :class="!optionRef.hideCancel&&!optionRef.hideConfirm?'w-1/2':'w-full'" class="md:w-auto p-2">
                        <button @click="confirmFunc()" class="w-full md:w-auto px-3 h-9 ctx-theme rounded-full md:rounded">
                            <span>{{optionRef.confirmText||'确认'}}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>
<style>
.uidialog-enter-active, .uidialog-leave-active {
    opacity: 1;
    transform: scale(1);
    transition: all 200ms ease-in;
}
.uidialog-enter-from, .uidialog-leave-to {
    opacity: 0;
    transform: scale(0);
    transition: all 200ms ease-in;
}
</style>