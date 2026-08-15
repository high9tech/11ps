const CACHE_NAME = 'hightech-ps-v3';
const ASSETS = [
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
  './src/ps4/userland.mjs',
  './src/ps4/patches/1000.bin',
  './src/ps4/patches/1050.bin',
  './src/ps4/patches/1100.bin',
  './src/ps4/patches/1102.bin',
  './src/ps4/patches/600.bin',
  './src/ps4/patches/620.bin',
  './src/ps4/patches/650.bin',
  './src/ps4/patches/670.bin',
  './src/ps4/patches/700.bin',
  './src/ps4/patches/750.bin',
  './src/ps4/patches/800.bin',
  './src/ps4/patches/850.bin',
  './src/ps4/patches/900.bin',
  './src/ps4/patches/903.bin',
  './src/ps4/patches/950.bin'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS.map((asset) => cache.add(asset).catch(() => {}))
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
      return cachedResponse || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
