<script setup>
import { onMounted } from 'vue'
import { isAuthRef } from '@/model/user'
import { passModel } from '@/model/activity'
import { openLoginFunc } from '@/utils/config'
import { t,fn } from '@/i18n'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const PassImg = useThemeImages().pass
const CommonImg = useThemeImages().common
const { passBuyFunc, passRewardsFunc, passStatusRef, passPriceRef, isBuyPassRef, loginCountRef, betAmountRef, rechargeAmountRef, passListConfigRef, passRuleContent, allCountRef, showBuyPassRef } = passModel();

const currentDate = new Date();
const formattedDate = new Intl.DateTimeFormat('pt', {
    month: 'long',
    year: 'numeric'
}).format(currentDate);

onMounted(() => {

})


function showBuyPass() {
    if (!isAuthRef.value) {
        openLoginFunc(0)
        return
    }
    //打开购买弹窗
    showBuyPassRef.value = true
}

function handleBuyPass() {
    //关闭弹窗
    showBuyPassRef.value = false
    //购买Pass
    passBuyFunc()

}

function claimReward(item) {
    if (!isAuthRef.value) {
        openLoginFunc(0)
        return
    }
    //随便一个可领取
    if (item.bonus_recv == 1 || item.bonus_pass_recv == 1) {
        passRewardsFunc(item)
        return
    }

}

function closeBuyPass() {
    //关闭弹窗
    showBuyPassRef.value = false
}

</script>

