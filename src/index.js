import './styles/styles.css'
import { Group } from './modules/Group';
import { Project } from './modules/project';
import { Task } from './modules/Task';
import {saveToLocal, loadLocalStorage, hideModal, displayProjectModal, displayTaskModal, renderProjectList, renderTaskList} from './modules/utils';
import {cancelbtns, confirmProjectBtn, confirmTaskBtn, addProjectBtns, modalContainer, projectForm, taskForm, projectInput, taskNameInput, taskDescriptionInput, taskDueInput, tasksContainer, content, projectHeaderContainer} from './modules/doms';

export const groups = loadLocalStorage("groups");

projectForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    hideModal();
    let project = new Project(groups.projects.length + 1, projectInput.value);
    groups.addProject(project);
    renderProjectList(groups);
    saveToLocal("groups", groups);
    e.target.reset();
});

taskForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    hideModal();
    let projectId = projectHeaderContainer.id;
    console.log(projectId);

    let project = groups.getProjectById(projectId);
    project.addTask(new Task(project.tasks.length + 1, taskNameInput.value, taskDescriptionInput.value, taskDueInput.value));
    renderTaskList(project);
    saveToLocal("groups", groups);
    e.target.reset();
});

cancelbtns.forEach(btn => {
    btn.addEventListener("click", hideModal);
});

addProjectBtns.addEventListener("click", displayProjectModal);

renderProjectList(groups);