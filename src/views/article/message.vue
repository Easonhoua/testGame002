<script setup>
import { reactive, ref, onMounted, onUnmounted } from "vue";
import { t } from "@/i18n";
import { resetTimeFunc } from "@/utils/core";
import { messageModel } from "@/model/article";
import { playBtnAudioFunc } from "@/utils/core";
import Panddingbottom from "@/components/public/Panddingbottom.vue";
import { useThemeImages } from "@/utils/themeimg";
const CommonBgImg = useThemeImages().commonbg;
const CommonImg = useThemeImages().common;
const {
  hashLoadingRef,
  finishedRef,
  msgTypeRef,
  msgListRef,
  getMsgFunc,
  readMsgFunc,
  readAllMsgFunc,
} = messageModel(true);

// message_type ==> 1:系统消息 2:活动消息 3:奖金消息 4:充值消息 5:提现消息
const type_list = ref([
  { label: t('All'), value: 0 },
  { label: t('System'), value: 1 },
  { label: t('Activity'), value: 2 },
  { label: t('Bonus'), value: 3 },
  { label: t('deposit'), value: 4 },
  { label: t('Sack'), value: 5 },
]);
const type_obj = reactive({
  1: t('System'),
  2: t('Activity'),
  3: t('Bonus'),
  4: t('deposit'),
  5: t('Sack')
});
let view_index = ref(-1);
let autoplay = ref(true);

function changeView(index, item) {
  if (autoplay.value) {
    autoplay.value = false;
    view_index.value = view_index.value == index ? -1 : index;
    if (item.status == 0) {
      readMsgFunc(item.id, index, item.message_type);
    }
    setTimeout(() => {
      autoplay.value = true;
    }, 500);
  }
}

function clickTab(){
    playBtnAudioFunc()
    getMsgFunc(true)
}

onMounted(() => {});

onUnmounted(() => {
  readAllMsgFunc();
});
</script>

