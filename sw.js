// Offline support. The deploy script rewrites CACHE on every publish so phones pick up the new version.
const CACHE = "olimpo-20261018174645";
const SHELL = ["./", "index.html", "style.css", "app.js", "config.js", "manifest.webmanifest",
  "vendor/supabase.min.js", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"];

// A new version is always downloaded from the network (cache: "reload"), never from the browser's HTTP cache:
// GitHub Pages lets files be cached for ~10 minutes, which could mix old and new files.
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const store = (req, res) => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; };

self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.hostname.endsWith("supabase.co")) return;
  if (url.origin === location.origin) {
    // App files: answer instantly from the saved copy (no waiting on a weak gym signal)
    // and refresh it in the background. A new deploy also changes CACHE, which reinstalls everything.
    const fresh = req.mode === "navigate" ? new Request(req.url, { cache: "no-cache", credentials: "same-origin" }) : new Request(req, { cache: "no-cache" });
    const update = fetch(fresh).then(r => store(req, r)).catch(() => null);
    e.respondWith(caches.match(req, { ignoreSearch: true })
      .then(hit => hit || update.then(r => r || caches.match("index.html"))));
    e.waitUntil(update);
  } else if (url.hostname.startsWith("fonts.")) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => store(req, res))));
  }
});
