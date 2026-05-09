import { ref, onMounted, onUnmounted } from 'vue'

export function useAudio() {
  const audioInstances = ref({})
  const AUDIO_ASSETS = {
    BUTTON_CLICK: '/audio/click.mp3',
    CLOSE_CLICK: '/audio/close.mp3',
    // ...其他音频资源
  }
  const createAudio = (key, src) => {
    if (!audioInstances.value[key]) {
      const audio = new Audio()
      audio.src = src
      audio.preload = 'auto'
      audioInstances.value[key] = audio
    }
    return audioInstances.value[key]
  }
  
  const playAudio = (key) => {
    const audio = audioInstances.value[key]
    if (audio) {
      audio.currentTime = 0
      audio.play().catch(err => console.warn('Audio play failed:', err))
    }
  }
  
  const stopAudio = (key) => {
    const audio = audioInstances.value[key]
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }
  
  // onUnmounted(() => {
  //   // 清理音频实例
  //   Object.values(audioInstances.value).forEach(audio => {
  //     audio.pause()
  //     audio.src = ''
  //   })
  //   audioInstances.value = {}
  // })

  
  
  return {
    AUDIO_ASSETS,
    createAudio,
    playAudio,
    stopAudio
  }
}
