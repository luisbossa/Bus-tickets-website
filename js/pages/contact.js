// Formulario de contacto: validación, contador de caracteres y estado de envío.

const contactForm = document.querySelector(".contact-form");
const submitButton = contactForm.querySelector("[type=submit]");
const message = contactForm.elements.mensaje;
const counter = contactForm.querySelector("[data-counter]");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules = {
  nombre: (value) => (value ? "" : "Por favor ingresa tu nombre"),
  correo: (value) => {
    if (!value) return "Por favor ingresa tu correo";
    return EMAIL_PATTERN.test(value) ? "" : "Correo no válido";
  },
  asunto: (value) => (value ? "" : "Selecciona el motivo de tu consulta"),
  referencia: (value) => (!value || /^\d{9}$/.test(value) ? "" : "El código de reserva tiene 9 dígitos"),
  mensaje: (value) => (value.length >= 10 ? "" : "Cuéntanos un poco más (mínimo 10 caracteres)"),
};

function showError(input, error) {
  input.closest(".field").querySelector(".field__error").textContent = error;
  input.setAttribute("aria-invalid", String(Boolean(error)));
}

// Al corregir un campo con error, el mensaje desaparece en cuanto el valor es válido
contactForm.addEventListener("input", (event) => {
  const { name } = event.target;
  if (rules[name] && event.target.getAttribute("aria-invalid") === "true") {
    showError(event.target, rules[name](event.target.value.trim()));
  }
});

message.addEventListener("input", () => {
  counter.textContent = `${message.value.length} / ${message.maxLength}`;
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let firstInvalid = null;

  for (const [name, validate] of Object.entries(rules)) {
    const input = contactForm.elements[name];
    const error = validate(input.value.trim());
    showError(input, error);
    if (error && !firstInvalid) firstInvalid = input;
  }

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  // El sitio no tiene servidor: se simula el envío
  submitButton.disabled = true;
  submitButton.innerHTML = `<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Enviando…`;
  setTimeout(() => {
    notify("Mensaje enviado correctamente. Te responderemos por correo.");
    contactForm.reset();
    counter.textContent = `0 / ${message.maxLength}`;
    submitButton.disabled = false;
    submitButton.innerHTML = `<i class="fas fa-paper-plane" aria-hidden="true"></i> Enviar mensaje`;
  }, 800);
});

// Permite enlazar con un motivo ya elegido: contact.html?motivo=Servicio de paquetería
const motivo = new URLSearchParams(location.search).get("motivo");
if (motivo && [...contactForm.elements.asunto.options].some((option) => option.value === motivo)) {
  contactForm.elements.asunto.value = motivo;
}
