# Dulce Arte

Sitio estático de una **pastelería ficticia**, creado como demostración de portafolio. HTML, CSS y JavaScript puro: sin paquetes, compilación, cuentas, backend, analítica ni servicios de pago. Imágenes y tipografía funcionan sin conexión. No contiene testimonios, direcciones, correos ni teléfonos de negocios reales.

## Visualizar en tu computadora

**La opción más sencilla:** abre la carpeta `dulce-arte` y haz doble clic en `index.html`. Puedes abrirlo con Edge, Chrome, Firefox o Safari actuales. Conserva las carpetas `css`, `js` y `assets` junto al HTML.

También puedes usar un servidor local. Abre PowerShell dentro de la carpeta `dulce-arte` y ejecuta:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Visita **http://127.0.0.1:8080**. Si tu instalación usa `py`, sustituye `python` por `py`. Si el puerto está ocupado, cambia `8080` por `8081` tanto en el comando como en la dirección. Para detenerlo, pulsa `Ctrl+C`. El servidor se usa solo para previsualización local; no publica el sitio en Internet.

Alternativa: abre la carpeta en VS Code y usa su extensión gratuita Live Server si ya la tienes instalada.

## Archivos y personalización

```text
dulce-arte/
├── index.html         Contenido, secciones y formulario
├── css/styles.css     Colores, tipografía, diseño y adaptación móvil
├── js/config.js       Configuración pública de WhatsApp
├── js/data.js         Catálogo de productos y precios ilustrativos
├── js/app.js          Filtros, galería, menú y cotizador
├── assets/            Fotografías locales y favicon
├── .nojekyll          Publicación estática en GitHub Pages
├── CREDITOS.md        Procedencia y licencia de las fotografías
├── VERIFICACION.md    Comprobaciones y límites de la demo
└── README.md          Esta guía
```

- **Colores:** cambia las variables al inicio de `css/styles.css`, especialmente `--paper`, `--ink` y `--rose`.
- **Textos y secciones:** modifica `index.html`; cada sección tiene un identificador descriptivo (`catalogo`, `personalizados`, `galeria`, `cotizar`).
- **Productos:** edita `js/data.js`. Cada producto necesita un `id` único, nombre, categoría, descripción, precio, porciones, ruta de imagen y texto alternativo. Las categorías actuales son `pasteles`, `tartas` y `cupcakes`. Para crear otra categoría, añade también su botón en el HTML.
- **Fotografías:** sustituye los archivos en `assets` por imágenes propias o autorizadas y actualiza sus textos alternativos. Las fotografías actuales son de referencia; no acreditan trabajos de Dulce Arte.
- **Logo:** el nombre se compone con texto y un símbolo; el favicon es un SVG editable.
- **Movimiento:** se respeta automáticamente la preferencia de movimiento reducido del sistema.

## Configurar WhatsApp

Abre `js/config.js`. `whatsappNumber` está vacío a propósito. En este estado todos los botones de WhatsApp abren un aviso, sin contactar a nadie.

Para activarlo, introduce únicamente un número propio o autorizado: código internacional de país seguido del número, sin `+`, espacios, paréntesis ni guiones. No uses números inventados de prueba: podrían pertenecer a otra persona. El valor se valida con entre 8 y 15 dígitos; la validación de formato no comprueba que el número tenga una cuenta de WhatsApp.

`whatsappMessage` define el mensaje del botón flotante. Desde el resumen del formulario se utiliza el texto de la solicitud. El enlace abre `wa.me` con un mensaje preparado: **no pulsa Enviar**. Al abrirlo, número y texto se comparten con WhatsApp en la URL. El teléfono configurado es público en el código del sitio.

## Qué hace el formulario

1. Valida nombre, ocasión, fecha no pasada, entre 4 y 200 personas y aceptación del modo demo.
2. Genera un resumen local que puedes descargar en formato `.txt`.
3. Si eliges un producto, muestra su precio ilustrativo y porciones de referencia. **No calcula un precio final** según asistentes o diseño.
4. Al modificar un campo, oculta el resumen anterior para evitar compartir datos desactualizados.
5. Opcionalmente abre WhatsApp si lo configuraste. No guarda datos en una base de datos, cookies ni almacenamiento local. La descarga sí crea un archivo en tu equipo. El navegador puede conservar campos según su configuración.

No hay disponibilidad, pagos, pedidos, email automático ni recepción real de solicitudes. Sin JavaScript, el formulario se oculta. Mantén los avisos de negocio ficticio mientras uses esta demo en tu portafolio.

## Publicar gratis con GitHub Pages

GitHub Pages permite publicar sitios estáticos desde repositorios públicos con GitHub Free. No necesitas comprar un dominio. La web y su código serán públicos. Instrucciones oficiales consultadas el 27 de octubre de 2026:

- [Crear un sitio de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configurar la fuente de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

Pasos:

1. Inicia sesión en GitHub y crea un repositorio **público**, por ejemplo `dulce-arte-demo`.
2. Sube **el contenido** de `dulce-arte`, manteniendo las carpetas. `index.html` debe quedar en la raíz del repositorio, no dentro de otra carpeta `dulce-arte`. No subas el ZIP sin descomprimir.
3. Guarda los archivos en la rama `main`.
4. En el repositorio, abre **Settings → Pages**.
5. En **Build and deployment → Source**, elige **Deploy from a branch**.
6. Selecciona **main** y **/(root)**; pulsa **Save**.
7. Cuando termine la publicación, GitHub mostrará la dirección, con forma `https://TU-USUARIO.github.io/dulce-arte-demo/`. Los marcadores de este ejemplo se sustituyen por tu usuario y repositorio.
8. Abre esa dirección y verifica el catálogo, la galería y el formulario. Las rutas relativas ya están preparadas para GitHub Pages.

Para actualizarla, sube los archivos modificados a la misma rama. No hay comandos de instalación ni de compilación. GitHub Pages sirve los archivos; no añade un servidor para recibir formularios. Este proyecto se entrega localmente: **no se ha publicado ni se ha creado una cuenta a tu nombre**.

## Revisión rápida después de editar

- Abre `index.html` y comprueba que carguen las fotografías.
- Prueba los cuatro filtros y el botón «Lo quiero» de un producto.
- Abre una fotografía y ciérrala con Escape.
- Comprueba campos vacíos, fecha pasada y número de personas fuera de rango.
- Genera un resumen con información ficticia y descárgalo.
- Deja WhatsApp vacío para mantener la demo sin contactos reales.
- Revisa el menú y el formulario en modo móvil del navegador, incluido un ancho de 320 px.
- Revisa textos, contraste y navegación con teclado si cambias los estilos.

Para revisar sintaxis, si tienes Node.js:

```powershell
node --check js/config.js
node --check js/data.js
node --check js/app.js
```

Node.js y Python son opcionales; no se necesitan para abrir el HTML directamente.
