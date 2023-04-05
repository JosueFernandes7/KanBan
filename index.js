import Fase from './Fase.js'

let faseSelecionada = null;
const kanBanTodo = document.querySelector('.dropzone.todo')
const kanBanInProgress = document.querySelector('.dropzone.inProgress')
const kanBanDone = document.querySelector('.dropzone.done')

const modalTask = document.querySelector('.modalTask')
const formulario = document.querySelector('[data-formulario]')
const enviarTask = document.querySelector('#enviarTask')
let excluirTasks = document.querySelectorAll('.spanBox');
let tasks = document.querySelectorAll('.task');

const todo = new Fase(kanBanTodo)
const inProgress = new Fase(kanBanInProgress)
const done = new Fase(kanBanDone)
const fases = [todo, inProgress, done];
let elementoASerDropado = null;

window.addEventListener('load', carregarPagina)
// Carrega todos os arquivos
function carregarPagina() {
  fases.forEach(fase => {
    fase.getLocalization().addEventListener('drop',dropDrag);
    fase.getLocalization().addEventListener('dragenter',dragEnter)
    fase.getLocalization().addEventListener('dragleave',dragLeave)
    fase.getLocalization().addEventListener('dragover',(e) => e.preventDefault())
    fase.getLocalization().addEventListener('dragend',() => fases.forEach(fase =>fase.getLocalization().classList.remove('dragover')))
  })
  updateTasks()
}
window.addEventListener("beforeunload", function(event) {
  // Exibe uma mensagem de confirmação personalizada
  event.returnValue = "Você tem certeza que deseja sair da página?";
});



// Pega o item e coloca na fase
function dropDrag({currentTarget}) {
  fases.forEach(fase => {
    if(elementoASerDropado && fase.getLocalization() == currentTarget) {
      elementoASerDropado.parentNode.removeChild(elementoASerDropado);
      currentTarget.appendChild(elementoASerDropado);
    }
  })
}
// Adiciona a classa sobre o que esta em cima
function dragEnter({currentTarget}) {
  if(currentTarget.classList.contains('dropzone')) {
    currentTarget.classList.add('dragover')
  }
}
// Quando mouse sai remove a classe de todos menos o que esta
function dragLeave({currentTarget}) {
  fases.forEach(fase => {
    if(fase.getLocalization() != currentTarget) fase.getLocalization().classList.remove('dragover')
  })
}
// Altar o bg da task quando começa o evento
function iniciarDrag({target}) {
  target.style.background = '#ccc';
  elementoASerDropado = target;
}
// Quando acaba o evento da task remove o bg
function finalizarDrag({target}) {
  target.style.background = '#fff';
  target.children[4].style.background = '#fff';
}




// Seleciona todos os botões e Ativa uma função referenciando qual a dropzone ele representa
const todoBTN = document.querySelectorAll('.createTask > button')
todoBTN.forEach((btn) => btn.addEventListener('click', mostrarModal))
// Remove uma task selecionada
function removerTask({ currentTarget }) {
  const task = currentTarget.parentNode;
  const elementoPai = currentTarget.parentNode.parentNode;
  fases.forEach((fase) =>(fase.getLocalization() === elementoPai && fase.removeTask(task)))
}
// Cria a Task se for valida
function criarTask(event) {
  const titulo = formulario.titulo.value
  const conteudo = formulario.conteudo.value
  const autor = formulario.autor.value

  let formEnviado = false
  if (titulo && conteudo && autor) {
    fases.forEach((e) => {
      if (e.getLocalization() == faseSelecionada) {
        const taskCriada = e.createTask(titulo, conteudo, autor)
        e.insertTask(taskCriada);
        updateTasks()
        formEnviado = true
        event.preventDefault()
      }
    })
  }
  if (formEnviado) modalTask.style.display = 'none'
}
// Abre o Modal para o usuario
function mostrarModal({ target }) {
  modalTask.style.display = 'block'
  modalTask.addEventListener('click', escondeModal)

  faseSelecionada = target.parentNode.parentNode.children[0]
  enviarTask.addEventListener('click', criarTask)
}
// Remove o Modal e o Evento se clicar fora.
function escondeModal({ target, currentTarget }) {
  if (target === currentTarget) {
    modalTask.style.display = 'none'
    modalTask.removeEventListener('click', escondeModal)
  }
}
// Atualiza a lista de tasks
function updateTasks() {  
  excluirTasks = document.querySelectorAll('.spanBox');
  excluirTasks.forEach((task) => task.addEventListener('click', removerTask))
  tasks = document.querySelectorAll('.task');

  tasks.forEach(task => {
    task.addEventListener('dragstart', iniciarDrag)
    task.addEventListener('dragend',finalizarDrag)
  })
}