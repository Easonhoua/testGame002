<script setup>
import { ref } from 'vue'
import { useThemeImages } from '@/utils/themeimg'
const FooterImg = useThemeImages().footer
const menu_list = ref([
        { icon: FooterImg.icon_home1, actIcon: FooterImg.icon_home2, path: '/', txt:'Inicio'},
        { icon: FooterImg.icon_more1, actIcon: FooterImg.icon_more2, path: '/more',txt:'Promoção' },
        { icon: '', actIcon: '', path: '/agent',txt:'Comissão' },
        { icon: FooterImg.icon_wallet1, actIcon: FooterImg.icon_wallet2, path: '/recharge', auth: true,txt:'Depositar' },
        { icon: FooterImg.icon_user1, actIcon: FooterImg.icon_user2, path: '/mine', auth: true ,txt:'Perfil'},
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
            <img :src=FooterImg.bg_footer class="w-full h-[3.45rem] absolute left-0 top-0 block">
            <ul class="w-full h-[3.25rem] relative flex">
                <template v-for="item,index in menu_list" :key="index">
                    <li @click="onclickMenu(item)" class="w-1/5 h-[3.25rem] cursor-pointer flex justify-center">
                        <!-- 选中状态图标 -->
                            <img 
                                :src="FooterImg.icon_acyivity" 
                                class="w-[3.5rem] h-[3.5rem] mb-1 absolute z-0"
                                v-show="item.path === current_path"
                            >
                        <div class="w-full h-full relative flex flex-col items-center justify-center unified-button" >
                            <!-- <img :src="item.path==current_path?item.actIcon:item.icon" class="w-[3.875rem] h-[3.875rem]"> -->
                            <!-- 未选中状态图标 -->
                            <img 
                                :src="item.icon" 
                                class="w-[1.6rem] h-[1.6rem]"
                                v-if = "index != 2"
                            >
                            <div class="relative w-full h-full -mt-6 flex items-center justify-center" v-else>
                                <img 
                                    :src="FooterImg.img_tabcenter1" 
                                    class="absolute w-[3rem] h-[3rem]  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0"
                                >
                                 <img 
                                    :src="FooterImg.img_tabcenter2" 
                                    class="absolute w-[2.0rem] h-[2.0rem]  left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 z-10"
                                >
                                 <div class="absolute w-[4.2rem] h-[3.8rem]  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                                     <img 
                                        :src="FooterImg.img_tabcenter3" 
                                        class="w-full h-full self-animate-spin-counterclockwise"
                                    >
                                 </div>
                                <img 
                                    :src="FooterImg.img_tabcenter4" 
                                    class="w-[3rem] h-[3rem] left-1/2 self-animate-spin"
                                >
                            </div>


                            <p class="text-[0.625rem] text-rgbawhite50 font-bold" :class="{
                                'text-themewhite': item.path === current_path,
                            }"> {{ item.txt }}</p>
                            <div 
                            v-if="item.path=='/more'&&redPotCountRef>0" 
                            class="w-3 h-3 text-[0.5625rem] !leading-none bg-two text-themewhite rounded-full absolute flex items-center justify-center top-1 right-5">
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

<style>

/* 定义旋转动画 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 定义逆时针旋转动画 */
@keyframes spin-counterclockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

/* 应用动画到元素 */
.self-animate-spin {
  animation: spin 2s linear infinite;
}

/* 应用逆时针动画到元素 */
.self-animate-spin-counterclockwise {
  animation: spin-counterclockwise 2s linear infinite;
}

</style>