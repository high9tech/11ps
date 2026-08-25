const CACHE_NAME = 'hightech-ps-v2.0';

const ASSETS = [
  './',
  'index.html',
  'background.png',
  'manifest.json',
  'sw.js',
  'README.md',
  'includes/style.css',
  'includes/script.js',
  'includes/applicationCache.js',
  'boobs/exfathax.img',
  'boobs/exfathax_pico.img',
  'boobs/index.html',
  'boobs/int64.js',
  'boobs/kexploit.js',
  'boobs/patch.s',
  'boobs/rop.js',
  'boobs/webkit.js',
  'lapsus/fonts/FONTS.LICENSE',
  'lapsus/fonts/LiberationMono-Regular.ttf',
  'lapsus/fonts/README.txt',
  'lapsus/kpatch/800.c',
  'lapsus/kpatch/850.c',
  'lapsus/kpatch/900.c',
  'lapsus/kpatch/903.c',
  'lapsus/kpatch/950.bin',
  'lapsus/kpatch/950.c',
  'lapsus/kpatch/Makefile',
  'lapsus/kpatch/script.ld',
  'lapsus/kpatch/types.h',
  'lapsus/kpatch/utils.h',
  'lapsus/lapse/ps4/800.mjs',
  'lapsus/lapse/ps4/850.mjs',
  'lapsus/lapse/ps4/852.mjs',
  'lapsus/lapse/ps4/900.mjs',
  'lapsus/lapse/ps4/903.mjs',
  'lapsus/lapse/ps4/950.mjs',
  'lapsus/module/chain.mjs',
  'lapsus/module/int64.mjs',
  'lapsus/module/mem.mjs',
  'lapsus/module/memtools.mjs',
  'lapsus/module/offset.mjs',
  'lapsus/module/rw.mjs',
  'lapsus/module/utils.mjs',
  'lapsus/module/view.mjs',
  'lapsus/rop/ps4/800.mjs',
  'lapsus/rop/ps4/850.mjs',
  'lapsus/rop/ps4/900.mjs',
  'lapsus/rop/ps4/950.mjs',
  'lapsus/about.html',
  'lapsus/alert.mjs',
  'lapsus/config.mjs',
  'lapsus/index.html',
  'lapsus/lapse.mjs',
  'lapsus/payload.bin',
  'lapsus/psfree.mjs',
  'lapsus/send.mjs',
  'psfree/COPYING',
  'psfree/about.html',
  'psfree/alert.mjs',
  'psfree/config.mjs',
  'psfree/exploit.mjs',
  'psfree/index.html',
  'psfree/send.mjs',
  'psfree/kernel/80x.txt',
  'psfree/kernel/exfathax_pico.img',
  'psfree/kpatch/80x.c',
  'psfree/kpatch/80x.d',
  'psfree/kpatch/80x.elf',
  'psfree/kpatch/80x.o',
  'psfree/kpatch/Makefile',
  'psfree/kpatch/script.ld',
  'psfree/kpatch/types.h',
  'psfree/kpatch/utils.h',
  'psfree/module/chain.mjs',
  'psfree/module/constants.mjs',
  'psfree/module/int64.mjs',
  'psfree/module/mem.mjs',
  'psfree/module/memtools.mjs',
  'psfree/module/offset.mjs',
  'psfree/module/rw.mjs',
  'psfree/module/utils.mjs',
  'psfree/rop/800.mjs',
  'psfree/rop/850.mjs',
  'psfree/rop/900.mjs',
  'psfree/rop/950.mjs',
  'src/lapse.js',
  'src/loader.js',
  'src/main.js',
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
  'src/patches/1000.bin',
  'src/patches/1050.bin',
  'src/patches/1100.bin',
  'src/patches/1102.bin',
  'src/patches/600.bin',
  'src/patches/620.bin',
  'src/patches/650.bin',
  'src/patches/670.bin',
  'src/patches/700.bin',
  'src/patches/750.bin',
  'src/patches/800.bin',
  'src/patches/850.bin',
  'src/patches/900.bin',
  'src/patches/903.bin',
  'src/patches/950.bin'
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
