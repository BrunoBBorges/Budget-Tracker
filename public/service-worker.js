var CACHE_NAME = "my-site-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

const toCache = [
    "/",
    "/db.js",
    "/index.js",
    "/manifest.json",
    "/styles.cc",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(toCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    if (event.requst.url.includes("/api/")){
        event.respondwith(caches.open(DATA_CACHE_NAME).then(cache => {
            return fetch(event.request)
            .then(response => {
                if(response.status ===200) {
                    cache.put(event.request.url, response.clone());
                }
                return response;
            })
            .catch(err => {
                return cache.match(event.request);
            });
        }));
        return;
    }

    event.respondwith(
        fetch(event.request).catch(function(){
            return caches.match(event.request).then((response) => {
                if (response) {
                    return response;
                } else if (event.request.headers.get("accept").includes("text/html"))
                return caches.match("/");
            });
        })
    );
});