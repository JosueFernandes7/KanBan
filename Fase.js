export default class Fase {
  constructor(localization) {
    this.localization = localization;
    this.months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  }
  getLocalization() {
    return this.localization;
  }
  getFilhos() {
    return this.localization.children;
  }
  getDataAtual() {
    let diaAtual = new Date().getDate();
    let mesAtual = this.months[new Date().getMonth()]
    return `${diaAtual}, ${mesAtual}`
  }
  createTask(title, content, author) {
    const task = document.createElement('div');
    task.classList.add('task');
    task.draggable = true

    const h1 = document.createElement('h1');
    h1.textContent = title;

    const p = document.createElement('p');
    p.textContent = content;

    const spanAuthor = document.createElement('span');
    spanAuthor.textContent = author;
    spanAuthor.classList.add('taskAuthor');

    const spanDate = document.createElement('span');
    spanDate.textContent = this.getDataAtual();
    spanDate.classList.add('taskDate');

    const spanBox = document.createElement('span');
    spanBox.classList.add('spanBox')
    task.append(...[h1,p,spanAuthor,spanDate,spanBox]);
    return task;
  }
  insertTask(task) {
    this.localization.append(task);
  }
  removeTask(task) {
    this.localization.contains(task) && task.remove();
  }
}