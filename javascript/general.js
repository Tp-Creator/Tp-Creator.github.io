document.addEventListener('DOMContentLoaded', function() {
    var navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        console.log(window.innerHeight)
        if (window.scrollY < 10) {
            navbar.style.backgroundColor = 'transparent';
        } else {
            navbar.style.backgroundColor = 'var(--background)';
        }
    });
});