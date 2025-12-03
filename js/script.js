function verificarRespuesta(pregunta) {
    // Obtener el valor seleccionado del grupo de entrantes
    const opciones = document.getElementsByName('entrante');
    let seleccionada = null;

    // Buscar cuál opción está seleccionada
    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
            seleccionada = opciones[i].value;
            break;
        }
    }

    // Verificar si se seleccionó alguna opción
    if (seleccionada === null) {
        alert("Por favor, selecciona una respuesta.");
        //return;
    }

    // Creamos las variables para controlar el nivel de difuminado
    // Y los divs que aparecen y desaparacen
    let img_difuminar = null;
    let difuminado = null;
    let div_aparece = null;
    let div_desaparece = null;

    // Definimos la respuesta correcta para cada pregunta
    // Para la pregunta 1, la correcta es la respuesta 2
    let respuestaCorrecta = null; 
    switch (pregunta) {
        case "pregunta1":
            respuestaCorrecta = "respuesta2";
            img_difuminar = "img_entrantes";
            difuminado = "blur(6px)";
            div_desaparece = "div_p1";
            div_aparece = "div_p2";
            break;
        case "pregunta2":
            respuestaCorrecta = "respuesta8";
            img_difuminar = "img_entrantes";
            difuminado = "blur(3px)";
            div_desaparece = "div_p2";
            div_aparece = "div_p3";
            break;
        case "pregunta3":
            respuestaCorrecta = "respuesta11";
            img_difuminar = "img_entrantes";
            difuminado = "blur(0px)";
            div_desaparece = "div_p3";
            div_aparece = "div_continuar";
            break;
        default:
            respuestaCorrecta = "ninguna";
    }

    // Verificar si la respuesta es correcta
    if (seleccionada === respuestaCorrecta) {
        alert("¡Respuesta correcta!");
        document.getElementById(img_difuminar).style.filter = difuminado;
        document.getElementById(div_desaparece).style.display = "none";
        document.getElementById(div_aparece).style.display = "block";
    } else {
        alert("¡Respuesta incorrecta! Vuelve a intentarlo.");
        //alert(respuestaCorrecta);
        //alert(seleccionada);
    }
}