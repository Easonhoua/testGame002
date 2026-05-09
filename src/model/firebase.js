import { initializeApp } from '@firebase/app'
import { getMessaging, getToken, onMessage } from '@firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyDkkn9G9nPdXuQ72YnhcroBGgSxVFGX8z8",
  authDomain: "pwa258-285a3.firebaseapp.com",
  projectId: "pwa258-285a3",
  messagingSenderId: "1097252122461",
  appId: "1:1097252122461:web:8ac985e7b28417892d82b4",
  // storageBucket: "pwa258-285a3.firebasestorage.app",
  // measurementId: "G-92L4725D4V"
}

let messaging = null

try {
      console.log('Firebase init start')
      const app = initializeApp(firebaseConfig)
      messaging = getMessaging(app)
      console.log('Firebase init success')
} catch (error) {
  console.error('Firebase fail:', error)
}

// 添加环境检查函数
function checkPushSupport() {
  const checks = {
    isHttps: window.location.protocol === 'https:',
    hasServiceWorker: 'serviceWorker' in navigator,
    hasPushManager: 'PushManager' in window,
    hasFirebase: !!messaging,
    swRegistration: null,
    platform: {
      isAndroid: /android/i.test(navigator.userAgent),
      isChrome: /chrome/i.test(navigator.userAgent),
      userAgent: navigator.userAgent
    }
  }

  // 检查 Service Worker 注册状态
  if (checks.hasServiceWorker) {
    navigator.serviceWorker.getRegistration()
      .then(registration => {
        checks.swRegistration = registration ? true : false
        console.log('Service Worker 注册状态:', checks.swRegistration)
      })
  }

  console.log('Push 支持检查结果:', checks)
  return checks
}

export async function initializePushNotifications() {
  try {
    // 1. 环境检查 localhost 不需要https
    const checks = checkPushSupport()
    if (!checks.isHttps && window.location.hostname !== 'localhost') { 
      throw new Error('需要 HTTPS 环境，除非是在 localhost')
    }
    // 2. 检查 Firebase 初始化
    if (!messaging) {
      throw new Error('Firebase Messaging 未初始化')
    }

    // 3. 确保 Service Worker 已注册
    const swRegistration = await navigator.serviceWorker.getRegistration('/service-worker.js')
    // const swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
    if (!swRegistration) {
      throw new Error('Firebase Service Worker 未注册')
    }
    // 检查通知API是否可用
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications')
      return false
    }

    // 请求权限
    let permission = Notification.permission
    console.log('permission before request:', permission)
    if (permission === 'default') {
      permission = await Notification.requestPermission()
    }

    // 检查权限
    if (permission !== 'granted') {
      console.warn('Notification permission not granted')
      return false
    }

    try {
      if (permission === 'granted') {
        console.log('permission granted, requesting FCM token...')
        const token = await getToken(messaging, {
          vapidKey: 'BLwW6fR09WRiYTix_LAPLYrEnjdaKHywjWwIyWzfX89XIL5wLg4BJryRPB0rH1e6_j4gbRUOogtvsCKZzVfae7s',
          serviceWorkerRegistration: swRegistration
        })
        console.log('FCM Token:', token)
        return token
      }
    } catch (tokenError) {
      console.error('获取 Token 详细错误:', {
        name: tokenError.name,
        message: tokenError.message,
        code: tokenError.code,
        stack: tokenError.stack
      })
    }
  } catch (tokenError) {
    console.warn('FCM permission error:', tokenError)
  }
}

export function onForegroundMessage(callback) {
  if (!messaging) {
    console.warn('Firebase Messaging 未初始化，无法监听消息')
    return () => {}  // 返回空函数避免调用出错
  }
  return onMessage(messaging, (payload) => {
    callback(payload)
  })
}

export async function showNotification(title, options = {}) {
  try {
    // 检查通知API是否可用
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications')
      return false
    }

    // 请求权限
    let permission = Notification.permission
    if (permission === 'default') {
      permission = await Notification.requestPermission()
    }

    // 检查权限
    if (permission !== 'granted') {
      console.warn('Notification permission not granted')
      return false
    }

    // 使用 ServiceWorkerRegistration.showNotification
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready
      await registration.showNotification(title, {
        body: options.body || '',
        icon: options.icon || '/icons/appicon.png',
        badge: options.badge || '/icons/appicon.png',
        // tag: options.tag,
        data: options.data || {},
        // requireInteraction: true,
        // vibrate: [200, 100, 200],
        // actions: [
        //   {
        //     action: 'open',
        //     title: 'Open'
        //   }
        // ]
      })

      // 添加点击事件监听
      navigator.serviceWorker.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'notification-click') {
          if (options.onClick) options.onClick()
        }
      })
      console.warn('showNotification called with title:', title, 'and options:', options)
      return true
    }

    console.warn('Service Worker not available')
    return false
  } catch (error) {
    console.error('Error showing notification:', error)
    return false
  }
}