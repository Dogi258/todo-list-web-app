export default class ToDoList {
  constructor(name) {
    this.id = Date.now().toString();
    this.name = name;
    this.list = [];
  }

  add(task) {
    this.list.push(task);
  }

  remove(index) {
    if (index > -1) {
      this.list.splice(index, 1);
    }
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
