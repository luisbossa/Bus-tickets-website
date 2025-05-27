function convertirHora12(hora24) {
  const [h, m] = hora24.split(":");
  let hora = parseInt(h, 10);
  const ampm = hora >= 12 ? "PM" : "AM";
  hora = hora % 12 || 12;
  return `${hora.toString().padStart(2, "0")}:${m.padStart(2, "0")} ${ampm}`;
}

const rutasValidas = [
  {
    origen: "San José",
    destino: "Cartago",
    tiempo: "1 hora",
    precios: {
      normal: "1,100,00",
      adultoMayor: "1,000,00",
    },
    imagen: "/images/search_bus_2.webp",
    asientos: 57,
    equipaje: 2,
    descripcion: "Terminal 7-10 San José → Cartago",
    horarios: [
      "05:30",
      "06:15",
      "07:00",
      "08:00",
      "09:30",
      "11:00",
      "12:30",
      "14:00",
      "15:30",
      "17:00",
    ],
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
    precios: {
      normal: "3,000,00",
      adultoMayor: "2,500,00",
    },
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
    destino: "Monte Verde",
    tiempo: "4 horas",
    precios: {
      normal: "3,800,00",
      adultoMayor: "3,200,00",
    },
    imagen: "/images/search_bus_3.webp",
    asientos: 40,
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
    tiempo: "4 horas",
    precios: {
      normal: "6,500,00",
      adultoMayor: "5,500,00",
    },
    imagen: "/images/search_bus_1.webp",
    asientos: 57,
    equipaje: 2,
    descripcion:
      "Terminal 7-10 San José → Santa Cruz → Nicoya → Tamarindo → Flamingo",
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
      destino: [
        "Terminal de Santa Cruz",
        "Terminal de Nicoya",
        "Terminal de Tamarindo",
        "Terminal de Flamingo",
      ],
    },
  },
  {
    origen: "San José",
    destino: "Puntarenas",
    tiempo: "2 horas",
    precios: {
      normal: "3,300,00",
      adultoMayor: "2,800,00",
    },
    imagen: "/images/search_bus_5.webp",
    asientos: 57,
    equipaje: 2,
    descripcion:
      "Terminal 7-10 San José → Puntarenas (Terminal frente al Paseo de los Turistas)",
    horarios: [
      "05:30",
      "06:15",
      "07:00",
      "08:00",
      "09:30",
      "11:00",
      "12:30",
      "14:00",
      "15:30",
      "17:00",
    ],
    tipo: "Indirecto",
    terminales: {
      origen: ["Terminal 7-10 San José", "Terminal de Puntarenas"],
      destino: ["Terminal de Puntarenas"],
    },
  },
];

const selectOrigen = document.getElementById("select_1");
const selectDestino = document.getElementById("select_2");
const inputDate = document.getElementById("date");
const selectHora = document.getElementById("time");
const priceInput = document.getElementById("price");
const botonBuscar = document.getElementById("buscarRutasBtn");

// Función para convertir a formato 12 horas
function convertirHora12(hora24) {
  const [h, m] = hora24.split(":");
  let hora = parseInt(h, 10);
  const ampm = hora >= 12 ? "PM" : "AM";
  hora = hora % 12 || 12;
  return `${hora.toString().padStart(2, "0")}:${m} ${ampm}`;
}

// Establecer fecha mínima
const today = new Date().toISOString().split("T")[0];
inputDate.setAttribute("min", today);

// Poblar destinos (omitimos San José)
const destinos = [...new Set(rutasValidas.map((ruta) => ruta.destino))];
destinos.forEach((destino) => {
  if (destino !== "San José") {
    const option = document.createElement("option");
    option.value = destino;
    option.textContent = destino;
    selectDestino.appendChild(option);
  }
});

