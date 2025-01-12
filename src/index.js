import "./default.css";
import { build, make_head_foot} from "./home.js";
import {storage_initalize} from "./storage.js";

make_head_foot();
build();

let wipe = document.createElement('button');
wipe.textContent = "Clear All";
wipe.addEventListener("click", () => storage_initalize());
document.querySelector("header").appendChild(wipe);