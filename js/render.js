import { Lista } from './api.js';

export const Render = (lista) => {
     document.getElementById('Fileter').style.display = "flex";
     const root = document.getElementById('root');
     const template = document.getElementById('item');
     root.innerHTML = '';

     const div = document.createElement('div');
     div.classList.add('box');

     let Fav = document.querySelector("link[rel~='icon']");
     Fav.href = './img/globus.png';
     document.title = 'REST API training';

     root.append(div);

     lista.forEach(el => {
          // let clone = template.content.cloneNode(true);
          div.appendChild(createItem(el));
     });

}


const createItem = (el) => {
     const div = document.createElement('a');
     div.classList.add('item');
     if(el.code !== undefined){
          div.href = "#"+el.code;
     }else{
          div.href = "#"+el.codes;
     }
     
     div.innerHTML = `<img src="${el.flagUrl}" loading="lazy" alt="flaga">
          <h1>${el.name}</h1>
          <div class="info">
               <span><b>population :</b> ${el.population}</span>
               <span><b>Region :</b> ${el.region}</span>
               <span><b>Capital :</b> ${el.capital}</span>
          </div>
     `;

     return div;
}


export const RenderDetalis = (el) => {
     document.getElementById('Fileter').style.display = "none";
     const root = document.getElementById('root');
    
     let name = el?.name;
     let nativeName = Object.values(el.nativeName)[0].official;
     let Population = el.population;
     let Region = el.region;
     let subregion = el.subregion;
     let capital = el.capital;
     let Domain = el.tld[0];
     let currencies = Object.values(el.currencies).map((currency) => currency.name).join(", ");
     let languages = Object.values(el.languages).join(", ");

     let border = TestBorder(el.borders).innerHTML;


     let Fav = document.querySelector("link[rel~='icon']");
     Fav.href = el.flagUrl;
     document.title = name;

     root.innerHTML = `<div id="Detalis">
               <a href="#">back</a>
               <div class="flex">
                    <div class="image"><img src="${el.flagUrl}"/></div>
                    <div class="info">
                         <h1>${name}</h1>

                         <div class="inne">
                              <span><b>Native name : </b> ${nativeName} </span>
                              <span><b>Population : </b> ${Population} </span>
                              <span><b>Region : </b> ${Region} </span>
                              <span><b>Sub Region : </b> ${subregion} </span>
                              <span><b>Capital : </b> ${capital} </span>
                              <span><b>Top Level Domain : </b> ${Domain} </span>
                              <span><b>Currencies : </b> ${currencies} </span>
                              <span><b>Languages : </b> ${languages} </span>
                         </div>

                         <div class="border">
                              <span>border countries : </span>
                              ${border}
                         </div>

                    </div>
               </div>
     </div>`;
}

const TestBorder = (lista) => {
     const test = document.createElement('div');
  
     if(lista == undefined){
          const brak = document.createElement('span');
          brak.innerText = 'undefined';
          return test.appendChild(brak);
     }

     lista?.forEach(e =>{
          const div = document.createElement('a');

          let find = Lista.find(function(element) {
               return element.code === e;
          });
          
          let finds = Lista.find(function(element) {
               return element.codes === e;
          });

          if(find !== undefined){
               div.href = "#"+e;
               div.innerText = find.name;
          }else if(finds !== undefined){
               div.href = "#"+finds.code;
               div.innerText = finds.name;
          }else{
               div.innerText = e;
               div.classList.add('brak');
          }

          test.appendChild(div);
     });

     return test;
}

