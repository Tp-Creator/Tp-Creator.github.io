function fadeInElements(){
        // Hämtar alla element med classen för att fade:a in
        let reveals = document.querySelectorAll(".reveal-on-scroll");

        // Loopar över alla element och kollar var de är i jämförelse med
        // hut långt vi har scrollat
        // (Var de just nu är på skärmens yta)
        for (let i = 0; i < reveals.length; i++) {

            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 150;
        
            //  Om elementets topp är 150 px över undre kanten av skärmen visar vi dem
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("scroll-active");
            
                // Annars slutar vi visa dem
            } else {
                reveals[i].classList.remove("scroll-active");
            }
        }
    }

// Funktion för att uppdatera navbarens opacity beroende på
// vilken höjd användaren scrollat till
function updateNavOpacity(){
    // Hämtar navbaren
    let navbar = document.getElementById('nav-content');

    // Kollar om vi scrollat längre ned än vad heron är lång
    // (Skärmens höjd)
    // Och ändrar sedan background color till --background om vi är under Heron
    if (window.scrollY < window.innerHeight && window.innerWidth > 750) {
        navbar.style.backgroundColor = 'transparent';
    } else {
        navbar.style.backgroundColor = 'var(--background)';
    }
}
    
// När dokumentet laddats in lägger vi till våra eventlistners
// (Man kan egentligen göra det innan, men eftersom elementen inte
// ännu skapats är det bäst att vänta så att vi inte får att den letar efter
// element som inte finns).
document.addEventListener('DOMContentLoaded', function() {
    // Navbar-content
    let navbarContent = document.getElementById("nav-content");

    // bla bla
    window.addEventListener("resize", function() {
        updateNavOpacity();
        if (window.innerWidth > 750) {
            navbarContent.style.display = "flex";
        }
        else {
            navbarContent.style.display = "";
        }
    });
    
    // Saker som skall hända när man skrollar
    window.addEventListener("scroll", function(){
        fadeInElements();
        updateNavOpacity();
    });

    // För att visa navbaren i mobilläge när man trycker på menyn
    document.getElementById("navbar-menu").addEventListener("click", function(){
        if (navbarContent.style.display == "flex"){
            
            // Gömmer navbar-content
            navbarContent.style.display = "none";

            // Stylar tillbaka knappen
            this.style.backgroundColor = "";
            this.style.color = "";
            this.style.boxShadow = "";
        }
        else {
            
            // Visar navbar-menyn
            navbarContent.style.display = "flex";
            
            // Stylar om knappen så man ser vad som händer
            this.style.backgroundColor = "transparent";
            this.style.color = "var(--nav-main)";
            this.style.boxShadow = "inset 0px 0px 0px 2px var(--nav-main)";

        }
    })

});