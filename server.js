const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/save-attempt', (req, res) => {
    const { key, timestamp, ip } = req.body;

    if (!key || !timestamp || !ip) {
        return res.status(400).send('Faltan datos necesarios.');
    }

    const dataPath = path.join(__dirname, 'data.json');

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send('Error al leer el archivo.');
        }

        const attempts = data ? JSON.parse(data) : [];
        attempts.push({ key, timestamp, ip });

        fs.writeFile(dataPath, JSON.stringify(attempts, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).send('Error al guardar los datos.');
            }
            res.status(200).send('Intento guardado correctamente.');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const fs = require('fs');
const path = require('path');

// Ruta para ver el contenido de data.json
app.get('/view-data', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            res.status(500).send('Error al leer el archivo');
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});

// Ruta para descargar data.json
app.get('/download-data', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'data.json');
    res.download(filePath, 'data.json', (err) => {
        if (err) {
            console.error('Error al descargar el archivo:', err);
        }
    });
});

app.get('/view-data', (req, res) => {
    const authKey = req.query.key;
    if (authKey !== 'lexmonplay') {
        return res.status(403).send('Acceso denegado');
    }

    const filePath = path.join(__dirname, 'data', 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            res.status(500).send('Error al leer el archivo');
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});

