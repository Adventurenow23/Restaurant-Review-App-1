var cacheName = 'rcache-1';
//change for update//
let filesCache = ([
        './',
        './index.html',
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
        './js/restaurant_info.js'
        ]);

self.addEventListener('install',function(event){
  console.log("[ServiceWorker] Installed")
    event.waitUntil(
        caches.open('cacheName').then(function(cache){
          console.log("[ServiceWorker] caching filesCache");
        return cache.addAll(filesCache);
        })
  )
})

self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activated');

  event.waitUntil(

    // Get all the cache keys (cacheName)
  caches.keys().then(function(cacheNames) {
    return Promise.all(cacheNames.map(function(thisCacheName) {

      // If a cached item is saved under a previous cacheName
      if (thisCacheName !== cacheName) {

        // Delete that cached file
        console.log('[ServiceWorker] Removing Cached Files from Cache rcache-1 ', thisCacheName);
        return caches.delete(thisCacheName);
      }
    }));
  })
); // end event.waitUntil
});
     
self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetch', event.request.url);

	// e.respondWidth Responds to the fetch event
	event.respondWith(

		// Check in cache for the request being made
		caches.match(event.request)


			.then(function(response) {

				// If the request is in the cache
				if ( response ) {
					console.log("[ServiceWorker] Found in Cache", event.request.url, response);
					// Return the cached version
					return response;
				}

				// If the request is NOT in the cache, fetch and cache

				var requestClone = event.request.clone();
				return fetch(requestClone)
					.then(function(response) {

						if ( !response ) {
							console.log("[ServiceWorker] No response from fetch ")
							return response;
						}

						var responseClone = response.clone();

						//  Open the cache
						caches.open(cacheName).then(function(cache) {

							// Put the fetched response in the cache
							cache.put(event.request, responseClone);
							console.log('[ServiceWorker] New Data Cached', event.request.url);

							// Return the response
							return response;
			
				        }); // end caches.open

					})
					.catch(function(err) {
						console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
					});


			}) // end caches.match(event.request)
	); // end event.respondWith
});
//© 2018 GitHub, Inc.//     
        

  