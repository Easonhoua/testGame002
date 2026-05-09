<script setup>
import { computed, ref } from 'vue'
import { useShare } from '@vueuse/core'
import { userModel } from '@/model/user'
import { shareMsg } from '@/model/pdd'
import { useThemeImages } from '@/utils/themeimg'
const CommonImg = useThemeImages().common 
const props = defineProps({
    showName: Boolean,
})
const { share, isSupported } = useShare()

const { memberRef } = userModel()

const invite_link = computed(()=> {
    let code = memberRef.value&&memberRef.value.promoter_code
    let domain = window.location.protocol + '//' + window.location.host + '/#/'
    var query = {
        promoter: code
    }
    var queryString = new URLSearchParams(query).toString()
    return code ? domain+'pdd?'+queryString : domain+'pdd'
})

const share_list = ref([
    {name: 'Facebook', type: 'facebook',logo: '/imgs/lo_facebook.svg'},
    {name: 'Insgram', type: 'insgram',logo: '/imgs/lo_insgram.svg'},
    {name: 'Kwai', type: 'kwai',logo: '/imgs/lo_kwai.svg'},
    {name: 'Telegram', type: 'telegram',logo: '/imgs/lo_telegram.svg'},
    {name: 'TikTok', type: 'tikTok',logo: '/imgs/lo_tikTok.svg'},
    {name: 'Twitter', type: 'twitter',logo: '/imgs/lo_twitter.svg'},
    {name: 'Whatsapp', type: 'whatsapp',logo: '/imgs/lo_whatsapp.svg'},
    {name: 'Youtube', type: 'youtube',logo: '/imgs/lo_youtube.svg'},
])

// const share_detection = ref(`Olá, eu estou jogando no ${window.document.title}, Ganhe R$ 10.000 por dia!`)
function moreShare() {
    share({
        title: shareMsg.value,
        text: shareMsg.value,
        url: invite_link.value,
    })
}
function onclickShare(item) {
    switch (item.type) {
        case 'facebook':
            // FB.ui({
            //     method: 'share',
            //     href: invite_link.value
            // }, function(response){});
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(invite_link.value)}&quote=${encodeURIComponent(shareMsg.value)}`);
            break;
        case 'insgram':
            window.open(`https://www.instagram.com/?quote=${shareMsg.value} ${encodeURIComponent(invite_link.value)}`)
            break;
        case 'kwai':
            window.open(`https://www.kwai.com/share?text=${encodeURIComponent(shareMsg.value)}&url=${encodeURIComponent(invite_link.value)}`);
            break;
        case 'telegram':
            window.open(`https://t.me/share/url?url=${shareMsg.value} ${encodeURIComponent(invite_link.value)}`)
            break;
        case 'tikTok':
            window.open(`https://www.tiktok.com/?text=${shareMsg.value} ${encodeURIComponent(invite_link.value)}`)
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${shareMsg.value}&url=${encodeURIComponent(invite_link.value)}`) 
            break;
        case 'whatsapp':
            window.open(`https://api.whatsapp.com/send?text=${shareMsg.value} ${encodeURIComponent(invite_link.value)}&url=${encodeURIComponent(invite_link.value)}`)
            break;
        case 'youtube':
            window.open(`https://www.youtube.com/?text=${shareMsg.value} ${encodeURIComponent(invite_link.value)}`)
            break;
    
        default:
            moreShare()
            break;
    }
}
</script>

<template>
    <div class="w-full py-3 overflow-x-auto " v-if="currentTemplate.value !='template_four'">
        <div class="text-[0.625rem] flex">
            <a v-if="isSupported" @click="moreShare()" href="javascript:;" class="px-1 mr-2 shrink-0" >
                <img :src=CommonImg.icon_share class=" mx-auto block" :class="currentTemplate.value =='template_one'?'w-6 h-6':'w-10 h-10'">
                <p class="mt-0.5 text-center opacity-70"  v-show="showName"  v-if="currentTemplate.value =='template_one'">Mais</p>
                <p class="mt-0.5 text-center opacity-70 text-three"  v-show="showName" v-else-if="currentTemplate.value =='template_two'">Mais</p>
                <p class="mt-0.5 text-center opacity-70 text-themetext1"  v-show="showName" v-else="currentTemplate.value =='template_three'">Mais</p>
            </a>
            <template v-for="item,index in share_list" :key="index" >
                <a @click="onclickShare(item)" href="javascript:;" class="px-1 mr-2 shrink-0">
                    <img :src="item.logo" class="mx-auto block" :class="currentTemplate.value =='template_one'?'w-6 h-6':'w-10 h-10'">
                    <p class="mt-0.5 text-center opacity-70" v-show="showName" v-if="currentTemplate.value =='template_one'&&showName">{{ item.name }}</p>
                    <p class="mt-0.5 text-center opacity-70 text-three" v-show="showName" v-if="currentTemplate.value =='template_two'&&showName">{{ item.name }}</p>
                    <p class="mt-0.5 text-center opacity-70 text-themetext1"  v-if="currentTemplate.value =='template_three'&&showName||currentTemplate.value =='template_four'&&showName">{{ item.name }}</p>
                    <p class="mt-0.5 text-center opacity-70 text-themetext1"  v-if="currentTemplate.value =='template_five'&&showName">{{ item.name }}</p>
                </a>
            </template>
        </div>
    </div>
    <div class="w-full py-3 overflow-x-auto " v-else>
        <div class="text-[0.625rem] flex">
            <a v-if="isSupported" @click="moreShare()" href="javascript:;" class="px-1 mr-2 shrink-0">
                <img :src=CommonImg.icon_share class="w-9 h-9 mx-auto block">
                <!-- <p class="mt-0.5 text-center text-three">Mais</p> -->
            </a>
            <template v-for="item,index in share_list" :key="index">
                <a @click="onclickShare(item)" href="javascript:;" class="px-1 mr-2 shrink-0">
                    <img :src="item.logo" class="w-9 h-9 mx-auto block">
                    <!-- <p class="mt-0.5 text-center text-three">{{ item.name }}</p> -->
                </a>
            </template>
        </div>
    </div>
</template>