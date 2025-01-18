const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar express para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde el directorio public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para guardar intentos en data.json
app.post('/save-attempt', (req, res) => {
    const { key, timestamp, ip } = req.body;

    if (!key || !timestamp || !ip) {
        return res.status(400).send('Faltan datos necesarios.');
    }

    const dataPath = path.join('/tmp', 'data.json');

    fs.readFile(dataPath, 'utf8', (err, data) => {
        let attempts = [];

        if (!err) {
            try {
                attempts = JSON.parse(data || '[]');
            } catch (parseErr) {
                console.error('Archivo corrupto. Creando un archivo nuevo.');
            }
        }

        attempts.push({ key, timestamp, ip });

        fs.writeFile(dataPath, JSON.stringify(attempts, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error al guardar los datos:', writeErr);
                return res.status(500).send('Error al guardar los datos.');
            }

            console.log('Datos guardados correctamente en data.json');
            res.status(200).send('Intento guardado correctamente.');
        });
    });
});

// Ruta para obtener los datos de data.json
app.get('/data', (req, res) => {
    const dataPath = path.join('/tmp', 'data.json');

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo data.json:', err);
            return res.status(500).json({ error: 'No se pudo obtener los datos.' });
        }

        res.json(JSON.parse(data || '[]'));
    });
});

// Ruta para descargar el archivo data.json
app.get('/download-data', (req, res) => {
    const dataPath = path.join('/tmp', 'data.json');

    res.download(dataPath, 'data.json', (err) => {
        if (err) {
            console.error('Error al descargar el archivo:', err);
            res.status(500).send('Error al descargar el archivo');
        }
    });
});

// Ruta protegida para ver el contenido de data.json
app.get('/view-data', (req, res) => {
    const authKey = req.query.key;

    if (authKey !== 'lexmonplay') {
        return res.status(403).send('Acceso denegado');
    }

    const dataPath = path.join('/tmp', 'data.json');

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send('Error al leer el archivo');
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(data || '[]');
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
