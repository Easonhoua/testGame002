// 处理缓存和离线功能
const cacheName = 'cache-v6';
const cacheFiles = [ '/index.html' ];
const MESSAGE_COMMUNICATION = 'web-push-message'

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      'index.html'
      //return cache.addAll(cacheFiles);
    }),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (cacheName !== key) {
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => {
        console.log("cache deleted");
      })
  );
});

self.addEventListener("fetch", event => {
  let url;
  try {
    url = new URL(event.request.url);
  } catch (error) {
    return;
  }
  if (event.request.method !== 'GET') return;
  // if (url.pathname.includes('/api/')) {
  //   return;
  // }
  if (url.pathname !== '/index.html') return; // 只处理首页
  
  event.respondWith(
    caches
      .open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      }),
  );
});

self.addEventListener('push', function(event) {

  if (event.data) {
    var pushData = event.data.json();
    var title = pushData.notification.title;
    var body = pushData.notification.body;
    var url = pushData.data.url;
    var icon = pushData.data.icon||'/icons/appicon.png';

    if (self.registration) {
      var notificationPromise = self.registration.showNotification(title, {
        body: body,
        icon: icon, 
        data: { url: url } 
      });
      event.waitUntil(notificationPromise);
    }
    
  } 

});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(clientList) {
      if(clientList.length > 0) {
        return clientList[0].focus()
      }
        
      return clients.openWindow('/')
    })
  );

});

//firebase-messaging-sw
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyDkkn9G9nPdXuQ72YnhcroBGgSxVFGX8z8",
  projectId: "pwa258-285a3",
  messagingSenderId: "1097252122461",
  appId: "1:1097252122461:web:8ac985e7b28417892d82b4"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = "firebase "+payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.data.icon || '/icons/appicon.png',
    badge: payload.data.icon || '/icons/appicon.png',
    data: { url: payload.data.url || '' } // 添加默认 URL
    // data: payload.data
  }

  // self.registration.showNotification(notificationTitle, notificationOptions)
})