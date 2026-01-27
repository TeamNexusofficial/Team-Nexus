/* ===============================
   Smooth Scroll
================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* ===============================
   Hero Text Animation (staggered)
================================ */
window.addEventListener("load", () => {
  const items = document.querySelectorAll(
    ".hero-tag-wrap, .hero-brand, .hero-explain, .hero-main, .hero-desc"
  );

  items.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = "opacity .8s ease, transform .8s ease";
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, i * 120);
  });
});


/* ===============================
   FAQ Toggle
================================ */
document.querySelectorAll(".faq-item button").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const arrow = btn.querySelector("span");

    const isOpen = content.style.display === "block";
    document.querySelectorAll(".faq-item p").forEach(p => p.style.display = "none");
    document.querySelectorAll(".faq-item span").forEach(s => s.style.transform = "rotate(0deg)");

    if (!isOpen) {
      content.style.display = "block";
      arrow.style.transform = "rotate(180deg)";
    }
  });
});


/* ===============================
   Count-Up (Impact Section)
================================ */
const counters = document.querySelectorAll(".count");

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let current = 0;

      const step = Math.ceil(target / 60);

      function update() {
        current += step;
        if (current >= target) {
          el.textContent = target + "+";
        } else {
          el.textContent = current;
          requestAnimationFrame(update);
        }
      }

      update();
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });

counters.forEach(c => countObserver.observe(c));


/* ===============================
   Particle Background
================================ */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = Array.from({ length: 70 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.6 + 0.4,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35
}));

function animateParticles() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();
