// Service Worker para NachoWeb3 Blog
// Versión: 1.0.0

const CACHE_NAME = 'nachoweb3-v1';
const urlsToCache = [
    '/',
    '/manifest.json',
    '/assets/css/style.css',
    '/assets/css/enhancements.css',
    '/assets/js/enhancements.js',
    '/assets/js/search.js'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' })));
            })
            .catch(error => {
                console.error('Error al cachear:', error);
            })
    );
    self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Estrategia de cache: Stale-While-Revalidate
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si está en cache, retornarlo
                if (response) {
                    // Actualizar en background
                    fetch(event.request).then(fetchResponse => {
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, fetchResponse);
                        });
                    });
                    return response;
                }

                // Si no está en cache, fetch y cachear
                return fetch(event.request).then(response => {
                    // No cachear respuestas no exitosas
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clonar la respuesta
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                });
            })
            .catch(() => {
                // Offline fallback
                if (event.request.destination === 'document') {
                    return caches.match('/404.html');
                }
            })
    );
});

// Mensajes desde el cliente
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Background sync (opcional)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-posts') {
        event.waitUntil(syncPosts());
    }
});

async function syncPosts() {
    // Implementar sincronización de posts
    console.log('Sincronizando posts...');
}
