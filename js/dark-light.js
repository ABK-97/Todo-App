let sun = document.querySelector(".sun");
let input = document.querySelector(".input");
let a = 0 ; 
let link = document.createElement('link'); 
document.getElementsByTagName('HEAD')[0].appendChild(link);
link.rel = 'stylesheet'; 
link.type = 'text/css';

applyDarkMode();

sun.addEventListener("click",function(){
    if (a == 0){
        a += 1 ;
        toLocalStorge(a);
    }else {
        a -= 1 ;
        toLocalStorge(a);
    }
})

function toLocalStorge (a){
    if (a == 1){
        localStorage.setItem("darkMode", "enabled");
        applyDarkMode();
    }else {
        localStorage.setItem("darkMode", "disapled");
        applyDarkMode();
    }
}
function applyDarkMode(){
    darkMode = localStorage.getItem("darkMode");
    if (darkMode == "enabled"){
        addDarkClasses();
    }else{
        removeDarkClasses();
    }
}
function addDarkClasses(){
    sun.src = "./images/icon-moon.svg";
    link.href = './css/light.css';
}
function removeDarkClasses(){
    sun.src = "./images/icon-sun.svg";
    link.href = './css/dark.css';
}

