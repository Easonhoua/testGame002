<script setup>
import { computed, ref } from "vue";
import { useScreenSafeArea } from "@vueuse/core";
import { bodyWidthRef } from "@/utils/config";
import {
  gameAllShowRef,
  gameAllCateId,
  gameListRef,
  gameModel,
} from "@/model/game";
console.log("游戏列表组件gameAllCateId", gameAllCateId.value);
console.log(
  "gameAllShowRef",
  gameAllShowRef.value,
  gameListRef.value,
  gameModel.value,
);
import { playBtnAudioFunc, isPwaFunc } from "@/utils/core";
import { pwaIndexModel } from "@/model/pwa";
import { useThemeImages } from "@/utils/themeimg";
const CommonImg = useThemeImages().common;
const HomeImg = useThemeImages().home;
const { top, bottom } = useScreenSafeArea();
const currentTemplate = ref(
  import.meta.env.VITE_TEMPLATE || TEMPLATE_CONFIG.DEFAULT,
);
const { gameDetailFunc, takeGameCollectFunc } = gameModel();
const { getPwaConfigFunc } = pwaIndexModel();

let autoplay = ref(true);
let game_cover_index = ref(0);
const searchQuery = ref("");
const sortedGames = computed(() => {
  if (!searchQuery.value) {
    // 默认展示热门分类 Quente，从第7个开始
    const hotCategory = gameListRef.value.find(
      (cat) => cat.title && cat.title.toLowerCase() === "quente",
    );
    if (hotCategory && hotCategory.games) {
      return hotCategory.games
        .slice(6)
        .map((game, eqIdx) => ({
          ...game,
          _catIdx: gameListRef.value.findIndex(
            (cat) => cat.title && cat.title.toLowerCase() === "quente",
          ),
          _eqIdx: eqIdx + 6,
        }));
    }
    return [];
  }
  // 搜索时，先按字母顺序，再按分类sort升序
  return filteredGames.value.sort((a, b) => {
    const queryLower = searchQuery.value.toLowerCase();
    const aIndex = a.title.toLowerCase().indexOf(queryLower);
    const bIndex = b.title.toLowerCase().indexOf(queryLower);
    if (aIndex === bIndex) {
      // 分类优先级排序
      const aCat = gameListRef.value[a._catIdx];
      const bCat = gameListRef.value[b._catIdx];
      const aSort = aCat && aCat.sort !== undefined ? aCat.sort : 9999;
      const bSort = bCat && bCat.sort !== undefined ? bCat.sort : 9999;
      if (aSort === bSort) {
        return a.title.localeCompare(b.title);
      }
      return aSort - bSort;
    }
    return aIndex - bIndex;
  });
});
const filteredGames = computed(() => {
  if (!searchQuery.value) return [];
  const seenTitles = new Set();
  const allGames = [];
  gameListRef.value.forEach((category, catIdx) => {
    if (category.games) {
      category.games.forEach((game, eqIdx) => {
        const titleLower = game.title.toLowerCase();
        // 如果标题还没出现过，才添加到结果中
        if (!seenTitles.has(titleLower)) {
          seenTitles.add(titleLower);
          allGames.push({ ...game, _catIdx: catIdx, _eqIdx: eqIdx });
        }
      });
    }
  });
  return allGames.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});
const toggleCollect = async (game) => {
  await takeGameCollectFunc(game.id, game._catIdx, game._eqIdx);
};
let isFavorito = computed(() => {
  // Check if the current category is "Favorito"
  return (
    gameListRef.value.find((item) => item.id == gameAllCateId.value)?.title ==
    "Favorito"
  );
});

