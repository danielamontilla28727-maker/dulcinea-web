const CACHE='dulcinea-profesional-v4';
const CORE=["./", "index.html", "styles.css", "app.js", "manifest.webmanifest", "logo-dulcinea.png", "prensa-historica.webp", "empastes.webp", "tarjetas.webp", "tarjetas-presentacion.webp", "tarjetas-uv.webp", "tarjetas-boda.webp", "tarjetas-15.webp", "tarjetas-baby.webp", "sellos-madera.webp", "sellos-secos.webp", "sellos-automaticos.webp", "plegables.webp", "plotter.webp", "encuadernacion.webp", "restauracion.webp", "recetarios.webp", "volantes.webp", "factureros.webp", "plastificacion.webp", "minutas.webp"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
