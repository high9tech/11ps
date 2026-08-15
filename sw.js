const CACHE_NAME = 'hightech-ps-v5';

const CORE_ASSETS = [
  './',
  './index.html',
  './includes/style.css',
  './includes/script.js',
  './includes/cat.jpg',
  './background.png',
  './cache.manifest',
  './manifest.json',
  './src/main.js',
  './src/loader.js',
  './src/lapse.js',
  './src/misc.js',
  './src/netctrl.js',
  './src/payload.bin',
  './src/utils.mjs',
  './src/worker.js',
  './src/workers.js',
  './src/ps4/constants.js',
  './src/ps4/kernel.js',
  './src/ps4/offsets.mjs',
  './src/ps4/userland.js',
  './src/ps4/userland.mjs'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        CORE_ASSETS.map((asset) => cache.add(asset))
      );
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

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
