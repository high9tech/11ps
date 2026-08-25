const CACHE_NAME = 'hightech-v5';

// تثبيت الخدمة
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// تنشيط وتطهير النسخ القديمة
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

// التخزين التلقائي والديناميكي عند فتح الملفات لأول مرة
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // إرجاع الملف فوراً إن كان مخزناً مسبقاً
      if (cachedResponse) {
        return cachedResponse;
      }

      // جلبه من الشبكة وتخزينه أوفلاين للمرات القادمة
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // في حالة الأوفلاين التام وعدم وجود الملف
        return caches.match('./index.html') || caches.match('index.html');
      });
    })
  );
});
