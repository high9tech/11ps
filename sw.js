const CACHE_NAME = 'hightech-ps-offline-v10';

const ASSETS = [
  './',
  './index.html',
  './includes/style.css',
  './includes/script.js',
  './includes/cat.jpg',
  './background.png',
  './cache.manifest',
  './manifest.json',
  './src/main.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// التعامل مع طلبات التصفح أوفلاين
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // عند انقطاع الإنترنت تماماً، يتم إرجاع الصفحة الرئيسية المخزنة
        return caches.match('./index.html') || caches.match('./');
      });
    })
  );
});
