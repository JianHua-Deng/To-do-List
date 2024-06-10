export class Task{
    constructor(id, taskName, description, dueDate){
        this.id = id
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

    toggleStatus(){
        this.status = !this.status;
    }
    
}