import { build_projects } from "./projects";

function delete_project_button(project){
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-project";
    deleteButton.textContent = "Delete Project";
    //console.log("Made button that deletes project");
    deleteButton.addEventListener("click", () => {
        //console.log("Tried to delete project");
        delete_project(project);
    });
    return deleteButton;
}

function delete_project(pro){
    let arr = JSON.parse(localStorage.getItem("project_list"));
    for (let i = 0; i < arr.length; i++){
        if(JSON.stringify(arr[i]) === JSON.stringify(pro)){
            arr = arr.splice(i, i);
            localStorage.setItem("project_list", JSON.stringify(arr));
            build_projects();
            break;
        }
    }
}

function delete_task_button(){
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.textContent = "Delete Task";
    return deleteButton;
  //  console.log("Made button that deletes tasks");
}

function delete_task(task, project, taskList){
    let arr_taskList = taskList //JSON.parse(localStorage.getItem("task_list"));
    console.log(arr_taskList);
   // console.log(JSON.parse(localStorage.getItem("task_list")));
    for (let i = 0; i < arr_taskList.length; i++){
        if(JSON.stringify(arr_taskList[i]) === JSON.stringify(task)){
            // console.log("uhh this ran, i is:  " + i);
            
            // console.log(arr_taskList);
            arr_taskList.splice(i, 1);
            
           // console.log(arr_taskList);
            localStorage.setItem("task_list", JSON.stringify(arr_taskList));

            let arr_t = project["tasks"];
           // console.log(arr_t);
                for (let i = 0; i < arr_t.length; i++){
                    if(JSON.stringify(arr_t[i]) === JSON.stringify(task)){
                        //console.log("matched");
                        arr_t.splice(i, 1);
                        project["tasks"] = arr_t;
                }
            }
            break;
        }
    }
    return project;
}

function edit_task_button(task){

}

export {delete_project_button, delete_task_button, delete_task};