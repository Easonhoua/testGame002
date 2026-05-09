<script setup>
import { ref,onActivated} from 'vue'
import { isPopReceive, receiveListRef,batchReceiveFunc,batchReceiveAllFunc} from '../../model/common'
import { useThemeImages } from '@/utils/themeimg'

const PublicImg = useThemeImages().public
const CommonImg = useThemeImages().common 
const popShowRef = ref(true)
const showDetailRef = ref(false)
const currentItem = ref({})

onActivated(() => {
    popShowRef.value = true
})

function close() {
    popShowRef.value = false
}

function handleDetail(item) {
    currentItem.value = item
    showDetailRef.value = true
}

function closeDetail() {
    showDetailRef.value = false
}

function handleReceive(id) {
    showDetailRef.value = false
    batchReceiveFunc(id)
}

function handleReceiveAll() {
    batchReceiveAllFunc()
}

</script>

<template>
    <teleport to="body">
      <section v-if="isPopReceive&&popShowRef" class="w-full h-full fixed left-0 top-0 z-[199] flex items-center justify-center">
        <!-- 背景遮罩 -->
        <em class="w-full h-full bg-rgbablack30 bg-blur absolute left-0 top-0 block"></em>
        <!-- 领取列表 -->
        <section class="relative z-[200]">
  
          <!-- 右上角关闭按钮 -->
          <button  class="absolute right-2 top-2 flex items-center justify-center z-[300]"
            @click="close()">
            <img :src="CommonImg.btn_close" class="w-5 h-5">
          </button>
  
          <!-- ===== 原来的四种模板结构 ===== -->
          <template v-if="currentTemplate.value =='template_one'">
            <section class="w-full px-ctx">
                <div class="w-[17rem] max-w-full mx-auto relative flex flex-col items-center">
                    <img :src="PublicImg.receive_bg1" class="w-full h-auto z-[20]" />
                </div>

                <!-- 再往上压一点 -->
                <section theme="3" class="flex -mt-4 justify-center relative z-[10]">
                    <section class="w-[20rem] h-[15rem] bg-default-bg rounded-2xl p-4 flex flex-col">

                    <!-- 标题 -->
                    <p class="text-center text-[0.8rem] font-semibold text-themefont">
                        As suas recompensas não reclamadas
                    </p>

                    <!-- 表格区域（可滚动） -->
                    <div class="mt-3 flex-1 overflow-y-auto rounded-lg bg-tablergba">
                        <table class="w-full table-fixed text-sm text-center text-themefont">
                            <tbody>
                            <tr
                                v-for="item in receiveListRef"
                                :key="item.id"
                                class="odd:bg-black/20 text-white align-top"
                            >
                                <!-- 第一列：允许多行 -->
                                <td class="py-2 text-left pl-1 pr-1 truncate">
                                Prêmio de {{ item.send_amount }} reais aguardando resgate.
                                </td>

                                <!-- 第二列：可点击 -->
                                <td class="py-2 w-20">
                                <button
                                    class="underline text-xs"
                                    @click="handleDetail(item)"
                                >
                                    Verificar
                                </button>
                                </td>

                                <!-- 第三列：领取按钮 -->
                                <td class="py-2 w-20">
                                <button
                                    class="px-2 py-1 text-xs rounded-full m3-theme-btn1"
                                    @click="handleReceive(item.id)"
                                >
                                    Receber
                                </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    </section>
                </section>

                <!-- 一键领取全部 -->
                <div class="mt-4 flex justify-center">
                    <button
                    class="w-[12rem] h-10 rounded-full m3-theme-btn1 font-semibold text-[0.8rem]"
                    @click="handleReceiveAll()"
                    >
                    Reivindique com um clique
                    </button>
                </div>
            </section>
          </template>
          <template v-else-if="currentTemplate.value =='template_two'">
            <section class="w-full px-ctx">
                <div class="w-[17rem] max-w-full mx-auto relative flex flex-col items-center">
                    <img :src="PublicImg.receive_bg2" class="w-full h-auto z-[20]" />
                </div>

                <!-- 再往上压一点 -->
                <section theme="3" class="flex -mt-4 justify-center relative z-[10]">
                    <section class="w-[20rem] h-[15rem] bg-gradient-to-b from-card1 to-card2 rounded-2xl p-4 flex flex-col">

                    <!-- 标题 -->
                    <p class="text-center text-[0.8rem] font-semibold text-themefont">
                        As suas recompensas não reclamadas
                    </p>

                    <!-- 表格区域（可滚动） -->
                    <div class="mt-3 flex-1 overflow-y-auto rounded-lg bg-tablergba">
                        <table class="w-full table-fixed text-sm text-center text-themefont">
                            <tbody>
                            <tr
                                v-for="item in receiveListRef"
                                :key="item.id"
                                class="odd:bg-black/20 text-white align-top"
                            >
                                <!-- 第一列：允许多行 -->
                                <td class="py-2 text-left pl-1 pr-1 truncate">
                                Prêmio de {{ item.send_amount }} reais aguardando resgate.
                                </td>

                                <!-- 第二列：可点击 -->
                                <td class="py-2 w-20">
                                <button
                                    class="underline text-xs"
                                    @click="handleDetail(item)"
                                >
                                    Verificar
                                </button>
                                </td>

                                <!-- 第三列：领取按钮 -->
                                <td class="py-2 w-20">
                                <button
                                    class="px-2 py-1 text-xs rounded-full m3-theme-btn1"
                                    @click="handleReceive(item.id)"
                                >
                                    Receber
                                </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    </section>
                </section>

                <!-- 一键领取全部 -->
                <div class="mt-4 flex justify-center">
                    <button
                    class="w-[12rem] h-10 rounded-full m3-theme-btn1 font-semibold text-[0.8rem]"
                    @click="handleReceiveAll()"
                    >
                    Reivindique com um clique
                    </button>
                </div>
            </section>
          </template>
          <template v-else-if="currentTemplate.value =='template_three'">
            <section class="w-full px-ctx">
                <div class="w-[17rem] max-w-full mx-auto relative flex flex-col items-center">
                    <img :src="PublicImg.receive_bg3" class="w-full h-auto z-[20]" />
                </div>

                <!-- 再往上压一点 -->
                <section theme="3" class="flex -mt-4 justify-center relative z-[10]">
                    <section class="w-[20rem] h-[15rem] m3-theme-bg1 rounded-2xl p-4 flex flex-col">

                    <!-- 标题 -->
                    <p class="text-center text-[0.8rem] font-semibold text-themefont m4-text">
                        As suas recompensas não reclamadas
                    </p>

                    <!-- 表格区域（可滚动） -->
                    <div class="mt-3 flex-1 overflow-y-auto rounded-lg bg-tablergba">
                        <table class="w-full table-fixed text-sm text-center text-themefont">
                            <tbody>
                            <tr
                                v-for="item in receiveListRef"
                                :key="item.id"
                                class="odd:bg-black/20 text-white align-top"
                            >
                                <!-- 第一列：允许多行 -->
                                <td class="py-2 text-left pl-1 pr-1 truncate">
                                Prêmio de {{ item.send_amount }} reais aguardando resgate.
                                </td>

                                <!-- 第二列：可点击 -->
                                <td class="py-2 w-20">
                                <button
                                    class="m4-text underline text-xs"
                                    @click="handleDetail(item)"
                                >
                                    Verificar
                                </button>
                                </td>

                                <!-- 第三列：领取按钮 -->
                                <td class="py-2 w-20">
                                <button
                                    class="px-2 py-1 text-xs rounded-full m3-theme-btn1"
                                    @click="handleReceive(item.id)"
                                >
                                    Receber
                                </button>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </div>

                    </section>
                </section>

                <!-- 一键领取全部 -->
                <div class="mt-4 flex justify-center">
                    <button
                    class="w-[12rem] h-10 rounded-full m3-theme-btn1 font-semibold text-[0.8rem]"
                    @click="handleReceiveAll()"
                    >
                    Reivindique com um clique
                    </button>
                </div>
            </section>
          </template>
          <template v-else-if="currentTemplate.value =='template_four'">
            <section class="w-full px-ctx">
                <div class="w-[17rem] max-w-full mx-auto relative flex flex-col items-center">
                    <img :src="PublicImg.receive_bg4" class="w-full h-auto z-[20]" />
                </div>

                <!-- 再往上压一点 -->
                <section theme="3" class="flex -mt-4 justify-center relative z-[10]">
                    <section class="w-[20rem] h-[15rem] m3-theme-bg1 rounded-2xl p-4 flex flex-col">

                    <!-- 标题 -->
                    <p class="text-center text-[0.8rem] font-semibold text-themefont m4-text">
                        As suas recompensas não reclamadas
                    </p>

                    <!-- 表格区域（可滚动） -->
                    <div class="mt-3 flex-1 overflow-y-auto rounded-lg bg-tablebg">
                        <table class="w-full table-fixed text-sm text-center text-themefont">
                            <tbody>
                            <tr
                                v-for="item in receiveListRef"
                                :key="item.id"
                                class="odd:bg-black/20 text-white align-top"
                            >
                                <!-- 第一列：允许多行 -->
                                <td class="py-2 text-left pl-1 pr-2 truncate">
                                Prêmio de {{ item.send_amount }} reais aguardando resgate.
                                </td>

                                <!-- 第二列：可点击 -->
                                <td class="py-2 w-20">
                                <button
                                    class="m4-text underline text-xs"
                                    @click="handleDetail(item)"
                                >
                                    Verificar
                                </button>
                                </td>

                                <!-- 第三列：领取按钮 -->
                                <td class="py-2 w-20">
                                <button
                                    class="px-2 py-1 text-xs rounded-full m4-ten-btn"
                                    @click="handleReceive(item.id)"
                                >
                                    Receber
                                </button>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </div>

                    </section>
                </section>

                <!-- 一键领取全部 -->
                <div class="mt-4 flex justify-center">
                    <button
                    class="w-[12rem] h-10 rounded-full m4-ten-btn font-semibold text-[0.8rem]"
                    @click="handleReceiveAll()"
                    >
                    Reivindique com um clique
                    </button>
                </div>
            </section>
          </template>
          <template v-else-if="currentTemplate.value =='template_five'">
            <section class="w-full px-ctx">
                <div class="w-[17rem] max-w-full mx-auto relative flex flex-col items-center">
                    <img :src="PublicImg.receive_bg4" class="w-full h-auto z-[20]" />
                </div>

                <!-- 再往上压一点 -->
                <section theme="3" class="flex -mt-4 justify-center relative z-[10]">
                    <section class="w-[20rem] h-[15rem] m3-theme-bg1 rounded-2xl p-4 flex flex-col">

                    <!-- 标题 -->
                    <p class="text-center text-[0.8rem] font-semibold text-themefont m4-text">
                        As suas recompensas não reclamadas
                    </p>

                    <!-- 表格区域（可滚动） -->
                    <div class="mt-3 flex-1 overflow-y-auto rounded-lg bg-tablebg2">
                        <table class="w-full table-fixed text-sm text-center text-themefont">
                            <tbody>
                            <tr
                                v-for="item in receiveListRef"
                                :key="item.id"
                                class="odd:bg-tablebg1 even:bg-tablebg2 text-white align-top"
                            >
                                <!-- 第一列：允许多行 -->
                                <td class="py-2 text-left pl-1 pr-2 truncate">
                                Prêmio de {{ item.send_amount }} reais aguardando resgate.
                                </td>

                                <!-- 第二列：可点击 -->
                                <td class="py-2 w-20">
                                <button
                                    class="m4-text underline text-xs"
                                    @click="handleDetail(item)"
                                >
                                    Verificar
                                </button>
                                </td>

                                <!-- 第三列：领取按钮 -->
                                <td class="py-2 w-20">
                                <button
                                    class="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-themecardlinear1 to-themecardlinear2"
                                    @click="handleReceive(item.id)"
                                >
                                    Receber
                                </button>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </div>

                    </section>
                </section>

                <!-- 一键领取全部 -->
                <div class="mt-4 flex justify-center">
                    <button
                    class="w-[12rem] h-10 rounded-full m5-theme-btn1 font-semibold text-[0.8rem]"
                    @click="handleReceiveAll()"
                    >
                    Reivindique com um clique
                    </button>
                </div>
            </section>
          </template>
        </section>
  
        <!-- 领取详情 -->
        <section v-if="showDetailRef" class="fixed inset-0 z-[210] flex items-center justify-center bg-black/80">
            <template v-if="currentTemplate.value =='template_one' || currentTemplate.value =='template_two'|| currentTemplate.value == 'template_five'">
                <div class="relative w-[15rem] bg-default-bg rounded-2xl p-5 text-center shadow-xl">
                    <!-- 关闭按钮 -->
                    <button 
                        @click="closeDetail()" 
                        class="absolute right-3 top-3 flex items-center justify-center">
                        <img :src="CommonImg.btn_close" class="w-5 h-5">
                    </button>

                    <p class="text-sm mt-6 text-themefont">
                        {{ currentItem.content}}
                    </p>

                    <div class="mt-6">
                        <button
                            @click="handleReceive(currentItem.id)" 
                            class="w-[7rem] h-9 rounded-full m3-theme-btn1">
                            Confirmar
                        </button>
                    </div>
                </div>
            </template>
            <template v-else-if="currentTemplate.value =='template_three'">
                <div class="relative w-[15rem] m3-theme-bg1 rounded-2xl p-5 text-center shadow-xl">
                    <!-- 关闭按钮 -->
                    <button 
                        @click="closeDetail()" 
                        class="absolute right-3 top-3 flex items-center justify-center">
                        <img :src="CommonImg.btn_close" class="w-5 h-5">
                    </button>

                    <p class="text-sm mt-6 text-themefont">
                        {{ currentItem.content}}
                    </p>

                    <div class="mt-6">
                        <button
                            @click="handleReceive(currentItem.id)" 
                            class="w-[7rem] h-9 rounded-full m3-theme-btn1">
                            Confirmar
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="relative w-[15rem] m3-theme-bg1 rounded-2xl p-5 text-center shadow-xl">
                    <!-- 关闭按钮 -->
                    <button 
                        @click="closeDetail()" 
                        class="absolute right-3 top-3 flex items-center justify-center">
                        <img :src="CommonImg.btn_close" class="w-5 h-5">
                    </button>

                    <p class="text-sm mt-6 text-themefont">
                        {{ currentItem.content}}
                    </p>

                    <div class="mt-6">
                        <button
                            @click="handleReceive(currentItem.id)" 
                            class="w-[7rem] h-9 rounded-full m4-ten-btn">
                            Confirmar
                        </button>
                    </div>
                </div>
            </template>
        </section>
  
      </section>
    </teleport>
  </template>