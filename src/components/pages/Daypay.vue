<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { isIphoneSE } from '@/utils/core'
import { DayPayModel, showDayPayRef, dayPayInfoRef, dayPayTiemRef, dayPayContent } from '@/model/other'
import { useThemeImages } from '@/utils/themeimg'
const CommonImg = useThemeImages().common
const DaypayImg = useThemeImages().daypay

const router = useRouter()
// 倒计时相关
const countdownTime = dayPayTiemRef
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let timer = null
function close() {
    showDayPayRef.value = false
}
function goRecharge() {
    router.push('/recharge')
}
// 格式化时间
function formatTime(time) {
    return time < 10 ? '0' + time : time
}
// 更新倒计时
function updateCountdown() {
    if (countdownTime.value <= 0) {
        clearInterval(timer)
        return
    }

    countdownTime.value--

    const h = Math.floor(countdownTime.value / 3600)
    const m = Math.floor((countdownTime.value % 3600) / 60)
    const s = countdownTime.value % 60

    hours.value = formatTime(h)
    minutes.value = formatTime(m)
    seconds.value = formatTime(s)
}

// 初始化倒计时
function initCountdown() {
    // 这里可以根据实际需求设置倒计时时间
    // 比如从服务器获取剩余时间
    countdownTime.value = 24 * 60 * 60 // 24小时

    updateCountdown() // 立即更新一次
    timer = setInterval(updateCountdown, 1000)
}
onMounted(() => {
    initCountdown()
})
onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
    }
})
</script>

