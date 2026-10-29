// Resumen de compra: terminales, totales y temporizador.

const COMMISSION_RATE = 0.14; // sobre la tarifa normal
const VAT_RATE = 0.13; // IVA de Costa Rica, sobre la comisión
const TIME_LIMIT_SECONDS = 180;

const trip = JSON.parse(sessionStorage.getItem("trip") || "null");
const tickets = JSON.parse(sessionStorage.getItem("selectedTickets") || "[]");
const route = trip && findRoute(trip.origen, trip.destino);

const summary = Object.fromEntries(
  [...document.querySelectorAll("[data-summary]")].map((el) => [el.dataset.summary, el])
);

// ---------- Temporizador ----------

const timer = document.querySelector("[data-timer]");
const timerBar = document.querySelector("[data-timer-bar]");
let remaining = TIME_LIMIT_SECONDS;

const countdown = setInterval(() => {
  remaining--;
  timer.textContent = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  timerBar.style.width = `${(remaining / TIME_LIMIT_SECONDS) * 100}%`;
  // Último minuto: el aviso cambia de color
  timer.closest(".countdown").classList.toggle("is-urgent", remaining <= 60);
  if (remaining > 0) return;
  clearInterval(countdown);
  notify("Su tiempo para realizar el pago ha expirado.");
  setTimeout(() => (location.href = "/index.html"), 4000);
}, 1000);

// ---------- Datos del viaje ----------

const normalCount = tickets.filter((t) => t.tipo === "normal").length;
const adultoCount = tickets.filter((t) => t.tipo === "adulto").length;

summary["normal-label"].textContent = `${normalCount} Tiquete${normalCount > 1 ? "s" : ""} Normal:`;
summary["adulto-label"].textContent = `${adultoCount} Tiquete${adultoCount > 1 ? "s" : ""} Adulto Mayor:`;

if (tickets.length) {
  summary.asientos.textContent = tickets.map((t) => t.asiento).join(", ");
} else {
  notify("No has seleccionado ningún tiquete.");
}

const tripSlot = (name) => document.querySelector(`[data-trip="${name}"]`);

if (tickets.length) {
  tripSlot("asientos").textContent = `Asiento${tickets.length > 1 ? "s" : ""} ${tickets.map((t) => t.asiento).join(", ")}`;
}

if (route) {
  const [year, month, day] = trip.fecha.split("-");
  const fecha = new Date(year, month - 1, day).toLocaleDateString("es-CR", { weekday: "long", day: "numeric", month: "long" });
  summary.fecha.textContent = `${day}/${month}/${year} ${formatHour12(trip.hora)}`;
  summary.ruta.textContent = `${route.origen} - ${route.destino} (${route.tipo})`.toUpperCase();
  tripSlot("origen").textContent = route.origen;
  tripSlot("destino").textContent = route.destino;
  tripSlot("fecha").textContent = fecha.charAt(0).toUpperCase() + fecha.slice(1);
  tripSlot("hora").textContent = `${formatHour12(trip.hora)} · ${route.tiempo} aprox.`;
}

// ---------- Terminales ----------

const selectOrigen = document.getElementById("terminal-origen");
const selectDestino = document.getElementById("terminal-destino");

// Rellena un select excluyendo la terminal elegida en el otro, conservando la selección actual
function fillTerminals(select, terminals, placeholder, exclude) {
  const current = select.value;
  select.innerHTML =
    `<option value="" disabled hidden>${placeholder}</option>` +
    terminals
      .filter((t) => t !== exclude)
      .map((t) => `<option value="${t}">${t}</option>`)
      .join("");
  select.value = terminals.includes(current) && current !== exclude ? current : "";
}

function refreshTerminals() {
  fillTerminals(selectOrigen, route.terminales.origen, "Seleccione una terminal de origen", selectDestino.value);
  fillTerminals(selectDestino, route.terminales.destino, "Seleccione una terminal de destino", selectOrigen.value);
  updateTotals();
}

function updateTotals() {
  if (!selectOrigen.value || !selectDestino.value) return;

  const totalNormal = route.precios.normal * normalCount;
  const totalAdulto = route.precios.adultoMayor * adultoCount;
  const commission = totalNormal * COMMISSION_RATE;
  const vat = commission * VAT_RATE;
  const total = totalNormal + totalAdulto + commission + vat;

  summary.normal.textContent = formatColones(totalNormal);
  summary.adulto.textContent = formatColones(totalAdulto);
  summary.comision.textContent = formatColones(commission);
  summary.iva.textContent = formatColones(vat);
  summary.total.textContent = formatColones(total);

  // Datos que lee el formulario de pago
  sessionStorage.setItem("totalAmount", total);
  sessionStorage.setItem("codigoReferencia", Math.floor(100000000 + Math.random() * 900000000));
}

if (route) {
  refreshTerminals();
  selectOrigen.addEventListener("change", refreshTerminals);
  selectDestino.addEventListener("change", refreshTerminals);
}

// ---------- Acciones ----------

document.querySelector("[data-buy]").addEventListener("click", (event) => {
  if (!selectOrigen.value || !selectDestino.value) {
    event.preventDefault();
    notify("Por favor, selecciona tanto la terminal de salida como la de llegada antes de continuar.");
  } else if (!document.getElementById("accept-terms").checked) {
    event.preventDefault();
    notify("Debes aceptar los Términos y Condiciones antes de continuar con la compra.");
  }
});

const termsDialog = document.getElementById("terms-dialog");
document.querySelector("[data-open-terms]").addEventListener("click", () => termsDialog.showModal());
