function showInteractiveMessage() {
    const interactiveArea = document.getElementById('interactiveArea');
    const initialMessage = document.getElementById('initialMessage');
  
    // Toggle el estilo del mensaje adicional
    interactiveArea.style.display = interactiveArea.style.display === 'none' ? 'block' : 'none';
  }

// imagen poema
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


