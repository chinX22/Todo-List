import { build_home } from "./home";
import { edit_task_form } from "./form";

function delete_project_button(project){
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-project";
    deleteButton.textContent = "Delete Project";
    deleteButton.addEventListener("click", () => {
        delete_project(project);
    });
    return deleteButton;
}

function delete_project(pro){
    let arr_p = JSON.parse(localStorage.getItem("project_list"));
    for (let i = 0; i < arr_p.length; i++){
        if(JSON.stringify(arr_p[i]) === JSON.stringify(pro)){
            arr_p.splice(i, 1);
            localStorage.setItem("project_list", JSON.stringify(arr_p));
            build_home();
            break;
        }
    }

    

    let arr_t = pro["tasks"];
    let taskList = JSON.parse(localStorage.getItem("task_list"));
    for (let task of arr_t){
         for (let i = 0; i < taskList.length; i++){
            if(JSON.stringify(taskList[i]) === JSON.stringify(task)){
                taskList.splice(i, 1);
            }
        }
    }
     localStorage.setItem("task_list", JSON.stringify(taskList));
}

function delete_task_button(){
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.textContent = "Delete Task";
    return deleteButton;
}

function delete_task(task, project, taskList){
    let arr_taskList = taskList
    console.log(arr_taskList);
    for (let i = 0; i < arr_taskList.length; i++){
        if(JSON.stringify(arr_taskList[i]) === JSON.stringify(task)){
            arr_taskList.splice(i, 1);
            
            localStorage.setItem("task_list", JSON.stringify(arr_taskList));

            let arr_t = project["tasks"];
                for (let i = 0; i < arr_t.length; i++){
                    if(JSON.stringify(arr_t[i]) === JSON.stringify(task)){
                        arr_t.splice(i, 1);
                        project["tasks"] = arr_t;
                }
            }
            break;
        }
    }
    return project;
}

function edit_project(project, myDiv, taskList, projects){
    let buttons = myDiv.querySelector(".project-buttons")

    
    let taskDiv = myDiv.querySelector(".task-list");
    taskDiv.replaceChildren();
    let addButton = add_task_button();
    
    addButton.addEventListener("click", () => {
        localStorage.setItem("current_project", JSON.stringify(project));
        localStorage.setItem("old_project", JSON.stringify(project));
        add_task();
    });
    
    buttons.appendChild(addButton);
    buttons.appendChild(delete_project_button(project));
    buttons.appendChild(cancel_button());


    for (let i = 0 ; i < project["tasks"].length; i++){
        let div = document.createElement("div");
        div.className = "task-line-edit";
        let Title2 = document.createElement('h5');
        Title2.textContent = project["tasks"][i]["name"];
        Title2.className = "task-title";
        div.appendChild(Title2);

        let deleteButton = delete_task_button();
        deleteButton.addEventListener("click", () => {
            let index = projects.indexOf(project);
            projects[index] = delete_task(project["tasks"][i], project, taskList);
            localStorage.setItem("project_list", JSON.stringify(projects));
            build_home();
        });

        let editButton = edit_task_button();
        editButton.addEventListener("click", () => {
            localStorage.setItem("current_project", JSON.stringify(project));
            localStorage.setItem("old_project", JSON.stringify(project));
            edit_task(project["tasks"][i]);
        });

        div.appendChild(editButton);
        div.appendChild(deleteButton);
        taskDiv.appendChild(div);
    }
    return [myDiv, buttons];
}

function edit_task_button(){
    const editButton = document.createElement("button");
    editButton.className = "edit-task";
    editButton.textContent = "Edit Task";
    return editButton;
}

function add_task_button(){
    const addButton = document.createElement("button");
    addButton.className = "add-task";
    addButton.textContent = "Add Task";
    return addButton;
}

function cancel_button(){
    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-task";
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", () => build_home())
    return cancelButton;
}

function add_task(){
    edit_task_form();
}

function edit_task(task){
    edit_task_form(task);
}

export {delete_project_button, delete_task_button, delete_task, edit_project, edit_task_button};