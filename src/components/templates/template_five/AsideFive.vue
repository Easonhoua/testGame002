<script setup>
import { watch,ref, computed } from 'vue'
import { fn } from '@/i18n'
import { isAuthRef, memberLocal } from '@/model/user'
import { redPakageStateRef} from '@/model/other'
import { gameLogo, appIcon} from '@/model/pwa'
import { useThemeImages } from '@/utils/themeimg'
import { socialMenuListRef} from '@/model/common'
const AsideImg = useThemeImages().aside
const CommonImg = useThemeImages().common 
const HomeImg = useThemeImages().home 
const MineImg = useThemeImages().mine 
// 获取共用逻辑
import { useHome } from '@/composables/useHome'
import { useAside } from '@/composables/useAside'
import { t } from '@/i18n.js' 
const openFirm = ref(false)
const openActivity = ref(true)
const props = defineProps({
    modelValue: Boolean,
    navList: [Array, Object],
    hashSign: Boolean,
})


// 每次打开侧边栏时，展开“活动”
watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
        openActivity.value = true
        openFirm.value = false
    }
})

const emits = defineEmits(['update:modelValue'])

function close() {
    emits('update:modelValue', false)
}
function openlist() {
    if(openActivity.value){
        openActivity.value=false
        openFirm.value = !openFirm.value
    }else{
        openFirm.value = !openFirm.value
    }
   
    
}
function openlisttwo(){
    if(openFirm.value){
        openFirm.value=false
        openActivity.value = !openActivity.value
    }else{
        openActivity.value = !openActivity.value
    }
}

const curentji = computed(()=>{
    const level = memberLocal.value?.current_level
    return (level == null || level <= 1) ? 1 : level
})

const { 
    top,
    redPakageEndFunc,
    closeByClick,
    onclickNav,
    onclickNoNav,
    openService,
    toLogin,
    toRegister,
    onToProfile,
    copyInviteCode,
    gameListRef,
    openGameAll,
} = useAside(close)




</script>