function actualizarHorarios() {
  const origenSeleccionado = selectOrigen.value;
  const destinoSeleccionado = selectDestino.value;
  const fechaSeleccionada = inputDate.value; // formato "YYYY-MM-DD"

  // Limpiar y agregar el placeholder
  selectHora.innerHTML = "";
  const placeholderOption = document.createElement("option");
  placeholderOption.textContent = "Seleccione el horario";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  selectHora.appendChild(placeholderOption);

  if (!origenSeleccionado || !destinoSeleccionado || !fechaSeleccionada) {
    const noOption = document.createElement("option");
    noOption.textContent = "No hay horarios disponibles";
    noOption.disabled = true;
    selectHora.appendChild(noOption);
    return;
  }

  const rutaSeleccionada = rutasValidas.find(
    (ruta) =>
      ruta.origen === origenSeleccionado && ruta.destino === destinoSeleccionado
  );

  if (!rutaSeleccionada) {
    const noOption = document.createElement("option");
    noOption.textContent = "No hay horarios disponibles";
    noOption.disabled = true;
    selectHora.appendChild(noOption);
    return;
  }

  // Parsear fecha seleccionada localmente para evitar desfase UTC
  const [year, month, day] = fechaSeleccionada.split("-").map(Number);
  // Mes en JS es 0-based, restamos 1 al mes
  const fechaSeleccionadaDate = new Date(year, month - 1, day);

  // Fecha actual con horas, minutos, segundos a 0 para comparar solo fechas
  const ahora = new Date();
  const fechaActualDate = new Date(
    ahora.getFullYear(),
    ahora.getMonth(),
    ahora.getDate()
  );

  // Validar si fecha es pasada
  if (fechaSeleccionadaDate < fechaActualDate) {
    const noOption = document.createElement("option");
    noOption.textContent = "No hay horarios disponibles";
    noOption.disabled = true;
    selectHora.appendChild(noOption);
    return;
  }

  let horariosFiltrados;

  if (fechaSeleccionadaDate.getTime() > fechaActualDate.getTime()) {
    // Fecha futura: mostrar todos los horarios
    horariosFiltrados = rutaSeleccionada.horarios;
  } else {
    // Fecha es hoy: filtrar horarios posteriores a la hora actual
    horariosFiltrados = rutaSeleccionada.horarios.filter((horaStr) => {
      const [horas, minutos] = horaStr.split(":").map(Number);
      // Construir objeto fecha con fecha seleccionada + hora y minuto
      const horarioDate = new Date(year, month - 1, day, horas, minutos, 0, 0);
      return horarioDate > ahora;
    });
  }

  if (horariosFiltrados.length === 0) {
    const noOption = document.createElement("option");
    noOption.textContent = "No hay horarios disponibles";
    noOption.disabled = true;
    selectHora.appendChild(noOption);
    return;
  }

  horariosFiltrados.forEach((hora) => {
    const opt = document.createElement("option");
    opt.value = hora;
    opt.textContent = convertirHora12(hora);
    selectHora.appendChild(opt);
  });
}

// Evento al cambiar fecha o destino
inputDate.addEventListener("change", actualizarHorarios);
selectDestino.addEventListener("change", actualizarHorarios);

// Evento de búsqueda
botonBuscar.addEventListener("click", (e) => {
  e.preventDefault();

  const origen = selectOrigen.value;
  const destino = selectDestino.value;
  const fecha = inputDate.value;
  const hora = selectHora.value;

  if (!origen || !destino || !fecha || !hora) {
    mostrarNotificacion("Por favor completa todos los campos obligatorios.");
    return;
  }

  const rutasFiltradas = rutasValidas.filter(
    (ruta) =>
      ruta.origen === origen &&
      ruta.destino === destino &&
      ruta.horarios.includes(hora)
  );

  if (rutasFiltradas.length === 0) {
    mostrarNotificacion(
      "No se encontraron rutas con los criterios seleccionados."
    );
    return;
  }

  mostrarResultados(rutasFiltradas, hora);

  const rutaSeleccionada = rutasFiltradas[0];
  if (rutaSeleccionada) {
    const transportista = "Busena S.A.";

    const fechaFormateada = new Date(`${fecha}T${hora}`);
    const opcionesFecha = { day: "2-digit", month: "2-digit", year: "numeric" };
    const opcionesHora = { hour: "2-digit", minute: "2-digit", hour12: true };

    const fechaTexto = fechaFormateada.toLocaleDateString(
      "es-CR",
      opcionesFecha
    );
    const horaTexto = fechaFormateada.toLocaleTimeString("es-CR", opcionesHora);
    const rutaTexto = `${rutaSeleccionada.origen.toUpperCase()} - ${rutaSeleccionada.destino.toUpperCase()} (${rutaSeleccionada.tipo.toUpperCase()})`;

    sessionStorage.setItem("rutasValidas", JSON.stringify(rutasValidas));
    sessionStorage.setItem("origenRuta", origen);
    sessionStorage.setItem("destinoRuta", destino);
    sessionStorage.setItem("transportista", transportista);
    sessionStorage.setItem("fechaViaje", `${fechaTexto} ${horaTexto}`);
    sessionStorage.setItem("rutaDescripcion", rutaTexto);
  }
});

