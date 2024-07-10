import './form.css';
import {create_task} from './task'
const container = document.getElementById("container");

function make_form(){
    let myModal = document.createElement("dialog");
    let myForm = document.createElement("form");
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

    let submit = document.createElement('button');
    submit.textContent = "Create";
    submit.id = "submit";
    submit.setAttribute('type', 'submit');
    myForm.appendChild(submit);


    let cancel = document.createElement('button');
    cancel.textContent = "Cancel";
    cancel.id = "cancel";
    cancel.addEventListener('click', () => close_form());
    myForm.appendChild(cancel);
    
    myForm.addEventListener("submit", (event) => {
        event.preventDefault();
        create_task();
    })

    myModal.appendChild(myForm);

    container.appendChild(myModal);
}

function close_form(){
    let myModal = document.querySelector("dialog");
    myModal.remove();
}

export {make_form, close_form};