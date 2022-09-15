export const loadSwitch = () => {
     Clicker();   
     Render();



}

const Clicker = () => {
     const Button = document.getElementById('Switch');
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
     const status = localStorage.getItem('style');
     const metaThemeColor = document.querySelector("meta[name=theme-color]");

     if(status == 'true'){
          document.body.classList.add('Dark');
          metaThemeColor.setAttribute("content", "#202c37");
     }else{
          document.body.classList.remove('Dark');
          metaThemeColor.setAttribute("content", "#fff");
     }
}