<template>
     <pu-page :title="t('pageTitle.Pass')" class="z-[999]" v-if="currentTemplate.value == 'template_one'||currentTemplate.value == 'template_two'||currentTemplate.value == 'template_three'">
        <!-- 顶部banner -->
        <div class="banner relative">
            <img :src=PassImg.bg_pass alt="Grande Retorno de Depósito" class="w-full" />

            <div class="absolute inset-0 top-[52%] flex justify-center gap-24 items-center">
                <div class="text-themewhite text-xl font-bold flex items-center">
                    <img :src=PassImg.icon_gold class="w-6 h-6 mr-1" alt="coin" />
                    {{passPriceRef}}
                </div>
                <div class="text-themewhite text-xl font-bold flex items-center">
                    <img :src=PassImg.icon_gold class="w-6 h-6 mr-1" alt="coin" />
                    {{allCountRef}}
                </div>
            </div>
        </div>

        <pu-card theme="4" class="-mt-1" v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'">
            <div class="relative w-full overflow-hidden rounded-xl" 
                :style="{
                    backgroundImage: `url(${PassImg.bg_info})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                    }">
                <!-- 显示当前年月 -->
                <span class="absolute left-0 right-0 top-[0.4rem] text-center " :class="currentTemplate.value=='template_two'?'text-theme':'text-themetext'" style=" font-size: 0.8rem; font-weight: bold">
                        {{ formattedDate }}
                    </span>
                <!-- 数据展示区域 -->
                <div class="relative z-10 flex justify-around items-center py-6">
                    <!-- 等级 -->
                    <div class="flex flex-col items-center">
                        <div class="text-themewhite text-2xl font-bold">{{ rechargeAmountRef }}</div>
                        <div class="text-rgbawhite50 text-sm mt-1">{{ t('deposit') }} ({{ currentUnit.value }})</div>
                    </div>
                    
                    <!-- 积分 -->
                    <div class="flex flex-col items-center">
                        <div class="text-themewhite text-2xl font-bold">{{ betAmountRef }}</div>
                        <div class="text-rgbawhite50 text-sm mt-1">{{ t("commCenter.Bet") }} ({{ currentUnit.value }})</div>
                    </div>
                    
                    <!-- 天数 -->
                    <div class="flex flex-col items-center">
                        <div class="text-themewhite text-2xl font-bold">{{ loginCountRef }}</div>
                        <div class="text-rgbawhite50 text-sm mt-1">{{ t("enter") }} ({{ t("account.days") }})</div>
                    </div>
                </div>
            </div>
        </pu-card>

        <pu-card theme="4" class="-mt-1" v-else-if="currentTemplate.value=='template_three'">
            <div class="relative w-full overflow-hidden rounded-xl" 
                :style="{
                    backgroundImage: `url(${PassImg.bg_info})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                    }">
                <!-- 显示当前年月 -->
                <span class="absolute left-0 right-0 top-[0.4rem] text-center text-themetext4" style=" font-size: 0.8rem; font-weight: bold">
                        {{ formattedDate }}
                    </span>
                <!-- 数据展示区域 -->
                <div class="relative z-10 flex justify-around items-center py-6">
                    <!-- 等级 -->
                    <div class="flex flex-col items-center">
                        <div class="text-themewhite text-2xl font-bold">{{ rechargeAmountRef }}</div>
                        <div class="text-themewhite text-sm mt-1">{{ t('deposit') }} ({{ currentUnit.value }})</div>
                    </div>
                    
                    <!-- 积分 -->
                    <div class="flex flex-col items-center">
                        <div class="text-themewhite text-2xl font-bold">{{ betAmountRef }}</div>
                        <div class="text-themewhite text-sm mt-1">{{ t("commCenter.Bet") }} ({{ currentUnit.value }})</div>
                    </div>
                    
                    <!-- 天数 -->
                    <div class="flex flex-col items-center">
                        <div class="text-themewhite text-2xl font-bold">{{ loginCountRef }}</div>
                        <div class="text-themewhite text-sm mt-1">{{ t("enter") }} ({{ t("account.days") }})</div>
                    </div>
                </div>
            </div>
        </pu-card>

        <pu-card theme="4" class="mt-1" v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'">
            <img :src=PassImg.img_cardbg class="w-full px-1" />
            <div class="list -mt-10 flex flex-col items-center">
            <div 
                v-for="(item, index) in passListConfigRef" 
                :key="index" 
                class="item w-full h-full flex items-center justify-between"
                :style="{
                    background: (item.bonus_recv == 1 && item.bonus_pass_recv == 1 && item.bonus_pass_has_recv == 0) 
                        ? `url(${PassImg.img_itembg1}) no-repeat` 
                        : `url(${PassImg.img_itembg2}) no-repeat`,
                    backgroundSize: '100% 100%'
                }"
                @click="claimReward(item)" 
            >
                 <!-- 扫光效果 -->
                <div 
                    v-if="item.bonus_recv == 1 && item.bonus_pass_recv == 1 && item.bonus_pass_has_recv == 0"
                    class="light-effect"
                ></div>

                <!-- 前面的部分：图标和文字 -->
                <div class="flex flex-col items-center justify-center w-[7.7rem] h-[3.5rem] -ml-3">
                    <img
                        :src="item.cond === 'recharge'
                            ? PassImg.text_deposito
                            : item.cond === 'login'
                                ? PassImg.text_entrar
                                : PassImg.text_aposta"
                        class="lvImg mx-auto"
                    />
                    <div>
                        <span class="mt-0.5 text-sm text-rgbawhite50 text-center"> {{ item.cond === 'login' ? t('account.days') :  currentUnit.value  }} </span>
                        <span class="mt-0.5 ml-1 font-bold text-center"> {{ item.cond_num }}</span>
                    </div>
                </div>

                <!-- 中间部分 -->
                <div class="flex items-center justify-center w-[7.5rem] h-[3.75rem] relative">
                   
                    <div v-if="item.bonus_recv && item.bonus_recv == 1 && item.bonus_has_recv != 1 && item.bonus_pass_recv != 1" class="h-[3.75rem] w-[7.2rem] absolute inset-0 -left-0 top-[0.1rem] z-0"> 
                        <!-- 图片容器 -->
                        <div class="image-container">
                            <img :src=PassImg.img_choose alt="扫光背景图">
                            <!-- 扫光效果 -->
                            <div class="light-effect"></div>
                        </div>
                        
                    </div>
                    <span class="text-sm">{{ currentUnit.value }} </span>
                    <span class="pl-2 font-bold">{{ item.bonus }}</span>
                    <div v-if="item.bonus_has_recv && item.bonus_has_recv == 1"> 
                        <img 
                            :src=PassImg.icon_gou 
                            class="absolute bottom-2 right-1 w-4 h-4 yes" 
                        />
                    </div>
                </div>

                <!-- 后面的部分 -->
                <div class="flex items-center justify-center text-four w-[8.7rem] h-[3.6rem] relative">
                    <!-- 新增背景层 -->
                        <img 
                            :src=PassImg.img_gray
                            v-if="isBuyPassRef == 0" class="h-full  absolute inset-0 ml-[1rem] "
                        />
                    <span class="text-sm pl-3">{{ currentUnit.value }} </span>
                    <span class="pl-2 font-bold" >{{ item.bonus_pass }}</span>
                    <div v-if="item.bonus_pass_has_recv && item.bonus_pass_has_recv == 1">
                        <img 
                            :src=PassImg.icon_gou 
                            class="absolute bottom-2 -right-1 w-4 h-4 yes" 
                        />
                    </div>
                    <div v-if="isBuyPassRef == 0">
                        <img 
                            :src=PassImg.icon_suo 
                            class="absolute bottom-2 -right-1 w-4 h-5" 
                        />
                    </div>
                </div>
            </div>
            </div>
        </pu-card>

        <pu-card theme="4" class="mt-1" v-else-if="currentTemplate.value=='template_three'">
            <img :src=PassImg.img_cardbg class="w-full px-1" />
            <div class="list -mt-10 flex flex-col items-center">
            <div 
                v-for="(item, index) in passListConfigRef" 
                :key="index" 
                class="item w-full h-full flex items-center justify-between"
                :style="{
                    background: (item.bonus_recv == 1 && item.bonus_pass_recv == 1 && item.bonus_pass_has_recv == 0) 
                        ? `url(${PassImg.img_itembg1}) no-repeat` 
                        : `url(${PassImg.img_itembg2}) no-repeat`,
                    backgroundSize: '100% 100%'
                }"
                @click="claimReward(item)" 
            >
                 <!-- 扫光效果 -->
                <div 
                    v-if="item.bonus_recv == 1 && item.bonus_pass_recv == 1 && item.bonus_pass_has_recv == 0"
                    class="light-effect"
                ></div>

                <!-- 前面的部分：图标和文字 -->
                <div class="flex flex-col items-center justify-center w-[7.7rem] h-[3.5rem] -ml-3">
                    <img
                        :src="item.cond === 'recharge'
                            ? PassImg.text_deposito
                            : item.cond === 'login'
                                ? PassImg.text_entrar
                                : PassImg.text_aposta"
                        class="lvImg mx-auto"
                    />
                    <div>
                        <span class="mt-0.5 text-sm text-rgbawhite50 text-center"> {{ item.cond === 'login' ? t('account.days') :  currentUnit.value  }} </span>
                        <span class="mt-0.5 ml-1 font-bold text-center"> {{ item.cond_num }}</span>
                    </div>
                </div>

                <!-- 中间部分 -->
                <div class="flex items-center justify-center w-[7.5rem] h-[3.75rem] relative">
                   
                    <div v-if="item.bonus_recv && item.bonus_recv == 1 && item.bonus_has_recv != 1 && item.bonus_pass_recv != 1" class="h-[3.75rem] w-[7.3rem] absolute inset-0 -left-2 top-[0.1rem] z-0"> 
                        <!-- 图片容器 -->
                        <div class="image-container">
                            <img :src=PassImg.img_choose alt="扫光背景图">
                            <!-- 扫光效果 -->
                            <div class="light-effect"></div>
                        </div>
                        
                    </div>
                    <span class="text-sm">{{ currentUnit.value }} </span>
                    <span class="pl-2 font-bold">{{ item.bonus }}</span>
                    <div v-if="item.bonus_has_recv && item.bonus_has_recv == 1"> 
                        <img 
                            :src=PassImg.icon_gou 
                            class="absolute bottom-2 right-1 w-4 h-4 yes" 
                        />
                    </div>
                </div>

                <!-- 后面的部分 -->
                <div class="flex items-center justify-center text-themetext0 w-[7.5rem] h-[3.9rem] relative">
                    <!-- 新增背景层 -->
                    <div v-if="isBuyPassRef == 0" class="h-[3.9rem] w-[7.5rem] absolute inset-0 pl-1 z-0 top-[0.19rem]">
                        <img 
                            :src=PassImg.img_gray
                        />
                    </div>
                    <span class="text-sm pl-3">{{ currentUnit.value }} </span>
                    <span class="pl-2 font-bold" >{{ item.bonus_pass }}</span>
                    <div v-if="item.bonus_pass_has_recv && item.bonus_pass_has_recv == 1">
                        <img 
                            :src=PassImg.icon_gou 
                            class="absolute bottom-2 -right-1 w-4 h-4 yes" 
                        />
                    </div>
                    <div v-if="isBuyPassRef == 0">
                        <img 
                            :src=PassImg.icon_suo 
                            class="absolute bottom-2 -right-1 w-4 h-5" 
                        />
                    </div>
                </div>
            </div>
            </div>
        </pu-card>

         <!-- 规则区域 -->
         <pu-card theme="3" class="mb-3 pt-5"  v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent "  :class="[currentTemplate.value=='template_one'?' to-themewhite':' to-four']"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center"  :class="[currentTemplate.value=='template_one'?'':' text-four']">
                    <span>{{ t("ActivityDescription")  }}</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent"  :class="[currentTemplate.value=='template_one'?' to-themewhite':' to-four']"></em>
            </div>
            <div class="ctx-article p-mb text-sm " v-html="passRuleContent" style="line-height: 1.5;"  :class="[currentTemplate.value=='template_one'?' text-rgbawhite50':' text-theme']"> 
            </div>
        </pu-card>

        <pu-card theme="3" class="mb-3 pt-5"  v-else-if="currentTemplate.value=='template_three'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2" ></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-themetext2" >
                    <span>{{ t("ActivityDescription")  }}</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
            </div>
            <div class="ctx-article p-mb text-sm text-themetext3" v-html="passRuleContent" style="line-height: 1.5;"> 
            </div>
        </pu-card>


        <!-- 悬浮按钮 -->
        <div class="fixed left-1/2 -translate-x-1/2 bottom-0 w-wrap flex justify-center items-center z-50">
            <!-- 模糊背景，按钮高度+padding更高一些 -->
            <div class="absolute left-0 bottom-0 w-wrap h-24 backdrop-blur-md  " style=" opacity: 0.8;" :class="[currentTemplate.value=='template_one'?' bg-linear-19':' bg-tablergba40']"></div>
            <!-- 按钮 -->
            <!-- 已购买时显示图片 -->
            <img
                v-if="isBuyPassRef == 1"
                :src=PassImg.img_pay
                class="w-[80%] h-auto z-10 absolute bottom-4"
            />
            <button
                v-else
                class="w-[16rem] h-[3.5rem] z-10 absolute bottom-4 items-center justify-center text-lg flex font-bold text-themewhite"
                :style="{
                        backgroundImage: `url(${PassImg.btn_shop})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                        }"
                @click="showBuyPass"
                >
                      
                <span class="pl-1 pb-1 text-themewhite text-m font-bold flex items-center h-full">
                    {{ t("activityCenter.BuyPass") }} 
                </span>

                <span class="pl-1 pb-1 text-four font-bold text-m flex items-center h-full">
                     {{ currentUnit.value }} {{ passPriceRef }}
                </span> 
            </button>
        </div>
        <em class="w-full h-32 block"></em>

        <!-- 弹窗 -->
        <!-- showBuyPassRef -->
        <div v-if="showBuyPassRef" class="fixed inset-0 bg-rgbablack50 flex flex-col items-center justify-center z-50">
        
            <pu-card theme="3" class="relative flex flex-col items-center justify-center" v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'">
                <img :src=PassImg.bg_wind class="w-[23rem] h-full object-cover rounded-xl" />
                <div class="absolute inset-0 -top-20 flex flex-col items-center justify-center">
              
                    <div class="absolute top-10 right-2 flex items-center">
                        <button @click="closeBuyPass()" class="w-10 h-10 bg-rgbawhite30 rounded-full absolute right-0 top-0 flex items-center justify-center">
                                <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                                </svg>
                        </button>
                    </div>

                    <img :src=PassImg.img_passbg  class="w-32 h-auto"/>

                    <div class=" rounded-lg p-2 items-center justify-center flex h-18 w-32"
                    :class="[currentTemplate.value=='template_one'?'bg-searchbg':'bg-rgbablack50']"
                    > <!-- 背景色#241b61，高度h-16，宽度w-32 -->
                        <div class="text-four text-3xl font-bold" style="-webkit-text-stroke: 0.5px #622101;"> <!-- 文字颜色#fff000，描边#622101 -->
                            {{ currentUnit.value }}  {{ passPriceRef }}
                        </div>
                    </div>

                    <div class="text-center text-base px-20 mt-2 leading-none">
                        Compre o Passe deste mês e receba todas as recompensas de uma só vez.
                    </div>  
                </div>
            </pu-card>

            <pu-card theme="3" class="relative flex flex-col items-center justify-center" v-else-if="currentTemplate.value=='template_three'">
                <img :src=PassImg.bg_wind class="w-[23rem] h-full object-cover rounded-xl" />
                <div class="absolute inset-0 -top-20 flex flex-col items-center justify-center">
              
                    <div class="absolute top-10 right-2 flex items-center">
                        <button @click="closeBuyPass()" class="w-10 h-10 bg-rgbawhite30 rounded-full absolute right-0 top-0 flex items-center justify-center">
                                <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                                </svg>
                        </button>
                    </div>

                    <img :src=PassImg.img_passbg  class="w-32 h-auto mt-5"/>
<!-- 
                    <div class="flex text-center px-10 mt-6"
                    :class="[currentTemplate.value=='template_one'?'bg-searchbg':'bg-rgbablack50']"
                    > 
                        <div class="text-themetext0 text-3xl font-bold" style="-webkit-text-stroke: 0.5px #622101;">
                            {{ currentUnit.value }}  {{ passPriceRef }}
                        </div>
                    </div>

                    <div class="text-center text-base px-20 mt-2 leading-none">
                        Compre o Passe deste mês e receba todas as recompensas de uma só vez.
                    </div>   -->

                    <div class=" flex text-center px-10 mt-2">
                        <div class="bg-rgbablack50 rounded-lg items-center justify-center flex h-18 w-[10rem]"> <!-- 背景色#241b61，高度h-16，宽度w-32 -->
                        <div class="text-themetext0 text-xl font-bold" style="-webkit-text-stroke: 0.5px #0a2400;"> <!-- 文字颜色#fff000，描边#622101 -->
                            {{ currentUnit.value }}  {{ passPriceRef }}
                        </div>
                        </div>

                        <div class="text-center text-base mt-2 leading-none">
                            {{ t("activityCenter.activityDetail4") }}
                        </div> 
                    </div>

                </div>
            </pu-card>

            <pu-card theme="3" class="pt-5 flex flex-col items-center justify-center">
                <button
                        class="w-[16rem] h-[3rem] items-center justify-center text-xl pb-1 font-bold text-themewhite"
                        :style="{
                            backgroundImage: `url(${PassImg.btn_shop})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }"
                        @click="handleBuyPass"
                    >
                        {{ t("activityCenter.Buynow") }}
                </button>  
            </pu-card>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>
    <pu-page title="Passe" class="z-[999]" hideService v-if="currentTemplate.value == 'template_four'">
        <!-- 顶部banner -->
        <div class="banner relative">
            <img :src=PassImg.bg_pass alt="Grande Retorno de Depósito" class="w-full absolute left-0 " />
            <img :src="CommonImg.m4_null" alt="">
            <div class="absolute w-[90%] mt-[-4rem] mx-5 ">
                <div class="  w-full flex justify-between  items-center bg-tablebg rounded-[1.5rem] px-[2rem]   py-1">
                    <div class="text-white text-[1.48rem] font-bold flex items-center">
                        <img :src=PassImg.icon_gold class="w-5 h-5 mr-2" alt="coin" />
                        <span class="text-themetext0">{{ passPriceRef }}</span>
                    </div>
                    <span>vira</span>
                    <div class="text-white text-[1.48rem] font-bold flex items-center">
                        <img :src=PassImg.icon_gold class="w-5 h-5 mr-2" alt="coin" />
                        <span class="text-themetext0">{{ allCountRef }}</span>
                    </div>

                </div>
                <div class="text-themetext3 w-full m-auto text-center font-bold my-1  ">Mais prêmios te esperam!</div>

            </div>

        </div>

        <pu-card theme="4" class="!mt-[1.5rem] mx-3">

            <img :src="CommonImg.icon_line" class="my-2 " />
            <div class=" m-auto overflow-hidden rounded-[0.5rem] mt-1 py-2" :style="{
                background: `url(${PassImg.bg_info}) `,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
            }">
                <!-- 显示当前年月 -->
                <div class=" text-center m4-text text-[0.9rem] font-bold  m-auto">
                    {{ formattedDate }}
                </div>
                <!-- 数据展示区域 -->
                <div class="flex justify-around items-center my-2 px-2">
                    <!-- 等级 -->
                    <div class="flex m4-ten-btn flex-col items-center font-bold  rounded-xl py-3 px-2">
                        <div class=" text-2xl">{{ rechargeAmountRef }}</div>
                        <div class=" text-[0.78rem]">Depósito ({{ currentUnit.value }})</div>
                    </div>

                    <!-- 积分 -->
                    <div class="flex m4-ten-btn flex-col items-center font-bold  rounded-xl py-3 px-2">
                        <div class=" text-2xl">{{ betAmountRef }}</div>
                        <div class=" text-[0.78rem]">Aposta ({{ currentUnit.value }})</div>
                    </div>

                    <!-- 天数 -->
                    <div class="flex m4-ten-btn flex-col items-center font-bold  rounded-xl py-3 px-2">
                        <div class=" text-2xl">{{ loginCountRef }}</div>
                        <div class=" text-[0.78rem]">Entrar (Dias)</div>
                    </div>
                </div>
            </div>
        </pu-card>
        <pu-card theme="4" class="mt-2">
            <img :src=PassImg.img_cardbg class="w-full px-1" />
            <div class="list -mt-10 flex flex-col items-center">
                <div v-for="(item, index) in passListConfigRef" :key="index"
                    class="item w-full h-full flex items-center justify-between" :style="{
                        background: (item.bonus_recv == 1 && item.bonus_pass_recv == 1 && item.bonus_pass_has_recv == 0)
                            ? `url(${PassImg.img_itembg1}) no-repeat`
                            : `url(${PassImg.img_itembg2}) no-repeat`,
                        backgroundSize: '100% 100%'
                    }" @click="claimReward(item)">
                    <!-- 扫光效果 -->
                    <div v-if="item.bonus_recv == 1 && item.bonus_pass_recv == 1 && item.bonus_pass_has_recv == 0"
                        class="light-effect"></div>

                    <!-- 前面的部分：图标和文字 -->
                    <div class="flex flex-col items-center justify-center w-[7.7rem] h-[3.5rem] -ml-3">
                        <img :src="item.cond === 'recharge'
                            ? PassImg.text_deposito
                            : item.cond === 'login'
                                ? PassImg.text_entrar
                                : PassImg.text_aposta" class="lvImg mx-auto" />
                        <div>
                            <span class="mt-0.5 text-sm m4-text text-center"> {{ item.cond === 'login' ? 'Dias' :  currentUnit.value 
                                }} </span>
                            <span class="mt-0.5 ml-1 font-bold text-center"> {{ item.cond_num }}</span>
                        </div>
                    </div>

                    <!-- 中间部分 -->
                    <div class="flex items-center justify-center w-[7.5rem] h-[3.75rem] relative">

                        <div v-if="item.bonus_recv && item.bonus_recv == 1 && item.bonus_has_recv != 1 && item.bonus_pass_recv != 1"
                            class="h-[3.75rem] w-[7.2rem] absolute inset-0 -left-0 top-[0.1rem] z-0">
                            <!-- 图片容器 -->
                            <div class="image-container">
                                <img :src=PassImg.img_choose alt="扫光背景图">
                                <!-- 扫光效果 -->
                                <div class="light-effect"></div>
                            </div>

                        </div>
                        <span class="text-sm z-[99]">{{ currentUnit.value }} </span>
                        <span class="pl-2 font-bold z-[99]">{{ item.bonus }}</span>
                        <div v-if="item.bonus_has_recv && item.bonus_has_recv == 1">
                            <img :src=PassImg.icon_gou class="absolute bottom-2 right-1 w-4 h-4 yes" />
                        </div>
                    </div>

                    <!-- 后面的部分 -->
                    <div class="flex items-center justify-center text-four w-[8.7rem] h-[3.6rem] relative">
                        <!-- 新增背景层 -->
                        <img :src=PassImg.img_gray v-if="isBuyPassRef == 0"
                            class="h-full  absolute inset-0 ml-[1rem] " />
                        <span class="text-sm text-themetext0 pl-3">{{ currentUnit.value }} </span>
                        <span class="pl-2 text-themetext0 font-bold">{{ item.bonus_pass }}</span>
                        <div v-if="item.bonus_pass_has_recv && item.bonus_pass_has_recv == 1">
                            <img :src=PassImg.icon_gou class="absolute bottom-2 -right-1 w-4 h-4 yes" />
                        </div>
                        <div v-if="isBuyPassRef == 0">
                            <img :src=PassImg.icon_suo class="absolute bottom-2 -right-1 w-4 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </pu-card>

        <!-- 规则区域 -->
        <pu-card theme="3" class="mb-3 pt-5">
            <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                <span>Descrição da Atividade:</span>
            </h5>
            <!-- <article class="p-mb text-sm text-body-gray">
                <p>1. Compre o passe para ativar recompensas extras.O passe é válido apenas para este mês.</p>
                <p>2. Depósitos, apostas e logins são contabilizados apenas no mês atual. No mês seguinte, a contagem será reiniciada.</p>
                <p>3. A plataforma reserva-se o direito de interpretação final desta promoção.</p>
            </article> -->
            <div class=" p-mb text-sm text-themetext3  mb-[3.125rem]" v-html="passRuleContent"
                style="line-height: 1.5;">
            </div>
        </pu-card>


        <!-- 悬浮按钮 -->
        <div class="fixed left-1/2 -translate-x-1/2 bottom-0 w-wrap flex justify-center items-center z-[999]">
            <!-- 模糊背景，按钮高度+padding更高一些 -->
            <div class="absolute left-0 bottom-0 w-wrap min-h-[7rem]  z-[9]" :style="{
                background: `url(${PassImg.bg_info}) no-repeat`,
                backgroundSize: '100% 100%'
            }">


            </div>
            <!-- 按钮 -->
            <!-- 已购买时显示图片 -->
            <img v-if="isBuyPassRef == 1" :src=PassImg.img_pay class="w-[80%] h-auto z-10 absolute bottom-4" />
            <button v-else
                class="w-[16rem] h-[3.5rem] z-10 absolute bottom-4 items-center m4-nine-btn rounded-full justify-center text-xl flex font-bold "
                @click="showBuyPass">

                <span class="pl-1 pb-1 text-theme text-l font-bold flex items-center h-full">
                    Comprar Passe
                </span>

                <span class="pl-1 pb-1 text-one font-bold text-l flex items-center h-full">
                    {{ currentUnit.value }} {{ passPriceRef }}
                </span>
            </button>
        </div>
        <em class="w-full h-32 block"></em>

        <!-- 弹窗 -->
        <div v-if="showBuyPassRef"
            class=" fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-[1001] px-6">
            <pu-card theme="3"
                class=" w-[22rem]  flex flex-col items-center justify-center rounded-xl py-4 m4-popcard-3">
                <div class="relative  flex flex-col items-center justify-center">
                    <div class="absolute top-[-1rem] right-[-1rem] flex items-center">
                        <button @click="closeBuyPass()"
                            class="w-10 h-10  rounded-full absolute right-0 top-0 flex items-center justify-center">
                            <img :src=CommonImg.btn_close alt="" class="w-5 h-5">
                        </button>
                    </div>

                    <img :src=PassImg.img_passbg class="w-[4rem] h-auto" />

                    <div class="bg-white/20 mt-6 rounded-lg p-2 items-center justify-center flex  w-full">
                        <!-- 背景色#241b61，高度h-16，宽度w-32 -->
                        <div class="text-white text-3xl font-bold"> <!-- 文字颜色#fff000，描边#622101 -->
                            {{ currentUnit.value }} <span class="text-themetext0">{{ passPriceRef }}</span>
                        </div>
                    </div>

                    <div class="text-center text-base  mt-4 leading-none">
                        Compre o Passe deste mês e receba todas as recompensas de uma só vez.
                    </div>
                    <button
                        class="w-[16rem] h-[3rem] items-center justify-center text-xl pb-1 mt-20 m4-nine-btn rounded-xl "
                        @click="handleBuyPass">
                        Compre agora
                    </button>
                </div>
            </pu-card>
        </div>


    </pu-page>
     <pu-page title="Passe" class="z-[999]" v-else-if="currentTemplate.value == 'template_five'">
        <!-- 顶部banner -->
        <div class="banner relative">
            <img :src=PassImg.bg_pass alt="Grande Retorno de Depósito" class="w-full" />

            <div class="absolute top-[56.5%] left-0 right-0 flex justify-center gap-8 items-center">
                <div class="text-themewhite text-xl font-bold flex items-center">
                    <img :src=PassImg.icon_gold class="w-6 h-6 mr-1" alt="coin" />
                    {{passPriceRef}}
                </div>
                <span class="text-themewhite text-lg font-bold">vira</span>
                <div class="text-themewhite text-xl font-bold flex items-center">
                    <img :src=PassImg.icon_gold class="w-6 h-6 mr-1" alt="coin" />
                    {{allCountRef}}
                </div>
            </div>
            <div class="absolute w-[90%] h-[5.5rem] overflow-hidden rounded-xl left-0 right-0 bottom-[3rem] mx-auto" 
                :style="{
                    backgroundImage: `url(${PassImg.bg_info})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                    }">
                <!-- 显示当前年月 -->
                <span class="absolute left-0 right-0 top-[0.2rem] text-center text-themewhite" style=" font-size: 0.8rem; font-weight: bold">
                        {{ formattedDate }}
                    </span>
             
                    <!-- 数据展示区域 -->
                <div class="relative z-10 flex justify-around items-center pt-6 pb-3">
                    <!-- 等级 -->
                    <div class="flex flex-col items-center justify-center bg-gradient-to-b from-themecardlinear1 to-themecardlinear2 rounded-xl w-[6rem] h-[3.5rem]">
                        <div class="text-themewhite text-xl font-bold">{{ rechargeAmountRef }}</div>
                        <div class="text-themewhite text-[0.625rem] ">Depósito ({{ currentUnit.value }})</div>
                    </div>
                    
                    <!-- 积分 -->
                    <div class="flex flex-col items-center justify-center bg-gradient-to-b from-themecardlinear1 to-themecardlinear2 rounded-xl w-[6rem] h-[3.5rem]">
                        <div class="text-themewhite text-xl font-bold">{{ betAmountRef }}</div>
                        <div class="text-themewhite text-[0.625rem] ">Aposta ({{ currentUnit.value }})</div>
                    </div>
                    
                    <!-- 天数 -->
                    <div class="flex flex-col items-center justify-center bg-gradient-to-b from-themecardlinear1 to-themecardlinear2 rounded-xl w-[6rem] h-[3.5rem]">
                        <div class="text-themewhite text-xl font-bold">{{ loginCountRef }}</div>
                        <div class="text-themewhite text-[0.625rem] ">Entrar (Dias)</div>
                    </div>
                </div>
            </div>
        </div>

        <pu-card theme="4" class="mt-1" >
            <img :src=PassImg.img_cardbg class="w-full px-1 -mt-8" />
            <div class="list -mt-10 flex flex-col items-center">
            <div 
                v-for="(item, index) in passListConfigRef" 
                :key="index" 
                class="item w-full h-full flex items-center justify-between"
                :style="{
                    width: '96%',
                    background: (item.bonus_recv == 1 && item.bonus_pass_recv == 1 && item.bonus_pass_has_recv == 0) 
                        ? `url(${PassImg.img_itembg1}) no-repeat` : `url(${PassImg.img_itembgdef}) no-repeat`,
                    backgroundSize: '100% 100%'
                }"
                @click="claimReward(item)" 
            >
                 <!-- 扫光效果 -->
                <div 
                    v-if="item.bonus_recv == 1 && item.bonus_pass_recv == 1 && item.bonus_pass_has_recv == 0"
                    class="light-effect"
                ></div>

                <!-- 前面的部分：图标和文字 -->
                <div class="flex flex-col items-center justify-center w-[7.7rem] h-[3.5rem] -ml-3">
                    <img
                        :src="item.cond === 'recharge'
                            ? PassImg.text_deposito
                            : item.cond === 'login'
                                ? PassImg.text_entrar
                                : PassImg.text_aposta"
                        class="lvImg mx-auto"
                    />
                    <div>
                        <span class="mt-0.5 text-[0.7rem] text-themewhite text-center "> {{ item.cond === 'login' ? 'Dias' :  currentUnit.value  }} </span>
                        <span class="mt-0.5 ml-1 text-sm text-center"> {{ item.cond_num }}</span>
                    </div>
                </div>

                <!-- 中间部分 -->
                <div class="flex items-center justify-center w-[7.5rem] h-[3.75rem] relative">

                    <div v-if="item.bonus_recv && item.bonus_recv == 1 && item.bonus_has_recv != 1 && item.bonus_pass_recv != 1"
                        class="h-[3.75rem] w-[7.4rem] absolute inset-0 -left-[0.2rem] top-[0.1rem] z-0">
                        <!-- 图片容器 -->
                        <div class="image-container">
                            <img :src=PassImg.img_choose alt="扫光背景图">
                            <!-- 扫光效果 -->
                            <div class="light-effect"></div>
                        </div>

                    </div>
                    <span class="text-sm z-10">{{ currentUnit.value }} </span>
                    <span class="pl-2 font-bold z-10">{{ item.bonus }}</span>
                    <div v-if="item.bonus_has_recv && item.bonus_has_recv == 1">
                        <img :src=PassImg.icon_gou class="absolute bottom-2 right-1 w-4 h-4 yes" />
                    </div>
                </div>

                <!-- 后面的部分 -->
                <div class="flex items-center justify-center text-themetext0 w-[7.5rem] h-[3.9rem] relative">
                    <!-- 新增背景层 -->
                    <!-- <div v-if="isBuyPassRef == 0" class="h-[3.9rem] w-[7.5rem] absolute inset-0 pl-1 z-0 top-[0.19rem]">
                        <img 
                            :src=PassImg.img_gray
                        />
                    </div> -->
                    <span class="text-[0.7rem] pl-3 text-one">{{ currentUnit.value }} </span>
                    <span class="pl-2 text-one" >{{ item.bonus_pass }}</span>
                    <div v-if="item.bonus_pass_has_recv && item.bonus_pass_has_recv == 1">
                        <img 
                            :src=PassImg.icon_gou 
                            class="absolute bottom-2 -right-1 w-4 h-4 yes" 
                        />
                    </div>
                    <div v-if="isBuyPassRef == 0">
                        <img 
                            :src=PassImg.icon_suo 
                            class="absolute bottom-2 -right-1 w-4 h-5" 
                        />
                    </div>
                </div>
            </div>
            </div>
        </pu-card>

        <pu-card theme="3" class="mb-3 pt-5" >
            <div class="w-full mb-4 flex items-center">
                <!-- <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2" ></em> -->
                <h5 class="ma-w-[60%] px-2 text-sm text-themewhite" >
                    <span>Descrição da Atividade</span>
                </h5>
                <!-- <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em> -->
            </div>
            <div class="ctx-article p-mb text-sm text-themetext4" v-html="passRuleContent" style="line-height: 1.5;"> 
            </div>
        </pu-card>


        <!-- 悬浮按钮 -->
        <div class="fixed left-1/2 -translate-x-1/2 bottom-0 w-wrap flex justify-center items-center z-50">
            <!-- 模糊背景，按钮高度+padding更高一些 -->
            <!-- <div class="absolute left-0 bottom-0 w-wrap h-24  " style=" opacity: 0.8;" :class="[currentTemplate.value=='template_one'?' bg-linear-19':' bg-tablergba40']"></div> -->
            <!-- 按钮 -->
            <!-- 已购买时显示图片 -->
            <img
                v-if="isBuyPassRef == 1"
                :src=PassImg.img_pay
                class="w-[80%] h-auto z-[100] absolute bottom-4"
            />
            <button
                v-else
                class="w-[96%] h-[10.8rem] z-[100]  items-center justify-center text-lg flex font-bold text-themewhite"
                :style="{
                        backgroundImage: `url(${PassImg.btn_shop})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                        }"
                @click="showBuyPass"
                >
                      
                <!-- <span class="pl-1 pb-1 text-themewhite text-m font-bold flex items-center h-full">
                    Comprar Passe 
                </span>

                <span class="pl-1 pb-1 text-four font-bold text-m flex items-center h-full">
                     {{ currentUnit.value }} {{ passPriceRef }}
                </span>  -->
            </button>
        </div>
        <em class="w-full h-32 block"></em>

        <!-- 弹窗 -->
        <!-- showBuyPassRef -->
        <div v-if="showBuyPassRef" class="fixed inset-0 bg-rgbablack80 flex flex-col items-center justify-center z-50">
    
            <pu-card theme="3" class="relative flex flex-col items-center justify-center">
                <img :src=PassImg.bg_wind class="w-[23rem] h-full object-cover rounded-xl" />
                <div class="absolute top-20 flex flex-col items-center justify-center">
              
                    <div class="absolute top-[-8rem] right-4 flex items-center z-100">
                        <button @click="closeBuyPass()" class="w-10 h-10 font-blod text-[3rem] rounded-full  flex items-center justify-center">
                                ×
                        </button>
                    </div>


                    <div class=" flex flex-col items-center text-center px-10 mt-2">
                        <div class="bg-rgbablack50 rounded-lg items-center justify-center flex h-[3rem] w-[8rem] mb-2"> <!-- 背景色#241b61，高度h-16，宽度w-32 -->
                            <div class="text-themewhite text-l font-bold" style="-webkit-text-stroke: 0.5px #0a2400;"> <!-- 文字颜色#fff000，描边#622101 -->
                                {{ currentUnit.value }}  <span class="font-bold text-four text-2xl text-themetext0"> {{ passPriceRef }}</span>
                            </div>
                        </div>

                        <div class="text-center text-sm mt-2 leading-1 bg-rgbablack50 rounded-lg px-8 py-2">
                            Compre o Passe deste mês e receba todas as recompensas de uma só vez.
                        </div> 
                    </div>
                    <button
                        class="w-[14rem] h-[3rem] text-xl pb-1 text-themewhite bg-gradient-to-r from-gold-500 to-gold-100 rounded-full mt-12 flex items-center justify-center"
                        @click="handleBuyPass"
                    >
                        Compre agora
                </button> 
                </div>
                
            </pu-card>
        </div>
        <Panddingbottom></Panddingbottom>
    </pu-page>
</template>
<style scoped>
.list {
    width: 100%;
    height: auto;

    .item {
        width: 90%;
        height: 3.5rem;
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        /* 圆角值 */
        margin-top: 0.5rem;
        padding: 0.1rem 1rem 0 1rem;
        box-sizing: border-box;

        .lvImg {
            width: auto;
            height: 1.3rem;
        }

    }

}

.image-container {
    position: relative;
    display: inline-block;
    overflow: hidden;
    /* 确保扫光不超出图片区域 */
    border-radius: 0;
    /* 如果图片有圆角，需同步设置 */
}

.light-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%);
    animation: sweep 2s infinite;
    border-radius: inherit;
    /* 继承父容器的圆角 */
}

@keyframes sweep {
    0% {
        left: -100%;
    }

    100% {
        left: 100%;
    }
}
</style>