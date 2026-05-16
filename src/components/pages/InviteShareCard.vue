<script setup>
import { computed, ref } from 'vue'
import { t } from '@/i18n'
import useClipboard from "vue-clipboard3"
import { playBtnAudioFunc } from '@/utils/core'
import { userModel } from '@/model/user'
import ShareList from './ShareList.vue'
const { memberRef } = userModel()
import { useThemeImages } from '@/utils/themeimg'
const CommonBgImg = useThemeImages().commonbg
const MineImg = useThemeImages().mine
const invite_link = computed(()=> {
    let code = memberRef.value&&memberRef.value.promoter_code
    let domain = window.location.protocol + '//' + window.location.host + '/#/'
    var query = {
        promoter: code
    }
    var queryString = new URLSearchParams(query).toString()
    return code ? domain+'?'+queryString : domain
})

const { toClipboard } = useClipboard()
async function copyInviteCode(_val) {
    playBtnAudioFunc()
    await toClipboard(_val)
    showToast({
        message: t('commCenter.copied'),
        type: 'success',
        wordBreak: 'break-word',
    });
}
</script>

<template>
    <div class="w-full text-sm ctx-theme__linear rounded-2xl" v-if="currentTemplate.value  =='template_one'">
        <div class="px-3 pt-3 pb-1">
            <h5 class="text-base font-medium">Meu link:</h5>
            <dl class="w-full h-12 pr-2 bg-rgbablack30 text-rgbawhite50 rounded-xl flex items-center">
                <dt class="flex-1 overflow-hidden">
                    <input type="text" :value="invite_link" readonly class="w-full px-4 bg-transparent outline-none ">
                </dt>
                <dd @click="copyInviteCode(invite_link)" class="h-9 px-3 unified-button ctx-theme rounded-lg cursor-pointer flex items-center shrink-0">
                    <span>{{ t('activityCenter.Copy') }}</span>
                </dd>
            </dl>
        </div>
        <p class="text-center">{{ t('userCenter.QuickShare') }}</p>
        <div class="w-full px-2">
            <share-list  :showName="true"></share-list>
        </div>
    </div>
    <div class="w-full text-sm pb-3  rounded-2xl" :style="{background: `url(${CommonBgImg.bg_share})  no-repeat` }" style="background-size: 100% 100%;" v-if="currentTemplate.value  =='template_two'">
        <div class="px-3 pt-3 pb-1">
            <h5 class="text-base font-medium">Meu link:</h5>
            <dl class="w-full h-12  flex items-center">
                <dt class="flex-1 overflow-hidden bg-rgbablack50 rounded-[0.5rem] h-[2rem] text-center text-theme mr-2" style="line-height: 2rem;">
                    <input type="text" :value="invite_link" readonly class="w-full px-4 bg-transparent outline-none0">
                </dt>
                <dd @click="copyInviteCode(invite_link)" class=" m2-btn-nine h-[2rem] px-5 unified-button  rounded-[1rem] cursor-pointer flex items-center shrink-0">
                    <span>Cópia</span>
                </dd>
            </dl>
        </div>
        <p class="text-left ml-3">Compartilhamento Rápido</p>
        <div class="w-[94%] mx-auto  bg-rgbablack50 rounded-[0.5rem]  text-themefont h-[5rem]">
            <share-list  :showName="true"></share-list>
        </div>
    </div>
    <div class="w-full text-sm pb-3  rounded-2xl" :style="{background: `url(${CommonBgImg.bg_share})  no-repeat` }" style="background-size: 100% 100%;" v-if="currentTemplate.value  =='template_three'">
        <div class="px-3 pt-3 pb-1">
            <h5 class="text-base font-medium">{{ t('commCenter.Mylink') }}:</h5>
            <dl class="w-full h-12  flex items-center">
                <dt class="flex-1 overflow-hidden bg-rgbablack50 rounded-[0.5rem] h-[2rem] text-center text-theme mr-2" style="line-height: 2rem;">
                    <input type="text" :value="invite_link" readonly class="w-full px-4 bg-transparent outline-none text-themetext1">
                </dt>
                <dd @click="copyInviteCode(invite_link)" class=" h-[2rem] px-5 m3-theme-btn1 rounded cursor-pointer flex items-center shrink-0">
                    <span>{{ t('commCenter.copy') }}</span>
                </dd>
            </dl>
        </div>
        <p class="text-left ml-3">{{ t('userCenter.QuickShare') }}</p>
        <div class="w-[94%] mx-auto  bg-rgbablack50 rounded-[0.5rem]  text-themefont h-[5rem]">
            <share-list :showName="true"></share-list>
        </div>
    </div>
    <div class="w-full text-sm pb-3 bg-tablebg2 rounded-2xl "  v-if="currentTemplate.value  =='template_four'">
        <div class="w-full py-1 px-3  flex justify-center items-center  bg-tablebg" >
                <img :src="MineImg.img_link" class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0 "/>
                <p class="text-[0.88rem] m4-text overflow-hidden min-w-[4rem] font-[600] ">
                    <span>Meu link:</span>
                </p>
                <dl class="w-full h-12  flex items-center">
                <dt class="flex-1 overflow-hidden bg-theme rounded-[2rem] h-[2rem] text-center text-themetext0 mr-2" style="line-height: 2rem;">
                    <input type="text" :value="invite_link" readonly class="w-full px-4 bg-transparent outline-none">
                </dt>
                <img :src="MineImg.btncopy" class="w-[1.5rem] h-[1.5rem]" @click="copyInviteCode(invite_link)"/>

            </dl>
            </div>
        
        <div class="w-[94%] mx-auto  rounded-[0.5rem]  text-themefont h-[5rem]">
            <p class="text-center m4-text ">Compartilhamento Rápido</p>
            <share-list :showName="true"></share-list>
        </div>
    </div>

    <div class="w-full text-sm pb-3 bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 rounded-t-2xl "  v-if="currentTemplate.value  =='template_five'">
        <div class="w-full py-1 px-3  flex justify-center items-center m5-theme-inputwithoutborder rounded-t-2xl" >
                <img :src="MineImg.img_link" class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0 "/>
                <p class="text-[0.88rem] text-themewhite overflow-hidden min-w-[4rem] font-[600] ">
                    <span>Meu link:</span>
                </p>
                <dl class="w-full h-12  flex items-center">
                    <dt class="flex-1 overflow-hidden  rounded-[2rem] h-[2rem] text-center text-themetext0 mr-2 " style="line-height: 2rem;">
                        <input type="text" :value="invite_link" readonly class="w-full px-4 bg-body-bg outline-none" />
                    </dt>
                <img :src="MineImg.btncopy" class="w-[1.5rem] h-[1.5rem]" @click="copyInviteCode(invite_link)"/>

            </dl>
            </div>
        
        <div class="w-[94%] mx-auto  rounded-[0.5rem]  text-themefont h-[5rem]">
            <p class="text-center text-themetext2 font-bold">Compartilhamento Rápido</p>
            <share-list :showName="true"></share-list>
        </div>
    </div>
</template>