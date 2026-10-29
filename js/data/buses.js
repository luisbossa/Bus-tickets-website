// Flota de buses: alimenta el listado, la ficha de detalle y las tarjetas del inicio.
// Las especificaciones son las publicadas por cada fabricante (ver `fuente`). Si un dato no está
// confirmado, se omite: la ficha solo muestra las filas que existen.

const AMENITIES = {
  tv: { icon: "fas fa-tv", label: "Pantallas a bordo" },
  enchufe: { icon: "fas fa-plug", label: "Puertos USB / tomas de corriente" },
  bano: { icon: "fas fa-toilet", label: "Baño" },
  wifi: { icon: "fas fa-wifi", label: "Wi-Fi" },
  aire: { icon: "fas fa-snowflake", label: "Aire acondicionado" },
  reclinable: { icon: "fas fa-couch", label: "Asientos reclinables" },
  bodega: { icon: "fas fa-suitcase", label: "Bodega de equipaje" },
  accesible: { icon: "fas fa-wheelchair", label: "Acceso para silla de ruedas" },
};

// Etiquetas de la ficha técnica, en el orden en que se muestran
const SPEC_LABELS = {
  fabricante: "Fabricante",
  tipo: "Tipo",
  largo: "Largo",
  ancho: "Ancho",
  altura: "Altura",
  asientos: "Capacidad",
  motor: "Motor",
  potencia: "Potencia",
  transmision: "Transmisión",
  combustible: "Combustible",
  normativa: "Normativa",
};

