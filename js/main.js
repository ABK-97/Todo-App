let mainInput = document.querySelector(".main-input");
let mainContainer = document.querySelector(".main-container-1");
let left = document.querySelector(".left-1");
let clearComplited = document.querySelector(".clear-complited");
let filter = document.querySelectorAll(".filter li");

let arrayOfTasks = [];


if (localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}


getDataFromLocalStorage ();




mainInput.addEventListener("keyup",function(e){
  if (e.keyCode === 13) {
   if(mainInput.value != ""){
    creatObj(mainInput.value);
    mainInput.value = "";
   }
  }
});

function creatObj(e){
    let todo = {
        id: Date.now(),
        title: e,
        complited: false,
    }
    arrayOfTasks.push(todo);
    toPag(arrayOfTasks);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toPag(arrayOfTasks){
    left.innerHTML = arrayOfTasks.length ;
    mainContainer.innerHTML = "";
    arrayOfTasks.forEach(task => {
        let container = document.createElement("div");
        container.classList.add("container");

        container.setAttribute("data-id",task.id)

        let item1 = document.createElement("div");
        item1.classList.add("item-1");

        let circle = document.createElement("div");
        circle.classList.add("circle");


        let para = document.createElement("p");
        para.classList.add("para");
        para.innerHTML = task.title ;
        circle.appendChild(para);

        if(task.complited == true){
            container.classList.add("task-done");
            circle.classList.add("cheked");
        }

        let imgClose = document.createElement("img");
        imgClose.src = "./images/icon-cross.svg";

        item1.appendChild(circle);
        item1.appendChild(para);

        container.appendChild(item1);
        container.appendChild(imgClose);
        mainContainer.prepend(container);


        circle.addEventListener("click",function (e){
            if(e.target.classList.contains("cheked")){
                e.target.parentElement.parentElement.classList.remove("task-done");
                e.target.classList.remove("cheked");
                toggleStatusTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));
            }else {
                e.target.parentElement.parentElement.classList.add("task-done");
                e.target.classList.add("cheked");
                toggleStatusTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));
            }
        });

        imgClose.addEventListener("click",function(e){
            deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
            e.target.parentElement.remove();
        })
        
    });
    
}

function toggleStatusTaskWith (taskId){
    for (let i = 0; i < arrayOfTasks.length; i++){
        if (arrayOfTasks[i].id ==taskId){
            arrayOfTasks[i].complited == false ? arrayOfTasks[i].complited =true : arrayOfTasks[i].complited = false ;
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
    console.log(arrayOfTasks);
};

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDataToLocalStorageFrom(arrayOfTasks);
    left.innerHTML = arrayOfTasks.length ;
};

function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
    
    
};

function getDataFromLocalStorage (){
    let data = window.localStorage.getItem("tasks")
    if(data) {
        let tasks = JSON.parse(data);
        toPag(tasks);
        
    }

};

clearComplited.addEventListener("click",function(){
    let tasks = arrayOfTasks.filter(e => e.complited === false);
    arrayOfTasks = tasks ;
    addDataToLocalStorageFrom(arrayOfTasks);
    toPag(arrayOfTasks);
})



for(let i = 0 ; i < filter.length ; i++){
    filter[i].addEventListener("click",function(e){
        
        if(e.target.classList.contains("all")){
            toPag(arrayOfTasks);
            activeClassRemove();
            e.target.classList.add("active");
            
        }
        if(e.target.classList.contains("active-1")){
            let tasks = arrayOfTasks.filter(e => e.complited === false);
            toPag(tasks);
            activeClassRemove();
            e.target.classList.add("active");
        }
        if(e.target.classList.contains("complited")){
            let tasks = arrayOfTasks.filter(e => e.complited === true);
            toPag(tasks);
            activeClassRemove();
            e.target.classList.add("active");
        }
        
    })
    
}

function activeClassRemove(){
    for(let i = 0 ; i <filter.length; i++){
        filter[i].classList.remove("active");
    }
}