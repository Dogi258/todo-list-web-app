import ToDo from "./to-do-list";

const listContainer = document.querySelector("[data-list]");
const newListForm = document.querySelector("[data-new-list-form");
const newListInput = document.querySelector("[data-new-list-input");
const deleteListButton = document.querySelector("[data-delete-list-button]");

const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-list-count]");
const taskContainer = document.querySelector("[data-task-container]");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";

export let allToDoList =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

export function render() {
  clearElement(listContainer);
  renderList();

  console.log(selectedListId);
  // Check to see if we have a selected list
  if (selectedListId === null) {
    listDisplayContainer.style.display = "none";
  } else {
    const selectedList = allToDoList.find((list) => list.id === selectedListId);
    // console.log(selectedList.add("sdfd"));
    console.log(selectedList);
    listDisplayContainer.style.display = "";
    listTitleElement.innerText = selectedList.name;
    const task = selectedList.getTaskRemaining();
    listCountElement.innerText = `${task} task remaining`;
  }
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
}

function onSubmitNewToDoList(e) {
  // Stops the form from submiting
  e.preventDefault();

  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const newList = new ToDo(listName);
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

function saveAndRender() {
  save();
  render();
}
