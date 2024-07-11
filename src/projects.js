import { clear } from "./home.js";
import './projects.css';
const container = document.getElementById("container");
const header = document.querySelector("header");

function build_projects(){
    // const where = document.querySelector("h1");
    // where.textContent = "Projects";
    //clear();
    show_projects();
}

function get_projects(){
    let arr = JSON.parse(localStorage.getItem("project_list"));
    console.log("arrr=== ");
    console.log(arr);
    return arr;
}

function show_projects(){
    let projects = get_projects();
    const projectsDiv = document.querySelector(".projects");
    if(projectsDiv.childElementCount > 0){clear(projectsDiv);}
    console.log ("erm");
    for (let project of projects){
        let myDiv = document.createElement('div');
        myDiv.className = "project-card";
        let Title = document.createElement('h2');
        Title.textContent = project["name"]["name"];
        console.log ("erm:  " +  project["name"]["name"] );
        Title.className = "project-title";
        myDiv.appendChild(Title);

        for (let i = 0 ; i < project["tasks"].length; i++){
            let div = document.createElement("div");
            div.className = "task-line";
            let Title2 = document.createElement('h3');
            Title2.textContent = project["tasks"][i]["name"];
            Title2.className = "task-title";
            div.appendChild(Title2);
            myDiv.appendChild(div);
        }
        
        projectsDiv.appendChild(myDiv);
    }
}

function show_tasks(project){
    let myDiv = document.createElement('div');
    for (let i = 0 ; 1 < project["tasks"].length; i++){
        let div = document.createElement("div");
        let Title = document.createElement('h3');
        Title.textContent = project["tasks"][i]["name"];;
        myDiv.appendChild(div);
    }

    return myDiv;
}

export {build_projects};