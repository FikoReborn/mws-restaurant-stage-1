var staticCacheName = 'restaurant-reviews-v10';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/js/api-key.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/data/restaurants.json'
            ]);
        })
    );
});

// self.addEventListener('activate', function(event) {
//     var cacheWhitelist = [cacheName];
  
//     event.waitUntil(
//       caches.keys().then(function(keyList) {
//         return Promise.all(keyList.map(function(key) {
//           if (cacheWhitelist.indexOf(key) === -1) {
//             return caches.delete(key);
//           }
//         }));
//       })
//     );
//   });

self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('restaurant-') &&
                   cacheName != staticCacheName;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });

self.addEventListener('fetch', function(event) {
    var requestUrl = new URL(event.request.url);

    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            event.respondWith(caches.match('/'));
            return;
        }
    }
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.match(event.request).then(function(resp) {
//         return resp || fetch(event.request).then(function(response) {
//           return caches.open(cacheName).then(function(cache) {
//             cache.put(event.request, response.clone());
//             return response;
//           });  
//         });
//       })
//     );
//   });