document.querySelectorAll('.flag').forEach(element => {
    element.addEventListener('touchstart', () => {
        element.classList.add('hover-active');
    });

    element.addEventListener('touchend', () => {
        element.classList.remove('hover-active');
    });

    element.addEventListener('mousemove', () => {
        element.classList.add('hover-active');
    });

    element.addEventListener('mouseleave', () => {
        element.classList.remove('hover-active');
    });
});