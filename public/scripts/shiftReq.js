import {fetchData} from "./main.js"


function validString(word) {
    return word.trim().length > 0;
}


function setCurrentShift(shift) {
    localStorage.setItem('shift', JSON.stringify(shift));
}


export function getCurrentShift() {
    return JSON.parse(localStorage.getItem('shift'));
}

// Get the form from HTML
let createShift = document.getElementById("shiftForm");
if (createShift) createShift.addEventListener('submit', makeShift);

function makeShift(e) {
    e.preventDefault();

    let errorSection = document.getElementById("error");

    let shiftDate = document.getElementById("shiftDate").value;
    let startTime = document.getElementById("startTime").value;
    let endTime = document.getElementById("endTime").value;
    let location = document.getElementById("location").value;

    if (!validString(location)) {
        errorSection.innerText = 'Location cannot be empty!';
        return;
    }

    const shift = {
        ShiftDate: shiftDate,
        StartTime: startTime,
        EndTime: endTime,
        Location: location
    }

  
    fetchData('/createShiftRequest', shift, "POST")
        .then(data => {
            if (!data.message) {
                setCurrentShift(data);
                window.location.href = "home.html";  // Redirect on success
            }
        })
        .catch(err => {
            errorSection.innerText = err.message;
        });

    // Show success (optional)
    let section = document.getElementById("welcome");
    section.innerHTML = "You successfully added a shift request!";

    // Clear form fields
    document.getElementById('shiftDate').value = "";
    document.getElementById('startTime').value = "";
    document.getElementById('endTime').value = "";
    document.getElementById('location').value = "";
}
