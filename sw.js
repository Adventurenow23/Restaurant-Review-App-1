var cacheName = 'r1';
//change for update//   
var files1 = [
  './',
  './index.html', 
  './css/styles.css',
  './css/restaurant.css', 
  './data/restaurants.json',
  './img/1.jpg',  
  './img/2.jpg', 
  './img/3.jpg',
  './img/4.jpg', 
  './img/5.jpg', 
  './img/6.jpg', 
  './img/7.jpg', 
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './js/main.js',
  './js/dbhelper.js',
  './js/restaurant_info.js'
];

self.addEventListener('install', function (event) {
  console.log('ServiceWorker Installed');
  event.waitUntil(
    caches.open('r1').then(cache => {
      console.log('ServiceWorker caching filesCache');
      cache.addAll(files1);
    })
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('ServiceWorker: Activated');
  e.waitUntil(
    // Get all the cache keys (cacheName)
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('ServiceWorker:Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('r1').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});