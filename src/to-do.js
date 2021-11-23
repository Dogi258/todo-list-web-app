export default class ToDo {
  constructor(name) {
    this.id = Date.now().toString();
    this.name = name;
    this.task = [];
  }
}
