// Reveal case study tickets as they scroll into view.
// Respects prefers-reduced-motion by just showing everything immediately.

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const tickets = document.querySelectorAll(".ticket");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  tickets.forEach((ticket) => ticket.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  tickets.forEach((ticket) => observer.observe(ticket));
}
