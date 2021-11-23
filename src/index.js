import "./style.css";
import ToDo from "./to-do.js";
import { render, clearElement } from "./all-list-module.js";

let allToDoList = [new ToDo(1, "Bob"), new ToDo(2, "Jenny")];

render(allToDoList);
