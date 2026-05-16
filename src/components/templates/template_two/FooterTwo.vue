<script setup>
import { ref,computed } from 'vue'
import { useThemeImages } from '@/utils/themeimg'
import { routeToViewFunc } from '@/model/basic'
import { blogTagIdsRef } from '@/model/common'
const FooterImg = useThemeImages().footer
    const menu_list = computed(()=> {
         // 默认菜单配置
    const defaultList = [
        { icon: FooterImg.icon_home1, actIcon: FooterImg.icon_home2, path: '/' ,name:'Inícia'},
        { icon: FooterImg.icon_wallet1, actIcon: FooterImg.icon_wallet2, path: '/recharge', auth: true,name:'Depósito'},
        { icon: FooterImg.icon_agent1, actIcon: FooterImg.icon_agent2, path: blogTagIdsRef.value.includes(2) ? '/recharge' : '/agent',name:'Comissão' },
        { icon: FooterImg.icon_more1, actIcon: FooterImg.icon_more2, path: '/more',name:'Promoção'},
        { icon: FooterImg.icon_user1, actIcon: FooterImg.icon_user2, path: '/mine', auth: true ,name:'Perfil'},
    ]
    if (footerListRef.value) {
        footerListRef.value.forEach(item => {
            if (item.sort == 0) {
                defaultList[2].icon = item.img
                defaultList[2].name = item.desc_str || ''
                routeToViewFunc(item.link).then(res => {
                    if (res && res.path) {
                        defaultList[2].path = res.path
                    }
                })
            } else if (item.sort == 1) {
                defaultList[2].actIcon = item.img
            }
        })
    }
    return defaultList
})


import { useFooter } from '@/composables/useFooter'
const { 
    footShowRef,
    redPotCountRef,
    current_path,
    onclickMenu,
    footerListRef
} = useFooter()

</script>

<template>
    <teleport to="body">
    <div v-if="footShowRef" style="padding-bottom: env(safe-area-inset-bottom);">
        <footer class="w-wrap max-w-full fixed left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center justify-center z-[99]">
            <img :src=FooterImg.bg_footer class="w-full h-[4rem] absolute left-0 top-0 block">
            <ul class="w-full h-[4rem] relative flex">
                <template v-for="item,index in menu_list" :key="index">
                    <li @click="onclickMenu(item)" class="w-1/5 h-full relative cursor-pointer flex flex-col justify-center items-center" 
                    :style="(item.path === current_path && item.name !== 'Comissão') ? {
                        background: `url(${FooterImg.icon_choose}) no-repeat center`,
                        backgroundSize: '100% 100%'
                    } : {}" >
                            <img 
                                :src="item.icon" 
                                :class="index!==2?'w-[2.5rem] h-[2.5rem]':'min-w-[6rem] min-h-[6rem] w-auto h-auto relative -top-[1rem] left-[0.15rem]'"
                                v-show="item.path !== current_path"
                            >
                            <img 
                                :src="item.actIcon" 
                                 :class="index!==2?'w-[2.5rem] h-[2.5rem]':'min-w-[6rem] min-h-[6rem] w-auto h-auto relative -top-[1rem] left-[0.15rem]'"
                                v-show="item.path === current_path"
                            >
                            <span class="text-[0.7rem] -mt-2 " :class="item.path !== current_path? 'text-theme':'text-three'" v-show="index!==2">{{ item.name }}</span>
                            <div 
                            v-if="item.path=='/more'&&redPotCountRef>0" 
                            :class="item.path==current_path?'top-2 right-5':'top-2 right-5'"
                            class="w-3 h-3 text-[0.5625rem] !leading-none bg-two  text-theme-text  rounded-full absolute flex items-center justify-center">
                                <b>{{ redPotCountRef }}</b>
                            </div>
                    </li>
                </template>
            </ul>
            <div class="w-full " style="padding-bottom: env(safe-area-inset-bottom);"></div>
        </footer>
    </div>
    </teleport>
</template>
