fetch("https://www.googleapis.com/calendar/v3/calendars/es.ar%23holiday%40group.v.calendar.google.com/events?key=AIzaSyBjJiAFfyMDSOwJOuJ7LW_aWdJ-hNuXUr4")
.then((data)=>{
    data.json().then((respuesta)=>{
        let today = new Date ()
        let todayParse = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
        let encontrado = respuesta.items.find((e)=>{
            return e.start.date === todayParse   
        })
        let feriado = document.getElementById("feriado")
        feriado.textContent = encontrado?.summary
    })
})

const tareas = []
let idUnico = 0

class Tarea {
    constructor (nombre, lugar, hora, prioridad, idUnico){
    //propiedades
    this.nombre = nombre,
    this.lugar = lugar,
    this.hora = hora,
    this.prioridad = prioridad,
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
        const {nombre, lugar, hora, prioridad, idUnico} = tarea
        const listaTarea = document.createElement("div")
        listaTarea.id = idUnico
        listaTarea.innerHTML = `<p>Tarea: ${nombre}</p>
                                <p>Lugar: ${lugar}</p>
                                <p>Hora: ${hora}</p>
                                <p class="${prioridad === "Urgente" ? "etiquetaRoja" : prioridad === "Muy importante" ? "etiquetaAmarilla" : "etiquetaAzul"}">Prioridad: ${prioridad}</p>
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
    const agregarPrioridad = document.getElementById("prioridad")
    
    if(agregarHora.value.length > 0 && agregarLugar.value.length > 0 && agregarNombreTarea.value.length > 0){
        const nuevaTarea = new Tarea (agregarNombreTarea.value, agregarLugar.value, agregarHora.value, agregarPrioridad.value,array.length+1)
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
        Swal.fire({
            icon: 'warning',
            title: '¿Quieres eliminar todas las tareas?',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'no, no eliminar',
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
        }).then((resultado)=>{
            if(resultado.isConfirmed){
                Swal.fire({
                    title: 'Has eliminado todas las tareas',
                    icon: 'success',
                    confirmButtonColor: 'green'
                })
                tareas.length = 0
                console.log(tareas)
                localStorage.removeItem("tareas")
                contenedor.innerHTML = ''
            }else{
                Swal.fire({
                    title: 'No se eliminaron las tareas',
                    icon: 'error',
                    confirmButtonColor: 'red',
                })
            }
        })
    })
}   

function removeFromLocalStorage(idUnico){
    let tareas = JSON.parse(localStorage.getItem("tareas"))
    let nuevasTareas = tareas.filter((tarea)=>{
        return tarea.idUnico !== idUnico
    }) 
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas))
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

//LUXON
const DateTime = luxon.DateTime
const fechaAhora = DateTime.now()
fechaAhora.setLocale('en')
console.log(fechaAhora)

let divFechaHoy = document.getElementById("fechaHoy")
let fecha = fechaAhora.toLocaleString(DateTime.DATE_MED)
divFechaHoy.innerHTML = `${fecha}`
