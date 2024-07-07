import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const currentTime = new Date();
const userInput = document.querySelector('#datetime-picker');
let UserSelectedDate = null;
const startBtn = document.querySelector('.js-btn')

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < currentTime) {
      iziToast.error({
        message: 'Please choose a date in the future',
      })
      startBtn.disabled = true;
    } else {
      UserSelectedDate = selectedDates[0];
    
      console.log(UserSelectedDate);
      startBtn.disabled = false; 
    }
  },
};
flatpickr(userInput, options);


const elements = {
  days: document.querySelector(".js-days"),
  hours: document.querySelector(".js-hours"),
  minutes: document.querySelector(".js-minutes"),
  seconds: document.querySelector(".js-seconds")
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


startBtn.addEventListener('click', hadlerClick);
function hadlerClick() {
setInterval(() => {
  if (UserSelectedDate) {
    const currentTime = new Date();
    const difference = UserSelectedDate - currentTime;
  
    if (difference <= 0) {
      elements.days.textContent = '00';
      elements.hours.textContent = '00';
      elements.minutes.textContent = '00';
      elements.seconds.textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);

    elements.days.textContent = String(days).padStart(2,'0');
    elements.hours.textContent = String(hours).padStart(2, '0');
    elements.minutes.textContent = String(minutes).padStart(2, '0');
    elements.seconds.textContent = String(seconds).padStart(2, '0');

  }
}, 1000)
  startBtn.disabled = true; 
  userInput.disabled = true;
}