import { clear } from "./home.js";
import { delete_project_button, delete_task_button, delete_task, edit_project} from "./actions.js";
import './projects.css';
const container = document.getElementById("container");
const header = document.querySelector("header");

function build_projects(){
    // const where = document.querySelector("h1");
    // where.textContent = "Projects";
    //clear();
    show_projects(JSON.parse(localStorage.getItem("task_list")));
}

function get_projects(){
    let arr = JSON.parse(localStorage.getItem("project_list"));
    return arr;
}


function show_projects(taskList){
    let projects = get_projects();
    const projectsDiv = document.querySelector(".projects");
    if(projectsDiv.childElementCount > 0){clear(projectsDiv);}
    for (let project of projects){
        let myDiv = document.createElement('div');
        myDiv.className = "project-card";

        let top = document.createElement('div');
        top.className = "top";
        myDiv.appendChild(top);

        let Title = document.createElement('h2');
        Title.textContent = project["name"]["name"];
        Title.className = "project-title";
        top.appendChild(Title);

        let buttons = document.createElement('div');
        buttons.className = "project-buttons";
        top.appendChild(buttons);

        let taskDiv = document.createElement('div');
        taskDiv.className = "task-list";
        myDiv.appendChild(taskDiv);

        for (let i = 0 ; i < project["tasks"].length; i++){
            let div = document.createElement("div");
            div.className = "task-line";
            let Title2 = document.createElement('h3');
            Title2.textContent = project["tasks"][i]["name"];
            Title2.className = "task-title";
            div.appendChild(Title2);

            let due = document.createElement('h3');
            due.textContent = project["tasks"][i]["dueDate"];
            due.className = "due";
            div.appendChild(due);
            taskDiv.appendChild(div);
        }
        
        let editButton = document.createElement("button");
        editButton.textContent = "Edit Project";
        editButton.addEventListener("click", () => {
            [myDiv, buttons] = edit_project(project, myDiv, taskList, projects);
        });

        buttons.appendChild(editButton);
        projectsDiv.appendChild(myDiv);
    }
}

export {build_projects};