const BUSES = [
  {
    slug: "scania-touring-hd",
    tarjeta: { marca: "Scania", capacidad: "Hasta 63", uso: "Larga distancia" },
    nombre: "Scania Touring HD",
    imagen: "/images/bus_1.webp",
    imagenDetalle: "/images/detail_bus_2.webp",
    facilidades: ["aire", "reclinable", "enchufe", "wifi", "bano", "bodega"],
    descripcion:
      "Autocar de turismo de piso alto construido sobre el chasis Scania K. Combina el motor de 13 litros de Scania con la caja automatizada Opticruise y puede funcionar con diésel, biodiésel o HVO (diésel renovable). Su carrocería alta deja una bodega amplia para el equipaje, ideal para rutas largas como Guanacaste.",
    specs: {
      fabricante: "Scania (Suecia)",
      tipo: "Autocar de larga distancia",
      largo: "12,1 – 13,7 m (según versión)",
      ancho: "2,55 m",
      altura: "3,80 m",
      asientos: "Hasta 63 pasajeros",
      motor: "Scania 13 litros, 6 cilindros",
      potencia: "410 hp · 2 150 Nm",
      transmision: "Scania Opticruise automatizada",
      combustible: "Diésel, biodiésel o HVO",
      normativa: "Euro 6",
    },
    fuente: "https://www.scania.com/uk/en/home/products/buses-and-coaches/scania-touring-hd.html",
  },
  {
    slug: "marcopolo-paradiso-g8",
    tarjeta: { marca: "Marcopolo", capacidad: "Hasta 60", uso: "Larga distancia" },
    nombre: "Marcopolo Paradiso G8 1200",
    imagen: "/images/bus_3.webp",
    imagenDetalle: "/images/detail_bus_3.webp",
    facilidades: ["aire", "reclinable", "enchufe", "wifi", "bano", "bodega"],
    descripcion:
      "Carrocería de la octava generación (G8) de Marcopolo, fabricante brasileño cuya familia G8 supera las 10 000 unidades vendidas en más de 20 países. Es el modelo de entrada de la familia Paradiso y se monta sobre chasis de distintas marcas, como el Mercedes-Benz O-500 RS. En configuración semicama ofrece asientos con apoyapiernas.",
    specs: {
      fabricante: "Marcopolo (Brasil)",
      tipo: "Autocar de larga distancia",
      largo: "13,5 – 14 m (según chasis)",
      asientos: "44 a 60 pasajeros (según configuración)",
      motor: "Según chasis (p. ej. Mercedes-Benz O-500 RS)",
    },
    fuente: "https://diariodotransporte.com.br/2026/07/28/grupo-guanabara-recebe-70-novos-onibus-marcopolo-g8-em-renovacao-de-frota-rodoviaria/",
  },
  {
    slug: "man-lions-coach",
    tarjeta: { marca: "MAN", capacidad: "Hasta 57", uso: "Larga distancia" },
    nombre: "MAN Lion's Coach C",
    imagen: "/images/buses_3.webp",
    imagenDetalle: "/images/detail_bus_4.webp",
    facilidades: ["aire", "reclinable", "enchufe", "wifi", "bano", "bodega"],
    descripcion:
      "Autocar alemán de tres ejes, la versión más larga de la familia Lion's Coach. Usa el motor MAN D26 de 12,4 litros y la caja automatizada MAN TipMatic de 12 velocidades. Tiene capacidad para 57 pasajeros y casi 12 m³ de bodega.",
    specs: {
      fabricante: "MAN (Alemania)",
      tipo: "Autocar de larga distancia, 3 ejes",
      largo: "13,4 m",
      ancho: "2,55 m",
      altura: "3,87 m",
      asientos: "Hasta 57 pasajeros",
      motor: "MAN D26, 12,4 litros, 6 cilindros",
      potencia: "440 – 520 hp · 2 250 – 2 650 Nm",
      transmision: "MAN TipMatic automatizada, 12 velocidades",
    },
    fuente: "https://www.man.eu/global/en/bus/coaches/the-man-lion_s-coach/technology-and-specifications/man-lion_s-coach-technical-data.html",
  },
  {
    slug: "yutong-c12",
    tarjeta: { marca: "Yutong", capacidad: "Hasta 57", uso: "Interurbano" },
    nombre: "Yutong C12",
    imagen: "/images/buses_4.webp",
    imagenDetalle: "/images/detail_bus_1.webp",
    facilidades: ["aire", "reclinable", "enchufe", "wifi", "bodega"],
    descripcion:
      "Autocar de 12 metros de Yutong, el mayor fabricante de buses de China y uno de los más grandes del mundo. Pensado para servicios interurbanos y de turismo, con capacidad para 53 o 57 pasajeros según la distribución de asientos.",
    specs: {
      fabricante: "Yutong (China)",
      tipo: "Autocar interurbano",
      largo: "12,37 m",
      ancho: "2,50 m",
      altura: "3,66 m",
      asientos: "53 o 57 pasajeros + conductor",
      normativa: "Euro VI",
    },
    fuente: "https://wwwpktest.yutong.com/products/C12.shtml",
  },
  {
    slug: "busscar-urbanuss-pluss",
    tarjeta: { marca: "Busscar", capacidad: "39 sentados", uso: "Trayecto corto" },
    nombre: "Busscar Urbanuss Pluss",
    imagen: "/images/bus_2.webp",
    imagenDetalle: "/images/detail_bus_5.webp",
    facilidades: ["aire", "wifi"],
    descripcion:
      "Bus de carrocería brasileña diseñado para servicio urbano y de trayectos cortos. Tiene tres puertas anchas y espacio para pasajeros de pie, pensado para trayectos cortos con mucho ascenso y descenso. Busscar dejó de fabricarlo y hoy su producción continúa bajo la marca Nova Busscar.",
    specs: {
      fabricante: "Busscar (Brasil)",
      tipo: "Bus urbano / trayecto corto",
      largo: "12,2 m",
      asientos: "39 sentados + 32 de pie",
      motor: "Diésel, según chasis",
    },
    fuente: "https://www.tribunapr.com.br/noticias/automoveis/onibus-urbano-ecologico-e-confortavel/",
  },
  {
    slug: "mci-j4500",
    tarjeta: { marca: "MCI", capacidad: "Hasta 60", uso: "Larga distancia" },
    nombre: "MCI J4500",
    imagen: "/images/buses_1.webp",
    imagenDetalle: "/images/detail_bus_6.webp",
    facilidades: ["aire", "reclinable", "enchufe", "wifi", "bano", "bodega", "accesible"],
    descripcion:
      "Autocar norteamericano de 45 pies de Motor Coach Industries, muy extendido en Estados Unidos y Canadá para viajes de larga distancia. Tiene puertos USB-A y USB-C en cada asiento, opción de baño y de elevador para silla de ruedas, y control crucero adaptativo con mitigación de colisiones.",
    specs: {
      fabricante: "Motor Coach Industries (EE. UU.)",
      tipo: "Autocar de larga distancia, 3 ejes",
      largo: "13,9 m (45 pies 7 pulgadas)",
      ancho: "2,59 m",
      altura: "3,60 m",
      asientos: "56 pasajeros (hasta 60)",
      combustible: "Diésel, tanque de 757 litros",
    },
    fuente: "https://www.mcicoach.com/coach/j-series/",
  },
];

const busUrl = (bus) => `/pages/bus.html?modelo=${bus.slug}`;
