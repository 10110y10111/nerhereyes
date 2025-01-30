// Inicializar EmailJS con tu User ID
emailjs.init("4eU1c2AJoZ3_IdGwy");

document.getElementById("access-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevenir el envío por defecto del formulario
    const passwordInput = document.getElementById("password").value.trim().toLowerCase(); // Limpiar espacios y convertir a minúsculas
    const errorMessage = document.getElementById("error-message");

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

    // Función para enviar el email
    const sendEmail = async () => {
        const templateParams = {
            to_name: "Programadora",
            from_name: "Usuario Anónimo",
            message: `Clave ingresada: ${passwordInput}`,
        };

        try {
            const response = await emailjs.send("service_63tgu71", "template_8lzno7c", templateParams);
            console.log("Email enviado con éxito.", response.status, response.text);
        } catch (error) {
            console.error("Error al enviar el email:", error);
        }
    };

    // Lista de claves correctas con sus respectivas redirecciones
    const validKeys = {
        tamara: "page2.html",
        tami: "page2.html",
        tamarabella: "page4.html",
        engrapadora: "page5.html",
        juego: "page6.html",
    };

    // Mensajes personalizados para claves incorrectas específicas
    const customMessages = {
        nadine: 'Este no es el acceso a la carta principal, que si todavia no leiste, es preciso y mas importante que la veas primero (con otra clave). Si lo hiciste: Queria hacerte algo para darte un momento de alegria. Puede parecer poco y tonto pero.. una vez me dijiste algo que me dió mucha risa y te queria contar unos chistes respecto a eso. Podes leerlos, si queres, adivinando la palabra -> objeto pequeño y sencillo pero, "podría ser una buena arma para matar a un zombie".',
        palmera: 'Incorrecto, ¿Quién pondría la clave al lado de la clave? (paralelo)',
        corazon: '"Era hermosa, no como las flores, sino como la tormenta: con fuerza y misterio", y "El viento, jugaba con su cabello, como si incluso la naturaleza quisiera acariciarla." - P.Neruda, W.Shakespeare',
        sharingthenighttogether: 'Con aprecio quería compartirte la canción, espero que te haya gustado. Además, me gustaria que leyeras algo más en un apartado especial (clave: me).',
        me: 'no, osea yo',
        hojasfinas: 'ʕ•́ᴥ•̀ʔっ.........♥',
        cejasfinas: 'ʕ♥ᴥ♥ʔっ......🥥',
        mirada: '"que estremece", y tambien..',
        congela: '🌊_ 🧊 ⚖ 🏝',
        marea: 'blue',
        blue: 'marea',
        mareablue: '🌬 🌪 ❄ ⛄ 🎑 🌅 🕓 🎢 🌫 🚪🛏 💭 ♾ 🚪🕯✍🏻 📖 ⛅ 🌊_',
        uñas: '•́-•̀っ..♡',
        melodia: 'elle jolie',
        brisa: 'ʕ•́ᴥ•̀ʔっ......♥',
        viento: 'ʕ•́ᴥ•̀ʔっ.........♥',
        cabello: 'ʕ•́-•̀っ♥っ',
        ojos:'**Alerta del sistema**: se ha registrado única mirada altamente encriptada - Protocolo para reiniciar funciones vitales -> desplegar suavemente sus labios hacia arriba (alias: sonrisa)',
        santaengrapadora: '🏠👩🏽🫳🏼📎💨🧟‍♂💀..🛣..😮🏠',
        misteriosa:'🦉',
        buho: 'misteriosa',
        herisland: '(*en espera*)',
        saranpank: '(*en espera*)',
        paralelismo: '(*en espera*)',
        buhomisteriosa: '(*en espera*)',
    };

    // Verificar si la clave ingresada es válida
    if (validKeys[passwordInput]) {
        await sendAttempt(); // Guardar intento
        await sendEmail(); // Enviar email antes de redirigir
        window.location.href = validKeys[passwordInput]; // Redirigir
        return;
    }

    // Si no es válida, verificar si es una clave incorrecta específica con mensaje personalizado
    if (customMessages[passwordInput]) {
        errorMessage.textContent = customMessages[passwordInput];
    } else {
        errorMessage.textContent = 'Buen intento'; // Mensaje genérico para claves incorrectas
    }

    // Mostrar el mensaje de error
    errorMessage.style.display = 'block';

    // Enviar el intento al servidor
    await sendAttempt();
    await sendEmail(); // Enviar email incluso si la clave es incorrecta
});
