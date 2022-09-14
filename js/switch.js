export const loadSwitch = () => {
     Clicker();
     let status = localStorage.getItem('style');     
     Render();
}

let metaThemeColor = document.querySelector("meta[name=theme-color]");


const Clicker = () => {
     let Button = document.getElementById('Switch');

     Button.addEventListener('click',()=>{
          if(localStorage.getItem('style') == null){
               localStorage.setItem('style',true);
          }else{
               localStorage.removeItem('style');
          }

          Render();
     });
}

const Render = () => {
     let status = localStorage.getItem('style');

     if(status == 'true'){
          document.body.classList.add('Dark');
		  metaThemeColor.setAttribute("content", "#202c37");
     }else{
          document.body.classList.remove('Dark');
		  metaThemeColor.setAttribute("content", "#fff");
     }
}