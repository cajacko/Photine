// Service worker to cache resources for offline use

// Cache the index page on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('airhorner').then(cache => cache.addAll(['/', '/index.html']))
  );
});

// Cache all resources from this origin
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(
        response =>
          response ||
          caches
            .open('airhorner')
            .then(cache => cache.addAll([event.request.url]))
            .then(caches.match(event.request))
            .then(
              response =>
                response ||
                fetch(event.request, {
                  mode: 'no-cors',
                })
            )
            .catch(
              fetch(event.request, {
                mode: 'no-cors',
              })
            )
      )
    );
  }
});
