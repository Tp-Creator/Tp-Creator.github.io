function radioValue(elements) {
    for (var i=0; i<elements.length; i++) {
        if (elements[i].checked) {
            return elements[i].id;
        }
    }
}



function updateCalendar(difference=0) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Objekt vi sparar ned data i
    month = {};


    // Tar bort alla gamla veckor som vi tidigare skapat
    let oldWeeks = document.getElementsByClassName("calendar-week");

    // Tar bort element så länge det finns i array:n
    // (for-loop fungerade inte av ngn andledning)
    while(oldWeeks[0]) {
        oldWeeks[0].remove();
    }


    // Hämtar första och sista dagen i månaden som skall visas. difference gör att månaden ändras
    month.today = new Date();
    // month.today = new Date("2023-03-29");
    month.firstDate = new Date(month.today.getFullYear(), month.today.getMonth() + difference,     01);
    month.lastDate  = new Date(month.today.getFullYear(), month.today.getMonth() + difference + 1, 00); // 00 ger sista datumet i förra månaden

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


    // Beräknar hur många veckor som finns i den här månaden
    month.amountOfWeeks = (month.firstDay+month.lastDate.getDate()+6-month.lastDay)/7;


    // Loopar över antalet veckor och skapar en input och en label för varje dag
    for (let w = 0; w < month.amountOfWeeks; w++) {

        // Skapar upp en div som representerar en vecka samt lägger till classer
        week = document.createElement("div");
        week.setAttribute("class", "flex-horizontal calendar-week");
        
        // Loopar för varje dag i veckan
        for (let d = 0; d < 7; d++){

            // skapar en radio och sätter dit allmänna attribut
            let input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("name", "date");
            input.setAttribute("id", "date-"+(w*7+d))
            
            // skapar en label till radio:n och sätter dit allmänna attribut
            label = document.createElement("label");
            label.setAttribute("for", "date-"+(w*7+d));
            

            // Om första veckan i månaden inte börjar med måndag,
            // lägger vi först till de dagar som var sist i förra månaden
            if (w == 0 && month.firstDay > d) {
                dateNumber = new Date(month.firstDate.getFullYear(), month.firstDate.getMonth(), d-month.firstDay+1).getDate();
                input.setAttribute("value", "p"+dateNumber);
                label.innerHTML = dateNumber;

                // klasser beroende på om dagen är tillgänglig osv...
                if (difference == 1 && month.today.getDate() == dateNumber) {
                    label.setAttribute("class", "today-out");
                }
                else if (difference >= 2 || (difference == 1 && dateNumber > month.today.getDate())) {
                    label.setAttribute("class", "available-out");
                }
                else {
                    label.setAttribute("class", "unavailable-out");
                }
            }

            // för de sista dagarna i månaden om månaden inte slutar med en söndag
            else if (w == month.amountOfWeeks-1 && month.lastDay < d) {
                dateNumber = new Date(month.firstDate.getFullYear(), month.firstDate.getMonth()+1, d-month.lastDay).getDate();
                input.setAttribute("value", "n"+dateNumber);
                label.innerHTML = dateNumber;

                // klasser beroende på om dagen är tillgänglig osv...
                if (difference == -1 && month.today.getDate() == dateNumber) {
                    label.setAttribute("class", "today-out");
                }
                else if (difference >= 0 || (difference == -1 && dateNumber > month.today.getDate())) {
                    label.setAttribute("class", "available-out");
                }
                else {
                    label.setAttribute("class", "unavailable-out");
                }
            }

            // Om det är en del av månaden lägger vi bara till den enkelt:
            else {
                dateNumber = w*7+d - month.firstDay + 1

                input.setAttribute("value", dateNumber);
                label.innerHTML = dateNumber;

                // klasser beroende på om dagen är tillgänglig osv...
                if (difference == 0 && dateNumber == month.today.getDate()) {
                    label.setAttribute("class", "today");
                }
                else if (difference >= 0 && (difference >= 1 || dateNumber > month.today.getDate())){
                    label.setAttribute("class", "available");
                }
                else {
                    label.setAttribute("class", "unavailable");
                }
            }


        // Kollar om vi ska lägga till att en dag är vald

            // Hämtar datan som finns i value
            date = input.getAttribute("value");
            
            // beroende på om date börjar med "n", "p" eller siffra så är det i nästa, föregående
            // eller nuvarande månad skapar vi olika datum
            if (date[0] == "n") {
                date = new Date(month.today.getFullYear(), month.today.getMonth() + window.calendarMonth + 1, date.substring(1))
            }
            else if (date[0] == "p") {
                date = new Date(month.today.getFullYear(), month.today.getMonth() + window.calendarMonth - 1, date.substring(1))
            }
            else {
                date = new Date(month.today.getFullYear(), month.today.getMonth() + window.calendarMonth, date)
            }
       
            // För att kunna jämföra datumen
            stringDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()


            // sätter attributet till checked om den dagen är vald
            if (stringDate == window.selectedDate) {
                input.setAttribute("checked", "checked")
            }


            if (label.getAttribute("class") != "unavailable" && label.getAttribute("class") != "unavailable-out"){
                // När man klickar på en dag så sparar vi ned datumet på den dagen.
                input.addEventListener("change", function(){
                    
                    thisDate = new Date();
                    
                    // Hämtar datan som finns i value
                    date = this.getAttribute("value");
                    
                    // beroende på om date börjar med "n", "p" eller siffra så är det i nästa, föregående
                    // eller nuvarande månad.
                    if (date[0] == "n") {
                        selected = new Date(thisDate.getFullYear(), thisDate.getMonth() + window.calendarMonth + 1, date.substring(1))
                        window.calendarMonth++;
                    }
                    else if (date[0] == "p") {
                        selected = new Date(thisDate.getFullYear(), thisDate.getMonth() + window.calendarMonth - 1, date.substring(1))
                        window.calendarMonth--;
                    }
                    else {
                        selected = new Date(thisDate.getFullYear(), thisDate.getMonth() + window.calendarMonth, date)
                    }
    
                    // Sparar ned datumet i global variabel som en string
                    window.selectedDate = selected.getFullYear()+"-"+(selected.getMonth()+1)+"-"+selected.getDate()
    
                    // Ritar upp kalendern på nytt
                    updateCalendar(window.calendarMonth);
                });
            }
            else {
                input.setAttribute("disabled", "");
            }

            // Lägger till dagen i veckan
            week.appendChild(input);
            week.appendChild(label);
        }
        

        // Lägger till veckan till diven där kalenderna skall vara
        document.getElementById("date-div").appendChild(week);
        
        // Ändar vilken månad och år det är vi visar upp dagarna för
        document.getElementById("current-month").innerHTML = months[month.firstDate.getMonth()] + " " + month.firstDate.getFullYear();
    }
}




document.addEventListener('DOMContentLoaded', function() {
    // Variabel för att hålla koll på hur långt vi har "scrollat" månad
    window.calendarMonth = 0;
    updateCalendar(window.calendarMonth);
    // updateCalendar(1);
    
    // updateCalendar(null, 3);

    let previous = document.getElementById('previous');
    let next = document.getElementById('next');
    
    let booking_state_radio = document.getElementsByName('booking_state');
    let booking_states = [];
    for (let i=0; i<booking_state_radio.length; i++) {
        booking_states.push(booking_state_radio[i].id)
    }

    // Eventlistners för att uppdatera kalenderns innehåll
    document.getElementById("next-month").addEventListener("click", function(){
        window.calendarMonth++;
        updateCalendar(window.calendarMonth);
    });
    document.getElementById("previous-month").addEventListener("click", function(){
        window.calendarMonth--;
        updateCalendar(window.calendarMonth);
    });
    document.getElementById("current-month").addEventListener("click", function(){
        window.calendarMonth = 0;
        updateCalendar(window.calendarMonth);
    });


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

