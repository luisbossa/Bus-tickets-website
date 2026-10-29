// Listado de la flota: cifras, filtros por uso y tarjetas generadas desde BUSES.

const list = document.querySelector("[data-fleet-list]");
const filters = document.querySelector("[data-fleet-filters]");

// ---------- Cifras ----------

const maxSeats = Math.max(...BUSES.map((bus) => Number(bus.specs.asientos.match(/\d+/g).pop())));
const stats = {
  modelos: BUSES.length,
  fabricantes: new Set(BUSES.map((bus) => bus.tarjeta.marca)).size,
  capacidad: maxSeats,
};
document.querySelectorAll("[data-fleet-stat]").forEach((el) => (el.textContent = stats[el.dataset.fleetStat]));

// ---------- Tarjetas ----------

function fleetCard(bus) {
  const amenities = bus.facilidades
    .map((key) => `<li title="${AMENITIES[key].label}"><i class="${AMENITIES[key].icon}" aria-hidden="true"></i><span class="visually-hidden">${AMENITIES[key].label}</span></li>`)
    .join("");

  return `
    <li class="fleet-card">
      <a class="fleet-card__link" href="${busUrl(bus)}">
        <div class="fleet-card__stage">
          <span class="fleet-card__badge">${bus.tarjeta.uso}</span>
          <img src="${bus.imagen}" alt="" loading="lazy" />
        </div>
        <div class="fleet-card__body">
          <p class="fleet-card__maker">${bus.specs.fabricante}</p>
          <h2 class="fleet-card__title">${bus.nombre}</h2>
          <dl class="fleet-card__specs">
            ${bus.specs.largo ? `<div><dt>Largo</dt><dd>${bus.specs.largo}</dd></div>` : ""}
            <div><dt>Capacidad</dt><dd>${bus.tarjeta.capacidad}</dd></div>
          </dl>
          <ul class="fleet-card__amenities" aria-label="Facilidades a bordo">${amenities}</ul>
          <span class="fleet-card__cta">Ver ficha técnica <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
        </div>
      </a>
    </li>`;
}

// ---------- Filtros ----------

const uses = ["Todos", ...new Set(BUSES.map((bus) => bus.tarjeta.uso))];
const countFor = (use) => (use === "Todos" ? BUSES.length : BUSES.filter((bus) => bus.tarjeta.uso === use).length);

filters.innerHTML = uses
  .map((use) => `<button class="filter-chip" type="button" data-use="${use}" aria-pressed="false">${use} <span>${countFor(use)}</span></button>`)
  .join("");

function render(use) {
  const visible = use === "Todos" ? BUSES : BUSES.filter((bus) => bus.tarjeta.uso === use);
  list.innerHTML = visible.map(fleetCard).join("");
  filters.querySelectorAll("[data-use]").forEach((chip) => chip.setAttribute("aria-pressed", String(chip.dataset.use === use)));
}

filters.addEventListener("click", (event) => {
  const chip = event.target.closest("[data-use]");
  if (chip) render(chip.dataset.use);
});

render("Todos");
