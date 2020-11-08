var CACHE_NAME = "my-site-cache-v1";

var urlsToCache = [
  "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js",
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js",
];

// Cache-ing the files
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("opening cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
