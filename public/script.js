document.getElementById('access-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el envío por defecto del formulario
    const passwordInput = document.getElementById('password').value.toLowerCase(); // Convertir a minúsculas
    const errorMessage = document.getElementById('error-message');

    // Inicializar el mensaje de error como vacío
    let customMessage = '';

    // Redirecciones basadas en palabras clave específicas
    if (passwordInput === 'tamara' || passwordInput === 'tami') {
        window.location.href = 'page2.html';
        return; // Detenemos la ejecución aquí
    }

    if (passwordInput === 'tamarabella') {
        window.location.href = 'page4.html';
        return;
    }
    if (passwordInput === 'engrapadora') {
    window.location.href = 'page5.html';
    return;
    }

    // Mensajes de error personalizados
    switch (passwordInput) {
        case 'nadine':
            customMessage = 'Este no es un acceso a la carta más importante, que si todavia no leiste, la clave es otra. Si la leiste, como escribí: me gustaria remediar un poco lo que hablaba devolviendote un momento de alegria.. Por eso, puede parecer poco y tonto pero, una vez me dijiste algo que me dió mucha risa y te queria contar unos chistes respecto a eso. Podes leerlos, si queres, adivinando la palabra -> objeto pequeño y sencillo pero, "podría ser una buena arma para matar a un zombie".';
            break;
        case 'palmera':
            customMessage = 'Incorrecto. ¿Quién pondría la clave al lado de la clave?';
            break;
        case 'sharingthenighttogether':
            customMessage = '¿Te gustó la canción? Si es así, podés navegar a un lugar diferente, donde te puedo mostrar algo más alla si lo deseas y tendrás una dinámica interesante; sólo tenés que escribir esa palabra que resuena con dos, y a continuación, un color. El color que ve la Palmera.';
            break;
        case 'tinta':
            customMessage = '¿Tinta? ¿Qué pasa con la tinta?';
            break;
        case 'paralelismoazul':
            customMessage = 'Lo hiciste. Hay un camino a una isla absolutamente personal, y es sólo con la intención de que sólo tus ojos lo vean y hablen. Si queres ir, pronto podrás verlo pero el barquito sigue en desarrollo. Cuando esté, sólo volve a escribir la misma frase y se abrirá. Por ahora, FIN DEL CAMINO.';
            break;
        case 'vecina':
            customMessage = 'ʕ•́ᴥ•̀ʔっ.........♥';
            break;
        case 'corazon':
            customMessage = ' " Era hermosa, no como las flores, sino como la tormenta: con fuerza y misterio", y "El viento jugaba con su cabello, como si incluso la naturaleza quisiera acariciarla." - P. Neruda, W.Shakespeare';
            break;
        case 'clave':
            customMessage = 'Dios, no.';
            break;
        case 'contraseña':
            customMessage = 'Qué graciosa.';
            break;
        case '123':
            customMessage = 'Ojalá no uses esa contraseña para proteger ningún dato personal.';
            break;
        case '2072023':
            customMessage = 'Lo hiciste. Esa página está en proceso aún. Cuando esté terminada lo sabrás.';
            break;
        case 'herisland':
            customMessage = 'Que atención, no se te escapó el atajo ʕ•́ᴥ•̀ʔっ Va a llevarte a un lugar especial pero aquel lugar está dentro del sitio que sigue en desarrollo, y para entrar por la puerta principal necesitarás otro codigo (Pista -> 1978). Pero si queres hacer una trampilla, éste lugar prodrás visitar primero en menos tiempo. Mientra tanto dejame contarte un chiste malo (literalmente escribi "chistemalo" jajs)';
            break;
        case 'Engrapadora':
            customMessage = '';
            break;
        default:
            customMessage = 'Buen intento'; // Mensaje genérico para cualquier otra entrada
    }

    // Mostrar el mensaje correspondiente
    errorMessage.textContent = customMessage;
    errorMessage.style.display = 'block';

    // Guardar clave en el servidor
    const timestamp = new Date().toLocaleString(); // Fecha y hora en formato local
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;

            // Enviar datos al servidor
            fetch('http://localhost:3000/save-attempt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ key: passwordInput, timestamp, ip }),
            }).catch(error => console.error('Error al guardar el intento:', error));
        })
        .catch(error => console.error('Error al obtener la IP:', error));
});
