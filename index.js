require('dotenv').config(); // Carga las variables del archivo .env
const express = require('express');
const mongoose = require('./config/db'); // Configuración de MongoDB
const cors = require('cors');

const sensorRoutes = require('./routes/sensorRoutes'); // Importa las rutas

const app = express();
const PORT = process.env.PORT || 3000; // Usa el puerto definido en .env o 3000 por defecto

// Middlewares
app.use(express.json()); // Parseo de JSON en las peticiones
app.use(cors()); // Permitir peticiones desde otros orígenes

// Rutas
app.use('/api/sensors', sensorRoutes); // Rutas base para sensores

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
