import{i as r}from"./vendor-77e16229.js";const a=document.querySelector(".form");a.addEventListener("submit",m);function m(i){i.preventDefault();const t=parseInt(evt.target.delay.value),s=evt.target.state.value;new Promise((e,o)=>{setTimeout(()=>{s==="fulfilled"?e(t):s==="rejected"&&o(t)},t)}).then(e=>{r.success({message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{r.error({message:`❌ Rejected promise in ${e}ms`})})}
//# sourceMappingURL=02-snackbar-9b08426a.js.map
