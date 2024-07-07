// importing pop-ups (toasting) plugin
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handlerSubmit);
function handlerSubmit(event) {
    event.preventDefault();
    
    const delay = parseInt(event.target.delay.value);
    const radio = event.target.state.value;
