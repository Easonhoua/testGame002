<script setup>
import { computed, ref } from 'vue'
import { t } from '@/i18n'
import { useTemplate } from '@/utils/template'
const { currentTemplate } = useTemplate()
import Panddingbottom from '@/components/public/Panddingbottom.vue'
import { useThemeImages } from '@/utils/themeimg'

const MemberDayImg = useThemeImages().memberDay

import { membersGift } from 'virtual:skin-components'
</script>

<template>
  <pu-page :title="t('pageTitle.memberGift')" class="z-[999]" hideService>
    <!-- 背景图片 -->
    <div class="w-full flex justify-center">
      <div class="w-full overflow-x-hidden px-ctx">
        <img :src="MemberDayImg.img_bg" class="w-full h-auto">
      </div>
    </div>

    <!-- 动态加载对应模板组件 -->
    <Suspense>
      <template #default>
        <membersGift />
      </template>
      <!-- <template #fallback>
        <div class="flex items-center justify-center py-10">
          <p>加载中...</p>
        </div>
      </template> -->
    </Suspense>

    <!-- 底部padding -->
    <Panddingbottom></Panddingbottom>
  </pu-page>
</template>
<style scoped>
/* 所有样式已移至各模板组件 */
</style>