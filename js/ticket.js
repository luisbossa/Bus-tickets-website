function mostrarNotificacion(mensaje, duracion = 4000) {
  const noti = document.getElementById("custom-notification");
  const notiMsg = document.getElementById("notification-message");

  notiMsg.textContent = mensaje;
  noti.classList.add("show");

  setTimeout(() => {
    noti.classList.remove("show");
  }, duracion);
}

/*---------- TIMER ------------*/

document.addEventListener("DOMContentLoaded", function () {
  let tiempoRestante = 180; // 3 minutos

  const timerElement = document.getElementById("timer");

  function actualizarTemporizador() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;

    timerElement.textContent = `${String(minutos).padStart(2, "0")}:${String(
      segundos
    ).padStart(2, "0")}`;

    if (tiempoRestante > 0) {
      tiempoRestante--;
    } else {
      clearInterval(contador);
      mostrarNotificacion("Su tiempo para realizar el pago ha expirado.");
      setTimeout(() => {
        window.location.href = "/app/search/search.html";
      }, 4000);
    }
  }
  const contador = setInterval(actualizarTemporizador, 1000);
});

/*---------- RECIBIR DATOS DE SEARCH.HTML ------------*/

document.addEventListener("DOMContentLoaded", () => {
  const seatDisplay = document.getElementById("selectedSeatsText");
  const storedSeats = sessionStorage.getItem("selectedTickets");

  if (storedSeats) {
    const seats = JSON.parse(storedSeats);
    const seatNames = seats.map((seat) => seat.asiento);
    seatDisplay.textContent += seatNames.join(", ");
  } else {
    seatDisplay.textContent += "Ninguno";
  }

  const transportistaEl = document.getElementById("transportistaInfo");
  const fechaViajeEl = document.getElementById("fechaViajeInfo");
  const rutaInfoEl = document.getElementById("rutaInfo");

  transportistaEl.textContent =
    sessionStorage.getItem("transportista") || "No definido";
  fechaViajeEl.textContent =
    sessionStorage.getItem("fechaViaje") || "No definido";
  rutaInfoEl.textContent =
    sessionStorage.getItem("rutaDescripcion") || "No definida";

  const tickets = JSON.parse(sessionStorage.getItem("selectedTickets")) || [];

  let normalCount = 0;
  let adultoCount = 0;

  tickets.forEach((ticket) => {
    if (ticket.tipo === "normal") normalCount++;
    else if (ticket.tipo === "adulto") adultoCount++;
  });

  const normalCountElement = document.getElementById("normal-count");
  if (normalCountElement) {
    normalCountElement.textContent = `${normalCount} Tiquete${
      normalCount > 1 ? "s" : ""
    } Normal:`;
  }

  const adultoCountElement = document.getElementById("adulto-count");
  if (adultoCountElement) {
    adultoCountElement.textContent = `${adultoCount} Tiquete${
      adultoCount > 1 ? "s" : ""
    } Adulto Mayor:`;
  }

  if (normalCount === 0 && adultoCount === 0) {
    const noTicketsMessage = document.createElement("p");
    noTicketsMessage.textContent = "No has seleccionado ningún tiquete.";
    document.body.appendChild(noTicketsMessage);
  }
});

/*---------------- BUS TERMINAL SELECTS --------------------*/

