import { Task } from "./Task";
import { createElement } from "./utils";

export class Project{
    constructor(id, project_name){
        this.id = id;
        this.name = project_name;
        this.tasks = [];
    }

    addTask(task){ 
        this.tasks.push(task);
    }

    deleteTask(name){
        this.tasks = this.tasks.filter((task) => task.name !== name);
    }

    render(){
        const projectContainer = createElement("div", "projects-display");
    
    }
}