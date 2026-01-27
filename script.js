// 1. Animated Starfield Background
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.2
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        s.y -= s.speed; // Move up
        if (s.y < 0) s.y = canvas.height;
    });
    requestAnimationFrame(animateStars);
}

// 2. Animated Counter Logic
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(s => {
        const target = +s.getAttribute('data-target');
        let current = 0;
        const increment = target / 50;
        const update = () => {
            if (current < target) {
                current += increment;
                s.innerText = Math.ceil(current) + "+";
                setTimeout(update, 20);
            } else {
                s.innerText = target + "+";
            }
        };
        update();
    });
}

// 3. Scroll Tracking for Dock
window.addEventListener('scroll', () => {
    let current = "";
    document.querySelectorAll('section').forEach(section => {
        if (pageYOffset >= (section.offsetTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.dock-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) item.classList.add('active');
    });
});

window.addEventListener('resize', initStars);
window.onload = () => {
    initStars();
    animateStars();
    
    // Animate stats when visible
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(document.querySelector('.impact'));
};
