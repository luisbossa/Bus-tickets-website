# Busena — Sitio de venta de tiquetes de bus

Sitio web estático de **Busena**, empresa de transporte de pasajeros en Costa Rica. Permite consultar destinos, horarios y flota, buscar una ruta, elegir asientos y ver el resumen de compra.

Está hecho con **HTML, CSS y JavaScript sin frameworks ni librerías** (no hay WordPress, jQuery ni proceso de compilación).

## Cómo ejecutarlo

Las rutas de los archivos son absolutas (`/css/main.css`, `/pages/about.html`…), así que el sitio **debe servirse desde la raíz del proyecto** con un servidor local. Abrir `index.html` con doble clic no funciona.

Cualquiera de estas opciones sirve:

- **VS Code + Live Server**: clic derecho en `index.html` → *Open with Live Server*. El proyecto ya trae configurado el puerto `5501` en `.vscode/settings.json`.
- **Node**: `npx serve .` y abrir la URL que indica.
- **Python**: `python -m http.server 8000` y abrir `http://localhost:8000`.

## Estructura

```
index.html                 Página de inicio
pages/
├── about.html             Nosotros
├── services.html          Servicios
├── schedule.html          Horarios (se genera desde los datos de rutas)
├── contact.html           Contacto
├── faq.html               Preguntas frecuentes
├── legal.html             Política de privacidad (#privacidad) y términos (#terminos)
├── buses.html             Listado de la flota (se genera desde los datos de buses)
├── bus.html               Ficha de un bus: bus.html?modelo=<slug>
├── search.html            Búsqueda de rutas y selección de asientos
└── checkout.html          Resumen de compra
css/
└── main.css               Hoja de estilos única del sitio
js/
├── core/layout.js         Cabecera, pie, menú móvil y notificaciones (todas las páginas)
├── data/
│   ├── routes.js          Rutas, horarios y precios + lógica del buscador
│   └── buses.js           Flota de buses y sus fichas técnicas
├── components/
│   ├── bus-cards.js       Tarjetas de buses (inicio y listado)
│   └── counter.js         Contador animado ("32+ años de experiencia")
└── pages/                 Un script por página: home, search, checkout, contact, schedule, bus
images/  fonts/  videos/   Recursos estáticos
app/pay_form/              Formulario de pago (ver más abajo)
```

### Cabecera y pie de página

No están repetidos en cada HTML: cada página tiene `<header class="site-header"></header>` y `<footer class="site-footer"></footer>` vacíos, y `js/core/layout.js` los rellena. **Para cambiar el menú o el pie, edita solo ese archivo** (la lista de enlaces está en la constante `NAV_LINKS`).

Cada página debe cargar `layout.js` antes que cualquier otro script, porque define `notify()`, que usan los demás.

## CSS

Todo el estilo está en `css/main.css`, organizado por secciones con comentarios:

1. **Tokens** (`:root`): colores, tipografías, radios y sombras. Para ajustar la paleta, cambia solo estas variables.
2. **Base, layout y componentes compartidos**: botones, campos de formulario, tarjetas, paneles, acordeón de FAQ, diálogos…
3. **Estilos por página**: inicio, nosotros, servicios, horarios, detalle de bus, contacto, búsqueda, resumen de compra.
4. **Animaciones y responsive** al final del archivo.

Convenciones:

- Las clases describen **qué es** cada elemento, al estilo BEM: `bloque`, `bloque__elemento`, `bloque--variante`. Por ejemplo, `.bus-card__title` o `.button--dark`.
- Los estados usan el prefijo `is-`: `.is-open`, `.is-selected`, `.is-scrolled`, `.is-visible`.
- Puntos de corte: **1024px** (tablet, menú hamburguesa), **870px** (formularios a dos columnas) y **767px** (móvil).
- Se respeta `prefers-reduced-motion`: si el usuario pide reducir movimiento, se desactivan las animaciones.

Tipografías: **Jost** para títulos (archivo local en `fonts/`) y Arial/Helvetica para el texto. Los íconos son de **Font Awesome 5** cargado desde CDN.

## Datos de rutas

Las rutas, horarios, precios y terminales están en el arreglo `ROUTES` de `js/data/routes.js`. Lo usan el buscador del inicio, la página de búsqueda y el resumen de compra.

Para **agregar una ruta**, añade un objeto con la misma forma que los existentes:

```js
{
  origen: "San José",
  destino: "Limón",
  tiempo: "3 horas",
  precios: { normal: 4200, adultoMayor: 3600 }, // en colones, como número
  imagen: "/images/search_bus_1.webp",
  asientos: 57,
  equipaje: 2,
  descripcion: "Terminal 7-10 San José → Limón",
  horarios: ["06:00", "10:00", "14:00"],         // formato 24 h
  tipo: "Directo",
  terminales: {
    origen: ["Terminal 7-10 San José"],
    destino: ["Terminal de Limón"],
  },
}
```

El destino aparecerá automáticamente en los buscadores y en la página de horarios.

## Datos de buses

La flota está en el arreglo `BUSES` de `js/data/buses.js`. Con esos datos se generan:

- el listado (`pages/buses.html`),
- las tarjetas del inicio (los 3 primeros),
- la ficha de detalle (`pages/bus.html?modelo=<slug>`), incluida la lista "Otros Buses".

