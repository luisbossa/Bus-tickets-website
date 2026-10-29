// Encabezado, pie de página y utilidades compartidas por todas las páginas.

const NAV_LINKS = [
  { href: "/index.html", label: "Inicio" },
  { href: "/pages/about.html", label: "Nosotros" },
  { href: "/pages/services.html", label: "Servicios" },
  { href: "/pages/schedule.html", label: "Horarios" },
  {
    label: "Buses",
    children: [
      { href: "/pages/buses.html", label: "Nuestros Buses" },
      { href: "/pages/bus.html?modelo=scania-touring-hd", label: "Bus a Detalle" },
    ],
  },
  { href: "/pages/contact.html", label: "Contacto" },
];

const currentPath = location.pathname === "/" ? "/index.html" : location.pathname;

function navItem(link) {
  if (!link.children) {
    const current = link.href === currentPath ? ' aria-current="page"' : "";
    return `<li><a class="main-nav__link" href="${link.href}"${current}>${link.label}</a></li>`;
  }
  const submenu = link.children
    .map((child) => `<li><a href="${child.href}">${child.label}</a></li>`)
    .join("");
  // El grupo se resalta si la página actual es uno de sus enlaces (ignorando ?parámetros)
  const active = link.children.some((child) => child.href.split("?")[0] === currentPath) ? " is-active" : "";
  return `
    <li class="main-nav__item--has-submenu">
      <button class="main-nav__link${active}" type="button" aria-haspopup="true">
        ${link.label} <i class="fas fa-chevron-down" aria-hidden="true"></i>
      </button>
      <ul class="main-nav__submenu">${submenu}</ul>
    </li>`;
}

document.querySelector(".site-header").innerHTML = `
  <a class="site-header__logo" href="/index.html">
    <img src="/images/logo.webp" alt="Busena" width="110" height="60" />
  </a>
  <nav class="main-nav" aria-label="Principal">
    <button class="main-nav__toggle" type="button" aria-label="Abrir menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="main-nav__panel">
      <button class="main-nav__close" type="button" aria-label="Cerrar menú">X</button>
      <ul class="main-nav__list">${NAV_LINKS.map(navItem).join("")}</ul>
    </div>
    <div class="main-nav__backdrop" aria-hidden="true"></div>
  </nav>
  <div class="site-header__actions">
    <p class="site-header__contact">
      <strong>Contáctanos</strong>
      <a href="tel:+50622550093">+(506) 2255-0093</a>
    </p>
    <a class="button site-header__cta" href="/pages/search.html">
      <i class="fas fa-ticket-alt" aria-hidden="true"></i> Comprar tiquete
    </a>
  </div>
`;

const footerLinks = NAV_LINKS.flatMap((link) => link.children || [link])
  .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
  .join("");

document.querySelector(".site-footer").innerHTML = `
  <div class="site-footer__main">
    <section class="site-footer__brand">
      <a href="/index.html">
        <img class="site-footer__logo" src="/images/footer_logo.png" alt="Busena" />
      </a>
      <p>Con más de 30 años en el mercado, perfeccionando cada detalle para ofrecerte una mejor calidad en cada trayecto.</p>
      <a class="button" href="/pages/search.html"><i class="fas fa-ticket-alt" aria-hidden="true"></i> Comprar tiquete</a>
    </section>
    <nav aria-label="Enlaces del sitio">
      <h2>Navegación</h2>
      <ul>${footerLinks}</ul>
    </nav>
    <section>
      <h2>Soporte</h2>
      <ul>
        <li><a href="/pages/legal.html#privacidad">Política de Privacidad</a></li>
        <li><a href="/pages/legal.html#terminos">Términos &amp; Condiciones</a></li>
        <li><a href="/pages/faq.html">Preguntas &amp; Respuestas</a></li>
      </ul>
    </section>
    <section>
      <h2>Contacto</h2>
      <ul class="site-footer__contact">
        <li><i class="fas fa-phone-alt" aria-hidden="true"></i><a href="tel:+50622550093">+(506) 2255-0093</a></li>
        <li><i class="fas fa-envelope" aria-hidden="true"></i><a href="mailto:contacto@busena.co.cr">contacto@busena.co.cr</a></li>
        <li><i class="fas fa-map-marker-alt" aria-hidden="true"></i><span>San José, Escazú, frente a Vista Real.</span></li>
      </ul>
    </section>
  </div>
  <div class="site-footer__bottom">
    <p>© ${new Date().getFullYear()} Busena S.A. Todos los derechos reservados.</p>
    <button class="site-footer__top" type="button" aria-label="Volver arriba">
      <i class="fas fa-arrow-up" aria-hidden="true"></i>
    </button>
  </div>
`;

document.querySelector(".site-footer__top").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

// Menú móvil
const nav = document.querySelector(".main-nav");
const navToggle = nav.querySelector(".main-nav__toggle");

function setMenuOpen(open) {
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("is-locked", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

navToggle.addEventListener("click", () => setMenuOpen(true));
nav.querySelector(".main-nav__close").addEventListener("click", () => setMenuOpen(false));
nav.querySelector(".main-nav__backdrop").addEventListener("click", () => setMenuOpen(false));
nav.querySelectorAll(".main-nav__panel a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) setMenuOpen(false);
});

// Sombra en la cabecera al hacer scroll
const header = document.querySelector(".site-header");
const updateHeader = () => header.classList.toggle("is-scrolled", scrollY > 10);
addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Notificación flotante reutilizable
const notification = document.createElement("p");
notification.className = "notification";
notification.setAttribute("role", "status");
document.body.append(notification);

let notificationTimer;

function notify(message, duration = 4000) {
  notification.textContent = message;
  notification.classList.add("is-visible");
  clearTimeout(notificationTimer);
  notificationTimer = setTimeout(() => notification.classList.remove("is-visible"), duration);
}
