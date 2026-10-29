// Contadores numéricos: animan de 0 al valor de data-count-to al entrar en pantalla.

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    counterObserver.unobserve(entry.target);
    const target = Number(entry.target.dataset.countTo);
    const start = performance.now();
    const duration = 2000;
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      entry.target.textContent = Math.round(target * progress);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
});

document.querySelectorAll("[data-count-to]").forEach((counter) => counterObserver.observe(counter));
