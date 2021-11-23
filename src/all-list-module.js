import ToDo from "./to-do";

const listContainer = document.querySelector("[data-list]");
const newListForm = document.querySelector("[data-new-list-form");
const newListInput = document.querySelector("[data-new-list-input");

export let allToDoList = [];

export function render() {
  clearElement(listContainer);

  allToDoList.forEach((toDo) => {
    const newListElement = document.createElement("li");
    newListElement.dataset.listId = toDo.id;
    newListElement.classList.add("list-name");
    newListElement.innerText = toDo.name;
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
}

function onSubmitNewToDoList(e) {
  // Stops the form from submiting
  e.preventDefault();

  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const newList = new ToDo(listName);
  newListInput.value = null;
  allToDoList.push(newList);

  render();
}
