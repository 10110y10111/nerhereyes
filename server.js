const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
const PORT = 3000;

// Configura las credenciales de AWS y el cliente de S3
AWS.config.update({ region: 'us-east-2' }); // Cambia 'us-east-1' si tu bucket está en otra región
const s3 = new AWS.S3();

// Detalles del bucket y archivo
const BUCKET_NAME = 'datanerhereyes';
const DATA_FILE_KEY = 'data.json';

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));


// Endpoint para guardar intentos
app.post('/save-attempt', (req, res) => {
    const { key } = req.body;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    // Obtener el timestamp en formato hh:mm
    const timestamp = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Cambia a true si prefieres AM/PM
    });

    s3.getObject({ Bucket: BUCKET_NAME, Key: DATA_FILE_KEY }, (err, data) => {
        let attempts = [];

        if (err && err.code === 'NoSuchKey') {
            console.log('El archivo data.json no existe. Se creará uno nuevo.');
        } else if (err) {
            console.error('Error al obtener el archivo desde S3:', err);
            return res.status(500).send('Error al obtener datos desde S3');
        } else {
            attempts = JSON.parse(data.Body.toString());
        }

        // Agregar el nuevo intento
        attempts.push({ key, timestamp, ip: clientIp });

        // Subir el archivo actualizado a S3
        const params = {
            Bucket: BUCKET_NAME,
            Key: DATA_FILE_KEY,
            Body: JSON.stringify(attempts, null, 2),
            ContentType: 'application/json',
        };

        s3.putObject(params, (err) => {
            if (err) {
                console.error('Error al subir el archivo a S3:', err);
                return res.status(500).send('Error al guardar datos en S3');
            }
            console.log('Archivo data.json actualizado exitosamente en S3');
            res.send('Intento guardado correctamente en S3');
        });
    });
});


// Ignorar favicon
app.get('/favicon.ico', (req, res) => res.status(204));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
