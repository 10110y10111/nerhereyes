function showInteractiveMessage() {
    const interactiveArea = document.getElementById('interactiveArea');
    interactiveArea.style.display = 'block';
    
    const initialMessage = document.getElementById('initialMessage');
    initialMessage.style.display = 'none';
}

// Inicializar EmailJS con tu User ID
emailjs.init("4ah0OrAOG8mlIuCGr");

// Función para mostrar el área interactiva
function showInteractiveMessage() {
    document.getElementById("interactiveArea").style.display = "block";
}

// Configurar el botón de envío
// script.js
document.getElementById("sendButton").addEventListener("click", function () {
    const userMessage = document.getElementById("userMessage").value;

    if (!userMessage) {
        alert("Por favor, escribe un mensaje antes de enviar.");
        return;
    }

    const templateParams = {
        to_name: "Programadora", // Cambia este valor según sea necesario
        from_name: "Usuario Anónimo", // O agrega un campo para que el usuario escriba su nombre
        message: userMessage,
    };

    emailjs.send("service_gpnfxg8", "template_kfqeg3i", templateParams, "4ah0OrAOG8mlIuCGr")
        .then(function (response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("Mensaje enviado con éxito.");
        }, function (error) {
            console.error("FAILED...", error);
            alert("Hubo un error al enviar tu mensaje. Inténtalo de nuevo.");
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const tamara = document.getElementById("tamara");
    const overlay = document.getElementById("overlay");
    const body = document.body;

    tamara.addEventListener("click", function () {
        overlay.style.display = "flex"; // Muestra la imagen en pantalla completa
    });

    overlay.addEventListener("click", function () {
        overlay.style.display = "none"; // Oculta la imagen
        body.classList.remove("blurred"); // Quita el desenfoque del fondo
    });
});


