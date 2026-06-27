# HABEX Real Estate — Sitio web

Sitio de marketing inmobiliario para **HABEX Real Estate**. Presenta desarrollos de inversión
(lotes, departamentos, casas y macro terrenos) en Yucatán y México, con estética **"Luxury Natural"**
(negro + oro sobre tonos naturales) y enfoque en conversión (WhatsApp + formulario).

> Prototipo estático (HTML/CSS/JS, sin build). Pensado para revisar y aprobar el diseño antes de
> trasladarlo a **Wix** como plataforma de publicación final.

## Cómo verlo

No requiere instalación. Abre `index.html` en el navegador, o sirve la carpeta:

```bash
# opción simple
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Estructura

```
habex-re-website/
├── index.html                  # Home (one-page): hero, eventos, ¿qué buscas?, catálogo, nosotros, contacto, colaboración
├── pages/                      # Fichas de detalle por desarrollo (pendientes de construir)
├── assets/
│   ├── css/styles.css          # Sistema de diseño (tokens + componentes)
│   ├── js/main.js              # Scroll reveal, idioma ES/EN, filtros, nav
│   └── img/                    # Imágenes por desarrollo (PNG optimizado)
│       ├── logo/  gran-kanan/  svatia/  paralian/
│       ├── casa-colonia-maya/  departamentos-cdmx/  macroterrenos/
│       ├── events/  brand/
├── brochures/                  # PDFs originales para descarga (pendiente de poblar)
└── docs/
    ├── PROJECT-CONTEXT.md      # Contexto maestro: marca, decisiones, estado por fases
    ├── INVENTORY.md            # Inventario de contenido por desarrollo (Box + Drive)
    ├── TODO-PENDING.md         # Lo que falta y cómo continuar
    └── principios-de-diseno.html  # Guía visual "Luxury Natural"
```

## Estado actual

| Fase | Estado |
|------|--------|
| 0 · Cuestionario | ✅ Completado |
| 1 · Inventario de contenido | ✅ Completado |
| 2 · Imágenes a PNG | 🟡 Parcial (Gran Kanan + Colonia Maya listos; faltan Box) |
| 3 · Principios de diseño | ✅ Completado (`docs/principios-de-diseno.html`) |
| 4 · Prototipo del sitio | 🟡 En curso (home lista; fichas de detalle pendientes) |
| 5 · Dirección visual | ✅ Aplicada en el sistema de diseño |
| 6 · Revisión + Wix | ⬜ Pendiente |

Detalle completo en [`docs/TODO-PENDING.md`](docs/TODO-PENDING.md).

## Marca rápida

- **Paleta:** negro `#0F0E0C`, oro `#C2A24C`, arena/crema, verde profundo `#34433A`, terracota.
- **Tipografía:** Cormorant Garamond (titulares) + Montserrat (cuerpo).
- **WhatsApp principal:** +52 55 1342 3090 · **Brokers:** +52 55 3646 6893
- **Idiomas:** Español / Inglés (toggle en el nav).

## Convenciones

- Sin frameworks ni build. CSS con variables en `:root`. JS vanilla.
- Textos bilingües con atributos `data-es` / `data-en` (ver `main.js`).
- Imágenes: PNG optimizado, ancho máx. 1920 px, organizadas por desarrollo.
