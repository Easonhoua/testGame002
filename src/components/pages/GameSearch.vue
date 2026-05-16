<script setup>
import { ref, computed, watch, h } from 'vue'
import { t } from '@/i18n'
import { gameModel } from '@/model/game'
import { playBtnAudioFunc, isPwaFunc } from '@/utils/core'
import { pwaIndexModel } from '@/model/pwa'
import { useThemeImages } from '@/utils/themeimg'
const CommonBgImg = useThemeImages().commonbg 
const CommonImg = useThemeImages().common 
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show'])

const { gameDetailFunc, takeGameCollectFunc, gameListRef } = gameModel()
const { getPwaConfigFunc } = pwaIndexModel()

const localShow = ref(props.show)
const searchQuery = ref('')

watch(() => props.show, (newVal) => {
  localShow.value = newVal
})
watch(localShow, (newVal) => {
  emit('update:show', newVal)
})

const sortedGames = computed(() => {
  if (!searchQuery.value) {
    // 默认展示热门分类 Quente，从第7个开始
    const hotCategory = gameListRef.value.find(cat => cat.title && cat.title.toLowerCase() === t('hot'))
    if (hotCategory && hotCategory.games) {
      return hotCategory.games.slice(6).map((game, eqIdx) => ({ ...game, _catIdx: gameListRef.value.findIndex(cat => cat.title && cat.title.toLowerCase() === 'quente'), _eqIdx: eqIdx + 6 }))
    }
    return []
  }
  // 搜索时，先按字母顺序，再按分类sort升序
  return filteredGames.value.sort((a, b) => {
    const queryLower = searchQuery.value.toLowerCase()
    const aIndex = a.title.toLowerCase().indexOf(queryLower)
    const bIndex = b.title.toLowerCase().indexOf(queryLower)
    if (aIndex === bIndex) {
      // 分类优先级排序
      const aCat = gameListRef.value[a._catIdx]
      const bCat = gameListRef.value[b._catIdx]
      const aSort = aCat && aCat.sort !== undefined ? aCat.sort : 9999
      const bSort = bCat && bCat.sort !== undefined ? bCat.sort : 9999
      if (aSort === bSort) {
        return a.title.localeCompare(b.title)
      }
      return aSort - bSort
    }
    return aIndex - bIndex
  })
})

