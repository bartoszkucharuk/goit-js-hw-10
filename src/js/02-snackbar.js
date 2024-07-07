// importing pop-ups (toasting) plugin
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// catching form by form class
const form = document.querySelector('.form');

// adding listener to radio switch
form.addEventListener('submit', handlerSubmit);
function handlerSubmit(event) {
    event.preventDefault();
    
    const delay = parseInt(event.target.delay.value);
    const radio = event.target.state.value;

// setting the promises to settled
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radio === "fulfilled") {
                resolve(delay);
            } else if (radio === "rejected") {
                reject(delay);
            }
        }, delay);
    });

// set iziToasts pop-ups to react 
    promise
        .then((delay) => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
            });
        })
        .catch ((delay) => {
        iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`,
        });
    })
    
}