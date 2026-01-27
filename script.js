// 1. Moving White Dots (Stars) Generation
function initStars() {
    const container = document.getElementById('star-container');
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 10 + 5) + 's';
        star.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(star);
    }
}

// 2. Count-up Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(s => {
        const target = +s.getAttribute('data-target');
        let count = 0;
        const speed = target / 50;
        const update = () => {
            if (count < target) {
                count += speed;
                s.innerText = Math.ceil(count);
                setTimeout(update, 30);
            } else {
                s.innerText = target + "+";
            }
        };
        update();
    });
}

// 3. Scroll Tracking & FAQ Toggle
const sections = document.querySelectorAll('section');
const dockItems = document.querySelectorAll('.dock-item');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        if (pageYOffset >= (section.offsetTop - section.clientHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    dockItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) item.classList.add('active');
    });
});

document.querySelectorAll('.faq-item').forEach(f => {
    f.addEventListener('click', () => f.classList.toggle('active'));
});

// Start everything on load
window.onload = () => {
    initStars();
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(document.querySelector('.impact'));
};
