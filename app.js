import express from 'express';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';
import path from 'path';

// Importar el módulo 'url' para obtener la ruta del archivo actual
// y el módulo 'path' para trabajar con rutas de archivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT =5000;

//Middleware para parsear JSON
app.use(bodyParser.json());

//Servir el archivo HTML
app.use(express.static(path.join(__dirname,)));

app.post('/multiplicar', (req, res) => {
    const { matriz1, matriz2 } = req.body;

    if(!matriz1 || !matriz2) {
        return res.status(400).json({ error: 'Se requieren dos matrices para multiplicar' });
    }

    const filas1 = matriz1.length;
    const columnas1 = matriz1[0].length;
    const filas2 = matriz2.length;
    const columnas2 = matriz2[0].length;

    if (columnas1 !== filas2) {
        return res.status(400).json({ error: 'El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz' });
    }

    // Inciar la matriz resultante
    const result = Array.from({ length: filas1 }, () => Array(columnas2).fill(0));

    // Multiplicación de matrices
    for (let i = 0; i < filas1; i++) {
        for (let j = 0; j < columnas2; j++) {
            for (let k = 0; k < columnas1; k++) {
                result[i][j] += matriz1[i][k] * matriz2[k][j];
            }
        }
    }

    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});