import {all, cancelbtns, confirmProjectBtn, confirmTaskBtn, addProjectBtns, modalContainer, projectForm, taskForm, projectInput, taskNameInput, taskDescriptionInput, taskDueInput, tasksContainer, content, projectHeaderContainer} from "./doms";
import { Group } from "./Group";
import { Project } from "./project";
import { Task } from "./Task";
import { groups } from "../index.js";

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
            if(projectHeaderContainer.id == project.id){
                projectHeaderContainer.textContent = "";
                tasksContainer.innerHTML = "";
            }
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
        let taskTopContainer = createElement("div", "task-top-container", null, null);
        let taskBottomContainer = createElement("div", "task-bottom-container", null, null);

        let taskName = createElement("h3", "task-name", null, task.name);
        let taskDescription = createElement("p", "task-description", null, task.description);
        let taskDue = createElement("span", "task-due", null, ("Due: " + task.dueDate));
        let markCompleteBtn = createElement("button", "mark-complete-btn", null, null);


        markCompleteBtn.addEventListener("click", () => {
            project.deleteTask(task.name);
            saveToLocal("groups", groups);
            renderTaskList(project);
        });

        taskTopContainer.appendChild(taskName);
        taskTopContainer.appendChild(taskDue);
        taskBottomContainer.appendChild(taskDescription);
        taskBottomContainer.appendChild(markCompleteBtn);

        taskItemContainer.appendChild(taskTopContainer);
        taskItemContainer.appendChild(taskBottomContainer);

        tasksContainer.appendChild(taskItemContainer);
    });
    content.appendChild(tasksContainer);
}



//this is for storing into the local storage but we don't know if the item exist
export function saveToLocal(key, group){
    localStorage.setItem(key, JSON.stringify(group));
}

export function loadLocalStorage(key){
    const data = localStorage.getItem(key);
    if (data === null){
        return new Group();
    }else{
        const parsedData = JSON.parse(data);
        const groups = new Group();
        parsedData.projects.forEach(project => {
            const newProject = new Project(project.id, project.name);
            project.tasks.forEach(task => {
                const newTask = new Task(task.id, task.name, task.description, task.dueDate);
                newProject.addTask(newTask);
            });
            groups.addProject(newProject);
        })
        return groups;
    }
}
