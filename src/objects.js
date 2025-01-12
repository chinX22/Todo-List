import {new_task_storage, new_project_storage} from './storage';

function get_data(){
    let data = Array.from(document.querySelectorAll("form input")).reduce((acc, input) =>
    ({...acc,[input.id]: input.value }), {});
    return data;
}

let Task = function (){
    let task = (get_steps(get_data()));
    task.myProject;
    console.log(task);
    return task;
}

function get_steps(task){
    let mySteps = [];
    let numOfProps = Object.keys(task).length;
    let props = Object.keys(task);
    console.log ("props: ");
    console.log (props);
    let vals = Object.values(task);
    for (let i = 0; i < numOfProps; i++){
        if(props[i].includes("step")){
            delete task[props[i]];
            if(vals[i] !== ""){
                console.log("has a step");
                mySteps.push(vals[i]);
            }
        }
    }
    task.steps = mySteps;
    return task;
}

function Project (){
    const project = {};
    project.name = get_data();
    project.tasks = [];
    return project;
}

export {Task, Project, get_data};