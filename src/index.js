import './styles/styles.css'

const cancelbtns = document.querySelectorAll(".exit, .cancel");
const addProjectBtns = document.querySelector(".add-projects");
const modalContainer = document.querySelector(".modal-container");
const projectModal = document.querySelector(".project form");
const taskModal = document.querySelector(".task form");
cancelbtns.forEach(btn => {
    btn.addEventListener("click", ()=>{
        modalContainer.classList.add("hidden");
        projectModal.classList.add("hidden");
        taskModal.classList.add("hidden");
    })
});

addProjectBtns.addEventListener("click", ()=>{
    modalContainer.classList.remove("hidden");
    projectModal.classList.remove("hidden");
})
