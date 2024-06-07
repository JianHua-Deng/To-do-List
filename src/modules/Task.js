export class Task{
    constructor(taskName, description, dueDate){
        this.name = taskName;
        this.description = description;
        this.dueDate = dueDate;
        this.status = false;
    }

    markComplete(){
        this.status = true;
    }

    markIncomplete(){
        this.status = false;
    }
    
}