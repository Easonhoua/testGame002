<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
    length: {
        type: Number,
        default: 4
    },
    fontSizeMin: {
        type: Number,
        default: 16
    },
    fontSizeMax: {
        type: Number,
        default: 32
    },
    backgroundColorMin: {
        type: Number,
        default: 180
    },
    backgroundColorMax: {
        type: Number,
        default: 240
    },
    colorMin: {
        type: Number,
        default: 50
    },
    colorMax: {
        type: Number,
        default: 160
    },
    lineColorMin: {
        type: Number,
        default: 40
    },
    lineColorMax: {
        type: Number,
        default: 180
    },
    dotColorMin: {
        type: Number,
        default: 0
    },
    dotColorMax: {
        type: Number,
        default: 255
    },
    contentWidth: {
        type: Number,
        default: 90
    },
    contentHeight: {
        type: Number,
        default: 32
    }
})

const emit = defineEmits(['change'])

const codeString = '123456789'
const identifyCode = ref('')

function update() {
    identifyCode.value = ''
    for (let i = 0; i < props.length; i ++) {
        identifyCode.value += codeString[
            Math.floor(Math.random() * (codeString.length - 0) + 0)
        ]
    }
    emit('change',identifyCode.value)
    drawPic()
}

// 生成一个随机数
function randomNum (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
// 生成一个随机的颜色
function randomColor (min, max) {
    let r = randomNum(min, max)
    let g = randomNum(min, max)
    let b = randomNum(min, max)
    return 'rgb(' + r + ',' + g + ',' + b + ')'
}
function drawPic () {
    let canvas = document.getElementById('s-canvas')
    let ctx = canvas.getContext('2d')
    ctx.textBaseline = 'bottom'
    // 绘制背景
    ctx.fillStyle = randomColor(
        props.backgroundColorMin,
        props.backgroundColorMax
    )
    ctx.fillRect(0, 0, props.contentWidth, props.contentHeight)
    // 绘制文字
    for (let i = 0; i < identifyCode.value.length; i++) {
        drawText(ctx, identifyCode.value[i], i)
    }
    drawLine(ctx)
    drawDot(ctx)
}
function drawText (ctx, txt, i) {
    ctx.fillStyle = randomColor(props.colorMin, props.colorMax)
    ctx.font = randomNum(props.fontSizeMin, props.fontSizeMax) + 'px SimHei'
    let x = (i + 1) * (props.contentWidth / (identifyCode.value.length + 1))
    let y = randomNum(props.fontSizeMax, props.contentHeight - 5)
    let deg = randomNum(-30, 30)
    // 修改坐标原点和旋转角度
    ctx.translate(x, y)
    ctx.rotate(deg * Math.PI / 270)
    ctx.fillText(txt, 0, 0)
    // 恢复坐标原点和旋转角度
    ctx.rotate(-deg * Math.PI / 270)
    ctx.translate(-x, -y)
}
function drawLine (ctx) {
    // 绘制干扰线
    for (let i = 0; i < 2; i++) {
    ctx.strokeStyle = randomColor(
        props.lineColorMin,
        props.lineColorMax
    )
    ctx.beginPath()
    ctx.moveTo(
        randomNum(0, props.contentWidth),
        randomNum(0, props.contentHeight)
    )
    ctx.lineTo(
        randomNum(0, props.contentWidth),
        randomNum(0, props.contentHeight)
    )
    ctx.stroke()
    }
}
function drawDot (ctx) {
    // 绘制干扰点
    for (let i = 0; i < 20; i++) {
        ctx.fillStyle = randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(
            randomNum(0, props.contentWidth),
            randomNum(0, props.contentHeight),
            1,
            0,
            2 * Math.PI
        )
        ctx.fill()
    }
}

onMounted(()=> {
    update()
})
</script>

<template>
    <div>
        <canvas id="s-canvas" @click="update()" :width="contentWidth" :height="contentHeight" style="cursor: pointer;"></canvas>
    </div>
</template>