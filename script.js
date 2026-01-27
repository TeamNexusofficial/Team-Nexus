// FAQ Toggle Logic
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        // Toggle Active State
        item.classList.toggle('active');
        
        // Rotate Icon
        const icon = item.querySelector('i');
        if (item.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

// Smooth Scroll Tracking for Dock Highlighting
const sections = document.querySelectorAll('section');
const dockItems = document.querySelectorAll('.dock-item');

window.addEventListener('scroll', () => {
    let current = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // If the scroll position is within the section
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    dockItems.forEach(item => {
        item.classList.remove('active');
        // Check if the link target matches the section currently in view
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Mobile Horizontal Scroll Prevention Fix
window.addEventListener('resize', () => {
    document.body.style.width = window.innerWidth + 'px';
});
