function radioValue(elements) {
    for (var i=0; i<elements.length; i++) {
        if (elements[i].checked) {
            return elements[i].id;
        }
    }
}

function loadCalendarDays(monthDate=null, next=-27) {
    
    month = {};

    // Ändrar månad som ska visas om next anges som argument till funktionen
    // Och utgår från den här månaden om ingen månad anges i funktionen
    if (monthDate == null) {
        thisMonth = new Date();
        month.firstDate = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + next, 01);
    }
    else {
        month.firstDate = new Date(monthDate.getFullYear(), monthDate.getMonth() + next, 01);
    }

    // Hämtar sista dagen i månaden
    month.lastDate = new Date(month.firstDate.getFullYear(), month.firstDate.getMonth() + 1, 00);

    // Hämtar vilket index dagar har
    // ändrar söndag till 6 och måndag till 0
    let firstDay = month.firstDate.getDay();    
    if (firstDay == 0) {
        firstDay = 7;
    }
    let lastDay = month.lastDate.getDay();    
    if (lastDay == 0) {
        lastDay = 7;
    }
    // Sparar ned i objektet
    month.firstDay = firstDay-1;
    month.lastDay = lastDay-1;

    console.log(month.firstDay);
    console.log(month.firstDate);
    console.log(month.lastDay);
    console.log(month.lastDate);

    let squareMonth = month.firstDay+month.lastDate.getDate()+6-month.lastDay;
    month.amountOfWeeks = squareMonth/7;

    // let squareMonth2 = (6+month.firstDay-month.lastDay) + month.lastDate.getDate();
    // console.log(squareMonth);

    console.log("här är inget som vi bryr oss om:")


    // console.log(squareMonth2);
    console.log("squareMonth2");
    // month.amountOfWeeks = month.lastDate.getWeek();
    console.log(month.lastDate);
    console.log(month.amountOfWeeks);

    

    for (let i = 0; i < month.firstDate.day; i++){
        // document.createElement();
    }




    // return calendarDays;
}




document.addEventListener('DOMContentLoaded', function() {
    loadCalendarDays();

    let previous = document.getElementById('previous');
    let next = document.getElementById('next');
    
    let booking_state_radio = document.getElementsByName('booking_state');
    let booking_states = [];
    for (let i=0; i<booking_state_radio.length; i++) {
        booking_states.push(booking_state_radio[i].id)
    }
    
    next.addEventListener('click', function() {
        let booking_state = radioValue(booking_state_radio)
        let index = booking_states.indexOf(booking_state);
        if (radioValue(document.getElementsByName(booking_state)) && index+1<booking_states.length) {
            booking_state_radio[index+1].disabled = false;
            booking_state_radio[index+1].checked = true;
        }
    });
    previous.addEventListener('click', function() {
        let booking_state = radioValue(booking_state_radio)
        let index = booking_states.indexOf(booking_state);
        if (index) {
            booking_state_radio[index-1].checked = true;
        }
    });
});

