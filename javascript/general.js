document.addEventListener('DOMContentLoaded', function() {
    var navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY < window.innerHeight) {
            navbar.style.backgroundColor = 'transparent';
        } else {
            navbar.style.backgroundColor = 'var(--background)';
        }
    });
});