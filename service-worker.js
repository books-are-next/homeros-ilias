/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-cfb0bfa';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./ilias_001.html","./ilias_002.html","./ilias_003.html","./ilias_004.html","./ilias_005.html","./ilias_006.html","./ilias_007.html","./ilias_008.html","./ilias_009.html","./ilias_010.html","./ilias_011.html","./ilias_012.html","./ilias_013.html","./ilias_014.html","./ilias_015.html","./ilias_016.html","./ilias_017.html","./ilias_018.html","./ilias_019.html","./ilias_020.html","./ilias_021.html","./ilias_022.html","./ilias_023.html","./ilias_024.html","./ilias_025.html","./ilias_026.html","./ilias_027.html","./ilias_028.html","./ilias_029.html","./ilias_030.html","./ilias_031.html","./ilias_032.html","./ilias_033.html","./ilias_034.html","./ilias_035.html","./ilias_036.html","./ilias_037.html","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
