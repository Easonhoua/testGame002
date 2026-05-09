<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {showFirstChargeRef } from '@/model/other'
import { useThemeImages } from '@/utils/themeimg'
import { isIphoneSE } from '@/utils/core'
import { payListRef,BuoyModel } from '@/model/common'
const CommonBgImg = useThemeImages().commonbg 
const CommonImg = useThemeImages().common 
const router = useRouter()
// const { payListRef } = FristChangeModel()
const { getBuoyListFunc } = BuoyModel()
function close() {
    getBuoyListFunc()
    showFirstChargeRef.value = false
}
function goRecharge(){
    router.push('/recharge')
}
</script>

<template>
    <teleport to="body" >
        <!-- showFirstChargeRef -->
    <section v-if="showFirstChargeRef" class="w-full h-full fixed left-0 top-0 z-[99] flex items-center justify-center">
        <em class="w-full h-full bg-rgbablack80 bg-blur fixed left-0 top-0 block"></em>
        <!-- <div class="w-full absolute right-50 top-0" > -->
          
            <!-- </div> -->
        <div class="content flex flex-col items-center relative" v-if="currentTemplate.value =='template_one'||currentTemplate.value =='template_two'">
            <button @click="close()" class=" bg-rgbawhite50 rounded-full flex items-center justify-center" style="width: 3.5rem;height: 3.5rem; z-index: 9;position: absolute; right: -1rem;top: 5%;">
                <svg class="w-10 h-10 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                </svg>
            </button>
            <img :src=CommonBgImg.bg_fristchange  class="w-[17rem] h-[18rem] z-10" />
            <div class="overflow-y-auto flex flex-col items-center mt-[-3rem]" :class="isIphoneSE()? 'max-h-[17rem]' : 'max-h-[20rem]'">
            <div class="table mx-auto z-20  border "  :class="currentTemplate.value =='template_one'?' border-searchborder':' border-defaultborder'">
              <div class="flex justify-between text-themewhite  line "  :class="currentTemplate.value =='template_one'?'bg-tablebg':'bg-faqcolor1'">
                <span class="border-r " :class="currentTemplate.value =='template_one'?'border-searchborder':'border-defaultborder'">Depósito</span>
                <span>Bônus</span>
              </div>
              <div class="flex justify-between items-center textline border-t "
               :class="currentTemplate.value =='template_one'?'bg-tablergba40 border-searchborder':'border-defaultborder bg-tablergba40'"
              v-for="(item,index) in payListRef.config || []" :key="index">
                <span class="text-rgbawhite80"><span class="text-four">R$</span> {{item.pay_num}}</span>
                <span  v-if="currentTemplate.value =='template_one'"  class="text-four"><span class="!text-themeLight">R$</span> {{item.send_num}}</span>
                <span v-else>R$ <span class="text-four"> {{item.send_num}}</span></span>
              </div>
            </div>
            <button class="w-[10rem] mt-4 py-3 rounded-[1rem] text-themewhite "
            :class="currentTemplate.value =='template_one'?'bg-gradient-to-r from-gold-500 to-gold-100':'m2-btn-ten'"
            @click="goRecharge()">
              Depósito Imediato
            </button>
            <div class="rules w-[19rem]  mt-5">
                <div class=" flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center">
                    <span>Descrição da Atividade</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
                </div>
                <article class="list-decimal pl-5 text-rgbawhite80" v-html="payListRef.firstpay_content" v-if="payListRef.firstpay_content"></article>
                <ol class="list-decimal pl-5 text-rgbawhite80" style="font-size: 0.78rem;" v-else>
                <li>Esta atividade só pode ser participada uma vez.</li>
                <li>Antes da contagem regressiva terminar, a primeira recarga receberá o bõnus correspondente.</li>
                <li>O uso do bõnus deve seguir as regras da plataforma.</li>
                <li>A empresa reserva-se o direito de interpretação final sobre esta atividade.</li>
                </ol>
            </div>
        </div>
        </div>
        <div class="content flex flex-col items-center relative" v-if="currentTemplate.value =='template_three'">
            <button @click="close()" class=" bg-rgbawhite50 rounded-full flex items-center justify-center" style="width: 3.5rem;height: 3.5rem; z-index: 9;position: absolute; right: -1rem;top: 5%;">
                <svg class="w-10 h-10 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                </svg>
            </button>
            <img :src=CommonBgImg.bg_fristchange  class="w-[17rem] h-[18rem] z-10" />
            <div class="overflow-y-auto flex flex-col items-center mt-[-3rem]" :class="isIphoneSE()? 'max-h-[17rem]' : 'max-h-[20rem]'">
            <div class="table mx-auto z-20  border mt-5 border-defaultborder">
              <div class="flex justify-between text-themewhite  line bg-tablergba">
                <span class="border-r border-defaultborder">Depósito</span>
                <span>Bônus</span>
              </div>
              <div class="flex justify-between items-center textline border-t border-defaultborder bg-faqcolor3"
              v-for="(item,index) in payListRef.config || []" :key="index">
                <span class="text-white"><span class="text-themetext1">R$</span> {{item.pay_num}}</span>
                <span class="text-themetext0"><span class="text-themetext1">R$</span> {{item.send_num}}</span>
              </div>
            </div>
            <button class="w-[10rem] mt-4 py-3 rounded-[1rem] m3-theme-btn1"
        
            @click="goRecharge()">
              Depósito Imediato
            </button>
            <div class="rules w-[19rem]  mt-5">
                <div class=" flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center">
                    <span>Descrição da Atividade</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"></em>
            </div>
            <ol class="list-decimal pl-5 text-rgbawhite50" style="font-size: 0.78rem;">
                <li>Esta atividade só pode ser participada uma vez.</li>
                <li>Antes da contagem regressiva terminar, a primeira recarga receberá o bõnus correspondente.</li>
                <li>O uso do bõnus deve seguir as regras da plataforma.</li>
                <li>A empresa reserva-se o direito de interpretação final sobre esta atividade.</li>
              </ol>
            </div>
        </div>
        </div>
        <div class="content flex flex-col items-center relative " v-if="currentTemplate.value =='template_four'">
            <button @click="close()" class=" flex items-center justify-center" style="width: 3.5rem;height: 3.5rem; z-index: 9;position: absolute; right: -1rem;top: 0;">
                <img :src=CommonImg.btn_close  alt="" class="w-5 h-5">
            </button>
            <img :src=CommonBgImg.bg_fristchange  class="w-[17rem]  mb-0 z-10 mt-[-4rem]" />
            <div class="overflow-y-auto flex flex-col items-center mt-[-1rem]" :class="isIphoneSE()? 'max-h-[17rem]' : 'max-h-[20rem]'">
                <div class="table mx-auto z-20 bg-tablebg !rounded-[0.5rem]">
                <div class="m4-ten-btn  font-bold text-[1.68rem] text-center w-full">Primeiro Depósito</div>
              <div class="flex justify-between  text-white   line ">
                <span class="m4-text">Depósito</span>
                <span class="m4-text">Bônus</span>
              </div>
              <!-- payListRef.config -->
              <div class="flex justify-between items-center  textline odd:bg-tablebg2" v-for="(item,index) in payListRef.config || []" :key="index">
                <span class="text-themetext0"><span  class="text-white">R$</span> {{item.pay_num}}</span>
                <span class="text-themetext0"><span class="text-white">R$</span> {{item.send_num}}</span>
              </div>
            </div>
            <button class="px-4 py-3 mt-4 rounded-full m4-nine-btn font-bold "  @click="goRecharge()">
              Depósito Imediato
            </button>
            <div class="rules w-[19rem]  mt-5">
                <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                    <span>Descrição da Atividade:</span>
                </h5>

                <article class="list-decimal pl-5 text-[0.78rem] text-themetext3" v-html="payListRef.firstpay_content" v-if="payListRef.firstpay_content"></article>
                 <ol class="list-decimal pl-5 text-[0.78rem] text-themetext3 " v-else>
                <li>Esta atividade só pode ser participada uma vez.</li>
                <li>Antes da contagem regressiva terminar, a primeira recarga receberá o bõnus correspondente.</li>
                <li>O uso do bõnus deve seguir as regras da plataforma.</li>
                <li>A empresa reserva-se o direito de interpretação final sobre esta atividade.</li>
                </ol>
            </div>

            </div>
           
           
        </div>
        <div class="content flex flex-col items-center relative " v-if="currentTemplate.value =='template_five'">
            <button @click="close()" class="flex items-center justify-center font-blod text-3xl" style="width: 3.5rem; height: 3.5rem; z-index: 10;position: absolute; right: -2rem;top: -6rem;">
                ×
            </button>
            <img :src=CommonBgImg.bg_fristchange  class="w-[20rem]  mb-0 z-10 mt-[-4rem]" />
            <div class="overflow-y-auto flex flex-col items-center" :class="isIphoneSE()? 'max-h-[17rem]' : 'max-h-[22rem]'">
                <div class="table mx-auto z-20 bg-tablebg1 !rounded-[0.5rem]">
                <!-- <div class="m4-ten-btn  font-bold text-[1.68rem] text-center w-full">Primeiro Depósito</div> -->
              <div class="flex justify-between  line bg-tablebg1 font-bold text-themetext1">
                <span>Depósito</span>
                <span>Bônus</span>
              </div>
              <!-- payListRef.config -->
              <div class="flex justify-between items-center  textline even:bg-tablebg2" v-for="(item,index) in payListRef.config || []" :key="index">
                <span class="text-white">R$ <span class="text-themetext0">{{item.pay_num}}</span></span>
                <span class="text-white">R$<span class="text-themetext0"> {{item.send_num}}</span></span>
              </div>
            </div>
            <button class="px-5 py-2 mt-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-100 font-bold "  @click="goRecharge()">
              Depósito Imediato
            </button>
            <!-- <div class="rules w-[19rem]  mt-5">
                <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                    <span>Descrição da Atividade:</span>
                </h5>

                <article class="list-decimal pl-5 text-[0.78rem] text-themetext3" v-html="payListRef.firstpay_content" v-if="payListRef.firstpay_content"></article>
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
.content{
    z-index: 1;
    .table{
        width: 20rem;
        height: auto;
        border-radius: 1.5rem;
        overflow: hidden;
        .line{
            padding: 0.3rem;
            span{
                width: 50%;
                text-align: center;
            }
            
        }
        .textline{
            padding: 0.3rem;
            span{
                width: 50%;
                text-align: center;
            }

        }

    }
}

</style>