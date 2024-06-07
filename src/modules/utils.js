const modalContainer = document.querySelector(".modal-container");
const projectModal = document.querySelector(".project.form");
const taskModal = document.querySelector(".task.form");


export function createElement(tag, className, content){
    const element = document.createElement(tag);
    if(className) element.className = className;
    if(content) element.textContent = content;
    return element;
}

export function hideModal(){
    modalContainer.classList.add("hidden");
    projectModal.classList.add("hidden");
    taskModal.classList.add("hidden");
}

export function displayProjectModal(){
    modalContainer.classList.remove("hidden");
    projectModal.classList.remove("hidden");
}

export function displayTaskModal(){
    modalContainer.classList.remove("hidden");
    taskModal.classList.remove("hidden");
}

//this is for storing into the local storage but we don't know if the item exist
export function saveToLocal(project, data){
    const storedData = localStorage.getItem(project);//Get the JSON from the local storage
    const dataObj = storedData ? JSON.parse(storedData) : []; //If its empty, return a empty array, otherwise, return the parse verision of the JSON
    dataObj.push(data);

    localStorage.setItem(project, JSON.stringify(dataObj));
}

export function loadLocalStorage(project){
    return JSON.parse(localStorage.getItem(project));
}

export function updateLocalStorageItem(project, data){
    localStorage.setItem(project, JSON.stringify(data));
}

export function deleteTask(project, name){
    obj = loadLocalStorage(project);
    
}
