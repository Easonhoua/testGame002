<script setup>
import { useScreenSafeArea } from '@vueuse/core'
import { bodyWidthRef } from '@/utils/config'
import { mysteriousModel } from '@/model/activity'
const { top, bottom } = useScreenSafeArea()
import { pddModel } from '@/model/pdd'
import { useThemeImages } from '@/utils/themeimg'

const CommonImg = useThemeImages().common 
const PddImg = useThemeImages().pdd

const { mysteriousListFunc} = mysteriousModel()
const {
    claimRef,gameCurrencyRef,totalBonusRef,getPddInfoFunc
} = pddModel() 
const props = defineProps({
    modelValue: Boolean,
    typeName: String
})
const emits = defineEmits(['update:modelValue'])
async function close() {
    if(props.typeName!='mysteriousgold'){
        await getPddInfoFunc()
    }else{
        await mysteriousListFunc()
    }
    // await getPddInfoFunc()
    emits('update:modelValue', false)
}
</script>
<template>
    <!-- modelValue -->
     <van-popup
            :show="modelValue"
            close-on-click-overlay
            @update:show="(val) => emits('update:modelValue', val)"
            position="top"
            :style="{ width: '560px',height: '100%', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px' }"
            :overlay-style="{width: '560px', height: '100%', left: '50%', maxWidth: '100%',  marginLeft: '-'+(bodyWidthRef/2)+'px' }"
            style="background: rgba(0, 0, 0, 0.3) center;background-size: cover;"
            teleport="body"
        >
            <section :style="`padding-top: ${top};`" class="w-full h-full flex flex-col items-center justify-center">
                <div class="absolute  right-4 flex items-center" style="top: 10rem;" >
                    <button @click="close()" class="w-10 h-10 bg-rgbawhite30 rounded-full absolute right-0 top-0 flex items-center justify-center">
                            <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                            </svg>
                    </button>
                </div>
                <pu-card theme="5" class="flex items-center justify-center flex-col" v-if="currentTemplate.value=='template_one'">
                     <img :src=CommonImg.img_success >
                     <div class="flex items-center justify-center -mt-2 text-center" v-if="props.typeName!='mysteriousgold'" 
                        :style="{backgroundImage: `url(${CommonImg.img_successbg})`,backgroundSize: '100% 100%',width:'18rem',height:'3rem'}">
                       <img :src=CommonImg.img_money  class="w-[3rem] h-[3rem] mr-2" v-if="!claimRef"/>
                       <img :src=CommonImg.img_gold  class="w-[3rem] h-[3rem] mr-2" v-else style="margin-top: -0.5rem;"/>
                       <h1 style="font-size: 1.9rem;font-weight: 500;">R${{!claimRef?gameCurrencyRef:totalBonusRef}}</h1>
                    </div>
                </pu-card>
                <pu-card theme="5" class="flex items-center justify-center flex-col" v-else>
                     <img :src=CommonImg.img_success   v-if="props.typeName!='mysteriousgold'">
                     <img :src=CommonImg.bg_sucess  v-else>
                     <div class="flex items-center justify-center -mt-[3.4rem] text-center" v-if="props.typeName!='mysteriousgold'" >
                       <img :src=CommonImg.img_money  class="w-[3rem] h-[3rem] mr-2 -mt-[0.5rem]" v-if="!claimRef&&props.typeName!='luckywheel'"/>
                       <img :src=CommonImg.img_gold   class="w-[3rem] h-[3rem] mr-2 " v-else style="margin-top: -0.5rem;"/>
                       <h1 style="font-size: 1.9rem;font-weight: 500;" class="text-four" v-if="props.mony>0">R${{props.mony}}</h1>
                       <h1 style="font-size: 1.9rem;font-weight: 500;" class="text-four" v-else>R${{!claimRef?gameCurrencyRef:totalBonusRef}}</h1>
                    </div>
                   
                </pu-card>
            </section>
            <i :style="`height: ${bottom};`" class="w-full block shrink-0"></i>
        </van-popup>
</template>