document.addEventListener("DOMContentLoaded", () => {
  const rutasValidas = JSON.parse(sessionStorage.getItem("rutasValidas"));
  const origen = sessionStorage.getItem("origenRuta");
  const destino = sessionStorage.getItem("destinoRuta");

  // Buscar la ruta seleccionada entre las rutas válidas
  const rutaSeleccionada = rutasValidas.find(
    (ruta) => ruta.origen === origen && ruta.destino === destino
  );

  // Si se encontró la ruta seleccionada
  if (rutaSeleccionada) {
    const selectOrigen = document.getElementById("select_1");
    const selectDestino = document.getElementById("select_2");
    const comprarBoletoButton = document.getElementById("comprarBoleto");

    // Llenar las terminales de origen
    selectOrigen.innerHTML =
      '<option value="" disabled selected hidden>Seleccione una terminal de origen</option>';
    rutaSeleccionada.terminales.origen.forEach((terminal) => {
      const option = document.createElement("option");
      option.value = terminal;
      option.textContent = terminal;
      selectOrigen.appendChild(option);
    });

    // Llenar las terminales de destino
    selectDestino.innerHTML =
      '<option value="" disabled selected hidden>Seleccione una terminal de destino</option>';
    rutaSeleccionada.terminales.destino.forEach((terminal) => {
      const option = document.createElement("option");
      option.value = terminal;
      option.textContent = terminal;
      selectDestino.appendChild(option);
    });

    // Detectar cambios en select_1 (origen)
    selectOrigen.addEventListener("change", () => {
      const terminalOrigenSeleccionada = selectOrigen.value;

      // Si no se selecciona ninguna opción en origen, eliminar las opciones de destino
      if (terminalOrigenSeleccionada === "") {
        selectDestino.innerHTML =
          '<option value="" disabled selected hidden>Seleccione una terminal de destino</option>';
        // Llenar selectDestino con todas las terminales de destino nuevamente
        rutaSeleccionada.terminales.destino.forEach((terminal) => {
          const option = document.createElement("option");
          option.value = terminal;
          option.textContent = terminal;
          selectDestino.appendChild(option);
        });
        return;
      }

      // Filtrar para que la terminal de origen seleccionada no aparezca en destino
      let terminalDestino = rutaSeleccionada.terminales.destino;
      terminalDestino = terminalDestino.filter(
        (terminal) => terminal !== terminalOrigenSeleccionada
      );

      // Limpiar el selectDestino
      selectDestino.innerHTML = "";

      // Llenar selectDestino con las terminales opuestas
      terminalDestino.forEach((terminal) => {
        const option = document.createElement("option");
        option.value = terminal;
        option.textContent = terminal;
        selectDestino.appendChild(option);
      });

      // Actualizar los precios de los tiquetes
      actualizarPrecios(terminalOrigenSeleccionada, selectDestino.value);
    });

    // Detectar cambios en select_2 (destino)
    selectDestino.addEventListener("change", () => {
      const terminalDestinoSeleccionada = selectDestino.value;

      // Si no se selecciona ninguna opción en destino, eliminar las opciones de origen
      if (terminalDestinoSeleccionada === "") {
        selectOrigen.innerHTML =
          '<option value="" disabled selected hidden>Seleccione una terminal de origen</option>';
        // Llenar selectOrigen con todas las terminales de origen nuevamente
        rutaSeleccionada.terminales.origen.forEach((terminal) => {
          const option = document.createElement("option");
          option.value = terminal;
          option.textContent = terminal;
          selectOrigen.appendChild(option);
        });
        return;
      }

      // Filtrar para que la terminal de destino seleccionada no aparezca en origen
      let terminalOrigen = rutaSeleccionada.terminales.origen;
      terminalOrigen = terminalOrigen.filter(
        (terminal) => terminal !== terminalDestinoSeleccionada
      );

      // Limpiar el selectOrigen
      selectOrigen.innerHTML = "";

      // Llenar selectOrigen con las terminales opuestas
      terminalOrigen.forEach((terminal) => {
        const option = document.createElement("option");
        option.value = terminal;
        option.textContent = terminal;
        selectOrigen.appendChild(option);
      });

      // Actualizar los precios de los tiquetes
      actualizarPrecios(selectOrigen.value, terminalDestinoSeleccionada);
    });

    // Evento para el botón Comprar Boleto
    comprarBoletoButton.addEventListener("click", (event) => {
      const terminalOrigenSeleccionada = selectOrigen.value;
      const terminalDestinoSeleccionada = selectDestino.value;
      const checkboxAceptaTerminos =
        document.getElementById("terms-conditions");

      // Validar que ambas terminales estén seleccionadas
      if (!terminalOrigenSeleccionada || !terminalDestinoSeleccionada) {
        event.preventDefault();
        mostrarNotificacion(
          "Por favor, selecciona tanto la terminal de salida como la de llegada antes de continuar."
        );
      }
      // Validar que el checkbox esté marcado
      else if (!checkboxAceptaTerminos.checked) {
        event.preventDefault();
        mostrarNotificacion(
          "Debes aceptar los Términos y Condiciones antes de continuar con la compra."
        );
      } else {
        // Aquí puedes colocar el código para procesar la compra si las terminales están seleccionadas
        console.log("Proceso de compra iniciado");
      }
    });
  } else {
    console.error("Ruta no encontrada en la lista de rutas válidas.");
  }

  // Función para actualizar los precios
  function actualizarPrecios(terminalOrigen, terminalDestino) {
    // Obtener la cantidad de tiquetes seleccionados desde el sessionStorage
    const tickets = JSON.parse(sessionStorage.getItem("selectedTickets")) || [];
    let normalCount = 0;
    let adultoCount = 0;

    // Contar los tiquetes de cada tipo
    tickets.forEach((ticket) => {
      if (ticket.tipo === "normal") normalCount++;
      if (ticket.tipo === "adulto") adultoCount++;
    });

    if (terminalOrigen && terminalDestino) {
      const precioNormal = parseFloat(
        rutaSeleccionada.precios.normal.replace(",", "").replace(" ", "")
      );
      const precioAdultoMayor = parseFloat(
        rutaSeleccionada.precios.adultoMayor.replace(",", "").replace(" ", "")
      );

      // Calcular el costo total para los tiquetes normales
      const totalNormal = precioNormal * normalCount;
      const totalAdulto = precioAdultoMayor * adultoCount;

      // Definir porcentaje de comisión Busena
      const comisionPorcentaje = 0.14; // 14% de la tarifa normal
      const ivaPorcentaje = 0.12; // 12% del IVA

      // Calcular la Comisión de Busena
      const comisionBusena = totalNormal * comisionPorcentaje; // 14% de la tarifa normal

      // Calcular el IVA sobre la Comisión
      const ivaComisionBusena = comisionBusena * ivaPorcentaje; // 12% de la comisión de Busena

      // Calcular el total
      const totalFinal =
        totalNormal + totalAdulto + comisionBusena + ivaComisionBusena;

      // Actualizar los precios en la interfaz de usuario
      document.getElementById("normal-price").textContent =
        totalNormal.toLocaleString("es-CR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      document.getElementById("adulto-price").textContent =
        totalAdulto.toLocaleString("es-CR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      // Mostrar la Comisión Busena, IVA y Total
      document.getElementById("comision_busena").textContent =
        comisionBusena.toLocaleString("es-CR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      document.getElementById("iva-comision_busena").textContent =
        ivaComisionBusena.toLocaleString("es-CR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      document.getElementById("total").textContent = totalFinal.toLocaleString(
        "es-CR",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      );
      // Guardar el total en sessionStorage
      sessionStorage.setItem("totalAmount", totalFinal);

      // Generar código de referencia aleatorio (9 dígitos)
      const codigoReferencia = Math.floor(
        100000000 + Math.random() * 900000000
      );

      // Guardar el código en sessionStorage
      sessionStorage.setItem("codigoReferencia", codigoReferencia);
    }
  }
});
