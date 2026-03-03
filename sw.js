const CACHE_NAME = "malakor-world-v1";
const OFFLINE_URL = "offline.html";

const ASSETS = [
  "/",
  "index.html",
  "styles.css",
  "script.js",
  OFFLINE_URL,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return undefined;
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // ยกเว้นคำขอที่ไปยัง API ภายนอก (เช่น npoint) ไม่ต้องผ่าน Service Worker
  if (event.request.url.includes('api.npoint.io') || event.request.url.includes('discord.com')) {
    return; // ปล่อยให้เบราว์เซอร์จัดการโดยตรง
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // เฉพาะ GET requests เท่านั้นที่สามารถเก็บใน Cache ได้
        if (event.request.method === 'GET' && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, copy);
          });
        }
        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
        
        // ถ้าไม่มีใน Cache และ Fetch ล้มเหลว ให้คืนค่า offline.html หรือ Response เปล่า
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
        return new Response('Network error occurred', { status: 408, headers: { 'Content-Type': 'text/plain' } });
      })
  );
});
