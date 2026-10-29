// Ficha de detalle: muestra el bus indicado en ?modelo=<slug> (si no existe, el primero de la flota).

const slug = new URLSearchParams(location.search).get("modelo");
const index = Math.max(0, BUSES.findIndex((b) => b.slug === slug));
const bus = BUSES[index];
const slots = (name) => document.querySelectorAll(`[data-bus="${name}"]`);
const fill = (name, value) => slots(name).forEach((el) => (el.textContent = value));

// Datos destacados de la cabecera: los tres primeros que existan, en este orden de prioridad
const HIGHLIGHTS = [
  { key: "largo", icon: "fas fa-ruler-horizontal", label: "Largo" },
  { key: "asientos", icon: "fas fa-users", label: "Capacidad" },
  { key: "potencia", icon: "fas fa-tachometer-alt", label: "Potencia" },
  { key: "motor", icon: "fas fa-cog", label: "Motor" },
  { key: "normativa", icon: "fas fa-leaf", label: "Normativa" },
];

document.title = `${bus.nombre} | Busena`;
fill("nombre", bus.nombre);
fill("tipo", bus.specs.tipo || "Autobús");
fill("fabricante", bus.specs.fabricante || "");
fill("descripcion", bus.descripcion);

const image = slots("imagen")[0];
image.src = bus.imagenDetalle;
image.alt = `Bus ${bus.nombre}`;

slots("destacados")[0].innerHTML = HIGHLIGHTS.filter(({ key }) => bus.specs[key])
  .slice(0, 3)
  .map(({ key, icon, label }) => `<li><i class="${icon}" aria-hidden="true"></i><small>${label}</small><strong>${bus.specs[key]}</strong></li>`)
  .join("");

slots("facilidades")[0].innerHTML = bus.facilidades
  .map((key) => `<li><i class="${AMENITIES[key].icon}" aria-hidden="true"></i>${AMENITIES[key].label}</li>`)
  .join("");

// Ficha técnica: solo las especificaciones confirmadas
slots("specs")[0].innerHTML = Object.entries(SPEC_LABELS)
  .filter(([key]) => bus.specs[key])
  .map(([key, label]) => `<div><dt>${label}</dt><dd>${bus.specs[key]}</dd></div>`)
  .join("");

slots("fuente")[0].href = bus.fuente;

slots("otros")[0].innerHTML = BUSES.filter((b) => b !== bus)
  .map(
    (b) => `
      <li>
        <a href="${busUrl(b)}">
          <img src="${b.imagen}" alt="" loading="lazy" />
          <span><strong>${b.nombre}</strong><small>${b.tarjeta.capacidad} · ${b.tarjeta.uso}</small></span>
          <i class="fas fa-chevron-right" aria-hidden="true"></i>
        </a>
      </li>`
  )
  .join("");

// Modelo anterior y siguiente (la lista es circular)
const prev = BUSES[(index - 1 + BUSES.length) % BUSES.length];
const next = BUSES[(index + 1) % BUSES.length];
slots("pager")[0].innerHTML = `
  <a class="bus-pager__link" href="${busUrl(prev)}" rel="prev">
    <i class="fas fa-arrow-left" aria-hidden="true"></i>
    <span><small>Anterior</small>${prev.nombre}</span>
  </a>
  <a class="bus-pager__link bus-pager__link--next" href="${busUrl(next)}" rel="next">
    <span><small>Siguiente</small>${next.nombre}</span>
    <i class="fas fa-arrow-right" aria-hidden="true"></i>
  </a>`;
