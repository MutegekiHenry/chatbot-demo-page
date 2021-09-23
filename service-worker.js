// jshint esversion:6

// Installing service workker
const CACHE_NAME  = 'Netdan-bot';
let resourcesToCache = ["./", "./images/1200px-Internews_logo.svg.png", "./images/1280px-OONI-HorizontalColor.svg.png", "./images/NetDAN_logo.png", "./images/Unwanted Witness Logo-01.png", "./images/wanU-6Sy_400x400.jpeg"];

self.addEventListener("install", e=>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache =>{
            return cache.addAll(resourcesToCache);
        })
    );
});

// Cache and return requests
self.addEventListener("fetch", e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response || fetch(e.request);
        })
    );
});

// Update a service worker
const cacheWhitelist = ['Netdan-bot'];
self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });