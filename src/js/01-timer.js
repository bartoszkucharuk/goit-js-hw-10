// importing calendar/date plugin
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// importing pop-ups (toasting) plugin
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


// making elements to handle with listeners by html's names
const elements = {
    input: document.querySelector("#datetime-picker"),
    button: document.querySelector("button[data-start]"),
    day: document.querySelector("span[data-days]"),
    hour: document.querySelector("span[data-hours]"),
    minute: document.querySelector("span[data-minutes]"),
    second: document.querySelector("span[data-seconds]")
}

// making start button disabled when no data is chosen for now
let userSelectedDate;
elements.button.disabled = true;

// options object for flatpickr plugin
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
// continue OPTIONS- cooperate with izitoast plugin - pop-ups
    onClose(selectedDates) {
        const currentTime = Date.now();
        if (selectedDates[0] <= currentTime) {
            iziToast.error({
                message: "Please choose a date in the future"
            });
            elements.button.disabled = true;
        } else {
            elements.button.disabled = false;
            userSelectedDate = selectedDates[0];
        }
        return;
    },
};

// preparing counter to display current numbers of time
function runningCounter({ days, hours, minutes, seconds }) {
    elements.day.textContent = `${days}`
    elements.hour.textContent = `${hours}`
    elements.minute.textContent = `${minutes}`
    elements.second.textContent = `${seconds}`;
}

// start running counter by [data - start] button
elements.button.addEventListener("click", handlerStart);
function handlerStart() {
    const newInterval = setInterval(() => {
        const currentTime = Date.now();
        const countdown = userSelectedDate - currentTime;

        if (countdown <= 0) {
            clearInterval(newInterval);
            elements.input.disabled = false;
            elements.button.disabled = false;
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(countdown);
        runningCounter({ days, hours, minutes, seconds });
        elements.input.disabled = true;
        elements.button.disabled = true;
    }, 1000);
}
// function converting between units- given in instruction within conspect
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
// adding leading zero to displaying format
    const days = zeroFormat(Math.floor(ms / day));
    const hours = zeroFormat(Math.floor((ms % day) / hour));
    const minutes = zeroFormat(Math.floor(((ms % day) % hour) / minute));
    const seconds = zeroFormat(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}

function zeroFormat(value) {
    return String(value).padStart(2, "0")
}

flatpickr("#datetime-picker", options);