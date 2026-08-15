const CACHE_NAME = 'hightech-ps-v15';

const ASSETS = [
  'index.html',
  'background.png',
  'manifest.json',
  'sw.js',
  'includes/style.css',
  'includes/script.js',
  'includes/applicationCache.js',
  'includes/cat.jpg',
  'src/main.js',
  'src/loader.js',
  'src/lapse.js',
  'src/misc.js',
  'src/netctrl.js',
  'src/payload.bin',
  'src/utils.mjs',
  'src/worker.js',
  'src/workers.js',
  'src/ps4/constants.js',
  'src/ps4/kernel.js',
  'src/ps4/offsets.mjs',
  'src/ps4/userland.js',
  'src/ps4/userland.mjs',
  'src/ps4/patches/600.bin',
  'src/ps4/patches/620.bin',
  'src/ps4/patches/650.bin',
  'src/ps4/patches/670.bin',
  'src/ps4/patches/700.bin',
  'src/ps4/patches/750.bin',
  'src/ps4/patches/800.bin',
  'src/ps4/patches/850.bin',
  'src/ps4/patches/900.bin',
  'src/ps4/patches/903.bin',
  'src/ps4/patches/950.bin',
  'src/ps4/patches/1000.bin',
  'src/ps4/patches/1050.bin',
  'src/ps4/patches/1100.bin',
  'src/ps4/patches/1102.bin'
];

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(function(cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(function() {
        return caches.match('index.html');
      });
    })
  );
});
