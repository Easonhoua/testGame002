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
const clickOrder = ref([])
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
    // let g_list = props.list&&props.list.games||[]
    // let arr = []
    // // let item_length = isMobile.value ? (props.list&&props.list.show_num||9) : 12 // 移动端3x3，桌面端4x3
    // let item_length = props.list&&props.list.show_num||6
    // let list_length = 0
    // if(g_list.length%item_length) {
    //     list_length = parseInt(g_list.length/item_length)+1
    // }else {
    //     list_length = parseInt(g_list.length/item_length)
    // }
    // for(let i=0;i<list_length;i++) {
    //     let item = []
    //     for(let j=0;j<g_list.length;j++) {
    //         if(j >= i*item_length && j < (i+1)*item_length ) {
    //             console.log(j,'bababba')
    //             item.push(g_list[j])
    //         }
    //     }
    //     arr.push(item)
    // }
    // console.log(arr,'buzhid shenme ')
    // return arr
    // 确保数据存在且是数组
    const original_list = props.list && props.list.games || []
    if (original_list.length === 0) return []

    // 1. 准备一份新数组用于排序，避免直接修改 props
    let sorted_list = [...original_list]
    
    // 2. 排序逻辑：前两个保持不变，后面的按 is_collect 排序
    // if (sorted_list.length > 2) {
    //     const firstTwo = sorted_list.slice(0, 2);
    //     const others = sorted_list.slice(2);
        
    //     const collected = others.filter(item => item.is_collect);
    //     const uncollected = others.filter(item => !item.is_collect);
        
    //     sorted_list = [...firstTwo, ...collected, ...uncollected];
    // }
    if (sorted_list.length > 2) {
        const firstTwo = sorted_list.slice(0, 2);
        const others = sorted_list.slice(2);
        
        // 排序规则：点击过的 ID 按照在 clickOrder 中的顺序排（最新的在前），没点击过的保持原序
        const sortByIndex = (a, b) => {
            const indexA = clickOrder.value.indexOf(a.id);
            const indexB = clickOrder.value.indexOf(b.id);
            
            if (indexA !== -1 && indexB !== -1) return indexA - indexB; // 都在点击记录里，按记录排
            if (indexA !== -1) return -1; // 只有 A 点击过，A 在前
            if (indexB !== -1) return 1;  // 只有 B 点击过，B 在前
            return 0; // 都没点击过，保持相对位置
        };

        const collected = others.filter(item => item.is_collect).sort(sortByIndex);
        const uncollected = others.filter(item => !item.is_collect).sort(sortByIndex);
        
        sorted_list = [...firstTwo, ...collected, ...uncollected];
    }

    // 3. 分组逻辑
    let arr = []
    let item_length = Number(props.list && props.list.show_num || 6)
    if (item_length <= 0) item_length = 6 

    let list_length = Math.ceil(sorted_list.length / item_length)

    for (let i = 0; i < list_length; i++) {
        let page_items = []
        for (let j = 0; j < sorted_list.length; j++) {
            if (j >= i * item_length && j < (i + 1) * item_length) {
                page_items.push(sorted_list[j])
            }
        }
        if (page_items.length > 0) {
            arr.push(page_items)
        }
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
function goggleCollect(game) {
    // let show_num = props.list&&props.list.show_num||9
    // let _eq = show_num*eq+ek
    // takeGameCollectFunc(game.id, props.index, _eq)
    // 从原始未排序的列表中找到该游戏的真实索引
    const games = props.list && props.list.games || []
    const realIndex = games.findIndex(item => item.id === game.id)
    
    // if (realIndex > -1) {
    //     takeGameCollectFunc(game.id, props.index, realIndex)
    // }
     if (realIndex > -1) {
        // 更新点击顺序：先移除已有的，再插入到最前面
        const orderIndex = clickOrder.value.indexOf(game.id);
        if (orderIndex > -1) clickOrder.value.splice(orderIndex, 1);
        clickOrder.value.unshift(game.id); 

        takeGameCollectFunc(game.id, props.index, realIndex)
    }
}
</script>

<template>
    <van-swipe ref="swipe" :loop="true"  :show-indicators="false" lazy-render class="swiper template_one" v-if="currentTemplate.value  =='template_one'">
        <van-swipe-item v-for="child,eq in view_list" :key="'child_'+eq" class="item-list">
            <!-- :class="['grid gap-2', isMobile ? 'grid-cols-3' : 'grid-cols-4']" -->
            <ul class="grid grid-cols-3 gap-2 square-grid">
                <li v-for="game in child" :key="game.id" class="w-full">
                    <div class="relative w-full">
                        <a @click="toGame(game)" href="javascript:;" class="w-full block">
                            <van-image :src="game.cover" lazy-load fit="cover" radius="0.5rem" class="w-full aspect-[3/4]" />
                        </a>
                        <button @click="goggleCollect(game)" class="w-6 h-6 bg-rgbablack50 rounded-full absolute top-1 right-0.5 flex items-center justify-center">
                            <img v-if="game.is_collect" src="/imgs/icon-collect-a.svg" class="w-4 h-4">
                            <img v-else src="/imgs/icon-collect.svg" class="w-4 h-4">
                        </button>
                    </div>
                </li>
            </ul>
        </van-swipe-item>
    </van-swipe>
    <van-swipe ref="swipe" :loop="true" :show-indicators="false" lazy-render class="swiper" v-else>
        <van-swipe-item v-for="child,eq in view_list" :key="'child_'+eq" class="item-list">
            <!-- :class="['grid gap-2', isMobile ? 'grid-cols-3' : 'grid-cols-4']" -->
            <ul class="grid grid-cols-4 gap-2 square-grid" >
                <li v-for="game in child" :key="game.id" class="w-full">
                    <div class="relative w-full">
                        <a @click="toGame(game)" href="javascript:;" class="w-full block">
                            <van-image :src="game.cover" lazy-load fit="cover" radius="0.5rem" class="w-full aspect-[3/4]" />
                        </a>
                        <button @click="goggleCollect(game)" class="w-6 h-6 bg-rgbablack50 rounded-full absolute top-1 right-0.5 flex items-center justify-center">
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
    .template_one{
        .grid-cols-4 {
            grid-template-columns: repeat(3, 1fr);
        }
    }
   
    /* .swiper .item-list:nth-child(2n) {
        padding-left: 1rem;
        box-sizing: border-box;
    } */
}
</style>

