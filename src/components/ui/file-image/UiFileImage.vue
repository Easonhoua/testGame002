<script setup>
import { ref } from 'vue'

const emit = defineEmits(['confirm'])

let picavalue = ref('')

function uploadIMG(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    picavalue.value = files[0];
    if(picavalue.value.size / 1024 <300){
        imgNexview(picavalue.value)
    } else {
        imgPreview(picavalue.value);
    }
}
//获取不压缩图片
function imgNexview(file) {
    if (!file || !window.FileReader) return;
    if (/^image/.test(file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            let result = this.result;
            let returnObj = {
                viewPath: result,
                filePath: result.replace(/^data:image\/\w+;base64,/, "")
            }
            emit('confirm',returnObj);
        }
    }
}
//获取压缩图片
function imgPreview(file) {
    if (!file || !window.FileReader) return;
    if (/^image/.test(file.type)) {
        let imgType = file.type.substring(6,file.type.length)||'jpg';
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            let result = this.result;
            let img = new Image();
            img.src = result;
            img.onload = function() {
                let data = compress(img,imgType);
                let returnObj = {
                    viewPath: data,
                    filePath: data.replace(/^data:image\/\w+;base64,/, "")
                }
                emit('confirm',returnObj);
            };
        };
    }
}
// 压缩图片
function compress(img,imgType) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let initSize = img.src.length;
    let width = img.width;
    let height = img.height;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, width, height);
    let ndata = canvas.toDataURL("image/"+imgType, 0.5);
    return ndata;
}
</script>

<template>
    <div class="w-full h-full absolute left-0 top-0 z-30 overflow-hidden">
        <input type="file" @change="uploadIMG" accept="image/x-png, image/jpg, image/jpeg" class="w-full h-full opacity-0 cursor-pointer">
    </div>
</template>