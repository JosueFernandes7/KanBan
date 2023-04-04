export default class Fase {
  constructor(name, localization) {
    this.name = name;
    this.localization = localization;
    this.months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  }
  getLocalization() {
    return this.localization;
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

    task.append(...[h1,p,spanAuthor,spanDate]);
    return task;
  }
  insertTask(task) {
    this.localization.append(task);
  }
}