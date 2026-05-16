<script setup>
import { ref,computed } from 'vue'
import { useThemeImages } from '@/utils/themeimg'
import { routeToViewFunc } from '@/model/basic'
import { blogTagIdsRef } from '@/model/common'
const FooterImg = useThemeImages().footer
const menu_list = computed(()=> {
         // 默认菜单配置
    const defaultList = [
        { icon: FooterImg.icon_home1, actIcon: FooterImg.icon_home2, path: '/' },
        { icon: FooterImg.icon_more1, actIcon: FooterImg.icon_more2, path: '/more' },
        { icon: FooterImg.icon_agent1, actIcon: FooterImg.icon_agent2,path: blogTagIdsRef.value.includes(2) ? '/recharge' : '/agent', name: 'Comissão' },
        { icon: FooterImg.icon_wallet1, actIcon: FooterImg.icon_wallet2, path: '/recharge', auth: true },
        { icon: FooterImg.icon_user1, actIcon: FooterImg.icon_user2, path: '/mine', auth: true }
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
        <!-- 将内容包装在template中避免slot警告 -->
        <template v-if="footShowRef">
            <!-- <div 
                class="footer-placeholder z-[-1]"
                :style="{ height: `calc(${footerHeight}px + env(safe-area-inset-bottom, 0px))` }">
            </div> -->
            <!-- -->
            <div  style="padding-bottom: env(safe-area-inset-bottom);">
                <footer ref="footerRef" class="w-wrap max-w-full fixed left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center justify-center z-[99]">
                    <img :src=FooterImg.bg_footer class="w-full h-[5rem] absolute left-0 top-0 block">
                    <ul class="w-full h-[4.5rem] relative flex">
                        <template v-for="item,index in menu_list" :key="index">
                            <li @click="onclickMenu(item)" class="w-1/5 h-full relative cursor-pointer flex flex-col justify-center items-center" :class="item.path !== current_path||item.name=='Comissão'? '':'active'" >
                              
                                <img 
                                        :src="item.icon" 
                                        :class="item.name!=='Comissão'?'w-[3.5rem] h-[3rem]':'w-[3.5rem] h-[3rem] relative -top-[0.1rem] left-0'"
                                        v-show="item.path !== current_path"
                                    > 
                                    
                                    <img :src="FooterImg.icon_animation" class="rotating-element z-[1] absolute w-[2.85rem] h-[2.85rem] top-[0.15rem] left-[0.89rem]"  v-if="index==2"/>
                                   
                                    <img 
                                        :src="item.actIcon" 
                                         :class="item.name!=='Comissão'?'w-[3.5rem] h-[3rem]':'w-[3.5rem] h-[3rem]  relative -top-[0.1rem] left-0'"
                                        v-show="item.path === current_path"
                                    > <div 
                                    v-if="item.path=='/more'&&redPotCountRef>0" 
                                    :class="item.path==current_path?'top-5 right-3':'top-5 right-3'"
                                    class="w-3 h-3 text-[0.5625rem] !leading-none bg-texterror  text-theme-text  rounded-full absolute flex items-center justify-center">
                                        <b>{{ redPotCountRef }}</b>
                                    </div>
                            </li>
                        </template>
                    </ul>
                    <!-- <div class="w-full " style="padding-bottom: env(safe-area-inset-bottom);"></div> -->
                  
                </footer>
            </div>
        </template>
    </teleport>
</template>

<style scoped>
.rotating-element {
    animation: rotate 2s linear infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>