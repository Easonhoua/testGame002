<script setup>
import { ref } from 'vue'
import { isPopNotice, currentNoticeRef, currentNoticeIndexRef, noticeListRef} from '../../model/common'
const popShowRef = ref(true)

function close() {
    // 判断是否还有下一条公告
    if(currentNoticeIndexRef.value + 1 <  noticeListRef.value.length){
        // 有下一条公告，显示下一条
        currentNoticeIndexRef.value += 1
        currentNoticeRef.value = noticeListRef.value[currentNoticeIndexRef.value]   
    }else{
        // 没有下一条公告，关闭弹窗     
        popShowRef.value = false    
    }
}


</script>

<template>
    <Teleport to="body">
      <div v-if="popShowRef&&isPopNotice" class="fixed inset-0 flex items-center justify-center bg-blur bg-black/60 z-[199]" >
        <!-- 弹窗主体 popShowRef&&isPopNotice -->
        <div class="relative w-[18rem] h-[24rem] pb-2 rounded-[40px] flex flex-col items-center" >
            <!-- 背景层 -->
          <img src="/imgs/common/bg_notice.png" class="absolute inset-0 -mt-20"
          ></img>
          
          <!-- 标题 -->
          <div class="absolute px-6 py-[4.7rem] rounded-md text-lg font-semibold text-black/80">
            {{currentNoticeRef.title}}
          </div>
  
          <!-- 公告内容 -->
          <div class="z-10 mt-[7rem] px-5 pt-5 w-[17rem] flex-1 overflow-y-auto bg-black/50 rounded-2xl">
            <article class="text-[0.75rem]" v-html='currentNoticeRef.content'></article>
          </div>
  
          <!-- 关闭按钮 -->
          <button class="absolute -bottom-16 w-12 h-12 rounded-full bg-rgbawhite50
                   flex items-center justify-center shadow-lg
                   hover:scale-110 transition"
                    @click="close"
          >
                <svg class="w-8 h-8 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                </svg>
          </button>
        </div>
      </div>
    </Teleport>
  </template>