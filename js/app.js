import { loadSwitch } from './switch.js';
import { Api } from './api.js';
import { Render , RenderDetalis } from './render.js'
import { Get , Set} from './storage.js'

let Lista;
let input = null;
let select = null;

loadSwitch();

console.log('%c Autor : https://github.com/uPixela Version : 1.0.0', 'background: #222; color: #bada55')

// if (window.matchMedia('(display-mode: standalone)').matches) {
// }

if(Get('Lista') !== null){
     (async () => {
          Lista = await Get('Lista');
          InitRenderRoute();
          // console.log(Lista[0].translations)   
     })();
}else{
     Api().then(x => {
          Lista = x;
          Set('Lista',x,86400000);
          InitRenderRoute();
     });
}



const InitRenderRoute = () => {
     if(location.hash.length == 0){
          if(input !== null || select !== null){
               FilterRenderList();
          }else{
               Render(Lista); 
          }
     }else{
          let find = Lista.find((element) => element.code === location.hash.split('#')[1]);
          let finds = Lista.find((element) => element.codes === location.hash.split('#')[1]);

          if(find !== undefined) return RenderDetalis(find);
          if(finds !== undefined) return RenderDetalis(finds);
     
     }
}

window.addEventListener('hashchange', (event) => {
     InitRenderRoute();
});


const FilterRenderList = () => {
     let query = document.querySelector("#query").value.toLowerCase();
     let region = document.querySelector("#region").value;

     const newLista = Lista.filter((country) => {
          return (
              country.name.toLowerCase().includes(query) &&
              (!region || country.region === region)
          );
      });
     
      Render(newLista);
};

document.querySelector("#query").addEventListener("input", (e) => {
     input = e.data;
     FilterRenderList();
})

document.querySelector("#region").addEventListener("change", (e) => {
     if(e.target.value == "") select = null;
     else select = true;

     FilterRenderList();
});



let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
     e.preventDefault();
     deferredPrompt = e;
     addBtn.style.display = 'block';

     addBtn.addEventListener('click', (e) => {
          // hide our user interface that shows our A2HS button
          addBtn.style.display = 'none';
          // Show the prompt
          deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
              } else {
                console.log('User dismissed the A2HS prompt');
              }
              deferredPrompt = null;
            });
        });

        
});