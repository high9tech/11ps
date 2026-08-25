const CACHE_NAME = 'hightech-v1';

// الملفات الأساسية التي سيتم حفظها فوراً
const FILES_TO_CACHE = [
  './',
  'index.html',
  'background.png',
  'manifest.json',
  'includes/style.css',
  'includes/script.js'
];

// حفظ الملفات عند أول فتح للموقع
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

// تفعيل الخدمة وتنظيف الكاش القديم
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// قراءة الملفات من الذاكرة عند فصل النت
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => caches.match('index.html'));
    })
  );
});
