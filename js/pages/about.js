// Nosotros: las cifras se calculan con los datos del sitio y luego las anima counter.js.

const stats = {
  rutas: ROUTES.length,
  salidas: ROUTES.reduce((total, ruta) => total + ruta.horarios.length, 0),
  modelos: BUSES.length,
};

document.querySelectorAll("[data-stat]").forEach((el) => {
  el.dataset.countTo = stats[el.dataset.stat];
});
