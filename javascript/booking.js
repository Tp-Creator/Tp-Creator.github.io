function radioValue(elements) {
    for (var i=0; i<elements.length; i++) {
        if (elements[i].checked) {
            return elements[i].id;
        }
    }
}

function loadCalendar(monthDate=null, next=-3) {
    
    // Ändrar månad som ska visas om next anges som argument till funktionen
    // Och utgår från den här månaden om ingen månad anges i funktionen
    if (monthDate == null) {
        thisMonth = new Date();
        newDate = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + next, 01);
    }
    else {
        newDate = new Date(monthDate.getFullYear(), monthDate.getMonth() + next, 01);
    }

    console.log(newDate);

    // Hämtar vilken dag första dagen i månaden infaller
    // och ändrar söndag till 6 och måndag till 0
    let day = newDate.getDay();    
    if (day == 0) {
        day = 7;
    }
    day--;

    console.log(day);
    // console.log(firstDayOfMonth);
    // for (i = 0; i < nowDate.length; i++)
    // console.log(nowDate[i]);
}




document.addEventListener('DOMContentLoaded', function() {
    loadCalendar();

    let previous = document.getElementById('previous');
    let next = document.getElementById('next');
    
    let booking_state_radio = document.getElementsByName('booking_state');
    let booking_states = [];
    for (let i=0; i<booking_state_radio.length; i++) {
        booking_states.push(booking_state_radio[i].id)
    }
    
    next.addEventListener('click', function() {
        let booking_state = radioValue(booking_state_radio)
        
        console.log("hej")
        if (radioValue(document.getElementsByName(booking_state)) & booking_states.indexOf(booking_state)) {
            0
        }
    });
});

