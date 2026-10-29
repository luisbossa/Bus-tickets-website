// Servicios: precio "desde" de cada tipo de tiquete, calculado con los datos de rutas.

document.querySelectorAll("[data-min-price]").forEach((el) => {
  const min = Math.min(...ROUTES.map((ruta) => ruta.precios[el.dataset.minPrice]));
  el.textContent = `₡ ${min.toLocaleString("es-CR")}`;
});
