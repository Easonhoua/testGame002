<script setup>
import { onMounted, ref, watch,computed } from 'vue'
import {  t,fn } from '@/i18n'
import { useRouter } from 'vue-router'
import { mysteriousModel } from '@/model/activity'
const { mysteriousInfoRef, daysListRef,timeMothDisplay,timeDayDisplay,spinSuccessRef,accumulateMoneyRef,bonusArrRef,mysteriousSuccessFunc } = mysteriousModel()
import { playBtnAudioFunc,getObjAndArrLength} from '@/utils/core'
import { isAuthRef} from '@/model/user'
import { openLoginFunc} from '@/utils/config'
import PddSuccess from '@/views/pdd/pddsuccess.vue'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const CommonImg = useThemeImages().common 
const MystDImg = useThemeImages().mysteriousgold

let clickindex = ref(0)
let tabindex = ref(0)
const router = useRouter()
function checkTab(item, index) {
    tabindex.value = item
    clickindex.value = index
    findSendNumMaxForAmount(item,accumulateMoneyRef,  mysteriousInfoRef.config)
}


// 监听 daysListRef，数据变化后自动选中最后一个
// 动态计算高亮索引
const computedClickIndex = computed(() => {
  if (!daysListRef.value || !mysteriousInfoRef.value) return 0
  
  // 优先匹配 diff_day
  const matchedIndex = daysListRef.value.findIndex(day => day === mysteriousInfoRef.value.diff_day)
  if (matchedIndex >= 0) return matchedIndex
  
  // 默认选中下一个有效天数
  const nextValidDay = daysListRef.value.find(day => day > mysteriousInfoRef.value.diff_day)
  return nextValidDay ? daysListRef.value.indexOf(nextValidDay) : daysListRef.value.length - 1
})

watch([daysListRef, isAuthRef], ([days, isAuth]) => {
  if (days && days.length > 0) {
    clickindex.value = computedClickIndex.value
    tabindex.value = isAuth ? days[computedClickIndex.value] : days[days.length - 1]
  }
}, { immediate: true })
const currentTableList = computed(() => {
        if (!mysteriousInfoRef.value.config) return []
        // 拼接 key
        const key = `mystery_config_day${tabindex.value}`
        return mysteriousInfoRef.value.config[key] || []
})
const maxPayNum = computed(() => {
  if (Object.values(currentTableList.value).length==0) return 0
  const allConfigs = Object.values(currentTableList.value).flat()
  const nums = allConfigs.map(item => Number(item.pay_num_min))
  
  return nums.length ? Math.max(...nums) : 0
})
const sendPayNum = computed(() => {
  if (Object.values(currentTableList.value).length==0) return 0
  // 提取所有 pay_num_min 字段的数值
  const allConfigs = Object.values(currentTableList.value).flat()
  const nums = allConfigs.map(item => Number(item.send_num_max))
  
  return nums.length ? Math.max(...nums) : 0
})
function findSendNumMaxForAmount(day,amount, config) {
  // 检查输入
  if (!config || typeof config !== 'object') return 0
  
  // 遍历所有天数配置
  const daykey = `mystery_config_day${tabindex.value}`
  
  for(const rangeKey in config[`${daykey}`]){
      const range = config[`${daykey}`][rangeKey]
      const min = Number(range.pay_num_min)
      const max = Number(range.pay_num_max)
      // 检查金额是否在当前区间内
      if (amount >= min && (amount < max || max === 99999999)) {
        return Number(range.send_num_max)
      }
    }
  
  return 0
}
function findSendNumMinForAmount(day,amount, config) {
  // 检查输入
  if (!config || typeof config !== 'object') return 0
  
  // 遍历所有天数配置
  const daykey = `mystery_config_day${tabindex.value}`
  
  for(const rangeKey in config[`${daykey}`]){
      const range = config[`${daykey}`][rangeKey]
      const min = Number(range.pay_num_min)
      const max = Number(range.pay_num_max)
      // 检查金额是否在当前区间内
      if (amount >= min && (amount < max || max === 99999999)) {
        return Number(range.send_num_min)
      }
    }
  
  return 0
}

function cashBtnFunc(){
    if(!isAuthRef.value) {
        playBtnAudioFunc()
        openLoginFunc(1)
        return
    }
}
async function claimBtnFunc(){
    if(accumulateMoneyRef.value>0){
        await mysteriousSuccessFunc(bonusArrRef.value[`mystery_config_day${tabindex.value}`]?.id)
    }else{
        router.push('/recharge')
    }
}

onMounted(() => {
})
</script>

