# Verificación de la entrega

Comprobaciones realizadas en navegador Chromium integrado, con servidor HTTP local. No es una auditoría exhaustiva de accesibilidad ni una prueba en todos los navegadores o dispositivos físicos.

| Comprobación | Resultado |
| --- | --- |
| Carga de inicio, CSS y JavaScript | Correcta |
| Sintaxis de los tres archivos JavaScript mediante `node --check` | Correcta |
| Identificadores únicos, enlaces a secciones y archivos locales referenciados en HTML | Correctos |
| Catálogo inicial | Cuatro productos visibles |
| Filtro Tartas | Un producto visible |
| Botón «Lo quiero» | Selecciona la tarta correspondiente en el formulario |
| Solicitud con datos ficticios | Genera resumen con nombre, ocasión, fecha, personas, producto e idea |
| Descarga de resumen | Archivo `.txt` descargado correctamente |
| Cambiar número de personas después del resumen | Oculta el resumen anterior |
| Cantidad de personas igual a cero | Rechazada por la validación de rango |
| Fecha pasada y nombre vacío | Indicados como inválidos por la validación nativa |
| WhatsApp sin configurar | Muestra aviso de demo, sin abrir un contacto |
| Abrir foto de galería y cerrar con Escape | Correcto |
| Cuatro imágenes de galería | Cargadas correctamente |
| Menú móvil | Abre y se cierra al elegir una sección |
| Anchos 320, 390, 768 y 1440 px | Sin desbordamiento horizontal del documento |
| Consola durante la prueba | Sin errores ni advertencias capturadas |

Se incluyeron etiquetas de formulario, textos alternativos, enlace para saltar al contenido, foco visible, diálogos nativos y respeto a movimiento reducido. Estos elementos no equivalen a una certificación de accesibilidad.

No se probó WhatsApp con un teléfono real, porque la entrega deliberadamente no incluye ninguno. Tampoco se publicó el sitio. La apertura `file://` no pudo comprobarse automáticamente: el navegador de verificación solo admite HTTP y HTTPS. El proyecto usa scripts clásicos, rutas relativas y archivos locales, sin `fetch`, módulos ni dependencias de servidor; está preparado para abrir `index.html` directamente en un navegador del usuario.

La guía de GitHub Pages se contrastó con documentación oficial. El servidor temporal utilizado para la prueba se detiene al finalizar; puedes iniciarlo de nuevo con el comando del README.
