document.getElementById('access-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevenir el envío por defecto del formulario
    const passwordInput = document.getElementById('password').value.toLowerCase(); // Convertir a minúsculas
    const errorMessage = document.getElementById('error-message');

    // Capturar la fecha y hora actuales
    const timestamp = new Date().toISOString();

    // Función para enviar datos al servidor
    const sendAttempt = async () => {
        try {
            await fetch('/save-attempt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ key: passwordInput, timestamp }),
            });
        } catch (error) {
            console.error('Error al guardar el intento:', error);
        }
    };

    // Inicializar el mensaje de error como vacío
    let customMessage = '';

    // Redirecciones basadas en palabras clave
    if (passwordInput === 'tamara' || passwordInput === 'tami') {
        await sendAttempt(); // Guardar intento antes de redirigir
        window.location.href = 'page2.html';
        return;
    }

    if (passwordInput === 'tamarabella') {
        await sendAttempt(); // Guardar intento antes de redirigir
        window.location.href = 'page4.html';
        return;
    }

    if (passwordInput === 'engrapadora') {
        await sendAttempt(); // Guardar intento antes de redirigir
        window.location.href = 'page5.html';
        return;
    }

    // Mensajes de error personalizados
    switch (passwordInput) {
        case 'nadine':
            customMessage =
                'Este no es el acceso a la carta principal. ... (personaliza aquí)';
            break;
        case 'palmera':
            customMessage = 'Incorrecto. ¿Quién pondría la clave al lado de la clave?';
            break;
        default:
            customMessage = 'Buen intento'; // Mensaje genérico
    }

    // Enviar el intento al servidor (para claves incorrectas)
    await sendAttempt();

    // Mostrar el mensaje correspondiente
    errorMessage.textContent = customMessage;
    errorMessage.style.display = 'block';
});
