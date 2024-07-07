// importing pop-ups (toasting) plugin
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handlerSubmit);
function handlerSubmit(event) {
    event.preventDefault();
    
    const delay = parseInt(evt.target.delay.value);
    const radio = evt.target.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radio === "fulfilled") {
                resolve(delay);
            } else if (radio === "rejected") {
                reject(delay);
            }
        }, delay);
    });

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