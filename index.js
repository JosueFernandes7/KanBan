import Fase from './Fase.js'

let faseSelecionada = ''
const kanBanTodo = document.querySelector('.dropzone.todo')
const kanBanInProgress = document.querySelector('.dropzone.inProgress')
const kanBanDone = document.querySelector('.dropzone.done')

const todo = new Fase(kanBanTodo)
const inProgress = new Fase(kanBanInProgress)
const done = new Fase(kanBanDone)

const modalTask = document.querySelector('.modalTask')
const formulario = document.querySelector('[data-formulario]')
const enviarTask = document.querySelector('#enviarTask')
let excluirTasks = document.querySelectorAll('.task');

// Seleciona todos os botões e Ativa uma função referenciando qual a dropzone ele representa
const todoBTN = document.querySelectorAll('.createTask > button')
todoBTN.forEach((btn) => btn.addEventListener('click', mostrarModal))

function removerTask({ currentTarget }) {
  const elementoPai = currentTarget.parentNode;
  [todo, inProgress, done].forEach((fase) =>(fase.getLocalization() === elementoPai && fase.removeTask(currentTarget)))
}

// Abre o Modal para o usuario
function mostrarModal({ target }) {
  modalTask.style.display = 'block'
  modalTask.addEventListener('click', escondeModal)

  faseSelecionada = target.parentNode.parentNode.children[0]
  enviarTask.addEventListener('click', criarTask)
}
// Cria a Task e Enviar se for valida
function criarTask(event) {
  const titulo = formulario.titulo.value
  const conteudo = formulario.conteudo.value
  const autor = formulario.autor.value

  let formEnviado = false
  if (titulo && conteudo && autor) {
    [todo, inProgress, done].forEach((e) => {
      if (e.getLocalization() == faseSelecionada) {
        const taskCriada = e.createTask(titulo, conteudo, autor)
        e.insertTask(taskCriada);
        updateElement(excluirTasks, document.querySelectorAll('.task'))
        formEnviado = true
        event.preventDefault()
      }
    })
  }
  if (formEnviado) modalTask.style.display = 'none'
}
// Remove o Modal e o Evento se clicar fora.
function escondeModal({ target, currentTarget }) {
  if (target === currentTarget) {
    modalTask.style.display = 'none'
    modalTask.removeEventListener('click', escondeModal)
  }
}

function updateElement(excluirTasks, caminho) {
  excluirTasks = caminho;
  excluirTasks.forEach((task) => task.addEventListener('click', removerTask))
}