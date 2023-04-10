//variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito= document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos= document.querySelector('#lista-cursos');
let articulosCarrito =[];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando"agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminaCurso);

    //muestra los cursos de local storage
    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito') ) || [];

        carritoHTML();
        })

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito= [];
        limpiarHTML();
    });
}

//funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
//elimina un curso del carrito
function eliminaCurso(e){
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //elimina del arreglo
        articulosCarrito =articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}


//lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    console.log(curso);
    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisa si un elemento ya existe en el carrito
    const existe =articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        const cursos =articulosCarrito.map (curso => {
            if( curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else {
                return curso;
            }
        })
        articulosCarrito =[...cursos];
    }else{
        // agrega elementos al arreglo de carrito
        articulosCarrito= [...articulosCarrito,infoCurso];
    }


    console.log(articulosCarrito);
    carritoHTML();
}
//muestra el carrito de compras en el HTML
function carritoHTML(){
    //limpiar HTML
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const {imagen,titulo,precio,cantidad,id } = curso ;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href=# class= "borrar-curso" data-id="${id}" > X </a>
        </td>
        `;
        //agrega el HTML del carrito en el Tbody 
        contenedorCarrito.appendChild(row);
    })
    //agregar el carrito de compras al storage
    sincronizarStorage();    
}

function sincronizarStorage (){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML="";
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}