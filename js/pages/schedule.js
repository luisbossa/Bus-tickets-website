// Horarios: una tarjeta por ruta generada desde ROUTES (js/data/routes.js).

// "12:00 PM" se muestra como mediodía
const scheduleHour = (hora) => formatHour12(hora).replace("12:00 PM", "12:00 MD");

document.querySelector("[data-schedule]").innerHTML = ROUTES.map((ruta) => {
  const query = new URLSearchParams({ origen: ruta.origen, destino: ruta.destino });
  return `
    <article class="schedule-card">
      <header class="schedule-card__header">
        <span class="schedule-card__badge">Servicio Regular</span>
        <h2>${ruta.origen} <i class="fas fa-long-arrow-alt-right" aria-hidden="true"></i><span class="visually-hidden">a</span> ${ruta.destino}</h2>
        <ul class="schedule-card__meta">
          <li><i class="far fa-clock" aria-hidden="true"></i>${ruta.tiempo} aprox.</li>
          <li><i class="fas fa-route" aria-hidden="true"></i>${ruta.tipo}</li>
          <li><i class="fas fa-ticket-alt" aria-hidden="true"></i>Desde ₡ ${ruta.precios.normal.toLocaleString("es-CR")}</li>
        </ul>
      </header>
      <div class="schedule-card__body">
        <h3>${ruta.horarios.length} salidas diarias</h3>
        <ul class="schedule-card__times">
          ${ruta.horarios.map((hora) => `<li><time datetime="${hora}">${scheduleHour(hora)}</time></li>`).join("")}
        </ul>
        <a class="button button--upper" href="/pages/search.html?${query}">Reservar</a>
      </div>
    </article>`;
}).join("");