const filteredGames = computed(() => {
  if (!searchQuery.value) return []
  const allGames = []
  const seenThirdPartyIds = new Set()
  gameListRef.value.forEach((category, catIdx) => {
    if (category.games) {
      const seenTitlesInCategory = new Set() // 每个分类独立的 Set
      category.games.forEach((game, eqIdx) => {
        const titleLower = game.title.toLowerCase()
        const thirdPartyId = game.third_party_game_id
        // 如果当前分类中标题还没出现过，才添加到结果中
        if (!seenTitlesInCategory.has(titleLower)&& !seenThirdPartyIds.has(thirdPartyId)) {
          seenTitlesInCategory.add(titleLower)
          seenThirdPartyIds.add(thirdPartyId)
          allGames.push({ ...game, _catIdx: catIdx, _eqIdx: eqIdx })
        }
      })
    }
  })

  return allGames.filter(game =>
    game.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toGame = async (game) => {
  playBtnAudioFunc()
  if (!isPwaFunc()) {
    await getPwaConfigFunc().then(isShow => {
      if (isShow !== true) {
        gameDetailFunc(game.id)
        close()
      }
    })
  } else {
    gameDetailFunc(game.id)
    close()
  }
}

const toggleCollect = async (game) => {
  await takeGameCollectFunc(game.id, game._catIdx, game._eqIdx)
}

const close = () => {
  emit('update:show', false)
  searchQuery.value = ''
}
</script>

<template>
    <van-popup 
      v-model:show="localShow"
      :style="{ 
        background: 'transparent',
        width: '21.25rem',
        maxWidth: '21.25rem',
        height: '680px',
        borderRadius: '1rem',
        overflow: 'hidden'
      }"
      :overlay-style="{ background: 'rgba(0, 0, 0, 0.7)' }"
      class="game-search-popup"
      position="center"
      teleport="body"
    >
      <div class="content-wrapper bg-three" v-if="currentTemplate.value =='template_one'">
        <div class="bg-layer">
          <img :src=CommonBgImg.bg_gamesearch />
        </div>
        <button @click="close()" class="close-btn absolute z-20">
            <icon-close class="w-3 h-3"></icon-close>
          <!-- <svg class="w-6 h-6 text-themewhite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
          </svg>  -->
        </button>
        <div class="content-layer w-warp">
          <h1 class="title text-themewhite">{{ t('modelPage.AllGames') }}</h1>
          <div>
            <van-search
              v-model="searchQuery"
              placeholder="Procurar jogos"
              shape="round"
              class="custom-search"
              :style="{height: '36px'}"
              input-align="left"
              :clearable="false" 
            >
            <!-- !bg-three border !boreder-three -->
              <template #left-icon>
                <img :src=CommonImg.icon_search class="w-4 h-4 ml-1">
              </template>
            </van-search>
          </div>
          <div style="margin-bottom: 8px;"></div>
          <div class="scrollable-content  bg-three">
            <div class="flex flex-wrap w-full justify-start gap-x-2 gap-y-2 px-2 pb-2">
              <template v-if="sortedGames.length">
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
                    <button
                      @click.stop="toggleCollect(game)"
                      class="collect-btn"
                    >
                      <img 
                        :src="game.is_collect ? '/imgs/icon-collect-a.svg' : '/imgs/icon-collect.svg'"
                        class="w-4 h-4"
                      >
                    </button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="col-span-3 text-center py-8 text-gray-400">
                  {{ searchQuery ? 'Nenhum jogo encontrado' : 'Digite para pesquisar' }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="content-wrapper" v-if="currentTemplate.value =='template_two'">
        <div class="bg-layer">
          <img :src=CommonBgImg.bg_gamesearch />
        </div>
        <img  @click="close()" :src=CommonImg.btn_close class="w-5 h-5 absolute top-3 right-2 z-10">
        <div class="content-layer w-warp">
          <h1 class="title">Todos Os Jogos</h1>
          <div>
            <van-search
              v-model="searchQuery"
              placeholder="Procurar jogos"
              shape="round"
              class="custom-search"
              :style="{height: '36px'}"
              input-align="left"
              :clearable="false" 
            >
              <template #left-icon>
                <img :src=CommonImg.icon_search class="w-5 h-4 ml-1">
              </template>
            </van-search>
          </div>
          <div style="margin-bottom: 8px;"></div>
          <div class="scrollable-content " >
            <div class="flex flex-wrap w-full justify-between  px-2 pb-2">
              <template v-if="sortedGames.length">
                <div v-for="game in sortedGames" :key="game.id" class="game-item w-[30%]   pt-1 pb-1"
                  @click="toGame(game)"
                >
                  <div class="relative">
                    <van-image
                      :src="game.cover"
                      class="w-full aspect-[3/4] rounded-xl overflow-hidden"
                      lazy-load
                      fit="cover"
                    />
                    <button
                      @click.stop="toggleCollect(game)"
                      class="collect-btn bg-rgbablack50"
                    >
                      <img 
                        :src="game.is_collect ? '/imgs/icon-collect-a.svg' : '/imgs/icon-collect.svg'"
                        class="w-4 h-4"
                      >
                    </button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="col-span-3 text-center py-8  text-three ">
                  {{ searchQuery ? 'Nenhum jogo encontrado' : 'Digite para pesquisar' }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="content-wrapper" v-if="currentTemplate.value =='template_three'">
        <div class="bg-layer">
          <img :src=CommonBgImg.bg_gamesearch />
        </div>
        <img  @click="close()" :src=CommonImg.btn_close class="w-5 h-5 absolute top-3 right-2 z-10">
        <div class="content-layer w-warp">
          <h1 class="title text-themetext1">{{ t('modelPage.AllGames') }}</h1>
          <div>
            <van-search
              v-model="searchQuery"
              :placeholder="t('Searchgames')"
              class="custom-search-v2"
              shape="round"
              :style="{
                height: '36px',
              }"
              input-align="left"
              :clearable="false" 
            >
              <template #left-icon>
                <img :src=CommonImg.icon_search class="w-5 h-4.5 ml-1">
              </template>
            </van-search>
          </div>
          <div style="margin-bottom: 8px;"></div>
          <div class="scrollable-content " >
            <div class="flex flex-wrap w-full justify-between  px-2 pb-2">
              <template v-if="sortedGames.length">
                <div v-for="game in sortedGames" :key="game.id" class="game-item w-[30%]   pt-1 pb-1"
                  @click="toGame(game)"
                >
                  <div class="relative">
                    <van-image
                      :src="game.cover"
                      class="w-full aspect-[3/4] rounded-xl overflow-hidden"
                      lazy-load
                      fit="cover"
                    />
                    <button
                      @click.stop="toggleCollect(game)"
                      class="collect-btn"
                    >
                      <img 
                        :src="game.is_collect ? '/imgs/icon-collect-a.svg' : '/imgs/icon-collect.svg'"
                        class="w-4 h-4"
                      >
                    </button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="col-span-3 text-center py-8  text-three ">
                  {{ searchQuery ? t('modelPage.Nogamesfound') : t("modelPage.Typesearch") }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

    </van-popup>
   
</template>

<style scoped>
.game-search-popup {
  :deep(.van-popup) {
    background: transparent !important;
  }
}

.content-wrapper {
  position: relative;
  width: 100%;
  height: 640px;
  border-radius: 1rem;
  overflow: hidden;
}

.bg-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 180px;
  z-index: 1;
}

.close-btn {
  top: 15px;
  right: 15px;
  width: 1.5rem;
  height: 1.5rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  position: absolute;
}
.close-btn:active {
  transform: scale(0.95);
}

.content-layer {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
}

.title {
  text-align: center;
  font-size: 1.25rem;
  margin: 0 0 24px 0;
  padding-top: 2px;
}
.search-bar-wrapper {
  padding: 0 16px;
}
.custom-search {
  /* border-radius: 9999px !important; */
  /* background: var(--color-three) !important; */
  /* height: 36px !important; */
  --van-search-background: none !important;
  --van-search-content-background: var(--color-searchbg) !important;
  --van-search-input-text-color: var(--color-theme) !important;
  --van-field-placeholder-text-color: var(--color-theme) !important;
  --van-field-input-text-color: var(--color-theme) !important;
}
.custom-search :deep(.van-search__content) {
  background-color: var(--color-searchbg) !important;
  border-radius: 9999px !important;
  border: 1.5px solid var(--color-searchborder) !important;
  min-height: 36px !important;
}
.custom-search :deep(.van-field__control) {
  color: var(--color-theme) !important;
  font-size: 20px;
}
.custom-search :deep(.van-field__control::placeholder) {
  color:  var(--color-theme) !important;
}

.custom-search-v2 {
  /* border-radius: 9999px !important; */
  /* background: var(--color-three) !important; */
  /* height: 36px !important; */
  --van-search-background: none !important;
  --van-search-content-background: var(--color-searchbg) !important;
  --van-search-input-text-color: var(--color-themetext2) !important;
  --van-field-placeholder-text-color: var(--color-themetext3) !important;
  --van-field-input-text-color: var(--color-themetext2) !important;
}
.custom-search-v2 :deep(.van-search__content) {
  background-color: var(--color-searchbg) !important;
  border-radius: 9999px !important;
  border: 1.5px solid var(--color-searchborder) !important;
  min-height: 36px !important;
}
.custom-search-v2 :deep(.van-field__control) {
  color: var(--color-themetext2) !important;
  font-size: 20px;
}
.custom-search-v2 :deep(.van-field__control::placeholder) {
  color:  var(--color-themetext3);
}


.scrollable-content {
  flex: 1;
  overflow-y: auto;
  margin-top: 4px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.scrollable-content::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
  background: transparent !important;
}

.collect-btn {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.game-item {
  transition: transform 0.2s;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
}

.game-item:active {
  transform: scale(0.95);
}

.game-item .van-image {
  border-radius: 0.5rem !important;
  overflow: hidden;
}
</style>