// Página de inicio: buscador, video y testimonios.

setupBookingForm(document.querySelector(".booking-form"));

// Video en ventana modal
const videoDialog = document.querySelector(".video-dialog");
const video = videoDialog.querySelector("video");

document.querySelector("[data-open-video]").addEventListener("click", () => {
  videoDialog.showModal();
  video.play();
});

videoDialog.addEventListener("close", () => video.pause());
videoDialog.querySelector(".video-dialog__close").addEventListener("click", () => videoDialog.close());

// Testimonios: rotan cada 5 segundos, con puntos para elegir uno y pausa al pasar el mouse
const stage = document.querySelector(".testimonials__stage");
const testimonials = stage.querySelectorAll(".testimonial");
const dots = document.createElement("div");
dots.className = "testimonials__dots";
dots.innerHTML = [...testimonials]
  .map((_, i) => `<button class="testimonials__dot" type="button" aria-label="Ver testimonio ${i + 1}"></button>`)
  .join("");
stage.append(dots);

let activeTestimonial = 0;
let rotation;

function showTestimonial(index) {
  testimonials[activeTestimonial].classList.remove("is-active");
  dots.children[activeTestimonial].removeAttribute("aria-current");
  activeTestimonial = index;
  testimonials[index].classList.add("is-active");
  dots.children[index].setAttribute("aria-current", "true");
}

function startRotation() {
  clearInterval(rotation);
  rotation = setInterval(() => showTestimonial((activeTestimonial + 1) % testimonials.length), 5000);
}

dots.addEventListener("click", (event) => {
  const dot = event.target.closest(".testimonials__dot");
  if (!dot) return;
  showTestimonial([...dots.children].indexOf(dot));
  startRotation();
});

stage.addEventListener("mouseenter", () => clearInterval(rotation));
stage.addEventListener("mouseleave", startRotation);

showTestimonial(0);
startRotation();

// Precio "desde" de cada destino, tomado de los datos de rutas
document.querySelectorAll("[data-destino]").forEach((card) => {
  const ruta = findRoute("San José", card.dataset.destino);
  if (ruta) {
    card.querySelector(".destination-card__price").innerHTML = `Desde <strong>₡ ${ruta.precios.normal.toLocaleString("es-CR")}</strong>`;
  }
});
