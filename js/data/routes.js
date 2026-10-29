// Rutas disponibles y lógica compartida del formulario de búsqueda.

const ROUTES = [
  {
    origen: "San José",
    destino: "Cartago",
    tiempo: "1 hora",
    precios: { normal: 1100, adultoMayor: 1000 },
    imagen: "/images/search_bus_2.webp",
    asientos: 57,
    equipaje: 2,
    descripcion: "Terminal 7-10 San José → Cartago",
    horarios: ["05:30", "06:15", "07:00", "08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00"],
    tipo: "Indirecto",
    terminales: {
      origen: ["Terminal 7-10 San José", "Terminal de Cartago"],
      destino: ["Terminal de Cartago"],
    },
  },
  {
    origen: "San José",
    destino: "San Carlos",
    tiempo: "3 horas",
    precios: { normal: 3000, adultoMayor: 2500 },
    imagen: "/images/search_bus_4.webp",
    asientos: 57,
    equipaje: 2,
    descripcion: "Terminal 7-10 San José → Ciudad Quesada",
    horarios: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
    tipo: "Directo",
    terminales: {
      origen: ["Terminal 7-10 San José", "Terminal de Ciudad Quesada"],
      destino: ["Terminal de Ciudad Quesada"],
    },
  },
  {
    origen: "San José",
    destino: "Monteverde",
    tiempo: "4 horas",
    precios: { normal: 3800, adultoMayor: 3200 },
    imagen: "/images/search_bus_3.webp",
    asientos: 57,
    equipaje: 2,
    descripcion: "Terminal 7-10 San José → Monteverde",
    horarios: ["07:00", "10:30", "13:00", "15:30"],
    tipo: "Directo",
    terminales: {
      origen: ["Terminal 7-10 San José", "Terminal de Monteverde"],
      destino: ["Terminal de Monteverde"],
    },
  },
  {
    origen: "San José",
    destino: "Guanacaste",
    tiempo: "5 horas",
    precios: { normal: 6500, adultoMayor: 5500 },
    imagen: "/images/search_bus_1.webp",
    asientos: 57,
    equipaje: 2,
    descripcion: "Terminal 7-10 San José → Nicoya → Santa Cruz → Tamarindo → Flamingo",
    horarios: ["06:00", "09:00", "12:00", "15:00", "17:30"],
    tipo: "Directo",
    terminales: {
      origen: [
        "Terminal 7-10 San José",
        "Terminal de Santa Cruz",
        "Terminal de Nicoya",
        "Terminal de Tamarindo",
        "Terminal de Flamingo",
      ],
      destino: ["Terminal de Santa Cruz", "Terminal de Nicoya", "Terminal de Tamarindo", "Terminal de Flamingo"],
    },
  },
  {
    origen: "San José",
    destino: "Puntarenas",
    tiempo: "2 horas",
    precios: { normal: 3300, adultoMayor: 2800 },
    imagen: "/images/search_bus_5.webp",
    asientos: 57,
    equipaje: 2,
    descripcion: "Terminal 7-10 San José → Puntarenas (Terminal frente al Paseo de los Turistas)",
    horarios: ["05:30", "06:15", "07:00", "08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00"],
    tipo: "Indirecto",
    terminales: {
      origen: ["Terminal 7-10 San José", "Terminal de Puntarenas"],
      destino: ["Terminal de Puntarenas"],
    },
  },
];

function findRoute(origen, destino) {
  return ROUTES.find((ruta) => ruta.origen === origen && ruta.destino === destino);
}

function formatHour12(hora24) {
  const [h, m] = hora24.split(":");
  const hora = Number(h);
  const ampm = hora >= 12 ? "PM" : "AM";
  return `${String(hora % 12 || 12).padStart(2, "0")}:${m} ${ampm}`;
}

function formatColones(amount) {
  return amount.toLocaleString("es-CR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Fecha local en formato YYYY-MM-DD (toISOString usaría UTC y podría mostrar el día siguiente)
function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

// Horarios aún disponibles para la fecha elegida (si es hoy, solo los posteriores a la hora actual)
function availableTimes(ruta, fecha) {
  if (!ruta || !fecha || fecha < todayISO()) return [];
  if (fecha > todayISO()) return ruta.horarios;
  const now = new Date();
  return ruta.horarios.filter((hora) => {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m > now.getHours() * 60 + now.getMinutes();
  });
}

// Conecta un <form class="booking-form"> con selects de origen, destino, fecha, horario y (opcional) precio.
function setupBookingForm(form) {
  const origen = form.elements.origen;
  const destino = form.elements.destino;
  const fecha = form.elements.fecha;
  const hora = form.elements.hora;
  const precio = form.elements.precio;

  const destinos = [...new Set(ROUTES.map((ruta) => ruta.destino))];
  destino.insertAdjacentHTML("beforeend", destinos.map((d) => `<option value="${d}">${d}</option>`).join(""));
  fecha.min = todayISO();

  function updateTimes() {
    const ruta = findRoute(origen.value, destino.value);
    const horas = availableTimes(ruta, fecha.value);
    const placeholder = fecha.value && ruta && !horas.length ? "No hay horarios disponibles" : "Seleccione el horario";
    hora.innerHTML =
      `<option value="" disabled selected hidden>${placeholder}</option>` +
      horas.map((h) => `<option value="${h}">${formatHour12(h)}</option>`).join("");
    if (precio) precio.value = "";
  }

  origen.addEventListener("change", updateTimes);
  destino.addEventListener("change", updateTimes);
  fecha.addEventListener("change", updateTimes);

  if (precio) {
    hora.addEventListener("change", () => {
      const ruta = findRoute(origen.value, destino.value);
      precio.value = ruta ? `₡ ${formatColones(ruta.precios.normal)}` : "";
    });
  }

  form.addEventListener("submit", (event) => {
    if (!origen.value || !destino.value || !fecha.value || !hora.value) {
      event.preventDefault();
      notify("Por favor completa todos los campos obligatorios.");
    }
  });
}