<template>
    <teleport to="body">
        <!-- showDayPayRef -->

        <section v-if="showDayPayRef" class="w-full h-full fixed left-0 top-0 z-[99] flex items-center justify-center">
            <em class="w-full h-full bg-rgbablack80 bg-blur fixed left-0 top-0 block"></em>

            <div class="content flex flex-col items-center relative"
                v-if="currentTemplate.value == 'template_one' || currentTemplate.value == 'template_two'">
                <button @click="close()" class=" bg-rgbawhite50 rounded-full flex items-center justify-center"
                    style="width: 3.5rem;height: 3.5rem; z-index: 9;position: absolute; right: -1rem;top: 5%;">
                    <svg class="w-10 h-10 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z">
                        </path>
                    </svg>
                </button>

                <img :src=DaypayImg.img_daypay class="w-[17rem] h-[18rem]  z-10" />
                <div class="overflow-y-auto flex flex-col items-center  mt-[-1rem] "
                    :class="isIphoneSE() ? 'max-h-[17rem]' : 'max-h-[20rem]'">
                    <div class="table mx-auto z-20  border "
                        :class="currentTemplate.value == 'template_one' ? ' border-searchborder' : ' border-defaultborder'">
                        <div class="flex justify-between text-themewhite line"
                            :class="currentTemplate.value == 'template_one' ? 'bg-tablebg ' : 'bg-faqcolor1'">
                            <span class="border-r "
                                :class="currentTemplate.value == 'template_one' ? 'border-searchborder' : 'border-defaultborder'">Depósito</span>
                            <span>Bônus</span>
                        </div>
                        <!--dayPayInfoRef  -->
                        <!--  -->
                        <div class="flex justify-between items-center textline border-t  "
                            :class="currentTemplate.value == 'template_one' ? 'border-searchborder bg-tablergba40' : 'border-defaultborder bg-tablergba40'"
                            v-for="(item, index) in dayPayInfoRef" :key="index">
                            <span class="text-rgbawhite80"><span class="text-themeLight">R$</span>
                                {{ item.pay_num }}</span>
                            <span v-if="currentTemplate.value == 'template_one' || currentTemplate.value == 'template_five'" class="text-four"><span
                                    class="!text-themeLight">R$</span> {{ item.send_num }}</span>
                            <span v-else>R$ <span class="text-four"> {{ item.send_num }}</span></span>
                        </div>
                    </div>
                    <!-- 倒计时 - -->
                    <div class="countdown px-4 py-[0.15rem] rounded-[1rem] mt-3 flex items-center"
                        :class="currentTemplate.value == 'template_one' || currentTemplate.value == 'template_five' ? 'bg-gradient-to-r from-gold-500 to-gold-100' : ' bg-rgbawhite30'">
                        <img :src=DaypayImg.img_time class="w-[1rem] h-[1rem] mr-2 " />
                        <em class="text-themewhite font-bold flex items-center">
                            <span>{{ hours }}</span>
                            <p>:</p>
                            <span>{{ minutes }}</span>
                            <p>:</p>
                            <span>{{ seconds }}</span>
                        </em>
                    </div>
                    <button class="w-[10rem] mt-7 py-3 rounded-[1rem] text-themewhite " @click="goRecharge()"
                        :class="currentTemplate.value == 'template_one'? 'bg-gradient-to-r from-gold-500 to-gold-100' : 'm2-btn-ten'">
                        Depósito Imediato
                    </button>
                    <div class="rules w-[19rem]  mt-4">
                        <div class=" flex items-center">
                            <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"></em>
                            <h5 class="ma-w-[60%] px-2 text-sm text-center">
                                <span>Descrição da Atividade</span>
                            </h5>
                            <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
                        </div>
                        <!-- v-html="dayPayContent" -->
                        <div v-html="dayPayContent" style="font-size: 0.78rem;" class="text-rgbawhite80"></div>
                    </div>
                </div>
            </div>

            <div class="content flex flex-col items-center relative" v-else-if="currentTemplate.value == 'template_three'">
                <button @click="close()" class=" bg-rgbawhite50 rounded-full flex items-center justify-center"
                    style="width: 3.5rem;height: 3.5rem; z-index: 9;position: absolute; right: -1rem;top: 5%;">
                    <svg class="w-10 h-10 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z">
                        </path>
                    </svg>
                </button>

                <img :src=DaypayImg.img_daypay class="w-[17rem] h-[18rem]  z-10" />
                <div class="overflow-y-auto flex flex-col items-center  mt-[-1rem] "
                    :class="isIphoneSE() ? 'max-h-[17rem]' : 'max-h-[20rem]'">
                    <div class="table mx-auto z-20  border border-defaultborder">
                        <div class="flex justify-between text-themewhite line bg-tablergba">
                            <span class="border-r border-defaultborder">Depósito</span>
                            <span>Bônus</span>
                        </div>
                        <!--dayPayInfoRef  -->
                        <!--  -->
                        <div class="flex justify-between items-center textline border-t  border-defaultborder bg-faqcolor3"
                            v-for="(item, index) in dayPayInfoRef" :key="index">
                            <span class="text-white"><span class="text-themetext1">R$</span> {{ item.pay_num }}</span>
                            <span class="text-themetext1">R$ <span class="text-themetext0">
                                    {{ item.send_num }}</span></span>
                        </div>
                    </div>

                    <button class="w-[10rem] mt-7 py-3 rounded-[1rem] m3-theme-btn1" @click="goRecharge()">
                        Depósito Imediato
                    </button>

                    <!-- 倒计时 - -->
                    <div class="countdown px-4 py-[0.15rem] rounded-[1rem] mt-3 flex items-center"
                        :class="currentTemplate.value == 'template_one' || currentTemplate.value == 'template_five' ? 'bg-gradient-to-r from-gold-500 to-gold-100' : ' bg-rgbawhite30'">
                        <img :src=DaypayImg.img_time class="w-[1rem] h-[1rem] mr-2 " />
                        <em class="text-themewhite font-bold flex items-center">
                            <span>{{ hours }}</span>
                            <p>:</p>
                            <span>{{ minutes }}</span>
                            <p>:</p>
                            <span>{{ seconds }}</span>
                        </em>
                    </div>

                    <div class="rules w-[19rem]  mt-4">
                        <div class=" flex items-center">
                            <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"></em>
                            <h5 class="ma-w-[60%] px-2 text-sm text-center">
                                <span>Descrição da Atividade</span>
                            </h5>
                            <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
                        </div>
                        <!-- v-html="dayPayContent" -->
                        <div v-html="dayPayContent" style="font-size: 0.78rem;" class="text-rgbawhite80"></div>
                    </div>
                </div>
            </div>

            <div class="content flex flex-col items-center relative" v-else-if="currentTemplate.value == 'template_four'">
                <button @click="close()" class="flex items-center justify-center"
                    style="z-index: 9;position: absolute; right: -1rem;top: 5%;">
                    <img :src=CommonImg.btn_close alt="" class="w-5 h-5">
                </button>
                <img :src=DaypayImg.img_daypay class="w-[17rem] mb-[-1rem] z-10" />
                <div class="overflow-y-auto flex flex-col items-center"
                    :class="isIphoneSE() ? 'max-h-[17rem]' : 'max-h-[20rem]'">
                    <div class="table mx-auto z-20 bg-tablebg !rounded-[0.5rem] ">
                        <div class="m4-ten-btn font-bold text-[1.68rem] text-center w-full">Primeiro Depósito</div>
                        <div class="flex justify-between line ">
                            <span class="m4-text">Depósito</span>
                            <span class="m4-text">Bônus</span>
                        </div>
                        <!--  -->
                        <div class="flex justify-between items-center textline odd:bg-tablebg2"
                            v-for="(item, index) in dayPayInfoRef" :key="index">
                            <span class="text-themetext0"><span class="text-white">R$</span> {{ item.pay_num }}</span>
                            <span class="text-themetext0"><span class="text-white">>R$</span> {{ item.send_num }}</span>
                        </div>
                    </div>
                    <!-- 倒计时 - -->
                    <div class="countdown m4-ten-btn  px-4 py-[0.15rem] rounded-[1rem] mt-3 flex items-center">
                        <img :src=DaypayImg.img_time class="w-[1.25rem] h-[1.25rem] mr-2 " />
                        <em class=" font-bold flex items-center">
                            <span>{{ hours }}</span>
                            <p>:</p>
                            <span>{{ minutes }}</span>
                            <p>:</p>
                            <span>{{ seconds }}</span>
                        </em>
                    </div>
                    <button class="px-4 py-3 mt-4 rounded-full  m4-nine-btn  "  @click="goRecharge()">
              Depósito Imediato
            </button>
            <div class="rules w-[19rem]  mt-5">
                <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                    <span>Descrição da Atividade:</span>
                </h5>

                <article class="list-decimal pl-5 text-[0.78rem] text-themetext3" v-html="dayPayContent" v-if="dayPayContent"></article>
                 <ol class="list-decimal pl-5 text-[0.78rem] text-themetext3 " v-else>
                <li>Esta atividade só pode ser participada uma vez.</li>
                <li>Antes da contagem regressiva terminar, a primeira recarga receberá o bõnus correspondente.</li>
                <li>O uso do bõnus deve seguir as regras da plataforma.</li>
                <li>A empresa reserva-se o direito de interpretação final sobre esta atividade.</li>
                </ol>
            </div>
                </div>
            </div>
            <div class="content flex flex-col items-center relative" v-else-if="currentTemplate.value == 'template_five'">
                <button @click="close()" class="flex items-center justify-center"
                    style="z-index: 9;position: absolute; right: -1rem;top: 5%;">
                    <img :src=CommonImg.btn_close alt="" class="w-5 h-5">
                </button>
                <img :src=DaypayImg.img_daypay class="w-[17rem] mb-[-1rem] z-10" />
                <div class="overflow-y-auto flex flex-col items-center"
                    :class="isIphoneSE() ? 'max-h-[17rem]' : 'max-h-[20rem]'">
                    <div class="table mx-auto z-20 bg-tablebg1 !rounded-[0.5rem] mt-4">
                        <!-- <div class="m4-ten-btn font-bold text-[1.68rem] text-center w-full">Primeiro Depósito</div> -->
                        <div class="flex justify-between line font-bold">
                            <span class="text-themetext1">Depósito</span>
                            <span class="text-themetext1">Bônus</span>
                        </div>
                        <!--  -->
                        <div class="flex justify-between items-center textline odd:bg-tablebg2"
                            v-for="(item, index) in dayPayInfoRef" :key="index">
                            <span class="text-themetext0"><span class="text-white">R$</span> {{ item.pay_num }}</span>
                            <span class="text-themetext0"><span class="text-white">>R$</span> {{ item.send_num }}</span>
                        </div>
                    </div>
                    <!-- 倒计时 - -->
                    <div class="countdown bg-rgbawhite30  px-4 py-[0.15rem] rounded-[1rem] mt-3 flex items-center">
                        <img :src=DaypayImg.img_time class="w-[1.25rem] h-[1.25rem] mr-2 " />
                        <em class=" font-bold flex items-center">
                            <span>{{ hours }}</span>
                            <p>:</p>
                            <span>{{ minutes }}</span>
                            <p>:</p>
                            <span>{{ seconds }}</span>
                        </em>
                    </div>
                    <button class="px-4 py-1 mt-4 rounded-full  m5-theme-btn1 text-sm"  @click="goRecharge()">
                        Depósito Imediato
                    </button>
            <!-- <div class="rules w-[19rem]  mt-5">
                <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                    <span>Descrição da Atividade:</span>
                </h5>

                <article class="list-decimal pl-5 text-[0.78rem] text-themetext3" v-html="dayPayContent" v-if="dayPayContent"></article>
                 <ol class="list-decimal pl-5 text-[0.78rem] text-themetext3 " v-else>
                <li>Esta atividade só pode ser participada uma vez.</li>
                <li>Antes da contagem regressiva terminar, a primeira recarga receberá o bõnus correspondente.</li>
                <li>O uso do bõnus deve seguir as regras da plataforma.</li>
                <li>A empresa reserva-se o direito de interpretação final sobre esta atividade.</li>
                </ol>
            </div> -->
                </div>
            </div>
        </section>
    </teleport>
</template>
<style scoped>
.content {
    z-index: 1;

    .table {
        width: 20rem;
        height: auto;
        border-radius: 1.5rem;
        overflow: hidden;

        .line {
            padding: 0.3rem;

            span {
                width: 50%;
                text-align: center;
            }
        }

        .textline {
            padding: 0.3rem;

            span {
                width: 50%;
                text-align: center;

            }

        }

    }
}
</style>