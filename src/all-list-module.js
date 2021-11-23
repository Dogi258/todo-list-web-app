const listContainer = document.querySelector("[data-list]");

export function render(list) {
  clearElement(listContainer);

  list.forEach((toDo) => {
    const newListElement = document.createElement("li");
    newListElement.dataset.listId = toDo.id;
    newListElement.classList.add("list-name");
    newListElement.innerText = toDo.name;
    listContainer.appendChild(newListElement);
  });
}

export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
