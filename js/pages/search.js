// Búsqueda de rutas, selección de asientos y tipo de tiquete.

const MAX_SEATS = 5;

// Distribución del piso: cada fila es una hilera de ventana a ventana; el frente del bus queda a la derecha.
// null = pasillo/espacio vacío, "*" = asiento especial, "SR" = silla de ruedas.
const SEAT_LAYOUT = [
  ["57", "52", "48", "46", "42", "38", "34", "32", "28", "24", "20", "16", "12", "8", "4*"],
  ["56", "51", "47", "45", "41", "37", "33", "31", "27", "23", "19", "15", "11", "7", "3*"],
  ["55", null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  ["54", "50", null, "44", "40", "36", null, "30", "26", "22", "17", "14", "10", "6", "2*"],
  ["53", "49", null, "43", "39", "35", "SR", "29", "25", "21", "18", "13", "9", "5", "1*"],
];

setupBookingForm(document.querySelector(".booking-form"));

// ---------- Resultados ----------

const results = document.querySelector(".results");
const params = new URLSearchParams(location.search);
const trip = {
  origen: params.get("origen"),
  destino: params.get("destino"),
  fecha: params.get("fecha"),
  hora: params.get("hora"),
};
const route = findRoute(trip.origen, trip.destino);

// El formulario conserva la búsqueda actual para poder ajustarla
const searchForm = document.querySelector(".booking-form");
for (const name of ["origen", "destino", "fecha"]) {
  if (trip[name]) searchForm.elements[name].value = trip[name];
}
searchForm.elements.fecha.dispatchEvent(new Event("change"));
if (trip.hora) searchForm.elements.hora.value = trip.hora;

function emptyState(icon, title, text) {
  return `
    <div class="empty-state">
      <span class="empty-state__icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
      <h3>${title}</h3>
      <p>${text}</p>
    </div>`;
}

if (!trip.origen || !trip.destino || !trip.fecha || !trip.hora) {
  results.innerHTML = emptyState("fa-route", "Seleccione su ruta de viaje", "Elige origen, destino, fecha y horario para ver las rutas disponibles.");
} else if (!route || !route.horarios.includes(trip.hora)) {
  results.innerHTML = emptyState("fa-bus", "No se encontraron rutas", "No hay rutas disponibles para esta combinación y horario. Prueba con otra fecha u horario.");
} else {
  sessionStorage.setItem("trip", JSON.stringify(trip));

  // Con una ruta encontrada, el siguiente paso es elegir asientos
  document.querySelector('[data-step="ruta"]').className = "is-done";
  document.querySelector('[data-step="asientos"]').className = "is-current";

  results.innerHTML = `
    <article class="route-result">
      <div class="route-result__image">
        <img src="${route.imagen}" alt="Bus de la ruta ${route.origen} - ${route.destino}" />
      </div>
      <div class="route-result__main">
        <h2>
          ${route.origen} - ${route.destino}
          <button class="chip-button" type="button" aria-expanded="false" data-toggle-info>Info</button>
        </h2>
        <ul class="route-result__facts">
          <li><i class="fas fa-users" aria-hidden="true"></i><strong>${route.asientos} asientos</strong></li>
          <li><i class="fas fa-suitcase" aria-hidden="true"></i><strong>${route.equipaje} equipajes</strong></li>
          <li><i class="far fa-clock" aria-hidden="true"></i><p>Duración aprox.: <strong>${route.tiempo}</strong></p></li>
        </ul>
      </div>
      <div class="route-result__booking">
        <p class="route-result__price">₡ ${formatColones(route.precios.normal)}</p>
        <p class="route-result__per-person">por persona</p>
        <p>Tipo horario: <strong>${route.tipo.toUpperCase()}</strong></p>
        <p>Hora de salida: <strong>${formatHour12(trip.hora)}</strong></p>
        <button class="button button--upper" type="button" data-open-seats>
          <i class="fas fa-couch" aria-hidden="true"></i> Elegir asientos
        </button>
      </div>
      <p class="route-result__info" hidden><strong>Terminales: </strong>${route.descripcion}</p>
    </article>`;

  const info = results.querySelector(".route-result__info");
  const infoToggle = results.querySelector("[data-toggle-info]");
  infoToggle.addEventListener("click", () => {
    info.hidden = !info.hidden;
    infoToggle.setAttribute("aria-expanded", String(!info.hidden));
  });

  results.querySelector("[data-open-seats]").addEventListener("click", () => seatDialog.showModal());
}

// ---------- Mapa de asientos ----------

const seatDialog = document.getElementById("seat-dialog");
const seatGrid = seatDialog.querySelector(".seat-map__grid");

// Cada asiento guarda su fila/columna en variables CSS: así el CSS puede girar el bus en pantallas angostas
seatGrid.innerHTML = SEAT_LAYOUT.flatMap((row, r) =>
  row.map((cell, c) => {
    if (!cell) return "";
    const number = cell.replace("*", "");
    const modifier = cell === "SR" ? " seat--wheelchair" : cell.endsWith("*") ? " seat--special" : "";
    return `<button class="seat${modifier}" type="button" data-seat="${number}" aria-pressed="false" aria-label="Asiento ${number}" style="--row: ${r + 1}; --col: ${c + 1}">${number}</button>`;
  })
).join("");

const seats = [...seatGrid.querySelectorAll("[data-seat]")];
const selectedSeats = () => seats.filter((seat) => seat.classList.contains("is-selected"));
const seatSummary = seatDialog.querySelector("[data-seat-summary]");
const seatTotal = seatDialog.querySelector("[data-seat-total]");
const acceptSeatsButton = seatDialog.querySelector("[data-accept-seats]");
const TICKET_LABELS = { normal: "Normal", adulto: "Adulto Mayor" };

// Refresca el bloqueo al llegar al máximo y el resumen en vivo (asientos elegidos y subtotal)
function updateSelection() {
  const selected = selectedSeats();
  const full = selected.length >= MAX_SEATS;

  seats.forEach((seat) => {
    const isSelected = seat.classList.contains("is-selected");
    seat.setAttribute("aria-pressed", String(isSelected));
    if (!isSelected) seat.disabled = full;
  });

  seatSummary.innerHTML = selected.length
    ? `<span class="seat-summary__count">${selected.length}/${MAX_SEATS}</span>` +
      selected
        .map((seat) => `<span class="seat-chip seat-chip--${seat.dataset.ticketType}">#${seat.dataset.seat} · ${TICKET_LABELS[seat.dataset.ticketType]}</span>`)
        .join("")
    : `<span class="seat-summary__empty">Aún no has elegido asientos</span>`;

  const subtotal = route
    ? selected.reduce((sum, seat) => sum + (seat.dataset.ticketType === "adulto" ? route.precios.adultoMayor : route.precios.normal), 0)
    : 0;
  seatTotal.textContent = `₡ ${formatColones(subtotal)}`;
  acceptSeatsButton.disabled = !selected.length;
}

let pendingSeat = null;

seatGrid.addEventListener("click", (event) => {
  const seat = event.target.closest("[data-seat]");
  if (!seat) return;

  if (seat.classList.contains("is-selected")) {
    seat.classList.remove("is-selected");
    delete seat.dataset.ticketType;
    updateSelection();
    return;
  }

  pendingSeat = seat;
  openTicketTypeDialog();
});

seatDialog.querySelector("[data-close]").addEventListener("click", () => seatDialog.close());

seatDialog.querySelector("[data-clear-seats]").addEventListener("click", () => {
  seats.forEach((seat) => {
    seat.classList.remove("is-selected");
    delete seat.dataset.ticketType;
  });
  updateSelection();
});

seatDialog.querySelector("[data-accept-seats]").addEventListener("click", () => {
  const tickets = selectedSeats().map((seat) => ({ asiento: seat.dataset.seat, tipo: seat.dataset.ticketType }));
  if (!tickets.length) {
    notify("Por favor selecciona al menos un asiento.");
    return;
  }
  sessionStorage.setItem("selectedTickets", JSON.stringify(tickets));
  location.href = "/pages/checkout.html";
});

// ---------- Tipo de tiquete ----------

const typeDialog = document.getElementById("ticket-type-dialog");
const typeForm = typeDialog.querySelector("form");
const cedulaField = typeDialog.querySelector("[data-cedula]");
const cedulaInput = typeForm.elements.cedula;
const cedulaError = cedulaField.querySelector(".field__error");

// Tiquete de adulto mayor: en Costa Rica aplica desde los 65 años (Ley 7935).
// La cédula física tiene 9 dígitos y el primero es la provincia (1 a 9); no contiene la fecha
// de nacimiento, por eso la edad se valida con un campo aparte.
const SENIOR_AGE = 65;

function ageOn(birthISO, today = new Date()) {
  const [y, m, d] = birthISO.split("-").map(Number);
  let age = today.getFullYear() - y;
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age--;
  return age;
}

function validateSenior(cedula, nacimiento) {
  if (!/^\d{9}$/.test(cedula)) return "La cédula debe tener 9 dígitos, sin guiones ni espacios";
  if (cedula[0] === "0") return "La cédula no es válida: el primer dígito (provincia) va del 1 al 9";
  if (!nacimiento) return "Indica la fecha de nacimiento";
  if (ageOn(nacimiento) < SENIOR_AGE) return `El tiquete de adulto mayor aplica a partir de los ${SENIOR_AGE} años`;
  return "";
}

function openTicketTypeDialog() {
  typeForm.reset();
  cedulaField.hidden = true;
  cedulaError.textContent = "";
  typeDialog.showModal();
}

typeForm.addEventListener("change", (event) => {
  if (event.target.name !== "tipo") return;
  cedulaField.hidden = typeForm.elements.tipo.value !== "adulto";
  cedulaError.textContent = "";
});

const birthInput = typeForm.elements.nacimiento;
birthInput.max = todayISO();

// Al corregir un campo se borra el mensaje; la validación completa se hace al pulsar "Agregar"
[cedulaInput, birthInput].forEach((input) => input.addEventListener("input", () => (cedulaError.textContent = "")));

typeForm.addEventListener("submit", (event) => {
  const tipo = typeForm.elements.tipo.value;

  if (tipo === "adulto") {
    const error = validateSenior(cedulaInput.value.trim(), birthInput.value);
    cedulaError.textContent = error;
    if (error) {
      event.preventDefault();
      return;
    }
  }

  pendingSeat.classList.add("is-selected");
  pendingSeat.dataset.ticketType = tipo;
  updateSelection();

  if (selectedSeats().length === MAX_SEATS) {
    notify(`Solo puedes seleccionar hasta ${MAX_SEATS} asientos.`);
  }
});

updateSelection();
