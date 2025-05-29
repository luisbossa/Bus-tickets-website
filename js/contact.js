document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".metform-form-content");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    // Limpiar mensajes de error previos
    form
      .querySelectorAll(".mf-error-message")
      .forEach((el) => (el.textContent = ""));

    const nombre = form.querySelector('input[name="mf-listing-fname"]');
    const correo = form.querySelector('input[name="mf-email"]');
    const asunto = form.querySelector('input[name="mf-text"]');
    const mensaje = form.querySelector('textarea[name="mf-textarea"]');

    // Validaciones
    if (!nombre.value.trim()) {
      nombre.nextElementSibling.textContent = "Por favor ingresa tu nombre";
      isValid = false;
    }

    if (!correo.value.trim()) {
      correo.nextElementSibling.textContent = "Por favor ingresa tu correo";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {
      correo.nextElementSibling.textContent = "Correo no válido";
      isValid = false;
    }

    if (!asunto.value.trim()) {
      asunto.nextElementSibling.textContent = "Por favor ingresa el asunto";
      isValid = false;
    }

    if (!mensaje.value.trim()) {
      mensaje.nextElementSibling.textContent = "Por favor ingresa tu mensaje";
      isValid = false;
    }

    if (isValid) {
      mostrarNotificacion("Mensaje fue enviado correctamente");
      form.reset();
    }
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
