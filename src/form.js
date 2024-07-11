import './form.css';
import {build_projects} from "./projects.js";
import {Task, Project} from './objects'
import {add_task_storage, new_project_storage, print_storage, task_to_project, add_project_storage} from './storage';
const container = document.getElementById("container");

function make_task(){
    let myModal = document.createElement("dialog");
    myModal.id = "taskModal";
    let myForm = document.createElement("form");
    myForm.id = "theForm";
    myForm.setAttribute('method',  'dialog');

    let m = [["name",'text', "Title: "], 
             ["description",'text', "Description: "], 
             ["dueDate", 'datetime-local', "Due Date: "]];
    for (let i = 0; i < 3; i++){
        let label0 = document.createElement("label");
        label0.className = m[i][0];
        label0.textContent = m[i][2];
        let input0 = document.createElement("input");
        input0.id = m[i][0];
        label0.setAttribute("for", m[i][0]);
        input0.setAttribute('type', m[i][1]);
        myForm.appendChild(input0);
        myForm.appendChild(label0);
    }
    
    let steps = document.createElement('ul');
    myForm.appendChild(steps);

    let addSteps = document.createElement('button');
    addSteps.textContent = "Add Step";
    addSteps.id = "steps";
    addSteps.addEventListener("click", (event) => {
        event.preventDefault();
        step_adder()
    });
    myForm.appendChild(addSteps);
    container.appendChild(myModal);
    myModal.showModal();

    
    function step_adder(){
        if (steps.childElementCount == 0){  
            let stepsTitle = document.createElement('h3');
            stepsTitle.textContent = "Steps"
            myForm.appendChild(stepsTitle);
        }
        if (steps.childElementCount < 30){
            let newstep = document.createElement('input');
            steps.appendChild(newstep);
            newstep.id = "step" + steps.childElementCount;
            newstep.setAttribute('type', 'input');
        } else {
            console.log("TOO MUCH!")
        }
    }


    let add = document.createElement('button');
    add.textContent = "Add and make another";
    add.id = "add";
    add.addEventListener("click", (event) => {
        event.preventDefault();
        // console.log(typeof myForm);
        // document.getElementById("theForm").submit();
        makesTask();
        myForm.reset();
    })
    myForm.appendChild(add);

    let submit = document.createElement('button');
    submit.textContent = "Add";
    submit.id = "submit";
    //submit.setAttribute('type', 'submit');
    submit.addEventListener("click", (event) => {
        event.preventDefault();
        // console.log(typeof myForm);
        // document.getElementById("theForm").submit();
        makesTask();
        close_form();
        add_project_storage();
        build_projects();
    })
    myForm.appendChild(submit);


    let cancel = document.createElement('button');
    cancel.textContent = "Cancel";
    cancel.id = "cancel";
    cancel.addEventListener('click', () => close_form());
    myForm.appendChild(cancel);
    
    function makesTask(){
        let newTask = Task();
        add_task_storage(newTask);
        task_to_project(newTask);
        print_storage();
    }
    // myForm.addEventListener("submit", (event) => {
    //     event.preventDefault();
    //     let newTask = Task();
    //     add_task_storage(newTask);
    //     task_to_project(newTask);
    //     print_storage();
    // })

    myModal.appendChild(myForm);

    container.appendChild(myModal);
}

function make_project (){
    let myModal = document.createElement("dialog");
    myModal.id = "projectModal";
    let myForm = document.createElement("form");
    myForm.setAttribute('method',  'dialog');

    let label = document.createElement("label");
    label.textContent = "Name: ";
    let input = document.createElement("input");
    input.id = "name";
    label.setAttribute("for", "name");
    input.setAttribute('type', "text");
    myForm.appendChild(input);
    myForm.appendChild(label);

    let cancel = document.createElement('button');
    cancel.textContent = "Cancel";
    cancel.id = "cancel";
    cancel.addEventListener('click', () => close_form());
    myForm.appendChild(cancel);
    myModal.appendChild(myForm);

    let newTaskButton = document.createElement('button');
    newTaskButton.textContent = "New Task";
    myForm.appendChild(newTaskButton);
    newTaskButton.addEventListener("click", (event) => {
        event.preventDefault();
        let newPro = Project();
        new_project_storage(newPro);
        close_form();
        make_task();
    });
    container.appendChild(myModal);
    myModal.showModal();
}

function close_form(){
    let myModal = document.querySelector("dialog");
    console.log("closed!");
    myModal.remove();
}

export {make_task, make_project, close_form};