<script setup>
import { computed, ref, onMounted, nextTick, watch } from 'vue'
import { t } from '@/i18n'
import { useScreenSafeArea, useElementSize } from '@vueuse/core'
import { isAuthRef } from '@/model/user'
import { useRoute, useRouter } from 'vue-router'
import { isPwaFunc, playBtnAudioFunc } from '@/utils/core'
import { originFullUrlsRef, openLoginFunc,footShowRef,isEverLoginFunc,gameModeType} from '@/utils/config'
import { appIcon} from '@/model/pwa' 
import { useThemeImages } from '@/utils/themeimg'
const CommonImg = useThemeImages().common 
const CommonBgImg = useThemeImages().commonbg
const HomeImg = useThemeImages().home
const { top, bottom } = useScreenSafeArea()
import { useAside } from '@/composables/useAside'
const route = useRoute()
const router = useRouter()
const props = defineProps({
    styleString: String,
    hideBack: Boolean,
    hideHeader: Boolean,
    title: String,
    height: String,
    background: String,
    color: String,
    iconColor: String,
    hideBox: Boolean,
    hideService: Boolean,
    fixed: {
        type: Boolean,
        default: true
    },
    arrowBack: {
        type: Boolean,
        default: true
    },
    down: Boolean,
})
const emits = defineEmits(['back'])
const topbackgroundStyle = computed(() => ({
  backgroundImage: `url(${HomeImg.img_topBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}))

function back() {
    playBtnAudioFunc('close')
	if(props.arrowBack) {
        const canGoBack = window.history.state?.back
        if (canGoBack === undefined || canGoBack === null) {
            router.push('/')
        } else {
            router.back()
        }
	}else {
		emits('back');
	}
}

const down_el = ref(null)
const down_data = useElementSize(down_el)
const down_height = computed(()=> {
    return down_data.height.value
})
const down_show = ref(true)

// const body_bg = computed(()=> {
//     console.log(route.meta.bgType ? 'bg_'+route.meta.bgType : 'bg_2',789456)
//     return route.meta.bgType ? 'bg_'+route.meta.bgType : 'bg_2'
// })

watch(()=> isAuthRef.value, ()=> {
    if(!route.meta.noAuth && !isAuthRef.value) {
        if(isEverLoginFunc()) {
            openLoginFunc(0)
        }else{
            openLoginFunc(1)
        }
        router.push('/')
    }
})

var routeQuery = {}
if (originFullUrlsRef.value.length >= 2) {
    let params = originFullUrlsRef.value[1].split('&');
    for (var i = 0; i < params.length; i++) {
        var items = params[i].split('=');
        if (items.length == 2) {
            routeQuery[items[0]] = items[1]; 
        }
    }
}
function isObjectEqual(obj1, obj2) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
  
    if (obj1Keys.length !== obj2Keys.length) {
      return false;
    }
  
    for (let key of obj1Keys) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  
    return true;
}
let is_replace = false;
router.beforeEach((to, from, next) => {
    if((to.name == 'login' || to.name == 'register') && from.name !== 'home') {
        is_replace = true;
    }else {
        is_replace = false;
    }
    let query_data = {
        ...to.query,
        ...routeQuery
    }
    if (to.name&&from.name&&to.name != from.name&&!isObjectEqual(to.query, query_data)) {
      next({
        name: to.name,
        query: query_data,
        replace: is_replace
      });
    } else {
      next();
    }
});

onMounted(()=> {
    nextTick(()=> {
        if(!route.meta.noAuth && !isAuthRef.value) {
            if(isEverLoginFunc()) {
                openLoginFunc(0)
            }else{
                openLoginFunc(1)
            }
            router.push('/')
        }
    })
})
function closeDown() {
    playBtnAudioFunc()
    down_show.value = false
}
function toDown() {
    playBtnAudioFunc()
    window.location.href = window.downurl
}
const { 
    openService,
} = useAside(close)


</script>

<template>
    <!-- route.meta.bgType ? 'bg_'+route.meta.bgType : 'bg_2' -->
    <div id="main"  class="w-full h-full flex flex-col relative z-10"  v-if="currentTemplate.value =='template_one'|| currentTemplate.value =='template_two'|| currentTemplate.value =='template_three'"
        :style="route.meta.bgType?{background: `url(${CommonBgImg.bg_body_1})center no-repeat`, backgroundSize: 'cover' }:{background: `url(${CommonBgImg.bg_body_2}) center no-repeat`, backgroundSize: 'cover' }" >
        <template v-if="!hideHeader">
            <header :class="[
                color ? color :currentTemplate.value =='template_two'? 'text-three font-bold':'text-themewhite',
                background ? background : '',
            ]" :style="`padding-top: ${top}; `" class="w-full relative z-50 box-content shrink-0">

                <div ref="down_el" class="w-full" v-if="currentTemplate.value =='template_one'">
                    <dl v-if="down&&down_show&&!isPwaFunc()&&(gameModeType!=3)&&(gameModeType!=2)" class="w-full h-[2.825rem] px-3  bg-gradient-to-r from-themecardlinear2 to-themecardlinear1 flex items-center">
                        <dd class="flex-1 overflow-hidden flex items-center">
                            <img :src=appIcon class="w-8 h-8 mr-2 rounded-md object-contain object-left shrink-0">
                            <span class="text-xs">
                                {{ t('pageTitle.downLoad1') }}
                                <br>
                                {{ t('pageTitle.downLoad2') }}
                            </span>
                            <img :src=CommonImg.icon_gift class="w-8 h-8 ml-1" v-if="currentTemplate.value =='template_one'">
                        </dd>
                        <dd class="ml-1 flex shrink-0">
                           
                            <a @click="toDown()" href="javascript:;" class="h-[1.875rem] px-3 text-xs bg-rgbawhite80 text-themetext rounded-lg flex items-center" >
                                <span>{{ t('install') }}</span>
                            </a>
                        </dd>
                        <dd class="w-[1.3rem] h-[1.3rem] p-1 ml-2 bg-rgbablack30 rounded-full flex shrink-0" >
                            <em @click="closeDown()" class="w-full h-full p-1 bg-themewhite text-themetext rounded-full flex">
                                <icon-close size="6" class="w-full h-full"></icon-close>
                            </em>
                        </dd>
                       
                    </dl>
                </div>
                <div ref="down_el" class="w-full" v-else>
                    <dl v-if="down&&down_show&&!isPwaFunc()&&(gameModeType!=3)&&(gameModeType!=2)" class="w-full h-[2.825rem] px-3 flex items-center"
                    :style="{backgroundImage: `url(${CommonBgImg.bg_down_top})`,}"
                    style="background-repeat: no-repeat; background-size: 100% 100%;"
                    >
                        <dd class="flex-1 overflow-hidden flex items-center">
                            <img :src=appIcon class="w-8 h-8 mr-2 rounded-md object-contain object-left shrink-0">
                            <span class="text-xs text-themewhite">
                                {{ t('pageTitle.downLoad1') }}
                                <br>
                               {{ t('pageTitle.downLoad2') }}
                            </span>
                        </dd>
                        <dd class="ml-1 flex shrink-0">   
                            <a @click="toDown()" href="javascript:;" class="h-[1.875rem] px-3 text-xs  text-themewhite flex items-center  rounded-[3rem] "
                            :style="{background: `url(${HomeImg.img_homeDown}) no-repeat`,backgroundSize: '100% 100%'}"
                            >
                                <img :src="HomeImg.img_topDown" class="w-4 h-4 mr-2">
                                <span>{{ t('install') }}</span>
                            </a>
                        </dd>
                        <img :src="HomeImg.img_topClose"  @click="closeDown()" class="w-[0.88rem] h-[0.88rem] ml-2"/>

                    </dl>
                    
                </div>
                <!-- :style="background: url('/imgs/home/home-top-bg.png') no-repeat; background-size: 100% 100%;" -->
                <div :class="[height ? height : 'h-[3.125rem]']" class="w-full relative z-20" :style="currentTemplate.value =='template_one'?'':topbackgroundStyle">
                    <div v-if="!hideBack" @click="back()" :class="iconColor ? iconColor : ''" class="px-3 h-full absolute left-0 top-0 flex justify-center items-center cursor-pointer">
                        
                        <img :src=CommonImg.btn_back class="w-9 h-9 mt-1">
                    </div>
                    <div v-else class="absolute top-0 left-0 h-full flex items-center">
                        <slot name="left"></slot>
                    </div>
                    <div v-if="title" class="w-full h-full flex justify-center items-center">
                        <h3 class="text-base text-themetext2 leading-4 opacity-85 text-center capitalize" >
                            <span>{{title}}</span>
                        </h3>
                    </div>
                    <div v-else class="w-full h-full flex justify-center items-center">
                        <slot name="center"></slot>
                    </div>
                    <div class="absolute top-0 right-0 h-full flex items-center">
                        <slot name="right"></slot>
                    </div>
                </div>
                <slot name="bottom"></slot>
            </header>
        </template>

        <slot name="other"></slot>

            <div id="main-content" class="w-full relative flex-1 overflow-y-auto">
                <slot></slot>
            </div>
       
            <!-- <keep-alive>
                <pu-footer v-show="$route.meta.tabar"></pu-footer>
            </keep-alive> -->
            <!-- <div :class="['page-content', { 'ios-page': isIOS }]">
            </div> -->
            <!-- 底部占位符（兼容所有浏览器） -->
            
    </div>
    <div id="main"  class="w-full h-full flex flex-col relative z-10 bg-body-bg"  v-else-if="currentTemplate.value =='template_five'">
        <template v-if="!hideHeader">
            <header  :style="`padding-top: ${top}; `" class="w-full relative z-50 box-content shrink-0">
                <div ref="down_el" class="w-full" >
                    <dl v-if="down&&down_show&&!isPwaFunc()&&(gameModeType!=3)&&(gameModeType!=2)" class="w-full h-[3.425rem] pl-8 pr-4 flex items-center relative"
                    :style="{backgroundImage: `url(${CommonBgImg.bg_down_top})`,}"
                    style="background-repeat: no-repeat; background-size: 100% 100%;"
                    >
                        <div  @click="closeDown()" class="w-[1.88rem] h-[1.88rem] absolute top-0 left-0 z-10"></div>
                        <dd class="flex-1 overflow-hidden flex items-center">
                            <img :src=appIcon class="w-8 h-8 mr-2 rounded-md object-contain object-left shrink-0">
                            <span class="text-xs text-themewhite">
                                {{ t('pageTitle.downLoad1') }} 
                                <br>
                                {{ t('pageTitle.downLoad2') }}
                            </span>
                        </dd>
                        <dd class="ml-1 flex shrink-0 w-[6rem]" >   
                            <img @click="toDown()" :src="HomeImg.img_topDown" class="w-full h-full mr-2">
                        </dd>
                    </dl>
                    
                </div>
                <!-- :style="background: url('/imgs/home/home-top-bg.png') no-repeat; background-size: 100% 100%;" -->
                <div :class="[height ? height : 'h-[3.125rem]']" class="w-full relative z-20" :style="topbackgroundStyle">
                    <div v-if="!hideBack" @click="back()" :class="iconColor ? iconColor : ''" class="px-3 h-full absolute left-0 top-0 flex justify-center items-center cursor-pointer">
                        
                        <img :src=CommonImg.btn_back class="w-9 h-9 mt-1">
                    </div>
                    <div v-else class="absolute top-0 left-0 h-full flex items-center">
                        <slot name="left"></slot>
                    </div>
                    <div v-if="title" class="w-full h-full flex justify-center items-center">
                        <h3 class="text-base text-themewhite font-bold leading-4 opacity-85 text-center capitalize" style="max-width: 60%;">
                            <span>{{title}}</span>
                        </h3>
                    </div>
                    <div v-else class="w-full h-full flex justify-center items-center">
                        <slot name="center"></slot>
                    </div>
                    <div class="absolute top-0 right-0 h-full flex items-center">
                        <slot name="right"></slot>
                    </div>
                </div>
                <slot name="bottom"></slot>
            </header>
        </template>

        <slot name="other"></slot>

            <div id="main-content" class="w-full relative flex-1 overflow-y-auto">
                <slot></slot>
            </div>
       
            <!-- <keep-alive>
                <pu-footer v-show="$route.meta.tabar"></pu-footer>
            </keep-alive> -->
            <!-- <div :class="['page-content', { 'ios-page': isIOS }]">
            </div> -->
            <!-- 底部占位符（兼容所有浏览器） -->
            
    </div>
    <div id="main"  class="w-full h-full flex flex-col relative z-10 !bg-default-bg" v-else>
        <template v-if="!hideHeader">
            <header :class="[
                color ? color : 'm4-text font-bold',]" :style="`padding-top: ${top};`" class="w-full relative z-50 box-content shrink-0 ">
                <div ref="down_el" class="w-full " >
                    <dl v-if="down&&down_show&&!isPwaFunc()&&(gameModeType!=3)&&(gameModeType!=2)" class="w-full h-[2.825rem] px-3   flex items-center"
                    :style="{backgroundImage: `url(${CommonBgImg.bg_down_top})`,}"
                    style="background-repeat: no-repeat; background-size: 100% 100%;" >
                        <dd class="flex-1 overflow-hidden flex items-center">
                            <img :src=appIcon class="w-8 h-8 mr-2 rounded-md object-contain object-left shrink-0">
                            <span class="text-xs text-white">
                                {{ t('pageTitle.downLoad1') }}
                                <br>
                                {{ t('pageTitle.downLoad2') }}
                            </span>
                            <!-- <img src="/imgs/down_gift.png" class="w-8 h-8 ml-1"> -->
                        </dd>
                        <dd class="ml-1 flex shrink-0 ">
                            <a @click="toDown()" href="javascript:;" class="h-[1.875rem] px-3 text-xs  text-theme flex items-center rounded-[0.5rem]"
                            :style="{background: `url(${HomeImg.img_homeDown}) no-repeat`,backgroundSize: '100% 100%'}"
                            >
                                <img :src="HomeImg.img_topDown" class="w-4.5 h-4 mr-2">
                                <span>{{ t('install') }}</span>
                            </a>
                        </dd>
                        <img :src="HomeImg.img_topClose"  @click="closeDown()" class="w-[0.88rem] h-[0.88rem] ml-2"/>
                        <!-- <dd class="w-[1.3rem] h-[1.3rem] p-1 ml-2 bg-black/30 rounded-full flex shrink-0">
                            <em @click="closeDown()" class="w-full h-full p-1 bg-theme-text text-theme rounded-full flex">
                                <icon-close size="6" class="w-full h-full"></icon-close>
                            </em>
                        </dd> -->
                    </dl>
                </div>
                <div :class="[height ? height : 'h-[3.125rem]']" class="w-full relative z-20 bg-tablebg" >
                    <div v-if="!hideBack" @click="back()" :class="iconColor ? iconColor : ''" class="px-3 h-full absolute left-0 top-0 flex justify-center items-center cursor-pointer " >
                        <!-- <div class="w-9 h-9 bg-header-text/[0.08] rounded-md flex justify-center items-center">
                            <svg class="h-5 w-5 text-header-text/45" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </div> -->
                        <img :src=CommonImg.btn_back class="w-9 h-9 ">
                    </div>
                    <div v-else class="absolute top-0 left-0 h-full flex items-center">
                        <slot name="left"></slot>
                    </div>
                    <div v-if="title" class="w-full h-full flex justify-center items-center flex-1">
                        <h3 class="m4-text leading-4 opacity-85 text-center capitalize" >
                            <span>{{title}}</span>
                        </h3>
                    </div>
                  
                    <div v-else class="w-full h-full flex justify-center items-center">
                        <slot name="center"></slot>
                    </div>
                    <div class="absolute top-0 right-0 h-full flex items-center">
                        <slot name="right"></slot>
                    </div>
                      <div v-if="hideService" class=" px-1 absolute top-0 right-2 h-full flex items-center">
                        <a href="javascript:;" @click="openService()" class="w-9 h-9 ml-2 rounded-lg  flex items-center justify-center bg-theme-light">
                            <img :src=CommonImg.btn_service >
                        </a>
                    </div>
                </div>
                <slot name="bottom"></slot>
            </header>
        </template>

        <slot name="other"></slot>

            <div id="main-content" class="w-full relative flex-1 overflow-y-auto main-bg mt-[-0.1rem]" >
                <slot></slot>
            </div>
            <!-- 修改底部占位符，添加safe-area-inset-bottom支持 -->
            <!--  -->
            <!-- <div v-if="footShowRef" style="padding-bottom: env(safe-area-inset-bottom);">
                <em class="w-full block " 
                    :style="{ height: `calc(3.125rem + env(safe-area-inset-bottom, 0px))` }"></em>
            </div> -->
       
            <!-- <keep-alive>
                <pu-footer v-show="$route.meta.tabar"></pu-footer>
            </keep-alive> -->
            <!-- <div :class="['page-content', { 'ios-page': isIOS }]">
            </div> -->
            <!-- 底部占位符（兼容所有浏览器） -->
    </div>
</template>

<style>
/* 全局样式（放在 App.vue 或全局 CSS 中） */
html, body {
    height: 100%;
    overflow: hidden; /* 禁止 body 默认滚动 */
}
#main {
    height: 100vh; /* 占满整个视口 */
    overflow: hidden; /* 防止 iOS 弹性滚动 */
}
#main-content {
    -webkit-overflow-scrolling: touch; /* iOS 平滑滚动 */
}
.page-content {
  padding-bottom: 3.25rem; /* Android 默认 */
}
.ios-page {
  padding-bottom: calc(3.25rem + env(safe-area-inset-bottom)); /* iOS 追加安全区域 */
}
</style>



