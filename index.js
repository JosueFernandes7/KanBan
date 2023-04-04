const todoDropzone = document.querySelector('.dropzone.todo');
const todoInProgress = document.querySelector('.dropzone.inProgress');
const todoDone = document.querySelector('.dropzone.done');

// Seleciona todos os botões e Ativa uma função referenciando qual a dropzone ele representa
const todoBTN = document.querySelectorAll(".createTask > button");
console.log(todoBTN);

todoBTN.forEach(btn => btn.addEventListener('click', ({target}) => {
  console.log(target.parentNode.parentNode.children[0]);
}))