<template>
    <pu-page :title="t('pageTitle.MysteriousBonus')" class="z-[999]">
        <img :src=MystDImg.img_mystd class="w-full absolute left-0 ">
        <img :src="CommonImg.m4_null" alt="" v-if="currentTemplate.value=='template_four'">
        <em class="w-full h-[17rem] block" v-else-if="currentTemplate.value=='template_five'"></em>
        <em class="w-full h-52 block" v-else></em>
        <pu-card theme="3" class="relative mt-[2.125rem]">
            <!-- 顶部天数进度条 -->
            <div class="flex justify-between items-end px-2 pt-2 pb-1 " >
                <div class="flex flex-col items-center"  v-for="(item, idx) in daysListRef" :key="idx" @click="checkTab(item,idx)">
                    <div class="flex flex-col items-center  dateItem"  :class="idx === clickindex ? 'dateItem-active' : 'dateItem-inactive'" v-if="currentTemplate.value  =='template_one'">
                        <img :src="MystDImg[`icon_day${idx+1}`]" class="w-12 h-12" />
                        <span :class="['text-[0.68rem] ', idx === 0 ? 'text-rgbawhite80' : 'text-themewhite']">Dia <span class="bigtext"> {{item}}</span></span>
                        <img :src=MystDImg.icon_yes  class="w-5 h-5 mt-1" v-if="!isAuthRef||item<=mysteriousInfoRef.diff_day"/>
                        <img :src=MystDImg.icon_no  class="w-5 h-5 mt-1"  v-else/> 
                    <!-- bonusArrRef.length不等于0的时候 为灰色 -->
                    <!-- &&bonusArrRef.length>0 -->
                    </div>
                    <div class="flex flex-col items-center  dateItem"  :class="idx === clickindex ? 'dateItem-active-two' : 'dateItem-inactive-two'" v-if="currentTemplate.value  =='template_two'">
                        <img :src="MystDImg[`icon_day${idx+1}`]" class="w-12 h-8"  />
                        <span :class="['text-[0.68rem] ', idx === 0 ? 'text-rgbawhite80' : 'text-themewhite']">Dia <span class="bigtext"> {{item}}</span></span>
                        <img :src=MystDImg.icon_yes  class="w-5 h-5 mt-1" v-if="!isAuthRef||item<=mysteriousInfoRef.diff_day"/>
                        <img :src=MystDImg.icon_no  class="w-5 h-5 mt-1"  v-else/> 
                    <!-- bonusArrRef.length不等于0的时候 为灰色 -->
                    <!-- &&bonusArrRef.length>0 -->
                    </div>
                    <div class="flex flex-col items-center  dateItem"  :class="idx === clickindex ? 'm3-theme-btn1' : 'bg-tablergba40'" v-if="currentTemplate.value  =='template_three'">
                        <img :src="MystDImg[`icon_day${idx+1}`]" class="w-12 h-8"  />
                        <span class="text-[0.68rem]" :class="idx === clickindex ? '!text-themetext4' : '!text-themetext1'">{{ t('Day') }} 
                            <span class="text-[1rem]" :class="idx === clickindex ? '!text-themetext4' : '!text-themetext1'"> {{item}}</span>
                        </span>
                        <img :src=MystDImg.icon_yes  class="w-5 h-5 mt-1" v-if="!isAuthRef||item<=mysteriousInfoRef.diff_day"/>
                        <img :src=MystDImg.icon_no  class="w-5 h-5 mt-1"  v-else/> 
                    <!-- bonusArrRef.length不等于0的时候 为灰色 -->
                    <!-- &&bonusArrRef.length>0 -->
                    </div>
                    <div class="flex flex-col items-center py-2 px-1 rounded-[0.5rem] "  :class="idx === clickindex ? 'm4-ten-btn' : 'bg-gradient-to-b from-activitybox2 to-activitybox1'" v-if="currentTemplate.value  =='template_four'">
                        <img :src="MystDImg[`icon_day${idx+1}`]" class="w-12 h-8"  />
                        <span class="text-[0.68rem]" :class="idx === clickindex ? '!text-theme' : '!text-themewhite'">{{ t('Day') }}
                            <span class="text-[1rem]" :class="idx === clickindex ? '!text-theme' : '!text-themewhite'"> {{item}}</span>
                        </span>
                        <img :src=MystDImg.icon_yes  class="w-5 h-5 mt-1" v-if="!isAuthRef||item<=mysteriousInfoRef.diff_day"/>
                        <img :src=MystDImg.icon_no  class="w-5 h-5 mt-1"  v-else/> 
                    <!-- bonusArrRef.length不等于0的时候 为灰色 -->
                    <!-- &&bonusArrRef.length>0 -->
                    </div>
                    <div class="h-[7.2rem] flex flex-col items-center justify-around py-2  px-1 rounded-[0.5rem] relative z-10"  :class="idx === clickindex ? 'bg-gradient-to-b from-themecardlinear1 to-themecardlinear2' : 'bg-btn1_bg'" v-if="currentTemplate.value  =='template_five'">
                        <img :src="MystDImg[`icon_day${idx+1}`]" class="w-12 h-8"  />
                        <span class="text-[0.68rem] text-themewhite">{{ t('Day') }}
                            <span class="text-[1rem]"> {{item}}</span>
                        </span>
                        <img :src=MystDImg.icon_yes  class="w-5 h-5 mt-1" v-if="!isAuthRef||item<=mysteriousInfoRef.diff_day"/>
                        <img :src=MystDImg.icon_no  class="w-5 h-5 mt-1"  v-else/> 
                    <!-- bonusArrRef.length不等于0的时候 为灰色 -->
                    <!-- &&bonusArrRef.length>0 -->
                    </div>
                </div>
            </div>
 
            <!-- 注册信息、存款、奖金信息 -->
            <div class="content rounded-xl p-5 mt-2 text-rgbawhite80 text-xs flex flex-col gap-1" v-if="currentTemplate.value  =='template_one'||currentTemplate.value  =='template_two'">
                <!-- topinfo -->
                <div class="flex justify-between items-center topinfo" >
                <div class="icontext flex align-center items-center">
                    <img :src=MystDImg.icon_user class="mr-2 "/>
                    <span >Hora de registro:</span>
                </div>
                <span class="text-themewhite">{{timeMothDisplay}}</span>
                </div>
                <div class="flex justify-between items-center topinfo mt-3" >
                <div class="icontext flex align-center items-center ">
                    <img :src=MystDImg.icon_card class="mr-2 "/>
                    <span v-if="currentTemplate.value  =='template_two'">Depósito total de <span class="!text-four">{{tabindex}}</span> Dias:</span>
                    <span v-else>Depósito total de <span class="!text-one">{{tabindex}}</span> Dias:</span>
                </div>
                <span class="text-themewhite">{{ currentUnit.value }} {{!isAuthRef? fn(maxPayNum,0) : fn(accumulateMoneyRef,0)}}</span>
                </div>
                <!-- 未登录 -->
                <!-- !isAuthRef -->
                <div v-if="!isAuthRef " class="flex flex-col">
                    <div class="mt-3 flex flex-col justify-center items-center align-center centercard p-3" >
                        <p class="mb-1">O momento em que os bônus podem ser</p>
                        <p> reclamados:</p>
                        <div class="flex items-center gap-2 mb-2 mt-2">
                        <img :src=MystDImg.icon_time class="w-3.5 h-3.5"/>
                        <span class=" font-bold text-homeranktext"
                        
                        v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="flex items-center gap-2 mb-1" >
                                <img :src=MystDImg.icon_gold class="w-3.5 h-3.5"/>
                            <span class="text-nine font-bold">Bônus misterioso</span>
                            </div>
                            <div class="flex items-center gap-2 mb-1">
                                <span class=" text-s" :class="currentTemplate.value  =='template_one'?'text-four':'text-nine'">{{ currentUnit.value }} </span>
                            <span class="text-nine font-bold text-lg"
                            v-if="currentTemplate.value  =='template_one'"
                            :class="sendPayNum>0?'text-nine':'text-rgbawhite50'" >  {{ fn(sendPayNum,0) }}
                            </span>
                            <span class="text-homeranktext font-bold text-lg"
                            v-else
                            :class="sendPayNum>0?'text-homeranktext':'text-rgbawhite50'" >  {{ fn(sendPayNum,0) }}
                            </span>
                            </div>
                        </div>
                    </div>
                    <button @click="cashBtnFunc()"
                    :class="currentTemplate.value  =='template_one'?'ctx-theme__linear':'m2-btn-ten'"
                    class=" rounded-xl h-10 px-3 rounded-xl  w-[7rem] " style="margin: 0 auto; margin-top: 1.25rem; font-weight: 600;">
                Receber
                </button>
                </div>
                <!-- 已登录 -->
                <div v-else class="flex flex-col ">
                    <!-- 未充值 -->
                    <!--  -->
                    <div v-if="tabindex<=mysteriousInfoRef.diff_day&&bonusArrRef.length==0">
                        <div class="mt-3 flex flex-col justify-center items-center align-center centercard p-3">
                            <p class="mb-1">O momento em que os bônus podem ser</p>
                            <p> reclamados:</p>
                            <div class="flex items-center gap-2 mb-2 mt-2">
                            <img :src=MystDImg.icon_time class="w-3.5 h-3.5"/>
                            <span class="text-homeranktext font-bold" v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span>
                            </div>
                            <img :src=MystDImg.img_gold  class="treasurebox" v-if="tabindex>=mysteriousInfoRef.diff_day"/>
                            <div class="flex flex-col items-center"  v-else>
                                <div class="flex items-center gap-2 mb-1" >
                                    <img :src=MystDImg.icon_gold class="w-3.5 h-3.5"/>
                                <span class="text-nine font-bold">Bônus misterioso</span>
                                </div>
                                <div class="flex items-center gap-2 mb-1" >
                                    <span class=" text-s" :class="currentTemplate.value  =='template_one'?'text-four':'text-nine'">{{ currentUnit.value }} </span>
                                <span class="font-bold text-lg " :class="currentTemplate.value  =='template_one'?'!text-nine':'text-homeranktext'">
                                    0
                                </span>
                                </div>
                            </div>
                        </div>
                        <div class="status w-full h-full  text-themewhite" :class="currentTemplate.value  =='template_one'?'btn':'btn-m2'"  v-if="tabindex>=mysteriousInfoRef.diff_day">
                            <img :src=MystDImg.img_laba  class="w-8 h-8 mr-2"/>
                                Comece Agora
                        </div>
                        <div class="status " v-else>
                            <img :src=MystDImg.icon_yes  class="w-5 h-5 mr-2"/>
                            <span class="text-themewhite ">A atividade expirou</span>
                        </div>
                    </div>
                    <!-- 充值了 -->
                    <div v-else class="flex flex-col">
                        <div class="mt-3 flex flex-col justify-center items-center align-center centercard p-3">
                            <p class="mb-1">O momento em que os bônus podem ser</p>
                            <p> reclamados:</p>
                            <div class="flex items-center gap-2 mb-2 mt-2">
                            <img :src=MystDImg.icon_time class="w-3.5 h-3.5"/>
                            <span class="text-homeranktext font-bold" v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span>
                            </div>
                            <!-- 已登录，未到开奖时间 -->
                            <img :src=MystDImg.img_gold class="treasurebox" v-if="(!bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]!=null)||!bonusArrRef.hasOwnProperty(`mystery_config_day${tabindex}`)"/>
                            <!-- 未到开奖时间不显示，其他时候都显示 -->
                            <div class="flex flex-col items-center"  v-else>
                                <div class="flex items-center gap-2 mb-1" >
                                    <img :src=MystDImg.icon_gold class="w-3.5 h-3.5"/>
                                <span class="text-nine font-bold">Bônus misterioso</span>
                                </div>
                                <div class="flex items-center gap-2 mb-1" v-if="currentTemplate.value  =='template_one'">
                                    <span class=" text-s text-four" >{{ currentUnit.value }} </span>
                                <span class="text-nine font-bold text-lg" :class="sendPayNum>0&&bonusArrRef[`mystery_config_day${tabindex}`]!=null?'text-nine':'text-rgbawhite50'">
                                    {{bonusArrRef[`mystery_config_day${tabindex}`]==null ? 0 : bonusArrRef[`mystery_config_day${tabindex}`].status==0? findSendNumMinForAmount(tabindex,accumulateMoneyRef, mysteriousInfoRef.config)+'~ '+findSendNumMaxForAmount(tabindex,accumulateMoneyRef, mysteriousInfoRef.config) :fn(bonusArrRef[`mystery_config_day${tabindex}`].bonus,2) }}
                                </span>
                                </div>
                                <div class="flex items-center gap-2 mb-1" v-else>
                                    <span class=" text-s text-nine" >{{ currentUnit.value }} </span>
                                <span class="text-homeranktext font-bold text-lg" :class="sendPayNum>0&&bonusArrRef[`mystery_config_day${tabindex}`]!=null?'text-nine':'text-rgbawhite50'">
                                    {{bonusArrRef[`mystery_config_day${tabindex}`]==null ? 0 : bonusArrRef[`mystery_config_day${tabindex}`].status==0? findSendNumMinForAmount(tabindex,accumulateMoneyRef, mysteriousInfoRef.config)+'~ '+findSendNumMaxForAmount(tabindex,accumulateMoneyRef, mysteriousInfoRef.config) :fn(bonusArrRef[`mystery_config_day${tabindex}`].bonus,2) }}
                                </span>
                                </div>
                            </div>
                            
                        </div>
                        <!-- 活动状态 -->
                        <!-- 已注册、未到开奖时间 -->
                        <template v-if="tabindex>=mysteriousInfoRef.diff_day&&!bonusArrRef[`mystery_config_day${tabindex}`]?.id">
                            <div class="status w-full h-full  text-themewhite"  :class="currentTemplate.value  =='template_one'?'btn':'btn-m2'">
                            <img :src=MystDImg.img_laba  class="w-8 h-8 mr-2"/>
                                Comece Agora
                            </div>
                        </template>
                        <template v-else>
                            <div class="status w-full h-full text-themewhite"
                            :class="currentTemplate.value  =='template_one'?'btn':'btn-m2'"
                            v-if="(!bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]!=null)">
                            <img :src=MystDImg.img_laba class="w-8 h-8 mr-2"/>
                                Comece Agora
                            </div>
                        </template>
                        <!-- 已注册 已过期 -->
                        <div class="status " v-if="bonusArrRef[`mystery_config_day${tabindex}`]==null&&bonusArrRef.length!=0&&tabindex<mysteriousInfoRef.diff_day">
                            <img :src=MystDImg.icon_yes  class="w-5 h-5 mr-2"/>
                            <span class="text-themewhite ">A atividade expirou</span>
                        </div>
                        
                        <!-- 可以领取 -->
                        <button  @click="claimBtnFunc()" v-if="bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]?.status==0" class="ctx-theme__linear rounded-xl h-10 px-3 rounded-xl  w-[7rem] " style="margin: 0 auto; margin-top: 1.25rem; font-weight: 600;">
                        Receber
                        </button>
                        <!-- -->
                        <div class="status "  v-if="bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]?.status==1">
                            <img :src=MystDImg.icon_yes  class="w-5 h-5 mr-3"/>
                            <span class="text-themewhite ">Recebido</span>
                        </div>
                    </div>   
                </div>
            </div>

            <div class="content rounded-xl p-5 mt-2 text-rgbawhite80 text-xs flex flex-col gap-1" v-if="currentTemplate.value  =='template_three'">
                <!-- topinfo -->
                <div class="flex justify-between items-center topinfo" >
                <div class="icontext flex align-center items-center">
                    <img :src=MystDImg.icon_user class="mr-2 "/>
                    <span class="!text-themetext1">{{ t('activityCenter.Registrationtime') }}:</span>
                </div>
                <span class="text-themewhite">{{timeMothDisplay}}</span>
                </div>
                <div class="flex justify-between items-center topinfo mt-3" >
                <div class="icontext flex align-center items-center ">
                    <img :src=MystDImg.icon_card class="mr-2 "/>
                    <span class="!text-themetext1">{{ t('activityCenter.Totaldeposit') }} <span class="!text-themetext0">{{tabindex}}</span> {{ t('account.days') }}:</span>
                </div>
                <span >{{ currentUnit.value }} <span class="text-themetext0">{{!isAuthRef? fn(maxPayNum,0) : fn(accumulateMoneyRef,0)}}</span></span>
                </div>
                <!-- 未登录 -->
                <!-- !isAuthRef -->
                <div v-if="!isAuthRef " class="flex flex-col">
                    <div class="mt-3 flex flex-col justify-center items-center align-center centercard p-3" >
                        <p class="mb-1">{{ t('activityCenter.Themomentbonusescanbe') }}</p>
                        <p> {{ t('activityCenter.claimed') }}:</p>
                        <div class="flex items-center gap-2 mb-2 mt-2">
                        <img :src=MystDImg.icon_time class="w-3.5 h-3.5"/>
                        <span class=" font-bold text-black"
                        v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="flex items-center gap-2 mb-1" >
                                <img :src=MystDImg.icon_gold class="w-3.5 h-3.5"/>
                            <span class="text-nine font-bold">{{ t('activityCenter.Mysteriousbonus') }}</span>
                            </div>
                            <div class="flex items-center gap-2 mb-1">
                                <span class=" text-s" :class="currentTemplate.value  =='template_one'?'text-four':'text-nine'">{{ currentUnit.value }} </span>
                            <span class="text-homeranktext font-bold text-lg text-nine" >  {{ fn(sendPayNum,0) }}
                            </span>
                            </div>
                        </div>
                    </div>
                    <button @click="cashBtnFunc()"
                    :class="currentTemplate.value  =='template_one'?'ctx-theme__linear':'m2-btn-ten'"
                    class=" rounded-xl h-10 px-3 rounded-xl  w-[7rem] " style="margin: 0 auto; margin-top: 1.25rem; font-weight: 600;">
                {{ t('Receive') }}
                </button>
                </div>
                <!-- 已登录 -->
                <div v-else class="flex flex-col ">
                    <!-- 未充值 -->
                    <!--  -->
                    <div v-if="tabindex<=mysteriousInfoRef.diff_day&&bonusArrRef.length==0">
                        <div class="mt-3 flex flex-col justify-center items-center align-center centercard p-3">
                            <p class="mb-1">{{ t('activityCenter.Themomentbonusescanbe') }}</p>
                            <p> {{ t('activityCenter.claimed') }}:</p>
                            <div class="flex items-center gap-2 mb-2 mt-2">
                            <img :src=MystDImg.icon_time class="w-3.5 h-3.5"/>
                            <span class="text-homeranktext font-bold" v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span>
                            </div>
                            <img :src=MystDImg.img_gold  class="treasurebox" v-if="tabindex>=mysteriousInfoRef.diff_day"/>
                            <div class="flex flex-col items-center"  v-else>
                                <div class="flex items-center gap-2 mb-1" >
                                    <img :src=MystDImg.icon_gold class="w-3.5 h-3.5"/>
                                <span class="text-nine font-bold">{{ t('activityCenter.Mysteriousbonus') }}</span>
                                </div>
                                <div class="flex items-center gap-2 mb-1" >
                                    <span class=" text-s" :class="currentTemplate.value  =='template_one'?'text-four':'text-nine'">{{ currentUnit.value }} </span>
                                <span class="font-bold text-lg " :class="currentTemplate.value  =='template_one'?'!text-nine':'text-homeranktext'">
                                    0
                                </span>
                                </div>
                            </div>
                        </div>
                        <div class="status w-full h-full  text-themewhite" :class="currentTemplate.value  =='template_one'?'btn':'btn-m2'"  v-if="tabindex>=mysteriousInfoRef.diff_day">
                            <img :src=MystDImg.img_laba  class="w-8 h-8 mr-2"/>
                                {{ t('activityCenter.StartNow') }}
                        </div>
                        <div class="status " v-else>
                            <img :src=MystDImg.icon_yes  class="w-5 h-5 mr-2"/>
                            <span class="text-themewhite ">{{ t("activityCenter.activityexpired") }}</span>
                        </div>
                    </div>
                    <!-- 充值了 -->
                    <div v-else class="flex flex-col">
                        <div class="mt-3 flex flex-col justify-center items-center align-center centercard p-3">
                            <p class="mb-1">{{ t('activityCenter.Themomentbonusescanbe') }}</p>
                            <p> {{ t('activityCenter.claimed') }}:</p>
                            <div class="flex items-center gap-2 mb-2 mt-2">
                            <img :src=MystDImg.icon_time class="w-3.5 h-3.5"/>
                            <span class="text-homeranktext font-bold" v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span>
                            </div>
                            <!-- 已登录，未到开奖时间 -->
                            <img :src=MystDImg.img_gold class="treasurebox" v-if="(!bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]!=null)||!bonusArrRef.hasOwnProperty(`mystery_config_day${tabindex}`)"/>
                            <!-- 未到开奖时间不显示，其他时候都显示 -->
                            <div class="flex flex-col items-center"  v-else>
                                <div class="flex items-center gap-2 mb-1" >
                                    <img :src=MystDImg.icon_gold class="w-3.5 h-3.5"/>
                                <span class="text-nine font-bold">{{ t('activityCenter.Mysteriousbonus') }}</span>
                                </div>
                                <div class="flex items-center gap-2 mb-1" >
                                    <span class=" text-s text-nine" >{{ currentUnit.value }} </span>
                                <span class="text-homeranktext font-bold text-lg" :class="sendPayNum>0&&bonusArrRef[`mystery_config_day${tabindex}`]!=null?'text-nine':'text-rgbawhite50'">
                                    {{bonusArrRef[`mystery_config_day${tabindex}`]==null ? 0 : bonusArrRef[`mystery_config_day${tabindex}`].status==0?findSendNumMinForAmount(tabindex,accumulateMoneyRef, mysteriousInfoRef.config)+'~ '+findSendNumMaxForAmount(tabindex,accumulateMoneyRef, mysteriousInfoRef.config) :fn(bonusArrRef[`mystery_config_day${tabindex}`].bonus,2) }}
                                </span>
                                </div>
                            </div>
                            
                        </div>
                        <!-- 活动状态 -->
                        <!-- 已注册、未到开奖时间 -->
                        <template v-if="tabindex>=mysteriousInfoRef.diff_day&&!bonusArrRef[`mystery_config_day${tabindex}`]?.id">
                            <div class="status w-full h-full  text-themewhite"  :class="currentTemplate.value  =='template_one'?'btn':'btn-m2'">
                            <img :src=MystDImg.img_laba  class="w-8 h-8 mr-2"/>
                                {{ t('activityCenter.StartNow') }}
                            </div>
                        </template>
                        <template v-else>
                            <div class="status w-full h-full text-themewhite"
                            :class="currentTemplate.value  =='template_one'?'btn':'btn-m2'"
                            v-if="(!bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]!=null)">
                            <img :src=MystDImg.img_laba class="w-8 h-8 mr-2"/>
                                {{ t('activityCenter.StartNow') }}
                            </div>
                        </template>
                        <!-- 已注册 已过期 -->
                        <div class="status " v-if="bonusArrRef[`mystery_config_day${tabindex}`]==null&&bonusArrRef.length!=0&&tabindex<mysteriousInfoRef.diff_day">
                            <img :src=MystDImg.icon_yes  class="w-5 h-5 mr-2"/>
                            <span class="text-themewhite ">{{ t("activityCenter.activityexpired") }}</span>
                        </div>
                        
                        <!-- 可以领取 -->
                        <button  @click="claimBtnFunc()" v-if="bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]?.status==0" class="m3-theme-btn1 rounded-xl h-10 px-3 rounded-xl  w-[7rem] " style="margin: 0 auto; margin-top: 1.25rem; font-weight: 600;">
                        {{ t('Receive') }}
                        </button>
                        <!-- -->
                        <div class="status "  v-if="bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]?.status==1">
                            <img :src=MystDImg.icon_yes  class="w-5 h-5 mr-3"/>
                            <span class="text-themewhite ">{{ t('Received') }}</span>
                        </div>
                    </div>   
                </div>
            </div>
            <div class="content   mt-2  text-xs flex flex-col gap-1" v-if="currentTemplate.value  =='template_four'"
            :style="{
                    background: `url(${MystDImg.card_bg}) no-repeat`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                }"
            >
                <!-- topinfo -->
                <div class="p-5">
                    <div class="flex justify-between items-center topinfo " >
                    <div class="icontext flex align-center items-center">
                        <img :src=MystDImg.icon_user class="mr-2 "/>
                        <span class="!m4-text">Hora de registro:</span>
                    </div>
                    <span class=" text-white">{{timeMothDisplay}}</span>
                    </div>
                    <div class="flex justify-between items-center topinfo mt-3" >
                    <div class="icontext flex align-center items-center">
                        <img :src=MystDImg.icon_card class="mr-2 "/>
                        <span class="!m4-text">Depósito total de <span class="!text-themetext0">{{tabindex}}</span> Dias:</span>
                    </div>
                    <span class="m4-text">{{ currentUnit.value }} <span  class="text-themetext0">{{!isAuthRef? fn(maxPayNum,0) : fn(accumulateMoneyRef,0)}}</span></span>
                    </div>
                </div>
                <!-- 未登录 -->
                <!-- !isAuthRef -->
                <div v-if="!isAuthRef" class="flex flex-col ">
                    <div class="mt-3 flex flex-col px-4" >
                        <p class="mb-1 text-themetext0">O momento em que os bônus podem ser reclamados:</p>
                        <span class="text-white font-bold" v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span>
                        <div class="flex flex-col mt-2">
                            <div class="flex items-center gap-2 mb-1" >
                            <span class="m4-text mt-2 text-[1rem] font-bold">Bônus misterioso</span>
                            </div>
                            <div class="flex items-center justify-between align-center gap-2 mb-4 mt-2">
                                <div>
                                    <span class="m4-text text-s"> {{ currentUnit.value }} </span>
                                    <span class="text-themetext0 font-bold text-[2rem]" :class="sendPayNum>0?'text-themetext0':'m4-text'">  {{ fn(sendPayNum,0) }}
                                    </span>
                                </div>
                            
                            <button @click="cashBtnFunc()" class="m4-nine-btn rounded-[2rem] h-10 px-3 !text-theme  w-[7rem] font-[700] " >
                                Receber
                                </button>
                            </div>
                        </div>
                    </div>
                
                </div>
                <!-- 已登录 -->
                <div v-else class="flex flex-col ">
                    <!-- 未充值 -->
                    <div v-if="tabindex<=mysteriousInfoRef.diff_day&&bonusArrRef.length==0">
                        <div class="mt-3 flex flex-col justify-center p-3">
                            <p class="mb-1 text-themetext0">O momento em que os bônus podem ser reclamados:</p>
                            <div class="flex items-center gap-2 mb-2 mt-2">
                            <span class="text-white font-bold" v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span>
                            </div>
                            <div class="flex justify-between items-center  gap-2  mt-2"  >
                                <div class="flex flex-col">
                                    <div class="flex items-center gap-2 mb-1" >
                                        <span class="m4-text font-bold">Bônus misterioso</span>
                                    </div>
                                    <div class="flex items-center justify-between align-center gap-2 mb-4 mt-2">
                                        <div>
                                            <span class="m4-text text-s">  {{ currentUnit.value }} </span>
                                            <span class="text-themetext0 font-bold text-[2rem]" >0</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- -->
                                <button @click="cashBtnFunc()" class="m4-nine-btn rounded-[2rem] h-10 px-3   w-[7rem] font-[700] "  v-if="tabindex>=mysteriousInfoRef.diff_day " >
                                <!--  -->
                                Receber
                                </button>
                                <div class="flex justify-between items-center gap-2" v-else>
                                    <img :src=MystDImg.icon_time  class="w-5 h-5 mr-2"/>
                                    <span class=" text-three  ">A atividade expirou</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 充值了 -->
                    <div v-else class="flex flex-col">
                        <div class="mt-3 flex flex-col justify-center  p-3">
                            <p class="mb-1 text-themetext0">O momento em que os bônus podem ser reclamados:</p>
                            <div class="flex items-center gap-2 mb-2 mt-2">
                            <span class="text-white font-bold" v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span>
                            </div>
                            <!-- 已登录，未到开奖时间 -->
                            <!-- 未到开奖时间不显示，其他时候都显示 -->
                            <!--  -->
                            <div   class="flex justify-between items-center  gap-2  mt-2">
                                <div class="flex flex-col ">
                                    <div class="flex items-center gap-2 mb-1" >
                                    <span class="m4-text font-bold">Bônus misterioso</span>
                                    </div>
                                <div class="flex items-center  gap-2 mb-4 mt-2" >
                                    <div>
                                        
                                        
                                        <span class="text-themetext0 font-bold "
                                        v-if="bonusArrRef[`mystery_config_day${tabindex}`]==null"
                                        :class="sendPayNum>0&&bonusArrRef[`mystery_config_day${tabindex}`]!=null?'text-[#40006d]':'text-[#655736]/50'">
                                        <span class="m4-text text-s"> {{ currentUnit.value }} </span>
                                        <span class="text-[2rem]">0</span> 
                                        </span>
                                        <span class="text-themetext0 font-bold "
                                        v-else-if="bonusArrRef[`mystery_config_day${tabindex}`].status==0"
                                        :class="sendPayNum>0&&bonusArrRef[`mystery_config_day${tabindex}`]!=null?'text-[#40006d]':'text-[#655736]/50'">
                                        <span class="m4-text text-s"> {{ currentUnit.value }} </span>
                                        <span class="text-[2rem]">{{ findSendNumMinForAmount(tabindex,accumulateMoneyRef, mysteriousInfoRef.config) }}~{{ findSendNumMaxForAmount(tabindex,accumulateMoneyRef, mysteriousInfoRef.config) }}
                                        </span>
                                        </span>
                                        <span class="text-themetext0 font-bold "
                                        v-else
                                        :class="sendPayNum>0&&bonusArrRef[`mystery_config_day${tabindex}`]!=null?'text-[#40006d]':'text-[#655736]/50'">
                                        <span class="m4-text text-s" v-if="bonusArrRef[`mystery_config_day${tabindex}`].status!=1"> Max  </span>
                                        <span class="m4-text text-s">{{ currentUnit.value }}</span>
                                        <span class="text-[2rem]">{{ fn(bonusArrRef[`mystery_config_day${tabindex}`].bonus,2 )}}</span>
                                        </span>
                                        <!-- -->

                                    </div>
                                </div>
                                </div>
                                <button @click="claimBtnFunc()" v-if="bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]?.status==0" class="m4-nine-btn rounded-[2rem] h-10 px-3   w-[7rem] font-[700] " :class="bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]?.status==0?' m4-nine-btn':' bg-tablebg text-theme'"  >
                                <!--  -->
                                Receber
                                </button>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            
            
            </div>
            <div class="mt-2 text-xs flex flex-col  border border-inputborder rounded-lg" v-if="currentTemplate.value  =='template_five'">
                <!-- topinfo -->
                <div class="px-5 py-2 m5-theme-inputwithoutborder rounded-t-lg" >
                    <div class="flex justify-between items-center " >
                        <div class="icontext flex align-center items-center">
                            <img :src=MystDImg.icon_user class="w-5 mr-2 "/>
                            <span class="text-themewhite">Hora de registro:</span>
                        </div>
                        <span class=" text-white">{{timeMothDisplay}}</span>
                    </div>
                    <div class="flex justify-between items-center mt-2" >
                        <div class="icontext flex align-center items-center">
                            <img :src=MystDImg.icon_card class="w-5 mr-2 "/>
                            <span class="text-themewhite">Depósito total de <span class="!text-themetext0">{{tabindex}}</span> Dias:</span>
                        </div>
                        <span class="text-themetext0 font-bold">{{ currentUnit.value }} <span  >{{!isAuthRef? fn(maxPayNum,0) : fn(accumulateMoneyRef,0)}}</span></span>
                    </div>
                </div>
                <!-- 未登录 -->
                <!-- !isAuthRef -->
                <div v-if="!isAuthRef" class="flex flex-col bg-gradient-to-l from-inputcolor1 to-inputcolor2 rounded-b-lg">
                    <div class="mt-3 flex flex-col px-4" >
                        <p class="mb-1 text-themewhite">O momento em que os bônus podem ser reclamados:</p>
                        <span class="text-white font-bold" v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span>
                        <div class="flex flex-col mt-2">
                            <div class="flex items-center gap-2 mb-1" >
                            <span class="m4-text mt-2 text-[1rem] font-bold">Bônus misterioso</span>
                            </div>
                            <div class="flex items-center justify-between align-center gap-2 mb-4 mt-2">
                                <div>
                                    <span class="m4-text text-s"> {{ currentUnit.value }} </span>
                                    <span class="text-themetext0 font-bold text-[2rem]" :class="sendPayNum>0?'text-themetext0':'m4-text'">  {{ fn(sendPayNum,0) }}
                                    </span>
                                </div>
                            
                            <button @click="cashBtnFunc()" class="m5-theme-btn1 rounded-[2rem] h-10 px-3 text-themewhite  w-[7rem] font-[700] " >
                                Receber
                                </button>
                            </div>
                        </div>
                    </div>
                
                </div>
                <!-- 已登录 -->
                <div v-else class="flex flex-col bg-gradient-to-l from-inputcolor1 to-inputcolor2 rounded-b-lg">
                    <!-- 未充值 -->
                    <div v-if="tabindex<=mysteriousInfoRef.diff_day&&bonusArrRef.length==0">
                        <div class="mt-3 flex flex-col justify-center p-3">
                            <p class="mb-1 text-themewhite">O momento em que os bônus podem ser reclamados:</p>
                            <div class="flex items-center gap-2 mb-2 mt-2">
                            <span class="text-white font-bold" v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span>
                            </div>
                            <div class="flex justify-between items-center  gap-2  mt-2"  >
                                <div class="flex flex-col">
                                    <div class="flex items-center gap-2 mb-1" >
                                        <span class="m4-text font-bold">Bônus misterioso</span>
                                    </div>
                                    <div class="flex items-center justify-between align-center gap-2 mb-4 mt-2">
                                        <div>
                                            <span class="m4-text text-s">  {{ currentUnit.value }} </span>
                                            <span class="text-themetext0 font-bold text-[2rem]" >0</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- -->
                                <button @click="cashBtnFunc()" class="m5-theme-btn1 rounded-[2rem] h-10 px-3 text-themewhite  w-[7rem] font-[700] "  v-if="tabindex>=mysteriousInfoRef.diff_day " >
                                <!--  -->
                                Receber
                                </button>
                                <div class="flex justify-between items-center gap-2" v-else>
                                    <img :src=MystDImg.icon_time  class="w-5 h-5 mr-2"/>
                                    <span class=" text-three  ">A atividade expirou</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 充值了 -->
                    <div v-else class="flex flex-col">
                        <div class="mt-3 flex flex-col justify-center  p-3">
                            <p class="mb-1 text-themewhite">O momento em que os bônus podem ser reclamados:</p>
                            <div class="flex items-center gap-2  mt-2">
                            <!-- <span class="text-white font-bold" v-if="timeDayDisplay.length">{{timeDayDisplay[clickindex].slice(0,11)}}{{ mysteriousInfoRef.send_time }}</span> -->
                            </div>
                            <!-- 已登录，未到开奖时间 -->
                            <!-- 未到开奖时间不显示，其他时候都显示 -->
                            <!--  -->
                            <div   class="flex justify-between items-center  gap-2  mt-2">
                                <div class="flex flex-col ">
                                    <div class="flex items-center gap-2 mb-1" >
                                    <span class="text-themewhite text-sm font-bold">Bônus misterioso</span>
                                    </div>
                                <div class="flex items-center  gap-2 mb-4 mt-2" >
                                    <div>
                                        
                                        
                                        <span class="text-themetext0 font-bold "
                                        v-if="bonusArrRef[`mystery_config_day${tabindex}`]==null"
                                        :class="sendPayNum>0&&bonusArrRef[`mystery_config_day${tabindex}`]!=null?'text-[#40006d]':'text-[#655736]/50'">
                                        <span class=" text-s"> {{ currentUnit.value }} </span>
                                        <span class="text-[2rem]">0</span> 
                                        </span>
                                        <span class="text-themetext0 font-bold "
                                        v-else-if="bonusArrRef[`mystery_config_day${tabindex}`].status==0"
                                        :class="sendPayNum>0&&bonusArrRef[`mystery_config_day${tabindex}`]!=null?'text-[#40006d]':'text-[#655736]/50'">
                                        <span class=" text-s"> {{ currentUnit.value }} </span>
                                        <span class="text-[2rem]">{{ findSendNumMinForAmount(tabindex,accumulateMoneyRef, mysteriousInfoRef.config) }}~{{ findSendNumMaxForAmount(tabindex,accumulateMoneyRef, mysteriousInfoRef.config) }}
                                        </span>
                                        </span>
                                        <span class="text-themetext0 font-bold "
                                        v-else
                                        :class="sendPayNum>0&&bonusArrRef[`mystery_config_day${tabindex}`]!=null?'text-[#40006d]':'text-[#655736]/50'">
                                        <span class=" text-s" v-if="bonusArrRef[`mystery_config_day${tabindex}`].status!=1"> Max  </span>
                                        <span class=" text-s">{{ currentUnit.value }}</span>
                                        <span class="text-[2rem]">{{ fn(bonusArrRef[`mystery_config_day${tabindex}`].bonus,2 )}}</span>
                                        </span>
                                        <!-- -->

                                    </div>
                                </div>
                                </div>
                                <button @click="claimBtnFunc()" v-if="bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]?.status==0" class="m5-theme-btn1 rounded-[2rem] h-10 px-3   w-[7rem] font-[700] " :class="bonusArrRef[`mystery_config_day${tabindex}`]?.id&&bonusArrRef[`mystery_config_day${tabindex}`]?.status==0?' m5-theme-btn1':' bg-tablebg text-theme'"  >
                                <!--  -->
                                Receber
                                </button>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            
            
            </div>

            <!-- 表格数据 -->
            <table class="w-full text-sm table-fixed mt-7 mb-8" v-if="currentTemplate.value  =='template_one'||currentTemplate.value  =='template_two'">
                        <thead class="text-xs ">
                            <tr class="bg-tablergba40 text-center " style="margin: 0.5rem 0;">
                                <td class="border-r-[0.1rem] border-body-bg" style="padding: 0.7rem;">Âmbito do depósito</td>
                                <td style="padding: 0.7rem;">Bônus Misterioso</td>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="item,index in currentTableList" :key="index" >
                                <tr class="odd:bg-tablergba20 even:bg-tablergba10 " >
                                    <td class="text-themewhite "  style="text-indent:1.5rem;">
                                        <span :class="currentTemplate.value  =='template_one'?'text-rgbawhite30':'text-theme'">{{ currentUnit.value }}&nbsp; 
                                        <span :class="currentTemplate.value  =='template_one'?'text-themewhite':'text-textcolorsix'">{{ fn(item['pay_num_min'],0) }}~{{ item['pay_num_max']==99999999?'∞': fn(item['pay_num_max'],0) }}</span></span>
                                    </td>
                                    <td class="text-themewhite " style="text-indent: 1.5rem;">
                                        <span  :class="currentTemplate.value  =='template_one'?'text-rgbawhite30':'text-theme'">{{ currentUnit.value }}&nbsp;<span  class="text-four">{{ fn(item['send_num_min'],0) }}~{{ fn(item['send_num_max'],0)  }}</span></span>
                                    </td>
                                </tr>
                            </template>
                            <!-- <tr v-else>
                                <td colspan="2">
                                    <pu-no-data></pu-no-data>
                                </td>
                            </tr> -->
                        </tbody>
            </table>  
            
            <table class="w-full text-sm table-fixed mt-7 mb-8" v-if="currentTemplate.value  =='template_three'">
                        <thead class="text-ms ">
                            <tr class="bg-tablergba40 text-center text-themetext2" style="margin: 0.5rem 0;">
                                <td class="border-r-[0.1rem] border-body-bg" style="padding: 0.7rem;">{{ t('activityCenter.Scopedeposit') }}</td>
                                <td style="padding: 0.7rem;">{{ t('activityCenter.MysteryBonus') }}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="item,index in currentTableList" :key="index" >
                                <tr class="odd:bg-tablergba20 even:bg-tablergba10 " >
                                    <td class="text-themewhite "  style="text-indent:1.5rem;">
                                        <span class="text-themetext2">{{ currentUnit.value }}&nbsp; 
                                        <span class="text-themetext1">{{ fn(item['pay_num_min'],0) }}~{{ item['pay_num_max']==99999999?'∞': fn(item['pay_num_max'],0) }}</span></span>
                                    </td>
                                    <td class="text-themewhite " style="text-indent: 1.5rem;">
                                        <span class="text-themetext2">{{ currentUnit.value }}&nbsp;<span  class="text-themetext0">{{ fn(item['send_num_min'],0) }}~{{ fn(item['send_num_max'],0)  }}</span></span>
                                    </td>
                                </tr>
                            </template>
                            <!-- <tr v-else>
                                <td colspan="2">
                                    <pu-no-data></pu-no-data>
                                </td>
                            </tr> -->
                        </tbody>
            </table>   
            <table class="w-full text-sm bg-tablebg table-fixed mt-7 mb-8  rounded-xl overflow-hidden" v-if="currentTemplate.value  =='template_four'">
                <thead class="text-xs ">
                    <tr class=" text-center" style="margin: 0.5rem 0;">
                        <td class="m4-text" style="padding: 0.7rem;">Âmbito do depósito</td>
                        <td class="m4-text" style="padding: 0.7rem;">Bônus Misterioso</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item,index in currentTableList" :key="index" >
                        <tr class="odd:bg-tablebg2  " >
                            <td  style="text-indent:1.5rem;">
                                <span class="text-themetext0">{{ currentUnit.value }}&nbsp;  <span  class="text-white">{{ fn(item['pay_num_min'],0) }}~{{ item['pay_num_max']==99999999?'∞': fn(item['pay_num_max'],0) }}</span></span>
                            </td>
                            <td  style="text-indent: 1.5rem;">
                                <span  class="text-themetext0">{{ currentUnit.value }}&nbsp;<span  class="text-themetext0">{{item['send_num_min']%1 === 0 ?fn(item['send_num_min'],0): fn(item['send_num_min'],2) }}~{{ fn(item['send_num_max'],0)  }}</span></span>
                            </td>
                        </tr>
                    </template>
                    <!-- <tr v-else>
                        <td colspan="2">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr> -->
                </tbody>
            </table>
            <table class="w-full text-sm bg-tablebg1 table-fixed mt-7 mb-8  rounded-xl overflow-hidden" v-if="currentTemplate.value  =='template_five'">
                <thead class="text-xs ">
                    <tr class=" text-center text-themewhite" style="margin: 0.5rem 0;">
                        <td  style="padding: 0.7rem;">Âmbito do depósito</td>
                        <td  style="padding: 0.7rem;">Bônus Misterioso</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item,index in currentTableList" :key="index" >
                        <tr class="odd:bg-tablebg2  " >
                            <td  style="text-indent:1.5rem;">
                                <span class="text-themetext0">{{ currentUnit.value }}&nbsp;  <span  class="text-white">{{ fn(item['pay_num_min'],0) }}~{{ item['pay_num_max']==99999999?'∞': fn(item['pay_num_max'],0) }}</span></span>
                            </td>
                            <td  style="text-indent: 1.5rem;">
                                <span  class="text-themetext0">{{ currentUnit.value }}&nbsp;<span  class="text-themetext0">{{item['send_num_min']%1 === 0 ?fn(item['send_num_min'],0): fn(item['send_num_min'],2) }}~{{ fn(item['send_num_max'],0)  }}</span></span>
                            </td>
                        </tr>
                    </template>
                    <!-- <tr v-else>
                        <td colspan="2">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr> -->
                </tbody>
            </table>
        </pu-card>

        <pu-card theme="3" class="mb-3 pt-3" v-if="currentTemplate.value=='template_one'||currentTemplate.value=='template_two'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent " :class="currentTemplate.value  =='template_one'?'to-themewhite':'to-four'"></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-center"  :class="currentTemplate.value  =='template_one'?'text-themewhite':'text-four'">
                    <span>Descrição da Atividade</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent "  :class="currentTemplate.value  =='template_one'?'to-themewhite':'to-four'"></em>
            </div>
            <div class="ctx-article p-mb text-sm "  :class="currentTemplate.value  =='template_one'?'text-rgbawhite50':'text-theme'" v-html="mysteriousInfoRef.content" style="line-height: 1.5;">
            </div>
        </pu-card>

        <pu-card theme="3" class="mb-3 pt-3" v-if="currentTemplate.value=='template_three'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2" ></em>
                <h5 class="ma-w-[60%] px-2 text-sm text-themetext2">
                    <span>{{ t('ActivityDescription') }}</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2" ></em>
            </div>
            <div class="ctx-article p-mb text-sm text-themetext3" v-html="mysteriousInfoRef.content" style="line-height: 1.5;">
            </div>
        </pu-card>
        <pu-card theme="3" class="mb-2" v-if="currentTemplate.value=='template_four' ">
            <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                <span>Descrição da Atividade:</span>
            </h5>
            <div class=" p-mb text-sm text-themetext3" v-html="mysteriousInfoRef.content" style="line-height: 1.5;">
            </div>
        </pu-card>
        <pu-card theme="3" class="mb-2" v-if="currentTemplate.value=='template_five' ">
            <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                <span>Descrição da Atividade:</span>
            </h5>
            <div class=" p-mb text-sm text-themetext4" v-html="mysteriousInfoRef.content" style="line-height: 1.5;">
            </div>
        </pu-card>

        <pdd-success v-model="spinSuccessRef" :typeName="'mysteriousgold'"></pdd-success>
        <Panddingbottom></Panddingbottom>
    </pu-page>

