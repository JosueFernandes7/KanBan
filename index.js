import Fase from './Fase.js'

// console.log(a.getDataAtual());
let faseSelecionada = null
const kanBanTodo = document.querySelector('.dropzone.todo')
const kanBanInProgress = document.querySelector('.dropzone.inProgress')
const kanBanDone = document.querySelector('.dropzone.done')

const todo = new Fase('Todo', kanBanTodo)
const inProgress = new Fase('Todo', kanBanInProgress)
const done = new Fase('Todo', kanBanDone)

const modalTask = document.querySelector('.modalTask')
const formulario = document.querySelector('[data-formulario]')
const enviarTask = document.querySelector('#enviarTask')

// Seleciona todos os botões e Ativa uma função referenciando qual a dropzone ele representa
const todoBTN = document.querySelectorAll('.createTask > button')
console.log(todoBTN)
todoBTN.forEach((btn) => btn.addEventListener('click', mostrarModal))

function mostrarModal({ target }) {
  modalTask.style.display = 'block'
  modalTask.addEventListener('click', escondeModal)

  faseSelecionada = target.parentNode.parentNode.children[0]
  enviarTask.addEventListener('click', criarTask)
}

function criarTask(event) {
  event.preventDefault()
  const titulo = formulario.titulo.value
  const conteudo = formulario.conteudo.value
  const autor = formulario.autor.value
  let formEnviado = false
  ;[todo, inProgress, done].forEach((e) => {
    if (e.getLocalization() == faseSelecionada) {
      e.createTask(titulo, conteudo, autor)
      formEnviado = true;
    }
  })
  if(formEnviado) modalTask.style.display = 'none'

}

// Remove o Modal e o Evento se clicar fora.
function escondeModal({ target, currentTarget }) {
  if (target === currentTarget) {
    modalTask.style.display = 'none'
    modalTask.removeEventListener('click', escondeModal)
  }
}
