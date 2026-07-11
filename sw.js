const VERSION    = 'v1.0.1';  // Tăng version để cập nhật cache
const CACHE_NAME = `app-cache-${VERSION}`;
const PRECACHE_ASSETS = [ 
    '/', 
    '/index.html',
    '/chibo.js',
    '/Mau01.html',
    '/Mau02.html',
    '/admin.html',      // Thêm admin.html
    '/config.js', 
    '/manifest.json', 
    '/pwa-core.js', 
    '/icon-1000.png', 
    '/icon-512.png', 
    '/icon-192.png',
    '/icon.png'
];

// Fallback cho trang lỗi
const FALLBACK_HTML = '/index.html';

self.addEventListener('install', (event) => { 
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_ASSETS))
            .then(() => self.skipWaiting())
    ); 
});

self.addEventListener('activate', (event) => { 
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    ); 
});

self.addEventListener('fetch', (event) => { 
    if (event.request.method !== 'GET') return; 
    
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => { 
                if (networkResponse && networkResponse.ok) { 
                    const cloned = networkResponse.clone(); 
                    caches.open(CACHE_NAME)
                        .then((cache) => cache.put(event.request, cloned)); 
                    return networkResponse; 
                }
                throw new Error('Network response not ok');
            })
            .catch(() => {
                // Nếu không có mạng, tìm trong cache
                return caches.match(event.request)
                    .then((cached) => {
                        if (cached) return cached;
                        
                        // Nếu là navigation, trả về trang chủ
                        if (event.request.mode === 'navigate') {
                            return caches.match(FALLBACK_HTML);
                        }
                        
                        // Fallback cho các request khác
                        return new Response('Không thể kết nối', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    ); 
});