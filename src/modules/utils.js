import {all, cancelbtns, confirmProjectBtn, confirmTaskBtn, addProjectBtns, modalContainer, projectForm, taskForm, projectInput, taskNameInput, taskDescriptionInput, taskDueInput, tasksContainer, content, projectHeader} from "./doms";


export function createElement(tag, className, id, content){
    const element = document.createElement(tag);
    if(id) element.id = id;
    if(className) element.className = className;
    if(content) element.textContent = content;
    return element;
}

export function hideModal(){
    modalContainer.classList.add("hidden");
    projectForm.classList.add("hidden");
    taskForm.classList.add("hidden");
}

export function displayProjectModal(){
    modalContainer.classList.remove("hidden");
    projectForm.classList.remove("hidden");
}

export function displayTaskModal(){
    modalContainer.classList.remove("hidden");
    taskForm.classList.remove("hidden");
}

export function renderProjectList(groups){
    const sidebarContent = document.querySelector(".sidebar-content");
    sidebarContent.innerHTML = "";
    groups.projects.forEach(project => {
        let projectItem = createElement("li", "project-item", project.id, null);
        let textContent = createElement("p", null, null, project.name);
        
        projectItem.addEventListener("click", () => {
           renderProjectHeader(project);
           renderTaskList(project); 
        });

        projectItem.appendChild(textContent);
        sidebarContent.appendChild(projectItem);
    });
}

export function renderProjectHeader(project){
    projectHeader.innerHTML = "";
    projectHeader.textContent = project.name;
    projectHeader.id = project.id;

    const addTaskBtn = createElement("button", "add-task-btn", null, "Add Task");
    addTaskBtn.addEventListener("click", () => {
        displayTaskModal();
    });
    projectHeader.appendChild(addTaskBtn);
}

export function renderTaskList(project){
    tasksContainer.innerHTML = "";
    project.tasks.forEach(task => {
        let taskItemContainer = createElement("div", "task-item-container", null, null); 

        let taskName = createElement("p", "task-name", null, task.name);
        let taskDescription = createElement("p", "task-description", null, task.description);
        let taskDue = createElement("p", "task-due", null, task.dueDate);
        let markCompleteBtn = createElement("button", "mark-complete-btn", null, "Mark Complete");
        let markIncompleteBtn = createElement("button", "mark-incomplete-btn", null, "Mark Incomplete");
        let deleteTaskBtn = createElement("button", "delete-task-btn", null, "Delete Task");


        markCompleteBtn.addEventListener("click", () => {
            task.markComplete();
            taskItemContainer.classList.add("completed");
            taskItemContainer.removeChild(markCompleteBtn);
            taskItemContainer.appendChild(markIncompleteBtn);
        });

        markIncompleteBtn.addEventListener("click", () => {
            task.markIncomplete();
            taskItemContainer.classList.remove("completed");
            taskItemContainer.removeChild(markIncompleteBtn);
            taskItemContainer.appendChild(markCompleteBtn);
        });

        deleteTaskBtn.addEventListener("click", () => {
            project.deleteTask(task.name);
            renderTaskList(project);
        });

        taskItemContainer.appendChild(taskName);
        taskItemContainer.appendChild(taskDescription);
        taskItemContainer.appendChild(taskDue);
        taskItemContainer.appendChild(deleteTaskBtn);
        if(task.status){
            taskItemContainer.classList.add("completed");
            taskItemContainer.appendChild(markIncompleteBtn);   
        }else{
            
            taskItemContainer.appendChild(markCompleteBtn);
        }
        tasksContainer.appendChild(taskItemContainer);
    });
    content.appendChild(tasksContainer);
}



//this is for storing into the local storage but we don't know if the item exist
export function saveToLocal(key, group){
    localStorage.setItem(key, JSON.stringify(group));
}

