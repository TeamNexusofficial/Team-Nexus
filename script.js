/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

/* Scroll reveal */
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));

/* Active nav highlight */
const navLinks = document.querySelectorAll(".bottom-nav a");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a =>
        a.classList.toggle(
          "active",
          a.getAttribute("href").slice(1) === entry.target.id
        )
      );
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll("section").forEach(sec =>
  sectionObserver.observe(sec)
);

/* Count up */
const counters = document.querySelectorAll(".count");
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let current = 0;

      const update = () => {
        current += Math.ceil(target / 60);
        if (current >= target) {
          el.textContent = target + "+";
        } else {
          el.textContent = current;
          requestAnimationFrame(update);
        }
      };
      update();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });

counters.forEach(c => counterObserver.observe(c));

/* Background particles */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let dotCount = window.innerWidth < 500 ? 30 : 60;

const dots = Array.from({ length: dotCount }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.8,
  vx: (Math.random() - 0.5) * 0.2,
  vy: (Math.random() - 0.5) * 0.2
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  dots.forEach(d => {
    d.x += d.vx;
    d.y += d.vy;

    if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();