<template>
    <teleport to="body">
        <transition name="aside">
            <section v-if="modelValue" class="w-full h-full absolute left-0 top-0 z-[99] ">
                <div class="w-wrap max-w-full h-full mx-auto bg-black/50 relative">
                    <em @click="closeByClick()" class="w-full h-full bg-black/50 block"></em>
                    <aside
                        class="w-[70%] max-w-[400px] h-full text-aside-text absolute left-0 p top-0 flex flex-col bg-default-bg overflow-auto"
                        style=" padding-bottom: env(safe-area-inset-bottom);">
                        <i :style="`height: ${top};`" class="w-full block shrink-0"></i>
                        <div class="w-full h-[3.75rem] px-4 flex items-center shrink-0">
                            <button @click="closeByClick()" class="w-9 h-9 mt-2 mr-4">
                                <!-- <img :src=CommonImg.btn_back class="w-9 h-9"/> -->
                            </button>
                            <div class="flex-1 overflow-hidden">
                                <img :src=gameLogo class="w-full h-7.5 object-contain object-right max-w-[8rem]">
                            </div>
                        </div>
                        <div class="w-full h-[5rem] px-4  flex items-center justify-left bg-tablebg"
                            v-if="isAuthRef">
                            <van-image :src="memberLocal.head_portrait || appIcon" width="2.75rem" height="2.75rem"
                                radius="0.5rem" class="mr-2 shrink-0" />
                            <div class=" overflow-hidden">
                                <h3 class="flex items-center">
                                    <span class="text-sm align-middle m4-text">{{ memberLocal.nickname }}</span>
                                    <div class="flex items-center ml-2 relative">
                                        <img
                                        :src="MineImg['icon_vip' + curentji]"
                                        class="w-[1.25rem] h-[1.25rem] -mr-1 relative z-10"
                                        />
                                        <img
                                        :src="MineImg['icon_vipkuang' + curentji]"
                                        class="w-[2.125rem] h-[0.825rem]"
                                        />
                                        <p
                                        class="absolute right-1.5 top-1 text-[0.525rem] text-themewhite"
                                        >
                                        VIP {{ memberLocal&&memberLocal.current_level }}
                                        </p>
                                    </div>
                                </h3>
                                <div @click.stop.prevent="copyInviteCode(memberLocal.id)"
                                    class="text-xs  px-1 rounded-lg "
                                    style="min-width: 1rem;max-width: 10rem;display: inline-block;">
                                    <div class="flex items-center">
                                        <span class="align-middle text-white">ID: {{ memberLocal.id }}</span>
                                        <img :src="CommonImg.icon_copy" class="w-3 h-3 ml-1 " />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- overflow-y-auto -->
                        <!-- <section class="w-full px-3 flex-1 " > -->
                        <div class="w-full  pb-1 pt-[0.1rem] text-default-text px-4">
                            <ol v-if="!isAuthRef" class="w-full h-9 flex items-center mt-2 mb-2">
                                <li class="w-1/2 h-full pr-1.5 ">
                                    <a href="javascript:;" @click="toLogin()"
                                        class="w-full h-full text-center text-themewhite font-bold  m5-theme-inputwithoutborder  rounded-lg   flex items-center justify-center">
                                        <span>Entrar</span>
                                    </a>
                                </li>
                                <li class="w-1/2 h-full pl-1.5">
                                    <a href="javascript:;" @click="toRegister()"
                                        class="w-full h-full text-center  text-themewhite font-bold m5-theme-btn1 rounded-lg   flex items-center justify-center">
                                        <span>Registro</span>
                                    </a>
                                </li>
                            </ol>
                            <div v-if="isAuthRef">
                                <div class=" w-full rounded-lg  m5-theme-input text-center my-2 py-1 font-bold">
                                    <span class="text-[1rem] text-themetext0 ">R$ {{
                                        fn(memberLocal.account && memberLocal.account.user_money || 0) }}</span>
                                </div>
                                <dl class="w-full h-8 text-xs flex mt-1 mb-1 gap-4">
                                    <dd class="w-1/2 pr-1.5 bg-gradient-to-b from-inputcolor1 to-inputcolor2 rounded-lg">
                                        <router-link to="/recharge" @click="onclickNoNav()"
                                            class="w-full h-full rounded-[1rem]  text-center flex items-center justify-center">
                                            <img :src="MineImg.icon_pig" class="w-5 h-5 mr-1 shrink-0" />
                                            <span>Depósito </span>
                                        </router-link>
                                    </dd>
                                    <dd class="w-1/2 pl-1.5 bg-gradient-to-b from-inputcolor1 to-inputcolor2 rounded-lg">
                                        <router-link to="/withdrawal" @click="onclickNoNav()"
                                            class="w-full h-full rounded-[1rem] text-center  flex items-center justify-center">
                                            <img :src="MineImg.icon_saque" class="w-5 h-5 mr-1 shrink-0" />
                                            <span>Saque</span>
                                        </router-link>
                                    </dd>
                                </dl>

                            </div>
                        </div>
                        
                        <!-- <div class="px-4"> -->
                            <!-- 厂商 -->
                            <div class="  mx-2 px-3 py-2 mt-1 flex flex-between items-center unified-button "
                                :style="{ backgroundImage: `url(${AsideImg.img_changfenlei})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                 }"
                                @click="openlist()">
                                <div class="flex-1 flex items-center" >
                                    <!-- <img :src="AsideImg.icon_lobby2"
                                        class="w-4 " /> -->
                                    <span class="text-[0.88rem] font-bold ml-6 ">Classificação</span>
                                </div>
                                <div class="bg-inputborder w-6 h-6 rounded-lg flex items-center justify-center">
                                    <img :src="openFirm ? AsideImg.icon_down : AsideImg.icon_close" alt=""
                                    :class="openFirm ? 'w-3 h-2' : 'w-2 h-3'" />
                                </div>
                                
                            </div>
                            <!-- 厂商 -->
                            <div class="flex items-center justify-between flex-col w-full mt-2" v-show="openFirm">
                                <div class="flex items-center justify-between  w-full"
                                    v-for="item, index in gameListRef" :key="index">
                                    <a @click="openGameAll(item.id)" href="javascript:;"
                                        class="px-6 w-full unified-button">
                                        <div
                                            class="game-icon-container px-2 w-full flex items-center py-1">
                                            <img :src="item.cover_home" class="game-icon w-6 h-6 mr-3 ">
                                            <p class="text-center  text-[0.88rem] text-themetext3">{{ item.title }}</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <!-- 活动：厂商展开时固定底部，收起时回到标签下方 -->
                            <!-- <div class="activity-container" :class="{ 'fixed-bottom': openFirm }"> -->
                                <!-- 活动 -->
                                <!-- <div class="mx-4 m-auto rounded-2xl px-3 py-2 mt-3 flex flex-between items-center unified-button "
                                    :class="openActivity ? 'm4-ten-btn' : 'bg-tablebg'"
                                    @click="openlisttwo()">
                                    <div class="flex-1 flex items-center ">
                                        <img :src="openActivity ? AsideImg.icon_promotion3 :AsideImg.icon_promotion2"
                                            class="w-4 " />
                                        <span class="text-[0.88rem] font-bold ml-1"
                                            :class="openActivity ? '' : 'm4-text'">Promoções</span>
                                    </div>
                                    <img :src="openActivity ?  AsideImg.icon_down : AsideImg.icon_close" alt=""
                                        :class="openActivity ? 'w-3 h-2' : 'w-2 h-3'" />
                                </div> -->

                                <div class="w-[90%] border-t border-tablebg1 my-4  mx-auto relative z-10 ">
                                </div>


                                <div class="px-2">
                                    <nav class="w-full text-[0.525rem] flex flex-wrap  gap-2">
                                        <template v-for="item, index in navList" :key="index">
                                            <a @click="onclickNav(item.activity_type)" href="javascript:;"
                                                class="w-[48%] flex items-center unified-button bg-btn1_bg border border-btn_border rounded-lg ">
                                                <div class="w-[2.6rem] h-[2.6rem] relative mr-2">
                                                    <img :src="item.icon" class="w-full h-full object-contain">
                                                    <div v-if="item.activity_type != 'sign_in' && item.count > 0"
                                                        class="w-3 h-3 text-[0.725rem] !leading-none bg-texterror  text-three   rounded-full absolute top-0.5 right-0.5 flex items-center justify-center">
                                                        <b>{{ item.count }}</b>
                                                    </div>
                                                    <div v-if="item.activity_type == 'sign_in' && hashSign"
                                                        class="w-3 h-3 text-[0.725rem] !leading-none bg-texterror  text-three   rounded-full absolute top-0.5 right-0.5 flex items-center justify-center">
                                                        <b>1</b>
                                                    </div>
                                                    <div v-if="item.activity_type == 'red_packet' && redPakageStateRef.status == 1"
                                                        class="w-3 h-3 text-[0.725rem] !leading-none bg-texterror  text-three   rounded-full absolute top-0.5 right-0.5 flex items-center justify-center">
                                                        <b>1</b>
                                                    </div>
                                                </div>
                                                <p v-if="item.activity_type == 'red_packet'"
                                                    class="text-left text-[0.725rem] text-themewhite font-bold flex-1  truncate">
                                                    <span v-if="redPakageStateRef.status >= 1">{{ item.title
                                                    }}</span>
                                                    <van-count-down v-else :time="redPakageStateRef.time"
                                                        @finish="redPakageEndFunc()" format="HH:mm:ss"
                                                        class="!text-themewhite  " />
                                                </p>
                                                <p v-else class="text-left text-[0.725rem] text-themewhite font-bold flex-1  truncate">{{
                                                    item.title }}</p>
                                            </a>
                                        </template>
                                    </nav>
                                </div>

                            <!-- </div> -->

                        <!-- </div> -->

                        <!-- </section> -->

                        <!-- <section class="w-full px-3 flex-1 overflow-y-auto relative">
                           
                        </section> -->
                        <!-- <div class="w-[90%] h-[1px] bg-themetext3 my-6 mx-auto"></div> -->

                        <!-- <section class="w-full px-4">
                            <div class="w-full h-full relative left-0 top-0 flex items-center justify-center gap-4">
                                <div class="w-1/2 h-[2rem] rounded-full m5-theme-btn1 flex items-center justify-center border border-inputborder">
                                    <van-image :src=HomeImg.img_IOS  lazy-load alt="Background Info" class="w-[1.2rem] h-[1.2rem] mr-3"/>
                                    <p class="text-white text-[0.7rem] font-bold"> iOS</p>
                                </div>
                                <div class="w-1/2 h-[2rem] rounded-full m5-theme-btn1 flex items-center justify-center border border-inputborder">
                                    <van-image :src=HomeImg.img_Android  lazy-load alt="Background Info" class="w-[1.2rem] h-[1.2rem] mr-3"/>
                                    <p class="text-white text-[0.7rem] font-bold"> Android</p>
                                </div>
                            </div>
                        </section>  -->
                        <div class="w-[90%]  border-t border-tablebg1 my-6 mx-auto text-transparent relative z-10">
                        </div>
                        <section class="w-full px-2">
                            <div class="w-full px-2 pb-3 relative bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 border border-thirsmodelboder rounded-lg flex flex-col items-center justify-center">
                                <p class="text-themetext3 text-lg font-bold mb-2">Compartihar</p>
                                <div
                                    class="w-full  inset-0 flex justify-center items-center gap-10">
                                    <a v-for="(item, index) in socialMenuListRef" :key="index" :href="item.link"
                                        target="_blank" rel="noopener noreferrer" class="px-2 flex items-center">
                                        <img :src="item.icon"
                                            class="w-[1.5rem] h-[1.5rem] object-contain cursor-pointer" />
                                    </a>
                                </div>
                                <p class="text-themetext3 text-[0.525rem] font-bold">Compartilhe com seus amigos e ganhe grandes premios.</p>
                            </div>
                        </section>
                        <div style="padding-bottom: env(safe-area-inset-bottom);">
                            <em class="w-full h-4 block"></em>
                        </div>
                    </aside>
                </div>
            </section>
        </transition>
    </teleport>
</template>
<style scoped>
.aside-enter-active, .aside-leave-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 200ms ease-in;
    overflow: hidden;
}
.aside-enter-from, .aside-leave-to {
    opacity: 0;
    transform: translateX(-150px);
    transition: all 200ms ease-in;
    overflow: hidden;
}

</style>