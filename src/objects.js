import {new_task_storage, new_project_storage} from './storage';

function get_data(){
   // console.log("you just read a form");
    let data = Array.from(document.querySelectorAll("form input")).reduce((acc, input) =>
    ({...acc,[input.id]: input.value }), {});
    return data;
}

let Task = function (){
    let task = get_data();
    task.myProject;
    console.log(task);
    task.give_props = function(){
        return (Object.getOwnPropertyNames(task));
    }
    task.give_data = function(){
        return (Object.values(task));
    }
    return task;
}

function Project (){
    const project = {};
    project.name = get_data();
    project.tasks = [];
    return project;
}

export {Task, Project, get_data};

//PPp