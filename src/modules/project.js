import { saveToLocal } from "./utils";

export class Projects{
    constructor(project_name){
        this.name = project_name;
    }

    addTask(data){
        saveToLocal(this.name, data);
    }
}