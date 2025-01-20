const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'data', 'data.json');
const destDir = path.join('C:', 'tmp');
const destPath = path.join(destDir, 'data.json');

// Verificar que el directorio destino existe, si no, crearlo
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

// Verificar que el archivo fuente existe
if (fs.existsSync(sourcePath)) {
    // Copiar el archivo fuente al destino
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Archivo copiado a ${destPath}`);
} else {
    console.error(`El archivo fuente no existe: ${sourcePath}`);
    process.exit(1); // Salir con error si el archivo fuente no existe
}