function mostrarResultados(rutas, hora) {
  const resultsContainer = document.getElementById("resultsContainer");

  resultsContainer.innerHTML = "";

  if (rutas.length === 0) {
    resultsContainer.innerHTML =
      "<p>No se encontraron rutas disponibles para esta combinación y horario.</p>";
  } else {
    rutas.forEach((ruta) => {
      const html = `
        <article class="result">
          <div class="one-fourth">
            <img src="${ruta.imagen}" alt="Imagen de bus" />
          </div>
          <div class="one-half">
            <h3>${ruta.origen} - ${ruta.destino}
              <a href="javascript:void(0)" class="trigger color" title="Información">Info</a>
            </h3>
            <ul>
              <li><p><strong>${ruta.asientos} asientos</strong></p></li>
              <li><p><strong>${ruta.equipaje} equipajes</strong></p></li>
              <li><p>Tiempo: <strong>${ruta.tiempo}</strong></p></li>
            </ul>
          </div>
          <div class="one-fourth">
            <div>
              <div class="price"><small>₡</small> ${ruta.precios.normal}</div> 
              <span>Tipo horario: <strong class="rote_uppercase">${
                ruta.tipo
              }</strong></span>
              <span>Hora de salida: <strong>${convertirHora12(
                hora
              )}</strong></span>
              <button class="btn grey small" data-section="section-diary"
                onclick="toggleWindow('#window-send-suggestion')" data-flip-id="animate">
                Escoger asiento
              </button>
            </div>
          </div>
          <div class="full-width information2" style="display: none;">
            <a href="javascript:void(0)" class="close color" title="Cerrar">X</a>
            <p><strong>Paradas principales: </strong>${ruta.descripcion}</p>
          </div>
        </article>
      `;
      resultsContainer.insertAdjacentHTML("beforeend", html);
    });
  }
  limpiarCampos();
}

function limpiarCampos() {
  selectOrigen.selectedIndex = 0;
  selectDestino.selectedIndex = 0;
  inputDate.value = "";
  selectHora.innerHTML =
    '<option value="" disabled selected hidden>Seleccione el horario</option>';
}

/*------------ CHOOSE SEATS & pass dat to ticket.html  ---------------*/

