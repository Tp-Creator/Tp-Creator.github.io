document.addEventListener('DOMContentLoaded', function() {
    var previous = document.getElementById('previous');
    var next = document.getElementById('next');

    var booking_state = document.getElementsByName('booking_state');
    
    previous.addEventListener('click', function() {
        console.log(radioValue(booking_state))
        alert("hej");
    });
});

function radioValue(elements) {
    for (var i=0; i<elements.length; i++) {
        if (elements[i].checked) {
            return elements[i];
        }
    }
}