const headerStyle = computed(() => {
  if (currentTemplate.value === "template_one") {
    // <!-- bg-header-bg -->
    // <!-- :style="`padding-top: ${top};`" -->
    return {
      backgroundColor: "var(--color-header-bg)",
      paddingTop: top.value ? `${top.value}px` : "0px",
    };
  } else {
    return {
      backgroundImage: `url(${HomeImg.img_topBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      paddingTop: top.value ? `${top.value}px` : "0px",
      color: "var(--color-textcolorsix)",
    };
  }
});

let collect_list = computed(() => {
  return gameListRef.value
    .reduce((acc, item) => {
      return acc.concat(item.games);
    }, [])
    .filter((item) => item.is_collect);
  //   .reduce((unique, item) => {
  //     console.log(item)
  //     const exists = unique.find(u => u.game_id === item.game_id)
  //     if (!exists) {
  //       unique.push(item)
  //     }
  //     return unique
  //   }, [])
});

function onClickTab(id) {
  playBtnAudioFunc();
  autoplay.value = false;
  gameAllCateId.value = id;
  setTimeout(() => {
    autoplay.value = true;
  }, 100);
}

function toGame(game) {
  if (!isPwaFunc()) {
    getPwaConfigFunc().then((isShow) => {
      //不是true 都可以进游戏
      if (isShow != true) {
        gameDetailFunc(game.id);
      }
    });
  } else {
    gameDetailFunc(game.id);
  }
}
function delGameCollect(cate_id, id) {
  let index = gameListRef.value.findIndex(
    (item) => item.game_type_id == cate_id,
  );
  if (index != -1) {
    let _list = gameListRef.value[index].games;
    let eq = _list.findIndex((item) => item.id == id);
    takeGameCollectFunc(id, index, eq);
  }
}

function close() {
  playBtnAudioFunc();
  gameAllShowRef.value = false;
}
</script>

<template>
    <div>
        <van-popup
            v-model:show="gameAllShowRef"
            position="bottom"
            class="popup-container h-full "
            overlay-class="popup-overlay"
            style="z-index: 999;"
            teleport="body"
            :overlay="false"
            :class="currentTemplate =='template_one'? '!bg-three':currentTemplate =='template_four'?'!bg-tablebg':'!bg-body-bg'"
        >
            <section class="w-full h-full flex flex-col " v-if="currentTemplate =='template_one'|| currentTemplate =='template_two'||currentTemplate =='template_three'" >
                <!-- v-if="currentTemplate.value =='template_one" -->
               
                <header  class="w-full  " :style="headerStyle">
                    <div class="w-full h-[3.25rem] relative flex items-center justify-center">
                        <div class="absolute top-0 left-0 h-full flex items-center">
                           
                            <a @click="close()" href="javascript:;" class="h-full px-3 flex items-center" >
                                <img :src=CommonImg.btn_back class="w-9 h-9 mt-1">
                            </a>
                        </div>
                        <h3 class="text-base leading-4 font-medium text-center line-clamp-2 capitalize" style="max-width: 60%;">
                            <span>Jogos</span>
                        </h3>
                    </div>
                </header>
                <section class="flex-1 overflow-hidden flex " >
                    <div class="w-[4.75rem] pl-2 overflow-y-auto">
                        <ul class="w-[3.625rem] block">
                            <template v-for="item,index in gameListRef" :key="index" v-if="currentTemplate =='template_one'">
                                <li class="w-full mb-1">
                                    <div @click="onClickTab(item.id)" :class="item.id==gameAllCateId?'ctx-theme__linear':'bg-rgbawhite10'" class="w-full px-0.5 py-2 rounded-xl cursor-pointer">
                                        <van-image :src="item.cover_home" fit="contain" class="w-full h-6" />
                                        <p class="text-[0.5625rem] text-center">{{ item.title }}</p>
                                    </div>
                                </li>
                            </template>
                            <template v-for="item,i in gameListRef" :key="i" v-else>
                                <li class="w-full mb-1">
                                    <div @click="onClickTab(item.id)" :class="item.id==gameAllCateId?'m2-btn-ten':'bg-rgbawhite10'" class="w-full px-0.5 py-2 rounded-xl cursor-pointer">
                                        <van-image :src="item.cover_home" fit="contain" class="w-full h-6" />
                                        <p class="text-[0.5625rem] text-center">{{ item.title }}</p>
                                    </div>
                                </li>
                            </template>
                            <!-- <li class="w-full mb-1">
                                <div @click="onClickTab(0)" :class="gameAllCateId==0?'ctx-theme__linear':'bg-rgbawhite10'" class="w-full px-0.5 py-2 rounded-xl cursor-pointer">
                                    <van-image src="/imgs/in-g-collect.png" fit="contain" class="w-full h-6" />
                                    <p class="text-[0.5625rem] text-center">Favorito</p>
                                </div>
                            </li> -->
            </ul>
          </div>
          <div class="flex-1 overflow-y-auto">
            <template v-for="(item, index) in gameListRef" :key="index">
              <div v-show="item.id == gameAllCateId && autoplay && !isFavorito">
                <ul class="!px-2 flex flex-wrap">
                  <li
                    v-for="(game, eq) in item.games"
                    :key="'game_' + eq"
                    class="w-1/3 px-1 mb-2"
                  >
                    <div class="w-full relative">
                      <a
                        @click="toGame(game)"
                        href="javascript:;"
                        class="w-full block"
                      >
                        <van-image
                          :src="game.cover"
                          lazy-load
                          fit="cover"
                          radius="0.5rem"
                          class="w-full h-[7.25rem]"
                        />
                      </a>
                      <button
                        @click="takeGameCollectFunc(game.id, index, eq)"
                        class="w-6 h-6 bg-rgbablack50 rounded-full absolute top-1 right-0.5 flex items-center justify-center"
                      >
                        <img
                          v-if="game.is_collect"
                          src="/imgs/icon-collect-a.svg"
                          class="w-4 h-4"
                        />
                        <img
                          v-else
                          src="/imgs/icon-collect.svg"
                          class="w-4 h-4"
                        />
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
            <div v-show="isFavorito && autoplay">
              <ul class="!px-2 flex flex-wrap">
                <li
                  v-for="(game, eq) in collect_list"
                  :key="'game_' + eq"
                  class="w-1/3 px-1 mb-2"
                >
                  <div class="w-full relative">
                    <a
                      @click="toGame(game)"
                      href="javascript:;"
                      class="w-full block"
                    >
                      <van-image
                        :src="game.cover"
                        fit="cover"
                        radius="0.5rem"
                        class="w-full h-[7.25rem]"
                      />
                    </a>
                    <button
                      @click="delGameCollect(game.category_id, game.id)"
                      class="w-6 h-6 bg-rgbablack50 rounded-full absolute top-1 right-0.5 flex items-center justify-center"
                    >
                      <img
                        v-if="game.is_collect"
                        src="/imgs/icon-collect-a.svg"
                        class="w-4 h-4"
                      />
                      <img
                        v-else
                        src="/imgs/icon-collect.svg"
                        class="w-4 h-4"
                      />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <i :style="`height: ${bottom};`" class="w-full mt-2 block shrink-0"></i>
      </section>
      <section
        class="w-full h-full flex flex-col"
        v-else-if="currentTemplate == 'template_four'"
      >
        <header :style="`padding-top: ${top};`" class="w-full bg-theme">
          <div
            class="w-full h-[3.25rem] relative flex items-center justify-center"
          >
            <div class="absolute top-0 left-0 h-full flex items-center">
              <a
                @click="close()"
                href="javascript:;"
                class="h-full px-3 flex items-center"
              >
                <img :src="CommonImg.btn_back" class="w-9 h-9 mt-1" />
              </a>
            </div>
            <h3
              class="text-base leading-4 text-center line-clamp-2 capitalize m4-text font-bold"
              style="max-width: 60%"
            >
              <span>Jogos</span>
            </h3>
          </div>
        </header>
        <div class="mt-2 !bg-tablebg m4-search-box">
          <van-search
            v-model="searchQuery"
            placeholder="Procurar jogos"
            shape="round"
            :style="{ height: '32px' }"
            input-align="left"
            :clearable="false"
            class="custom-search"
          >
            <template #left-icon>
              <img :src="CommonImg.icon_search" class="w-4 h-4 ml-1" />
            </template>
            <template #right-icon v-if="searchQuery != ''">
              <img
                :src="CommonImg.btn_close"
                class="w-4 h-4 ml-1 opacity-60"
                @click="searchQuery = ''"
              />
            </template>
          </van-search>
        </div>
        <pu-card theme="4" v-if="searchQuery == ''">
          <div class="flex-1 overflow-hidden flex mt-4 h-full">
            <!-- 左侧栏 - 独立滚动区域 -->
            <div
              class="w-[4.75rem] pl-2 overflow-y-auto h-[calc(100vh-7.7rem)] scrollbar-hide flex !flex-col"
              style="flex-shrink: 0"
            >
              <ul class="w-[3.625rem] block">
                <template v-for="(item, index) in gameListRef" :key="index">
                  <li class="w-full mb-1">
                    <div
                      @click="onClickTab(item.id)"
                      :class="
                        item.id == gameAllCateId
                          ? 'm4-ten-btn'
                          : 'bg-rgbawhite10'
                      "
                      class="w-full px-0.5 py-2 rounded-xl cursor-pointer"
                    >
                      <van-image
                        :src="item.cover_home"
                        fit="contain"
                        class="w-full h-6"
                      />
                      <p class="text-[0.48rem] text-center font-bold">
                        {{ item.title }}
                      </p>
                    </div>
                  </li>
                </template>
              </ul>
              <!-- 注释部分保留 -->
              <!-- <van-tabs v-model:active="game_cover_index" shrink style="--van-tabs-line-height: 2.5rem;
                        --van-tabs-bottom-bar-height: 0;
                        --van-padding-xs: 0;" class="w-[3.625rem] block !flex-col" >
                            <van-tab v-for="item, index in gameListRef" :key="index">
                              <template #title>
                                <div @click="onClickTab(item.id)"
                                  :class="item.id == gameAllCateId ? 'ctx-box-btn font-bold text-theme' : 'ctx-box-btn3 text-white'"
                                  class="flex items-center justify-center px-3 py-0.5 rounded-2xl cursor-pointer ml-2.5">
                                  <van-image :src="item.cover_home" fit="contain" class="w-full h-6" />
                                  <p class="text-[0.68rem] text-center">{{ item.title }}</p>
                                </div>
                              </template>
                            </van-tab>
                          </van-tabs> -->
            </div>
            <!-- 右侧内容区 - 独立滚动区域 -->
            <div class="flex-1 overflow-y-auto h-[calc(100vh-7.7rem)]">
              <template v-for="(item, index) in gameListRef" :key="index">
                <div
                  v-show="item.id == gameAllCateId && autoplay && !isFavorito"
                >
                  <ul class="!px-2 flex flex-wrap">
                    <li
                      v-for="(game, eq) in item.games"
                      :key="'game_' + eq"
                      class="w-1/3 px-1 mb-2"
                    >
                      <div class="w-full relative">
                        <a
                          @click="toGame(game)"
                          href="javascript:;"
                          class="w-full block"
                        >
                          <van-image
                            :src="game.cover"
                            lazy-load
                            fit="cover"
                            radius="0.5rem"
                            class="w-full h-[7.25rem]"
                          />
                        </a>
                        <button
                          @click="takeGameCollectFunc(game.id, index, eq)"
                          class="w-6 h-6 rounded-full absolute top-1 right-0.5 flex items-center justify-center"
                        >
                          <img
                            :src="
                              game.is_collect
                                ? CommonImg.m4_collect_a
                                : CommonImg.m4_collect
                            "
                            class="w-6 h-6"
                          />
                          <!-- <img v-else src="/imgs/home/collect.png" class="w-6 h-6"> -->
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </template>
              <div v-show="isFavorito && autoplay">
                <ul class="!px-2 flex flex-wrap">
                  <li
                    v-for="(game, eq) in collect_list"
                    :key="'game_' + eq"
                    class="w-1/3 px-1 mb-2"
                  >
                    <div class="w-full relative">
                      <a
                        @click="toGame(game)"
                        href="javascript:;"
                        class="w-full block"
                      >
                        <van-image
                          :src="game.cover"
                          fit="cover"
                          radius="0.5rem"
                          class="w-full h-[7.25rem]"
                        />
                      </a>
                      <button
                        @click="delGameCollect(game.category_id, game.id)"
                        class="w-6 h-6 rounded-full absolute top-1 right-0.5 flex items-center justify-center"
                      >
                        <img
                          :src="
                            game.is_collect
                              ? CommonImg.m4_collect_a
                              : CommonImg.m4_collect
                          "
                          class="w-6 h-6"
                        />
                        <!-- <img v-else src="/imgs/home/collect.png" class="w-6 h-6"> -->
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </pu-card>
        <div
          class="scrollable-content mt-2 px-4 overflow-y-auto h-[calc(100vh-7.7rem)]"
          v-if="searchQuery != ''"
        >
          <div class="flex flex-wrap w-full justify-start gap-3.5 x-3">
            <template v-if="sortedGames.length > 0">
              <div
                v-for="game in sortedGames"
                :key="game.id"
                class="game-item w-[30%] pt-1 pb-1"
                @click="toGame(game)"
              >
                <div class="relative">
                  <van-image
                    :src="game.cover"
                    class="w-full aspect-[3/4] rounded-xl overflow-hidden"
                    lazy-load
                    fit="cover"
                  />
                  <button @click.stop="toggleCollect(game)" class="collect-btn">
                    <img
                      :src="
                        game.is_collect
                          ? CommonImg.m4_collect_a
                          : CommonImg.m4_collect
                      "
                      class="w-5 h-5 absolute top-1 right-0.5"
                    />
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <img
                :src="CommonImg.img_nodata"
                class="w-[8rem] h-[8rem] m-auto mt-20 opacity-30"
              />
            </template>
          </div>
        </div>
        <!-- 已在上方实现独立滚动，此处不再需要重复的滚动区域 -->
        <i :style="`height: ${bottom};`" class="w-full mt-2 block shrink-0"></i>
      </section>
      <section
        class="w-full h-full flex flex-col"
        v-else-if="currentTemplate == 'template_five'"
      >
        <header :style="`padding-top: ${top};`" class="w-full bg-btn1_bg">
          <div
            class="w-full h-[3.25rem] relative flex items-center justify-center"
          >
            <div class="absolute top-0 left-0 h-full flex items-center">
              <a
                @click="close()"
                href="javascript:;"
                class="h-full px-3 flex items-center"
              >
                <img :src="CommonImg.btn_back" class="w-9 h-9 mt-1" />
              </a>
            </div>
            <h3
              class="text-base leading-4 text-center line-clamp-2 capitalize m4-text font-bold"
              style="max-width: 60%"
            >
              <span>Jogos</span>
            </h3>
          </div>
        </header>
        <div class="mt-4 bg-tablebg m5-search-box">
          <van-search
            v-model="searchQuery"
            placeholder="Procurar jogos"
            shape="round"
            :style="{ height: '42px' }"
            input-align="left"
            :clearable="false"
            class="custom-search"
          >
            <template #left-icon>
              <img :src="CommonImg.icon_search" class="w-4 h-4 ml-1 mr-1" />
            </template>
            <template #right-icon v-if="searchQuery != ''">
              <img
                :src="CommonImg.btn_close"
                class="w-4 h-4 ml-1 opacity-60"
                @click="searchQuery = ''"
              />
            </template>
          </van-search>
        </div>
        <pu-card theme="4" v-if="searchQuery == ''">
          <div class="flex-1 overflow-hidden flex mt-4 h-full">
            <!-- 左侧栏 - 独立滚动区域 -->
            <div
              class="w-[4.75rem] pl-2 overflow-y-auto h-[calc(100vh-7.7rem)] scrollbar-hide flex !flex-col"
              style="flex-shrink: 0"
            >
              <ul class="w-[3.625rem] block">
                <template v-for="(item, index) in gameListRef" :key="index">
                  <li class="w-full mb-1">
                    <div
                      @click="onClickTab(item.id)"
                      :class="
                        item.id == gameAllCateId
                          ? 'bg-gradient-to-r from-themecardlinear1 to-themecardlinear2'
                          : 'bg-rgbawhite10'
                      "
                      class="w-full px-0.5 py-2 rounded-xl cursor-pointer"
                    >
                      <van-image
                        :src="item.cover_home"
                        fit="contain"
                        class="w-full h-6"
                      />
                      <p class="text-[0.48rem] text-center font-bold">
                        {{ item.title }}
                      </p>
                    </div>
                  </li>
                </template>
              </ul>
              <!-- 注释部分保留 -->
              <!-- <van-tabs v-model:active="game_cover_index" shrink style="--van-tabs-line-height: 2.5rem;
                            --van-tabs-bottom-bar-height: 0;
                            --van-padding-xs: 0;" class="w-[3.625rem] block !flex-col" >
                                <van-tab v-for="item, index in gameListRef" :key="index">
                                  <template #title>
                                    <div @click="onClickTab(item.id)"
                                      :class="item.id == gameAllCateId ? 'ctx-box-btn font-bold text-theme' : 'ctx-box-btn3 text-white'"
                                      class="flex items-center justify-center px-3 py-0.5 rounded-2xl cursor-pointer ml-2.5">
                                      <van-image :src="item.cover_home" fit="contain" class="w-full h-6" />
                                      <p class="text-[0.68rem] text-center">{{ item.title }}</p>
                                    </div>
                                  </template>
                                </van-tab>
                              </van-tabs> -->
            </div>
            <!-- 右侧内容区 - 独立滚动区域 -->
            <div class="flex-1 overflow-y-auto h-[calc(100vh-7.7rem)]">
              <template v-for="(item, index) in gameListRef" :key="index">
                <div
                  v-show="item.id == gameAllCateId && autoplay && !isFavorito"
                >
                  <ul class="!px-2 flex flex-wrap">
                    <li
                      v-for="(game, eq) in item.games"
                      :key="'game_' + eq"
                      class="w-1/3 px-1 mb-2"
                    >
                      <div class="w-full relative">
                        <a
                          @click="toGame(game)"
                          href="javascript:;"
                          class="w-full block"
                        >
                          <van-image
                            :src="game.cover"
                            lazy-load
                            fit="cover"
                            radius="0.5rem"
                            class="w-full h-[7.25rem]"
                          />
                        </a>
                        <button
                          @click="takeGameCollectFunc(game.id, index, eq)"
                          class="w-6 h-6 rounded-full absolute top-1 right-0.5 flex items-center justify-center"
                        >
                          <img
                            :src="
                              game.is_collect
                                ? CommonImg.m4_collect_a
                                : CommonImg.m4_collect
                            "
                            class="w-6 h-6"
                          />
                          <!-- <img v-else src="/imgs/home/collect.png" class="w-6 h-6"> -->
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </template>
              <div v-show="isFavorito && autoplay">
                <ul class="!px-2 flex flex-wrap">
                  <li
                    v-for="(game, eq) in collect_list"
                    :key="'game_' + eq"
                    class="w-1/3 px-1 mb-2"
                  >
                    <div class="w-full relative">
                      <a
                        @click="toGame(game)"
                        href="javascript:;"
                        class="w-full block"
                      >
                        <van-image
                          :src="game.cover"
                          fit="cover"
                          radius="0.5rem"
                          class="w-full h-[7.25rem]"
                        />
                      </a>
                      <button
                        @click="delGameCollect(game.category_id, game.id)"
                        class="w-6 h-6 rounded-full absolute top-1 right-0.5 flex items-center justify-center"
                      >
                        <img
                          :src="
                            game.is_collect
                              ? CommonImg.m4_collect_a
                              : CommonImg.m4_collect
                          "
                          class="w-6 h-6"
                        />
                        <!-- <img v-else src="/imgs/home/collect.png" class="w-6 h-6"> -->
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </pu-card>
        <div
          class="scrollable-content mt-2 px-4 overflow-y-auto h-[calc(100vh-7.7rem)]"
          v-if="searchQuery != ''"
        >
          <div class="flex flex-wrap w-full justify-start gap-3.5 x-3">
            <template v-if="sortedGames.length > 0">
              <div
                v-for="game in sortedGames"
                :key="game.id"
                class="game-item w-[30%] pt-1 pb-1"
                @click="toGame(game)"
              >
                <div class="relative">
                  <van-image
                    :src="game.cover"
                    class="w-full aspect-[3/4] rounded-xl overflow-hidden"
                    lazy-load
                    fit="cover"
                  />
                  <button @click.stop="toggleCollect(game)" class="collect-btn">
                    <img
                      :src="
                        game.is_collect
                          ? CommonImg.m4_collect_a
                          : CommonImg.m4_collect
                      "
                      class="w-5 h-5 absolute top-1 right-0.5"
                    />
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <img
                :src="CommonImg.img_nodata"
                class="w-[8rem] h-[8rem] m-auto mt-20 opacity-30"
              />
            </template>
          </div>
        </div>
        <!-- 已在上方实现独立滚动，此处不再需要重复的滚动区域 -->
        <i :style="`height: ${bottom};`" class="w-full mt-2 block shrink-0"></i>
      </section>
    </van-popup>
  </div>
</template>
<style scoped> 
.m4-search-box{
    .van-search {
  background-color: var(--color-tablebg) !important;
  /* border: 0.1rem solid #424242 !important; */
}

.van-search__content {
  background-color: var(--color-tablebg) !important;
}

.custom-search {
  /* border-radius: 9999px !important; */
  /* border: 1.5px solid #2e2458 !important;
  background: #2e2458 !important; */
  /* height: 36px !important; */
  /* border: 0.1rem solid #424242 !important; */

  --van-search-background: var(--color-tablebg) !important;
  --van-search-content-background: var(--color-tablebg)  !important;
  --van-search-input-text-color: rgba(255, 255, 255, 0.6) !important;
  --van-field-placeholder-text-color: rgba(255, 255, 255, 0.6) !important;
  --van-field-input-text-color: rgba(255, 255, 255, 0.6) !important;
}
.custom-search :deep(.van-search__content) {
  border: 0.1rem solid  var(--color-defaultborder) !important;
  background-color: var(--color-tablebg)  !important;
  border-radius: 2rem !important;
  min-height: 32px !important;
}
.custom-search :deep(.van-field__control) {
  color: rgba(255, 255, 255, 0.6) !important;
  font-size: 0.88rem;
}

.custom-search :deep(.van-field__control::placeholder) {
  color: rgba(255, 255, 255, 0.6) !important;
}

}



.m5-search-box{
    .van-search {
  background-color: var(--color-tablebg) !important;
  /* border: 0.1rem solid #424242 !important; */
}

.van-search__content {
  background-color: var(--color-tablebg) !important;
}

.custom-search {
  /* border-radius: 9999px !important; */
  /* border: 1.5px solid #2e2458 !important;
  background: #2e2458 !important; */
  /* height: 36px !important; */
  /* border: 0.1rem solid #424242 !important; */

  --van-search-background: var(--color-tablebg) !important;
  --van-search-content-background: var(--color-tablebg)  !important;
  --van-search-input-text-color: rgba(255, 255, 255, 0.6) !important;
  --van-field-placeholder-text-color: rgba(255, 255, 255, 0.6) !important;
  --van-field-input-text-color: rgba(255, 255, 255, 0.6) !important;
}
.custom-search :deep(.van-search__content) {
  border: 1px solid  var(--color-inputborder) !important;
  background-color: var(--color-tablebg)  !important;
  border-radius: 10px !important;
  min-height: 32px !important;
}
.custom-search :deep(.van-field__control) {
  color: #6c7caa !important;
  font-size: 0.628rem;
}

.custom-search :deep(.van-field__control::placeholder) {
  color: #6c7caa !important;
}

}
</style>
