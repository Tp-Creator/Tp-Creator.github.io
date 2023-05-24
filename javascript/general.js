document.addEventListener('DOMContentLoaded', function() {
    var navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY < window.innerHeight*0.9) {
            navbar.style.backgroundColor = 'transparent';
        } else {
            navbar.style.backgroundColor = 'var(--background)';
        }
    });
});