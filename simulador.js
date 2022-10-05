const inputNombre = document.getElementById('inputNombre')
const btnNombre = document.getElementById('btnNombre')
const registro = document.getElementById('registro')
const test = document.getElementById('test')
const btnTest = document.getElementById('btnTest')




btnNombre.addEventListener('click', ()=>{
    registro.innerHTML = `<div class="card" style="width: 10rem;"> Bienvenido ${inputNombre.value}<div>`
})

btnTest.addEventListener('click', ()=>{
    mostrarTest();
})

const mostrarTest = () => {
    preguntas.forEach((item, opcion) => {
        const question = document.createElement('div')
        question.innerHTML = 
                            `<br>
                            <label>
                            ${item.prompt}
                            <br>
                            </label>`
        const options = document.createElement('div')
        options.innerHTML = `<input type="radio" name="${opcion}" value=${item.opcionCorrecta}>${preguntas[1]}`
        console.log(options)
        question.appendChild(options)
        test.appendChild(question)
    })
}


/* let condicion = true
let respuestaInicial
function iniciarTest() {
    respuestaInicial = prompt("Bienvenido a nuestra página para aprender inglés. Nuestro sistema le ayudará a determinar el nivel en donde debería empezar a estudiar. ¿Quiere descubrirlo ahora? SI / NO") 
}

const regresar = () => {
    let respuestaRepeticion = prompt("¿Deseas regresar al menu inicial? - Respuesta SI / NO")
    if(respuestaRepeticion.toLocaleLowerCase() == "si" || respuestaRepeticion.toLocaleLowerCase() =="sí" ){
        condicion = true
        score = 0
    }else{
        alert("Have a nice day")
        condicion = false
    };
}

function determinarNivel (puntaje){
    switch(puntaje){
        case 1:
            alert("Comienza con el nivel A1");
        break
        case 2:
            alert("Comienza con el nivel A2");
        break
        case 3:
            alert("Comienza con el nivel B1");
        break
        default: alert("Comienza con el nivel A0");
        break
    }
}
 */
const preguntas = [{
    prompt: "Where do you live?",
    opciones: {
        a: "I lives in Argentina", 
        b: "I am live in USA", 
        c:"I live in Mexico",
    },
    opcionCorrecta: "c"
},
    {prompt: "What did you do yesterday?",
    opciones: {
        a: "I went to work", 
        b: "I did went to work", 
        c:"I did to work",
    },
    opcionCorrecta: "a"
},
    {prompt: "What are you going to do tomorrow?",
    opciones: {
        a: "I am work", 
        b: "I am going to work", 
        c:"I work to work",
    },
    opcionCorrecta: "b"
},
]

/* let score = 0; */

/* do{
    iniciarTest();
    if(respuestaInicial.toLocaleLowerCase() == "si" || respuestaInicial.toLocaleLowerCase() == "sí" ){
        preguntas.forEach(function(pregunta){
            let respuesta = prompt(pregunta.prompt);
            if(respuesta == pregunta.opcionCorrecta){
                score++;
                alert("correct!");
            }else{
                alert("wrong!");
            }
        })
        alert("Obtuviste " + score + "/" + preguntas.length);

        determinarNivel(score);
        regresar ();

    }else{
        alert("Have a nice day")
        condicion = false
    }
}while(condicion) */