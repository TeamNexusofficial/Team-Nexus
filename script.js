// 1. Generate Moving Stars Background
function createStars() {
    const container = document.getElementById('star-container');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size, position, and speed
        const size = Math.random() * 3 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        const duration = Math.random() * 10 + 5 + 's';
        star.style.animationDuration = duration;
        star.style.animationDelay = Math.random() * 5 + 's';

        container.appendChild(star);
    }
}

// 2. Animated Count-Up Logic
function animateCounts() {
    const stats = document.querySelectorAll('.stat-number');
    const speed = 100; // Lower is faster

    stats.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
}

// 3. Scroll Tracking & Dock Highlighting
const sections = document.querySelectorAll('section');
const dockItems = document.querySelectorAll('.dock-item');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    dockItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Initialize on load
window.onload = () => {
    createStars();
    
    // Animate stats when impact section comes into view
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animateCounts();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.impact'));
};
