import './form.css';
import {build_projects} from "./projects.js";
import {Task, Project} from './objects'
import {add_task_storage, new_project_storage, print_storage, task_to_project, 
        add_project_storage, update_task, update_project} from './storage';
import { build_home } from './home.js';

function edit_task_form(task){
    let old_task = task;
    let myModal = document.createElement("dialog");
    myModal.id = "taskModal";
    let myForm = document.createElement("form");
    myForm.id = "taskForm";
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
        if (task !== undefined){
            input0.value = task[m[i][0]];
        }
        myForm.appendChild(input0);
        myForm.appendChild(label0);
    }
    
    let steps = document.createElement('ul');
    steps.id = "steps";
    myForm.appendChild(steps);

    let addSteps = document.createElement('button');
    addSteps.textContent = "Add Step";
    addSteps.id = "stepsButton";
    addSteps.addEventListener("click", (event) => {
        event.preventDefault();
        step_adder()
    });
    myForm.appendChild(addSteps);
    
    if (task !== undefined){
        if(task.steps.length > 0){
            myForm.appendChild(makeStepsTitle());
            for (let step of task.steps){
                let newstep = makeStep();
                newstep.id = "step" + steps.childElementCount;
                newstep.value = step;
                steps.appendChild(newstep);
            }

        }
    }

    
    function step_adder(){
        if (steps.childElementCount == 0){
            myForm.appendChild(makeStepsTitle());
        }
        if (steps.childElementCount < 30){
            let newstep = makeStep();
            newstep.id = "step" + steps.childElementCount;
            steps.appendChild(newstep);
        } else {
            console.log("TOO MUCH!")
        }
    }


    let update = document.createElement('button');
    update.textContent = "Update";
    update.id = "submit";
    update.className = "devon";
    update.addEventListener("click", (event) => {
        event.preventDefault();
        // console.log(typeof myForm);
        // document.getElementById("theForm").submit();
        makesTask();
        close_form();
    })
    myForm.appendChild(update);


    let cancel = document.createElement('button');
    cancel.textContent = "Cancel";
    cancel.id = "cancel";
    cancel.addEventListener('click', () => close_form());
    myForm.appendChild(cancel);
    
    function makesTask(){
        let newTask = Task();
        task_to_project(newTask);
        if(task !== undefined){
            update_task(old_task, newTask);
        } else {
            add_task_storage(newTask);
            update_project();
        }
        build_home();//
        print_storage();
    }

    function makeStepsTitle(){
        let stepsTitle = document.createElement('h3');
        stepsTitle.textContent = "Steps"
        stepsTitle.id = "steps-title";
        return stepsTitle;
    }

    function makeStep(){
        let newstep = document.createElement('input');
        newstep.className = "step";
        newstep.setAttribute('type', 'input');
        return newstep;
    }

    // myForm.addEventListener("submit", (event) => {
    //     event.preventDefault();
    //     let newTask = Task();
    //     add_task_storage(newTask);
    //     task_to_project(newTask);
    //     print_storage();
    // })

    myModal.appendChild(myForm);
    document.querySelector("body").appendChild(myModal);
    myModal.showModal();
}


//---------------------------------------------//


function make_task(){
    let myModal = document.createElement("dialog");
    myModal.id = "taskModal";
    let myForm = document.createElement("form");
    myForm.id = "taskForm";
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
    steps.id = "steps";
    myForm.appendChild(steps);

    let addSteps = document.createElement('button');
    addSteps.textContent = "Add Step";
    addSteps.id = "stepsButton";
    addSteps.addEventListener("click", (event) => {
        event.preventDefault();
        step_adder()
    });
    myForm.appendChild(addSteps);

    
    function step_adder(){
        if (steps.childElementCount == 0){  
            let stepsTitle = document.createElement('h3');
            stepsTitle.textContent = "Steps"
            stepsTitle.id = "steps-title";
            myForm.appendChild(stepsTitle);
        }
        if (steps.childElementCount < 30){
            let newstep = document.createElement('input');
            newstep.id = "step" + steps.childElementCount;
            steps.appendChild(newstep);
            newstep.className = "step";
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
        close_form();
        make_task();
        // document.getElementById("steps").remove();
        // document.getElementById("steps-title").remove();
        // let steps = document.createElement('ul');
        // steps.id = "steps";
        // myForm.appendChild(steps);
        
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
        build_home();//
    })
    myForm.appendChild(submit);


    let cancel = document.createElement('button');
    cancel.textContent = "Cancel";
    cancel.id = "cancel";
    cancel.addEventListener('click', () => close_form());
    myForm.appendChild(cancel);
    
    function makesTask(){
        let newTask = Task();
        task_to_project(newTask);
        add_task_storage(newTask);
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
    document.querySelector("body").appendChild(myModal);
    myModal.showModal();
}


//----------------------------------------------------//


function make_project (){
    let myModal = document.createElement("dialog");
    myModal.id = "projectModal";
    let myForm = document.createElement("form");
    myForm.setAttribute('method',  'dialog');
    myForm.id = "projectForm";

    let cancel = document.createElement('button');
    cancel.textContent = "Cancel";
    cancel.id = "cancel";
    cancel.focus({ focusVisible: false });
    cancel.addEventListener('click', () => close_form());
    myForm.appendChild(cancel);

    let label = document.createElement("label");
    label.textContent = "Project Name:";
    let input = document.createElement("textarea");
    input.id = "fake-name";
    label.setAttribute("for", "name");
    input.setAttribute('form', "projectForm");
    input.setAttribute('wrap', "hard");

    let real_input = document.createElement("input");
    real_input.id = "name";
    myForm.appendChild(real_input);

    let inputDiv = document.createElement("div");
    inputDiv.id = "inputDiv";
    inputDiv.appendChild(label);
    inputDiv.appendChild(input);
    myForm.appendChild(inputDiv);

    myModal.appendChild(myForm);

    let newTaskButton = document.createElement('button');
    newTaskButton.textContent = "Add Task";
    newTaskButton.id = "newTask";
    myForm.appendChild(newTaskButton);
    newTaskButton.addEventListener("click", (event) => {
        event.preventDefault();
        real_input.value = input.value;
        console.log(input.value);
        if(document.getElementById('name').value !== ""){
        let newPro = Project();
        new_project_storage(newPro);
        close_form();
        make_task();
        }
    });
    document.querySelector("body").appendChild(myModal);
    myModal.showModal();
}

function close_form(){
    let myModal = document.querySelector("dialog");
    //console.log("closed!");
    myModal.remove();
}

export {make_task, make_project, close_form, edit_task_form};