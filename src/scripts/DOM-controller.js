import Task from "./task";
import ToDo from "./to-do-list";

const listContainer = document.querySelector("[data-list]");
const newListForm = document.querySelector("[data-new-list-form");
const newListInput = document.querySelector("[data-new-list-input");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const clearCompleteTaskButton = document.querySelector(
  "[data-clear-complete-task-button]"
);

const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-list-count]");
const taskContainer = document.querySelector("[data-task-container]");

const taskTemplate = document.getElementById("task-template");

const newTaskForm = document.querySelector("[data-new-task-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";

export let allToDoList = localStorage.getItem(LOCAL_STORAGE_LIST_KEY)
  ? unserializeList()
  : [];

let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

export function render() {
  clearElement(listContainer);
  renderList();

  // Check to see if we have a selected list
  if (selectedListId === null) {
    listDisplayContainer.style.display = "none";
  } else {
    const selectedList = allToDoList.find((list) => list.id === selectedListId);
    listDisplayContainer.style.display = "";
    listTitleElement.innerText = selectedList.name;
    listCountElement.innerText = `${selectedList.getTaskRemaining()} task remaining`;
    clearElement(taskContainer);
    renderTask(selectedList);
  }
}

function renderTask(selectedList) {
  selectedList.list.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);

    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.isComplete;

    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);

    taskContainer.appendChild(taskElement);
  });
}

function renderList() {
  allToDoList.forEach((toDo) => {
    const newListElement = document.createElement("li");
    newListElement.dataset.listId = toDo.id;
    newListElement.classList.add("list-name");
    newListElement.innerText = toDo.name;

    if (toDo.id === selectedListId) {
      newListElement.classList.add("active-list");
    }

    listContainer.appendChild(newListElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function setEventListeners() {
  newListForm.addEventListener("submit", onSubmitNewToDoList);
  listContainer.addEventListener("click", onClickListItem);
  deleteListButton.addEventListener("click", onClickDeleteListButton);
  newTaskForm.addEventListener("submit", onSubmitNewTask);
  taskContainer.addEventListener("click", onClickTaskItem);
  clearCompleteTaskButton.addEventListener(
    "click",
    onClickClearCompleteTaskButton
  );
}

function onClickClearCompleteTaskButton(e) {
  const selectedList = allToDoList.find((list) => list.id === selectedListId);
  selectedList.list = selectedList.list.filter(
    (task) => task.isComplete == false
  );
  saveAndRender();
}

function onClickTaskItem(e) {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedList = allToDoList.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.list.find(
      (task) => task.id === e.target.id
    );

    selectedTask.isComplete = e.target.checked;
    save();
    listCountElement.innerText =
      listCountElement.innerText = `${selectedList.getTaskRemaining()} task remaining`;
  }
}

function onSubmitNewTask(e) {
  e.preventDefault();

  const taskName = newTaskInput.value;
  if (taskName == null || taskName === "") return;
  const newTask = new Task(Date.now().toString(), taskName);
  newTaskInput.value = null;

  const selectedList = allToDoList.find((list) => list.id === selectedListId);
  selectedList.add(newTask);
  saveAndRender();
}

function onSubmitNewToDoList(e) {
  // Stops the form from submiting
  e.preventDefault();

  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const newList = new ToDo(Date.now().toString(), listName);
  newListInput.value = null;
  allToDoList.push(newList);
  saveAndRender();
}

function onClickListItem(e) {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
}

function onClickDeleteListButton(e) {
  allToDoList = allToDoList.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(allToDoList));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function unserializeList() {
  const JSONList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY));

  const newList = JSONList.map((item) => {
    const toDo = new ToDo(item.id, item.name);
    Object.assign(toDo, item);
    return toDo;
  });

  return newList;
}

function saveAndRender() {
  save();
  render();
}
