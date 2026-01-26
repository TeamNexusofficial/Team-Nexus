// Simple floating particles
const particles = document.getElementById("particles");

for (let i = 0; i < 40; i++) {
  const dot = document.createElement("span");
  dot.style.left = Math.random() * 100 + "%";
  dot.style.animationDuration = 5 + Math.random() * 10 + "s";
  particles.appendChild(dot);
}