</template>
<style scoped>
table {
    border-spacing: 0.25rem;
    border-collapse: collapse;
}
table tr{
    border-top: 2.5px solid rgba(0, 0, 0, 0.15);
}
table tr td{
    padding: 0.4rem;
    box-sizing: border-box;
}
.dateItem{
    padding: 0.45rem;
    box-sizing: border-box;
    border-radius: 1rem;
    span{
        color: var(--color-rgbawhite80);
        .bigtext{
            font-size: 1rem;
        }
    }
}
.dateItem-active{
    background-image: linear-gradient(180deg, var(--color-linear-18) 0%, var(--color-linear-19) 100%);
  
}
.dateItem-active-two{
    background-image: linear-gradient(180deg, var(--color-btnlinar1) 0%, var(--color-btnlinar2) 100%);
}

.dateItem-inactive{
    background-image: linear-gradient(180deg, var(--color-themecardlinear1) 0%, var(--color-themecardlinear2) 100%);
}
.dateItem-inactive-two{
    background-image: linear-gradient(180deg, var(--color-loginlinear-3) 0%, var(--color-loginlinear-4) 100%);
}
.content{
    background-image: linear-gradient(180deg,  var(--color-themecardlinear1) 0%, var(--color-themecardlinear2) 100%);
    .icontext{
        img{
            width: 1rem;
            height: 1rem;
        }
        span{
            color: var(--color-rgbawhite80);
        }
    }
    .centercard{
        background-image: linear-gradient(120deg, var(--color-linear-22) 0%, var(--color-linear-23) 100%);
        border-radius: 1rem;
        p{
            color: var(--color-nine) !important;
        }
        .treasurebox{
            width: 5.5rem;
            height: 4.5rem;
            margin-top: 0.5rem;
        }
    }
    .status{
        margin: 0 auto;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
    }
    .btn{
      background-color: var(--color-drawer-text); 
      padding: 0.75rem;
      border-radius: 0.5rem; 
      font-size: 0.88rem;
     font-weight: 600;
    }
    .btn-m2{
      padding: 0.75rem;
      border-radius: 0.5rem; 
      font-size: 0.88rem;
     font-weight: 600;
    }

}
</style>

