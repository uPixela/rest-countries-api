import { loadSwitch } from './switch.js';
import { Api } from './api.js';
import { Render , RenderDetalis } from './render.js'
import { Get , Set} from './storage.js'

let Lista;
let input = null;
let select = null;

loadSwitch();

if(Get('Lista') !== null){
     (async () => {
          Lista = await Get('Lista');
          InitRenderRoute();



       


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