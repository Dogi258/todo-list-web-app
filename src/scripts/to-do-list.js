import Task from "./task";

export default class ToDoList {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.list = [];
  }

  add(task) {
    this.list.push(task);
  }

  getTaskRemaining() {
    const taskRemaining = this.list.reduce((accumulator, currentTask) => {
      if (currentTask.isComplete == false) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);

    return taskRemaining;
  }
}
