import "./default.css";
import { build, make_head_foot} from "./home.js";
import {storage_initalize, print_storage} from "./storage.js";

make_head_foot();
build();
print_storage();

let wipe = document.createElement('button');
wipe.textContent = "WWIPPPPEEE";
wipe.addEventListener("click", () => storage_initalize());
document.querySelector("header").appendChild(wipe);

// const container = document.getElementById('container');
// const but = document.createElement('button');
// but.textContent = "but";
// but.addEventListener('click', () => print_storage());
// container.appendChild(but);