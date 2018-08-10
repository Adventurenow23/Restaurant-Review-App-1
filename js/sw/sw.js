var staticCacheName = 'restaurant-cache-1';
//change for update//
let urlToCache = ([
        '/',
        './restaurant.html',
        './css/styles.css',
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
        './restaurant_info.js'
        ]);

self.addEventListener('install',function(event){
    event.waitUntil(
        caches.open('staticCacheName').then(function(cache){
        return cache.addAll(urlToCache);
}) .catch(error => {
  console.log(error);
})
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(_cacheName) {
          return cacheName.startsWith('restaurant-') &&
          cacheName != staticCacheName;
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return cache.delete(cacheName);
        })
      );
    })
  );
});

  self.addEventListener('fetch',function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch (event.request);
        })
    );
});  