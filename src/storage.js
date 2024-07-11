import {Project} from './objects'

function add_task_storage(task){
    let arr = JSON.parse(localStorage.getItem("task_list"));
    arr.push(task);
    localStorage.setItem("task_list", JSON.stringify(arr));
    //console.log(JSON.parse(localStorage.getItem("current_task")));
}

function task_to_project(task){
    let pro = JSON.parse(localStorage.getItem("current_project"));
    pro.tasks.push(task);
    localStorage.setItem("current_project", JSON.stringify(pro));
}

function new_project_storage(project){
    localStorage.setItem("current_project", JSON.stringify(project));
    //console.log(JSON.parse(localStorage.getItem("current_project")));
}

function add_project_storage(){
    let pro = JSON.parse(localStorage.getItem("current_project"));
    let arr = JSON.parse(localStorage.getItem("project_list"));
    arr.push(pro);
    localStorage.setItem("project_list", JSON.stringify(arr));
}

function storage_initalize(){
    localStorage.setItem("project_list", JSON.stringify([]));
    localStorage.setItem("task_list", JSON.stringify([]));
}

function print_storage(){
    console.log("Storage:");
    console.log(JSON.parse(localStorage.getItem("project_list")));
    //console.log(Object.keys(localStorage));
}

export{storage_initalize, add_task_storage, new_project_storage, add_project_storage, print_storage, task_to_project};