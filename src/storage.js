import { compareDesc, parseISO } from "date-fns";

function add_task_storage(task){
    let arr = JSON.parse(localStorage.getItem("task_list"));
    if(arr.length == 0){
        arr.push(task);
    } else {
        arr = sortDate(arr, task);
    }
    localStorage.setItem("task_list", JSON.stringify(arr));
}

function sortDate(arr, task){
    for (let i  = 0; i < arr.length; i++){
        if(compareDesc (parseISO(task["dueDate"]), parseISO(arr[i]["dueDate"])) == 1){
            console.log(parseISO(task["dueDate"]) + "  is sooner than  "+ parseISO(arr[i]["dueDate"]));
            arr.splice(i, 0, task);
            break;
        } else if (i == (arr.length -1)){
            console.log("added to end");
            arr.push(task);
            break;
        } else {
            console.log("about ot try again");
            continue;
        }
    }
    return arr;
}

function task_to_project(task){
    let pro = JSON.parse(localStorage.getItem("current_project"));
    task.myProject = pro["name"]["name"];
    let arr = pro.tasks;
    if(arr.length == 0){
        arr.push(task);
    } else {
        arr = sortDate(arr, task);
    }
    pro.tasks = arr;
    localStorage.setItem("current_project", JSON.stringify(pro));
}

function update_task(old_task, new_task){
    console.log("old");
    console.log(old_task);
    console.log("new");
    console.log(new_task);
    project_remove_task(old_task);
    remove_task_storage(old_task);
    add_task_storage (new_task);
    update_project();
}

function project_remove_task(task){
    let pro = JSON.parse(localStorage.getItem("current_project"));
    let arr = pro.tasks;
    console.log("current pro");
    console.log(arr);
    for (let i = 0; i < arr.length; i++){
        if(JSON.stringify(task) === JSON.stringify(arr[i])){
            arr.splice(i, 1);
            console.log(task);
            console.log("removed from pro");
        }
    }
    pro.tasks = arr;
    localStorage.setItem("current_project", JSON.stringify(pro));
}

function remove_task_storage(task){
    let tasks = JSON.parse(localStorage.getItem("task_list"));
    let arr = tasks;
    console.log("current tasks");
    console.log(arr);
    for (let i = 0; i < arr.length; i++){
        if(JSON.stringify(task) === JSON.stringify(arr[i])){
            arr.splice(i, 1);
            console.log(task);
            console.log("removed from storage");
        }
    }
    tasks = arr;
    localStorage.setItem("task_list", JSON.stringify(tasks));
}

function update_project(){
    let old_pro = JSON.parse(localStorage.getItem("old_project"));
    let new_pro = JSON.parse(localStorage.getItem("current_project"));
    let arr = JSON.parse(localStorage.getItem("project_list"));
    for (let i = 0; i < arr.length; i++){
        if(JSON.stringify(arr[i]) === JSON.stringify(old_pro)){
            arr.splice(i, 1, new_pro);
            console.log("updated project"); 
            break;
        }
    }
    localStorage.setItem("project_list", JSON.stringify(arr));
}


function new_project_storage(project){
    localStorage.setItem("current_project", JSON.stringify(project));
}

function add_project_storage(){
    let pro = JSON.parse(localStorage.getItem("current_project"));
    let arr = JSON.parse(localStorage.getItem("project_list"));
    arr.push(pro);
    localStorage.setItem("project_list", JSON.stringify(arr));
}

function storage_initalize(){
    localStorage.setItem("current_project", JSON.stringify());
    localStorage.setItem("project_list", JSON.stringify([]));
    localStorage.setItem("task_list", JSON.stringify([]));
}

export{storage_initalize, add_task_storage, new_project_storage, add_project_storage, 
     task_to_project, update_task, update_project};