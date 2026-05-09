<script setup>
import { ref } from 'vue'
import { useThemeImages } from '@/utils/themeimg'
const FooterImg = useThemeImages().footer
const menu_list = ref([
        { icon: FooterImg.icon_home1, actIcon: FooterImg.icon_home2, path: '/' },
        { icon: FooterImg.icon_more1, actIcon: FooterImg.icon_more2, path: '/more' },
        { icon: FooterImg.icon_agent1, actIcon: FooterImg.icon_agent2, path: '/agent' },
        { icon: FooterImg.icon_wallet1, actIcon: FooterImg.icon_wallet2, path: '/recharge', auth: true },
        { icon: FooterImg.icon_user1, actIcon: FooterImg.icon_user2, path: '/mine', auth: true },
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
            <img :src=FooterImg.bg_footer class="w-full h-[3.25rem] absolute left-0 top-0 block">
            <ul class="w-full h-[3.25rem] relative flex">
                <template v-for="item,index in menu_list" :key="index">
                    <li @click="onclickMenu(item)" class="w-1/5 h-[3.875rem] -mt-2.5 cursor-pointer flex justify-center">
                        <div class="relative">
                            <!-- <img :src="item.path==current_path?item.actIcon:item.icon" class="w-[3.875rem] h-[3.875rem]"> -->
                            <!-- 未选中状态图标 -->
                            <img 
                                :src="item.icon" 
                                class="w-[3.875rem] h-[3.875rem]"
                                v-show="item.path !== current_path"
                            >
                            <!-- 选中状态图标 -->
                            <img 
                                :src="item.actIcon" 
                                class="w-[3.875rem] h-[3.875rem]"
                                v-show="item.path === current_path"
                            >
                            <div 
                            v-if="item.path=='/more'&&redPotCountRef>0" 
                            :class="item.path==current_path?'top-1 right-3':'top-3.5 right-3'"
                            class="w-3 h-3 text-[0.5625rem] !leading-none bg-two text-themewhite rounded-full absolute flex items-center justify-center">
                                <b>{{ redPotCountRef }}</b>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
            <div class="w-full bg-default-bg" style="padding-bottom: env(safe-area-inset-bottom);"></div>
        </footer>
    </div>
    </teleport>
</template>