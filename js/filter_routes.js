document.addEventListener("DOMContentLoaded", function () {
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
  const priceInput = document.getElementById("price");
  const botonBuscar = document.getElementById("buscarRutasBtn");
  const selectHora = document.getElementById("time");

  function limpiarCampos() {
    selectOrigen.selectedIndex = 0;
    selectDestino.selectedIndex = 0;
    inputDate.value = "";
    selectHora.innerHTML =
      '<option value="" disabled selected hidden>Seleccione el horario</option>';
    priceInput.value = "";
  }

  const today = new Date().toISOString().split("T")[0];
  inputDate.min = today;

  selectOrigen.innerHTML = `
  <option value="" disabled selected hidden>Seleccione una ubicación</option>
  <option value="San José">San José</option>
`;

  const destinosUnicos = [...new Set(rutasValidas.map((r) => r.destino))];
  selectDestino.innerHTML = `<option value="" disabled selected hidden>Seleccione una ubicación</option>`;
  destinosUnicos.forEach((destino) => {
    const opt = document.createElement("option");
    opt.value = destino;
    opt.textContent = destino;
    selectDestino.appendChild(opt);
  });

  function convertirHora12(hora24) {
    const [h, m] = hora24.split(":");
    let hora = parseInt(h, 10);
    const ampm = hora >= 12 ? "PM" : "AM";
    hora = hora % 12 || 12;
    return `${hora.toString().padStart(2, "0")}:${m} ${ampm}`;
  }

  function actualizarHorariosYPrecio() {
    const origen = selectOrigen.value;
    const destino = selectDestino.value;

    if (!origen || !destino) return;

    const ruta = rutasValidas.find(
      (r) => r.origen === origen && r.destino === destino
    );
    if (!ruta) return;

    selectHora.innerHTML = "";

    const placeholderOption = document.createElement("option");
    placeholderOption.textContent = "Seleccione el horario";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    selectHora.appendChild(placeholderOption);

    const fechaSeleccionada = inputDate.value;
    const fechaActual = new Date().toISOString().split("T")[0];

    let horariosFiltrados = [];

    if (fechaSeleccionada) {
      const fechaSeleccionadaDate = new Date(fechaSeleccionada);
      const fechaActualDate = new Date(fechaActual);
      fechaSeleccionadaDate.setHours(0, 0, 0, 0);
      fechaActualDate.setHours(0, 0, 0, 0);

      // Si la fecha seleccionada es anterior a la actual, no mostrar horarios
      if (fechaSeleccionadaDate < fechaActualDate) {
        horariosFiltrados = [];
      } else {
        // Si la fecha es hoy o futura, mostrar todos los horarios
        horariosFiltrados = ruta.horarios;
      }
    } else {
      // Si no hay fecha seleccionada, no mostrar horarios
      horariosFiltrados = [];
    }

    // Si no hay horarios disponibles, mostrar el mensaje adecuado
    if (horariosFiltrados.length === 0) {
      const noOption = document.createElement("option");
      noOption.textContent = "No hay horarios disponibles";
      noOption.disabled = true;
      selectHora.appendChild(noOption);
      return;
    }

    // Mostrar los horarios filtrados
    horariosFiltrados.forEach((hora) => {
      const opt = document.createElement("option");
      opt.value = hora;
      opt.textContent = convertirHora12(hora);
      selectHora.appendChild(opt);
    });

    // Cambiar el precio cuando se selecciona un horario
    selectHora.onchange = () => {
      priceInput.value = `₡ ${ruta.precios.normal}`;
    };
  }

  selectOrigen.addEventListener("change", actualizarHorariosYPrecio);
  selectDestino.addEventListener("change", actualizarHorariosYPrecio);

  // Se agregó esto para que al cambiar la fecha también se actualicen los horarios
  inputDate.addEventListener("change", actualizarHorariosYPrecio);

  botonBuscar.addEventListener("click", function (e) {
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

    const rutaSeleccionada = rutasFiltradas[0];
    if (rutaSeleccionada) {
      const transportista = "Busena S.A.";
      const fechaFormateada = new Date(`${fecha}T${hora}`);
      const opcionesFecha = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      const opcionesHora = { hour: "2-digit", minute: "2-digit", hour12: true };

      const fechaTexto = fechaFormateada.toLocaleDateString(
        "es-CR",
        opcionesFecha
      );
      const horaTexto = fechaFormateada.toLocaleTimeString(
        "es-CR",
        opcionesHora
      );
      const tipo = rutaSeleccionada.tipo
        ? rutaSeleccionada.tipo.toUpperCase()
        : "DIRECTO";
      const rutaTexto = `${rutaSeleccionada.origen.toUpperCase()} - ${rutaSeleccionada.destino.toUpperCase()} (${tipo})`;

      // Obtener tipo de tiquete desde localStorage
      const tipoTiquete = localStorage.getItem("currentTicketType") || "normal";

      // Guardar tipo de tiquete junto con los demás datos
      sessionStorage.setItem("rutasValidas", JSON.stringify(rutasValidas));
      sessionStorage.setItem("origenRuta", origen);
      sessionStorage.setItem("destinoRuta", destino);
      sessionStorage.setItem("transportista", transportista);
      sessionStorage.setItem("fechaViaje", `${fechaTexto} ${horaTexto}`);
      sessionStorage.setItem("rutaDescripcion", rutaTexto);
      sessionStorage.setItem("tipoTiquete", tipoTiquete); // ← agregado
    }
    limpiarCampos();

    const params = new URLSearchParams({ origen, destino, fecha, hora });
    window.location.href = `/app/search/search.html?${params.toString()}`;
  });
});

function mostrarNotificacion(mensaje, duracion = 4000) {
  const noti = document.getElementById("custom-notification");
  const notiMsg = document.getElementById("notification-message");

  notiMsg.textContent = mensaje;
  noti.classList.add("show");

  setTimeout(() => {
    noti.classList.remove("show");
  }, duracion);
}
