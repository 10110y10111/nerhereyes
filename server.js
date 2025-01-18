const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta del archivo en la carpeta tmp
const dataPath = path.join(__dirname, 'tmp', 'data.json');

// Crear la carpeta tmp si no existe
if (!fs.existsSync(path.join(__dirname, 'tmp'))) {
    fs.mkdirSync(path.join(__dirname, 'tmp'));
}

// Endpoint para guardar intentos
app.post('/save-attempt', (req, res) => {
    const { key, timestamp, ip } = req.body;

    if (!key || !timestamp || !ip) {
        return res.status(400).send('Faltan datos necesarios.');
    }

    fs.readFile(dataPath, 'utf8', (err, data) => {
        const attempts = err && err.code === 'ENOENT' ? [] : JSON.parse(data || '[]');

        attempts.push({ key, timestamp, ip });

        fs.writeFile(dataPath, JSON.stringify(attempts, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error al guardar los datos:', writeErr);
                return res.status(500).send('Error al guardar los datos.');
            }
            res.status(200).send('Intento guardado correctamente.');
        });
    });
});

// Ruta para obtener los datos de data.json
app.get('/data', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo data.json:', err);
            return res.status(500).json({ error: 'No se pudo obtener los datos.' });
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para descargar el archivo data.json
app.get('/download-data', (req, res) => {
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

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            res.status(500).send('Error al leer el archivo');
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
