// Rellena cada <ul data-bus-list> con tarjetas de la flota.
// Atributo opcional: data-limit="3" (cuántos buses mostrar).

function busCard(bus) {
  return `
    <li>
      <a class="bus-card__image" href="${busUrl(bus)}"><img src="${bus.imagen}" alt="Bus ${bus.nombre}" loading="lazy" /></a>
      <div class="bus-card__body">
        <h3 class="bus-card__title"><a href="${busUrl(bus)}">${bus.nombre}</a></h3>
        <ul class="bus-features">
          <li><i class="fas fa-industry" aria-hidden="true"></i>${bus.tarjeta.marca}</li>
          <li><i class="fas fa-users" aria-hidden="true"></i>${bus.tarjeta.capacidad}</li>
          <li><i class="fas fa-road" aria-hidden="true"></i>${bus.tarjeta.uso}</li>
        </ul>
      </div>
    </li>`;
}

document.querySelectorAll("[data-bus-list]").forEach((list) => {
  const limit = Number(list.dataset.limit) || BUSES.length;
  list.innerHTML = BUSES.slice(0, limit)
    .map(busCard)
    .join("");
});
