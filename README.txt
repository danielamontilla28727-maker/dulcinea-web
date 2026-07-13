DULCINEA · APP CATÁLOGO Y COTIZACIONES

Contenido:
- index.html: página principal
- styles.css: diseño
- app.js: catálogo, cotización, WhatsApp e historial local
- manifest.webmanifest: instalación como PWA
- service-worker.js: funcionamiento básico sin conexión
- assets/logo-dulcinea.png: logo de la empresa

Cómo probar:
1. Descomprima la carpeta.
2. Para una vista rápida, abra index.html.
3. Para instalarla como PWA y activar el modo sin conexión, súbala a un hosting HTTPS
   como Netlify, Vercel, GitHub Pages o su propio servidor.

Importante:
- Esta versión envía solicitudes mediante WhatsApp.
- Los pedidos guardados quedan solo en el dispositivo del cliente.
- Para recibir pedidos en una base de datos y tener panel administrativo se requiere
  conectar un backend (por ejemplo, Supabase, Firebase o un servidor propio).
