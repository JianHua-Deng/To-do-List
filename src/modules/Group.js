import { Project } from "./project";
import { createElement } from "./utils";

export class Group {
  constructor() {
    this.projects = [];
  }

  getProjectById(id) {
    return this.projects.find((project) => project.id == id);
  }

  addProject(project) {
    this.projects.push(project);
  }

  deleteProject(id) {
    const filteredProject = this.projects.filter(
      (project) => project.id != id
    );
    this.projects = filteredProject;
  }
}