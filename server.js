const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Definir la ruta del archivo en /tmp
const dataDir = path.join(__dirname, 'tmp');
const dataPath = path.join(dataDir, 'data.json');

// Crear la carpeta tmp si no existe
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Verificar si el archivo data.json existe; si no, crearlo
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]), 'utf8');
}

// Endpoint para guardar intentos
app.post('/save-attempt', (req, res) => {
    const { key, timestamp, ip } = req.body;

    if (!key || !timestamp || !ip) {
        return res.status(400).send('Faltan datos necesarios.');
    }

    // Leer los intentos existentes
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo data.json:', err);
            return res.status(500).send('Error al leer el archivo.');
        }

        let attempts = [];
        try {
            attempts = JSON.parse(data || '[]');
        } catch (parseErr) {
            console.error('Error al parsear el archivo data.json:', parseErr);
            return res.status(500).send('Error al procesar los datos.');
        }

        // Agregar el nuevo intento
        attempts.push({ key, timestamp, ip });

        // Guardar los datos actualizados
        fs.writeFile(dataPath, JSON.stringify(attempts, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error al guardar los datos:', writeErr);
                return res.status(500).send('Error al guardar los datos.');
            }
            res.status(200).send('Intento guardado correctamente.');
        });
    });
});

// Endpoint para obtener datos
app.get('/data', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo data.json:', err);
            return res.status(500).json({ error: 'No se pudo obtener los datos.' });
        }

        let attempts = [];
        try {
            attempts = JSON.parse(data || '[]');
        } catch (parseErr) {
            console.error('Error al parsear el archivo data.json:', parseErr);
            return res.status(500).json({ error: 'Error al procesar los datos.' });
        }

        res.json(attempts);
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
