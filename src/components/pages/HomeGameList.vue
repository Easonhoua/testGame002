<script setup>
import { computed, ref, watch, onMounted, onActivated, onDeactivated, onUnmounted} from "vue"
import { gameModel } from '@/model/game'
import { isPwaFunc } from '@/utils/core'
import { pwaIndexModel} from '@/model/pwa'

const { gameDetailFunc, takeGameCollectFunc } = gameModel()
const{ getPwaConfigFunc } = pwaIndexModel()

const props = defineProps({
    list: [Object],
    index: [Number, String],
})

const isMobile = ref(false)

onMounted(() => {
    checkDevice()
    window.addEventListener('resize', checkDevice)
    // console.log(`HomeGameList ${props.index} - mounted`)
})

onUnmounted(() => {
    //console.log(`HomeGameList ${props.index} - unmounted`)
})

onActivated(() => {
    //console.log(`HomeGameList ${props.index} - activated from cache`)
})

onDeactivated(() => {
    //console.log(`HomeGameList ${props.index} - deactivated`)
})

const checkDevice = () => {
    isMobile.value = window.innerWidth <= 768
}

const view_list = computed(()=> {
    let g_list = props.list&&props.list.games||[]
    let arr = []
    // let item_length = isMobile.value ? (props.list&&props.list.show_num||9) : 12 // 移动端3x3，桌面端4x3
    let item_length = props.list&&props.list.show_num||6
    let list_length = 0
    if(g_list.length%item_length) {
        list_length = parseInt(g_list.length/item_length)+1
    }else {
        list_length = parseInt(g_list.length/item_length)
    }
    for(let i=0;i<list_length;i++) {
        let item = []
        for(let j=0;j<g_list.length;j++) {
            if(j >= i*item_length && j < (i+1)*item_length ) {
                item.push(g_list[j])
            }
        }
        arr.push(item)
    }
    return arr
})

const swipe = ref(null)
watch(()=> props.list.prev, ()=> {
    swipe.value.prev()
})
watch(()=> props.list.next, ()=> {
    swipe.value.next()
})

function toGame(game) {
    if(!isPwaFunc()){
        getPwaConfigFunc().then(isShow => {
            //不是true 都可以进游戏
            if(isShow != true) {
                gameDetailFunc(game.id)
            }
        })
    }else{
        gameDetailFunc(game.id)
    }
}
function goggleCollect(game, eq, ek) {
    let show_num = props.list&&props.list.show_num||9
    let _eq = show_num*eq+ek
    takeGameCollectFunc(game.id, props.index, _eq)
}
</script>

<template>
    <van-swipe ref="swipe" :loop="true" :show-indicators="false" lazy-render class="swiper">
        <van-swipe-item v-for="child,eq in view_list" :key="'child_'+eq" class="item-list">
            <!-- :class="['grid gap-2', isMobile ? 'grid-cols-3' : 'grid-cols-4']" -->
            <ul class="grid  gap-2 square-grid" :class=" currentTemplate.value =='template_one'  ? 'grid-cols-3' : 'grid-cols-4'">
                <li v-for="game,ek in child" :key="'game_'+ek" class="w-full">
                    <div class="relative w-full">
                        <a @click="toGame(game)" href="javascript:;" class="w-full block">
                            <van-image :src="game.cover" lazy-load fit="cover" radius="0.5rem" class="w-full aspect-[3/4]" />
                        </a>
                        <button @click="goggleCollect(game, eq, ek)" class="w-6 h-6 bg-rgbablack50 rounded-full absolute top-1 right-0.5 flex items-center justify-center">
                            <img v-if="game.is_collect" src="/imgs/icon-collect-a.svg" class="w-4 h-4">
                            <img v-else src="/imgs/icon-collect.svg" class="w-4 h-4">
                        </button>
                    </div>
                </li>
            </ul>
        </van-swipe-item>
    </van-swipe>
</template>
<style scoped>


.van-swipe-item {
    width: 100%;
    height: 100%;
}

.item-list {
    width: 100%;
    padding: 0.5rem;
}

.item-list ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

/* 确保图片容器保持宽高比 */
.van-image {
    width: 100%;
    height: auto;
}

/* 添加响应式样式 */
@media (max-width: 768px) {
    .grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
    }
    /* .swiper .item-list:nth-child(2n) {
        padding-left: 1rem;
        box-sizing: border-box;
    } */
}
</style>

