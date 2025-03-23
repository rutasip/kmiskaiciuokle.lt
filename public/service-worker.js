const CACHE_NAME = 'kmis-cache-v5';
const urlsToCache = ['/', '/index.html', '/icons/icon-192.png', '/icons/icon-512.png'];

// Install Event - Caches specified files and forces immediate activation
self.addEventListener('install', event => {
  self.skipWaiting(); // Forces new SW to take control immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Event - Clears old caches and takes control of all pages
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME) // Delete old caches
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim()) // Forces update for open pages
  );
});

// Fetch Event - Tries network first, falls back to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      return caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, response.clone()); // Update cache with fresh response
        return response;
      });
    }).catch(() => caches.match(event.request)) // Serve cache if offline
  );
});
