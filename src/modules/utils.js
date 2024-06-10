import {all, cancelbtns, confirmProjectBtn, confirmTaskBtn, addProjectBtns, modalContainer, projectForm, taskForm, projectInput, taskNameInput, taskDescriptionInput, taskDueInput, tasksContainer, content, projectHeaderContainer} from "./doms";


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
        let deleteProjectBtn = createElement("button", "delete-project-btn", null, "X");
        
        projectItem.addEventListener("click", () => {
           renderProjectHeader(project);
           renderTaskList(project); 
        });

        deleteProjectBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            groups.deleteProject(project.id);
            renderProjectList(groups);
            projectHeaderContainer.textContent = "";
            tasksContainer.innerHTML = "";
        });

        projectItem.appendChild(textContent);
        projectItem.appendChild(deleteProjectBtn);
        sidebarContent.appendChild(projectItem);
    });
}

export function renderProjectHeader(project){
    projectHeaderContainer.innerHTML = "";
    projectHeaderContainer.id = project.id;

    let projectHeaderText = createElement("h1", null, null, project.name);
    let addTaskBtn = createElement("button", "add-task-btn", null, "Add Task");
    addTaskBtn.addEventListener("click", () => {
        displayTaskModal();
    });
    projectHeaderContainer.appendChild(projectHeaderText);
    projectHeaderContainer.appendChild(addTaskBtn);
}

export function renderTaskList(project){
    tasksContainer.innerHTML = "";
    project.tasks.forEach(task => {
        let taskItemContainer = createElement("div", "task-item-container", null, null); 
        let taskLeftContainer = createElement("div", "task-text-container", null, null);
        let taskRightContainer = createElement("div", "task-options-container", null, null);

        let taskName = createElement("h2", "task-name", null, task.name);
        let taskDescription = createElement("p", "task-description", null, task.description);
        let taskDue = createElement("span", "task-due", null, task.dueDate);
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

        taskLeftContainer.appendChild(taskName);
        taskLeftContainer.appendChild(taskDescription);
        taskLeftContainer.appendChild(taskDue);
        taskLeftContainer.appendChild(deleteTaskBtn);

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

