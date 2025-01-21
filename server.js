const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json()); // Middleware para parsear JSON
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde "public"

const dataFilePath = path.join(__dirname, 'data', 'data.json');

// Endpoint para guardar los intentos
app.post('/save-attempt', (req, res) => {
    const { key, timestamp } = req.body;

    // Capturar la IP del cliente desde la solicitud
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Leer y actualizar el archivo data.json
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send('Error al guardar la información');
        }

        let attempts = [];
        if (data) {
            attempts = JSON.parse(data); // Parsear contenido existente si lo hay
        }

        // Agregar nuevo intento
        attempts.push({ key, timestamp, ip: clientIp });

        // Guardar los intentos actualizados
        fs.writeFile(dataFilePath, JSON.stringify(attempts, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
                return res.status(500).send('Error al guardar la información');
            }
            res.send('Intento guardado correctamente');
        });
    });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
