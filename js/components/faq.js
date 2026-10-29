// Preguntas frecuentes: cada lista reserva la altura que ocupa con su respuesta más larga abierta.
// Como solo puede haber una pregunta abierta por grupo, así abrir o cerrar no mueve el resto de la página.

function reserveFaqHeight(list) {
  const items = [...list.querySelectorAll(".faq-item")];
  const wasOpen = items.filter((item) => item.open);

  list.style.minHeight = "";
  list.classList.add("is-measuring"); // sin animación, para medir la altura final al instante

  let tallest = list.offsetHeight;
  for (const item of items) {
    items.forEach((other) => (other.open = other === item));
    tallest = Math.max(tallest, list.offsetHeight);
  }

  items.forEach((item) => (item.open = wasOpen.includes(item)));
  list.classList.remove("is-measuring");
  list.style.minHeight = `${tallest}px`;
}

const faqLists = document.querySelectorAll(".faq-list");
const reserveAll = () => faqLists.forEach(reserveFaqHeight);

reserveAll();
// Las fuentes cambian la altura del texto al terminar de cargar
document.fonts?.ready.then(reserveAll);

let resizeTimer;
addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(reserveAll, 150);
});
