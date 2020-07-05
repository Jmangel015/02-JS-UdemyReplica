// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
// Listeners
cargarEventListeners();

function cargarEventListeners() {
  //Dispara cunado se presiona "Agregar carrito"
  cursos.addEventListener('click', compraCurso);
  carrito.addEventListener('click', borrarCuros);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//Function
//funcion que añade el curso al carrito
function compraCurso(e) {
  e.preventDefault();
  //Delegation para agregar-carrito
  if (e.target.classList.contains('agregar-carrito')) {
    const curso = e.target.parentElement.parentElement;
    //Enviamos el curso a esta funcion
    leerDatosCurso(curso);
  }
}

//Le los datos del curso
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
  };

  insertarCarrito(infoCurso);
}

function insertarCarrito(curso) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td> 
      <img src = "${curso.imagen}" width= 100>
    </td>
    <td> 
      ${curso.titulo}
    </td>
    <td> 
      ${curso.precio}
    </td>
    <td> 
    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>    
  `;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);
}

function borrarCuros(e) {
  e.preventDefault();
  let curso, cursoId;
  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector('a').getAttribute('data-id');
  }
  eliminarCursoLocalStorage(cursoId);
}
// eliminar los cursos del carrito
function vaciarCarrito(e) {
  //Forma lenta
  // listaCursos.innerHTML = ``;
  //forma rapida
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }
  vaciarLocalStorage();

  return false;
}
// guardar en local storage
function guardarCursoLocalStorage(curso) {
  let cursos;
  cursos = obtenerCursoLocalStorage();
  //el crurso seleccionado lo manda al local storage
  cursos.push(curso);
  localStorage.setItem('cursos', JSON.stringify(cursos));
}
//Comprueba los cursos que hay en localstorage
function obtenerCursoLocalStorage() {
  let cursosLS;
  if (localStorage.getItem('cursos') === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem('cursos'));
  }
  return cursosLS;
}
//Imprime los cursos de local storage
function leerLocalStorage() {
  let cursosLS;
  cursosLS = obtenerCursoLocalStorage();
  cursosLS.forEach(function (curso) {
    //construir el templade
    const row = document.createElement('tr');
    row.innerHTML = `
    <td> 
      <img src = "${curso.imagen}" width= 100>
    </td>
    <td> 
      ${curso.titulo}
    </td>
    <td> 
      ${curso.precio}
    </td>
    <td> 
    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>    
  `;
    listaCursos.appendChild(row);
  });
}
//eliminar curso por local Storage

function eliminarCursoLocalStorage(curso) {
  let cursosLS;

  cursosLS = obtenerCursoLocalStorage();
  cursosLS.forEach(function (cursoLS, index) {
    if (cursoLS.id == curso) {
      cursosLS.splice(index, 1);
    }
  });
  localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//Vaciar Local Storage
function vaciarLocalStorage() {
  localStorage.clear();
}
