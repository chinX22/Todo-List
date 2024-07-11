import "./default.css";
import { build_home, make_head_foot} from "./home.js";
import {storage_initalize, print_storage} from "./storage.js";

storage_initalize();
make_head_foot();
build_home();
print_storage()


// const container = document.getElementById('container');
// const but = document.createElement('button');
// but.textContent = "but";
// but.addEventListener('click', () => print_storage());
// container.appendChild(but);