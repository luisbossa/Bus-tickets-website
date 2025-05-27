const rutas = [
  {
    origen: "San José",
    destino: "Cartago",
    tiempo: "1 hora",
    precios: {
      normal: "1,100,00",
      adultoMayor: "1,000,00",
    },
    imagen: "/images/search_bus_2.png",
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
  },
  {
    origen: "San José",
    destino: "San Carlos",
    tiempo: "3 horas",
    precios: {
      normal: "3,000,00",
      adultoMayor: "2,500,00",
    },
    imagen: "/images/search_bus_4.png",
    asientos: 57,
    equipaje: 2,
    descripcion: "Terminal 7-10 San José → Ciudad Quesada",
    horarios: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
    tipo: "Directo",
  },
  {
    origen: "San José",
    destino: "Monte Verde",
    tiempo: "4 horas",
    precios: {
      normal: "3,800,00",
      adultoMayor: "3,200,00",
    },
    imagen: "/images/search_bus_3.png",
    asientos: 40,
    equipaje: 2,
    descripcion: "Terminal 7-10 San José → Monteverde",
    horarios: ["07:00", "10:30", "13:00", "15:30"],
    tipo: "Directo",
  },
  {
    origen: "San José",
    destino: "Guanacaste",
    tiempo: "4 horas",
    precios: {
      normal: "6,500,00",
      adultoMayor: "5,500,00",
    },
    imagen: "/images/search_bus_1.png",
    asientos: 57,
    equipaje: 2,
    descripcion:
      "Terminal 7-10 San José → Santa Cruz → Nicoya → Tamarindo → Flamingo",
    horarios: ["06:00", "09:00", "12:00", "15:00", "17:30"],
    tipo: "Directo",
  },
  {
    origen: "San José",
    destino: "Puntarenas",
    tiempo: "2 horas",
    precios: {
      normal: "3,300,00",
      adultoMayor: "2,800,00",
    },
    imagen: "/images/search_bus_5.png",
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
  },
];

const params = new URLSearchParams(window.location.search);
const origen = params.get("origen");
const destino = params.get("destino");
const fecha = params.get("fecha");
const hora = params.get("hora");

const contenedorResultados = document.getElementById("resultsContainer");

if (!origen || !destino || !fecha || !hora) {
  contenedorResultados.innerHTML = `<h5>Selecione su ruta de viaje</h5>`;
} else {
  const resultados = rutas.filter(
    (r) =>
      r.origen === origen && r.destino === destino && r.horarios.includes(hora)
  );

  if (resultados.length === 0) {
    contenedorResultados.innerHTML =
      "<p>No se encontraron rutas disponibles para esta combinación y horario.</p>";
  } else {
    resultados.forEach((ruta) => {
      const html = `
                <article class="result">
                    <div class="one-fourth">
                      <img src="${ruta.imagen}" alt="Imagen de bus"/>
                    </div>
                    <div class="one-half">
                        <h3>${ruta.origen} - ${ruta.destino}
                            <a href="javascript:void(0)" class="trigger color" title="Información">Info</a>
                        </h3>
                        <ul>
                            <li>
                              <p><strong>${ruta.asientos} asientos</strong></p>
                            </li>
                            <li>
                              <p><strong>${ruta.equipaje} equipajes</strong></p>
                            </li>
                            <li>
                              <p>Tiempo: <strong>${ruta.tiempo}</strong></p>
                            </li>
                        </ul>
                    </div>
                    <div class="one-fourth">
                      <div>
                        <div class="price"><small>₡</small> ${
                          ruta.precios.normal
                        } </div>
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
                    <div class="full-width information">
                        <a href="javascript:void(0)" class="close color" title="Cerrar">X</a>
                        <p><strong>Paradas principales: </strong>${
                          ruta.descripcion
                        }</p>
                    </div>
                </article>
            `;
      contenedorResultados.insertAdjacentHTML("beforeend", html);
    });
  }
}
