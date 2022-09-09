let condicion = true
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

const preguntas = [
    {prompt: "Where do you live?\n(a)I lives in Argentina \n(b)I am live in USa \n(c)I live in Mexico",
    opcionCorrecta: "c"
},
    {prompt: "What did you do yesterday?\n(a)I did worked in my office \n(b)I went to my office \n(c)I did went to my office",
    opcionCorrecta: "b"
},
    {prompt: "What are you going to do tomorrow?\n(a)I will to study \n(b)I have go to study \n(c)I am going to study",
    opcionCorrecta: "c"
},
]

let score = 0;

do{
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
}while(condicion)