const container = document.getElementById("container");

import {make_form} from "./form";

function make_dash(){
    let newButton = document.createElement('button');
    container.appendChild(newButton);
    newButton.textContent = "New Task";
    newButton.addEventListener("click", () => {
        make_form();
        let dio = document.querySelector("dialog");
        dio.showModal();
    });
}

export {make_dash};