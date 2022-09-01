//este es un algoritmo que determina en qué nivel un usuario debe empezar a estudiar inglés según responda a las preguntas que se le hacen

let condicion = true
let respuestaInicial
function IniciarTest() {
    respuestaInicial = prompt("Bienvenido a nuestra página para aprender inglés. Nuestro sistema le ayudará a determinar el nivel en donde debería empezar a estudiar. ¿Quiere descubrirlo ahora? SI / NO") 
    return respuestaInicial 
}

const repetirTest = () => {
    let respuestaRepeticion = prompt("¿Deseas realizar el test otra vez? - Respuesta SI / NO")
    if(respuestaRepeticion.toLocaleLowerCase() == "si" || respuestaRepeticion.toLocaleLowerCase() =="sí" ){
        return condicion = true
    }else{
        alert("Have a nice day")
        return condicion = false
    };
}


do{
    IniciarTest();
    if(respuestaInicial.toLocaleLowerCase() == "si" || respuestaInicial.toLocaleLowerCase() == "sí" ){
        let primeraPregunta = prompt("¿Puedes dar informarción sobre ti y otros? - Respuesta SI / NO")
        if (primeraPregunta == "si" || primeraPregunta.toLocaleLowerCase() == "sí" ){
            let segundaPregunta = prompt("¿Puedes hablar de experiencias pasadas y futuras? - Respuesta SI / NO") 
            if (segundaPregunta == "si" || segundaPregunta.toLocaleLowerCase() == "sí" ){
                alert("Comienza en el nivel B1")
            }else{
                alert("Comienza con el nivel A2")
            }
        }else{
            alert("Comienza con el nivel A1")
        }

        repetirTest ();

    }else{
        alert("Have a nice day")
        condicion = false
    }
    
}while(condicion)