import { compareDesc, parseISO } from "date-fns";

function add_task_storage(task){
    let arr = JSON.parse(localStorage.getItem("task_list"));
    if(arr.length == 0){
        arr.push(task);
    } else {
        arr = sortDate(arr, task);
    }
    localStorage.setItem("task_list", JSON.stringify(arr));
    //console.log(JSON.parse(localStorage.getItem("current_task")));
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
  //  console.log("my project is:");
  //  console.log(task);
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
    localStorage.setItem("current_project", JSON.stringify());
    localStorage.setItem("project_list", JSON.stringify([]));
    localStorage.setItem("task_list", JSON.stringify([]));
}

function print_storage(){
    //console.log("Storage:");
    //console.log(JSON.parse(localStorage.getItem("project_list")));
    //console.log(Object.keys(localStorage));
}

export{storage_initalize, add_task_storage, new_project_storage, add_project_storage, print_storage, task_to_project};