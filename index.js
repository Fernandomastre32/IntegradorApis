const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();

// Definir la configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de mi Base de Datos",
      version: "1.0.0",
      description: "Documentación de la API para gestionar la base de datos de componentes.",
    },
  },
  // Ruta donde están las rutas de tu API
  apis: [path.join(__dirname, 'routes', '*.js')], // Esto buscará todas las rutas dentro de la carpeta 'routes'
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Servir la documentación Swagger en el endpoint '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Tu código de rutas aquí
app.get("/", (req, res) => {
  res.send("Bienvenido a la API");
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
