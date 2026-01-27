// 1. Moving Dots
function initStars() {
    const container = document.getElementById('star-container');
    for (let i = 0; i < 70; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 10 + 5) + 's';
        star.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(star);
    }
}

// 2. Count Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(s => {
        const target = +s.getAttribute('data-target');
        let count = 0;
        const speed = target / 40;
        const update = () => {
            if (count < target) {
                count += speed;
                s.innerText = Math.ceil(count) + "+";
                setTimeout(update, 30);
            } else { s.innerText = target + "+"; }
        };
        update();
    });
}

// 3. Scroll Tracking
window.addEventListener('scroll', () => {
    let current = "";
    document.querySelectorAll('section').forEach(section => {
        if (pageYOffset >= (section.offsetTop - 300)) current = section.getAttribute('id');
    });
    document.querySelectorAll('.dock-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) item.classList.add('active');
    });
});

document.querySelectorAll('.faq-item').forEach(f => {
    f.addEventListener('click', () => f.classList.toggle('active'));
});

window.onload = () => {
    initStars();
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { animateStats(); observer.disconnect(); }
    }, { threshold: 0.5 });
    observer.observe(document.querySelector('.impact'));
};
