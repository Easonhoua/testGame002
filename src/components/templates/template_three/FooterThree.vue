<script setup>
import { ref } from 'vue'
import { useThemeImages } from '@/utils/themeimg'
const FooterImg = useThemeImages().footer
const menu_list = ref([
        { icon: FooterImg.icon_home1, actIcon: FooterImg.icon_home2, path: '/' ,name:'Inícia'},
        { icon: FooterImg.icon_more1, actIcon: FooterImg.icon_more2, path: '/more',name:'Promoção'},
        { icon: FooterImg.icon_agent1, actIcon: FooterImg.icon_agent2, path: '/agent',name:'Comissão' },
        { icon: FooterImg.icon_wallet1, actIcon: FooterImg.icon_wallet2, path: '/recharge', auth: true,name:'Depósito'},
        { icon: FooterImg.icon_user1, actIcon: FooterImg.icon_user2, path: '/mine', auth: true ,name:'Perfil'},
    ])


import { useFooter } from '@/composables/useFooter'
const { 
    footShowRef,
    redPotCountRef,
    current_path,
    onclickMenu,
} = useFooter()

</script>

<template>
    <teleport to="body">
    <div v-if="footShowRef" style="padding-bottom: env(safe-area-inset-bottom);">
        <footer class="w-wrap max-w-full fixed left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center justify-center z-[99]">
            <img :src=FooterImg.bg_footer class="w-full h-auto absolute left-0 top-0 block">
            <ul class="w-full h-[4.0rem] relative flex">
                <template v-for="item,index in menu_list" :key="index">
                    <li @click="onclickMenu(item)" class="mt-[0.55rem] w-1/5 h-full relative cursor-pointer flex flex-col justify-center items-center">
                            <img 
                                :src="item.icon" 
                                :class="item.name!=='Comissão'?'w-[1.8rem] h-[1.8rem] ':' min-w-[4rem] min-h-[4rem] w-auto h-auto relative -top-[0.3rem] '"
                                v-show="item.path !== current_path"
                            >
                            <img 
                                :src="item.actIcon" 
                                 :class="item.name!=='Comissão'?'w-[1.8rem] h-[1.8rem]':'min-w-[4rem] min-h-[4rem] w-auto h-auto relative -top-[0.3rem]'"
                                v-show="item.path === current_path"
                            >
                            <span class="text-[0.7rem]" :class="[item.path !== current_path? 'text-themetext3':'text-themetext1', item.name==='Comissão' ? 'relative -top-[1rem]' : '']">{{ item.name }}</span>
                            <div 
                            v-if="item.path=='/more'&&redPotCountRef>0" 
                            :class="item.path==current_path?'top-2 right-5':'top-2 right-5'"
                            class="w-3 h-3 text-[0.5625rem] !leading-none bg-two  text-theme-text  rounded-full absolute flex items-center justify-center">
                                <b>{{ redPotCountRef }}</b>
                            </div>
                    </li>
                </template>
            </ul>
            <div class="w-full bg-[#1f0002]" style="padding-bottom: env(safe-area-inset-bottom);"></div>
        </footer>
    </div>
    </teleport>
</template>