document.addEventListener("DOMContentLoaded", () => {
  const seatButtons = document.querySelectorAll(".btn-seat");
  const clearSeatsBtn = document.getElementById("clearSeatsBtn");
  const acceptLink = document.getElementById("acceptLink");
  const modalAddButton = document.querySelector("#modalAddButton");
  const radioNormal = document.querySelector(
    'input[name="ticketType"][value="normal"]'
  );
  const radioAdulto = document.querySelector(
    'input[name="ticketType"][value="adulto"]'
  );
  const cedulaContainer = document.getElementById("cedula-container");
  const cedulaInput = document.getElementById("cedula");
  const cedulaError = document.getElementById("cedula-error");

  modalAddButton.disabled = false;

  // Función para obtener el tipo de tiquete actualizado
  const getCurrentTicketType = () => {
    const selectedRadio = document.querySelector(
      'input[name="ticketType"]:checked'
    );
    return selectedRadio ? selectedRadio.value : null;
  };

  radioNormal.addEventListener("change", () => {
    cedulaContainer.classList.remove("show");
    cedulaInput.value = "";
    cedulaError.textContent = "";
    cedulaError.classList.remove("show");
    modalAddButton.disabled = false;
  });

  radioAdulto.addEventListener("change", () => {
    if (radioAdulto.checked) {
      cedulaContainer.classList.add("show");
      validarYAgregar();
      cedulaError.textContent = "";
    }
  });

  // Validación de cédula costarricense
  function validarCedula(cedula) {
    if (cedula.length !== 9) {
      return {
        valido: false,
        mensaje: "La cédula debe tener exactamente 9 dígitos",
      };
    }
    if (!/^[0-9]{9}$/.test(cedula)) {
      return {
        valido: false,
        mensaje: "La cédula solo puede contener números",
      };
    }
    const dia = parseInt(cedula.substring(0, 2), 10);
    const mes = parseInt(cedula.substring(2, 4), 10);
    const anio = parseInt(cedula.substring(4, 8), 10);

    if (dia < 1 || dia > 31) {
      return { valido: false, mensaje: "El día de la cédula no es válido" };
    }
    if (mes < 1 || mes > 12) {
      return { valido: false, mensaje: "El mes de la cédula no es válido" };
    }
    const currentYear = new Date().getFullYear();
    if (anio > currentYear) {
      return {
        valido: false,
        mensaje: "El año de nacimiento no puede ser mayor al año actual",
      };
    }
    const edad = currentYear - anio;
    if (edad < 18) {
      return { valido: false, mensaje: "Debe ser mayor de 18 años" };
    }
    return { valido: true };
  }

  // Validar cédula y tipo de tiquete antes de agregar (habilita/deshabilita botón)
  function validarYAgregar() {
    const ticketType = getCurrentTicketType();
    if (ticketType === "adulto") {
      const cedula = cedulaInput.value.trim();
      const validation = validarCedula(cedula);
      if (!validation.valido) {
        cedulaError.textContent = validation.mensaje;
        cedulaError.classList.add("show");
        modalAddButton.disabled = true;
        return;
      } else {
        cedulaError.textContent = "";
        cedulaError.classList.remove("show");
        modalAddButton.disabled = false;
      }
    } else {
      cedulaError.textContent = "";
      cedulaError.classList.remove("show");
      modalAddButton.disabled = false;
    }

    // ✅ Guarda el tipo de tiquete confirmado
    localStorage.setItem("currentTicketType", ticketType);
  }

  // Validación en tiempo real al escribir cédula
  cedulaInput.addEventListener("input", () => {
    const cedula = cedulaInput.value.trim();
    const validation = validarCedula(cedula);
    if (!validation.valido) {
      cedulaError.textContent = validation.mensaje;
      cedulaError.classList.add("show");
      modalAddButton.disabled = true;
    } else {
      cedulaError.textContent = "";
      cedulaError.classList.remove("show");
      modalAddButton.disabled = false;
    }
  });

  // Listener botón Agregar
  modalAddButton.addEventListener("click", () => {
    validarYAgregar();

    cedulaInput.value = "";
    cedulaError.textContent = "";
    cedulaError.classList.remove("show");

    if (!modalAddButton.disabled) {
      // Cerramos modal sólo si es válido
      closeWindow("#popup-hola");
    }
  });

  // Selección de asientos
  seatButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const selected = document.querySelectorAll(".btn-seat.selected");
      const isSelected = button.classList.contains("selected");

      if (isSelected) {
        button.classList.remove("selected");
        button.removeAttribute("data-ticket-type");
        button.removeAttribute("disabled");

        seatButtons.forEach((btn) => {
          if (!btn.classList.contains("selected")) {
            btn.removeAttribute("disabled");
            btn.classList.remove("disabled2");
          }
        });
      } else {
        // ✅ Obtener el tipo confirmado desde localStorage
        const ticketType = localStorage.getItem("currentTicketType");

        if (!ticketType) {
          mostrarNotificacion(
            "Por favor presiona 'Agregar' para confirmar el tipo de tiquete antes de seleccionar un asiento."
          );
          return;
        }

        if (selected.length >= 5) {
          seatButtons.forEach((btn) => {
            if (!btn.classList.contains("selected")) {
              btn.setAttribute("disabled", "true");
              btn.classList.add("disabled2");
            }
          });
          button.setAttribute("disabled", "true");
          button.classList.add("disabled2");

          mostrarNotificacion("Solo puedes seleccionar hasta 5 asientos.");
          return;
        }

        button.classList.add("selected");
        button.setAttribute("data-ticket-type", ticketType);
        button.setAttribute("disabled", "true");

        if (selected.length + 1 === 5) {
          seatButtons.forEach((btn) => {
            if (!btn.classList.contains("selected")) {
              btn.setAttribute("disabled", "true");
              btn.classList.add("disabled2");
            }
          });
          mostrarNotificacion("Solo puedes seleccionar hasta 5 asientos.");
        }
      }
    });
  });

  // Evento botón Limpiar asientos
  clearSeatsBtn.addEventListener("click", () => {
    seatButtons.forEach((seat) => {
      seat.classList.remove("selected");
      seat.removeAttribute("data-ticket-type");
      seat.removeAttribute("disabled");
      seat.classList.remove("disabled2");
    });
  });

  // Evento botón Aceptar (redirigir con datos)
  acceptLink.addEventListener("click", (e) => {
    e.preventDefault();

    const selectedSeatElements =
      document.querySelectorAll(".btn-seat.selected");

    const selectedSeats = Array.from(selectedSeatElements).map((btn) => ({
      asiento: btn.textContent.trim(),
      tipo: btn.getAttribute("data-ticket-type"),
    }));

    if (selectedSeats.length === 0) {
      mostrarNotificacion("Por favor selecciona al menos un asiento.");
      return;
    }
    sessionStorage.setItem("selectedTickets", JSON.stringify(selectedSeats));
    window.location.href = "/app/ticket/ticket.html"; // Redirección después del guardado
  });
});

/*------------- SHOW THE MESSAGE -----------------*/

function mostrarNotificacion(mensaje, duracion = 4000) {
  const noti = document.getElementById("custom-notification");
  const notiMsg = document.getElementById("notification-message");

  notiMsg.textContent = mensaje;
  noti.classList.add("show");

  setTimeout(() => {
    noti.classList.remove("show");
  }, duracion);
}
