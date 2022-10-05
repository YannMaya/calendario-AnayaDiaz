

const tareas = []
let idUnico = 0

class Tarea {
    constructor (nombre, lugar, hora, idUnico){
    //propiedades
    this.nombre = nombre,
    this.lugar = lugar,
    this.hora = hora,
    this.idUnico = idUnico++
    }
}

const contenedor = document.getElementById("contenedor")
const botonEliminar = document.getElementById("botonEliminar")
const botonEliminarTodo = document.getElementById("eliminarTodo")
const botonAgregarTarea = document.getElementById("agregarTarea")
const botonOcultarTareas = document.getElementById("ocultarTareas")
const botonMostrarTareas = document.getElementById("mostrarTareas")

const eventListeners = () =>{
    document.addEventListener("DOMContentLoaded", ()=>{
        tareas = JSON.parse(localStorage.getItem("tareas"))
    mostrarListaTareas()
    })
}

function mostrarListaTareas(array){
    contenedor.innerHTML = ""
    array.forEach((tarea)=>{
        const {nombre, lugar, hora, idUnico} = tarea
        const listaTarea = document.createElement("div")
        listaTarea.id = idUnico
        listaTarea.innerHTML = `<p>Tarea: ${nombre}</p>
                                <p>Lugar: ${lugar}</p>
                                <p>Hora: ${hora}</p>
                                <button id="botonEliminar${idUnico}" class="btn btn-outline-danger ${idUnico}" style="width:6rem">Eliminar</button>
                                <br>
                                `
        listaTarea.setAttribute("class", "card")
        listaTarea.setAttribute("style", "width: 11rem")
        contenedor.append(listaTarea)
        eliminarTarea(idUnico)
    })
    eliminarTodo()
}

function agregarTareaNueva(array){
    const agregarNombreTarea = document.getElementById("nombreTarea")
    const agregarLugar = document.getElementById("lugarTarea")
    const agregarHora = document.getElementById("horaTarea")
    
    if(agregarHora.value.length > 0 && agregarLugar.value.length > 0 && agregarNombreTarea.value.length > 0){
        const nuevaTarea = new Tarea (agregarNombreTarea.value, agregarLugar.value, agregarHora.value, array.length+1)
        array.push(nuevaTarea)
        mostrarListaTareas(array)
        sincronizarStorage()
    }else{
        Swal.fire({
            icon: 'warning',
            title: 'Oopsi...',
            text:'Necesitas rellenar los campos',
            footer: '<a href="">¿Quieres saber más?</a>',
            backdrop: `
            url(media/ops.gif) 
            left top
            `
        })
    }
    agregarHora.value = ""
    agregarLugar.value = ""
    agregarNombreTarea.value = ""
}

function ocultarTareas(){
    contenedor.innerHTML = ""
}

function eliminarTarea(idUnico){
    let botonEliminar = document.getElementById("botonEliminar" + idUnico)
    botonEliminar.addEventListener('click', (e)=>{
        tareaAEliminar = e.target
            console.log("ID", tareaAEliminar.id)
            let card = tareaAEliminar.closest('.card')
            tareas.splice(card, 1)
            card.remove()
            removeFromLocalStorage(idUnico)
            Swal.fire({
                icon: 'success',
                title: 'Has eliminado la tarea'
            })
    })
}

function eliminarTodo(){
    botonEliminarTodo.addEventListener('click', ()=>{
        tareas.length = 0
        console.log(tareas)
        localStorage.clear()
        contenedor.innerHTML = ''
        Swal.fire({
            icon: 'success',
            title: 'Has eliminado todas las tareas'
        })
/*         Swal.fire({
            icon: 'warning',
            title: '¿Estas seguro de eliminar todo?',
            showCancelButton: true,
            confirmButtonText: 'Si, seguro',
            cancelButtonText: 'Nope'
        }).then((result)=>{
            if(result.isConfirmed){
                Swal.fire({
                    title: 'Se han borrado todas las tareas',
                    icon: 'success',
                    text: 'Todas las tareas se han borrado'
                })
            }
        }) */
    })
}   

const sincronizarStorage = () =>{
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

botonAgregarTarea.addEventListener("click", ()=>{
    agregarTareaNueva(tareas)
})

botonMostrarTareas.addEventListener("click", () =>{
    mostrarListaTareas(tareas)
})


botonOcultarTareas.addEventListener("click",()=>{
    ocultarTareas()
})

function removeFromLocalStorage(idUnico){
    let tareas = JSON.parse(localStorage.getItem("tareas"))
    let nuevasTareas = tareas.filter((tarea)=>{
        return tarea.idUnico !== idUnico
    }) 
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas))
}
