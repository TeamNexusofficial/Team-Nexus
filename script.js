document.addEventListener('DOMContentLoaded', () => {

    // FAQ Toggle Logic
    document.querySelectorAll('.faq-item').forEach(item => {
        const answer = item.querySelector('.faq-answer');

        item.addEventListener('click', () => {
            item.classList.toggle('active');

            // Smooth height animation
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
        });
    });

    // Smooth Scroll Tracking for Dock Highlighting
    const sections = document.querySelectorAll('section');
    const dockItems = document.querySelectorAll('.dock-item');

    window.addEventListener('scroll', () => {
        let current = "";
        const offset = window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset + offset >= sectionTop) {
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

});
