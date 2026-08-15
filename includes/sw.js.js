const CACHE_NAME = 'hightech-ps-v1';
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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});