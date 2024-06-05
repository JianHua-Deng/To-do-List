export function createElement(tag, className, content){
    const element = document.createElement(tag);
    if(className) element.className = className;
    if(content) element.textContent = content;
    return element;
}

//this is for storing into the local storage but we don't know if the item exist
export function saveToLocal(key, data){
    const storedData = localStorage.getItem(key);
    const dataObj = storedData ? JSON.parse(storedData) : [];
    dataObj.push(data);

    localStorage.setItem(key, JSON.stringify(dataObj));
}

export function loadLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

export function updateLocalStorageItem(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

export function deleteTask(key, name){
    obj = loadLocalStorage(key);
    
}
