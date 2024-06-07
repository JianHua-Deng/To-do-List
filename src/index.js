import './styles/styles.css'
import { Group } from './modules/Group';
import { Project } from './modules/project';
import { Task } from './modules/Task';
import { hideModal, displayProjectModal, displayTaskModal, renderProjectList} from './modules/utils';

const groups = new Group();

const cancelbtns = document.querySelectorAll(".exit, .cancel");
const confirmProjectBtn = document.querySelector(".confirm.project");
const confirmTaskBtn = document.querySelector(".confirm.task");
const addProjectBtns = document.querySelector(".add-projects");

const projectForm = document.querySelector(".project.form");
const projectInput = document.getElementById("project-input");

projectForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(projectInput.value !== ""){
        hideModal();
        groups.addProject(new Project(groups.length, projectInput.value));
        console.log(groups.projects[0]);
        renderProjectList(groups);
    }
})

cancelbtns.forEach(btn => {
    btn.addEventListener("click", hideModal);
});

addProjectBtns.addEventListener("click", displayProjectModal);
