import { loadSwitch } from './darkmode.js';
import { Api } from './api.js';
import { InitRenderRoute , FilterRenderList , ChangeVarible} from './render.js'

console.log('%c Autor : https://github.com/uPixela Version : 1.0.1', 'background: #222; color: #bada55')

loadSwitch();

Api().then(x => {
     InitRenderRoute();
});

window.addEventListener('hashchange', (event) => {
     InitRenderRoute();
     
});

document.querySelector("#query").addEventListener("beforeinput", (e) => {
     const data = e.data;
     if(data) {
        const isAllow = /\D/.test(data);
        if(!isAllow) {
            e.preventDefault();
        }
    }
});




document.querySelector("#query").addEventListener("input", (e) => {
     ChangeVarible('input',e.data);
     FilterRenderList();
     const ButtonClear = document.querySelector("#Fileter .Input button");
     if(e.target.value.length !== 0){
          ButtonClear.style.visibility = 'visible';
     }else{
          ButtonClear.style.visibility = 'hidden';
     }
});



document.querySelector("#region").addEventListener("change", (e) => {
     if(e.target.value == "") ChangeVarible('select',null)// = null;
     else ChangeVarible('select',true);
     FilterRenderList();
});



document.querySelector("#Fileter .Input button").addEventListener('click',(e)=>{
     document.querySelector("#query").value = '';
     document.querySelector("#Fileter .Input button").style.visibility = 'hidden';
});