<template>
  <pu-page
    :title="t('pageTitle.Message')"
    class="z-[999]"
    v-if="
      currentTemplate.value == 'template_one' ||
      currentTemplate.value == 'template_two' ||
      currentTemplate.value == 'template_three'
    "
    color="bg-body-bg"
    :style="{ background: `url(${CommonBgImg.bg_body_1}) center` }"
    style="background-size: cover"
  >
    <div v-if="currentTemplate.value == 'template_one'" class="template-one">
      <pu-card theme="4" class="text-xs mt-4 !bg-red">
        <van-tabs
          v-model:active="msgTypeRef"
          @click-tab="clickTab()"
          shrink
          style="
            --van-tabs-line-height: 2rem;
            --van-tabs-bottom-bar-height: 0px;
            --van-padding-xs: 0.25rem;
          "
        >
          <template v-for="(item, index) in type_list" :key="index">
            <van-tab :name="item.value">
              <template #title>
                <div
                  :class="
                    item.value == msgTypeRef
                      ? 'ctx-theme'
                      : 'bg-rgbawhite10 text-rgbawhite50'
                  "
                  class="h-8 px-3 rounded-lg flex items-center"
                >
                  <span>{{ item.label }}</span>
                </div>
              </template>
            </van-tab>
          </template>
        </van-tabs>
      </pu-card>
      <pu-card theme="3" class="mt-4">
        <van-list
          v-model:loading="hashLoadingRef"
          :finished="finishedRef"
          @load="getMsgFunc(false)"
          loading-text="loading..."
          finished-text=""
        >
          <ol>
            <template v-for="(item, index) in msgListRef" :key="index">
              <li
                @click="changeView(index, item)"
                class="w-full p-4 mt-[0.703125rem] mb-[0.46875rem] bg-default-bg text-rgbawhite80 border border-rgbawhite10 rounded-lg"
              >
                <div class="w-full flex items-center">
                  <em
                    :class="
                      index == view_index
                        ? 'bg-one rotate-180'
                        : 'bg-rgbawhite80/20'
                    "
                    class="w-[1.03125rem] h-[1.03125rem] mr-1.5 rounded-full transition-all duration-300 flex items-center justify-center shrink-0"
                  >
                    <icon-chevron-down
                      class="w-4 h-4 opacity-65"
                    ></icon-chevron-down>
                  </em>
                  <div class="flex-1 overflow-hidden">
                    <h6 class="text-sm opacity-85">
                      {{ type_obj[item.message_type] }}
                    </h6>
                  </div>
                  <div
                    v-if="item.status == 0"
                    class="w-2 h-2 bg-two rounded-full top-0.5 right-0.5 flex items-center justify-center"
                  ></div>
                </div>
                <p class="my-1 text-xs opacity-45">
                  <span>{{ resetTimeFunc(item.created_at) }}</span>
                </p>
                <article class="text-sm text-rgbawhite80/65">
                  <div
                    v-html="item.content"
                    :class="index == view_index ? '' : 'truncate'"
                    class="max-w-[16rem]"
                  ></div>
                </article>
              </li>
            </template>
          </ol>
          <pu-no-data v-if="!msgListRef.length && !hashLoadingRef"></pu-no-data>
        </van-list>
      </pu-card>
    </div>
    <div v-if="currentTemplate.value == 'template_two'">
      <pu-card theme="4" class="text-xs mt-4">
        <van-tabs
          v-model:active="msgTypeRef"
          @click-tab="clickTab()"
          shrink
          style="
            --van-tabs-line-height: 2rem;
            --van-tabs-bottom-bar-height: 0px;
            --van-tabs-bottom-bar-color: #ffaf00;
            --van-padding-xs: 0.25rem;
          "
        >
          <template v-for="(item, index) in type_list" :key="index">
            <van-tab :name="item.value">
              <template #title>
                <div
                  :class="
                    item.value == msgTypeRef
                      ? 'bg-gradient-to-r from-btnlinar1 to-btnlinar2  text-white '
                      : 'bg-tablergba40 text-three'
                  "
                  class="h-8 px-3 rounded-lg flex items-center"
                >
                  <span>{{ item.label }}</span>
                </div>
              </template>
            </van-tab>
          </template>
        </van-tabs>
      </pu-card>
      <pu-card theme="3" class="mt-4">
        <van-list
          v-model:loading="hashLoadingRef"
          :finished="finishedRef"
          @load="getMsgFunc(false)"
          loading-text="loading..."
          finished-text=""
        >
          <ol>
            <template v-for="(item, index) in msgListRef" :key="index">
              <li
                @click="changeView(index, item)"
                class="w-full p-3 mt-[0.703125rem] mb-[0.46875rem] bg-gradient-to-r from-[#fff]/[0.18] to-[#749488]/[0.18] border border-[#fff]/[0.25] rounded-[1rem] border-[#fff]/[0.25]"
              >
                <div class="w-full flex items-center flex-between">
                  <!-- <em :class="index==view_index?'bg-one rotate-180':'bg-default-text/20'" class="w-[1.03125rem] h-[1.03125rem] mr-1.5 rounded-full transition-all duration-300 flex items-center justify-center shrink-0">
                                    <icon-chevron-down class="w-4 h-4 opacity-65"></icon-chevron-down>
                                </em> -->
                  <div class="left mr-4 mt-2">
                    <img
                      v-if="item.status == 0"
                      :src="CommonImg.icon_emailclose"
                      class="w-10 h-8"
                    />
                    <img
                      v-else
                      :src="CommonImg.icon_emailopen"
                      class="w-10 h-8 -mt-2"
                    />
                    <div
                      v-if="item.status == 0"
                      class="w-3 h-3 bg-two rounded-full top-0.5 right-0.5 flex items-center justify-center relative left-8 top-[-2.1rem]"
                    ></div>
                  </div>
                  <div class="right flex-1">
                    <div
                      class="overflow-hidden flex items-center justify-start"
                    >
                      <h6 class="text-sm mr-3">
                        {{ type_obj[item.message_type] }}
                      </h6>
                      <p class="my-1 text-[0.68rem]">
                        <span class="text-theme">{{
                          resetTimeFunc(item.created_at)
                        }}</span>
                      </p>
                    </div>
                    <article class="text-xs text-theme max-w-[16rem]">
                      <div
                        v-html="item.content"
                        :class="index == view_index ? '' : 'truncate'"
                      ></div>
                    </article>
                  </div>
                </div>
              </li>
            </template>
          </ol>
          <pu-no-data v-if="!msgListRef.length && !hashLoadingRef"></pu-no-data>
        </van-list>
      </pu-card>
    </div>

    <div v-if="currentTemplate.value == 'template_three'">
      <pu-card theme="4" class="text-xs mt-4">
        <van-tabs
          v-model:active="msgTypeRef"
          @click-tab="clickTab()"
          shrink
          style="
            --van-tabs-line-height: 2rem;
            --van-tabs-bottom-bar-height: 0px;
            --van-tabs-bottom-bar-color: #ffaf00;
            --van-padding-xs: 0.25rem;
          "
        >
          <template v-for="(item, index) in type_list" :key="index">
            <van-tab :name="item.value">
              <template #title>
                <div
                  :class="
                    item.value == msgTypeRef
                      ? 'm3-theme-btn1'
                      : 'bg-tablergba40 text-themetext1'
                  "
                  class="h-8 px-3 rounded-lg flex items-center"
                >
                  <span>{{ item.label }}</span>
                </div>
              </template>
            </van-tab>
          </template>
        </van-tabs>
      </pu-card>
      <pu-card theme="3" class="mt-4">
        <van-list
          v-model:loading="hashLoadingRef"
          :finished="finishedRef"
          @load="getMsgFunc(false)"
          loading-text="loading..."
          finished-text=""
        >
          <ol>
            <template v-for="(item, index) in msgListRef" :key="index">
              <li
                @click="changeView(index, item)"
                class="w-full p-3 mt-[0.703125rem] mb-[0.46875rem] bg-gradient-to-r from-[#fff]/[0.18] to-[#749488]/[0.18] border border-[#fff]/[0.25] rounded-[1rem] border-[#fff]/[0.25]"
              >
                <div class="w-full flex items-center flex-between">
                  <!-- <em :class="index==view_index?'bg-one rotate-180':'bg-default-text/20'" class="w-[1.03125rem] h-[1.03125rem] mr-1.5 rounded-full transition-all duration-300 flex items-center justify-center shrink-0">
                                    <icon-chevron-down class="w-4 h-4 opacity-65"></icon-chevron-down>
                                </em> -->
                  <div class="left mr-4 mt-2">
                    <img
                      v-if="item.status == 0"
                      :src="CommonImg.icon_emailclose"
                      class="w-10 h-8"
                    />
                    <img
                      v-else
                      :src="CommonImg.icon_emailopen"
                      class="w-10 h-8 -mt-2"
                    />
                    <div
                      v-if="item.status == 0"
                      class="w-3 h-3 bg-two rounded-full top-0.5 right-0.5 flex items-center justify-center relative left-8 top-[-2.1rem]"
                    ></div>
                  </div>
                  <div class="right flex-1">
                    <div
                      class="overflow-hidden flex items-center justify-start"
                    >
                      <h6 class="text-sm opacity-85 mr-3">
                        {{ type_obj[item.message_type] }}
                      </h6>
                      <p class="my-1 text-xs text-themetext2">
                        <span>{{ resetTimeFunc(item.created_at) }}</span>
                      </p>
                    </div>
                    <article
                      class="text-sm text-default-text/65 max-w-[16rem] text-themetext2"
                    >
                      <div
                        v-html="item.content"
                        :class="index == view_index ? '' : 'truncate'"
                      ></div>
                    </article>
                  </div>
                </div>
              </li>
            </template>
          </ol>
          <pu-no-data v-if="!msgListRef.length && !hashLoadingRef"></pu-no-data>
        </van-list>
      </pu-card>
    </div>

    <Panddingbottom></Panddingbottom>
  </pu-page>
  <pu-page title="Mensagem" class="z-[999] bg-theme" v-else-if="currentTemplate.value == 'template_four'">
    <pu-card theme="3" class="text-xs mt-4">
      <van-tabs
        v-model:active="msgTypeRef"
        @click-tab="clickTab"
        swipeable
        shrink
        style="
          --van-tabs-line-height: 2rem;
          --van-tabs-bottom-bar-height: 0px;
          --van-tabs-bottom-bar-color: #ffaf00;
          --van-padding-xs: 0.25rem;
        "
      >
        <template v-for="(item, index) in type_list" :key="index">
          <van-tab :name="item.value">
            <template #title>
              <div
                :class="
                  item.value == msgTypeRef
                    ? 'm4-ten-btn text-theme '
                    : 'text-white border-b-white/30'
                "
                class="h-8 px-3 rounded-2xl flex items-center"
              >
                <span>{{ item.label }}</span>
              </div>
            </template>
          </van-tab>
        </template>
      </van-tabs>
    </pu-card>

    <pu-card theme="3">
      <van-list
        v-model:loading="hashLoadingRef"
        :finished="finishedRef"
        @load="getMsgFunc(false)"
        loading-text="loading..."
        finished-text=""
      >
        <ol>
          <template v-for="(item, index) in msgListRef" :key="index">
            <li
              @click="changeView(index, item)"
              class="mt-[0.703125rem] mb-[0.46875rem] bg-tablebg rounded-[0.5rem] overflow-hidden"
            >
              <div class="w-full flex flex-between flex-col">
                <div
                  class="overflow-hidden flex w-full items-center justify-between p-3"
                >
                  <div class="flex w-full justify-start flex-col flex-1">
                    <h6
                      class="text-xl font-bold mr-3"
                      :class="item.status == 0 ? 'text-themetext0' : 'm4-text'"
                    >
                      {{ type_obj[item.message_type] }}
                    </h6>
                    <p class="my-1 text-xs">
                      <span>{{ resetTimeFunc(item.created_at) }}</span>
                    </p>
                  </div>
                  <div
                    :class="
                      item.status == 0 ? 'bg-themetext0' : 'bg-white/[0.3]'
                    "
                    class="w-2.5 h-2.5 rounded-full top-0.5 right-0.5 flex items-center justify-center"
                  ></div>
                </div>
                <article class="text-sm text-wihte bg-black/[0.2] p-3 w-full">
                  <div
                    v-html="item.content"
                    :class="index == view_index ? '' : 'truncate'"
                  ></div>
                </article>
              </div>
            </li>
          </template>
        </ol>
        <pu-no-data v-if="!msgListRef.length && !hashLoadingRef"></pu-no-data>
      </van-list>
    </pu-card>
    <Panddingbottom></Panddingbottom>
    <!-- <em class="w-full h-10 block"></em> -->
  </pu-page>
    <pu-page title="Mensagem" class="z-[999]" v-else-if="currentTemplate.value == 'template_five'">
      <div class="w-full">
        <pu-card theme="3" class="text-xs">
          <van-tabs
            v-model:active="msgTypeRef"
            @click-tab="clickTab"
            swipeable
            shrink
            style="
              --van-tabs-line-height: 2rem;
              --van-tabs-bottom-bar-height: 0px;
              --van-tabs-bottom-bar-color: #ffaf00;
              --van-padding-xs: 0;
            "
          >
            <template v-for="(item, index) in type_list" :key="index">
              <van-tab :name="item.value">
                <template #title>
                  <div
                    :class="
                      item.value == msgTypeRef
                        ? 'text-inputborder border-b-2 border-inputborder relative bottom-0 z-[100]' : 'border-b-2 border-rgbawhite30 '
                    "
                    class="h-8 px-3 flex items-center"
                  >
                    <span>{{ item.label }}</span>
                  </div>
                </template>
              </van-tab>
            </template>
          </van-tabs>
        </pu-card>
      </div>
    

    <pu-card theme="3">
      <van-list
        v-model:loading="hashLoadingRef"
        :finished="finishedRef"
        @load="getMsgFunc(false)"
        loading-text="loading..."
        finished-text=""
      >
        <ol>
          <template v-for="(item, index) in msgListRef" :key="index">
            <li
              @click="changeView(index, item)"
              class="mt-[0.703125rem] mb-[0.46875rem] rounded-[0.5rem] overflow-hidden"
              :class="item.status == 0 ? 'm5-theme-input' : 'bg-gradient-to-r from-thirsmodel1 to-thirsmodel2'"
            >
              <div class="w-full flex flex-between flex-col">
                <div
                  class="overflow-hidden flex w-full items-center justify-between p-3"
                >
                  <div class="flex w-full justify-start flex-col flex-1">
                    <h6
                      class="text-xl font-bold mr-3 text-themewhite"
                    >
                      {{ type_obj[item.message_type] }}
                    </h6>
                    <p class="my-1 text-xs text-themetext3">
                      <span>{{ resetTimeFunc(item.created_at) }}</span>
                    </p>
                  </div>
                  <div
                    :class="
                      item.status == 0 ? 'bg-two' : 'bg-white/[0.3]'
                    "
                    class="w-2.5 h-2.5 rounded-full top-0.5 right-0.5 flex items-center justify-center"
                  ></div>
                </div>
                <article class="text-sm text-wihte  p-3 w-full text-themetext3">
                  <div
                    v-html="item.content"
                    :class="index == view_index ? '' : 'truncate'"
                  ></div>
                </article>
              </div>
            </li>
          </template>
        </ol>
        <pu-no-data v-if="!msgListRef.length && !hashLoadingRef"></pu-no-data>
      </van-list>
    </pu-card>
    <Panddingbottom></Panddingbottom>
    <!-- <em class="w-full h-10 block"></em> -->
  </pu-page>
</template>
<style lang="css" scoped>
/* .template-one :deep(.van-tabs__nav){
    background: var(--color-body-bg)  !important;
} */
 .tabClass :deep(.van-tabs--line .van-tabs__wrap){ 
    background: #10121d;
    border-bottom: 1px solid rgba(255,255,255,0.3) !important;
   }
</style>