Los modelos y sus especificaciones son reales: vienen de las fichas publicadas por cada fabricante o de prensa especializada. Cada bus guarda su enlace en `fuente`, que se muestra en la ficha.

| Modelo | Fuente |
| --- | --- |
| Scania Touring HD | [Scania](https://www.scania.com/uk/en/home/products/buses-and-coaches/scania-touring-hd.html) |
| Marcopolo Paradiso G8 1200 | [Diário do Transporte](https://diariodotransporte.com.br/2026/07/28/grupo-guanabara-recebe-70-novos-onibus-marcopolo-g8-em-renovacao-de-frota-rodoviaria/) |
| MAN Lion's Coach C | [MAN](https://www.man.eu/global/en/bus/coaches/the-man-lion_s-coach/technology-and-specifications/man-lion_s-coach-technical-data.html) |
| Yutong C12 | [Yutong](https://wwwpktest.yutong.com/products/C12.shtml) |
| Busscar Urbanuss Pluss | [Tribuna PR](https://www.tribunapr.com.br/noticias/automoveis/onibus-urbano-ecologico-e-confortavel/) |
| MCI J4500 | [MCI](https://www.mcicoach.com/coach/j-series/) |

Las fotos se asociaron al modelo que mejor coincide visualmente. Si la flota real de la empresa es distinta, actualiza los datos.

Para **agregar un bus**, añade un objeto al arreglo; no hace falta crear ningún HTML:

```js
{
  slug: "irizar-i8",                          // se usa en la URL: bus.html?modelo=irizar-i8
  tarjeta: { marca: "Irizar", capacidad: "Hasta 61", uso: "Larga distancia" }, // datos cortos de la tarjeta
  nombre: "Irizar i8",
  imagen: "/images/bus_x.webp",               // foto de la tarjeta
  imagenDetalle: "/images/detail_bus_x.webp", // foto grande de la ficha
  facilidades: ["aire", "wifi", "bano"],      // claves de AMENITIES
  descripcion: "Texto de la ficha…",
  specs: { fabricante: "Irizar (España)", largo: "…", asientos: "…" }, // claves de SPEC_LABELS
  fuente: "https://…",                        // ficha oficial del fabricante
}
```

**No inventes datos**: si una especificación no está confirmada, omítela y esa fila no se muestra.

## Flujo de compra

1. **Buscador** (inicio o `pages/search.html`): el formulario envía `origen`, `destino`, `fecha` y `hora` por URL (GET) a `pages/search.html`. Solo se muestran horarios futuros: si la fecha es hoy, se ocultan los que ya pasaron.
2. **Resultados y asientos** (`js/pages/search.js`):
   - El mapa de asientos se genera desde la matriz `SEAT_LAYOUT`.
   - Se pueden elegir **hasta 5 asientos**, y cada uno pide el tipo de tiquete. El de Adulto Mayor aplica desde los 65 años (Ley 7935): pide la cédula (9 dígitos) y la fecha de nacimiento para validar la edad.
   - En pantallas angostas el bus se dibuja en vertical.
3. **Resumen** (`js/pages/checkout.js`):
   - Pide elegir terminales y aceptar los términos.
   - Calcula subtotal, comisión (14 % sobre la tarifa normal) e IVA de la comisión (13 %, tasa general de Costa Rica).
   - Tiene un límite de 3 minutos: al vencer, vuelve al inicio.

Los datos pasan entre páginas mediante `sessionStorage`:

| Clave              | Contenido                                        | La escribe  | La lee                 |
| ------------------ | ------------------------------------------------ | ----------- | ---------------------- |
| `trip`             | `{ origen, destino, fecha, hora }`               | search.js   | checkout.js            |
| `selectedTickets`  | `[{ asiento, tipo }]`                            | search.js   | checkout.js            |
| `totalAmount`      | Total a pagar (número)                           | checkout.js | formulario de pago     |
| `codigoReferencia` | Código de referencia de 9 dígitos                | checkout.js | formulario de pago     |

## Formulario de pago (`app/pay_form/`)

El formulario de pago es **código heredado** y no forma parte de la reescritura del sitio. Sigue usando jQuery y sus propios archivos: `css/payform.css`, `css/style.css`, `js/jquery-3.3.1.js`, `js/process3D.js` y `js/no_devtools.js`. Por eso esos archivos **no deben borrarse** aunque el resto del sitio no los use.

Antes de usarlo en producción hay que revisarlo:

- Envía los datos de la tarjeta (número, CVC, vencimiento) a un servicio externo.
- Consulta la IP del visitante con servicios de terceros.
- Bloquea las herramientas de desarrollo y el botón "atrás".
- Tiene un token fijo en el código.

Lo recomendable es reemplazarlo por el formulario o la integración oficial alojada por el proveedor de pagos, de modo que los datos de tarjeta no pasen por este sitio.

## Compatibilidad

Pensado para navegadores modernos (Chrome, Edge, Firefox, Safari). Usa `<dialog>`, `<details>`, CSS Grid y variables CSS.

Algunos detalles visuales solo se ven en algunos navegadores; en los demás el sitio funciona igual, sin el efecto:

- **Aparición de tarjetas al hacer scroll** (`animation-timeline`): solo en Chrome y Edge.
- **Barra de scroll personalizada**: en Chrome, Edge y Firefox usa el estándar `scrollbar-color`; Safari usa `::-webkit-scrollbar`.
