<script setup>
import { t, fn } from '@/i18n'
import { memberGiftModel } from '@/model/activity'
import { useThemeImages } from '@/utils/themeimg'

const { endTime, CollectionTime, reward, contentRef,recebermemberGiftFunc,receive_statusRef } = memberGiftModel(true)
const MemberDayImg = useThemeImages().memberDay
</script>

<template>
  <pu-card theme="3" class="relative">
    <section class="w-full p-px mt-4 mb-6">
      <div class="w-full relative  h-[2.6rem] m5-theme-input  rounded-full  flex items-center justify-center px-2 text-themetext1">
          <img :src="MemberDayImg.img_time" class="w-7 h-8 inline-block mr-2 absolute left-2">
          <span class="text-themetext1 text-sm">{{ t('activityCenter.EventEndTime') }} <span class="font-bold text-themetext0">{{ endTime }}</span></span>
      </div>
    </section>

    <section class="w-full p-px my-4 h-[5.2rem]  m5-theme-model1 rounded-lg  flex flex-col px-2">
      <div class="w-full flex items-center justify-start">
          <img :src="MemberDayImg.img_date" class="w-5.5 h-6 inline-block mr-2">
          <span class="text-themewhite text-[0.625rem] font-bold mt-1">{{ t('activityCenter.CollectionTime') }}</span>
      </div>
      <div class="w-full h-[2.5rem] bg-rgbablack30 rounded-lg mt-2 flex items-center justify-center">
          <span class="text-themewhite text-[1.25rem] font-bold">{{ t('activityCenter.17thof1') }} {{ CollectionTime+ t('activityCenter.17thof2') }}</span>
      </div>
    </section>

    <section class="w-full p-px my-4 h-[5.2rem] m5-theme-model1 rounded-lg flex flex-col px-2">
      <div class="w-full flex items-center justify-start">
          <img :src="MemberDayImg.img_money" class="w-5.5 h-6 inline-block mr-2 ">
          <span class="text-themewhite text-[0.625rem] font-bold mt-1">{{ t('activityCenter.Maximumreward') }}</span>
      </div>
      <div class="w-full h-[2.5rem] bg-rgbablack30 rounded-lg mt-2 flex items-center justify-center">
          <span class="text-themewhite text-[1.25rem] font-bold mr-10">
            {{ currentUnit.value }}
          </span>
          <span class="text-themetext0 text-[1.25rem] font-bold">{{  fn(reward) }}</span>
      </div>
    </section>

    <section class="w-full h-[2rem] p-px mb-8 mt-14 ">
      <div class="w-full flex h-[2.4rem] m5-theme-btn1 rounded-full items-center justify-center text-themewhite  font-bold cursor-pointer"
        :class="receive_statusRef != 1 ? 'cursor-not-allowed opacity-50' : ''"
        @click="recebermemberGiftFunc()">
          {{ t('Receive') }}
      </div>
    </section>

  </pu-card>

  <pu-card theme="3" class="mb-3 pt-5 text-box">
    <div class="w-full mb-4 flex items-center justify-left">
      <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext1 font-bold">
        <span>{{ t("ActivityDescription")  }}</span>
      </h5>
    </div>
    <article class="ctx-article p-mb text-sm text-themewhite"  v-html="contentRef">
    </article>
  </pu-card>
</template>

<style scoped>
table tr td {
  padding: 0.75rem 0.25rem;
}
</style>
