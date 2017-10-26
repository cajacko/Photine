self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('airhorner').then(cache => cache.addAll(['/', '/index.html']))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('.js')) {
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
