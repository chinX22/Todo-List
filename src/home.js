const container = document.getElementById("container");
const header = document.querySelector("header");
import {make_project} from "./form.js";
import {build_projects} from "./projects.js";
import { build_upcoming } from "./upcoming.js";
import {storage_initalize} from "./storage.js"

function make_head_foot(){
    const projectsDiv = document.createElement('div');
    projectsDiv.className = "projects";
    container.appendChild(projectsDiv);
}

function inital(){
    storage_initalize();
    let logo = document.createElement('h1');
    logo.id = "logo";
    logo.textContent = "Get 2 It"
    header.appendChild(logo);
    let project_div = document.createElement('div');
    project_div.className = "project-header";
    let buttonLabel = document.createElement('p');
    buttonLabel.textContent = "Create new project";
    let newProjectButton = document.createElement('button');
    newProjectButton.textContent = "+";
    newProjectButton.addEventListener("click", () => {
        make_project();
    });
    project_div.appendChild(buttonLabel);
    project_div.appendChild(newProjectButton);
    header.appendChild(project_div);

    let bigDiv = document.createElement("div");
    bigDiv.id = "upcoming";
    container.appendChild(bigDiv);
}

function build(){
    // const where = document.querySelector("h1");
    // where.textContent = "Home";
    inital();
    build_home()
  //  see_projects();
}

function build_home(){
    build_projects();
    let tasks = JSON.parse(localStorage.getItem("task_list"));
    if(tasks.length > 0){
        build_upcoming();
    }
}

function clear(element){
    element.replaceChildren();
}

export {make_head_foot, build_home ,clear, build};